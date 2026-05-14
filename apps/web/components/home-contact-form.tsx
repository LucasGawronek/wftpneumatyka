"use client";

import { startTransition, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type SubmissionState = {
  kind: "idle" | "success" | "error";
  message?: string;
};

type HomeContactFormProps = {
  locale: Locale;
  messages: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    consent?: string;
    submitIdle: string;
    submitPending: string;
    success: string;
    error: string;
  };
};

function getConsentLabel(locale: Locale, customLabel?: string) {
  if (customLabel) {
    return customLabel;
  }

  if (locale === "pl") {
    return "Wyrażam zgodę na przetwarzanie moich danych w celu udzielenia odpowiedzi na wiadomość.";
  }

  if (locale === "de") {
    return "Ich stimme der Verarbeitung meiner Daten zum Zweck der Beantwortung meiner Nachricht zu.";
  }

  return "I agree to the processing of my data for the purpose of responding to my message.";
}

export function HomeContactForm({ locale, messages }: HomeContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setState({ kind: "idle" });

    const payload = {
      locale,
      name: `${String(formData.get("firstName") || "")} ${String(
        formData.get("lastName") || "",
      )}`.trim(),
      email: String(formData.get("email") || ""),
      phone: "",
      company: "",
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "on",
    };

    startTransition(async () => {
      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(result.error || messages.error);
        }

        formRef.current?.reset();
        setState({
          kind: "success",
          message: messages.success,
        });
      } catch (error) {
        setState({
          kind: "error",
          message: error instanceof Error ? error.message : messages.error,
        });
      } finally {
        setIsPending(false);
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-3 block text-[14px] font-medium text-[var(--wft-dark)]">
            {messages.firstName}
          </span>
          <input
            name="firstName"
            required
            placeholder={messages.firstName}
            className="h-12 w-full rounded-full border border-[var(--wft-orange)]/60 px-6 text-sm outline-none placeholder:text-[#9b9b9b]"
          />
        </label>
        <label className="block">
          <span className="mb-3 block text-[14px] font-medium text-[var(--wft-dark)]">
            {messages.lastName}
          </span>
          <input
            name="lastName"
            required
            placeholder={messages.lastName}
            className="h-12 w-full rounded-full border border-[var(--wft-orange)]/60 px-6 text-sm outline-none placeholder:text-[#9b9b9b]"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-3 block text-[14px] font-medium text-[var(--wft-dark)]">
          {messages.email}
        </span>
        <input
          name="email"
          type="email"
          required
          placeholder={messages.email}
          className="h-12 w-full rounded-full border border-[var(--wft-orange)]/60 px-6 text-sm outline-none placeholder:text-[#9b9b9b]"
        />
      </label>

      <label className="block">
        <span className="mb-3 block text-[14px] font-medium text-[var(--wft-dark)]">
          {messages.message}
        </span>
        <textarea
          name="message"
          rows={8}
          required
          placeholder={messages.messagePlaceholder}
          className="w-full rounded-[10px] border border-[var(--wft-orange)]/60 px-6 py-5 text-sm outline-none placeholder:text-[#9b9b9b]"
        />
      </label>

      <label className="flex items-start gap-3 px-1 py-1 text-sm leading-7 text-[#5d5852]">
        <input
          required
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 rounded border-[#d8cec2]"
        />
        <span>{getConsentLabel(locale, messages.consent)}</span>
      </label>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-full bg-[var(--wft-orange)] text-sm font-semibold text-white transition hover:bg-[#f26d10] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending
            ? messages.submitPending
            : messages.submitIdle}
        </button>

        {state.kind !== "idle" ? (
          <p
            className={`text-sm ${
              state.kind === "success" ? "text-green-700" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
