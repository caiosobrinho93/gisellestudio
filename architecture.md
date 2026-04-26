# Arquitetura do Sistema — Belleza Premium

## Visão Geral

Sistema completo de gestão para salão de beleza premium, desenvolvido com arquitetura moderna, escalável e de alta qualidade.

## Stack Tecnológica

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Animações**: Framer Motion
- **Estado Global**: React Context + Zustand
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL (prévio) / SQLite (desenvolvimento)
- **Validação**: Zod

### Autenticação
- JWT com NextAuth.js
- Cookies seguros httpOnly

---

## Estrutura de Diretórios

```
/app
  /(public)
    /page.tsx              # Homepage
    /servicos/page.tsx     # Page de serviços
    /contato/page.tsx      # Page de contato
  /(auth)
    /login/page.tsx       # Login
    /registro/page.tsx    # Registro
  /(dashboard)
    /dashboard
      /page.tsx           # Dashboard principal
      /clientes/page.tsx  # Gestão de clientes
      /agendamentos/page.tsx # Agenda
      /servicos/page.tsx   # Gestão de serviços
      /funcionarios/page.tsx # Gestão de funcionários
      /financeiro/page.tsx # Controle financeiro
      /configuracoes/page.tsx # Configurações
  /api
    /auth/[...nextauth]/route.ts
    /clientes/route.ts
    /agendamentos/route.ts
    /servicos/route.ts
    /funcionarios/route.ts
    /financeiro/route.ts

/components
  /ui                      # Componentes base (Button, Input, Card, etc.)
  /layout                   # Componentes de layout (Navbar, Sidebar, Footer)
  /home                    # Componentes específicos da homepage
  /agendamento             # Componentes do sistema de agendamento
  /dashboard               # Componentes do dashboard

/modules
  /agendamento             # Módulo de agendamento
  /clientes                 # Módulo de clientes
  /servicos                 # Módulo de serviços
  /funcionarios             # Módulo de funcionários
  /financeiro               # Módulo financeiro
  /auth                    # Módulo de autenticação

/lib
  /prisma.ts               # Cliente Prisma
  /utils.ts               # Utilitários
  /constants.ts           # Constantes do projeto
  /types.ts              # Tipos TypeScript

/hooks
  /useAuth.ts            # Hook de autenticação
  /useAgendamento.ts    # Hook de agendamento
  /useClient.ts         # Hook de clientes

/styles
  /globals.css          # Estilos globais

/public
  /img                  # Imagens
  /icons                # Ícones

/prisma
  /schema.prisma        # Schema do banco de dados

/database
  /seed.ts             # Dados iniciais

/docs
  /api.md              # Documentação da API
```

---

## Modelos de Dados (Prisma Schema)

### Cliente
- id: UUID
- nome: String
- email: String (único)
- telefone: String
- observacoes: String?
- createdAt: DateTime
- updatedAt: DateTime
- agendamentos: Agendamento[]

### Servico
- id: UUID
- nome: String
- descricao: String?
- preco: Decimal
- duracao: Int (minutos)
- categoria: String
- ativo: Boolean
- createdAt: DateTime
- updatedAt: DateTime

### Funcionario
- id: UUID
- nome: String
- email: String (único)
- telefone: String?
- especialidade: String[]
- avatar: String?
- ativo: Boolean
- createdAt: DateTime
- updatedAt: DateTime
- agendamentos: Agendamento[]

### Agendamento
- id: UUID
- clienteId: UUID (FK)
- servicoId: UUID (FK)
- funcionarioId: UUID (FK)
- data: DateTime
- horario: String
- duracao: Int
- status: Enum (PENDENTE, CONFIRMADO, CANCELADO, CONCLUIDO)
- valor: Decimal
- observacoes: String?
- createdAt: DateTime
- updatedAt: DateTime

### Configuracao
- id: UUID
- chave: String
- valor: String
- updatedAt: DateTime

---

## Fluxo de Autenticação

1. Usuário acessa `/login`
2. Insere credenciais (email/senha)
3. Backend valida credenciais via Prisma
4. Gera JWT token
5. Armazena em cookie httpOnly
6. Redireciona para `/dashboard`

**Proteção de rotas**: Middleware que verifica JWT em todas as rotas do dashboard.

---

## Sistema de Agendamento

### Fluxo
1. Seleção de serviço(es)
2. Seleção de profissional (opcional)
3. Seleção de data
4. Seleção de horário disponível
5. Confirmação com dados do cliente
6. Envio de confirmação

### Regras de Negócio
- Não permitir agendamento em horários já ocupados
- Considerar duração do serviço
- Considerar intervalo entre agendamentos
- Validar horário de funcionamento
- Bloquear domingos e feriados (configurável)

---

## Componentes UI Principais

### Button
- Variantes: primary, secondary, ghost, danger
- Tamanhos: sm, md, lg
- Estados: default, hover, active, disabled, loading

### Input
- Estados: default, focus, error, disabled
- Suporte a label, helper text, error message

### Card
- Variantes: default, outlined, elevated
- Suporte a header, footer, ações

### Modal
- Animações de entrada/saída
- Overlay com backdrop blur
- Fechar ao clicar outside

### Calendar
- Visualização mensal
- Indicação de dias com agendamentos
- Seleção de data

### Table
- Sorting
- Paginação
- Row selection
- Ações

---

## Responsividade

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px - 1440px
- Ultrawide: > 1440px

---

## Animações

### Transitions
- Default: 200ms ease-out
- Slow: 300ms ease-in-out
- Fast: 150ms ease-out

### Microinterações
- Hover em botões: scale 1.02
- Hover em cards: translateY -4px
- Focus inputs: border color transition

### Page Transitions
- Fade in: 300ms
- Staggered children: 50ms delay

---

## Segurança

- Validação de dados com Zod
- SQL injection prevention via Prisma
- XSS prevention
- CSRF tokens
- Rate limiting em APIs
- Senhas hasheadas com bcrypt

---

## Performance

- Server Components por padrão
- Image optimization com next/image
- Code splitting automático
- Lazy loading de componentes
- Prefetch de rotas
- Cache de API

---

## Deploy

### Recomendado
- Vercel (frontend + API)
- Supabase (PostgreSQL)

### Variáveis de Ambiente
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

---

## Próximas Expansões

- App mobile (React Native/Expo)
-Notifications push
- Sistema de fidelidade
- Relatórios avançados
- Integração com pagamento
- Email/SMS marketing