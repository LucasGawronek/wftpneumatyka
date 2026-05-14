# WFT Website

Monorepo dla katalogu produktowego z zapytaniami o wycene:

- `apps/web` - frontend w `Next.js` + `Tailwind CSS`
- `apps/cms` - panel CMS w `Strapi`

## Co jest gotowe

- katalog kategorii i produktow,
- strona szczegolow produktu,
- przycisk `Zapytaj o wycene` przekazujacy wybrany produkt do formularza,
- kolekcje `Category`, `Product` i `Quote Request` w Strapi,
- API route w Next.js zapisujace zapytania do Strapi.

## Uruchomienie

1. Backend CMS:

```bash
npm run dev:cms
```

2. Frontend:

```bash
npm run dev:web
```

## Konfiguracja frontendu

Utworz plik `apps/web/.env.local` na podstawie `apps/web/.env.example`.

Najwazniejsze zmienne:

- `STRAPI_URL=http://127.0.0.1:1337`
- `STRAPI_API_TOKEN=` token API wygenerowany w panelu Strapi
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

## Jak podlaczyc formularz do Strapi

W panelu Strapi:

1. Utworz API Token z uprawnieniami do `find` dla `categories` i `products`.
2. Dodaj uprawnienie `create` dla `quote-requests`.
3. Wklej token do `apps/web/.env.local` jako `STRAPI_API_TOKEN`.

Frontend pobiera dane z CMS po stronie serwera i wysyla formularz przez `app/api/quote/route.ts`.
