
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// SCSS
import "../styles/globals.scss";
import "../styles/custom.scss";
import "../styles/login.scss";
import "../styles/navbar.scss";
import "../styles/dashboard.scss";
import "../styles/modals.scss";
import "../styles/skeletons.scss";
import "../styles/transaction.scss";
import "../styles/signature.scss";

import { AuthProvider } from "@/components/AuthoProvider";

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
  icons: {
    icon: "./favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} body`}>
          <AuthProvider>
              {children}
          </AuthProvider>
      </body>
    </html>
  );
}
