/**
 * Terminal "Hire Me" Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-curl-btn');
    const terminalBody = document.querySelector('.terminal-body');

    if (!runBtn || !terminalBody) return;

    // Create the success overlay
    const overlay = document.createElement('div');
    overlay.className = 'terminal-overlay';
    overlay.innerHTML = `
        <i class="fas fa-check-circle success-icon"></i>
        <h3>Payload Sent Successfully!</h3>
        <p style="color: #aaa; margin-bottom: 20px;">Initializing secure communication channel...</p>
        <button class="btn primary-btn btn-glow" id="open-whatsapp-btn">
            Open WhatsApp
        </button>
    `;
    terminalBody.appendChild(overlay);

    const whatsappBtn = document.getElementById('open-whatsapp-btn');

    runBtn.addEventListener('click', () => {
        // Change button to running state
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing...';
        
        // Simulate network request delay
        setTimeout(() => {
            overlay.classList.add('active');
            runBtn.innerHTML = '<i class="fas fa-play"></i> Execute';
        }, 1200);
    });

    whatsappBtn.addEventListener('click', () => {
        // Encode a predefined message for WhatsApp
        const message = "Hello Hassan! I just executed your API from the portfolio. We are interested in your architecture skills for a project.";
        const whatsappUrl = `https://wa.me/201226758150?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset after a while
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 1000);
    });
});
