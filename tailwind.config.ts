import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
colors: {
        bg: {
          primary: '#050505',
          secondary: '#0A0A0A',
          tertiary: '#141414',
          card: '#0F0F0F',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#B0B0B0',
          tertiary: '#888888',
          inverse: '#0A0A0A',
        },
        accent: {
          primary: '#FF3366',
          secondary: '#FF1A53',
          tertiary: '#E60040',
          gold: '#FFD700',
          neon: '#00FFAA',
          purple: '#8B5CF6',
        },
        success: '#00FF88',
        warning: '#FFB800',
        error: '#FF4757',
        info: '#00AAFF',
        border: {
          light: '#2A2A2A',
          medium: '#3D3D3D',
          focus: '#FF3366',
        },
      },
      fontFamily: {
        primary: ['Manrope', 'sans-serif'],
        secondary: ['DM Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.4)',
        md: '0 4px 16px rgba(0,0,0,0.5)',
        lg: '0 8px 32px rgba(0,0,0,0.6)',
        xl: '0 16px 48px rgba(0,0,0,0.7)',
        glow: '0 0 40px rgba(255,51,102,0.3)',
        'glow-neon': '0 0 30px rgba(0,255,170,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-down': 'fadeDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,51,102,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,51,102,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config