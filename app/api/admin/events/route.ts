// app/api/admin/events/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  title:       z.string().min(1),
  slug:        z.string().min(1),
  description: z.string().optional(),
  content:     z.string().optional(),
  coverImage:  z.string().optional(),
  startDate:   z.string(),
  endDate:     z.string().optional(),
  location:    z.string().optional(),
  published:   z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = schema.parse(await req.json())
    const event = await prisma.event.create({
      data: {
        ...body,
        startDate: new Date(body.startDate),
        endDate:   body.endDate ? new Date(body.endDate) : null,
      },
    })
    return NextResponse.json(event)
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
