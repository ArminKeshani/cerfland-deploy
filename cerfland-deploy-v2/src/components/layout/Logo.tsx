'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { w: 100, h: 100 },
    md: { w: 130, h: 130 },
    lg: { w: 160, h: 160 },
  };

  const { w, h } = dimensions[size];

  return (
    <Link href="/" className={`flex items-center group transition-opacity duration-300 hover:opacity-80 ${className}`}>
      <Image
        src="/images/logo.svg"
        alt="CerfLand Media"
        width={w}
        height={h}
        className="object-contain"
        priority
      />
    </Link>
  );
}
