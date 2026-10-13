'use client'
// app/(public)/contact/page.tsx
import { useState } from 'react'
import { getSiteSettings } from '@/lib/settings'
import type { Metadata } from 'next'

// Server metadata export won't work in 'use client' —
// so we split this into a server wrapper + client form.
// This is the CLIENT FORM component:

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setState('success')
    } catch (err: any) {
      setErrorMsg(err.message)
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">Message Received!</h3>
        <p className="text-gray-500">Thank you for reaching out. We will get back to you soon.</p>
        <button
          onClick={() => { setState('idle'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
          className="mt-6 btn-primary"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Full Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="admin-input"
            placeholder="e.g. John Kamau"
          />
        </div>
        <div>
          <label className="admin-label">Email Address *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="admin-input"
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Phone Number (Optional)</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="admin-input"
            placeholder="+254 7XX XXX XXX"
          />
        </div>
        <div>
          <label className="admin-label">Subject</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="admin-input"
            placeholder="Reason for contact"
          />
        </div>
      </div>
      <div>
        <label className="admin-label">Message *</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="admin-input resize-none"
          placeholder="Please write your message here..."
        />
      </div>
      {state === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}
      <button type="submit" disabled={state === 'loading'} className="btn-primary w-full">
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
