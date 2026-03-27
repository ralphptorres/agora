import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { CONFIG } from "./config.js";

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
};

function getMimeType(filepath) {
  const ext = filepath.substring(filepath.lastIndexOf("."));
  return MIME_TYPES[ext] || "application/octet-stream";
}

function normalizePath(urlPath) {
  let path = urlPath;
  if (path.startsWith("/")) path = path.substring(1);
  if (path.endsWith("/") && path !== "") path = path.substring(0, path.length - 1);
  return path === "" || !path.includes(".") ? "index.html" : path;
}

function pathToFile(urlPath) {
  return `${CONFIG.SERVER.PUBLIC_DIR}/${normalizePath(urlPath)}`;
}

function createErrorResponse(status, message) {
  const statusMessages = {
    404: "404 - File Not Found",
    500: "500 - Internal Server Error",
  };
  return new Response(statusMessages[status] || message, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

async function handleRequest(req) {
  try {
    const filepath = pathToFile(new URL(req.url).pathname);
    const fileContent = await Deno.readTextFile(filepath);
    const mimeType = getMimeType(filepath);

    return new Response(fileContent, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return createErrorResponse(404, "");
    }
    console.error("Error serving request:", error);
    return createErrorResponse(500, "");
  }
}

function logStartup() {
  console.log("\naigov archive Server");
  console.log("---------------------------");
  console.log(`Listening on http://localhost:${CONFIG.SERVER.PORT}`);
  console.log(`Serving files from: ${CONFIG.SERVER.PUBLIC_DIR}`);
  console.log(`\nVisit http://localhost:${CONFIG.SERVER.PORT} to view bills`);
  console.log("Make sure to run 'deno task generate' first\n");
}

function createRequestHandler() {
  return async (req) => {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const timestamp = new Date().toLocaleTimeString();

    const response = await handleRequest(req);
    console.log(`[${timestamp}] ${method} ${path} -> ${response.status}`);

    return response;
  };
}

async function main() {
  logStartup();
  await serve(createRequestHandler(), { port: CONFIG.SERVER.PORT });
}

main().catch((error) => {
  console.error("Server error:", error);
  Deno.exit(1);
});
