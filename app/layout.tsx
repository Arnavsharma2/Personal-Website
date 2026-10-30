import type { Metadata } from 'next'
import { Literata } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://personal-website-puce-ten-11.vercel.app'),
  title: 'Arnav Sharma | ML Infrastructure & Backend Systems',
  description: 'Penn State computer science student building ML infrastructure, backend systems, and developer tools, with research in language-model evaluation and agent security.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Arnav Sharma | ML Infrastructure & Backend Systems',
    description: 'ML infrastructure, agent evaluation, and backend systems. Explore Dynamo Diff, PSUMenu, and Arnav’s engineering experience.',
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
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="37763c6d-6d4a-4b11-a40e-8218a4d94c12"
          data-domains="personal-website-puce-ten-11.vercel.app"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
