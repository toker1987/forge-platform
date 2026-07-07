import { useRef, useEffect } from "react"

interface Particle { x: number; y: number; vx: number; vy: number; radius: number; color: string; group: number }

const COLORS = [
  "rgba(59,130,246,0.6)", "rgba(59,130,246,0.4)", "rgba(245,158,11,0.5)",
  "rgba(16,185,129,0.5)", "rgba(167,139,250,0.4)",
]

export default function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const count = typeof window !== 'undefined' && window.innerWidth < 640 ? 35 : 60
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      group: Math.floor(Math.random() * 3),
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true })
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.5
          p.vx += (dx / dist) * force; p.vy += (dy / dist) * force
        }
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j]
          if (p.group !== o.group) continue
          const cdx = o.x - p.x, cdy = o.y - p.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < 80 && cdist > 0) { p.vx += (cdx / cdist) * 0.002; p.vy += (cdy / cdist) * 0.002 }
        }
        p.vx *= 0.995; p.vy *= 0.995
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed < 0.2) { p.vx += (Math.random() - 0.5) * 0.05; p.vy += (Math.random() - 0.5) * 0.05 }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j]
          const ldx = o.x - p.x, ldy = o.y - p.y
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ldist < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y)
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - ldist / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color; ctx.fill()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener("resize", resize, { passive: true })
    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
}