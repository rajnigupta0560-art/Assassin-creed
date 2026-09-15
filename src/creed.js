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
          <div class="brotherhood-seal">
            <svg viewBox="0 0 100 100" class="seal-svg">
              <polygon points="50,10 88,85 12,85" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,2"/>
              <path d="M50,15 L78,75 L60,75 L50,55 L40,75 L22,75 Z" fill="currentColor"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="8,4"/>
            </svg>
            <div class="seal-inscription">${t.seal}</div>
          </div>
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
