import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  title: 'Afrihood — Raising African Living Standards, One Community at a Time',
  description:
    'Afrihood is a pan-African real estate and infrastructure development company committed to building pristine, secure, functional, and beautiful communities across Africa. Maiden projects: Aize Court, Uresa Court, and Millennium Court — Lagos, Nigeria.',
  keywords: 'African real estate, housing development, Lagos, Shelter Afrique, Infracredit, HSF, affordable housing, pan-African',
  openGraph: {
    title: 'Afrihood — Pan-African Real Estate & Infrastructure Development',
    description: 'Building the communities Africa deserves. Starting in Lagos.',
    url: 'https://afrihood.com',
    siteName: 'Afrihood',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afrihood — Pan-African Real Estate & Infrastructure Development',
    description: 'Building the communities Africa deserves.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
