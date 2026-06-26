import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
