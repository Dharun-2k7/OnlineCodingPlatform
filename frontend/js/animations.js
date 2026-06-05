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
    let mm = gsap.matchMedia();

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
            y: 30,
            rotateX: -30,
            duration: 0.8,
            ease: "back.out(1.5)",
            transformOrigin: "50% 100%"
        });
    }

    const tl = gsap.timeline();
    tl.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2")
    .from(".hero-cta .btn-magnetic", {
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(1.5)"
    }, "-=0.3");

    // Floating Nodes Parallax based on mouse movement
    const pNodes = document.querySelectorAll('.p-node');
    if (pNodes.length > 0) {
        mm.add("(min-width: 769px)", () => {
            const x1To = gsap.quickTo('.node-1', "x", { duration: 1.5, ease: "power2.out" });
            const y1To = gsap.quickTo('.node-1', "y", { duration: 1.5, ease: "power2.out" });
            const x2To = gsap.quickTo('.node-2', "x", { duration: 1.5, ease: "power2.out" });
            const y2To = gsap.quickTo('.node-2', "y", { duration: 1.5, ease: "power2.out" });
            const x3To = gsap.quickTo('.node-3', "x", { duration: 1.5, ease: "power2.out" });
            const y3To = gsap.quickTo('.node-3', "y", { duration: 1.5, ease: "power2.out" });
            const rot3To = gsap.quickTo('.node-3', "rotation", { duration: 1.5, ease: "power2.out" });
            
            const mouseMove = (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                x1To(x * 60); y1To(y * 60);
                x2To(x * -40); y2To(y * -40);
                x3To(x * 80); y3To(y * 80); rot3To(x * 15);
            };
            
            window.addEventListener('mousemove', mouseMove);
            return () => window.removeEventListener('mousemove', mouseMove);
        });
    }

    // =========================================================================
    // 2. BENTO GRID ENTRANCE (Scale & Stagger)
    // =========================================================================
    // Fix: Animate cards individually when they enter the viewport to eliminate lag
    // and make them responsive on mobile devices.
    gsap.utils.toArray(".bento-card:not(.phase-content), .stat-card, .timeline-panel").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.out"
        });
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
    if (timelineContainer) {
        mm.add("(min-width: 769px)", () => {
            gsap.to(timelineContainer, {
                x: () => -(timelineContainer.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-wrapper",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (timelineContainer.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    pinType: "transform"
                }
            });
        });
    }

    // =========================================================================
    // 4. ECOSYSTEM EXPANSION ANIMATIONS
    // =========================================================================

    // A. Number Counters (Why CP Matters)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: targetValue,
            duration: 2,
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

    // B. SVG Journey Line Drawing
    const lineFill = document.querySelector('.journey-line-fill');
    if (lineFill) {
        gsap.set(lineFill, { strokeDasharray: 800, strokeDashoffset: 800 });
        gsap.to(lineFill, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".journey-map",
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1
            }
        });
    }

    // C. Journey Phase Reveals
    // Fixed: Converted to vertical translation to prevent mobile horizontal overflow bugs
    gsap.utils.toArray('.journey-phase').forEach(phase => {
        gsap.from(phase, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: phase,
                start: "top 85%"
            }
        });
    });

    // D. Horizontal Scroll Transformation Engine
    const transformTrack = document.querySelector('.transform-track');
    if (transformTrack) {
        const evolutionFill = document.getElementById('evolutionFill');
        const evolutionLabel = document.getElementById('evolutionLabel');
        const totalCards = document.querySelectorAll('.transform-card').length;

        mm.add("(min-width: 769px)", () => {
            transformTrack.classList.add('gsap-desktop-scroll');
            gsap.to(transformTrack, {
                x: () => -(transformTrack.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: ".transform-wrapper",
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (transformTrack.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    pinType: "transform",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const stage = Math.min(Math.floor(progress * (totalCards - 1)) + 1, totalCards);
                        if (evolutionFill) evolutionFill.style.width = (stage / totalCards * 100) + '%';
                        if (evolutionLabel) evolutionLabel.textContent = `Stage ${stage} / ${totalCards}`;
                    }
                }
            });
            return () => {
                transformTrack.classList.remove('gsap-desktop-scroll');
                gsap.set(transformTrack, { clearProps: "all" });
            };
        });

        mm.add("(max-width: 768px)", () => {
            let isTicking = false;
            const scrollHandler = () => {
                if (!isTicking) {
                    window.requestAnimationFrame(() => {
                        const maxScrollLeft = transformTrack.scrollWidth - transformTrack.clientWidth;
                        if (maxScrollLeft > 0) {
                            const scrollProgress = transformTrack.scrollLeft / maxScrollLeft;
                            const stage = Math.min(Math.floor(scrollProgress * (totalCards - 1)) + 1, totalCards);
                            if (evolutionFill) evolutionFill.style.width = (stage / totalCards * 100) + '%';
                            if (evolutionLabel) evolutionLabel.textContent = `Stage ${stage} / ${totalCards}`;
                        }
                        isTicking = false;
                    });
                    isTicking = true;
                }
            };
            transformTrack.addEventListener('scroll', scrollHandler, { passive: true });
            return () => transformTrack.removeEventListener('scroll', scrollHandler);
        });
    }

    // E. Vision Section Cinematic Fade
    gsap.utils.toArray('.cinematic-text').forEach(text => {
        gsap.to(text, {
            color: "rgba(255,255,255,1)",
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "top 40%",
                scrub: true
            }
        });
    });

    // F. Values Bento Grid
    gsap.from(".values-grid .bento-card", {
        scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

});
