---
layout: default
title: Release Notes (Version 22, March 2019)
nav: pages/release_notes
---

{{ page.title }}
=============

The previous Release Notes can be seen [here](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/public_releases/RN_index.html).


> These notes give a somewhat superficial and incomplete (albeit still useful) description of the latest NCBI C++ Toolkit changes, fixes and additions. Some important topics (especially numerous bug fixes and feature improvements, but possibly a bigger fish) are just out of scope of these notes. Feel free to write to the mailing group <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp> with any questions or reports.


-   [Download](#release_notes.Download)

-   [Third Party Packages](#release_notes.Third_Party_Packages)

-   [Build](#release_notes.Build)

-   [New Developments](#release_notes.New_Developments)

    -   [HIGHLIGHTS](#release_notes.release_notes_HIGHLIGHTS)

-   [Documentation](#release_notes.Documentation)

    -   [Location](#release_notes.Location)

    -   [Content](#release_notes.Content)

-   [Supported Platforms (OS's and Compilers)](#release_notes.Platforms_OSs__compi)

    -   [Unix](#release_notes.Unix)

    -   [MS Windows](#release_notes.MS_Windows)

    -   [Mac OS X](#release_notes.Mac_OS_X)

    -   [Added Platforms](#release_notes.Added_Platforms)

    -   [Discontinued Platforms](#release_notes.Discontinued)

<a name="release_notes.Download"></a>

Download
-----------------------------------

Download the source code archives at: <ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2019/Mar_28_2019/>

-   [ncbi\_cxx--22\_0\_0.tar.gz](ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2019/Mar_28_2019/ncbi_cxx--22_0_0.tar.gz) -- for Unix'es (see the list of Unix flavors below) and MacOSX

-   [ncbi\_cxx--22\_0\_0.zip](ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2019/Mar_28_2019/ncbi_cxx--22_0_0.zip) -- for MS-Windows / MS Visual Studio C++ 2015 and 2017

The sources correspond to the NCBI production tree [sources](https://ncbi.github.io/cxx-toolkit/pages/ch_getcode_svn#ch_getcode_svn.chkout_production_tree), which are originally based on the development tree source snapshot from August, 2018; and also include many hundreds of important and safe code updates made since then and through March, 2019.

<a name="release_notes.Third_Party_Packages"></a>

Third Party Packages
-----------------------------------------------

Some parts of the C++ Toolkit just cannot be built without 3<sup>rd</sup> party libraries, and other parts of the Toolkit will work more efficiently or provide more functionality if some 3rd-party packages (such as BerkeleyDB which is used for local data cache and for local data storage) are available.


Table 1. Currently Supported/Tested Versions of Third Party Packages

|Package   |Versions expected to work (obtained by build-environment inspection in some cases)  |Versions known to work (used in-house on any platform)  |
|-------|----------------------------------|--------------|
|[BerkeleyDB](https://www.oracle.com/database/berkeley-db/db.html)  |4.3.0 or newer   |4.5.20, 4.6.21.NC, 4.6.21.1, 4.7.25  |
|[Boost Test](https://www.boost.org) |1.35.0 or newer |1.53.0, 1.54.0, 1.62.0, 1.66.0 |
|FastCGI    |All versions    |2.1, 2.4.0, 2.4.1 |
|[libbzip2](http://www.bzip.org)    |All versions    |1.0.5, 1.0.6   | 
|[libjpeg](http://freshmeat.net/projects/libjpeg)     |All versions    |6b, 8c, 8d, 9c |
|[libpng](http://www.libpng.org/pub/png/libpng.html)  |All versions    |1.2.7, 1.2.49, 1.2.50, 1.5.13, 1.6.20, 1.6.34 |
|[libtiff](http://www.libtiff.org)  |All versions    |3.6.1, 3.9.4, 4.0.3, 4.0.6 |
|[libungif](https://sourceforge.net/projects/giflib)   |All versions    |4.1.3 (libungif),<br/> 4.1.6, 5.1.2 (giflib) |
|[libxml2](http://xmlsoft.org/)     |All versions    |2.7.6, 2.7.8, 2.9.0, 2.9.1, 2.9.4 |
|[libxslt](http://xmlsoft.org/xslt/)|1.1.14 or newer |1.1.26, 1.1.28 |
|[<span class="small-caps">LZO</span>](https://www.oberhumer.com/opensource/lzo) |2.x |2.05, 2.09   |
|[PCRE](http://www.pcre.org)  |All versions    |7.8, 7.9, 8.31, 8.32, 8.38 |
|[SQLite3](https://www.sqlite.org)   |3.6.6 or newer  |3.6.14.2, 3.6.20, 3.7.13, 3.7.17, 3.8.2, 3.8.10.1, 3.22.0 |
|Sybase     |All versions    |15.5, 15.7, 16.0 |
|[zlib](http://www.zlib.org)  |All versions    |1.2.3, 1.2.5, 1.2.7, 1.2.8, 1.2.11 |

The user is expected to download and build the 3<sup>rd</sup> party packages themselves. The release's package list includes links to download sites. However, the user still needs a list of the 3<sup>rd</sup> party packages and which versions of them are compatible with the release.


<a name="release_notes.Build"></a>

Build
--------------------------------

For guidelines to configure, build and install the Toolkit see [here](https://ncbi.github.io/cxx-toolkit/pages/ch_config).

<a name="release_notes.New_Developments"></a>

New Developments
-------------------------------------------

<a name="release_notes.release_notes_HIGHLIGHTS"></a>

### HIGHLIGHTS



There have been significant additions and improvements in all parts of the Toolkit since the last public release of the NCBI C++ Toolkit. Here, only very few are listed, mostly related to major formal changes.

We started using C++11 specific features, so you will now need a C++11 compliant compiler to build the Toolkit.

We are about to drop 32-bit support, so while the Toolkit will still likely build (and even work) in _some_ 32-bit configurations... the 32-bit support is nominal, and will go away for good real soon now.

<a name="release_notes.Documentation"></a>


Documentation
----------------------------------------

<a name="release_notes.Location"></a>

### Location

The documentation is available online as a searchable book "The NCBI C++ Toolkit": <https://ncbi.github.io/cxx-toolkit/>.


<a name="release_notes.Content"></a>

### Content


A C/C++ Symbol Search query appears on each page of the online Toolkit documentation. You can use this to perform a symbol search on the up-to-date public or in-house versions using source browsers [LXR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime&d=), [Doxygen](https://www.ncbi.nlm.nih.gov/toolkit/?term=ctime) and [Library](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?symbol=CTime) - or do an [overall](https://www.ncbi.nlm.nih.gov/toolkitall?term=CTime) search.

Public access to our SVN trunk:

-   For browsing: <https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++>

-   For retrieval: <https://anonsvn.ncbi.nlm.nih.gov/repos/v1/trunk/c++> (<span class="nctnt highlight">NOTE:</span> Some WebDAV clients may require dav:// instead of http://)

<a name="release_notes.Platforms_OSs__compi"></a>

Supported Platforms (OS's and Compilers)
-------------------------------------------------------------------

-   [Unix](release_notes.html#release_notes.Unix)

-   [MS Windows](release_notes.html#release_notes.MS_Windows)

-   [Mac OS X](release_notes.html#release_notes.Mac_OS_X)

-   [Added](release_notes.html#release_notes.Added_Platforms)

-   [Discontinued](release_notes.html#release_notes.Discontinued)

This release was successfully tested on at least the following platforms (but may also work on other platforms). Since the previous release, some platforms were dropped from this list and some were added. Also, it can happen that some projects would not work (or even compile) in the absence of 3rd-party packages, or with older or newer versions of such packages. In these cases, just skipping such projects (e.g. using flag "<span class="nctnt ncbi-monospace">-k</span>" for <span class="nctnt ncbi-app"> make</span> on Unix), can get you through.

In cases where multiple compilers or versions are supported, the mainstream one is shown in **bold**.  Other versions might also work, but **must** support C++11; minimum versions are GCC 4.8.x, Clang 3.4.x, ICC 15.x, and MS VS 2015.

<a name="release_notes.Unix"></a>

### [Unix](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.UNIX)


|Operating System |Architecture    |Compilers  |
|-----------------------------------|----------------|-----------------------------|
|CentOS 6.x (LIBC 2.12) |x86-64    |**GCC 4.9.3**, 5.3; ICC 2015,2017 |
|CentOS 7.x (LIBC 2.17) |x86-64    |**GCC 7.3.0**; ICC 2015, 2017  |
|Ubuntu 14.04 (LIBC 2.19)|x86-32|GCC 4.8.4 |
|Ubuntu 16.04 (LIBC 2.23)|x86-64|GCC 5.4.0 |
|FreeBSD 11.2           |x86-64    |Clang 6.0.0      |

<a name="release_notes.MS_Windows"></a>

### [MS Windows](ch_config#ch_config.MS_Windows)


|Operating System    |Architecture  |Compilers    |
|--------------------------|--------------------------------|-------------------------------|
|MS Windows    |x86-64  |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C) 2015 (MSVC 14)<br/>  |
|MS Windows    |x86-64  |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C) 2017 (MSVC 14.1) experimental<br/>  |
|Cygwin 2.9.0  |x86-64  |[GCC 6.4.0](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Cygwin_GCC)- nominal support only. |

<a name="release_notes.Mac_OS_X"></a>

### [macOS](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Mac_OS_X)


|Operating System  |Architecture|Compilers     |
|---------------------------|------------|--------------------------------------|
|macOS 10.11.x (Darwin 15.x)|x86-64      |**Apple Clang 8.0.0**, Xcode 8.2.1    |
|macOS 10.12.x (Darwin 16.x)|x86-64      |**Apple Clang 9.0.0**, Xcode 9.2    |
|macOS 10.13.x (Darwin 17.x)|x86-64      |**Apple Clang 10.0.0** |

<a name="release_notes.Added_Platforms"></a>

### Added Platforms


Official support for macOS 10.13.x; for GCC 7.3 and ICC 17 on CentOS; for FreeBSD 11.2 is new in this release.

<a name="release_notes.Discontinued"></a>

### Discontinued Platforms


|Operating System      |Architecture  |Compilers   |
|----------------------------|--------------------------------------|------------------------------------|
|MS Windows      |x86-32| all (only 64-bit arch is supported from now on) |
|MS Windows      |x86-32, 64    |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C) 2013 (MSVC 12)|
|Ubuntu 14.04 ("jaunty")      |x86-32    |All   |
|FreeBSD 10.3     |x86-32  |All   |
|CentOS 6.x      |x86-32, 64    | Nominal support, will be dropped soon |

<a name=""></a>

Last Updated
---------------------------------------

This document was last updated on March 28, 2019.

{{ page.last_modified_at }}

