
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import "../styles/custom.scss";
import "../styles/login.scss";
import "../styles/navbar.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
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
