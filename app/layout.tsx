import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
