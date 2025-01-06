const fs = require('fs');
const path = require('path');
const marked = require('marked');

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
const whitePaperDirs = fs.readdirSync('.').filter(dir => fs.lstatSync(dir).isDirectory());

// Generate HTML for each white paper
whitePaperDirs.forEach(generateWhitePaperHtml);

console.log("White paper HTML files generated successfully.");

/* 
This script:

Imports necessary modules: fs (for file system operations), path (for working with file paths), and marked for Markdown to HTML conversion.
Defines a generateWhitePaperHtml function that:
  Reads the paper.md, references.txt, and glossary.txt files from the given directory.
  Processes references and glossary data.
  Generates HTML content using the extracted data and the marked library.
  Writes the generated HTML to an index.html file within the directory.
Defines a helper function getTitleFromMarkdown to extract the title from the paper.md file.
Gets a list of all directories within the current folder.
Iterates through each directory and calls generateWhitePaperHtml to process and generate the HTML for that white paper.
*/
