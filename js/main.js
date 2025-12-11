document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // --- Lightbox for Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        const lightboxImg = document.createElement('img');
        const lightboxClose = document.createElement('div');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';

        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxClose);
        document.body.appendChild(lightbox);

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.src;
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    // --- Contact Form Validation & Handling ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const errorName = document.getElementById('error-name');
            const errorEmail = document.getElementById('error-email');
            const errorMessage = document.getElementById('error-message');
            const successMsg = document.getElementById('success-msg');
            const btn = contactForm.querySelector('button');

            // Reset States
            let isValid = true;
            errorName.style.display = 'none';
            errorEmail.style.display = 'none';
            errorMessage.style.display = 'none';
            successMsg.style.display = 'none';

            // Validate Name
            if (!nameInput.value.trim()) {
                errorName.style.display = 'block';
                isValid = false;
            }

            // Validate Email (Simple Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.style.display = 'block';
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                errorMessage.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                btn.disabled = true;
                
                // Simulate network request
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMsg.style.display = 'block';
                    btn.innerText = originalText;
                    btn.disabled = false;
                    contactForm.reset();
                }, 1000);
            }
        });
    }

    // --- Active Link Highlight ---
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    menuItem.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
});