---
layout: default
title: NCBI C++ Toolkit Source Browser
nav: pages/ch_browse
---


{{ page.title }}
==================================================

Source Browsers
---------------

The overview for this chapter consists of the following topics:

-   Introduction

-   Chapter Outline

### Introduction

The NCBI C++ Toolkit source code is highly browseable and can be searched in a variety of useful ways. To that end we provide two source browsers, one based on the [LXR Engine](#ch_browse.lxr) and another based on [Doxygen](#ch_browse.doxygen). These are complementary approaches that allow the Toolkit source to be searched and navigated according to its file hierarchy and present an alphabetical list of all classes, macros, variables, typedefs, etc. named in the Toolkit, as well as a summary of the parent-child relationships among the classes.

### Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [LXR](#ch_browse.lxr)

-   [Doxygen Browser](#ch_browse.doxygen)

<a name="ch_browse.lxr"></a>

LXR
---

The [LXR Engine](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/blurb.html) enables search-driven browsing together with a more conventional [navigation](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source) of the Toolkit's source. In [source](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source) mode, LXR provides navigation of the source tree through a Web-based front end. The LXR search modes [ident](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident), [find](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/find) and [search](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/search) will generate a list to identify all occurrences in the Toolkit where an identifier, file name, or specified free text, respectively, are found.

An `identifier` in an LXR search is the name of a class, function, variable, macro, typedef, or other named entity within the Toolkit source. This search can be especially handy when attempting to determine, for example, which header has been left out when a symbol reference cannot be found.

Some hints for using LXR:

-   For free-text LXR searches, patterns, wildcards, and regular expression syntax are allowed. See the [Search Help page](http://tidy.sourceforge.net/lxr_search_help.html) for details.

-   The identifier ("ident") and file ("find") LXR search modes attempt an **exact** and **case-sensitive** match to your query.

-   LXR indexes files from a root of `$NCBI/c++`; matches will be found not only in `src` and `include` but also in any resident build tree and the `compilers` and `scripts` directories as well.

-   [Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): The documentation itself is not searched by LXR.

<a name="ch_browse.doxygen"></a>

Doxygen Browser
---------------

The Doxygen tool has been used to generate a [Toolkit source code browser](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/index.html) from the source code files. The documentation is extracted directly from the sources, which makes it much easier to keep the documentation consistent with the source code. Doxygen has been configured to extract the code structure directly from the source code files. This feature is very useful because it quickly enables you to find your way in large source distributions. You can also visualize the relations between the various elements by means of dependency graphs, inheritance diagrams, and collaboration diagrams, which are all generated automatically.


