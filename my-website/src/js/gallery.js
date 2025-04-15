// Sample image data - replace this with your actual data
const imageData = [
    { src: 'assets/images/mdf117.JPG', date: '2024-03-15', alt: 'Mining community development project' },
    { src: 'assets/images/mdf13.JPG', date: '2024-03-15', alt: 'Community engagement meeting' },
    { src: 'assets/images/mdfpic10.jpg', date: '2024-03-15', alt: 'Community engagement meeting' },
    { src: 'assets/images/mdf24.jpg', date: '2024-03-15', alt: 'Community engagement meeting' },
    { src: 'assets/images/mdf32.jpg', date: '2024-03-15', alt: 'Community engagement meeting' },


    { src: 'assets/images/mdf28.jpg', date: '2024-03-10', alt: 'Infrastructure development' },
    { src: 'assets/images/mdf13.jpg', date: '2024-03-10', alt: 'Educational facility' },
    { src: 'assets/images/mdf15.jpg', date: '2024-03-10', alt: 'Educational facility' },
    { src: 'assets/images/mdf16.jpg', date: '2024-03-10', alt: 'Educational facility' },
    { src: 'assets/images/mdfpic5.jpg', date: '2024-03-10', alt: 'Educational facility' },

    { src: 'assets/images/mdfpic6.jpg', date: '2024-02-28', alt: 'Healthcare center' },
    { src: 'assets/images/mdfpic18.jpg', date: '2024-02-28', alt: 'Water project inauguration' },
    { src: 'assets/images/mdfpic9.jpg', date: '2024-02-28', alt: 'Healthcare center' },
    { src: 'assets/images/mdfpic31.jpg', date: '2024-02-28', alt: 'Water project inauguration' },
    { src: 'assets/images/mdfpic30.jpg', date: '2024-02-28', alt: 'Healthcare center' },
    { src: 'assets/images/pic12.jpg', date: '2024-02-28', alt: 'Water project inauguration' }
];

// Format date to a more readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Group images by date
function groupImagesByDate(images) {
    return images.reduce((groups, image) => {
        const date = image.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(image);
        return groups;
    }, {});
}

// Create lightbox element
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const content = document.createElement('div');
    content.className = 'lightbox-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    const nav = document.createElement('div');
    nav.className = 'lightbox-nav';
    
    const prevBtn = document.createElement('span');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&lt;';
    
    const nextBtn = document.createElement('span');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&gt;';
    
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    content.appendChild(closeBtn);
    content.appendChild(nav);
    lightbox.appendChild(content);
    
    document.body.appendChild(lightbox);
    
    return {
        lightbox,
        content,
        closeBtn,
        prevBtn,
        nextBtn,
        nav
    };
}

// Initialize lightbox
const lightbox = createLightbox();
let currentImageIndex = 0;
let allImages = [];

// Show image in lightbox
function showImage(index) {
    if (index < 0) index = allImages.length - 1;
    if (index >= allImages.length) index = 0;
    
    currentImageIndex = index;
    const image = allImages[index];
    
    // Create new image element
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    
    // Clear existing content except for navigation
    while (lightbox.content.firstChild) {
        lightbox.content.removeChild(lightbox.content.firstChild);
    }
    
    // Rebuild the lightbox content
    lightbox.content.appendChild(lightbox.closeBtn);
    lightbox.content.appendChild(lightbox.nav);
    lightbox.content.appendChild(img);
    
    // Show the lightbox
    lightbox.lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.lightbox.classList.remove('active');
}

// Event listeners for lightbox
lightbox.closeBtn.addEventListener('click', closeLightbox);
lightbox.lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox.lightbox) {
        closeLightbox();
    }
});

lightbox.prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
});

lightbox.nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    }
});

// Create gallery section for a specific date
function createDateSection(date, images) {
    const section = document.createElement('div');
    section.className = 'gallery-date-section';
    
    const heading = document.createElement('h2');
    heading.textContent = formatDate(date);
    section.appendChild(heading);
    
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || '';
        img.loading = 'lazy';
        
        item.appendChild(img);
        grid.appendChild(item);
        
        // Add click handler
        item.addEventListener('click', () => {
            currentImageIndex = allImages.indexOf(image);
            showImage(currentImageIndex);
        });
    });
    
    section.appendChild(grid);
    return section;
}

// Initialize the gallery
function initializeGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // Store all images for lightbox navigation
    allImages = imageData;
    
    // Clear any existing content
    galleryContainer.innerHTML = '';
    
    // Group images by date
    const groupedImages = groupImagesByDate(imageData);
    
    // Sort dates in descending order (newest first)
    const sortedDates = Object.keys(groupedImages).sort((a, b) => new Date(b) - new Date(a));
    
    // Create and append sections for each date
    sortedDates.forEach(date => {
        const section = createDateSection(date, groupedImages[date]);
        galleryContainer.appendChild(section);
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery); 