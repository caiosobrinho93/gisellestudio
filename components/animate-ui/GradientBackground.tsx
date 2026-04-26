'use client'

import { ReactNode } from 'react'

interface GradientBackgroundProps {
  children: ReactNode
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#030205]">
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, #1a0510 0%, #0d0610 40%, #030205 100%)',
        }}
      />
      
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 80, 0.15) 0%, rgba(255, 0, 80, 0.05) 50%, transparent 70%)',
          top: '-300px',
          left: '-200px',
        }}
      />
      
      <div
        className="absolute w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 51, 102, 0.12) 0%, rgba(255, 51, 102, 0.05) 50%, transparent 70%)',
          top: '50%',
          right: '-400px',
        }}
      />
      
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 138, 0.1) 0%, rgba(255, 107, 138, 0.03) 50%, transparent 70%)',
          bottom: '-250px',
          left: '20%',
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </div>
  )
}