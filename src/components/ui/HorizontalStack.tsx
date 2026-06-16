'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { projects, Project } from '../../data/portfolio';
import { Github, ArrowRight } from 'lucide-react';

interface HorizontalStackProps {
  onOpenModal: (data: any, type: string) => void;
}

const HorizontalStack = ({ onOpenModal }: HorizontalStackProps) => {
  const categoryOrder = ["Web Development", "PWA & Hybrid Apps", "Frontend Architecture"];
  const allProjects = categoryOrder
    .map(cat => projects[cat])
    .filter(Boolean)
    .flat()
    .reverse();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center pt-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsStackHovered(true)}
      onMouseLeave={() => { 
        mouseX.set(0.5); 
        mouseY.set(0.5); 
        setIsStackHovered(false); 
      }}
    >
      <div className="relative w-[350px] h-[450px] flex items-center justify-center">
        {allProjects.map((project, index) => (
          <Card 
            key={project.id} 
            index={index} 
            total={allProjects.length}
            project={project}
            mouseX={smoothX}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            onOpenModal={onOpenModal}
            isStackHovered={isStackHovered}
          />
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  index: number;
  total: number;
  project: Project;
  mouseX: MotionValue<number>;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  onOpenModal: (data: any, type: string) => void;
  isStackHovered: boolean;
}

const Card = ({ index, total, project, mouseX, hoveredIndex, setHoveredIndex, onOpenModal, isStackHovered }: CardProps) => {
  const spreadFactor = useSpring(0, { damping: 20, stiffness: 100 });

  useEffect(() => {
    spreadFactor.set(isStackHovered ? 1 : 0);
  }, [isStackHovered, spreadFactor]);

  const spreadX = useTransform([spreadFactor, mouseX], ([factor, mX]) => {
    const f = factor as number;
    const x = mX as number;
    const collapsedX = (index - (total - 1) / 2) * 24;
    const expandedX = (index - (total - 1) / 2) * 85;
    const shiftX = (x - 0.5) * 80;
    return collapsedX + (expandedX + shiftX - collapsedX) * f;
  });

  const rotateZ = useTransform([spreadFactor, mouseX], ([factor, mX]) => {
    const f = factor as number;
    const x = mX as number;
    const collapsedRotate = (index - (total - 1) / 2) * 4;
    const expandedRotate = (x - 0.5) * 12 + (index - (total - 1) / 2) * 2;
    return collapsedRotate + (expandedRotate - collapsedRotate) * f;
  });

  const isCurrentHovered = hoveredIndex === index;
  const zIndex = isCurrentHovered ? 50 : index;

  return (
    <motion.div
      style={{
        x: spreadX,
        rotateZ: rotateZ,
        zIndex: zIndex,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: isCurrentHovered ? 1.04 : 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      onClick={() => onOpenModal(project, 'project')}
      className="absolute w-full h-[400px] bg-surface border border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden cursor-pointer p-8 flex flex-col justify-between group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
            <Github size={24} />
          </div>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full border border-foreground/5">
            {project.date}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="px-3 py-1 bg-foreground/5 border border-foreground/5 rounded-full text-[10px] font-bold text-muted uppercase">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-accent text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          View Details <ArrowRight size={16} />
        </div>
      </div>

      <div className="absolute bottom-6 right-8 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 p-[1px]">
            <div className="w-full h-full rounded-full bg-surface" />
          </div>
          <div className="text-[10px] font-bold text-muted">
            <div className="text-foreground">Sourabh R.</div>
            <div>HotWax Commerce</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalStack;
