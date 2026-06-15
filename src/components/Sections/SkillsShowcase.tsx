'use client';

import React from 'react';
import SkillsStack from '../ui/SkillsStack';
import { motion } from 'framer-motion';

interface SkillsShowcaseProps {
  onOpenModal: (data: any, type: string) => void;
}

const SkillsShowcase = ({ onOpenModal }: SkillsShowcaseProps) => {
  return (
    <section id="skills" className="relative min-h-screen py-20 md:py-28 flex flex-col justify-center overflow-hidden bg-background">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_60%)] pointer-events-none" />

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col pt-6 lg:pt-0">
        
        {/* 2-Column Content Layout */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12 lg:gap-8">
          
          {/* Left Side: Skills Text Block */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-muted">Technical Arsenal</h4>
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground leading-tight">
                AI, <span className="text-accent font-bold">Frontend</span> & Beyond
              </div>
              <p className="mt-4 text-sm lg:text-base font-bold text-accent uppercase tracking-widest mb-6">
                The Technologies Behind My Work
              </p>
              <p className="text-base md:text-base font-semibold text-muted leading-relaxed">
                Combining modern frontend frameworks, backend services, AI tooling, and scalable architectures to build intelligent, performant, and production-ready applications.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Skills Stacked Cards */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] scale-95 md:scale-100">
              <SkillsStack onOpenModal={onOpenModal} />
            </div>
          </div>

        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-[0.02] pointer-events-none" />
    </section>
  );
};

export default SkillsShowcase;
