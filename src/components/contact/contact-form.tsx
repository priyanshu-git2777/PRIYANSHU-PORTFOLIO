"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import {
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type FormStatus =
  | {
      type: "idle";
      message: "";
    }
  | {
      type: "success";
      message: string;
    }
  | {
      type: "error";
      message: string;
    };

const initialFormValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [formValues, setFormValues] =
    useState<FormValues>(initialFormValues);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [status, setStatus] =
    useState<FormStatus>({
      type: "idle",
      message: "",
    });

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (status.type !== "idle") {
      setStatus({
        type: "idle",
        message: "",
      });
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    setStatus({
      type: "idle",
      message: "",
    });

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formValues
          ),
        }
      );

      const data =
        (await response.json()) as {
          success?: boolean;
          message?: string;
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "The message could not be sent."
        );
      }

      setStatus({
        type: "success",
        message:
          data.message ||
          "Your message was sent successfully.",
      });

      setFormValues(initialFormValues);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-5 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          Send a message
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Let&apos;s build something useful
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Send your opportunity, project idea or
          collaboration message directly from this
          form.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-slate-200"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-200"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            required
            maxLength={160}
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-slate-200"
        >
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          value={formValues.subject}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={120}
          placeholder="Internship, project or collaboration"
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="message"
            className="text-sm font-medium text-slate-200"
          >
            Message
          </label>

          <span className="text-xs text-slate-500">
            {formValues.message.length}/3000
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={3000}
          rows={7}
          placeholder="Tell me about the opportunity or project..."
          className="w-full resize-y rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="company">
          Company website
        </label>

        <input
          id="company"
          name="company"
          type="text"
          value={formValues.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status.type === "success" && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />

          <p>{status.message}</p>
        </div>
      )}

      {status.type === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            Sending message...
          </>
        ) : (
          <>
            <Send className="size-5" />
            Send message
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-slate-500">
        Your details are only used to respond to
        your message.
      </p>
    </form>
  );
}