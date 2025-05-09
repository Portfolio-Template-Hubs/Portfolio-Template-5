// Enhanced Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Typed.js
  const typedElement = document.querySelector('.typed-text');
  if (typedElement) {
    new Typed(typedElement, {
      strings: [
        'Web Developer',
        'UI/UX Designer',
        'Frontend Engineer',
        'Creative Coder'
      ],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Animate nav on scroll with enhanced styling
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button visibility
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
  }

  // Enhanced project cards hover effect
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      // Apply 3D transform and gradient effect
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--bg) 0%, var(--bg-card) 80%)`;
      
      // Move highlight effect with cursor
      const highlight = card.querySelector('.project-content');
      if (highlight) {
        highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, transparent 80%)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.background = '';
      const highlight = card.querySelector('.project-content');
      if (highlight) {
        highlight.style.background = '';
      }
    });
  });

  // Animate sections on scroll with enhanced effects
  const animatedSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15, rootMargin: '-50px' });
  
  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // Animate skill bars when in view
  const skillsSection = document.querySelector('.skills-section');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillsSection && skillBars.length) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach(bar => {
          bar.style.width = bar.style.width || '0%';
          bar.classList.add('animate-skill');
        });
      }
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
  }

  // Enhanced contact form animations
  const form = document.querySelector('.contact-form');
  if(form) {
    // Focus effects for form inputs
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
      
      // Check for pre-filled inputs
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });
    
    // Form submission animation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Add success animation
      form.classList.add('form-success');
      
      // Reset form after animation
      setTimeout(() => {
        form.reset();
        form.classList.remove('form-success');
        formInputs.forEach(input => {
          input.parentElement.classList.remove('focused');
        });
      }, 2000);
      
      // Show success message
      const button = form.querySelector('button');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    });
  }
});