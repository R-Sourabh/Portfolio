'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import SkillStackV2 from '../ui/SkillStackV2';

const About = () => {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-background overflow-hidden transition-colors duration-500">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/15 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Left Side: About Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col py-10"
          >
            <div className="text-left">
              <h2 className="text-xs font-bold text-accent uppercase tracking-[0.4em] mb-3">The Developer</h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-6 text-foreground leading-[1.3] tracking-tight transition-colors duration-500">
                Scalable Systems. <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8">Intelligent</span> Experiences
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block ml-3 text-[#0077B5] hover:text-[#0077B5]/80 transition-all group align-middle"
                >
                  <Linkedin size={22} className="group-hover:scale-110 transition-transform mb-1" />
                </a>
              </h3>

              <div className="space-y-6 max-w-xl">
                {personalInfo.about.split('\n\n').map((para, idx) => {
                  if (para.startsWith('What I Specialize In')) {
                    const lines = para.split('\n');
                    const title = lines[0];
                    const items = lines.slice(1);
                    return (
                      <div key={idx} className="pt-4 border-t border-foreground/5">
                        <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">{title}</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg md:text-lg font-semibold text-muted-foreground">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx} className="group flex items-start gap-2.5 hover:text-foreground transition-all duration-200 cursor-default">
                              <span className="relative flex h-2 w-2 mt-[7px] flex-shrink-0">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-200"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent/70 group-hover:bg-accent transition-colors duration-200 shadow-sm group-hover:shadow-[0_0_8px_hsl(var(--accent))]"></span>
                              </span>
                              <span className="transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out">{item.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm md:text-base leading-relaxed text-muted-foreground font-medium transition-colors duration-500">
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Skills Slider with Dot Grid Layer behind it */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end py-10"
          >
            {/* Dot Grid Layer behind slider */}
            <div
              className="absolute inset-0 -m-12 opacity-[0.15] dark:opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, hsl(var(--accent)) 1px, transparent 0)`,
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
              }}
            />

            <div className="w-full max-w-[400px] relative z-10">
              <SkillStackV2 />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
