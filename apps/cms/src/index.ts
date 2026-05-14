type ContentManagerMetadata = {
  edit?: {
    label?: string;
    [key: string]: unknown;
  };
  list?: {
    label?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type ContentManagerConfiguration = {
  metadatas?: Record<string, ContentManagerMetadata>;
  [key: string]: unknown;
};

const CONTENT_MANAGER_STORE = {
  type: "plugin",
  name: "content_manager_configuration_content_types",
} as const;

const CATEGORY_LABELS: Record<string, string> = {
  name: "Nazwa kategorii",
  slug: "Slug",
  description: "Opis",
  sortOrder: "Kolejnosc sortowania",
  coverImage: "Zdjecie kategorii",
  parentCategory: "Kategoria nadrzedna",
  children: "Podkategorie",
  products: "Produkty",
};

const PRODUCT_LABELS: Record<string, string> = {
  name: "Nazwa produktu",
  slug: "Slug",
  partNumber: "Numer czesci",
  brand: "Marka",
  shortDescription: "Krotki opis",
  description: "Opis",
  specifications: "Specyfikacja",
  featured: "Polecany produkt",
  sortOrder: "Kolejnosc sortowania",
  mainImage: "Zdjecie glowne",
  gallery: "Galeria",
  category: "Kategoria",
  quoteRequests: "Zapytania ofertowe",
};

const PROJECT_LOCALES = [
  { code: "pl", name: "Polski (pl)" },
  { code: "de", name: "Deutsch (de)" },
  { code: "en", name: "English (en)" },
] as const;

type LocaleRecord = {
  code: string;
  name?: string | null;
};

const applyPolishLabels = (
  configuration: ContentManagerConfiguration | null,
  labels: Record<string, string>,
) => {
  if (!configuration?.metadatas) {
    return { changed: false, value: configuration };
  }

  let changed = false;
  const metadatas = { ...configuration.metadatas };

  for (const [field, label] of Object.entries(labels)) {
    const metadata = metadatas[field];

    if (!metadata) {
      continue;
    }

    const nextMetadata: ContentManagerMetadata = {
      ...metadata,
      edit: {
        ...metadata.edit,
        label,
      },
      list: {
        ...metadata.list,
        label,
      },
    };

    if (
      metadata.edit?.label !== label ||
      metadata.list?.label !== label
    ) {
      changed = true;
    }

    metadatas[field] = nextMetadata;
  }

  return {
    changed,
    value: changed ? { ...configuration, metadatas } : configuration,
  };
};

const syncContentTypeLabels = async (
  strapi: {
    store: (
      params: typeof CONTENT_MANAGER_STORE,
    ) => {
      get: (params: { key: string }) => Promise<ContentManagerConfiguration | null>;
      set: (params: {
        key: string;
        value: ContentManagerConfiguration | null;
      }) => Promise<void>;
    };
  },
  uid: string,
  labels: Record<string, string>,
) => {
  const store = strapi.store(CONTENT_MANAGER_STORE);
  const configuration = await store.get({ key: uid });
  const nextConfiguration = applyPolishLabels(configuration, labels);

  if (!nextConfiguration.changed) {
    return false;
  }

  await store.set({
    key: uid,
    value: nextConfiguration.value,
  });

  return true;
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
    const [categoryUpdated, productUpdated, localesUpdated] = await Promise.all([
      syncContentTypeLabels(strapi, "api::category.category", CATEGORY_LABELS),
      syncContentTypeLabels(strapi, "api::product.product", PRODUCT_LABELS),
      syncProjectLocales(strapi),
    ]);

    if (categoryUpdated || productUpdated || localesUpdated) {
      strapi.log.info(
        "Zsynchronizowano etykiety CMS oraz konfiguracje locale projektu.",
      );
    }
  },
};
