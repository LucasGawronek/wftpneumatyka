const PROJECT_LOCALES = [
  { code: "pl", name: "Polski (pl)" },
  { code: "de", name: "Deutsch (de)" },
  { code: "en", name: "English (en)" },
] as const;

type LocaleRecord = {
  code: string;
  name?: string | null;
};

const syncProjectLocales = async (strapi: any) => {
  const localesService = strapi.plugin("i18n").service("locales");
  const existingLocales = (await localesService.find()) as LocaleRecord[];
  const existingCodes = new Set(existingLocales.map((locale) => locale.code));

  for (const locale of PROJECT_LOCALES) {
    if (!existingCodes.has(locale.code)) {
      await localesService.create(locale);
      existingCodes.add(locale.code);
    }
  }

  const defaultLocale = await localesService.getDefaultLocale();

  if (defaultLocale !== "pl") {
    await localesService.setDefaultLocale({ code: "pl" });
    return true;
  }

  return existingLocales.length !== existingCodes.size;
};

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    const localesUpdated = await syncProjectLocales(strapi);

    if (localesUpdated) {
      strapi.log.info("Zsynchronizowano konfiguracje locale projektu.");
    }
  },
};
