// app/admin/projects/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { projectStatusColor } from '@/lib/utils'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Projects' }
export default async function AdminProjectsPage() {
  const items = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-gray-800">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary">+ New Project</Link>
      </div>
      <div className="p-8">
        {items.length === 0 ? (
          <div className="text-center py-20"><p className="text-4xl mb-4">🏗️</p><p className="text-gray-400 mb-4">No projects yet.</p><Link href="/admin/projects/new" className="btn-primary">Add First Project</Link></div>
        ) : (
          <div className="space-y-2">
            {items.map(p => (
              <div key={p.id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.description || 'No description'}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${projectStatusColor(p.status)}`}>{p.status}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.published ? 'Live' : 'Draft'}</span>
                <Link href={`/admin/projects/${p.id}/edit`} className="text-primary-600 hover:underline text-sm">Edit</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
