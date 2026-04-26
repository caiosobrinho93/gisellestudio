'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

export function NotificationToast() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const success = localStorage.getItem('agendamentoSucesso')
    if (success) {
      setMessage('Agendamento realizado com sucesso!')
      setShow(true)
      localStorage.removeItem('agendamentoSucesso')
      setTimeout(() => setShow(false), 4000)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-accent-primary/95 backdrop-blur-xl text-text-primary px-6 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,51,102,0.6)] flex items-center gap-3 border border-accent-primary/30">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">{message}</p>
              <p className="text-sm text-text-primary/80">Obrigado pela preferência!</p>
            </div>
            <button onClick={() => setShow(false)} className="ml-2 hover:bg-white/20 rounded-full p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}