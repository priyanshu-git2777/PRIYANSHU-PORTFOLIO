import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { PageContainer } from "@/components/layout/page-container";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:your-email@example.com",
    icon: Mail,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <PageContainer>
        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="font-display font-semibold text-foreground"
            >
              Priyanshu Jaggi
            </Link>

            <p className="mt-1 text-sm text-muted-foreground">
              Building useful and memorable digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isExternalLink = social.href.startsWith("http");

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>

          <p className="text-center text-sm text-muted-foreground sm:text-right">
            © {currentYear} Priyanshu Jaggi.
            <br />
            All rights reserved.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}