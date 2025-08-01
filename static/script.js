document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Smooth scrolling for anchor links
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

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        });
    }

    // Floating Action Button functionality
    const floatingAction = document.querySelector('.floating-action');
    const fabMain = document.querySelector('.fab-main');
    const fabOptions = document.querySelector('.fab-options');
    
    if (floatingAction && fabMain) {
        let isOpen = false;
        
        fabMain.addEventListener('click', function(e) {
            e.stopPropagation();
            isOpen = !isOpen;
            floatingAction.classList.toggle('active', isOpen);
        });
        
        document.addEventListener('click', function() {
            if (isOpen) {
                isOpen = false;
                floatingAction.classList.remove('active');
            }
        });
    }

    // Services carousel auto-rotation
    const serviceSlides = document.querySelectorAll('.service-slide');
    if (serviceSlides.length > 0) {
        let currentSlide = 0;
        
        function showNextSlide() {
            serviceSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % serviceSlides.length;
            serviceSlides[currentSlide].classList.add('active');
        }
        
        // Auto-rotate every 5 seconds
        setInterval(showNextSlide, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const countUpAnimation = (element, target) => {
        const targetValue = parseInt(target.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = targetValue / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + target.replace(/[\d]/g, '').replace(/^\d+/, '');
        }, 16);
    };

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                countUpAnimation(entry.target, originalText);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form handling for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
        });
    });

    // Mobile navigation enhancement
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile nav when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Your scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});