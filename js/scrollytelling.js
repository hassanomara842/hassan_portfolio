/**
 * Scrollytelling Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const path = document.querySelector('.journey-path');
    const dot = document.querySelector('.journey-dot');
    const aboutSection = document.querySelector('.about');

    if (!path || !dot || !aboutSection) return;

    // Get length of the path
    const pathLength = path.getTotalLength();
    
    // Set up path for drawing
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
        // Calculate how far down the user has scrolled in the about section
        const sectionTop = aboutSection.offsetTop - (window.innerHeight / 2);
        const sectionHeight = aboutSection.offsetHeight;
        const scrollPosition = window.scrollY - sectionTop;

        let scrollPercentage = scrollPosition / sectionHeight;
        
        // Clamp between 0 and 1
        if (scrollPercentage < 0) scrollPercentage = 0;
        if (scrollPercentage > 1) scrollPercentage = 1;

        // Draw line
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;

        // Move dot along the path
        const point = path.getPointAtLength(drawLength);
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
    });
});
