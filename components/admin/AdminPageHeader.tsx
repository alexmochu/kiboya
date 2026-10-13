'use client'
// components/admin/AdminPageHeader.tsx
import Link from 'next/link'

interface Props {
  title: string
  description?: string
  backHref?: string
  actions?: React.ReactNode
}

export default function AdminPageHeader({ title, description, backHref, actions }: Props) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5">
      {backHref && (
        <Link href={backHref} className="text-sm text-gray-400 hover:text-primary-600 mb-2 inline-block transition-colors">
          ← Back
        </Link>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-800">{title}</h1>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  )
}
