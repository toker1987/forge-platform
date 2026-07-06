import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  accentColor?: "blue" | "amber" | "emerald" | "rose" | "purple"
  className?: string
  glow?: boolean
  hover?: boolean
}

const accentMap = {
  blue: "border-t-forge-blue/30",
  amber: "border-t-forge-amber/30",
  emerald: "border-t-forge-emerald/30",
  rose: "border-t-forge-rose/30",
  purple: "border-t-forge-purple/30",
}

const glowMap = {
  blue: "hover:shadow-glow",
  amber: "hover:shadow-glow-amber",
  emerald: "hover:shadow-glow-emerald",
  rose: "hover:shadow-glow-rose",
  purple: "hover:shadow-glow-purple",
}

export default function GlassCard({ children, accentColor, className, glow = true, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative glass-card p-6 transition-all duration-300",
        accentColor && `border-t-2 ${accentMap[accentColor]}`,
        glow && accentColor && glowMap[accentColor],
        hover && "hover:scale-[1.01] hover:border-opacity-30",
        className
      )}
    >
      {children}
    </div>
  )
}
