import type { Metadata, Viewport } from 'next'
import { Cinzel, Cinzel_Decorative, EB_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600'],
})
const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
  weight: ['400', '700'],
})
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  style: ['normal', 'italic'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Tarot R78 — The Sacred Oracle',
  description:
    'A mystical tarot reading experience. Shuffle the sacred deck, choose your cards, and reveal what the universe whispers in silence.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a2a2a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDecorative.variable} ${ebGaramond.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
