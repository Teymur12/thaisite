// app/layout.js
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import StoreProvider from './lib/StoreProvider';
import Loading from './loading';
import './globals.css';

function LayoutContent({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <head>
        <title>Thai Health Therapy - Masaj və Relaksasiya Mərkəzi</title>
        <meta
          name="description"
          content="Peşəkar Thai masajı və relaksasiya xidmətləri"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/icon.png" sizes="192x192" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thai Health Therapy - Masaj və Relaksasiya Mərkəzi" />
        <meta property="og:description" content="Peşəkar Thai masajı və relaksasiya xidmətləri. Aroma Relax, Deep Tissue, Thai Relax masajları." />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
        <meta property="og:url" content="https://your-domain.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thai Health Therapy - Masaj və Relaksasiya Mərkəzi" />
        <meta name="twitter:description" content="Peşəkar Thai masajı və relaksasiya xidmətləri" />
        <meta name="twitter:image" content="https://your-domain.com/og-image.jpg" />
      </head>
      <body>
        <StoreProvider>
          <LayoutContent>{children}</LayoutContent>
        </StoreProvider>
      </body>
    </html>
  );
}
