// app/(public)/profile/page.tsx
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { staffCategoryLabel, initialsAvatar } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'School Profile',
  description: 'Board, leadership, teachers, streams, and enrollment data for Kiboya Comprehensive School.',
}

export default async function ProfilePage() {
  const [staff, streams, enrollment] = await Promise.all([
    prisma.staffMember.findMany({
      where: { published: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    }),
    prisma.stream.findMany({ orderBy: [{ level: 'asc' }, { order: 'asc' }] }),
    prisma.enrollmentSnapshot.findFirst({ orderBy: { year: 'desc' } }),
  ])

  const byCategory: Record<string, typeof staff> = {}
  for (const s of staff) {
    if (!byCategory[s.category]) byCategory[s.category] = []
    byCategory[s.category].push(s)
  }

  const byLevel: Record<string, typeof streams> = {}
  for (const s of streams) {
    if (!byLevel[s.level]) byLevel[s.level] = []
    byLevel[s.level].push(s)
  }

  const categoryOrder = ['BOARD', 'LEADERSHIP', 'TEACHER', 'SUPPORT', 'COMMUNITY_PARTNER']

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Directory</p>
          <h1 className="text-4xl font-heading font-bold">School Profile</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Enrollment stats */}
        {enrollment && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">
              Student Enrollment ({enrollment.year})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: enrollment.totalStudents },
                { label: 'Male Students',  value: enrollment.maleCount },
                { label: 'Female Students', value: enrollment.femaleCount },
                { label: 'Learning Streams', value: streams.length },
              ].map((stat) => (
                <div key={stat.label} className="bg-cream rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            {enrollment.note && (
              <p className="text-sm text-gray-400 mt-3 italic">{enrollment.note}</p>
            )}
          </section>
        )}

        {/* Streams */}
        {Object.keys(byLevel).length > 0 && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">
              Classes & Streams
            </h2>
            <div className="space-y-6">
              {Object.entries(byLevel).map(([level, levelStreams]) => (
                <div key={level}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">{level}</h3>
                  <div className="flex flex-wrap gap-3">
                    {levelStreams.map((s) => (
                      <span
                        key={s.id}
                        className="px-4 py-2 bg-white border border-primary-200 text-primary-700 rounded-full text-sm font-medium shadow-sm"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Staff by category */}
        {categoryOrder.map((cat) => {
          const members = byCategory[cat]
          if (!members?.length) return null
          return (
            <section key={cat}>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">
                {staffCategoryLabel(cat)}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((m) => (
                  <div key={m.id} className="card p-5 text-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-100">
                      <Image
                        src={m.photo || initialsAvatar(m.name)}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800">{m.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{m.title}</p>
                    {m.department && (
                      <p className="text-xs text-gray-400 mt-1">{m.department}</p>
                    )}
                    {m.bio && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-3">{m.bio}</p>
                    )}
                    {(m.email || m.phone) && (
                      <div className="mt-3 space-y-1">
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="block text-xs text-primary-500 hover:underline truncate">
                            {m.email}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {staff.length === 0 && streams.length === 0 && (
          <p className="text-center text-gray-400 py-20">Profile information coming soon.</p>
        )}
      </div>
    </div>
  )
}
