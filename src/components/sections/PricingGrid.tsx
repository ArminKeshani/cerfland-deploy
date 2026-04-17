'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PricingTier { name: string; price: string; desc: string; features: string[]; highlighted?: boolean }
interface PricingGridProps { heading: string; tiers: PricingTier[]; locale?: string; period?: string }

export default function PricingGrid({ heading, tiers, locale = 'fr', period = '' }: PricingGridProps) {
  const contactHref = `/${locale}/contact`;

  return (
    <section className="section-padding bg-noir">
      <div className="container-luxury">
        <ScrollReveal delay={0}>
          <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">{heading}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/20">
          {tiers.map((tier, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className={`flex flex-col p-8 h-full relative ${tier.highlighted ? 'bg-charbon border-t-2 border-bronze' : 'bg-noir border border-graphite/30'}`}>
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-bronze text-noir text-[10px] tracking-[0.2em] uppercase px-4 py-1 font-medium font-body">
                      {locale === 'fr' ? 'Recommandé' : 'Recommended'}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-light text-2xl text-ivoire mb-2">{tier.name}</h3>
                  <p className="font-body text-sm text-ivoire-dim">{tier.desc}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-graphite/30">
                  {['Sur devis', 'Custom', 'Sur invitation', 'By invitation'].includes(tier.price) ? (
                    <span className="font-display font-light text-3xl text-bronze">{tier.price}</span>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-mono text-4xl font-light text-ivoire">€{tier.price}</span>
                      {period && <span className="font-body text-sm text-ivoire-dim mb-1">{period}</span>}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check size={14} className="text-bronze mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-ivoire-dim leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={contactHref} className={`inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase transition-all duration-400 ease-luxury px-6 py-3 font-body font-medium ${tier.highlighted ? 'bg-bronze text-noir hover:bg-bronze-light' : 'border border-graphite hover:border-bronze text-ivoire-dim hover:text-bronze'}`}>
                  {locale === 'fr' ? 'Commencer' : 'Get started'}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
