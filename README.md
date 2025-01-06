## White Paper Webpage

This project allows you to publish white papers on GitHub Pages, automatically generating individual webpages for each paper.

**Features:**

* **Automated Build:** Uses Node.js and a build tool to automate the generation of HTML pages from Markdown, references, and glossary files.
* **Dynamic Indexing:** The main index page automatically lists all available white papers.
* **Markdown Support:** White paper content is written in Markdown for easy formatting.
* **Glossary and References:** Each white paper can have a dedicated glossary and reference list.
* **GitHub Pages Integration:** Designed for seamless deployment to GitHub Pages.

URL: https://gameperson.github.io/white-paper-webpage/

**Getting Started**

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/gameperson/white-paper-webpage.git](https://github.com/gameperson/white-paper-webpage.git)

2. **Install Dependencies:**
  bash: npm install

3. **Project Structure:**
  * white-paper-1/: Folder for the first white paper.
    1. paper.md: Markdown file containing the white paper content.
    2. references.txt: Text file listing references.
    3. glossary.txt: Text file defining glossary terms.
  * white-paper-2/: Folder for the second white paper (and so on).
  * index.html: Main page listing all white papers.
  * build.js: Node.js script for building the HTML pages.
  * package.json: Defines project dependencies and scripts.
  * README.md: This file (you're reading it now!).

4. **Build and Run:**
  * Run the build script to generate the HTML pages:
  bash: npm run build
  * This will create HTML files for each white paper and the index page.
    
5. **Deploy to GitHub Pages:**
  * Follow the instructions provided by GitHub Pages to deploy your project to a web URL.

**Additional Notes:**
  *You can add more white paper folders following the same structure.
  * The build.js script can be customized to modify the build process or add additional features.

**Feel free to contribute!**

This project is open-source, and we welcome contributions. If you have any suggestions or improvements, please create a pull request.

**License:**
  This project is licensed under the MIT License. 1  See the LICENSE file for 2  details.   
  1. github.com  Apache - 2.0
  2. github.com
