/**
 * Interactive Skill Tree (Focus Mode)
 */

document.addEventListener('DOMContentLoaded', () => {
    const network = document.getElementById('skills-network');
    const cards = document.querySelectorAll('.skill-card');

    if (!network || cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const id = card.getAttribute('data-id');
            const connectsTo = card.getAttribute('data-connects-to');
            if (!connectsTo) return;
            
            const connectedIds = connectsTo.split(',').map(s => s.trim());

            cards.forEach(otherCard => {
                const otherId = otherCard.getAttribute('data-id');
                if (otherId === id) {
                    // Hovered card
                    otherCard.style.transform = 'translateY(-10px) scale(1.02)';
                    otherCard.style.boxShadow = '0 0 30px rgba(0, 210, 255, 0.4)';
                    otherCard.style.borderColor = 'var(--accent-color)';
                    otherCard.style.zIndex = '10';
                    otherCard.style.opacity = '1';
                } else if (connectedIds.includes(otherId)) {
                    // Connected cards
                    otherCard.style.opacity = '1';
                    otherCard.style.transform = 'translateY(-5px)';
                    otherCard.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.15)';
                    otherCard.style.borderColor = 'rgba(0, 210, 255, 0.3)';
                    otherCard.style.zIndex = '5';
                } else {
                    // Unrelated cards
                    otherCard.style.opacity = '0.3';
                    otherCard.style.transform = 'scale(0.98)';
                    otherCard.style.boxShadow = 'none';
                    otherCard.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    otherCard.style.zIndex = '1';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset all cards
            cards.forEach(otherCard => {
                otherCard.style.opacity = '';
                otherCard.style.transform = '';
                otherCard.style.boxShadow = '';
                otherCard.style.borderColor = '';
                otherCard.style.zIndex = '';
            });
        });
    });
});
