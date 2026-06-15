'use client';

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences, Experience } from "../../data/portfolio";

interface MobileProjectPipelineProps {
  onOpenModal: (data: any, type: string) => void;
}

export default function MobileProjectPipeline({ onOpenModal }: MobileProjectPipelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden text-left">
      {/* Scroll Anchors for Deep-Linking on Mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {experiences.map((exp) => (
          <div 
            key={`anchor-${exp.company.toLowerCase().replace(/\s+/g, '-')}`} 
            id={exp.company.toLowerCase().replace(/\s+/g, '-')} 
            className="absolute left-0 w-full h-px"
            style={{ top: `${(exp.id - 1) * 33.3}%` }}
          />
        ))}
      </div>

      <div className="px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">Journey</span>
          </div>
          <h2 className="text-4xl font-display font-medium tracking-tighter leading-tight">
            Work <br />
            <span className="text-muted italic">Experience</span>
          </h2>
        </motion.div>
      </div>

      <div className="px-6 relative" ref={containerRef}>
        {/* Sleek Timeline Background Track */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-foreground/10 to-accent/0" />
        
        {/* Animated Timeline Fill */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute left-[23px] top-0 bottom-0 w-[3px] bg-accent shadow-[0_0_15px_rgba(139,92,246,0.8)] z-0 rounded-full" 
          id="experience-timeline"
        />

        <div className="space-y-16">
          {experiences.map((exp) => {
            const anchorId = exp.company.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={exp.id} className="relative z-10" id={`mobile-exp-${anchorId}`}>
                {/* Company Header */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 mb-8 pl-4 text-left"
                >
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-accent flex items-center justify-center absolute left-[-7px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground tracking-wide flex items-center gap-2">
                    <span className="text-lg">{exp.icon}</span> {exp.company}
                  </h3>
                </motion.div>

                {/* Card */}
                <div className="flex flex-col gap-6 pl-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    onClick={() => onOpenModal(exp, 'experience')}
                    className="group p-6 bg-surface/30 backdrop-blur-md border border-foreground/5 rounded-[1.5rem] active:scale-[0.98] transition-all cursor-pointer text-left"
                  >
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">{exp.duration}</span>
                      <h4 className="text-lg font-bold text-foreground/90 mb-1 leading-tight">{exp.role}</h4>
                      <p className="text-xs text-muted mb-3">{exp.location}</p>
                      <p className="text-sm text-muted/95 leading-relaxed">{exp.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 text-left">
                      {exp.tech.slice(0, 4).map((t, idx, arr) => (
                        <span key={t} className="text-[10px] font-mono font-medium text-muted uppercase">
                          {t} {idx !== arr.length - 1 && '·'}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
