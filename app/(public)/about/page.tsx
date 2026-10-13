// app/(public)/about/page.tsx
import { getSiteSettings } from '@/lib/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Kiboya Comprehensive School — our history, mission, vision, and values.',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <div>
      {/* Page header */}
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Know Us Better</p>
          <h1 className="text-4xl font-heading font-bold">About Kiboya Comprehensive School</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {settings.site_mission || 'To provide quality, inclusive education that empowers learners with knowledge, skills, and values for lifelong success.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {settings.site_vision || 'To be a centre of academic excellence and holistic development in Kieni Constituency.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-6">Our Core Values</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: '🌟', value: 'Excellence', desc: 'We strive for the highest standards in all we do.' },
                  { icon: '🤝', value: 'Integrity', desc: 'We act with honesty, transparency, and accountability.' },
                  { icon: '🌍', value: 'Inclusivity', desc: 'Every learner belongs and is valued.' },
                  { icon: '💪', value: 'Resilience', desc: 'We build grit and a growth mindset in our students.' },
                  { icon: '🌱', value: 'Responsibility', desc: 'We take care of our community and environment.' },
                  { icon: '🔬', value: 'Innovation', desc: 'We embrace new ideas and creative thinking.' },
                ].map((v) => (
                  <div key={v.value} className="flex gap-4 p-4 bg-cream rounded-xl">
                    <span className="text-2xl flex-shrink-0">{v.icon}</span>
                    <div>
                      <h3 className="font-semibold text-primary-700">{v.value}</h3>
                      <p className="text-sm text-gray-500">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-primary-700 mb-4">Our History</h2>
              <p className="text-gray-600 leading-relaxed">
                Kiboya Comprehensive School was established in {settings.established_year || '1985'} to serve the educational needs
                of learners in Kieni West Sub-County, Nyeri County. Over the decades, the school has grown from a modest institution
                to a thriving secondary school, producing thousands of graduates who have gone on to excel in various fields across Kenya and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Today, the school continues to grow and modernise — now proudly part of the{' '}
                <strong>Kieni Schools Digital Participation Program</strong>, bringing digital infrastructure and professional services
                to schools across Kieni Constituency.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary-700 text-white rounded-xl p-6">
              <h3 className="font-semibold text-gold-400 mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-primary-600 pb-2">
                  <span className="text-primary-200">Established</span>
                  <span className="font-semibold">{settings.established_year || '1985'}</span>
                </li>
                <li className="flex justify-between border-b border-primary-600 pb-2">
                  <span className="text-primary-200">Type</span>
                  <span className="font-semibold">Secondary (Comprehensive)</span>
                </li>
                <li className="flex justify-between border-b border-primary-600 pb-2">
                  <span className="text-primary-200">Sub-County</span>
                  <span className="font-semibold">Kieni West</span>
                </li>
                <li className="flex justify-between border-b border-primary-600 pb-2">
                  <span className="text-primary-200">County</span>
                  <span className="font-semibold">Nyeri</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-primary-200">Enrollment</span>
                  <span className="font-semibold">{settings.enrollment_total || '480+'} students</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-xl p-6">
              <h3 className="font-semibold text-gold-700 mb-3">Contact Us</h3>
              <p className="text-sm text-gray-600 mb-1">{settings.site_address || 'Kieni West, Nyeri County'}</p>
              <p className="text-sm text-gray-600 mb-1">{settings.site_phone || '+254 700 000 000'}</p>
              <p className="text-sm text-gray-600">{settings.site_email || 'info@kiboyacomprehensiveschool.co.ke'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
