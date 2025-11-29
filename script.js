// Wait for the entire page to load before running the code
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DARK MODE TOGGLE ==========
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ========== BACK TO TOP BUTTON ==========
    
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== SKILLS ANIMATION ==========
    
    // Function to check if an element is visible in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to animate the skill progress bars
    function animateSkills() {
        const skillsSection = document.querySelector('.skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (isInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // ========== IMAGE SLIDER ==========
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    // Only run slider code if slider exists on the page
    if (slides.length > 0) {
        let currentSlide = 0;
        let autoSlideInterval;
        let isPlaying = true;
        
        // Create dots dynamically
        function createDots() {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                sliderDots.appendChild(dot);
            });
        }
        
        // Update slide counter
        function updateCounter() {
            slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
        }
        
        // Show specific slide
        function showSlide(n) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Handle slide boundaries (wrap around)
            if (n >= slides.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = n;
            }
            
            // Show current slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Update counter
            updateCounter();
        }
        
        // Next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Go to specific slide
        function goToSlide(n) {
            showSlide(n);
            resetAutoSlide(); // Reset timer when manually navigating
        }
        
        // Auto slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
            isPlaying = true;
            playPauseBtn.textContent = '⏸ Pause';
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
            isPlaying = false;
            playPauseBtn.textContent = '▶ Play';
        }
        
        function resetAutoSlide() {
            if (isPlaying) {
                stopAutoSlide();
                startAutoSlide();
            }
        }
        
        // Toggle play/pause
        function togglePlayPause() {
            if (isPlaying) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        }
        
        // Event Listeners
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        
        playPauseBtn.addEventListener('click', togglePlayPause);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoSlide();
            }
        });
        
        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderContainer = document.querySelector('.slider-container');
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swiped left - next slide
                nextSlide();
                resetAutoSlide();
            }
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swiped right - previous slide
                prevSlide();
                resetAutoSlide();
            }
        }
        
        // Initialize slider
        createDots();
        updateCounter();
        startAutoSlide();
        
        // Pause auto-slide when user hovers over slider
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', () => {
            if (isPlaying) startAutoSlide();
        });
    }

    // ========== PROJECT CARDS CLICK EVENTS (NO <a> TAGS) ==========
    
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listener to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the URL from the data-url attribute
            const projectUrl = this.getAttribute('data-url');
            
            // Check if URL exists
            if (projectUrl) {
                // Add a visual feedback before redirecting
                this.style.transform = 'scale(0.95)';
                
                // Small delay for visual feedback, then redirect
                setTimeout(() => {
                    window.location.href = projectUrl;
                }, 150);
            } else {
                console.error('No URL found for this project card');
            }
        });
        
        // Optional: Add keyboard accessibility (Enter key)
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const projectUrl = this.getAttribute('data-url');
                if (projectUrl) {
                    window.location.href = projectUrl;
                }
            }
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });

    // ========== HTML5 CANVAS DRAWING ==========
    
    const canvas = document.getElementById('drawingCanvas');
    
    // Only run canvas code if canvas exists on the page
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('colorPicker');
        
        let isDrawing = false;
        let currentColor = '#9150CF';
        
        // Initialize canvas with a welcome message
        function initCanvas() {
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = 'bold 30px Poppins, sans-serif';
            ctx.fillStyle = '#9150CF';
            ctx.textAlign = 'center';
            ctx.fillText('Try drawing on me! 🎨', canvas.width / 2, canvas.height / 2);
            
            ctx.font = '16px Poppins, sans-serif';
            ctx.fillStyle = '#666';
            ctx.fillText('Use your mouse or click the buttons below', canvas.width / 2, canvas.height / 2 + 40);
        }
        
        initCanvas();
        
        // Clear Canvas Button
        document.getElementById('clearCanvas').addEventListener('click', function() {
            initCanvas();
        });
        
        // Draw Circle Button
        document.getElementById('drawCircle').addEventListener('click', function() {
            const x = Math.random() * (canvas.width - 100) + 50;
            const y = Math.random() * (canvas.height - 100) + 50;
            const radius = Math.random() * 40 + 20;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = currentColor;
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        // Draw Square Button
        document.getElementById('drawSquare').addEventListener('click', function() {
            const x = Math.random() * (canvas.width - 100) + 20;
            const y = Math.random() * (canvas.height - 100) + 20;
            const size = Math.random() * 60 + 40;
            
            ctx.fillStyle = currentColor;
            ctx.fillRect(x, y, size, size);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, size, size);
        });
        
        // Draw Text Button
        document.getElementById('drawText').addEventListener('click', function() {
            const x = canvas.width / 2;
            const y = Math.random() * (canvas.height - 50) + 50;
            
            ctx.font = 'bold 24px Poppins, sans-serif';
            ctx.fillStyle = currentColor;
            ctx.textAlign = 'center';
            ctx.fillText('Hello Canvas!', x, y);
        });
        
        // Color Picker
        colorPicker.addEventListener('change', function() {
            currentColor = this.value;
        });
        
        // Mouse Drawing Functionality
        canvas.addEventListener('mousedown', function(e) {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        canvas.addEventListener('mousemove', function(e) {
            if (isDrawing) {
                const rect = canvas.getBoundingClientRect();
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        });
        
        canvas.addEventListener('mouseup', function() {
            isDrawing = false;
        });
        
        canvas.addEventListener('mouseleave', function() {
            isDrawing = false;
        });
        
        // Touch Support for Mobile
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
        });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (isDrawing) {
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        });
        
        canvas.addEventListener('touchend', function() {
            isDrawing = false;
        });
    }

    // ========== FORM VALIDATION & localStorage ==========
    
    const contactForm = document.getElementById('contactForm');
    
    // Only run form validation if the form exists on the page
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate Name (at least 2 characters, only letters and spaces)
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                showError('nameError', 'Name can only contain letters and spaces');
                isValid = false;
            }
            
            // Validate Email (basic email pattern)
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Message (at least 10 characters)
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If all validations pass
            if (isValid) {
                // Create form data object
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    submittedAt: new Date().toLocaleString()
                };
                
                // Store in localStorage
                localStorage.setItem('contactFormData', JSON.stringify(formData));
                
                // Redirect to form details page
                window.location.href = 'form-details.html';
            }
        });
    }
    
    // Function to show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Function to clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
});