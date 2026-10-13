// app/api/admin/posts/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  title:       z.string().min(1),
  slug:        z.string().min(1),
  excerpt:     z.string().optional(),
  content:     z.string(),
  coverImage:  z.string().optional(),
  published:   z.boolean().default(false),
  publishedAt: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = schema.parse(await req.json())
    const post = await prisma.post.create({
      data: {
        ...body,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : body.published ? new Date() : null,
        authorId: (session.user as any).id,
      },
    })
    return NextResponse.json(post)
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
