'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  id: number
  type: NotificationType
  message: string
}

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, type, message }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }, [])

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  }

  const colors = {
    success: 'bg-green-500/20 border-green-500 text-green-400',
    error: 'bg-red-500/20 border-red-500 text-red-400',
    info: 'bg-blue-500/20 border-blue-500 text-blue-400',
    warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map((notification) => {
            const Icon = icons[notification.type]
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className={colors[notification.type]}
              >
                <div className="flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{notification.message}</span>
                  <button 
                    onClick={() => removeNotification(notification.id)}
                    className="ml-2 hover:opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}