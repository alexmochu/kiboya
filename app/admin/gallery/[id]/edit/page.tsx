// app/admin/gallery/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import GalleryAlbumForm from '@/components/admin/GalleryAlbumForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Album' }

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  if (!album) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Album" backHref="/admin/gallery" />
      <GalleryAlbumForm
        initial={{
          id:          album.id,
          title:       album.title,
          slug:        album.slug,
          description: album.description || '',
          coverImage:  album.coverImage  || '',
          published:   album.published,
          images:      album.images.map((i) => ({ url: i.url, caption: i.caption || '', order: i.order })),
        }}
      />
    </div>
  )
}
