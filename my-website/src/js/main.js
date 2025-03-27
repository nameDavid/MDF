document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const closeButton = document.querySelector('#close-button');

    hamburger.addEventListener('click', () => {
        // Toggle active class for hamburger animation
        hamburger.classList.toggle('active');
        // Toggle navigation menu
        navLinks.classList.toggle('active');
        searchBox.classList.remove('active');
        closeButton.style.display = 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Search functionality
    

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.classList.add('active');
       
    });

    closeButton.addEventListener('click', () => {
        searchBox.classList.remove('active');
        closeButton.style.display = 'none';
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = searchInput.contains(e.target) || 
                            searchBtn.contains(e.target) ||
                            closeButton.contains(e.target);
        
        if (!isClickInside && searchInput.classList.contains('active')) {
            searchBox.classList.remove('active');
            closeButton.style.display = 'none';
        }
    });
});