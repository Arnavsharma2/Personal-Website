'use client'

import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 36
type Particle = {
  x: number; y: number; age: number; lifetime: number
  trail: Float32Array; head: number; count: number
}

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
    const pointer = {
      x: 0, y: 0, targetX: 0, targetY: 0,
      velocityX: 0, velocityY: 0, strength: 0, active: false,
    }

    const movePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || !event.isPrimary) return
      // Start at the actual entry point instead of sweeping in from a corner.
      if (!pointer.active && pointer.strength < 0.02) {
        pointer.x = event.clientX
        pointer.y = event.clientY
      }
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.active = true
    }

    const releasePointer = () => { pointer.active = false }
    const endTouch = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') releasePointer()
    }

    const updatePointer = (delta: number) => {
      const follow = 1 - Math.exp(-delta / 85)
      const dx = (pointer.targetX - pointer.x) * follow
      const dy = (pointer.targetY - pointer.y) * follow
      pointer.x += dx
      pointer.y += dy
      pointer.velocityX = Math.max(-1.5, Math.min(1.5, dx / delta))
      pointer.velocityY = Math.max(-1.5, Math.min(1.5, dy / delta))
      const ease = 1 - Math.exp(-delta / (pointer.active ? 110 : 320))
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * ease
    }

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
      particle.head = 0
      particle.count = 0
    }

    const paint = (delta: number, time: number, render = true) => {
      const unit = Math.max(width, height)
      const firstX = width * (0.28 + Math.sin(time * 0.13) * 0.1)
      const firstY = height * (0.32 + Math.cos(time * 0.11) * 0.12)
      const secondX = width * (0.74 + Math.cos(time * 0.09) * 0.1)
      const secondY = height * (0.72 + Math.sin(time * 0.12) * 0.1)
      const distance = delta * Math.min(unit / 950, 1.3) * 0.055
      const pointerRadius = Math.min(280, Math.max(180, Math.min(width, height) * 0.34))

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
        let vx = 0.42 + wave * 0.35 - dy1 * spin1 - dy2 * spin2
        let vy = Math.cos(x * 3.8 - y * 4.5 - time * 0.17) * 0.48 + dx1 * spin1 + dx2 * spin2

        // A soft local vortex follows the cursor; its wake follows pointer motion.
        const pointerX = (particle.x - pointer.x) / pointerRadius
        const pointerY = (particle.y - pointer.y) / pointerRadius
        const influence = pointer.strength * Math.exp(-2 * (pointerX * pointerX + pointerY * pointerY))
        vx += influence * (-pointerY * 4.8 - pointerX * 0.9 + pointer.velocityX * 0.8)
        vy += influence * (pointerX * 4.8 - pointerY * 0.9 + pointer.velocityY * 0.8)
        const speed = Math.max(Math.hypot(vx, vy), 0.25)
        const travel = distance * (1 + influence * 1.3)

        particle.x += (vx / speed) * travel
        particle.y += (vy / speed) * travel
        particle.age += delta / frameInterval
        particle.head = (particle.head + 1) % TRAIL_LENGTH
        particle.trail[particle.head * 2] = particle.x
        particle.trail[particle.head * 2 + 1] = particle.y
        particle.count = Math.min(particle.count + 1, TRAIL_LENGTH)
      }
      if (!render) return

      // Finite histories fully disappear, avoiding ghost trails from alpha rounding.
      context.fillStyle = '#11120f'
      context.fillRect(0, 0, width, height)
      context.lineWidth = 1.2
      const bandLength = TRAIL_LENGTH / 3
      for (let band = 0; band < 3; band += 1) {
        context.strokeStyle = `rgba(166, 182, 165, ${[0.2, 0.1, 0.035][band]})`
        context.beginPath()
        for (const particle of particles) {
          const start = band * bandLength
          const end = Math.min((band + 1) * bandLength, particle.count - 1)
          if (start >= end) continue
          for (let age = start; age <= end; age += 1) {
            const index = ((particle.head - age + TRAIL_LENGTH) % TRAIL_LENGTH) * 2
            const x = particle.trail[index]
            const y = particle.trail[index + 1]
            if (age === start) context.moveTo(x, y)
            else context.lineTo(x, y)
          }
        }
        context.stroke()
      }
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
        const particle = {
          x: 0, y: 0, age: 0, lifetime: 0,
          trail: new Float32Array(TRAIL_LENGTH * 2), head: 0, count: 0,
        }
        resetParticle(particle)
        particle.age = random() * particle.lifetime
        return particle
      })
      // Pre-draw enough history for a composed first frame and reduced-motion view.
      for (let step = 0; step < TRAIL_LENGTH; step += 1) {
        paint(frameInterval, elapsed, step === TRAIL_LENGTH - 1)
      }
    }

    const tick = (now: number) => {
      frame = 0
      if (disposed || document.hidden || reducedMotion.matches) return
      const delta = now - lastTime
      if (delta >= frameInterval - 0.5) {
        const boundedDelta = Math.min(delta, 60)
        elapsed += boundedDelta / 1000
        updatePointer(boundedDelta)
        paint(boundedDelta, elapsed)
        lastTime = now
      }
      frame = window.requestAnimationFrame(tick)
    }

    const syncPlayback = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      if (disposed || document.hidden || reducedMotion.matches) {
        releasePointer()
        pointer.strength = 0
        return
      }
      lastTime = performance.now()
      frame = window.requestAnimationFrame(tick)
    }

    resize()
    syncPlayback()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', movePointer, { passive: true })
    window.addEventListener('pointerdown', movePointer, { passive: true })
    window.addEventListener('pointerup', endTouch, { passive: true })
    window.addEventListener('pointercancel', releasePointer, { passive: true })
    window.addEventListener('blur', releasePointer)
    document.documentElement.addEventListener('pointerleave', releasePointer)
    document.addEventListener('visibilitychange', syncPlayback)
    reducedMotion.addEventListener('change', syncPlayback)
    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', movePointer)
      window.removeEventListener('pointerdown', movePointer)
      window.removeEventListener('pointerup', endTouch)
      window.removeEventListener('pointercancel', releasePointer)
      window.removeEventListener('blur', releasePointer)
      document.documentElement.removeEventListener('pointerleave', releasePointer)
      document.removeEventListener('visibilitychange', syncPlayback)
      reducedMotion.removeEventListener('change', syncPlayback)
    }
  }, [])

  return <canvas ref={canvasRef} className="flow-field" aria-hidden="true" />
}
