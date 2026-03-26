const MARKDOWN_PATTERNS = [
  { pattern: /^### (.*?)$/gm, replacement: "<h3>$1</h3>" },
  { pattern: /^## (.*?)$/gm, replacement: "<h2>$1</h2>" },
  { pattern: /^# (.*?)$/gm, replacement: "<h1>$1</h1>" },
  { pattern: /\*\*(.*?)\*\*/g, replacement: "<strong>$1</strong>" },
  { pattern: /__(.+?)__/g, replacement: "<strong>$1</strong>" },
  { pattern: /\*(.*?)\*/g, replacement: "<em>$1</em>" },
  { pattern: /_(.*?)_/g, replacement: "<em>$1</em>" },
  { pattern: /\n\n/g, replacement: "</p><p>" },
];

export function markdownToHTML(markdown) {
  let html = markdown;

  for (const { pattern, replacement } of MARKDOWN_PATTERNS) {
    html = html.replace(pattern, replacement);
  }

  html = `<p>${html}</p>`;
  html = html.replace(/<p><\/p>/g, "");

  return html;
}
