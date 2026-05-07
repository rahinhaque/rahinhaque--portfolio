'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Configure GSAP for optimal performance
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Use native smooth scrolling for better performance
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

    // Add subtle hover effects to primary buttons only (not all elements)
    const primaryButtons = document.querySelectorAll('.hero-cta-primary, .submit-btn, .cta-email-btn');
    primaryButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.03,
          duration: 0.2,
          ease: 'power2.out',
          force3D: true
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
          force3D: true
        });
      });
    });

    // Optimize scroll performance
    let scrolling = false;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(() => {
          scrolling = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative" style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
