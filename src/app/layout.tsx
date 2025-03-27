import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/ui/SessionProviderWrapper";
import CookiesProviderWrapper from "@/components/ui/CookiesProviderWrapper";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
    title: "IQ Test App",
    description: "Take an IQ test and get instant results",
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper>
            <CookiesProviderWrapper>
                {children}
            </CookiesProviderWrapper>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
