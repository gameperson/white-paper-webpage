const fs = require('fs');
const path = require('path');
const marked = require('marked');

/*
 * build.js
 *
 * This script automates the generation of HTML pages for each white paper.
 * It reads the paper.md, references.txt, and glossary.txt files within each 
 * white paper directory, processes the data, and generates the HTML content.
 * It also updates the main index.html file with links to all white papers.
 */

// Function to generate HTML for a single white paper
function generateWhitePaperHtml(paperDir) { 
  const paperMdPath = path.join(paperDir, 'paper.md');
  const referencesTxtPath = path.join(paperDir, 'references.txt');
  const glossaryTxtPath = path.join(paperDir, 'glossary.txt');

  try {
    // Read files
    const paperMd = fs.readFileSync(paperMdPath, 'utf-8');
    const referencesTxt = fs.readFileSync(referencesTxtPath, 'utf-8');
    const glossaryTxt = fs.readFileSync(glossaryTxtPath, 'utf-8');

    // Process references
    const references = referencesTxt
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const [label, url] = line.split(':');
        return `<li><a href="${url}">${label}</a></li>`;
      });

    // Process glossary
    const glossary = glossaryTxt
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const [term, definition] = line.split(':');
        const anchorId = term.replace(/\s+/g, '-').toLowerCase();
        return `<li><a href="#${anchorId}"><strong>${term}</strong></a>: ${definition}</li>`;
      });

    // Generate HTML content
    const htmlContent = `
      <h1>${getTitleFromMarkdown(paperMd)}</h1>
      ${marked(paperMd)}

      <h2>References</h2>
      <ul>${references.join('')}</ul>

      <h2>Glossary</h2>
      <ul>${glossary.join('')}</ul>
    `;

    // Write HTML to file
    fs.writeFileSync(path.join(paperDir, 'index.html'), htmlContent);

  } catch (error) {
    console.error(`Error processing ${paperDir}:`, error);
  }
}

// Helper function to extract the title from Markdown
function getTitleFromMarkdown(markdown) {
  const match = markdown.match(/^# (.*)/m);
  return match ? match[1].trim() : 'Untitled';
}

// Get a list of white paper directories
const whitePaperDirs = fs.readdirSync('.').filter(dir => fs.lstatSync(dir).isDirectory() && dir.startsWith('white-paper-'));

// Generate HTML for each white paper
whitePaperDirs.forEach(generateWhitePaperHtml);

// Update the main index.html file
const indexHtmlPath = path.join(__dirname, 'index.html'); 
const whitePaperLinks = whitePaperDirs.map(dir => `<li><a href="${dir}/">${dir.replace('white-paper-', '')}</a></li>`).join('');
const indexHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>White Paper Index</title>
</head>
<body>
  <h1>White Paper Index</h1>
  <ul>${whitePaperLinks}</ul>
</body>
</html>
`;
fs.writeFileSync(indexHtmlPath, indexHtmlContent);

// Create or update white-paper-dirs.json
const whitePaperDirsJson = JSON.stringify(whitePaperDirs, null, 2); // Indent JSON for readability
fs.writeFileSync('white-paper-dirs.json', whitePaperDirsJson);

console.log("White paper HTML files generated successfully.");
