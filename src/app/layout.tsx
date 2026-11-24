import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
