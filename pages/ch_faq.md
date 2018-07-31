---
layout: default
title: FAQs, Useful Documentation Links, and Mailing Lists
nav: pages/ch_faq
---


{{ page.title }}
======================================================================

## Introduction

This chapter contains frequently asked questions and useful links.

## Chapter Outline

-   [FAQs](#ch_faq.)

    -   [Security](#ch_faq.Security)

        -   [How do I prevent SQL Injection attacks?](#ch_faq.How_do_I_prevent_SQL_Injection_at)

        -   [How do I prevent Cross-Site Scripting (XSS) attacks?](#ch_faq.How_do_I_prevent_CrossSite_Script)

    -   [General](#ch_faq.general)

        -   [How do I prepare my development environment for using the C++ Toolkit?](#ch_faq.How_do_I_prepare_my_development_e)

        -   [The GetTypeInfo() method is not declared or defined in any of the objects for which it is part of the interface?](#ch_faq.faq.CannotFindGetTypeInfo)

        -   [Which include file should be used in \*.cpp files, class.hpp or class\_.hpp?](#ch_faq.ref_WhichIncludeFile)

        -   [How can I disable the XML declaration or DOCTYPE with the serial library?](#ch_faq.How_can_I_disable_the_XML_declara)

	    -   [How can I import just one project from the source tree (a library), add a sibling application project that will depend on that library project, and have the ability to build both from the common parent node?](#ch_faq.How_can_I_import_just_one_project)

    -   [Compiling](#ch_faq.Compiling)

        -   [How do I compile for 32-bit on a 64-bit machine in a typical C++ Toolkit app?](#ch_faq.How_do_I_compile_for_32bit_on_a_6)

        -   [Which Visual C++ project should I build?](#ch_faq.Which_Visual_C_project_should_I_b)

        -   [What compiler options are required to be compatible with C++ Toolkit libraries?](#ch_faq.What_compiler_options_are_require)

            -   [Checked iterators](#ch_faq.Checked_iterators)

            -   [C++ exceptions](#ch_faq.C_exceptions)

            -   [Runtime library](#ch_faq.Runtime_library)

    -   [Linking](#ch_faq.linker)

        -   [How does one find the libraries to link when the linker complains of undefined symbols?](#ch_faq.faq.CannotFindObjectSymbol)

        -   [How do I add a library to a Visual C++ project?](#ch_faq.How_do_I_add_a_library_to_a_Visua)

        -   [Linker complains it "cannot find symbol" in something like: "SunWS\_cache/CC\_obj\_b/bXmZkg3zX5VBJvYgjABX.o"](#ch_faq.ref_CannotFindSymbol)

        -   [MAKE complains it does not know "how to make target: /home/qqq/c++/WorkShop6-Debug/lib/.seqset.dep"](#ch_faq.ref_HowMakeDep)

        -   [Still getting bizarre errors with unresolved symbols, unfound libraries, etc., and nothing seems to help out much](#ch_faq.ref_LastResort)

    -   [Debugging](#ch_faq.debugger)

        -   [Debugger (DBX) warns it "cannot find file /home/coremake/c++/foobar.cpp", then it does not show source code](#ch_faq.ref_DBX_Sources)

    -   [ASN](#ch_faq.asn)

        -   [Creating an out-of-tree application that uses your own local ASN.1 spec and a pre-built C++ Toolkit](#ch_faq.ref_AddingUserASN)

        -   [How to add new ASN.1 module from the C Toolkit to the C++ Toolkit?](#ch_faq.ref_AddingASN)

        -   [Converting ASN.1 object in memory from C to C++ representation (or vice versa)](#ch_faq.ref_CToCxxASN)

-   [Useful Documentation Links](#ch_faq.links.html)

-   [Mailing Lists](#ch_faq.mailing_lists)

<a name="ch_faq."></a>

FAQs
----

<a name="ch_faq.Security"></a>

### Security

Following are some of the common questions regarding security. If you have a different question, or if these questions don't fully address your concern, please email your question to <span class="oem_span">jww4jvylGujip5ust5upo5nv/</span>.

-   [How do I prevent SQL Injection attacks?](#ch_faq.How_do_I_prevent_SQL_Injection_at)

-   [How do I prevent Cross-Site Scripting (XSS) attacks?](#ch_faq.How_do_I_prevent_CrossSite_Script)

<a name="ch_faq.How_do_I_prevent_SQL_Injection_at"></a>

#### How do I prevent SQL Injection attacks?

Summary:

1.  No SQL EVER passed in by a user is allowed.

2.  Use stored procedures whenever possible.

3.  If stored procedures are not possible, and if the SQL statement needs to be constructed from user input, use parameterized SQL whenever possible.

4.  If constructing dynamic SQL from user input is unavoidable, you MUST sanitize the user input.

Please see the NCBI document "[SQL Security and Hygiene](https://sp.ncbi.nlm.nih.gov/IEB/ISS/dbas/Shared%20Documents/SQL%20Security%20and%20Hygiene.doc)" for more details.

Sample code is also available for [SDBAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/) and [DBAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/).

For more information on using a database from your application, see the "[Database Access](ch_dbapi.html)" chapter of the C++ Toolkit book.

<a name="ch_faq.How_do_I_prevent_CrossSite_Script"></a>

#### How do I prevent Cross-Site Scripting (XSS) attacks?

NEVER trust user-supplied strings - always sanitize them before using them.

<a name="ch_faq.T.nc_before_including_a_usersuppl"></a>

| Before including a user-supplied string in: | Sanitize the string with:      |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| a URL   | ***[NStr::URLEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=URLEncode)***   |
| JavaScript    | ***[NStr::JavaScriptEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=JavaScriptEncode)*** |
| XML     | ***[NStr::XmlEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=XmlEncode)***   |
| HTML    | ***[NStr::HtmlEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HtmlEncode)*** |
| JSON    | ***[NStr::JsonEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=JsonEncode)*** |
| SQL     | ***[NStr::SQLEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SQLEncode)***   |

<div class="table-scroll"></div>

***Note:*** In addition to sanitizing URLs with [NStr::URLEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=URLEncode), the [CUrl](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCUrl.html) class can be used to take apart and reassemble a URL. If the original URL was malformed an error would be produced. At the very least, improper URL segments would be mangled.

<a name="ch_faq.general"></a>

### General

<a name="ch_faq.How_do_I_prepare_my_development_e"></a>

#### How do I prepare my development environment for using the C++ Toolkit?

That depends on your development environment and whether you are inside or outside of NCBI:

-   [Unix or Mac OS X inside NCBI](#ch_faq.Unix_or_Mac_OS_X_inside_NCBI)

-   [Unix or Mac OX X outside NCBI](#ch_faq.Unix_or_Mac_OX_X_outside_NCBI)

-   [Windows inside NCBI](#ch_faq.Windows_inside_NCBI)

-   [Windows outside NCBI](#ch_faq.Windows_outside_NCBI)

<a name="ch_faq.Unix_or_Mac_OS_X_inside_NCBI"></a>

##### Unix or Mac OS X inside NCBI

All developer Unix accounts should be automatically prepared for using the C++ Toolkit. You should have a `~/.ncbi_hints` file with a non-trivial `facilities` line that will be sourced when logging in. If everything is set up properly, the following commands should provide meaningful output:

    svn --version
    new_project
    echo $NCBI

<a name="ch_faq.Unix_or_Mac_OX_X_outside_NCBI"></a>

##### Unix or Mac OX X outside NCBI

After [downloading the Toolkit source](ch_getcode_svn.html#ch_getcode_svn.ftp_download), set environment variable **`NCBI`** to `<toolkit_root>` (where `<toolkit_root>` is the top-level directory containing `configure`) and add `$NCBI/scripts/common` to your **`PATH`**.

Once the Toolkit is [configured and built](ch_config.html#ch_config.UNIX), then you can use it.

<a name="ch_faq.Windows_inside_NCBI"></a>

##### Windows inside NCBI

A [supported version of MSVC](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/public_releases/release_notes.html#release_notes.Platforms_OSs__compi) must be installed.

A Subversion client must be installed. Normally, the systems team installs Subversion clients on new PCs and updates the client for everyone at the same time. Therefore, your PC should have a suitable Subversion client installed. To make sure that your client is working properly, enter `svn --version` in your `cmd.exe` shell. If this doesn't work, email <span class="oem_span">wj5z2z-ltzGujip5ust5upo5nv/</span>.

Your `PATH` should include `\\snowman\win-coremake\Scripts\bin`.

If you want to step into the source for the C++ Toolkit libraries while debugging, then drive `S:` must be mapped to `\\snowman\win-coremake\Lib`. You can map it or let the `new_project` script map it for you.

<a name="ch_faq.Windows_outside_NCBI"></a>

##### Windows outside NCBI

A [supported version of MSVC](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/public_releases/release_notes.html#release_notes.Platforms_OSs__compi) must be installed.

[Download the Toolkit source](ch_getcode_svn.html#ch_getcode_svn.ftp_download).

Once the Toolkit is [configured and built](ch_config.html#ch_config.MS_Windows), then you can use it.

<a name="ch_faq.faq.CannotFindGetTypeInfo"></a>

#### The [GetTypeInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetTypeInfo) method is not declared or defined in any of the objects for which it is part of the interface

The macro DECLARE\_INTERNAL\_TYPE\_INFO() is used in the `*.hpp` files to declare the [GetTypeInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetTypeInfo). There are several macros that are used to implement [GetTypeInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetTypeInfo) methods in `*.cpp` files. These macros are generally named and used as follows:

    BEGIN_*_INFO(...)
    {
        ADD_*(...)
        ...
    }

See [User-defined Type Information in the Programming Manual](ch_ser.html#ch_ser.usrtypeinfo.html) for more information.

<a name="ch_faq.ref_WhichIncludeFile"></a>

#### Which include file should be used in \*.cpp files, class.hpp or class\_.hpp?

Include the **class**.hpp (file without underscore). Never instantiate or use a class of the form C\*\_Base directly. Instead use the C\* form which inherits from the C\*\_Base class (e.g., don't use CSeq\_id\_Base directly -- use CSeq\_id instead).

<a name="ch_faq.How_can_I_disable_the_XML_declara"></a>

#### How can I disable the XML declaration or DOCTYPE with the serial library?

Here's a code snippet that shows all combinations:

    // serialize XML with both an XML declaration and with a DOCTYPE (default)
    ostr << MSerial_Xml << obj;

    // serialize XML without an XML declaration
    ostr << MSerial_Xml(fSerial_Xml_NoXmlDecl) << obj;

    // serialize XML without a DOCTYPE
    ostr << MSerial_Xml(fSerial_Xml_NoRefDTD) << obj;

    // serialize XML without either an XML declaration or a DOCTYPE
    ostr << MSerial_Xml(fSerial_Xml_NoXmlDecl | fSerial_Xml_NoRefDTD) << obj;

***Note:*** The serial library can read XML whether or not it contains the XML declaration or DOCTYPE without using special flags. For example:

    istr >> MSerial_Xml >> obj;

<a name="ch_faq.How_can_I_import_just_one_project"></a>

#### How can I import just one project from the source tree (a library), add a sibling application project that will depend on that library project, and have the ability to build both from the common parent node?

If the application is already present in the C++ Toolkit, just in the `internal` subtree whereas the library is public, you can import the library via [`import_project -topdir trunk/internal/c++ ...`](ch_proj#ch_proj.work_sub_tree) so that both projects will wind up in a single tree, then import the application normally, and finally run

    import_project -topdir trunk/internal/c++ -nocheckout .

to produce a `Makefile.flat` covering both projects.

You can use a similar approach if there's no public/internal mismatch, just without `-topdir`.

If the application is entirely absent from the C++ Toolkit, you can place its code alongside the library along with a suitable [`Makefile.*.app`](ch_proj#ch_proj.make_proj_app), list it in [`Makefile.in`](ch_proj#ch_proj.meta_makefiles), and rerun `import_project` with the `-nocheckout` flag to (re)generate appropriate wrapper makefiles.

<a name="ch_faq.Compiling"></a>

### Compiling

<a name="ch_faq.How_do_I_compile_for_32bit_on_a_6"></a>

#### How do I compile for 32-bit on a 64-bit machine in a typical C++ Toolkit app?

Our 64-bit Linux systems only support building 64-bit code; to produce 32-bit binaries, you'll need a 32-bit system.

<a name="ch_faq.Which_Visual_C_project_should_I_b"></a>

#### Which Visual C++ project should I build?

After creating a new project, you may notice quite a few projects appear in the solution, besides your program. Do not build any of these projects or the solution as a whole. Instead, set your program as the default startup project and build it.

You can build **-CONFIGURE-DIALOG-** if you need to reconfigure your project (see the section on [using the configuration GUI](ch_config.html#ch_config.Configuring_with_the_Java_GUI)), and you will need to build **-CONFIGURE-** if you add libraries (see the question below on [adding a library to a Visual C++ project](#ch_faq.How_do_I_add_a_library_to_a_Visua)).

<a name="ch_faq.What_compiler_options_are_require"></a>

#### What compiler options are required to be compatible with C++ Toolkit libraries?

These compiler options must be properly set under Microsoft Visual C++:

-   [C++ exceptions](#ch_faq.C_exceptions)

-   [Runtime library](#ch_faq.Runtime_library)

<a name="ch_faq.C_exceptions"></a>

##### C++ exceptions

NCBI C++ Toolkit libraries use the `/EHsc` compiler option with Visual C++ to:

-   ensure that C++ objects that will go out of scope as a result of the exception are destroyed;

-   ensure that only C++ exceptions should be caught; and

-   assume that extern C functions never throw a C++ exception.

For more information, see the MSDN [page](http://msdn.microsoft.com/en-us/library/1deeycx5.aspx) on `/EH`.

<a name="ch_faq.Runtime_library"></a>

##### Runtime library

You must specify the appropriate Visual C++ runtime library to link with:

<a name="ch_faq.T.nc_configurationcompiler_option"></a>

| Configuration | Compiler Option |
|---------------|-----------------|
| DebugDLL      | `/MDd`    |
| DebugMT | `/MTd`    |
| ReleaseDLL    | `/MD`     |
| ReleaseMT     | `/MT`     |

<div class="table-scroll"></div>

For more information, see the MSDN [page](http://msdn.microsoft.com/en-us/library/2kzt1wy3.aspx) on runtime library options.

<a name="ch_faq.linker"></a>

### Linking

<a name="ch_faq.faq.CannotFindObjectSymbol"></a>

#### How does one find the libraries to link when the linker complains of undefined symbols?

Two tools are available to resolve the common linking questions:

<a name="ch_faq.T.nc_questiontoolwhich_libraries_"></a>

| Question    | Tool                  |
|-------------|-----------------------|
| Which libraries contain a given symbol?   | [Library search](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?public=yes) |
| Which other libraries does a given library depend on? | [Library dependencies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/dglistdeps.cgi)      |

<div class="table-scroll"></div>

For example, suppose the linker complains about the symbol ***ncbi::CIStreamBuffer::FindChar(char)*** being undefined. Here is how to use these tools to resolve this problem:

1.  To find the library(s) where the unresolved symbol is defined, use the [Library search](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?public=yes) tool:<br/><br/>Using the example above, enter `FindChar` as a search term. The library where this symbol is defined is [libxutil.a (ncbi\_core)](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/xutil.html).<br/><br/>Now that you have the library that defines the symbol, you can proceed to find the library dependencies it introduces. ***Note:*** The simplest way to do this is by just clicking on the library in the search results to show its dependencies. Alternatively, you can proceed to step 2.<br/>

2.  The [Library dependencies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/dglistdeps.cgi) tool finds all the other libraries that a given library depends on. This tool can also help you create the `LIB` and `LIBS` lines in your makefile. For example, enter your current `LIB` and `LIBS` lines plus the new library from step 1, and it will generate optimized `LIB` and `LIBS` lines containing the library needed for your symbol and any other needed libraries.<br/><br/>Continuing with the example above, entering `libxutil.a` (or just `xutil`) will create this result:<br/><br/>`LIB  = `[xutil](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/xutil.html) [xncbi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/xncbi.html)<br/>`LIBS = $(ORIG_LIBS)`<br/><br/>Clicking on any of the links will show the required items for that link plus a dependency graph for the clicked item. The nodes in the diagram are also navigable.

***Note:*** If you are using Visual C++, please also see the question about [adding libraries to Visual C++ projects](#ch_faq.How_do_I_add_a_library_to_a_Visua).

To make it easier to work with the NCBI C++ Toolkit's many libraries, we have generated illustrations of their dependency relationships, available for various scopes and in various formats:

<a name="ch_faq.lib_depgraph"></a>

NCBI C++ Library Dependency Graphs (including internal libraries)

|   | GIF                   | PNG     | PDF     | PostScript          | Text    |
|---|-----------------------|---------|---------|------------------------------|
| All libraries   |   |        | [PDF](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/depgraph-full.pdf) | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-full.ps) | [TXT](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/depgraph-full.txt) |
| Just C++ Toolkit libraries  |   |        | [PDF](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/depgraph-c++.pdf)  | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-c++.ps)  |        |
| Highly connected or otherwise noteworthy public libraries | [GIF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.gif) | [PNG](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/depgraph-core.png) | [PDF](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/depgraphs/depgraph-core.pdf) | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.ps) |        |

<div class="table-scroll"></div>

<a name="ch_faq.T4"></a>

NCBI C++ Library Dependency Graphs (public libraries only)

|   | GIF                   | PNG                   | PDF        | PostScript                  | Text |
|---|-----------------------|-----------------------|------------|-----------------------------|------|
| All libraries   |   |   | [PDF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-public.pdf) | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-public.ps) | [TXT](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-public.txt) |
| Non-GUI libraries     |   |   | [PDF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-public-nogui.pdf) | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-public-nogui.ps) |     |
| GUI libraries   | [GIF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-gui.gif)  | [PNG](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-gui.png)  | [PDF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-gui.pdf)    | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-gui.ps)    |     |
| Highly connected or otherwise noteworthy public libraries | [GIF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.gif) | [PNG](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.png) | [PDF](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.pdf)   | [PS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/depgraph-core.ps)   |     |

<div class="table-scroll"></div>

In cases where the above methods do not work, you can also search manually using the following steps:

1.  Look for the source file that defines the symbol. This can be done by going to the [LXR source browser](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDate) and doing an identifier search on the symbol (e.g., [CDate](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDate&d=) or [XmlEncode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=XmlEncode&d=)). Look for a source file where the identifier is defined (e.g. in the "Defined as a class in" section for [CDate](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDate), or in the "Defined as a function in" section for [XmlEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=XmlEncode)). For serializable object classes (such as [CDate](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDate)) look for the base class definition. Follow a link to this source file.

2.  Near the top of the LXR page for the source file is a path, and each component of the path links to another LXR page. Click the link to the last directory.

3.  The resulting LXR page for the directory should list the makefile for the library of interest (e.g. `Makefile.general.lib` for [CDate](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDate) or `Makefile.corelib.lib` for [XmlEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=XmlEncode)). Click on the link to the makefile. You should see the LIB line with the name of the library that contains your symbol.

4.  Add the library name to the list of libraries you already have and enter them into the [library dependencies tool](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/depgraphs/dglistdeps.cgi) to create your final LIB and LIBS lines.

In some cases, the library name is a variant on the subdirectory name. These variants are summarized in [Table 1](#ch_faq.T1).

<a name="ch_faq.T1"></a>

Table 1. Examples where the library name is a variant on the sub directory name

| Directory      | Library    |
|----------------|------------|
| corelib/test   | test\_mt   |
| corelib        | xncbi      |
| ctools/asn     | xasn |
| cgi            | xcgi or xfcgi    |
| connect        | xconnect   |
| connect/test   | xconntest  |
| ctools         | xctools    |
| html           | xhtml      |
| objects/mmdb{1,2,3}  | mmdb (consolidated)    |
| objects/seq{,align,block,feat,loc,res} | seq (consolidated) or $(SEQ\_LIBS) |
| objmgr         | xobjmgr    |
| objmgr/util    | xobjutil   |
| objtools/alnmgr      | xalnmgr    |
| serial         | xser       |
| util           | xutil      |

<div class="table-scroll"></div>

Most often, difficulties arise when one is linking an application using the numerous `"objects/"` libraries. To give you some relief, here are some examples involving such libraries. They show the right order of libraries, as well as which libraries you may actually need. Using this as a starting point, it's **much** easier to find the right combination of libraries:

-   first, to find and add missing libraries using the generic technique described above

-   then, try to throw out libraries which you believe are not actually needed

<!-- -->

    LIB = id1 seqset $(SEQ_LIBS) pub medline biblio general \ 
          xser xconnect xutil xncbi 
    LIB = ncbimime cdd cn3d mmdb scoremat seqset $(SEQ_LIBS) \ 
          pub medline biblio general xser xutil xncbi

<a name="ch_faq.How_do_I_add_a_library_to_a_Visua"></a>

#### How do I add a library to a Visual C++ project?

If you are using Visual C++, you should [add the appropriate LIB and LIBS lines](#ch_faq.faq.CannotFindObjectSymbol) to the `Makefile.<your_project>.app` file located in the source directory, then build the **-CONFIGURE-** target, then close and reopen the solution. This process will update the project properties with the proper search directories and required libraries.

<a name="ch_faq.ref_CannotFindSymbol"></a>

#### Linker complains it "cannot find symbol" in something like: "SunWS\_cache/CC\_obj\_b/bXmZkg3zX5VBJvYgjABX.o"

Go to the relevant build dir, clean and rebuild everything using:

    cd /home/qqq/c++/WorkShop6-Debug/build/FooBar 
    make purge_r all_r

<a name="ch_faq.ref_HowMakeDep"></a>

#### MAKE complains it does not know "how to make target: /home/qqq/c++/WorkShop6-Debug/lib/.seqset.dep"

This means that the "`libseqset.a`" library is not built. To build it:

    cd /home/qqq/c++/WorkShop6-Debug/build/objects/seqset 
    make

<a name="ch_faq.ref_LastResort"></a>

#### Still getting bizarre errors with unresolved symbols, unfound libraries, etc., and nothing seems to help out much

As the last resort, try to CVS update, reconfigure, clean and rebuild everything:

    cd /home/qqq/c++/ 
    cvs -q upd -d 
    compilers/WorkShop6.sh 32 ........ 
    make purge_r 
    make all_r

<a name="ch_faq.debugger"></a>

### Debugging

<a name="ch_faq.ref_DBX_Sources"></a>

#### Debugger (DBX) warns it "cannot find file /home/coremake/c++/foobar.cpp", then it does not show source code

This happens when you link to the public C++ Toolkit libraries (from `"$NCBI/c++/*/lib/"`), which are built on other hosts and thus hard-coded with the source paths on these other hosts. All you have to do is to point DBX to the public sources (at `"$NCBI/c++"`) by just adding to your DBX resource file (`~/.dbxrc`) the following lines:

    pathmap /home/coremake/c++ /netopt/ncbi_tools/c++ 
    pathmap /home/coremake/c++2 /netopt/ncbi_tools/c++ 
    pathmap /home/coremake/c++3 /netopt/ncbi_tools/c++ 
    pathmap /j/coremake/c++ /netopt/ncbi_tools/c++ 
    pathmap /j/coremake/c++2 /netopt/ncbi_tools/c++ 
    pathmap /j/coremake/c++3 /netopt/ncbi_tools/c++

<a name="ch_faq.asn"></a>

### ASN

<a name="ch_faq.ref_AddingUserASN"></a>

#### Creating an out-of-tree application that uses your own local ASN.1 spec and a pre-built C++ Toolkit

Lets say you have your ASN.1 specification (call it `foo.asn`) and now you want to build an application (call its source code `foo_main.cpp`) which performs serialization of objects described in `foo.asn`. To complicate things, lets also assume that your ASN.1 spec depends on (imports) one of the ASN.1 specs already in the C++ Toolkit, like `Date` described in the `NCBI-General` module of `general.asn`. For example, your `foo.asn` could look like:

    NCBI-Foo DEFINITIONS ::= 
    BEGIN 
    EXPORTS Foo; 
    IMPORTS Date FROM NCBI-General; 
    Foo ::= SEQUENCE { 
        str  VisibleString, 
        date Date 
    } 
    END

Now, lets assume that the pre-built version of the NCBI C++ Toolkit is available at `$NCBI/c++`, and that you want to use the Toolkit's pre-built sources and libraries in your application. First, generate (using [datatool](ch_app.html#ch_app.datatool)) the serialization sources, and create the serialization library:

    ## Create new project directory, with a model makefile for your
    ## local ASN.1 serialization library, and copy "foo.asn"
    cd ~/tmp
    new_project foo lib/asn
    cd foo 
    cp /bar/bar/bar/foo.asn .

    ## Using DATATOOL, generate data serialization sources for your
    ## ASN.1 specs described in "foo.asn":
    datatool -oR $NCBI/c++ -m foo.asn \
     -M "objects/general/general.asn" -oA -oc foo -opc . -oph .

    ## Adjust in the library makefile "Makefile.foo.lib"
    SRC = foo__ foo___

    ## Build the library
    make -f Makefile.foo_lib

Then, create and build the application:

    ## Create new application project, and copy your app sources.
    new_project foo_main app
    cd foo_main
    cp /bar/bar/bar/foo_main.cpp .

    ## Adjust the application makefile "Makefile.foo_main.app"
    PRE_LIBS = -L.. -lfoo
    CPPFLAGS = -I.. $(ORIG_CPPFLAGS)
    LIB = general xser xutil xncbi

    ## Build the application
    make -f Makefile.foo_main_app

<a name="ch_faq.ref_AddingASN"></a>

#### How to add new ASN.1 specification to the C++ Toolkit?

***Caution!*** If you are not in the C++ core developers group, please do not do it yourself! -- instead, just send your request to `cpp-core@ncbi.nlm.nih.gov`.

<a name="ch_faq.ref_CToCxxASN"></a>

#### Converting ASN.1 object in memory from C to C++ representation (or vice versa)

The C++ Toolkit header [ctools/asn\_converter.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/ctools/asn_converter.hpp) now provides a template class ([CAsnConverter\<\>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CAsnConverter&d=C)) for this exact purpose.

<a name="ch_faq.links.html"></a>

Useful Documentation Links
--------------------------

-   [[Doc] ISO/ANSI C++ Draft Standard Working Papers (Intranet only)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1905.pdf)

-   [[Doc] MSDN Online Search](http://search.microsoft.com/?mkt=en-US)

-   [[Literature] Books and links to C++ and STL manuals](appendix.html)

-   [[Example] NCBI C++ makefile hierarchy for project "corelib/"](ch_proj.html#ch_proj.makefile_hierarchy)

-   [[Chart] NCBI C++ source tree hierarchy](ch_start.html#ch_start.F1)

-   [[Chart] NCBI C++ build tree hierarchy](ch_start.html#ch_start.F2)

-   [[Chart] NCBI C++ Library Dependency graph](#ch_faq.lib_depgraph)

-   [[Doc] NCBI IDX Database Documentation (Intranet only)](https://sp.ncbi.nlm.nih.gov/IEB/pss/idxapi/Shared%20Documents/Forms/AllItems.aspx)

-   [[Doc] Documentation styles](ch_style.html)

<a name="ch_faq.mailing_lists"></a>

Mailing Lists
-------------

-   Announcements: <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp-announce> (read-only)

-   Everybody: <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp>

-   Documentation questions: <a href="mailto:cpp-doc@ncbi.nlm.nih.gov?Subject=Question%20about%20C++Toolkit%20Book" target="_top">cpp-doc@ncbi.nlm.nih.gov</a>

-   Core developers: <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp-core>

-   Object Manager: <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp-objmgr>

-   SVN and CVS logs: <https://www.ncbi.nlm.nih.gov/mailman/listinfo/cpp-cvs> (read-only)

[Internal mailing lists](https://confluence.ncbi.nlm.nih.gov/display/CT/Internal+Mailing+Lists) are also available to those inside NCBI.


