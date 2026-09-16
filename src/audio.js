// Project Animus Hybrid Audio Engine
// Seamlessly loads custom audio files via Web Audio API AudioBuffer caching with zero-latency procedural fallbacks

export const SOUND_CANDIDATES = {
  ambient: ['/sounds/ambient.mp3'],
  eagle_cry: ['/sounds/eagle_cry.mp3'],
  hidden_blade: ['/sounds/hidden_blade.mp3'],
  leap_dive: ['/sounds/leap_dive.mp3'],
  eagle_vision: ['/sounds/eagle_vision.mp3'],
  apple_pulse: ['/sounds/apple_pulse.mp3'],
  glitch: ['/sounds/glitch.mp3']
};

function resolvePath(path) {
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

class AnimusAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.ambientGain = null;
    this.isMuted = false;
    this.isInitialized = false;
    this.ambientNodes = null;
    this.customAmbientAudio = null;
    this.ambientPlayPromise = null;
    this.bufferCache = new Map();
    this.loadingPromises = new Map();
  }

  init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master gain node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX gain bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Ambient gain bus
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.isInitialized = true;
    } catch (e) {
      console.warn("[PROJECT ANIMUS] Web Audio API initialization failed:", e);
    }
  }

  ensureContext() {
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      return this.ctx.resume().catch(() => {});
    }
    return Promise.resolve();
  }

  async preloadSfx(key) {
    const candidates = SOUND_CANDIDATES[key];
    if (!candidates || candidates.length === 0) return null;
    const path = resolvePath(candidates[0]);

    if (this.bufferCache.has(path)) {
      return this.bufferCache.get(path);
    }
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path);
    }

    const loadPromise = (async () => {
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} fetching ${path}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        if (!this.ctx) this.init();
        if (!this.ctx) return null;
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        this.bufferCache.set(path, audioBuffer);
        return audioBuffer;
      } catch (err) {
        console.warn(`[PROJECT ANIMUS] Audio buffer preload failed for ${key} (${path}):`, err);
        return null;
      } finally {
        this.loadingPromises.delete(path);
      }
    })();

    this.loadingPromises.set(path, loadPromise);
    return loadPromise;
  }

  preloadAllSfx() {
    Object.keys(SOUND_CANDIDATES).forEach(key => {
      if (key !== 'ambient') {
        this.preloadSfx(key);
      }
    });
  }

  // Attempts playing preloaded/cached buffer; if unavailable, calls fallbackFn instantly
  playFromCandidates(key, fallbackFn) {
    if (this.isMuted) return;
    this.ensureContext();

    const candidates = SOUND_CANDIDATES[key];
    if (!candidates || candidates.length === 0) {
      if (fallbackFn) fallbackFn();
      return;
    }

    const path = resolvePath(candidates[0]);
    const cachedBuffer = this.bufferCache.get(path);

    if (cachedBuffer && this.ctx && this.ctx.state === 'running') {
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = cachedBuffer;
        source.connect(this.sfxGain || this.masterGain || this.ctx.destination);
        source.start(0);
        return;
      } catch (e) {
        console.warn(`[PROJECT ANIMUS] Error playing buffer for ${key}:`, e);
      }
    }

    // If buffer is still loading or failed, execute procedural synth fallback
    if (fallbackFn) {
      fallbackFn();
    }

    // Trigger preload in background if not already cached
    if (!cachedBuffer && !this.loadingPromises.has(path)) {
      this.preloadSfx(key);
    }
  }

  // Master ambient soundtrack (e.g. Ezio's Family or Animus Drone)
  startAmbientDrone() {
    if (this.isMuted) return;
    this.ensureContext();

    const candidates = SOUND_CANDIDATES.ambient || [];
    if (candidates.length === 0) {
      this.startProceduralAmbientDrone();
      return;
    }

    const path = resolvePath(candidates[0]);

    if (!this.customAmbientAudio) {
      this.customAmbientAudio = new Audio(path);
      this.customAmbientAudio.loop = true;
      this.customAmbientAudio.volume = 0.45;
    }

    if (this.ambientPlayPromise) return;

    this.ambientPlayPromise = this.customAmbientAudio.play();
    if (this.ambientPlayPromise !== undefined) {
      this.ambientPlayPromise
        .then(() => {
          this.ambientPlayPromise = null;
          // If user clicked mute while loading, pause immediately
          if (this.isMuted && this.customAmbientAudio) {
            this.customAmbientAudio.pause();
          }
        })
        .catch((err) => {
          this.ambientPlayPromise = null;
          if (err.name === 'AbortError' || err.name === 'NotAllowedError') {
            return;
          }
          console.warn("[PROJECT ANIMUS] Custom ambient track failed, using procedural synthesis", err);
          this.startProceduralAmbientDrone();
        });
    } else {
      this.startProceduralAmbientDrone();
    }
  }

  startProceduralAmbientDrone() {
    if (!this.ctx || this.ambientNodes || this.isMuted) return;
    const t = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, t);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(55.6, t);

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(110, t);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, t);
    filter.Q.setValueAtTime(2.5, t);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, t);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(45, t);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t);
    masterGain.gain.exponentialRampToValueAtTime(0.06, t + 3);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(this.ambientGain || this.masterGain || this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc3.start(t);
    lfo.start(t);

    this.ambientNodes = { osc1, osc2, osc3, lfo, masterGain, filter };
  }

  stopAmbientDrone() {
    if (this.customAmbientAudio) {
      if (this.ambientPlayPromise) {
        this.ambientPlayPromise
          .then(() => {
            if (this.customAmbientAudio && this.isMuted) {
              this.customAmbientAudio.pause();
            }
          })
          .catch(() => {});
      } else {
        this.customAmbientAudio.pause();
      }
    }

    if (!this.ambientNodes || !this.ctx) return;
    const t = this.ctx.currentTime;
    try {
      this.ambientNodes.masterGain.gain.setValueAtTime(this.ambientNodes.masterGain.gain.value, t);
      this.ambientNodes.masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 1);
      setTimeout(() => {
        if (this.ambientNodes) {
          try {
            this.ambientNodes.osc1.stop();
            this.ambientNodes.osc2.stop();
            this.ambientNodes.osc3.stop();
            this.ambientNodes.lfo.stop();
          } catch (e) {}
          this.ambientNodes = null;
        }
      }, 1100);
    } catch (e) {
      this.ambientNodes = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    if (this.isMuted) {
      this.stopAmbientDrone();
    } else {
      this.startAmbientDrone();
    }
    return !this.isMuted;
  }

  // Eagle Screech
  playEagleCry() {
    this.playFromCandidates('eagle_cry', () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const carrier = this.ctx.createOscillator();
      carrier.type = 'sawtooth';
      carrier.frequency.setValueAtTime(1400, t);
      carrier.frequency.exponentialRampToValueAtTime(2600, t + 0.15);
      carrier.frequency.exponentialRampToValueAtTime(2200, t + 0.5);
      carrier.frequency.exponentialRampToValueAtTime(1200, t + 1.2);

      const vibrato = this.ctx.createOscillator();
      vibrato.frequency.setValueAtTime(32, t);
      const vibGain = this.ctx.createGain();
      vibGain.gain.setValueAtTime(120, t);
      vibrato.connect(vibGain);
      vibGain.connect(carrier.frequency);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.Q.setValueAtTime(4.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);

      const delay = this.ctx.createDelay();
      delay.delayTime.value = 0.18;
      const delayGain = this.ctx.createGain();
      delayGain.gain.value = 0.35;

      carrier.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
      gain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);

      carrier.start(t);
      vibrato.start(t);
      carrier.stop(t + 1.4);
      vibrato.stop(t + 1.4);
    });
  }

  // Hidden Blade
  playHiddenBlade() {
    this.playFromCandidates('hidden_blade', () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(4500, t);
      noiseFilter.frequency.exponentialRampToValueAtTime(1800, t + 0.18);
      noiseFilter.Q.setValueAtTime(6.0, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);

      const click1 = this.ctx.createOscillator();
      click1.type = 'triangle';
      click1.frequency.setValueAtTime(1800, t + 0.12);
      click1.frequency.exponentialRampToValueAtTime(400, t + 0.2);

      const clickGain1 = this.ctx.createGain();
      clickGain1.gain.setValueAtTime(0.001, t);
      clickGain1.gain.setValueAtTime(0.35, t + 0.12);
      clickGain1.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      click1.connect(clickGain1);
      clickGain1.connect(this.sfxGain || this.masterGain || this.ctx.destination);

      const clink = this.ctx.createOscillator();
      clink.type = 'sine';
      clink.frequency.setValueAtTime(950, t + 0.16);
      clink.frequency.exponentialRampToValueAtTime(180, t + 0.35);

      const clinkGain = this.ctx.createGain();
      clinkGain.gain.setValueAtTime(0.001, t);
      clinkGain.gain.setValueAtTime(0.4, t + 0.16);
      clinkGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      clink.connect(clinkGain);
      clinkGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);

      whiteNoise.start(t);
      click1.start(t + 0.12);
      clink.start(t + 0.16);
      click1.stop(t + 0.25);
      clink.stop(t + 0.4);
    });
  }

  // Leap of Faith
  playLeapOfFaith(onLandingCallback) {
    if (this.isMuted) {
      if (onLandingCallback) setTimeout(onLandingCallback, 1800);
      return;
    }
    this.ensureContext();

    this.playFromCandidates('leap_dive', () => {
      this.playProceduralLeap(onLandingCallback);
    });

    // Landing trigger at 1800ms
    setTimeout(() => {
      this.playHayLanding();
      if (onLandingCallback) onLandingCallback();
    }, 1800);
  }

  playProceduralLeap(onLandingCallback) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.playEagleCry();

    const duration = 2.2;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(200, t);
    windFilter.frequency.exponentialRampToValueAtTime(2200, t + 1.5);
    windFilter.frequency.exponentialRampToValueAtTime(3200, t + 1.8);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.01, t);
    windGain.gain.exponentialRampToValueAtTime(0.4, t + 1.6);
    windGain.gain.setValueAtTime(0.4, t + 1.8);
    windGain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    windSource.start(t);

    const whistle = this.ctx.createOscillator();
    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(350, t);
    whistle.frequency.exponentialRampToValueAtTime(900, t + 1.7);

    const whistleGain = this.ctx.createGain();
    whistleGain.gain.setValueAtTime(0.001, t);
    whistleGain.gain.exponentialRampToValueAtTime(0.08, t + 1.4);
    whistleGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.85);

    whistle.connect(whistleGain);
    whistleGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    whistle.start(t);
    whistle.stop(t + 1.9);
  }

  // Hay Landing (Direct Procedural Synthesis - No network latency)
  playHayLanding() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const thud = this.ctx.createOscillator();
    thud.type = 'triangle';
    thud.frequency.setValueAtTime(140, t);
    thud.frequency.exponentialRampToValueAtTime(35, t + 0.3);

    const thudGain = this.ctx.createGain();
    thudGain.gain.setValueAtTime(0.6, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    thud.connect(thudGain);
    thudGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    thud.start(t);
    thud.stop(t + 0.4);

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.6);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }

    const rustle = this.ctx.createBufferSource();
    rustle.buffer = noiseBuffer;

    const rustleFilter = this.ctx.createBiquadFilter();
    rustleFilter.type = 'bandpass';
    rustleFilter.frequency.setValueAtTime(1400, t);
    rustleFilter.Q.setValueAtTime(2.0, t);

    const rustleGain = this.ctx.createGain();
    rustleGain.gain.setValueAtTime(0.3, t);
    rustleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    rustle.connect(rustleFilter);
    rustleFilter.connect(rustleGain);
    rustleGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    rustle.start(t);
  }

  // Eagle Vision
  playEagleVisionToggle(isActive) {
    this.playFromCandidates('eagle_vision', () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const sub = this.ctx.createOscillator();
      sub.type = 'sine';
      if (isActive) {
        sub.frequency.setValueAtTime(60, t);
        sub.frequency.exponentialRampToValueAtTime(180, t + 0.2);
        sub.frequency.exponentialRampToValueAtTime(45, t + 0.6);
      } else {
        sub.frequency.setValueAtTime(180, t);
        sub.frequency.exponentialRampToValueAtTime(50, t + 0.4);
      }

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.4, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      sub.connect(subGain);
      subGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
      sub.start(t);
      sub.stop(t + 0.75);

      const chime = this.ctx.createOscillator();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(isActive ? 1760 : 880, t);
      chime.frequency.exponentialRampToValueAtTime(isActive ? 2640 : 440, t + 0.35);

      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.18, t);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      chime.connect(chimeGain);
      chimeGain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
      chime.start(t);
      chime.stop(t + 0.65);
    });
  }

  // Apple of Eden Pulse
  playApplePulse() {
    this.playFromCandidates('apple_pulse', () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(110, t + 1.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
      osc.start(t);
      osc.stop(t + 1.4);
    });
  }

  // UI Hover (Zero-latency Procedural Synthesis - No network calls)
  playHoverChirp() {
    if (this.isMuted) return;
    // Guard against suspended context before user activation
    if (!this.ctx || this.ctx.state !== 'running') return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, t);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.04);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  // UI Click (Zero-latency Procedural Synthesis - No network calls)
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Glitch
  playGlitch() {
    this.playFromCandidates('glitch', () => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800, t);
      filter.Q.setValueAtTime(8, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.masterGain || this.ctx.destination);
      noise.start(t);
    });
  }
}

export const audio = new AnimusAudioEngine();
