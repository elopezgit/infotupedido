// Inicializar iconos de Lucide
lucide.createIcons();

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     LENIS SMOOTH SCROLL (2027 standard)
     ========================================================================== */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sincronizar Lenis con GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* ==========================================================================
     PRELOADER & HERO REVEAL TIMELINE
     ========================================================================== */
  const tl = gsap.timeline();
  
  // Animar barra de progreso
  tl.to('.progress-bar', { width: '100%', duration: 1.5, ease: 'power3.inOut' })
    // Desaparecer splash
    .to('.splash-screen', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
    .call(() => {
      document.body.classList.remove('loading-state');
    })
    // Entrar Navbar
    .fromTo('.navbar', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
    // Revelar elementos del hero secuencialmente
    .fromTo('.reveal-item', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 
      '-=0.8'
    )
    // Animar las palabras del título principal desde abajo
    .from('.hero-title .line-inner', {
      y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: 'power4.out'
    }, '-=1.2')
    // Revelar Mockup Visual flotante
    .fromTo('.mockup-frame', 
      { opacity: 0, scale: 0.8, rotationY: -30 }, 
      { opacity: 1, scale: 1, rotationY: -15, duration: 1.2, ease: 'elastic.out(1, 0.7)' }, 
      '-=1'
    )
    .fromTo('.float-card',
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
      '-=0.8'
    );

  /* ==========================================================================
     NAVBAR LOGIC (Dynamic Island effect)
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mLinks = document.querySelectorAll('.m-link');
  
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
      menuBtn.innerHTML = '<i data-lucide="x"></i>';
      lenis.stop();
    } else {
      menuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lenis.start();
    }
    lucide.createIcons();
  });

  mLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuBtn.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
      lenis.start();
    });
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        lenis.scrollTo(target, { offset: -100 });
      }
    });
  });

  /* ==========================================================================
     MAGNETIC BUTTONS (Micro-interacciones 2027)
     ========================================================================== */
  const magnetics = document.querySelectorAll('.magnetic');
  
  magnetics.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      // Si tiene contenido adentro (span, i), animarlo un poco más para parallax
      const children = el.querySelectorAll('span, i');
      if (children.length > 0) {
        gsap.to(children, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      
      const children = el.querySelectorAll('span, i');
      if (children.length > 0) {
        gsap.to(children, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      }
    });
  });

  /* ==========================================================================
     SCROLL TRIGGERS (Apariciones y Parallax)
     ========================================================================== */
  // Reveal elements on scroll
  const reveals = document.querySelectorAll('.gs-reveal');
  reveals.forEach((el) => {
    gsap.fromTo(el, 
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Animación del Hero abstract mockup on scroll
  gsap.to('.mockup-frame', {
    rotationY: 0,
    rotationX: 0,
    y: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Float cards parallax effect on scroll
  gsap.to('.gs-float-1', {
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.gs-float-2', {
    y: -120, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  /* ==========================================================================
     SCROLL PINNING (Cómo funciona / Demo)
     ========================================================================== */
  // El lado izquierdo queda fijo, mientras los pasos suben por la derecha y se iluminan
  const steps = gsap.utils.toArray('.gs-step');
  
  if (window.innerWidth > 900 && steps.length > 0) {
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 40%',
        toggleClass: 'active-step',
        // Opcional: pin behavior for the whole section handled natively via sticky CSS
      });
    });
  } else {
    // Mobile behavior
    steps.forEach((step) => {
      gsap.fromTo(step, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: step, start: 'top 80%' } }
      );
    });
  }

});