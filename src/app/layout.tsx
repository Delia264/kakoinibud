import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Иван Иванов | Frontend Разработчик',
    template: '%s | Иван Иванов',
  },
  description:
    'Портфолио frontend-разработчика. Next.js, TypeScript, React. Создание современных веб-приложений.',
  keywords: [
    'frontend',
    'разработчик',
    'Next.js',
    'TypeScript',
    'React',
    'портфолио',
    'веб-разработка',
  ],
  authors: [{ name: 'Иван Иванов' }],
  creator: 'Иван Иванов',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://username.github.io/portfolio/',
    siteName: 'Портфолио | Иван Иванов',
    title: 'Иван Иванов | Frontend Разработчик',
    description:
      'Портфолио frontend-разработчика. Next.js, TypeScript, React.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Иван Иванов - Frontend Разработчик',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Иван Иванов | Frontend Разработчик',
    description:
      'Портфолио frontend-разработчика. Next.js, TypeScript, React.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://username.github.io/portfolio'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-sans antialiased dark`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
