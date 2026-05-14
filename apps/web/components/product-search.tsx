"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { getProductImage } from "@/lib/catalog-media";
import { productPath, type Locale } from "@/lib/i18n";

type SearchProductItem = {
  documentId: string;
  name: string;
  slug: string;
  partNumber: string;
  brand?: string | null;
  imageUrl?: string | null;
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

type ProductSearchProps = {
  locale: Locale;
  messages: {
    fetchError: string;
    label: string;
    placeholder: string;
    button: string;
    minChars: string;
    loading: string;
    noResults: string;
    fallbackProductLabel: string;
  };
  onNavigate?: () => void;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ProductSearch({ locale, messages, onNavigate }: ProductSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim();
  const canSearch = normalizedQuery.length >= 3;
  const visibleResults = canSearch ? results : [];
  const visibleLoading = canSearch ? isLoading : false;

  useEffect(() => {
    if (!canSearch) {
      return;
    }

    const controller = new AbortController();

    async function loadResults() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(normalizedQuery)}&locale=${locale}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(messages.fetchError);
        }

        const data = (await response.json()) as { items?: SearchProductItem[] };
        setResults(data.items ?? []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadResults();

    return () => {
      controller.abort();
    };
  }, [canSearch, locale, messages.fetchError, normalizedQuery]);

  const dropdownVisible = useMemo(() => {
    return hasFocus && normalizedQuery.length > 0;
  }, [hasFocus, normalizedQuery.length]);

  function closeDropdown() {
    setTimeout(() => {
      setHasFocus(false);
    }, 120);
  }

  function handleNavigate() {
    setHasFocus(false);
    onNavigate?.();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSearch || visibleResults.length === 0) {
      return;
    }

    router.push(productPath(locale, visibleResults[0].slug));
    handleNavigate();
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-[8px] bg-white px-4 text-[var(--wft-dark)] sm:w-[282px]">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={closeDropdown}
            aria-label={messages.label}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#8f8c8c]"
            placeholder={messages.placeholder}
          />
        </label>
        <button
          type="submit"
          disabled={!canSearch || visibleResults.length === 0}
          className="h-11 rounded-[8px] bg-[var(--wft-orange)] px-8 text-sm font-semibold text-white transition hover:bg-[#f26d10] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {messages.button}
        </button>
      </form>

      {dropdownVisible ? (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-[18px] border border-white/10 bg-white text-[var(--wft-dark)] shadow-[0_18px_34px_rgba(0,0,0,0.2)]">
          {!canSearch ? (
            <div className="px-4 py-4 text-sm text-[#666]">{messages.minChars}</div>
          ) : visibleLoading ? (
            <div className="px-4 py-4 text-sm text-[#666]">{messages.loading}</div>
          ) : visibleResults.length > 0 ? (
            <div className="max-h-[360px] overflow-y-auto">
              {visibleResults.map((product) => (
                <Link
                  key={product.documentId}
                  href={productPath(locale, product.slug)}
                  onClick={handleNavigate}
                  className="grid grid-cols-[64px_1fr] gap-3 border-b border-[#efefef] px-4 py-3 transition hover:bg-[#faf7f2]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#f5f5f5]">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1f1f1f]">{product.name}</p>
                    <p className="mt-1 text-xs font-medium text-[#666]">{product.partNumber}</p>
                    <p className="mt-1 truncate text-xs text-[#8a8a8a]">
                      {product.brand || product.category?.name || messages.fallbackProductLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-sm text-[#666]">{messages.noResults}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
