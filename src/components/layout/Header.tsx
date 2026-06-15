'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { smoothScroll } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: 'hero' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Contact', href: 'contact' },
]

const Header = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      const sections = navItems.map((item) => document.getElementById(item.href))
      const scrollPosition = window.scrollY + 160

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50 sm:top-5"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="section-shell flex justify-center">
        <nav
          className={`glass-panel flex w-full max-w-max items-center justify-between gap-2 rounded-full px-2 py-2 transition-all duration-300 sm:w-auto sm:justify-center sm:px-3 ${
            scrolled ? 'bg-black/68' : 'bg-black/52'
          }`}
        >
          <ul className="flex items-center gap-0.5 overflow-x-auto whitespace-nowrap pr-1 sm:gap-1 sm:overflow-visible">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => smoothScroll(item.href)}
                  className={`interactive relative rounded-full px-3 py-2 text-xs transition-colors sm:px-4 sm:text-sm ${
                    activeSection === item.href ? 'text-black' : 'text-white/72 hover:text-white'
                  }`}
                >
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#f1efe8]"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => smoothScroll('contact')}
            className="interactive rounded-full bg-[#f1efe8] px-3 py-2 text-xs font-semibold text-[#111114] transition-transform hover:scale-[1.02] sm:px-5 sm:text-sm"
          >
            Let&apos;s Talk
          </button>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
