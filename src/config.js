export const CONFIG = {
  SERVER: {
    PORT: parseInt(Deno.env.get("PORT") || "8080"),
    PUBLIC_DIR: "./dist",
  },
  API: {
    HOST: Deno.env.get("API_HOST") || "127.0.0.1",
    PORT: parseInt(Deno.env.get("API_PORT") || "8000"),
    BASE_PATH: "/provisions",
    DOMAINS: "AI_technology",
    PAGINATION_LIMIT: 100,
  },
  PATHS: {
    SRC: "./src",
    DIST: "./dist",
    DIST_ROOT: "./dist",
    STYLES_SRC: "./src/styles",
    STYLES_DIST: "./dist/styles",
    BILLS_DIST: "./dist/bills",
    ASSETS_SRC: "./src/assets",
    ASSETS_DIST: "./dist/assets",
  },
  UI: {
    SITE_TITLE: "PHPO",
    SITE_FULL_NAME: "PHPO AGORA",
    SITE_SUBTITLE:
      "A clone of agora.eto.tech. AGORA stands for AI GOvernance and Regulatory Archive.",
    LOGO_PATH_HOME: "assets/logo.svg",
    LOGO_PATH_BILL: "../assets/logo.svg",
    HOME_LINK_HOME: "index.html",
    HOME_LINK_BILL: "../index.html",
  },
};
