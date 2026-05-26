'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const animationRef = useRef(null);
  
  const stateRef = useRef({
    isHovering: false,
    isVisible: false,
    mousePos: { x: 0, y: 0 },
    ringPos: { x: 0, y: 0 },
    previousMousePos: { x: 0, y: 0 }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable custom cursor on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      container.style.display = 'none';
      return;
    }

    const handleMouseMove = (e) => {
      stateRef.current.mousePos = { x: e.clientX, y: e.clientY };
      if (!stateRef.current.isVisible) stateRef.current.isVisible = true;
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('active');
    };
    
    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('active');
    };

    const handleMouseEnter = () => { stateRef.current.isVisible = true; };
    const handleMouseLeave = () => { stateRef.current.isVisible = false; };

    // Track interactive elements to trigger hover state
    const hoverableSelectors = 'a, button, input, textarea, [data-hoverable], .glass-card, .glass-card-premium, .tech-badge, .project-card';
    
    const handleMouseOver = (e) => {
      if (e.target.closest(hoverableSelectors)) {
        stateRef.current.isHovering = true;
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(hoverableSelectors)) {
        stateRef.current.isHovering = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let initialized = false;
    const ringLerpFactor = 0.15; // Smooth spring physics for the outer ring

    const animate = () => {
      const state = stateRef.current;
      if (cursorRef.current && dotRef.current) {
        
        // Snap to mouse on first movement
        if (!initialized && state.isVisible) {
          state.ringPos = { ...state.mousePos };
          initialized = true;
        }

        // Calculate frame velocity
        const dx = state.mousePos.x - state.previousMousePos.x;
        const dy = state.mousePos.y - state.previousMousePos.y;
        state.previousMousePos = { ...state.mousePos };

        // Lerp the outer ring towards the mouse
        state.ringPos = {
          x: state.ringPos.x + (state.mousePos.x - state.ringPos.x) * ringLerpFactor,
          y: state.ringPos.y + (state.mousePos.y - state.ringPos.y) * ringLerpFactor,
        };

        const cursor = cursorRef.current;
        const dot = dotRef.current;

        // Calculate distance (speed proxy) and angle for the stretching effect
        const distance = Math.sqrt(
          Math.pow(state.mousePos.x - state.ringPos.x, 2) + 
          Math.pow(state.mousePos.y - state.ringPos.y, 2)
        );
        const angle = Math.atan2(
          state.mousePos.y - state.ringPos.y, 
          state.mousePos.x - state.ringPos.x
        ) * 180 / Math.PI;

        // Dynamically stretch ring based on velocity, or expand uniformly if hovering
        const scaleX = state.isHovering ? 2.5 : 1 + Math.min(distance * 0.02, 1);
        const scaleY = state.isHovering ? 2.5 : 1 - Math.min(distance * 0.005, 0.3);

        // Immediate dot position
        dot.style.transform = `translate3d(calc(${state.mousePos.x}px - 50%), calc(${state.mousePos.y}px - 50%), 0)`;
        
        // Physics ring position, rotation, and scale
        cursor.style.transform = `translate3d(calc(${state.ringPos.x}px - 50%), calc(${state.ringPos.y}px - 50%), 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
        
        // Visibility transitions
        cursor.style.opacity = state.isVisible ? (state.isHovering ? '0.8' : '1') : '0';
        dot.style.opacity = state.isVisible && !state.isHovering ? '1' : '0';
        
        if (state.isHovering) {
          cursor.classList.add('hover');
        } else {
          cursor.classList.remove('hover');
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="custom-cursor-container">
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}