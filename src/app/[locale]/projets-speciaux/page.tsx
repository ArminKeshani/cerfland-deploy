import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Projets Spéciaux' : 'Special Projects' };
}

export default async function ProjetsSpeciauxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('projetsSpeciaux');
  const tHome = await getTranslations('home');
  const tiers = t.raw('pricing.tiers') as Array<{ name: string; price: string; period: string; desc: string; features: string[]; highlighted?: boolean }>;

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* Formats */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire mb-16">{t('pricing.heading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-graphite/20">
            {tiers.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`flex flex-col p-10 h-full relative ${tier.highlighted ? 'bg-noir border-t-2 border-bronze' : 'bg-charbon border border-graphite/20'}`}>
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-8">
                      <span className="bg-bronze text-noir text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-medium font-body">
                        {locale === 'fr' ? 'Signature' : 'Signature'}
                      </span>
                    </div>
                  )}
                  <div className="mb-8">
                    <span className="text-bronze text-[10px] tracking-[0.4em] uppercase font-body block mb-3">{tier.period}</span>
                    <h3 className="font-display font-light text-2xl text-ivoire mb-3">{tier.name}</h3>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="font-mono text-4xl font-light text-ivoire">{tier.price}€</span>
                      <span className="font-body text-xs text-ivoire-dim mb-1">HT</span>
                    </div>
                    <p className="font-body text-sm text-ivoire-dim leading-relaxed">{tier.desc}</p>
                  </div>
                  <div className="h-px bg-graphite/30 mb-8" />
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-bronze mt-0.5 shrink-0 text-xs">◆</span>
                        <span className="font-body text-sm text-ivoire-dim">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`/${locale}/contact`} className={`inline-flex items-center justify-center text-[11px] tracking-[0.2em] uppercase transition-all duration-400 px-6 py-3 font-body font-medium ${tier.highlighted ? 'bg-bronze text-noir hover:bg-bronze-light' : 'border border-graphite hover:border-bronze text-ivoire-dim hover:text-bronze'}`}>
                    {locale === 'fr' ? 'Discuter du projet' : 'Discuss project'}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Additional formats note */}
          <ScrollReveal delay={200}>
            <div className="mt-12 p-8 border border-graphite/30">
              <p className="font-body text-sm text-ivoire-dim leading-relaxed">
                {locale === 'fr'
                  ? "D'autres formats sont disponibles : Luxury Photo Campaign (8 500€ HT), Full Visual Identity (12 000€ HT). Ajouts possibles : teasers, clean feed, archive Vault, clearance, buyout, formats dérivés."
                  : "Other formats available: Luxury Photo Campaign (€8,500), Full Visual Identity (€12,000). Possible additions: teasers, clean feed, Vault archive, clearance, buyout, derivative formats."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Confidentiality note */}
      <section className="py-16 bg-noir">
        <div className="container-luxury max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="h-px w-12 bg-bronze/30" />
              <span className="text-bronze text-[10px] tracking-[0.4em] uppercase font-body">
                {locale === 'fr' ? 'Confidentialité' : 'Confidentiality'}
              </span>
              <div className="h-px w-12 bg-bronze/30" />
            </div>
            <p className="font-body text-ivoire-dim leading-relaxed">
              {locale === 'fr'
                ? "Certains projets demandent plus de discrétion. Dans ces cas, CerfLand travaille avec accès limité, diffusion contrôlée et refus de transformer un client sensible en vitrine involontaire."
                : "Some projects demand more discretion. In these cases, CerfLand works with limited access, controlled distribution and refusal to turn a sensitive client into an involuntary showcase."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection heading={tHome('cta.heading')} body={tHome('cta.body')}
        primary={tHome('cta.primary')} secondary={tHome('cta.secondary')}
        email={tHome('cta.email')} phone={tHome('cta.phone')} locale={locale} />
    </>
  );
}
