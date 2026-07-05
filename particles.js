(function() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particlesArray = [];
    const maxParticles = 60; // Performance balance baseline

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.resizeCanvas = resizeCanvas;
    resizeCanvas();

    // Particle Object Defintion Blueprint
    class PremiumParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = -(Math.random() * 1.5 + 0.5);
            this.type = Math.random() > 0.4 ? 'gold' : 'rose';
            this.alpha = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Fade out near top boundaries
            if (this.y < 50) {
                this.alpha -= 0.005;
            }

            // Recalculate allocation check conditions
            if (this.alpha <= 0 || this.x < 0 || this.x > canvas.width || this.y < -20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            if (this.type === 'gold') {
                // Glow ambient light drop
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#d4af37";
                ctx.fillStyle = "rgba(243, 229, 171, 0.8)";
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Heart shape vectors representation logic
                ctx.fillStyle = "rgba(215, 45, 95, 0.7)";
                ctx.beginPath();
                let width = this.size * 2 + 2;
                let height = this.size * 2 + 2;
                ctx.moveTo(0, height / 4);
                ctx.bezierCurveTo(width / 2, -height / 2, width, height / 4, 0, height);
                ctx.bezierCurveTo(-width, height / 4, -width / 2, -height / 2, 0, height / 4);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Population Pipeline setup initialization
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new PremiumParticle());
        }
    }
    initParticles();

    // Infinite 60 FPS Application Frame Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
})();
