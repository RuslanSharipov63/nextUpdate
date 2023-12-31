import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Фотосток",
  description: "Больше крутых фотографий",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          </ReduxProvider>
        
      </body>
    </html>
  );
}
