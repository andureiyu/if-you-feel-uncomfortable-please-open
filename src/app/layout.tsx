import type { Metadata } from "next";
import { Gamja_Flower } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const gamjaFlower = Gamja_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gamja",
});

// Place your BaksoSapi font file in src/fonts/ and update the path below
const baksoSapi = localFont({
  src: "../fonts/BaksoSapi.ttf",
  variable: "--font-bakso",
  display: "swap",
});

export const metadata: Metadata = {
  title: "If you feel uncomfortable, open this.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gamjaFlower.variable} ${baksoSapi.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
