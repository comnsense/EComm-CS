S// Theme switching function
function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
    
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => dot.classList.remove('active'));
    
    const activeDot = document.querySelector(`.dot-${themeName}`);
    if (activeDot) activeDot.classList.add('active');
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    setTheme(savedTheme);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    
    // Theme dots
    const darkDot = document.querySelector('.dot-dark');
    const lightDot = document.querySelector('.dot-light');
    
    if (darkDot) {
        darkDot.addEventListener('click', () => setTheme('dark'));
    }
    
    if (lightDot) {
        lightDot.addEventListener('click', () => setTheme('light'));
    }
});