---
layout: default
title: Book Information
nav: pages/fm
---

{{ page.title }}
================

<a name="A2"></a>

Contributing Authors
--------------------

<a name="header_placeholder"></a>

###  

<a name="fm.T1"></a>


#### Table 1\. List of Contributors

| .    | **Full-time developers NOTE: This table is always a draft and virtually never up-to-date. Last updated: 19 Sep 2013**    |
|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Special thanks to Jim Ostell**           | **Established the biological and bibliographic data model supported by the C++ Toolkit. He also established the overall design, priorities, and goals for C++ Toolkit based on experience building and using the NCBI C Toolkit which preceeded it. He continues to cheer on the list of talented software developers and scientists below who are primarily responsible for making the C++ Toolkit a reality and for introducing most of its nicer features.**                |
| Denis Vakatov (since Oct 1998)             | Fathered the Toolkit. Coordinate all works on the portable (core, non-internal) projects of the Toolkit, participate in the design (and sometimes implementation details) and placement of most core APIs. Build system -- orig.author and eventual supporter. CORELIB -- orig.author of many modules and active supporter/developer. CGI -- orig.author of "CGI Request" and "CGI Application". DBAPI -- a massive code and API revision on incorporating DBAPI into the Toolkit (with the orig.author, V.Soussov); participate in the core (exception, diagnostic, driver manager) code support and development. CONNECT -- orig.author of the core, abstract connection(CONN) and portable socket(SOCK) APIs, and FW-daemon. GUI -- helped setup the project structure, namespace and common definitions. DOC -- "Reference Manual", "FAQ", mailing lists; snapshots, announcements. |
| Eugene Vasilchenko (Nov 1999 - Feb 2001) (Aug 2002 - current)      | CORELIB -- "CObject, CRef\<\>", multi-threading CGI -- orig.author of "CGI Response", "Fast-CGI module" HTML -- orig.author SERIAL -- orig.author DATATOOL -- orig.author OBJMGR -- long-time principal developer of the client-side "loader" code and "user" APIs      |
| Anton Lavrentiev (since Mar 2000)          | CONNECT -- *[principal developer]* author of "NCBI Services": network client API, load balancer, service mapper, dispatcher and launcher; daemons' installation, configuration and monitoring. CTOOLS -- *[principal developer]* connectivity with the NCBI C Toolkit. DOC -- documentation on all of the above Tune-up of online docs and source browsers.    |
| Aleksey Grichenko (since Jan 2001)         | ALNMGR, Sequence Mapping -- *[principal developer]*. CORELIB -- orig.author of the thread library. SERIAL, DATATOOL -- support and further development (not currently). OBJMGR -- client-side API and implementation (incl. LDS2 and CDD data loaders). Incorporation of MT-safety and "safe-static" features to all of the above. CGI framework -- *[principal developer]*.                  |
| Aaron Ucko (since Aug 2001)                | ID1\_FETCH -- *[principal developer]* developed from a test/demo application to a real client. UNIX Build System -- *[principal developer]*; active support and development of the Unix building framework. CORELIB -- generalized error handlers, implemented E-mail and CGI/HTML ones. UTIL,CONNECT -- blocking-queue; multi-threaded network server API. OBJECTS -- adding new functionality, QA'ing other people's additions. ALNMGR -- participated in the design. DBAPI -- *[principal developer]*. OS_Gateway (ID1/ID2 gateway) -- *[principal developer]*. Toolkit builds on Unix'es (internal) -- support of the building and installation framework.          |
| Andrei Gourianov (since Nov 2001)          | SERIAL -- designed and implemented XML and JSON serialization, enhanced ASN.1 serialization. DATATOOL -- added DTD/XML schema support for code generation and data conversion, added WSDL support for SOAP client code generation. CORELIB -- revamped the exception API, added UNICODE/UTF8 support, enhanced command line argument parsing and support. PROJECT TREE BUILDER -- project configuration and solution generation tool -- added support for Microsoft Build Engine and for Xcode build system, implemented generation of flat makefiles on Unix platforms, created Java-based Configuration GUI. JsonWrapp -- designed and implemented. NETCACHE --  enhanced existing and added new functionality.              |
| Vladimir Ivanov (since Apr 2001)           | CORELIB, UTIL -- porting of some very platform-dependent extensions. Tune-up of online docs and source browsers. Stable Components source merging. Internal 3rd-party installations for Windows.        |
| David McElhany (since Jan 2009)            | DOC -- Toolkit book, test and demo apps. NAMERD/LINKERD load-balancing client implementation.      |
| Victoria Serova (since Dec 2005)           | DOC -- Toolkit book       |
| Diane Zimmerman (2000 only)                | DOC -- "Programming Manual"                  |
| Chris Lanczycki (summer 2002 only)         | DOC -- major reorganization of the docs structure and appearance                   |
| .    | Major contributors        |
| Anton Butanaev          | OBJMGR -- helped to implement ID1 loader DBAPI (in progress) -- driver for MySQL   |
| Cliff Clausen           | OBJECTS -- ported various bio-sequence related code and utilities (from C Toolkit) |
| Mike DiCuccio, Anatoliy Kuznetsov           | GBENCH -- (in progress) extendable C++ wxWidgets/OpenGL based GUI tool for the retrieval, visualization, analysis, editing, and submitting of biological sequences  |
| Jonathan Kans           | OBJECTS -- helped port seq. validator (from C Toolkit). Provide MAC platform support. Contributed code (which sometimes other people ported) for fast sequence alphabet conversion and for translation of coding regions. Also writing the 5-column feature table reader.        |
| Michael Kholodov        | DBAPI -- author of the "user-level" database API based on Vladimir Soussov's portable "driver-level" API. SERIAL, DATATOOL -- provided eventual support of (in the beginning of 2001)                |
| Michael Kimelman        | OBJMGR (in progress) -- server-side API and implementation, client-side loader (both generic and its implementation for ID)                 |
| Vladimir Lebedev        | GUI\_SEQ -- the first FLTK/OpenGL based GUI widgets for bio-seq visualization Provide MAC platform support.              |
| Peter Meric             | GBENCH (in progress) -- extendable C++ FLTK/OpenGL based GUI tool for the retrieval, visualization, analysis, editing, and submitting of biological sequences and maps (eg. MapViewer data)          |
| Vsevolod Sandomirskiy   | CORELIB, CGI -- draft-authored some application- and context- classes              |
| Victor Sapojnikov       | DBAPI -- participated in the implementation of the Microsoft DBLIB driver on Windows; (in progress) multiplatform "network bridge" driver   |
| Vladimir Soussov        | DBAPI -- *[principal developer]* author of the portable DB driver API and its implemementations for CTLIB(Sybase for Unix and Windows), DBLIB (Sybase and Microsoft), FreeTDS and ODBC               |
| Kamen Todorov           | ALNMGR -- library to deal with bio-sequence alignments (original developer)         |
| Paul Thiessen           | APP/CN3D -- Cn3D: graphical protein and alignment viewing, editing, and annotation. ALGO/STRUCTURE/STRUCT\_DP -- Block-based dynamic programming sequence alignments. OBJTOOLS/CDDALIGNVIEW -- HTML sequence alignment displays.           |
| Charlie (Chunlei) Liu, Chris Lanczycki     | ALGO/STRUCTURE/CD\_UTILS -- These contain numerous algorithms used by the structure group and the CDD project.           |
| Thomas Madden, Christiam Camacho, George Coulouris, Ning Ma, Vahram Avagyan, Jian Ye | BLAST -- Basic Local Alignment Search Tool   |
| Greg Boratyn, Richa Agarwala               | COBALT -- Constraint Based Alignment Tool    |
| Jonathan Kans           | 5-column feature table reader; Defline generator function; GenBank flatfile generator; Basic and Extended sequence cleanup; Sequence record validator; Alignment readers; Various format readers (e.g., BED, WIGGLE)    |

<div class="table-scroll"></div>

<a name="A3"></a>

License
-------

DISCLAIMER: This (book-located) copy of the license may be out-of-date - please see the up-to-date version at: <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/doc/public/LICENSE>

    CONTENTS

    Public Domain Notice
    Exceptions (for bundled 3rd-party code)
    Copyright F.A.Q.



    ==============================================================
    PUBLIC DOMAIN NOTICE
    National Center for Biotechnology Information

    With the exception of certain third-party files summarized below, this
    software is a "United States Government Work" under the terms of the
    United States Copyright Act.  It was written as part of the authors'
    official duties as United States Government employees and thus cannot
    be copyrighted.  This software is freely available to the public for
    use. The National Library of Medicine and the U.S. Government have not
    placed any restriction on its use or reproduction.

    Although all reasonable efforts have been taken to ensure the accuracy
    and reliability of the software and data, the NLM and the U.S.
    Government do not and cannot warrant the performance or results that
    may be obtained by using this software or data. The NLM and the U.S.
    Government disclaim all warranties, express or implied, including
    warranties of performance, merchantability or fitness for any
    particular purpose.

    Please cite the authors in any work or product based on this material.



    ==============================================================
    EXCEPTIONS (in all cases excluding NCBI-written makefiles):


    Location: configure
    Authors:  Free Software Foundation, Inc.
    License:  Unrestricted; at top of file

    Location: config.guess, config.sub
    Authors:  FSF
    License:  Unrestricted when distributed with the Toolkit;
    standalone, GNU General Public License [gpl.txt]

    Location: {src,include}/dbapi/driver/ftds*/freetds
    Authors:  See src/dbapi/driver/ftds*/freetds/AUTHORS
    License:  GNU Library/Lesser General Public License
    [src/dbapi/driver/ftds*/freetds/COPYING.LIB]

    Location: include/dbapi/driver/odbc/unix_odbc
    Authors:  Peter Harvey and Nick Gorham
    License:  GNU LGPL

    Location: {src,include}/gui/widgets/FLU
    Authors:  Jason Bryan
    License:  GNU LGPL

    Location: {src,include}/gui/widgets/Fl_Table
    Authors:  Greg Ercolano
    License:  GNU LGPL

    Location: include/util/bitset
    Author:   Anatoliy Kuznetsov
    License:  MIT [include/util/bitset/license.txt]

    Location: {src,include}/util/compress/bzip2
    Author:   Julian R Seward
    License:  BSDish [src/util/compress/bzip2/LICENSE]

    Location: {src,include}/util/compress/zlib
    Authors:  Jean-loup Gailly and Mark Adler
    License:  BSDish [include/util/compress/zlib/zlib.h]

    Location: {src,include}/util/regexp
    Author:   Philip Hazel
    License:  BSDish [src/util/regexp/doc/LICENCE]

    Location: {src,include}/misc/xmlwrapp
    Author:   Peter J Jones at al. [src/misc/xmlwrapp/AUTHORS]
    License:  BSDish [src/misc/xmlwrapp/LICENSE]



    ==============================================================
    Copyright F.A.Q.


    --------------------------------------------------------------
    Q. Our product makes use of the NCBI source code, and we did changes
    and additions to that version of the NCBI code to better fit it to
    our needs. Can we copyright the code, and how?

    A. You can copyright only the *changes* or the *additions* you made to the
    NCBI source code. You should identify unambiguously those sections of
    the code that were modified, e.g. by commenting any changes you made
    in the code you distribute. Therefore, your license has to make clear
    to users that your product is a combination of code that is public domain
    within the U.S. (but may be subject to copyright by the U.S. in foreign
    countries) and code that has been created or modified by you.


    --------------------------------------------------------------
    Q. Can we (re)license all or part of the NCBI source code?

    A. No, you cannot license or relicense the source code written by NCBI
    since you cannot claim any copyright in the software that was developed
    at NCBI as a 'government work' and consequently is in the public domain
    within the U.S.


    --------------------------------------------------------------
    Q. What if these copyright guidelines are not clear enough or are not
    applicable to my particular case?

    A. Contact us. Send your questions to 'toolbox@ncbi.nlm.nih.gov'.
            


