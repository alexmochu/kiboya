// app/admin/programs/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProgramForm from '@/components/admin/ProgramForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Program' }
export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await prisma.program.findUnique({ where: { id } })
  if (!p) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Program" backHref="/admin/programs" />
      <ProgramForm initial={{ id: p.id, title: p.title, slug: p.slug, description: p.description||'', content: p.content||'', icon: p.icon||'📚', order: p.order, published: p.published }} />
    </div>
  )
}
