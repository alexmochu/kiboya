// lib/settings.ts
import { prisma } from './prisma'
import { cache } from 'react'

export type SiteSettings = Record<string, string>

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const rows = await prisma.siteSetting.findMany()
    const out: SiteSettings = {}
    for (const r of rows) {
      out[r.key] = r.value
    }
    return out
  } catch {
    // Return safe fallback during build / migration
    return {}
  }
})
