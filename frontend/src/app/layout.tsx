
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// SCSS
import "../styles/globals.scss";
import "../styles/custom.scss";
import "../styles/login.scss";
import "../styles/navbar.scss";
import "../styles/dashboard.scss";

import { AuthProvider } from "@/components/AuthoProvider";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance AI",
  description: "Gerencie suas finanças com eficiência",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} body`}>
           <Suspense fallback={<Loading />}>
              <AuthProvider>
                {children}
              </AuthProvider>
           </Suspense>
      </body>
    </html>
  );
}
