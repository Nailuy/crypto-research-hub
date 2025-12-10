import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Research Hub | Web3 Analytics & Research Platform",
  description: "Comprehensive Web3 research platform for stablecoin analytics, DeFi protocol comparisons, and crypto research. Built for security professionals and blockchain researchers.",
  keywords: ["crypto", "web3", "research", "stablecoins", "DeFi", "blockchain", "analytics"],
  authors: [{ name: "Yulian", url: "https://my-portfolio-2025-lake.vercel.app/" }],
  openGraph: {
    title: "Crypto Research Hub",
    description: "Web3 Analytics & Research Platform",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
