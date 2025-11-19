// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll to top smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Component card click handlers
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        
        learnMoreBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const componentType = card.getAttribute('data-component');
            showComponentDetail(componentType);
        });
        
        // Also make the entire card clickable
        card.addEventListener('click', function() {
            const componentType = this.getAttribute('data-component');
            showComponentDetail(componentType);
        });
    });

    // Function to show component detail section
    function showComponentDetail(componentType) {
        // Hide all sections
        sections.forEach(s => s.classList.remove('active'));
        
        // Remove active class from nav links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Show the detail section
        const detailSection = document.getElementById(componentType);
        if (detailSection) {
            detailSection.classList.add('active');
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Back button handlers
    const backButtons = document.querySelectorAll('.back-btn');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide all sections
            sections.forEach(s => s.classList.remove('active'));
            
            // Show home section
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.add('active');
            }
            
            // Set home nav link as active
            navLinks.forEach(l => l.classList.remove('active'));
            const homeNavLink = document.querySelector('.nav-link[href="#home"]');
            if (homeNavLink) {
                homeNavLink.classList.add('active');
            }
            
            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to go back to home
        if (e.key === 'Escape') {
            const activeSection = document.querySelector('.section.active');
            if (activeSection && activeSection.id !== 'home' && activeSection.id !== 'about') {
                const backBtn = activeSection.querySelector('.back-btn');
                if (backBtn) {
                    backBtn.click();
                }
            }
        }
    });

    // Add visual feedback for card interactions
    componentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe component cards for entrance animation
    componentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Console message for developers
    console.log('%cFPV Drone Components Guide', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cExplore comprehensive information about FPV drone components', 'font-size: 14px; color: #6b7280;');
});
