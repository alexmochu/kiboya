// app/admin/events/new/page.tsx
import EventForm from '@/components/admin/EventForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'New Event' }
export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader title="New Event" backHref="/admin/events" />
      <EventForm />
    </div>
  )
}
