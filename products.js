// Products data and functionality
const productsData = [
    {
        id: 1,
        title: "Raspberry Pi 4 Tactical Case",
        description: "Military-grade 3D printed case with cooling vents and GPIO access",
        price: 45.99,
        category: "cases",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhc2UgSW1hZ2U8L3RleHQ+PC9zdmc+",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        title: "Arduino Stealth Enclosure",
        description: "Low-profile case perfect for covert operations and IoT projects",
        price: 32.99,
        category: "cases",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFyZHVpbm8gQ2FzZTwvdGV4dD48L3N2Zz4=",
        stock: 23,
        featured: false
    },
    {
        id: 3,
        title: "WiFi Pineapple Mk VII",
        description: "Professional penetration testing device for wireless security auditing",
        price: 199.99,
        category: "devices",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPldpRmkgUGluZWFwcGxlPC90ZXh0Pjwvc3ZnPg==",
        stock: 8,
        featured: true
    },
    {
        id: 4,
        title: "Custom USB Rubber Ducky",
        description: "Programmable keystroke injection tool with custom firmware",
        price: 89.99,
        category: "tools",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlVTQiBSdWJiZXIgRHVja3k8L3RleHQ+PC9zdmc+",
        stock: 12,
        featured: false
    },
    {
        id: 5,
        title: "Flipper Zero",
        description: "Multi-tool device for pentesters and hardware hackers",
        price: 169.99,
        category: "devices",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZsaXBwZXIgWmVybzwvdGV4dD48L3N2Zz4=",
        stock: 6,
        featured: true
    },
    {
        id: 6,
        title: "RFID Cloner Kit",
        description: "Professional RFID reading and cloning toolkit with multiple frequencies",
        price: 124.99,
        category: "tools",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJGSUQgQ2xvbmVyPC90ZXh0Pjwvc3ZnPg==",
        stock: 9,
        featured: false
    },
    {
        id: 7,
        title: "HackRF One SDR",
        description: "Software Defined Radio for RF analysis and signal manipulation",
        price: 299.99,
        category: "devices",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhhY2tSRiBPbmU8L3RleHQ+PC9zdmc+",
        stock: 4,
        featured: true
    },
    {
        id: 8,
        title: "Custom Phone Case - Stealth",
        description: "3D printed phone case with hidden compartments and signal blocking",
        price: 67.99,
        category: "cases",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob25lIENhc2U8L3RleHQ+PC9zdmc+",
        stock: 18,
        featured: false
    },
    {
        id: 9,
        title: "Lock Pick Set Pro",
        description: "Professional grade lock picking tools with tension wrenches",
        price: 79.99,
        category: "tools",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmEyYTJhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzAwZmY4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvY2sgUGljayBTZXQ8L3RleHQ+PC9zdmc+",
        stock: 14,
        featured: false
    }
];

// Product rendering and filtering
class ProductManager {
    constructor() {
        this.products = productsData;
        this.filteredProducts = [...this.products];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupFilters();
        this.setupProductActions();
    }

    renderProducts(products = this.filteredProducts) {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            productsGrid.appendChild(productCard);
        });

        // Add animation delays
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fadeInUp');
        });
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card hover-lift';
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-product-id', product.id);

        const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
        const stockClass = product.stock > 0 ? 'in-stock' : 'out-of-stock';
        const featuredBadge = product.featured ? '<div class="featured-badge">Featured</div>' : '';

        card.innerHTML = `
            ${featuredBadge}
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-overlay">
                    <button class="btn-quick-view" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-stock ${stockClass}">${stockStatus} (${product.stock})</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn-wishlist" data-product-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Filter products
                const category = e.target.getAttribute('data-category');
                this.filterProducts(category);
            });
        });
    }

    filterProducts(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.category === category
            );
        }
        
        this.renderProducts();
    }

    setupProductActions() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-cart')) {
                const productId = parseInt(e.target.closest('.btn-add-cart').getAttribute('data-product-id'));
                this.addToCart(productId);
            }
            
            if (e.target.closest('.btn-quick-view')) {
                const productId = parseInt(e.target.closest('.btn-quick-view').getAttribute('data-product-id'));
                this.showQuickView(productId);
            }
            
            if (e.target.closest('.btn-wishlist')) {
                const productId = parseInt(e.target.closest('.btn-wishlist').getAttribute('data-product-id'));
                this.toggleWishlist(productId);
            }
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.stock > 0) {
            // Add to cart logic (handled by cart.js)
            if (window.cartManager) {
                window.cartManager.addItem(product);
                this.showNotification(`${product.title} added to cart!`, 'success');
            }
        } else {
            this.showNotification('Product is out of stock!', 'error');
        }
    }

    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modalHTML = `
            <div class="modal-overlay" id="quickViewModal">
                <div class="modal-content quick-view-modal">
                    <div class="modal-header">
                        <h2>${product.title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="quick-view-content">
                            <div class="quick-view-image">
                                <img src="${product.image}" alt="${product.title}">
                            </div>
                            <div class="quick-view-info">
                                <p class="product-description">${product.description}</p>
                                <div class="product-details">
                                    <div class="detail-item">
                                        <span class="detail-label">Category:</span>
                                        <span class="detail-value">${product.category}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Stock:</span>
                                        <span class="detail-value">${product.stock} available</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Price:</span>
                                        <span class="detail-value price">$${product.price}</span>
                                    </div>
                                </div>
                                <div class="quick-view-actions">
                                    <button class="btn btn-primary btn-add-cart" data-product-id="${product.id}">
                                        <i class="fas fa-cart-plus"></i> Add to Cart
                                    </button>
                                    <button class="btn btn-secondary btn-wishlist" data-product-id="${product.id}">
                                        <i class="far fa-heart"></i> Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('quickViewModal');
        const closeBtn = modal.querySelector('.modal-close');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    toggleWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        const wishlistBtn = document.querySelector(`[data-product-id="${productId}"].btn-wishlist`);
        
        if (wishlistBtn) {
            const icon = wishlistBtn.querySelector('i');
            const isInWishlist = icon.classList.contains('fas');
            
            if (isInWishlist) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.showNotification(`${product.title} removed from wishlist`, 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.showNotification(`${product.title} added to wishlist`, 'success');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        this.filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        this.renderProducts();
    }

    sortProducts(sortBy) {
        switch(sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'featured':
                this.filteredProducts.sort((a, b) => b.featured - a.featured);
                break;
            default:
                this.filteredProducts = [...this.products];
        }
        this.renderProducts();
    }
}

// Initialize product manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.productManager = new ProductManager();
});
