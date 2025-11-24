// app/layout.js
import "./globals.css"
import StoreProvider from "./lib/StoreProvider"
import LayoutClient from "./LayoutClient"

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
}

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body>
        <StoreProvider>
          <LayoutClient>{children}</LayoutClient>
        </StoreProvider>
      </body>
    </html>
  )
}
