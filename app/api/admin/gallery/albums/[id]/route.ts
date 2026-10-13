// app/api/admin/gallery/albums/[id]/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  title:       z.string().min(1).optional(),
  slug:        z.string().optional(),
  description: z.string().optional(),
  coverImage:  z.string().optional(),
  published:   z.boolean().optional(),
  images:      z.array(z.object({ url: z.string(), caption: z.string().optional(), order: z.number().optional() })).optional(),
})

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = schema.parse(await req.json())
  const { images, ...rest } = body

  const album = await prisma.galleryAlbum.update({ where: { id }, data: rest })

  if (images) {
    await prisma.galleryImage.deleteMany({ where: { albumId: id } })
    await prisma.galleryImage.createMany({
      data: images.map((img, idx) => ({ albumId: id, url: img.url, caption: img.caption || null, order: img.order ?? idx })),
    })
  }
  return NextResponse.json(album)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.galleryAlbum.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
