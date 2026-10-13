'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SiteSettings } from '@/lib/settings'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/projects', label: 'Developments' },
  { href: '/profile', label: 'School Profile' },
  { href: '/news', label: 'News' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:bg-primary-800 transition-colors">
              KCS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary-700 leading-tight">
                {settings.site_name || 'Kiboya Comprehensive School'}
              </p>
              <p className="text-xs text-gray-500">{settings.site_motto || 'Excellence in Education'}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary-700 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current"></span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden border-t border-gray-100 py-3 pb-4">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
