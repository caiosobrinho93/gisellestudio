import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export function useServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const mounted = useRef(true)

  const fetchServicos = useCallback(async () => {
    if (!mounted.current) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
      } else if (mounted.current) {
        setServicos(data || [])
      }
    } catch (e) {
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
    try {
      const { data, error } = await supabase
        .from('profissionais')
        .select('*')
        .eq('ativo', true)
        .order('nome')
      
      if (error) {
      } else if (mounted.current) {
        setProfissionais(data || [])
      }
    } catch (e) {
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
    try {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false })
      
      if (error) {
      } else if (mounted.current) {
        setGaleria(data || [])
      }
    } catch (e) {
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
    try {
      const { data, error } = await supabase
        .from('configuracoes')
        .select('chave, valor')
      
      if (error) {
      } else if (mounted.current) {
        const configMap: Record<string, string> = {}
        data?.forEach((item) => {
          configMap[item.chave] = item.valor
        })
        setConfig(configMap)
      }
    } catch (e) {
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
      } else if (mounted.current) {
        setAgendamentos(data || [])
      }
    } catch (e) {
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

    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }

  return { success: true }
}

export async function deleteAgendamento(id: string) {
  try {
    const { error } = await supabase.from('agendamentos').delete().eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function deleteGaleriaItem(id: string) {
  try {
    const { error } = await supabase.from('galeria').delete().eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function updateGaleriaItem(id: string, data: {
  titulo: string
  imagem: string
  categoria: string
  ativo?: boolean
}) {
  try {
    const { error } = await supabase.from('galeria').update({
      titulo: data.titulo,
      imagem: data.imagem,
      categoria: data.categoria,
      ativo: data.ativo
    }).eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function createGaleriaItem(data: {
  titulo: string
  imagem: string
  categoria: string
}) {
  try {
    const { error } = await supabase
      .from('galeria')
      .insert([{
        titulo: data.titulo,
        imagem: data.imagem,
        categoria: data.categoria,
        ativo: true
      }])

    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function deleteServico(id: string) {
  try {
    const { error } = await supabase.from('servicos').delete().eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function updateServico(id: string, data: {
  nome: string
  preco: number
  duracao: number
  descricao?: string
  categoria: string
  ativo?: boolean
}) {
  try {
    const { error } = await supabase.from('servicos').update({
      nome: data.nome,
      preco: data.preco,
      duracao: data.duracao,
      descricao: data.descricao,
      categoria: data.categoria,
      ativo: data.ativo
    }).eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function createServico(data: {
  nome: string
  preco: number
  duracao: number
  descricao?: string
  categoria: string
}) {
  try {
    const { error } = await supabase.from('servicos').insert([{
      nome: data.nome,
      preco: data.preco,
      duracao: data.duracao,
      descricao: data.descricao,
      categoria: data.categoria,
      ativo: true
    }])
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function deleteProfissional(id: string) {
  try {
    const { error } = await supabase.from('profissionais').delete().eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function updateProfissional(id: string, data: {
  nome: string
  especialidade: string
  telefone?: string
  email?: string
  ativo?: boolean
}) {
  try {
    const { error } = await supabase.from('profissionais').update({
      nome: data.nome,
      especialidade: data.especialidade,
      telefone: data.telefone,
      email: data.email,
      ativo: data.ativo
    }).eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function createProfissional(data: {
  nome: string
  especialidade: string
  telefone?: string
  email?: string
}) {
  try {
    const { error } = await supabase.from('profissionais').insert([{
      nome: data.nome,
      especialidade: data.especialidade,
      telefone: data.telefone,
      email: data.email,
      ativo: true
    }])
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}