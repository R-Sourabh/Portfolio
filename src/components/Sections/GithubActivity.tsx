'use client';

import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function GithubActivity() {
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');
  const years = ['last', 2026, 2025, 2024] as const;

  // Custom purple theme matching our HSL-tailored dark mode
  const calendarTheme = {
    light: ['#f4f4f5', '#d8b4fe', '#a855f7', '#7e22ce', '#581c87'],
    dark: ['#18181b', '#3b0764', '#581c87', '#9333ea', '#c084fc'],
  };

  return (
    <section id="github-activity" className="py-24 md:py-32 bg-transparent relative overflow-hidden text-left border-t border-foreground/5">
      {/* Decorative radial gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">Open Source</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-4">
              GitHub <span className="text-muted italic">Contributions</span>
            </h3>
            <p className="text-base text-muted leading-relaxed font-semibold">
              Tracking my code commits, pull requests, and repository activity. Select a year to explore my timeline.
            </p>
          </motion.div>

          {/* Year Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 bg-surface/30 backdrop-blur-md p-1.5 rounded-2xl border border-foreground/5 self-start md:self-end"
          >
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedYear === y
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                    : 'text-muted hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {y === 'last' ? 'Latest' : y}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Calendar Card Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full p-6 md:p-8 bg-surface/30 backdrop-blur-2xl border border-foreground/5 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Top Panel */}
          <div className="w-full flex items-center justify-between mb-6 text-xs text-muted-foreground border-b border-foreground/5 pb-4">
            <div className="flex items-center gap-2">
              <Github size={16} className="text-muted" />
              <span className="font-mono font-bold uppercase tracking-widest text-[10px] text-muted">@R-Sourabh</span>
            </div>
            <div className="flex items-center gap-1.5 md:hidden text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent px-2 py-1 rounded-md animate-pulse">
              <span>Swipe to view full year</span>
            </div>
          </div>

          {/* Calendar Wrapper */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
            <div className="min-w-[780px] lg:min-w-0 w-full flex justify-center text-foreground font-mono">
              <GitHubCalendar
                username="R-Sourabh"
                year={selectedYear === 'last' ? undefined : selectedYear}
                theme={calendarTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
