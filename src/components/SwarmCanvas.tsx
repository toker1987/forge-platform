/**
 * FORGE Background — Animated Gradient Mesh
 * Replaces the old particle system with a smooth, premium animated gradient.
 */

import { useEffect, useRef } from "react"

export default function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0, h = 0, animId = 0
    let t = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Soft color palette (deep navy, subtle blue, purple, teal)
    const colors = [
      [8, 12, 24],      // deep navy
      [15, 25, 50],     // navy blue
      [20, 35, 70],     // blue
      [25, 20, 55],     // deep purple
      [10, 30, 40],     // teal tint
    ]

    const blobs = [
      { x: 0.3, y: 0.3, r: 0.4, cx: colors[1], speed: 0.0003 },
      { x: 0.7, y: 0.5, r: 0.35, cx: colors[2], speed: 0.00025 },
      { x: 0.5, y: 0.7, r: 0.3, cx: colors[3], speed: 0.00035 },
      { x: 0.2, y: 0.8, r: 0.25, cx: colors[4], speed: 0.0002 },
    ]

    const draw = () => {
      t += 1

      // Base dark background
      ctx.fillStyle = "#060a12"
      ctx.fillRect(0, 0, w, h)

      // Draw each blob
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.speed) * 0.1) * w
        const by = (b.y + Math.cos(t * b.speed * 0.7) * 0.08) * h
        const br = b.r * Math.min(w, h)

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0, `rgba(${b.cx[0]}, ${b.cx[1]}, ${b.cx[2]}, 0.5)`)
        grad.addColorStop(0.5, `rgba(${b.cx[0]}, ${b.cx[1]}, ${b.cx[2]}, 0.15)`)
        grad.addColorStop(1, "rgba(6, 10, 18, 0)")

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // Subtle grid overlay
      ctx.strokeStyle = "rgba(100, 130, 180, 0.02)"
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  )
}
