// app/(public)/gallery/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export default async function GalleryAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const album = await prisma.galleryAlbum.findUnique({
    where: { slug, published: true },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  if (!album) notFound()

  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/gallery" className="text-primary-200 text-sm hover:text-white mb-4 inline-block">
            ← Back to Gallery
          </Link>
          <h1 className="text-4xl font-heading font-bold">{album.title}</h1>
          {album.description && (
            <p className="text-primary-100 mt-3 max-w-2xl">{album.description}</p>
          )}
          <p className="text-primary-200 text-sm mt-2">{album.images.length} photos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {album.images.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No images in this album yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.images.map((img) => (
              <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={img.url}
                  alt={img.caption || album.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
