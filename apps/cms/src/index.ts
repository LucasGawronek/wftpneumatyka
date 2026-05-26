const PROJECT_LOCALES = [
  { code: "pl", name: "Polski (pl)" },
  { code: "de", name: "Deutsch (de)" },
  { code: "en", name: "English (en)" },
] as const;

const CONTENT_MANAGER_LABELS = {
  "api::category.category": {
    name: "Nazwa",
    slug: "Slug",
    description: "Opis",
    sortOrder: "Kolejnosc sortowania",
    coverImage: "Zdjecie glowne",
    parentCategory: "Kategoria nadrzedna",
    children: "Podkategorie",
    products: "Produkty",
  },
  "api::product.product": {
    name: "Nazwa",
    slug: "Slug",
    partNumber: "Numer czesci",
    brand: "Marka",
    shortDescription: "Krotki opis",
    description: "Opis",
    specifications: "Specyfikacja",
    featured: "Polecany",
    sortOrder: "Kolejnosc sortowania",
    mainImage: "Zdjecie glowne",
    gallery: "Galeria",
    category: "Kategoria",
    quoteRequests: "Zapytania ofertowe",
  },
  "api::quote-request.quote-request": {
    customerName: "Imie i nazwisko",
    email: "E-mail",
    phone: "Telefon",
    company: "Firma",
    message: "Wiadomosc",
    consent: "Zgoda",
    status: "Status",
    productName: "Nazwa produktu",
    productSlug: "Slug produktu",
    productPartNumber: "Numer czesci produktu",
    requestLocale: "Jezyk zapytania",
    product: "Produkt",
  },
} as const;

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

const syncContentManagerLabels = async (strapi: any) => {
  const store = strapi.store({ type: "plugin", name: "content_manager" });
  let updated = false;

  for (const [uid, labels] of Object.entries(CONTENT_MANAGER_LABELS)) {
    const key = `configuration_${uid}`;
    const existingConfiguration =
      ((await store.get({ key })) as
        | {
            settings?: Record<string, unknown>;
            metadatas?: Record<
              string,
              {
                edit?: Record<string, unknown>;
                list?: Record<string, unknown>;
              }
            >;
            layouts?: Record<string, unknown>;
          }
        | undefined) ?? {};

    const nextMetadatas = { ...(existingConfiguration.metadatas ?? {}) };
    let configurationUpdated = false;

    for (const [fieldName, label] of Object.entries(labels)) {
      const currentFieldConfiguration = nextMetadatas[fieldName] ?? {};
      const currentEdit = currentFieldConfiguration.edit ?? {};
      const currentList = currentFieldConfiguration.list ?? {};

      if (currentEdit.label !== label || currentList.label !== label) {
        configurationUpdated = true;
      }

      nextMetadatas[fieldName] = {
        ...currentFieldConfiguration,
        edit: {
          ...currentEdit,
          label,
        },
        list: {
          ...currentList,
          label,
        },
      };
    }

    if (configurationUpdated) {
      await store.set({
        key,
        value: {
          ...existingConfiguration,
          metadatas: nextMetadatas,
        },
      });
      updated = true;
    }
  }

  return updated;
};

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    const localesUpdated = await syncProjectLocales(strapi);
    const labelsUpdated = await syncContentManagerLabels(strapi);

    if (localesUpdated) {
      strapi.log.info(
        "Zsynchronizowano konfiguracje locale projektu.",
      );
    }

    if (labelsUpdated) {
      strapi.log.info(
        "Zsynchronizowano polskie etykiety pol w Content Managerze.",
      );
    }
  },
};
