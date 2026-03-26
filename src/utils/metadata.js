export function extractBillMetadata(items, billMetadata = null) {
  const firstItem = items[0];
  const metadata = {
    domains: firstItem.meta.domains.join(", "),
  };

  if (billMetadata) {
    metadata.billTitle = billMetadata.title_short ||
      (billMetadata.title_full
        ? billMetadata.title_full.substring(0, 200)
        : "Bill");
    metadata.summary = billMetadata.summary || "";

    if (billMetadata.status) {
      const statusStr = billMetadata.status;
      const firstWord = statusStr.split(" ")[0];
      const sinceMatch = statusStr.match(/since\s+(\d{4}-\d{2}-\d{2})\s*$/i);

      metadata.status = sinceMatch
        ? `${firstWord} since ${sinceMatch[1]}`
        : firstWord;
    }

    metadata.sourceUrl = billMetadata.text_as_filed || "";
    metadata.dateFiled = billMetadata.date_filed || "";
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
