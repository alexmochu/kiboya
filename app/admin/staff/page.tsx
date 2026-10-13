// app/admin/staff/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { initialsAvatar, staffCategoryLabel } from '@/lib/utils'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Staff & Leadership' }

export default async function AdminStaffPage() {
  const staff = await prisma.staffMember.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-800">Staff & Leadership</h1>
          <p className="text-sm text-gray-500">{staff.length} member{staff.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/staff/new" className="btn-primary">+ Add Member</Link>
      </div>
      <div className="p-8">
        {staff.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">👥</p>
            <p className="text-gray-400 mb-4">No staff members yet.</p>
            <Link href="/admin/staff/new" className="btn-primary">Add First Member</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {staff.map((m) => (
              <Link key={m.id} href={`/admin/staff/${m.id}/edit`} className="card p-5 text-center group hover:shadow-md transition-shadow">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-gray-100">
                  <Image src={m.photo || initialsAvatar(m.name)} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="font-medium text-gray-800 group-hover:text-primary-700 text-sm">{m.name}</h3>
                <p className="text-xs text-primary-600">{m.title}</p>
                <p className="text-xs text-gray-400 mt-1">{staffCategoryLabel(m.category)}</p>
                {!m.published && <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">Hidden</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
