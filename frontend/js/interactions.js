// =========================================================================
// THE QUANTUM ARENA - Framer-Level Interactions & Theme Logic
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    
    // Performance Optimization: Use GSAP matchMedia for memory-safe responsive teardown
    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
        initCustomCursor();
        initMagneticButtons();
        init3DHoverPhysics();
    });
});

/* ================== 1. THEME SWITCHER ================== */
function initThemeSwitcher() {
    const themeDots = document.querySelectorAll('.theme-dot');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('arena-theme') || 'quantum';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeDots.forEach(dot => {
        if (dot.dataset.set === savedTheme) dot.classList.add('active');
        
        dot.addEventListener('click', (e) => {
            const newTheme = e.target.dataset.set;
            
            // Update Body Attribute
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('arena-theme', newTheme);
            
            // Update UI Active State
            themeDots.forEach(d => d.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

/* ================== 2. CUSTOM GSAP CURSOR ================== */
function initCustomCursor() {

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50, rotation: 45 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, rotation: 45 });
    
    // Use GSAP QuickTo for maximum performance (60 FPS)
    const xTo = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
    const xFollowTo = gsap.quickTo(follower, "x", {duration: 0.3, ease: "power3"});
    const yFollowTo = gsap.quickTo(follower, "y", {duration: 0.3, ease: "power3"});
    
    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
        xFollowTo(e.clientX);
        yFollowTo(e.clientY);
    });
    
    // Morph cursor on interactive elements
    const interactives = document.querySelectorAll('a, button, .bento-card, .theme-dot');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(follower, { scale: 1.2, rotation: 135, borderColor: 'var(--primary-accent)', duration: 0.4, ease: "back.out(1.5)" });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, rotation: 45, borderColor: 'rgba(255,255,255,0.4)', duration: 0.4, ease: "back.out(1.5)" });
        });
    });
}

/* ================== 3. MAGNETIC BUTTONS ================== */
function initMagneticButtons() {

    const magnets = document.querySelectorAll('.btn-magnetic');
    
    magnets.forEach(magnet => {
        const xTo = gsap.quickTo(magnet, "x", {duration: 0.4, ease: "elastic.out(1, 0.3)"});
        const yTo = gsap.quickTo(magnet, "y", {duration: 0.4, ease: "elastic.out(1, 0.3)"});
        
        magnet.addEventListener("mousemove", (e) => {
            const rect = magnet.getBoundingClientRect();
            // Calculate distance from center
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            xTo(x);
            yTo(y);
        });
        
        magnet.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
        });
    });
}

/* ================== 4. BENTO GRID 3D HOVER PHYSICS ================== */
function init3DHoverPhysics() {
    const cards = document.querySelectorAll('.bento-card');
    gsap.set(cards, { transformPerspective: 1000 });
    
    cards.forEach(card => {
        // Use quickTo for GPU-efficient direct updates
        const xTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
        const yTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation limits (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            xTo(rotateY);
            yTo(rotateX);
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore original state
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}
