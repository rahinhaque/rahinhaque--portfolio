"use client";

import { useEffect, useState } from "react";
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };

    // Ultra-fast, sleek pro loading animation
    gsap.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power3.inOut',
      delay: 0.2,
      snap: { value: 1 },
      onUpdate: function () {
        setProgress(Math.round(counter.value));
      },
      onComplete: function () {
        // Smooth slide up & fade out
        gsap.to(".loader-container", {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: function () {
            document.body.style.overflow = "auto";
            setLoading(false);
            if (onComplete) onComplete();
          },
        });
      },
    });
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div
      className="loader-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "var(--bg-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999999,
      }}
    >
      <div 
        className="neon-text"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          color: "var(--accent-cyan)",
          letterSpacing: "-2px",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
