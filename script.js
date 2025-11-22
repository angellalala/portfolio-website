// Wait for the entire page to load before running the code
document.addEventListener('DOMContentLoaded', function() {
    
    // Function to check if an element is visible in the viewport (on screen)
    function isInViewport(element) {
        const rect = element.getBoundingClientRect(); // Checks and get element's position on the page
        
        return ( //returns coordinates
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate the skill progress bars
    function animateSkills() {

        const skillsSection = document.querySelector('.skills'); // Get the element from class 'skills'
        const skillBars = document.querySelectorAll('.skill-progress'); // Get ALL elements with class skill-progress, the bars
        
        // Check if the skills section is visible on screen
        if (isInViewport(skillsSection)) {
            // Loop through each progress bar

            skillBars.forEach(bar => {
                // Get the target percentage from data-progress attribute 
                const progress = bar.getAttribute('data-progress');
                // read the data-progress from html for the element
                bar.style.width = progress + '%';
                //changes width from 0 to set number, triggers CSS
            });
            
            // Remove the scroll listener so animation only happens once
            window.removeEventListener('scroll', animateSkills);
        }
    }

    // Listen for scroll events - every time user scrolls, check if we should animate
    window.addEventListener('scroll', animateSkills);
    
    // Also check immediately when page loads (in case skills section is already visible)
    animateSkills();
});