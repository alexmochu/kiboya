// app/admin/sponsors/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { sponsorTierLabel } from '@/lib/utils'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Sponsors' }
export default async function AdminSponsorsPage() {
  const items = await prisma.sponsor.findMany({ orderBy: [{ tier: 'asc' }, { order: 'asc' }] })
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-gray-800">Sponsors & Partners</h1>
        <Link href="/admin/sponsors/new" className="btn-primary">+ Add Sponsor</Link>
      </div>
      <div className="p-8">
        {items.length === 0 ? (
          <div className="text-center py-20"><p className="text-4xl mb-4">🤝</p><p className="text-gray-400 mb-4">No sponsors yet.</p><Link href="/admin/sponsors/new" className="btn-primary">Add First Sponsor</Link></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(s => (
              <div key={s.id} className="card p-4 flex gap-4 items-start">
                {s.logo && <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0"><Image src={s.logo} alt={s.name} fill className="object-contain p-1" /></div>}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400">{sponsorTierLabel(s.tier)}</p>
                  {!s.published && <span className="text-xs text-gray-400">Hidden</span>}
                </div>
                <Link href={`/admin/sponsors/${s.id}/edit`} className="text-primary-600 hover:underline text-xs flex-shrink-0">Edit</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
