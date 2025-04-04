// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Add scroll event listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu functionality
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Add title attributes to buttons for accessibility
    document.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('title')) {
            const icon = button.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('search')) {
                    button.setAttribute('title', 'Search');
                } else if (iconClass.includes('chevron-left')) {
                    button.setAttribute('title', 'Previous');
                } else if (iconClass.includes('chevron-right')) {
                    button.setAttribute('title', 'Next');
                }
            }
        }
    });
}); 