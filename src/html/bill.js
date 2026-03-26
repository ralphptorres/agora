import { markdownToHTML } from "../utils/markdown.js";
import { generateFooter, generateHeader } from "./layout.js";
import { generateHTMLTemplate } from "./template.js";
import {
  extractBillMetadata,
  formatArrayAsHTMLLabels,
} from "../utils/metadata.js";
import { CONFIG } from "../config.js";

function generateTopicsAnnotation(topics) {
  if (topics.length === 0) return "";

  const topicsHtml = formatArrayAsHTMLLabels(topics);
  return `
    <div class="annotation-item">
      <strong>Topics</strong>
      <div class="topics">${topicsHtml}</div>
    </div>
  `;
}

export function generateBillHTML(billId, items) {
  let sectionsHTML = "";

  for (const item of items) {
    const sectionNum = item.meta.section_number;
    const body = markdownToHTML(item.body);
    const provisionType = item.meta.provision_type;
    const topics = item.meta.topics || [];

    const topicsHTML = generateTopicsAnnotation(topics);

    sectionsHTML += `
      <section class="bill-section" id="section-${sectionNum}">
        <div class="section-body">
          ${body}
        </div>
        <aside class="section-annotations">
          <div class="annotation-item">
            <strong>Type</strong>
            <span class="label">${provisionType}</span>
          </div>
          ${topicsHTML}
        </aside>
      </section>
    `;
  }

  const metadata = extractBillMetadata(items);

  const bodyContent = `
    ${generateHeader(CONFIG.UI.LOGO_PATH_BILL, CONFIG.UI.HOME_LINK_BILL)}
    
    <nav class="breadcrumb">
      <a href="${CONFIG.UI.HOME_LINK_BILL}">${CONFIG.UI.SITE_FULL_NAME}</a> > ${billId}
    </nav>
    
    <main class="container">
      <div class="bill-header">
        <h1>${billId}</h1>
        <div class="bill-meta">
          <div class="meta-item">
            <strong>Domains</strong>
            ${metadata.domains}
          </div>
          <div class="meta-item">
            <strong>Sections</strong>
            ${metadata.sections}
          </div>
          <div class="meta-item">
            <strong>Extracted</strong>
            ${metadata.extractionDate}
          </div>
          <div class="meta-item">
            <strong>Country</strong>
            ${items[0].meta.country}
          </div>
        </div>
      </div>
      
      <div class="content">
        ${sectionsHTML}
      </div>
    </main>
    
    ${generateFooter()}
  `;

  return generateHTMLTemplate(
    `${billId} - ${CONFIG.UI.SITE_TITLE}`,
    "../styles/bill.css",
    bodyContent,
  );
}
