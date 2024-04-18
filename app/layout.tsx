import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "가계부",
  description: "가계부 웹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
