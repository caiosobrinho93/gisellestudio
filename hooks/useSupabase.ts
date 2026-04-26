import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export function useServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchServicos = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    console.log('[Servicos] Fetching...')
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
        console.error('[Servicos] Error:', error)
      } else if (mounted.current) {
        console.log('[Servicos] Found:', data?.length, 'items')
        setServicos(data || [])
      }
    } catch (e) {
      console.error('[Servicos] Exception:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchServicos()

    let channel: any = null
    try {
      channel = supabase
        .channel('servicos-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'servicos' }, () => {
          fetchServicos()
        })
        .subscribe()
    } catch (e) {
      console.warn('Realtime not available:', e)
    }

    return () => {
      mounted.current = false
      if (channel) supabase.removeChannel(channel)
    }
  }, [fetchServicos])

  return { servicos, loading, refetch: fetchServicos }
}

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchProfissionais = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
        console.error('Error fetching profissionais:', error)
      } else if (mounted.current) {
        setProfissionais(data || [])
      }
    } catch (e) {
      console.error('Supabase error:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchProfissionais()

    let channel: any = null
    try {
      channel = supabase
        .channel('profissionais-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profissionais' }, () => {
          fetchProfissionais()
        })
        .subscribe()
    } catch (e) {
      console.warn('Realtime not available:', e)
    }

    return () => {
      mounted.current = false
      if (channel) supabase.removeChannel(channel)
    }
  }, [fetchProfissionais])

  return { profissionais, loading, refetch: fetchProfissionais }
}

export function useGaleria() {
  const [galeria, setGaleria] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchGaleria = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    console.log('[Galeria] Fetching...')
    try {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('[Galeria] Error:', error)
      } else if (mounted.current) {
        console.log('[Galeria] Found:', data?.length, 'items')
        setGaleria(data || [])
      }
    } catch (e) {
      console.error('[Galeria] Exception:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchGaleria()

    let channel: any = null
    try {
      channel = supabase
        .channel('galeria-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'galeria' }, () => {
          fetchGaleria()
        })
        .subscribe()
    } catch (e) {
      console.warn('Realtime not available:', e)
    }

    return () => {
      mounted.current = false
      if (channel) supabase.removeChannel(channel)
    }
  }, [fetchGaleria])

  return { galeria, loading, refetch: fetchGaleria }
}

export function useConfiguracoes() {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchConfig = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('chave, valor')
      
      if (error) {
        console.error('Error fetching config:', error)
      } else if (mounted.current) {
        const configMap: Record<string, string> = {}
        data?.forEach((item) => {
          configMap[item.chave] = item.valor
        })
        setConfig(configMap)
      }
    } catch (e) {
      console.error('Supabase error:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchConfig()
  }, [fetchConfig])

  return { config, loading, refetch: fetchConfig }
}

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchAgendamentos = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data', { ascending: true })
      
      if (error) {
        console.error('Error fetching agendamentos:', error)
      } else if (mounted.current) {
        setAgendamentos(data || [])
      }
    } catch (e) {
      console.error('Supabase error:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchAgendamentos()

    let channel: any = null
    try {
      channel = supabase
        .channel('agendamentos-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'agendamentos' }, () => {
          fetchAgendamentos()
        })
        .subscribe()
    } catch (e) {
      console.warn('Realtime not available:', e)
    }

    return () => {
      mounted.current = false
      if (channel) supabase.removeChannel(channel)
    }
  }, [fetchAgendamentos])

  return { agendamentos, loading, refetch: fetchAgendamentos }
}

export async function createAgendamento(data: {
  servico_id: string
  profissional_id: string
  data: string
  horario: string
  telefone: string
  status?: string
}) {
  try {
    const { error } = await supabase
      .from('agendamentos')
      .insert([{
        servico_id: data.servico_id,
        profissional_id: data.profissional_id,
        data: data.data,
        horario: data.horario,
        telefone: data.telefone,
        status: data.status || 'PENDENTE',
      }])

    if (error) {
      console.error('Error creating agendamento:', error)
      return { success: false, error }
    }
  } catch (e) {
    console.error('Error creating agendamento:', e)
    return { success: false, error: e }
  }

  return { success: true }
}