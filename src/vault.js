// Project Animus - Codex & Artifact Vault Controller
import { audio } from './audio.js';

export const ARTIFACTS_DATA = [
  {
    id: 'apple',
    name: "The Apple of Eden (Piece of Eden #01)",
    category: "PRECURSOR (ISU) TECHNOLOGY",
    subtitle: "High-Frequency Neuro-Synaptic Matrix",
    image: "/assets/apple_of_eden.jpg",
    actionName: "UNLEASH ISU PULSE",
    lore: "Forged by the First Civilization (Homo Sapiens Divinus) before the Great Catastrophe. Capable of projecting illusions, manipulating the neuro-transmitters of humanity, and storing vast encyclopedic volumes of precursor knowledge. Wielded by Altaïr Ibn-La'Ahad and Ezio Auditore da Firenze to access the subterranean Vaults.",
    abstergoClassification: "LEVEL 5 TOP SECRET // ABSTERGO EYE-SATELLITE PAYLOAD",
    specs: [
      { label: "Material Composition", value: "Unknown Isu Gold-Titanium Electrum" },
      { label: "Radiated Frequency", value: "432.8 THz (Sub-harmonic Neural Resonance)" },
      { label: "Cognitive Range", value: "Direct Line of Sight to Planetary Broadcast" },
      { label: "Last Verified Location", value: "Abstergo Core Research Facility, Rome" }
    ]
  },
  {
    id: 'blade',
    name: "Dual Hidden Blade Mechanism",
    category: "BROTHERHOOD SIGNATURE ARSENAL",
    subtitle: "Reverse-Engineered Altaïr-Da Vinci Specifications",
    image: "/assets/hidden_blade.jpg",
    actionName: "EXTEND BLADE (TEST FIRE)",
    lore: "The sacred and lethal weapon of the Assassin Brotherhood. Originally designed by Darius in 465 BCE, requiring amputation of the left ring finger. Redesigned by Altaïr Ibn-La'Ahad using a ring-pulley trigger, and later upgraded by Leonardo da Vinci into a dual-action system with secondary firing channels (Hidden Gun, Poison Darts).",
    abstergoClassification: "ABSTERGO SECURITY DIRECTIVE // PROJECT AURORA",
    specs: [
      { label: "Blade Alloy", value: "Folded Damascus Carbon Steel / Aerospace Titanium" },
      { label: "Deployment Speed", value: "23 Milliseconds (Spring Tension 180 N)" },
      { label: "Actuation Method", value: "Tendon Ring Pulley & Biomagnetic Trigger" },
      { label: "Secondary Modules", value: "Micro-Ballistics, Poison Reservoir, Pivot Lock" }
    ]
  },
  {
    id: 'codex',
    name: "Altaïr's Codex Folios",
    category: "ANCIENT BROTHERHOOD RELIC",
    subtitle: "Parchment Manuscript with Concealed Isu Cipher",
    image: "/assets/codex.jpg",
    actionName: "REVEAL ISU CIPHER LENS",
    lore: "Written across thirty parchment pages by Mentor Altaïr Ibn-La'Ahad during his seclusion in Masyaf. Contains prophetic visions granted by the Apple, radical tactical reforms for the Brotherhood, anatomical weak points for swift assassinations, and the precursor star map hidden beneath a multi-layered cryptographic cipher.",
    abstergoClassification: "ARCHIVE CLASSIFICATION // HISTORICAL RECONSTRUCTION",
    specs: [
      { label: "Age & Provenance", value: "circa 1205–1247 CE // Masyaf Mountain Keep" },
      { label: "Language", value: "Levantine Arabic, Venetian Cipher & Isu Runes" },
      { label: "Known Pages", value: "30 Folios (Reconstructed by Ezio Auditore)" },
      { label: "Hidden Watermark", value: "Global Precursor Vault Coordinates" }
    ]
  }
];

export class VaultController {
  constructor() {
    this.container = document.getElementById('vault-grid');
    this.modal = document.getElementById('vault-modal');
    this.activeArtifact = null;
  }

  init() {
    if (!this.container) return;
    this.renderVault();
    this.setupModal();
  }

  renderVault() {
    this.container.innerHTML = ARTIFACTS_DATA.map((art) => `
      <div class="artifact-card" data-id="${art.id}">
        <div class="artifact-img-frame">
          <img src="${art.image}" alt="${art.name}" class="artifact-img" loading="lazy" />
          <div class="artifact-glow-ring"></div>
          <div class="artifact-reticle"></div>
        </div>

        <div class="artifact-content">
          <div class="artifact-meta">
            <span class="artifact-category">${art.category}</span>
            <span class="artifact-badge">CLASSIFIED</span>
          </div>

          <h3 class="artifact-title">${art.name}</h3>
          <p class="artifact-sub">${art.subtitle}</p>

          <div class="artifact-actions">
            <button class="artifact-interact-btn" data-action="${art.id}">
              <span class="btn-icon">⚡</span>
              <span>${art.actionName}</span>
            </button>
            <button class="artifact-inspect-btn" data-inspect="${art.id}">
              <span>TERMINAL DOSSIER</span>
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners
    this.container.querySelectorAll('.artifact-interact-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => audio.playHoverChirp());
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.action;
        this.triggerArtifactAction(id, btn);
      });
    });

    this.container.querySelectorAll('.artifact-inspect-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => audio.playHoverChirp());
      btn.addEventListener('click', () => {
        audio.playClick();
        const id = btn.dataset.inspect;
        const art = ARTIFACTS_DATA.find(a => a.id === id);
        if (art) this.openModal(art);
      });
    });

    // Also card click opens inspect
    this.container.querySelectorAll('.artifact-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const id = card.dataset.id;
        const art = ARTIFACTS_DATA.find(a => a.id === id);
        if (art) {
          audio.playClick();
          this.openModal(art);
        }
      });
    });
  }

  triggerArtifactAction(id, btn) {
    if (id === 'apple') {
      audio.playApplePulse();
      // Visual shockwave effect on page
      this.triggerAppleShockwave();
      btn.classList.add('pulsing');
      setTimeout(() => btn.classList.remove('pulsing'), 1500);
    } else if (id === 'blade') {
      audio.playHiddenBlade();
      // Snap animation
      btn.classList.add('snapping');
      setTimeout(() => btn.classList.remove('snapping'), 600);
    } else if (id === 'codex') {
      audio.playClick();
      // Toggle UV decoder overlay on the card
      const card = btn.closest('.artifact-card');
      if (card) {
        card.classList.toggle('uv-active');
        audio.playGlitch();
      }
    }
  }

  triggerAppleShockwave() {
    const shockwave = document.createElement('div');
    shockwave.className = 'isu-shockwave-ring';
    document.body.appendChild(shockwave);
    setTimeout(() => {
      if (shockwave.parentNode) shockwave.parentNode.removeChild(shockwave);
    }, 1200);
  }

  setupModal() {
    if (!this.modal) return;
    const closeBtn = this.modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(artifact) {
    if (!this.modal) return;
    this.activeArtifact = artifact;
    const modalBody = this.modal.querySelector('.modal-body-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-dossier-grid">
        <div class="modal-img-col">
          <div class="modal-img-container">
            <img src="${artifact.image}" alt="${artifact.name}" class="modal-relic-img" />
            <div class="modal-scan-bar"></div>
          </div>
          <div class="modal-classification-box">
            <div class="class-label">ABSTERGO SECURITY DIRECTIVE</div>
            <div class="class-val">${artifact.abstergoClassification}</div>
          </div>
        </div>

        <div class="modal-info-col">
          <span class="modal-category">${artifact.category}</span>
          <h2 class="modal-title">${artifact.name}</h2>
          <p class="modal-subtitle">${artifact.subtitle}</p>

          <div class="modal-lore-box">
            <h4 class="lore-header">// DECRYPTED HISTORICAL RECORD</h4>
            <p class="lore-body">${artifact.lore}</p>
          </div>

          <div class="modal-specs-list">
            <h4 class="specs-header">// TECHNICAL SPECIFICATIONS</h4>
            ${artifact.specs.map(spec => `
              <div class="spec-row">
                <span class="spec-k">${spec.label}</span>
                <span class="spec-v">${spec.value}</span>
              </div>
            `).join('')}
          </div>

          <div class="modal-footer-action">
            <button class="modal-action-btn" id="modal-trigger-action">
              <span>INITIALIZE SYNAPSE TRIGGER</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const actionBtn = modalBody.querySelector('#modal-trigger-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        this.triggerArtifactAction(artifact.id, actionBtn);
      });
    }

    this.modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  closeModal() {
    if (!this.modal) return;
    audio.playClick();
    this.modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}
