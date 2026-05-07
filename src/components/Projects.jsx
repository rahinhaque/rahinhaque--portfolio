"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTrophy,
  FaGlobe,
  FaNewspaper,
  FaBook,
  FaStore,
  FaCode,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "BPL-11",
    tagline: "Cricket Tournament Tracker",
    description:
      "A dynamic web application to track matches, player statistics, and team standings for the Bangladesh Premier League.",
    tech: ["JavaScript", "DOM Manipulation", "CSS3"],
    highlights: ["Dynamic DOM Updates", "Interactive Data", "Clean Layout"],
    github: "https://github.com/rahinhaque/BPL-11",
    live: null,
    icon: <FaTrophy size={22} />,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    featured: true,
  },
  {
    id: 2,
    title: "World On The Go",
    tagline: "Travel & Tour Management",
    description:
      "A beautifully designed travel agency website showcasing various tour packages, destinations, and a booking inquiry system.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    highlights: ["CSS Animations", "Responsive Grid", "Modern UI"],
    github: "https://github.com/rahinhaque/World-on-the-go",
    live: null,
    icon: <FaGlobe size={22} />,
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    featured: true,
  },
  {
    id: 3,
    title: "Dragon News",
    tagline: "News Portal Application",
    description:
      "A comprehensive news portal featuring categorized news reading, user authentication, and a clean reading interface built with Next.js.",
    tech: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    highlights: ["Server-Side Rendering", "Firebase Auth", "Dynamic Routing"],
    github: "https://github.com/rahinhaque/dragon-news-next-project",
    live: "https://dragon-news-next-project-lime.vercel.app/",
    icon: <FaNewspaper size={22} />,
    accent: "#ef4444",
    accentRgb: "239,68,68",
    featured: true,
  },
  {
    id: 4,
    title: "Book Vibe",
    tagline: "Book Review Platform",
    description:
      "An interactive platform for book enthusiasts to discover, review, and track their favorite books with custom filtering and local storage.",
    tech: ["React", "JavaScript ES6+", "CSS3", "Vite"],
    highlights: ["Custom Filtering", "Local Storage Sync", "Responsive UI"],
    github: "https://github.com/rahinhaque/Book-vibe.com",
    live: null,
    icon: <FaBook size={22} />,
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    featured: false,
  },
  {
    id: 5,
    title: "QurbaniHat",
    tagline: "Livestock Booking Platform",
    description:
      "A full-featured livestock booking platform for Eid-ul-Adha with secure authentication, dynamic animal listings, and user booking management.",
    tech: ["Next.js 15", "MongoDB", "BetterAuth", "Tailwind CSS"],
    highlights: ["Secure Authentication", "Full CRUD API", "Role-based Access"],
    github:
      "https://github.com/rahinhaque/QurbaniHat-Livestock-Booking-Platform",
    live: "https://qurbani-hat-livestock-booking-platf-ten.vercel.app",
    icon: <FaStore size={22} />,
    accent: "#10b981",
    accentRgb: "16,185,129",
    featured: true,
  },
  {
    id: 6,
    title: "Exploring Next.js",
    tagline: "Next.js Learning Playground",
    description:
      "A collection of experimental projects and components built while learning Next.js advanced features like App Router and Server Actions.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    highlights: ["App Router", "Server Actions", "SSR / SSG"],
    github: "https://github.com/rahinhaque/exploring-next.js",
    live: null,
    icon: <FaCode size={22} />,
    accent: "#a855f7",
    accentRgb: "168,85,247",
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  /* GSAP Animations for Projects section */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal section header
      gsap.fromTo(sectionRef.current?.querySelectorAll(".reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      // Filter buttons animation
      gsap.fromTo(sectionRef.current?.querySelectorAll(".filter-btn"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".filter-btn"),
            start: "top 90%",
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  /* Animate cards whenever filter changes with GSAP stagger */
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;
    
    // First, set all cards to initial state
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.94 });
    
    // Then animate them in with stagger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.09,
      ease: "power3.out"
    });
  }, [filter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <style>{`
        /* dot pattern */
        .proj-dot-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        /* filter pill buttons */
        .filter-btn {
          padding: 9px 22px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #a0a0b5;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .filter-btn:hover {
          border-color: rgba(0,212,255,0.3);
          color: #fff;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          border-color: transparent;
          color: #000;
          font-weight: 700;
        }

        /* project card */
        .project-card {
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          position: relative;
        }
        .project-card:hover {
          border-color: rgba(0,212,255,0.2);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
          transform: translateY(-6px);
        }

        /* card header */
        .card-header {
          padding: 28px 28px 20px;
          position: relative;
        }

        /* card body */
        .card-body {
          padding: 0 28px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* description — force left align always */
        .card-desc {
          font-size: 14px;
          line-height: 1.75;
          color: #a0a0b5;
          text-align: left !important;
          margin: 0 0 16px 0;
        }

        /* highlight list */
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #a0a0b5;
          padding: 3px 0;
        }

        /* tech badge override for per-card accent */
        .proj-tech-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.22);
          color: #a78bfa;
          white-space: nowrap;
        }

        /* link buttons */
        .card-link-ghost {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          color: #a0a0b5;
          background: transparent;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.25s ease;
          font-family: 'Outfit', sans-serif;
        }
        .card-link-ghost:hover {
          border-color: rgba(0,212,255,0.3);
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        .card-link-live {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          color: #000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          font-family: 'Outfit', sans-serif;
        }
        .card-link-live:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .card-link-disabled {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          color: #606080;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          cursor: default;
        }

        /* featured badge */
        .featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.3px;
        }

        /* projects grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 767px) { .projects-grid { grid-template-columns: 1fr; } }
        @media (min-width: 768px) and (max-width: 1023px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }

        /* github cta */
        .github-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          border: 1px solid rgba(0,212,255,0.28);
          color: #00d4ff;
          font-weight: 600;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          background: transparent;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .github-cta:hover {
          background: rgba(0,212,255,0.07);
          border-color: #00d4ff;
          box-shadow: 0 0 24px rgba(0,212,255,0.14);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Dot pattern background */}
      <div className="proj-dot-bg" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="section-tag" style={{ margin: "0 auto 20px" }}>
            Featured Work
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            Projects I've <span className="gradient-text">Built</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-1"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}
          >
            Real-world applications with a focus on engineering depth —
            authentication, API design, and clean architecture.
          </p>

          {/* Filter pills */}
          <div
            className="reveal reveal-delay-2"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "36px",
            }}
          >
            {[
              { key: "all", label: "All Projects" },
              { key: "featured", label: "★ Featured Only" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`filter-btn ${filter === key ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project grid ── */}
        <div ref={gridRef} className="projects-grid">
          {filtered.map((project) => (
            <article key={project.id} className="project-card">
              {/* Top accent line */}
              <div
                style={{
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                  flexShrink: 0,
                }}
              />

              {/* Card header */}
              <div
                className="card-header"
                style={{
                  background: `linear-gradient(135deg, rgba(${project.accentRgb},0.08) 0%, transparent 70%)`,
                }}
              >
                {project.featured && (
                  <span
                    className="featured-badge"
                    style={{
                      background: `rgba(${project.accentRgb}, 0.15)`,
                      color: project.accent,
                      border: `1px solid rgba(${project.accentRgb}, 0.25)`,
                    }}
                  >
                    ★ Featured
                  </span>
                )}

                {/* Icon circle */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `rgba(${project.accentRgb}, 0.12)`,
                    border: `1px solid rgba(${project.accentRgb}, 0.22)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: project.accent,
                    marginBottom: "16px",
                  }}
                >
                  {project.icon}
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#f0f0f5",
                    marginBottom: "4px",
                    lineHeight: 1.2,
                    /* override glass-card h3 gradient */
                    background: "none",
                    WebkitTextFillColor: "#f0f0f5",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    textAlign: "left",
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: project.accent,
                  }}
                >
                  {project.tagline}
                </p>
              </div>

              {/* Card body */}
              <div className="card-body">
                {/* Description */}
                <p className="card-desc">{project.description}</p>

                {/* Highlights */}
                <div style={{ marginBottom: "18px" }}>
                  {project.highlights.map((h) => (
                    <div key={h} className="highlight-item">
                      <span
                        style={{
                          color: project.accent,
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech badges — pushed to bottom */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "auto",
                    marginBottom: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {project.tech.map((t) => (
                    <span key={t} className="proj-tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link-ghost"
                  >
                    <GitHubIcon size={14} />
                    Code
                  </a>

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link-live"
                      style={{
                        background: `linear-gradient(135deg, rgba(${project.accentRgb},0.85), ${project.accent})`,
                      }}
                    >
                      <LiveIcon />
                      Live Demo
                    </a>
                  ) : (
                    <span className="card-link-disabled">In Progress</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginTop: "72px" }}
        >
          <p
            style={{
              textAlign: "center",
              margin: "0 0 16px 0",
              fontSize: "14px",
              color: "#606080",
            }}
          >
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/rahinhaque"
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta"
          >
            <GitHubIcon size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}