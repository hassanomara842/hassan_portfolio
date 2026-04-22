// main.js

document.addEventListener('DOMContentLoaded', () => {

    // 0. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside the drawer
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // 1. Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Scroll Reveal Animations (Upgraded to IntersectionObserver for perfect reliability)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it fully comes into view
        threshold: 0
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Navbar Glass Effect Change on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 8, 0.9)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(5, 5, 8, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Subtle Mouse Parallax on Hero Section
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');

    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            heroContent.style.transform = `translate(0px, 0px)`;
            heroContent.style.transition = `transform 0.5s ease`;
        });

        hero.addEventListener('mouseenter', () => {
            heroContent.style.transition = `none`;
        });
    }

    // 6. Moving Stars Background
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, stars;

        const initStars = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            stars = [];
            // Create 150 moving stars
            for (let i = 0; i < 150; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    speed: Math.random() * 0.5 + 0.1,
                    alpha: Math.random()
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];

                // Draw a beautiful star
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
                ctx.fill();

                // Move the star upward
                s.y -= s.speed;

                // Reset at bottom if out of view
                if (s.y < 0) {
                    s.y = height;
                    s.x = Math.random() * width;
                }

                // Tiny twinkle effect
                s.alpha += (Math.random() - 0.5) * 0.05;
                if (s.alpha > 1) s.alpha = 1;
                if (s.alpha < 0.2) s.alpha = 0.2;
            }

            requestAnimationFrame(drawStars);
        };

        initStars();
        drawStars();
        window.addEventListener('resize', initStars);
    }

    // 7. Video Lazy Loading and Play on Scroll
    const projectVideos = document.querySelectorAll('.project-video');
    if (projectVideos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(e => console.log('Autoplay prevented', e));
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.1, // Play when 10% visible
            rootMargin: '100px' // Start loading slightly before it comes into view
        });

        projectVideos.forEach(video => {
            videoObserver.observe(video);
        });
    }
});
