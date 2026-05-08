"use client";

import { useEffect, useState } from "react";
import anime from 'animejs';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animate welcome text
    anime({
      targets: ".loader-welcome",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: "easeOutExpo",
      delay: 300,
    });

    // Animate progress counter from 0 to 100
    const counter = {
      value: 0,
    };

    anime({
      targets: counter,
      value: 100,
      duration: 2500,
      easing: "easeInOutCubic",
      delay: 600,
      round: 1,
      update: function () {
        setProgress(counter.value);
      },
      complete: function () {
        // Fade out loader
        anime({
          targets: ".loader-container",
          opacity: 0,
          duration: 600,
          easing: "easeOutExpo",
          delay: 200,
          complete: function () {
            setLoading(false);
            if (onComplete) onComplete();
          },
        });
      },
    });

    // Animate progress bar
    anime({
      targets: ".progress-bar-fill",
      width: ["0%", "100%"],
      duration: 2500,
      easing: "easeInOutCubic",
      delay: 600,
    });

    // Animate loader dots
    anime({
      targets: ".loader-dot",
      scale: [0.5, 1],
      opacity: [0.3, 1],
      duration: 600,
      delay: anime.stagger(100),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
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
