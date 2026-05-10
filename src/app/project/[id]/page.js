"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProjectById } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const project = getProjectById(params.id);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          background: "var(--bg-deep)",
          color: "#f0f0f5",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 800 }}>Project Not Found</h1>
        <p style={{ color: "#a0a0b5" }}>
          The project you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/#projects")}
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            border: "1px solid rgba(0,212,255,0.3)",
            background: "transparent",
            color: "#00d4ff",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaArrowLeft size={14} />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-deep)",
        padding: "120px 0 80px",
      }}
    >
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
        {/* Back button */}
        <button
          onClick={() => router.push("/#projects")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            color: "#a0a0b5",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: "40px",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#a0a0b5";
          }}
        >
          <FaArrowLeft size={14} />
          Back to Projects
        </button>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: 700,
              background: `rgba(${project.accentRgb}, 0.12)`,
              color: project.accent,
              border: `1px solid rgba(${project.accentRgb}, 0.25)`,
              marginBottom: "16px",
            }}
          >
            {project.tagline}
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 12px 0",
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h1>
        </div>

        {/* Project Image */}
        <div
          style={{
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "48px",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={900}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            priority
          />
        </div>

        {/* Action Links */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "#f0f0f5",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "15px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaGithub size={18} />
            View Source Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "none",
                background: `linear-gradient(135deg, rgba(${project.accentRgb},0.85), ${project.accent})`,
                color: "#000",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "15px",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.opacity = "0.88";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              <FaExternalLinkAlt size={16} />
              Live Demo
            </a>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 16px 0",
            }}
          >
            About the Project
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#a0a0b5",
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div
          style={{
            marginBottom: "48px",
            padding: "28px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 20px 0",
            }}
          >
            Technology Stack
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: `rgba(${project.accentRgb}, 0.1)`,
                  border: `1px solid rgba(${project.accentRgb}, 0.22)`,
                  color: `rgb(${project.accentRgb})`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 20px 0",
            }}
          >
            Key Features
          </h2>
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {project.highlights.map((h) => (
              <div
                key={h}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    color: project.accent,
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    color: "#c0c0d0",
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 20px 0",
            }}
          >
            Challenges Faced
          </h2>
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {project.challenges.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "#f59e0b",
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "#c0c0d0",
                      margin: 0,
                    }}
                  >
                    {c}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#f0f0f5",
              margin: "0 0 20px 0",
            }}
          >
            Future Improvements
          </h2>
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {project.improvements.map((imp, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `3px solid ${project.accent}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      color: project.accent,
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "#c0c0d0",
                      margin: 0,
                    }}
                  >
                    {imp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
