// app/admin/staff/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import StaffForm from '@/components/admin/StaffForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Staff Member' }

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const m = await prisma.staffMember.findUnique({ where: { id } })
  if (!m) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Staff Member" backHref="/admin/staff" />
      <StaffForm
        initial={{
          id: m.id, name: m.name, title: m.title, category: m.category,
          department: m.department || '', bio: m.bio || '', photo: m.photo || '',
          email: m.email || '', phone: m.phone || '', order: m.order, published: m.published,
        }}
      />
    </div>
  )
}
