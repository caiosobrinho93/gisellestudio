import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

console.log('[useSupabase] Loading hooks...')

export function useServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchServicos = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    console.log('[Servicos] Buscando...')
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
        console.error('[Servicos] Erro:', error)
      } else if (mounted.current) {
        console.log('[Servicos] Encontrados:', data?.length, 'itens')
        setServicos(data || [])
      }
    } catch (e) {
      console.error('[Servicos] Exceção:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchServicos()
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
    console.log('[Profissionais] Fetching...')
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
        console.error('[Profissionais] Error:', error)
      } else if (mounted.current) {
        console.log('[Profissionais] Found:', data?.length, 'items')
        setProfissionais(data || [])
      }
    } catch (e) {
      console.error('[Profissionais] Exception:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchProfissionais()
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
    console.log('[Galeria] Buscando...')
    try {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('[Galeria] Erro:', error)
      } else if (mounted.current) {
        console.log('[Galeria] Encontradas:', data?.length, 'imagens')
        setGaleria(data || [])
      }
    } catch (e) {
      console.error('[Galeria] Exceção:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchGaleria()
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
    console.log('[Config] Fetching...')
    try {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('chave, valor')
      
      if (error) {
        console.error('[Config] Error:', error)
      } else if (mounted.current) {
        console.log('[Config] Found:', data?.length, 'items')
        const configMap: Record<string, string> = {}
        data?.forEach((item) => {
          configMap[item.chave] = item.valor
        })
        setConfig(configMap)
      }
    } catch (e) {
      console.error('[Config] Exception:', e)
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
    console.log('[Agendamentos] Buscando...')
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data', { ascending: true })
      
      if (error) {
        console.error('[Agendamentos] Erro:', error)
      } else if (mounted.current) {
        console.log('[Agendamentos] Encontrados:', data?.length, 'agendamentos')
        setAgendamentos(data || [])
      }
    } catch (e) {
      console.error('[Agendamentos] Exceção:', e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    mounted.current = true
    fetchAgendamentos()
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
  console.log('[createAgendamento] Salvando:', data)
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
      console.error('[createAgendamento] Erro:', error)
      return { success: false, error }
    }
    console.log('[createAgendamento] Sucesso!')
  } catch (e) {
    console.error('[createAgendamento] Exceção:', e)
    return { success: false, error: e }
  }

  return { success: true }
}

export async function deleteGaleriaItem(id: string) {
  console.log('[deleteGaleriaItem] Excluindo:', id)
  try {
    const { error } = await supabase
      .from('galeria')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[deleteGaleriaItem] Erro:', error)
      return { success: false, error }
    }
    console.log('[deleteGaleriaItem] Sucesso!')
  } catch (e) {
    console.error('[deleteGaleriaItem] Exceção:', e)
    return { success: false, error: e }
  }
  return { success: true }
}