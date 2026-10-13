'use client'
// components/admin/StaffForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

const CATEGORIES = [
  { value: 'BOARD',             label: 'Board of Management' },
  { value: 'LEADERSHIP',        label: 'School Leadership' },
  { value: 'TEACHER',           label: 'Teacher / Educator' },
  { value: 'SUPPORT',           label: 'Support Staff' },
  { value: 'COMMUNITY_PARTNER', label: 'Community Partner' },
]

interface StaffData {
  id?: string; name: string; title: string; category: string
  department: string; bio: string; photo: string; email: string; phone: string
  order: number; published: boolean
}

export default function StaffForm({ initial }: { initial?: Partial<StaffData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<StaffData>({
    name:       initial?.name       || '',
    title:      initial?.title      || '',
    category:   initial?.category   || 'TEACHER',
    department: initial?.department || '',
    bio:        initial?.bio        || '',
    photo:      initial?.photo      || '',
    email:      initial?.email      || '',
    phone:      initial?.phone      || '',
    order:      initial?.order      ?? 0,
    published:  initial?.published  ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')
  const set = (k: keyof StaffData, v: any) => setForm((p) => ({ ...p, [k]: v }))

  async function save() {
    setSaving(true); setError('')
    try {
      const url    = isEdit ? `/api/admin/staff/${initial!.id}` : '/api/admin/staff'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      router.push('/admin/staff'); router.refresh()
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function del() {
    if (!confirm('Remove this staff member?')) return
    await fetch(`/api/admin/staff/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/staff'); router.refresh()
  }

  return (
    <div className="p-8 max-w-2xl space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Full Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="admin-input" placeholder="e.g. John Kamau" />
        </div>
        <div>
          <label className="admin-label">Position / Title *</label>
          <input required value={form.title} onChange={(e) => set('title', e.target.value)} className="admin-input" placeholder="e.g. Mathematics Teacher" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Category *</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="admin-input">
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label">Department / Subject</label>
          <input value={form.department} onChange={(e) => set('department', e.target.value)} className="admin-input" placeholder="e.g. Sciences" />
        </div>
      </div>
      <div>
        <label className="admin-label">Short Bio</label>
        <textarea rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} className="admin-input resize-none" />
      </div>
      <ImageUpload label="Photo" value={form.photo} onChange={(url) => set('photo', url)} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Email</label>
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="admin-input" />
        </div>
        <div>
          <label className="admin-label">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className="admin-input" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Display Order</label>
          <input type="number" value={form.order} onChange={(e) => set('order', parseInt(e.target.value) || 0)} className="admin-input" />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input type="checkbox" id="pub" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-primary-700" />
          <label htmlFor="pub" className="text-sm text-gray-700">Visible on website</label>
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="button" disabled={saving} onClick={save} className="btn-primary">{saving ? 'Saving...' : isEdit ? 'Update' : 'Add Member'}</button>
        {isEdit && <button type="button" onClick={del} className="btn btn-danger ml-auto">Remove</button>}
      </div>
    </div>
  )
}
