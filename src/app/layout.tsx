import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientWrapper from "./ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
