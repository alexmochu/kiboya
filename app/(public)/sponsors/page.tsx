// app/(public)/sponsors/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { sponsorTierLabel } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsors & Funders',
  description: 'Organisations and individuals supporting Kiboya Comprehensive School.',
}

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({
    where: { published: true },
    orderBy: [{ tier: 'asc' }, { order: 'asc' }],
  })

  const byTier: Record<string, typeof sponsors> = {}
  for (const s of sponsors) {
    if (!byTier[s.tier]) byTier[s.tier] = []
    byTier[s.tier].push(s)
  }

  const tierOrder = ['GOLD', 'SILVER', 'BRONZE', 'PARTNER']
  const tierEmoji: Record<string, string> = {
    GOLD: '🥇', SILVER: '🥈', BRONZE: '🥉', PARTNER: '🤝',
  }

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Recognition</p>
          <h1 className="text-4xl font-heading font-bold">Sponsors & Funders</h1>
          <p className="text-primary-100 mt-3 max-w-2xl">
            We are grateful to all individuals, organisations, and partners who support Kiboya Comprehensive School.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {tierOrder.map((tier) => {
          const items = byTier[tier]
          if (!items?.length) return null
          return (
            <section key={tier}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{tierEmoji[tier]}</span>
                <h2 className="text-2xl font-heading font-bold text-primary-700">{sponsorTierLabel(tier)}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((s) => (
                  <div key={s.id} className="card p-6 flex flex-col gap-4">
                    {s.logo && (
                      <div className="relative h-20">
                        <Image src={s.logo} alt={s.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{s.name}</h3>
                      {s.bio && <p className="text-sm text-gray-500 mt-1">{s.bio}</p>}
                    </div>
                    {s.website && (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {sponsors.length === 0 && (
          <p className="text-center text-gray-400 py-20">No sponsors listed yet.</p>
        )}

        {/* CTA */}
        <section className="bg-gold-50 border border-gold-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-heading font-bold text-primary-700 mb-4">Support Our School</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Your support helps us provide quality education, build better facilities, and equip our learners
            with the tools they need to succeed.
          </p>
          <Link href="/contact" className="btn-primary">Get in Touch to Support Us</Link>
        </section>
      </div>
    </div>
  )
}
