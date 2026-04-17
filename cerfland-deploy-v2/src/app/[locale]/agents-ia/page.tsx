import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Agents IA' : 'AI Agents' };
}

export default async function AgentsIAPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('agentsIA');
  const tHome = await getTranslations('home');
  const points = t.raw('whatIs.points') as string[];
  const tiers = t.raw('pricing.tiers') as Array<{ name: string; price: string; period: string; commit: string; desc: string; features: string[]; highlighted?: boolean }>;

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* What is it */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <ScrollReveal>
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-full border border-graphite/20" style={{ animation: 'spin 25s linear infinite' }} />
                <div className="absolute inset-6 rounded-full border border-bronze/10" style={{ animation: 'spin 18s linear infinite reverse' }} />
                <div className="absolute inset-12 rounded-full border border-bronze/15" style={{ animation: 'spin 12s linear infinite' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border border-bronze/40 rotate-45 flex items-center justify-center bg-charbon">
                    <span className="font-mono text-bronze text-2xl -rotate-45">◉</span>
                  </div>
                </div>
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                  const x = 50 + 44 * Math.cos((deg * Math.PI) / 180);
                  const y = 50 + 44 * Math.sin((deg * Math.PI) / 180);
                  return (
                    <div key={i} className="absolute w-2 h-2 rounded-full bg-bronze/30"
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', animation: `pulse 2s ease-in-out ${i * 300}ms infinite` }} />
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Text */}
            <div className="space-y-6">
              <ScrollReveal delay={100}>
                <h2 className="font-display font-light text-display-sm text-ivoire">{t('whatIs.heading')}</h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="h-px w-16 bg-bronze/40" />
              </ScrollReveal>
              <ul className="space-y-4">
                {points.map((point, i) => (
                  <ScrollReveal key={i} delay={250 + i * 80}>
                    <li className="flex items-start gap-4">
                      <span className="text-bronze text-xs mt-1 shrink-0">◆</span>
                      <span className="font-body text-ivoire-dim leading-relaxed">{point}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-noir">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">{t('pricing.heading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/20">
            {tiers.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`flex flex-col p-8 h-full relative ${tier.highlighted ? 'bg-charbon border-t-2 border-bronze' : 'bg-noir border border-graphite/20'}`}>
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-bronze text-noir text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-medium font-body">
                        {locale === 'fr' ? 'Recommandé' : 'Recommended'}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-light text-2xl text-ivoire mb-2">{tier.name}</h3>
                  <p className="font-body text-xs text-ivoire-dim mb-6">{tier.desc}</p>
                  <div className="mb-1">
                    <span className="font-mono text-3xl font-light text-ivoire">{tier.price}€</span>
                    <span className="font-body text-xs text-ivoire-dim ml-1">{locale === 'fr' ? '/mois' : '/month'}</span>
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

      <CTASection heading={tHome('cta.heading')} body={tHome('cta.body')}
        primary={tHome('cta.primary')} secondary={tHome('cta.secondary')}
        email={tHome('cta.email')} phone={tHome('cta.phone')} locale={locale} />
    </>
  );
}
