// app/admin/programs/new/page.tsx
import ProgramForm from '@/components/admin/ProgramForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'New Program' }
export default function NewProgramPage() {
  return <div><AdminPageHeader title="New Program" backHref="/admin/programs" /><ProgramForm /></div>
}
