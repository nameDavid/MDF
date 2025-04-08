/**
 * Responsive Header and Hamburger Menu
 * This script handles the responsive header functionality, including:
 * 1. Toggle hamburger menu for mobile devices
 * 2. Change header background on scroll
 * 3. Handle dropdowns within the mobile menu
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle active classes
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle mobile dropdown menus
    const isMobile = () => window.innerWidth <= 1024;
    
    // For touch devices, make dropdowns toggle on click rather than hover
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        dropdowns.forEach(dropdown => {
            const dropdownBtn = dropdown.querySelector('.dropbtn');
            
            if (dropdownBtn) {
                dropdownBtn.addEventListener('click', function(e) {
                    if (isMobile()) {
                        e.preventDefault();
                        
                        // Close all other dropdowns
                        dropdowns.forEach(d => {
                            if (d !== dropdown && d.querySelector('.dropdown-content').classList.contains('show')) {
                                d.querySelector('.dropdown-content').classList.remove('show');
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.querySelector('.dropdown-content').classList.toggle('show');
                    }
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobile()) {
                dropdowns.forEach(dropdown => {
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    const dropdownBtn = dropdown.querySelector('.dropbtn');
                    
                    if (dropdownContent && dropdownContent.classList.contains('show') 
                        && !dropdown.contains(e.target) && e.target !== dropdownBtn) {
                        dropdownContent.classList.remove('show');
                    }
                });
            }
        });
    }
    
    // Resize event handler
    window.addEventListener('resize', function() {
        if (!isMobile() && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
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