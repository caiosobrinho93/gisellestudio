export interface Cliente {
  id: string
  nome: string
  email: string
  telefone: string
  observacoes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Servico {
  id: string
  nome: string
  descricao?: string
  preco: number
  duracao: number
  categoria: string
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Funcionario {
  id: string
  nome: string
  email: string
  telefone?: string
  especialidade: string
  avatar?: string
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Agendamento {
  id: string
  clienteId: string
  servicoId: string
  funcionarioId: string
  data: Date
  horario: string
  duracao: number
  status: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
  valor: number
  observacoes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Configuracao {
  id: string
  chave: string
  valor: string
  updatedAt: Date
}