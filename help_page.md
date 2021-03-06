---
layout: default
title: How to edit this book
nav: help_page
---

{{ page.title }}
=================================================

- [Getting started](#help_page.Getting_Started)
- [How to edit the page](#help_page.How_to_edit)
- [How to add images](#help_page.How_to_add_images)
- [Creating and formatting tables](#help_page.Creating_and_formatting_tables)
- [How to add CSS class to a table](#help_page.How_to_add_CSS)
- [Contact info](#help_page.Contact_info)


<a name="help_page.Getting_Started"></a>

Getting started
-------------------------------------------------

- To author this book you have to register at GitHub. If you already have GitHub account linked to your NCBI email, you can use this account. If not, please register at [https://github.com/](https://github.com/) **using your NCBI email**. 
We also can create an account for you.
- After you created your GitHub account, <a href="mailto:cpp-doc@ncbi.nlm.nih.gov?Subject=Please%20add%20me%20to%20contributors%20list" target="_top">please send us your GitHub user name</a> so we can add you to our authors team. You will get an email invitation to join NCBI GitHub organization.

<a name="help_page.How_to_edit"></a>

How to edit the page
-------------------------------------------------

- On the page you need to edit, click 'Edit' button at the top right corner of the page. It will open the editable mode of this page. At this point, GitHub forks the repository for you.
- On the **Edit file** tab, make any changes you need to the file. For our content, we are using [GitHub markdown](https://help.github.com/articles/markdown-basics/). You can find more details on how to use Markdown [here](https://help.github.com/articles/github-flavored-markdown/).
- After you finished, click **Preview changes** tab (to the right of **Edit file** tab). Please note that Preview mode will mark in color the changes you've made. It does not apply the styles that are added during the rendering.
- When you finish editing, at the bottom of the page, type a short, meaningful commit message that describes the change you made to the file.
- Click **Propose file change** button. 
- At the top of the page, you should see the message:  *Able to merge. These branches can be automatically merged.*
If you do not see this message, please **DO NOT CREATE A PULL REQUEST**. Please contact us before proceeding with your changes. If you see that message, please click **Create pull request** button.
-  We will review the changes you made and merge them with the current version of the page.
-  You can find more details on GitHub Pull requests [here](https://help.github.com/articles/using-pull-requests/)

<a name="help_page.How_to_add_images"></a>
  
How to add images
-------------------------------------------------

- To add an image to the page, open the page for editing (see steps above).
- Create a reference (link) to the image you want to add. See syntax for the image reference [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images). Click 'Propose file changes' button.
- Only users with administrators' rights can upload images to the book. You will need to send us the image you want to upload (see contact info below). Please make sure that the name of your image is the same that you used in the reference link.

<a name="help_page.Creating_and_formatting_tables"></a>

Creating and formatting tables
-------------------------------------------------
You can create and apply a simple formatting to a table in GitHub markdown as it is described [here](https://docs.github.com/en/github/writing-on-github/organizing-information-with-tables). We have some pretty large and complicated tables in this documentation, so we apply further formatting through CSS table classes that will be automatically applied to your table if you do not overwrite it with a specially assigned class (see next section).

<a name="help_page.How_to_add_CSS"></a>

How to add CSS class to a table
-------------------------------------------------
GitHub renderer strips down all HTML and CSS that is added to the table markdown, so on the rendered page such additions will be lost. I. In order to asign a class to a table, we use [Liquid markdown language](https://shopify.github.io/liquid/).

Adding the following line below the last table row will add CSS class your_table_class to your table

```{: .your_table_class }```

So, the following table in GitHub markdown

```

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Cell 1A | Cell 1B | Cell 1C |
| Cell 2A | Cell 2B | Cell 2C |
{: .your_table_class }
```
will be rendered:

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Cell 1A | Cell 1B | Cell 1C |
| Cell 2A | Cell 2B | Cell 2C |
{: .your_table_class }

with your_table_class added to HTML table element:

```
<table class="your_table_class" style="table-layout: auto;">

```


<a name="help_page.Contact_info"></a>

Contact info
-------------------------------------------------

If you have any questons, please <a href="mailto:cpp-doc@ncbi.nlm.nih.gov?Subject=Question%20about%20editing%20C++Toolkit%20Book" target="_top">contact us </a>
