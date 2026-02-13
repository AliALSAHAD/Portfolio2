// ===== Skills Data =====
// Load from localStorage if admin has updated, otherwise use defaults
function getSkillsData() {
  const saved = localStorage.getItem('portfolioSkills');
  if (saved) {
    return JSON.parse(saved);
  }
  
  return {
   design: [
    { name: 'Adobe Photoshop', icon: 'fas fa-image', progress: 95 },
    { name: 'Adobe Illustrator', icon: 'fas fa-pen-nib', progress: 90 },
    { name: 'Figma', icon: 'fas fa-pencil-ruler', progress: 92 },
    { name: 'Adobe After Effects', icon: 'fas fa-film', progress: 30 },
    { name: 'Adobe Premiere Pro', icon: 'fas fa-video', progress: 50 }
  ],
  ai: [
  ],
  programming: [
    { name: 'HTML & CSS', icon: 'fab fa-html5', progress: 88 },
    { name: 'JavaScript', icon: 'fab fa-js', progress: 30 },
    { name: 'Python', icon: 'fab fa-python', progress: 30 },
    { name: 'JAVA', icon: 'fab fa-java', progress: 90 },
   
  ],
  security: [
    { name: 'Penetration Testing', icon: 'fas fa-user-secret', progress: 85 },
    { name: 'Network Security', icon: 'fas fa-network-wired', progress: 88 },
    { name: 'Kali Linux', icon: 'fab fa-linux', progress: 90 },
    { name: 'Ethical Hacking', icon: 'fas fa-bug', progress: 82 },
    { name: 'Cryptography', icon: 'fas fa-key', progress: 80 },
    { name: 'Security Auditing', icon: 'fas fa-shield-alt', progress: 87 }
  ]
  };
}

const skillsData = getSkillsData();

// ===== Projects Data =====
function getProjectsData() {
  const saved = localStorage.getItem('portfolioProjects');
  if (saved) {
    return JSON.parse(saved);
  }
  
  return {
    design: [
      { title: 'هوية بصرية متكاملة', description: 'تصميم هوية بصرية احترافية لشركة ناشئة', icon: 'fas fa-palette', tags: ['Illustrator', 'Photoshop'] },
      { title: 'تصميم UI/UX', description: 'واجهات تطبيق جوال عصرية ومبتكرة', icon: 'fas fa-mobile-alt', tags: ['Figma', 'Adobe XD'] },
    ],
    ai: [
      { title: 'مولد محتوى ذكي', description: 'نظام ذكاء اصطناعي لإنشاء محتوى تسويقي', icon: 'fas fa-robot', tags: ['ChatGPT API', 'Python'] },
    ],
    programming: [
      { title: 'متجر إلكتروني', description: 'منصة تجارة إلكترونية متكاملة مع نظام دفع آمن', icon: 'fas fa-shopping-cart', tags: ['React', 'Node.js'] },
      { title: 'منصة تعليمية', description: 'موقع للتعلم الإلكتروني مع نظام الدورات', icon: 'fas fa-graduation-cap', tags: ['React', 'Firebase'] }
    ],
    security: [
      { title: 'اختبار اختراق موقع', description: 'فحص أمني شامل لمنصة إلكترونية', icon: 'fas fa-shield-alt', tags: ['Kali Linux', 'Burp Suite'] },
      { title: 'تحليل ثغرات الشبكة', description: 'فحص وتحليل نقاط الضعف في البنية التحتية', icon: 'fas fa-network-wired', tags: ['Nmap', 'Wireshark'] },
    ]
  };
}

const projectsData = getProjectsData();

// ===== Loader =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = "none", 1000);
  }, 1800);
});

// ===== Load Skills Function =====
function loadSkills(category) {
  const container = document.getElementById('skillsContainer');
  const skills = skillsData[category];
  
  // Fade out animation
  container.classList.add('fade-out');
  
  setTimeout(() => {
    container.innerHTML = '';
    
    skills.forEach((skill, index) => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.innerHTML = `
        <div class="skill-header">
          <img src="${skill.logo}" alt="${skill.name}" class="skill-logo">
          <span>${skill.name}</span>
        </div>
        <div class="skill-bar">
          <div class="skill-progress" data-progress="${skill.progress}"></div>
        </div>
      `;
      container.appendChild(skillItem);
      
      // Animate skill item
      setTimeout(() => {
        skillItem.classList.add('show');
        const progressBar = skillItem.querySelector('.skill-progress');
        setTimeout(() => {
          progressBar.style.width = skill.progress + '%';
        }, 200);
      }, index * 100);
    });
    
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    
    setTimeout(() => {
      container.classList.remove('fade-in');
    }, 500);
  }, 300);
}

// ===== Skills Tabs Switching =====
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    tabButtons.forEach(b => b.classList.remove('active'));
    // Add active to clicked
    btn.classList.add('active');
    // Load skills for category
    const category = btn.getAttribute('data-category');
    loadSkills(category);
  });
});

// Load default skills (design) on page load
window.addEventListener('load', () => {
  setTimeout(() => {
    loadSkills('design');
  }, 500);
});

// ===== Load Projects Function =====
function loadProjects(category) {
  const container = document.getElementById('projectsContainer');
  
  // Fade out
  container.classList.add('fade-out');
  
  setTimeout(() => {
    container.innerHTML = '';
    
    let projects = [];
    if (category === 'all') {
      // Combine all projects
      Object.values(projectsData).forEach(catProjects => {
        projects = projects.concat(catProjects);
      });
    } else {
      projects = projectsData[category];
    }
    
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-image">
          <i class="${project.icon}"></i>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="card-footer">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      `;
      container.appendChild(card);
      
      // Animate card
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
      
      // Add hover z-index effect
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
    });
    
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    
    setTimeout(() => {
      container.classList.remove('fade-in');
    }, 500);
  }, 300);
}

// ===== Work Tabs Switching =====
const workTabButtons = document.querySelectorAll('.work-tab-btn');
workTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    workTabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-work-category');
    loadProjects(category);
  });
});

// Load all projects by default
window.addEventListener('load', () => {
  setTimeout(() => {
    loadProjects('all');
  }, 800);
});

// ===== Typing Animation =====
const words = ["الإبداع", "التعلم", "الإثراء", "الشغف", "التطور", "الابتكار"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typedText");
const typingSpeed = 150;
const deletingSpeed = 100;
const pauseTime = 2000;

function typeWord() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = isDeleting ? deletingSpeed : typingSpeed;
  
  if (!isDeleting && charIndex === currentWord.length) {
    speed = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }
  
  setTimeout(typeWord, speed);
}

// بدء الأنيميشن بعد تحميل الصفحة
setTimeout(typeWord, 1000);

// ===== Parallax Effect =====
const hero = document.querySelector('.hero');
const circles = document.querySelectorAll('.parallax-circle');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  circles.forEach((circle, index) => {
    const speed = (index + 1) * 20;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    
    circle.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Parallax on Scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  circles.forEach((circle, index) => {
    const speed = (index + 1) * 0.5;
    circle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Smooth Scroll with Offset =====
document.querySelectorAll('nav a, .scroll-btn').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href') || this.getAttribute('data-target');
    const target = document.querySelector(targetId);
    
    if (target) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// ===== Dark Mode =====
const toggle = document.getElementById("themeToggle");

// تحميل الوضع المحفوظ
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
} else {
  toggle.textContent = "🌙";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  
  if (document.body.classList.contains("dark")) {
    toggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    toggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// ===== Contact Options Toggle =====
const contactBtn = document.getElementById("contactBtn");
const contactOptions = document.getElementById("contactOptions");

contactBtn.addEventListener("click", () => {
  contactOptions.classList.toggle("show");
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.pointerEvents = "auto";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.pointerEvents = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ===== Add Ripple Effect to Buttons =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
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
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== Fade-in Animation on Scroll =====
const fadeElements = document.querySelectorAll('section > h2, section > p');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.8s ease';
  fadeObserver.observe(element);
});

// ===== Cursor Trail Effect (Optional) =====
let cursorTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(cursorTimeout);
  
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  
  document.body.appendChild(trail);
  
  setTimeout(() => trail.remove(), 500);
});

// ===== Performance: Throttle Scroll Events =====
function throttle(func, wait) {
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

console.log('🎨 Portfolio loaded successfully!');
console.log('✨ Made with love by Ali Alsahad');

// ===== Load Data from localStorage or use defaults =====
function getPortfolioData() {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    return JSON.parse(saved);
  }
  
  return {
    personalInfo: {
      name: 'Ali Alsahad',
      bio: `أنا علي الصهد، طالب علوم حاسب مسار شبكات في جامعة الملك سعود. شغوف بالتقنية وخصوصًا الأمن السيبراني، وأحب أفهم كيف تصير الهجمات وكيف نقدر نحمي الأنظمة منها بطريقة ذكية

غير كذا، عندي جانب إبداعي قوي في التصميم الجرافيكي، وأعتبره المساحة اللي أطلع فيها أفكاري بشكل بصري جذاب. أشتغل على تصميم الهويات البصرية، البوسترات الاحترافية، ومحتوى السوشيال ميديا بأسلوب ملفت وسهل التفاعل.`,
      profileImage: 'profile.png',
      available: true,
      portfolioLink: ''
    },
    certificates: {
      education: [
        { 
          title: 'الثانوية العامة', 
          institution: 'مدرسة...',
          year: '2020',
          description: 'معدل: ...',
          icon: 'fas fa-school'
        },
        { 
          title: 'بكالوريوس علوم حاسب - شبكات', 
          institution: 'جامعة الملك سعود',
          year: '2020 - الآن',
          description: 'حالياً في السنة...',
          icon: 'fas fa-university'
        }
      ],
      certificates: [
        {
          title: 'شهادة الأمن السيبراني',
          issuer: 'CompTIA Security+',
          year: '2024',
          description: 'شهادة معتمدة دولياً',
          icon: 'fas fa-shield-alt'
        }
      ]
    }
  };
}

// ===== Update Personal Info =====
function updatePersonalInfo() {
  const data = getPortfolioData();
  
  // Update bio
  const bioElement = document.getElementById('bioText');
  if (bioElement && data.personalInfo.bio) {
    const paragraphs = data.personalInfo.bio.split('\n\n');
    bioElement.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
  }
  
  // Update profile image
  const profileImg = document.getElementById('profileImage');
  if (profileImg && data.personalInfo.profileImage) {
    profileImg.src = data.personalInfo.profileImage;
  }
}

// ===== Update Availability Badge =====
function updateAvailability() {
  const data = getPortfolioData();
  const badge = document.getElementById('availabilityBadge');
  
  if (badge) {
    if (data.personalInfo.available) {
      badge.classList.remove('unavailable');
      badge.querySelector('.status-text').textContent = 'متوفر للعمل';
    } else {
      badge.classList.add('unavailable');
      badge.querySelector('.status-text').textContent = 'غير متوفر حالياً';
    }
  }
}

// ===== Update Portfolio Link =====
let currentSkillCategory = 'design';

function updatePortfolioLink() {
  const data = getPortfolioData();
  const section = document.getElementById('portfolioLinkSection');
  const btn = document.getElementById('portfolioBtn');
  
  if (section && btn) {
    if (data.personalInfo.portfolioLink && currentSkillCategory === 'design') {
      section.style.display = 'block';
      btn.href = data.personalInfo.portfolioLink;
    } else {
      section.style.display = 'none';
    }
  }
}

// ===== Load Certificates =====
function loadCertificates(category) {
  const container = document.getElementById('certificatesContainer');
  const data = getPortfolioData();
  const certs = data.certificates[category];
  
  if (!container || !certs) return;
  
  container.classList.add('fade-out');
  
  setTimeout(() => {
    container.innerHTML = '';
    
    certs.forEach((cert, index) => {
      const card = document.createElement('div');
      card.className = 'cert-card';
      
      card.innerHTML = `
        <div class="cert-icon">
          <i class="${cert.icon}"></i>
        </div>
        <h3>${cert.title}</h3>
        <div class="institution">${cert.institution || cert.issuer}</div>
        <div class="year">${cert.year}</div>
        ${cert.description ? `<div class="description">${cert.description}</div>` : ''}
      `;
      
      container.appendChild(card);
      
      setTimeout(() => {
        card.classList.add('show');
      }, index * 100);
    });
    
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    
    setTimeout(() => {
      container.classList.remove('fade-in');
    }, 500);
  }, 300);
}

// ===== Certificates Tabs =====
const certTabButtons = document.querySelectorAll('.cert-tab-btn');
certTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    certTabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-cert-category');
    loadCertificates(category);
  });
});

// ===== Update Skills Tab Change to Show/Hide Portfolio Link =====
const originalTabButtons = document.querySelectorAll('.tab-btn');
originalTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSkillCategory = btn.getAttribute('data-category');
    updatePortfolioLink();
  });
});

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
  setTimeout(() => {
    updatePersonalInfo();
    updateAvailability();
    updatePortfolioLink();
    loadCertificates('education');
  }, 1000);
});

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
  // Create hamburger menu button if it doesn't exist
  const nav = document.querySelector('nav');
  const links = document.querySelector('.links');
  const logo = document.querySelector('.logo');
  
  // Check if menu toggle already exists
  let menuToggle = document.querySelector('.menu-toggle');
  
  if (!menuToggle) {
    // Create menu toggle button
    menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'فتح القائمة');
    menuToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Insert before links (will be on the right in RTL)
    nav.insertBefore(menuToggle, links);
  }
  
  // Create center container for availability badge on mobile
  let navCenter = document.querySelector('.nav-center');
  if (!navCenter) {
    navCenter = document.createElement('div');
    navCenter.className = 'nav-center';
    
    // Clone availability badge to center
    const availabilityBadge = links.querySelector('.availability-badge');
    if (availabilityBadge) {
      const clonedBadge = availabilityBadge.cloneNode(true);
      navCenter.appendChild(clonedBadge);
      nav.appendChild(navCenter);
    }
  }
  
  // Toggle menu on click
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    links.classList.toggle('active');
    
    // Update aria-label
    if (this.classList.contains('active')) {
      this.setAttribute('aria-label', 'إغلاق القائمة');
    } else {
      this.setAttribute('aria-label', 'فتح القائمة');
    }
  });
  
  // Close menu when clicking on a link
  const navLinks = links.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      links.classList.remove('active');
      menuToggle.setAttribute('aria-label', 'فتح القائمة');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = nav.contains(event.target);
    
    if (!isClickInside && links.classList.contains('active')) {
      menuToggle.classList.remove('active');
      links.classList.remove('active');
      menuToggle.setAttribute('aria-label', 'فتح القائمة');
    }
  });
  
  // Close menu on window resize if open
  window.addEventListener('resize', function() {
    if (window.innerWidth > 968 && links.classList.contains('active')) {
      menuToggle.classList.remove('active');
      links.classList.remove('active');
      menuToggle.setAttribute('aria-label', 'فتح القائمة');
    }
  });
});

console.log('🎯 Portfolio Full System Loaded!');
console.log('✅ All features active');

// ===== Load Certificates with Timeline for Education =====
function loadCertificates(category) {
  const container = document.getElementById('certificatesContainer');
  const data = getPortfolioData();
  const certs = data.certificates[category];
  
  if (!container || !certs) return;
  
  container.classList.add('fade-out');
  
  setTimeout(() => {
    container.innerHTML = '';
    
    if (category === 'education') {
      // Timeline Design
      container.className = 'timeline-container';
      
      const timeline = document.createElement('div');
      timeline.className = 'timeline-line';
      container.appendChild(timeline);
      
      certs.forEach((cert, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        item.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-arrow"></div>
          <div class="timeline-card">
            <div class="timeline-header">
              <img src="${cert.logo || 'https://via.placeholder.com/80'}" alt="${cert.institution}" class="timeline-logo">
              <div class="timeline-info">
                <h3 class="timeline-title">${cert.title}</h3>
                <div class="timeline-institution">
                  ${cert.institution}
                  <span class="timeline-badge">
                    <i class="${cert.typeIcon || 'fas fa-graduation-cap'}"></i>
                    ${cert.type || 'جامعة'}
                  </span>
                </div>
                <div class="timeline-date">
                  <i class="fas fa-calendar-alt"></i>
                  ${cert.startDate} ${cert.endDate ? '- ' + cert.endDate : ''}
                </div>
              </div>
            </div>
            ${cert.description ? `<div class="timeline-description">${cert.description}</div>` : ''}
          </div>
        `;
        
        container.appendChild(item);
        
        setTimeout(() => {
          item.classList.add('show');
        }, index * 200);
      });
      
    } else {
      // Grid Design for Certificates
      container.className = 'certificates-grid';
      
      certs.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'cert-card-new';
        
        card.innerHTML = `
          <div class="cert-image-container">
            ${cert.image ? `<img src="${cert.image}" alt="${cert.title}" class="cert-image">` : ''}
            <div class="cert-overlay">
              <span class="cert-type-badge">
                <i class="${cert.typeIcon || 'fas fa-certificate'}"></i>
                ${cert.category || 'شهادة'}
              </span>
            </div>
          </div>
          <div class="cert-content">
            <h3 class="cert-title">${cert.title}</h3>
            <div class="cert-issuer">${cert.issuer}</div>
            <div class="cert-date-badge">
              <i class="fas fa-calendar"></i>
              ${cert.year}
            </div>
            ${cert.description ? `<p class="cert-description">${cert.description}</p>` : ''}
            ${cert.link ? `
              <a href="${cert.link}" target="_blank" class="cert-link">
                <i class="fas fa-external-link-alt"></i>
                عرض الشهادة
              </a>
            ` : ''}
          </div>
        `;
        
        container.appendChild(card);
        
        setTimeout(() => {
          card.classList.add('show');
        }, index * 150);
      });
    }
    
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    
    setTimeout(() => {
      container.classList.remove('fade-in');
    }, 500);
  }, 300);
}

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
}

console.log('✅ Timeline & Mobile Menu loaded!');
