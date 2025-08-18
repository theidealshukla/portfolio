// GitHub-Inspired Portfolio JavaScript
// Complete implementation with all features

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing GitHub-inspired portfolio...');
    
    // Clean up any unwanted elements that might be present
    const unwantedElements = document.querySelectorAll('body > .x, body > .arrow, body > [class^="pdf-"], body > .controls');
    unwantedElements.forEach(element => element.remove());
    
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeContributionGraph();
    initializeGallery();
    initializeTypingEffect();
    initializeSkillBars();
    initializeCounters();
    initializeProjectFilters();
    initializeScrollEffects();
    initializeMobileOptimizations();
    initializeKeyboardNavigation();
    initializePerformanceMonitoring();
    
    // Hide loading overlay
    setTimeout(() => {
        document.body.classList.add('loaded');
        console.log('✅ Portfolio loaded successfully!');
    }, 1000);
});

// ========================================
// THEME MANAGEMENT
// ========================================
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for GitHub feel
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeToggle, currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition class for smooth theme change
            document.body.classList.add('theme-transitioning');
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(this, newTheme);
            
            // Remove transition class after animation
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
            
            // Trigger theme change event
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
        });
    }
}

function updateThemeIcon(button, theme) {
    if (!button) return;
    
    const icon = button.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    } else {
        button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Update button title
    button.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// ========================================
// NAVIGATION SYSTEM
// ========================================
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navHamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Add/remove scrolled class
            navbar.classList.toggle('scrolled', currentScrollY > 100);
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
        updateActiveNavLink();
    }, 16)); // ~60fps
    
    // Mobile menu toggle
    if (navHamburger && navMenu) {
        navHamburger.addEventListener('click', function() {
            const isActive = navHamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isActive);
            document.body.classList.toggle('nav-open', isActive);
            
            // Animate hamburger lines
            animateHamburger(navHamburger, isActive);
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                animateHamburger(navHamburger, false);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navHamburger) {
            const isClickInside = navMenu.contains(e.target) || navHamburger.contains(e.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                navHamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                animateHamburger(navHamburger, false);
            }
        }
    });
    
    // Enhanced smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Smooth scroll with easing
                smoothScrollTo(offsetTop, 800);
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
}

function animateHamburger(hamburger, isActive) {
    const spans = hamburger.querySelectorAll('span');
    
    if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS & EFFECTS
// ========================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for children
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .gallery-item, .contact-link, .tech-item, .section-header, .about-content'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('animate-element');
        el.style.setProperty('--animation-delay', `${index * 0.1}s`);
        observer.observe(el);
    });
}

function initializeScrollEffects() {
    // Parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
    
    // Progress bar
    updateScrollProgress();
    window.addEventListener('scroll', throttle(updateScrollProgress, 16));
}

function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
}

// ========================================
// TYPING EFFECT
// ========================================
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 100;
        const delay = parseInt(element.dataset.delay) || 0;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-accent-fg)';
        
        setTimeout(() => {
            typeWriter(element, text, speed);
        }, delay);
    });
}

function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

// ========================================
// CONTRIBUTION GRAPH
// ========================================
function initializeContributionGraph() {
    const graphGrid = document.querySelector('.graph-grid');
    if (!graphGrid) return;
    
    // Clear existing content
    graphGrid.innerHTML = '';
    
    // Create 365 days (52 weeks × 7 days + 1)
    const totalDays = 365;
    const today = new Date();
    
    for (let i = totalDays - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'graph-day';
        
        // Calculate date
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Add tooltip
        day.setAttribute('title', formatDate(date));
        
        // Simulate activity (replace with real data)
        const activity = getActivityLevel(date);
        if (activity > 0) {
            day.classList.add(`active-${activity}`);
            day.setAttribute('data-count', Math.floor(Math.random() * 10) + 1);
        }
        
        graphGrid.appendChild(day);
    }
    
    // Add hover effects
    addContributionTooltips();
}

function getActivityLevel(date) {
    // Simulate activity based on day of week and random factors
    const dayOfWeek = date.getDay();
    const random = Math.random();
    
    // More activity on weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (random > 0.3) return Math.floor(random * 4) + 1;
    } else {
        if (random > 0.6) return Math.floor(random * 3) + 1;
    }
    
    return 0;
}

function addContributionTooltips() {
    const days = document.querySelectorAll('.graph-day');
    const tooltip = createTooltip();
    
    days.forEach(day => {
        day.addEventListener('mouseenter', (e) => {
            const count = e.target.getAttribute('data-count') || 0;
            const date = e.target.getAttribute('title');
            
            tooltip.textContent = `${count} contributions on ${date}`;
            tooltip.style.display = 'block';
            
            updateTooltipPosition(e, tooltip);
        });
        
        day.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
        
        day.addEventListener('mousemove', (e) => {
            updateTooltipPosition(e, tooltip);
        });
    });
}

function createTooltip() {
    let tooltip = document.querySelector('.contribution-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'contribution-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-canvas-overlay);
            color: var(--color-fg-default);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            display: none;
            pointer-events: none;
            border: 1px solid var(--color-border-default);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        `;
        document.body.appendChild(tooltip);
    }
    
    return tooltip;
}

function updateTooltipPosition(event, tooltip) {
    const rect = tooltip.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    let left = x + 10;
    let top = y - rect.height - 10;
    
    // Adjust if tooltip goes off screen
    if (left + rect.width > window.innerWidth) {
        left = x - rect.width - 10;
    }
    
    if (top < 0) {
        top = y + 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

// ========================================
// SKILL BARS & COUNTERS
// ========================================
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                const percentage = progressBar.dataset.percentage || '80';
                
                setTimeout(() => {
                    progressBar.style.width = `${percentage}%`;
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count) || 0;
    const duration = parseInt(element.dataset.duration) || 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ========================================
// PROJECT FILTERS
// ========================================
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const categories = card.dataset.category?.split(' ') || [];
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        setTimeout(() => {
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('show');
                }, 10);
            } else {
                card.classList.remove('show');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }, index * 50);
    });
}

// ========================================
// GALLERY LIGHTBOX (Enhanced)
// ========================================
let galleryImages = []; // Make this a global variable to fix scope issues

function initializeGallery() {
    // Clean up any existing lightbox elements first
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Remove any stray navigation controls that might be visible
    const unwantedSelectors = ['.x', '.arrow', '.controls', '[class^="pdf-"]'];
    unwantedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.parentElement === document.body) {
                el.remove();
            }
        });
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;
    
    // Create enhanced lightbox
    const lightbox = createLightbox();
    document.body.appendChild(lightbox);
    
    let currentImageIndex = 0;
    galleryImages = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt || 'Gallery image',
        caption: item.dataset.caption || ''
    }));
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(lightbox, galleryImages[currentImageIndex], currentImageIndex);
        });
    });
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('lightbox-open');
    };
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage(lightbox, galleryImages[currentImageIndex], currentImageIndex);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage(lightbox, galleryImages[currentImageIndex], currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                lightbox.querySelector('.lightbox-prev').click();
                break;
            case 'ArrowRight':
                lightbox.querySelector('.lightbox-next').click();
                break;
        }
    });
}

function updateLightboxImage(lightbox, imageData, index) {
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const current = lightbox.querySelector('.current');
    const total = lightbox.querySelector('.total');
    
    image.src = imageData.src;
    image.alt = imageData.alt;
    caption.textContent = imageData.caption;
    current.textContent = index + 1;
    total.textContent = galleryImages.length; // Use the global variable
}

function openLightbox(lightbox, imageData, index) {
    updateLightboxImage(lightbox, imageData, index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
}

// ========================================
// MOBILE OPTIMIZATIONS
// ========================================
function initializeMobileOptimizations() {
    // Fix viewport height on mobile
    updateViewportHeight();
    window.addEventListener('resize', debounce(updateViewportHeight, 250));
    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewportHeight, 500);
    });
    
    // Add touch feedback
    addTouchFeedback();
    
    // Optimize images for mobile
    optimizeImagesForMobile();
    
    // Add swipe gestures
    addSwipeGestures();
}

function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function addTouchFeedback() {
    const touchElements = document.querySelectorAll(
        '.btn, .nav-link, .project-card, .gallery-item, .social-link'
    );
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

function optimizeImagesForMobile() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function addSwipeGestures() {
    let startX, startY, distX, distY;
    const threshold = 100;
    
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
        if (!startX || !startY) return;
        
        // Check if it's a swipe gesture
        if (Math.abs(distX) > threshold && Math.abs(distY) < threshold) {
            if (distX > 0) {
                // Swipe right
                console.log('Swipe right detected');
            } else {
                // Swipe left
                console.log('Swipe left detected');
            }
        }
        
        startX = startY = distX = distY = null;
    }, { passive: true });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'Home':
                e.preventDefault();
                smoothScrollTo(0, 800);
                break;
            case 'End':
                e.preventDefault();
                smoothScrollTo(document.body.scrollHeight, 800);
                break;
            case '/':
                e.preventDefault();
                // Focus search if it exists
                const searchInput = document.querySelector('.search-input');
                if (searchInput) searchInput.focus();
                break;
            case 'Escape':
                // Close any open modals or menus
                closeAllModals();
                break;
        }
    });
}

function closeAllModals() {
    // Close mobile menu
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navHamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
    
    // Close lightbox
    const lightbox = document.querySelector('.lightbox.active');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}



// Smooth scrolling with easing
function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Throttle function for performance
function throttle(func, limit) {
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
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date for contribution graph
function formatDate(date) {
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-canvas-overlay);
        color: var(--color-fg-default);
        padding: 16px;
        border-radius: 6px;
        border: 1px solid var(--color-border-default);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close
    if (duration > 0) {
        setTimeout(closeNotification, duration);
    }
}




// Smooth scrolling for anchor links (fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for browsers that don't support smooth scrolling
                smoothScrollTo(offsetTop, 800);
            }
        }
    });
});


