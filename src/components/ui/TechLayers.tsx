'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layers,
  Cpu,
  Github,
  Braces,
  Zap,
  Server,
  AppWindow,
  LucideIcon
} from 'lucide-react';

interface TechLayer {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  shadowColor: string;
  techs: string[];
  highlight: string;
  icons: { Icon: LucideIcon; name: string }[];
}

const layersData: TechLayer[] = [
  {
    id: 4,
    name: "PWA & Interface Layer",
    subtitle: "Frontend Architecture",
    color: "from-purple-500 to-indigo-600",
    shadowColor: "rgba(139,92,246,0.3)",
    techs: ["React.js", "Vue.js", "Ionic", "Next.js"],
    highlight: "Developed OMS applications with React and Ionic for critical retail commerce operations.",
    icons: [
      { Icon: Code2, name: "React" },
      { Icon: AppWindow, name: "PWA" }
    ]
  },
  {
    id: 3,
    name: "State & Logic Engine",
    subtitle: "Data Flow & Control",
    color: "from-cyan-500 to-blue-600",
    shadowColor: "rgba(6,182,212,0.3)",
    techs: ["Redux", "TypeScript", "JavaScript"],
    highlight: "Optimized state management systems and established modular Webpack architectures.",
    icons: [
      { Icon: Layers, name: "Redux" },
      { Icon: Braces, name: "TS/JS" }
    ]
  },
  {
    id: 2,
    name: "OMS & Commerce Logic",
    subtitle: "Business Workflows",
    color: "from-rose-500 to-pink-600",
    shadowColor: "rgba(244,63,94,0.3)",
    techs: ["Order Management", "Inventory", "Retail API"],
    highlight: "Managed inventory tracking workflows for 10k+ SKUs in high-volume environments.",
    icons: [
      { Icon: Cpu, name: "OMS" },
      { Icon: Zap, name: "Performance" }
    ]
  },
  {
    id: 1,
    name: "Infrastructure & Tools",
    subtitle: "CI/CD & Version Control",
    color: "from-emerald-500 to-teal-600",
    shadowColor: "rgba(16,185,129,0.3)",
    techs: ["Git & GitHub", "REST APIs", "Pipelines"],
    highlight: "Reviewed 300+ pull requests, maintaining production-grade codebase standards.",
    icons: [
      { Icon: Github, name: "Git" },
      { Icon: Server, name: "APIs" }
    ]
  }
];

export default function TechLayers() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<number>(4);

  return (
    <div className="relative w-full max-w-[500px] h-[540px] flex flex-col items-center justify-start text-left">
      {/* 3D Isometric Scene */}
      <div className="relative w-full h-[280px] flex items-center justify-center perspective-1000 overflow-visible">
        <div
          className="relative w-[240px] h-[240px] select-none"
          style={{
            transform: "rotateX(60deg) rotateZ(-45deg) translateY(-10px)",
            transformStyle: "preserve-3d"
          }}
        >
          {layersData.map((layer) => {
            const isHovered = hoveredLayer === layer.id;
            const isActive = activeLayer === layer.id;

            // Dynamic vertical position (Z-offset) based on stack expansion
            const hoverExpand = hoveredLayer !== null ? (hoveredLayer >= layer.id ? 20 : 0) : 0;
            const zOffset = (layer.id - 1) * 45 + hoverExpand + (isActive ? 12 : 0);

            return (
              <motion.div
                key={layer.id}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setActiveLayer(layer.id)}
                animate={{
                  z: zOffset,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 18
                }}
                className={`absolute inset-0 cursor-pointer rounded-2xl border transition-all duration-300 ${isActive
                    ? "border-accent bg-surface/90 shadow-[0_0_35px_var(--shadow-color)]"
                    : "border-foreground/10 bg-surface/50 hover:border-foreground/30"
                  }`}
                style={{
                  '--shadow-color': layer.shadowColor,
                  transformStyle: "preserve-3d",
                  zIndex: layer.id
                } as any}
              >
                {/* Platform Base Gradient border effect */}
                <div
                  className="absolute inset-0.5 rounded-xl bg-background/95 p-3 flex flex-col justify-between"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Layer indicator/tag */}
                  <div className="flex justify-between items-start" style={{ transformStyle: "preserve-3d" }}>
                    <span
                      className={`text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${layer.color}`}
                      style={{ transform: "translateZ(8px)" }}
                    >
                      LAYER 0{layer.id}
                    </span>
                    <span
                      className="text-[9px] font-mono text-muted-foreground"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      {layer.subtitle}
                    </span>
                  </div>

                  {/* Standing 3D Elements (Icons & Text) */}
                  <div className="flex gap-3 mt-auto" style={{ transformStyle: "preserve-3d" }}>
                    {layer.icons.map((item, iconIdx) => {
                      const Icon = item.Icon;
                      return (
                        <div
                          key={iconIdx}
                          className="flex flex-col items-center gap-0.5 group"
                          style={{
                            transform: "rotateZ(45deg) rotateX(-60deg) translateZ(25px)",
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${layer.color} text-white shadow-md transition-transform group-hover:scale-110 duration-300`}>
                            <Icon size={16} />
                          </div>
                          <span className="text-[8px] font-mono font-bold text-muted group-hover:text-foreground transition-colors mt-0.5">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shadow Ring underneath platform */}
                <div
                  className={`absolute inset-0 rounded-2xl filter blur-xl opacity-20 pointer-events-none transition-opacity duration-300 bg-gradient-to-br ${layer.color} ${isActive ? "opacity-35" : "opacity-0"
                    }`}
                  style={{ transform: "translateZ(-10px)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Dashboard (Flat 2D Card underneath the 3D stack) */}
      <div className="w-full px-4 mt-2">
        <AnimatePresence mode="wait">
          {layersData.map((layer) => {
            if (layer.id !== activeLayer) return null;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-4 rounded-xl bg-surface/30 backdrop-blur-md border border-foreground/5 relative overflow-hidden"
              >
                {/* Glow Accent corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${layer.color} opacity-[0.06] blur-2xl rounded-full`} />

                <h4 className="text-xs font-mono text-accent uppercase tracking-widest mb-0.5">{layer.subtitle}</h4>
                <h3 className="text-lg font-display font-medium text-foreground tracking-tight mb-2">
                  {layer.name}
                </h3>

                <p className="text-xs text-muted leading-relaxed mb-3">
                  {layer.highlight}
                </p>

                {/* Sub Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {layer.techs.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-foreground/5 text-muted border border-foreground/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hint/Helper Text */}
      <span className="text-[9px] font-mono text-muted uppercase tracking-widest mt-3 animate-pulse">
        Hover & Click layers to dissect tech ecosystem
      </span>
    </div>
  );
}
