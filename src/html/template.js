export function generateHTMLTemplate(title, stylesheet, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="${stylesheet}">
  <script>
    function toggleBillTitle(event) {
      event.preventDefault();
      const ellipsis = document.getElementById('bill-title-ellipsis');
      const full = document.getElementById('bill-title-full');
      const wrapper = ellipsis.parentElement;
      const link = event.target;
      
      if (full.style.display === 'none') {
        wrapper.style.display = 'none';
        full.style.display = 'block';
        link.textContent = '(collapse)';
      } else {
        wrapper.style.display = 'flex';
        full.style.display = 'none';
        link.textContent = '(expand)';
      }
    }
  </script>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}
