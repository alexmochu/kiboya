'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Image' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="admin-label">{label}</label>
      {value && (
        <div className="mb-2 relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        disabled={uploading}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 disabled:opacity-50"
      />
      {uploading && <p className="text-xs text-primary-600 mt-1">Uploading...</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      {value && !uploading && (
        <p className="text-xs text-gray-500 mt-1 truncate">{value}</p>
      )}
    </div>
  )
}
