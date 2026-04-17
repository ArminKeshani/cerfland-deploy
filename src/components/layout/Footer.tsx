import Link from 'next/link';
import Logo from './Logo';

interface FooterProps { locale?: string }

export default function Footer({ locale = 'fr' }: FooterProps) {
  const isFr = locale === 'fr';
  const base = `/${locale}`;

  const links = [
    { href: `${base}/entreprises`, label: isFr ? 'Entreprises' : 'Enterprises' },
    { href: `${base}/projets-speciaux`, label: isFr ? 'Projets Spéciaux' : 'Special Projects' },
    { href: `${base}/agents-ia`, label: isFr ? 'Agents IA' : 'AI Agents' },
    { href: `${base}/elvara`, label: 'Elvara' },
    { href: `${base}/familles`, label: isFr ? 'Familles & Éducation' : 'Families & Education' },
    { href: `${base}/club`, label: 'Club CerfLand' },
  ];

  return (
    <footer className="bg-charbon border-t border-graphite/50">
      <div className="container-luxury py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-6 font-display font-light text-xl text-ivoire-dim leading-relaxed max-w-xs">
              {isFr ? "L'art de raconter ce qui dure." : 'The art of telling what lasts.'}
            </p>
            <p className="mt-4 text-sm text-graphite leading-relaxed max-w-sm">
              {isFr ? 'Production cinématique · Stratégie éditoriale · Intelligence artificielle' : 'Cinematic production · Editorial strategy · Artificial intelligence'}
            </p>
            <div className="mt-8 flex gap-6">
              {['Instagram', 'LinkedIn', 'YouTube'].map((s) => (
                <a key={s} href="#" className="text-xs tracking-widest uppercase text-ivoire-dim hover:text-bronze transition-colors duration-300 font-body">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-bronze mb-6 font-body">{isFr ? 'Navigation' : 'Navigation'}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ivoire-dim hover:text-ivoire transition-colors duration-300 font-body">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-bronze mb-6 font-body">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:hello@cerfland.fr" className="block text-sm text-ivoire-dim hover:text-ivoire transition-colors duration-300 font-body">hello@cerfland.fr</a>
              <a href="tel:+33695617948" className="block text-sm text-ivoire-dim hover:text-ivoire transition-colors duration-300 font-body">+33 6 95 61 79 48</a>
              <p className="text-sm text-ivoire-dim font-body leading-relaxed">Nice, 470 promenade des Anglais<br/>Paris · Monaco · Dubaï · Montréal</p>
              <Link href={`${base}/contact`} className="inline-block mt-4 text-xs tracking-[0.2em] uppercase border border-bronze text-bronze hover:bg-bronze hover:text-noir transition-all duration-300 px-5 py-2.5 font-body">
                {isFr ? 'Commencer un projet' : 'Start a project'}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-graphite/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-graphite font-body tracking-wider">
            {isFr ? '© 2025 CerfLand Media. Tous droits réservés.' : '© 2025 CerfLand Media. All rights reserved.'}
          </p>
          <div className="flex gap-6">
            {[isFr ? 'Mentions légales' : 'Legal notice', isFr ? 'Confidentialité' : 'Privacy'].map((item) => (
     