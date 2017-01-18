---
layout: default
title: C++ Toolkit test
nav: pages/release_notes
---


Release Notes (Version 18, January 2017)
====================================


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

<span class="title">Download</span>
-----------------------------------

Download the source code archives at: <ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2017/Jan_10_2017/>

-   [ncbi\_cxx--18\_0\_0.tar.gz](ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2017/Jan_10_2017/ncbi_cxx--18_0_0.tar.gz) -- for Unix'es (see the list of Unix flavors below) and MacOSX

-   [ncbi\_cxx--18\_0\_0.zip](ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/2017/Jan_10_2017/ncbi_cxx--18_0_0.zip) -- for MS-Windows (32- and 64-bit) / MS Visual Studio C++ 13, 15

The sources correspond to the NCBI production tree [sources](https://ncbi.github.io/cxx-toolkit/pages/ch_getcode_svn#ch_getcode_svn.chkout_production_tree), which are originally based on the development tree source snapshot from July, 2016 but also include many hundreds of important and safe code updates made since then and through November, 2016 (and then some).

<a name="release_notes.Third_Party_Packages"></a>

<span class="title">Third Party Packages</span>
-----------------------------------------------

Some parts of the C++ Toolkit just cannot be built without 3<sup>rd</sup> party libraries, and other parts of the Toolkit will work more efficiently or provide more functionality if some 3rd-party packages (such as BerkeleyDB which is used for local data cache and for local data storage) are available.


Table 1. Currently Supported/Tested Versions of Third Party Packages

|Package   |Versions expected to work (obtained by build-environment inspection in some cases)  |Versions known to work (used in-house on any platform)  |
|-------|----------------------------------|--------------|
|[BerkeleyDB](http://www.oracle.com/us/products/database/berkeley-db/index.html)  |4.3.0 or newer   |4.5.20, 4.6.21.NC, 4.6.21.1, 4.7.25  |
|[Boost Test](http://www.boost.org)                   |1.35.0 or newer |1.45.0, 1.53.0, 1.54.0, 1.56.0, 1.57.0 |
|FastCGI                                              |All versions    |2.1, 2.4.0                 |
|[libbzip2](http://www.bzip.org)                      |All versions    |1.0.5, 1.0.6               | 
|[libjpeg](http://freshmeat.net/projects/libjpeg)     |All versions    |6b, 8c, 8d                 |
|[libpng](http://www.libpng.org/pub/png/libpng.html)  |All versions    |1.2.7, 1.2.49, 1.2.50, 1.5.13, 1.6.20 |
|[libtiff](http://www.libtiff.org)                    |All versions    |3.6.1, 3.9.4, 4.0.3, 4.0.6 |
|[libungif](http://sourceforge.net/projects/giflib)   |All versions    |4.1.3 (libungif),<br/> 4.1.6, 5.1.2 (giflib) |
|[libxml2](http://xmlsoft.org/)                       |All versions    |2.7.6, 2.7.8, 2.9.0, 2.9.1, 2.9.4 |
|[libxslt](http://xmlsoft.org/)                       |1.1.14 or newer |1.1.26, 1.1.28             |
|[<span class="small-caps">LZO</span>](http://www.oberhumer.com/opensource/lzo) |2.x |2.05, 2.09   |
|[PCRE](http://www.pcre.org)                          |All versions    |7.8, 7.9, 8.31, 8.32, 8.38 |
|[SQLite3](http://www.sqlite.org)                     |3.6.6 or newer  |3.6.14.2, 3.6.20, 3.7.13, 3.7.17, 3.8.2 |
|Sybase                                               |All versions    |15.5, 15.7                 |
|[zlib](http://www.zlib.org)                          |All versions    |1.2.3, 1.2.5, 1.2.7, 1.2.8 |

The user is expected to download and build the 3<sup>rd</sup> party packages themselves. The release's package list includes links to download sites. However, the user still needs a list of the 3<sup>rd</sup> party packages and which versions of them are compatible with the release.


<a name="release_notes.Build"></a>

<span class="title">Build</span>
--------------------------------

For guidelines to configure, build and install the Toolkit see [here](https://ncbi.github.io/cxx-toolkit/pages/ch_config).

<a name="release_notes.New_Developments"></a>

<span class="title">New Developments</span>
-------------------------------------------

<a name="release_notes.release_notes_HIGHLIGHTS"></a>

### <span class="title">HIGHLIGHTS</span>



There have been significant additions and improvements in all parts of the Toolkit in the last few years. Here, only very few are listed, mostly related to major formal changes.

We started using C++11 specific features, so you will now need a C++11 compliant compiler to build the Toolkit.

We are in the process of dropping 32-bit support so while the Toolkit will still likely build (and even work) in 32-bit configurations... the 32-bit support is nominal, and will go away for good real soon now.

Because NCBI (as well as most other US Govt sites) require HTTPS nowadays so you need to build the Toolkit with SSL support (GnuTLS and related libraries) to be able to access NCBI services.

The embedded version of FreeTDS has been upgraded from 0.64 to 0.95.

The NCBI VDB package is not embedded into the Toolkit source tree anymore. Rather, it gets automatically retrieved from GitHub and built during the configuration stage.
<a name="release_notes.Documentation"></a>


<span class="title">Documentation</span>
----------------------------------------

<a name="release_notes.Location"></a>

### <span class="title">Location</span>

The documentation is available online as a searchable book "The NCBI C++ Toolkit": <https://ncbi.github.io/cxx-toolkit/>.


<a name="release_notes.Content"></a>

### <span class="title">Content</span>


A C/C++ Symbol Search query appears on each page of the online Toolkit documentation. You can use this to perform a symbol search on the up-to-date public or in-house versions using source browsers [LXR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime&d=), [Doxygen](https://www.ncbi.nlm.nih.gov/toolkit/?term=ctime) and [Library](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?symbol=CTime) - or do an [overall](https://www.ncbi.nlm.nih.gov/toolkitall?term=CTime) search.

Public assess to our SVN trunk:

-   For browsing: <https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++>

-   For retrieval: <https://anonsvn.ncbi.nlm.nih.gov/repos/v1/trunk/c++> (<span class="nctnt highlight">NOTE:</span> Some WebDAV clients may require dav:// instead of http://)

<a name="release_notes.Platforms_OSs__compi"></a>

<span class="title">Supported Platforms (OS's and Compilers)</span>
-------------------------------------------------------------------

-   [Unix](release_notes.html#release_notes.Unix)

-   [MS Windows](release_notes.html#release_notes.MS_Windows)

-   [Mac OS X](release_notes.html#release_notes.Mac_OS_X)

-   [Added](release_notes.html#release_notes.Added_Platforms)

-   [Discontinued](release_notes.html#release_notes.Discontinued)

This release was successfully tested on at least the following platforms (but may also work on other platforms). Since the previous release, some platforms were dropped from this list and some were added. Also, it can happen that some projects would not work (or even compile) in the absence of 3rd-party packages, or with older or newer versions of such packages. In these cases, just skipping such projects (e.g. using flag "<span class="nctnt ncbi-monospace">-k</span>" for <span class="nctnt ncbi-app"> make</span> on Unix), can get you through.

In cases where multiple compilers or versions are supported, the mainstream one is shown in **bold**.  Other versions might also work, but **must** support C++11; minimum versions are GCC 4.8.x, Clang 3.4.x, ICC 15.x, and MS VS 2013.

<a name="release_notes.Unix"></a>

### <span class="title">[Unix](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.UNIX)</span>


|Operating System                   |Architecture    |Compilers                    |
|-----------------------------------|----------------|-----------------------------|
|CentOS 6.x (LIBC 2.12)             |x86-64          |**GCC 4.9.3**, 4.8.1; ICC 15 |
|CentOS 7.x (LIBC 2.17)             |x86-64          |**GCC 4.9.3**; ICC 15        |
|Ubuntu 14.04 ("trusty") (LIBC 2.19)|x86-32<br/>x86-64|GCC 4.8.4                   |
|FreeBSD 10.2, 10.3                 |x86-64          |Clang 3.4.1                  |

<a name="release_notes.MS_Windows"></a>

### <span class="title">[MS Windows](ch_config#ch_config.MS_Windows)</span>


|Operating System          |Architecture                    |Compilers                      |
|--------------------------|--------------------------------|-------------------------------|
|MS Windows                |x86-32                          |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C_2008) 2013 (MSVC 12)<br/>  |
|MS Windows                |x86-64                          |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C_2008) 2013 (MSVC 12)<br/>  |
|MS Windows                |x86-32                          |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C_2008) 2015 (MSVC 14)<br/>  |
|MS Windows                |x86-64                          |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C_2008) 2015 (MSVC 14)<br/>  |
|Cygwin 1.7.34             |x86-64                          |[GCC 4.9.2](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Cygwin_GCC)- nominal support only. |

<a name="release_notes.Mac_OS_X"></a>

### <span class="title">[Mac OS X](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.Mac_OS_X)</span>


|Operating System              |Architecture|Compilers                             |
|------------------------------|------------|--------------------------------------|
|Mac OS X 10.9.x (Darwin 13.x) |x86-64      |**Apple Clang 6.0** (based on LLVM 3.5), [Xcode](ch_config#ch_config.Xcode_30__31) 6.2|
|Mac OS X 10.10.x (Darwin 14.x)|x86-64      |**Apple Clang 7.0.2**, Xcode 7.2.1    |
|Mac OS X 10.11.x (Darwin 15.x)|x86-64      |**Apple Clang 8.0.0**, Xcode 8.2.1    |

<a name="release_notes.Added_Platforms"></a>

### <span class="title">Added Platforms</span>


Official support for **all** of the above platforms is new in this release (though some may have worked unofficially).

<a name="release_notes.Discontinued"></a>

### <span class="title">Discontinued Platforms</span>


|Operating System            |Architecture                          |Compilers                           |
|----------------------------|--------------------------------------|------------------------------------|
|MS Windows                  |x86-32, 64                            |[MS Visual C++](https://ncbi.github.io/cxx-toolkit/pages/ch_config#ch_config.MS_Visual_C_2008) 2010 (MSVC 10)|
|CentOS 5.x                  |x86-32, 64                            |All                                 |
|Ubuntu 9.04 ("jaunty")      |x86-32, 64                            |All                                 |
|Solaris                     |All                                   |All                                 |
|FreeBSD 8.3                 |x86-32                                |All                                 |
|Mac OS X 10.8.x (Darwin 12.x) and below|All                        |All                                 |
|All                         |All                                   |GCC 4.7.x and below                 |
|All                         |All                                   |Clang 3.3.x and below               |
|CentOS 6.x                  |x86-32, 64                            |ICC 13.x and below                  |

<a name=""></a>

<span class="title">Last Updated</span>
---------------------------------------

This document was last updated on January 18, 2017.
