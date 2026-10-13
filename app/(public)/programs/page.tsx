// app/(public)/programs/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs & Learning',
  description: 'Explore the signature programs, clubs, and learning initiatives at Kiboya Comprehensive School.',
}

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">What We Offer</p>
          <h1 className="text-4xl font-heading font-bold">Programs & Learning</h1>
          <p className="text-primary-100 mt-3 text-lg max-w-2xl">
            Signature initiatives, clubs, and learning opportunities that shape well-rounded learners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {programs.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Programs coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <Link
                key={p.id}
                href={`/programs/${p.slug}`}
                className="card p-6 group border border-transparent hover:border-primary-200"
              >
                <span className="text-4xl mb-4 block">{p.icon || '📚'}</span>
                <h2 className="font-semibold text-lg text-primary-700 mb-2 group-hover:text-primary-800">{p.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                <span className="inline-block mt-4 text-sm text-primary-600 font-semibold group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
