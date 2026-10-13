'use client'
// components/admin/ProgramForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'

const ICONS = ['📚','🔬','🎭','🏆','💻','🌍','🎵','⚽','🎨','📖','🏛️','🌱']

interface ProgramData {
  id?: string; title: string; slug: string; description: string
  content: string; icon: string; order: number; published: boolean
}

export default function ProgramForm({ initial }: { initial?: Partial<ProgramData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<ProgramData>({
    title: initial?.title || '', slug: initial?.slug || '',
    description: initial?.description || '', content: initial?.content || '',
    icon: initial?.icon || '📚', order: initial?.order ?? 0, published: initial?.published ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof ProgramData, v: any) => setForm(p => ({ ...p, [k]: v }))
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-')

  async function save(publish: boolean) {
    setSaving(true); setError('')
    try {
      const url = isEdit ? `/api/admin/programs/${initial!.id}` : '/api/admin/programs'
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: publish || form.published }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      router.push('/admin/programs'); router.refresh()
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function del() {
    if (!confirm('Delete this program?')) return
    await fetch(`/api/admin/programs/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/programs'); router.refresh()
  }

  return (
    <div className="p-8 max-w-3xl space-y-5">
      <div>
        <label className="admin-label">Title *</label>
        <input required value={form.title} className="admin-input"
          onChange={e => { set('title', e.target.value); if (!isEdit) set('slug', slug(e.target.value)) }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Slug</label>
          <input value={form.slug} onChange={e => set('slug', e.target.value)} className="admin-input font-mono text-sm" />
        </div>
        <div>
          <label className="admin-label">Icon Emoji</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ICONS.map(ic => (
              <button key={ic} type="button" onClick={() => set('icon', ic)}
                className={`text-xl p-1 rounded border ${form.icon === ic ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="admin-label">Short Description</label>
        <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} className="admin-input resize-none" />
      </div>
      <div>
        <label className="admin-label">Full Content</label>
        <RichTextEditor value={form.content} onChange={html => set('content', html)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Display Order</label>
          <input type="number" value={form.order} onChange={e => set('order', parseInt(e.target.value)||0)} className="admin-input" />
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="button" disabled={saving} onClick={() => save(false)} className="btn btn-outline">{saving ? 'Saving...' : 'Save Draft'}</button>
        <button type="button" disabled={saving} onClick={() => save(true)} className="btn-primary">{form.published ? 'Update' : 'Publish'}</button>
        {isEdit && <button type="button" onClick={del} className="btn btn-danger ml-auto">Delete</button>}
      </div>
    </div>
  )
}
