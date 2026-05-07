import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Optimize GSAP performance
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// Smooth scroll behavior with performance optimization
export const initSmoothScroll = () => {
  // Use native smooth scroll for better performance
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Hero section entrance animation - optimized
export const animateHeroEntrance = (refs) => {
  const tl = gsap.timeline({ 
    defaults: { 
      ease: 'power2.out',
      force3D: true
    } 
  });
  
  tl.fromTo(refs.tagRef.current, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
  )
  .fromTo(refs.nameRef.current,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8 },
    '-=0.3'
  )
  .fromTo(refs.headlineRef.current?.querySelectorAll('.word'),
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.5, 
      stagger: 0.06 
    },
    '-=0.5'
  )
  .fromTo(refs.subtitleRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.2'
  )
  .fromTo(refs.ctaRef.current?.querySelectorAll('a, button'),
    { opacity: 0, y: 15 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.5, 
      stagger: 0.08 
    },
    '-=0.3'
  )
  .fromTo(refs.statsRef.current?.querySelectorAll('.stat-item'),
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.5, 
      stagger: 0.06 
    },
    '-=0.2'
  )
  .fromTo(refs.photoRef.current,
    { opacity: 0, scale: 0.9, rotation: -3 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1 },
    '-=0.6'
  );
  
  return tl;
};

// Section reveal animation with ScrollTrigger - optimized
export const createSectionReveal = (sectionRef, options = {}) => {
  const {
    stagger = 0.08,
    yOffset = 30,
    opacityStart = 0,
    opacityEnd = 1,
    scale = 1,
    duration = 0.6,
    threshold = 0.1,
    once = true
  } = options;
  
  if (!sectionRef?.current) return;
  
  const elements = sectionRef.current.querySelectorAll('.reveal');
  
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: `top ${threshold * 100}%`,
    once,
    onEnter: () => {
      gsap.to(elements, {
        opacity: opacityEnd,
        y: 0,
        scale: scale,
        duration,
        stagger,
        ease: 'power2.out',
        force3D: true,
        from: { opacity: opacityStart, y: yOffset }
      });
    }
  });
};

// Card stagger animation - optimized
export const animateCardsStagger = (containerRef, selector = '.card', options = {}) => {
  if (!containerRef?.current) return;
  
  const {
    stagger = 0.08,
    yOffset = 40,
    scale = 0.96,
    duration = 0.6,
    threshold = 0.1
  } = options;
  
  const cards = containerRef.current.querySelectorAll(selector);
  
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: `top ${threshold * 100}%`,
    once: true,
    onEnter: () => {
      gsap.fromTo(cards,
        { opacity: 0, y: yOffset, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease: 'power2.out',
          force3D: true
        }
      );
    }
  });
};

// Skill bar animation - optimized
export const animateSkillBars = (sectionRef) => {
  if (!sectionRef?.current) return;
  
  const bars = sectionRef.current.querySelectorAll('.skill-bar-fill');
  
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      bars.forEach((bar) => {
        const level = bar.dataset.level || 0;
        const delay = parseInt(bar.dataset.delay || "0") / 1000;
        
        gsap.to(bar, {
          width: `${level}%`,
          duration: 1,
          delay,
          ease: 'power2.out',
          force3D: true
        });
      });
    }
  });
};

// Parallax effect for background elements - optimized
export const createParallax = (elementRef, intensity = 0.3) => {
  if (!elementRef?.current) return;
  
  gsap.to(elementRef.current, {
    yPercent: intensity * 100,
    ease: 'none',
    force3D: true,
    scrollTrigger: {
      trigger: elementRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

// Magnetic button effect - optimized
export const createMagneticButton = (buttonRef, intensity = 0.25) => {
  if (!buttonRef?.current) return;
  
  const button = buttonRef.current;
  
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * intensity,
      y: y * intensity,
      duration: 0.2,
      ease: 'power2.out',
      force3D: true
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
      force3D: true
    });
  });
};

// Text scramble effect
export const scrambleText = (element, finalText, duration = 1) => {
  if (!element) return;
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let iterations = 0;
  const maxIterations = 10;
  
  const interval = setInterval(() => {
    element.innerText = finalText
      .split('')
      .map((letter, index) => {
        if (index < iterations / 3) {
          return finalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iterations >= maxIterations * 3) {
      clearInterval(interval);
      element.innerText = finalText;
    }
    
    iterations += 1;
  }, duration * 1000 / maxIterations);
};

// Cursor follower effect
export const initCursorFollower = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 212, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, border-color 0.2s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.15,
      ease: 'power2.out'
    });
  });
  
  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 2,
        borderColor: 'rgba(139, 92, 246, 0.8)',
        duration: 0.2
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(0, 212, 255, 0.5)',
        duration: 0.2
      });
    });
  });
};

// Page transition
export const pageTransition = (callback) => {
  const tl = gsap.timeline();
  
  tl.to('body', {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
  .call(callback)
  .from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
};

// Initialize all animations
export const initAnimations = () => {
  // Smooth scroll
  initSmoothScroll();
  
  // Custom cursor (optional - can be disabled)
  // initCursorFollower();
};