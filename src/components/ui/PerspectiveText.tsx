'use client';

import React, { useState } from 'react';

interface PerspectiveTextProps {
  text: string;
}

const PerspectiveText = ({ text }: PerspectiveTextProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chars = text.toUpperCase().split("");
  const total = chars.length;
  const centerX = (total - 1) / 2;

  return (
    <span className="inline-flex justify-center whitespace-nowrap gap-x-2 md:gap-x-3.5 py-1 px-4">
      {chars.map((char, index) => {
        const diff = index - centerX;
        const distanceToCenter = Math.abs(diff);

        // Calculate dynamic depth and transform variables based on hover state
        let depth = 16;
        let liftY = 0;
        let scale = 1;

        if (hoveredIndex !== null) {
          const distToHover = Math.abs(index - hoveredIndex);
          if (distToHover === 0) {
            depth = 32;     // Double the depth to unfold the 3D block
            liftY = -24;    // Move up significantly
            scale = 1.15;   // Scale up
          } else if (distToHover === 1) {
            depth = 24;     // Medium unfold for direct neighbors
            liftY = -12;
            scale = 1.07;
          } else if (distToHover === 2) {
            depth = 19;     // Subtle unfold for secondary neighbors
            liftY = -5;
            scale = 1.02;
          } else {
            depth = 12;     // Subtly contract distant letters to make the hovered one pop more
            liftY = 2;
          }
        }

        const xFactor = 0.45; // control horizontal convergence rate
        const yFactor = 0.9;  // control vertical extrusion height

        let shadowString = "";

        // 1. First, create a tight outline around the letter itself so it is crisp
        shadowString += `-1.5px -1.5px 0 var(--retro-outline-face), 1.5px -1.5px 0 var(--retro-outline-face), -1.5px 1.5px 0 var(--retro-outline-face), 1.5px 1.5px 0 var(--retro-outline-face)`;

        // 2. Then, build the 3D extrusion path pointing upwards and inwards towards the center
        for (let s = 1; s <= depth; s++) {
          const sx = (-diff * s * xFactor).toFixed(2);
          const sy = (-s * yFactor).toFixed(2);

          shadowString += `, ${sx}px ${sy}px 0 hsl(var(--accent))`;

          // Add an outer casing outline less frequently to keep the 3D block bright and prevent outline overlap
          if (s % 3 === 0 || s === depth) {
            shadowString += `, calc(${sx}px - 1.5px) calc(${sy}px - 1.5px) 0 var(--retro-outline-extrusion)`;
            shadowString += `, calc(${sx}px + 1.5px) calc(${sy}px - 1.5px) 0 var(--retro-outline-extrusion)`;
            shadowString += `, calc(${sx}px - 1.5px) calc(${sy}px + 1.5px) 0 var(--retro-outline-extrusion)`;
            shadowString += `, calc(${sx}px + 1.5px) calc(${sy}px + 1.5px) 0 var(--retro-outline-extrusion)`;
          }
        }

        // Add a final ambient drop shadow at the end
        const finalSx = (-diff * depth * xFactor).toFixed(2);
        const finalSy = (-depth * yFactor - 4).toFixed(2);
        shadowString += `, ${finalSx}px ${finalSy}px 12px rgba(0,0,0,0.5)`;

        // Elevate hovered elements to be rendered on top of neighbors
        const baseZIndex = Math.round((centerX - distanceToCenter) * 10);
        const zIndex = hoveredIndex !== null && Math.abs(index - hoveredIndex) <= 2
          ? baseZIndex + 100 - Math.abs(index - hoveredIndex) * 20
          : baseZIndex;

        return (
          <span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              textShadow: shadowString,
              transform: `translateY(${liftY}px) scale(${scale}) rotate(${diff * 0.4}deg)`,
              zIndex: zIndex,
              transition: 'text-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative inline-block text-white font-black font-display tracking-tight uppercase select-none cursor-pointer"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default PerspectiveText;
