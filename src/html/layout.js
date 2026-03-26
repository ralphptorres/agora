import { CONFIG } from "../config.js";

export function generateHeader(logoPath, menuHomeLink) {
  return `<header class="global-header">
    <div class="header-content">
      <div class="site-logo">
        <a href="${menuHomeLink}"><img src="${logoPath}" alt="PHPO logo"></a>
        <h1 class="site-title"><a href="${menuHomeLink}">${CONFIG.UI.SITE_TITLE}</a></h1>
      </div>
      <nav class="menu">
        <a href="${menuHomeLink}">Bills</a>
      </nav>
    </div>
  </header>`;
}

export function generateFooter() {
  return `<footer>
    <p>&copy; 2026 ${CONFIG.UI.SITE_TITLE}. All rights reserved.</p>
  </footer>`;
}
