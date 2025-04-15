    // Add fade-in to preamble boxes
    const preambleBoxes = document.querySelectorAll('.mandate-box, .object-box');
    preambleBoxes.forEach((box, index) => {
        box.classList.add('fade-in');
        box.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(box);
    });