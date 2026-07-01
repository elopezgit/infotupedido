lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     LENIS SMOOTH SCROLL
     ========================================================================== */
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

  /* ==========================================================================
     CURSOR FOLLOWER (only on desktop with mouse)
     ========================================================================== */
  const cursor = document.getElementById('cursorFollower');
  const cursorDot = cursor.querySelector('.cursor-dot');
  const cursorRing = cursor.querySelector('.cursor-ring');

  let isTouchDevice = false;

  function checkTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchDevice = true;
      cursor.style.display = 'none';
      document.body.style.cursor = 'auto';
    } else {
      cursor.style.display = 'block';
    }
  }
  checkTouch();

  if (!isTouchDevice) {
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
      gsap.set(cursorRing, { x: pos.x, y: pos.y });
    });

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .magnetic, .bento-card, .rubro-card, .price-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
    });
  }

  /* ==========================================================================
     PARTICLES CANVAS
     ========================================================================== */
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = ['#fd8c02', '#fd247b', '#02baee', '#016ded'][Math.floor(Math.random() * 4)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
    }
  }

  const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = 0.06 * (1 - dist / 150);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Stop particles when not visible to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animateParticles();
    }
  });

  /* ==========================================================================
     SPLASH CINEMATICO
     ========================================================================== */
  const tl = gsap.timeline();

  tl
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
      { opacity: 1, scale: 1, rotationY: -15, duration: 1.2, ease: 'elastic.out(1, 0.7)' },
      '-=1'
    )
    .fromTo('.float-card',
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' },
      '-=0.8'
    );

  /* ==========================================================================
     NAVBAR
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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -100 });
      }
    });
  });

  /* ==========================================================================
     MAGNETIC BUTTONS
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
     SCROLL TRIGGERS (Reveals)
     ========================================================================== */
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

  // Hero mockup parallax
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
    y: -80, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.gs-float-2', {
    y: -120, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  /* ==========================================================================
     3D TILT ON CARDS
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.tilt-card, .tilt-card-light');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (isTouchDevice) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      const isLight = card.classList.contains('tilt-card-light');
      const factor = isLight ? 4 : 8;

      gsap.to(card, {
        rotateX: ((y - centerY) / centerY) * -factor,
        rotateY: ((x - centerX) / centerX) * factor,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out'
      });

      // Subtle shine effect
      const shine = `radial-gradient(circle at ${x / rect.width * 100}% ${y / rect.height * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
      card.style.setProperty('--shine', shine);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
      card.style.setProperty('--shine', 'none');
    });
  });

  // Add CSS for shine effect via JS
  const tiltStyle = document.createElement('style');
  tiltStyle.textContent = `
    .tilt-card, .tilt-card-light {
      background-image: var(--shine, none) !important;
      transition: background-image 0.3s ease;
    }
  `;
  document.head.appendChild(tiltStyle);

  /* ==========================================================================
     COUNTER ANIMATION (Numbers section)
     ========================================================================== */
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
          // Ease out cubic
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

  /* ==========================================================================
     STEP CONNECTOR ARROWS ANIMATION
     ========================================================================== */
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

  /* ==========================================================================
     COMMISSION CALCULATOR
     ========================================================================== */
  const salesRange = document.getElementById('sales-range');
  const salesValueDisplay = document.getElementById('sales-value-display');
  const commissionLossText = document.getElementById('comission-loss');
  const cleanSavingsText = document.getElementById('clean-savings');

  if (salesRange) {
    const updateCalculator = () => {
      const sales = parseInt(salesRange.value);
      salesValueDisplay.innerText = sales.toLocaleString('es-ES');

      const commissionLoss = Math.round(sales * 0.20);
      commissionLossText.innerText = '$' + commissionLoss.toLocaleString('es-ES');

      const usdExchange = 1000;
      const fixedMonthlyCost = 10 * usdExchange;
      const savings = Math.max(0, commissionLoss - fixedMonthlyCost);
      cleanSavingsText.innerText = '$' + savings.toLocaleString('es-ES');
    };

    salesRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  /* ==========================================================================
     SCROLL PINNING (Demo section - legacy support)
     ========================================================================== */
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

  /* ==========================================================================
     MARQUEE PAUSE ON HOVER
     ========================================================================== */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ==========================================================================
     REFRESH SCROLLTRIGGER ON LOAD COMPLETE
     ========================================================================== */
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

});