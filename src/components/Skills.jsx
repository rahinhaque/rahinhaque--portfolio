"use client";

import { useEffect, useRef } from "react";
import anime from 'animejs';
import {
  FaReact,
  FaNodeJs,
  FaPaintBrush,
  FaLink,
  FaLock,
  FaLeaf,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
} from "react-icons/si";
import { FiMonitor, FiSettings, FiDatabase } from "react-icons/fi";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <FiMonitor size={16} />,
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    skills: [
      { name: "React.js", level: 88, icon: <FaReact size={16} /> },
      { name: "Next.js", level: 82, icon: <SiNextdotjs size={16} /> },
      { name: "JavaScript ES6+", level: 85, icon: <SiJavascript size={16} /> },
      { name: "HTML5 & CSS3", level: 92, icon: <FaCode size={16} /> },
      { name: "Tailwind CSS", level: 87, icon: <SiTailwindcss size={16} /> },
      { name: "UI/UX Design", level: 75, icon: <FaPaintBrush size={16} /> },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <FiSettings size={16} />,
    accent: "#10b981",
    accentRgb: "16,185,129",
    skills: [
      { name: "Node.js", level: 78, icon: <FaNodeJs size={16} /> },
      { name: "Express.js", level: 76, icon: <SiExpress size={16} /> },
      { name: "REST API Design", level: 80, icon: <FaLink size={16} /> },
      { name: "Auth (JWT)", level: 74, icon: <FaLock size={16} /> },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: <FiDatabase size={16} />,
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    skills: [
      { name: "MongoDB", level: 80, icon: <SiMongodb size={16} /> },
      { name: "Mongoose ODM", level: 78, icon: <FaLeaf size={16} /> },
      { name: "Database Design", level: 72, icon: <FaDatabase size={16} /> },
    ],
  },
];

const otherSkills = [
  { label: "Git & GitHub", icon: "🔀" },
  { label: "VS Code", icon: "💻" },
  { label: "Figma", icon: "🎨" },
  { label: "Postman", icon: "📮" },
  { label: "Vercel Deploy", icon: "🚀" },
  { label: "npm / yarn", icon: "📦" },
  { label: "ESLint", icon: "🔍" },
  { label: "Responsive Design", icon: "📱" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const pillsRef = useRef(null);
  const barsAnimated = useRef(false);
  const pillsAnimated = useRef(false);

  /* Enhanced anime.js Animations for Skills section */
  useEffect(() => {
    // Use Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal section header with dramatic effect
          const revealElements = sectionRef.current?.querySelectorAll(".reveal");
          if (revealElements) {
            anime({
              targets: revealElements,
              opacity: [0, 1],
              translateY: [60, 0],
              duration: 1000,
              delay: anime.stagger(150),
              easing: 'easeOutExpo'
            });
          }

          // Animate skill categories with 3D effect
          anime({
            targets: ".skill-category",
            opacity: [0, 1],
            translateY: [80, 0],
            scale: [0.9, 1],
            duration: 1200,
            delay: anime.stagger(200, {start: 600}),
            easing: 'easeOutElastic(1, .8)'
          });

          // Animate progress bars with counter effect
          if (!barsAnimated.current) {
            barsAnimated.current = true;
            
            anime({
              targets: ".progress-fill",
              width: ["0%", function() {
                return this.getAttribute("data-width") + "%";
              }],
              duration: 1500,
              delay: anime.stagger(100, {start: 1000}),
              easing: 'easeOutExpo'
            });

            // Animate skill level counters
            anime({
              targets: ".skill-level",
              innerHTML: [0, function() {
                return this.getAttribute("data-level");
              }],
              round: 1,
              opacity: [0, 1],
              duration: 1500,
              delay: anime.stagger(100, {start: 1000}),
              easing: 'easeOutExpo'
            });

            // Add glow effect to progress bars
            anime({
              targets: ".progress-fill",
              boxShadow: ["0 0 0px rgba(0, 212, 255, 0)", "0 0 20px rgba(0, 212, 255, 0.5)"],
              duration: 500,
              delay: anime.stagger(100, {start: 2000}),
              direction: 'alternate',
              easing: 'easeInOutQuad'
            });
          }

          // Animate other skills pills with elastic effect
          if (!pillsAnimated.current) {
            pillsAnimated.current = true;
            
            anime({
              targets: ".skill-pill",
              opacity: [0, 1],
              scale: [0.5, 1],
              rotate: [-180, 0],
              duration: 800,
              delay: anime.stagger(50, {start: 1400}),
              easing: 'easeOutElastic(1, .5)'
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Add hover effects for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card,
          scale: 1.05,
          translateY: -5,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        anime({
          targets: card,
          scale: 1,
          translateY: 0,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--bg-primary)" }}
    >
      <style>{`
        .tool-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-size: 13px;
          font-weight: 600;
          color: #a0a0b5;
          font-family: 'Outfit', sans-serif;
          cursor: default;
          /* ✅ NO opacity:0 — anime.js animates FROM 0 itself */
          transition: border-color 0.25s ease, color 0.25s ease,
                      background 0.25s ease, transform 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .tool-pill:hover {
          border-color: rgba(0,212,255,0.3);
          color: #00d4ff;
          background: rgba(0,212,255,0.06);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,212,255,0.1);
        }

        .skill-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: opacity 0.2s ease;
        }
        .skill-row:last-child { border-bottom: none; }
        .skill-category:hover .skill-row:not(:hover) { opacity: 0.55; }

        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          margin-bottom: 24px;
        }

        .level-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 80px;
          align-items: stretch;
        }
        @media (max-width: 767px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div className="section-tag" style={{ margin: "0 auto 20px" }}>
            Skills &amp; Expertise
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            My <span className="gradient-text">Technical Stack</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-1"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "520px" }}
          >
            Skilled across the full MERN stack — from pixel-perfect UIs to
            scalable backend APIs.
          </p>
        </div>

        {/* ── Skill cards ── */}
        <div className="skills-grid">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.id}
              className="skill-category glass-card"
              style={{
                opacity: 0,
                padding: "32px",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: `rgba(${cat.accentRgb}, 0.06)`,
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }}
              />

              <div
                className="cat-pill"
                style={{
                  background: `rgba(${cat.accentRgb}, 0.1)`,
                  border: `1px solid rgba(${cat.accentRgb}, 0.22)`,
                  color: cat.accent,
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.name} className="skill-row">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: cat.accent,
                            display: "flex",
                            alignItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          {skill.icon}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#f0f0f5",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className="level-badge"
                        style={{
                          color: cat.accent,
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        data-delay={catIdx * 120 + skillIdx * 80}
                        style={{
                          background: `linear-gradient(90deg, rgba(${cat.accentRgb},0.7), ${cat.accent})`,
                          boxShadow: `0 0 8px rgba(${cat.accentRgb}, 0.4)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Also Familiar With — own ref + observer ── */}
        <div ref={pillsRef}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "28px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                maxWidth: "160px",
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <p
              style={{
                textAlign: "center",
                margin: 0,
                fontSize: "11px",
                fontWeight: 700,
                color: "#606080",
                letterSpacing: "3px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Also Familiar With
            </p>
            <div
              style={{
                flex: 1,
                maxWidth: "160px",
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {otherSkills.map((skill) => (
              <span key={skill.label} className="tool-pill">
                <span style={{ fontSize: "14px" }}>{skill.icon}</span>
                {skill.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
