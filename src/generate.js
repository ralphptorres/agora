import {
  fetchBillMetadata,
  fetchBillProvisions,
  groupBillsByID,
} from "./utils/api.js";
import { copyFile, ensureDir, writeHTMLFile } from "./utils/fs.js";
import { generateIndexHTML } from "./html/index.js";
import { generateBillHTML } from "./html/bill.js";
import { CONFIG } from "./config.js";

const STYLES_TO_COPY = [
  "layout.css",
  "index.css",
  "bill.css",
  "_variables.css",
];

async function copyStyles() {
  console.log("Copying CSS files...");
  for (const style of STYLES_TO_COPY) {
    await copyFile(
      `${CONFIG.PATHS.STYLES_SRC}/${style}`,
      `${CONFIG.PATHS.STYLES_DIST}/${style}`,
    );
  }
}

async function copyAssetsToDistribution() {
  console.log("Copying assets...");
  await copyFile(
    `${CONFIG.PATHS.ASSETS_SRC}/logo.svg`,
    `${CONFIG.PATHS.ASSETS_DIST}/logo.svg`,
  );
}

async function generateBillPages(billMap) {
  console.log("Generating bill pages...");
  for (const [billId, items] of billMap) {
    const billMetadata = await fetchBillMetadata(billId);
    const billHTML = generateBillHTML(billId, items, billMetadata);
    await writeHTMLFile(`${CONFIG.PATHS.BILLS_DIST}/${billId}.html`, billHTML);
  }
}

async function main() {
  try {
    console.log("Fetching bill provisions...");
    const data = await fetchBillProvisions();
    console.log(`Fetched ${data.total} provisions`);

    console.log("Grouping bills by ID...");
    const billMap = groupBillsByID(data.items);
    console.log(`Found ${billMap.size} unique bills`);

    console.log("Creating directories...");
    await ensureDir(CONFIG.PATHS.DIST_ROOT);
    await ensureDir(CONFIG.PATHS.STYLES_DIST);
    await ensureDir(CONFIG.PATHS.BILLS_DIST);
    await ensureDir(CONFIG.PATHS.ASSETS_DIST);

    await copyStyles();
    await copyAssetsToDistribution();

    console.log("Generating index page...");
    const indexHTML = generateIndexHTML(billMap);
    await writeHTMLFile(`${CONFIG.PATHS.DIST_ROOT}/index.html`, indexHTML);

    await generateBillPages(billMap);

    console.log("\nGeneration complete!");
    console.log(`   - Copied ${STYLES_TO_COPY.length} stylesheets`);
    console.log("   - Copied assets/logo.svg");
    console.log("   - Generated index.html");
    console.log(`   - Generated ${billMap.size} bill pages`);
    console.log("\nRun 'deno task serve' to view the website");
  } catch (error) {
    console.error("Error during generation:", error);
    Deno.exit(1);
  }
}

main();
