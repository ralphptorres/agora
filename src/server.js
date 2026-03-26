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

function pathToFile(urlPath) {
  let path = urlPath;

  if (path.startsWith("/")) {
    path = path.substring(1);
  }

  if (path.endsWith("/") && path !== "") {
    path = path.substring(0, path.length - 1);
  }

  if (path === "" || !path.includes(".")) {
    path = "index.html";
  }

  return `${CONFIG.SERVER.PUBLIC_DIR}/${path}`;
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
      return new Response("404 - File Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    console.error("Error serving request:", error);
    return new Response("500 - Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function main() {
  console.log("\nPHPO AGORA Server");
  console.log("---------------------------");
  console.log(`Listening on http://localhost:${CONFIG.SERVER.PORT}`);
  console.log(`Serving files from: ${CONFIG.SERVER.PUBLIC_DIR}`);
  console.log(`\nVisit http://localhost:${CONFIG.SERVER.PORT} to view bills`);
  console.log("Make sure to run 'deno task generate' first\n");

  const requestHandler = async (req) => {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const timestamp = new Date().toLocaleTimeString();

    const response = await handleRequest(req);
    console.log(`[${timestamp}] ${method} ${path} -> ${response.status}`);

    return response;
  };

  await serve(requestHandler, { port: CONFIG.SERVER.PORT });
}

main().catch((error) => {
  console.error("Server error:", error);
  Deno.exit(1);
});
