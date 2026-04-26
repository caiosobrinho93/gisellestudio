'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'glass'
  className?: string
  hover?: boolean
}

export function Card({ children, variant = 'default', className, hover = false }: CardProps) {
  const variants = {
    default: 'bg-bg-card border border-border-light',
    elevated: 'bg-bg-card shadow-lg',
    glass: 'bg-glass-bg backdrop-blur-xl border border-glass-border',
  }

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'hover:shadow-glow hover:border-accent-primary/30 transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-xl font-semibold text-text-primary font-display', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm text-text-secondary mt-1', className)}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-border-light flex items-center gap-2', className)}>
      {children}
    </div>
  )
}