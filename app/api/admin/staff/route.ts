// app/api/admin/staff/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
const schema = z.object({
  name:       z.string().min(1),
  title:      z.string().min(1),
  category:   z.enum(['BOARD','LEADERSHIP','TEACHER','SUPPORT','COMMUNITY_PARTNER']),
  department: z.string().optional(),
  bio:        z.string().optional(),
  photo:      z.string().optional(),
  email:      z.string().optional(),
  phone:      z.string().optional(),
  order:      z.number().default(0),
  published:  z.boolean().default(true),
})
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = schema.parse(await req.json())
  const item = await prisma.staffMember.create({ data: body })
  return NextResponse.json(item)
}
