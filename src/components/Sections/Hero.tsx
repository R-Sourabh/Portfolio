'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import Magnetic from '../ui/Magnetic';
import { ChevronRight, Download } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

const PerspectiveText = ({ text }: { text: string }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
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

const Hero = ({ onOpenResumeModal }: HeroProps) => {
  const nameParts = personalInfo.name.toUpperCase().split(' ');
  const firstName = nameParts[0] || 'SOURABH';
  const lastName = nameParts.slice(1).join(' ') || 'RAGHUWANSHI';

  // 3D Parallax Tilt coordinates (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation values
  const springConfig = { stiffness: 100, damping: 20 };
  const rxSpring = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rySpring = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full border border-accent/20 mb-6">
            Available for new opportunities
          </span>
          <div className="mb-8 select-none perspective-1000">
            <span className="mb-8 block text-xl md:text-2xl font-display font-medium text-muted-foreground tracking-widest uppercase mb-1">
              Hi, I&apos;m
            </span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                rotateX: rxSpring,
                rotateY: rySpring,
                transformStyle: "preserve-3d",
              }}
              className="flex flex-col items-center justify-center py-6 w-full max-w-full"
            >
              <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[95px] leading-none tracking-normal flex flex-col items-center gap-0 md:gap-1" style={{ transform: "translateZ(50px)" }}>
                <PerspectiveText text={firstName} />
                <PerspectiveText text={lastName} />
              </h1>
            </motion.div>
          </div>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-tight px-6 py-4 border-l-4 border-accent bg-accent/5 italic rounded-r-2xl text-left">
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-50">
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
              >
                View My Work
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-8 py-4 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground rounded-full font-bold transition-all"
              >
                <Download size={18} />
                Download CV
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[30px] h-[50px] border-2 border-foreground/20 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
