import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Clean by Maria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} color="#17a5c6" />
        <QueryProvider>
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
