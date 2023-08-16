import "./globals.css";
import Document, { Head, Html, Main, NextScript } from 'next/document'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/store/provider";
import { ServerStyleSheet } from 'styled-components'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Фотосток",
  description: "Больше крутых фотографий",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
