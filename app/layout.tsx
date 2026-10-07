import type { Metadata } from 'next'
import { Literata } from 'next/font/google'
import FlowField from '@/components/FlowField'
import './globals.css'

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-literata',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arnav-sharma2.com'),
  title: 'Arnav Sharma | CS @ Penn State & IBM Intern',
  description: 'Computer Science student at Penn State working on AI engineering, LLM inference, model serving, evaluation, and reliable data systems.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arnav Sharma | CS @ Penn State & IBM Intern',
    description: 'Computer Science student at Penn State working on AI engineering, LLM inference, model serving, evaluation, and reliable data systems.',
    url: '/',
    type: 'website',
  },
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
    <html lang="en" className={literata.variable}>
      <body>
        <a className="skip-link" href="#main">skip to content</a>
        <FlowField />
        {children}
      </body>
    </html>
  )
}
