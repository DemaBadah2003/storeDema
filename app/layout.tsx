import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "متجري الإلكتروني",
  description: "أفضل المنتجات بأفضل الأسعار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body id="root" className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </Providers>

        {/* Toaster خارج Providers عشان يشتغل دايماً */}
        <Toaster richColors position="top-center" dir="rtl" />
      </body>
    </html>
  );
}