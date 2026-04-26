'use client'

import { motion } from 'framer-motion'
import { Clock, Calendar, Bell, CreditCard, Building } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ConfiguracoesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary">Configurações</h1>
        <p className="text-text-secondary">Configure o sistema</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Horário de Funcionamento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Abertura</label>
                  <input
                    type="time"
                    defaultValue="08:00"
                    className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Fechamento</label>
                  <input
                    type="time"
                    defaultValue="20:00"
                    className="w-full h-11 px-4 bg-bg-card border border-border-light rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
              </div>
              <Button className="mt-4">Salvar</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Dias de Funcionamento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                  <button
                    key={dia}
                    className="w-12 h-12 rounded-xl bg-accent-primary text-text-primary font-medium"
                  >
                    {dia}
                  </button>
                ))}
                <button className="w-12 h-12 rounded-xl bg-bg-secondary text-text-secondary font-medium">
                  Dom
                </button>
              </div>
              <Button className="mt-4">Salvar</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-rose/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent-primary" />
                </div>
                <CardTitle>Notificações</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-text-primary">Lembretes por email</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-text-primary">Novos agendamentos</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-text-primary">Confirmação de orçamento</span>
                  <input type="checkbox" className="w-5 h-5 accent-accent-primary" />
                </label>
              </div>
              <Button className="mt-4">Salvar</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}