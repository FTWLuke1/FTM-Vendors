// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .service-card').forEach(el => {
        observer.observe(el);
    });

    // Hero buttons functionality
    const exploreBtn = document.querySelector('.btn-primary');
    const customOrderBtn = document.querySelector('.btn-secondary');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    if (customOrderBtn) {
        customOrderBtn.addEventListener('click', function() {
            // Open contact form or custom order modal
            showCustomOrderModal();
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-cube, .floating-sphere, .floating-pyramid');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Loading animation
    function showLoading() {
        const loadingHTML = `
            <div class="loading-overlay">
                <div class="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }

    function hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    // Custom order modal
    function showCustomOrderModal() {
        const modalHTML = `
            <div class="modal-overlay" id="customOrderModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Custom Order Request</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="customOrderForm">
                            <div class="form-group">
                                <label for="orderType">Order Type</label>
                                <select id="orderType" required>
                                    <option value="">Select Type</option>
                                    <option value="3d-case">Custom 3D Case</option>
                                    <option value="device-mod">Device Modification</option>
                                    <option value="custom-tool">Custom Tool</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea id="description" rows="4" placeholder="Describe your custom order requirements..." required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="budget">Budget Range</label>
                                <select id="budget">
                                    <option value="">Select Budget</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="100-250">$100 - $250</option>
                                    <option value="250-500">$250 - $500</option>
                                    <option value="500+">$500+</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Submit Request</button>
                                <button type="button" class="btn btn-secondary modal-cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Modal event listeners
        const modal = document.getElementById('customOrderModal');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.modal-cancel');
        const form = document.getElementById('customOrderForm');

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCustomOrderSubmit();
        });

        function closeModal() {
            modal.remove();
        }
    }

    function handleCustomOrderSubmit() {
        const formData = {
            orderType: document.getElementById('orderType').value,
            description: document.getElementById('description').value,
            budget: document.getElementById('budget').value,
            email: document.getElementById('email').value
        };

        // Simulate API call
        showLoading();
        setTimeout(() => {
            hideLoading();
            document.getElementById('customOrderModal').remove();
            showNotification('Custom order request submitted successfully!', 'success');
        }, 2000);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Search functionality
    function initSearch() {
        const searchHTML = `
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search products...">
                <button id="searchBtn"><i class="fas fa-search"></i></button>
            </div>
        `;

        const productsSection = document.querySelector('.category-filter');
        if (productsSection) {
            productsSection.insertAdjacentHTML('afterend', searchHTML);

            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');

            searchInput.addEventListener('input', debounce(performSearch, 300));
            searchBtn.addEventListener('click', performSearch);
        }
    }

    function performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query) || query === '') {
                card.style.display = 'block';
                card.classList.add('animate-fadeInUp');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Debounce function
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

    // Initialize search when products are loaded
    setTimeout(initSearch, 1000);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.remove();
            }
        }
    });

    // Performance optimization - lazy loading images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
});
