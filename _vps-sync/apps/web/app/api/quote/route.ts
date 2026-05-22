import { NextResponse } from "next/server";
import { createQuoteRequest } from "@/lib/catalog";
import { defaultLocale, getMessages, isLocale } from "@/lib/i18n";
import { sendNotificationEmail } from "@/lib/notification-email";

type QuoteRequestBody = {
  locale?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  consent?: boolean;
  productDocumentId?: string;
  productName?: string;
  productSlug?: string;
  productPartNumber?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequestBody;
    const localeParam = body.locale ?? defaultLocale;
    const locale = isLocale(localeParam) ? localeParam : defaultLocale;
    const messages = getMessages(locale);
    const payload = {
      locale,
      name: body.name?.trim() || "",
      email: body.email?.trim() || "",
      phone: body.phone?.trim() || "",
      company: body.company?.trim() || "",
      message: body.message?.trim() || "",
      consent: body.consent === true,
      productDocumentId: body.productDocumentId?.trim() || "",
      productName: body.productName?.trim() || "",
      productSlug: body.productSlug?.trim() || "",
      productPartNumber: body.productPartNumber?.trim() || "",
    };

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { error: messages.api.quote.missingFields },
        { status: 400 },
      );
    }

    if (!payload.consent) {
      return NextResponse.json(
        { error: messages.api.quote.missingConsent },
        { status: 400 },
      );
    }

    await createQuoteRequest({
      locale,
      customerName: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      message: payload.message,
      consent: payload.consent,
      productDocumentId: payload.productDocumentId || undefined,
      productName: payload.productName || undefined,
      productSlug: payload.productSlug || undefined,
      productPartNumber: payload.productPartNumber || undefined,
    });

    await sendNotificationEmail({
      locale,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      company: payload.company || undefined,
      message: payload.message,
      productName: payload.productName || undefined,
      productSlug: payload.productSlug || undefined,
      productPartNumber: payload.productPartNumber || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : getMessages(defaultLocale).api.quote.saveError;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
