import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ANEX Advisory — Strategy. Intelligence. Execution.",
  description:
    "Premium real estate advisory, capital markets, redevelopment, sales and marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
