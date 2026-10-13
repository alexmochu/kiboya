'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/posts', label: 'News & Updates', icon: '📰' },
  { href: '/admin/events', label: 'Events', icon: '📅' },
  { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
  { href: '/admin/staff', label: 'Staff & Leadership', icon: '👥' },
  { href: '/admin/programs', label: 'Programs', icon: '📚' },
  { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { href: '/admin/sponsors', label: 'Sponsors', icon: '🤝' },
  { href: '/admin/submissions', label: 'Contact Inbox', icon: '📬' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-primary-700 text-white flex flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-primary-600">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
            KCS
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">Kiboya Comp. School</p>
            <p className="text-xs text-primary-200">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-primary-800 text-white font-semibold'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-600">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-primary-200 hover:text-white mb-3 transition-colors"
        >
          🌐 View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="w-full flex items-center gap-2 text-xs text-primary-200 hover:text-white transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}
