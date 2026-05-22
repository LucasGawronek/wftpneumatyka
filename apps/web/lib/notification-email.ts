import nodemailer from "nodemailer";

type NotificationEmailInput = {
  locale: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  productName?: string;
  productSlug?: string;
  productPartNumber?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required email configuration: ${name}`);
  }

  return value;
}

function getTransportConfig() {
  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT?.trim() || "465");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");
  const from = process.env.SMTP_FROM?.trim() || user;
  const to = process.env.FORM_NOTIFICATIONS_TO?.trim() || "biuro@wft-pneumatyka.pl";
  const secure =
    process.env.SMTP_SECURE?.trim().toLowerCase() === "true" || port === 465;

  if (Number.isNaN(port)) {
    throw new Error("Missing required email configuration: SMTP_PORT");
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    from,
    to,
  };
}

function buildEmailContent(input: NotificationEmailInput) {
  const isQuoteRequest = Boolean(
    input.productName || input.productPartNumber || input.productSlug,
  );
  const subject = isQuoteRequest
    ? `Nowe zapytanie ofertowe - ${input.name}`
    : `Nowa wiadomosc z formularza kontaktowego - ${input.name}`;
  const rows = [
    ["Typ formularza", isQuoteRequest ? "Zapytanie ofertowe" : "Formularz kontaktowy"],
    ["Jezyk", input.locale],
    ["Imie i nazwisko", input.name],
    ["E-mail", input.email],
    ["Telefon", input.phone || "-"],
    ["Firma", input.company || "-"],
    ["Produkt", input.productName || "-"],
    ["Slug produktu", input.productSlug || "-"],
    ["Numer czesci", input.productPartNumber || "-"],
  ] as const;

  const text = `${subject}

${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}

Wiadomosc:
${input.message}
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#222">
      <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:8px 12px;border:1px solid #ddd;background:#f7f7f7;font-weight:700;width:220px">
                    ${escapeHtml(label)}
                  </td>
                  <td style="padding:8px 12px;border:1px solid #ddd">
                    ${escapeHtml(value)}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h3 style="margin:24px 0 8px">Wiadomosc</h3>
      <div style="padding:12px;border:1px solid #ddd;background:#fff;white-space:pre-wrap">
        ${escapeHtml(input.message)}
      </div>
    </div>
  `;

  return { subject, text, html };
}

export async function sendNotificationEmail(input: NotificationEmailInput) {
  const transport = getTransportConfig();
  const transporter = nodemailer.createTransport({
    host: transport.host,
    port: transport.port,
    secure: transport.secure,
    auth: transport.auth,
  });
  const message = buildEmailContent(input);

  await transporter.sendMail({
    from: transport.from,
    to: transport.to,
    replyTo: input.email,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
