'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import { ChevronRight, Download, Volume2, VolumeX } from 'lucide-react';

interface MobileHeroProps {
  onOpenResumeModal: () => void;
}

const MobileHero = ({ onOpenResumeModal }: MobileHeroProps) => {
  const nameParts = personalInfo.name.toUpperCase().split(' ');
  const firstName = nameParts[0] || 'SOURABH';
  const lastName = nameParts.slice(1).join(' ') || 'RAGHUWANSHI';

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

  // Stagger reveal animation variants for mobile
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
      className="dark relative min-h-screen flex flex-col justify-center pt-24 pb-28 overflow-hidden bg-black"
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

      {/* Softer dark vignette overlay for contrast and brightness */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/70 z-0 pointer-events-none" />

      {/* Background Decorative Element */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isContentRevealed ? "visible" : "hidden"}
        className={`px-6 z-10 w-full flex flex-col items-center text-center ${isContentRevealed ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-foreground/[0.03] border border-foreground/5 text-foreground/80 text-[10px] font-mono tracking-widest uppercase rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 select-none w-full flex flex-col items-center">
          <span className="mb-4 block text-lg font-display font-medium text-muted tracking-widest uppercase">
            Hi, I&apos;m
          </span>
          <h1 className="flex flex-col items-center gap-2 select-none leading-none tracking-tight">
            <span className="bubble-text-3d-white text-5xl sm:text-6xl" data-text={firstName}>{firstName}</span>
            <span className="bubble-text-3d text-5xl sm:text-6xl" data-text={lastName}>{lastName}</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 w-full max-w-sm">
          <p className="text-lg font-medium text-muted leading-relaxed">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full max-w-xs relative z-50">
          <a
            href="#projects"
            className="w-full flex items-center justify-between px-8 py-4 bg-accent text-accent-foreground rounded-2xl font-bold shadow-xl shadow-accent/20 active:scale-95 transition-transform"
          >
            Explore Work
            <ChevronRight size={18} className="opacity-70" />
          </a>
          <button
            onClick={onOpenResumeModal}
            className="w-full flex items-center justify-between px-8 py-4 bg-foreground/5 border border-foreground/10 text-foreground rounded-2xl font-bold active:scale-95 transition-transform hover:bg-foreground/10"
          >
            Download CV
            <Download size={18} className="opacity-70" />
          </button>
        </motion.div>
      </motion.div>

      {/* Controls: Skip Intro & Audio Toggle for Mobile */}
      {!isVideoEnded && showControls && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-10 h-10 bg-background/40 hover:bg-background/70 border border-foreground/10 backdrop-blur-md rounded-full flex items-center justify-center text-foreground active:scale-95 transition-all shadow-lg"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            onClick={handleSkipIntro}
            className="px-5 py-2.5 bg-background/40 hover:bg-background/70 border border-foreground/10 backdrop-blur-md rounded-full text-xs font-mono tracking-wider text-foreground uppercase active:scale-95 transition-all shadow-lg whitespace-nowrap"
          >
            Skip Intro
          </button>
        </div>
      )}

      {/* Scroll Indicator for Mobile */}
      {isVideoEnded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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

export default MobileHero;
