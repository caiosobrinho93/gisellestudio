'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardContextType {
  servicos: any[]
  profissionais: any[]
  agendamentos: any[]
  clientes: any[]
  galeria: any[]
  configuracoes: Record<string, string>
  loading: {
    servicos: boolean
    profissionais: boolean
    agendamentos: boolean
    clientes: boolean
    galeria: boolean
    configuracoes: boolean
  }
  refetch: (type: 'servicos' | 'profissionais' | 'agendamentos' | 'clientes' | 'galeria' | 'configuracoes') => Promise<void>
}

const AppDataContext = createContext<DashboardContextType | undefined>(undefined)

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [servicos, setServicos] = useState<any[]>([])
  const [profissionais, setProfissionais] = useState<any[]>([])
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [galeria, setGaleria] = useState<any[]>([])
  const [configuracoes, setConfiguracoes] = useState<Record<string, string>>({})
  
  const [loading, setLoading] = useState({
    servicos: true,
    profissionais: true,
    agendamentos: true,
    clientes: true,
    galeria: true,
    configuracoes: true,
  })

  const hasLoadedOnce = useRef<Record<string, boolean>>({})

  const fetchData = useCallback(async (type: 'servicos' | 'profissionais' | 'agendamentos' | 'clientes' | 'galeria' | 'configuracoes') => {
    if (!hasLoadedOnce.current[type]) {
      setLoading(prev => ({ ...prev, [type]: true }))
    }
    
    try {
      if (type === 'configuracoes') {
        const { data, error } = await supabase.from('configuracoes').select('chave, valor')
        if (!error && data) {
          const configMap: Record<string, string> = {}
          data.forEach(item => { configMap[item.chave] = item.valor })
          setConfiguracoes(configMap)
          hasLoadedOnce.current[type] = true
        }
      } else {
        let query = supabase.from(type).select('*')
        if (type === 'servicos') query = query.order('nome')
        if (type === 'profissionais') query = query.order('nome')
        if (type === 'agendamentos') query = query.order('created_at', { ascending: false })
        if (type === 'clientes') query = query.order('nome')
        if (type === 'galeria') query = query.order('created_at', { ascending: false })

        const { data, error } = await query
        if (!error && data) {
          if (type === 'servicos') setServicos(data)
          if (type === 'profissionais') setProfissionais(data)
          if (type === 'agendamentos') setAgendamentos(data)
          if (type === 'clientes') setClientes(data)
          if (type === 'galeria') setGaleria(data)
        }
      }
      hasLoadedOnce.current[type] = true
    } catch (e) {
      console.error(`Error fetching ${type}:`, e)
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }))
    }
  }, [])

  useEffect(() => {
    fetchData('servicos')
    fetchData('profissionais')
    fetchData('agendamentos')
    fetchData('clientes')
    fetchData('galeria')
    fetchData('configuracoes')

    // Realtime subscriptions
    const channels = [
      supabase.channel('servicos-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'servicos' }, () => fetchData('servicos')).subscribe(),
      supabase.channel('profissionais-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'profissionais' }, () => fetchData('profissionais')).subscribe(),
      supabase.channel('agendamentos-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'agendamentos' }, () => fetchData('agendamentos')).subscribe(),
      supabase.channel('clientes-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'clientes' }, () => fetchData('clientes')).subscribe(),
      supabase.channel('galeria-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'galeria' }, () => fetchData('galeria')).subscribe(),
      supabase.channel('config-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'configuracoes' }, () => fetchData('configuracoes')).subscribe(),
    ]

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel))
    }
  }, [fetchData])

  return (
    <AppDataContext.Provider value={{
      servicos,
      profissionais,
      agendamentos,
      clientes,
      galeria,
      configuracoes,
      loading,
      refetch: fetchData
    }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within a AppDataProvider')
  }
  return context
}
