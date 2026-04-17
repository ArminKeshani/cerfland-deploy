import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: 'Elvara' };
}

export default async function ElvaraPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('elvara');
  const tHome = await getTranslations('home');
  const editions = t.raw('editions.items') as Array<{ season: string; theme: string; date: string; desc: string }>;

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* What is Elvara */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury max-w-4xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-bronze/40" />
              <span className="font-display italic text-bronze text-lg">Elvara</span>
              <div className="h-px w-16 bg-bronze/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="font-display font-light text-display-md text-ivoire mb-8 leading-tight">
              {locale === 'fr'
                ? 'Un magazine qui refuse de choisir entre beauté et intelligence.'
                : 'A magazine that refuses to choose between beauty and intelligence.'}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="font-body text-ivoire-dim text-lg leading-relaxed max-w-2xl mx-auto">
              {locale === 'fr'
                ? "Elvara est une publication trimestrielle indépendante — art, architecture, territoire, pensée. Pour ceux qui lisent encore pour être changés, pas seulement informés."
                : "Elvara is an independent quarterly publication — art, architecture, territory, thought. For those who still read to be changed, not just informed."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Editions */}
      <section className="section-padding bg-noir">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">
              {t('editions.heading')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-graphite/20">
            {editions.map((ed, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="luxury-card p-10 relative overflow-hidden group">
                  {/* Season number */}
                  <span className="absolute top-6 right-8 font-mono text-6xl font-light text-graphite/15 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="mb-2">
                    <span className="text-bronze text-xs tracking-[0.35em] uppercase font-body">{ed.season}</span>
                    <span className="text-graphite text-xs font-body ml-4">· {ed.date}</span>
                  </div>

                  <h3 className="font-display font-light text-2xl text-ivoire mt-3 mb-4 group-hover:text-bronze transition-colors duration-300">
                    {ed.theme}
                  </h3>

                  <div className="h-px w-8 bg-bronze/40 mb-4 group-hover:w-16 transition-all duration-500" />

                  <p className="font-body text-sm text-ivoire-dim leading-relaxed">{ed.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-sm text-ivoire mb-6">
              {locale === 'fr' ? 'Abonnez-vous à Elvara' : 'Subscribe to Elvara'}
            </h2>
            <p className="font-body text-ivoire-dim mb-10">
              {locale === 'fr'
                ? '4 éditions par an. Livraison mondiale. Prix : 120€/an.'
                : '4 editions per year. Worldwide delivery. Price: €120/year.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center bg-bronze text-noir hover:bg-bronze-light transition-all duration-400 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium font-body"
            >
              {locale === 'fr' ? 'S\'abonner' : 'Subscribe'}
            </a>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading={tHome('cta.heading')}
        body={tHome('cta.body')}
        primary={tHome('cta.primary')}
        secondary={tHome('cta.secondary')}
        locale={locale}
      />
    </>
  );
}
