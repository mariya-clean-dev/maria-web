import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

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
      <body>
        <NextTopLoader showSpinner={false} />
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
