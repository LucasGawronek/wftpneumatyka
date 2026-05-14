"use client";

import { startTransition, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

type InquiryFormProps = {
  locale: Locale;
  messages: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    consent: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderPhone: string;
    placeholderCompany: string;
    placeholderDefault: string;
    productPlaceholder?: string;
    productDefaultMessage?: string;
    submitIdle: string;
    submitPending: string;
    success: string;
    error: string;
  };
  product: {
    documentId: string;
    name: string;
    slug: string;
    partNumber: string;
  } | null;
};

type SubmissionState = {
  kind: "idle" | "success" | "error";
  message?: string;
};

export function InquiryForm({ locale, messages, product }: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setState({ kind: "idle" });

    const payload = {
      locale,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      company: String(formData.get("company") || ""),
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "on",
      productDocumentId: product?.documentId,
      productName: product?.name,
      productSlug: product?.slug,
      productPartNumber: product?.partNumber,
    };

    startTransition(async () => {
      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        <label className="space-y-2">
          <span className="label text-[var(--wft-orange)]">{messages.name}</span>
          <input
            required
            name="name"
            className="h-12 w-full rounded-[14px] border border-[#ddd4c8] bg-white px-4 text-sm text-[var(--wft-dark)] outline-none transition focus:border-[var(--wft-orange)]"
            placeholder={messages.placeholderName}
          />
        </label>
        <label className="space-y-2">
          <span className="label text-[var(--wft-orange)]">{messages.email}</span>
          <input
            required
            type="email"
            name="email"
            className="h-12 w-full rounded-[14px] border border-[#ddd4c8] bg-white px-4 text-sm text-[var(--wft-dark)] outline-none transition focus:border-[var(--wft-orange)]"
            placeholder={messages.placeholderEmail}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="label text-[var(--wft-orange)]">{messages.phone}</span>
          <input
            name="phone"
            className="h-12 w-full rounded-[14px] border border-[#ddd4c8] bg-white px-4 text-sm text-[var(--wft-dark)] outline-none transition focus:border-[var(--wft-orange)]"
            placeholder={messages.placeholderPhone}
          />
        </label>
        <label className="space-y-2">
          <span className="label text-[var(--wft-orange)]">{messages.company}</span>
          <input
            name="company"
            className="h-12 w-full rounded-[14px] border border-[#ddd4c8] bg-white px-4 text-sm text-[var(--wft-dark)] outline-none transition focus:border-[var(--wft-orange)]"
            placeholder={messages.placeholderCompany}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="label text-[var(--wft-orange)]">{messages.message}</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full rounded-[18px] border border-[#ddd4c8] bg-white px-4 py-4 text-sm text-[var(--wft-dark)] outline-none transition focus:border-[var(--wft-orange)]"
          placeholder={
            product ? messages.productPlaceholder || messages.placeholderDefault : messages.placeholderDefault
          }
          defaultValue={product ? messages.productDefaultMessage || "" : ""}
        />
      </label>

      <label className="flex items-start gap-3 rounded-[16px] border border-[#e7ddd1] px-4 py-4 text-sm leading-7 text-[#5d5852]">
        <input
          required
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 rounded border-[#d8cec2]"
        />
        <span>{messages.consent}</span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[var(--wft-orange)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--wft-orange-deep)] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ color: "#fff" }}
        >
          {isPending ? messages.submitPending : messages.submitIdle}
        </button>

        {state.kind !== "idle" ? (
          <p
            className={`text-sm ${
              state.kind === "success"
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
