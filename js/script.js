// ========================================
// CLEARSIGHT ANALYSIS PORTAL - MAIN SCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSVGInteractivity();
    initializeTooltips();
    initializeAnimations();
    initializeDataVisualization();
});

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

function initializeNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    // Mobile menu toggle (if exists)
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// SVG INTERACTIVITY
// ========================================

function initializeSVGInteractivity() {
    // Add hover effects to SVG elements
    const svgElements = document.querySelectorAll('svg g, svg rect, svg circle, svg path');
    svgElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.cursor = 'pointer';
        });

        element.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Add click handlers for interactive elements
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            const action = this.getAttribute('data-interactive');
            handleInteractiveAction(action, this);
        });
    });
}

function handleInteractiveAction(action, element) {
    switch(action) {
        case 'show-details':
            showElementDetails(element);
            break;
        case 'toggle-visibility':
            toggleElementVisibility(element);
            break;
        case 'highlight-related':
            highlightRelatedElements(element);
            break;
        default:
            console.log(`Unknown action: ${action}`);
    }
}

function showElementDetails(element) {
    const details = element.getAttribute('data-details');
    if (details) {
        // Create a tooltip or modal with details
        createTooltip(element, details);
    }
}

function toggleElementVisibility(element) {
    const target = document.querySelector(element.getAttribute('data-target'));
    if (target) {
        target.classList.toggle('hidden');
    }
}

function highlightRelatedElements(element) {
    const related = document.querySelectorAll(element.getAttribute('data-related'));
    related.forEach(rel => {
        rel.classList.add('highlighted');
        setTimeout(() => rel.classList.remove('highlighted'), 2000);
    });
}

function createTooltip(element, content) {
    // Remove existing tooltips
    document.querySelectorAll('.svg-tooltip').forEach(t => t.remove());

    const tooltip = document.createElement('div');
    tooltip.className = 'svg-tooltip';
    tooltip.innerHTML = content;

    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '0.5rem 1rem';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.9rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.maxWidth = '300px';

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 3000);
}

// ========================================
// TOOLTIP SYSTEM
// ========================================

function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('focus', showTooltip);
        trigger.addEventListener('blur', hideTooltip);
    });
}

function showTooltip(event) {
    const trigger = event.target;
    const tooltipText = trigger.getAttribute('data-tooltip');

    if (!tooltipText) return;

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = tooltipText;

    // Style tooltip
    Object.assign(tooltip.style, {
        position: 'absolute',
        background: 'rgba(15, 76, 117, 0.95)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: '1000',
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        maxWidth: '250px',
        wordWrap: 'break-word'
    });

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top - tooltipRect.height - 8;

    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) {
        top = rect.bottom + 8;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    trigger._tooltip = tooltip;
}

function hideTooltip(event) {
    const trigger = event.target;
    if (trigger._tooltip) {
        document.body.removeChild(trigger._tooltip);
        delete trigger._tooltip;
    }
}

// ========================================
// ANIMATIONS
// ========================================

function initializeAnimations() {
    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate on scroll
        document.querySelectorAll('.overview-card, .metric-card, .toc-principle, .subsection').forEach(el => {
            observer.observe(el);
        });
    }

    // Add loading animations
    addLoadingAnimations();
}

function addLoadingAnimations() {
    const elements = document.querySelectorAll('.overview-card, .metric-card, .toc-principle');

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================================
// DATA VISUALIZATION
// ========================================

function initializeDataVisualization() {
    // Initialize any data visualization components
    const dataContainers = document.querySelectorAll('[data-visualization]');
    dataContainers.forEach(container => {
        const type = container.getAttribute('data-visualization');
        createVisualization(container, type);
    });
}

function createVisualization(container, type) {
    switch(type) {
        case 'bar-chart':
            createBarChart(container);
            break;
        case 'line-chart':
            createLineChart(container);
            break;
        case 'pie-chart':
            createPieChart(container);
            break;
        default:
            console.log(`Unknown visualization type: ${type}`);
    }
}

// Add function to window scope for the Financial Analysis button
window.updateChartData = function() {
    // Check if we are on the financial page and the elements exist
    const optimizedBars = document.querySelectorAll('#financial-chart .chart-bar[style*="opacity: 0.3"]');
    const optimizedText = document.querySelectorAll('#financial-chart text[style*="opacity: 0.3"]');
    
    if (optimizedBars.length > 0) {
        // Animate bars
        optimizedBars.forEach(bar => {
            bar.style.transition = 'all 1s ease-out';
            bar.style.opacity = '1';
            
            // Optional: Animate height from 0 (if we wanted to dynamic draw, but here we just fade in for simplicity + opacity check)
            // But let's add a small scale effect
            const originalHeight = bar.getAttribute('height');
            // bar.setAttribute('height', 0); // Reset for animation if we wanted
            // setTimeout(() => bar.setAttribute('height', originalHeight), 10);
        });

        // Animate text
        optimizedText.forEach(text => {
            text.style.transition = 'opacity 1s ease-out 0.5s'; // slight delay
            text.style.opacity = '1';
        });

        // Update button text
        const btn = document.querySelector('.btn.btn-primary[onclick*="updateChartData"], #animate-chart-btn');
        if (btn) {
            btn.innerHTML = "✅ Optimization Simulated";
            btn.classList.add('success');
            btn.style.backgroundColor = '#10b981';
            btn.style.borderColor = '#059669';
        }
    }
};

// Bind the specific button in financial analysis if generic binding missed it
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'animate-chart-btn') {
        window.updateChartData();
    }
});

function createBarChart(container) {
    // Simple CSS-based bar chart
    const data = JSON.parse(container.getAttribute('data-chart-data') || '[]');

    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = item.value + 'px';
        bar.setAttribute('data-value', item.value);
        bar.setAttribute('data-label', item.label);

        container.appendChild(bar);
    });
}

function createLineChart(container) {
    // Placeholder for line chart
    console.log('Line chart creation not implemented');
}

function createPieChart(container) {
    // Placeholder for pie chart
    console.log('Pie chart creation not implemented');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// ========================================
// ACCESSIBILITY FEATURES
// ========================================

function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Add focus management
    manageFocus();

    // Add screen reader announcements
    initializeScreenReaderSupport();
}

function handleKeyboardNavigation(event) {
    // Handle keyboard navigation for custom components
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('interactive-element')) {
            focusedElement.click();
            event.preventDefault();
        }
    }
}

function manageFocus() {
    // Manage focus for modal dialogs and overlays
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = document.querySelectorAll(focusableElements);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

function initializeScreenReaderSupport() {
    // Add ARIA labels and live regions as needed
    const dynamicContent = document.querySelectorAll('[data-dynamic]');
    dynamicContent.forEach(element => {
        element.setAttribute('aria-live', 'polite');
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

function optimizePerformance() {
    // Lazy load images
    initializeLazyLoading();

    // Debounce scroll events
    const debouncedScroll = debounce(handleScroll, 16);
    window.addEventListener('scroll', debouncedScroll);

    // Optimize animations
    optimizeAnimations();
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function handleScroll() {
    // Handle scroll-based events
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
        document.documentElement.style.setProperty('--transition-fast', 'none');
    }
}

// Initialize performance optimizations
optimizePerformance();

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, send error to logging service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send error to logging service
});
