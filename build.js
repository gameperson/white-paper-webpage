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
    const paperMd = await fs.promises.readFile(paperMdPath, 'utf-8'); 
    const referencesTxt = await fs.promises.readFile(referencesTxtPath, 'utf-8');
    const glossaryTxt = await fs.promises.readFile(glossaryTxtPath, 'utf-8');

    // ... (rest of the code remains the same) ...

    // Write HTML to file
    await fs.promises.writeFile(path.join(paperDir, 'index.html'), htmlContent); 

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
await Promise.all(whitePaperDirs.map(generateWhitePaperHtml)); 

// Update the main index.html file
const indexHtmlPath = path.join(__dirname, 'index.html'); 
const whitePaperLinks = whitePaperDirs.map(dir => `<li><a href="${dir}/">${getTitleFromMarkdown(fs.readFileSync(path.join(dir, 'paper.md'), 'utf-8'))}</a></li>`).join(''); 
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
await fs.promises.writeFile(indexHtmlPath, indexHtmlContent); 

// Create or update white-paper-dirs.json
const whitePaperDirsJson = JSON.stringify(whitePaperDirs, null, 2); // Indent JSON for readability
await fs.promises.writeFile('white-paper-dirs.json', whitePaperDirsJson);

console.log("White paper HTML files generated successfully.");
