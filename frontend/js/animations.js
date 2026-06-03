// =========================================================================
// THE QUANTUM ARENA - ScrollTrigger Masterclass
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP libraries not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // =========================================================================
    // 1. HERO ENTRANCE (Custom Text Split & Parallax)
    // =========================================================================
    
    // Custom SplitText implementation (since GSAP SplitText is premium)
    const heroTitle = document.querySelector(".hero-split");
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        // Split by words, preserving br and spans
        // For simplicity, we will just fade up the whole block, or split line by line
        // Actually, let's just fade up the whole title smoothly to avoid messing up HTML tags
        gsap.from(".hero-split", {
            opacity: 0,
            y: 50,
            rotateX: -45,
            duration: 1.2,
            ease: "back.out(1.5)",
            transformOrigin: "50% 100%"
        });
    }

    gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from(".hero-cta .btn-magnetic", {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.5)"
    }, "-=0.6");

    // Floating Nodes Parallax based on mouse movement
    const pNodes = document.querySelectorAll('.p-node');
    if (window.innerWidth > 768 && pNodes.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            gsap.to('.node-1', { x: x * 60, y: y * 60, duration: 2, ease: 'power2.out' });
            gsap.to('.node-2', { x: x * -40, y: y * -40, duration: 2, ease: 'power2.out' });
            gsap.to('.node-3', { x: x * 80, y: y * 80, duration: 2, ease: 'power2.out', rotation: x * 15 });
        });
    }

    // =========================================================================
    // 2. BENTO GRID ENTRANCE (Scale & Stagger)
    // =========================================================================
    gsap.from(".bento-card", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: {
            amount: 0.3,
            from: "random"
        },
        ease: "power3.out"
    });

    // Heatmap staggered lighting
    gsap.from(".heatmap-node.active", {
        scrollTrigger: {
            trigger: ".heatmap",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        backgroundColor: "rgba(255,255,255,0.05)",
        boxShadow: "0 0 0px transparent",
        duration: 0.1,
        stagger: 0.1,
        ease: "none"
    });

    // =========================================================================
    // 3. HORIZONTAL SCROLL STORYTELLING
    // =========================================================================
    const timelineContainer = document.querySelector(".timeline-container");
    if (timelineContainer && window.innerWidth > 768) {
        gsap.to(timelineContainer, {
            x: () => -(timelineContainer.scrollWidth - window.innerWidth) + "px",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-wrapper",
                pin: true,
                scrub: 1,
                end: () => "+=" + (timelineContainer.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true
            }
        });
    }

});
