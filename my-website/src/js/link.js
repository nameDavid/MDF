// Add animation delays to links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.container a');
    links.forEach((link, index) => {
        link.style.setProperty('--delay', index + 1);
    });
});