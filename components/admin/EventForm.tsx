'use client'
// components/admin/EventForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'
import ImageUpload from './ImageUpload'

interface EventData {
  id?: string
  title: string
  slug: string
  description: string
  content: string
  coverImage: string
  startDate: string
  endDate: string
  location: string
  published: boolean
}

function generateSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

export default function EventForm({ initial }: { initial?: Partial<EventData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<EventData>({
    title:       initial?.title       || '',
    slug:        initial?.slug        || '',
    description: initial?.description || '',
    content:     initial?.content     || '',
    coverImage:  initial?.coverImage  || '',
    startDate:   initial?.startDate   || '',
    endDate:     initial?.endDate     || '',
    location:    initial?.location    || '',
    published:   initial?.published   ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const set = (k: keyof EventData, v: any) => setForm((p) => ({ ...p, [k]: v }))

  async function save(publish: boolean) {
    setSaving(true); setError('')
    try {
      const url    = isEdit ? `/api/admin/events/${initial!.id}` : '/api/admin/events'
      const method = isEdit ? 'PATCH' : 'POST'
      const res    = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: publish || form.published }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      router.push('/admin/events'); router.refresh()
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function del() {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/events/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/events'); router.refresh()
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(false) }} className="p-8 max-w-4xl space-y-6">
      <div>
        <label className="admin-label">Title *</label>
        <input required value={form.title} className="admin-input"
          onChange={(e) => { set('title', e.target.value); if (!isEdit) set('slug', generateSlug(e.target.value)) }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Slug *</label>
          <input required value={form.slug} onChange={(e) => set('slug', e.target.value)} className="admin-input font-mono text-sm" />
        </div>
        <div>
          <label className="admin-label">Location</label>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} className="admin-input" placeholder="e.g. School Hall" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Start Date & Time *</label>
          <input required type="datetime-local" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">End Date & Time</label>
          <input type="datetime-local" value={form.endDate} onChange={(e) => set('endDate', e.target.value)} className="admin-input" />
        </div>
      </div>
      <div>
        <label className="admin-label">Short Description</label>
        <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} className="admin-input resize-none" />
      </div>
      <ImageUpload label="Cover Image" value={form.coverImage} onChange={(url) => set('coverImage', url)} />
      <div>
        <label className="admin-label">Full Details (Optional)</label>
        <RichTextEditor value={form.content} onChange={(html) => set('content', html)} />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={saving} className="btn btn-outline">{saving ? 'Saving...' : 'Save Draft'}</button>
        <button type="button" disabled={saving} onClick={() => save(true)} className="btn-primary">
          {form.published ? 'Update' : 'Publish'}
        </button>
        {isEdit && <button type="button" onClick={del} className="btn btn-danger ml-auto">Delete</button>}
      </div>
    </form>
  )
}
