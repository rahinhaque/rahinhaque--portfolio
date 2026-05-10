"use client";

import { useEffect, useState } from "react";
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animate welcome text
    gsap.to(".loader-welcome", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
      from: { opacity: 0, y: 20 }
    });

    // Animate progress counter from 0 to 100
    const counter = { value: 0 };

    gsap.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      delay: 0.6,
      snap: { value: 1 },
      onUpdate: function () {
        setProgress(Math.round(counter.value));
      },
      onComplete: function () {
        // Fade out loader
        gsap.to(".loader-container", {
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2,
          onComplete: function () {
            setLoading(false);
            if (onComplete) onComplete();
          },
        });
      },
    });

    // Animate progress bar
    gsap.to(".progress-bar-fill", {
      width: "100%",
      duration: 2.5,
      ease: 'power2.inOut',
      delay: 0.6,
      from: { width: "0%" }
    });

    // Animate loader dots
    gsap.to(".loader-dot", {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      from: { scale: 0.5, opacity: 0.3 }
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
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .loader-welcome {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 40px;
          animation: float 3s ease-in-out infinite;
        }
        
        .progress-container {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d4ff, #8b5cf6);
          border-radius: 2px;
        }
        
        .progress-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: #a0a0b5;
          margin-bottom: 30px;
        }
        
        .loader-dots {
          display: flex;
          gap: 8px;
        }
        
        .loader-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #00d4ff, #8b5cf6);
          border-radius: 50%;
        }
      `}</style>

      <div className="loader-welcome">Welcome</div>

      <div className="progress-container">
        <div className="progress-bar-fill" style={{ width: "0%" }}></div>
      </div>

      <div className="progress-text">{progress}%</div>

      <div className="loader-dots">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );
}
