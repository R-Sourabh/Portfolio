'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Brain, 
  Layers, 
  Link as LinkIcon, 
  BarChart3, 
  Database, 
  Network, 
  Activity,
  LucideIcon 
} from 'lucide-react';

interface SkillItem {
  id: number;
  title: string;
  tech: string;
  icon: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 1,
    title: "Frontend Architecture",
    tech: "React.js, Next.js & TypeScript",
    icon: "architecture"
  },
  {
    id: 2,
    title: "AI & Agentic Workflows",
    tech: "Vercel AI SDK & Claude Code",
    icon: "brain"
  },
  {
    id: 3,
    title: "Backend Engineering",
    tech: "Node.js, Python, GraphQL & PostgreSQL",
    icon: "database"
  },
  {
    id: 4,
    title: "Hybrid & PWA Systems",
    tech: "Ionic, Vue.js & Service Workers",
    icon: "layers"
  },
  {
    id: 5,
    title: "State & Data Engine",
    tech: "Redux & Offline IndexedDB",
    icon: "network"
  },
  {
    id: 6,
    title: "CI/CD & Cloud Ops",
    tech: "GitHub Actions, AWS & Vercel",
    icon: "activity"
  },
  {
    id: 7,
    title: "Performance Optimization",
    tech: "Micro Frontends, Service workers & WebSockets",
    icon: "link"
  },
  {
    id: 8,
    title: "Engineering Toolset",
    tech: "Git, Chart.js, Vitest, Jira & Figma",
    icon: "bar-chart"
  }
];

const IconMap: Record<string, LucideIcon> = {
  "architecture": Layout,
  "brain": Brain,
  "layers": Layers,
  "link": LinkIcon,
  "bar-chart": BarChart3,
  "database": Database,
  "network": Network,
  "activity": Activity
};

const CARD_HEIGHT = 90; 
const STEP = 75; 

export default function SkillStackV2() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % SKILLS_DATA.length);
    }, 1500);
  };

  useEffect(() => {
    startCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(i);
    startCycle();
  };

  return (
    <div
      className="skill-stack-v3-scene"
      style={{
        background: 'transparent',
        minHeight: '420px', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px',
        fontFamily: "'Inter', sans-serif",
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400, 
          height: 420, 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
          {SKILLS_DATA.map((item, i) => {
            const len = SKILLS_DATA.length;
            let dist = i - active;
            if (dist > len / 2) dist -= len;
            if (dist < -len / 2) dist += len;

            const absDist = Math.abs(dist);
            const isActive = absDist === 0;

            if (absDist > 2.5) return null;

            const opacity = 
              isActive ? 1 :
              absDist <= 1 ? 0.92 :
              absDist <= 2 ? 0.7 :
              0.3;

            const blur = 
              isActive ? 0 :
              absDist <= 1 ? 0.4 :
              absDist <= 2 ? 1.5 :
              4;

            const translateZ = -absDist * 140;
            const rotateX = dist * 32;
            const translateY = dist * STEP;
            const scale = 1 - absDist * 0.04;

            const IconComp = IconMap[item.icon] || Layout;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(i)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: CARD_HEIGHT,
                  marginTop: -CARD_HEIGHT / 2,
                  borderRadius: 12,
                  padding: '16px 28px',
                  background: 'hsl(var(--surface))',
                  
                  border: isActive
                    ? '2px solid hsl(var(--accent))'
                    : '1px solid hsla(var(--foreground-rgb), 0.08)',

                  cursor: isActive ? 'default' : 'pointer',
                  opacity: Math.max(0, opacity),
                  filter: `blur(${blur}px)`,
                  
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  
                  transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',

                  boxShadow: isActive
                    ? `0 0 30px hsla(var(--accent-rgb), 0.2), 0 0 60px hsla(var(--accent-rgb), 0.1)`
                    : 'none',

                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  boxSizing: 'border-box',
                  zIndex: 100 - Math.round(absDist * 10),
                }}
              >
                {/* Icon Column */}
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: isActive 
                      ? 'hsla(var(--accent-rgb), 0.15)' 
                      : 'hsla(var(--foreground-rgb), 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <IconComp size={24} />
                </div>

                {/* Text Content Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
                  <h3
                    style={{
                      fontSize: 17, 
                      fontWeight: 700,
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted))',
                      letterSpacing: '-0.02em',
                      margin: 0,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 13, 
                      fontWeight: 600,
                      color: isActive ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                      opacity: isActive ? 1 : 0.6,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.tech}
                  </span>
                </div>

                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: 'linear-gradient(45deg, hsla(var(--accent-rgb), 0.05) 0%, transparent 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
