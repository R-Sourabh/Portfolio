'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Cpu, Github, Folder } from 'lucide-react';

interface FocusArea {
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  color: string;
  icon: string;
  layerNum: string;
}

const focusAreas: FocusArea[] = [
  {
    title: "PWA & Interface Layer",
    subtitle: "Frontend Architecture",
    description: "Developed OMS applications using React.js, Vue.js, and Ionic for critical retail commerce and inventory operations.",
    tech: "React.js • Vue.js • Ionic • Next.js",
    color: "text-purple-500 bg-purple-500/10",
    icon: "code",
    layerNum: "L4"
  },
  {
    title: "State & Logic Engine",
    subtitle: "Data Flow & Control",
    description: "Optimized complex state management flows with Redux and established modular Webpack architectures.",
    tech: "Redux • TypeScript • JavaScript • HTML5/CSS3",
    color: "text-cyan-500 bg-cyan-500/10",
    icon: "layers",
    layerNum: "L3"
  },
  {
    title: "AI & Generative UI",
    subtitle: "Intelligent Interfaces",
    description: "Integrated Vercel AI SDK and Groq AI to build streaming Generative UI elements and agentic research workflows.",
    tech: "Vercel AI SDK • Groq AI • Tavily API • Next.js",
    color: "text-amber-500 bg-amber-500/10",
    icon: "cpu",
    layerNum: "L5"
  },
  {
    title: "Offline-First Data Sync",
    subtitle: "Storage & Concurrency",
    description: "Engineered offline-first store inventory count operations using IndexedDB and device locking heartbeats.",
    tech: "IndexedDB • Pinia • Service Workers",
    color: "text-blue-500 bg-blue-500/10",
    icon: "layers",
    layerNum: "L6"
  },
  {
    title: "Micro-Frontend Modules",
    subtitle: "Modular Systems",
    description: "Architected Webpack Module Federation for Order Management Systems to support runtime module loading.",
    tech: "Module Federation • Vue.js • Web Components",
    color: "text-pink-500 bg-pink-500/10",
    icon: "code",
    layerNum: "L7"
  },
  {
    title: "DXP Component Libraries",
    subtitle: "Reusable Utilities",
    description: "Created and compiled timezone switcher (Luxon) and localization (i18n) packages distributed via NPM registry.",
    tech: "Rollup • Luxon • i18n • Vue/Ionic",
    color: "text-violet-500 bg-violet-500/10",
    icon: "folder",
    layerNum: "L8"
  },
  {
    title: "OMS & Commerce Logic",
    subtitle: "Business Workflows",
    description: "Managed inventory tracking workflows for 10k+ SKUs and retail operations in high-volume, critical eCommerce systems.",
    tech: "Order Management • Inventory • Retail API",
    color: "text-rose-500 bg-rose-500/10",
    icon: "cpu",
    layerNum: "L2"
  },
  {
    title: "Infrastructure & Tools",
    subtitle: "CI/CD & Version Control",
    description: "Reviewed 300+ pull requests across frontend systems, maintaining production-grade code quality and system integrity.",
    tech: "Git & GitHub • REST APIs • Build Pipelines",
    color: "text-emerald-500 bg-emerald-500/10",
    icon: "github",
    layerNum: "L1"
  }
];

interface MiniProjectsProps {
  onOpenModal: (data: any, type: string) => void;
}

const MiniProjects = ({ onOpenModal }: MiniProjectsProps) => {
  const topRow = [focusAreas[0], focusAreas[1], focusAreas[2], focusAreas[3]];
  const bottomRow = [focusAreas[4], focusAreas[5], focusAreas[6], focusAreas[7]];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code2 size={18} />;
      case 'layers': return <Layers size={18} />;
      case 'cpu': return <Cpu size={18} />;
      case 'github': return <Github size={18} />;
      default: return <Folder size={18} />;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-transparent overflow-hidden text-left border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Ecosystem Focus</h2>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-center">Architectural Focus Areas</h3>
        </div>

        <div className="flex flex-col gap-6 relative w-full overflow-hidden py-4 group">
          {/* Top Row: Moves Left */}
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 200, repeat: Infinity }}
            className="flex w-max group-hover:[animation-play-state:paused]"
          >
            {[...topRow, ...topRow, ...topRow, ...topRow, ...topRow, ...topRow].map((project, idx) => (
              <div
                key={`top-${idx}`}
                className="w-[300px] sm:w-[350px] md:w-[400px] mx-3 p-6 rounded-3xl bg-surface/80 border border-foreground/5 hover:border-accent/40 hover:-translate-y-2 hover:bg-surface/90 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${project.color}`}>
                        {getIcon(project.icon)}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase block">{project.subtitle}</span>
                        <h4 className="text-base font-bold text-foreground mt-0.5">{project.title}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-foreground/5 text-muted border border-foreground/5">
                      {project.layerNum}
                    </span>
                  </div>
                  <p className="text-sm text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-foreground/10 uppercase tracking-widest text-[10px] font-bold text-accent">
                  {project.tech}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Bottom Row: Moves Right */}
          <motion.div
            animate={{ x: ["-50%", 0] }}
            transition={{ ease: "linear", duration: 150, repeat: Infinity }}
            className="flex w-max group-hover:[animation-play-state:paused]"
          >
            {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((project, idx) => (
              <div
                key={`bottom-${idx}`}
                className="w-[300px] sm:w-[350px] md:w-[400px] mx-3 p-6 rounded-3xl bg-surface/80 border border-foreground/5 hover:border-accent/40 hover:-translate-y-2 hover:bg-surface/90 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${project.color}`}>
                        {getIcon(project.icon)}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase block">{project.subtitle}</span>
                        <h4 className="text-base font-bold text-foreground mt-0.5">{project.title}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-foreground/5 text-muted border border-foreground/5">
                      {project.layerNum}
                    </span>
                  </div>
                  <p className="text-sm text-muted mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-foreground/10 uppercase tracking-widest text-[10px] font-bold text-accent">
                  {project.tech}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Optional Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-16 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default MiniProjects;
