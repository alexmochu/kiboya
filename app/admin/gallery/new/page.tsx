// app/admin/gallery/new/page.tsx
import GalleryAlbumForm from '@/components/admin/GalleryAlbumForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'New Album' }
export default function NewAlbumPage() {
  return (
    <div>
      <AdminPageHeader title="New Gallery Album" backHref="/admin/gallery" />
      <GalleryAlbumForm />
    </div>
  )
}
