'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full bg-transparent border-b border-graphite hover:border-ivoire-dim focus:border-bronze outline-none py-4 font-body text-ivoire placeholder-graphite transition-colors duration-300 text-sm";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex flex-col justify-end pb-16 overflow-hidden hero-pattern pt-32">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at 50% 80%, #8B7355 0%, transparent 60%)' }} />
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <span className="text-bronze text-xs tracking-[0.4em] uppercase font-body block mb-6">Contact</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="font-display font-light text-display-lg text-ivoire leading-tight mb-6">
              Parlons.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-body text-ivoire-dim text-lg">
              Un échange clair, pour comprendre votre situation, votre niveau d'exigence et la forme juste.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Form */}
            <div>
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom" className={inputClass} />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Votre email" className={inputClass} />
                  </div>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Entreprise (optionnel)" className={inputClass} />
                  <select name="subject" value={form.subject} onChange={handleChange} required className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>Sujet de votre demande</option>
                    <option value="entreprises">Pôle Entreprises</option>
                    <option value="projets">Projet Spécial</option>
                    <option value="agents-ia">Agent IA</option>
                    <option value="elvara">Elvara</option>
                    <option value="familles">Familles &amp; Éducation</option>
                    <option value="club">Club CerfLand</option>
                    <option value="autre">Autre</option>
                  </select>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Votre message" rows={6} className={`${inputClass} resize-none`} />

                  {status === 'success' && (
                    <div className="border border-bronze/40 p-4">
                      <p className="text-bronze text-sm font-body">✓ Message reçu. Nous vous répondons sous 24h ouvrées.</p>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="border border-red-800/40 p-4">
                      <p className="text-red-400 text-sm font-body">Une erreur est survenue. Veuillez réessayer.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-bronze text-noir hover:bg-bronze-light disabled:opacity-60 transition-all duration-400 py-4 text-xs tracking-[0.3em] uppercase font-medium font-body"
                  >
                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <ScrollReveal delay={100}>
                <div>
                  <span className="text-bronze text-xs tracking-[0.3em] uppercase font-body block mb-4">Email</span>
                  <a href="mailto:hello@cerfland.fr" className="font-display text-xl text-ivoire hover:text-bronze transition-colors duration-300">
                    hello@cerfland.fr
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div>
                  <span className="text-bronze text-xs tracking-[0.3em] uppercase font-body block mb-4">Téléphone</span>
                  <a href="tel:+33695617948" className="font-display text-xl text-ivoire hover:text-bronze transition-colors duration-300">
                    +33 6 95 61 79 48
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div>
                  <span className="text-bronze text-xs tracking-[0.3em] uppercase font-body block mb-4">Siège</span>
                  <p className="font-body text-ivoire-dim leading-relaxed">
                    Nice, 470 promenade des Anglais, 06200
                  </p>
                  <p className="font-body text-sm text-graphite mt-1">
                    Paris · Monaco · Dubaï · Montréal
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div>
                  <span className="text-bronze text-xs tracking-[0.3em] uppercase font-body block mb-4">Délai de réponse</span>
                  <p className="font-body text-ivoire-dim">24 heures ouvrées</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="p-8 border border-graphite/40">
                  <p className="font-display italic text-ivoire-dim text-lg leading-relaxed">
                    "Nous ne prenons que des projets auxquels nous croyons. Si nous acceptons le vôtre, c'est parce que nous sommes convaincus de pouvoir vous offrir quelque chose d'exceptionnel."
                  </p>
                  <p className="font-body text-xs text-bronze mt-4 tracking-widest uppercase">— L'équipe CerfLand</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
