document.addEventListener('DOMContentLoaded', function() {
    // Map controls functionality
    const mapFrame = document.querySelector('.map-frame iframe');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetMapBtn = document.getElementById('reset-map');

    // Add title attributes to buttons for accessibility
    zoomInBtn.setAttribute('title', 'Zoom In');
    zoomOutBtn.setAttribute('title', 'Zoom Out');
    resetMapBtn.setAttribute('title', 'Reset Map');

    // Sample project data (replace with actual data from your backend)
    const projects = [
        {
            id: 1,
            title: 'Community Health Center',
            location: 'Ashanti Region',
            status: 'Ongoing',
            image: 'assets/images/project1.jpg',
            coordinates: { lat: 6.7, lng: -1.6 }
        },
        // Add more projects as needed
    ];

    // Function to update project cards
    function updateProjectCards(projects) {
        const projectGrid = document.querySelector('.project-grid');
        projectGrid.innerHTML = '';

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>Location: ${project.location}</p>
                    <p>Status: ${project.status}</p>
                    <a href="#" class="project-details-btn" data-project-id="${project.id}">View Details</a>
                </div>
            `;
            projectGrid.appendChild(projectCard);
        });
    }

    // Initialize project cards
    updateProjectCards(projects);

    // Map interaction handlers
    zoomInBtn.addEventListener('click', function() {
        // Implement zoom in functionality
        console.log('Zoom in clicked');
    });

    zoomOutBtn.addEventListener('click', function() {
        // Implement zoom out functionality
        console.log('Zoom out clicked');
    });

    resetMapBtn.addEventListener('click', function() {
        // Implement reset map functionality
        console.log('Reset map clicked');
    });

    // Project card click handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-details-btn')) {
            e.preventDefault();
            const projectId = e.target.getAttribute('data-project-id');
            // Implement project details view
            console.log('View project details:', projectId);
        }
    });

    // Responsive adjustments
    function adjustMapHeight() {
        const mapFrame = document.querySelector('.map-frame');
        if (window.innerWidth <= 768) {
            mapFrame.style.height = '400px';
        } else if (window.innerWidth <= 480) {
            mapFrame.style.height = '300px';
        } else {
            mapFrame.style.height = '600px';
        }
    }

    // Initial adjustment
    adjustMapHeight();

    // Adjust on window resize
    window.addEventListener('resize', adjustMapHeight);
}); 