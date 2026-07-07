import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  accent?: string;
  glow?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  accent,
  glow = false,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card",
        glow && "shadow-glow",
        className
      )}
      style={
        accent
          ? { borderTop: `2px solid ${accent}` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
