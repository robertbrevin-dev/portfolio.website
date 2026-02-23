// ============================================
// 1. SMOOTH SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .contact-item, .about-content, .section-title');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });
});

// ============================================
// 2. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const navLinksUl = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    // Insert hamburger before nav links
    navbar.insertBefore(hamburger, navLinksUl);
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        navLinksUl.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksUl.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
};

createMobileMenu();

// ============================================
// 4. TYPING ANIMATION
// ============================================
const typingAnimation = () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    const texts = [
        'Software Developer | Technology Enthusiast | Problem Solver',
        'Full Stack Developer | Innovation Driver',
        'Code Craftsman | Digital Creator',
        'Tech Innovator | Solution Architect'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);
};

typingAnimation();

// ============================================
// 5. PROJECT FILTERING
// ============================================
const createProjectFilters = () => {
    const projectsSection = document.querySelector('.projects .container');
    const projectsTitle = document.querySelector('.projects .section-title');
    
    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="hackathon">Hackathons</button>
        <button class="filter-btn" data-filter="web">Web Development</button>
        <button class="filter-btn" data-filter="mobile">Mobile Apps</button>
        <button class="filter-btn" data-filter="ai">AI/ML</button>
    `;
    
    projectsTitle.after(filterContainer);
    
    // Add data attributes to project cards based on their tags
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const tag = card.querySelector('.project-tag').textContent.toLowerCase();
        if (tag.includes('hackathon')) card.dataset.category = 'hackathon';
        else if (tag.includes('web')) card.dataset.category = 'web';
        else if (tag.includes('mobile')) card.dataset.category = 'mobile';
        else if (tag.includes('artificial intelligence')) card.dataset.category = 'ai';
        else card.dataset.category = 'web';
    });
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
};

createProjectFilters();

// ============================================
// 6. CONTACT FORM VALIDATION
// ============================================
const createContactForm = () => {
    const contactContent = document.querySelector('.contact-content');
    const contactMethods = document.querySelector('.contact-methods');
    
    const formHTML = `
        <form class="contact-form" id="contactForm">
            <div class="form-group">
                <input type="text" id="name" name="name" placeholder="Your Name" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Your Email" required>
                <span class="error-message"></span>
            </div>
            <div class="form-group">
                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                <span class="error-message"></span>
            </div>
            <button type="submit" class="btn-submit">Send Message</button>
            <div class="form-status"></div>
        </form>
    `;
    
    contactMethods.insertAdjacentHTML('beforebegin', formHTML);
    
    // Form validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const status = document.querySelector('.form-status');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(err => err.textContent = '');
        
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            document.querySelector('#name + .error-message').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.querySelector('#email + .error-message').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Message validation
        if (message.length < 10) {
            document.querySelector('#message + .error-message').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            status.textContent = 'Message sent successfully! ✓';
            status.className = 'form-status success';
            form.reset();
            
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    });
};

createContactForm();

// ============================================
// 7. DARK/LIGHT MODE TOGGLE
// ============================================
const createThemeToggle = () => {
    const navbar = document.querySelector('.navbar .container');
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    navbar.appendChild(themeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(currentTheme + '-theme');
    themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    });
};

createThemeToggle();

// ============================================
// 8. SCROLL PROGRESS INDICATOR
// ============================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ============================================
// 9. BACK TO TOP BUTTON
// ============================================
const createBackToTop = () => {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTop();

// ============================================
// 10. INTERACTIVE PARTICLES BACKGROUND
// ============================================
const createParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    document.querySelector('.hero').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(14, 165, 233, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const init = () => {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };
    
    const connectParticles = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 - distance / 600})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

createParticles();

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Smooth scrolling for all anchor links
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});