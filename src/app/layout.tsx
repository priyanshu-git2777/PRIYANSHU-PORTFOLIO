import { SiteEffects } from "@/components/effects/site-effects";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PortfolioChat } from "@/components/chat/portfolio-chat";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";


import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.author.name,
    },
  ],

  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,

  keywords: [...siteConfig.keywords],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} developer portfolio`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
    >
      <body
        className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-background font-body text-foreground antialiased`}
      >
        <SiteEffects />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Navbar />

            <main className="flex-1 pt-20">
  {children}
</main>

            <Footer />
            <PortfolioChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}