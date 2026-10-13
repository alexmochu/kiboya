// app/admin/staff/new/page.tsx
import StaffForm from '@/components/admin/StaffForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Add Staff Member' }
export default function NewStaffPage() {
  return (
    <div>
      <AdminPageHeader title="Add Staff Member" backHref="/admin/staff" />
      <StaffForm />
    </div>
  )
}
