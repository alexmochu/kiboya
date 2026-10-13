// app/(public)/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await prisma.event.findUnique({ where: { slug, published: true } })
  if (!event) notFound()

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/events" className="text-primary-200 text-sm hover:text-white mb-4 inline-block">
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-heading font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 mt-4 text-primary-100 text-sm">
            <span>📅 {formatDate(event.startDate)}</span>
            {event.endDate && <span>to {formatDate(event.endDate)}</span>}
            {event.location && <span>📍 {event.location}</span>}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {event.coverImage && (
          <div className="relative h-72 rounded-xl overflow-hidden mb-8">
            <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
          </div>
        )}
        {event.description && (
          <p className="text-xl text-gray-500 mb-8 leading-relaxed">{event.description}</p>
        )}
        {event.content ? (
          <div className="prose-school" dangerouslySetInnerHTML={{ __html: event.content }} />
        ) : (
          <p className="text-gray-400">More details will be shared closer to the date.</p>
        )}
      </div>
    </div>
  )
}
