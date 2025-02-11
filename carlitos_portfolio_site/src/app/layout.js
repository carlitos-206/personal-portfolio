import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Exported metadata for Next.js (if using App Directory)
// These values are consistent with the manual meta tags below.
export const metadata = {
  title: "Carlitos | Software Engineer",
  description:
    "Explore the innovative portfolio of Carlos R. Cáceres Martínez, a passionate software engineer specializing in full-stack development, AI integration, and software architecture.",
  keywords:
    "Software Engineer, Portfolio, Full-Stack Development, AI Integration, Next.js, React, Flask, Firebase, Hackathon Projects, ChatGPT, Robinhood API, User Data Collection, React Unused Image Finder",
  openGraph: {
    type: "website",
    url: "https://www.devcarlitos.com",
    title: "Carlitos | Software Engineer",
    description:
      "Discover Carlos R. Cáceres Martínez's portfolio featuring cutting-edge projects in full-stack development, AI integration, and software architecture.",
    images: [
      {
        url: "https://www.devcarlitos.xyz/_next/image?url=%2Fimages%2Fhero_outline.png&w=640&q=75",
        width: 640,
        height: 640,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://www.devcarlitos.com",
    title: "Carlitos | Software Engineer",
    description:
      "Explore my portfolio showcasing innovative projects built with Next.js, React, Flask, and more.",
    images: [
      "https://www.devcarlitos.xyz/_next/image?url=%2Fimages%2Fhero_outline.png&w=640&q=75",
    ],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos R. Cáceres Martínez",
    "url": "https://www.devcarlitos.com",
    "image":
      "https://www.devcarlitos.xyz/_next/image?url=%2Fimages%2Fhero_outline.png&w=640&q=75",
    "sameAs": [
      "mailto:carloscaceres041@gmail.com",
      "https://www.linkedin.com/in/carlitos206/",
      "https://www.youtube.com/@carloscaceres2608",
    ],
    "jobTitle": "Software Engineer",
    "description":
      "A passionate software engineer specializing in full-stack development, AI integration, and software architecture. Explore a diverse portfolio featuring projects built with Next.js, React, Flask, Firebase, and more.",
  };
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.devcarlitos.com" />
        <link
          rel="icon"
          href="/images/orthodox_cross.svg"
          type="image/png"
          sizes="32x32"
        />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.devcarlitos.com" />
        <meta property="og:title" content="Carlitos | Software Engineer" />
        <meta
          property="og:description"
          content="Discover Carlos R. Cáceres Martínez's portfolio featuring cutting-edge projects in full-stack development, AI integration, and software architecture."
        />
        <meta
          property="og:image"
          content="https://www.devcarlitos.xyz/_next/image?url=%2Fimages%2Fhero_outline.png&w=640&q=75"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.devcarlitos.com" />
        <meta
          name="twitter:title"
          content="Carlitos | Software Engineer"
        />
        <meta
          name="twitter:description"
          content="Explore my portfolio showcasing innovative projects built with Next.js, React, Flask, and more."
        />
        <meta
          name="twitter:image"
          content="https://www.devcarlitos.xyz/_next/image?url=%2Fimages%2Fhero_outline.png&w=640&q=75"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
