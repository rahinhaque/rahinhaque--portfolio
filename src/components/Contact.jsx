"use client";

import { useRef, useState, useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaPaperPlane,
  FaCheckCircle,
  FaEnvelope,
  FaMapPin,
  FaGithub,
  FaLinkedin,
  FaClock,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: <FaEnvelope size={18} />,
    label: "Email",
    value: "haquerahin743@gmail.com",
    href: "mailto:haquerahin743@gmail.com",
    accent: "#00d4ff",
    accentRgb: "0,212,255",
  },
  {
    icon: <FaLinkedin size={18} />,
    label: "LinkedIn",
    value: "rahin-haque-web",
    href: "https://www.linkedin.com/in/rahin-haque-web/",
    accent: "#0A66C2",
    accentRgb: "10,102,194",
  },
  {
    icon: <FaGithub size={18} />,
    label: "GitHub",
    value: "rahinhaque",
    href: "https://github.com/rahinhaque",
    accent: "#f0f0f5",
    accentRgb: "240,240,245",
  },
  {
    icon: <FaMapPin size={18} />,
    label: "Location",
    value: "Bangladesh",
    href: null,
    accent: "#10b981",
    accentRgb: "16,185,129",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const leftRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  /* GSAP ScrollTrigger Animations for Contact section */
  useEffect(() => {
    // Dramatic section header reveal
    const revealElements = sectionRef.current?.querySelectorAll(".reveal");
    if (revealElements) {
      gsap.set(revealElements, { opacity: 0, y: 80 });
      gsap.to(revealElements, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Contact info cards with 3D effect
    const contactCards = leftRef.current?.querySelectorAll(".contact-info-card");
    if (contactCards) {
      gsap.set(contactCards, { opacity: 0, x: -60, scale: 0.8 });
      gsap.to(contactCards, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.8)',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Form card with flip animation
    const formCard = sectionRef.current?.querySelector(".contact-form-card");
    if (formCard) {
      gsap.set(formCard, { opacity: 0, y: 100, scale: 0.9 });
      gsap.to(formCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Form fields with staggered entrance
    const formFields = sectionRef.current?.querySelectorAll(".form-field");
    if (formFields) {
      gsap.set(formFields, { opacity: 0, y: 40, x: -20 });
      gsap.to(formFields, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Submit button with elastic effect
    const submitBtn = sectionRef.current?.querySelector(".submit-btn");
    if (submitBtn) {
      gsap.set(submitBtn, { opacity: 0, scale: 0.5, rotation: -180 });
      gsap.to(submitBtn, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.0,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Contact card hover effects
    const contactCardsHover = sectionRef.current?.querySelectorAll(".contact-info-card");
    contactCardsHover?.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.08,
          x: 10,
          y: -5,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card, {
          boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(card, {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      // Shake animation with GSAP
      gsap.to(formRef.current, {
        x: [-10, 10, -8, 8, -4, 4, 0],
        duration: 0.45,
        ease: 'power2.inOut'
      });
      return;
    }
    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;

      // Initialize EmailJS with public key from environment
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Portfolio Contact Form Submission",
          message: formData.message,
          reply_to: formData.email,
          to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL
        }
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Success animation with GSAP
      gsap.to(formRef.current, {
        scale: [1, 1.02, 1],
        duration: 0.5,
        ease: 'power2.out'
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: "var(--bg-primary)" }}
    >
      <style>{`
        /* ── dot pattern ── */
        .contact-dot-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* ── layout grid ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }

        /* ── info cards ── */
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }
        .contact-info-card:hover {
          transform: translateX(6px);
        }

        /* icon box */
        .contact-icon-box {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: box-shadow 0.3s ease;
        }

        /* availability */
        .avail-card {
          padding: 20px 22px;
          border-radius: 16px;
          border: 1px solid rgba(16,185,129,0.2);
          background: rgba(16,185,129,0.05);
          margin-top: 10px;
        }

        /* ── form card ── */
        .contact-form-card {
          padding: 36px 36px 32px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 600px) { .contact-form-card { padding: 24px 18px; } }

        /* top glow strip on form */
        .form-glow-strip {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff 40%, #8b5cf6 70%, transparent);
        }

        /* form label */
        .form-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #606080;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* input row */
        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 560px) { .input-row { grid-template-columns: 1fr; } }

        /* submit btn */
        .submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          color: #000;
          font-weight: 800;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          animation: continuousGlow 3s infinite ease-in-out;
          position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #8b5cf6, #00d4ff);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,212,255,0.35); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
        .submit-btn span { position: relative; z-index: 1; }

        /* status messages */
        .status-msg {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 12px;
          font-size: 13px; font-weight: 500;
        }

        /* spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(0,0,0,0.25);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          position: relative; z-index: 1;
        }
      `}</style>

      {/* Background */}
      <div className="contact-dot-bg" aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "-5%",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag reveal" style={{ margin: "0 auto 20px" }}>
            Get In Touch
          </div>
          <h2
            className="section-title reveal reveal-delay-1"
            style={{ textAlign: "center" }}
          >
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-2"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "480px" }}
          >
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div className="contact-grid">
            {/* ── LEFT: Contact info ── */}
            <div
              ref={leftRef}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Section label */}
              <p
                style={{
                  textAlign: "left",
                  margin: "0 0 4px 0",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#606080",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Contact Details
              </p>

              {/* Info cards */}
              {contactItems.map((item) => {
                const Tag = item.href ? "a" : "div";
                const linkProps = item.href
                  ? {
                      href: item.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <Tag
                    key={item.label}
                    {...linkProps}
                    className="contact-info-card"
                    style={{ opacity: 0 }} /* GSAP animates from 0 */
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `rgba(${item.accentRgb},0.07)`;
                      e.currentTarget.style.borderColor = `rgba(${item.accentRgb},0.25)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="contact-icon-box"
                      style={{
                        background: `rgba(${item.accentRgb},0.1)`,
                        border: `1px solid rgba(${item.accentRgb},0.2)`,
                        color: item.accent,
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#606080",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          marginBottom: "3px",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: item.accent,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>

                    {/* Arrow for links */}
                    {item.href && (
                      <div
                        style={{
                          marginLeft: "auto",
                          color: `rgba(${item.accentRgb},0.5)`,
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
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
                      </div>
                    )}
                  </Tag>
                );
              })}

              {/* Availability */}
              <div
                className="avail-card contact-info-card"
                style={{ opacity: 0, marginTop: "4px", cursor: "default" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(16,185,129,0.09)";
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16,185,129,0.05)";
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.2)";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    flexShrink: 0,
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
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
                  <style>{`@keyframes ping { 75%,100%{transform:scale(2);opacity:0} }`}</style>
                  <span
                    style={{
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
                      marginBottom: "3px",
                    }}
                  >
                    Available for new projects
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12px",
                      color: "#606080",
                    }}
                  >
                    <FaClock size={11} />
                    Usually responds within 24 hours
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="contact-form-card reveal reveal-delay-2">
              {/* top glow line */}
              <div className="form-glow-strip" />

              {/* Form header */}
              <div style={{ marginBottom: "28px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#f0f0f5",
                    marginBottom: "6px",
                    background: "none",
                    WebkitTextFillColor: "#f0f0f5",
                  }}
                >
                  Send a Message
                </h3>
                <p
                  style={{
                    textAlign: "left",
                    margin: 0,
                    fontSize: "14px",
                    color: "#a0a0b5",
                  }}
                >
                  Fill out the form and I&apos;ll get back to you as soon as
                  possible.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {/* Name + Email */}
                <div className="input-row">
                  <div>
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="contact-input"
                      style={{ width: "100%" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="contact-input"
                      style={{ width: "100%" }}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Just saying hi..."
                    className="contact-input"
                    style={{ width: "100%" }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    rows={6}
                    className="contact-input"
                    style={{ width: "100%", resize: "none" }}
                    required
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <div
                    className="status-msg"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.22)",
                      color: "#10b981",
                    }}
                  >
                    <FaCheckCircle size={18} />
                    <span>
                      Message sent! I&apos;ll respond within 24 hours.
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div
                    className="status-msg"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      color: "#ef4444",
                    }}
                  >
                    <span>⚠️</span>
                    <span>
                      Something went wrong. Email me directly at
                      haquerahin743@gmail.com
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="submit-btn"
                >
                  {status === "sending" ? (
                    <>
                      <div className="spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane
                        size={14}
                        style={{ position: "relative", zIndex: 1 }}
                      />
                    </>
                  )}
                </button>

                {/* Disclaimer */}
                <p
                  style={{
                    textAlign: "center",
                    margin: 0,
                    fontSize: "12px",
                    color: "#606080",
                  }}
                >
                  Your information is safe and will never be shared.
                </p>
              </form>

              {/* Corner glow blob */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-30px",
                  right: "-30px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
                  filter: "blur(30px)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
