import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Priyanshu Jaggi regarding software-development opportunities, projects and collaborations.",
};

export default function ContactPage() {
  return <ContactSection />;
}