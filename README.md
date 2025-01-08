# White Paper Website

**Copilot Chat**

GitHub Pages: Automating Topic Page Generation

   * Prompt: A website on GitHub pages that creates pages from from the md files in a subdirectory of md files called topics, the site should have an index of topics linked to the topic pages with an optional short discripion of each topic. The index landing page and each topic page are located on the main branch at the root and generated when a newtopic md is pushed to the /topics  directory. Create a template file for the topic.md files and an initial index file with with the supporing files to set this site up and create a workflow that auomates the process of creating and indexing new topic.md files in the /topics directory

   * Response: To set up a GitHub Pages site that automatically generates and indexes pages from Markdown files in a /topics directory, you'll need to create a few key files and set up a GitHub Actions workflow. Here's a step-by-step guide:

   1. Create the Topic Template (topic_template.md):
      Create a template for your topic Markdown files. This file will serve as a starting point for new topics.

Markdown
---
title: "Topic Title"
description: "Short description of the topic"
---

# {{ title }}

{{ description }}

Content goes here...
   
   2. Create the Initial Index File (index.md):
      This file will serve as the landing page and list all the topics.

Markdown
# Index of Topics

{% for topic in site.topics %}
- [{{ topic.title }}]({{ topic.url }}) - {{ topic.description }}
{% endfor %}

   3. Supporting Files:
      Create a _config.yml file for Jekyll to configure your site.

yml
title: "My GitHub Pages Site"
theme: jekyll-theme-cayman

collections:
  topics:
    output: true
    permalink: /:collection/:path/

   4. GitHub Actions Workflow (.github/workflows/generate_site.yml):
      This workflow will automatically generate and update the site when new topics are added to the /topics directory.

YAML
name: Generate and Deploy Site

on:
  push:
    paths:
      - 'topics/*.md'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Jekyll
      uses: actions/setup-ruby@v1
      with:
        ruby-version: '2.7'

    - name: Install dependencies
      run: |
        gem install bundler
        bundle install

    - name: Build site
      run: bundle exec jekyll build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site

   5. Directory Structure:
      Ensure your repository is structured like this:

Code
/.github
  /workflows
    generate_site.yml
/topics
  topic1.md
  topic2.md
index.md
_config.yml
Gemfile
Gemfile.lock

   6. Gemfile and Gemfile.lock:
      Create a Gemfile for Jekyll dependencies.

Ruby
source 'https://rubygems.org'
gem 'jekyll'
gem 'github-pages', group: :jekyll_plugins
Run bundle install to generate the Gemfile.lock.

   7. Commit and Push:
      Commit all these files to your GitHub repository and push them to the main branch.

sh
git add .
git commit -m "Set up GitHub Pages site with automation"
git push origin main

   With these steps, your GitHub Pages site will be set up to automatically generate and update topic pages and the index page whenever new Markdown files are added to the /topics directory.


**Contributing**

Contributions are welcome! Please follow these guidelines:
   * Fork the repository.
   * Create a new branch for your changes.
   * Make your changes and commit them with clear messages.   
   * Create a pull request to merge your changes back into the main branch.

**License**

This project is licensed under the MIT License. See the LICENSE file for details.
