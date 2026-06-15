'use client';

import React from 'react';
import { personalInfo } from '../../data/portfolio';
import Magnetic from '../ui/Magnetic';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 md:py-48 bg-background text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Connection</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Let&apos;s build <br /> <span className="text-gradient">something great.</span>
            </h3>
            <p className="text-lg max-w-md leading-relaxed">
              I&apos;m currently open to new opportunities and collaborations. Feel free to reach out via email or connect on social platforms.
            </p>
          </div>

          <div className="space-y-6">
            <Magnetic strength={0.2}>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center justify-between p-6 sm:p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 sm:gap-6 w-full overflow-hidden text-left">
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-muted uppercase tracking-wider mb-1">Email Me</h4>
                    <p className="text-sm sm:text-lg md:text-xl font-bold truncate">{personalInfo.email}</p>
                  </div>
                </div>
                <ArrowUpRight size={20} className="shrink-0 text-muted group-hover:text-accent group-hover:rotate-45 transition-all ml-2 sm:w-6 sm:h-6" />
              </a>
            </Magnetic>

            <div className="grid grid-cols-2 gap-6">
              <Magnetic strength={0.2}>
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/40 transition-all duration-300 text-left"
                >
                  <Github size={24} className="text-accent mb-4" />
                  <h4 className="text-sm font-bold text-muted uppercase tracking-wider">GitHub</h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold">Follow</span>
                    <ArrowUpRight size={20} className="text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                  </div>
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-8 rounded-[2rem] bg-foreground/[0.03] border border-foreground/5 hover:border-accent/40 transition-all duration-300 text-left"
                >
                  <Linkedin size={24} className="text-accent mb-4" />
                  <h4 className="text-sm font-bold text-muted uppercase tracking-wider">LinkedIn</h4>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold">Connect</span>
                    <ArrowUpRight size={20} className="text-muted group-hover:text-accent group-hover:rotate-45 transition-all" />
                  </div>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
