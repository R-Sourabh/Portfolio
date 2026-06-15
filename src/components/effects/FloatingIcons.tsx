'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiThreedotjs, SiNodedotjs } from 'react-icons/si'

const icons = [
  {
    Icon: SiReact,
    color: '#61DAFB',
    delay: 0,
    points: [
      { x: 0.08, y: 0.2 },
      { x: 0.22, y: 0.68 },
      { x: 0.12, y: 0.38 },
    ],
  },
  {
    Icon: SiTypescript,
    color: '#3178C6',
    delay: 0.5,
    points: [
      { x: 0.3, y: 0.12 },
      { x: 0.4, y: 0.48 },
      { x: 0.26, y: 0.76 },
    ],
  },
  {
    Icon: SiNextdotjs,
    color: '#ffffff',
    delay: 1,
    points: [
      { x: 0.58, y: 0.18 },
      { x: 0.72, y: 0.58 },
      { x: 0.52, y: 0.34 },
    ],
  },
  {
    Icon: SiTailwindcss,
    color: '#06B6D4',
    delay: 1.5,
    points: [
      { x: 0.82, y: 0.16 },
      { x: 0.74, y: 0.74 },
      { x: 0.9, y: 0.46 },
    ],
  },
  {
    Icon: SiThreedotjs,
    color: '#ffffff',
    delay: 2,
    points: [
      { x: 0.16, y: 0.84 },
      { x: 0.48, y: 0.62 },
      { x: 0.74, y: 0.88 },
    ],
  },
  {
    Icon: SiNodedotjs,
    color: '#339933',
    delay: 2.5,
    points: [
      { x: 0.92, y: 0.78 },
      { x: 0.64, y: 0.26 },
      { x: 0.84, y: 0.52 },
    ],
  },
]

const FloatingIcons = () => {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setMounted(true)

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, color, delay, points }, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          initial={{
            x: points[0].x * dimensions.width,
            y: points[0].y * dimensions.height,
          }}
          animate={{
            x: points.map((point) => point.x * dimensions.width),
            y: points.map((point) => point.y * dimensions.height),
          }}
          transition={{
            duration: 20,
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ color }}
        >
          <Icon />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingIcons
