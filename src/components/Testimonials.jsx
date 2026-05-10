"use client";

import { useEffect, useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaStar, FaLinkedin, FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    avatar: "SJ",
    rating: 5,
    testimonial: "Rahin is an exceptional developer with a keen eye for detail and a passion for creating beautiful, functional web applications. His expertise in React and Next.js is impressive, and he consistently delivers high-quality work on time.",
    linkedin: "https://linkedin.com/in/sarah-johnson",
    accent: "#00d4ff",
    accentRgb: "0,212,255",
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "Digital Innovations",
    avatar: "MC",
    rating: 5,
    testimonial: "Working with Rahin was a fantastic experience. He brought innovative solutions to complex problems and his code is always clean, well-documented, and maintainable. Highly recommend for any web development project!",
    github: "https://github.com/michaelchen",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
    featured: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    company: "Creative Studio",
    avatar: "ER",
    rating: 5,
    testimonial: "Rahin has an amazing ability to translate design concepts into pixel-perfect implementations. His attention to user experience and performance optimization makes him a valuable team member. A true professional!",
    linkedin: "https://linkedin.com/in/emily-rodriguez",
    accent: "#10b981",
    accentRgb: "16,185,129",
    featured: false,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Project Manager",
    company: "StartupHub",
    avatar: "DK",
    rating: 5,
    testimonial: "Rahin's technical skills are matched only by his communication and collaboration abilities. He's proactive, reliable, and always goes above and beyond to ensure project success. A pleasure to work with!",
    linkedin: "https://linkedin.com/in/david-kim",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    featured: false,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef(null);

  /* GSAP ScrollTrigger Animations for Testimonials section */
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

    // Testimonial cards with 3D cascade effect
    const testimonialCards = sectionRef.current?.querySelectorAll(".testimonial-card");
    if (testimonialCards) {
      gsap.set(testimonialCards, { opacity: 0, y: 100, scale: 0.8 });
      gsap.to(testimonialCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.8)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Rating stars with sparkle effect
    const ratingStars = sectionRef.current?.querySelectorAll(".rating-star");
    if (ratingStars) {
      gsap.set(ratingStars, { opacity: 0, scale: 0, rotation: -180 });
      gsap.to(ratingStars, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Avatar circles with rotation effect
    const avatars = sectionRef.current?.querySelectorAll(".testimonial-avatar");
    if (avatars) {
      gsap.set(avatars, { opacity: 0, scale: 0.5, rotation: -360 });
      gsap.to(avatars, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.8)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Auto-scroll animation for testimonials
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 3) {
      const track = trackRef.current;
      const cardWidth = 350;

      // Create infinite scroll effect with GSAP
      gsap.to(track, {
        x: -cardWidth * cards.length,
        duration: cards.length * 3,
        ease: 'none',
        repeat: -1
      });

      // Pause on hover
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.killTweensOf(track);
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(track, {
            x: -cardWidth * cards.length,
            duration: cards.length * 3,
            ease: 'none',
            repeat: -1
          });
        });
      });
    }

    // Card hover effects
    const cardsAll = document.querySelectorAll('.testimonial-card');
    cardsAll.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -8,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card, {
          boxShadow: '0 12px 40px rgba(0, 212, 255, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card, {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <style>{`
        /* testimonial background pattern */
        .testimonial-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0,212,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* testimonial track */
        .testimonial-track {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          will-change: transform;
        }

        /* testimonial card */
        .testimonial-card {
          flex: 0 0 350px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .testimonial-card:hover {
          border-color: rgba(0,212,255,0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* quote icon */
        .quote-icon {
          position: absolute;
          top: 20px;
          left: 20px;
          opacity: 0.1;
          font-size: 48px;
          color: var(--accent-color, #00d4ff);
        }

        /* avatar */
        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 16px;
          background: var(--avatar-bg, rgba(0,212,255,0.1));
          border: 2px solid var(--avatar-border, rgba(0,212,255,0.3));
          color: var(--avatar-color, #00d4ff);
        }

        /* content */
        .testimonial-content {
          font-size: 15px;
          line-height: 1.7;
          color: #a0a0b5;
          margin-bottom: 20px;
          font-style: italic;
        }

        /* author info */
        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .author-name {
          font-weight: 700;
          font-size: 16px;
          color: #f0f0f5;
        }

        .author-role {
          font-size: 13px;
          color: #a0a0b5;
          margin-top: 2px;
        }

        /* rating */
        .rating {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .rating-star {
          color: #fbbf24;
          font-size: 16px;
        }

        /* social links */
        .social-links {
          display: flex;
          gap: 8px;
        }

        .social-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #a0a0b5;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background: var(--accent-color, #00d4ff);
          border-color: var(--accent-color, #00d4ff);
          color: #000;
          transform: translateY(-2px);
        }

        /* featured badge */
        .featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          color: #000;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* responsive design */
        @media (max-width: 767px) {
          display: none;
        }
      `}</style>

      {/* Background pattern */}
      <div className="testimonial-bg" data-parallax="testimonial-bg" />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ margin: "0 auto 20px" }}>
            Client Testimonials
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            What <span className="gradient-text">People Say</span>
          </h2>
          <p
            className="section-subtitle reveal reveal-delay-1"
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}
          >
            Don't just take my word for it — here's what colleagues and clients have to say about working with me.
          </p>
        </div>

        {/* Testimonials Track */}
        <div className="testimonial-track" ref={trackRef}>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="testimonial-card"
              style={{
                '--accent-color': testimonial.accent,
                '--avatar-bg': `rgba(${testimonial.accentRgb}, 0.1)`,
                '--avatar-border': `rgba(${testimonial.accentRgb}, 0.3)`,
                '--avatar-color': testimonial.accent,
              }}
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="quote-icon" />

              {/* Featured Badge */}
              {testimonial.featured && (
                <div className="featured-badge">Featured</div>
              )}

              {/* Avatar */}
              <div className="testimonial-avatar">
                {testimonial.avatar}
              </div>

              {/* Rating */}
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="rating-star" />
                ))}
              </div>

              {/* Content */}
              <p className="testimonial-content">
                "{testimonial.testimonial}"
              </p>

              {/* Author Info */}
              <div className="testimonial-author">
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>

                {/* Social Links */}
                <div className="social-links">
                  {testimonial.linkedin && (
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}
                  {testimonial.github && (
                    <a
                      href={testimonial.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
