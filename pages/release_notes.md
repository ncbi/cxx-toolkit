---
layout: default
title: NCBI C++ Toolkit Release Notes
nav: pages/rn_new
---

{{ page.title }}
=============

All Release Notes (including this one) can be seen in GitHub: <https://github.com/ncbi/ncbi-cxx-toolkit-public/releases>


-   [Download](#release_notes.Download)

-   [Third Party Packages](#release_notes.Third_Party_Packages)

-   [Build](#release_notes.Build)

-   [New Developments](#release_notes.New_Developments)

-   [Documentation](#release_notes.Documentation)

-   [Supported Platforms (OS's and Compilers)](#release_notes.Platforms_OSs__compi)

    -   [Unix](#release_notes.Unix)

    -   [MS Windows](#release_notes.MS_Windows)

    -   [Mac OS X](#release_notes.Mac_OS_X)

<a name="release_notes.Download"></a>

Download
-----------------------------------

Source code archives can be downloaded at: <https://github.com/ncbi/ncbi-cxx-toolkit-public/releases>


<a name="release_notes.Third_Party_Packages"></a>

Third Party Packages
-----------------------------------------------

Some parts of the C++ Toolkit cannot be built without 3<sup>rd</sup> party libraries, and other parts of the Toolkit will work more efficiently or provide more functionality if some 3rd-party packages are available. We use Conan package manager to pull in necessary packages: <https://ncbi.github.io/cxx-toolkit/pages/ch_cmconfig#ch_cmconfig._Configure_Conan> 


<a name="release_notes.Build"></a>

Build
--------------------------------

For guidelines to configure, build and install the Toolkit see: <https://ncbi.github.io/cxx-toolkit/pages/ch_config>

<a name="release_notes.New_Developments"></a>

New (significant) Developments
-------------------------------------------

TODO


<a name="release_notes.Documentation"></a>

Documentation
----------------------------------------

The documentation is available online as a searchable book: <https://ncbi.github.io/cxx-toolkit/>

NCBI C++ Toolkit source code:  <https://github.com/ncbi/ncbi-cxx-toolkit-public>

A C/C++ Symbol Search query appears on each page of the online Toolkit documentation. You can use this to perform a symbol search on the up-to-date public or in-house versions using source browsers [LXR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime&d=), [Doxygen](https://www.ncbi.nlm.nih.gov/toolkit/?term=ctime) and [Library](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?symbol=CTime) - or do an [overall](https://www.ncbi.nlm.nih.gov/toolkitall?term=CTime) search.


<a name="release_notes.Platforms_OSs__compi"></a>

Supported Platforms (OS's and Compilers)
-------------------------------------------------------------------

-   [Unix](release_notes.html#release_notes.Unix)

-   [MS Windows](release_notes.html#release_notes.MS_Windows)

-   [Mac OS X](release_notes.html#release_notes.Mac_OS_X)

This (latest) release was successfully tested on at least the following platforms (but it may also work on other platforms).
When multiple compilers or versions are supported, the mainstream ones are shown in **bold**.  Other compilers and versions may also work, but they **must** support C++20.

<a name="release_notes.Unix"></a>

### [Unix](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.UNIX)


|Operating System |Architecture    |Compilers  |
|-----------------------------------|----------------|-----------------------------|
|AlmaLinux 8 |x86-64    |**GCC 13.2**, Clang 16; ICC (20)24 |
|Ubuntu 20.04|x86-64    |GCC 13.1 |
|FreeBSD 14.2|x86-64    |Clang 18 |
|Ubuntu 20.04|Graviton 2 (ARM) | (experimental, currently in flux) |

<a name="release_notes.MS_Windows"></a>

### [MS Windows](ch_config#ch_config.MS_Windows)


|Operating System    |Architecture  |Compilers    |
|--------------------------|--------------------------------|-------------------------------|
|MS Windows    |x86-64  |[MS Visual Studio C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C) 2022 |
|Cygwin        |x86-64  |[GCC 12.4](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Cygwin_GCC)- nominal support only. |

<a name="release_notes.Mac_OS_X"></a>

### [macOS](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Mac_OS_X)


|Operating System  |Architecture|Compilers     |
|---------------------------|------------|--------------------------------------|
|macOS 14 (Darwin 23.6)|   ARM   |**Apple Clang 16**, Xcode  |

<a name="release_notes.Added_Platforms"></a>


<a name=""></a>

Last Updated
---------------------------------------

This document was last updated on April 7, 2025.

{{ page.last_modified_at }}
