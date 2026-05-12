'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const photoRef = useRef(null);
  const tagRef = useRef(null);
  const nameRef = useRef(null);
  const statsRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* ── Three.js Simple Scene ───────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Wait for container to have dimensions
    const initThree = () => {
      const width = container.offsetWidth || container.clientWidth;
      const height = container.offsetHeight || container.clientHeight;
      
      if (width === 0 || height === 0) {
        // Retry after a short delay if container has no dimensions yet
        setTimeout(initThree, 100);
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      camera.position.z = 30;

      // Simple particle system
      const particleCount = 150;
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 60;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 60;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 60;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.7,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Mouse interaction
      const onMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };

      const onResize = () => {
        const w = container.offsetWidth || container.clientWidth;
        const h = container.offsetHeight || container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);

      // Animation loop
      let animId;
      const tick = () => {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;

        const time = Date.now() * 0.0001;
        particles.position.y = Math.sin(time) * 2;

        renderer.render(scene, camera);
        animId = requestAnimationFrame(tick);
      };
      tick();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
      };
    };

    // Start initialization and store cleanup
    let cleanupFn;
    const initAndStore = () => {
      cleanupFn = initThree();
    };
    initAndStore();

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  /* ── GSAP Entrance animations ─────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline();

    // Tag entrance with bounce
    if (tagRef.current) {
      gsap.set(tagRef.current, { y: 50, scale: 0.8 });
      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.8)'
      });
    }

    // Name with dramatic entrance
    if (nameRef.current) {
      gsap.set(nameRef.current, { y: 80, scale: 0.9 });
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.3');
    }

    // Headline characters with typewriter effect
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      if (chars.length > 0) {
        gsap.set(chars, { opacity: 0 });
        tl.to(chars, {
          opacity: 1,
          duration: 0.08,
          stagger: 0.08,
          ease: 'power1.out'
        }, '-=0.3');
      }
    }

    // Subtitle with slide and fade
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 40, x: -30 });
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.4');
    }

    // CTA buttons with elastic effect
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('a, button');
      if (buttons.length > 0) {
        gsap.set(buttons, { y: 30, scale: 0.8 });
        tl.to(buttons, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)'
        }, '-=0.3');
      }
    }

    // Stats with fade animation
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      if (statItems.length > 0) {
        gsap.set(statItems, { y: 40, scale: 0.9 });
        tl.to(statItems, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.3');
      }
    }

    // Photo with scale entrance
    if (photoRef.current) {
      gsap.set(photoRef.current, { scale: 0.7 });
      tl.to(photoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=0.5');

      // Continuous floating on photo (start after entrance)
      gsap.to(photoRef.current, {
        y: -10,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5
      });
    }

    // Scroll-based parallax for hero elements
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const progress = Math.min(scrollY / 500, 1);
      gsap.set('[data-parallax="hero-bg"]', { y: progress * 100 });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Play the timeline with a small delay to ensure elements are ready
    setTimeout(() => {
      tl.play();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(tagRef.current);
      gsap.killTweensOf(nameRef.current);
      gsap.killTweensOf(photoRef.current);
    };
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const headline = 'MERN Stack Developer.';
  const chars = headline.split('');
  const [showCursor, setShowCursor] = useState(true);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect with loop
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (visibleChars < chars.length) {
          setVisibleChars(prev => prev + 1);
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (visibleChars > 0) {
          setVisibleChars(prev => prev - 1);
        } else {
          // Start typing again
          setIsDeleting(false);
        }
      }
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timer);
  }, [visibleChars, isDeleting, chars.length]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
      }}
    >
      <style>{`
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(10px);opacity:0.3} }
        @keyframes pulseGreen { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,0.4)} 50%{opacity:.6;box-shadow:0 0 0 8px rgba(16,185,129,0)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .hero-cta-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
          background-size: 200% 200%;
          color: #000;
          font-weight: 800;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          animation: gradientShift 3s ease infinite;
          transition: all 0.3s ease;
          white-space: nowrap;
          text-decoration: none;
          box-shadow: 0 0 30px rgba(0,240,255,0.3), 0 0 60px rgba(168,85,247,0.1);
        }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple), var(--accent-cyan));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hero-cta-primary:hover::before { opacity: 1; }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(168,85,247,0.2);
        }
        .hero-cta-primary span { position: relative; z-index: 1; }
        
        /* Mobile adjustments for CTA buttons */
        @media (max-width: 767px) {
          .hero-cta-primary {
            padding: 12px 20px !important;
            font-size: 14px !important;
            min-height: 44px !important;
          }
          .hero-cta-secondary {
            padding: 12px 20px !important;
            font-size: 14px !important;
            min-height: 44px !important;
            gap: 8px !important;
          }
        }

        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 50px;
          border: 1px solid var(--border-accent);
          background: rgba(0,240,255,0.05);
          color: var(--accent-cyan);
          font-weight: 600;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          backdrop-filter: blur(10px);
        }
        .hero-cta-secondary:hover {
          background: rgba(0,240,255,0.12);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 30px rgba(0,240,255,0.2);
          transform: translateY(-2px);
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent, var(--border-subtle), transparent);
          border-radius: 1px;
        }
      `}</style>

      {/* Three.js canvas */}
      <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '80px',
            paddingTop: '140px',
            paddingBottom: '100px',
            flexWrap: 'wrap',
          }}
        >
          {/* ── LEFT: Text content ──────────────────────── */}
          <div style={{ flex: '1 1 500px', minWidth: 0 }}>
            {/* Available tag */}
            <div
              ref={tagRef}
              style={{
                opacity: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                background: 'rgba(0,240,255,0.06)',
                border: '1px solid rgba(0,240,255,0.15)',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '32px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  animation: 'pulseGreen 2s infinite',
                  flexShrink: 0,
                }}
              />
              Available for work
            </div>

            {/* "Hi, I'm" label */}
            <p
              style={{
                textAlign: 'left',
                margin: '0 0 12px 0',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--accent-cyan)',
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              Hi, I'm
            </p>

            {/* Name */}
            <h1
              ref={nameRef}
              style={{
                opacity: 0,
                fontSize: 'clamp(36px, 12vw, 72px)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-3px',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Rahin
              <br />
              Haque
            </h1>

            {/* Animated role headline with typewriter effect */}
            <div
              ref={headlineRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                marginBottom: '28px',
                fontSize: 'clamp(18px, 5vw, 32px)',
                fontWeight: 800,
              }}
            >
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="char"
                  style={{
                    opacity: i < visibleChars ? 1 : 0,
                    color: char === ' ' ? 'transparent' : '#f8fafc',
                    background: char !== ' ' ? 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 50%, var(--accent-pink) 100%)' : 'none',
                    WebkitBackgroundClip: char !== ' ' ? 'text' : 'unset',
                    WebkitTextFillColor: char !== ' ' ? 'transparent' : '#f8fafc',
                    backgroundClip: char !== ' ' ? 'text' : 'unset',
                    transition: 'opacity 0.05s ease',
                  }}
                >
                  {char}
                </span>
              ))}
              <span
                style={{
                  opacity: showCursor ? 1 : 0,
                  color: 'var(--accent-cyan)',
                  marginLeft: '4px',
                  transition: 'opacity 0.1s ease',
                }}
              >
                |
              </span>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                opacity: 0,
                textAlign: 'left',
                margin: '0 0 48px 0',
                fontSize: 'clamp(14px, 4vw, 17px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '540px',
              }}
            >
              I'm a Mern stack Developer building clean, functional
              web interfaces &mdash; at the intersection of{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>technology</span>,{' '}
              <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>logic</span>, and{' '}
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>user experience</span>.
            </p>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '64px',
              }}
            >
              <button
                className="hero-cta-primary"
                onClick={() => scrollTo('projects')}
                style={{ opacity: 0 }}
              >
                <span>View Projects</span>
                <span style={{ position: 'relative', zIndex: 1 }}>
                  <ArrowIcon />
                </span>
              </button>
              <a
                href="https://github.com/rahinhaque"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary"
                style={{ opacity: 0 }}
              >
                GitHub Profile
                <GitHubMiniIcon />
              </a>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
            >
              {[
                { value: '5+', label: 'Projects Built' },
                { value: '2+', label: 'Years Learning' },
                { value: '100%', label: 'Passion Driven' },
              ].map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <div className="stat-item" style={{ opacity: 0 }}>
                    <div
                      style={{
                        fontSize: 'clamp(24px, 3vw, 34px)',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1.1,
                        marginBottom: '6px',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="stat-divider stat-item" style={{ opacity: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Photo ────────────────────────────── */}
          <div
            ref={photoRef}
            style={{
              opacity: 0,
              position: 'relative',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Spinning gradient ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink), var(--accent-cyan))',
                animation: 'spinRing 6s linear infinite',
                zIndex: 0,
              }}
            />

            {/* Inner separator ring */}
            <div
              style={{
                position: 'absolute',
                inset: '1px',
                borderRadius: '50%',
                background: 'var(--bg-deep)',
                zIndex: 1,
              }}
            />

            {/* Photo */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: 'clamp(280px, 32vw, 440px)',
                height: 'clamp(280px, 32vw, 440px)',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border-subtle)',
              }}
            >
              <Image
                src="/rahinhaque.jpg"
                alt="Rahin Haque — MERN Stack Developer"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                priority
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, transparent 40%, rgba(168,85,247,0.1) 70%, rgba(236,72,153,0.08) 100%)',
                }}
              />
            </div>

            {/* Floating: Tech Stack badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '-24px',
                zIndex: 10,
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(0,240,255,0.2)',
                borderRadius: '20px',
                backdropFilter: 'blur(20px)',
                animation: 'floatBadge 3s ease-in-out infinite',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Tech Stack
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '22px' }}>
                {['⚛️', '🟢', '🍃'].map((icon, i) => (
                  <span key={i}>{icon}</span>
                ))}
              </div>
            </div>

            {/* Floating: Code badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '-40px',
                zIndex: 10,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(168,85,247,0.2)',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
                animation: 'floatBadge 4s ease-in-out infinite 1s',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: 'var(--accent-purple)',
                  lineHeight: 1.6,
                }}
              >
                const dev =
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: 'var(--accent-cyan)',
                  lineHeight: 1.6,
                }}
              >
                &ldquo;Rahin&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '48px',
          }}
        >
          <button
            onClick={() => scrollTo('about')}
            aria-label="Scroll to about section"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'color 0.3s ease',
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: '24px',
                height: '40px',
                borderRadius: '12px',
                border: '2px solid currentColor',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '8px',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '8px',
                  borderRadius: '2px',
                  background: 'currentColor',
                  animation: 'scrollBounce 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function GitHubMiniIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}