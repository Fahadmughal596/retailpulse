import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RetailPulse AI — Real-Time Retail Intelligence Platform",
  description:
    "AI-powered retail intelligence platform delivering real-time FMCG consumer data from Pakistan's Kiryana store network into actionable brand insights and demand forecasting.",
  keywords: "retail analytics, FMCG Pakistan, kiryana stores, AI dashboard, demand forecasting",
  authors: [{ name: "RetailPulse AI" }],
  openGraph: {
    title: "RetailPulse AI",
    description: "Real-time AI visibility into product consumption and market demand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
