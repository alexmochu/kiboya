// app/(public)/programs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug }, select: { title: true, description: true } })
  return { title: program?.title, description: program?.description || undefined }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug, published: true } })
  if (!program) notFound()

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/programs" className="text-primary-200 text-sm hover:text-white mb-4 inline-block">
            ← Back to Programs
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{program.icon || '📚'}</span>
            <h1 className="text-4xl font-heading font-bold">{program.title}</h1>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {program.description && (
          <p className="text-xl text-gray-500 mb-8 leading-relaxed">{program.description}</p>
        )}
        {program.content ? (
          <div className="prose-school" dangerouslySetInnerHTML={{ __html: program.content }} />
        ) : (
          <p className="text-gray-400 text-center py-8">More details coming soon.</p>
        )}
      </div>
    </div>
  )
}
