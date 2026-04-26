# Design System — Belleza Premium

Este documento é a autoridade máxima visual do projeto. Todo código deve seguir rigorosamente estas especificações.

---

## 1. Filosofia Visual

### Conceito
- Minimalismo sofisticado com luxo moderno
- Sensação de SPA premium exclusivo
- Elegância clean futurista
- Apple-inspired premium

### Princípios
- Menos é mais
- Cada elemento deve ter propósito
- Espaco negativo é parte do design
- Qualidade sobre quantidade
- Sensação de exclusividade

---

## 2. Paleta de Cores

### Cores Primárias

```
--bg-primary: #FAFAFA          -- Fundo principal (off-white gelado)
--bg-secondary: #F5F5F5       -- Fundo secundário
--bg-tertiary: #EFEFEF        -- Fundo terciário
--bg-card: #FFFFFF            -- Card branco puro
```

### Cores de Texto

```
--text-primary: #1A1A1A       -- Texto principal (preto profundo)
--text-secondary: #6B6B6B     -- Texto secundário
--text-tertiary: #9CA3AF      -- Texto terciário/muted
--text-inverse: #FFFFFF       -- Texto inverso
```

### Accent Colors

```
--accent-primary: #D4A574     -- Accent nude luxo (dourado nude)
--accent-secondary: #C9A86C   -- Accent hover
--accent-tertiary: #B8956A    -- Accent active
--accent-gold: #C9A962       -- Detalhes dourados
--accent-rose: #E8D5C4       -- Rosé champagne
```

### Cores de Estado

```
--success: #10B981            -- Verde esmeralda
--warning: #F59E0B            -- Amarelo âmbar
--error: #EF4444              -- Vermelho elegante
--info: #3B82F6               -- Azul premium
```

### Glass & Effects

```
--glass-bg: rgba(255,255,255,0.7)
--glass-bg-strong: rgba(255,255,255,0.85)
--glass-border: rgba(0,0,0,0.08)
--backdrop-blur: blur(20px)
```

### Borders & Shadows

```
--border-light: #E5E5E5
--border-medium: #D4D4D4
--border-focus: #D4A574

--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--shadow-lg: 0 10px 25px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 40px rgba(0,0,0,0.15)
--shadow-glow: 0 0 40px rgba(212,165,116,0.15)
```

---

## 3. Tipografia

### Fontes

```css
--font-primary: 'Sora', sans-serif        /* Principal - moderno, limpo */
--font-secondary: 'Inter', sans-serif /* Secundário - legibilidade */
--font-display: 'Playfair Display', serif /* Títulos premium */
```

### Tamanhos

```
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem       /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem     /* 30px */
--text-4xl: 2.25rem      /* 36px */
--text-5xl: 3rem        /* 48px */
--text-6xl: 3.75rem     /* 60px */
--text-hero: 4.5rem    /* 72px */
```

### Pesos

```
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Line Heights

```
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

### Letter Spacing

```
--tracking-tight: -0.02em
--tracking-normal: 0
--tracking-wide: 0.025em
--tracking-wider: 0.05em
--tracking-widest: 0.1em
```

---

## 4. Componentes

### 4.1 Button

#### Variantes

```tsx
// Primary - Accent nude
background: --accent-primary
color: --text-primary
hover: --accent-secondary
active: --accent-tertiary

// Secondary - Outline
background: transparent
border: 1px solid --border-medium
color: --text-primary
hover: bg --bg-secondary

// Ghost
background: transparent
color: --text-secondary
hover: bg --bg-secondary

// Danger
background: --error
color: white
```

#### Tamanhos

```
sm: py-1.5 px-3 text-sm
md: py-2 px-4 text-base
lg: py-3 px-6 text-lg
```

#### Estados

```tsx
default: { opacity: 1, scale: 1 }
hover: { scale: 1.02, shadow: --shadow-md }
active: { scale: 0.98 }
disabled: { opacity: 0.5, cursor: not-allowed }
loading: { opacity: 0.7 }
```

---

### 4.2 Input

```tsx
// Estrutura
<wrapper>
  {label && <label>{label}</label>}
  <input />
  {error && <span>{error}</span>}
</wrapper>

// Estados
default: border --border-light
focus: border --accent-primary, ring --accent-rose/20
error: border --error
disabled: bg --bg-secondary
```

#### Estilos

```
height: 44px (accessibility)
padding: 12px 16px
border-radius: 12px
border: 1px solid --border-light
transition: all 200ms ease
```

---

### 4.3 Card

```tsx
// Default
bg: --bg-card
border: 1px solid --border-light
border-radius: 16px
padding: 24px

// Elevated
shadow: --shadow-lg
border: none

// Glass
bg: --glass-bg
backdrop-filter: blur(20px)
border: 1px solid --glass-border
```

#### Hover Effects
```tsx
hover: translateY(-4px), shadow: --shadow-xl
transition: all 300ms ease-out
```

---

### 4.4 Select / Dropdown

```tsx
// Estrutura similar ao Input
// Menu com:
// - max-height: 300px
// - overflow-y: auto
// - border-radius: 12px
// - shadow: --shadow-lg
// - padding: 4px

// Item
// - padding: 10px 12px
// - border-radius: 8px
// - hover: bg --bg-secondary
// - selected: bg --accent-rose
```

---

### 4.5 Table

```tsx
// Container
border: 1px solid --border-light
border-radius: 16px
overflow: hidden

// Header
bg: --bg-secondary
font-weight: 600
text-transform: uppercase
font-size: text-xs
letter-spacing: tracking-wider

// Row
border-bottom: 1px solid --border-light
hover: bg --bg-secondary

// Cell
padding: 16px 20px
```

---

### 4.6 Modal

```tsx
// Overlay
bg: rgba(0,0,0,0.4)
backdrop-filter: blur(8px)

// Content
bg: --bg-card
border-radius: 24px
max-width: 500px
padding: 32px
shadow: --shadow-xl
animation: fadeIn + scale

// Close button
top: 16px
right: 16px
size: 32px
border-radius: 8px
```

---

### 4.7 Sidebar (Dashboard)

```tsx
// Width
w: 280px (desktop)
w: 64px (collapsed)
w: 0 (mobile - drawer)

// Background
bg: --bg-card
border-right: 1px solid --border-light

// Item
padding: 12px 16px
border-radius: 10px
margin: 4px 8px

// States
default: color --text-secondary
hover: bg --bg-secondary
active: bg --accent-rose, color --text-primary
```

---

### 4.8 Navbar

```tsx
// Height
h: 72px (desktop)
h: 64px (mobile)

// Background
bg: --glass-bg-strong
backdrop-filter: blur(20px)
border-bottom: 1px solid --border-light

// Logo
font-family: --font-display
font-weight: 700
```

---

### 4.9 Calendar

```tsx
// Grid
7 colunas
gap: 4px

// Day
size: 40px
border-radius: 10px
text-center

// States
default: transparent
hover: bg --bg-secondary
selected: bg --accent-primary
today: border --accent-gold
disabled: opacity 0.3
```

---

### 4.10 Badge / Tag

```tsx
// Sizes
sm: px-2 py-0.5 text-xs
md: px-2.5 py-1 text-sm

// Variantes
default: bg --bg-secondary
primary: bg --accent-rose
success: bg --success/10 color --success
warning: bg --warning/10 color --warning
error: bg --error/10 color --error
```

---

### 4.11 Switch

```tsx
// Track
w: 44px
h: 24px
border-radius: 9999px
bg: --border-medium

// Thumb
size: 20px
border-radius: 9999px
bg: white
shadow: --shadow-sm

// Checked
bg: --accent-primary
transform: translateX(20px)
```

---

### 4.12 Loader

```tsx
// Spinner
size: 24px
border: 2px solid --border-light
border-top-color: --accent-primary
animation: spin 0.6s linear infinite

// Skeleton
bg: --bg-secondary
animation: pulse 2s ease-in-out infinite
border-radius: 8px
```

---

## 5. Animações

### Durações

```tsx
--duration-fast: 150ms
--duration-normal: 200ms
--duration-slow: 300ms
--duration-slower: 400ms
```

### Easing

```tsx
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Animações Predefinidas

```tsx
// Fade In
@keyframes fadeIn {
  from: { opacity: 0 }
  to: { opacity: 1 }
}
duration: 300ms, easing: ease-out

// Fade Up
@keyframes fadeUp {
  from: { opacity: 0, y: 20px }
  to: { opacity: 1, y: 0 }
}
duration: 300ms, easing: --ease-out

// Scale In
@keyframes scaleIn {
  from: { opacity: 0, scale: 0.95 }
  to: { opacity: 1, scale: 1 }
}
duration: 200ms, easing: --ease-out-back

// Slide In Right
@keyframes slideInRight {
  from: { opacity: 0, x: -20px }
  to: { opacity: 1, x: 0 }
}
duration: 300ms, easing: --ease-out
```

### Micro-interações

```tsx
// Button hover
scale: 1.02
duration: 150ms

// Card hover
translateY: -4px
shadow: increase
duration: 200ms

// Input focus
border-color: transition
ring: fade in
duration: 200ms

// Menu item hover
translateX: 4px
background: transition
duration: 150ms
```

---

## 6. Espaçamento

### Sistema

```tsx
// Base: 4px
// Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64

--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Padding Comum

```tsx
// Container
max-width: 1280px
padding: 0 24px (mobile)
padding: 0 40px (tablet)
padding: 0 64px (desktop)

// Card
padding: 24px

// Section
padding: 64px 0 (mobile)
padding: 96px 0 (desktop)
```

### Gap

```tsx
// Grid gap
gap: 16px (mobile)
gap: 24px (desktop)

// Stack gap
gap: 8px (tight)
gap: 16px (normal)
gap: 24px (loose)
```

---

## 7. Responsividade

### Breakpoints

```tsx
// Mobile first
sm: 640px   /* Phone landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Laptop large */
2xl: 1536px /* Ultrawide */
```

### Comportamento Mobile

```tsx
// Navbar
hide links, show hamburger
change height to 64px

// Sidebar
become drawer
swipe to open/close

// Cards
1 column
padding reduced

// Typography
smaller sizes by one step
```

### Comportamento Tablet

```tsx
// 2 columns grid
// Medium padding
// Sidebar collapsed
```

### Comportamento Desktop

```tsx
// Full layout
// Sidebar visible
// 3-4 columns grid
```

### Comportamento Ultrawide

```tsx
// Max-width container
// Center content
// Extra spacing
```

---

## 8. UX Rules

### Feedback Visual

```tsx
// Loading
show spinner or skeleton
disable interactions
show progress when possible

// Success
green toast/banner
icon check
auto dismiss 3s

// Error
red border + message
shake animation
focus first error field

// Empty State
illustration
helpful message
CTA button
```

### Acessibilidade

```tsx
// Focus visible
outline: 2px solid --accent-primary
outline-offset: 2px

// Color contrast
text: minimum 4.5:1
large text: minimum 3:1

// Keyboard navigation
tab order logical
shortcuts documented

// Screen reader
aria-labels
aria-describedby
```

### Confirmações

```tsx
// Destructive actions
require confirmation
show warning toast

// Form submission
show loading
prevent double submit
show success/error
```

### Transições

```tsx
// Page changes
fade transition
300ms duration

// Modals
fade + scale
200ms

// Drawer
slide from side
250ms
```

---

## 9. Uso no Código

### Tailwind Config

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: { /* ...cores above... */ },
      fontFamily: { /* ...fonts above... */ },
      boxShadow: { /* ...shadows above... */ },
      animation: { /* ...animações above... */ }
    }
  }
}
```

### Componente Exemplo

```tsx
import { motion } from 'framer-motion'

export function Button({ variant = 'primary', children, ...props }) {
  const variants = {
    primary: 'bg-accent-primary hover:bg-accent-secondary',
    secondary: 'bg-transparent border border-border-medium',
    // ...
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={variants[variant]}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

---

## 10. Checklist de Implementação

- [ ] Configurar Tailwind com todas as cores
- [ ] Importar fontes (Sora, Inter, Playfair Display)
- [ ] Criar componentes base com design system
- [ ] Implementar animações com Framer Motion
- [ ] Testar responsividade em todos breakpoints
- [ ] Verificar acessibilidade (focus, contrast)
- [ ] Aplicar consistência em todas as páginas