import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
})

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
})

export const metadata: Metadata = {
  title: 'Sourabh Raghuwanshi | Software Developer Portfolio',
  description: 'Interactive portfolio showcasing offline-first PWAs, micro frontends, and performant product interfaces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
