// app/layout.js
'use client'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import StoreProvider from './lib/StoreProvider';
import Loading from './loading';
import './globals.css';

function LayoutContent({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  }, [pathname]); 

  if (loading) {
    return <Loading />;
  }

  return children;
}

export const metadata = {
  title: "Thai Health Therapy - Masaj və Relaksasiya Mərkəzi",
  description: "Peşəkar Thai masajı və relaksasiya xidmətləri",
  icons: {
    icon: "/favicon.ico",
    other: [
      { rel: "icon", url: "/icon.png" },
      { rel: "apple-touch-icon", url: "/apple-touch-icon.png" }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body>
        <StoreProvider>
          <LayoutContent>{children}</LayoutContent>
        </StoreProvider>
      </body>
    </html>
  );
}
