'use client'

import { useEffect } from 'react'

export default function VisitTracker() {
  useEffect(() => {
    // Storage may be unavailable in private or restricted browsing contexts.
    try {
      if (!sessionStorage.getItem('visitLogged')) {
        fetch('/api/log-visit', { method: 'POST' }).catch(() => {})
        sessionStorage.setItem('visitLogged', 'true')
      }
    } catch {
      // Visit logging should never prevent the portfolio from rendering.
    }
  }, [])

  return null
}
