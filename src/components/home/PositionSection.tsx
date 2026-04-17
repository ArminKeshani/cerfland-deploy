'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

interface PositionSectionProps {
  heading: string;
  body: string;
  sub: string;
  signature: string;
}

export default function PositionSection({ heading, body, sub, signature }: PositionSectionProps) {
  return (
    <section className="section-padding bg-charbon relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bronze/20 to-transparent" />
      <div className="container-luxury max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left — abstract visual */}
          <ScrollReveal delay={0}>
            <div className="relative aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-graphite/60 to-noir" />
              {/* Grid */}
              <div className="absolute inset-0 opacity-15">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 border-l border-ivoire" style={{ left: `${(i+1)*16}%` }} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 border-t border-ivoire" style={{ top: `${(i+1)*12}%` }} />
                ))}
              </div>
              {/* Bronze marks */}
              <div className="absolute bottom-10 left-10">
                <div className="w-14 h-14 border border-bronze/30 rotate-45" />
                <div className="w-5 h-5 bg-bronze/20 rotate-45 absolute top-[18px] left-[18px]" />
              </div>
              <div className="absolute top-8 right-8 font-mono text-8xl font-light text-graphite/20 leading-none select-none">01</div>
              {/* Quote */}
              <div className="absolute bottom-8 right-8 left-28">
                <p className="font-display italic text-ivoire/30 text-sm leading-relaxed">
                  "Nous ne vendons pas du bruit."
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — text */}
          <div className="space-y-8">
            <ScrollReveal delay={100}>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-bronze" />
                <span className="text-bronze text-[10px] tracking-[0.4em] uppercase font-body">Notre position</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="font-display font-light text-display-md text-ivoire leading-tight">{heading}</h2>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="h-px bg-gradient-to-r from-bronze/40 to-transparent" />
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="font-body text-lg text-ivoire-dim leading-relaxed">{body}</p>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <p className="font-body text-base text-ivoire-dim/70 leading-relaxed">{sub}</p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <p className="font-display italic text-bronze/70 text-lg">{signature}</p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
