'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

interface DashLine {
  x: number
  y: number
  angle: number
  speed: number
  length: number
  dashPattern: string
  alpha: number
  color: string
}

const COLORS = [
  'rgba(96, 165, 250, ',   // blue-400
  'rgba(139, 92, 246, ',   // violet-500
  'rgba(59, 130, 246, ',   // blue-500
  'rgba(167, 139, 250, ',  // violet-400
  'rgba(99, 102, 241, ',   // indigo-500
  'rgba(129, 140, 248, ',  // indigo-400
]

const DASH_PATTERNS = ['>>>', '---', '>>>>', '--', '>>>>>', '> >', '- -', '>>']

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const dashLinesRef = useRef<DashLine[]>([])
  const animationRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const createParticle = useCallback((w: number, h: number): Particle => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 1,
      color,
      alpha: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 500 + 300,
    }
  }, [])

  const createDashLine = useCallback((w: number, h: number): DashLine => {
    const angle = (Math.random() * Math.PI * 2)
    const side = Math.floor(Math.random() * 4)
    let x: number, y: number

    // Spawn from edges
    switch (side) {
      case 0: x = -50; y = Math.random() * h; break
      case 1: x = w + 50; y = Math.random() * h; break
      case 2: x = Math.random() * w; y = -50; break
      default: x = Math.random() * w; y = h + 50; break
    }

    return {
      x,
      y,
      angle: Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.5,
      speed: Math.random() * 1.5 + 0.5,
      length: Math.random() * 80 + 40,
      dashPattern: DASH_PATTERNS[Math.floor(Math.random() * DASH_PATTERNS.length)],
      alpha: Math.random() * 0.15 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = { width: w, height: h }
    }

    resize()
    window.addEventListener('resize', resize)

    const { width: w, height: h } = dimensionsRef.current

    // Initialize particles
    const particleCount = Math.min(Math.floor((w * h) / 8000), 150)
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(w, h))

    // Initialize dash lines
    dashLinesRef.current = Array.from({ length: 12 }, () => createDashLine(w, h))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw and update particles
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        // Cursor interaction — gentle attraction
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200
          p.vx += (dx / dist) * force * 0.015
          p.vy += (dy / dist) * force * 0.015
          // Brighten near cursor
          p.alpha = Math.min(p.alpha + 0.02, 0.8)
        } else {
          // Fade back
          p.alpha = Math.max(p.alpha - 0.005, 0.1)
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Respawn if life exceeded
        if (p.life > p.maxLife) {
          const newP = createParticle(width, height)
          particles[i] = newP
          continue
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ')'
        ctx.fill()
      }

      // Draw cursor glow blob
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)')
        gradient.addColorStop(0.4, 'rgba(139, 92, 246, 0.04)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(mx - 200, my - 200, 400, 400)
      }

      // Draw and update dash lines
      const dashes = dashLinesRef.current
      for (let i = 0; i < dashes.length; i++) {
        const d = dashes[i]

        d.x += Math.cos(d.angle) * d.speed
        d.y += Math.sin(d.angle) * d.speed

        // Cursor deflection for dash lines
        const ddx = mx - d.x
        const ddy = my - d.y
        const ddist = Math.sqrt(ddx * ddx + ddy * ddy)
        if (ddist < 150 && ddist > 0) {
          const deflect = (150 - ddist) / 150
          d.x -= (ddx / ddist) * deflect * 2
          d.y -= (ddy / ddist) * deflect * 2
          d.alpha = Math.min(d.alpha + 0.02, 0.3)
        }

        // Draw dash text
        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(d.angle)
        ctx.font = '11px monospace'
        ctx.fillStyle = d.color + d.alpha + ')'
        ctx.fillText(d.dashPattern, 0, 0)
        ctx.restore()

        // Reset if off-screen
        if (d.x < -100 || d.x > width + 100 || d.y < -100 || d.y > height + 100) {
          dashes[i] = createDashLine(width, height)
        }
      }

      // Draw subtle connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.06
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [createParticle, createDashLine])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
