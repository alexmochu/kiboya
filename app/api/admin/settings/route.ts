// app/api/admin/settings/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body: Record<string, string> = await req.json()
  // Upsert all keys in a single transaction
  await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      })
    )
  )
  return NextResponse.json({ ok: true })
}
