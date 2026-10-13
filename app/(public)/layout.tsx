// app/(public)/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { getSiteSettings } from '@/lib/settings'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kiboya Comprehensive School',
    template: '%s | Kiboya Comprehensive School',
  },
  description:
    'Kiboya Comprehensive School — Nurturing Excellence, Building Tomorrow. A member of the Kieni Schools Digital Participation Program.',
  keywords: ['Kiboya', 'Comprehensive School', 'Kieni', 'Nyeri County', 'Secondary School Kenya'],
  metadataBase: new URL('https://kiboyacomprehensiveschool.co.ke'),
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen bg-white text-gray-800 antialiased">
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
