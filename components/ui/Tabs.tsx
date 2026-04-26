'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProps {
  value: string
  onValueChange?: (value: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange: onValueChange || (() => {}) }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex gap-1 p-1.5 bg-bg-secondary rounded-2xl', className)}>
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isSelected = context.value === value

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={cn(
        'relative flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300',
        'text-text-secondary hover:text-text-primary',
        className
      )}
    >
      {isSelected && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 bg-bg-card rounded-xl shadow-sm"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsPanel({ value, children, className }: TabsPanelProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsPanel must be used within Tabs')

  if (context.value !== value) return null

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        y: 20,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        delay: 0.15,
        duration: 0.3 
      }}
      className={cn('min-h-[100px]', className)}
    >
      {children}
    </motion.div>
  )
}