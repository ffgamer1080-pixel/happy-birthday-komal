(function() {
    const effectsContainer = document.getElementById("effectsContainer");

    // Dynamic Element Burst Vector Generator
    function createBurstEffect(type, count, styleClass) {
        if (!effectsContainer) return;

        for (let i = 0; i < count; i++) {
            const element = document.createElement("div");
            element.className = `${styleClass} animated-burst`;
            
            // Random distribution alignment vectors
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 10;
            const destinationX = startX + (Math.random() * 200 - 100);
            const duration = Math.random() * 2000 + 2000; 

            element.style.left = `${startX}px`;
            element.style.top = `${startY}px`;
            
            if (type === 'heart') {
                element.innerHTML = "❤️";
                element.style.fontSize = `${Math.random() * 15 + 10}px`;
            } else if (type === 'petal') {
                element.innerHTML = "🌸";
                element.style.fontSize = `${Math.random() * 12 + 8}px`;
            } else {
                element.innerHTML = "✨";
                element.style.color = "#d4af37";
                element.style.fontSize = `${Math.random() * 10 + 6}px`;
            }

            effectsContainer.appendChild(element);

            // Manual fallback layout translation animation rendering sequence
            const startTime = performance.now();
            function runAnimation(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = elapsed / duration;

                if (progress < 1) {
                    const currentY = startY - (progress * (window.innerHeight + 50));
                    const currentX = startX + (progress * (destinationX - startX));
                    
                    element.style.transform = `translate(${currentX - startX}px, ${currentY - startY}px) rotate(${progress * 360}deg)`;
                    element.style.opacity = 1 - progress;
                    
                    requestAnimationFrame(runAnimation);
                } else {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                }
            }
            requestAnimationFrame(runAnimation);
        }
    }

    // --- ZOOM EFFECT COORDINATOR ---
    function triggerKenBurnsZoom(pageIndex) {
        const activePage = document.getElementById(`page${pageIndex}`);
        if (!activePage) return;

        const img = activePage.querySelector(".kb-effect");
        if (!img) return;

        // Clear ongoing standard states across alternate spaces safely
        document.querySelectorAll(".kb-effect").forEach(image => {
            image.style.transform = "scale(1)";
            image.style.transition = "none";
        });

        // Trigger zoom loop sequence properties smoothly
        setTimeout(() => {
            img.style.transition = "transform 8s ease-in-out";
            img.style.transform = "scale(1.15) translate(5px, -5px)";
        }, 50);
    }

    // Global Registry Core API Access Connectors
    window.EffectsEngine = {
        onPageReveal: function(pageIndex) {
            // Apply real-time Ken Burns animations to active photos
            triggerKenBurnsZoom(pageIndex);

            // Trigger text printing engine for discovered pages
            if (window.LyricsEngine && window.LyricsEngine.triggerPageLyrics) {
                window.LyricsEngine.triggerPageLyrics(pageIndex);
                window.LyricsEngine.triggerPageLyrics(pageIndex + 1);
            }

            // Trigger celebration bursts on special milestone pages
            if (pageIndex === 7) { 
                // Birthday Greeting Page Revealed Explosion
                createBurstEffect('heart', 15, 'heart');
                createBurstEffect('sparkle', 20, 'sparkle');
            } else if (pageIndex === 1 || pageIndex === 4) {
                createBurstEffect('petal', 10, 'petal');
            }
        }
    };
})();

