'use client'

import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; age: number; lifetime: number }

/** An original, slowly changing current field, traced by drifting particles. */
export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let lastTime = 0
    let elapsed = 0
    let seed = 72841
    let disposed = false
    const frameInterval = 1000 / 30

    // A repeatable starting field avoids a different visual on each route visit.
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      return seed / 4294967296
    }

    const resetParticle = (particle: Particle) => {
      particle.x = random() * width
      particle.y = random() * height
      particle.age = 0
      particle.lifetime = 150 + random() * 260
    }

    const paint = (delta: number, time: number) => {
      // Translucent erasure leaves fine, fading traces instead of fixed contours.
      context.fillStyle = 'rgba(17, 18, 15, 0.045)'
      context.fillRect(0, 0, width, height)
      context.lineWidth = 0.7
      context.strokeStyle = 'rgba(166, 182, 165, 0.21)'
      context.beginPath()

      const unit = Math.max(width, height)
      const firstX = width * (0.28 + Math.sin(time * 0.13) * 0.1)
      const firstY = height * (0.32 + Math.cos(time * 0.11) * 0.12)
      const secondX = width * (0.74 + Math.cos(time * 0.09) * 0.1)
      const secondY = height * (0.72 + Math.sin(time * 0.12) * 0.1)
      const distance = delta * Math.min(unit / 950, 1.3) * 0.055

      for (const particle of particles) {
        if (particle.age > particle.lifetime || particle.x < -2 || particle.x > width + 2 || particle.y < -2 || particle.y > height + 2) {
          resetParticle(particle)
        }

        const x = particle.x / unit
        const y = particle.y / unit
        const dx1 = (particle.x - firstX) / unit
        const dy1 = (particle.y - firstY) / unit
        const dx2 = (particle.x - secondX) / unit
        const dy2 = (particle.y - secondY) / unit
        const spin1 = 0.16 / (dx1 * dx1 + dy1 * dy1 + 0.035)
        const spin2 = -0.13 / (dx2 * dx2 + dy2 * dy2 + 0.04)
        const wave = Math.sin(x * 5.2 + y * 3.1 + time * 0.22)
        const vx = 0.42 + wave * 0.35 - dy1 * spin1 - dy2 * spin2
        const vy = Math.cos(x * 3.8 - y * 4.5 - time * 0.17) * 0.48 + dx1 * spin1 + dx2 * spin2
        const speed = Math.max(Math.hypot(vx, vy), 0.25)

        context.moveTo(particle.x, particle.y)
        particle.x += (vx / speed) * distance
        particle.y += (vy / speed) * distance
        particle.age += delta / frameInterval
        context.lineTo(particle.x, particle.y)
      }
      context.stroke()
    }

    const resize = () => {
      const nextWidth = window.innerWidth
      const nextHeight = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      if (width === nextWidth && height === nextHeight && canvas.width === Math.round(nextWidth * ratio)) return
      width = nextWidth
      height = nextHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.fillStyle = '#11120f'
      context.fillRect(0, 0, width, height)
      seed = 72841
      particles = Array.from({ length: Math.min(1700, Math.max(480, Math.round(width * height / 650))) }, () => {
        const particle = { x: 0, y: 0, age: 0, lifetime: 0 }
        resetParticle(particle)
        particle.age = random() * particle.lifetime
        return particle
      })
      // Pre-draw enough history for a composed first frame and reduced-motion view.
      for (let step = 0; step < 80; step += 1) paint(frameInterval, elapsed)
    }

    const tick = (now: number) => {
      frame = 0
      if (disposed || document.hidden || reducedMotion.matches) return
      const delta = now - lastTime
      if (delta >= frameInterval - 0.5) {
        const boundedDelta = Math.min(delta, 60)
        elapsed += boundedDelta / 1000
        paint(boundedDelta, elapsed)
        lastTime = now
      }
      frame = window.requestAnimationFrame(tick)
    }

    const syncPlayback = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      if (disposed || document.hidden || reducedMotion.matches) return
      lastTime = performance.now()
      frame = window.requestAnimationFrame(tick)
    }

    resize()
    syncPlayback()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', syncPlayback)
    reducedMotion.addEventListener('change', syncPlayback)
    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', syncPlayback)
      reducedMotion.removeEventListener('change', syncPlayback)
    }
  }, [])

  return <canvas ref={canvasRef} className="flow-field" aria-hidden="true" />
}
