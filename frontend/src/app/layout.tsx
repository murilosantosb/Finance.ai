
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
  title: {
    template: "%s | Finance AI",
    default: "Finance AI - Gerencie suas finanças com eficiência",
  },
  description: "Acompanhe seu saldo, receitas e despesas com inteligência artificial e tenha controle total das suas finanças.",
  keywords: ["finanças", "gestão financeira", "inteligência artificial", "investimentos", "controle financeiro"],
  authors: [{ name: "Seu Nome", url: "https://seusite.com" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Finance AI - Controle suas finanças com inteligência",
    description: "A plataforma que usa IA para otimizar suas finanças e investimentos.",
    url: "https://seusite.com",
    siteName: "Finance AI",
    images: [
      {
        url: "/images/site-login.png", 
        width: 1200,
        height: 630,
        alt: "Finance AI - Gerenciamento financeiro inteligente",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance AI - Controle suas finanças com inteligência",
    description: "Acompanhe receitas, despesas e investimentos com uma plataforma inovadora.",
    images: ["/images/site-login.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
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
