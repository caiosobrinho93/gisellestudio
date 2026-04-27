import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAppData } from '@/components/providers/AppDataProvider'

export function useServicos(onlyActive = true) {
  const { servicos, loading, refetch } = useAppData()
  const data = onlyActive ? servicos.filter((s: any) => s.ativo) : servicos
  return { servicos: data, loading: loading.servicos, refetch: () => refetch('servicos') }
}

export function useProfissionais(onlyActive = true) {
  const { profissionais, loading, refetch } = useAppData()
  const data = onlyActive ? profissionais.filter((p: any) => p.ativo) : profissionais
  return { profissionais: data, loading: loading.profissionais, refetch: () => refetch('profissionais') }
}

export function useGaleria(onlyActive = true) {
  const { galeria, loading, refetch } = useAppData()
  const data = onlyActive ? galeria.filter((g: any) => g.ativo) : galeria
  return { galeria: data, loading: loading.galeria, refetch: () => refetch('galeria') }
}

export function useConfiguracoes() {
  const { configuracoes: config, loading, refetch } = useAppData()
  return { config, loading: loading.configuracoes, refetch: () => refetch('configuracoes') }
}

export function useAgendamentos() {
  const { agendamentos, loading, refetch } = useAppData()
  return { agendamentos, loading: loading.agendamentos, refetch: () => refetch('agendamentos') }
}

export function useClientes() {
  const { clientes, loading, refetch } = useAppData()
  return { clientes, loading: loading.clientes, refetch: () => refetch('clientes') }
}


export async function createCliente(data: {
  nome: string
  email?: string
  telefone: string
  observacoes?: string
  foto?: string
}) {
  try {
    const { error } = await supabase.from('clientes').insert([{
      nome: data.nome,
      email: data.email || null,
      telefone: data.telefone,
      observacoes: data.observacoes || null,
      foto: data.foto || null,
      ativo: true
    }])
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function updateCliente(id: string, data: {
  nome: string
  email?: string
  telefone: string
  observacoes?: string
  foto?: string
  ativo?: boolean
}) {
  try {
    const { error } = await supabase.from('clientes').update({
      nome: data.nome,
      email: data.email || null,
      telefone: data.telefone,
      observacoes: data.observacoes || null,
      foto: data.foto || null,
      ativo: data.ativo
    }).eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function deleteCliente(id: string) {
  try {
    const { error } = await supabase.from('clientes').delete().eq('id', id)
    if (error) return { success: false, error }
  } catch (e) {
    return { success: false, error: e }
  }
  return { success: true }
}

export async function createAgendamento(data: {
  servico_id: string
  profissional_id?: string
  data: string
  horario: string
  telefone: string
  cliente?: string
  status?: string
}) {
  try {
    const { error } = await supabase
      .from('agendamentos')
      .insert([{
        servico_id: data.servico_id,
        profissional_id: data.profissional_id || null,
        data: data.data,
        horario: data.horario,
        telefone: data.telefone,
        cliente: data.cliente || data.telefone,
        status: data.status || 'CONFIRMADO',
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
  imagem?: string
}) {
  try {
    const { error } = await supabase.from('servicos').update({
      nome: data.nome,
      preco: data.preco,
      duracao: data.duracao,
      descricao: data.descricao,
      categoria: data.categoria,
      ativo: data.ativo,
      imagem: data.imagem
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
  imagem?: string
}) {
  try {
    const { error } = await supabase.from('servicos').insert([{
      nome: data.nome,
      preco: data.preco,
      duracao: data.duracao,
      descricao: data.descricao,
      categoria: data.categoria,
      ativo: true,
      imagem: data.imagem
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