import Image from "next/image";
import Link from "next/link";
import { getCategoryImage } from "@/lib/catalog-media";
import type { CatalogCategory } from "@/types/catalog";

type CategoryCardProps = {
  category: CatalogCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/kategoria/${category.slug}`}
      className="panel group flex h-full flex-col rounded-[1.75rem] p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--color-rust)]"
    >
      <div className="relative flex h-28 items-end overflow-hidden rounded-[1.4rem] bg-[linear-gradient(145deg,rgba(55,82,74,0.95),rgba(23,32,38,0.85),rgba(183,93,39,0.85))] p-4 text-white">
        <Image
          src={getCategoryImage(category)}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 380px"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,20,23,0.72)_0%,rgba(18,20,23,0.26)_100%)]" />
        <p className="relative label text-white/75">Kategoria</p>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold">{category.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-steel)]">
          {category.description || "Opis kategorii można uzupełnić w panelu Strapi."}
        </p>
        <span className="mt-6 text-sm font-semibold text-[var(--color-rust)]">
          Otwórz kategorię
        </span>
      </div>
    </Link>
  );
}
