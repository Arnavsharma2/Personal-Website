'use client'

import { useEffect } from 'react'
import IconNav from '@/components/IconNav'
import ProfileHero from '@/components/ProfileHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import ProjectsGrid from '@/components/ProjectsGrid'
import Contact from '@/components/Contact'

export default function Home() {
  // Silent visit tracking
  useEffect(() => {
    const hasLogged = sessionStorage.getItem('visitLogged')
    if (!hasLogged) {
      fetch('/api/log-visit', { method: 'POST' }).catch(() => { })
      sessionStorage.setItem('visitLogged', 'true')
    }
  }, [])

  return (
    <main className="site-main">
      <IconNav />
      <ProfileHero />
      <About />
      <Experience />
      <ProjectsGrid />
      <Contact />
    </main>
  )
}
