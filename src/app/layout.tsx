import ClientBundleSizeMonitor from "@/components/ClientBundleSizeMonitor";
import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
  metadataBase: new URL('https://justinwessels.com'),
  title: "Justin Wessels - Full Stack Developer",
  description: "Portfolio of Justin Wessels, a passionate full-stack developer creating innovative web applications and digital experiences.",
  keywords: ["Justin Wessels", "Full Stack Developer", "Portfolio", "Web Development", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Justin Wessels" }],
  creator: "Justin Wessels",
  publisher: "Justin Wessels",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://justinwessels.com',
    siteName: 'Justin Wessels',
    title: 'Justin Wessels - Full Stack Developer',
    description: 'Portfolio of Justin Wessels, a passionate full-stack developer creating innovative web applications and digital experiences.',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Justin Wessels - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Wessels - Full Stack Developer',
    description: 'Portfolio of Justin Wessels, a passionate full-stack developer creating innovative web applications and digital experiences.',
    images: ['/og'],
    creator: '@justinwessels',
  },
  other: {
    'rss': '/feed.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
          <ClientBundleSizeMonitor />
        </ThemeProvider>
      </body>
    </html>
  );
}
