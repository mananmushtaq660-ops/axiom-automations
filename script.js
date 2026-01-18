// ============================================
// CONTACT SALES FUNCTION
// ============================================
function contactSales(plan) {
  const message = plan === "Demo Request" 
    ? "Hi Axiom team, I'd like to schedule a free demo to see how we can save on operational costs. Please contact me at your earliest convenience."
    : `Hi Axiom team, I'm interested in the ${plan}. Could you please contact me with more details, pricing, and information about implementation? Thank you.`;
  
  const email = 'axiomautomations.manaan@gmail.com';
  const subject = `${plan} - Axiom Automations Inquiry`;
  
  // Trigger scroll animation
  animateButtonClick(event);
  
  // Open email client
  setTimeout(() => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }, 300);
}

// ============================================
// SCROLL TO SECTION
// ============================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============================================
// BUTTON CLICK ANIMATION
// ============================================
function animateButtonClick(e) {
  if (e && e.target) {
    const btn = e.target;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
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
    
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
}

// ============================================
// LIVE COUNTDOWN TIMER
// ============================================
function startCountdown() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  const updateTimer = () => {
    const now = new Date();
    const distance = endOfDay - now;
    
    if (distance < 0) {
      endOfDay.setDate(endOfDay.getDate() + 1);
      endOfDay.setHours(23, 59, 59, 999);
      return;
    }
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    updateElement('hours', String(hours).padStart(2, '0'));
    updateElement('minutes', String(minutes).padStart(2, '0'));
    updateElement('seconds', String(seconds).padStart(2, '0'));
  };
  
  function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element && element.textContent !== value) {
      element.style.transform = 'scale(1.15)';
      element.textContent = value;
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 150);
    }
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ============================================
// SOCIAL PROOF NOTIFICATIONS
// ============================================
const socialProofData = [
  { name: "Rajesh Kumar", location: "Mumbai", action: "booked a <span class='proof-highlight'>free consultation</span>", time: "2 minutes ago", emoji: "👨" },
  { name: "Priya Sharma", location: "Delhi", action: "received <span class='proof-highlight'>AI audit report</span>", time: "5 minutes ago", emoji: "👩" },
  { name: "Amit Patel", location: "Bangalore", action: "signed up for <span class='proof-highlight'>Professional Plan</span>", time: "8 minutes ago", emoji: "👨" },
  { name: "Sarah Johnson", location: "USA", action: "started <span class='proof-highlight'>free trial</span>", time: "12 minutes ago", emoji: "👩" },
  { name: "Vikram Singh", location: "Pune", action: "booked a <span class='proof-highlight'>demo call</span>", time: "15 minutes ago", emoji: "👨" },
  { name: "Ananya Reddy", location: "Hyderabad", action: "saved <span class='proof-highlight'>₹40,000/month</span>", time: "18 minutes ago", emoji: "👩" },
  { name: "Michael Chen", location: "Singapore", action: "upgraded to <span class='proof-highlight'>Enterprise</span>", time: "22 minutes ago", emoji: "👨" },
  { name: "Neha Gupta", location: "Jaipur", action: "completed <span class='proof-highlight'>onboarding</span>", time: "25 minutes ago", emoji: "👩" }
];

function showSocialProof() {
  const container = document.getElementById('social-proof-container');
  if (!container) return;
  
  let index = 0;
  
  const createNotification = () => {
    const data = socialProofData[index];
    
    const notification = document.createElement('div');
    notification.className = 'social-proof-notification';
    notification.innerHTML = `
      <div class="proof-avatar">${data.emoji}</div>
      <div class="proof-content">
        <span class="proof-name">${data.name} from ${data.location}</span>
        <div class="proof-action">${data.action}</div>
      </div>
      <div class="proof-time">${data.time}</div>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'fadeOut 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
      }
    }, 6000);
    
    index = (index + 1) % socialProofData.length;
  };
  
  setTimeout(createNotification, 5000);
  setInterval(createNotification, 10000);
}

// ============================================
// VIDEO PLACEHOLDER HANDLER
// ============================================
function setupVideoPlaceholder() {
  const video = document.getElementById('demo-video');
  const placeholder = document.querySelector('.video-placeholder');
  
  if (placeholder) {
    placeholder.addEventListener('click', () => {
      alert('Add your video URL to:\n<source src="a.mp4" type="video/mp4">\n\nOr replace "a.mp4" with your video filename.');
    });
  }
  
  if (video) {
    video.addEventListener('loadeddata', () => {
      if (placeholder) placeholder.style.display = 'none';
    });
    
    video.addEventListener('error', () => {
      if (placeholder) placeholder.style.display = 'flex';
    });
  }
}

// ============================================
// FORM CAPTURE
// ============================================
function captureLeadEmail(e) {
  e.preventDefault();
  
  const fname = document.getElementById('lead-fname').value;
  const lname = document.getElementById('lead-lname').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const phone = e.target.querySelector('input[type="tel"]').value;
  const company = document.getElementById('lead-company').value;
  
  const leads = JSON.parse(localStorage.getItem('axiom-leads') || '[]');
  leads.push({ 
    fname,
    lname,
    email, 
    phone, 
    company, 
    date: new Date().toISOString() 
  });
  localStorage.setItem('axiom-leads', JSON.stringify(leads));
  
  window.location.href = `mailto:axiomautomations.manaan@gmail.com?subject=New Lead: ${company}&body=Name: ${fname} ${lname}%0DEmail: ${email}%0DPhone: ${phone}%0DCompany: ${company}`;
  
  alert(`Thanks ${fname}! We'll send your free AI audit to ${email} within 24 hours.`);
  e.target.reset();
}

// ============================================
// FAQ TOGGLE
// ============================================
function toggleFAQ(element) {
  const p = element.querySelector('p');
  const span = element.querySelector('span');
  
  if (p.style.display === 'none') {
    p.style.display = 'block';
    span.textContent = '−';
    element.style.background = 'rgba(45, 156, 235, 0.08)';
  } else {
    p.style.display = 'none';
    span.textContent = '+';
    element.style.background = 'transparent';
  }
}

// ============================================
// UPDATE FAVICON DYNAMICALLY
// ============================================
function updateFavicon() {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = 'logo.png';
  document.getElementsByTagName('head')[0].appendChild(link);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    if (navbar) {
    if (navbar) {
      navbar.style.background = 'rgba(10, 13, 26, 0.98)';
      navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.2)';
      navbar.style.boxShadow = '0 10px 40px rgba(45, 156, 235, 0.1)';
    }
  } else {
    if (navbar) {
      navbar.style.background = 'rgba(10, 13, 26, 0.95)';
      navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.1)';
      navbar.style.boxShadow = 'none';
    }
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #1d9ceb; font-weight: bold;');
  console.log('%c       AXIOM AUTOMATIONS       ', 'color: #00d4ff; font-weight: bold; font-size: 16px;');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #1d9ceb; font-weight: bold;');
  console.log('%cAI Automation Services for Businesses', 'color: #a8a8a8; font-size: 12px;');
  console.log('%cWebsite: https://axiomautomations.com', 'color: #a8a8a8; font-size: 12px;');
  console.log('%cEmail: axiomautomations.manaan@gmail.com', 'color: #a8a8a8; font-size: 12px;');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #1d9ceb; font-weight: bold;');
  
  // Update favicon to logo.png
  updateFavicon();
  
  // Start countdown timer
  startCountdown();
  
  // Start social proof notifications
  showSocialProof();
  
  // Setup video placeholder
  setupVideoPlaceholder();
  
  // Observe animated elements
  document.querySelectorAll('.service-card, .why-card, .pricing-card, .result-card, .pill, .step').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  console.log('%c✅ Live Countdown Timer: Active', 'color: #10b981; font-weight: bold;');
  console.log('%c✅ Social Proof Notifications: Active', 'color: #10b981; font-weight: bold;');
  console.log('%c✅ Video Container: Ready', 'color: #10b981; font-weight: bold;');
  console.log('%c✅ Favicon: Updated to logo.png', 'color: #10b981; font-weight: bold;');
  console.log('%c✅ All Animations: Loaded', 'color: #10b981; font-weight: bold;');
  console.log('%c✅ Enhanced Icons: Active', 'color: #10b981; font-weight: bold;');
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log('Escape key pressed');
  }
  
  if (e.key === 'Home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  if (e.key === 'End') {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// ============================================
// TRACK USER INTERACTIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Track button clicks
  document.querySelectorAll('.btn, .service-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      animateButtonClick(e);
      const action = this.textContent.trim();
      console.log('User clicked:', action);
    });
  });
  
  // Track section views
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.id || entry.target.className;
        console.log('User viewed:', sectionName);
      }
    });
  }, { threshold: 0.25 });
  
  sections.forEach(section => sectionObserver.observe(section));
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
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

const debouncedScroll = debounce(function() {
  // Handle scroll events with debouncing
}, 100);

window.addEventListener('scroll', debouncedScroll, { passive: true });

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
  console.log('%c🚀 Axiom Automations website fully loaded', 'color: #00d4ff; font-weight: bold;');
  document.body.style.opacity = '1';
  
  const elements = document.querySelectorAll('[class*="animated"]');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 100);
  });
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .service-btn, .pricing-btn, .btn-nav');
  buttons.forEach((btn) => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', btn.textContent.trim());
    }
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (event) => {
  console.error('An error occurred:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// ============================================
// SESSION TRACKING
// ============================================
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('axiom-visited', 'true');
  sessionStorage.setItem('axiom-last-visit', new Date().toISOString());
});

// ============================================
// RIPPLE ANIMATION CSS INJECTION
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// DYNAMIC TITLE UPDATE
// ============================================
let originalTitle = document.title;
let titleInterval;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    let toggle = true;
    titleInterval = setInterval(() => {
      document.title = toggle ? '🚀 Get 50% Off!' : '⚡ Free Audit Inside!';
      toggle = !toggle;
    }, 2000);
  } else {
    clearInterval(titleInterval);
    document.title = originalTitle;
  }
});
    
