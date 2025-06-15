// Next.js에서 Metadata 타입을 불러옵니다. HTML <head> 메타데이터 정의에 사용됩니다.
import type { Metadata } from "next";

// Google Fonts인 Geist Sans 및 Mono 폰트를 불러옵니다.
import { Geist, Geist_Mono } from "next/font/google";

// 전역 CSS 파일을 import 합니다.
import "./globals.css";
import { Provider } from "./provider";

// Geist Sans 폰트를 설정하고 CSS 변수로 저장합니다.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // 라틴 문자셋만 로드
});

// Geist Mono 폰트를 설정하고 CSS 변수로 저장합니다.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 메타데이터 설정: 페이지 제목과 설명 정의
export const metadata: Metadata = {
  title: "시발련아",
  description: "존나 하기 싫네",
};

// RootLayout 컴포넌트는 모든 페이지에 공통적으로 적용되는 레이아웃입니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // 설정한 폰트 CSS 변수 사용
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
