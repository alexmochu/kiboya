// app/admin/posts/new/page.tsx
import PostForm from '@/components/admin/PostForm'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New Article' }

export default function NewPostPage() {
  return (
    <div>
      <AdminPageHeader title="New News Article" backHref="/admin/posts" />
      <PostForm />
    </div>
  )
}
