export const convertMarkdownToHtml = (markdown: string): string => {
  const lines = markdown.split("\n");
  let html = "",
    inCodeBlock = false,
    listStack: string[] = [],
    inTable = false,
    tableHeader = false;

  for (let line of lines) {
    line = line.trim();

    // Handle code blocks
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      html += inCodeBlock ? "<pre><code>\n" : "</code></pre>\n";
      continue;
    }
    if (inCodeBlock) {
      html += line + "\n";
      continue;
    }

    // Handle headings (h1-h6)
    if (line.startsWith("#")) {
      let level = 0;
      while (line[level] === "#") level++;
      html += `<h${level}>${line.slice(level).trim()}</h${level}>\n`;
      continue;
    }

    // Handle lists (ordered & unordered)
    if (
      line.startsWith("* ") ||
      line.startsWith("- ") ||
      line.startsWith("+ ") ||
      /^[0-9]+\. /.test(line)
    ) {
      const isOrdered = /^[0-9]+\. /.test(line);
      const listType = isOrdered ? "ol" : "ul";
      const content = line.replace(/^[0-9]+\. |[*+-] /, "");
      const depth = line.search(/\S/);

      while (listStack.length > depth) html += `</${listStack.pop()}>\n`;
      if (listStack.length < depth) {
        html += `<${listType}>\n`;
        listStack.push(listType);
      }
      html += `<li>${content}</li>\n`;
      continue;
    }
    while (listStack.length) html += `</${listStack.pop()}>\n`;

    // Handle tables
    if (line.includes("|")) {
      const cells = line
        .split("|")
        .map((cell) => `<td>${cell.trim()}</td>`)
        .join("");
      if (!inTable) html += "<table>\n";
      if (!tableHeader) {
        html += `<thead><tr>${cells}</tr></thead>\n<tbody>\n`;
        tableHeader = true;
        inTable = true;
        continue;
      }
      if (line.includes("---")) continue;
      html += `<tr>${cells}</tr>\n`;
      continue;
    }
    if (inTable) {
      html += "</tbody></table>\n";
      inTable = false;
      tableHeader = false;
    }

    // Handle images
    if (line.includes("![")) {
      const start = line.indexOf("![") + 2;
      const mid = line.indexOf("](", start);
      const end = line.indexOf(")", mid);
      const alt = line.slice(start, mid);
      const src = line.slice(mid + 2, end);
      html += `<img src="${src}" alt="${alt}">\n`;
      continue;
    }

    // Handle links
    if (line.includes("[")) {
      const start = line.indexOf("[") + 1;
      const mid = line.indexOf("](", start);
      const end = line.indexOf(")", mid);
      const text = line.slice(start, mid);
      const href = line.slice(mid + 2, end);
      html += `<a href="${href}">${text}</a>\n`;
      continue;
    }

    // Handle inline formatting (bold, italic, underline, code)
    line = line
      .split("**")
      .join("<strong>")
      .split("<strong>")
      .join("</strong>")
      .split("*")
      .join("<em>")
      .split("<em>")
      .join("</em>")
      .split("__")
      .join("<u>")
      .split("<u>")
      .join("</u>")
      .split("`")
      .join("<code>")
      .split("<code>")
      .join("</code>");

    html += `<p>${line}</p>\n`;
  }

  while (listStack.length) html += `</${listStack.pop()}>\n`;
  if (inTable) html += "</tbody></table>\n";

  return html;
};
