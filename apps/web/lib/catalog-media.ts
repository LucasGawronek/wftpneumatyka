import type { CatalogCategory, CatalogProduct } from "@/types/catalog";

const categoryImageFallbacks: Record<string, string> = {
  "zaciski-hamulcowe": "/wft/zaciski_hamulcowe.png",
  "zestawy-naprawcze": "/wft/zestaw_naprawczy.png",
  "zawory-pneumatyczne": "/wft/zawory_pneumatyczne.png",
};

const productImageFallbacks: Record<string, string> = {
  "zacisk-hamulcowy-knorr-bremse-sn7": "/wft/IMG_0869.JPG",
  "zawor-ecas-knorr-bremse-k058032n00-k058032": "/wft/IMG_0874.JPG",
  "zestaw-naprawczy-zaworu-ecas-k058032n00": "/wft/IMG_0865.JPG",
};

export function getCategoryImage(category: Pick<CatalogCategory, "slug" | "imageUrl">) {
  return category.imageUrl || categoryImageFallbacks[category.slug] || "/wft/hero_bg.jpg";
}

export function getProductImage(
  product: Pick<CatalogProduct, "slug" | "imageUrl" | "category">,
) {
  return (
    product.imageUrl ||
    productImageFallbacks[product.slug] ||
    (product.category ? categoryImageFallbacks[product.category.slug] : null) ||
    "/wft/IMG_0865.JPG"
  );
}
