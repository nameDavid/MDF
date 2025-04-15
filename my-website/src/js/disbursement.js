// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });

    // Add fade-in class to disbursement items
    const disbursementItems = document.querySelectorAll('.disbursement-item');
    disbursementItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Add fade-in to disbursement chart
    const disbursementChart = document.querySelector('.disbursement-chart');
    if (disbursementChart) {
        disbursementChart.classList.add('fade-in');
        observer.observe(disbursementChart);
    }

    // Handle expandable table cells
    const expandableCells = document.querySelectorAll('.utilization-table td.expandable');
    expandableCells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('active');
        });
    });

    // Animate percentage circles
    const percentageCircles = document.querySelectorAll('.percentage-circle');
    percentageCircles.forEach(circle => {
        const percentage = circle.parentElement.getAttribute('data-percentage');
        const circumference = 2 * Math.PI * 40; // radius = 40px
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.setProperty('--percentage', percentage);
        circle.style.setProperty('--offset', offset);
    });
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect for table rows
const tableRows = document.querySelectorAll('.utilization-table tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = '#f8f9fa';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = '';
    });
});

// Handle responsive table
function handleResponsiveTable() {
    const tableContainer = document.querySelector('.table-container');
    if (window.innerWidth < 768) {
        tableContainer.style.overflowX = 'auto';
    } else {
        tableContainer.style.overflowX = 'visible';
    }
}

// Initialize and handle window resize
handleResponsiveTable();
window.addEventListener('resize', handleResponsiveTable); 