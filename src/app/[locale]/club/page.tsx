import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Check } from 'lucide-react';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: 'Club CerfLand' };
}

const applicationSteps = [
  { num: '01', fr: 'Candidature', en: 'Application', desc_fr: 'Remplissez le formulaire confidentiel. Parlez-nous de vous, de vos projets, de ce que vous apportez au Club.', desc_en: 'Fill out the confidential form. Tell us about yourself, your projects, what you bring to the Club.' },
  { num: '02', fr: 'Entretien', en: 'Interview', desc_fr: 'Un membre du Conseil vous contacte pour un échange de 30 minutes. Nous voulons vous connaître.', desc_en: 'A Council member contacts you for a 30-minute exchange. We want to get to know you.' },
  { num: '03', fr: 'Validation', en: 'Validation', desc_fr: 'Le Conseil délibère et vous informe sous 5 jours ouvrés. Chaque candidature est traitée avec sérieux.', desc_en: 'The Council deliberates and informs you within 5 business days. Each application is treated seriously.' },
  { num: '04', fr: 'Bienvenue', en: 'Welcome', desc_fr: 'Vous rejoignez le Club. Vous recevez votre kit de bienvenue et accès à toutes les ressources membres.', desc_en: 'You join the Club. You receive your welcome kit and access to all member resources.' },
];

export default async function ClubPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('club');
  const tHome = await getTranslations('home');
  const tiers = t.raw('tiers.items') as Array<{ name: string; price: string; period: string; desc: string; features: string[]; highlighted?: boolean }>;

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* What is the Club */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire mb-8">
              {locale === 'fr' ? 'Plus qu\'un réseau.' : 'More than a network.'}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="font-body text-ivoire-dim text-lg leading-relaxed">
              {locale === 'fr'
                ? "Le Club CerfLand est un espace privé où l'excellence se rencontre. Nous réunissons des entrepreneurs, créateurs, investisseurs et leaders qui partagent une conviction : la qualité n'est pas un détail, c'est une culture."
                : "Club CerfLand is a private space where excellence meets. We bring together entrepreneurs, creators, investors and leaders who share a conviction: quality is not a detail, it's a culture."}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { n: '150+', label: locale === 'fr' ? 'Membres' : 'Members' },
                { n: '12', label: locale === 'fr' ? 'Événements/an' : 'Events/year' },
                { n: '3', label: locale === 'fr' ? 'Villes' : 'Cities' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-4xl text-bronze mb-2">{stat.n}</div>
                  <div className="font-body text-xs tracking-widest uppercase text-ivoire-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Membership tiers */}
      <section className="section-padding bg-noir">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">
              {t('tiers.heading')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-graphite/20 max-w-4xl mx-auto">
            {tiers.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`flex flex-col p-8 h-full relative ${tier.highlighted ? 'bg-charbon border-t-2 border-bronze' : 'bg-noir border border-graphite/30'}`}>
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-bronze text-noir text-[10px] tracking-[0.2em] uppercase px-4 py-1 font-medium font-body">
                        {locale === 'fr' ? 'Populaire' : 'Popular'}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-light text-2xl text-ivoire mb-1">{tier.name}</h3>
                  <p className="font-body text-sm text-ivoire-dim mb-6">{tier.desc}</p>
                  <div className="mb-6 pb-6 border-b border-graphite/30">
                    {tier.price === 'Sur invitation' || tier.price === 'By invitation' ? (
                      <span className="font-display text-2xl text-bronze">{tier.price}</span>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="font-mono text-4xl font-light text-ivoire">€{tier.price}</span>
                        <span className="font-body text-sm text-ivoire-dim mb-1">{tier.period}</span>
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={14} className="text-bronze mt-0.5 shrink-0" />
                        <span className="font-body text-sm text-ivoire-dim">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`/${locale}/contact`} className={`inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase transition-all duration-400 px-6 py-3 font-body font-medium ${tier.highlighted ? 'bg-bronze text-noir hover:bg-bronze-light' : 'border border-graphite hover:border-bronze text-ivoire-dim hover:text-bronze'}`}>
                    {locale === 'fr' ? 'Candidater' : 'Apply'}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application process */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">
              {locale === 'fr' ? 'Processus de candidature' : 'Application process'}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className="w-14 h-14 border border-bronze/40 mx-auto mb-6 flex items-center justify-center">
                    <span className="font-mono text-bronze">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg text-ivoire mb-3">{locale === 'fr' ? step.fr : step.en}</h3>
                  <p className="font-body text-sm text-ivoire-dim leading-relaxed">{locale === 'fr' ? step.desc_fr : step.desc_en}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={tHome('cta.heading')}
        body={tHome('cta.body')}
        primary={locale === 'fr' ? 'Candidater au Club' : 'Apply to the Club'}
        secondary={tHome('cta.secondary')}
        locale={locale}
      />
    </>
  );
}
