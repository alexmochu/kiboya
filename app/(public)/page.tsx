// app/(public)/page.tsx — Home Page
import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/settings'
import { prisma } from '@/lib/prisma'
import { formatDate, imageUrl } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kiboya Comprehensive School — Nurturing Excellence, Building Tomorrow',
  description:
    'Welcome to Kiboya Comprehensive School, Kieni West, Nyeri County. Quality education for all learners.',
}

export default async function HomePage() {
  const [settings, latestPosts, upcomingEvents, programs, projects] = await Promise.all([
    getSiteSettings(),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, publishedAt: true },
    }),
    prisma.event.findMany({
      where: { published: true, startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
      take: 3,
      select: { id: true, title: true, slug: true, startDate: true, location: true, coverImage: true },
    }),
    prisma.program.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      take: 6,
      select: { id: true, title: true, slug: true, description: true, icon: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      take: 3,
      select: { id: true, title: true, slug: true, description: true, status: true, coverImage: true },
    }),
  ])

  const stats = [
    { label: 'Students Enrolled', value: settings.enrollment_total || '480+' },
    { label: 'Year Established', value: settings.established_year || '1985' },
    { label: 'Learning Streams', value: '8' },
    { label: 'Programs & Clubs', value: `${programs.length}+` },
  ]

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 opacity-95" />
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500 opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500 opacity-10 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
              <span className="text-sm text-primary-100">Kieni Schools Digital Participation Program</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4">
              {settings.site_name || 'Kiboya Comprehensive School'}
            </h1>

            <p className="text-xl sm:text-2xl text-primary-100 font-heading italic mb-6">
              {settings.site_tagline || 'Nurturing Excellence, Building Tomorrow'}
            </p>

            <p className="text-primary-200 text-lg mb-10 max-w-xl leading-relaxed">
              {settings.site_mission
                ? settings.site_mission.slice(0, 160) + '…'
                : 'A premier institution delivering quality secondary education to learners in Kieni West, Nyeri County.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={settings.hero_cta_url || '/about'} className="btn-secondary">
                {settings.hero_cta_text || 'Learn More About Us'}
              </Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center py-8 px-4">
                <p className="text-3xl font-bold text-primary-700 font-heading">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider mb-2">Who We Are</p>
              <h2 className="section-title">A School of Excellence in Kieni</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {settings.site_mission ||
                  'Kiboya Comprehensive School is committed to providing quality, inclusive education that empowers every learner with knowledge, skills, and values for lifelong success.'}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {settings.site_vision ||
                  'Our vision is to be a centre of academic excellence and holistic development, producing well-rounded citizens who contribute positively to Kenya and beyond.'}
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Us →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎓', title: 'Academic Excellence', desc: 'Consistently strong KCSE performance' },
                { icon: '⚽', title: 'Sports & Co-curricular', desc: 'Vibrant sports and club programs' },
                { icon: '🌍', title: 'Community Focused', desc: 'Deep roots in the local community' },
                { icon: '💻', title: 'Digital Learning', desc: 'Technology-integrated education' },
              ].map((item, i) => (
                <div key={i} className="card p-6">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-primary-700 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ──────────────────────────────────────── */}
      {programs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider mb-2">What We Offer</p>
              <h2 className="section-title">Programs & Learning</h2>
              <p className="section-subtitle">Signature initiatives and clubs that shape well-rounded learners</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <Link key={p.id} href={`/programs/${p.slug}`} className="card p-6 hover:border-primary-200 border border-transparent group">
                  <span className="text-4xl mb-4 block">{p.icon || '📚'}</span>
                  <h3 className="font-semibold text-primary-700 mb-2 group-hover:text-primary-800">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/programs" className="btn-outline">
                View All Programs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── DEVELOPMENTS ──────────────────────────────────── */}
      {projects.length > 0 && (
        <section className="py-20 bg-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gold-400 uppercase tracking-wider mb-2">Our Progress</p>
              <h2 className="text-3xl font-heading font-bold text-white mb-2">Developments & Projects</h2>
              <p className="text-primary-100 text-lg">Investing in infrastructure for better learning</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="bg-primary-800 hover:bg-primary-900 rounded-xl p-6 block transition-colors group">
                  {p.coverImage && (
                    <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                    </div>
                  )}
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${
                    p.status === 'COMPLETED' ? 'bg-green-400/20 text-green-300' :
                    p.status === 'ONGOING'   ? 'bg-blue-400/20 text-blue-300' :
                    'bg-yellow-400/20 text-yellow-300'
                  }`}>
                    {p.status === 'COMPLETED' ? '✓ Completed' : p.status === 'ONGOING' ? '⟳ Ongoing' : '◎ Planned'}
                  </span>
                  <h3 className="font-semibold text-white group-hover:text-gold-300 mb-2">{p.title}</h3>
                  <p className="text-sm text-primary-200">{p.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                View All Projects →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── LATEST NEWS ───────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider mb-2">Stay Updated</p>
                <h2 className="section-title mb-0">Latest News & Updates</h2>
              </div>
              <Link href="/news" className="hidden sm:block text-sm text-primary-700 hover:text-primary-800 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="card group">
                  {post.coverImage ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center">
                      <span className="text-5xl">📰</span>
                    </div>
                  )}
                  <div className="p-5">
                    {post.publishedAt && (
                      <p className="text-xs text-gray-400 mb-2">{formatDate(post.publishedAt)}</p>
                    )}
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 mb-2 line-clamp-2 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/news" className="btn-outline">View All News →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING EVENTS ───────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider mb-2">What's Coming</p>
              <h2 className="section-title">Upcoming Events</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="card p-6 group">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-700 text-white rounded-xl p-3 text-center min-w-[56px] flex-shrink-0">
                      <p className="text-xl font-bold">{new Date(event.startDate).getDate()}</p>
                      <p className="text-xs uppercase">{new Date(event.startDate).toLocaleString('en-KE', { month: 'short' })}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 mb-1 transition-colors">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="text-xs text-gray-500">📍 {event.location}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/events" className="btn-outline">View All Events →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-16 bg-gold-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Join the Kiboya Community
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Interested in admissions, partnerships, or supporting our school? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow">
              Contact Us
            </Link>
            <Link href="/sponsors" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-700 transition-colors">
              Support Our School
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
