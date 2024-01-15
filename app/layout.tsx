import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { NextAuthProvider } from "@/context/AuthContext";
import { StocksProvider } from "@/context/StocksContext";
import ContextProviders from "@/context/AppContextProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Market App",
  description: "Siemens Stock Market App Assessment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`min-h-full ${inter.className}`}>
        <ContextProviders>
          <Header />
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}
