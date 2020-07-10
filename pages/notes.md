---
layout: default
title: Notes (internal use only).
nav: pages/notes
---


{{ page.title }}
=================================================

This page contains some notes for maintaining the book.

## Indexing our site on Google

### How we index our book.

We use sitemap and crawling to index our site. We also use robots.txt file to control pages that are not supposed to be indexed by Google and other bots. 

Sitemap (sitemap_000.xml) is located at the root directory of cxx-toolkit repository.
robots.txt file is also located at the root directory.

### Resources

[Google search console](https://search.google.com/search-console?resource_id=https://ncbi.github.io/cxx-toolkit/)

To use this console, you need to create an account. 


### How to

How to get indexed by Google

    Go to Google Search Console.
    Navigate to the URL inspection tool.
    Paste the URL you'd like Google to index into the search bar.
    Wait for Google to check the URL.
    Click the “Request indexing” button.
    
How to create a sitemap: [https://support.google.com/webmasters/answer/183668?hl=en](https://support.google.com/webmasters/answer/183668?hl=en)
    
How to submit your sitemap to Google Search Console

    Sign in to Google Search Console.
    In the sidebar, select your website.
    Click on 'Sitemaps'. The 'Sitemaps' menu is under the 'Index' section. ...
    Remove outdated or invalid sitemaps (if any) like sitemap.xml.
    Enter 'sitemap_index. ...
    Click Submit.
More info here: https://www.seerinteractive.com/labs/the-seo-starter-guide-to-google-search-console/how-to-submit-an-xml-sitemap-to-google/
    
    
URL Inspection Tool: https://support.google.com/webmasters/answer/9012289#url_not_on_google

A couple of notes about our indexing:

    - The newly added or updated content gets indexed in 7-10 days;
    - Timestamps in sitemap file have little to no affect on this.
    

### Basic info about search on Google

Basic description of Google search: https://ahrefs.com/blog/google-index/
Video: https://www.youtube.com/watch?v=BNHR6IQJGZs
