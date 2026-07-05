class EffectsEngine {
    constructor(particleEngine) {
        this.pe = particleEngine;
        this.activeTypewriters = [];
    }

    cancelAllActiveTyping() {
        this.activeTypewriters.forEach(id => clearTimeout(id));
        this.activeTypewriters = [];
    }

    typewrite(element, lyricData, onCompleteCallback) {
        if (!element) return;

        element.innerHTML = "";

        const line = document.createElement("div");
        line.className = "lyric-line";

        const hSpan = document.createElement("span");
        hSpan.className = "devanagari";

        const eSpan = document.createElement("span");
        eSpan.className = "english-premium";

        line.appendChild(hSpan);
        line.appendChild(eSpan);
        element.appendChild(line);

        const hText = lyricData.hindi || "";
        const eText = lyricData.english || "";

        let i = 0;
        let j = 0;

        const printHindi = () => {
            if (i < hText.length) {
                hSpan.innerHTML += hText.charAt(i++);
                const t = setTimeout(printHindi, 70);
                this.activeTypewriters.push(t);
            } else if (eText.length) {
                printEnglish();
            } else if (onCompleteCallback) {
                onCompleteCallback();
            }
        };

        const printEnglish = () => {
if (j < eText.length) {
                eSpan.innerHTML += eText.charAt(j++);
                const t = setTimeout(printEnglish, 60);
                this.activeTypewriters.push(t);
            } else if (onCompleteCallback) {
                onCompleteCallback();
            }
        };

        printHindi();
    }

    dissolveLyricsContainer(elementId) {
        const target = document.getElementById(elementId);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (this.pe) {
            this.pe.triggerDustDissolve(centerX, centerY);
        }

        gsap.to(target, {
            duration: 0.8,
            opacity: 0,
            y: -30,
            scale: 0.9,
            filter: "blur(8px)",
            ease: "power2.out",
            onComplete: () => {
                target.innerHTML = "";
                gsap.set(target, { clearProps: "all" });
            }
        });
    }
          }
