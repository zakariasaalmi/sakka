// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
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

// Header background change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(139, 69, 19, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)';
    header.style.backdropFilter = 'none';
  }
});

// Initialize Interactive Map
function initMap() {
  // إحداثيات مقهى سكة الحقيقية
  const cafeCoords = [29.22018002876541, -9.490867842841562];
  
  // إنشاء الخريطة
  const map = L.map('map').setView(cafeCoords, 15);
  
  // إضافة طبقة الخريطة من OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // إنشاء أيقونة مخصصة للمقهى
  const cafeIcon = L.divIcon({
    html: '<i class="fas fa-coffee" style="color: #8B4513; font-size: 20px;"></i>',
    iconSize: [30, 30],
    className: 'custom-div-icon'
  });
  
  // إضافة علامة للمقهى
  const marker = L.marker(cafeCoords, { icon: cafeIcon }).addTo(map);
  
  // إضافة نافذة منبثقة للعلامة
  marker.bindPopup(`
    <div style="text-align: center; font-family: 'Cairo', sans-serif; direction: rtl;">
      <h3 style="color: #8B4513; margin-bottom: 10px;">مقهى سكة</h3>
      <p style="margin-bottom: 5px;">الموقع الحقيقي للمقهى</p>
      <p style="margin-bottom: 5px;">المغرب</p>
      <p style="color: #FFD700; font-weight: bold;">+212 522 123 456</p>
    </div>
  `).openPopup();
  
  // إضافة دائرة لإظهار منطقة الخدمة
  L.circle(cafeCoords, {
    color: '#FFD700',
    fillColor: '#8B4513',
    fillOpacity: 0.1,
    radius: 1000
  }).addTo(map);
}

// تشغيل الخريطة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // التحقق من وجود عنصر الخريطة
  if (document.getElementById('map')) {
    initMap();
  }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    
    // Simulate form submission
    alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
    this.reset();
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe menu items and other elements
document.querySelectorAll('.menu-item, .feature, .location-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add loading animation for menu items
document.querySelectorAll('.menu-item').forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.moroccan-pattern');
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add hover effects to menu categories
document.querySelectorAll('.menu-category').forEach(category => {
  category.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  category.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Price highlight animation
document.querySelectorAll('.item-price').forEach(price => {
  price.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.3)';
  });
  
  price.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
});

// Add typing effect to hero title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Add click effect to CTA button
document.querySelector('.cta-button')?.addEventListener('click', function(e) {
  const ripple = document.createElement('span');
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  this.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Add CSS for ripple effect and custom map icon
const style = document.createElement('style');
style.textContent = `
  .cta-button {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .custom-div-icon {
    background: rgba(255, 215, 0, 0.9);
    border: 2px solid #8B4513;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .leaflet-popup-content-wrapper {
    border-radius: 10px;
  }
  
  .leaflet-popup-content {
    margin: 15px;
  }
`;
document.head.appendChild(style);