// app/(public)/contact/page.tsx (Server Component)
import { ContactForm } from './ContactForm'
import { getSiteSettings } from '@/lib/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Kiboya Comprehensive School.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  return (
    <div>
      <div className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-primary-200 mb-2">Reach Out</p>
          <h1 className="text-4xl font-heading font-bold">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-primary-700 mb-6">Send us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-semibold text-primary-700 mb-4">Contact Information</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span>📍</span>
                  <span>{settings.site_address || 'Kieni West, Nyeri County, Kenya'}</span>
                </li>
                <li className="flex gap-3">
                  <span>📞</span>
                  <a href={`tel:${settings.site_phone}`} className="hover:text-primary-600">
                    {settings.site_phone || '+254 700 000 000'}
                  </a>
                </li>
                <li className="flex gap-3">
                  <span>✉️</span>
                  <a href={`mailto:${settings.site_email}`} className="hover:text-primary-600">
                    {settings.site_email || 'info@kiboyacomprehensiveschool.co.ke'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-primary-700 mb-4">Office Hours</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>7:30am – 4:30pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>Closed</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-xl p-6">
              <h3 className="font-semibold text-gold-700 mb-2">For Admissions</h3>
              <p className="text-sm text-gray-600">
                Visit the school office during working hours for admission enquiries, or send an email and we will schedule a meeting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
