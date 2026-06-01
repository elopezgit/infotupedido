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
     CINEMATIC SPLASH / PRELOADER (ESTILO NETFLIX ENTRADA)
     ========================================================================== */
  const tl = gsap.timeline();
  
  tl
    // 1. Frase 1: "Tu Marca."
    .fromTo('.phrase-1', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
    )
    .to('.phrase-1', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })
    
    // 2. Frase 2: "Tus Pedidos."
    .fromTo('.phrase-2', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
    )
    .to('.phrase-2', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })
    
    // 3. Frase 3: "Sin Comisiones."
    .fromTo('.phrase-3', 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
    )
    .to('.phrase-3', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })
    
    // 4. Logo Intro (Entrada con Aura Glowing y Rebote)
    .fromTo('.splash-brand-intro', 
      { opacity: 0, scale: 0.4 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
    )
    .fromTo('.logo-glow-aura', 
      { opacity: 0, scale: 0.5 }, 
      { opacity: 1, scale: 1.3, duration: 1.0, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.splash-brand-title', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.8'
    )
    
    // Pequeña pausa dramática antes de la explosión/zoom Netflix
    .to({}, { duration: 0.4 })
    
    // 5. Animación de Zoom Netflix (El logotipo se expande de forma masiva e inmersiva)
    .to('.splash-logo-netflix', { 
      scale: 18, 
      filter: 'blur(15px)', 
      opacity: 0, 
      duration: 1.4, 
      ease: 'power4.in' 
    })
    .to('.splash-brand-title', { 
      scale: 1.8, 
      opacity: 0, 
      duration: 0.9, 
      ease: 'power4.in' 
    }, '-=1.4')
    .to('.logo-glow-aura', { 
      scale: 6, 
      opacity: 1, 
      filter: 'blur(90px)', 
      duration: 1.2, 
      ease: 'power4.in' 
    }, '-=1.4')
    
    // Slide up y desbloqueo del sitio
    .to('.splash-screen', { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, '-=0.5')
    .call(() => {
      document.body.classList.remove('loading-state');
    })
    
    // 6. Revelar elementos del Landing Page (Navbar y Hero)
    .fromTo('.navbar', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
    .fromTo('.reveal-item', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, 
      '-=0.8'
    )
    .from('.hero-title .line-inner', {
      y: 100, opacity: 0, duration: 1, stagger: 0.1, ease: 'power4.out'
    }, '-=1.2')
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

  /* ==========================================================================
     COMMISSION CALCULATOR LOGIC
     ========================================================================== */
  const salesRange = document.getElementById('sales-range');
  const salesValueDisplay = document.getElementById('sales-value-display');
  const commissionLossText = document.getElementById('comission-loss');
  const cleanSavingsText = document.getElementById('clean-savings');
  
  if (salesRange) {
    const updateCalculator = () => {
      const sales = parseInt(salesRange.value);
      
      // Formatear y actualizar display de ventas
      salesValueDisplay.innerText = sales.toLocaleString('es-ES');
      
      // Comisión de plataformas (20%)
      const commissionLoss = Math.round(sales * 0.20);
      commissionLossText.innerText = '$' + commissionLoss.toLocaleString('es-ES');
      
      // Ahorro estimado (Comisión - $10 USD a tipo de cambio estimado ~1000)
      const usdExchange = 1000;
      const fixedMonthlyCost = 10 * usdExchange;
      const savings = Math.max(0, commissionLoss - fixedMonthlyCost);
      cleanSavingsText.innerText = '$' + savings.toLocaleString('es-ES');
    };
    
    salesRange.addEventListener('input', updateCalculator);
    // Ejecutar inicialización
    updateCalculator();
  }

});