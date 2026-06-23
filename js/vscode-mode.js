/**
 * VS Code Mode Toggle Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject the toggle button into the navbar if it doesn't exist
    const navContent = document.querySelector('.nav-content');
    if (navContent && !document.getElementById('vscode-toggle')) {
        const btn = document.createElement('button');
        btn.id = 'vscode-toggle';
        btn.className = 'vscode-toggle';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span class="vscode-toggle-text">Code Mode</span>
        `;
        
        // Insert it before the mobile menu button or at the end
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn) {
            navContent.insertBefore(btn, mobileBtn);
        } else {
            navContent.appendChild(btn);
        }

        // Toggle logic
        btn.addEventListener('click', () => {
            document.body.classList.toggle('vscode-mode');
            const isVsCode = document.body.classList.contains('vscode-mode');
            localStorage.setItem('vscode-mode', isVsCode ? 'enabled' : 'disabled');
            
            // Update button text
            const textSpan = btn.querySelector('.vscode-toggle-text');
            if (textSpan) {
                textSpan.textContent = isVsCode ? 'UI Mode' : 'Code Mode';
            }
        });

        // Check initial state
        const savedMode = localStorage.getItem('vscode-mode');
        if (savedMode === 'enabled') {
            document.body.classList.add('vscode-mode');
            const textSpan = btn.querySelector('.vscode-toggle-text');
            if (textSpan) {
                textSpan.textContent = 'UI Mode';
            }
        }
    }
});
