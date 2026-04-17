'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SplineScene } from '@/components/ui/SplineScene';

interface HeroSectionProps {
  locale?: string;
  tagline: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  cta2: string;
}

// Set your Spline scene URL here when ready:
const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_HERO_SCENE || '';

export default function HeroSection({ locale = 'fr', tagline, title, subtitle, body, cta, cta2 }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const base = `/${locale}`;

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-animate]');
    els?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, 200 + i * 180);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-noir">
      {/* Spline / animated background */}
      <div className="absolute inset-0 z-0">
        <SplineScene scene={SPLINE_SCENE_URL} className="w-full h-full" />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80" />
      </div>

      {/* Ambient light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #8B7355 0%, transparent 65%)', filter: 'blur(80px)' }} />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 flex flex-col justify-center min-h-screen pt-32 pb-24">
        <div className="container-luxury max-w-5xl mx-auto px-6">

          {/* Tagline */}
          <div data-animate className="transition-all duration-700 ease-luxury" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            <span className="inline-block text-bronze text-[11px] tracking-[0.5em] uppercase font-body mb-10">
              {tagline}
            </span>
          </div>

          {/* Divider */}
          <div data-animate className="transition-all duration-600 ease-luxury" style={{ opacity: 0, transform: 'translateY(8px)' }}>
            <div className="flex items-center gap-5 mb-12">
              <div className="h-px w-20 bg-bronze/50" />
              <div className="w-1.5 h-1.5 bg-bronze rotate-45 opacity-80" />
              <div className="h-px w-20 bg-bronze/50" />
            </div>
          </div>

          {/* Main title */}
          <h1 data-animate className="font-display font-light text-display-xl text-ivoire leading-[1.05] mb-6 transition-all duration-1000 ease-luxury" style={{ opacity: 0, transform: 'translateY(28px)' }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p data-animate className="font-display font-light text-display-sm text-bronze/80 italic mb-10 transition-all duration-800 ease-luxury" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            {subtitle}
          </p>

          {/* Body */}
          <p data-animate className="font-body text-base text-ivoire-dim max-w-2xl leading-relaxed mb-14 transition-all duration-800 ease-luxury" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            {body}
          </p>

          {/* CTAs */}
          <div data-animate className="flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-luxury" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            <Link href={`${base}/contact`}
              className="inline-flex items-center justify-center bg-bronze text-noir hover:bg-bronze-light transition-all duration-400 ease-luxury px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-medium font-body">
              {cta}
            </Link>
            <Link href={`${base}/entreprises`}
              className="inline-flex items-center justify-center border border-ivoire-dim/25 text-ivoire-dim hover:border-bronze/60 hover:text-ivoire transition-all duration-400 ease-luxury px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-body">
              {cta2}
            </Link>
          </div>

          {/* Address */}
          <div data-animate className="mt-16 transition-all duration-700 ease-luxury" style={{ opacity: 0, transform: 'translateY(12px)' }}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-graphite font-body">
              Siège principal — Nice, 470 promenade des Anglais, 06200
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-pulse-slow">
        <ChevronDown size={14} className="text-graphite" />
      </div>
    </section>
  );
}
