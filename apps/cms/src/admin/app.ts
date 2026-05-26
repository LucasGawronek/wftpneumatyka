const ADMIN_LANGUAGE_KEY = "strapi-admin-language";

export default {
  config: {
    locales: ["pl"],
  },
  bootstrap() {
    if (window.localStorage.getItem(ADMIN_LANGUAGE_KEY) !== "pl") {
      window.localStorage.setItem(ADMIN_LANGUAGE_KEY, "pl");
    }
  },
};
