import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marval UI",
  description: "Marval UI Component Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}

