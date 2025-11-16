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
      <body>
        <StoreProvider>
          <LayoutContent>{children}</LayoutContent>
        </StoreProvider>
      </body>
    </html>
  );
}