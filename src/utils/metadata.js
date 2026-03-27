function extractTitles(billMetadata) {
  return {
    billTitle: billMetadata.title_short || billMetadata.title_full || "Bill",
    billTitleFull: billMetadata.title_full || billMetadata.title_short || "Bill",
  };
}

function extractStatus(statusStr) {
  const firstWord = statusStr.split(" ")[0];
  const sinceMatch = statusStr.match(/since\s+(\d{4}-\d{2}-\d{2})\s*$/i);
  return sinceMatch ? `${firstWord} since ${sinceMatch[1]}` : firstWord;
}

export function extractBillMetadata(items, billMetadata = null) {
  const firstItem = items[0];
  const metadata = {
    domains: firstItem.meta.domains.join(", "),
  };

  if (billMetadata) {
    Object.assign(metadata, extractTitles(billMetadata));
    metadata.summary = billMetadata.summary || "";
    metadata.status = billMetadata.status ? extractStatus(billMetadata.status) : "";
    metadata.sourceUrl = billMetadata.text_as_filed || "";
    metadata.dateFiled = billMetadata.date_filed || "";
    metadata.country = billMetadata.country || "";
    metadata.jurisdiction = billMetadata.jurisdiction || "";
    metadata.legislature = billMetadata.legislature || "";
  }

  return metadata;
}

export function formatArrayAsText(items, separator = ", ") {
  return items.join(separator);
}

export function formatArrayAsHTMLLabels(items) {
  return items.map((item) => `<span class="label">${item}</span>`).join("");
}
