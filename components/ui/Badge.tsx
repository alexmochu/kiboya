interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'gold' | 'blue' | 'red' | 'gray' | 'yellow'
  className?: string
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variants = {
    green:  'bg-green-100 text-green-800',
    gold:   'bg-yellow-100 text-yellow-800',
    blue:   'bg-blue-100 text-blue-800',
    red:    'bg-red-100 text-red-800',
    gray:   'bg-gray-100 text-gray-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
