// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Kiboya Comprehensive School',
    template: '%s | Kiboya Comprehensive School',
  },
  description:
    'Official website of Kiboya Comprehensive School — Kieni West, Nyeri County. Quality education, holistic development.',
  keywords:  ['Kiboya', 'Comprehensive School', 'Kieni', 'Nyeri', 'Kenya', 'Secondary School'],
  metadataBase: new URL('https://kiboyacomprehensiveschool.co.ke'),
  openGraph: {
    siteName: 'Kiboya Comprehensive School',
    locale:   'en_KE',
    type:     'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased font-sans text-gray-800 bg-white">
        {children}
      </body>
    </html>
  )
}
