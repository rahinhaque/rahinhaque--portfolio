"use client";

import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Frontend Development",
  "React & Next.js",
  "UI/UX Implementation",
  "REST API Integration",
  "Performance Optimization",
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/rahinhaque",
    icon: <FaGithub size={17} />,
    hoverColor: "#f0f0f5",
    hoverBg: "rgba(255,255,255,0.08)",
    hoverBorder: "rgba(255,255,255,0.22)",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rahin-haque-web/",
    icon: <FaLinkedin size={17} />,
    hoverColor: "#0A66C2",
    hoverBg: "rgba(10,102,194,0.1)",
    hoverBorder: "rgba(10,102,194,0.3)",
  },
  {
    name: "Email",
    href: "mailto:haquerahin743@gmail.com",
    icon: <FaEnvelope size={17} />,
    hoverColor: "#00d4ff",
    hoverBg: "rgba(0,212,255,0.1)",
    hoverBorder: "rgba(0,212,255,0.3)",
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    // Reveal footer elements
    const revealElements = footerRef.current?.querySelectorAll(".reveal");
    if (revealElements) {
      gsap.set(revealElements, { opacity: 0, y: 40 });
      gsap.to(revealElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // CTA strip animation
    const ctaStrip = footerRef.current?.querySelector(".footer-cta-strip");
    if (ctaStrip) {
      gsap.set(ctaStrip, { opacity: 0, scale: 0.95 });
      gsap.to(ctaStrip, {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Footer grid columns animation
    const gridColumns = footerRef.current?.querySelectorAll(".footer-grid > div");
    if (gridColumns) {
      gsap.set(gridColumns, { opacity: 0, y: 30 });
      gsap.to(gridColumns, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Social icons hover animation
    const socialIcons = footerRef.current?.querySelectorAll(".social-icon-btn");
    socialIcons?.forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollTo = (id) =>
    document
      .getElementById(id.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        background: "var(--bg-primary)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <style>{`
        /* gradient top line */
        .footer-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff 35%, #8b5cf6 65%, transparent);
        }

        /* background dot grid */
        .footer-dot-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* big CTA strip */
        .footer-cta-strip {
          padding: 56px 0 52px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }

        /* grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
          gap: 40px;
          padding: 56px 0 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } }

        /* column heading */
        .footer-col-head {
          font-size: 11px; font-weight: 800;
          color: #606080; letter-spacing: 2.5px;
          text-transform: uppercase; margin: 0 0 20px 0;
          text-align: left !important;
          display: flex; align-items: center; gap: 8px;
        }
        .col-head-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }

        /* nav links */
        .footer-nav-link {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; font-weight: 500;
          color: #a0a0b5; text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s ease, gap 0.2s ease;
          background: transparent; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          text-align: left;
        }
        .footer-nav-link:hover { color: #00d4ff; gap: 12px; }
        .footer-nav-link::before {
          content: ''; display: block;
          width: 5px; height: 1px;
          background: #606080; border-radius: 1px;
          transition: width 0.25s ease, background 0.2s ease;
          flex-shrink: 0;
        }
        .footer-nav-link:hover::before { width: 10px; background: #00d4ff; }

        /* service items */
        .footer-service-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; color: #a0a0b5;
          padding: 5px 0;
          transition: color 0.2s ease;
          cursor: default;
        }
        .footer-service-item:hover { color: #f0f0f5; }
        .service-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #8b5cf6; flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .footer-service-item:hover .service-dot { transform: scale(1.5); }

        /* social icon */
        .social-icon-btn {
          width: 40px; height: 40px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #606080; text-decoration: none;
          transition: all 0.25s ease;
        }
        .social-icon-btn:hover { transform: translateY(-3px); }

        /* start project btn */
        .start-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 11px;
          font-size: 13px; font-weight: 700;
          font-family: 'Outfit', sans-serif;
          color: #00d4ff; text-decoration: none;
          border: 1px solid rgba(0,212,255,0.25);
          background: rgba(0,212,255,0.05);
          transition: all 0.25s ease;
        }
        .start-btn:hover {
          background: rgba(0,212,255,0.1);
          border-color: rgba(0,212,255,0.45);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,212,255,0.12);
        }

        /* CTA email button */
        .cta-email-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border-radius: 14px;
          font-size: 15px; font-weight: 800;
          font-family: 'Outfit', sans-serif; color: #000;
          text-decoration: none;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          border: none; cursor: pointer;
          animation: continuousGlow 3s infinite ease-in-out;
          transition: transform 0.2s ease;
          position: relative; overflow: hidden;
        }
        .cta-email-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #8b5cf6, #00d4ff);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .cta-email-btn:hover::before { opacity: 1; }
        .cta-email-btn:hover { transform: translateY(-2px); }
        .cta-email-btn span { position: relative; z-index: 1; }

        /* scroll to top */
        .scroll-top-btn {
          width: 42px; height: 42px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: #606080; cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Outfit', sans-serif;
        }
        .scroll-top-btn:hover {
          background: rgba(0,212,255,0.08);
          border-color: rgba(0,212,255,0.28);
          color: #00d4ff;
          transform: translateY(-3px);
        }

        /* bottom bar */
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0;
          flex-wrap: wrap; gap: 14px;
        }
        @media (max-width: 560px) { .footer-bottom { justify-content: center; text-align: center; } }

        /* bottom gradient line */
        .footer-bottom-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #8b5cf6 40%, #00d4ff 70%, transparent);
        }

        /* brand logo */
        .footer-logo-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 16px; color: #000;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 0 20px rgba(0,212,255,0.22);
          flex-shrink: 0;
        }
      `}</style>

      {/* Top accent line */}
      <div className="footer-top-line" />

      {/* Dot grid */}
      <div className="footer-dot-bg" aria-hidden="true" />

      {/* Hero-style ambient glow blobs with float animation */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "-8%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "floatGlow 20s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-6%",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          animation: "floatGlow 25s ease-in-out infinite reverse",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(236,72,153,0.04) 0%,transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          animation: "floatGlow 30s ease-in-out infinite",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Big CTA Strip ── */}
        <div className="footer-cta-strip reveal">
          {/* Tag */}
          <div className="section-tag" style={{ margin: "0 auto 20px" }}>
            Open to Work
          </div>

          <h2
            style={{
              fontSize: "clamp(28px,5vw,52px)",
              fontWeight: 900,
              color: "#f0f0f5",
              lineHeight: 1.1,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Have a project in mind?{" "}
            <span className="gradient-text">Let&apos;s build it.</span>
          </h2>

          <p
            style={{
              textAlign: "center",
              margin: "0 auto 32px",
              fontSize: "16px",
              color: "#a0a0b5",
              maxWidth: "440px",
              lineHeight: 1.7,
            }}
          >
            I&apos;m available for freelance work and remote opportunities. Drop
            me a message — I respond within 24 hours.
          </p>

          <a href="mailto:haquerahin743@gmail.com" className="cta-email-btn">
            <FaEnvelope size={15} style={{ position: "relative", zIndex: 1 }} />
            <span>haquerahin743@gmail.com</span>
          </a>
        </div>

        {/* ── 4-column grid ── */}
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              <div className="footer-logo-icon">R</div>
              <div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: "18px",
                    color: "#f0f0f5",
                    lineHeight: 1.1,
                  }}
                >
                  Rahin<span className="gradient-text">.</span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#606080",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Frontend Dev
                </div>
              </div>
            </div>

            <p
              style={{
                textAlign: "left",
                margin: "0 0 22px 0",
                fontSize: "13px",
                color: "#a0a0b5",
                lineHeight: 1.8,
                maxWidth: "280px",
              }}
            >
              Junior Frontend Developer building clean, functional web
              interfaces at the intersection of technology, logic, and user
              experience.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={s.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = s.hoverColor;
                    e.currentTarget.style.background = s.hoverBg;
                    e.currentTarget.style.borderColor = s.hoverBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#606080";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal-delay-1">
            <p className="footer-col-head">
              <span
                className="col-head-dot"
                style={{ background: "#00d4ff" }}
              />
              Quick Links
            </p>
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="footer-nav-link"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* What I Do */}
          <div className="reveal-delay-2">
            <p className="footer-col-head">
              <span
                className="col-head-dot"
                style={{ background: "#8b5cf6" }}
              />
              What I Do
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              {services.map((s) => (
                <div key={s} className="footer-service-item">
                  <span className="service-dot" />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Let's Connect */}
          <div className="reveal-delay-3">
            <p className="footer-col-head">
              <span
                className="col-head-dot"
                style={{ background: "#10b981" }}
              />
              Let's Connect
            </p>
            <p
              style={{
                textAlign: "left",
                margin: "0 0 20px 0",
                fontSize: "13px",
                color: "#a0a0b5",
                lineHeight: 1.75,
              }}
            >
              Have a project or just want to say hi? My inbox is always open.
            </p>

            {/* Info rows */}
            {[
              {
                label: "Email",
                value: "haquerahin743@gmail.com",
                href: "mailto:haquerahin743@gmail.com",
                color: "#00d4ff",
              },
              {
                label: "Location",
                value: "Bangladesh 🇧🇩",
                href: null,
                color: "#10b981",
              },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#606080",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                  }}
                >
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: item.color,
                      textDecoration: "none",
                      transition: "opacity .2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.75")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}

            <a
              href="mailto:haquerahin743@gmail.com"
              className="start-btn"
              style={{ marginTop: "8px" }}
            >
              Start a Project
              <svg
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p
            style={{
              textAlign: "left",
              margin: 0,
              fontSize: "12px",
              color: "#606080",
            }}
          >
            © {year} Rahin Haque. All rights reserved.
          </p>

         

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={14} />
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="footer-bottom-line" />
    </footer>
  );
}
