document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const closeButton = document.querySelector('#close-button');
 
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');


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
        console.log(searchBox);
  
       
    });

    closeButton.addEventListener('click', () => {
        searchBox.classList.remove('active');
        closeButton.style.display = 'none';
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = searchBox.contains(e.target) || 
                            searchBtn.contains(e.target) ||
                            closeButton.contains(e.target);
        
        if (!isClickInside && searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
            closeButton.style.display = 'none';
        }
    });

    // Dropdown Mobile Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown && d.classList.contains('active')) {
                        d.classList.remove('active');
                        d.querySelector('.fa-angle-down').style.transform = 'rotate(0)';
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                const icon = dropbtn.querySelector('.fa-angle-down');
                icon.style.transform = dropdown.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0)';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const icon = dropdown.querySelector('.fa-angle-down');
                if (icon) icon.style.transform = 'rotate(0)';
            });
        }
    });

    // Slider functionality
    let slideIndex = 1;
    let slideInterval;

    function showSlides(n) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[slideIndex - 1].classList.add('active');
        dots[slideIndex - 1].classList.add('active');
    }

    function changeSlide(n) {
        clearInterval(slideInterval);
        showSlides(slideIndex += n);
        startAutoSlide();
    }

    function currentSlide(n) {
        clearInterval(slideInterval);
        showSlides(slideIndex = n);
        startAutoSlide();
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => {
            showSlides(slideIndex += 1);
        }, 5000); // Change slide every 5 seconds
    }

    // Initialize slider
    showSlides(slideIndex);
    startAutoSlide();

    prevBtn.addEventListener('click', () => changeSlide(-1));   
    nextBtn.addEventListener('click', () => changeSlide(1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1));
    });
    // Pause slider on hover        
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseover', () => {
        clearInterval(slideInterval);
    });
    slider.addEventListener('mouseout', () => {
        startAutoSlide();
    });

    // News Slider
    const track = document.querySelector('.news-track');
    const cards = document.querySelectorAll('.news-card');
    const prevNewsBtn = document.querySelector('.prev-news');
    const nextNewsBtn = document.querySelector('.next-news');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevNewsBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextNewsBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 3) { // Show 3 cards at a time
            currentIndex++;
            updateSlider();
        }
    });
    
    // Update slider position on window resize
    window.addEventListener('resize', updateSlider);

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        
        // Add your newsletter subscription logic here
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Add animation delays to links
    const links = document.querySelectorAll('.container a');
    links.forEach((link, index) => {
        link.style.setProperty('--delay', index + 1);
    });
});

// Add event listener for window resize to close dropdowns if open  
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const icon = dropdown.querySelector('.fa-angle-down');
            if (icon) icon.style.transform = 'rotate(0)';
        });
    }
    if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});