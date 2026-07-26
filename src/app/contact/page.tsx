import type { Metadata } from "next";
import {
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Priyanshu Jaggi regarding software-development opportunities, internships, projects and professional collaboration.",
};

const contactItems = [
  {
    label: "Email",
    value: "your_email@gmail.com",
    href: "mailto:your_email@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href:
      "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "View my repositories",
    href:
      "https://github.com/YOUR_GITHUB_USERNAME",
    icon: FaGithub,
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Contact
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Have an opportunity or an idea?
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
            Reach out regarding internships,
            software-development opportunities,
            projects or professional collaboration.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-bold text-white">
                Contact details
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Choose a contact method or send a
                message using the form.
              </p>

              <div className="mt-8 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition hover:border-cyan-400/30 hover:bg-slate-900"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {item.label}
                        </p>

                        <p className="truncate text-sm text-slate-400">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Based in India
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Open to suitable remote,
                    internship and software-development
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}