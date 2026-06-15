'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import Magnetic from '../ui/Magnetic';
import { ChevronRight, Download } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

const PerspectiveText = ({ text }: { text: string }) => {
  const chars = text.toUpperCase().split("");
  const total = chars.length;
  const centerX = (total - 1) / 2;

  return (
    <span className="inline-flex justify-center whitespace-nowrap gap-x-2 md:gap-x-3.5 py-1 px-4">
      {chars.map((char, index) => {
        const diff = index - centerX;
        const distanceToCenter = Math.abs(diff);
        const zIndex = Math.round((centerX - distanceToCenter) * 10);

        // Depth steps for the 3D extrusion
        const depth = 16;
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

        return (
          <span
            key={index}
            style={{
              textShadow: shadowString,
              transform: `rotate(${diff * 0.4}deg)`, // subtle fan-out rotation like varsity arches
              zIndex: zIndex,
            }}
            className="relative inline-block text-white font-black font-display tracking-tight uppercase select-none transition-transform hover:-translate-y-4 hover:scale-110 duration-200"
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

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
          <div className="mb-8 select-none">
            <span className="block text-xl md:text-2xl font-display font-medium text-muted-foreground tracking-widest uppercase mb-1">
              Hi, I&apos;m
            </span>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center py-6 w-full max-w-full overflow-hidden"
            >
              <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[95px] leading-none tracking-normal flex flex-col items-center gap-0 md:gap-1">
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
