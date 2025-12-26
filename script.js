// Emily Fang Portfolio - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Cursor Glow Effect (Global)
    // ==========================================
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '0.6';
        });
    }
    
    // ==========================================
    // Experience Section Mouse Glow
    // ==========================================
    const experienceSection = document.querySelector('.experience');
    const experienceGlow = document.getElementById('experience-glow');
    
    if (experienceSection && experienceGlow && window.innerWidth > 768) {
        experienceSection.addEventListener('mousemove', (e) => {
            const rect = experienceSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            experienceGlow.style.left = x + 'px';
            experienceGlow.style.top = y + 'px';
            experienceGlow.style.opacity = '0.5';
        });
        
        experienceSection.addEventListener('mouseleave', () => {
            experienceGlow.style.opacity = '0';
        });
    }

    // ==========================================
    // Awards Section Mouse Glow
    // ==========================================
    const awardsSection = document.querySelector('.awards');
    const awardsGlow = document.getElementById('awards-glow');
    
    if (awardsSection && awardsGlow && window.innerWidth > 768) {
        awardsSection.addEventListener('mousemove', (e) => {
            const rect = awardsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            awardsGlow.style.left = x + 'px';
            awardsGlow.style.top = y + 'px';
            awardsGlow.style.opacity = '0.5';
        });
        
        awardsSection.addEventListener('mouseleave', () => {
            awardsGlow.style.opacity = '0';
        });
    }

    // ==========================================
    // Contact Section Mouse Glow
    // ==========================================
    const contactSection = document.querySelector('.contact');
    const contactGlow = document.getElementById('contact-glow');
    
    if (contactSection && contactGlow && window.innerWidth > 768) {
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            contactGlow.style.left = x + 'px';
            contactGlow.style.top = y + 'px';
            contactGlow.style.opacity = '0.4';
        });
        
        contactSection.addEventListener('mouseleave', () => {
            contactGlow.style.opacity = '0';
        });
    }

    // ==========================================
    // Dark/Light Mode Toggle
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // ==========================================
    // Navbar Style on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = document.body.classList.contains('light-mode') 
                ? 'rgba(250, 250, 250, 0.95)' 
                : 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = document.body.classList.contains('light-mode')
                ? 'rgba(250, 250, 250, 0.85)'
                : 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // ==========================================
    // Scroll Reveal Animations
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.timeline-item, .publication-card, .award-card, .skill-tag, .education-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // ==========================================
    // Active Navigation Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
            
            if (link && !link.classList.contains('nav-cta')) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    link.style.color = 'var(--primary)';
                } else {
                    link.style.color = '';
                }
            }
        });
    });
    
    // ==========================================
    // Magnetic Button Effect
    // ==========================================
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0, 0)';
        });
    });
    
    // ==========================================
    // Typing Effect for Badge (Optional Enhancement)
    // ==========================================
    const badgeText = document.querySelector('.badge-text');
    if (badgeText) {
        const text = badgeText.textContent;
        badgeText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                badgeText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 800);
    }
});