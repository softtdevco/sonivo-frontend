import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
//j
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
        <QueryProvider>
          <main>{children}</main>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
