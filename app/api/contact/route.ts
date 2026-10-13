// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message too short'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await prisma.contactSubmission.create({ data })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
