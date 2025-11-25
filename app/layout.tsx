import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "GovConnect - Government Agency Dashboard",
  description: "Access comprehensive government agency and contact information across the United States. 920+ agencies, 1000+ verified contacts.",
  keywords: ["government", "agencies", "contacts", "USA", "government data", "public sector"],
  authors: [{ name: "GovConnect" }],
  creator: "GovConnect",
  publisher: "GovConnect",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "GovConnect - Government Agency Dashboard",
    description: "Access comprehensive government agency and contact information",
    siteName: "GovConnect",
  },
  twitter: {
    card: "summary_large_image",
    title: "GovConnect - Government Agency Dashboard",
    description: "Access comprehensive government agency and contact information",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          // Optimiser le CSS de Clerk
          rootBox: "inline-block",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Preconnect pour améliorer les performances */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* DNS prefetch pour les ressources externes */}
          <link rel="dns-prefetch" href="https://cdn.clerk.com" />
          <link rel="dns-prefetch" href="https://img.clerk.com" />
          {/* Preload des ressources critiques */}
          <link rel="preload" href="/Shape1.svg" as="image" type="image/svg+xml" />
        </head>
        <body suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
