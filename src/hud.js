// Project Animus - HUD, Custom Reticle Cursor, and Eagle Vision Controller
import { audio } from './audio.js';

export class HudController {
  constructor(corridor) {
    this.corridor = corridor;
    this.isEagleVision = false;
    this.cursorEl = document.getElementById('custom-cursor');
    this.cursorDot = document.getElementById('cursor-dot');
    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
    this.eagleVisionBtn = document.getElementById('eagle-vision-btn');
    this.heroEagleBtn = document.getElementById('hero-eagle-btn');
    this.heroSyncBtn = document.getElementById('hero-sync-btn');
    this.glitchBtn = document.getElementById('glitch-trigger-btn');
    this.dnaStabilityEl = document.getElementById('hud-dna-stability');

    this.cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  init() {
    this.setupCursor();
    this.setupAudioToggle();
    this.setupEagleVision();
    this.setupGlitchTrigger();
    this.setupHeroButtons();
    this.startDnaOscillator();
  }

  setupCursor() {
    if (!this.cursorEl || !this.cursorDot) return;
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) {
      this.cursorEl.style.display = 'none';
      this.cursorDot.style.display = 'none';
      return;
    }

    window.addEventListener('mousemove', (e) => {
      this.targetPos.x = e.clientX;
      this.targetPos.y = e.clientY;
      this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    const updateCursor = () => {
      this.cursorPos.x += (this.targetPos.x - this.cursorPos.x) * 0.25;
      this.cursorPos.y += (this.targetPos.y - this.cursorPos.y) * 0.25;
      this.cursorEl.style.transform = `translate3d(${this.cursorPos.x}px, ${this.cursorPos.y}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    // Interactive element hover states
    const interactiveSelectors = 'a, button, input, .artifact-card, .era-tab-btn, .tenet-tab-btn, .assassin-card-grid, [data-action]';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        this.cursorEl.classList.add('locked');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        this.cursorEl.classList.remove('locked');
      }
    });

    // Hidden blade click pulse
    window.addEventListener('mousedown', () => {
      this.cursorEl.classList.add('active-click');
    });
    window.addEventListener('mouseup', () => {
      this.cursorEl.classList.remove('active-click');
    });
  }

  setupAudioToggle() {
    if (!this.audioToggleBtn) return;

    this.audioToggleBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
    this.audioToggleBtn.addEventListener('click', () => {
      const isAudible = audio.toggleMute();
      this.updateAudioButtonState(isAudible);
      audio.playClick();
    });

    // Start audio on first user click or touch anywhere on the page
    const startAudioOnFirstInteract = () => {
      audio.startAmbientDrone();
      this.updateAudioButtonState(true);
      window.removeEventListener('click', startAudioOnFirstInteract);
      window.removeEventListener('touchstart', startAudioOnFirstInteract);
    };
    window.addEventListener('click', startAudioOnFirstInteract, { once: true });
    window.addEventListener('touchstart', startAudioOnFirstInteract, { once: true });
  }

  updateAudioButtonState(isAudible) {
    if (!this.audioToggleBtn) return;
    const label = this.audioToggleBtn.querySelector('.audio-label');
    const wave = this.audioToggleBtn.querySelector('.audio-waves');
    if (label) {
      label.textContent = isAudible ? 'AUDIO: ONLINE' : 'AUDIO: MUTED';
    }
    if (wave) {
      wave.classList.toggle('playing', isAudible);
    }
    this.audioToggleBtn.classList.toggle('muted', !isAudible);
  }

  setupEagleVision() {
    const toggleVision = () => {
      this.isEagleVision = !this.isEagleVision;
      document.body.dataset.vision = this.isEagleVision ? 'eagle' : 'normal';

      if (this.corridor) {
        this.corridor.setEagleVision(this.isEagleVision);
        this.corridor.triggerGlitch(300);
      }

      audio.playEagleVisionToggle(this.isEagleVision);

      // Update button labels & states
      const text = this.isEagleVision ? 'EAGLE VISION: ACTIVE' : 'EAGLE VISION';
      if (this.eagleVisionBtn) {
        const span = this.eagleVisionBtn.querySelector('.btn-text');
        if (span) span.textContent = text;
        this.eagleVisionBtn.classList.toggle('active', this.isEagleVision);
      }
      if (this.heroEagleBtn) {
        const span = this.heroEagleBtn.querySelector('.btn-text');
        if (span) span.textContent = text;
        this.heroEagleBtn.classList.toggle('active', this.isEagleVision);
      }

      // Add a quick sonar scanline flash to the screen
      const sonar = document.createElement('div');
      sonar.className = 'eagle-sonar-pulse';
      document.body.appendChild(sonar);
      setTimeout(() => {
        if (sonar.parentNode) sonar.parentNode.removeChild(sonar);
      }, 1000);
    };

    if (this.eagleVisionBtn) {
      this.eagleVisionBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
      this.eagleVisionBtn.addEventListener('click', toggleVision);
    }

    if (this.heroEagleBtn) {
      this.heroEagleBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
      this.heroEagleBtn.addEventListener('click', toggleVision);
    }

    // Keyboard shortcut 'V' for Eagle Vision
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'v' && !e.target.closest('input, textarea')) {
        toggleVision();
      }
    });
  }

  setupHeroButtons() {
    if (this.heroSyncBtn) {
      this.heroSyncBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
      this.heroSyncBtn.addEventListener('click', () => {
        audio.playClick();
        const timelineSec = document.getElementById('timeline-section');
        if (timelineSec) {
          timelineSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  setupGlitchTrigger() {
    if (!this.glitchBtn) return;
    this.glitchBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
    this.glitchBtn.addEventListener('click', () => {
      audio.playGlitch();
      if (this.corridor) {
        this.corridor.triggerGlitch(600);
      }
      document.body.classList.add('desync-shake');
      setTimeout(() => {
        document.body.classList.remove('desync-shake');
      }, 600);
    });
  }

  startDnaOscillator() {
    if (!this.dnaStabilityEl) return;
    setInterval(() => {
      const base = 99.6;
      const variation = (Math.random() * 0.35).toFixed(1);
      const val = (parseFloat(base) + parseFloat(variation)).toFixed(1);
      this.dnaStabilityEl.textContent = `${val}%`;
    }, 2800);
  }
}
