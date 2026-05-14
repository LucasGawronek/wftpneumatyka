export type CatalogCategory = {
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  parentCategory?: {
    documentId: string;
    name: string;
    slug: string;
  } | null;
};

export type CatalogProduct = {
  documentId: string;
  name: string;
  slug: string;
  partNumber: string;
  brand?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  specifications?:
    | string
    | Record<string, string | number | boolean | null>
    | null;
  featured?: boolean;
  imageUrl?: string | null;
  galleryImages?: string[];
  category?: {
    documentId: string;
    name: string;
    slug: string;
    parentCategory?: {
      documentId: string;
      name: string;
      slug: string;
    } | null;
  } | null;
};

export type QuoteRequestInput = {
  locale?: string;
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  consent: boolean;
  productDocumentId?: string;
  productName?: string;
  productSlug?: string;
  productPartNumber?: string;
};
