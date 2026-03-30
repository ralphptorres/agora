import { generateFooter, generateHeader } from "./layout.js";
import { generateHTMLTemplate } from "./template.js";
import { extractBillMetadata } from "../utils/metadata.js";
import { CONFIG } from "../config.js";

function formatAuthorityLine(metadata) {
  if (!metadata.country && !metadata.legislature) return "";
  const parts = [metadata.country, metadata.legislature].filter(Boolean);
  return `Authority: ${parts.join(" ")}`;
}

function formatActivityLine(metadata) {
  return metadata.status ? `Last activity: ${metadata.status}` : "";
}

function generateBillPreview(billId, metadata) {
  const authorityLine = formatAuthorityLine(metadata);
  const activityLine = formatActivityLine(metadata);
  const infoLine = [authorityLine, activityLine].filter(Boolean).join('<span class="info-separator"> | </span>');

  return `
    <article class="bill-preview">
      <a href="bills/${billId}.html" class="bill-preview-id"><strong>${billId}:<span class="bill-preview-title">${metadata.billTitle || ""}</span></strong></a>
      ${infoLine ? `<p class="bill-preview-infoline">${infoLine}</p>` : ""}
      ${metadata.summary ? `<p class="bill-preview-summary">${metadata.summary}</p>` : ""}
      ${metadata.domains ? `<p class="bill-preview-domains">Domains: ${metadata.domains}</p>` : ""}
      <div class="bill-preview-actions">
        <a href="bills/${billId}.html" class="btn btn-primary">View details and full text</a>
        ${metadata.sourceUrl ? `<a href="${metadata.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View official source</a>` : ""}
      </div>
    </article>
  `;
}

export function generateIndexHTML(billMap, billMetadataMap = new Map()) {
  const sortedBills = Array.from(billMap).sort(([billIdA], [billIdB]) => {
    return billIdA.localeCompare(billIdB, undefined, { numeric: true });
  });

  const billListHTML = sortedBills.map(([billId, items]) => {
    const billMetadata = billMetadataMap.get(billId);
    const metadata = extractBillMetadata(items, billMetadata);
    return generateBillPreview(billId, metadata);
  }).join("");

  const bodyContent = `
    ${generateHeader(CONFIG.UI.LOGO_PATH_HOME, CONFIG.UI.HOME_LINK_HOME)}
    
    <main class="container">
      <div class="index-header">
        <h1><span class="agora">aigov archive</span></h1>
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
