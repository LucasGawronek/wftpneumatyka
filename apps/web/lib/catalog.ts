import {
  getStrapiUrl,
  strapiFetch,
  type StrapiCollectionResponse,
  type StrapiSingleResponse,
} from "@/lib/strapi";
import { defaultLocale, type Locale } from "@/lib/i18n";
import type { CatalogCategory, CatalogProduct, QuoteRequestInput } from "@/types/catalog";

type StrapiEntity = Record<string, unknown>;

function normalizeSingleRelation<T>(value: unknown): T | null {
  if (!value) {
    return null;
  }

  if (typeof value === "object" && value !== null && "data" in value) {
    return ((value as { data: T | null }).data ?? null) as T | null;
  }

  return value as T;
}

function normalizeMediaUrl(value: unknown) {
  const media = normalizeSingleRelation<StrapiEntity>(value);

  if (!media) {
    return null;
  }

  const url = media.url;

  return typeof url === "string" ? getMediaUrl(url) : null;
}

function normalizeMediaUrls(value: unknown) {
  if (!value) {
    return [];
  }

  const relationValue =
    typeof value === "object" && value !== null && "data" in value
      ? (value as { data?: unknown }).data
      : value;

  if (!Array.isArray(relationValue)) {
    const singleUrl = normalizeMediaUrl(value);
    return singleUrl ? [singleUrl] : [];
  }

  return relationValue
    .map((item) => normalizeMediaUrl(item))
    .filter((url): url is string => typeof url === "string" && url.length > 0);
}

function normalizeCategory(record: StrapiEntity): CatalogCategory {
  const parentCategory = normalizeSingleRelation<StrapiEntity>(record.parentCategory);

  return {
    documentId: String(record.documentId),
    name: String(record.name ?? ""),
    slug: String(record.slug ?? ""),
    description: (record.description as string | null | undefined) ?? null,
    imageUrl: normalizeMediaUrl(record.coverImage),
    parentCategory: parentCategory
      ? {
          documentId: String(parentCategory.documentId),
          name: String(parentCategory.name ?? ""),
          slug: String(parentCategory.slug ?? ""),
        }
      : null,
  };
}

function normalizeProduct(record: StrapiEntity): CatalogProduct {
  const category = normalizeSingleRelation<StrapiEntity>(record.category);
  const parentCategory = category
    ? normalizeSingleRelation<StrapiEntity>(category.parentCategory)
    : null;

  return {
    documentId: String(record.documentId),
    name: String(record.name ?? ""),
    slug: String(record.slug ?? ""),
    partNumber: String(record.partNumber ?? ""),
    brand: (record.brand as string | null | undefined) ?? null,
    shortDescription: (record.shortDescription as string | null | undefined) ?? null,
    description: (record.description as string | null | undefined) ?? null,
    specifications:
      (record.specifications as
        | string
        | Record<string, string | number | boolean | null>
        | null
        | undefined) ?? null,
    featured: Boolean(record.featured),
    imageUrl: normalizeMediaUrl(record.mainImage),
    galleryImages: normalizeMediaUrls(record.gallery),
    category: category
      ? {
          documentId: String(category.documentId),
          name: String(category.name ?? ""),
          slug: String(category.slug ?? ""),
          parentCategory: parentCategory
            ? {
                documentId: String(parentCategory.documentId),
                name: String(parentCategory.name ?? ""),
                slug: String(parentCategory.slug ?? ""),
              }
            : null,
        }
      : null,
  };
}

function applyLocale(params: URLSearchParams, locale?: Locale) {
  if (locale) {
    params.set("locale", locale);
  }
}

function getLocaleFallbackChain(locale?: Locale): Array<Locale | undefined> {
  if (!locale) {
    return [undefined];
  }

  if (locale === defaultLocale) {
    return [locale, undefined];
  }

  return [locale, defaultLocale, undefined];
}

function categoryQuery(locale?: Locale) {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("sort[1]", "name:asc");
  params.set("fields[0]", "name");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "description");
  params.set("populate[coverImage][fields][0]", "url");
  params.set("populate[parentCategory][fields][0]", "name");
  params.set("populate[parentCategory][fields][1]", "slug");
  applyLocale(params, locale);
  return params.toString();
}

function productsQuery(options?: {
  categorySlug?: string;
  brand?: string;
  featured?: boolean;
  locale?: Locale;
}) {
  const params = new URLSearchParams();
  params.set("sort[0]", "sortOrder:asc");
  params.set("sort[1]", "name:asc");
  params.set("fields[0]", "name");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "partNumber");
  params.set("fields[3]", "brand");
  params.set("fields[4]", "shortDescription");
  params.set("fields[5]", "description");
  params.set("fields[6]", "featured");
  params.set("fields[7]", "specifications");
  params.set("populate[mainImage][fields][0]", "url");
  params.set("populate[gallery][fields][0]", "url");
  params.set("populate[category][fields][0]", "name");
  params.set("populate[category][fields][1]", "slug");
  params.set("populate[category][populate][parentCategory][fields][0]", "name");
  params.set("populate[category][populate][parentCategory][fields][1]", "slug");

  if (options?.categorySlug) {
    params.set("filters[$or][0][category][slug][$eq]", options.categorySlug);
    params.set("filters[$or][1][category][parentCategory][slug][$eq]", options.categorySlug);
  }

  if (options?.brand) {
    params.set("filters[brand][$eqi]", options.brand);
  }

  if (options?.featured) {
    params.set("filters[featured][$eq]", "true");
  }

  applyLocale(params, options?.locale);
  return params.toString();
}

function productBySlugQuery(slug: string, locale?: Locale) {
  const params = new URLSearchParams(productsQuery({ locale }));
  params.set("filters[slug][$eq]", slug);
  return params.toString();
}

function logStrapiError(scope: string, error: unknown) {
  console.error(`[catalog] ${scope}`, error);
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function fetchCategories(locale?: Locale) {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>(
    `/api/categories?${categoryQuery(locale)}`,
    { method: "GET" },
  );

  return response.data.map(normalizeCategory);
}

async function fetchProducts(options?: {
  categorySlug?: string;
  brand?: string;
  featured?: boolean;
  locale?: Locale;
}) {
  const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>(
    `/api/products?${productsQuery(options)}`,
    { method: "GET" },
  );

  return response.data.map(normalizeProduct);
}

export async function getCategories(locale?: Locale) {
  try {
    for (const candidateLocale of getLocaleFallbackChain(locale)) {
      const categories = await fetchCategories(candidateLocale);

      if (categories.length > 0 || candidateLocale === undefined) {
        return categories;
      }
    }
  } catch (error) {
    logStrapiError("Failed to fetch categories from Strapi.", error);
  }

  return [];
}

export async function getProducts(options?: {
  categorySlug?: string;
  brand?: string;
  locale?: Locale;
}) {
  try {
    for (const candidateLocale of getLocaleFallbackChain(options?.locale)) {
      const products = await fetchProducts({ ...options, locale: candidateLocale });

      if (products.length > 0 || candidateLocale === undefined) {
        return products;
      }
    }
  } catch (error) {
    logStrapiError("Failed to fetch products from Strapi.", error);
  }

  return [];
}

export async function getFeaturedProducts(locale?: Locale) {
  try {
    for (const candidateLocale of getLocaleFallbackChain(locale)) {
      const products = await fetchProducts({ featured: true, locale: candidateLocale });

      if (products.length > 0 || candidateLocale === undefined) {
        return products;
      }
    }
  } catch (error) {
    logStrapiError("Failed to fetch featured products from Strapi.", error);
  }

  return [];
}

export async function getProductBySlug(slug: string, locale?: Locale) {
  try {
    for (const candidateLocale of getLocaleFallbackChain(locale)) {
      const response = await strapiFetch<StrapiCollectionResponse<StrapiEntity>>(
        `/api/products?${productBySlugQuery(slug, candidateLocale)}`,
        { method: "GET" },
      );

      const record = response.data[0];

      if (record) {
        return normalizeProduct(record);
      }
    }
  } catch (error) {
    logStrapiError(`Failed to fetch product "${slug}" from Strapi.`, error);
  }

  return null;
}

export async function searchProducts(query: string, locale?: Locale, limit = 6) {
  const normalizedQuery = normalizeSearchValue(query);

  if (normalizedQuery.length < 3) {
    return [];
  }

  try {
    const products = await getProducts({ locale });

    return products
      .filter((product) => {
        const haystack = [
          product.name,
          product.partNumber,
          product.brand ?? "",
          product.category?.name ?? "",
        ]
          .map(normalizeSearchValue)
          .join(" ");

        return haystack.includes(normalizedQuery);
      })
      .slice(0, limit);
  } catch (error) {
    logStrapiError(`Failed to search products for query "${query}".`, error);
    return [];
  }
}

export async function createQuoteRequest(input: QuoteRequestInput) {
  const payload: Record<string, unknown> = {
    requestLocale: input.locale || defaultLocale,
    customerName: input.customerName,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    message: input.message,
    consent: input.consent,
    status: "new",
    productName: input.productName || null,
    productSlug: input.productSlug || null,
    productPartNumber: input.productPartNumber || null,
  };

  if (input.productDocumentId) {
    payload.product = input.productDocumentId;
  }

  await strapiFetch<StrapiSingleResponse<StrapiEntity>>("/api/quote-requests", {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  });
}

export function getMediaUrl(path?: string | null) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${getStrapiUrl()}${path}`;
}

export function getTopLevelCategories(categories: CatalogCategory[]) {
  return categories.filter((category) => !category.parentCategory);
}

export function getChildCategories(categories: CatalogCategory[], parentSlug: string) {
  return categories.filter((category) => category.parentCategory?.slug === parentSlug);
}

function collectCategoryBranchSlugs(categories: CatalogCategory[], rootSlug: string) {
  const slugs = new Set<string>();
  const queue = [rootSlug];

  while (queue.length > 0) {
    const currentSlug = queue.shift();

    if (!currentSlug || slugs.has(currentSlug)) {
      continue;
    }

    slugs.add(currentSlug);

    for (const child of getChildCategories(categories, currentSlug)) {
      queue.push(child.slug);
    }
  }

  return slugs;
}

export function countProductsForCategoryBranch(
  categories: CatalogCategory[],
  products: CatalogProduct[],
  categorySlug: string,
) {
  const categorySlugs = collectCategoryBranchSlugs(categories, categorySlug);

  return products.filter((product) => {
    const productCategorySlug = product.category?.slug;
    return productCategorySlug ? categorySlugs.has(productCategorySlug) : false;
  }).length;
}
