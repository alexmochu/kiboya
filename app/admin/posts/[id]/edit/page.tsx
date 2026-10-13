// app/admin/posts/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Edit Article' }

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div>
      <AdminPageHeader title="Edit Article" backHref="/admin/posts" />
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content,
          coverImage: post.coverImage || '',
          published: post.published,
          publishedAt: post.publishedAt?.toISOString() || '',
        }}
      />
    </div>
  )
}
