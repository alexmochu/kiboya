'use client'
// components/admin/PostForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'
import ImageUpload from './ImageUpload'

interface PostData {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  published: boolean
  publishedAt: string
}

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function PostForm({ initial }: { initial?: Partial<PostData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<PostData>({
    title:       initial?.title       || '',
    slug:        initial?.slug        || '',
    excerpt:     initial?.excerpt     || '',
    content:     initial?.content     || '',
    coverImage:  initial?.coverImage  || '',
    published:   initial?.published   ?? false,
    publishedAt: initial?.publishedAt || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  function set(key: keyof PostData, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent, action: 'save' | 'publish') {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, published: action === 'publish' || form.published }
    try {
      const url    = isEdit ? `/api/admin/posts/${initial!.id}` : '/api/admin/posts'
      const method = isEdit ? 'PATCH' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      router.push('/admin/posts')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this article permanently?')) return
    await fetch(`/api/admin/posts/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, 'save')} className="p-8 max-w-4xl space-y-6">
      <div>
        <label className="admin-label">Title *</label>
        <input
          required
          value={form.title}
          onChange={(e) => {
            set('title', e.target.value)
            if (!isEdit) set('slug', generateSlug(e.target.value))
          }}
          className="admin-input text-lg font-semibold"
          placeholder="Article title..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Slug *</label>
          <input
            required
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className="admin-input font-mono text-sm"
            placeholder="url-friendly-slug"
          />
        </div>
        <div>
          <label className="admin-label">Published Date</label>
          <input
            type="date"
            value={form.publishedAt.slice(0, 10)}
            onChange={(e) => set('publishedAt', e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Excerpt / Summary</label>
        <textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          className="admin-input resize-none"
          placeholder="Short summary shown on listing pages..."
        />
      </div>

      <ImageUpload label="Cover Image" value={form.coverImage} onChange={(url) => set('coverImage', url)} />

      <div>
        <label className="admin-label">Content *</label>
        <RichTextEditor value={form.content} onChange={(html) => set('content', html)} />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="submit" disabled={saving} className="btn btn-outline">
          {saving ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={(e) => handleSubmit(e as any, 'publish')}
          className="btn-primary"
        >
          {form.published ? 'Update Published' : 'Publish'}
        </button>
        {isEdit && (
          <button type="button" onClick={handleDelete} className="btn btn-danger ml-auto">
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
