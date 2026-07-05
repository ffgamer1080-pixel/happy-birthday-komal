document.addEventListener("DOMContentLoaded", () => {
    // Initialize the Particle Engine
    const particles = new ParticleEngine();
    particles.startLoop();

    // Global Pipeline State References
    const steps = {
        1: document.getElementById("step1"),
        2: document.getElementById("step2"),
        3: document.getElementById("step3")
    };

    let currentStep = 1;

    // Audio Element (Optional Integration)
    // const bgMusic = new Audio("path/to/your/music.mp3");
    // bgMusic.loop = true;

    // --- PIPELINE ENGINE FUNCTIONS ---

    function switchStep(nextStep) {
        if (steps[currentStep]) {
            steps[currentStep].classList.remove("active");
        }
        if (steps[nextStep]) {
            steps[nextStep].classList.add("active");
            currentStep = nextStep;
        }
    }

    // STEP 1: Enter Button Trigger
    const enterBtn = document.getElementById("enterBtn");
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            // if (bgMusic) bgMusic.play().catch(e => console.log("Audio play blocked:", e));
            runCountdownPipeline();
        });
    }

    // STEP 2: Cinematic Countdown Pipeline
    function runCountdownPipeline() {
        switchStep(2);
        const countdownDigit = document.getElementById("countdownDigit");
        let count = 3;

        countdownDigit.style.opacity = "1";
        countdownDigit.style.transform = "scale(1)";
        countdownDigit.textContent = count;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                // Animate count change gracefully
                countdownDigit.style.transform = "scale(0.5)";
                countdownDigit.style.opacity = "0";
                
                setTimeout(() => {
                    countdownDigit.textContent = count;
                    countdownDigit.style.transform = "scale(1)";
                    countdownDigit.style.opacity = "1";
                }, 200);
            } else {
                clearInterval(interval);
                // Flash final burst effect before entering the book
                countdownDigit.style.transform = "scale(2)";
                countdownDigit.style.opacity = "0";
                
                setTimeout(() => {
                    switchStep(3); // Enter Step 3: The 3D Book Layout
                }, 400);
            }
        }, 1000);
    }

    // STEP 3: 3D Book Interaction Logic
    const pages = document.querySelectorAll(".page");
    
    pages.forEach((page, index) => {
        // Set proper initial z-indexing for book layering stack
        page.style.zIndex = pages.length - index;

        page.addEventListener("click", (e) => {
            // Prevent triggering page flips if interactive elements inside are clicked
            if (e.target.closest(".gold-btn") || e.target.closest("button")) return;

            // Trigger dust particles dissolve effect based on click location coordinates
            const rect = page.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Trigger particle dissolve burst from particles.js engine mechanics
            particles.triggerDustDissolve(e.clientX, e.clientY);

            if (!page.classList.contains("flipped")) {
                // Flip page forward
                page.classList.add("flipped");
                // Adjust dynamic stacking index so flipped page stays behind current top page
                setTimeout(() => {
                    page.style.zIndex = index + 1;
                }, 300); // Wait for half-way through the 0.6s animation turn
            } else {
                // Optional: Flip page backward if user clicks on a flipped page corner
                page.classList.remove("flipped");
                setTimeout(() => {
                    page.style.zIndex = pages.length - index;
                }, 300);
            }
        });
    });

    // STEP 8: Celebration Reset Controller
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            // High-performance flush on global variables and active memory arrays
            particles.clearAllParticles();

            // Reverse flip all book pages in reverse order stack structure
            for (let i = pages.length - 1; i >= 0; i--) {
                pages[i].classList.remove("flipped");
                pages[i].style.zIndex = pages.length - i;
            }

            // Route execution map back to the primary welcome gateway screen
            switchStep(1);
            
            // if (bgMusic) { bgMusic.pause(); bgMusic.currentTime = 0; }
        });
    }
});
