'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Education', href: 'education' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef(null);
  const magneticBtnsRef = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      const sections = navLinks.map((l) => l.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Magnetic button effect with GSAP
  useEffect(() => {
    const buttons = navRef.current?.querySelectorAll('.magnetic-btn');
    if (!buttons) return;

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }, [scrolled]);

  return (
    <>
      <style>{`
        @keyframes navGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .nav-link-active {
          position: relative;
        }
        
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
          border-radius: 2px;
          animation: navGlow 2s ease-in-out infinite;
        }
      `}</style>

      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'navbar-glass shadow-2xl shadow-black/50 border-b border-[var(--border-accent)]' 
            : 'bg-transparent'
        }`}
      >
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-50 transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px var(--accent-purple)'
          }}
        />

        <div className="container">
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-3 group magnetic-btn"
              aria-label="Go to home"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center text-black font-black text-sm shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
                  R
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              </div>
              <span className="font-black text-xl tracking-tight group-hover:text-white transition-colors duration-300">
                rahin<span className="gradient-text">.</span>dev
              </span>
            </button>

            {/* Desktop navigation */}
            <ul className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 magnetic-btn ${
                      activeSection === link.href
                        ? 'text-white'
                        : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {activeSection === link.href && (
                      <>
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 border border-[var(--border-accent)]" />
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-md" />
                      </>
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Social + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme indicator */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-[var(--text-secondary)]">Available</span>
              </div>

              <a
                href="https://github.com/rahinhaque"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-accent)] hover:bg-white/5 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/rahin-haque-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="magnetic-btn btn-primary px-6 py-2.5 text-sm rounded-lg font-bold"
              >
                <span>Let's Talk</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
              />
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } navbar-glass border-t border-[var(--border-subtle)]`}
        >
          <div className="container py-6 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-left px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeSection === link.href
                    ? 'text-[var(--accent-cyan)] bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-[var(--accent-cyan)]'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 mt-4 px-2">
              <a
                href="https://github.com/rahinhaque"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-sm font-semibold rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-accent)] hover:bg-white/5 transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rahin-haque-web/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-sm font-semibold rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}