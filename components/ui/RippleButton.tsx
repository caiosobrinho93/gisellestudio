'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  hoverScale?: number
  tapScale?: number
  children: React.ReactNode
}

interface Ripple {
  id: number
  x: number
  y: number
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(function RippleButton(
  { className, variant = 'default', size = 'default', hoverScale = 1.05, tapScale = 0.95, children, disabled, type = 'button', onMouseEnter, onMouseLeave, onClick, ...props },
  ref
) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const variants = {
    default: 'bg-accent-primary text-bg-primary hover:bg-accent-secondary',
    accent: 'bg-accent-primary text-bg-primary hover:bg-accent-secondary',
    destructive: 'bg-error text-white hover:bg-red-600',
    outline: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10',
    secondary: 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary',
    ghost: 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
    link: 'text-accent-primary underline-offset-4 hover:underline',
  }

  const sizes = {
    default: 'h-10 px-6 py-2',
    sm: 'h-8 px-4 text-sm',
    lg: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  }

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newRipple: Ripple = { id: Date.now(), x, y }
    
    setRipples((prev) => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }, [])

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      onClick={(e) => {
        createRipple(e)
        onClick?.(e)
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '10px',
              height: '10px',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 25, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
})