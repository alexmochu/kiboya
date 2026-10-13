'use client'
// app/admin/settings/SettingsForm.tsx
import { useState } from 'react'

interface Props {
  initial: Record<string, string>
}

const FIELDS = [
  { section: 'School Identity',
    fields: [
      { key: 'site_name',        label: 'School Name',           type: 'text',  placeholder: 'Kiboya Comprehensive School' },
      { key: 'site_tagline',     label: 'Tagline / Motto',       type: 'text',  placeholder: 'Excellence in Education' },
      { key: 'established_year', label: 'Year Established',      type: 'text',  placeholder: '1985' },
      { key: 'enrollment_total', label: 'Total Enrollment (approx)', type: 'text', placeholder: '480' },
    ],
  },
  { section: 'Contact Information',
    fields: [
      { key: 'site_email',   label: 'Primary Email',     type: 'email', placeholder: 'info@kiboyacomprehensiveschool.co.ke' },
      { key: 'site_phone',   label: 'Phone Number',       type: 'tel',   placeholder: '+254 700 000 000' },
      { key: 'site_phone2',  label: 'Alt. Phone (optional)', type: 'tel', placeholder: '' },
      { key: 'site_address', label: 'Physical Address',   type: 'text',  placeholder: 'Kieni West, Nyeri County' },
    ],
  },
  { section: 'About the School',
    fields: [
      { key: 'site_mission', label: 'Mission Statement', type: 'textarea', placeholder: '' },
      { key: 'site_vision',  label: 'Vision Statement',  type: 'textarea', placeholder: '' },
    ],
  },
  { section: 'Social Media',
    fields: [
      { key: 'social_facebook',  label: 'Facebook URL',  type: 'url', placeholder: 'https://facebook.com/...' },
      { key: 'social_twitter',   label: 'Twitter / X URL', type: 'url', placeholder: '' },
      { key: 'social_youtube',   label: 'YouTube URL',   type: 'url', placeholder: '' },
      { key: 'social_whatsapp',  label: 'WhatsApp Number', type: 'tel', placeholder: '+254700000000' },
    ],
  },
]

export default function SettingsForm({ initial }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>(initial)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState('')

  const set = (key: string, val: string) => setSettings((p) => ({ ...p, [key]: val }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setSaved(false); setError('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-3xl space-y-10">
      {FIELDS.map(({ section, fields }) => (
        <div key={section}>
          <h2 className="text-lg font-semibold text-primary-700 mb-5 pb-2 border-b border-gray-100">{section}</h2>
          <div className="space-y-4">
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="admin-label">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={settings[key] || ''}
                    onChange={(e) => set(key, e.target.value)}
                    className="admin-input resize-none"
                    placeholder={placeholder}
                  />
                ) : (
                  <input
                    type={type}
                    value={settings[key] || ''}
                    onChange={(e) => set(key, e.target.value)}
                    className="admin-input"
                    placeholder={placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
        {saved && <span className="text-green-600 text-sm font-medium">✅ Settings saved!</span>}
      </div>
    </form>
  )
}
