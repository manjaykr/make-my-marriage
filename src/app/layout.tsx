import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
});

export const metadata: Metadata = {
  title: {
    default: "Make My Marriage",
    template: "%s | Make My Marriage",
  },
  description:
    "Bring wedding events, tasks, guests, and budgets together in one calm, shared workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmSerifDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}
