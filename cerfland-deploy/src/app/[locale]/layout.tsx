import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cormorant, inter, jetbrainsMono } from '@/lib/fonts';
import '../globals.css';

const locales = ['fr', 'en'];

export const metadata: Metadata = {
  title: {
    template: '%s | CerfLand Media',
    default: "CerfLand Media — L'image, l'intelligence et la structure.",
  },
  description: "Maison de direction créative, de production cinématographique et de systèmes intelligents. Paris · Monaco · Dubaï · Montréal.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (\!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-noir text-ivoire antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
