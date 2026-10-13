// app/admin/submissions/page.tsx
import { prisma } from '@/lib/prisma'
import { formatRelative } from '@/lib/utils'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Contact Inbox' }

export default async function SubmissionsPage() {
  const subs = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <AdminPageHeader
        title="Contact Inbox"
        description={`${subs.filter((s) => !s.read).length} unread message${subs.filter((s) => !s.read).length !== 1 ? 's' : ''}`}
      />
      <div className="p-8">
        {subs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📬</p>
            <p className="text-gray-400">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subs.map((s) => (
              <div key={s.id} className={`bg-white rounded-xl border p-5 ${!s.read ? 'border-primary-300 shadow-sm' : 'border-gray-100'}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="font-semibold text-gray-800">{s.name}</span>
                    {!s.read && <span className="ml-2 px-2 py-0.5 bg-primary-700 text-white text-xs rounded-full">New</span>}
                    <div className="flex gap-3 text-xs text-gray-400 mt-1">
                      <a href={`mailto:${s.email}`} className="hover:text-primary-600">{s.email}</a>
                      {s.phone && <span>{s.phone}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{formatRelative(s.createdAt)}</span>
                </div>
                {s.subject && <p className="text-sm font-medium text-gray-700 mb-1">Re: {s.subject}</p>}
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{s.message}</p>
                <div className="mt-3 flex gap-2">
                  <a href={`mailto:${s.email}?subject=Re: ${s.subject || 'Your enquiry'}`} className="text-xs btn-primary py-1 px-3">
                    Reply by Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
