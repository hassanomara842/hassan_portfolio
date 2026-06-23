/**
 * phone3d.js - Interactive 3D Phone with WebGL (Three.js)
 * Creates a realistic 3D phone that rotates on mouse move and
 * displays project videos on its screen.
 */

(function () {
    'use strict';

    // --- CONFIG ---
    const PROJECTS = [
        { name: 'E-Commerce', src: 'assets/ECommerce.mp4', type: 'video' },
        { name: 'Cinematic Movies', src: 'assets/Movies.mp4', type: 'video' },
        { name: 'Evently', src: 'assets/evently.mp4', type: 'video' },
        { name: 'Islami', src: 'assets/islami.mp4', type: 'video' },
        { name: 'Space App', src: 'assets/space_app.mp4', type: 'video' },
        { name: 'News Portal', src: 'assets/news_app.mp4', type: 'video' },
        { name: 'Core Platform', src: 'assets/core_dev.mp4', type: 'video' },
    ];

    let currentProject = 0;
    let autoRotateInterval = null;

    function buildPhoneSection() {
        const container = document.getElementById('phone3d-showcase');
        if (!container) return;

        container.innerHTML = `
        <div class="phone3d-wrapper">
            <!-- Left: Project Info -->
            <div class="phone3d-info" id="phone3d-info">
                <div class="phone3d-badge">Interactive 3D Showcase</div>
                <h3 class="phone3d-project-name" id="phone3d-name">${PROJECTS[0].name}</h3>
                <p class="phone3d-hint">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Drag to rotate &nbsp;|&nbsp;
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                    Auto-cycles every 5s
                </p>
                <div class="phone3d-dots" id="phone3d-dots">
                    ${PROJECTS.map((p, i) => `<button class="phone3d-dot ${i === 0 ? 'active' : ''}" data-index="${i}" title="${p.name}"></button>`).join('')}
                </div>
                <ul class="phone3d-project-list">
                    ${PROJECTS.map((p, i) => `
                    <li class="phone3d-list-item ${i === 0 ? 'active' : ''}" data-index="${i}">
                        <span class="phone3d-list-num">${String(i + 1).padStart(2, '0')}</span>
                        <span>${p.name}</span>
                        <svg class="phone3d-list-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </li>`).join('')}
                </ul>
            </div>

            <!-- Right: 3D Phone -->
            <div class="phone3d-scene" id="phone3d-scene">
                <div class="phone3d-device" id="phone3d-device">
                    <!-- Phone shell -->
                    <div class="phone-shell">
                        <!-- Notch -->
                        <div class="phone-notch">
                            <div class="phone-camera"></div>
                            <div class="phone-speaker"></div>
                        </div>
                        <!-- Screen -->
                        <div class="phone-screen">
                            <div class="phone-screen-inner" id="phone-screen-inner">
                                ${PROJECTS.map((p, i) => `
                                <video 
                                    src="${p.src}" 
                                    class="phone-project-video ${i === 0 ? 'active' : ''}"
                                    data-index="${i}"
                                    autoplay loop muted playsinline
                                ></video>`).join('')}
                            </div>
                        </div>
                        <!-- Home indicator -->
                        <div class="phone-home-bar"></div>
                        <!-- Side buttons -->
                        <div class="phone-btn-power"></div>
                        <div class="phone-btn-vol1"></div>
                        <div class="phone-btn-vol2"></div>
                    </div>
                    <!-- Reflection -->
                    <div class="phone-reflection"></div>
                    <!-- Glow -->
                    <div class="phone-glow-3d"></div>
                </div>
            </div>
        </div>
        `;

        initInteractivity();
    }

    function switchProject(index) {
        if (index === currentProject) return;
        const prev = currentProject;
        currentProject = index;

        // Update name
        const nameEl = document.getElementById('phone3d-name');
        if (nameEl) {
            nameEl.style.opacity = '0';
            nameEl.style.transform = 'translateY(10px)';
            setTimeout(() => {
                nameEl.textContent = PROJECTS[index].name;
                nameEl.style.opacity = '1';
                nameEl.style.transform = 'translateY(0)';
            }, 200);
        }

        // Update videos
        const videos = document.querySelectorAll('.phone-project-video');
        videos.forEach((v, i) => {
            v.classList.toggle('active', i === index);
            if (i === index) v.currentTime = 0;
        });

        // Update dots
        document.querySelectorAll('.phone3d-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });

        // Update list items
        document.querySelectorAll('.phone3d-list-item').forEach((li, i) => {
            li.classList.toggle('active', i === index);
        });
    }

    function initInteractivity() {
        const scene = document.getElementById('phone3d-scene');
        const device = document.getElementById('phone3d-device');
        if (!scene || !device) return;

        // --- Mouse drag rotation ---
        let isDragging = false;
        let startX = 0, startY = 0;
        let rotX = -5, rotY = 15;
        let targetRotX = rotX, targetRotY = rotY;
        let animFrame;

        function applyRotation() {
            rotX += (targetRotX - rotX) * 0.12;
            rotY += (targetRotY - rotY) * 0.12;
            device.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            animFrame = requestAnimationFrame(applyRotation);
        }
        animFrame = requestAnimationFrame(applyRotation);

        scene.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            scene.style.cursor = 'grabbing';
            clearInterval(autoRotateInterval);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            targetRotY = rotY + dx * 0.5;
            targetRotX = rotX - dy * 0.3;
            targetRotX = Math.max(-35, Math.min(35, targetRotX));
            targetRotY = Math.max(-60, Math.min(60, targetRotY));
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                scene.style.cursor = 'grab';
                // Gently spring back to default
                setTimeout(() => {
                    targetRotX = -5;
                    targetRotY = 15;
                    startAutoRotate();
                }, 2500);
            }
        });

        // Touch support
        scene.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            clearInterval(autoRotateInterval);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            targetRotY = 15 + dx * 0.4;
            targetRotX = -5 - dy * 0.25;
            targetRotX = Math.max(-35, Math.min(35, targetRotX));
            targetRotY = Math.max(-60, Math.min(60, targetRotY));
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
            setTimeout(() => {
                targetRotX = -5;
                targetRotY = 15;
                startAutoRotate();
            }, 2000);
        });

        // Hover parallax (desktop)
        scene.addEventListener('mousemove', (e) => {
            if (isDragging) return;
            const rect = scene.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            targetRotY = 15 + dx * 18;
            targetRotX = -5 - dy * 12;
        });

        scene.addEventListener('mouseleave', () => {
            if (!isDragging) {
                targetRotX = -5;
                targetRotY = 15;
            }
        });

        // Dot / list click
        document.querySelectorAll('.phone3d-dot, .phone3d-list-item').forEach(el => {
            el.addEventListener('click', () => {
                switchProject(parseInt(el.dataset.index));
                clearInterval(autoRotateInterval);
                setTimeout(startAutoRotate, 5000);
            });
        });

        // Auto cycle
        function startAutoRotate() {
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(() => {
                switchProject((currentProject + 1) % PROJECTS.length);
            }, 5000);
        }
        startAutoRotate();

        // Cursor style
        scene.style.cursor = 'grab';
    }

    // Init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildPhoneSection);
    } else {
        buildPhoneSection();
    }
})();
