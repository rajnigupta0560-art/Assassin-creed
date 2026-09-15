// Project Animus - Main Application Entrypoint
import { AnimusCorridor } from './corridor.js';
import { TimelineController } from './timeline.js';
import { VaultController } from './vault.js';
import { CreedController } from './creed.js';
import { HudController } from './hud.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("%c[PROJECT ANIMUS] SYSTEM ONLINE. SYNCHRONIZING MEMORIES...", "color: #00f0ff; font-weight: bold; font-size: 14px;");

  // 1. Initialize 3D Canvas Memory Corridor
  const corridor = new AnimusCorridor('corridor-canvas');

  // 2. Initialize HUD & Eagle Vision Manager
  const hud = new HudController(corridor);
  hud.init();

  // 3. Initialize Master Assassins Timeline
  const timeline = new TimelineController();
  timeline.init();

  // 4. Initialize Artifact Vault
  const vault = new VaultController();
  vault.init();

  // 5. Initialize Creed Tenets & Leap of Faith
  const creed = new CreedController();
  creed.init();

  // 6. Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
