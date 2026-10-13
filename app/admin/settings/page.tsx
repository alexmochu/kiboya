// app/admin/settings/page.tsx
import { prisma } from '@/lib/prisma'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import SettingsForm from './SettingsForm'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Settings' }

export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany()
  const settings: Record<string, string> = {}
  for (const r of rows) settings[r.key] = r.value

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Manage the school's contact details, mission, and social media links."
      />
      <SettingsForm initial={settings} />
    </div>
  )
}
