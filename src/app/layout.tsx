import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "QAQ 博客 | 个人博客",
    template: "%s | QAQ 博客",
  },
  description: "一个分享编程、技术和生活故事的个人博客，使用 Next.js 和 Tailwind CSS 构建。",
  keywords: ["博客", "编程", "技术", "Next.js", "React", "TypeScript"],
  authors: [{ name: "QAQ", url: "https://github.com/qaqms" }],
  creator: "QAQ",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.com",
    siteName: "QAQ 博客",
    title: "QAQ 博客 | 个人博客",
    description: "一个分享编程、技术和生活故事的个人博客。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QAQ 博客",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QAQ 博客 | 个人博客",
    description: "一个分享编程、技术和生活故事的个人博客。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
