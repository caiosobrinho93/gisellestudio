export const CATEGORIAS_SERVICOS = [
  'manicure',
  'pedicure',
  'cilios',
  'sobrancelha',
  'massagem',
  'skincare',
  'depilacao',
  'harmonizacao',
  'estetica',
] as const

export const STATUS_AGENDAMENTO = {
  PENDENTE: 'PENDENTE',
  CONFIRMADO: 'CONFIRMADO',
  CANCELADO: 'CANCELADO',
  CONCLUIDO: 'CONCLUIDO',
} as const

export const HORARIO_FUNCIONAMENTO = {
  inicio: '08:00',
  fim: '20:00',
  intervalo: 30,
} as const

export const DIAS_FECHADO = [0] // 0 = domingo

export const SERVICOS_PADRAO = [
  { nome: 'Manicure Simples', preco: 35, duracao: 30, categoria: 'manicure' },
  { nome: 'Manicure + Esmaltação', preco: 45, duracao: 45, categoria: 'manicure' },
  { nome: 'Unhas de Gel', preco: 120, duracao: 90, categoria: 'manicure' },
  { nome: 'Pedicure Spa', preco: 65, duracao: 60, categoria: 'pedicure' },
  { nome: 'Pedicure Simples', preco: 45, duracao: 40, categoria: 'pedicure' },
  { nome: 'Design de Sobrancelha', preco: 30, duracao: 20, categoria: 'sobrancelha' },
  { nome: 'Micropigmentação', preco: 250, duracao: 90, categoria: 'sobrancelha' },
  { nome: 'Extensão de Cílios', preco: 150, duracao: 90, categoria: 'cilios' },
  { nome: 'Volume Russo', preco: 200, duracao: 120, categoria: 'cilios' },
  { nome: 'Massagem Relaxante', preco: 80, duracao: 60, categoria: 'massagem' },
  { nome: 'Massagem Modeladora', preco: 120, duracao: 60, categoria: 'massagem' },
  { nome: 'Drenagem Linfática', preco: 150, duracao: 60, categoria: 'massagem' },
  { nome: 'Limpeza de Pele', preco: 100, duracao: 60, categoria: 'skincare' },
  { nome: 'Tratamento Facial', preco: 180, duracao: 90, categoria: 'skincare' },
  { nome: 'Depilação Facial', preco: 35, duracao: 20, categoria: 'depilacao' },
  { nome: 'Depilação Corporal', preco: 80, duracao: 45, categoria: 'depilacao' },
  { nome: 'Botox', preco: 350, duracao: 30, categoria: 'harmonizacao' },
  { nome: 'Preenchimento Labial', preco: 400, duracao: 45, categoria: 'harmonizacao' },
]