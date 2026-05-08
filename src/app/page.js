'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Configure GSAP for optimal performance
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Advanced animation utilities
const createSmoothScroll = () => {
  const html = document.documentElement;
  const body = document.body;
  
  let scrollY = 0;
  let currentScroll = 0;
  let targetScroll = 0;
  let ease = 0.1;
  
  const lerp = (start, end, t) => start * (1 - t) + end * t;
  
  const updateScroll = () => {
    targetScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(targetScroll - currentScroll) > 0.1) {
      currentScroll = lerp(currentScroll, targetScroll, ease);
      html.style.setProperty('--scroll-y', currentScroll + 'px');
    }
    
    requestAnimationFrame(updateScroll);
  };
  
  updateScroll();
};

const createPageTransition = () => {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  `;
  
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div style="width: 60px; height: 60px; border: 3px solid rgba(0,212,255,0.2); border-top: 3px solid #00d4ff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
  `;
  
  overlay.appendChild(loader);
  document.body.appendChild(overlay);
  
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out',
    onComplete: () => {
      overlay.remove();
    }
  });
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Initialize advanced animation system
    createPageTransition();
    createSmoothScroll();
    
    // Advanced smooth scrolling with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: target,
              offsetY: 80,
              autoKill: false
            },
            ease: 'power3.inOut'
          });
        }
      });
    });

    // Enhanced micro-interactions for all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-card, .tool-item');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true
        });
      });
    });

    // Parallax background elements
    const createParallax = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      const updateParallax = () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const speed = element.dataset.parallax || 0.5;
          const yPos = -(scrollY * speed);
          gsap.to(element, {
            y: yPos,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      };
      
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: updateParallax
      });
    };

    // Staggered section reveals
    const createSectionReveals = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        const elements = section.querySelectorAll('.reveal, .skill-card, .project-card, .tool-item, .info-card');
        
        gsap.fromTo(elements, {
          opacity: 0,
          y: 60,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    };

    // Initialize advanced animations
    setTimeout(() => {
      createParallax();
      createSectionReveals();
    }, 1000);

    // Performance optimizations
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Global styles for advanced animations */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
          --scroll-y: 0px;
        }
        
        body {
          overflow-x: hidden;
          background: #0a0a0a;
          color: #f0f0f5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #00b8e6, #7c3aed);
        }

        /* Responsive Design Optimizations */
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
          
          body {
            padding-top: 60px;
          }
          
          .section-padding {
            padding: 60px 20px;
          }
          
          .container {
            padding: 0 20px;
          }
          
          /* Reduce animation intensity on mobile */
          .reveal {
            animation-duration: 0.5s !important;
          }
        }

        @media (max-width: 480px) {
          html {
            font-size: 13px;
          }
          
          .section-padding {
            padding: 40px 16px;
          }
          
          .container {
            padding: 0 16px;
          }
          
          /* Further reduce animations on small screens */
          .reveal {
            animation-duration: 0.3s !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          button, a, .project-card, .skill-card {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .gradient-text {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Selection styles */
        ::selection {
          background: rgba(0, 212, 255, 0.3);
          color: #fff;
        }
        
        /* Focus styles */
        :focus-visible {
          outline: 2px solid #00d4ff;
          outline-offset: 2px;
        }
        
        /* Smooth transitions */
        .transition-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Glass morphism utility */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Gradient text utility */
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Loading animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <main ref={mainRef} className="relative" style={{ overflowX: 'hidden' }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
