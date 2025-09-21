import type { Metadata } from 'next'
import './globals.css'
import MemoryManager from '@/components/MemoryManager'

export const metadata: Metadata = {
  title: 'Arnav Sharma',
  description: 'Personal website showcasing my experience, projects, and skills',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <MemoryManager />
      </body>
    </html>
  )
}
