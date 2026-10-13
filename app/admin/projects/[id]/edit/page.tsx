// app/admin/projects/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectForm from '@/components/admin/ProjectForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Project' }
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await prisma.project.findUnique({ where: { id } })
  if (!p) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Project" backHref="/admin/projects" />
      <ProjectForm initial={{ id: p.id, title: p.title, slug: p.slug, description: p.description||'', content: p.content||'', coverImage: p.coverImage||'', status: p.status, order: p.order, published: p.published }} />
    </div>
  )
}
