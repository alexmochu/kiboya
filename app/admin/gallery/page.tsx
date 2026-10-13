// app/admin/gallery/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Gallery' }

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { images: true } } },
  })
  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-800">Gallery</h1>
          <p className="text-sm text-gray-500">{albums.length} album{albums.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/gallery/new" className="btn-primary">+ New Album</Link>
      </div>
      <div className="p-8">
        {albums.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🖼️</p>
            <p className="text-gray-400 mb-4">No albums yet.</p>
            <Link href="/admin/gallery/new" className="btn-primary">Create First Album</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {albums.map((a) => (
              <Link key={a.id} href={`/admin/gallery/${a.id}/edit`} className="card group">
                {a.coverImage ? (
                  <div className="relative h-40 overflow-hidden">
                    <Image src={a.coverImage} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ) : (
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 group-hover:text-primary-700 truncate">{a.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{a._count.images} photos</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${a.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {a.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
