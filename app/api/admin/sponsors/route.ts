// app/api/admin/sponsors/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
const schema = z.object({
  name: z.string().min(1),
  tier: z.enum(['GOLD','SILVER','BRONZE','PARTNER']).default('PARTNER'),
  bio: z.string().optional(), logo: z.string().optional(), website: z.string().optional(),
  order: z.number().default(0), published: z.boolean().default(true),
})
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = schema.parse(await req.json())
  return NextResponse.json(await prisma.sponsor.create({ data: body }))
}
