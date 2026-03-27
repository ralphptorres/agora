import { CONFIG } from "../config.js";

function generateNavLinks() {
  return CONFIG.UI.NAV_LINKS.map(
    (link) => `<a href="${link.href}">${link.label}</a>`
  ).join("");
}

function generateFooterLinks() {
  const sourceCode = `<a href="${CONFIG.UI.SOURCE_REPO}" target="_blank" rel="noopener noreferrer">Source code</a>`;
  const sourceLicense = `<a href="${CONFIG.UI.SOURCE_LICENSE}" target="_blank" rel="noopener noreferrer">MIT</a>`;
  const content = `<a href="${CONFIG.UI.CONTENT_REPO}" target="_blank" rel="noopener noreferrer">Content</a>`;
  const contentLicense = `<a href="${CONFIG.UI.CONTENT_LICENSE}" target="_blank" rel="noopener noreferrer">CC-BY-4.0</a>`;
  
  return `${sourceCode} is ${sourceLicense}. ${content} is ${contentLicense} unless noted.`;
}

export function generateHeader(logoPath, menuHomeLink) {
  return `<header class="global-header">
    <div class="header-content">
      <div class="site-logo">
        <a href="${menuHomeLink}"><img src="${logoPath}" alt="PHPO logo"></a>
        <h1 class="site-title"><a href="${menuHomeLink}">${CONFIG.UI.SITE_TITLE}</a></h1>
      </div>
      <nav class="menu">
        ${generateNavLinks()}
      </nav>
    </div>
  </header>`;
}

export function generateFooter() {
  return `<footer>
    <p>&copy; 2026 <a href="/">${CONFIG.UI.SITE_TITLE}</a>. ${generateFooterLinks()}</p>
  </footer>`;
}
