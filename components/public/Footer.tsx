import Link from 'next/link'
import type { SiteSettings } from '@/lib/settings'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center font-bold text-white">
                KCS
              </div>
              <div>
                <p className="font-bold leading-tight">{settings.site_name || 'Kiboya Comprehensive School'}</p>
                <p className="text-sm text-primary-200">{settings.site_motto || 'Excellence in Education'}</p>
              </div>
            </div>
            <p className="text-sm text-primary-100 leading-relaxed">
              {settings.site_tagline || 'Nurturing Excellence, Building Tomorrow'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4 uppercase text-xs tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ['About Us', '/about'],
                ['Programs', '/programs'],
                ['News & Updates', '/news'],
                ['Events', '/events'],
                ['Gallery', '/gallery'],
                ['Contact Us', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-primary-100 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gold-400 mb-4 uppercase text-xs tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-100">
              {settings.site_address && (
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>{settings.site_address}</span>
                </li>
              )}
              {settings.site_phone && (
                <li className="flex gap-2">
                  <span>📞</span>
                  <a href={`tel:${settings.site_phone}`} className="hover:text-white">{settings.site_phone}</a>
                </li>
              )}
              {settings.site_email && (
                <li className="flex gap-2">
                  <span>✉️</span>
                  <a href={`mailto:${settings.site_email}`} className="hover:text-white">{settings.site_email}</a>
                </li>
              )}
            </ul>
            {(settings.facebook_url || settings.twitter_url) && (
              <div className="flex gap-3 mt-4">
                {settings.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer"
                    className="text-primary-100 hover:text-white transition-colors text-sm">Facebook</a>
                )}
                {settings.twitter_url && (
                  <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer"
                    className="text-primary-100 hover:text-white transition-colors text-sm">Twitter/X</a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-200">
            {settings.footer_text || `© ${year} Kiboya Comprehensive School`}
          </p>
          <p className="text-xs text-primary-300">
            Part of the{' '}
            <a href="https://kieni.sc.ke" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              Kieni Schools Digital Participation Program
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
