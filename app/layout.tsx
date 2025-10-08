import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import HeaderWrapper from '@/components/header-wrapper';
import I18nProvider from '@/components/i18n-provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Rehand AI | Full‑body physiotherapy at home',
    template: '%s | Rehand AI'
  },
  description: 'Train safely at home with intelligent camera support. Real‑time posture cues, guided exercise steps, and automatic progress tracking.',
  metadataBase: new URL('https://rehand.app'),
  openGraph: {
    title: 'Rehand AI | Full‑body physiotherapy at home',
    description: 'Real‑time posture cues, guided steps, and automatic progress tracking.',
    url: 'https://rehand.app',
    siteName: 'Rehand AI',
    images: [
      {
        url: '/images/logotype-long.png',
        width: 1200,
        height: 630,
        alt: 'Rehand AI'
      }
    ],
    type: 'website'
  },
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rehand AI | Full‑body physiotherapy at home',
    description: 'Real‑time posture cues, guided steps, and automatic progress tracking.',
    images: ['/images/logotype-long.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R9R1M86N14"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R9R1M86N14');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>
            <HeaderWrapper>{children}</HeaderWrapper>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 