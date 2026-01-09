// ============ PARTICLE SYSTEM ============
function createParticles() {
  const container = document.getElementById('particleContainer');
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    container.appendChild(particle);
  }
}

// ============ SMOOTH SCROLL & NAVIGATION ============
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============ CONTACT SALES ============
function contactSales(plan) {
  const message = plan === 'Demo' || plan === 'Demo Request'
    ? 'Hi Axiom team, I\'d like to schedule a free demo to see how we can transform our business.\n\nPlease contact me at your earliest convenience.'
    : `Hi Axiom team, I\'m interested in the ${plan}. Could you please contact me with more details, pricing information, and implementation timeline?\n\nThank you.`;
  
  const email = 'contact@axiomautomations.com';
  const subject = `${plan} - Axiom Automations Demo Request`;
  
  // Trigger button animation
  event.target.style.transform = 'scale(0.98)';
  setTimeout(() => {
    event.target.style.transform = 'scale(1)';
  }, 200);
  
  setTimeout(() => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }, 300);
}

// ============ COUNTER ANIMATION ============
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const isDecimal = target % 1 !== 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }
  }, 16);
}

// ============ INTERSECTION OBSERVER ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      
      // Animate counters
      const counter = entry.target.querySelector('.result-number-counter');
      if (counter) {
        const value = parseFloat(counter.textContent);
        if (!isNaN(value)) {
          animateCounter(counter, value);
        }
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============ PAGE LOAD & INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  // Create particles
  createParticles();
  
  // Observe animated elements
  document.querySelectorAll(
    '.service-card-animated, .feature-item-animated, ' +
    '.pricing-card-animated, .result-card-animated, ' +
    '.pill-animated'
  ).forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });
  
  // FAQ Toggle
  document.querySelectorAll('.faq-item-premium').forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  
  // Button ripple effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// ============ NAVBAR SCROLL EFFECT ============
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.background = 'linear-gradient(180deg, rgba(10, 13, 26, 0.98) 0%, rgba(10, 13, 26, 0.92) 100%)';
    navbar.style.boxShadow = '0 20px 60px rgba(45, 156, 235, 0.15)';
    navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.25)';
  } else {
    navbar.style.background = 'linear-gradient(180deg, rgba(10, 13, 26, 0.95) 0%, rgba(10, 13, 26, 0.85) 100%)';
    navbar.style.boxShadow = '0 20px 60px rgba(45, 156, 235, 0.1)';
    navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.15)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ============ DYNAMIC PRICING HIGHLIGHT ============
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card-premium');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      pricingCards.forEach(c => {
        c.style.opacity = '0.7';
        c.style.transform = 'scale(0.95)';
      });
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    card.addEventListener('mouseleave', function() {
      pricingCards.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'scale(1)';
      });
    });
  });
});

// ============ SERVICE CARD HOVER ============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card-premium').forEach(card => {
    const icon = card.querySelector('.service-icon-premium');
    
    card.addEventListener('mouseenter', function() {
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(8deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
});

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.faq-item-premium.active').forEach(item => {
      item.classList.remove('active');
    });
  }
  
  if (e.key === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  if (e.key === 'End') {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// ============ ACCESSIBILITY ============
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .service-btn-premium, .pricing-btn-premium');
  buttons.forEach((btn, index) => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', btn.textContent.trim());
    }
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
  });
  
  // Keyboard support for buttons
  buttons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// ============ PERFORMANCE OPTIMIZATION ============
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

const debouncedResize = debounce(function() {
  // Handle resize events
}, 100);

window.addEventListener('resize', debouncedResize, { passive: true });

// ============ TRACKING & ANALYTICS ============
document.addEventListener('DOMContentLoaded', () => {
  // Track section visibility
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.id || entry.target.className;
        console.log(`✓ Viewed: ${sectionName}`);
      }
    });
  }, { threshold: 0.25 });
  
  sections.forEach(section => sectionObserver.observe(section));
  
  // Track button clicks
  document.querySelectorAll('.btn, .service-btn-premium').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log(`✓ Clicked: ${this.textContent.trim()}`);
    });
  });
});

// ============ RIPPLE ANIMATION STYLE ============
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ============ CONSOLE MESSAGES ============
console.log('%c┏━━━━━━━━━━━━━━━━━━━━━━━━┓', 'color: #1d9ceb; font-weight: bold; font-size: 14px;');
console.log('%c┃  AXIOM AUTOMATIONS  ┃', 'color: #1d9ceb; font-weight: bold; font-size: 14px;');
console.log('%c┗━━━━━━━━━━━━━━━━━━━━━━━━┛', 'color: #1d9ceb; font-weight: bold; font-size: 14px;');
console.log('%cEnterprise AI Automation Platform', 'color: #a8a8a8; font-size: 12px;');
console.log('%c✓ Website loaded successfully', 'color: #10b981; font-weight: bold;');
console.log('%c✓ All systems operational', 'color: #10b981; font-weight: bold;');
console.log('%cVisit: https://axiomautomations.com', 'color: #a8a8a8; font-size: 12px;');

