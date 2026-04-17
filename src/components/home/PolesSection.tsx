'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PoleItem { title: string; desc: string; icon: string }
interface PolesSectionProps { heading: string; subtitle: string; items: PoleItem[]; locale?: string }

const poleSlugs = ['entreprises','projets-speciaux','agents-ia','elvara','familles','club','contact'];

export default function PolesSection({ heading, subtitle, items, locale = 'fr' }: PolesSectionProps) {
  const base = `/${locale}`;

  return (
    <section className="section-padding bg-noir relative">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <ScrollReveal delay={0}>
            <span className="inline-block text-bronze text-xs tracking-[0.4em] uppercase font-body mb-6">
              {locale === 'fr' ? 'Ce que nous faisons' : 'What we do'}
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display font-light text-display-md text-ivoire mb-6">{heading}</h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-body text-ivoire-dim max-w-xl mx-auto">{subtitle}</p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-bronze/40" />
              <div className="w-1.5 h-1.5 bg-bronze rotate-45" />
              <div className="h-px w-16 bg-bronze/40" />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/20">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <Link href={`${base}/${poleSlugs[i] || 'contact'}`} className="luxury-card group flex flex-col p-8 h-full min-h-[220px] relative overflow-hidden">
                <span className="absolute top-4 right-6 font-mono text-5xl font-light text-graphite/20 leading-none group-hover:text-bronze/20 transition-colors duration-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-3xl mb-6 transition-transform duration-400 group-hover:scale-110 inline-block">{item.icon}</span>
                <h3 className="font-display font-light text-xl text-ivoire mb-3 group-hover:text-bronze transition-colors duration-300">{item.title}</h3>
                <p className="font-body text-sm text-ivoire-dim leading-relaxed flex-1">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs tracking-widest uppercase text-bronze font-body">{locale === 'fr' ? 'Découvrir' : 'Discover'}</span>
                  <ArrowRight size={12} className="text-bronze" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
