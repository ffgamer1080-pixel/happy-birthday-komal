document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const splashScreen = document.getElementById("splashScreen");
    const openBookBtn = document.getElementById("openBookBtn");
    const countdownOverlay = document.getElementById("countdownOverlay");
    const countdownNumber = document.getElementById("countdownNumber");
    const albumContainer = document.getElementById("albumContainer");
    const memoryBook = document.getElementById("memoryBook");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const replayBtn = document.getElementById("replayBtn");

    // Audio Elements
    const bgMusic = document.getElementById("bgMusic");
    const flipSound = document.getElementById("flipSound");

    // Book Layout State Tracking
    let currentPageIndex = 0;
    const pages = document.querySelectorAll(".page");
    const totalPages = pages.length;

    // --- INITIALIZATION ---
    // Enforce default stacked order mapping indices safely
    function initializeStackZ() {
        pages.forEach((page, index) => {
            page.style.zIndex = totalPages - index;
        });
    }
    initializeStackZ();

    // --- AUDIO WRAPPER SYSTEM ---
    function safePlayAudio(audioElement) {
        if (!audioElement) return;
        audioElement.play().catch(() => {
            console.log("Audio playback deferred or context failed safely.");
        });
    }

    function safeResetAudio(audioElement) {
        if (!audioElement) return;
        audioElement.currentTime = 0;
    }

    // --- FLOW MANAGER: SPLASH TO APP ---
    openBookBtn.addEventListener("click", () => {
        splashScreen.classList.add("hidden");
        countdownOverlay.classList.remove("hidden");
        
        // Start Sound immediately on action
        safePlayAudio(bgMusic);
        runIntroCountdown();
    });

    function runIntroCountdown() {
        let count = 3;
        countdownNumber.textContent = count;
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.textContent = count;
            } else {
                clearInterval(interval);
                revealLuxuryAlbum();
            }
        }, 1000);
    }

    function revealLuxuryAlbum() {
        countdownOverlay.classList.add("hidden");
        albumContainer.classList.remove("hidden");
        // Trigger initial canvas resize configuration alignment
        if (window.resizeCanvas) {
            window.resizeCanvas();
        }
        // Initialize dynamic lyrics presentation on cover opening readiness
        if (window.LyricsEngine && window.LyricsEngine.init) {
            window.LyricsEngine.init();
        }
    }

    // --- BOOK PHYSICS & TRANSFORMATION NAVIGATION ---
    function turnPageForward() {
        if (currentPageIndex >= totalPages - 1) return;

        safeResetAudio(flipSound);
        safePlayAudio(flipSound);

        const pageToFlip = document.getElementById(`page${currentPageIndex}`);
        if (pageToFlip) {
            pageToFlip.classList.add("flipped");
            // Lower zIndex so underlying pages are visible and interactable
            pageToFlip.style.zIndex = currentPageIndex + 1;
        }

        currentPageIndex++;
        updateNavigationButtons();
        
        // Trigger page-specific reveal animation enhancements
        if (window.EffectsEngine && window.EffectsEngine.onPageReveal) {
            window.EffectsEngine.onPageReveal(currentPageIndex);
        }
    }

    function turnPageBackward() {
        if (currentPageIndex <= 0) return;

        safeResetAudio(flipSound);
        safePlayAudio(flipSound);

        currentPageIndex--;
        
        const pageToRestore = document.getElementById(`page${currentPageIndex}`);
        if (pageToRestore) {
            pageToRestore.classList.remove("flipped");
            // Restore default stack weight assignment depth mapping
            pageToRestore.style.zIndex = totalPages - currentPageIndex;
        }

        updateNavigationButtons();
        
        if (window.EffectsEngine && window.EffectsEngine.onPageReveal) {
            window.EffectsEngine.onPageReveal(currentPageIndex);
        }
    }

    function updateNavigationButtons() {
        prevBtn.disabled = (currentPageIndex === 0);
        nextBtn.disabled = (currentPageIndex === totalPages - 1);
    }

    // --- INTERACTION LISTENERS ---
    nextBtn.addEventListener("click", turnPageForward);
    prevBtn.addEventListener("click", turnPageBackward);

    // Book Click Surface Target Turning Fallback Detection
    memoryBook.addEventListener("click", (e) => {
        // Exclude interactive core components inside cover pages (e.g., Replay Action Button)
        if (e.target.closest("button") || e.target.closest(".lyrics-box")) return;

        const rect = memoryBook.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        
        if (clickX > rect.width / 2) {
            turnPageForward();
        } else {
            turnPageBackward();
        }
    });

    // --- MOBILE GESTURE SWIPE MANAGEMENT ---
    let touchStartX = 0;
    memoryBook.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    memoryBook.addEventListener("touchend", (e) => {
        let touchEndX = e.changedTouches[0].clientX;
        let deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 60) {
            if (deltaX < 0) {
                turnPageForward();
            } else {
                turnPageBackward();
            }
        }
    }, { passive: true });

    // --- REPLAY FLOW RESET ---
    replayBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid triggering page click physics bubble
        
        // Unroll stack arrays backwards sequentially
        for (let i = totalPages - 1; i >= 0; i--) {
            const page = document.getElementById(`page${i}`);
            if (page) {
                page.classList.remove("flipped");
            }
        }
        
        currentPageIndex = 0;
        initializeStackZ();
        updateNavigationButtons();
        safeResetAudio(bgMusic);
        safePlayAudio(bgMusic);

        if (window.LyricsEngine && window.LyricsEngine.resetAll) {
            window.LyricsEngine.resetAll();
        }
    });

    // Handle standard layout changes
    window.addEventListener("resize", () => {
        if (window.resizeCanvas) {
            window.resizeCanvas();
        }
    });
});
