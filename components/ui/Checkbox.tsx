'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  variant?: 'default' | 'accent'
  size?: 'default' | 'sm' | 'lg'
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const sizes = {
    default: 'h-5 w-5',
    sm: 'h-4 w-4',
    lg: 'h-6 w-6',
  }

  const variants = {
    default: 'border-border-medium data-[state=checked]:bg-accent-primary data-[state=checked]:border-accent-primary',
    accent: 'border-accent-primary data-[state=checked]:bg-accent-primary',
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer shrink-0 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:cursor-not-allowed disabled:opacity-50',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check className="h-3.5 w-3.5 text-text-primary" strokeWidth={3} />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }