import { useEffect, useState } from 'react'

interface VisitStats {
  totalVisits: number
  uniqueVisits: number
  isUniqueVisit: boolean
}

export function useVisitTracker() {
  const [stats, setStats] = useState<VisitStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const logVisit = async () => {
      try {
        const response = await fetch('/api/log-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats({
            totalVisits: data.totalVisits,
            uniqueVisits: data.uniqueVisits,
            isUniqueVisit: data.isUniqueVisit
          })
        }
      } catch (error) {
        console.error('Error logging visit:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only log visit once per session
    const hasLoggedVisit = sessionStorage.getItem('visitLogged')
    if (!hasLoggedVisit) {
      logVisit()
      sessionStorage.setItem('visitLogged', 'true')
    } else {
      setIsLoading(false)
    }
  }, [])

  return { stats, isLoading }
}
