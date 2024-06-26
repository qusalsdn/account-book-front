import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

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
    <Suspense>
      <html lang="ko">
        <body className="w-[480px] mx-auto h-full my-10 px-5 select-none font-bold">
          {children}
        </body>
      </html>
    </Suspense>
  );
}
