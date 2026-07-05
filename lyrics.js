(function() {
    // Definitive memory verse database storage configuration
    const lyricsData = {
        lyricsBox1: "In your smile, I found the light that safely guided me home through every storm.",
        lyricsBox2: "Every shared laughter is a beautiful note written forever into our love song.",
        lyricsBox3: "Hand in hand, we explored the world, but my favorite place will always be next to you.",
        lyricsBox4: "Through the quiet evenings and simple moments, you became my entire universe.",
        lyricsBox5: "In your eyes, I see the beautiful past, present, and every single tomorrow of my dreams.",
        lyricsBox6: "Years may fly by, but my promise remains true: I will love you more with every sunrise."
    };

    const activeTimers = {};

    function typeWriterEffect(element, text, speed = 50) {
        const elementId = element.id;
        // Terminate ongoing text printing instances safely on current canvas block
        if (activeTimers[elementId]) {
            clearInterval(activeTimers[elementId]);
        }

        element.textContent = "";
        element.style.opacity = "1";
        let index = 0;

        activeTimers[elementId] = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(activeTimers[elementId]);
                activeTimers[elementId] = null;
            }
        }, speed);
    }

    // Engine Interface Architecture Hook
    window.LyricsEngine = {
        init: function() {
            this.triggerPageLyrics(1);
            this.triggerPageLyrics(2);
        },
        triggerPageLyrics: function(pageIndex) {
            const targetBoxId = `lyricsBox${pageIndex}`;
            const targetBoxElement = document.getElementById(targetBoxId);
            const textSource = lyricsData[targetBoxId];

            if (targetBoxElement && textSource) {
                typeWriterEffect(targetBoxElement, textSource, 45);
            }
        },
        resetAll: function() {
            Object.keys(activeTimers).forEach(id => {
                if (activeTimers[id]) {
                    clearInterval(activeTimers[id]);
                    activeTimers[id] = null;
                }
            });
            Object.keys(lyricsData).forEach(boxId => {
                const el = document.getElementById(boxId);
                if (el) el.textContent = "";
            });
            this.init();
        }
    };
})();

