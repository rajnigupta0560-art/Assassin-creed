// Project Animus - Brotherhood Timeline (Eras of the Creed)
import { audio } from './audio.js';

export const ASSASSINS_DATA = [
  {
    id: 'altair',
    name: "Altaïr Ibn-La'Ahad",
    title: "Mentor of the Levantine Brotherhood",
    era: "1191 CE // Third Crusade",
    location: "Masyaf, Jerusalem, Acre, Damascus",
    quote: "Nothing is true, everything is permitted. To recognize that laws arise not from divinity, but from reason.",
    quoteTranslation: "First Tenet realization // Masyaf Archives",
    weapon: "Original Hidden Blade (Amputated Ring Finger), Sword of Altaïr, Throwing Knives",
    weaponIcon: "dagger",
    syncRate: 100,
    dnaIntegrity: "99.9%",
    target: "Robert de Sablé & Al Mualim (Grand Masters)",
    affiliation: "Levantine Assassins (Syria)",
    bio: "The legendary Assassin whose redemption transformed the Creed. Reclaimed the Apple of Eden, wrote the foundational Codex pages, redesigned the Hidden Blade mechanism, and established the library vault of Masyaf.",
    image: "/assets/altair.jpg",
    tags: ["Holy Land", "Third Crusade", "Author of Codex", "Apple of Eden"]
  },
  {
    id: 'ezio',
    name: "Ezio Auditore da Firenze",
    title: "The Prophet & Italian Grand Master",
    era: "1476–1511 CE // Italian Renaissance",
    location: "Florence, Venice, Rome, Constantinople",
    quote: "Requiescat in pace. My story is one of many thousands, and the world will not suffer if it ends too soon.",
    quoteTranslation: "Final Address to Desmond Miles // Vault of Masyaf",
    weapon: "Dual Hidden Blades, Hidden Gun, Poison Darts, Armor of Altaïr",
    weaponIcon: "crosshairs",
    syncRate: 100,
    dnaIntegrity: "99.8%",
    target: "Rodrigo Borgia (Pope Alexander VI) & Cesare Borgia",
    affiliation: "Italian Brotherhood & Ottoman Guild",
    bio: "Rising from family tragedy in Florence, Ezio rebuilt the Brotherhood across Italy and liberated Rome from the despotic Borgia dynasty. Guided by Leonardo da Vinci's inventions, he unraveled the precursor prophecy of the Isu.",
    image: "/assets/ezio.jpg",
    tags: ["Renaissance", "Venice Canals", "Rome Liberation", "Precursor Messenger"]
  },
  {
    id: 'edward',
    name: "Edward Kenway",
    title: "Captain of the Jackdaw & Pirate Master",
    era: "1715 CE // Golden Age of Piracy",
    location: "West Indies (Nassau, Havana, Kingston)",
    quote: "For years I've been rushing around, taking whatever I fancied. Here I am... with a pocket full of gold and a ghost by my side.",
    quoteTranslation: "Great Inagua Logbook // Observation on the Creed",
    weapon: "Dual Steel Cutlasses, Quadruple Flintlock Pistols, Rope Dart, Blowpipe",
    weaponIcon: "ship",
    syncRate: 100,
    dnaIntegrity: "99.5%",
    target: "Grand Master Laureano de Torres & Woodes Rogers",
    affiliation: "West Indies Brotherhood & Pirate Republic",
    bio: "A roguish Welsh privateer who seized command of the legendary Jackdaw. Navigated betrayal on the Caribbean high seas, uncovered the ancient Precursor Observatory, and dedicated his life to the Brotherhood's cause.",
    image: "/assets/edward.jpg",
    tags: ["High Seas", "Jackdaw", "Precursor Observatory", "Pirate Republic"]
  },
  {
    id: 'connor-arno',
    name: "Connor Kenway & Arno Dorian",
    title: "Champions of Liberty & Fraternity",
    era: "1776–1789 CE // Age of Revolutions",
    location: "Colonial America & Revolutionary Paris",
    quote: "Connor: 'My cause is justice, and freedom for all.' // Arno: 'The Creed does not command us to be free. It commands us to be wise.'",
    quoteTranslation: "Dual Animus Sequence Sync // Revolutions Nexus",
    weapon: "Assassin Tomahawk, Phantom Blade (Wrist Crossbow), Revolutionary Rapier, Bow",
    weaponIcon: "axe",
    syncRate: 100,
    dnaIntegrity: "99.2%",
    target: "Charles Lee & François-Thomas Germain (Grand Masters)",
    affiliation: "Colonial Brotherhood & Parisian Guild",
    bio: "Bridging the New World and Old World revolutions. Ratonhnhaké:ton (Connor) safeguarded the Frontier against colonial Templars, while Arno Dorian navigated the bloody Reign of Terror to purge the extremist Parisian Order.",
    image: "/assets/connor_arno.jpg",
    tags: ["American Frontier", "Notre-Dame Paris", "Phantom Blade", "Revolution"]
  },
  {
    id: 'bayek',
    name: "Bayek of Siwa",
    title: "The Last Medjay & Founder of The Hidden Ones",
    era: "49 BCE // Ptolemaic Egypt",
    location: "Siwa Oasis, Alexandria, Giza Pyramids, Memphis",
    quote: "From darkness, we have come. And in darkness, we shall stay. We are the Hidden Ones.",
    quoteTranslation: "Oath of the Hidden Ones // Alexandria Shore",
    weapon: "Khopesh of Siwa, Medjay Predator Bow, First Hidden Blade, Companion Eagle Senu",
    weaponIcon: "feather",
    syncRate: 100,
    dnaIntegrity: "99.7%",
    target: "Order of the Ancients (The Snake, The Lion, The Jackal)",
    affiliation: "Founders of The Hidden Ones",
    bio: "Protector of the people of Egypt. Following the tragic murder of his son Khemu, Bayek and his wife Aya (Amunet) dismantled the Order of the Ancients, established the ritual severing of the finger, and ignited the Brotherhood of Assassins.",
    image: "/assets/bayek.jpg",
    tags: ["Ancient Egypt", "Origins", "Eagle Senu", "Birth of Creed"]
  }
];

export class TimelineController {
  constructor() {
    this.currentIndex = 0;
    this.container = document.getElementById('timeline-viewport');
    this.navContainer = document.getElementById('timeline-nav');
    this.detailContainer = document.getElementById('timeline-detail');
  }

  init() {
    if (!this.container || !this.navContainer) return;
    this.renderNav();
    this.renderAssassin(this.currentIndex);
  }

  renderNav() {
    this.navContainer.innerHTML = ASSASSINS_DATA.map((assassin, idx) => `
      <button class="era-tab-btn ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}">
        <span class="era-year">${assassin.era.split('//')[0].trim()}</span>
        <span class="era-name">${assassin.name.split(' ')[0]}</span>
      </button>
    `).join('');

    this.navContainer.querySelectorAll('.era-tab-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => audio.playHoverChirp());
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index, 10);
        if (idx !== this.currentIndex) {
          audio.playClick();
          audio.playGlitch();
          this.switchAssassin(idx);
        }
      });
    });
  }

  switchAssassin(index) {
    this.currentIndex = index;
    // Update nav buttons
    this.navContainer.querySelectorAll('.era-tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    // Fade out and in
    this.detailContainer.classList.add('transitioning');
    setTimeout(() => {
      this.renderAssassin(index);
      this.detailContainer.classList.remove('transitioning');
    }, 200);
  }

  renderAssassin(index) {
    const data = ASSASSINS_DATA[index];
    if (!data) return;

    this.detailContainer.innerHTML = `
      <div class="assassin-card-grid">
        <!-- Visual Portrait with 3D Tilt Frame -->
        <div class="portrait-card-wrapper" id="portrait-wrapper">
          <div class="portrait-card" id="portrait-card">
            <img src="${data.image}" alt="${data.name}" class="portrait-img" loading="lazy" />
            <div class="portrait-scanline-overlay"></div>
            <div class="portrait-hud-corners">
              <span class="hud-corner top-left"></span>
              <span class="hud-corner top-right"></span>
              <span class="hud-corner bottom-left"></span>
              <span class="hud-corner bottom-right"></span>
            </div>
            <div class="portrait-sync-badge">
              <span class="sync-dot"></span>
              <span class="sync-label">DNA SYNC 100%</span>
            </div>
            <div class="portrait-era-tag">${data.era}</div>
          </div>
        </div>

        <!-- Comprehensive Dossier Info -->
        <div class="assassin-dossier">
          <div class="dossier-header">
            <div class="dossier-subhead">
              <span class="abstergo-tag">// MEMORY SEQUENCE #0${index + 1}</span>
              <span class="dna-tag">INTEGRITY: ${data.dnaIntegrity}</span>
            </div>
            <h3 class="assassin-name">${data.name}</h3>
            <p class="assassin-title">${data.title}</p>
          </div>

          <!-- Synchronization Progress Gauge -->
          <div class="sync-meter-box">
            <div class="sync-meter-header">
              <span class="sync-title">GENETIC SYNCHRONIZATION</span>
              <span class="sync-pct" id="sync-counter">0%</span>
            </div>
            <div class="sync-meter-track">
              <div class="sync-meter-fill" id="sync-bar" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Iconic Quote Box -->
          <div class="quote-box" id="quote-box">
            <div class="quote-quote-icon">“</div>
            <blockquote class="quote-text">${data.quote}</blockquote>
            <cite class="quote-cite">— ${data.quoteTranslation}</cite>
          </div>

          <!-- Intel Attributes Grid -->
          <div class="dossier-stats-grid">
            <div class="stat-item">
              <span class="stat-label">THEATER OF WAR</span>
              <span class="stat-val highlight-cyan">${data.location}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">SIGNATURE ARSENAL</span>
              <span class="stat-val highlight-gold">${data.weapon}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">PRIMARY TARGETS</span>
              <span class="stat-val highlight-crimson target-indicator">${data.target}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">BROTHERHOOD FACTION</span>
              <span class="stat-val">${data.affiliation}</span>
            </div>
          </div>

          <!-- Historical Lore Summary -->
          <p class="dossier-bio">${data.bio}</p>

          <!-- Tags -->
          <div class="dossier-tags">
            ${data.tags.map(tag => `<span class="dossier-pill">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    // Animate sync meter to 100%
    setTimeout(() => {
      const syncBar = document.getElementById('sync-bar');
      const syncCounter = document.getElementById('sync-counter');
      if (syncBar) syncBar.style.width = '100%';
      if (syncCounter) {
        let count = 0;
        const interval = setInterval(() => {
          count += 4;
          if (count >= 100) {
            count = 100;
            clearInterval(interval);
          }
          syncCounter.textContent = `${count}%`;
        }, 20);
      }
    }, 50);

    // Attach 3D tilt interaction to portrait
    this.attach3DTilt();
  }

  attach3DTilt() {
    const wrapper = document.getElementById('portrait-wrapper');
    const card = document.getElementById('portrait-card');
    if (!wrapper || !card) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}
