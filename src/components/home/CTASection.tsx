'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface CTASectionProps {
  heading: string;
  body: string;
  primary: string;
  secondary: string;
  email?: string;
  phone?: string;
  locale?: string;
}

export default function CTASection({ heading, body, primary, secondary, email, phone, locale = 'fr' }: CTASectionProps) {
  const base = `/${locale}`;
  return (
    <section className="section-padding bg-charbon relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #8B7355 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

      <div className="relative z-10 container-luxury max-w-3xl mx-auto text-center">
        <ScrollReveal delay={0}>
          <div className="flex items-center justify-center gap-5 mb-12">
            <div className="h-px w-16 bg-bronze/30" />
            <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
            <div className="h-px w-16 bg-bronze/30" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display font-light text-display-md text-ivoire mb-8 leading-tight">{heading}</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="font-body text-ivoire-dim text-lg leading-relaxed mb-12">{body}</p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={`${base}/contact`}
              className="inline-flex items-center justify-center bg-bronze text-noir hover:bg-bronze-light transition-all duration-400 ease-luxury px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-medium font-body">
              {primary}
            </Link>
            <Link href={`${base}/entreprises`}
              className="inline-flex items-center justify-center border border-ivoire-dim/25 text-ivoire-dim hover:border-bronze/60 hover:text-bronze transition-all duration-400 ease-luxury px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-body">
              {secondary}
            </Link>
          </div>
        </ScrollReveal>

        {(email || phone) && (
          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {email && (
                <a href={`mailto:${email}`}
                  className="text-sm text-ivoire-dim hover:text-bronze transition-colors duration-300 font-body tracking-wider">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone?.replace(/\s/g, '')}`}
                  className="text-sm text-ivoire-dim hover:text-bronze transition-colors duration-300 font-body tracking-wider">
                  {phone}
                </a>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
