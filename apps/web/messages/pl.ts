const plMessages = {
  localeLabel: "PL",
  locales: {
    pl: "Polski",
    de: "Deutsch",
    en: "English",
  },
  site: {
    title: "WFT Pneumatyka",
    description:
      "Regeneracja i części układów pneumatycznych dla transportu ciężarowego.",
  },
  header: {
    nav: {
      home: "Strona główna",
      about: "O nas",
      shop: "Sklep",
      services: "Usługi",
      contact: "Kontakt",
    },
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    quickContact: "Szybki kontakt",
    askQuote: "Zapytaj o wycenę",
  },
  search: {
    label: "Wyszukiwarka produktów",
    placeholder: "Wpisz co najmniej 3 litery...",
    button: "Szukaj",
    minChars: "Wpisz przynajmniej 3 znaki.",
    loading: "Szukam produktów...",
    noResults: "Nie znaleziono produktów.",
    fetchError: "Nie udało się pobrać wyników wyszukiwania.",
  },
  footer: {
    catalog: "Katalog produktów",
    privacy: "Polityka prywatności",
    contact: "Kontakt",
    copyright: "Prawa autorskie 2026 © WFT Pneumatyka.",
    madeBy: "Wykonanie strony: Logostrona",
  },
  common: {
    shop: "Sklep",
    category: "Kategoria",
    categories: "Kategorie",
    products: "Produkty",
    product: "Produkt",
    allProducts: "Wszystkie produkty",
    partNumber: "Nr części",
    brand: "Marka",
    description: "Opis",
    technicalData: "Dane techniczne",
    additionalInformation: "Informacje dodatkowe",
    quoteRequest: "Zapytanie ofertowe",
    productReadyFallback:
      "Produkt gotowy do wysłania zapytania ofertowego i uzupełnienia o pełną dokumentację w Strapi.",
    brandFallback: "Marka do uzupełnienia",
    categoryFallback: "Bez kategorii",
    fillInFallback: "Do uzupełnienia",
    featuredProduct: "Polecany produkt",
    noData: "Brak danych",
    selectedProduct: "Wybrany produkt",
    phone: "Telefon",
    email: "Adres e-mail",
    address: "Adres",
  },
  home: {
    features: [
      {
        title: "Wieloletnie doświadczenie",
        text: "Ponad 26 lat doświadczenia w regeneracji układów pneumatycznych.",
      },
      {
        title: "Szybka realizacja zleceń",
        text: "Sprawna obsługa i krótkie terminy realizacji.",
      },
      {
        title: "Wysoka jakość usług",
        text: "Pracujemy na sprawdzonych częściach i dokładnie weryfikujemy każdy podzespół.",
      },
    ],
    stats: [
      ["26+", "Lat doświadczenia"],
      ["250+", "Zadowolonych klientów"],
      ["120+", "Naprawionych układów"],
    ],
    hero: {
      accent: "Regeneracja",
      lines: ["i części", "układów pneumatycznych", "dla transportu ciężarowego"],
      copy: "Precyzyjna regeneracja, sprawdzone części\ni niezawodność w każdych warunkach.",
      catalogCta: "Katalog produktów",
      servicesCta: "Usługi",
    },
    intro: {
      titleLines: ["WFT Pneumatyka", "Specjaliści od układów", "pneumatycznych"],
      description:
        "Zajmujemy się kompleksową obsługą układów pneumatycznych w pojazdach ciężarowych, naczepach oraz autobusach.",
    },
    categoryShowcase: {
      brakeCalipers: "Zaciski\nhamulcowe",
      repairSets: "Zestawy\nnaprawcze",
      pneumaticValves: "Zawory\npneumatyczne",
      shopCta: "Sklep",
    },
    sections: {
      newArrivals: "Nowości",
      manufacturers: "Producenci",
      popularParts: "Popularne części",
      repairSets: "Zestawy naprawcze",
    },
    promo: {
      lines: ["Zobacz ofertę części", "i wybierz rozwiązanie", "dla swojego pojazdu"],
      cta: "Zobacz katalog produktów",
    },
    contact: {
      badge: "Kontakt",
      titleAccent: "Skontaktuj",
      titleRest: "się z nami",
      email: "biuro@wft-pneumatyka.pl",
      phone: "+48 663 226 683",
      address: "ul. Długa 23, 64-000 Sierakowo",
      buildingPhoto: "Zdjęcie budynku",
    },
  },
  catalog: {
    label: "Asortyment",
    fullList: "Pełna lista produktów dostępnych w katalogu WFT Pneumatyka.",
    filteringMessage: (title: string) => `Filtrujesz produkty z kategorii ${title}.`,
    results: (count: number) => `Znaleziono: ${count}`,
    emptyTitle: "Brak produktów w tej kategorii",
    emptyDescription:
      "Dodaj pierwsze pozycje w Strapi albo wybierz inną kategorię z lewego panelu.",
  },
  categoryPage: {
    label: "Kategoria",
    defaultDescription: "Kategoria gotowa do uzupełnienia opisem w Strapi.",
    withChildren: "Pozycje przypisane do tej kategorii i jej podkategorii",
    withoutChildren: "Pozycje przypisane do tej kategorii",
    emptyTitle: "Ta kategoria nie ma jeszcze produktów",
    emptyDescription: "Dodaj produkty w panelu Strapi i przypisz je do tej kategorii.",
  },
  productPage: {
    offerType: "Typ oferty",
    askQuote: "Zapytaj o wycenę",
    backToShop: "Wróć do sklepu",
    productDescription: "Opis produktu",
    technicalHint:
      "Dodaj dane techniczne w polu `specifications` w Strapi, np. materiał, zakres pracy, kompatybilne modele albo oznaczenia producenta.",
    descriptionFallback:
      "Tutaj można umieścić pełny opis produktu, zastosowanie, objawy zużycia oraz najważniejsze korzyści dla klienta.",
    showImage: (index: number, productName: string) =>
      `Pokaż zdjęcie ${index} produktu ${productName}`,
  },
  quotePage: {
    label: "Zapytanie o wycenę",
    title: "Formularz kontaktowy",
    description:
      "Użytkownik może wejść tutaj bezpośrednio albo przejść z karty produktu. Jeśli przyszedł z katalogu, formularz automatycznie podstawia wybraną pozycję.",
    noProductSelected:
      "Produkt nie został jeszcze wybrany. Formularz nadal zadziała, ale najlepiej wejść tu z karty konkretnej pozycji w katalogu.",
  },
  inquiryForm: {
    name: "Imię i nazwisko",
    email: "E-mail",
    phone: "Telefon",
    company: "Firma",
    message: "Wiadomość",
    consent: "Wyrażam zgodę na kontakt w sprawie tego zapytania ofertowego.",
    placeholderName: "Jan Kowalski",
    placeholderEmail: "jan@firma.pl",
    placeholderPhone: "+48 500 000 000",
    placeholderCompany: "Twoja firma",
    placeholderDefault: "Opisz, czego potrzebujesz i jakie ilości chcesz wycenić.",
    placeholderForProduct: (name: string, partNumber: string) =>
      `Proszę o wycenę produktu ${name} (${partNumber}).`,
    defaultValueForProduct: (name: string, partNumber: string) =>
      `Proszę o przygotowanie wyceny dla produktu ${name} (${partNumber}).`,
    submitIdle: "Wyślij zapytanie",
    submitPending: "Wysyłanie...",
    success: "Zapytanie zostało wysłane pomyślnie.",
    error: "Wystąpił błąd podczas wysyłania formularza.",
  },
  homeContactForm: {
    firstName: "Twoje imię",
    lastName: "Twoje nazwisko",
    email: "Twój adres e-mail",
    message: "Wiadomość",
    messagePlaceholder: "Treść wiadomości",
    submitIdle: "Wyślij wiadomość",
    submitPending: "Wysyłanie...",
    success: "Wiadomość została wysłana.",
    error: "Wystąpił błąd podczas wysyłki.",
  },
  pages: {
    about: {
      eyebrow: "O nas",
      title: "Zaplecze techniczne i doświadczenie dla transportu ciężarowego",
      lead:
        "WFT Pneumatyka specjalizuje się w regeneracji oraz sprzedaży części do układów pneumatycznych i hamulcowych.",
      paragraphs: [
        "Pracujemy z podzespołami stosowanymi w samochodach ciężarowych, naczepach i autobusach. Łączymy praktykę warsztatową z dostępem do sprawdzonych części zamiennych, dzięki czemu możemy szybciej diagnozować usterki i proponować rozwiązania dopasowane do konkretnego pojazdu.",
        "Stawiamy na rzetelną komunikację, krótkie terminy realizacji i jakość, która sprawdza się w codziennej eksploatacji. Nasz katalog online ułatwia wybór części, a w razie potrzeby przygotowujemy indywidualne zapytania ofertowe.",
      ],
      cards: [
        {
          title: "26 lat praktyki",
          text: "Wieloletnie doświadczenie w pneumatyce pojazdowej i pracy z układami hamulcowymi.",
        },
        {
          title: "Regeneracja i sprzedaż",
          text: "Łączymy usługi serwisowe z dostępem do części, zestawów naprawczych i osprzętu.",
        },
        {
          title: "Obsługa firm transportowych",
          text: "Wspieramy warsztaty, floty i klientów indywidualnych, którzy potrzebują szybkiej wyceny.",
        },
      ],
    },
    services: {
      eyebrow: "Usługi",
      title: "Obsługa układów pneumatycznych od diagnozy po dobór części",
      lead:
        "Strona rozwija się razem z katalogiem, ale już teraz możesz oprzeć na niej podstawową ofertę serwisową i handlową.",
      items: [
        {
          title: "Regeneracja podzespołów",
          text: "Naprawa i przywracanie sprawności wybranych elementów układów pneumatycznych oraz hamulcowych.",
        },
        {
          title: "Dobór części zamiennych",
          text: "Pomagamy dobrać właściwy komponent na podstawie numeru części, marki i zastosowania.",
        },
        {
          title: "Wyceny dla firm i warsztatów",
          text: "Przygotowujemy oferty dla klientów B2B, serwisów i operatorów flot pojazdów ciężarowych.",
        },
        {
          title: "Wsparcie techniczne",
          text: "Podpowiadamy, które rozwiązanie sprawdzi się najlepiej przy konkretnej awarii lub modernizacji.",
        },
      ],
      cta: "Przejdź do formularza i opisz, czego potrzebujesz.",
    },
    privacy: {
      eyebrow: "Polityka prywatności",
      title: "Informacja o przetwarzaniu danych",
      updated: "Aktualizacja: maj 2026",
      intro:
        "Ta wersja polityki prywatności jest przygotowana jako treść startowa dla strony WFT Pneumatyka i może zostać później rozszerzona o finalne dane administratora oraz podstawy prawne wskazane przez właściciela serwisu.",
      sections: [
        {
          title: "Administrator danych",
          text: "Administratorem danych przesyłanych przez formularze kontaktowe jest właściciel serwisu WFT Pneumatyka. Dane kontaktowe administratora powinny zostać uzupełnione przed publikacją produkcyjną.",
        },
        {
          title: "Zakres danych",
          text: "W formularzach mogą być przetwarzane dane takie jak imię i nazwisko, adres e-mail, numer telefonu, nazwa firmy oraz treść wiadomości lub zapytania ofertowego.",
        },
        {
          title: "Cel przetwarzania",
          text: "Dane są wykorzystywane wyłącznie do obsługi zapytania, przygotowania wyceny, kontaktu z klientem oraz archiwizacji korespondencji związanej z obsługą zamówienia lub oferty.",
        },
        {
          title: "Prawa użytkownika",
          text: "Osoba przesyłająca dane ma prawo do wglądu w swoje dane, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz kontaktu z administratorem w sprawach związanych z prywatnością.",
        },
      ],
    },
  },
  api: {
    quote: {
      missingFields: "Uzupełnij imię, e-mail i treść zapytania.",
      missingConsent: "Zgoda na kontakt jest wymagana.",
      saveError: "Nie udało się zapisać zapytania do Strapi.",
    },
  },
} as const;

export default plMessages;
