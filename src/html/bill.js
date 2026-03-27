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

function generateTitleSection(metadata) {
  if (!metadata.billTitle) return "";
  
  const hasFullTitle = metadata.billTitleFull && metadata.billTitleFull.length > 0;
  const expandLink = hasFullTitle 
    ? `<span class="toggle-title-wrapper"><a href="javascript:void(0)" class="toggle-title" onclick="toggleBillTitle(event)">(expand)</a></span>`
    : "";
  const fullTitle = hasFullTitle
    ? `<h2 class="bill-title-full" id="bill-title-full" style="display:none;">${metadata.billTitleFull}</h2>`
    : "";

  return `
    <div class="bill-title-container">
      <div class="bill-title-wrapper">
        <h2 class="bill-title-ellipsis" id="bill-title-ellipsis">${metadata.billTitle}</h2>
        ${expandLink}
      </div>
      ${fullTitle}
    </div>
  `;
}

function generateInfoLine(metadata) {
  const parts = [];
  if (metadata.dateFiled) {
    parts.push(`<span>Proposed ${metadata.dateFiled}</span>`);
  }
  if (metadata.status) parts.push(`<span>${metadata.status}</span>`);
  if (metadata.sourceUrl) {
    parts.push(
      `<a href="${metadata.sourceUrl}" target="_blank" rel="noopener noreferrer">Official Source</a>`,
    );
  }
  return parts.length
    ? parts.join('<span class="info-separator">|</span>')
    : "";
}

function generateMetadataItem(label, value) {
  return value
    ? `<div class="meta-item"><strong>${label}</strong>${value}</div>`
    : "";
}

function generateBillHeader(billId, metadata) {
  const infoLine = generateInfoLine(metadata);
  return `
    <div class="bill-header">
      <div class="bill-title-section">
        <h1 class="bill-id">${billId}</h1>
        ${generateTitleSection(metadata)}
      
      ${infoLine ? `<div class="bill-info-line">${infoLine}</div>` : ""}

      <div class="bill-content-layout">
        <div class="bill-summary-box">
          ${
    metadata.summary
      ? `<div><strong>Summary</strong><p class="bill-summary">${metadata.summary}</p></div>`
      : ""
  }
        </div>
        
        <div class="bill-metadata-stack">
          ${generateMetadataItem("Domains", metadata.domains)}
          ${generateMetadataItem("Jurisdiction", metadata.jurisdiction)}
          ${generateMetadataItem("Legislature", metadata.legislature)}
        </div>
      </div>
    </div>
  `;
}

export function generateBillHTML(billId, items, billMetadata = null) {
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

  const metadata = extractBillMetadata(items, billMetadata);

  const bodyContent = `
    ${generateHeader(CONFIG.UI.LOGO_PATH_BILL, CONFIG.UI.HOME_LINK_BILL)}
    
    <nav class="breadcrumb">
      <a href="${CONFIG.UI.HOME_LINK_BILL}">${CONFIG.UI.SITE_FULL_NAME}</a> > ${billId}
    </nav>
    
    <main class="container">
      ${generateBillHeader(billId, metadata)}
      
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
