// app/admin/projects/new/page.tsx
import ProjectForm from '@/components/admin/ProjectForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'New Project' }
export default function NewProjectPage() {
  return <div><AdminPageHeader title="New Project" backHref="/admin/projects" /><ProjectForm /></div>
}
