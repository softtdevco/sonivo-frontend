import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className={inter.className}>
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
