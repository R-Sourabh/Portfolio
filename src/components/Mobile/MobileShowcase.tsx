'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '../../data/portfolio';
import { ArrowRight, Layers, Hand } from 'lucide-react';

interface MobileShowcaseProps {
  onOpenModal: (data: any, type: string) => void;
}

export default function MobileShowcase({ onOpenModal }: MobileShowcaseProps) {
  const displayOrder = ["Web Development", "PWA & Hybrid Apps", "Frontend Architecture"];
  
  // Initialize with all projects in the correct order
  const [cards, setCards] = useState<Project[]>(() => {
    const list: Project[] = [];
    displayOrder.forEach(cat => {
      if (projects[cat]) {
        list.push(...projects[cat]);
      }
    });
    return [...list]; // Do not reverse, so NutShell AI is at index 0 (top of stack)
  });

  // Cycle the top card to the back
  const cycleCards = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const frontCard = newCards.shift();
      if (frontCard) {
        newCards.push(frontCard);
      }
      return newCards;
    });
  };

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden text-left">
      <div className="px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">Featured Projects</span>
          </div>
          <div className="flex justify-between items-end gap-4">
            <h3 className="text-2xl sm:text-3xl font-display font-medium leading-tight">
              Engineering <br />
              <span className="text-accent">Modern Product</span> <br />
              <span className="text-muted italic">Experiences</span>
            </h3>
            <div className="flex items-center gap-2 text-accent/70 text-[10px] font-mono uppercase tracking-widest bg-accent/10 px-3 py-1.5 rounded-full mb-1.5 flex-shrink-0">
              <Hand size={12} /> Swipe
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Stack Layout */}
      <div className="w-full h-[420px] relative flex justify-center items-start mt-4">
        <AnimatePresence mode="popLayout">
          {cards.map((project, i) => {
            const isFront = i === 0;
            // Only render top 4 cards for performance
            if (i > 3) return null;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ 
                  x: 0, // Ensure swiped cards return to center when cycled
                  opacity: 1 - (i * 0.25), // Fades out the further back it is
                  y: i * 24, // Moves down to create vertical stacking
                  scale: 1 - (i * 0.06), // Shrinks to create depth
                  zIndex: 50 - i, // Proper CSS stacking order
                }}
                exit={{ opacity: 0, x: -200, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
                    cycleCards();
                  }
                }}
                className={`absolute w-[300px] h-[380px] bg-surface/90 backdrop-blur-2xl border border-foreground/10 rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8 text-left">
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.03] flex items-center justify-center text-foreground/80 border border-foreground/5 shadow-inner">
                      <Layers size={18} strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-muted uppercase tracking-widest pt-2">
                      {project.date}
                    </span>
                  </div>
                  <h4 className="text-xl font-display font-bold mb-2 leading-tight text-foreground/90 text-left">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3 font-medium text-left">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-foreground/5 flex flex-col gap-4 text-left">
                  <div className="flex flex-wrap gap-2 overflow-hidden h-6">
                    {project.tech.slice(0,3).map((t) => (
                      <span key={t} className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider bg-background px-2 py-0.5 rounded-md border border-foreground/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {isFront && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(project, 'project');
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20 active:scale-95 transition-transform"
                    >
                      View Details <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
