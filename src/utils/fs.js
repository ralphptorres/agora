export async function ensureDir(path) {
  try {
    await Deno.mkdir(path, { recursive: true });
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error;
    }
  }
}

export async function writeHTMLFile(filepath, content) {
  await Deno.writeTextFile(filepath, content);
  console.log(`✓ Generated ${filepath}`);
}

export async function copyFile(src, dest) {
  const content = await Deno.readTextFile(src);
  await Deno.writeTextFile(dest, content);
}
