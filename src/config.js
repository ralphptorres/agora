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
    SITE_TITLE: "Policy Observatory",
    SITE_FULL_NAME: "aigov archive",
    SITE_SUBTITLE:
      'An archive of AI governance policy. Inspired by <a href="https://agora.eto.tech">agora.eto.tech</a>. In early development. Contributions appreciated at <a href="https://github.com/policyobservatory/aigov-archive">the repo</a>.',
    LOGO_PATH_HOME: "assets/logo.svg",
    LOGO_PATH_BILL: "../assets/logo.svg",
    HOME_LINK_HOME: "index.html",
    HOME_LINK_BILL: "../index.html",
    SOURCE_REPO: "https://github.com/policyobservatory/aigov-archive",
    CONTENT_REPO: "https://github.com/policyobservatory/ph-corpus",
    SOURCE_LICENSE: "https://opensource.org/license/mit",
    CONTENT_LICENSE: "https://creativecommons.org/licenses/by/4.0",
    NAV_LINKS: [
      { label: "About", href: "https://github.com/policyobservatory" },
      { label: "Blog", href: "https://substack.com/" },
      { label: "Data", href: "https://github.com/policyobservatory/ph-corpus" },
      { label: "Tools", href: "https://github.com/orgs/policyobservatory/repositories" },
      { label: "Subscribe", href: "/" },
    ],
  },
};
