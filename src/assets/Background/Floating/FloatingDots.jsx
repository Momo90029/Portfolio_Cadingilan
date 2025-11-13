import React, { useEffect, useRef } from "react";
import "./FloatingDots.css";

const FloatingDots = ({ dotCount = 400 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";

      const size = 1 + Math.random() * 2; // very small dots
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.opacity = `${0.2 + Math.random() * 0.6}`;
      dot.style.animationDuration = `${10 + Math.random() * 20}s`;
      dot.style.animationDelay = `${Math.random() * 10}s`;

      container.appendChild(dot);
      dots.push(dot);
    }

    return () => dots.forEach((d) => d.remove());
  }, [dotCount]);

  return <div className="floating-dots-container" ref={containerRef} aria-hidden="true" />;
};

export default FloatingDots;
