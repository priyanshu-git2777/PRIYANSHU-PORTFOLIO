import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
  title: {
    default: "Priyanshu Jaggi | Developer Portfolio",
    template: "%s | Priyanshu Jaggi",
  },
  description:
    "The developer portfolio of Priyanshu Jaggi, showcasing projects, technical skills and experience.",
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
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}