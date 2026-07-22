/* ============================================================
   TUPEDIDO! — LIQUID PREMIUM MOTION CHOREOGRAPHY v2
   GSAP + Lenis + ScrollTrigger
   Diseñado para experiencia Awwwards-tier
   ============================================================ */

lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================================
     LENIS SMOOTH SCROLL
     ============================================================= */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* =============================================================
     DETECTAR TOUCH / REDUCED MOTION
     ============================================================= */
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =============================================================
     SPLASH MESH — DRIFT ANIMACIÓN (reemplaza cursor)
     ============================================================= */
  const splashMesh = document.querySelector('.splash-mesh');
  if (splashMesh && !prefersReducedMotion) {
    gsap.to(splashMesh, {
      scale: 1.15,
      rotation: 4,
      duration: 12,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
    // Micro-drift con el mouse solo en desktop
    if (!isTouchDevice) {
      document.addEventListener('mousemove', (e) => {
        const xFactor = (e.clientX / window.innerWidth - 0.5) * 8;
        const yFactor = (e.clientY / window.innerHeight - 0.5) * 8;
        gsap.to(splashMesh, {
          x: xFactor,
          y: yFactor,
          duration: 2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    }
  }

  /* =============================================================
     PARTICLES CANVAS REMOVED FOR CLEAN WHITE BACKGROUND
     ============================================================= */

  /* =============================================================
     SPLASH CINEMÁTICO
     ============================================================= */
  if (!prefersReducedMotion) {
    const tl = gsap.timeline();

    tl
      // Mesh glow build-up
      .fromTo('.splash-mesh',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
      .fromTo('.phrase-1',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
      )
      .to('.phrase-1', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })

      .fromTo('.phrase-2',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
      )
      .to('.phrase-2', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })

      .fromTo('.phrase-3',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 1.0, ease: 'power3.out' }
      )
      .to('.phrase-3', { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power3.in', delay: 0.2 })

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
      .to({}, { duration: 0.4 })
      .to('.splash-logo', {
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
      .to('.splash-screen', { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, '-=0.5')
      .call(() => {
        document.body.classList.remove('loading-state');
      })
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
        { opacity: 1, scale: 1, rotationY: -12, duration: 1.2, ease: 'elastic.out(1, 0.7)' },
        '-=1'
      )
      .fromTo('.float-card',
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
        '-=0.8'
      )
      .fromTo('.mockup-product-card',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      )
      .call(() => {
        // Continuous organic floating physics for phone & badges
        gsap.to('.gs-float-1', { y: -15, rotation: 3, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.gs-float-2', { y: -18, rotation: -4, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
        gsap.to('.gs-float-3', { y: -12, rotation: 2, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.0 });
        gsap.to('.mockup-frame', { y: -8, duration: 4.0, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });
  } else {
    // No motion: skip splash, show content immediately
    document.querySelector('.splash-screen').style.display = 'none';
    document.body.classList.remove('loading-state');
    document.querySelector('.navbar').style.opacity = '1';
    document.querySelector('.navbar').style.transform = 'none';
    document.querySelectorAll('.reveal-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.line-inner').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* =============================================================
     NAVBAR SCROLL BEHAVIOR
     ============================================================= */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* =============================================================
     MOBILE MENU — HAMBURGER MORPH
     ============================================================= */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mLinks = document.querySelectorAll('.m-link');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
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
      menuBtn.setAttribute('aria-expanded', 'false');
      lucide.createIcons();
      lenis.start();
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

  /* =============================================================
     DARK MODE TOGGLE
     ============================================================= */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  // Check system preference
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Default to bright clean white/light theme as requested
  const savedTheme = localStorage.getItem('tupedido-theme');
  const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', initialTheme);
  themeIcon.setAttribute('data-lucide', initialTheme === 'dark' ? 'sun' : 'moon');
  lucide.createIcons();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tupedido-theme', next);
    themeIcon.setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();

    // Refresh ScrollTrigger after theme change
    ScrollTrigger.refresh();
  });

  // Listen to system preference changes
  systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('tupedido-theme')) {
      const next = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      themeIcon.setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
      lucide.createIcons();
    }
  });

  /* =============================================================
     SCROLL TRIGGER REVEALS
     ============================================================= */
  if (!prefersReducedMotion) {
    const reveals = document.querySelectorAll('.gs-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
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
  }

  /* =============================================================
     STICKY STACK — CÓMO FUNCIONA
     ============================================================= */
  if (!prefersReducedMotion && !isTouchDevice) {
    const steps = gsap.utils.toArray('.step-card-sticky');
    const progressFill = document.getElementById('stackProgressFill');

    if (steps.length > 1) {
      steps.forEach((step, i) => {
        if (i === steps.length - 1) return;

        ScrollTrigger.create({
          trigger: step,
          start: 'top top',
          endTrigger: steps[steps.length - 1],
          end: 'top top',
          pin: true,
          pinSpacing: false,
          id: `step-pin-${i}`
        });

        gsap.to(step, {
          scale: 0.92,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: steps[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            id: `step-scale-${i}`
          }
        });
      });

      // Progress bar
      ScrollTrigger.create({
        trigger: '.steps-container',
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          if (progressFill) {
            progressFill.style.height = `${self.progress * 100}%`;
          }
        }
      });
    }
  }

  /* =============================================================
     DEMO FLOW STEP ACTIVATION
     ============================================================= */
  const demoSteps = document.querySelectorAll('.gs-demo-step');
  if (demoSteps.length > 0) {
    demoSteps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleClass: { targets: step, className: 'active' },
      });
    });

    // Phone float
    if (!prefersReducedMotion) {
      gsap.to('.phone-mockup-wrapper', {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.demo-flow-section',
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        }
      });
    }
  }

  /* =============================================================
     HERO PARALLAX
     ============================================================= */
  if (!prefersReducedMotion) {
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

    gsap.to('.gs-float-1', {
      y: -60, ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.gs-float-2', {
      y: -100, ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  /* =============================================================
     3D TILT ON CARDS
     ============================================================= */
  const tiltCards = document.querySelectorAll('.tilt-card, .tilt-card-light');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const isLight = card.classList.contains('tilt-card-light');
      const factor = isLight ? 4 : 8;

      gsap.to(card, {
        rotateX: ((y - centerY) / centerY) * -factor,
        rotateY: ((x - centerX) / centerX) * factor,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });

      const shine = `radial-gradient(circle at ${x / rect.width * 100}% ${y / rect.height * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      card.style.setProperty('--shine', shine);
    });

    card.addEventListener('mouseleave', () => {
      if (isTouchDevice || prefersReducedMotion) return;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
      card.style.setProperty('--shine', 'none');
    });
  });

  // Add shine CSS via JS
  const tiltStyle = document.createElement('style');
  tiltStyle.textContent = `
    .tilt-card, .tilt-card-light {
      background-image: var(--shine, none) !important;
      transition: background-image 0.3s ease;
    }
  `;
  document.head.appendChild(tiltStyle);

  /* =============================================================
     MAGNETIC BUTTONS
     ============================================================= */
  if (!prefersReducedMotion) {
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        if (isTouchDevice) return;
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: 'power3.out'
        });
        const children = el.querySelectorAll('span, i, .btn-icon-wrap');
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
        const children = el.querySelectorAll('span, i, .btn-icon-wrap');
        if (children.length > 0) {
          gsap.to(children, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        }
      });
    });
  }

  /* =============================================================
     COUNTER ANIMATION
     ============================================================= */
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const duration = 2;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = (currentTime - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(updateCounter);
      }
    });
  });

  /* =============================================================
     STEP CONNECTOR ANIMATION (legacy)
     ============================================================= */
  if (!prefersReducedMotion) {
    const stepConnectors = document.querySelectorAll('.step-connector');
    stepConnectors.forEach(connector => {
      gsap.fromTo(connector,
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1, scaleY: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: connector,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  /* =============================================================
     MARQUEE PAUSE
     ============================================================= */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* =============================================================
     SCROLL PINNING (legacy support)
     ============================================================= */
  const steps = gsap.utils.toArray('.gs-step');
  if (window.innerWidth > 900 && steps.length > 0) {
    steps.forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 40%',
        toggleClass: 'active-step',
      });
    });
  } else if (steps.length > 0) {
    steps.forEach((step) => {
      gsap.fromTo(step,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: step, start: 'top 80%' } }
      );
    });
  }

  /* =============================================================
     REFRESH SCROLLTRIGGER ON LOAD / RESIZE
     ============================================================= */
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  console.log('🏪 TuPedido! v2 — Liquid Premium activado');
});
