import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/app/contexts/userContext";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-syne',
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "TransKript",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${syne.variable} ${outfit.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          <QueryProvider>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </QueryProvider>
        </UserProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
