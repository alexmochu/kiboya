// app/api/admin/gallery/albums/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  title:       z.string().min(1),
  slug:        z.string().min(1),
  description: z.string().optional(),
  coverImage:  z.string().optional(),
  published:   z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = schema.parse(await req.json())
  const album = await prisma.galleryAlbum.create({ data: body })
  return NextResponse.json(album)
}
