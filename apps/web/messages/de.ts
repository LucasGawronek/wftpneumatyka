const deMessages = {
  localeLabel: "DE",
  locales: {
    pl: "Polski",
    de: "Deutsch",
    en: "English",
  },
  site: {
    title: "WFT Pneumatyka",
    description: "Regeneration und Teile für pneumatische Systeme im Schwertransport.",
  },
  header: {
    nav: {
      home: "Startseite",
      about: "Über uns",
      shop: "Shop",
      services: "Dienstleistungen",
      contact: "Kontakt",
    },
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    quickContact: "Schnellkontakt",
    askQuote: "Angebot anfragen",
  },
  search: {
    label: "Produktsuche",
    placeholder: "Mindestens 3 Buchstaben eingeben...",
    button: "Suchen",
    minChars: "Bitte mindestens 3 Zeichen eingeben.",
    loading: "Produkte werden gesucht...",
    noResults: "Keine Produkte gefunden.",
    fetchError: "Suchergebnisse konnten nicht geladen werden.",
  },
  footer: {
    catalog: "Produktkatalog",
    privacy: "Datenschutzerklärung",
    contact: "Kontakt",
    copyright: "Urheberrechte 2026 © WFT Pneumatyka.",
    madeBy: "Webdesign: Logostrona",
  },
  common: {
    shop: "Shop",
    category: "Kategorie",
    categories: "Kategorien",
    products: "Produkte",
    product: "Produkt",
    allProducts: "Alle Produkte",
    partNumber: "Teilenummer",
    brand: "Marke",
    description: "Beschreibung",
    technicalData: "Technische Daten",
    additionalInformation: "Zusätzliche Informationen",
    quoteRequest: "Angebotsanfrage",
    productReadyFallback:
      "Produkt bereit für eine Angebotsanfrage und zum Ergänzen der vollständigen Dokumentation in Strapi.",
    brandFallback: "Marke ergänzen",
    categoryFallback: "Keine Kategorie",
    fillInFallback: "Zu ergänzen",
    featuredProduct: "Empfohlenes Produkt",
    noData: "Keine Daten",
    selectedProduct: "Ausgewähltes Produkt",
    phone: "Telefon",
    email: "E-Mail-Adresse",
    address: "Adresse",
  },
  home: {
    features: [
      {
        title: "Langjährige Erfahrung",
        text: "Mehr als 26 Jahre Erfahrung in der Regeneration pneumatischer Systeme.",
      },
      {
        title: "Schnelle Auftragsabwicklung",
        text: "Effizienter Service und kurze Lieferzeiten.",
      },
      {
        title: "Hohe Servicequalität",
        text: "Wir arbeiten mit bewährten Teilen und prüfen jede Komponente sorgfältig.",
      },
    ],
    stats: [
      ["26+", "Jahre Erfahrung"],
      ["250+", "Zufriedene Kunden"],
      ["120+", "Reparierte Systeme"],
    ],
    hero: {
      accent: "Regeneration",
      lines: ["und Teile", "für pneumatische Systeme", "im Schwertransport"],
      copy: "Präzise Regeneration, bewährte Teile\nund Zuverlässigkeit unter allen Bedingungen.",
      catalogCta: "Produktkatalog",
      servicesCta: "Dienstleistungen",
    },
    intro: {
      titleLines: ["WFT Pneumatyka", "Spezialisten für", "pneumatische Systeme"],
      description:
        "Wir bieten einen umfassenden Service für pneumatische Systeme in Lkw, Aufliegern und Bussen.",
    },
    categoryShowcase: {
      brakeCalipers: "Bremssättel",
      repairSets: "Reparatur-\nsätze",
      pneumaticValves: "Pneumatische\nVentile",
      shopCta: "Shop",
    },
    sections: {
      newArrivals: "Neuheiten",
      manufacturers: "Hersteller",
      popularParts: "Beliebte Teile",
      repairSets: "Reparatursätze",
    },
    promo: {
      lines: ["Teileangebot ansehen", "und die passende Lösung", "für Ihr Fahrzeug wählen"],
      cta: "Produktkatalog ansehen",
    },
    contact: {
      badge: "Kontakt",
      titleAccent: "Kontaktieren",
      titleRest: "Sie uns",
      email: "biuro@wft-pneumatyka.pl",
      phone: "+48 663 226 683",
      address: "ul. Długa 23, 64-000 Sierakowo",
      buildingPhoto: "Gebäudefoto",
    },
  },
  catalog: {
    label: "Sortiment",
    fullList: "Vollständige Liste der im WFT-Pneumatyka-Katalog verfügbaren Produkte.",
    filteringMessage: (title: string) => `Sie filtern Produkte aus der Kategorie ${title}.`,
    results: (count: number) => `Gefunden: ${count}`,
    emptyTitle: "Keine Produkte in dieser Kategorie",
    emptyDescription:
      "Fügen Sie die ersten Positionen in Strapi hinzu oder wählen Sie eine andere Kategorie im linken Bereich.",
  },
  categoryPage: {
    label: "Kategorie",
    defaultDescription: "Kategorie bereit zur Ergänzung einer Beschreibung in Strapi.",
    withChildren: "Positionen, die dieser Kategorie und ihren Unterkategorien zugeordnet sind",
    withoutChildren: "Positionen, die dieser Kategorie zugeordnet sind",
    emptyTitle: "Diese Kategorie hat noch keine Produkte",
    emptyDescription:
      "Fügen Sie Produkte im Strapi-Panel hinzu und weisen Sie sie dieser Kategorie zu.",
  },
  productPage: {
    offerType: "Angebotsart",
    askQuote: "Angebot anfragen",
    backToShop: "Zurück zum Shop",
    productDescription: "Produktbeschreibung",
    technicalHint:
      "Fügen Sie technische Daten im Feld `specifications` in Strapi hinzu, z. B. Material, Arbeitsbereich, kompatible Modelle oder Herstellerkennzeichnungen.",
    descriptionFallback:
      "Hier können die vollständige Produktbeschreibung, Einsatzbereiche, Verschleißsymptome und die wichtigsten Vorteile für den Kunden ergänzt werden.",
    showImage: (index: number, productName: string) =>
      `Bild ${index} des Produkts ${productName} anzeigen`,
  },
  quotePage: {
    label: "Angebotsanfrage",
    title: "Kontaktformular",
    description:
      "Der Benutzer kann diese Seite direkt aufrufen oder von der Produktkarte hierher wechseln. Wenn er aus dem Katalog kommt, wird das ausgewählte Produkt automatisch eingefügt.",
    noProductSelected:
      "Es wurde noch kein Produkt ausgewählt. Das Formular funktioniert weiterhin, aber am besten gelangt man von der Karte eines konkreten Produkts hierher.",
  },
  inquiryForm: {
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon",
    company: "Firma",
    message: "Nachricht",
    consent: "Ich stimme der Kontaktaufnahme bezüglich dieser Angebotsanfrage zu.",
    placeholderName: "Jan Kowalski",
    placeholderEmail: "jan@firma.pl",
    placeholderPhone: "+48 500 000 000",
    placeholderCompany: "Ihre Firma",
    placeholderDefault:
      "Beschreiben Sie, was Sie benötigen und welche Mengen Sie kalkulieren möchten.",
    placeholderForProduct: (name: string, partNumber: string) =>
      `Bitte senden Sie mir ein Angebot für das Produkt ${name} (${partNumber}).`,
    defaultValueForProduct: (name: string, partNumber: string) =>
      `Bitte erstellen Sie ein Angebot für das Produkt ${name} (${partNumber}).`,
    submitIdle: "Anfrage senden",
    submitPending: "Wird gesendet...",
    success: "Die Anfrage wurde gespeichert und kann in Strapi bearbeitet werden.",
    error: "Beim Senden des Formulars ist ein Fehler aufgetreten.",
  },
  homeContactForm: {
    firstName: "Ihr Vorname",
    lastName: "Ihr Nachname",
    email: "Ihre E-Mail-Adresse",
    message: "Nachricht",
    messagePlaceholder: "Nachrichtentext",
    submitIdle: "Nachricht senden",
    submitPending: "Wird gesendet...",
    success: "Die Nachricht wurde gesendet.",
    error: "Beim Senden ist ein Fehler aufgetreten.",
  },
  pages: {
    about: {
      eyebrow: "Über uns",
      title: "Technisches Know-how und Erfahrung für den Schwertransport",
      lead:
        "WFT Pneumatyka ist auf die Regeneration sowie den Verkauf von Teilen für pneumatische Systeme und Bremsanlagen spezialisiert.",
      paragraphs: [
        "Wir arbeiten mit Komponenten für Lkw, Auflieger und Busse. Dabei verbinden wir Werkstattpraxis mit dem Zugang zu bewährten Ersatzteilen, sodass wir Ausfälle schneller diagnostizieren und passende Lösungen für das jeweilige Fahrzeug anbieten können.",
        "Wir setzen auf klare Kommunikation, kurze Durchlaufzeiten und eine Qualität, die sich im täglichen Einsatz bewährt. Unser Online-Katalog erleichtert die Auswahl, und bei Bedarf erstellen wir individuelle Angebotsanfragen.",
      ],
      cards: [
        {
          title: "26 Jahre Praxis",
          text: "Langjährige Erfahrung in der Fahrzeugpneumatik und Arbeit mit Bremssystemen.",
        },
        {
          title: "Regeneration und Verkauf",
          text: "Wir verbinden Serviceleistungen mit dem Zugang zu Teilen, Reparatursätzen und Zubehör.",
        },
        {
          title: "Betreuung von Transportunternehmen",
          text: "Wir unterstützen Werkstätten, Flotten und Endkunden, die eine schnelle Kalkulation benötigen.",
        },
      ],
    },
    services: {
      eyebrow: "Dienstleistungen",
      title: "Pneumatik-Service von der Diagnose bis zur Teileauswahl",
      lead:
        "Die Seite wächst gemeinsam mit dem Katalog, bildet aber schon jetzt ein solides Fundament für das Service- und Handelsangebot.",
      items: [
        {
          title: "Regeneration von Baugruppen",
          text: "Reparatur und Wiederherstellung ausgewählter Komponenten pneumatischer und bremsrelevanter Systeme.",
        },
        {
          title: "Auswahl von Ersatzteilen",
          text: "Wir helfen bei der Auswahl der richtigen Komponente anhand von Teilenummer, Marke und Einsatzgebiet.",
        },
        {
          title: "Angebote für Firmen und Werkstätten",
          text: "Wir erstellen Angebote für B2B-Kunden, Servicebetriebe und Betreiber von Fahrzeugflotten.",
        },
        {
          title: "Technische Unterstützung",
          text: "Wir zeigen, welche Lösung sich bei einer bestimmten Störung oder Modernisierung am besten eignet.",
        },
      ],
      cta: "Wechseln Sie zum Formular und beschreiben Sie Ihren Bedarf.",
    },
    privacy: {
      eyebrow: "Datenschutzerklärung",
      title: "Informationen zur Datenverarbeitung",
      updated: "Aktualisierung: Mai 2026",
      intro:
        "Diese Datenschutzerklärung ist als Startversion für die Website von WFT Pneumatyka vorbereitet und kann später um die endgültigen Angaben zum Verantwortlichen sowie die vollständigen Rechtsgrundlagen ergänzt werden.",
      sections: [
        {
          title: "Verantwortlicher",
          text: "Verantwortlich für die über Kontaktformulare übermittelten Daten ist der Betreiber der Website WFT Pneumatyka. Die vollständigen Kontaktdaten des Verantwortlichen sollten vor dem Produktivstart ergänzt werden.",
        },
        {
          title: "Umfang der Daten",
          text: "In Formularen können Daten wie Vor- und Nachname, E-Mail-Adresse, Telefonnummer, Firmenname sowie der Inhalt einer Nachricht oder Angebotsanfrage verarbeitet werden.",
        },
        {
          title: "Zweck der Verarbeitung",
          text: "Die Daten werden ausschließlich zur Bearbeitung der Anfrage, zur Erstellung eines Angebots, zur Kontaktaufnahme mit dem Kunden sowie zur Archivierung der Korrespondenz im Zusammenhang mit dem Auftrag oder Angebot verwendet.",
        },
        {
          title: "Rechte des Nutzers",
          text: "Die betroffene Person hat das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Kontaktaufnahme mit dem Verantwortlichen in Angelegenheiten des Datenschutzes.",
        },
      ],
    },
  },
  api: {
    quote: {
      missingFields: "Bitte ergänzen Sie Name, E-Mail und Nachricht.",
      missingConsent: "Die Zustimmung zur Kontaktaufnahme ist erforderlich.",
      saveError: "Die Anfrage konnte nicht in Strapi gespeichert werden.",
    },
  },
} as const;

export default deMessages;
