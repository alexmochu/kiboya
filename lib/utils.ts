// lib/utils.ts

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

/** Returns a placeholder image URL for a given label */
export function imageUrl(label: string, width = 800, height = 500) {
  return `https://placehold.co/${width}x${height}/1a4731/ffffff?text=${encodeURIComponent(label)}`
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatRelative(date: Date | string) {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(date)
}

export function projectStatusColor(status: string) {
  const map: Record<string, string> = {
    COMPLETED: 'bg-green-100 text-green-800',
    ONGOING:   'bg-blue-100 text-blue-800',
    PLANNED:   'bg-yellow-100 text-yellow-800',
  }
  return map[status] ?? 'bg-gray-100 text-gray-600'
}

export function sponsorTierLabel(tier: string) {
  const map: Record<string, string> = {
    GOLD:    'Gold Sponsors',
    SILVER:  'Silver Sponsors',
    BRONZE:  'Bronze Sponsors',
    PARTNER: 'Partners',
  }
  return map[tier] ?? tier
}

export function staffCategoryLabel(cat: string) {
  const map: Record<string, string> = {
    BOARD:             'Board of Management',
    LEADERSHIP:        'School Leadership',
    TEACHER:           'Teachers & Educators',
    SUPPORT:           'Support Staff',
    COMMUNITY_PARTNER: 'Community Partners',
  }
  return map[cat] ?? cat
}

export function initialsAvatar(name: string) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=1a4731&color=fff&size=200`
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
