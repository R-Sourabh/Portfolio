'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Check } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const resumeOptions = [
    { label: "Frontend Developer", file: "/Resume.pdf" },
    { label: "Full Stack Developer", file: "/Resume.pdf" }
  ];

  const handleCardClick = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    if (selectedIdx !== null) return; // already selected
    setSelectedIdx(i);

    // Trigger actual download after the animation plays
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = resumeOptions[i].file;
      link.download = `Sourabh_Raghuwanshi_${resumeOptions[i].label.replace(' ', '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);

    // Close modal after download + brief pause
    setTimeout(() => {
      setSelectedIdx(null);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedIdx(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-4 overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-all z-[110]"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center hide-scrollbar">
            <motion.h2 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-6xl font-display font-bold text-center mb-6 md:mb-16 mt-0 text-gradient"
            >
              Explore <span className="text-accent">My Work</span>
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 w-full perspective-1000">
              {resumeOptions.map((opt, i) => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const rotation = i === 0 ? -4 : 4; 
                const yOffset = 0;
                const isSelected = selectedIdx === i;
                const isOther = selectedIdx !== null && selectedIdx !== i;

                const getAnimateState = () => {
                  if (isSelected) {
                    return { 
                      y: 0, 
                      opacity: 1, 
                      rotateZ: 0, 
                      scale: isMobile ? 1.15 : 1.1,
                      zIndex: 50 
                    };
                  }
                  if (isOther) {
                    return { 
                      y: 300, 
                      opacity: 0, 
                      rotateZ: rotation * 2, 
                      scale: 0.7,
                      zIndex: 1 
                    };
                  }
                  return { 
                    y: yOffset, 
                    opacity: 1, 
                    rotateZ: rotation, 
                    scale: 1,
                    zIndex: 10 
                  };
                };
                
                return (
                  <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0, rotateZ: 0, scale: 1 }}
                    animate={getAnimateState()}
                    exit={{ y: "100vh", opacity: 0, rotateZ: 0 }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 100, 
                      delay: selectedIdx !== null ? 0 : i * 0.15 
                    }}
                    whileHover={selectedIdx === null ? { 
                      scale: 1.05, 
                      rotateZ: 0, 
                      y: -10, 
                      borderColor: 'rgba(139, 92, 246, 0.8)',
                      boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)',
                      transition: { type: 'tween', ease: 'easeOut', duration: 0.15 }
                    } : {}}
                    onClick={(e) => handleCardClick(e, i)}
                    className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[3/4] rounded-3xl backdrop-blur-xl border-2 border-dashed border-accent/20 bg-surface/80 flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-150 z-30 pointer-events-auto group"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 text-center">
                      <AnimatePresence mode="wait">
                        {isSelected ? (
                          <motion.div
                            key="downloading"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="flex flex-col items-center justify-center h-full w-full py-4"
                          >
                            <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                              <Check size={28} />
                            </div>
                            <h3 className="text-base font-bold text-accent mb-1 leading-tight">Downloading...</h3>
                            <p className="text-muted text-[10px] font-mono uppercase tracking-widest">{opt.label}</p>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center justify-between h-full w-full">
                            <div className="flex flex-col items-center mt-2 w-full">
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 transition-all duration-150 group-hover:scale-115 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                                <Download size={28} />
                              </div>
                              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent mb-2">Resume Type</h4>
                              <h3 className="text-base sm:text-lg md:text-2xl font-bold text-foreground leading-tight px-1">{opt.label}</h3>
                            </div>
                            <div className="pt-4 border-t border-foreground/5 w-full">
                              <p className="text-[9px] sm:text-[10px] font-mono text-muted uppercase tracking-wider font-bold">PDF</p>
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
