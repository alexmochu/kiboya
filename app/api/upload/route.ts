// app/api/upload/route.ts
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const now = new Date()
    const year = now.getFullYear().toString()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const ext = extname(file.name) || '.jpg'
    const filename = `${randomUUID()}${ext}`
    const relativePath = `/uploads/${year}/${month}/${filename}`
    const absoluteDir = join(process.cwd(), 'public', 'uploads', year, month)

    await mkdir(absoluteDir, { recursive: true })
    await writeFile(join(absoluteDir, filename), buffer)

    return NextResponse.json({ url: relativePath })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
