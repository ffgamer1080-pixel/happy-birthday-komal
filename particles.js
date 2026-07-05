class ParticleEngine {
    constructor() {
        // Initialize properties first
        this.particles = [];
        this.dustParticles = [];
        this.isLooping = false;

        // Get canvas
        this.canvas = document.getElementById("particleCanvas");

        // Safe fallback if canvas is missing
        if (!this.canvas) {
            console.warn("particleCanvas not found.");
            this.ctx = null;
            return;
        }

        // Get 2D context
        this.ctx = this.canvas.getContext("2d");

        if (!this.ctx) {
            console.warn("2D canvas context could not be created.");
            return;
        }

        // Initialize canvas dimensions
        this.resize();

        // Keep canvas responsive using passive listeners for performance
        window.addEventListener("resize", () => this.resize(), {
            passive: true
        });
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawnPetal() {
        if (!this.canvas) return null;
        return {
            type: 'petal',
            x: Math.random() * this.canvas.width,
            y: -20,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 1.5 + 1,
            speedX: Math.sin(Math.random()) * 0.8,
            angle: Math.random() * 360,
            spin: Math.random() * 2 - 1,
            opacity: Math.random() * 0.4 + 0.4
        };
    }

    spawnSpark() {
        if (!this.canvas) return null;
        return {
            type: 'spark',
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 10,
            size: Math.random() * 2 + 1,
            speedY: -(Math.random() * 1.2 + 0.5),
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.6 + 0.4
        };
    }

    // STEP 6: Particles Dissolve Generator
    triggerDustDissolve(targetX, targetY) {
        // Safe guard clause: context ya canvas missing hone par particles push nahi honge
        if (!this.ctx || !this.canvas) return;

        for(let i = 0; i < 45; i++) {
            this.dustParticles.push({
                x: targetX + (Math.random() - 0.5) * 160,
                y: targetY + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.6) * 3,
                size: Math.random() * 3 + 1,
                alpha: 1
            });
        }
    }

    // High-performance array clearing aur instant canvas flush
    clearAllParticles() {
        this.particles.length = 0;
        this.dustParticles.length = 0;

        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    startLoop() {
        if (!this.canvas || !this.ctx) return; // Guard clause agar engine initialize hi nahi hua
        if (this.isLooping) return; // Duplicate loops ko rokne ke liye guard clause
        this.isLooping = true;

        const render = () => {
            // State lock safe check: loop flag clean hokar reset ho sake
            if (!this.ctx || !this.canvas) {
                this.isLooping = false;
                return;
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Ambient generation dynamics
            if (this.particles.length < 40 && Math.random() < 0.08) {
                const petal = this.spawnPetal();
                if (petal) this.particles.push(petal);
            }
            if (this.particles.length < 60 && Math.random() < 0.15) {
                const spark = this.spawnSpark();
                if (spark) this.particles.push(spark);
            }

            // Reverse loop for high-speed performance rendering
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.y += p.speedY;
                p.x += p.speedX;

                if (p.type === 'petal') {
                    p.angle += p.spin;
                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.rotate((p.angle * Math.PI) / 180);
                    this.ctx.fillStyle = `rgba(255, 77, 109, ${p.opacity})`;
                    this.ctx.beginPath();
                    this.ctx.ellipse(0, 0, p.size, p.size / 1.5, 0, 0, 2 * Math.PI);
                    this.ctx.fill();
                    this.ctx.restore();
                } else {
                    // Premium neon glow for spark particles
                    this.ctx
this.ctx.save();
this.ctx.shadowBlur = 6;
this.ctx.shadowColor = "#fbf5b7";
this.ctx.fillStyle = `rgba(251, 245, 183, ${p.opacity})`;

this.ctx.beginPath();
this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
this.ctx.fill();

this.ctx.restore();
}

if (
    p.y > this.canvas.height + 20 ||
    p.y < -30 ||
    p.x > this.canvas.width + 20 ||
    p.x < -20
) {
    this.particles.splice(i, 1);
}
}

for (let j = this.dustParticles.length - 1; j >= 0; j--) {
    const d = this.dustParticles[j];

    d.x += d.vx;
    d.y += d.vy;
    d.alpha -= 0.02;
    d.size *= 0.98;

    this.ctx.fillStyle = `rgba(139, 0, 26, ${d.alpha})`;
    this.ctx.beginPath();
    this.ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    this.ctx.fill();

    if (d.alpha <= 0 || d.size <= 0.1) {
        this.dustParticles.splice(j, 1);
    }
}

if (this.isLooping) {
    requestAnimationFrame(render);
}
};

requestAnimationFrame(render);
}
}

