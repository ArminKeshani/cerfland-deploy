'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: 'up' | 'fade';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  type = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (\!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${type === 'up' ? 'reveal-up' : 'reveal-fade'} ${className}`}
    >
      {children}
    </div>
  );
}
