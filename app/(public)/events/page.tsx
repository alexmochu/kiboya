// app/(public)/events/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDateTime } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events at Kiboya Comprehensive School.',
}

export default async function EventsPage() {
  const now = new Date()
  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, startDate: { gte: now } },
      orderBy: { startDate: 'asc' },
    }),
    prisma.event.findMany({
      where: { published: true, startDate: { lt: now } },
      orderBy: { startDate: 'desc' },
      take: 12,
    }),
  ])

  const EventCard = ({ event }: { event: typeof upcoming[0] }) => (
    <Link href={`/events/${event.slug}`} className="card p-6 group flex gap-4">
      <div className="bg-primary-700 text-white rounded-xl p-3 text-center min-w-[56px] flex-shrink-0">
        <p className="text-xl font-bold">{new Date(event.startDate).getDate()}</p>
        <p className="text-xs uppercase">
          {new Date(event.startDate).toLocaleString('en-KE', { month: 'short' })}
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 mb-1 transition-colors">
          {event.title}
        </h3>
        <p className="text-xs text-gray-400">{formatDateTime(event.startDate)}</p>
        {event.location && <p className="text-xs text-gray-400 mt-1">📍 {event.location}</p>}
        {event.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{event.description}</p>
        )}
      </div>
    </Link>
  )

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">School Calendar</p>
          <h1 className="text-4xl font-heading font-bold">Events</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">📅 Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-400">No upcoming events at this time. Check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-500 mb-6">Past Events</h2>
            <div className="grid sm:grid-cols-2 gap-4 opacity-80">
              {past.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
