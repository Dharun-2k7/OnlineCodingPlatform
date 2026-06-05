// =========================================================================
// THE QUANTUM ARENA - Minimal Scroll & Viewport Animations
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP libraries not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // =========================================================================
    // 1. HERO ENTRANCE
    // =========================================================================
    const heroTitle = document.querySelector(".hero-split");
    if (heroTitle) {
        gsap.from(".hero-split", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    const tl = gsap.timeline();
    tl.from(".hero-subtitle", {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.4")
    .from(".hero-cta .btn-magnetic", {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.3");

    // =========================================================================
    // 2. VIEWPORT FADE-INS (Cards & Sections)
    // =========================================================================
    // Subtle, fast fade-ups to give a polished feel without complex math
    gsap.utils.toArray(".bento-card:not(.phase-content), .stat-card, .timeline-panel, .transform-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    // =========================================================================
    // 3. NUMBER COUNTERS
    // =========================================================================
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: targetValue,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%"
            },
            onUpdate: function() {
                counter.innerHTML = Math.floor(obj.val);
            }
        });
    });

    // =========================================================================
    // 4. VISION SECTION TEXT FADE
    // =========================================================================
    gsap.utils.toArray('.cinematic-text').forEach(text => {
        gsap.to(text, {
            color: "rgba(255,255,255,1)",
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
                end: "top 50%",
                scrub: true
            }
        });
    });
});
