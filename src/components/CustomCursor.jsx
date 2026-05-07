'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const animationRef = useRef(null);
  const stateRef = useRef({
    isHovering: false,
    isVisible: true,
    mousePos: { x: 0, y: 0 },
    dotPos: { x: 0, y: 0 },
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if device supports hover (not touch device)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      container.style.display = 'none';
      return;
    }

    const handleMouseMove = (e) => {
      stateRef.current.mousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => { stateRef.current.isHovering = true; };
    const handleMouseUp = () => { stateRef.current.isHovering = false; };

    const handleMouseEnter = () => { stateRef.current.isVisible = true; };
    const handleMouseLeave = () => { stateRef.current.isVisible = false; };

    // Track hoverable elements
    const hoverableSelectors = 'a, button, input, textarea, [data-hoverable], .glass-card, .tech-badge, .project-card';
    
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
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Animation loop
    const dotLerpFactor = 0.4;

    const animate = () => {
      const state = stateRef.current;
      if (cursorRef.current && dotRef.current) {
        // Lerp dot position
        state.dotPos = {
          x: state.dotPos.x + (state.mousePos.x - state.dotPos.x) * dotLerpFactor,
          y: state.dotPos.y + (state.mousePos.y - state.dotPos.y) * dotLerpFactor,
        };

        const cursor = cursorRef.current;
        const dot = dotRef.current;

        // Update cursor ring
        cursor.style.transform = `translate(${state.mousePos.x - 10}px, ${state.mousePos.y - 10}px)`;
        cursor.style.opacity = state.isVisible ? '1' : '0';
        
        if (state.isHovering) {
          cursor.classList.add('hover');
        } else {
          cursor.classList.remove('hover');
        }

        // Update center dot
        dot.style.transform = `translate(${state.dotPos.x - 2}px, ${state.dotPos.y - 2}px)`;
        dot.style.opacity = state.isVisible ? '1' : '0';
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="custom-cursor-container">
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}