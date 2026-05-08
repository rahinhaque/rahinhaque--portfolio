"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiMongodb, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaGitAlt, FaFigma, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "VS Code", icon: <VscVscode size={22} />, color: "#007ACC" },
  { name: "MongoDB", icon: <SiMongodb size={22} />, color: "#10b981" },
  { name: "Git", icon: <FaGitAlt size={22} />, color: "#f59e0b" },
  { name: "Figma", icon: <FaFigma size={22} />, color: "#a855f7" },
  { name: "Postman", icon: <SiPostman size={22} />, color: "#ef4444" },
  { name: "GitHub", icon: <FaGithub size={22} />, color: "#f0f0f5" },
];

const quickFacts = [
  { icon: "📍", text: "Based in Bangladesh" },
  { icon: "🎯", text: "Open to remote opportunities" },
  { icon: "📚", text: "Continuous learner — always building" },
  { icon: "🤝", text: "Team player, detail-oriented" },
];

const infoCards = [
  {
    icon: "💻",
    title: "Languages & Frameworks",
    description: "React, Next.js, JavaScript ES6+, HTML5, CSS3, Tailwind CSS",
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    tags: [
      "React & Next.js",
      "JavaScript ES6+",
      "HTML5 & CSS3",
      "Tailwind CSS",
    ],
  },
  {
    icon: "🎓",
    title: "Education",
    description:
      "Narsingdi Govt. College\nBachelor of Arts — Political Science",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    tags: [
      "Narsingdi Govt. College",
      "Bachelor of Arts",
      "Political Science",
      "Self-taught Dev",
    ],
  },
  {
    icon: "🚀",
    title: "Projects",
    description:
      "Built 5+ real-world full-stack projects with authentication, APIs and databases",
    accent: "#10b981",
    accentRgb: "16,185,129",
    tags: [
      "5+ Projects Built",
      "REST API Design",
      "Auth Systems",
      "MongoDB & Node.js",
    ],
  },
];

const stackBars = [
  {
    label: "Frontend",
    value: "React · Next.js · Tailwind",
    color: "#00d4ff",
    rgb: "0,212,255",
    pct: 88,
  },
  {
    label: "Backend",
    value: "Node.js · Express · REST",
    color: "#10b981",
    rgb: "16,185,129",
    pct: 78,
  },
  {
    label: "Database",
    value: "MongoDB · Mongoose",
    color: "#f59e0b",
    rgb: "245,158,11",
    pct: 80,
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const mainBoxRef = useRef(null);
  const cardsRef = useRef(null);

  /* Enhanced GSAP Animations for About section with timeline effects */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      // Dramatic section header reveal
      tl.fromTo(sectionRef.current?.querySelectorAll(".reveal"),
        { 
          opacity: 0, 
          y: 80, 
          rotationX: 45,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out"
        }
      )
      // Main box with 3D flip effect
      .fromTo(mainBoxRef.current,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationY: -30,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.3)"
        },
        "-=0.6"
      )
      // Quick facts with staggered bounce
      .fromTo(".quick-fact",
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.7,
          rotation: -10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.8"
      )
      // Info cards with cascade effect
      .fromTo(cardsRef.current?.querySelectorAll(".info-card"),
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.9,
          rotationX: -15,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.4"
      )
      // Stack bars with animated counters
      .fromTo(".stack-bar",
        { 
          opacity: 0, 
          x: -50,
          width: 0
        },
        {
          opacity: 1,
          x: 0,
          width: function() {
            return this.getAttribute("data-width") + "%";
          },
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.6"
      )
      // Tool icons with rotation effect
      .fromTo(".tool-item",
        { 
          opacity: 0, 
          scale: 0.3,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.5)"
        },
        "-=0.4"
      );

      // Add parallax effect to main box
      ScrollTrigger.create({
        trigger: mainBoxRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(mainBoxRef.current, {
            y: progress * 30,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });

      // Interactive hover effects for info cards
      const infoCards = document.querySelectorAll('.info-card');
      infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -8,
            rotationY: 5,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

      // Tool items hover animation
      const toolItems = document.querySelectorAll('.tool-item');
      toolItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Tool chips hover animation
      const toolChips = sectionRef.current?.querySelectorAll(".tool-chip");
      toolChips?.forEach((chip) => {
        chip.addEventListener("mouseenter", () => {
          gsap.to(chip, {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        chip.addEventListener("mouseleave", () => {
          gsap.to(chip, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <style>{`
        @keyframes ping { 75%,100%{transform:scale(2.2);opacity:0} }

        .about-dot-bg {
          position:absolute;inset:0;
          background-image:radial-gradient(rgba(255,255,255,0.055) 1px,transparent 1px);
          background-size:28px 28px;pointer-events:none;
        }

        /* ── Combined big box ── */
        .about-main-box {
          display:grid;
          grid-template-columns:1.15fr 0.85fr;
          border-radius:26px;
          border:1px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.03);
          overflow:hidden;
          opacity:0;
          position:relative;
        }
        @media(max-width:900px){.about-main-box{grid-template-columns:1fr;}}

        .story-pane {
          padding:48px 44px;
          border-right:1px solid rgba(255,255,255,0.07);
          display:flex;flex-direction:column;
          position:relative;z-index:1;
        }
        @media(max-width:900px){
          .story-pane{padding:36px 28px;border-right:none;border-bottom:1px solid rgba(255,255,255,0.07);}
        }

        .tools-pane {
          padding:44px 36px;
          display:flex;flex-direction:column;gap:26px;
          position:relative;z-index:1;
        }
        @media(max-width:900px){.tools-pane{padding:36px 28px;}}

        /* paragraphs — immune to global p{text-align:center} */
        .story-p {
          font-size:15px;color:#a0a0b5;
          line-height:1.85;
          text-align:left!important;margin:0;
        }

        .fact-row {
          display:flex;align-items:center;gap:10px;
          font-size:13px;color:#a0a0b5;
          padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);
          transition:color .2s ease;
        }
        .fact-row:last-child{border-bottom:none;}
        .fact-row:hover{color:#f0f0f5;}

        .tool-chip {
          display:flex;flex-direction:column;align-items:center;
          gap:7px;padding:14px 8px 12px;
          border-radius:13px;
          border:1px solid rgba(255,255,255,0.07);
          background:rgba(255,255,255,0.03);
          transition:all .25s ease;cursor:default;
        }
        .tool-chip:hover {
          border-color:rgba(0,212,255,0.25);
          background:rgba(0,212,255,0.05);
          transform:translateY(-3px);
          box-shadow:0 6px 20px rgba(0,212,255,0.08);
        }

        .gh-link {
          display:inline-flex;align-items:center;gap:7px;
          font-size:13px;font-weight:600;
          color:var(--accent-cyan);text-decoration:none;
          padding:9px 16px;border-radius:9px;
          border:1px solid rgba(0,212,255,0.22);
          background:rgba(0,212,255,0.05);
          transition:all .2s ease;
          align-self:flex-start;
        }
        .gh-link:hover{
          border-color:rgba(0,212,255,0.45);
          background:rgba(0,212,255,0.1);
          transform:translateX(4px);
        }

        .micro-label {
          font-size:11px;font-weight:700;color:#606080;
          letter-spacing:2.5px;text-transform:uppercase;
          margin:0 0 14px 0;text-align:left!important;
        }

        /* ── Divider row ── */
        .at-a-glance {
          display:flex;align-items:center;gap:16px;
          margin:52px 0 28px;
        }
        .glance-line{flex:1;height:1px;background:rgba(255,255,255,0.07);}
        .glance-label{
          margin:0;text-align:center!important;
          font-size:11px;font-weight:700;color:#606080;
          letter-spacing:3px;text-transform:uppercase;white-space:nowrap;
        }

        /* ── Info cards ── */
        .info-cards-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
        }
        @media(max-width:900px){.info-cards-grid{grid-template-columns:1fr;}}
        @media(min-width:560px) and (max-width:900px){.info-cards-grid{grid-template-columns:repeat(2,1fr);}}

        .info-card {
          padding:30px 26px 28px;
          border-radius:22px;
          border:1px solid rgba(255,255,255,0.07);
          background:rgba(255,255,255,0.03);
          position:relative;overflow:hidden;
          opacity:0;
          display:flex;flex-direction:column;
          transition:border-color .3s ease,transform .3s ease,box-shadow .3s ease;
        }
        .info-card:hover{transform:translateY(-5px);}

        .card-tag {
          display:inline-flex;align-items:center;
          padding:3px 10px;border-radius:100px;
          font-size:11px;font-weight:600;
          margin:3px 2px 0 0;
        }
      `}</style>

      {/* Background */}
      <div className="about-dot-bg" aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8%",
          right: "-10%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-tag reveal" style={{ margin: "0 auto 20px" }}>
            About Me
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            Turning Ideas into{" "}
            <span className="gradient-text">Digital Reality</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-1"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "500px" }}
          >
            I&apos;m currently pursuing a Bachelor&apos;s degree in Political
            Science while actively building my path as a Junior Frontend
            Developer.
          </p>
        </div>

        {/* ══════════════════════════════════════
            BIG BOX — Story (left) + Tools (right)
        ══════════════════════════════════════ */}
        <div ref={mainBoxRef} className="about-main-box">
          {/* Corner glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-60px",
              left: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(0,212,255,0.06) 0%,transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ── LEFT: My Story ── */}
          <div className="story-pane">
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "14px",
                  flexShrink: 0,
                  background:
                    "linear-gradient(135deg,rgba(0,212,255,0.18),rgba(139,92,246,0.18))",
                  border: "1px solid rgba(0,212,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                👨‍💻
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#f0f0f5",
                    marginBottom: "3px",
                    background: "none",
                    WebkitTextFillColor: "#f0f0f5",
                  }}
                >
                  My Story
                </h3>
                <p
                  style={{
                    margin: 0,
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#606080",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Junior Frontend Developer
                </p>
              </div>
            </div>

            {/* Bio */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                flex: 1,
              }}
            >
              <p className="story-p">
                My interest lies at the intersection of{" "}
                <span style={{ color: "#00d4ff", fontWeight: 600 }}>
                  technology
                </span>
                ,{" "}
                <span style={{ color: "#8b5cf6", fontWeight: 600 }}>logic</span>
                , and{" "}
                <span style={{ color: "#10b981", fontWeight: 600 }}>
                  user experience
                </span>{" "}
                — where I enjoy turning ideas into clean, functional web
                interfaces.
              </p>
              <p className="story-p">
                Alongside my academic journey, I&apos;m actively developing my
                programming skills and building projects to strengthen my
                understanding of modern web development. I believe great
                software emerges where disciplined thinking meets creative
                execution.
              </p>
              <p className="story-p">
                I specialize in the MERN stack — building everything from
                polished, animated frontends with React and Next.js to robust
                REST APIs with Node, Express, and MongoDB.
              </p>
            </div>

            {/* Quick facts */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "22px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {quickFacts.map((f) => (
                <div key={f.text} className="fact-row">
                  <span style={{ fontSize: "15px", flexShrink: 0 }}>
                    {f.icon}
                  </span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/rahinhaque"
              target="_blank"
              rel="noopener noreferrer"
              className="gh-link"
              style={{ marginTop: "22px" }}
            >
              <FaGithub size={14} />
              View my GitHub
              <svg
                width="11"
                height="11"
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

          {/* ── RIGHT: Tools + Stack ── */}
          <div className="tools-pane">
            {/* Tools grid */}
            <div>
              <p className="micro-label">Tools I Work With</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "9px",
                }}
              >
                {tools.map((tool) => (
                  <div key={tool.name} className="tool-chip">
                    <span style={{ color: tool.color }}>{tool.icon}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#a0a0b5",
                      }}
                    >
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Stack bars */}
            <div>
              <p className="micro-label">My Stack</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {stackBars.map((s) => (
                  <div key={s.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "7px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.label}
                      </span>
                      <span style={{ fontSize: "11px", color: "#606080" }}>
                        {s.value}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        borderRadius: "2px",
                        background: "rgba(255,255,255,0.07)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "2px",
                          width: `${s.pct}%`,
                          background: `linear-gradient(90deg,rgba(${s.rgb},0.55),${s.color})`,
                          boxShadow: `0 0 8px ${s.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Availability */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(16,185,129,0.05)",
                border: "1px solid rgba(16,185,129,0.18)",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <span
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#34d399",
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#10b981",
                    position: "relative",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#10b981",
                  }}
                >
                  Open to opportunities
                </div>
                <div style={{ fontSize: "11px", color: "#606080" }}>
                  Remote-friendly · Responds within 24h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            "At a Glance" divider
        ══════════════════════════════════════ */}
        <div className="at-a-glance reveal">
          <div className="glance-line" />
          <p className="glance-label">At a Glance</p>
          <div className="glance-line" />
        </div>

        {/* ══════════════════════════════════════
            3 INFO CARDS
        ══════════════════════════════════════ */}
        <div ref={cardsRef} className="info-cards-grid">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="info-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${card.accentRgb},0.28)`;
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(${card.accentRgb},0.08)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg,transparent,${card.accent},transparent)`,
                }}
              />

              {/* Corner glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  background: `rgba(${card.accentRgb},0.06)`,
                  filter: "blur(34px)",
                  pointerEvents: "none",
                }}
              />

              {/* Icon box */}
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "13px",
                  background: `rgba(${card.accentRgb},0.1)`,
                  border: `1px solid rgba(${card.accentRgb},0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "21px",
                  marginBottom: "18px",
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "10px",
                  color: card.accent,
                  background: "none",
                  WebkitTextFillColor: card.accent,
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  textAlign: "left",
                  margin: "0 0 16px 0",
                  fontSize: "13px",
                  color: "#a0a0b5",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                  flex: 1,
                }}
              >
                {card.description}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginTop: "auto",
                }}
              >
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="card-tag"
                    style={{
                      background: `rgba(${card.accentRgb},0.08)`,
                      border: `1px solid rgba(${card.accentRgb},0.18)`,
                      color: card.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
