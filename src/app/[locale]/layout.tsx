import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import ConnectionListener from '@/components/ConnectionListener';
import { Toaster } from '@/components/ui/sonner';

import { switzer } from '@/fonts/fonts';
import { Locale } from '@/i18n/i18n.config';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/www/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Luft Stay', 'Residency', 'Stay'],
  authors: [
    {
      name: 'Luft Stay',
      url: siteConfig.url,
    },
  ],
  creator: 'Luft Stay',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@passresidency',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
    >
      <body
        className={`${switzer.variable} mx-auto h-dvh w-dvw max-w-[1920px] overflow-hidden bg-grayish-30 font-switzer antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ConnectionListener />
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
          <Toaster
            position={locale === 'en' ? 'bottom-left' : 'bottom-right'}
            closeButton
            richColors
            theme='light'
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
