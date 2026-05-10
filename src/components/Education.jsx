"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { FaGraduationCap, FaGlobe, FaCode } from "react-icons/fa";

export default function Education() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const futureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate section header
            anime({
              targets: sectionRef.current.querySelectorAll(".reveal"),
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: anime.stagger(100),
              easing: "easeOutExpo",
            });

            // Animate education card
            if (cardRef.current) {
              anime({
                targets: cardRef.current,
                opacity: [0, 1],
                translateX: [-60, 0],
                scale: [0.95, 1],
                duration: 900,
                delay: 300,
                easing: "easeOutExpo",
              });
            }

            // Animate future plans cards
            const futureCards = futureRef.current?.querySelectorAll(".future-card");
            if (futureCards) {
              anime({
                targets: futureCards,
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [0.96, 1],
                duration: 700,
                delay: anime.stagger(120, { start: 500 }),
                easing: "easeOutExpo",
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--bg-secondary)" }}
    >
      <style>{`
        .edu-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .edu-card:hover {
          border-color: rgba(0,212,255,0.15);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3);
        }
        .edu-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00d4ff, #8b5cf6, #ec4899);
          border-radius: 20px 20px 0 0;
        }
        .future-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s ease;
        }
        .future-card:hover {
          border-color: rgba(0,212,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
        }
        .future-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          color: #10b981;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 767px) {
          .future-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            className="section-tag reveal"
            style={{ margin: "0 auto 20px" }}
          >
            My Background
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            Educational{" "}
            <span className="gradient-text">Qualification</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-1"
            style={{
              textAlign: "center",
              margin: "0 auto",
              maxWidth: "560px",
            }}
          >
            My academic journey and the foundation that drives my passion for
            technology and continuous learning.
          </p>
        </div>

        {/* Education Card */}
        <div
          ref={cardRef}
          className="edu-card"
          style={{ opacity: 0, maxWidth: "720px", margin: "0 auto 56px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00d4ff",
                flexShrink: 0,
              }}
            >
              <FaGraduationCap size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "6px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#f0f0f5",
                    margin: 0,
                  }}
                >
                  Bachelor of Arts (Honours)
                </h3>
                <span className="status-badge">
                  <span className="status-dot" />
                  2nd Year — In Progress
                </span>
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "#a0a0b5",
                  margin: "0 0 4px 0",
                  fontWeight: 600,
                }}
              >
                Political Science
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "20px 24px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8b5cf6",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#f0f0f5",
                }}
              >
                Narsingdi Government College
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#a0a0b5",
                margin: 0,
              }}
            >
              Currently pursuing my Honours degree in Political Science, developing
              critical thinking and analytical skills alongside my passion for
              technology and web development.
            </p>
          </div>
        </div>

        {/* Future Plans */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h3
            className="reveal"
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 8px 0",
            }}
          >
            Future Aspirations
          </h3>
          <p
            className="reveal"
            style={{
              fontSize: "15px",
              color: "#a0a0b5",
              margin: 0,
            }}
          >
            My roadmap ahead — blending academic growth with professional ambition.
          </p>
        </div>

        <div
          ref={futureRef}
          className="future-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {/* Web Development Card */}
          <div className="future-card" style={{ opacity: 0 }}>
            <div
              className="future-icon"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "#00d4ff",
              }}
            >
              <FaCode size={20} />
            </div>
            <h4
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#f0f0f5",
                margin: "0 0 10px 0",
              }}
            >
              Web Development Career
            </h4>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#a0a0b5",
                margin: 0,
              }}
            >
              Committed to mastering the MERN stack and modern web technologies.
              Building real-world projects and contributing to open source to sharpen
              my craft.
            </p>
          </div>

          {/* Higher Studies Card */}
          <div className="future-card" style={{ opacity: 0 }}>
            <div
              className="future-icon"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "#8b5cf6",
              }}
            >
              <FaGlobe size={20} />
            </div>
            <h4
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#f0f0f5",
                margin: "0 0 10px 0",
              }}
            >
              Higher Studies Abroad
            </h4>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#a0a0b5",
                margin: 0,
              }}
            >
              Aspiring to pursue advanced studies internationally, combining my
              political science background with technology to drive meaningful
              global impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
