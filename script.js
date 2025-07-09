// D1 Store - Complete JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
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
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function highlightActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button and update active nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        highlightActiveNav();
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Button ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .service-card, .stat, .contact-item').forEach(el => {
        observer.observe(el);
    });
    
    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(107, 70, 193, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(107, 70, 193, 0.2)';
        });
    });
    
    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect (uncomment if desired)
    // const heroTitle = document.querySelector('.hero h1');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
    
    // Lazy loading for images (if you add images later)
    function lazyLoadImages() {
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
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    lazyLoadImages();
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        highlightActiveNav();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Scroll to top with Ctrl+Home
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Initialize everything
    console.log('D1 Store website loaded successfully!');
    
    // Add some interactive feedback
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
    
    // Error handling for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Add rel="noopener noreferrer" for security
                this.rel = 'noopener noreferrer';
            } catch (error) {
                console.warn('External link security enhancement failed:', error);
            }
        });
    });
});

// Service Worker registration (optional for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
    });
}

// Additional utility functions
const D1Store = {
    // Theme management
    theme: {
        toggle() {
            // Future implementation for light/dark theme toggle
            console.log('Theme toggle functionality - coming soon!');
        }
    },
    
    // Analytics tracking (replace with your analytics service)
    analytics: {
        trackEvent(eventName, properties = {}) {
            // Example: Google Analytics, Mixpanel, etc.
            console.log('Analytics Event:', eventName, properties);
            
            // Example implementation:
            // gtag('event', eventName, properties);
        },
        
        trackPageView(page) {
            console.log('Page View:', page);
            // gtag('config', 'GA_MEASUREMENT_ID', { page_path: page });
        }
    },
    
    // Shopping cart functionality (basic structure)
    cart: {
        items: JSON.parse(localStorage.getItem('d1store_cart') || '[]'),
        
        add(product) {
            this.items.push(product);
            this.save();
            this.updateUI();
            D1Store.analytics.trackEvent('add_to_cart', { product_name: product.name });
        },
        
        remove(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.save();
            this.updateUI();
        },
        
        clear() {
            this.items = [];
            this.save();
            this.updateUI();
        },
        
        save() {
            localStorage.setItem('d1store_cart', JSON.stringify(this.items));
        },
        
        updateUI() {
            // Update cart count in UI
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = this.items.length;
            }
        },
        
        getTotal() {
            return this.items.reduce((total, item) => total + (item.price || 0), 0);
        }
    },
    
    // Form validation utilities
    validation: {
        email(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        required(value) {
            return value && value.trim().length > 0;
        },
        
        minLength(value, min) {
            return value && value.length >= min;
        },
        
        validateForm(form) {
            const errors = [];
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!this.required(input.value)) {
                    errors.push(`${input.placeholder || input.name} is required`);
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                if (input.type === 'email' && input.value && !this.email(input.value)) {
                    errors.push('Please enter a valid email address');
                    input.classList.add('error');
                }
            });
            
            return errors;
        }
    },
    
    // API utilities
    api: {
        async request(url, options = {}) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    ...options
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API request failed:', error);
                throw error;
            }
        },
        
        async submitContactForm(formData) {
            // Replace with your actual API endpoint
            const endpoint = '/api/contact';
            
            return this.request(endpoint, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
        },
        
        async getProducts() {
            // Replace with your actual API endpoint
            const endpoint = '/api/products';
            return this.request(endpoint);
        }
    },
    
    // Utility functions
    utils: {
        formatPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price);
        },
        
        formatDate(date) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date(date));
        },
        
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        copyToClipboard(text) {
            if (navigator.clipboard) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve();
            }
        },
        
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        throttle(func, limit) {
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
    }
};

// Enhanced form handling with validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            const errors = D1Store.validation.validateForm(this);
            if (errors.length > 0) {
                showNotification(errors.join('<br>'), 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit form (replace with actual API call)
                await D1Store.api.submitContactForm(data);
                
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                
                // Track analytics
                D1Store.analytics.trackEvent('contact_form_submit', {
                    service: data.service || 'unknown'
                });
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto hide
    const autoHideTimer = setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHideTimer);
        hideNotification(notification);
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            clearTimeout(autoHideTimer);
            hideNotification(notification);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    function hideNotification(notif) {
        notif.classList.remove('show');
        setTimeout(() => {
            if (notif.parentNode) {
                notif.remove();
            }
        }, 300);
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    D1Store.cart.updateUI();
    
    // Add click handlers for "Buy Now" buttons
    document.querySelectorAll('.btn[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Track interest in product
                D1Store.analytics.trackEvent('product_interest', {
                    product_name: productName,
                    product_price: productPrice
                });
            }
        });
    });
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    });
});

if (typeof PerformanceObserver !== 'undefined') {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to an error tracking service
});

// Export D1Store object for global access
window.D1Store = D1Store;

console.log('D1 Store - All systems loaded and ready! 🚀');
