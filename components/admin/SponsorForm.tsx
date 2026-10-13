'use client'
// components/admin/SponsorForm.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

const TIERS = [
  { value: 'GOLD',    label: '🥇 Gold Sponsor'    },
  { value: 'SILVER',  label: '🥈 Silver Sponsor'  },
  { value: 'BRONZE',  label: '🥉 Bronze Sponsor'  },
  { value: 'PARTNER', label: '🤝 Partner'         },
]

interface SponsorData {
  id?: string; name: string; tier: string; bio: string; logo: string; website: string; order: number; published: boolean
}

export default function SponsorForm({ initial }: { initial?: Partial<SponsorData> }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<SponsorData>({
    name: initial?.name || '', tier: initial?.tier || 'PARTNER',
    bio: initial?.bio || '', logo: initial?.logo || '',
    website: initial?.website || '', order: initial?.order ?? 0, published: initial?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const set = (k: keyof SponsorData, v: any) => setForm(p => ({ ...p, [k]: v }))

  async function save() {
    setSaving(true); setError('')
    try {
      const url = isEdit ? `/api/admin/sponsors/${initial!.id}` : '/api/admin/sponsors'
      const res = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      router.push('/admin/sponsors'); router.refresh()
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function del() {
    if (!confirm('Remove this sponsor?')) return
    await fetch(`/api/admin/sponsors/${initial!.id}`, { method: 'DELETE' })
    router.push('/admin/sponsors'); router.refresh()
  }

  return (
    <div className="p-8 max-w-2xl space-y-5">
      <div>
        <label className="admin-label">Sponsor / Organisation Name *</label>
        <input required value={form.name} onChange={e => set('name', e.target.value)} className="admin-input" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Tier</label>
          <select value={form.tier} onChange={e => set('tier', e.target.value)} className="admin-input">
            {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label">Website URL</label>
          <input type="url" value={form.website} onChange={e => set('website', e.target.value)} className="admin-input" placeholder="https://..." />
        </div>
      </div>
      <div>
        <label className="admin-label">Description / Bio</label>
        <textarea rows={3} value={form.bio} onChange={e => set('bio', e.target.value)} className="admin-input resize-none" />
      </div>
      <ImageUpload label="Logo" value={form.logo} onChange={url => set('logo', url)} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Display Order</label>
          <input type="number" value={form.order} onChange={e => set('order', parseInt(e.target.value)||0)} className="admin-input" />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input type="checkbox" id="spub" checked={form.published} onChange={e => set('published', e.target.checked)} className="w-4 h-4 accent-primary-700" />
          <label htmlFor="spub" className="text-sm text-gray-700">Visible on website</label>
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button type="button" disabled={saving} onClick={save} className="btn-primary">{saving ? 'Saving...' : isEdit ? 'Update' : 'Add Sponsor'}</button>
        {isEdit && <button type="button" onClick={del} className="btn btn-danger ml-auto">Remove</button>}
      </div>
    </div>
  )
}
