// ========================================
// STEP 8 — SCROLL REVEAL ANIMATION
// ========================================

document.documentElement.classList.add("js-reveal-ready");

const reveals = document.querySelectorAll(
".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
(entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

},
{
    threshold: 0.15
}

);

reveals.forEach((element) => {
revealObserver.observe(element);
});

// ========================================
// STEP 10 — EVENT AUTO PLAY
// ========================================

const autoplayButton =
document.getElementById("autoplayButton");

let autoScrolling = false;
let autoScrollFrame = null;

// Desktop = 1.5
// Mobile = 3.8

const scrollSpeed = 1.5;

// ========================================
// AUTO SCROLL
// ========================================

function autoScroll() {

    if (!autoScrolling) return;

    window.scrollBy(0, scrollSpeed);

    const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

    if (reachedBottom) {

        autoScrolling = false;

        cancelAnimationFrame(autoScrollFrame);

        autoplayButton.textContent = "RESTARTING...";

        sessionStorage.setItem(
            "anniversaryAutoPlay",
            "yes"
        );

        setTimeout(() => {

            window.scrollTo(0, 0);

            window.location.reload();

        }, 5000);

        return;
    }

    autoScrollFrame =
        requestAnimationFrame(autoScroll);
}

// ========================================
// START
// ========================================

function startAutoScroll() {

    autoScrolling = true;

    sessionStorage.setItem(
        "anniversaryAutoPlay",
        "yes"
    );

    autoplayButton.textContent =
        "Ⅱ PAUSE";

    // Start Music
    const music =
        document.getElementById("bgMusic");

    music.currentTime = music.currentTime;

    music.play().catch(() => {});

    autoScrollFrame =
        requestAnimationFrame(autoScroll);
}
// ========================================
// PAUSE
// ========================================

function stopAutoScroll() {

    autoScrolling = false;

    sessionStorage.removeItem(
        "anniversaryAutoPlay"
    );

    cancelAnimationFrame(autoScrollFrame);

    // Pause Music
    const music =
        document.getElementById("bgMusic");

    music.pause();

    autoplayButton.textContent =
        "▶ AUTO PLAY";
}

// ========================================
// BUTTON
// ========================================

autoplayButton.addEventListener("click", () => {

    if (autoScrolling) {

        stopAutoScroll();

    } else {

        startAutoScroll();

    }

});
// ========================================
// RESTART COMPLETE PRESENTATION
// ========================================

// Prevent browser restoring scroll position

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}

window.addEventListener("load", () => {

    // Always start from top

    window.scrollTo(0, 0);

    // Reset reveal animations

    reveals.forEach((element) => {

        element.classList.remove("active");

    });

    const shouldContinue =
        sessionStorage.getItem(
            "anniversaryAutoPlay"
        );

    if (shouldContinue === "yes") {

        setTimeout(() => {

            startAutoScroll();

        }, 2500);

    }

});