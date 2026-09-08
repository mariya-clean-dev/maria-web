import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import Script from "next/script";

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
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
          >
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){
                      (c[a].q=c[a].q||[]).push(arguments)
                  };
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yexvk7qps8");
            `}
          </Script>
      </body>
    </html>
  );
}
