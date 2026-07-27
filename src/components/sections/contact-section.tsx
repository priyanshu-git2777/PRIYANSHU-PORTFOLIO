"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import {
  Check,
  CheckCircle2,
  Clipboard,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    label: "Email",
    value: "priyanshujaggi188@gmail.com",
    description: "priyanshujaggi188@gmail.com",
    icon: Mail,
  },
  {
    label: "Location",
    value: "India",
    description: "Open to remote and suitable opportunities",
    icon: MapPin,
  },
  {
    label: "Response time",
    value: "Within 24–48 hours",
    description: "I try to respond as soon as possible",
    icon: Clock3,
  },
];

const socialLinks = [
  {
    label: "GitHub",
    description: "https://github.com/priyanshu-git2777",
    href: "https://github.com/priyanshu-git2777",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    description: "https://www.linkedin.com/in/priyanshu-jaggi-8b71a4423/?skipRedirect=true",
    href: "https://www.linkedin.com/in/priyanshu-jaggi-8b71a4423/?skipRedirect=true",
    icon: FaLinkedinIn,
  },
  {
    label: "WhatsApp",
    description: "Continue the conversation",
   href:
  "https://wa.me/916395303188?text=Hello%20Priyanshu%2C%20I%20visited%20@%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.",
    icon: FaWhatsapp,
  },
];

export function ContactSection() {
  return (
    <div className="overflow-hidden">
      <ContactHero />

      <section className="border-t border-white/10 py-20 sm:py-24 lg:py-32">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <ContactInformation />
            <ContactForm />
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      <ContactBackground />

      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
          >
            <Sparkles className="size-4 text-cyan-300" />
            Let&apos;s build something meaningful
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
            className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Start a{" "}
            <span className="text-signature-gradient">
              conversation
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
            className="mx-auto mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            Have an opportunity, project idea or question? Send a
            message and include enough detail for me to understand
            how I can help.
          </motion.p>
        </div>
      </PageContainer>
    </section>
  );
}

function ContactInformation() {
  const [hasCopiedEmail, setHasCopiedEmail] =
    useState(false);

  const emailAddress = "priyanshujaggi188@gmail.com";

  async function copyEmailAddress() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setHasCopiedEmail(true);

      window.setTimeout(() => {
        setHasCopiedEmail(false);
      }, 2000);
    } catch {
      setHasCopiedEmail(false);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.65,
      }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        Contact details
      </p>

      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
        Let&apos;s discuss your idea
      </h2>

      <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
        I am interested in software-development opportunities,
        collaborations, learning experiences and projects where I
        can contribute while growing my skills.
      </p>

      <div className="mt-9 space-y-4">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;

          return (
            <motion.div
              key={detail.label}
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="surface-card flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-signature-gradient text-white shadow-glow">
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {detail.label}
                </p>

                <p className="mt-1 break-words font-medium text-foreground">
                  {detail.value}
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {detail.description}
                </p>
              </div>

              {detail.label === "Email" && (
                <button
                  type="button"
                  onClick={copyEmailAddress}
                  aria-label="Copy email address"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
                >
                  {hasCopiedEmail ? (
                    <Check className="size-4 text-emerald-300" />
                  ) : (
                    <Clipboard className="size-4" />
                  )}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-9">
        <p className="text-sm font-semibold text-foreground">
          Find me online
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {socialLinks.map((socialLink) => {
            const Icon = socialLink.icon;

            return (
              <a
                key={socialLink.label}
                href={socialLink.href}
                target="_blank"
                rel="noreferrer"
                className="surface-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {socialLink.label}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {socialLink.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [formValues, setFormValues] =
    useState<ContactFormValues>(initialFormValues);

  const [formErrors, setFormErrors] =
    useState<ContactFormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccessful, setIsSuccessful] =
    useState(false);

  function handleInputChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const fieldName =
      event.target.name as keyof ContactFormValues;

    const fieldValue = event.target.value;

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }));

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));

    if (isSuccessful) {
      setIsSuccessful(false);
    }
  }

  function validateForm(): ContactFormErrors {
    const errors: ContactFormErrors = {};

    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedSubject = formValues.subject.trim();
    const trimmedMessage = formValues.message.trim();

    if (!trimmedName) {
      errors.name = "Please enter your name.";
    } else if (trimmedName.length < 2) {
      errors.name =
        "Your name must contain at least 2 characters.";
    }

    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      errors.email =
        "Please enter a valid email address.";
    }

    if (!trimmedSubject) {
      errors.subject = "Please enter a subject.";
    } else if (trimmedSubject.length < 4) {
      errors.subject =
        "The subject must contain at least 4 characters.";
    }

    if (!trimmedMessage) {
      errors.message = "Please enter your message.";
    } else if (trimmedMessage.length < 20) {
      errors.message =
        "Please provide at least 20 characters.";
    } else if (trimmedMessage.length > 1000) {
      errors.message =
        "The message cannot exceed 1,000 characters.";
    }

    return errors;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSuccessful(false);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200);
    });

    setIsSubmitting(false);
    setIsSuccessful(true);
    setFormValues(initialFormValues);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.65,
      }}
      className="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-signature-gradient text-white shadow-glow">
          <MessageCircle className="size-5" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold">
            Send me a message
          </h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Complete the form and I will respond as soon as
            possible.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isSuccessful && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="mt-7 overflow-hidden"
          >
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />

                <div>
                  <p className="font-semibold text-emerald-200">
                    Form validated successfully
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The visual form is working. We will connect it
                    to a real email service during deployment or
                    backend integration.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Your name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formValues.name}
            error={formErrors.name}
            onChange={handleInputChange}
            autoComplete="name"
          />

          <FormField
            label="Email address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formValues.email}
            error={formErrors.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>

        <FormField
          label="Subject"
          name="subject"
          type="text"
          placeholder="What would you like to discuss?"
          value={formValues.subject}
          error={formErrors.subject}
          onChange={handleInputChange}
        />

        <TextAreaField
          label="Message"
          name="message"
          placeholder="Share the opportunity, project idea or question..."
          value={formValues.message}
          error={formErrors.message}
          onChange={handleInputChange}
        />

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-muted-foreground">
            Your information is used only to respond to your
            message.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-signature-gradient px-6 py-3 font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending
              </>
            ) : (
              <>
                Send Message
                <Send className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
  autoComplete,
}: {
  label: string;
  name: keyof ContactFormValues;
  type: "text" | "email";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  autoComplete?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60",
          error
            ? "border-red-400/50 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
            : "border-white/10 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
        )}
      />

      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  name: "message";
  placeholder: string;
  value: string;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={name}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>

        <span
          className={cn(
            "text-xs",
            value.length > 1000
              ? "text-red-300"
              : "text-muted-foreground"
          )}
        >
          {value.length}/1000
        </span>
      </div>

      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={7}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm leading-7 text-foreground outline-none transition-all placeholder:text-muted-foreground/60",
          error
            ? "border-red-400/50 focus:border-red-400 focus:ring-4 focus:ring-red-400/10"
            : "border-white/10 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
        )}
      />

      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ContactBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 50, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-8 size-[30rem] rounded-full bg-violet-600/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 65, 0],
          scale: [1, 0.92, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
      />
    </div>
  );
}