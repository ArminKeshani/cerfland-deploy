'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { slug: 'entreprises', fr: 'Entreprises', en: 'Enterprises' },
  { slug: 'projets-speciaux', fr: 'Projets Spéciaux', en: 'Special Projects' },
  { slug: 'agents-ia', fr: 'Agents IA', en: 'AI Agents' },
  { slug: 'elvara', fr: 'Elvara', en: 'Elvara' },
  { slug: 'familles', fr: 'Familles', en: 'Families' },
  { slug: 'club', fr: 'Club', en: 'Club' },
];

interface HeaderProps { locale?: string }

export default function Header({ locale = 'fr' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const base = `/${locale}`;
  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  // Switch language keeping the same path
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-noir/95 backdrop-blur-md border-b border-graphite/50' : 'bg-transparent'}`}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            <Logo size="md" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ slug, fr, en }) => {
                const href = `${base}/${slug}`;
                const label = locale === 'fr' ? fr : en;
                const isActive = pathname.includes(`/${slug}`);
                return (
                  <Link key={slug} href={href} className={`text-sm tracking-widest uppercase font-body transition-colors duration-300 relative group ${isActive ? 'text-bronze' : 'text-ivoire-dim hover:text-ivoire'}`}>
                    {label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-bronze transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <Link href={switchLocalePath} className="hidden lg:block text-xs tracking-[0.2em] uppercase text-ivoire-dim hover:text-bronze transition-colors duration-300 border border-graphite hover:border-bronze px-3 py-1.5">
                {otherLocale.toUpperCase()}
              </Link>
              <Link href={`${base}/contact`} className="hidden lg:block text-xs tracking-[0.2em] uppercase bg-bronze text-noir hover:bg-bronze-light transition-colors duration-300 px-5 py-2.5 font-medium font-body">
                Contact
              </Link>
              <button onClick={() => setMenuOpen(\!menuOpen)} className="lg:hidden text-ivoire hover:text-bronze transition-colors p-1" aria-label="Toggle menu">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-noir transition-all duration-500 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col justify-center items-center h-full gap-8 px-8">
          <Logo size="lg" />
          <div className="w-px h-12 bg-graphite" />
          {navLinks.map(({ slug, fr, en }, i) => (
            <Link key={slug} href={`${base}/${slug}`} onClick={() => setMenuOpen(false)}
              className="text-2xl font-display font-light text-ivoire hover:text-bronze transition-colors duration-300 tracking-wider"
              style={{ transitionDelay: `${i * 50}ms` }}>
              {locale === 'fr' ? fr : en}
            </Link>
          ))}
          <div className="w-px h-8 bg-graphite" />
          <Link href={`${base}/contact`} onClick={() => setMenuOpen(false)}
            className="text-xs tracking-[0.3em] uppercase bg-bronze text-noir px-8 py-3 font-medium font-body">
            {locale === 'fr' ? 'Commencer un projet' : 'Start a project'}
          </Link>
        </div>
      </div>
    </>
  );
}
