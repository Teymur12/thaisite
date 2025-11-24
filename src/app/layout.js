// app/layout.js
import StoreProvider from './lib/StoreProvider';
import './globals.css';
import Loading from './loading';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const metadata = {
  title: "Thai Health Therapy - Masaj və Relaksasiya Mərkəzi",
  description: "Peşəkar Thai masajı və relaksasiya xidmətləri",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192" }
    ],
    apple: "/apple-touch-icon.png",
  },
};


function LayoutContent({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) return <Loading />;
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
