// app/(public)/gallery/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photo gallery from Kiboya Comprehensive School events and activities.',
}

export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: {
      images: { orderBy: { order: 'asc' }, take: 1, select: { url: true } },
      _count: { select: { images: true } },
    },
  })

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Our Moments</p>
          <h1 className="text-4xl font-heading font-bold">Gallery</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {albums.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No albums yet. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => {
              const cover = album.coverImage || album.images[0]?.url
              return (
                <Link key={album.id} href={`/gallery/${album.slug}`} className="card group">
                  {cover ? (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={cover}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center">
                      <span className="text-6xl">🖼️</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{album.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">{album._count.images} photos</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
