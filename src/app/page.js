'use client';

import { useEffect, useRef, useState } from "react";
import anime from 'animejs';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import Loader from "@/components/Loader";

export default function Home() {
  const mainRef = useRef(null);
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    // Smooth scroll for anchor links using anime.js
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - 80;
          anime({
            targets: [document.documentElement, document.body],
            scrollTop: targetY,
            duration: 1200,
            easing: 'easeInOutCubic'
          });
        }
      });
    });

    // Enhanced micro-interactions for all interactive elements using anime.js
    const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-card, .tool-item');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        anime({
          targets: element,
          scale: 1.02,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      
      element.addEventListener('mouseleave', () => {
        anime({
          targets: element,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    // Parallax background elements using anime.js
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        anime({
          targets: element,
          translateY: yPos,
          duration: 0,
          easing: 'linear'
        });
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });

    // Staggered section reveals using anime.js
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const elements = section.querySelectorAll('.reveal, .skill-card, .project-card, .tool-item, .info-card');
      
      if (elements.length > 0) {
        anime({
          targets: elements,
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [0.95, 1],
          duration: 800,
          delay: anime.stagger(100),
          easing: 'easeOutCubic',
          autoplay: false
        });

        // Use Intersection Observer to trigger animations
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              anime({
                targets: elements,
                opacity: [0, 1],
                translateY: [60, 0],
                scale: [0.95, 1],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutCubic'
              });
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });

        observer.observe(section);
      }
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', updateParallax);
    };
  }, [loaderComplete]);

  const handleLoaderComplete = () => {
    setLoaderComplete(true);
  };

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      
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
      
      <main ref={mainRef} className="relative" style={{ overflowX: 'hidden', display: loaderComplete ? 'block' : 'none' }}>
        <ThreeBackground />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
