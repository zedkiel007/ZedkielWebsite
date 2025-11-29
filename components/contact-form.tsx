'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent — thank you!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('Network error — please try again.');
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="contact-form">
      <div>
        <label className="block text-sm text-slate-300">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} name="name" required className="mt-1 w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="block text-sm text-slate-300">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required className="mt-1 w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
      </div>
      <div>
        <label className="block text-sm text-slate-300">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" rows={5} required className="mt-1 w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="inline-block bg-white text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-slate-100 transition">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        <div className="text-sm text-slate-300">{status}</div>
      </div>
    </form>
  );
}
