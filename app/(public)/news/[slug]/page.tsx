// app/(public)/news/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug }, select: { title: true, excerpt: true } })
  return { title: post?.title, description: post?.excerpt || undefined }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { author: { select: { name: true } } },
  })
  if (!post) notFound()

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="text-primary-200 text-sm hover:text-white mb-4 inline-block">
            ← Back to News
          </Link>
          {post.publishedAt && (
            <p className="text-primary-200 text-sm mb-3">{formatDate(post.publishedAt)}</p>
          )}
          <h1 className="text-4xl font-heading font-bold">{post.title}</h1>
          {post.author?.name && (
            <p className="text-primary-200 mt-3 text-sm">By {post.author.name}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {post.coverImage && (
          <div className="relative h-72 rounded-xl overflow-hidden mb-8">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        {post.excerpt && (
          <p className="text-xl text-gray-500 mb-8 leading-relaxed font-heading italic border-l-4 border-primary-300 pl-6">
            {post.excerpt}
          </p>
        )}
        <div className="prose-school" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
