// D1GOAT0 - Main JavaScript File
// Advanced functionality and interactions

class D1GoatStore {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('d1goat-cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('d1goat-wishlist')) || [];
        this.theme = localStorage.getItem('d1goat-theme') || 'dark';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupKeyboardShortcuts();
        this.createParticleEffects();
        this.initializeAnalytics();
    }

    setupEventListeners() {
        // Advanced search functionality
        this.setupAdvancedSearch();
        
        // Product interactions
        this.setupProductInteractions();
        
        // Service interactions
        this.setupServiceInteractions();
        
        // Form validations
        this.setupFormValidations();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
    }

    setupAdvancedSearch() {
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performLiveSearch(e.target.value);
                }, 300);
            });
        }
    }

    performLiveSearch(query) {
        if (query.length < 2) return;

        const searchResults = document.getElementById('searchResults');
        const searchData = this.getSearchData();
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.displaySearchResults(results, query);
    }

    getSearchData() {
        return [
            {
                title: 'D1Goat GitHub',
                description: 'Free open-source tools and repositories for developers',
                type: 'Product',
                category: 'tools',
                tags: ['github', 'open-source', 'free', 'tools', 'repository'],
                url: 'https://github.com/d1goat0',
                price: 'Free'
            },
            {
                title: 'AI Automation Suite',
                description: 'Intelligent automation software powered by advanced AI',
                type: 'Product',
                category: 'software',
                tags: ['ai', 'automation', 'machine-learning', 'software'],
                price: '$299.99'
            },
            {
                title: 'Premium Web Templates Pack',
                description: 'Professional website templates for modern businesses',
                type: 'Product',
                category: 'templates',
                tags: ['templates', 'web', 'design', 'responsive'],
                price: '$89.99'
            },
            {
                title: 'Cybersecurity Consulting',
                description: 'Comprehensive security audits and penetration testing',
                type: 'Service',
                category: 'security',
                tags: ['cybersecurity', 'security', 'consulting', 'penetration-testing'],
                price: 'From $499/month'
            },
            {
                title: 'Custom Software Development',
                description: 'Bespoke software solutions built with cutting-edge technologies',
                type: 'Service',
                category: 'development',
                tags: ['development', 'software', 'custom', 'programming'],
                price: 'From $2,999'
            },
            {
                title: 'AI & Automation Solutions',
                description: 'Intelligent automation systems powered by machine learning',
                type: 'Service',
                category: 'ai',
                tags: ['ai', 'automation', 'machine-learning', 'solutions'],
                price: 'From $1,999'
            }
        ];
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found for "${query}"</h3>
                    <p>Try different keywords or browse our categories</p>
                    <div class="search-suggestions">
                        <h4>Popular searches:</h4>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag" onclick="d1goatStore.searchSuggestion('github')">GitHub</span>
                            <span class="suggestion-tag" onclick="d1goatStore.searchSuggestion('cybersecurity')">Cybersecurity</span>
                            <span class="suggestion-tag" onclick="d1goatStore.searchSuggestion('ai')">AI Tools</span>
                            <span class="suggestion-tag" onclick="d1goatStore.searchSuggestion('templates')">Templates</span>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</h3>
            </div>
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="search-result-item" data-type="${result.type.toLowerCase()}">
                        <div class="result-header">
                            <div class="result-type ${result.type.toLowerCase()}">${result.type}</div>
                            <div class="result-price">${result.price}</div>
                        </div>
                        <h4 class="result-title">${this.highlightText(result.title, query)}</h4>
                        <p class="result-description">${this.highlightText(result.description, query)}</p>
                        <div class="result-tags">
                            ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="result-actions">
                            ${result.url ? 
                                `<a href="${result.url}" target="_blank" class="btn btn-sm btn-primary">
                                    <i class="fas fa-external-link-alt"></i> Visit
                                </a>` :
                                `<button class="btn btn-sm btn-primary" onclick="d1goatStore.viewItem('${result.title}')">
                                    <i class="fas fa-eye"></i> View Details
                                </button>`
                            }
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    searchSuggestion(term) {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = term;
        this.performLiveSearch(term);
    }

    setupProductInteractions() {
        // Advanced product filtering
        this.setupAdvancedFiltering();
        
        // Product comparison
        this.setupProductComparison();
        
        // Wishlist functionality
        this.setupWishlist();
        
        // Product reviews
        this.setupProductReviews();
    }

    setupAdvancedFiltering() {
        const priceRange = document.createElement('div');
        priceRange.className = 'price-filter';
        priceRange.innerHTML = `
            <h4>Price Range</h4>
            <div class="price-range-slider">
                <input type="range" id="minPrice" min="0" max="1000" value="0">
                <input type="range" id="maxPrice" min="0" max="1000" value="1000">
                <div class="price-display">
                    $<span id="minPriceDisplay">0</span> - $<span id="maxPriceDisplay">1000</span>
                </div>
            </div>
        `;

        const categoryFilter = document.querySelector('.category-filter');
        if (categoryFilter) {
            categoryFilter.appendChild(priceRange);
            this.setupPriceRangeSliders();
        }
    }

    setupPriceRangeSliders() {
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        const minDisplay = document.getElementById('minPriceDisplay');
        const maxDisplay = document.getElementById('maxPriceDisplay');

        if (minPrice && maxPrice) {
            [minPrice, maxPrice].forEach(slider => {
                slider.addEventListener('input', () => {
                    const min = parseInt(minPrice.value);
                    const max = parseInt(maxPrice.value);
                    
                    if (min > max) {
                        if (slider === minPrice) {
                            maxPrice.value = min;
                        } else {
                            minPrice.value = max;
                        }
                    }
                    
                    minDisplay.textContent = minPrice.value;
                    maxDisplay.textContent = maxPrice.value;
                    
                    this.filterProductsByPrice(parseInt(minPrice.value), parseInt(maxPrice.value));
                });
            });
        }
    }

    filterProductsByPrice(min, max) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const priceElement = product.querySelector('.product-price');
            if (priceElement) {
                const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
                if (price >= min && price <= max) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    }

    setupWishlist() {
        document.querySelectorAll('[title="Add to Wishlist"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                
                this.toggleWishlist(productTitle, btn);
            });
        });
    }

    toggleWishlist(productTitle, btn) {
        const isInWishlist = this.wishlist.includes(productTitle);
        
        if (isInWishlist) {
            this.wishlist = this.wishlist.filter(item => item !== productTitle);
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.classList.remove('active');
            this.showToast(`${productTitle} removed from wishlist`, 'info');
        } else {
            this.wishlist.push(productTitle);
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.classList.add('active');
            this.showToast(`${productTitle} added to wishlist`, 'success');
        }
        
        localStorage.setItem('d1goat-wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistUI();
    }

    updateWishlistUI() {
        document.querySelectorAll('[title="Add to Wishlist"]').forEach(btn => {
            const productCard = btn.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (this.wishlist.includes(productTitle)) {
                btn.classList.add('active');
            }
        });
    }

    setupServiceInteractions() {
        // Service booking system
        this.setupServiceBooking();
        
        // Service calculator
        this.setupServiceCalculator();
        
        // Live chat integration
        this.setupLiveChat();
    }

    setupServiceBooking() {
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.getAttribute('data-service');
                this.openServiceBooking(service);
            });
        });
    }

    openServiceBooking(serviceId) {
        const modal = this.createModal('Service Booking', `
            <div class="service-booking-form">
                <h4>Book ${serviceId.replace('-', ' ').toUpperCase()} Service</h4>
                <form id="serviceBookingForm">
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <select name="time" required>
                            <option value="">Select time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Project Details</label>
                        <textarea name="details" rows="4" placeholder="Tell us about your project requirements..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-calendar-check"></i>
                        Book Consultation
                    </button>
                </form>
            </div>
        `);

        const form = modal.querySelector('#serviceBookingForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleServiceBooking(e, serviceId);
        });
    }

    handleServiceBooking(e, serviceId) {
        const formData = new FormData(e.target);
        const bookingData = Object.fromEntries(formData);
        
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showToast('Consultation booked successfully! We\'ll contact you soon.', 'success');
            this.closeModal();
            
            // Store booking data
            const bookings = JSON.parse(localStorage.getItem('d1goat-bookings')) || [];
            bookings.push({
                id: Date.now(),
                service: serviceId,
                ...bookingData,
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('d1goat-bookings', JSON.stringify(bookings));
        }, 2000);
    }

    setupFormValidations() {
        // Real-time form validation
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Password strength validation
        if (field.type === 'password' && value) {
            const strength = this.checkPasswordStrength(value);
            if (strength.score < 3) {
                isValid = false;
                errorMessage = `Password is too weak. ${strength.feedback}`;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        this.clearFieldError(field);
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name || field.id;
    }

    checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        if (password.length >= 8) score++;
        else feedback.push('Use at least 8 characters');

        if (/[a-z]/.test(password)) score++;
        else feedback.push('Add lowercase letters');

        if (/[A-Z]/.test(password)) score++;
        else feedback.push('Add uppercase letters');

        if (/[0-9]/.test(password)) score++;
        else feedback.push('Add numbers');

        if (/[^A-Za-z0-9]/.test(password)) score++;
        else feedback.push('Add special characters');

        return {
            score,
            feedback: feedback.join(', ')
        };
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }

            // Ctrl/Cmd + Shift + C for cart
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.openCart();
            }

            // Ctrl/Cmd + Shift + T for theme toggle
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }

            // Arrow keys for product navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.navigateProducts(e.key);
            }
        });
    }

    openSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        if (searchOverlay && searchInput) {
            searchOverlay.classList.add('active');
            searchInput.focus();
        }
    }

    openCart() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            this.showCartModal();
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal.active, .search-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    navigateProducts(direction) {
        const products = document.querySelectorAll('.product-card:not([style*="display: none"])');
        const focusedProduct = document.querySelector('.product-card.focused');
        
        let currentIndex = 0;
        if (focusedProduct) {
            currentIndex = Array.from(products).indexOf(focusedProduct);
            focusedProduct.classList.remove('focused');
        }

        if (direction === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % products.length;
        } else {
            currentIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
        }

        if (products[currentIndex]) {
            products[currentIndex].classList.add('focused');
            products[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    createParticleEffects() {
        // Create floating particles for hero section
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        heroSection.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particleContainer.appendChild(particle);
        }
    }

    initializeComponents() {
        // Initialize tooltips
        this.initializeTooltips();
        
        // Initialize lazy loading
        this.initializeLazyLoading();
        
        // Initialize animations
        this.initializeAnimations();
        
        // Initialize PWA features
        this.initializePWA();
    }

    initializeTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });

            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

        setTimeout(() => tooltip.classList.add('visible'), 10);
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    initializeAnimations() {
        // Scroll-triggered animations
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animationObserver.observe(el);
        });

        // Typing animation for hero text
        this.initializeTypingAnimation();
    }

    initializeTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Premium Digital Solutions',
            'Cybersecurity Excellence',
            'AI-Powered Automation',
            'Custom Development'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        };

        typeText();
    }

    initializePWA() {
        // Service Worker registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }

        // Install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    showInstallPrompt() {
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <i class="fas fa-download"></i>
                <span>Install D1GOAT Store for a better experience</span>
                <button class="install-btn">Install</button>
                <button class="install-close">×</button>
            </div>
        `;

        document.body.appendChild(installBanner);

        installBanner.querySelector('.install-btn').addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                });
            }
            installBanner.remove();
        });

        installBanner.querySelector('.install-close').addEventListener('click', () => {
            installBanner.remove();
        });
    }

    initializeAnalytics() {
        // Track page views
        this.trackPageView();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Track performance metrics
        this.trackPerformanceMetrics();
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };

        // Store analytics data locally (in a real app, send to analytics service)
        const analytics = JSON.parse(localStorage.getItem('d1goat-analytics')) || [];
        analytics.push({ type: 'pageview', data: pageData });
        localStorage.setItem('d1goat-analytics', JSON.stringify(analytics.slice(-100))); // Keep last 100 events
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, a')) {
                this.trackEvent('click', {
                    element: e.target.tagName,
                    text: e.target.textContent.trim(),
                    href: e.target.href || null,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackEvent('form_submit', {
                form: e.target.id || 'unnamed',
                timestamp: new Date().toISOString()
            });
        });
    }

    trackEvent(eventType, eventData) {
        const analytics = JSON.parse(localStorage.getItem('d1goat-analytics')) || [];
        analytics.push({ type: eventType, data: eventData });
        localStorage.setItem('d1goat-analytics', JSON.stringify(analytics.slice(-100)));
    }

    trackPerformanceMetrics() {
        // Track page load time
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            this.trackEvent('performance', {
                loadTime,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                timestamp: new Date().toISOString()
            });
        });
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.monitorCoreWebVitals();
        
        // Monitor JavaScript errors
        this.monitorErrors();
        
        // Monitor network requests
        this.monitorNetworkRequests();
    }

    monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.trackEvent('lcp', { value: lastEntry.startTime });
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                this.trackEvent('fid', { value: entry.processingStart - entry.startTime });
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            this.trackEvent('cls', { value: clsValue });
        }).observe({ entryTypes: ['layout-shift'] });
    }

    monitorErrors() {
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                timestamp: new Date().toISOString()
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.trackEvent('promise_rejection', {
                reason: e.reason.toString(),
                timestamp: new Date().toISOString()
            });
        });
    }

    monitorNetworkRequests() {
        // Override fetch to monitor API calls
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const startTime = performance.now();
            try {
                const response = await originalFetch(...args);
                const endTime = performance.now();
                
                this.trackEvent('api_request', {
                    url: args[0],
                    method: args[1]?.method || 'GET',
                    status: response.status,
                    duration: endTime - startTime,
                    timestamp: new Date().toISOString()
                });
                
                return response;
            } catch (error) {
                const endTime = performance.now();
                
                this.trackEvent('api_error', {
                    url: args[0],
                    method: args[1]?.method || 'GET',
                    error: error.message,
                    duration: endTime - startTime,
                    timestamp: new Date().toISOString()
                });
                
                throw error;
            }
        };
    }

    // Advanced cart functionality
    addToCartAdvanced(productId, options = {}) {
        const product = this.getProductById(productId);
        if (!product) {
            this.showToast('Product not found', 'error');
            return;
        }

        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: options.quantity || 1,
            variant: options.variant || null,
            addedAt: new Date().toISOString()
        };

        const existingItemIndex = this.cart.findIndex(item => 
            item.id === productId && 
            JSON.stringify(item.variant) === JSON.stringify(cartItem.variant)
        );

        if (existingItemIndex > -1) {
            this.cart[existingItemIndex].quantity += cartItem.quantity;
        } else {
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.updateCartUI();
        this.showToast(`${product.name} added to cart!`, 'success');
        
        // Track the event
        this.trackEvent('add_to_cart', {
            productId,
            productName: product.name,
            price: product.price,
            quantity: cartItem.quantity
        });
    }

    getProductById(id) {
        const products = {
            'github': { name: 'D1Goat GitHub', price: 0 },
            '2': { name: 'AI Automation Suite', price: 299.99 },
            '3': { name: 'Premium Web Templates Pack', price: 89.99 }
        };
        return products[id];
    }

    saveCart() {
        localStorage.setItem('d1goat-cart', JSON.stringify(this.cart));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        }
    }

    // Advanced modal system
    createModal(title, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal advanced-modal';
        modal.innerHTML = `
            <div class="modal-content ${options.size || 'medium'}">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && !options.persistent) {
                this.closeModal(modal);
            }
        });

        // Show modal with animation
        setTimeout(() => modal.classList.add('active'), 10);

        return modal;
    }

    closeModal(modal = null) {
        const modals = modal ? [modal] : document.querySelectorAll('.modal.active');
        modals.forEach(m => {
            m.classList.remove('active');
            setTimeout(() => {
                if (m.parentNode) {
                    m.parentNode.removeChild(m);
                }
            }, 300);
        });
    }

    // Advanced notification system
    showToast(message, type = 'success', options = {}) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="${icons[type] || icons.success}"></i>
                </div>
                <div class="toast-message">${message}</div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            ${options.progress !== false ? '<div class="toast-progress"></div>' : ''}
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto hide
        const duration = options.duration || 5000;
        const progressBar = toast.querySelector('.toast-progress');
        
        if (progressBar) {
            progressBar.style.animationDuration = `${duration}ms`;
        }

        const hideTimeout = setTimeout(() => {
            this.hideToast(toast);
        }, duration);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(hideTimeout);
            this.hideToast(toast);
        });

        // Click action
        if (options.action) {
            toast.style.cursor = 'pointer';
            toast.addEventListener('click', (e) => {
                if (!e.target.closest('.toast-close')) {
                    options.action();
                    this.hideToast(toast);
                }
            });
        }

        return toast;
    }

    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Loading states
    showLoading(message = 'Loading...') {
        const existing = document.querySelector('.loading-overlay');
        if (existing) return;

        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);
        this.isLoading = true;
    }

    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
        this.isLoading = false;
    }

    // Utility methods
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
    }

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

    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    formatDate(date, options = {}) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        }).format(new Date(date));
    }

    // API simulation methods
    async simulateAPI(endpoint, data = null, delay = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate different responses based on endpoint
                switch (endpoint) {
                    case '/api/contact':
                        resolve({ success: true, message: 'Message sent successfully' });
                        break;
                    case '/api/newsletter':
                        resolve({ success: true, message: 'Subscribed successfully' });
                        break;
                    case '/api/booking':
                        resolve({ success: true, id: Date.now(), message: 'Booking confirmed' });
                        break;
                    default:
                        resolve({ success: true, data: null });
                }
            }, delay);
        });
    }

    // Export analytics data
    exportAnalytics() {
        const analytics = JSON.parse(localStorage.getItem('d1goat-analytics')) || [];
        const dataStr = JSON.stringify(analytics, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `d1goat-analytics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Clear all data
    clearAllData() {
        const confirmClear = confirm('Are you sure you want to clear all stored data? This action cannot be undone.');
        if (confirmClear) {
            localStorage.removeItem('d1goat-cart');
            localStorage.removeItem('d1goat-wishlist');
            localStorage.removeItem('d1goat-theme');
            localStorage.removeItem('d1goat-analytics');
            localStorage.removeItem('d1goat-bookings');
            
            this.cart = [];
            this.wishlist = [];
            this.updateCartUI();
            this.updateWishlistUI();
            
            this.showToast('All data cleared successfully', 'info');
        }
    }
}

// Initialize the D1GOAT Store
const d1goatStore = new D1GoatStore();

// Global utility functions for backward compatibility
function showToast(message, type) {
    d1goatStore.showToast(message, type);
}

function showLoading(message) {
    d1goatStore.showLoading(message);
}

function hideLoading() {
    d1goatStore.hideLoading();
}

// Console commands for debugging
window.d1goat = {
    store: d1goatStore,
    exportAnalytics: () => d1goatStore.exportAnalytics(),
    clearData: () => d1goatStore.clearAllData(),
    getCart: () => d1goatStore.cart,
    getWishlist: () => d1goatStore.wishlist,
    getAnalytics: () => JSON.parse(localStorage.getItem('d1goat-analytics')) || [],
    version: '2.0.0'
};

// Advanced features initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize advanced search with autocomplete
    initializeAdvancedSearch();
    
    // Initialize product comparison
    initializeProductComparison();
    
    // Initialize advanced cart features
    initializeAdvancedCart();
    
    // Initialize real-time features
    initializeRealTimeFeatures();
    
    // Initialize accessibility features
    initializeAccessibility();
});

function initializeAdvancedSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Create autocomplete dropdown
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    searchInput.parentNode.appendChild(autocompleteContainer);

    const searchTerms = [
        'GitHub', 'Cybersecurity', 'AI Automation', 'Web Templates',
        'Consulting', 'Development', 'Security Audit', 'Penetration Testing',
        'Machine Learning', 'Custom Software', 'API Development'
    ];

    searchInput.addEventListener('input', d1goatStore.debounce((e) => {
        const value = e.target.value.toLowerCase();
        if (value.length < 2) {
            autocompleteContainer.innerHTML = '';
            return;
        }

        const matches = searchTerms.filter(term => 
            term.toLowerCase().includes(value)
        ).slice(0, 5);

        if (matches.length > 0) {
            autocompleteContainer.innerHTML = `
                <div class="autocomplete-dropdown">
                    ${matches.map(match => `
                        <div class="autocomplete-item" data-term="${match}">
                            <i class="fas fa-search"></i>
                            ${match.replace(new RegExp(value, 'gi'), `<strong>$&</strong>`)}
                        </div>
                    `).join('')}
                </div>
            `;

            // Add click handlers
            autocompleteContainer.querySelectorAll('.autocomplete-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.getAttribute('data-term');
                    autocompleteContainer.innerHTML = '';
                    d1goatStore.performLiveSearch(searchInput.value);
                });
            });
        } else {
            autocompleteContainer.innerHTML = '';
        }
    }, 300));

    // Hide autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocompleteContainer.contains(e.target)) {
            autocompleteContainer.innerHTML = '';
        }
    });
}

function initializeProductComparison() {
    let comparisonList = JSON.parse(localStorage.getItem('d1goat-comparison')) || [];
    
    // Add comparison buttons to products
    document.querySelectorAll('.product-card').forEach(card => {
        const compareBtn = document.createElement('button');
        compareBtn.className = 'compare-btn';
        compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i>';
        compareBtn.title = 'Add to Compare';
        
        const productActions = card.querySelector('.product-actions');
        if (productActions) {
            productActions.appendChild(compareBtn);
        }

        compareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = card.getAttribute('data-product-id') || 'github';
            toggleComparison(productId, compareBtn);
        });
    });

    function toggleComparison(productId, btn) {
        const isInComparison = comparisonList.includes(productId);
        
        if (isInComparison) {
            comparisonList = comparisonList.filter(id => id !== productId);
            btn.classList.remove('active');
            d1goatStore.showToast('Removed from comparison', 'info');
        } else {
            if (comparisonList.length >= 3) {
                d1goatStore.showToast('Maximum 3 products can be compared', 'warning');
                return;
            }
            comparisonList.push(productId);
            btn.classList.add('active');
            d1goatStore.showToast('Added to comparison', 'success');
        }

        localStorage.setItem('d1goat-comparison', JSON.stringify(comparisonList));
        updateComparisonUI();
    }

    function updateComparisonUI() {
        let compareWidget = document.getElementById('compareWidget');
        
        if (comparisonList.length === 0) {
            if (compareWidget) {
                compareWidget.remove();
            }
            return;
        }

        if (!compareWidget) {
            compareWidget = document.createElement('div');
            compareWidget.id = 'compareWidget';
            compareWidget.className = 'compare-widget';
            document.body.appendChild(compareWidget);
        }

        compareWidget.innerHTML = `
            <div class="compare-header">
                <h4>Compare Products (${comparisonList.length}/3)</h4>
                <button class="compare-close" onclick="clearComparison()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="compare-items">
                ${comparisonList.map(id => `
                    <div class="compare-item" data-id="${id}">
                        <span>${getProductName(id)}</span>
                        <button onclick="removeFromComparison('${id}')">×</button>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary btn-sm" onclick="showComparison()">
                Compare Now
            </button>
        `;
    }

    function getProductName(id) {
        const names = {
            'github': 'D1Goat GitHub',
            '2': 'AI Automation Suite',
            '3': 'Web Templates Pack'
        };
        return names[id] || 'Unknown Product';
    }

    // Global functions for comparison
    window.removeFromComparison = (productId) => {
        comparisonList = comparisonList.filter(id => id !== productId);
        localStorage.setItem('d1goat-comparison', JSON.stringify(comparisonList));
        updateComparisonUI();
        
        // Update button state
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            const compareBtn = productCard.querySelector('.compare-btn');
            if (compareBtn) {
                compareBtn.classList.remove('active');
            }
        }
    };

    window.clearComparison = () => {
        comparisonList = [];
        localStorage.removeItem('d1goat-comparison');
        updateComparisonUI();
        
        // Update all button states
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    };

    window.showComparison = () => {
        if (comparisonList.length < 2) {
            d1goatStore.showToast('Select at least 2 products to compare', 'warning');
            return;
        }

        const comparisonData = comparisonList.map(id => ({
            id,
            name: getProductName(id),
            price: getProductPrice(id),
            features: getProductFeatures(id)
        }));

        const modal = d1goatStore.createModal('Product Comparison', `
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            ${comparisonData.map(product => `<th>${product.name}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Price</strong></td>
                            ${comparisonData.map(product => `<td>${product.price}</td>`).join('')}
                        </tr>
                        ${getComparisonRows(comparisonData)}
                    </tbody>
                </table>
            </div>
        `, { size: 'large' });
    };

    function getProductPrice(id) {
        const prices = {
            'github': 'Free',
            '2': '$299.99',
            '3': '$89.99'
        };
        return prices[id] || 'N/A';
    }

    function getProductFeatures(id) {
        const features = {
            'github': ['Open Source', 'Free Updates', 'Community Support', 'MIT License'],
            '2': ['AI Powered', 'Cloud Integration', 'Analytics', 'API Access'],
            '3': ['Responsive Design', 'Multiple Layouts', 'SEO Optimized', 'Documentation']
        };
        return features[id] || [];
    }

    function getComparisonRows(products) {
        const allFeatures = [...new Set(products.flatMap(p => p.features))];
        
        return allFeatures.map(feature => `
            <tr>
                <td>${feature}</td>
                ${products.map(product => `
                    <td>
                        ${product.features.includes(feature) ? 
                            '<i class="fas fa-check text-success"></i>' : 
                            '<i class="fas fa-times text-muted"></i>'
                        }
                    </td>
                `).join('')}
            </tr>
        `).join('');
    }

    // Initialize comparison UI
    updateComparisonUI();
}

function initializeAdvancedCart() {
    // Cart persistence across sessions
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('d1goat-cart-timestamp', Date.now().toString());
    });

    // Cart recovery
    const cartTimestamp = localStorage.getItem('d1goat-cart-timestamp');
    if (cartTimestamp && d1goatStore.cart.length > 0) {
        const timeDiff = Date.now() - parseInt(cartTimestamp);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            d1goatStore.showToast('Your cart items from yesterday are still here!', 'info', {
                action: () => {
                    document.getElementById('cartIcon').click();
                }
            });
        }
    }

    // Cart abandonment prevention
    let cartAbandonmentTimer;
    
    function resetAbandonmentTimer() {
        clearTimeout(cartAbandonmentTimer);
        if (d1goatStore.cart.length > 0) {
            cartAbandonmentTimer = setTimeout(() => {
                d1goatStore.showToast('Don\'t forget your items! Complete your purchase now.', 'warning', {
                    duration: 8000,
                    action: () => {
                        document.getElementById('cartIcon').click();
                    }
                });
            }, 300000); // 5 minutes
        }
    }

    // Reset timer on user activity
    ['click', 'scroll', 'keypress'].forEach(event => {
        document.addEventListener(event, resetAbandonmentTimer);
    });

    // Quick add to cart with quantity selector
    document.querySelectorAll('.product-card').forEach(card => {
        const quickAddBtn = document.createElement('div');
        quickAddBtn.className = 'quick-add-container';
        quickAddBtn.innerHTML = `
            <div class="quantity-selector">
                <button class="qty-btn minus">-</button>
                <input type="number" class="qty-input" value="1" min="1" max="99">
                <button class="qty-btn plus">+</button>
            </div>
            <button class="quick-add-btn">
                <i class="fas fa-cart-plus"></i>
                Quick Add
            </button>
        `;

        card.appendChild(quickAddBtn);

        // Quantity controls
        const minusBtn = quickAddBtn.querySelector('.minus');
        const plusBtn = quickAddBtn.querySelector('.plus');
        const qtyInput = quickAddBtn.querySelector('.qty-input');
        const addBtn = quickAddBtn.querySelector('.quick-add-btn');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue < 99) {
                qtyInput.value = currentValue + 1;
            }
        });

        addBtn.addEventListener('click', () => {
            const productId = card.getAttribute('data-product-id') || 'github';
            const quantity = parseInt(qtyInput.value);
            
            d1goatStore.addToCartAdvanced(productId, { quantity });
            
            // Visual feedback
            addBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
            addBtn.classList.add('success');
            
            setTimeout(() => {
                addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Quick Add';
                addBtn.classList.remove('success');
            }, 2000);
        });
    });
}

function initializeRealTimeFeatures() {
    // Simulated real-time updates
    setInterval(() => {
        updateLiveStats();
        checkForNotifications();
    }, 30000); // Every 30 seconds

    function updateLiveStats() {
        const statsElements = document.querySelectorAll('[data-live-stat]');
        statsElements.forEach(element => {
            const statType = element.getAttribute('data-live-stat');
            const currentValue = parseInt(element.textContent);
            
            // Simulate small increments
            const increment = Math.floor(Math.random() * 3);
            if (increment > 0) {
                element.textContent = currentValue + increment;
                element.classList.add('updated');
                setTimeout(() => element.classList.remove('updated'), 1000);
            }
        });
    }

    function checkForNotifications() {
        // Simulate random notifications
        const notifications = [
            'New security update available for your projects',
            'Someone just purchased the AI Automation Suite',
            'Your GitHub repository received a new star',
            'Weekly security report is ready'
        ];

        if (Math.random() < 0.1) { // 10% chance
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            d1goatStore.showToast(randomNotification, 'info', { duration: 6000 });
        }
    }

    // Live chat simulation
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-toggle" id="chatToggle">
            <i class="fas fa-comments"></i>
            <span class="chat-badge">1</span>
        </div>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h4>Live Support</h4>
                <button class="chat-close" id="chatClose">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message bot">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hello! I'm here to help you with any questions about our services. How can I assist you today?</p>
                        <span class="message-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Type your message...">
                <button id="chatSend">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(chatWidget);

    // Chat functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        chatToggle.querySelector('.chat-badge').style.display = 'none';
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addChatMessage(response, 'bot');
        }, 1000 + Math.random() * 2000);
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addChatMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = sender === 'bot' ? 
            '<i class="fas fa-robot"></i>' : 
            '<i class="fas fa-user"></i>';

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotResponse(userMessage) {
        const responses = {
            'hello': 'Hello! How can I help you today?',
            'hi': 'Hi there! What can I do for you?',
            'price': 'Our pricing varies by service. You can check our detailed pricing on each service page.',
            'github': 'Our GitHub repository is completely free! You can access it anytime.',
            'security': 'We offer comprehensive cybersecurity services starting at $499/month.',
            'ai': 'Our AI Automation Suite is available for $299.99 with full support.',
            'support': 'I\'m here to help! What specific question do you have?',
            'contact': 'You can reach us at contact@d1goat0.com or use our contact form.',
            'thanks': 'You\'re welcome! Is there anything else I can help you with?'
        };

        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return 'I understand you\'re asking about "' + userMessage + '". Let me connect you with a human agent who can provide more detailed assistance. In the meantime, feel free to browse our services or check our FAQ section.';
    }
}

function initializeAccessibility() {
    // Keyboard navigation enhancement
    let focusableElements = [];
    let currentFocusIndex = -1;

    function updateFocusableElements() {
        focusableElements = Array.from(document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => {
            return el.offsetWidth > 0 && el.offsetHeight > 0 && !el.disabled;
        });
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            updateFocusableElements();
        }

        // Skip to main content
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const mainContent = document.querySelector('main') || document.querySelector('#main');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView();
            }
        }

        // Skip to navigation
        if (e.altKey && e.key === 'n') {
            e.preventDefault();
            const nav = document.querySelector('nav') || document.querySelector('.navbar');
            if (nav) {
                const firstLink = nav.querySelector('a, button');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        }
    });

    // Screen reader announcements
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Enhanced focus indicators
    document.addEventListener('focusin', (e) => {
        e.target.classList.add('keyboard-focused');
    });

    document.addEventListener('focusout', (e) => {
        e.target.classList.remove('keyboard-focused');
    });

    // High contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    contrastToggle.title = 'Toggle High Contrast';
    contrastToggle.setAttribute('aria-label', 'Toggle High Contrast Mode');
    
    document.body.appendChild(contrastToggle);

    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('d1goat-high-contrast', isHighContrast);
        announceToScreenReader(`High contrast mode ${isHighContrast ? 'enabled' : 'disabled'}`);
    });

    // Restore high contrast preference
    if (localStorage.getItem('d1goat-high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    // Font size controls
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    fontControls.innerHTML = `
        <button class="font-btn" data-action="decrease" title="Decrease font size">A-</button>
        <button class="font-btn" data-action="reset" title="Reset font size">A</button>
        <button class="font-btn" data-action="increase" title="Increase font size">A+</button>
    `;
    
    document.body.appendChild(fontControls);

    let currentFontSize = 100; // percentage

    fontControls.addEventListener('click', (e) => {
        if (!e.target.classList.contains('font-btn')) return;

        const action = e.target.getAttribute('data-action');
        
        switch (action) {
            case 'increase':
                if (currentFontSize < 150) {
                    currentFontSize += 10;
                }
                break;
            case 'decrease':
                if (currentFontSize > 80) {
                    currentFontSize -= 10;
                }
                break;
            case 'reset':
                currentFontSize = 100;
                break;
        }

        document.documentElement.style.fontSize = currentFontSize + '%';
        localStorage.setItem('d1goat-font-size', currentFontSize);
        announceToScreenReader(`Font size set to ${currentFontSize}%`);
    });

    // Restore font size preference
    const savedFontSize = localStorage.getItem('d1goat-font-size');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        document.documentElement.style.fontSize = currentFontSize + '%';
    }

    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }

    // Color scheme preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-preference');
    }
}

// Advanced error handling and recovery
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    
    // Show user-friendly error message
    d1goatStore.showToast('Something went wrong. Please refresh the page if the issue persists.', 'error');
    
    // Attempt to recover from common errors
    if (e.error.name === 'ChunkLoadError' || e.message.includes('Loading chunk')) {
        // Handle dynamic import failures
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Don't show toast for every promise rejection to avoid spam
    if (e.reason && e.reason.message && !e.reason.message.includes('AbortError')) {
        d1goatStore.showToast('A network error occurred. Please check your connection.', 'warning');
    }
});

// Performance monitoring and optimization
function initializePerformanceOptimizations() {
    // Lazy load images with intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Preload critical resources
    const criticalResources = [
        '/css/main.css',
        '/js/main.js'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });

    // Memory usage monitoring
    if ('memory' in performance) {
        setInterval(() => {
            const memInfo = performance.memory;
            if (memInfo.usedJSHeapSize > memInfo.jsHeapSizeLimit * 0.9) {
                console.warn('High memory usage detected');
                // Trigger garbage collection if possible
                if (window.gc) {
                    window.gc();
                }
            }
        }, 60000); // Check every minute
    }
}

// Initialize performance optimizations
initializePerformanceOptimizations();

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            d1goatStore.showToast('New version available! Refresh to update.', 'info', {
                                duration: 10000,
                                action: () => window.location.reload()
                            });
                        }
                    });
                });
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for global access
window.D1GoatStore = D1GoatStore;

console.log('🚀 D1GOAT Store Advanced Features Loaded Successfully!');
