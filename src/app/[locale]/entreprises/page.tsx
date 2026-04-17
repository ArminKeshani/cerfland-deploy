import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import PricingGrid from '@/components/sections/PricingGrid';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Entreprises' : 'Enterprises' };
}

export default async function EntreprisesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('entreprises');
  const tHome = await getTranslations('home');
  const problemItems = t.raw('problem.items') as Array<{ title: string; desc: string }>;
  const pricingTiers = t.raw('pricing.tiers') as Array<{ name: string; price: string; period: string; commit: string; desc: string; features: string[]; highlighted?: boolean }>;
  const forWhoItems = t.raw('forWho.items') as string[];

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* For whom */}
      <section className="py-20 bg-charbon border-b border-graphite/20">
        <div className="container-luxury max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-8 bg-bronze" />
              <span className="text-bronze text-[10px] tracking-[0.4em] uppercase font-body">{t('forWho.heading')}</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {forWhoItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <span className="border border-graphite/60 text-ivoire-dim text-xs tracking-widest uppercase font-body px-5 py-2.5 hover:border-bronze/50 hover:text-ivoire transition-all duration-300">
                  {item}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding bg-noir">
        <div className="container-luxury max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire mb-16 max-w-3xl leading-tight">
              {t('problem.heading')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-graphite/20">
            {problemItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="luxury-card p-10">
                  <div className="w-8 h-8 border border-bronze/40 rotate-45 mb-8 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-bronze/30 rotate-0" />
                  </div>
                  <h3 className="font-display text-xl text-ivoire mb-4 leading-snug">{item.title}</h3>
                  <p className="font-body text-sm text-ivoire-dim leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="mb-4">
              <h2 className="font-display font-light text-display-md text-ivoire mb-4">{t('pricing.heading')}</h2>
              <p className="font-body text-xs text-graphite tracking-widest uppercase">{t('pricing.note')}</p>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/20">
            {pricingTiers.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`flex flex-col p-8 h-full relative ${tier.highlighted ? 'bg-noir border-t-2 border-bronze' : 'bg-charbon border border-graphite/20'}`}>
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-bronze text-noir text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-medium font-body">
                        {locale === 'fr' ? 'Recommandé' : 'Recommended'}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-light text-2xl text-ivoire mb-2">{tier.name}</h3>
                  <p className="font-body text-xs text-ivoire-dim mb-6">{tier.desc}</p>
                  <div className="mb-2">
                    <span className="font-mono text-3xl font-light text-ivoire">{tier.price}€</span>
                    <span className="font-body text-xs text-ivoire-dim ml-1">{tier.period.replace(tier.price + ' ', '')}</span>
                  </div>
                  <p className="font-body text-[10px] text-bronze tracking-widest uppercase mb-6">{tier.commit}</p>
                  <div className="h-px bg-graphite/30 mb-6" />
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-bronze mt-0.5 shrink-0 text-xs">◆</span>
                        <span className="font-body text-sm text-ivoire-dim leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`/${locale}/contact`} className={`inline-flex items-center justify-center text-[11px] tracking-[0.2em] uppercase transition-all duration-400 px-6 py-3 font-body font-medium ${tier.highlighted ? 'bg-bronze text-noir hover:bg-bronze-light' : 'border border-graphite hover:border-bronze text-ivoire-dim hover:text-bronze'}`}>
                    {locale === 'fr' ? 'Commencer' : 'Start'}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={tHome('cta.heading')} body={tHome('cta.body')}
        primary={tHome('cta.primary')} secondary={tHome('cta.secondary')}
        email={tHome('cta.email')} phone={tHome('cta.phone')} locale={locale}
      />
    </>
  );
}
