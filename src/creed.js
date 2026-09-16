// Project Animus - The Creed Tenets & Leap of Faith Ritual
import { audio } from './audio.js';

export const TENETS_DATA = [
  {
    number: "I",
    title: "Stay Your Blade from the Flesh of an Innocent",
    latin: "Ne laedas carnem innocentis",
    creedLaw: "An Assassin may kill only those who threaten the freedom and well-being of humanity. To strike down the innocent invites tyranny and dishonors the Creed.",
    history: "Violated by Altaïr Ibn-La'Ahad in Solomon's Temple when he killed an unarmed old man, leading to the loss of his master rank and his subsequent quest for true wisdom.",
    seal: "MORTIS INNOCENTIS"
  },
  {
    number: "II",
    title: "Hide in Plain Sight, Be One with the Crowd",
    latin: "Te celato in conspectu",
    creedLaw: "An Assassin must blend seamlessly among scholars, priests, merchants, and common folk. Become a whisper in the wind, a shadow under noonday sun.",
    history: "Emphasized by Ezio Auditore navigating the crowded piazzas of Venice and Florence, blending with courtesans, thieves, and mercenaries to vanish from guards.",
    seal: "UMBRA ET LUX"
  },
  {
    number: "III",
    title: "Never Compromise the Brotherhood",
    latin: "Numquam fraternitatem pericliteris",
    creedLaw: "The safety and secrecy of our brothers and sisters transcends individual desire. Betrayal of the sanctuary brings swift and permanent retribution.",
    history: "When Al Mualim fell under the corrupting sway of the Apple of Eden, he violated this ultimate law, forcing Altaïr to strike down his own mentor to preserve the Brotherhood.",
    seal: "FRATERNITAS AETERNA"
  }
];

function getHolographicGlyph(index) {
  if (index === 0) {
    // Tenet I: Restraint / Blade of Innocence (Crimson & Isu Gold)
    return `
      <div class="tenet-holo-glyph-wrapper" data-tenet="1">
        <div class="holo-scanline-bar"></div>
        <svg viewBox="0 0 160 160" class="svg-tenet-glyph" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="tenetPath1" d="M 16 80 A 64 64 0 0 0 144 80" />
            <linearGradient id="glyphCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff7b91" />
              <stop offset="50%" stop-color="#ff1a40" />
              <stop offset="100%" stop-color="#8b0000" />
            </linearGradient>
            <linearGradient id="glyphGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fff275" />
              <stop offset="50%" stop-color="#ffd700" />
              <stop offset="100%" stop-color="#c48600" />
            </linearGradient>
            <radialGradient id="glyphAura1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(255, 26, 64, 0.28)" />
              <stop offset="70%" stop-color="rgba(255, 26, 64, 0.05)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="glyphGlow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Ambient Aura -->
          <circle cx="80" cy="80" r="74" fill="url(#glyphAura1)" class="holo-aura" />

          <!-- HUD Corner Targeting Brackets -->
          <g stroke="rgba(255, 26, 64, 0.5)" stroke-width="1.2" fill="none">
            <path d="M 14 26 L 14 14 L 26 14" />
            <path d="M 146 26 L 146 14 L 134 14" />
            <path d="M 14 134 L 14 146 L 26 146" />
            <path d="M 146 134 L 146 146 L 134 146" />
          </g>

          <!-- Outer Rotating Cipher Ring (CW) -->
          <g class="holo-ring-outer">
            <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255, 26, 64, 0.25)" stroke-dasharray="3 6" />
            <circle cx="80" cy="80" r="66" fill="none" stroke="url(#glyphCrimson)" stroke-width="1.5" stroke-dasharray="24 4 6 4 14 4 6 4" />
            <polygon points="80,5 76,14 84,14" fill="#ff7b91" />
            <circle cx="126.6" cy="33.4" r="1.5" fill="#ffd700" />
            <circle cx="33.4" cy="33.4" r="1.5" fill="#ffd700" />
          </g>

          <!-- Inner Counter-Rotating Reticle Ring (CCW) -->
          <g class="holo-ring-inner">
            <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(255, 215, 0, 0.45)" stroke-width="1" stroke-dasharray="6 8 12 8" />
            <polygon points="80,24 82,26 80,28 78,26" fill="#ffd700" />
            <polygon points="136,80 134,82 132,80 134,78" fill="#ffd700" />
            <polygon points="24,80 26,82 28,80 26,78" fill="#ffd700" />
          </g>

          <!-- Holo Prism Wireframe -->
          <polygon points="80,18 106,54 80,94 54,54" fill="none" stroke="rgba(255, 26, 64, 0.5)" stroke-dasharray="3 3" />
          <polygon points="80,24 100,54 80,88 60,54" fill="none" stroke="rgba(255, 215, 0, 0.3)" />

          <!-- Centerpiece: Hidden Blade & Laurel Restraint Wings -->
          <g filter="url(#glyphGlow1)">
            <path d="M 77 26 L 80 18 L 83 26 L 83 68 L 77 68 Z" fill="url(#glyphCrimson)" />
            <line x1="80" y1="22" x2="80" y2="66" stroke="#ffffff" stroke-width="1" />
            <rect x="66" y="68" width="28" height="4" rx="1" fill="url(#glyphGold)" />
            <rect x="78" y="72" width="4" height="12" fill="#ff1a40" />
            <polygon points="76,84 84,84 80,92" fill="url(#glyphGold)" />

            <!-- Laurel Wings of Restraint -->
            <path d="M 72 38 C 58 42, 52 56, 56 70 C 61 61, 67 54, 73 50 Z" fill="url(#glyphGold)" opacity="0.9" />
            <path d="M 88 38 C 102 42, 108 56, 104 70 C 99 61, 93 54, 87 50 Z" fill="url(#glyphGold)" opacity="0.9" />
            <path d="M 73 52 C 63 60, 60 74, 66 84 C 68 76, 71 69, 74 63 Z" fill="url(#glyphGold)" opacity="0.75" />
            <path d="M 87 52 C 97 60, 100 74, 94 84 C 92 76, 89 69, 86 63 Z" fill="url(#glyphGold)" opacity="0.75" />
          </g>

          <!-- Curved Latin Title along Arc -->
          <text fill="#ff6b8b" font-size="7" font-weight="700" letter-spacing="1.4" font-family="'JetBrains Mono', monospace">
            <textPath href="#tenetPath1" startOffset="50%" text-anchor="middle">LEX I // MORTIS INNOCENTIS</textPath>
          </text>
        </svg>
      </div>
    `;
  } else if (index === 1) {
    // Tenet II: Stealth / The Shrouded Cowl (Animus Cyan & Electric Violet)
    return `
      <div class="tenet-holo-glyph-wrapper" data-tenet="2">
        <div class="holo-scanline-bar"></div>
        <svg viewBox="0 0 160 160" class="svg-tenet-glyph" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="tenetPath2" d="M 16 80 A 64 64 0 0 0 144 80" />
            <linearGradient id="glyphCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#a6f9ff" />
              <stop offset="50%" stop-color="#00f0ff" />
              <stop offset="100%" stop-color="#0066aa" />
            </linearGradient>
            <radialGradient id="glyphAura2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(0, 240, 255, 0.25)" />
              <stop offset="70%" stop-color="rgba(0, 240, 255, 0.05)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="glyphGlow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Ambient Aura -->
          <circle cx="80" cy="80" r="74" fill="url(#glyphAura2)" class="holo-aura" />

          <!-- HUD Corner Targeting Brackets -->
          <g stroke="rgba(0, 240, 255, 0.5)" stroke-width="1.2" fill="none">
            <path d="M 14 26 L 14 14 L 26 14" />
            <path d="M 146 26 L 146 14 L 134 14" />
            <path d="M 14 134 L 14 146 L 26 146" />
            <path d="M 146 134 L 146 146 L 134 146" />
          </g>

          <!-- Outer Rotating Cipher Ring (CW) -->
          <g class="holo-ring-outer">
            <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(0, 240, 255, 0.25)" stroke-dasharray="3 6" />
            <circle cx="80" cy="80" r="66" fill="none" stroke="url(#glyphCyan)" stroke-width="1.5" stroke-dasharray="18 4 6 4 30 4 6 4" />
            <polygon points="80,5 76,14 84,14" fill="#a6f9ff" />
            <circle cx="126.6" cy="33.4" r="1.5" fill="#00f0ff" />
            <circle cx="33.4" cy="33.4" r="1.5" fill="#00f0ff" />
          </g>

          <!-- Inner Counter-Rotating Reticle Ring (CCW) -->
          <g class="holo-ring-inner">
            <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(170, 59, 255, 0.45)" stroke-width="1" stroke-dasharray="8 6 14 6" />
            <polygon points="80,24 82,26 80,28 78,26" fill="#aa3bff" />
            <polygon points="136,80 134,82 132,80 134,78" fill="#aa3bff" />
            <polygon points="24,80 26,82 28,80 26,78" fill="#aa3bff" />
          </g>

          <!-- Optical Mirage Hexagon -->
          <polygon points="80,18 108,34 108,66 80,82 52,66 52,34" fill="none" stroke="rgba(0, 240, 255, 0.35)" stroke-dasharray="4 4" />

          <!-- Centerpiece: Shrouded Hood Silhouette & Gaze -->
          <g filter="url(#glyphGlow2)">
            <path d="M 80 24
                     C 88 27, 98 38, 102 52
                     C 106 64, 104 78, 110 88
                     C 102 85, 96 78, 92 70
                     C 88 74, 84 78, 80 80
                     C 76 78, 72 74, 68 70
                     C 64 78, 58 85, 50 88
                     C 56 78, 54 64, 58 52
                     C 62 38, 72 27, 80 24 Z"
                  fill="url(#glyphCyan)" />

            <!-- Dark Face Void -->
            <path d="M 72 46 C 76 42, 84 42, 88 46 C 92 56, 88 68, 80 72 C 72 68, 68 56, 72 46 Z" fill="#060d19" />
            <!-- Eagle Vision Gaze -->
            <polygon points="76,54 84,54 80,57" fill="#00f0ff" />
            <circle cx="80" cy="55.5" r="1.2" fill="#ffffff" />

            <!-- Crowd Mirage Waves (Concentric Ellipses) -->
            <ellipse cx="80" cy="90" rx="26" ry="6" fill="none" stroke="rgba(0, 240, 255, 0.55)" stroke-dasharray="4 4" />
            <ellipse cx="80" cy="95" rx="38" ry="8" fill="none" stroke="rgba(170, 59, 255, 0.4)" stroke-dasharray="3 6" />
          </g>

          <!-- Curved Latin Title along Arc -->
          <text fill="#00f0ff" font-size="7" font-weight="700" letter-spacing="1.4" font-family="'JetBrains Mono', monospace">
            <textPath href="#tenetPath2" startOffset="50%" text-anchor="middle">LEX II // UMBRA ET LUX</textPath>
          </text>
        </svg>
      </div>
    `;
  } else {
    // Tenet III: Brotherhood / Eternal Oath & Sacred Crest (Pure Isu Gold & Crimson)
    return `
      <div class="tenet-holo-glyph-wrapper" data-tenet="3">
        <div class="holo-scanline-bar"></div>
        <svg viewBox="0 0 160 160" class="svg-tenet-glyph" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="tenetPath3" d="M 16 80 A 64 64 0 0 0 144 80" />
            <linearGradient id="glyphGold3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff8a6" />
              <stop offset="45%" stop-color="#ffd700" />
              <stop offset="100%" stop-color="#c48600" />
            </linearGradient>
            <radialGradient id="glyphAura3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(255, 215, 0, 0.28)" />
              <stop offset="70%" stop-color="rgba(255, 215, 0, 0.05)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="glyphGlow3" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Ambient Aura -->
          <circle cx="80" cy="80" r="74" fill="url(#glyphAura3)" class="holo-aura" />

          <!-- HUD Corner Targeting Brackets -->
          <g stroke="rgba(255, 215, 0, 0.5)" stroke-width="1.2" fill="none">
            <path d="M 14 26 L 14 14 L 26 14" />
            <path d="M 146 26 L 146 14 L 134 14" />
            <path d="M 14 134 L 14 146 L 26 146" />
            <path d="M 146 134 L 146 146 L 134 146" />
          </g>

          <!-- Outer Rotating Cipher Ring (CW) -->
          <g class="holo-ring-outer">
            <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255, 215, 0, 0.25)" stroke-dasharray="3 6" />
            <circle cx="80" cy="80" r="66" fill="none" stroke="url(#glyphGold3)" stroke-width="1.5" stroke-dasharray="20 4 6 4 20 4 6 4" />
            <polygon points="80,5 76,14 84,14" fill="#fff8a6" />
            <circle cx="126.6" cy="33.4" r="1.5" fill="#ffd700" />
            <circle cx="33.4" cy="33.4" r="1.5" fill="#ffd700" />
          </g>

          <!-- Inner Counter-Rotating Reticle Ring (CCW) -->
          <g class="holo-ring-inner">
            <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(255, 42, 85, 0.45)" stroke-width="1" stroke-dasharray="6 8 12 8" />
            <polygon points="80,24 82,26 80,28 78,26" fill="#ff2a55" />
            <polygon points="136,80 134,82 132,80 134,78" fill="#ff2a55" />
            <polygon points="24,80 26,82 28,80 26,78" fill="#ff2a55" />
          </g>

          <!-- Interlocking Ring of Fraternal Sanctuary -->
          <circle cx="80" cy="58" r="28" fill="none" stroke="rgba(255, 215, 0, 0.6)" stroke-width="1.5" stroke-dasharray="16 4 8 4" />

          <!-- Centerpiece: Master Brotherhood Crest & Isu Core -->
          <g filter="url(#glyphGlow3)">
            <path d="M 80 20
                     L 95 48 L 115 84
                     C 111 84, 103 85, 97 89
                     C 93 92, 89 98, 85 106
                     L 80 66
                     L 75 106
                     C 71 98, 67 92, 63 89
                     C 57 85, 49 84, 45 84
                     L 65 48 Z"
                  fill="url(#glyphGold3)" />

            <!-- Central Isu Memory Shard -->
            <polygon points="80,48 86,60 80,70 74,60" fill="#ffffff" />
            <circle cx="80" cy="60" r="1.5" fill="#ff1a40" />

            <!-- Lower Blade Tails -->
            <path d="M 63 94 C 59 104, 61 116, 73 124 C 76 120, 75 114, 73 108 Z" fill="#ffd700" opacity="0.95" />
            <path d="M 97 94 C 101 104, 99 116, 87 124 C 84 120, 85 114, 87 108 Z" fill="#ffd700" opacity="0.95" />
            <polygon points="80,116 83,126 80,132 77,126" fill="#fff8a6" />
          </g>

          <!-- Curved Latin Title along Arc -->
          <text fill="#ffd700" font-size="7" font-weight="700" letter-spacing="1.4" font-family="'JetBrains Mono', monospace">
            <textPath href="#tenetPath3" startOffset="50%" text-anchor="middle">LEX III // FRATERNITAS AETERNA</textPath>
          </text>
        </svg>
      </div>
    `;
  }
}

export class CreedController {
  constructor() {
    this.tabsContainer = document.getElementById('tenets-tabs');
    this.contentContainer = document.getElementById('tenet-content');
    this.leapBtn = document.getElementById('leap-of-faith-btn');
    this.landingZone = document.getElementById('hay-landing-zone');
    this.currentTenetIndex = 0;
  }

  init() {
    if (!this.tabsContainer || !this.contentContainer) return;
    this.renderTenets();
    this.setupLeapOfFaith();
  }

  renderTenets() {
    this.tabsContainer.innerHTML = TENETS_DATA.map((t, idx) => `
      <button class="tenet-tab-btn ${idx === this.currentTenetIndex ? 'active' : ''}" data-idx="${idx}">
        <span class="tenet-num">TENET ${t.number}</span>
        <span class="tenet-short">${t.title.split(',')[0]}</span>
      </button>
    `).join('');

    this.tabsContainer.querySelectorAll('.tenet-tab-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => audio.playHoverChirp());
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (idx !== this.currentTenetIndex) {
          audio.playClick();
          this.switchTenet(idx);
        }
      });
    });

    this.showTenetDetail(this.currentTenetIndex);
  }

  switchTenet(index) {
    this.currentTenetIndex = index;
    this.tabsContainer.querySelectorAll('.tenet-tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    this.contentContainer.classList.add('transitioning');
    setTimeout(() => {
      this.showTenetDetail(index);
      this.contentContainer.classList.remove('transitioning');
    }, 150);
  }

  showTenetDetail(index) {
    const t = TENETS_DATA[index];
    if (!t) return;

    this.contentContainer.innerHTML = `
      <div class="tenet-card">
        <div class="tenet-seal-wrapper">
          ${getHolographicGlyph(index)}
        </div>

        <div class="tenet-info">
          <div class="tenet-header">
            <span class="tenet-number-badge">TENET // 0${index + 1}</span>
            <span class="tenet-latin">${t.latin}</span>
          </div>
          <h3 class="tenet-title">"${t.title}"</h3>
          
          <div class="tenet-rule-box">
            <h4 class="box-label">// SACRED DOCTRINE</h4>
            <p class="doctrine-text">${t.creedLaw}</p>
          </div>

          <div class="tenet-history-box">
            <h4 class="box-label">// HISTORICAL APPLICATION</h4>
            <p class="history-text">${t.history}</p>
          </div>
        </div>
      </div>
    `;
  }

  setupLeapOfFaith() {
    if (!this.leapBtn) return;

    this.leapBtn.addEventListener('mouseenter', () => audio.playHoverChirp());
    this.leapBtn.addEventListener('click', () => {
      this.performLeapOfFaith();
    });
  }

  performLeapOfFaith() {
    this.leapBtn.disabled = true;
    this.leapBtn.classList.add('diving');

    // 1. Trigger Leap of Faith Procedural Audio (wind rush + eagle cry + landing impact)
    audio.playLeapOfFaith(() => {
      this.onLanded();
    });

    // 2. Add full screen plummet effect overlay
    const overlay = document.createElement('div');
    overlay.className = 'leap-dive-overlay';
    overlay.innerHTML = `
      <div class="speed-lines"></div>
      <div class="altimeter-hud">
        <div class="altitude-readout" id="alt-counter">384 m</div>
        <div class="alt-label">VIEWPOINT DESCENT SPEED: 198 KM/H</div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Altitude counter rapid decrease
    let alt = 384;
    const altEl = overlay.querySelector('#alt-counter');
    const altInterval = setInterval(() => {
      alt -= 24;
      if (alt <= 0) {
        alt = 0;
        clearInterval(altInterval);
      }
      if (altEl) altEl.textContent = `${alt} m`;
    }, 100);

    // Camera drop smooth scroll to bottom landing zone
    setTimeout(() => {
      if (this.landingZone) {
        this.landingZone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);

    // Clean overlay on landing
    setTimeout(() => {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
    }, 1850);
  }

  onLanded() {
    this.leapBtn.disabled = false;
    this.leapBtn.classList.remove('diving');

    if (!this.landingZone) return;

    // Trigger feather particles & hay impact shockwave
    this.spawnHayParticles();

    // Trigger Synchronization Achieved Banner
    const banner = document.getElementById('sync-achieved-banner');
    if (banner) {
      banner.classList.add('visible');
      setTimeout(() => {
        banner.classList.remove('visible');
      }, 4500);
    }
  }

  spawnHayParticles() {
    const container = document.getElementById('feather-container');
    if (!container) return;

    container.innerHTML = '';
    // Generate 30 floating white eagle feathers & golden straw shards
    for (let i = 0; i < 35; i++) {
      const feather = document.createElement('div');
      feather.className = Math.random() > 0.4 ? 'floating-feather' : 'floating-straw';
      feather.style.left = `${Math.random() * 90 + 5}%`;
      feather.style.top = `${Math.random() * 40 + 30}%`;
      feather.style.animationDelay = `${Math.random() * 0.6}s`;
      feather.style.animationDuration = `${Math.random() * 2 + 2.5}s`;
      container.appendChild(feather);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  }
}
