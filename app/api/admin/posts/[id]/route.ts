// app/api/admin/posts/[id]/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  title:       z.string().min(1).optional(),
  slug:        z.string().min(1).optional(),
  excerpt:     z.string().optional(),
  content:     z.string().optional(),
  coverImage:  z.string().optional(),
  published:   z.boolean().optional(),
  publishedAt: z.string().nullable().optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = schema.parse(await req.json())
  const data: any = { ...body }
  if (body.publishedAt !== undefined) data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null
  if (body.published && !body.publishedAt) data.publishedAt = new Date()
  const post = await prisma.post.update({ where: { id }, data })
  return NextResponse.json(post)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
