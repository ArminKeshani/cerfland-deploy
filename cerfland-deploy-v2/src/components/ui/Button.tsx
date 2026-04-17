import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-body font-medium tracking-[0.2em] uppercase transition-all duration-400 ease-luxury';

  const variants = {
    primary: 'bg-bronze text-noir hover:bg-bronze-light',
    secondary: 'border border-bronze text-bronze hover:bg-bronze hover:text-noir',
    ghost: 'text-ivoire-dim hover:text-ivoire border-b border-transparent hover:border-ivoire-dim',
  };

  const sizes = {
    sm: 'text-xs px-5 py-2',
    md: 'text-xs px-7 py-3',
    lg: 'text-sm px-10 py-4',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
