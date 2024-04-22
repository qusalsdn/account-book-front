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
      <body className="w-[480px] mx-auto h-screen my-10 px-5 select-none font-bold">
        {children}
      </body>
    </html>
  );
}
