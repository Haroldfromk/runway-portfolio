import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const orbitron = localFont({
  src: "../public/fonts/Orbitron.ttf",
  variable: "--font-orbitron",
  weight: "400 900",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "400 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "RunWay - Turn Every Run Into A Flight",
  description:
    "전직 항공정비사가 설계한 정밀 운항 기반 러닝 트래커. GPS, 심박수, 케이던스를 계기판처럼 읽는 러닝 경험.",
  openGraph: {
    title: "RunWay - Turn Every Run Into A Flight",
    description:
      "전직 항공정비사가 설계한 정밀 운항 기반 러닝 트래커.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RunWay - Turn Every Run Into A Flight",
    description:
      "전직 항공정비사가 설계한 정밀 운항 기반 러닝 트래커.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${orbitron.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
