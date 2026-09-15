// Project Animus - 3D Canvas Memory Corridor Engine
// Renders drifting memory fragments, 3D perspective grid lines, DNA glyphs, and interactive parallax

export class AnimusCorridor {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.gridLines = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.isGlitching = false;
    this.glitchTimer = 0;
    this.isEagleVision = false;
    this.width = 0;
    this.height = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    this.createParticles(120);
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  onMouseMove(e) {
    // Normalized -1 to 1
    this.targetMouseX = (e.clientX / this.width) * 2 - 1;
    this.targetMouseY = (e.clientY / this.height) * 2 - 1;
  }

  createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * this.width * 2,
        y: (Math.random() - 0.5) * this.height * 2,
        z: Math.random() * 1000 + 50,
        size: Math.random() * 8 + 3,
        speedZ: Math.random() * 1.8 + 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        type: Math.random() > 0.4 ? 'shard' : (Math.random() > 0.5 ? 'glyph' : 'cube'),
        alpha: Math.random() * 0.7 + 0.3,
        char: ['0', '1', 'A', 'Ω', 'Ψ', 'Δ', '1191', '1476', '1715', 'DNA'][Math.floor(Math.random() * 10)]
      });
    }
  }

  triggerGlitch(duration = 400) {
    this.isGlitching = true;
    this.glitchTimer = duration;
  }

  setEagleVision(active) {
    this.isEagleVision = active;
  }

  animate(time) {
    // Smooth mouse lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Clear Canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    const centerX = this.width / 2 + this.mouseX * 60;
    const centerY = this.height / 2 + this.mouseY * 40;
    const fov = 400;

    // Background Subtle Animus Radial Glow
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 50,
      centerX, centerY, Math.max(this.width, this.height) * 0.8
    );

    if (this.isEagleVision) {
      gradient.addColorStop(0, 'rgba(6, 25, 45, 0.4)');
      gradient.addColorStop(0.6, 'rgba(2, 8, 18, 0.7)');
      gradient.addColorStop(1, 'rgba(1, 4, 10, 0.95)');
    } else {
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
      gradient.addColorStop(0.5, 'rgba(10, 15, 26, 0.6)');
      gradient.addColorStop(1, 'rgba(5, 7, 12, 0.95)');
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 1. Draw 3D Perspective Grid
    this.drawPerspectiveGrid(centerX, centerY, time);

    // 2. Draw 3D Memory Shards
    for (let p of this.particles) {
      p.z -= p.speedZ;
      p.rot += p.rotSpeed;

      // Loop particles back into distance
      if (p.z <= 10) {
        p.z = 1000;
        p.x = (Math.random() - 0.5) * this.width * 2;
        p.y = (Math.random() - 0.5) * this.height * 2;
      }

      const scale = fov / p.z;
      const screenX = centerX + p.x * scale;
      const screenY = centerY + p.y * scale;
      const screenSize = p.size * scale;

      // Skip offscreen
      if (screenX < -50 || screenX > this.width + 50 || screenY < -50 || screenY > this.height + 50) {
        continue;
      }

      const depthAlpha = Math.min(1, Math.max(0, (1000 - p.z) / 900)) * p.alpha;

      this.ctx.save();
      this.ctx.translate(screenX, screenY);
      this.ctx.rotate(p.rot);

      if (this.isGlitching) {
        this.ctx.translate((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 6);
      }

      if (this.isEagleVision) {
        this.ctx.fillStyle = `rgba(212, 175, 55, ${depthAlpha * 0.9})`;
        this.ctx.strokeStyle = `rgba(0, 240, 255, ${depthAlpha * 0.8})`;
      } else {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.85})`;
        this.ctx.strokeStyle = `rgba(0, 240, 255, ${depthAlpha * 0.7})`;
      }
      this.ctx.lineWidth = 1;

      if (p.type === 'shard') {
        // Triangular Animus Memory Fragment
        this.ctx.beginPath();
        this.ctx.moveTo(0, -screenSize * 1.4);
        this.ctx.lineTo(screenSize, screenSize * 0.8);
        this.ctx.lineTo(-screenSize * 0.8, screenSize);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      } else if (p.type === 'cube') {
        // Data block
        this.ctx.strokeRect(-screenSize / 2, -screenSize / 2, screenSize, screenSize);
      } else {
        // Binary / Greek / Precursor Glyph
        this.ctx.font = `${Math.max(9, screenSize * 1.5)}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(p.char, 0, 0);
      }

      this.ctx.restore();
    }

    // 3. Glitch lines
    if (this.isGlitching) {
      this.drawGlitchEffects();
      this.glitchTimer -= 16;
      if (this.glitchTimer <= 0) {
        this.isGlitching = false;
      }
    }

    // 4. Subtle Scanline & Coordinate HUD overlay on canvas
    this.drawHudOverlay(time);

    requestAnimationFrame(this.animate);
  }

  drawPerspectiveGrid(centerX, centerY, time) {
    const horizonY = centerY + 120;
    const gridColor = this.isEagleVision ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)';
    const accentColor = this.isEagleVision ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0, 240, 255, 0.12)';

    this.ctx.lineWidth = 1;

    // Floor Perspective Lines converging to horizon
    const lineCount = 20;
    for (let i = -lineCount; i <= lineCount; i++) {
      const bottomX = centerX + (i * this.width * 0.06) + (this.mouseX * 30);
      this.ctx.strokeStyle = Math.abs(i) % 5 === 0 ? accentColor : gridColor;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX + (i * 8), horizonY);
      this.ctx.lineTo(bottomX, this.height);
      this.ctx.stroke();
    }

    // Horizontal Depth Grid Rungs
    const rungs = 9;
    const speed = (time * 0.03) % 40;
    for (let j = 1; j <= rungs; j++) {
      const progress = (j * 35 + speed) / (rungs * 35);
      const y = horizonY + Math.pow(progress, 2.2) * (this.height - horizonY);
      const alpha = progress * (this.isEagleVision ? 0.12 : 0.08);
      this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  drawGlitchEffects() {
    for (let i = 0; i < 6; i++) {
      const y = Math.random() * this.height;
      const h = Math.random() * 24 + 4;
      const shift = (Math.random() - 0.5) * 60;
      this.ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(200, 16, 46, 0.25)';
      this.ctx.fillRect(0, y, this.width, h);

      // Slice displacement
      try {
        const sliceWidth = this.width;
        const sliceData = this.ctx.getImageData(0, Math.floor(y), sliceWidth, Math.max(1, Math.floor(h)));
        this.ctx.putImageData(sliceData, shift, Math.floor(y));
      } catch (e) {
        // Fallback for canvas cross-origin or limit
      }
    }
  }

  drawHudOverlay(time) {
    // Subtle corner targeting brackets
    this.ctx.strokeStyle = this.isEagleVision ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 240, 255, 0.2)';
    this.ctx.lineWidth = 1;

    const margin = 40;
    const len = 30;

    // Top Left
    this.ctx.beginPath();
    this.ctx.moveTo(margin, margin + len);
    this.ctx.lineTo(margin, margin);
    this.ctx.lineTo(margin + len, margin);
    this.ctx.stroke();

    // Top Right
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - margin - len, margin);
    this.ctx.lineTo(this.width - margin, margin);
    this.ctx.lineTo(this.width - margin, margin + len);
    this.ctx.stroke();

    // Bottom Left
    this.ctx.beginPath();
    this.ctx.moveTo(margin, this.height - margin - len);
    this.ctx.lineTo(margin, this.height - margin);
    this.ctx.lineTo(margin + len, this.height - margin);
    this.ctx.stroke();

    // Bottom Right
    this.ctx.beginPath();
    this.ctx.moveTo(this.width - margin - len, this.height - margin);
    this.ctx.lineTo(this.width - margin, this.height - margin);
    this.ctx.lineTo(this.width - margin, this.height - margin - len);
    this.ctx.stroke();
  }
}
