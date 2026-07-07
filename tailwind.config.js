/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      screens: {
        xs: '475px',
      },
      colors: {
        forge: {
          base: '#0F172A',
          surface: '#1E293B',
          'surface-elevated': '#334155',
          'surface-dark': '#0B1120',
          'text-primary': '#F8FAFC',
          'text-secondary': '#94A3B8',
          'text-tertiary': '#64748B',
          blue: '#3B82F6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
          purple: '#A78BFA',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive) / <alpha-value>)", foreground: "hsl(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)", lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: '0 0 20px rgba(59,130,246,0.3)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.3)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.3)',
        card: '0 4px 24px rgba(0,0,0,0.2)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8", boxShadow: "0 0 12px rgba(59,130,246,0.2)" },
          "50%": { opacity: "1", boxShadow: "0 0 24px rgba(59,130,246,0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}