// app/(public)/news/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest news, announcements, and milestones from Kiboya Comprehensive School.',
}

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: { author: { select: { name: true } } },
  })

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Stay Informed</p>
          <h1 className="text-4xl font-heading font-bold">News & Updates</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No news yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="card group">
                {post.coverImage ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center">
                    <span className="text-5xl">📰</span>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {post.publishedAt ? formatDate(post.publishedAt) : ''}
                    {post.author?.name ? ` · ${post.author.name}` : ''}
                  </p>
                  <h2 className="font-semibold text-gray-800 group-hover:text-primary-700 mb-2 line-clamp-2 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
