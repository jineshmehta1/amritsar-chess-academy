// app/layout.tsx
import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Amritsar Chess Club (International School of Chess) - Learn Chess from Top Coaches',
    template: '%s | Amritsar Chess Club (International School of Chess)',
  },
  description:
    'Master chess with Amritsar Chess Club (International School of Chess). Learn from top coaches with online and offline training at Amritsar Chess Club (International School of Chess).',
  keywords: [
    'Amritsar Chess Club International School of Chess',
    'Amritsar Chess Club',
    'Amritsar Chess Club',
    'International school of chess',
    'Chess Udaipur',
    'learn chess',
    'online chess lessons',
    'offline chess training',
    'chess club',
    'chess training',
  ],
  metadataBase: new URL('https://www.theamritsarchessclub.com'),
  alternates: {
    canonical: 'https://www.theamritsarchessclub.com',
  },
  authors: [{ name: 'Amritsar Chess Club', url: 'https://www.theamritsarchessclub.com' }],
  creator: 'Amritsar Chess Club',
  publisher: 'Amritsar Chess Club',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Amritsar Chess Club - Learn Chess from Top Coaches',
    description: 'World-class chess training club led by top coaches.',
    url: 'https://www.theamritsarchessclub.com',
    siteName: 'Amritsar Chess Club',
    images: [
      {
        url: 'https://www.theamritsarchessclub.com/amritsar.png',
        width: 800,
        height: 600,
        alt: 'Amritsar Chess Club Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: 'Amritsar Chess Club (International School of Chess)',
                url: 'https://www.theamritsarchessclub.com',
                logo: 'https://www.theamritsarchessclub.com/amritsar.png',
                description: 'World-class chess training club led by top coaches.',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Sector 3',
                  addressLocality: 'Udaipur, jaipur',
                  addressRegion: 'Rajasthan',
                  postalCode: '313001',
                  addressCountry: 'IN',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-9592004076',
                  email: 'info@amritsarchessclub.in',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '250',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is Amritsar Chess Club?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Amritsar Chess Club is a world-class chess training institute led by top coaches offering online and offline chess training.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Who is the head coach of Amritsar Chess Club?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The head coach is XYZ, one of India’s top chess grandmasters.'
                    }
                  }
                ]
              }
            ]),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
