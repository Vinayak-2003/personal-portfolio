// DOM Elements
const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const themeToggle = document.querySelector('.theme-toggle');
const navItems = document.querySelectorAll('.nav-item');
const currentYearSpan = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');
const codeBlock = document.querySelector('.code-block pre code');
const viewResumeBtn = document.getElementById('view-resume');
const resumeModal = document.getElementById('resume-modal');
const closeModalBtn = document.querySelector('.close-modal');

// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Ensure the code block is properly displayed
if (codeBlock) {
  // Fix any potential display issues with the code block
  codeBlock.innerHTML = codeBlock.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

// Mobile Menu Toggle
if (menuButton) {
  menuButton.addEventListener('click', () => {
    const icon = menuButton.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
    mobileMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
if (mobileMenu) {
  mobileMenu.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuButton.querySelector('i').classList.add('fa-bars');
      menuButton.querySelector('i').classList.remove('fa-times');
    });
  });
}

// Theme Toggle
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) {
      themeToggle.querySelector('i').classList.remove('fa-moon');
      themeToggle.querySelector('i').classList.add('fa-sun');
    }
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    if (themeToggle) {
      themeToggle.querySelector('i').classList.remove('fa-sun');
      themeToggle.querySelector('i').classList.add('fa-moon');
    }
  }
}

// Check for saved theme preference or use OS preference
const savedTheme = localStorage.getItem('theme');
const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (osPrefersDark) {
  setTheme('dark');
}

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
}


// Resume Modal Functions
if (viewResumeBtn && resumeModal && closeModalBtn) {
  // Open modal when view resume button is clicked
  viewResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
  
  // Close modal when the close button is clicked
  closeModalBtn.addEventListener('click', () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });
  
  // Close modal when clicking outside of the modal content
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}


// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
  } else {
    navbar.style.padding = '1.5rem 0';
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  }
  
  // Update active nav item on scroll
  updateActiveNavItem();
});

// Update active nav item based on scroll position
function updateActiveNavItem() {
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the data to a server
    // For this demo, we'll just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial nav active state
  updateActiveNavItem();
  
  // Add scroll animations
  const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('.hero-content, .about-content, .projects-grid, .contact-form-container');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  };
  
  animateOnScroll();
});
