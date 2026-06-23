/**
 * 3D Isometric GitHub Contributions Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('github-grid');
    if (!grid) return;

    const cols = 12; // Weeks
    const rows = 7;  // Days
    const totalBlocks = cols * rows;

    // We will generate a realistic looking distribution of contributions
    // Most days have 0-2 levels, some have 3-4.
    
    for (let i = 0; i < totalBlocks; i++) {
        const pillar = document.createElement('div');
        pillar.className = 'pillar';
        
        // Randomize level (0 to 4)
        // Weighted random to make 0 and 1 more common, 4 rare
        const rand = Math.random();
        let level = 0;
        if (rand > 0.4 && rand <= 0.7) level = 1;
        else if (rand > 0.7 && rand <= 0.85) level = 2;
        else if (rand > 0.85 && rand <= 0.95) level = 3;
        else if (rand > 0.95) level = 4;

        pillar.setAttribute('data-level', level);
        
        // Calculate 3D height based on level
        const height = level === 0 ? 2 : level * 15;
        pillar.style.setProperty('--z-height', `${height}px`);

        // Add tooltip info
        const commits = level === 0 ? 0 : Math.floor(Math.random() * (level * 5)) + 1;
        pillar.title = `${commits} contributions on this day`;

        grid.appendChild(pillar);
    }
});
