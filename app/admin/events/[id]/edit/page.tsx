// app/admin/events/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EventForm from '@/components/admin/EventForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Event' }

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ev = await prisma.event.findUnique({ where: { id } })
  if (!ev) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Event" backHref="/admin/events" />
      <EventForm
        initial={{
          id:          ev.id,
          title:       ev.title,
          slug:        ev.slug,
          description: ev.description || '',
          content:     ev.content     || '',
          coverImage:  ev.coverImage  || '',
          startDate:   ev.startDate.toISOString().slice(0, 16),
          endDate:     ev.endDate?.toISOString().slice(0, 16) || '',
          location:    ev.location    || '',
          published:   ev.published,
        }}
      />
    </div>
  )
}
