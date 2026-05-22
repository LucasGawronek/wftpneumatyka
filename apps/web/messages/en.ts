const enMessages = {
  localeLabel: "EN",
  locales: {
    pl: "Polski",
    de: "Deutsch",
    en: "English",
  },
  site: {
    title: "WFT Pneumatyka",
    description: "Regeneration and parts for pneumatic systems in heavy transport.",
  },
  header: {
    nav: {
      home: "Home",
      about: "About us",
      shop: "Shop",
      services: "Services",
      contact: "Contact",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    quickContact: "Quick contact",
    askQuote: "Request a quote",
  },
  search: {
    label: "Product search",
    placeholder: "Type at least 3 letters...",
    button: "Search",
    minChars: "Please type at least 3 characters.",
    loading: "Searching products...",
    noResults: "No products found.",
    fetchError: "Unable to load search results.",
  },
  footer: {
    catalog: "Product catalog",
    privacy: "Privacy policy",
    contact: "Contact",
    copyright: "Copyright 2026 © WFT Pneumatyka.",
    madeBy: "Website by: Logostrona",
  },
  common: {
    shop: "Shop",
    category: "Category",
    categories: "Categories",
    products: "Products",
    product: "Product",
    allProducts: "All products",
    partNumber: "Part number",
    brand: "Brand",
    description: "Description",
    technicalData: "Technical data",
    additionalInformation: "Additional information",
    quoteRequest: "Quote request",
    productReadyFallback:
      "Product ready for a quote request and for adding full documentation in Strapi.",
    brandFallback: "Brand to be completed",
    categoryFallback: "No category",
    fillInFallback: "To be completed",
    featuredProduct: "Featured product",
    noData: "No data",
    selectedProduct: "Selected product",
    phone: "Phone",
    email: "Email address",
    address: "Address",
  },
  home: {
    features: [
      {
        title: "Years of experience",
        text: "More than 26 years of experience in regenerating pneumatic systems.",
      },
      {
        title: "Fast order fulfillment",
        text: "Efficient service and short lead times.",
      },
      {
        title: "High service quality",
        text: "We work with proven parts and carefully verify every component.",
      },
    ],
    stats: [
      ["26+", "Years of experience"],
      ["250+", "Satisfied customers"],
      ["120+", "Repaired systems"],
    ],
    hero: {
      accent: "Regeneration",
      lines: ["and parts", "for pneumatic systems", "in heavy transport"],
      copy: "Precise regeneration, proven parts\nand reliability in all conditions.",
      catalogCta: "Product catalog",
      servicesCta: "Services",
    },
    intro: {
      titleLines: ["WFT Pneumatyka", "Specialists in", "pneumatic systems"],
      description:
        "We provide comprehensive service for pneumatic systems in trucks, trailers and buses.",
    },
    categoryShowcase: {
      brakeCalipers: "Brake\ncalipers",
      repairSets: "Repair\nsets",
      pneumaticValves: "Pneumatic\nvalves",
      shopCta: "Shop",
    },
    sections: {
      newArrivals: "New arrivals",
      manufacturers: "Manufacturers",
      popularParts: "Popular parts",
      repairSets: "Repair sets",
    },
    promo: {
      lines: ["See our parts offer", "and choose the right solution", "for your vehicle"],
      cta: "See product catalog",
    },
    contact: {
      badge: "Contact",
      titleAccent: "Get in",
      titleRest: "touch with us",
      email: "biuro@wft-pneumatyka.pl",
      phone: "+48 663 226 683",
      address: "ul. Długa 23, 64-000 Sierakowo",
      buildingPhoto: "Building photo",
    },
  },
  catalog: {
    label: "Assortment",
    fullList: "Full list of products available in the WFT Pneumatyka catalog.",
    filteringMessage: (title: string) => `You are filtering products from the ${title} category.`,
    results: (count: number) => `Found: ${count}`,
    emptyTitle: "No products in this category",
    emptyDescription:
      "Add the first items in Strapi or choose a different category from the left panel.",
  },
  categoryPage: {
    label: "Category",
    defaultDescription: "Category ready to be completed with a description in Strapi.",
    withChildren: "Items assigned to this category and its subcategories",
    withoutChildren: "Items assigned to this category",
    emptyTitle: "This category does not have any products yet",
    emptyDescription: "Add products in the Strapi panel and assign them to this category.",
  },
  productPage: {
    offerType: "Offer type",
    askQuote: "Request a quote",
    backToShop: "Back to shop",
    productDescription: "Product description",
    technicalHint:
      "Add technical data in the `specifications` field in Strapi, e.g. material, operating range, compatible models or manufacturer markings.",
    descriptionFallback:
      "Here you can add a full product description, use cases, wear symptoms and the most important customer benefits.",
    showImage: (index: number, productName: string) =>
      `Show image ${index} of product ${productName}`,
  },
  quotePage: {
    label: "Quote request",
    title: "Contact form",
    description:
      "The user can enter here directly or come from the product card. If they came from the catalog, the form automatically fills in the selected item.",
    noProductSelected:
      "No product has been selected yet. The form will still work, but it is best to open it from a specific product card.",
  },
  inquiryForm: {
    name: "Full name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "Message",
    consent: "I agree to be contacted regarding this quote request.",
    placeholderName: "John Smith",
    placeholderEmail: "john@company.com",
    placeholderPhone: "+48 500 000 000",
    placeholderCompany: "Your company",
    placeholderDefault: "Describe what you need and what quantities you would like to price.",
    placeholderForProduct: (name: string, partNumber: string) =>
      `Please provide a quote for product ${name} (${partNumber}).`,
    defaultValueForProduct: (name: string, partNumber: string) =>
      `Please prepare a quote for product ${name} (${partNumber}).`,
    submitIdle: "Send inquiry",
    submitPending: "Sending...",
    success: "Your inquiry has been sent successfully.",
    error: "An error occurred while sending the form.",
  },
  homeContactForm: {
    firstName: "Your first name",
    lastName: "Your last name",
    email: "Your email address",
    message: "Message",
    messagePlaceholder: "Message content",
    submitIdle: "Send message",
    submitPending: "Sending...",
    success: "Your message has been sent.",
    error: "An error occurred while sending the message.",
  },
  pages: {
    about: {
      eyebrow: "About us",
      title: "Technical background and experience for heavy transport",
      lead:
        "WFT Pneumatyka specializes in regeneration and parts sales for pneumatic and braking systems.",
      paragraphs: [
        "We work with components used in trucks, trailers and buses. We combine workshop practice with access to proven spare parts, which helps us diagnose failures faster and recommend the right solution for a specific vehicle.",
        "We focus on clear communication, short lead times and quality that stands up to everyday operation. Our online catalog makes parts selection easier, and when needed we prepare individual quote requests.",
      ],
      cards: [
        {
          title: "26 years of practice",
          text: "Long-term experience in vehicle pneumatics and brake-system work.",
        },
        {
          title: "Regeneration and sales",
          text: "We combine workshop services with access to parts, repair sets and accessories.",
        },
        {
          title: "Support for transport companies",
          text: "We work with workshops, fleets and end customers who need a fast quotation.",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Pneumatic system support from diagnosis to parts selection",
      lead:
        "The website is growing together with the catalog, but it already provides a solid foundation for service and parts sales.",
      items: [
        {
          title: "Component regeneration",
          text: "Repair and restore selected parts of pneumatic and braking systems.",
        },
        {
          title: "Spare part selection",
          text: "We help identify the right component based on part number, brand and application.",
        },
        {
          title: "Quotes for companies and workshops",
          text: "We prepare offers for B2B customers, service centers and fleet operators.",
        },
        {
          title: "Technical support",
          text: "We help determine which solution fits a specific failure or modernization best.",
        },
      ],
      cta: "Go to the form and describe what you need.",
    },
    privacy: {
      eyebrow: "Privacy policy",
      title: "Information about personal data processing",
      updated: "Updated: May 2026",
      intro:
        "This privacy policy is prepared as a starter version for the WFT Pneumatyka website and can later be expanded with the final controller details and legal grounds indicated by the business owner.",
      sections: [
        {
          title: "Data controller",
          text: "The controller of data sent through contact forms is the owner of the WFT Pneumatyka website. The full controller details should be completed before production launch.",
        },
        {
          title: "Scope of data",
          text: "Forms may process data such as full name, email address, phone number, company name and the content of a message or quote request.",
        },
        {
          title: "Purpose of processing",
          text: "The data is used only to handle the inquiry, prepare a quote, contact the customer and archive correspondence related to an order or offer.",
        },
        {
          title: "User rights",
          text: "The person submitting data has the right to access, correct, delete or restrict processing of their data and to contact the controller regarding privacy matters.",
        },
      ],
    },
  },
  api: {
    quote: {
      missingFields: "Complete the name, email and message fields.",
      missingConsent: "Consent for contact is required.",
      saveError: "Could not save the inquiry to Strapi.",
    },
  },
} as const;

export default enMessages;
