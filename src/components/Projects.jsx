"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import anime from 'animejs';
import {
  FaTrophy,
  FaGlobe,
  FaNewspaper,
  FaBook,
  FaStore,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import { projects } from "@/data/projects";

const iconMap = {
  FaTrophy: <FaTrophy size={22} />,
  FaGlobe: <FaGlobe size={22} />,
  FaNewspaper: <FaNewspaper size={22} />,
  FaBook: <FaBook size={22} />,
  FaStore: <FaStore size={22} />,
  FaCode: <FaCode size={22} />,
};

export default function Projects() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const cardRefs = useRef({});

  const filtered =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  /* anime.js Animations for Projects section */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal section header
          const revealElements = sectionRef.current?.querySelectorAll(".reveal");
          if (revealElements) {
            anime({
              targets: revealElements,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: anime.stagger(100),
              easing: 'easeOutExpo'
            });
          }

          // Filter buttons animation
          const filterButtons = sectionRef.current?.querySelectorAll(".filter-btn");
          if (filterButtons) {
            anime({
              targets: filterButtons,
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.9, 1],
              duration: 600,
              delay: anime.stagger(80, {start: 400}),
              easing: 'easeOutElastic(1, .8)'
            });
          }

          // GitHub CTA animation
          const githubCta = sectionRef.current?.querySelector(".github-cta");
          if (githubCta) {
            anime({
              targets: githubCta,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              duration: 700,
              delay: 600,
              easing: 'easeOutElastic(1, .8)'
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  /* Animate cards whenever filter changes with anime.js stagger */
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;
    
    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.94, 1],
      duration: 700,
      delay: anime.stagger(90),
      easing: 'easeOutExpo'
    });
  }, [filter]);

  /* Card tilt animation with mouse tracking using anime.js */
  const handleMouseMove = (e, projectId) => {
    const card = cardRefs.current[projectId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 15;
    const rotateX = -((mouseY - centerY) / (rect.height / 2)) * 15;
    
    anime({
      targets: card,
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = (projectId) => {
    const card = cardRefs.current[projectId];
    if (!card) return;
    
    anime({
      targets: card,
      rotateX: 0,
      rotateY: 0,
      duration: 500,
      easing: 'easeOutQuad'
    });
  };

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
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .project-card:hover {
          border-color: rgba(0,212,255,0.2);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
        }

        /* card title animation */
        .card-title {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: inline-block;
        }
        .card-title::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover .card-title {
          transform: translateX(4px);
          color: #fff;
        }
        .project-card:hover .card-title::after {
          width: 100%;
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

        /* project card image hover */
        .project-card:hover .project-card-img {
          transform: scale(1.08);
        }

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
            <article 
              key={project.id} 
              className="project-card"
              ref={(el) => cardRefs.current[project.id] = el}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
            >
              {/* Top accent line */}
              <div
                style={{
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                  flexShrink: 0,
                }}
              />

              {/* Project Image */}
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  className="project-card-img"
                />
              </div>

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
                  {iconMap[project.icon]}
                </div>

                <h3
                  className="card-title"
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
                    marginBottom: "16px",
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

                {/* View Details button */}
                <Link
                  href={`/project/${project.id}`}
                  className="view-details-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "12px",
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid rgba(${project.accentRgb}, 0.25)`,
                    background: `rgba(${project.accentRgb}, 0.05)`,
                    color: project.accent,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `rgba(${project.accentRgb}, 0.12)`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `rgba(${project.accentRgb}, 0.05)`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View Details
                  <FaArrowRight size={14} />
                </Link>
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