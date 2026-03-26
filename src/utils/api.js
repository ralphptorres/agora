import { CONFIG } from "../config.js";

/**
 * @typedef {Object} BillMeta
 * @property {string} bill_id
 * @property {string} section_id
 * @property {number} section_number
 * @property {string} section_title
 * @property {string[]} domains
 * @property {string} provision_type
 * @property {string[]} topics
 */

/**
 * @typedef {Object} BillItem
 * @property {BillMeta} meta
 * @property {string} body
 */

/**
 * @typedef {Object} ProvisionsResponse
 * @property {number} total
 * @property {BillItem[]} items
 */

function buildApiEndpoint() {
  const baseUrl =
    `http://${CONFIG.API.HOST}:${CONFIG.API.PORT}${CONFIG.API.BASE_PATH}`;
  return `${baseUrl}?domains=${CONFIG.API.DOMAINS}`;
}

export async function fetchBillProvisions(baseEndpoint = buildApiEndpoint()) {
  const allItems = [];
  let total = 0;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const separator = baseEndpoint.includes("?") ? "&" : "?";
    const endpoint =
      `${baseEndpoint}${separator}limit=${CONFIG.API.PAGINATION_LIMIT}&offset=${offset}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    total = data.total;
    allItems.push(...data.items);

    console.log(`  Fetched ${allItems.length}/${total} items...`);

    if (allItems.length >= total) {
      hasMore = false;
    } else {
      offset += CONFIG.API.PAGINATION_LIMIT;
    }
  }

  return { total, items: allItems };
}

export function groupBillsByID(items) {
  const billMap = new Map();

  for (const item of items) {
    const billId = item.meta.bill_id;
    if (!billMap.has(billId)) {
      billMap.set(billId, []);
    }
    billMap.get(billId).push(item);
  }

  return billMap;
}
