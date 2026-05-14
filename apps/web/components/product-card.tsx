import Image from "next/image";
import Link from "next/link";
import { getProductImage } from "@/lib/catalog-media";
import { productPath, quotePath, type AppMessages, type Locale } from "@/lib/i18n";
import type { CatalogProduct } from "@/types/catalog";

type ProductCardProps = {
  locale: Locale;
  messages: AppMessages;
  product: CatalogProduct;
};

export function ProductCard({ locale, messages, product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_12px_26px_rgba(0,0,0,0.07)]">
      <Link
        href={productPath(locale, product.slug)}
        className="relative block aspect-[0.95] overflow-hidden bg-[#f5f5f5]"
      >
        <Image
          src={getProductImage(product)}
          alt={product.name}
          fill
          className="object-cover transition duration-300 hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 320px"
        />
      </Link>
      <div className="space-y-5 px-5 pb-6 pt-4">
        <h3 className="min-h-[110px] text-[18px] font-medium leading-9 text-[#1f1f1f]">
          {product.name}
          {product.partNumber ? (
            <>
              <br />
              <span className="font-extrabold">{product.partNumber}</span>
            </>
          ) : null}
        </h3>
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6c6c6c]">
          {product.brand || messages.common.brandFallback}
        </p>
        <Link
          href={quotePath(locale, product.slug)}
          className="inline-flex h-12 items-center rounded-[8px] bg-[var(--wft-orange)] px-5 text-[15px] font-semibold text-white transition hover:bg-[var(--wft-orange-deep)]"
          style={{ color: "#fff" }}
        >
          {messages.productPage.askQuote}
        </Link>
      </div>
    </article>
  );
}
