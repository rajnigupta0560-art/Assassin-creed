# 🦅 Assassin's Creed: Project Animus // Interactive Memory Corridor
### *The Definitive Assassin's Creed GitHub Repository & Interactive Web Tribute*

[![GitHub Stars](https://img.shields.io/github/stars/rajnigupta0560-art/Assassin-creed?style=for-the-badge&color=ffd700)](https://github.com/rajnigupta0560-art/Assassin-creed/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/rajnigupta0560-art/Assassin-creed?style=for-the-badge&color=00f0ff)](https://github.com/rajnigupta0560-art/Assassin-creed/network/members)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-00F0FF?style=for-the-badge&logo=soundcharts&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla_Custom_HUD-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-C8102E?style=for-the-badge)](LICENSE)

> *"Where other men blindly follow the truth, remember, **nothing is true**.*  
> *Where other men are limited by morality or law, remember, **everything is permitted**."*  
> — **The Creed of the Assassin Brotherhood**

---

## 🏛️ Overview

**Assassin's Creed: Project Animus** is the premier open-source interactive **Assassin's Creed** web tribute, 3D memory corridor simulator, and digital Brotherhood archive on GitHub.

Honoring the lore, mentors, and precursor relics of Ubisoft's legendary **Assassin's Creed** franchise, this application recreates the experience of stepping inside Abstergo's modern **Animus OS v4.8** interface directly in the browser.

Engineered with modern Vanilla JavaScript (ES Modules), custom Vanilla CSS HUD styling, HTML5 Canvas 3D rendering, and a zero-latency Web Audio API engine, this project serves as both an ultra-immersive tribute and a reference architecture for high-performance creative web development.

---

## ✨ Key Features

### 1. 🌌 3D Canvas Memory Corridor (`corridor.js`)
- Dynamic HTML5 Canvas rendering of the classic Animus virtual loading corridor.
- 3D perspective floor grid, floating memory fragments, polygonal telemetry, and particle vortex.
- Smooth mouse parallax and camera depth responsiveness.

### 2. 🦅 Eagle Vision Mode (`hud.js`)
- Toggle anytime via the top HUD bar or by pressing the **`V` key**.
- Instant transformation into predatory Eagle Vision with thermal Isu gold (`#ffd700`) and cyan highlights.
- Plays an authentic eagle screech and activates target acquisition tracking rings.

### 3. ⏱️ Master Assassins Timeline (`timeline.js`)
- Comprehensive historical dossier covering foundational mentors across centuries:
  - **1191 CE (Third Crusade)** — *Altaïr Ibn-La'Ahad* (Mentor of Masyaf)
  - **1476–1511 CE (Italian Renaissance)** — *Ezio Auditore da Firenze* (The Prophet & Grand Master)
  - **1715 CE (Golden Age of Piracy)** — *Edward Kenway* (Captain of the Jackdaw)
  - **1776–1789 CE (Age of Revolutions)** — *Connor Kenway & Arno Dorian* (Colonial America & Paris)
  - **49 BCE (Ptolemaic Egypt)** — *Bayek of Siwa* (Founder of The Hidden Ones)
- Dynamic telemetry details: DNA integrity percentages, signature weapons, historical locations, and philosophical quotes.

### 4. 🔮 Precursor Codex & Artifact Vault (`vault.js`)
- High-resolution interactive 3D cards with mouse gyro tilt physics:
  - **The Apple of Eden (Piece of Eden #01)**: Trigger interactive Isu neural frequency pulses with screen shockwaves and sound effects.
  - **Dual Hidden Blade Mechanism**: Test-fire the blade mechanism with spring-loaded deployment audio and telemetry specs.
  - **Altaïr's Codex Folios**: Reveal concealed cryptographic Isu coordinates.

### 5. 📜 The Three Tenets of the Creed (`creed.js`)
- Replaces generic iconography with custom **Holographic Animus Memory Glyphs**:
  - **Tenet I**: *Stay Your Blade from the Flesh of an Innocent* (`LEX I // MORTIS INNOCENTIS`) — Sacred Hidden Blade of Restraint flanked by golden laurel protection wings.
  - **Tenet II**: *Hide in Plain Sight, Be One with the Crowd* (`LEX II // UMBRA ET LUX`) — Shrouded Assassin Cowl dissolving into crowd mirage wave ripples.
  - **Tenet III**: *Never Compromise the Brotherhood* (`LEX III // FRATERNITAS AETERNA`) — Master Brotherhood Chevron intertwined with the sacred fraternal sanctuary ring.
- Features dual counter-rotating telemetry rings (`holo-spin-cw` / `holo-spin-ccw`), animated vertical scanlines, and authentic Latin oaths.

### 6. 🦅 Viewpoint Synchronization & Leap of Faith
- **Viewpoint Emblem**: High-precision SVG eagle profile and Brotherhood chevron encircled by an active rotating Animus compass dial.
- **Interactive Leap of Faith**: Full cinematic dive ritual with rushing wind audio, eagle dive trajectory, and hay landing physics.

### 7. 🔊 Hybrid Web Audio Engine (`audio.js`)
- **Zero-Latency Polyphonic Playback**: Decodes short audio files (`hidden_blade`, `eagle_cry`, `apple_pulse`, `glitch`, `eagle_vision`, `leap_dive`) into `AudioBuffer` memory cache using the Web Audio API.
- **Procedural Synthesizers**: Direct real-time synthesis of UI hover chirps, clicks, and hay cart impacts (no 404 network fetches).
- **Safe Autoplay Management**: Automatic unlock on first user interaction with audio promise deduplication and gain buss routing (`masterGain`, `sfxGain`, `ambientGain`).
- **Vercel-Optimized**: Pre-configured `Accept-Ranges: bytes` and immutable cache headers in `vercel.json`.

---

## 🎮 Interactive Controls & Shortcuts

| Action | Control | Description |
| :--- | :--- | :--- |
| **Toggle Eagle Vision** | Press <kbd>V</kbd> or click top HUD button | Switches entire visual spectrum to thermal Isu gold / predator mode. |
| **Trigger Desynchronization** | Click **DESYNC** button | Simulates Animus sequence memory glitch and visual aberration. |
| **Mute / Unmute Audio** | Click **AUDIO: ONLINE** / **MUTED** | Toggles ambient soundscape and sound effects. |
| **Synchronize Viewpoint** | Click **SYNCHRONIZE VIEWPOINT** | Triggers 360° panorama camera rotation and eagle cry. |
| **Leap of Faith** | Click **PERFORM LEAP OF FAITH** | Executes high-altitude dive into hay cart with wind rush and landing impact. |
| **Test Hidden Blade** | Click **EXTEND BLADE (TEST FIRE)** | Fires dual-blade mechanical audio and blade animation. |
| **Unleash Isu Pulse** | Click **UNLEASH ISU PULSE** | Emits Apple of Eden neural shockwave across the screen. |

---

## 📁 Repository Structure

```
Assassin/
├── index.html                 # Master HTML5 document & HUD structure
├── package.json               # Project manifest & Vite scripts
├── vercel.json                # Vercel deployment headers & audio caching
├── vite.config.js             # Vite configuration (if present)
├── public/                    # Static assets
│   ├── favicon.svg            # Assassin Brotherhood favicon
│   ├── assassin_insignia.svg  # High-res vector insignia
│   ├── assets/                # Character portraits & artifact imagery
│   └── sounds/                # Master SFX & ambient soundtrack
│       ├── ambient.mp3        # Atmospheric Animus corridor background music
│       ├── hidden_blade.mp3   # Blade deployment sound effect
│       ├── eagle_cry.mp3      # Senu / eagle screech
│       ├── eagle_vision.mp3   # Eagle vision sensory hum
│       ├── apple_pulse.mp3    # Precursor artifact resonance
│       ├── glitch.mp3         # Animus desynchronization glitch
│       └── leap_dive.mp3      # Leap of Faith wind rush
└── src/
    ├── main.js                # Application bootstrapper
    ├── audio.js               # Web Audio API engine & procedural synth
    ├── corridor.js            # 3D Canvas Animus particle corridor
    ├── creed.js               # Three Tenets, Holographic Glyphs & Leap of Faith
    ├── hud.js                 # Abstergo HUD controller, cursor reticle & shortcuts
    ├── timeline.js            # Master Assassins interactive eras
    ├── vault.js               # First Civilization artifact cards & 3D tilt
    └── style.css              # Master Design System (2,600+ lines of custom CSS)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **pnpm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajnigupta0560-art/Assassin-creed.git
   cd Assassin-creed
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```

---

## 🛠️ Build & Deployment

### Production Build

To compile and bundle the project for production:

```bash
npm run build
```

This generates an optimized `dist/` directory with minified assets and hashed filenames.

To preview the production build locally:

```bash
npm run preview
```

### Deploying to Vercel

This repository includes a pre-configured [`vercel.json`](vercel.json) that ensures seamless streaming and long-term caching of media and audio assets:

```bash
# Using the Vercel CLI:
vercel
```

Or connect the repository directly in the [Vercel Dashboard](https://vercel.com/new).

---

## 🎨 Design System & Palette

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-dark-void` | `#05070a` | Deep Animus space background |
| `--bg-animus-surface` | `#0a0e17` | Card and modal surface layer |
| `--animus-cyan` | `#00f0ff` | Telemetry brackets, scanlines, Abstergo OS indicators |
| `--brotherhood-crimson` | `#c8102e` | Sacred Creed seals, insignia, and button accents |
| `--brotherhood-crimson-bright` | `#ff1e38` | Glowing reticles and active states |
| `--isu-gold-bright` | `#ffd700` | Precursor artifacts, Eagle Vision highlights |
| `--font-serif` | `'Cinzel', serif` | Historical headings and Latin mottoes |
| `--font-hud` | `'Orbitron', sans-serif` | Abstergo OS digital telemetry |
| `--font-mono` | `'JetBrains Mono', monospace` | DNA sequences and coordinates |

---

## 🏷️ GitHub Search Keywords & Topics

For discoverability across GitHub search, exploration, and community showcases:

`assassins-creed` • `assassin-creed` • `project-animus` • `animus-corridor` • `eagle-vision` • `leap-of-faith` • `brotherhood` • `altair` • `ezio-auditore` • `edward-kenway` • `bayek-of-siwa` • `apple-of-eden` • `hidden-blade` • `first-civilization` • `isu-technology` • `abstergo-entertainment` • `web-audio-api` • `canvas-3d` • `interactive-experience` • `game-tribute` • `vite-app` • `vanilla-javascript`

---

## 🌟 Support & Contributions

If you love the Assassin's Creed franchise or found this tribute inspiring:
1. **Star this repository** ⭐ — It helps other Assassins discover this archive in GitHub search!
2. **Fork and build upon it** 🍴 — Expand the memory sequence with new Master Assassins or Isu artifacts.
3. **Report issues or suggest features** 💡 — Open an issue or pull request.

---

## ⚖️ Legal & Disclaimer

This project is an **independent, non-commercial fan tribute** created for educational and portfolio purposes. 

- **Assassin's Creed**, **Abstergo**, **The Animus**, and related marks are registered trademarks and copyrights of **Ubisoft Entertainment**.
- All lore, character names, and quotes belong to their respective creators at Ubisoft.

---

## 👨‍💻 Author & Creator

Designed and engineered with passion by **Akhilesh Gupta** (*Project Animus Architect*).

[![GitHub](https://img.shields.io/badge/GitHub-akhilesh10gupta-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akhilesh10gupta)
[![Email](https://img.shields.io/badge/Email-gakhilesh946%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gakhilesh946@gmail.com)

- **GitHub Profile**: [@akhilesh10gupta](https://github.com/akhilesh10gupta)
- **Email / Inquiries**: [gakhilesh946@gmail.com](mailto:gakhilesh946@gmail.com)

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

