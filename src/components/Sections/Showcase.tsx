'use client';

import React from 'react';
import HorizontalStack from '../ui/HorizontalStack';
import { motion } from 'framer-motion';

interface ShowcaseProps {
  onOpenModal: (data: any, type: string) => void;
}

const Showcase = ({ onOpenModal }: ShowcaseProps) => {
  return (
    <section id="projects" className="relative min-h-screen py-32 md:py-48 flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center relative z-10">

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          <div className="relative w-full lg:w-1/2 flex flex-col justify-center text-left">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-6">Featured Projects</h2>
            <h3 className="text-5xl md:text-7xl font-display font-medium mb-8 leading-[1.1]">
              Engineering <br />
              <span className="text-gradient">Modern Product</span> Experiences
            </h3>
            <p className="text-lg font-semibold text-muted max-w-md leading-relaxed">
              Exploring modern web development through enterprise applications, AI-powered tools, and user-focused product experiences built for real-world use.
            </p>
          </div>

          {/* Right Side: Horizontal Stack */}
          <div className="w-full lg:w-1/2 perspective-1000">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-end"
            >
              <div className="mb-12 text-right hidden lg:block">
                <h4 className="text-sm font-bold text-muted uppercase tracking-widest mb-4">Interactive Stack</h4>
                <p className="text-xs text-accent font-bold">MOVE CURSOR TO EXPLORE</p>
              </div>

              <div className="w-full">
                <HorizontalStack onOpenModal={onOpenModal} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Navigator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full relative z-20 text-center"
        >
          <span className="text-sm md:text-base font-bold text-muted uppercase tracking-[0.25em] whitespace-nowrap">Explore Experience:</span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { name: "Hotwax Commerce", id: "hotwax-commerce" },
              { name: "ZignEx", id: "zignex" },
              { name: "Persistent Systems", id: "persistent-systems" }
            ].map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group relative flex flex-col items-center"
              >
                <span className="text-sm md:text-lg font-display font-semibold text-muted group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
                  {cat.name}
                </span>
                <div className="w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 mt-2" />
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none" />
    </section>
  );
};

export default Showcase;
