// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Navigation Functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleActiveNavigation();
        this.handleSmoothScrolling();
    }

    handleScroll() {
        const onScroll = throttle(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', onScroll);
    }

    handleMobileMenu() {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    handleActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveNav = throttle(() => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 100);

        window.addEventListener('scroll', updateActiveNav);
    }

    handleSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Animations and Interactions
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
        this.setupSectionTitleAnimations();
        this.setupStatsAnimations();
        this.setupEducationAnimations();
        this.setupSkillsAnimations();
        this.setupProjectsAnimations();
        this.setupExperienceAnimations();
        this.setupContactAnimations();
        this.setupSkillHoverEffects();
        this.setupProjectCardEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const elementsToAnimate = document.querySelectorAll(
            'section, .project-card, .skill-category, .timeline-item, .education-item'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        let isAnimated = false;

        const animateCounters = () => {
            if (isAnimated) return;
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                const increment = target / 50;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
            
            isAnimated = true;
        };

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                    }
                });
            });
            
            observer.observe(statsSection);
        }
    }

    setupSectionTitleAnimations() {
        // Section titles now use hover-only animations for consistency
        // No JavaScript animation needed - handled purely by CSS hover effects
    }

    setupSkillsAnimations() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        // Skills categories animation observer
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateX(-20px)';
            category.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            skillsObserver.observe(category);
        });

        // Enhanced hover effects for skill categories
        skillCategories.forEach(category => {
            const skillTags = category.querySelectorAll('.skill-tag');
            
            category.addEventListener('mouseenter', () => {
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-2px)';
                        tag.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.25)';
                    }, index * 30);
                });
            });

            category.addEventListener('mouseleave', () => {
                skillTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.boxShadow = 'none';
                });
            });
        });
    }

    setupProjectsAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Project cards animation observer
        const projectsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            projectsObserver.observe(card);
        });

        // Enhanced hover effects for project cards
        projectCards.forEach(card => {
            const techTags = card.querySelectorAll('.tech-tag');
            
            card.addEventListener('mouseenter', () => {
                const projectTitle = card.querySelector('.project-title');
                const projectPeriod = card.querySelector('.project-period');
                
                if (projectTitle) {
                    projectTitle.style.color = 'var(--primary-color)';
                    projectTitle.style.transform = 'translateX(4px)';
                }
                
                if (projectPeriod) {
                    projectPeriod.style.transform = 'translateX(-4px)';
                    projectPeriod.style.color = 'var(--primary-color)';
                }
                
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-1px)';
                        tag.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.2)';
                    }, index * 25);
                });
            });

            card.addEventListener('mouseleave', () => {
                const projectTitle = card.querySelector('.project-title');
                const projectPeriod = card.querySelector('.project-period');
                
                if (projectTitle) {
                    projectTitle.style.color = 'var(--text-primary)';
                    projectTitle.style.transform = 'translateX(0)';
                }
                
                if (projectPeriod) {
                    projectPeriod.style.transform = 'translateX(0)';
                    projectPeriod.style.color = 'var(--text-secondary)';
                }
                
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.boxShadow = 'none';
                });
            });
        });
    }

    setupStatsAnimations() {
        const statCards = document.querySelectorAll('.stat');
        
        // Stats cards animation observer
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(25px)';
            card.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            statsObserver.observe(card);
        });

        // Enhanced hover effects for stat cards
        statCards.forEach(card => {
            const statNumber = card.querySelector('.stat-number');
            const statLabel = card.querySelector('.stat-label');
            
            card.addEventListener('mouseenter', () => {
                // Animate stat number
                if (statNumber) {
                    statNumber.style.color = 'var(--primary-dark)';
                    statNumber.style.transform = 'scale(1.05)';
                }
                
                // Animate stat label
                if (statLabel) {
                    statLabel.style.color = 'var(--text-primary)';
                    statLabel.style.transform = 'translateY(-2px)';
                }
            });

            card.addEventListener('mouseleave', () => {
                // Reset stat number
                if (statNumber) {
                    statNumber.style.color = 'var(--primary-color)';
                    statNumber.style.transform = 'scale(1)';
                }
                
                // Reset stat label
                if (statLabel) {
                    statLabel.style.color = 'var(--text-secondary)';
                    statLabel.style.transform = 'translateY(0)';
                }
            });
        });
    }

    setupEducationAnimations() {
        const educationItems = document.querySelectorAll('.education-item');
        
        const educationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        educationItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            educationObserver.observe(item);
        });

        // Add hover effects for education items
        educationItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const elements = item.querySelectorAll('.education-school, .education-period, .education-grade');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.transform = 'translateX(4px)';
                    }, index * 50);
                });
            });

            item.addEventListener('mouseleave', () => {
                const elements = item.querySelectorAll('.education-school, .education-period, .education-grade');
                elements.forEach(el => {
                    el.style.transform = 'translateX(0)';
                });
            });
        });
    }

    setupExperienceAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Timeline items animation observer
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            experienceObserver.observe(item);
        });

        // Enhanced hover effects for timeline items
        timelineItems.forEach(item => {
            const jobTitle = item.querySelector('.job-title');
            const company = item.querySelector('.company');
            const period = item.querySelector('.period');
            const responsibilities = item.querySelectorAll('.job-responsibilities li');
            
            item.addEventListener('mouseenter', () => {
                // Animate timeline marker (handled by CSS)
                
                // Animate job details
                if (jobTitle) {
                    jobTitle.style.color = 'var(--primary-color)';
                    jobTitle.style.transform = 'translateX(4px)';
                }
                
                if (company) {
                    company.style.color = 'var(--primary-dark)';
                    company.style.transform = 'translateX(2px)';
                }
                
                if (period) {
                    period.style.color = 'var(--text-primary)';
                    period.style.transform = 'translateX(2px)';
                }
                
                // Animate responsibilities with stagger
                responsibilities.forEach((resp, index) => {
                    setTimeout(() => {
                        resp.style.color = 'var(--text-primary)';
                        resp.style.transform = 'translateX(2px)';
                        
                        const bullet = resp.querySelector('::before');
                        // Note: The bullet animation is handled via CSS since we can't directly access pseudo-elements
                    }, index * 50);
                });
            });

            item.addEventListener('mouseleave', () => {
                // Reset job details
                if (jobTitle) {
                    jobTitle.style.color = 'var(--text-primary)';
                    jobTitle.style.transform = 'translateX(0)';
                }
                
                if (company) {
                    company.style.color = 'var(--primary-color)';
                    company.style.transform = 'translateX(0)';
                }
                
                if (period) {
                    period.style.color = 'var(--text-secondary)';
                    period.style.transform = 'translateX(0)';
                }
                
                // Reset responsibilities
                responsibilities.forEach(resp => {
                    resp.style.color = 'var(--text-secondary)';
                    resp.style.transform = 'translateX(0)';
                });
            });
        });
    }

    setupSkillHoverEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const skillTags = category.querySelectorAll('.skill-tag');
            const categoryTitle = category.querySelector('.category-title');
            const categoryIcon = category.querySelector('.category-title i');
            
            category.addEventListener('mouseenter', () => {
                // Animate category title
                if (categoryTitle) {
                    categoryTitle.style.color = 'var(--primary-color)';
                    categoryTitle.style.transform = 'translateX(2px)';
                }
                
                // Animate icon
                if (categoryIcon) {
                    categoryIcon.style.transform = 'scale(1.1) rotate(5deg)';
                    categoryIcon.style.color = 'var(--primary-dark)';
                }
                
                // Animate skill tags with stagger
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-2px)';
                        tag.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.25)';
                    }, index * 30);
                });
            });
            
            category.addEventListener('mouseleave', () => {
                // Reset category title
                if (categoryTitle) {
                    categoryTitle.style.color = 'var(--text-primary)';
                    categoryTitle.style.transform = 'translateX(0)';
                }
                
                // Reset icon
                if (categoryIcon) {
                    categoryIcon.style.transform = 'scale(1) rotate(0deg)';
                    categoryIcon.style.color = 'var(--primary-color)';
                }
                
                // Reset skill tags
                skillTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.boxShadow = 'none';
                });
            });
        });
    }

    setupProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const techTags = card.querySelectorAll('.tech-tag');
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.05)';
                    }, index * 25);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const techTags = card.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = 'scale(1)';
                });
            });
        });
    }

    setupContactAnimations() {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate contact methods with stagger
                    const contactMethods = contactSection.querySelectorAll('.contact-method');
                    contactMethods.forEach((method, index) => {
                        setTimeout(() => {
                            method.style.opacity = '1';
                            method.style.transform = 'translateY(0)';
                        }, 600 + (index * 200));
                    });

                    // Animate language items with stagger
                    const languageItems = contactSection.querySelectorAll('.language-item');
                    languageItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 800 + (index * 150));
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(contactSection);

        // Set initial states for animation
        const contactMethods = contactSection.querySelectorAll('.contact-method');
        const languageItems = contactSection.querySelectorAll('.language-item');
        
        [...contactMethods, ...languageItems].forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
}

// Code Animation in Hero Section
class CodeAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriterEffect();
    }

    setupTypewriterEffect() {
        const codeLines = document.querySelectorAll('.code-line');
        const codeTexts = [
            'import tensorflow as tf',
            'from keras import Sequential',
            'model = Sequential()',
            'model.compile(\'adam\')'
        ];

        codeLines.forEach((line, index) => {
            const originalText = codeTexts[index];
            line.innerHTML = '';
            
            setTimeout(() => {
                this.typeText(line, originalText, 50);
            }, index * 800 + 1000);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add syntax highlighting after typing is complete
                this.applySyntaxHighlighting(element, text);
            }
        }, speed);
    }

    applySyntaxHighlighting(element, text) {
        const highlightedText = text
            .replace(/(import|from|as)/g, '<span class="code-keyword">$1</span>')
            .replace(/(tensorflow|keras)/g, '<span class="code-module">$1</span>')
            .replace(/(Sequential)/g, '<span class="code-class">$1</span>')
            .replace(/(tf|model)/g, '<span class="code-variable">$1</span>')
            .replace(/(compile)/g, '<span class="code-method">$1</span>')
            .replace(/('adam')/g, '<span class="code-string">$1</span>');
        
        element.innerHTML = highlightedText;
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }
}

// Contact Form Handler (if needed in the future)
class ContactHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactMethods();
    }

    setupContactMethods() {
        // Add click tracking for contact methods
        const contactMethods = document.querySelectorAll('.contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('click', (e) => {
                const methodType = method.querySelector('h4').textContent;
                console.log(`Contact method clicked: ${methodType}`);
                
                // Add analytics tracking here if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_method_click', {
                        'method': methodType
                    });
                }
            });
        });
    }
}

// Theme Management (for future dark mode support)
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupThemeToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    setupThemeToggle() {
        // For future implementation of theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }
}

// SEO and Accessibility Enhancements
class SEOAccessibility {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupSkipLinks();
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation for mobile menu
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        // Handle escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.focus();
            }
        });
    }

    setupFocusManagement() {
        // Ensure proper focus management for interactive elements
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.classList.add('focus-visible');
            });

            el.addEventListener('blur', () => {
                el.classList.remove('focus-visible');
            });
        });
    }

    setupSkipLinks() {
        // Add skip to main content link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            new Navigation();
            new AnimationController();
            new CodeAnimation();
            new PerformanceOptimizer();
            new ContactHandler();
            new ThemeManager();
            new SEOAccessibility();
            
            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio application:', error);
        }
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize the application
new App();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        AnimationController,
        CodeAnimation,
        PerformanceOptimizer,
        ContactHandler,
        ThemeManager,
        SEOAccessibility,
        App
    };
}
