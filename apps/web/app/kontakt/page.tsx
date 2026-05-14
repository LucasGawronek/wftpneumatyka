import { redirect } from "next/navigation";
import { contactPath, defaultLocale } from "@/lib/i18n";

export default function ContactPage() {
  redirect(contactPath(defaultLocale));
}
