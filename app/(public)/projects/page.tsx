// app/(public)/projects/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { projectStatusColor } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developments & Projects',
  description: 'Completed projects and ongoing improvements at Kiboya Comprehensive School.',
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })

  const completed = projects.filter((p) => p.status === 'COMPLETED')
  const ongoing   = projects.filter((p) => p.status === 'ONGOING')
  const planned   = projects.filter((p) => p.status === 'PLANNED')
  const groups = [
    { label: '✅ Completed Projects', items: completed },
    { label: '🔄 Ongoing Projects',   items: ongoing },
    { label: '📋 Planned Projects',   items: planned },
  ]

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Our Progress</p>
          <h1 className="text-4xl font-heading font-bold">Developments & Projects</h1>
          <p className="text-primary-100 mt-3 text-lg">
            Investing in infrastructure and resources for better learning.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {groups.map(({ label, items }) =>
          items.length > 0 ? (
            <section key={label}>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">{label}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p) => (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="card group">
                    {p.coverImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-5xl">🏗️</span>
                      </div>
                    )}
                    <div className="p-5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${projectStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 mb-2 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-500">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null
        )}
        {projects.length === 0 && (
          <p className="text-center text-gray-400 py-20">Projects coming soon.</p>
        )}
      </div>
    </div>
  )
}
