export function extractBillMetadata(items) {
  const firstItem = items[0];
  return {
    title: firstItem.meta.section_title || "Bill",
    domains: firstItem.meta.domains.join(", "),
    extractionDate: firstItem.meta.extraction_date,
    country: firstItem.meta.country,
    sections: items.length,
  };
}

export function formatArrayAsText(items, separator = ", ") {
  return items.join(separator);
}

export function formatArrayAsHTMLLabels(items) {
  return items.map((item) => `<span class="label">${item}</span>`).join("");
}
