// ========================================
// CLEARSIGHT ANALYSIS PORTAL - MAIN JS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeCalculator();
    initializeTooltips();
    initializeUtilities();
    initializeConveyorBelt();
    initializeConveyorTooltips();
});

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }

        link.addEventListener('click', function(e) {
            // Smooth scroll for anchor links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Mobile menu toggle (if needed in future)
    // const menuToggle = document.querySelector('.menu-toggle');
    // if (menuToggle) {
    //     menuToggle.addEventListener('click', toggleMobileMenu);
    // }
}

// Chart Functions
function initializeCharts() {
    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        createCapacityChart();
        createRevenueChart();
        createWaitingTimeChart();
    }
}

function createCapacityChart() {
    const ctx = document.getElementById('capacityChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Current Utilization', 'Available Capacity'],
                datasets: [{
                    data: [60, 40],
                    backgroundColor: ['#667eea', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
}

function createRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [150000, 160000, 155000, 170000, 165000, 175000],
                    backgroundColor: '#667eea',
                    borderColor: '#667eea',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

function createWaitingTimeChart() {
    const ctx = document.getElementById('waitingTimeChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Waiting Days',
                    data: [45, 42, 38, 35],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Calculator Functions
function initializeCalculator() {
    const calculatorForm = document.getElementById('roiCalculator');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateROI();
        });

        // Auto-calculate on input change
        const inputs = calculatorForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', calculateROI);
        });
    }
}

function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value) || 0;
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 12;

    const totalSavings = monthlySavings * months;
    const roi = totalSavings - investment;
    const roiPercentage = investment > 0 ? (roi / investment) * 100 : 0;
    const paybackPeriod = monthlySavings > 0 ? investment / monthlySavings : 0;

    document.getElementById('totalSavings').textContent = `$${totalSavings.toLocaleString()}`;
    document.getElementById('netROI').textContent = `$${roi.toLocaleString()}`;
    document.getElementById('roiPercentage').textContent = `${roiPercentage.toFixed(1)}%`;
    document.getElementById('paybackPeriod').textContent = `${paybackPeriod.toFixed(1)} months`;
}

// Tooltip Functions
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    tooltip.style.opacity = '1';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    });
}

// Utility Functions
function initializeUtilities() {
    // Add loading states
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;

            const originalText = this.textContent;
            this.innerHTML = '<span class="loading"></span> Processing...';
            this.classList.add('loading');

            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('loading');
            }, 2000);
        });
    });

    // Animate elements on scroll
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

    const animateElements = document.querySelectorAll('.overview-card, .toc-step, .metric-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Format numbers
    const numberElements = document.querySelectorAll('[data-format="number"]');
    numberElements.forEach(element => {
        const value = parseFloat(element.textContent);
        if (!isNaN(value)) {
            element.textContent = value.toLocaleString();
        }
    });

    // Format currency
    const currencyElements = document.querySelectorAll('[data-format="currency"]');
    currencyElements.forEach(element => {
        const value = parseFloat(element.textContent);
        if (!isNaN(value)) {
            element.textContent = '$' + value.toLocaleString();
        }
    });
}

// ========================================
// CONVEYOR BELT INTERACTIVITY
// ========================================

function initializeConveyorBelt() {
    const processStages = document.querySelectorAll('.process-stage');
    const conveyorBelt = document.querySelector('.conveyor-belt');

    if (!processStages.length) return;

    // Add click handlers for process stages
    processStages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            showStageDetails(stage, index);
        });

        // Add hover effects
        stage.addEventListener('mouseenter', () => {
            highlightStage(stage);
        });

        stage.addEventListener('mouseleave', () => {
            unhighlightStage(stage);
        });
    });

    // Initialize conveyor animation
    startConveyorAnimation();

    // Add bottleneck alerts
    initializeBottleneckAlerts();
}

function showStageDetails(stage, index) {
    const stageData = getStageData(stage.dataset.stage);

    // Create modal or tooltip with detailed information
    const modal = createStageModal(stageData);
    document.body.appendChild(modal);

    // Animate modal entrance
    setTimeout(() => modal.classList.add('active'), 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function getStageData(stageType) {
    const stageData = {
        intake: {
            title: 'Patient Intake',
            description: 'Initial consultation and assessment where patients are evaluated for cataract surgery eligibility.',
            metrics: {
                throughput: '450 patients/month',
                efficiency: '95%',
                waitTime: '1-2 days'
            },
            issues: ['High volume intake', 'Limited pre-screening'],
            recommendations: ['Implement online pre-assessment', 'Add intake coordinator']
        },
        assessment: {
            title: 'Pre-Operative Assessment',
            description: 'Comprehensive eye examination, medical history review, and surgical planning.',
            metrics: {
                throughput: '380 patients/month',
                efficiency: '84%',
                waitTime: '7-10 days'
            },
            issues: ['Specialized equipment bottlenecks', 'Staff scheduling conflicts'],
            recommendations: ['Cross-train staff', 'Add assessment slots']
        },
        scheduling: {
            title: 'OR Scheduling (CRITICAL BOTTLENECK)',
            description: 'Operating room booking and resource allocation for surgical procedures.',
            metrics: {
                throughput: '270 patients/month',
                efficiency: '60%',
                waitTime: '42 days'
            },
            issues: ['Limited OR availability', 'Inefficient booking system', 'Staffing constraints'],
            recommendations: ['Implement advanced scheduling software', 'Add weekend OR sessions', 'Optimize staff utilization']
        },
        surgery: {
            title: 'Surgical Procedure',
            description: 'Cataract surgery performed by Dr. Connors and surgical team.',
            metrics: {
                throughput: '270 patients/month',
                efficiency: '100%',
                waitTime: '0 days (when scheduled)'
            },
            issues: ['Waiting for scheduling bottleneck'],
            recommendations: ['Maximize OR utilization', 'Standardize procedures']
        },
        recovery: {
            title: 'Post-Operative Care',
            description: 'Follow-up appointments, recovery monitoring, and complication management.',
            metrics: {
                throughput: '270 patients/month',
                efficiency: '92%',
                waitTime: '1-2 weeks post-op'
            },
            issues: ['Follow-up scheduling', 'Patient compliance'],
            recommendations: ['Telemedicine follow-ups', 'Patient education programs']
        }
    };

    return stageData[stageType] || {};
}

function createStageModal(data) {
    const modal = document.createElement('div');
    modal.className = 'stage-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${data.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="stage-description">${data.description}</p>

                <div class="stage-metrics-detailed">
                    <h4>Performance Metrics</h4>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <span class="metric-label">Throughput:</span>
                            <span class="metric-value">${data.metrics?.throughput}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Efficiency:</span>
                            <span class="metric-value">${data.metrics?.efficiency}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Wait Time:</span>
                            <span class="metric-value">${data.metrics?.waitTime}</span>
                        </div>
                    </div>
                </div>

                ${data.issues ? `
                <div class="stage-issues">
                    <h4>Current Issues</h4>
                    <ul>
                        ${data.issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${data.recommendations ? `
                <div class="stage-recommendations">
                    <h4>Recommendations</h4>
                    <ul>
                        ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    // Close button functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });

    return modal;
}

function highlightStage(stage) {
    // Add glow effect
    stage.style.boxShadow = '0 20px 60px rgba(0, 212, 255, 0.4)';

    // Highlight connected arrows
    const stageIndex = Array.from(stage.parentNode.children).indexOf(stage);
    const arrows = stage.parentNode.querySelectorAll('.conveyor-arrow');

    if (arrows[stageIndex - 1]) {
        arrows[stageIndex - 1].style.color = '#00d4ff';
        arrows[stageIndex - 1].style.transform = 'scale(1.2)';
    }
    if (arrows[stageIndex]) {
        arrows[stageIndex].style.color = '#00d4ff';
        arrows[stageIndex].style.transform = 'scale(1.2)';
    }
}

function unhighlightStage(stage) {
    // Remove glow effect
    stage.style.boxShadow = '';

    // Reset arrows
    const arrows = stage.parentNode.querySelectorAll('.conveyor-arrow');
    arrows.forEach(arrow => {
        arrow.style.color = '';
        arrow.style.transform = '';
    });
}

function startConveyorAnimation() {
    const belt = document.querySelector('.conveyor-belt');

    if (!belt) return;

    // Create flowing particles effect
    setInterval(() => {
        createFlowParticle(belt);
    }, 2000);
}

function createFlowParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'flow-particle';
    particle.style.left = '0';
    particle.style.top = '50%';
    particle.style.transform = 'translateY(-50%)';

    container.appendChild(particle);

    // Animate particle across the belt
    setTimeout(() => {
        particle.style.left = '100%';
        particle.style.opacity = '0';
    }, 10);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

function initializeBottleneckAlerts() {
    const bottlenecks = document.querySelectorAll('.bottleneck');

    bottlenecks.forEach(bottleneck => {
        // Add pulsing alert
        setInterval(() => {
            const alert = bottleneck.querySelector('.backup-queue');
            if (alert) {
                alert.style.animation = 'none';
                setTimeout(() => {
                    alert.style.animation = 'queueGrow 1.5s ease-in-out infinite alternate';
                }, 10);
            }
        }, 5000);
    });
}

// Enhanced tooltip functionality for conveyor
function initializeConveyorTooltips() {
    const tooltipElements = document.querySelectorAll('.process-stage[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showConveyorTooltip);
        element.addEventListener('mouseleave', hideConveyorTooltip);
    });
}

function showConveyorTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'conveyor-tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 15 + 'px';

    // Adjust position if tooltip goes off screen
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.left < 10) {
        tooltip.style.left = '10px';
    } else if (tooltipRect.right > window.innerWidth - 10) {
        tooltip.style.left = window.innerWidth - tooltipRect.width - 10 + 'px';
    }

    setTimeout(() => tooltip.classList.add('active'), 10);
}

function hideConveyorTooltip() {
    const tooltips = document.querySelectorAll('.conveyor-tooltip');
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('active');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    });
}

// Export functions for use in other scripts
window.ClearSight = {
    initializeNavigation,
    initializeCharts,
    initializeCalculator,
    initializeTooltips,
    initializeUtilities,
    calculateROI
};