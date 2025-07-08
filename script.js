// Add this to the existing script.js file

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Animate stats on scroll
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    // Extract number from text (e.g., "500+" -> 500)
                    const numMatch = finalValue.match(/\d+/);
                    if (numMatch) {
                        const finalNum = parseInt(numMatch[0]);
                        animateNumber(target, finalNum, finalValue);
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    };
    
    // Number animation function
    const animateNumber = (element, finalNumber, finalText) => {
        let currentNumber = 0;
        const increment = finalNumber / 50; // 50 steps
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                element.textContent = finalText;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentNumber) + (finalText.includes('+') ? '+' : finalText.includes('%') ? '%' : '');
            }
        }, 30);
    };
    
    // Initialize stat animation
    animateStats();
    
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid var(--primary-blue)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after hero title animation
        setTimeout(typeWriter, 1500);
    }
    
    // Parallax effect for floating icons
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add glitch effect to hero title on hover
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        heroTitle.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
    
    // Interactive code snippet
    const codeContent = document.querySelector('.code-content');
    if (codeContent) {
        codeContent.addEventListener('click', function() {
            // Add a "compiled" effect
            const originalContent = this.innerHTML;
            this.innerHTML = '<span class="success">✓ Code compiled successfully!</span><br><span class="success">✓ Security tools loaded</span><br><span class="success">✓ Ready for deployment</span>';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
            }, 2000);
        });
    }
    
    // Feature items hover effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Badge pulse effect
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite';
        }, index * 500);
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    .success {
        color: var(--success-color);
        font-weight: bold;
    }
    
    .code-content {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .code-content:hover {
        background: rgba(0, 102, 255, 0.05);
    }
`;
document.head.appendChild(style);
