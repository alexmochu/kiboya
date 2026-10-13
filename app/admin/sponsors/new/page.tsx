// app/admin/sponsors/new/page.tsx
import SponsorForm from '@/components/admin/SponsorForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Add Sponsor' }
export default function NewSponsorPage() {
  return <div><AdminPageHeader title="Add Sponsor" backHref="/admin/sponsors" /><SponsorForm /></div>
}
