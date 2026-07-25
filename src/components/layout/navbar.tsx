"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Skills",
    href: "/skills",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <PageContainer>
        <nav
          className="flex h-20 items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-signature-gradient font-display text-lg font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
              PJ
            </div>

            <div className="hidden sm:block">
              <p className="font-display text-sm font-semibold tracking-wide text-foreground">
                Priyanshu Jaggi
              </p>

              <p className="text-xs text-muted-foreground">
                Developer Portfolio
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
  <Link
    href="/contact"
    className={cn(
      buttonVariants(),
      "bg-signature-gradient text-white shadow-glow transition-transform hover:scale-[1.03] hover:opacity-90"
    )}
  >
    Let&apos;s Talk
  </Link>
</div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((currentValue) => !currentValue);
            }}
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </nav>

        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navigationLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
  href="/contact"
  onClick={closeMenu}
  className={cn(
    buttonVariants(),
    "mt-3 w-full bg-signature-gradient text-white shadow-glow hover:opacity-90"
  )}
>
  Let&apos;s Talk
</Link>
            </div>
          </div>
        )}
      </PageContainer>
    </header>
  );
}