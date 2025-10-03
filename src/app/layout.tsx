/* =======================================
 *真珠夫人神戸本店 Layout
 * URL:src/app/layout.tsx
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Noto_Sans_JP, Oswald } from 'next/font/google';
import { isRealProduction } from '@/lib/env';
import ClientLayout from '@/components/ClientLayout';
import Script from 'next/script';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(
      process.env.NEXT_PUBLIC_METADATA_BASE || 'https://shinju-f-kobe.jp/'
    )
  : undefined;

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: '真珠夫人神戸本店のOGP画像',
        },
      ],
    },
  }),
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${notoSans.className} ${oswald.className}`}
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EV661LDSYH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EV661LDSYH');
          `}
        </Script>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
