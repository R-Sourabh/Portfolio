'use client';

import React from 'react';
import { personalInfo } from '../data/portfolio';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-foreground/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
        <p className="text-muted text-sm font-medium text-center md:text-left">
          © {new Date().getFullYear()} Designed & Developed by <span className="text-foreground">{personalInfo.name}</span>
        </p>
        <div className="flex gap-6 md:gap-8 items-center">
          {/* GitHub Link */}
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-accent transition-colors"
            title="GitHub"
          >
            <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">GitHub</span>
            <span className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent/10 hover:text-accent border border-foreground/5 transition-all">
              <Github size={18} strokeWidth={2} />
            </span>
          </a>

          {/* LinkedIn Link */}
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted hover:text-accent transition-colors"
            title="LinkedIn"
          >
            <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">LinkedIn</span>
            <span className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent/10 hover:text-accent border border-foreground/5 transition-all">
              <Linkedin size={18} strokeWidth={2} />
            </span>
          </a>

          {/* Email Link */}
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="text-muted hover:text-accent transition-colors"
            title="Email"
          >
            <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">Email</span>
            <span className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent/10 hover:text-accent border border-foreground/5 transition-all">
              <Mail size={18} strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
