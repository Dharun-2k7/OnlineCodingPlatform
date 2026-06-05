// =========================================================================
// THE QUANTUM ARENA - Minimal Interactions & Theme Logic
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
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
