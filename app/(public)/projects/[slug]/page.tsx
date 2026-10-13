// app/(public)/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { projectStatusColor } from '@/lib/utils'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug, published: true } })
  if (!project) notFound()

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="text-primary-200 text-sm hover:text-white mb-4 inline-block">
            ← Back to Projects
          </Link>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${projectStatusColor(project.status)}`}>
            {project.status}
          </span>
          <h1 className="text-4xl font-heading font-bold">{project.title}</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {project.coverImage && (
          <div className="relative h-72 rounded-xl overflow-hidden mb-8">
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
          </div>
        )}
        {project.description && (
          <p className="text-xl text-gray-500 mb-8 leading-relaxed">{project.description}</p>
        )}
        {project.content ? (
          <div className="prose-school" dangerouslySetInnerHTML={{ __html: project.content }} />
        ) : (
          <p className="text-gray-400 text-center py-8">More details coming soon.</p>
        )}
      </div>
    </div>
  )
}
