import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChivOS",
  description:
    "Browser personal desktop for Chiv — build things · explore deeply · stay curious.",
  applicationName: "ChivOS",
  authors: [{ name: "Chiv", url: "https://github.com/chivopic" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ChivOS",
    description: "Browser personal desktop for Chiv (chivopic).",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0e12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
