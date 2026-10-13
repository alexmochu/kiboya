// app/admin/posts/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'News & Updates' }

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  })

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-bold text-gray-800">News & Updates</h1>
          <p className="text-sm text-gray-500">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">+ New Article</Link>
      </div>

      <div className="p-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📰</p>
            <p className="text-gray-400 mb-4">No news articles yet.</p>
            <Link href="/admin/posts/new" className="btn-primary">Write First Article</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Title</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium hidden sm:table-cell">Author</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">{p.title}</td>
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{p.author?.name || '—'}</td>
                    <td className="px-5 py-4 text-gray-400 hidden md:table-cell">
                      {p.publishedAt ? formatDate(p.publishedAt) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/posts/${p.id}/edit`} className="text-primary-600 hover:underline text-xs">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
