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

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Navbar Glass Effect Change on Scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            // Remove old inline styles if any
            nav.style.background = '';
            nav.style.boxShadow = '';
        } else {
            nav.classList.remove('scrolled');
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

    // 7. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            // Delay main cursor slightly for a smooth dragging effect
            setTimeout(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }, 50);
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover effect for links and buttons
        const hoverables = document.querySelectorAll('a, button, .btn, .social-card, .mobile-menu-btn, .whatsapp-float');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    // 8. Typewriter Effect
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const words = ['Innovation', 'Excellence', 'Intelligence'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 1000); // Initial delay
    }

    // 9. Initialize 3D Tilt for Glass Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
        
        VanillaTilt.init(document.querySelectorAll(".phone-mockup"), {
            max: 10,
            speed: 400,
            scale: 1.05,
        });
    }

    // 10. Interactive Background Blobs
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length > 0 && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            blobs[0].style.transform = `translate(${x * 100}px, ${y * 100}px)`;
            blobs[1].style.transform = `translate(${x * -80}px, ${y * -80}px)`;
            if(blobs[2]) {
                 blobs[2].style.transform = `translate(-50%, -50%) translate(${x * 60}px, ${y * 60}px)`;
            }
        });
    }
});
