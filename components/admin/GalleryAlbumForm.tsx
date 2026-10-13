'use client'
// components/admin/GalleryAlbumForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'
import Image from 'next/image'

interface ImageItem { url: string; caption: string; order: number }
interface AlbumData {
  id?: string; title: string; slug: string; description: string
  coverImage: string; published: boolean; images: ImageItem[]
}

function generateSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

export default function GalleryAlbumForm({ initial }: { initial?: Partial<AlbumData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<AlbumData>({
    title:       initial?.title       || '',
    slug:        initial?.slug        || '',
    description: initial?.description || '',
    coverImage:  initial?.coverImage  || '',
    published:   initial?.published   ?? false,
    images:      initial?.images      || [],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')
  const [newImgUrl, setNewImgUrl] = useState('')

  const set = (k: keyof AlbumData, v: any) => setForm((p) => ({ ...p, [k]: v }))

  function addImage() {
    if (!newImgUrl) return
    const img: ImageItem = { url: newImgUrl, caption: '', order: form.images.length }
    set('images', [...form.images, img])
    setNewImgUrl('')
  }

  function updateCaption(idx: number, caption: string) {
    const imgs = [...form.images]
    imgs[idx] = { ...imgs[idx], caption }
    set('images', imgs)
  }

  function removeImage(idx: number) {
    set('images', form.images.filter((_, i) => i !== idx))
  }

  async function save(publish: boolean) {
    setSaving(true); setError('')
    try {
      const url    = isEdit ? `/api/admin/gallery/albums/${initial!.id}` : '/api/admin/gallery/albums'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: publish || form.published }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      router.push('/admin/gallery'); router.refresh()
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function del() {
    if (!confirm('Delete this album and all its images?')) return
    await fetch(`/api/admin/gallery/albums/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/gallery'); router.refresh()
  }

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <label className="admin-label">Album Title *</label>
        <input required value={form.title} className="admin-input"
          onChange={(e) => { set('title', e.target.value); if (!isEdit) set('slug', generateSlug(e.target.value)) }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Slug *</label>
          <input required value={form.slug} onChange={(e) => set('slug', e.target.value)} className="admin-input font-mono text-sm" />
        </div>
        <ImageUpload label="Cover Image (optional)" value={form.coverImage} onChange={(url) => set('coverImage', url)} />
      </div>
      <div>
        <label className="admin-label">Description</label>
        <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} className="admin-input resize-none" />
      </div>

      {/* Image list */}
      <div>
        <label className="admin-label">Photos ({form.images.length})</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {form.images.map((img, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 group">
              <div className="relative h-28">
                <Image src={img.url} alt="" fill className="object-cover" />
              </div>
              <input
                value={img.caption}
                onChange={(e) => updateCaption(idx, e.target.value)}
                placeholder="Caption..."
                className="w-full px-2 py-1 text-xs border-t border-gray-200 bg-white"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >✕</button>
            </div>
          ))}
        </div>

        {/* Add image via upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-3">Upload a photo to add to this album:</p>
          <ImageUpload label="" value={newImgUrl} onChange={(url) => { setNewImgUrl(url); }} />
          {newImgUrl && (
            <button type="button" onClick={addImage} className="mt-2 btn-primary text-sm">
              + Add to Album
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="button" disabled={saving} onClick={() => save(false)} className="btn btn-outline">{saving ? 'Saving...' : 'Save Draft'}</button>
        <button type="button" disabled={saving} onClick={() => save(true)} className="btn-primary">{form.published ? 'Update' : 'Publish'}</button>
        {isEdit && <button type="button" onClick={del} className="btn btn-danger ml-auto">Delete Album</button>}
      </div>
    </div>
  )
}
