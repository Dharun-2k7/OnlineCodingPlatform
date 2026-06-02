document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // 2. 3D Tilt Effect for Mission Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const tiltY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // 3. Spotlight effect for Who We Are box
    const spotlightBox = document.querySelector('.spotlight-box');
    if (spotlightBox) {
        spotlightBox.addEventListener('mousemove', e => {
            const rect = spotlightBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            spotlightBox.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 64, 129, 0.1) 0%, rgba(20, 20, 25, 0.6) 40%)`;
        });
        
        spotlightBox.addEventListener('mouseleave', () => {
            spotlightBox.style.background = `rgba(20, 20, 25, 0.6)`;
        });
    }

});
