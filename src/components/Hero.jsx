'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { gsap } from 'gsap';

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

  /* ── Three.js Advanced Scene ───────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // ── Particle System (enhanced) ──
    const particleCount = 400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x00f0ff), // cyan
      new THREE.Color(0xa855f7), // purple
      new THREE.Color(0xec4899), // pink
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 150;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 150;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 150;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;

      particleSizes[i] = Math.random() * 1.5 + 0.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ── Floating Geometric Shapes ──
    const shapes = [];
    const shapeGeometries = [
      new THREE.IcosahedronGeometry(3, 0),
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.TetrahedronGeometry(2, 0),
      new THREE.DodecahedronGeometry(2, 0),
    ];

    const shapeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.3 }),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y,
      };

      shapes.push(mesh);
      scene.add(mesh);
    }

    // ── Connecting Lines (dynamic) ──
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ── Mouse interaction ──
    let targetMouseX = 0, targetMouseY = 0;
    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: targetMouseX, y: targetMouseY });
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize handler ──
    const onResize = () => {
      if (!container.offsetWidth) return;
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    let animId;
    const clock = new THREE.Clock();

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();

      // Smooth camera movement
      camera.position.x += (targetMouseX * 8 - camera.position.x) * 0.03;
      camera.position.y += (-targetMouseY * 5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Rotate particles
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Animate shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.position.y = shape.userData.originalY + 
          Math.sin(elapsed * shape.userData.floatSpeed + shape.userData.floatOffset) * 3;
      });

      // Update lines between close particles
      const positions = particleGeometry.attributes.position.array;
      const linePositions = [];
      const maxDist = 25;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDist) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
          }
        }
      }

      lineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      lines.rotation.y = particles.rotation.y;
      lines.rotation.x = particles.rotation.x;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      shapeGeometries.forEach((g) => g.dispose());
      shapeMaterials.forEach((m) => m.dispose());
    };
  }, []);

  /* ── Entrance animations with GSAP ─────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(tagRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
    )
    .fromTo(nameRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1 },
      '-=0.4'
    )
    .fromTo(headlineRef.current?.querySelectorAll('.word'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
      '-=0.6'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(ctaRef.current?.querySelectorAll('a, button'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    )
    .fromTo(statsRef.current?.querySelectorAll('.stat-item'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      '-=0.3'
    )
    .fromTo(photoRef.current,
      { opacity: 0, scale: 0.85, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2 },
      '-=0.8'
    );

    return () => tl.kill();
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const headline = 'MERN Stack Developer.';
  const words = headline.split(' ');

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
                fontSize: 'clamp(56px, 8vw, 96px)',
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

            {/* Animated role headline */}
            <div
              ref={headlineRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'baseline',
                marginBottom: '28px',
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: 800,
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="word"
                  style={{
                    opacity: 0,
                    color: i === 0 ? '#f8fafc' : 'transparent',
                    background: i >= 1 ? 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 50%, var(--accent-pink) 100%)' : 'none',
                    WebkitBackgroundClip: i >= 1 ? 'text' : 'unset',
                    WebkitTextFillColor: i >= 1 ? 'transparent' : '#f8fafc',
                    backgroundClip: i >= 1 ? 'text' : 'unset',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                opacity: 0,
                textAlign: 'left',
                margin: '0 0 48px 0',
                fontSize: '17px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '540px',
              }}
            >
              I'm a Junior Frontend Developer building clean, functional
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
                { value: '3+', label: 'Years Learning' },
                { value: '100%', label: 'Passion Driven' },
              ].map((stat, i) => (
                <>
                  <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
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
                </>
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