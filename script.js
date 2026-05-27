document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Transparent nav becomes solid on scroll
  const nav = document.querySelector('.main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Parallax effect on the coffee circle
  const coffeeCircle = document.querySelector('.coffee-circle');
  if (coffeeCircle) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      coffeeCircle.style.transform = 'translateY(' + scrolled * 0.15 + 'px) rotate(' + scrolled * 0.02 + 'deg)';
    });
  }

  // Subscription customizer logic
  const freqButtons = document.querySelectorAll('#freq-buttons .btn-custom');
  const amountButtons = document.querySelectorAll('#amount-buttons .btn-custom');
  const priceVal = document.getElementById('price-val');
  const summaryText = document.getElementById('summary-text');
  const btnSub = document.getElementById('btn-subscribe-now');

  if (priceVal && summaryText) {
    let freqVal = 15;
    let freqText = "Semanal";
    let amountVal = 1;
    let amountText = "250g";

    const updatePrice = () => {
      const total = (freqVal * amountVal).toFixed(2);
      priceVal.innerText = total;
      summaryText.innerText = `Envío ${freqText} de ${amountText} de café de especialidad.`;
    };

    freqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        freqButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        freqVal = parseFloat(btn.getAttribute('data-value'));
        freqText = btn.getAttribute('data-text');
        updatePrice();
      });
    });

    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        amountVal = parseFloat(btn.getAttribute('data-value'));
        amountText = btn.getAttribute('data-text');
        updatePrice();
      });
    });

    if (btnSub) {
      btnSub.addEventListener('click', () => {
        alert(`¡Suscripción personalizada registrada! Recibirás envíos con frecuencia ${freqText} de ${amountText} de nuestro mejor grano.`);
      });
    }
  }
});

// ===== BLYP PREMIUM ENHANCEMENTS =====
window.addEventListener('load', function() {
  const loader = document.querySelector('.preloader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 600);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Intersection Observer for Scroll Reveal
  const revealItems = document.querySelectorAll('.reveal-item, .origin-card, .service-card, .testimonial-card, .photo-card, .product-card, .member-card, .case-card, .team-card, .timeline-step, .benefit-card, .recipe-card, .pricing-card, .class-card, .room-card, .contact-grid');
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealItems.forEach(item => {
    item.classList.add('reveal-item');
    revealObserver.observe(item);
  });

  // Contact Form Ajax Simulation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Clone and replace form to remove any inline alert listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = newForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
      }
      
      setTimeout(() => {
        const formWrap = newForm.closest('.contact-form-wrap') || newForm.parentElement;
        if (formWrap) {
          formWrap.innerHTML = `
            <div class="contact-form-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <h2 style="margin-top: 1rem; color: var(--primary); font-family: inherit;">¡Solicitud Enviada con Éxito!</h2>
              <p style="margin-top: 0.5rem; color: var(--text); opacity: 0.8; font-size: 0.95rem;">Gracias por contactarnos. Te responderemos a la brevedad en las próximas 24 horas.</p>
            </div>
          `;
        }
      }, 1500);
    });
  });
});
