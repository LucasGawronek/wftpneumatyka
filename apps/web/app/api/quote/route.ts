import { NextResponse } from "next/server";
import { createQuoteRequest } from "@/lib/catalog";
import { defaultLocale, getMessages, isLocale } from "@/lib/i18n";

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

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: messages.api.quote.missingFields },
        { status: 400 },
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: messages.api.quote.missingConsent },
        { status: 400 },
      );
    }

    await createQuoteRequest({
      locale,
      customerName: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      consent: body.consent,
      productDocumentId: body.productDocumentId,
      productName: body.productName,
      productSlug: body.productSlug,
      productPartNumber: body.productPartNumber,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : getMessages(defaultLocale).api.quote.saveError;

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
