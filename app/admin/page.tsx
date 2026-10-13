// app/admin/page.tsx
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const session = await auth()
  const [postCount, eventCount, galleryCount, staffCount, sponsorCount, inbox] = await Promise.all([
    prisma.post.count(),
    prisma.event.count(),
    prisma.galleryAlbum.count(),
    prisma.staffMember.count(),
    prisma.sponsor.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ])

  const stats = [
    { label: 'News Posts',    value: postCount,    href: '/admin/posts',       icon: '📰' },
    { label: 'Events',        value: eventCount,   href: '/admin/events',      icon: '📅' },
    { label: 'Albums',        value: galleryCount, href: '/admin/gallery',     icon: '🖼️' },
    { label: 'Staff Members', value: staffCount,   href: '/admin/staff',       icon: '👥' },
    { label: 'Sponsors',      value: sponsorCount, href: '/admin/sponsors',    icon: '🤝' },
    { label: 'Unread Inbox',  value: inbox,        href: '/admin/submissions', icon: '📬', highlight: inbox > 0 },
  ]

  const quickLinks = [
    { href: '/admin/posts/new',    label: 'Write News Article', icon: '✍️' },
    { href: '/admin/events/new',   label: 'Add Event',          icon: '➕' },
    { href: '/admin/gallery/new',  label: 'Create Album',       icon: '🖼️' },
    { href: '/admin/staff/new',    label: 'Add Staff Member',   icon: '👤' },
    { href: '/admin/settings',     label: 'Edit Settings',      icon: '⚙️' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-800">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Kiboya Comprehensive School — CMS Dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`card p-5 text-center hover:shadow-md transition-shadow ${
              s.highlight ? 'border-2 border-gold-400 bg-gold-50' : ''
            }`}
          >
            <span className="text-2xl block mb-2">{s.icon}</span>
            <p className="text-3xl font-bold text-primary-700">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-primary-700 hover:text-white hover:border-primary-700 transition-colors shadow-sm"
            >
              <span>{q.icon}</span>
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Help block */}
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 max-w-xl">
        <h3 className="font-semibold text-primary-700 mb-2">💡 Getting Started</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Use the sidebar to navigate between content sections.</li>
          <li>All changes are saved instantly to the database.</li>
          <li>Published items appear on the public website immediately.</li>
          <li>Contact the program team at <strong>kienischools@gmail.com</strong> for help.</li>
        </ul>
      </div>
    </div>
  )
}
