import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useServicos() {
  const [servicos, setServicos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServicos()
  }, [])

  async function fetchServicos() {
    setLoading(true)
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('ativo', true)
      .order('nome')
    
    if (error) {
      console.error('Error fetching servicos:', error)
    } else {
      setServicos(data || [])
    }
    setLoading(false)
  }

  return { servicos, loading, refetch: fetchServicos }
}

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfissionais()
  }, [])

  async function fetchProfissionais() {
    setLoading(true)
    const { data, error } = await supabase
      .from('profissionais')
      .select('*')
      .eq('ativo', true)
      .order('nome')
    
    if (error) {
      console.error('Error fetching profissionais:', error)
    } else {
      setProfissionais(data || [])
    }
    setLoading(false)
  }

  return { profissionais, loading, refetch: fetchProfissionais }
}

export function useGaleria() {
  const [galeria, setGaleria] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGaleria()
  }, [])

  async function fetchGaleria() {
    setLoading(true)
    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .eq('ativo', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching galeria:', error)
    } else {
      setGaleria(data || [])
    }
    setLoading(false)
  }

  return { galeria, loading, refetch: fetchGaleria }
}

export function useConfiguracoes() {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    setLoading(true)
    const { data, error } = await supabase
      .from('configuracoes')
      .select('chave, valor')
    
    if (error) {
      console.error('Error fetching config:', error)
    } else {
      const configMap: Record<string, string> = {}
      data?.forEach((item) => {
        configMap[item.chave] = item.valor
      })
      setConfig(configMap)
    }
    setLoading(false)
  }

  return { config, loading, refetch: fetchConfig }
}