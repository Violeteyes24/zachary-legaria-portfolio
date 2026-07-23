import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zachary-legaria.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.fullName}, Full-Stack & AI Engineer`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Zachary Albert Legaria is a full-stack and AI engineer from Bohol, Philippines, building secure, scalable products, from Django and Flutter apps to production RAG pipelines and the deployments that keep them running.",
  keywords: [
    "Zachary Legaria",
    "Full-Stack Developer",
    "AI Engineer",
    "RAG",
    "Next.js",
    "Django",
    "Flutter",
    "Supabase",
    "Philippines",
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.fullName} Portfolio`,
    title: `${profile.fullName}, Full-Stack & AI Engineer`,
    description:
      "Full-stack & AI engineer building secure, scalable products end-to-end: RAG pipelines, cross-platform apps, and production deployments.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName}, Full-Stack & AI Engineer`,
    description:
      "Full-stack & AI engineer building secure, scalable products end-to-end.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161826" },
    { media: "(prefers-color-scheme: light)", color: "#eceef8" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
