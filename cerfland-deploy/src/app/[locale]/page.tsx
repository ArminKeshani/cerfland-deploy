import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import PositionSection from '@/components/home/PositionSection';
import PolesSection from '@/components/home/PolesSection';
import CTASection from '@/components/home/CTASection';

interface PageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr'
      ? "CerfLand Media — L'image, l'intelligence et la structure."
      : 'CerfLand Media — Image, intelligence and structure.',
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const poles = t.raw('poles.items') as Array<{ title: string; desc: string; icon: string }>;

  return (
    <>
      <HeroSection
        locale={locale}
        tagline={t('hero.tagline')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        body={t('hero.body')}
        cta={t('hero.cta')}
        cta2={t('hero.cta2')}
      />
      <PositionSection
        heading={t('position.heading')}
        body={t('position.body')}
        sub={t('position.sub')}
        signature={t('position.signature')}
      />
      <PolesSection
        heading={t('poles.heading')}
        subtitle={t('poles.subtitle')}
        items={poles}
        locale={locale}
      />
      <CTASection
        heading={t('cta.heading')}
        body={t('cta.body')}
        primary={t('cta.primary')}
        secondary={t('cta.secondary')}
        email={t('cta.email')}
        phone={t('cta.phone')}
        locale={locale}
      />
    </>
  );
}
