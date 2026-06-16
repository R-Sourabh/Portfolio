'use client'

import React, { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import App from './App'
import AppMobile from './AppMobile'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#818cf8] flex items-center justify-center font-display font-medium text-lg uppercase tracking-widest animate-pulse">
        Loading...
      </div>
    )
  }

  return isMobile ? <AppMobile /> : <App />
}
