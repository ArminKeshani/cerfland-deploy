'use client';

import { useEffect, useRef } from 'react';

interface PageHeroProps {
  tagline: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export default function PageHero({ tagline, title, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

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
    <section
      ref={ref}
      className="relative min-h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden hero-pattern pt-32 pb-20"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #8B7355 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-noir-bottom" />

      <div className="relative z-10 container-luxury max-w-4xl mx-auto px-6">
        <div
          data-animate
          className="transition-all duration-800 ease-luxury"
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          <span className="inline-block text-bronze text-xs tracking-[0.4em] uppercase font-body mb-8">
            {tagline}
          </span>
        </div>

        <div
          data-animate
          className="flex items-center justify-center gap-4 mb-10 transition-all duration-600 ease-luxury"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          <div className="h-px w-12 bg-bronze/60" />
          <div className="w-1 h-1 bg-bronze rotate-45" />
          <div className="h-px w-12 bg-bronze/60" />
        </div>

        <h1
          data-animate
          className="font-display font-light text-display-lg text-ivoire leading-tight mb-8 transition-all duration-1000 ease-luxury"
          style={{ opacity: 0, transform: 'translateY(25px)' }}
        >
          {title}
        </h1>

        <p
          data-animate
          className="font-body text-lg text-ivoire-dim max-w-2xl mx-auto leading-relaxed transition-all duration-800 ease-luxury"
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
