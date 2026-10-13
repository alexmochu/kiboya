// app/api/admin/events/[id]/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const data: any = { ...body }
  if (body.startDate) data.startDate = new Date(body.startDate)
  if (body.endDate)   data.endDate   = new Date(body.endDate)
  const event = await prisma.event.update({ where: { id }, data })
  return NextResponse.json(event)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.event.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
