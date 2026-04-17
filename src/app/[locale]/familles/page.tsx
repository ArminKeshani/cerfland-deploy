import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import CTASection from '@/components/home/CTASection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Familles & Éducation' : 'Families & Education' };
}

export default async function FamillesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('familles');
  const tHome = await getTranslations('home');
  const isFr = locale === 'fr';

  const values = [
    { icon: '🎞️', title: isFr ? 'Mémoire Vivante' : 'Living Memory', desc: isFr ? 'Chaque famille a une histoire unique. Nous la filmions avec la même rigueur qu\'un documentaire de prestige.' : 'Every family has a unique story. We film it with the rigor of a prestige documentary.' },
    { icon: '🎓', title: isFr ? 'Transmission' : 'Transmission', desc: isFr ? 'Des programmes éducatifs sur mesure pour les familles qui croient en l\'importance de la culture.' : 'Custom educational programs for families who believe in the importance of culture.' },
    { icon: '🏛️', title: isFr ? 'Patrimoine' : 'Heritage', desc: isFr ? 'Archives filmiques, albums visuels, coffrets de prestige — pour que rien ne soit perdu.' : 'Film archives, visual albums, prestige boxes — so nothing is lost.' },
    { icon: '❤️', title: isFr ? 'Bienveillance' : 'Caring', desc: isFr ? 'Nous travaillons avec discrétion et respect, car certains moments sont sacrés.' : 'We work with discretion and respect, because some moments are sacred.' },
  ];

  const programs = [
    { name: isFr ? 'Film de Famille Prestige' : 'Prestige Family Film', price: isFr ? 'à partir de 3 500€' : 'from €3,500', desc: isFr ? 'Un documentaire de 20-30 minutes sur votre famille — tourné sur 1-2 jours, monté avec soin.' : 'A 20-30 minute documentary about your family — filmed over 1-2 days, carefully edited.' },
    { name: isFr ? 'Archives Patrimoniales' : 'Heritage Archives', price: isFr ? 'à partir de 1 800€' : 'from €1,800', desc: isFr ? 'Numérisation et mise en valeur de vos archives familiales : photos, super-8, lettres.' : 'Digitization and enhancement of your family archives: photos, super-8, letters.' },
    { name: isFr ? 'Programme Éducatif Famille' : 'Family Education Program', price: isFr ? '890€/trimestre' : '€890/quarter', desc: isFr ? 'Ateliers mensuels pour parents et enfants sur l\'art, la culture et la créativité.' : 'Monthly workshops for parents and children on art, culture and creativity.' },
    { name: isFr ? 'Anniversaire Cinématique' : 'Cinematic Anniversary', price: isFr ? 'à partir de 2 200€' : 'from €2,200', desc: isFr ? 'Capturez un moment unique — anniversaire, retrouvailles, célébration — avec une qualité cinématique.' : 'Capture a unique moment — birthday, reunion, celebration — with cinematic quality.' },
  ];

  return (
    <>
      <PageHero tagline={t('hero.tagline')} title={t('hero.title')} subtitle={t('hero.subtitle')} />

      {/* Values */}
      <section className="section-padding bg-charbon">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">
              {isFr ? 'Nos valeurs' : 'Our values'}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite/20">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="luxury-card p-8 text-center">
                  <span className="text-4xl mb-6 block">{v.icon}</span>
                  <h3 className="font-display text-xl text-ivoire mb-4">{v.title}</h3>
                  <p className="font-body text-sm text-ivoire-dim leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-noir">
        <div className="container-luxury max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display font-light text-display-md text-ivoire text-center mb-16">
              {isFr ? 'Nos programmes' : 'Our programs'}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="luxury-card p-8">
                  <h3 className="font-display text-2xl text-ivoire mb-2">{p.name}</h3>
                  <p className="font-mono text-bronze text-sm mb-4">{p.price}</p>
                  <p className="font-body text-sm text-ivoire-dim leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
