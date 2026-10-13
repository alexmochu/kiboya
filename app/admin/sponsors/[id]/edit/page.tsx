// app/admin/sponsors/[id]/edit/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import SponsorForm from '@/components/admin/SponsorForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Edit Sponsor' }
export default async function EditSponsorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const s = await prisma.sponsor.findUnique({ where: { id } })
  if (!s) notFound()
  return (
    <div>
      <AdminPageHeader title="Edit Sponsor" backHref="/admin/sponsors" />
      <SponsorForm initial={{ id: s.id, name: s.name, tier: s.tier, bio: s.bio||'', logo: s.logo||'', website: s.website||'', order: s.order, published: s.published }} />
    </div>
  )
}
