'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowingButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  glowColor?: string
}

const GlowingButton = ({ 
  variant = 'primary', 
  children, 
  className,
  glowColor = '#00ff9d',
  ...props 
}: GlowingButtonProps) => {
  const baseStyles = 'interactive relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[0.02em] transition-all'
  
  const variants = {
    primary: 'bg-[#f4f2eb] text-[#111114] shadow-[0_10px_28px_rgba(255,255,255,0.12)]',
    secondary: 'bg-secondary text-white shadow-[0_10px_28px_rgba(58,123,253,0.22)]',
    outline: 'border border-white/12 bg-white/4 text-white hover:bg-white/8'
  }

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], className)}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}40, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  )
}

export default GlowingButton
