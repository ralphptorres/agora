import { generateFooter, generateHeader } from "./layout.js";
import { generateHTMLTemplate } from "./template.js";
import { extractBillMetadata } from "../utils/metadata.js";
import { CONFIG } from "../config.js";

export function generateIndexHTML(billMap) {
  let billListHTML = "";

  for (const [billId, items] of billMap) {
    const metadata = extractBillMetadata(items);

    billListHTML += `
      <article class="bill-preview">
        <h2><a href="bills/${billId}.html">${billId}</a></h2>
        <p><strong>Domains:</strong> <span class="domains">${metadata.domains}</span></p>
        <p><strong>Sections:</strong> ${metadata.sections}</p>
        <a href="bills/${billId}.html" class="btn btn-primary">View Full Bill</a>
      </article>
    `;
  }

  const bodyContent = `
    ${generateHeader(CONFIG.UI.LOGO_PATH_HOME, CONFIG.UI.HOME_LINK_HOME)}
    
    <main class="container">
      <div class="index-header">
        <h1>${CONFIG.UI.SITE_FULL_NAME}</h1>
        <p>${CONFIG.UI.SITE_SUBTITLE}</p>
      </div>
      
      <div class="content">
        <section class="bills-grid">
          ${billListHTML}
        </section>
      </div>
    </main>
    
    ${generateFooter()}
  `;

  return generateHTMLTemplate(
    CONFIG.UI.SITE_FULL_NAME,
    "styles/index.css",
    bodyContent,
  );
}
