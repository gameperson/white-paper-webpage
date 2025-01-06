# White Paper Website

This repository hosts a collection of white papers on various topics.

**Features:**

* **Automated Build:** Utilizes a Node.js script to automatically generate HTML pages from Markdown files, references, and glossaries.
* **Dynamic Indexing:** The main `index.html` file automatically generates a list of all available white papers.
* **Modular Structure:** White papers are organized in subfolders (e.g., `white-paper-topic1`) for better organization and maintainability.

**Getting Started**

1. **Clone the Repository:** 
   bash :  git clone <repository_url>

2. **Install Dependencies:**
   bash :  npm install

3. **Add New White Papers:**
   * Create a new subfolder (e.g., white-paper-topic2) for each new white paper.
   * Inside the subfolder, create:
      * paper.md: Write the white paper content in Markdown format.
      * references.txt: List all references used in the paper.
      * glossary.txt: Define any glossary terms used in the paper.

4. **Build the Website:**
   * Run npm run build in the terminal to generate HTML files for all white papers and update the index.html file.

5. **Deploy to GitHub Pages:**
   * Follow the GitHub Pages instructions to deploy the generated website.

**Contributing**

Contributions are welcome! Please follow these guidelines:
   * Fork the repository.
   * Create a new branch for your changes.
   * Make your changes and commit them with clear messages.   
   * Create a pull request to merge your changes back into the main branch.

**License**

This project is licensed under the MIT License. See the LICENSE file for details.
