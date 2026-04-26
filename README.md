# Belleza Premium — Sistema de Gestão para Salão de Beleza

Sistema completo e profissional para salão de beleza premium, construído com Next.js, TypeScript, TailwindCSS e Prisma.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## ✨ Funcionalidades

### Website Público
- Homepage cinematográfica premium
- Lista de serviços com preços
- Apresentação da equipe
- Depoimentos
- FAQ
- Galeria de fotos
- Agendamento online

### Dashboard Administrativo
- Visão geral com estatísticas
- Gestão de clientes
- Agenda completa
- Gerenciamento de serviços
- Controle de profissionais
- Financeiro básico
- Configurações do sistema

### Sistema de Agendamento
- Seleção múltipla de serviços
- Escolha de profissional
- Calendário visual
- Seleção de horário disponível
- Confirmação por email

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js
- **Icons**: Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd beleza-premium

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Gere o Prisma Client
npx prisma generate

# Execute o banco de dados
npx prisma db push

# Execute o projeto
npm run dev
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build   # Build de produção
npm run start   # Inicia o servidor de produção
npm run lint    # Verifica lint
```

## 📁 Estrutura do Projeto

```
/app                 # Páginas e rotas
  /(auth)           # Páginas de autenticação
  /(dashboard)     # Páginas do dashboard
  /api              # APIs REST
  /agendar          # Página de agendamento

/components        # Componentes React
  /ui              # Componentes base (Button, Input, Card, etc.)
  /layout          # Navbar, Footer, Sidebar
  /home            # Componentes da homepage
  /agendamento     # Sistema de agendamento
  /dashboard      # Componentes do dashboard

/lib               # Utilitários
  utils.ts         # Funções utilities
  types.ts        # Tipos TypeScript
  constants.ts    # Constantes do sistema

/prisma           # Schema do banco de dados
```

## 🎨 Design System

O sistema segue um design system premium com:
- Tipografia: Sora + Playfair Display
- Cores: nude champagne, rose gold, off-white
- Animações suaves com Framer Motion
- Glassmorphism e efeitos premium

## 📝 Licença

MIT License — Feito com ♥ para Belleza Premium