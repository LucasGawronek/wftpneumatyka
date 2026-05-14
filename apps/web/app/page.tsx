import { redirect } from "next/navigation";
import { defaultLocale, localizedPath } from "@/lib/i18n";

export default function Home() {
  redirect(localizedPath(defaultLocale));
}
