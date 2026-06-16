'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import Magnetic from '../ui/Magnetic';
import { ChevronRight, Download, Volume2, VolumeX } from 'lucide-react';
import PerspectiveText from '../ui/PerspectiveText';

interface HeroProps {
  onOpenResumeModal: () => void;
}

const Hero = ({ onOpenResumeModal }: HeroProps) => {
  const nameParts = personalInfo.name.toUpperCase().split(' ');
  const firstName = nameParts[0] || 'SOURABH';
  const lastName = nameParts.slice(1).join(' ') || 'RAGHUWANSHI';

  // 3D Parallax Tilt coordinates (-0.5 to 0.5 range)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation values
  const springConfig = { stiffness: 100, damping: 20 };
  const rxSpring = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rySpring = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Video Background & Scroll Replay Logic
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isContentRevealed, setIsContentRevealed] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isFullyOutOfView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isFullyOutOfView.current) {
            isFullyOutOfView.current = false;
            setIsContentRevealed(false);
            setIsVideoLoaded(false);
            setIsVideoEnded(false);
            setShowControls(false);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(err => console.log("Video play error on scroll:", err));
            }
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(err => console.log("Audio play error on scroll:", err));
            }
          }
        } else {
          isFullyOutOfView.current = true;
          if (videoRef.current) {
            videoRef.current.pause();
          }
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime > 0.1 && !isVideoLoaded) {
      setIsVideoLoaded(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play error on initial load:", err));
      }
    }
    if (video.currentTime > 1.5 && !showControls) {
      setShowControls(true);
    }
    if (video.currentTime >= 7 && !isContentRevealed) {
      setIsContentRevealed(true);
    }

    // Keep audio synced with video timeline
    if (audioRef.current && !video.paused && !isMuted && !audioRef.current.paused) {
      const drift = Math.abs(video.currentTime - audioRef.current.currentTime);
      if (drift > 0.2) {
        audioRef.current.currentTime = video.currentTime;
      }
    }
  };

  const handleVideoEnded = () => {
    setIsContentRevealed(true);
    setIsVideoEnded(true);
    setShowControls(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleVideoPlay = () => {
    if (isVideoLoaded && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    }
  };

  const handleVideoPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleSkipIntro = () => {
    setIsContentRevealed(true);
    setIsVideoEnded(true);
    setShowControls(false);
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration || 23.6;
      videoRef.current.pause();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = audioRef.current.duration || 23.6;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) {
        if (videoRef.current) {
          audioRef.current.currentTime = videoRef.current.currentTime;
        }
        audioRef.current.play().catch(err => console.log("Audio play error on unmute:", err));
      }
    }
  };

  // Stagger reveal animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="dark relative min-h-screen flex items-center justify-center pt-24 pb-28 md:pb-36 overflow-hidden bg-black"
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="https://8xeqshilwpouktda.public.blob.vercel-storage.com/fill.mp3"
        preload="auto"
        muted
      />

      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://8xeqshilwpouktda.public.blob.vercel-storage.com/bg-clip.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-85' : 'opacity-0'}`}
      />

      {/* Softer dark vignette overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/70 z-0 pointer-events-none" />

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl px-6 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isContentRevealed ? "visible" : "hidden"}
          className={isContentRevealed ? "pointer-events-auto" : "pointer-events-none"}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block py-1 px-3 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full border border-accent/20">
              Available for new opportunities
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 select-none perspective-1000">
            <span className="mb-8 block text-xl md:text-2xl font-display font-medium text-muted tracking-widest uppercase mb-1">
              Hi, I&apos;m
            </span>
            <motion.div
              style={{
                rotateX: rxSpring,
                rotateY: rySpring,
                transformStyle: "preserve-3d",
              }}
              className="flex flex-col items-center justify-center py-6 w-full max-w-full"
            >
              <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[95px] leading-none tracking-normal flex flex-col items-center gap-0 md:gap-1" style={{ transform: "translateZ(50px)" }}>
                <PerspectiveText text={firstName} />
                <PerspectiveText text={lastName} />
              </h1>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl font-display font-medium text-foreground leading-tight px-6 py-4 border-l-4 border-accent bg-accent/5 italic rounded-r-2xl text-left">
              &ldquo;{personalInfo.tagline}&rdquo;
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-50">
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
              >
                View My Work
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-8 py-4 bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground rounded-full font-bold transition-all"
              >
                <Download size={18} />
                Download CV
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Controls: Skip Intro & Audio Toggle */}
      {!isVideoEnded && showControls && (
        <div className="absolute bottom-10 right-10 z-50 flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-10 h-10 bg-background/40 hover:bg-background/70 border border-foreground/10 backdrop-blur-md rounded-full flex items-center justify-center text-foreground active:scale-95 transition-all shadow-lg"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            onClick={handleSkipIntro}
            className="px-5 py-2.5 bg-background/40 hover:bg-background/70 border border-foreground/10 backdrop-blur-md rounded-full text-xs font-mono tracking-wider text-foreground uppercase active:scale-95 transition-all shadow-lg"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      {isVideoEnded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-[30px] h-[50px] border-2 border-foreground/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
