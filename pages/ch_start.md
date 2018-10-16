---
layout: default
title: Getting Started
nav: pages/ch_start
---


{{ page.title }}
=================================

Overview
--------

The overview for this chapter consists of the following topics:

-   Introduction

-   Chapter Outline

### Introduction

This section is intended as a bird's-eye view of the Toolkit for new users, and to give quick access to important reference links for experienced users. It lays out the general roadmap of tasks required to get going, giving links to take the reader to detailed discussions and supplying a number of simple, concrete test applications.

***Note:*** Much of this material is platform-neutral, although the discussion is platform-centric. Users would also benefit from reading the instructions specific to those systems and, where applicable, how to use Subversion (SVN) with [MS Windows](ch_getcode_svn.html#ch_getcode_svn.windows) and [Mac OS](ch_getcode_svn.html#ch_getcode_svn.mac).

### Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [Quick Start](#ch_start.quick_start)

-   [Example Applications](#ch_start.example_apps)

-   [Example Libraries](#ch_start.Example_Libraries)

-   [Source Tree Availability](#ch_start.source_avail)

    -   [FTP Availability](#ch_start.ftp_avail)

    -   [SVN Availability](#ch_start.svn_avail)

    -   [Availability via Shell Scripts](#ch_start.script_avail)

-   [Source Tree Contents](#ch_start.source_tree_contents)

    -   [Top-Level Source Organization](#ch_start.source_organization)

    -   [The Core NCBI C++ Toolkit](#ch_start.core_contents)

    -   [Source Tree for Individual Projects](#ch_start.src_tree_proj)

    -   [The Makefile Templates](#ch_start.make_templates)

    -   [The New Module Stubs](#ch_start.new_module_stubs)

-   [Decide Where You Will Work (in-tree, in a subtree, out-of-tree)](#ch_start.where_to_work)

-   [Basic Installation and Configuration Considerations](#ch_start.basic_install)

-   [Basics of Using the C++ Toolkit](#ch_start.basic_using_toolkit)

    -   [Compiling and Linking with make](#ch_start.using_make)

    -   [Makefile Customization](#ch_start.makefile_custom)

    -   [Basic Toolkit Coding Infrastructure](#ch_start.coding_infrastructure)

    -   [Key Classes](#ch_start.key_classes)

    -   [The Object Manager and datatool](#ch_start.objmgr_datatool)

    -   [Debugging and Diagnostic Aids](#ch_start.debug_diag_aids)

    -   [Coding Standards and Guidelines](#ch_start.coding_stds_guidelines)

-   [Noteworthy Files](#ch_start.noteworthy_files)

<a name="ch_start.quick_start"></a>

Quick Start
-----------

A good deal of the complication and tedium of getting started has thankfully been wrapped by a number of shell scripts. They facilitate a 'quick start' whether starting anew or within an existing Toolkit work environment. ('Non-quick starts' sometimes cannot be avoided, but they are considered [elsewhere](ch_proj.html#ch_proj.new_proj_struct).)

-   **Get the Source Tree (see** [Figure 1](#ch_start.F1)**)**

    -   Retrieve via SVN ([in-house](ch_getcode_svn.html#ch_getcode_svn.code_retrieval) \| [public](ch_getcode_svn.html#ch_getcode_svn.external)), **or**

    -   Download [via FTP](ch_getcode_svn.html#ch_getcode_svn.ftp_download), **or**

    -   Run [svn\_core](ch_getcode_svn.html#ch_getcode_svn.core_sh) *(requires a SVN repository containing the C++ Toolkit; for NCBI users)*

-   **Configure the build tree (see** [Figure 2](#ch_start.F2)**)**

    -   Use the [configure](ch_config.html#ch_config.Running_the_configur) script, **or**

    -   Use a compiler-specific [wrapper script](ch_config.html#ch_config.Special_Consideratio) (e.g. **compilers/unix/\*.sh**).

-   **Build the C++ Toolkit from** `makefiles` **and** `meta-makefiles`(if required)

    -   `make all_r` for a recursive make, **or**

    -   `make all` to make only targets for the current directory.

-   **Work on your new or existing application or library** the scripts [new\_project](ch_proj.html#ch_proj.new_proj_struct) and (for an existing Toolkit project) [import\_project](ch_getcode_svn.html#ch_getcode_svn.import_project_sh) help to set up the appropriate `makefiles` and/or source.

<a name="ch_start.F1"></a>

[![Figure 1. NCBI C++ Source Tree](/cxx-toolkit/static/img/src_tree.gif)](/cxx-toolkit/static/img/src_tree.gif "Click to see the full-resolution image")

Figure 1. NCBI C++ Source Tree

<a name="ch_start.F2"></a>

[![Figure 2. NCBI C++ Build Tree](/cxx-toolkit/static/img/bld_tree.gif)](/cxx-toolkit/static/img/bld_tree.gif "Click to see the full-resolution image")

Figure 2. NCBI C++ Build Tree

In a nutshell, that's all it takes to get up and running. The download, configuration, installation and build actions are shown for two cases in this sample.

The last item, employing the Toolkit in a project, completely glosses over the substantial issue of how to use the installed Toolkit. Where does one begin to look to identify the functionality to solve your particular problem, or indeed, to write the simplest of programs? "[Basics of Using the C++ Toolkit](#ch_start.basic_using_toolkit)" will deal with those issues. Investigate these and other topics with the set of [sample applications](#ch_start.example_apps). See [Examples](ch_demo.html) for further cases that employ specific features of the NCBI C++ Toolkit.

<a name="ch_start.example_apps"></a>

Example Applications
--------------------

The suite of application examples below highlight important areas of the Toolkit and can be used as a starting point for your own development. Note that you may generate the sample application code by running the [new\_project](ch_proj.html#ch_proj.new_proj_struct) script for that application. The following examples are now available:

-   [app/basic](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/basic/) - This example builds two applications: a generic application (`basic_sample`) to demonstrate the use of [key Toolkit classes](#ch_start.key_classes), and an example program (`multi_command`) that accepts multiple command line forms.

-   [app/alnmgr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/alnmgr/) - Creates an alignment manager application.

-   [app/asn](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/asn/) - Creates a library based on an ASN.1 specification, and a test application.

-   [app/blast](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/blast/) - Creates an application that uses BLAST.

-   [app/cgi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/cgi/) - Creates a Web-enabled CGI application.

-   [app/dbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/) - Creates a database application.

-   [app/eutils](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/eutils/) - Creates an eUtils client application.

-   [app/lds](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/lds/) - Creates an application that uses local data storage (LDS).

-   [app/netcache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netcache/) - Creates an application that uses [NetCache](ch_app.html#ch_app.ncbi_netcache_service).

-   [app/netschedule](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netschedule/) - Creates an NCBI [GRID](http://intranet.ncbi.nlm.nih.gov:6224/wiki-private/CxxToolkit/index.cgi/GRID) application that uses [NetSchedule](http://intranet.ncbi.nlm.nih.gov:6224/wiki-private/CxxToolkit/index.cgi/NetSchedule).

-   [app/objects](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/objects/) - Creates an application that uses ASN.1 objects.

-   [app/objmgr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/objmgr/) - The Toolkit manipulates biological data objects in the context of an `Object Manager` class ([CObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObjectManager)). This example creates an application that uses the object manager.

-   [app/sdbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/) - Creates a database application that uses `SDBAPI`.

-   [app/serial](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/serial/) - Creates a dozen applications that demonstrate using serial library hooks, plus a handful of other applications that demonstrate other aspects of the serial library.

-   [app/soap/client](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/soap/client/) - Creates a SOAP client application.

-   [app/soap/server](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/soap/server/) - Creates a SOAP server application.

-   [app/unit\_test](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/unit_test/) - Creates an NCBI unit test application.

To build an example use its accompanying `Makefile`.

<a name="ch_start.Example_Libraries"></a>

Example Libraries
-----------------

The following example libraries can be created with [new\_project](ch_proj.html#ch_proj.new_proj_struct) and used as a starting point for a new library:

-   [lib/basic](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/lib/basic/) - Creates a trivial library (it finds files in **`PATH`**) for demonstrating the basics of the build system for libraries. This example library includes a simple test application.

-   [lib/asn](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/lib/asn_lib/) - Creates an ASN.1 object project.

-   [lib/dtd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/lib/dtd/) - Creates an XML DTD project.

-   [lib/xsd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/lib/xsd/) - Creates an XML Schema project.

<a name="ch_start.source_avail"></a>

Source Tree Availability
------------------------

The source tree is available through FTP, SVN and by running special scripts. The following subsections discuss these topics in more detail:

-   [FTP Availability](#ch_start.ftp_avail)

-   [SVN Availability](#ch_start.svn_avail)

-   [Availability via Shell Scripts](#ch_start.script_avail)

<a name="ch_start.ftp_avail"></a>

### FTP Availability

The Toolkit source is available via ftp at [ftp://ftp.ncbi.nih.gov/toolbox/ncbi\_tools++/CURRENT/](ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/CURRENT), and the archives available, with unpacking instructions, are listed on the [download page](ch_getcode_svn.html). If you plan to modify the Toolkit source in any way with the ftp code, it is strongly advised that it be placed under a source code control system (preferably SVN) so that you can rollback to an earlier revision without having to ftp the entire archive once again.

<a name="ch_start.svn_avail"></a>

### SVN Availability

NCBI users can obtain the source tree directly from the internal [SVN repository](ch_getcode_svn.html#ch_getcode_svn.code_retrieval).

A [read-only repository](ch_getcode_svn.html#ch_getcode_svn.external) is also available to the public.

<a name="ch_start.script_avail"></a>

### Availability via Shell Scripts

For NCBI users, the various shell scripts in `$NCBI/c++/scripts` tailor the working codebase and can prepare the work environment for new projects. Except where noted, an active Toolkit SVN repository is required, and obviously in all cases a version of the Toolkit must be accessible.

-   **svn\_core**. Details on [svn\_core](ch_getcode_svn.html#ch_getcode_svn.core_sh) are discussed in a later chapter.

-   **import\_project**. Details on [import\_project](ch_getcode_svn.html#ch_getcode_svn.import_project_sh) are discussed in a later chapter.

-   **new\_project**. Details on [new\_project](ch_proj.html#ch_proj.new_proj_struct) are discussed in a later chapter.

-   **update\_projects**. Details on [update\_core](ch_getcode_svn.html#ch_getcode_svn.update_projects_sh) and [update\_projects](ch_getcode_svn.html#ch_getcode_svn.update_projects_sh) are covered in later chapter.

<a name="ch_start.source_tree_contents"></a>

Source Tree Contents
--------------------

The following topics are discussed in this section:

-   [Top-Level Source Organization](#ch_start.source_organization)

-   [The Core NCBI C++ Toolkit](#ch_start.core_contents)

-   [Source Tree for Individual Projects](#ch_start.src_tree_proj)

-   [The Makefile Templates](#ch_start.make_templates)

-   [The New Module Stubs](#ch_start.new_module_stubs)

<a name="ch_start.source_organization"></a>

### Top-Level Source Organization

The NCBI C++ Toolkit `source tree` (see [Figure 1](#ch_start.F1)) is organized as follows:

-   `src/` -- a hierarchical directory tree of [NCBI C++ projects](ch_proj.html#ch_proj.start_new_proj). Contained within `src` are all source files (`*.cpp, *.c`), along with private header files (`*.hpp, *.h`), makefiles (`Makefile.*`, including [Makefile.mk](ch_build.html#ch_build.build_make_macros)), scripts (`*.sh`), and occasionally some project-specific data

-   `include/` -- a hierarchical directory tree whose structure mirrors the `src` directory tree. It contains only public header files (`*.hpp, *.h`).

***Example:***`include/corelib/` contains public headers for the sources located in `src/corelib/`

-   `scripts/` -- auxiliary scripts, including those to help manage interactions with the NCBI SVN code repository, such as [import\_project](ch_getcode_svn.html#ch_getcode_svn.import_project_sh), [new\_project](ch_proj.html#ch_proj.new_project_Starting), and [svn\_core](ch_getcode_svn.html#ch_getcode_svn.core_sh).

-   files for platform-specific [configuration and installation](ch_config.html#ch_config.Running_the_configur):

    -   `compilers/` -- directory containing [compiler-specific configure wrappers](ch_config.html#ch_config.Special_Consideratio) (`unix/*.sh`) and miscellaneous resources and build scripts for [MS Windows](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/common/config/ncbiconf_msvc.h)/[MacOS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/common/config/ncbiconf_xcode.h) platforms

    -   **configure** -- a multi-platform configuration shell script (generated from template `configure.ac` using [autoconf](https://www.gnu.org/software/autoconf/autoconf.html))

    -   various scripts and template files used by **configure**, [autoconf](https://www.gnu.org/software/autoconf/autoconf.html)

-   **doc/** -- NCBI C++ documentation, including a library reference, configuration and installation instructions, example code and guidelines for **everybody** writing code for the NCBI C++ Toolkit.

<a name="ch_start.core_contents"></a>

### The Core NCBI C++ Toolkit

The 'core' libraries of the Toolkit provide users with a highly portable set of functionality. The following projects comprise the portable core of the Toolkit:

<a name="idp7405344"></a>

> `corelib connect cgi html util`

Consult the library reference (Part 3 of this book) for further details.

<a name="ch_start.src_tree_proj"></a>

### Source Tree for Individual Projects

For the overall NCBI C++ source tree structure see [Top-Level Source Organization](#ch_start.source_organization) above.

An individual project contains the set of source code and/or scripts that are required to build a Toolkit library or executable. In the NCBI source tree, projects are identified as sub-trees of the `src`, and `include` directories of the main C++ tree root. For example, `corelib `and `objects/objmgr` are both projects. However, note that a project's code exists in two sibling directories: the public headers in `include/` and the source code, private headers and `makefiles` in `src`.

The contents of each project's [source tree](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src) are:

-   `*.cpp, *.hpp` -- project's source files and private headers

-   `Makefile.in` -- a [meta-makefile](ch_build.html#ch_build.makefiles_meta) to specify which local projects (described in `Makefile.*.in`) and sub-projects(located in the project subdirectories) must be built

-   `Makefile.*.lib, Makefile.*.app` -- `customized makefiles` to build a library or an application

-   `Makefile.*` -- "free style" makefiles

-   sub-project directories (if any)

<a name="ch_start.make_templates"></a>

### The Makefile Templates

Each project is built by customizing a set of generic `makefiles`. These generic `makefile` templates (`Makefile.*.in`) are found in `src` and help to control the assembly of the entire Toolkit via recursive builds of the individual projects. (The usage of these `makefiles` and other configurations issues are [summarized below](#ch_start.basic_install) and detailed on the [Working with Makefiles](ch_build.html) page.)

-   `Makefile.in` -- makefile to perform a recursive build in all project subdirectories

-   `Makefile.meta.in` -- included by all makefiles that provide both local and recursive builds

-   `Makefile.mk.in` -- included by all makefiles; sets a lot of configuration variables

-   `Makefile.lib.in` -- included by all makefiles that perform a "standard" library build, when building only static libraries.

-   `Makefile.dll.in` -- included by all makefiles that perform a "standard" library build, when building only shared libraries.

-   `Makefile.both.in` -- included by all makefiles that perform a "standard" library build, when building both static and shared libraries.

-   `Makefile.lib.tmpl.in` -- serves as a template for the project `customized makefiles` (`Makefile.*.lib[.in]`) that perform a "standard" library build

-   `Makefile.app.in` -- included by all makefiles that perform a "standard" application build

-   `Makefile.app.tmpl.in` -- serves as a template for the project `customized makefiles` (`Makefile.*.app[.in]`) that perform a "standard" application build

-   `Makefile.rules.in, Makefile.rules_with_autodep.in` -- instructions for building object files; included by most other makefiles

<a name="ch_start.new_module_stubs"></a>

### The New Module Stubs

A Toolkit module typically consists of a header (`*.hpp`) and a source (`*.cpp`) file. Use the [stubs](ch_proj.html#ch_proj.new_modules) provided, which include boilerplate such as the NCBI disclaimer and SVN revision information, to easily start a new module. You may also consider using the [sample code](#ch_start.example_apps) described above for your new module.

<a name="ch_start.where_to_work"></a>

Decide Where You Will Work (in-tree, in a subtree, out-of-tree)
---------------------------------------------------------------

Depending on how you plan to interact with the NCBI C++ Toolkit source tree, the Toolkit has mechanisms to streamline how you [create and manage](ch_proj.html) projects. The simplest case is to work [out-of-tree](ch_proj.html#ch_proj.outside_tree) in a private directory. This means that you are writing new code that needs only to link with pre-built Toolkit libraries. If your project requires the source for a limited set of Toolkit projects it is often sufficient to work [in a subtree](ch_proj.html#ch_proj.work_sub_tree) of the Toolkit source distribution.

Most users will find it preferable and fully sufficient to work in a subtree or a private directory. Certain situations and users (particularly Toolkit developers) do require access to the full Toolkit source tree; in such instances one must work [in-tree](ch_proj.html#ch_proj.inside_tree).

<a name="ch_start.basic_install"></a>

Basic Installation and Configuration Considerations
---------------------------------------------------

***Note:*** Much of this discussion is Unix-centric. Windows and Mac users would also benefit from reading the instructions specific to those systems.

The configuration and installation process is automated with the **configure** script and its [wrappers](ch_config.html#ch_config.Special_Consideratio) in the `compilers` directory. These scripts handle the compiler- and platform-dependent Toolkit settings and create the build` tree` (see [Figure 2](#ch_start.F2)) skeleton. The configured `build tree`, located in `<builddir>`, is populated with customized `meta-makefile`, headers and source files. Most system-dependence has been isolated in the `<builddir>/inc/ncbiconf.h` header. By running `make all_r` from `<builddir>`, the full Toolbox is built for the target platform and compiler combination.

Summarized below are some basic ways to control the installation and configuration process. More comprehensive documentation can be found at [config.html](ch_config.html).

-   **A Simple Example Build**

-   [configure Options](ch_config.html#ch_config.ch_configget_synopsi) View the list of options by running<br/>`./configure --help`

-   **Enable/Disable Debugging**

-   [Building Shared and/or Static Libraries](ch_config.html#ch_config.Building_Shared_Libr) Shared libraries (DLL's) can be used in Toolkit executables and libraries for a number of tested configurations. Note that to link with the shared libraries at run time a valid [runpath](ch_config.html#ch_config.ch_configconfightml_) must be specified. For a detailed example, including information on building shared libraries, see [this example](ch_proj.html#ch_proj.make_proj_lib).

-   If you are outside NCBI, make sure the paths to your third party libraries are correctly specified. See [Site-Specific Third Party Library Configuration](ch_config.html#ch_config.SiteSpecific_Third_Party_Libra) for details.

-   [Influencing configure via Environment Variables](ch_config.html#ch_config.ch_configconfig_flag) Several environment variables control the tools and flags employed by **configure**. The [generic ones](#ch_start.ref_TableToolsAndFlags) are: **`CC, CXX, CPP, AR, RANLIB, STRIP, CFLAGS, CXXFLAGS, CPPFLAGS, LDFLAGS, LIBS`**. In addition, you may manually set various [localization environment variables](ch_config.html#ch_config.ch_configlocalizatio).

-   [Multi-Thread Safe Compilation](ch_config.html#ch_config.ch_configmt_safe_com)

-   **Controlling Builds of Optional Projects** You may selectively build or not build one of the optional projects ("serial", "ctools", "gui", "objects", "internal") with **configure** flags. If an optional project is not configured into your distribution, it can be added later using the [import\_projects](ch_getcode_svn.html#ch_getcode_svn.import_project_sh) script.

-   [Adjust the Configuration of an Existing Build](ch_config.html#ch_config.ch_configpre_built_h) If you need to update or change the configuration of an existing build, use the **reconfigure.sh** or **relocate.sh** script.

-   [Working with Multiple build trees](ch_config.html#ch_config.Configuration_and_In) Managing builds for a variety of platforms and/or compiler environments is straightforward. The configure/install/build cycle has been designed to support the concurrent development of multiple builds from the same source files. This is accomplished by having independent `build trees` that exist as sibling directories. Each build is configured according to its own set of configuration options and thus produces distinct libraries and executables. All builds are nonetheless constructed from the same source code in $NCBI/`c++/{src, include}`.

<a name="ch_start.ref_TableToolsAndFlags"></a>

Table 1. Environment variables that affect the configure / build process

| Name    | Default          | Synopsis ([see also](ch_build.html#ch_build.T5))            |
|---------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| AR      | ar cru           | Librarian             |
| CC      | gcc, cc          | C compiler            |
| CFLAGS  | -g [or/and/nor](ch_config.html#ch_config.Debug_vs_Release_Con) -O | C compiler flags      |
| CONFIG\_SHELL | /bin/sh          | Command interpreter to use in the configuration scripts and makefiles (it must be compatible with sh) |
| CPP     | $CC -E           | C preprocessor        |
| CPPFLAGS      | -D\_DEBUG [or/and/nor](ch_config.html#ch_config.Debug_vs_Release_Con)-DNDEBUG | C/C++ preprocessor flags                 |
| CXX     | c++, g++, gcc, CC, cxx, cc++        | C++ compiler, also being used as a linker                   |
| CXXCPP  | $CXX -E          | C++ preprocessor      |
| CXXFLAGS      | -g [or/and/nor](ch_config.html#ch_config.Debug_vs_Release_Con) -O | C++ compiler flags    |
| LDFLAGS | None             | Linker flags          |
| LIBS    | None             | Libraries to link to every executable    |
| STRIP   | strip            | To discard symbolic info                 |

<div class="table-scroll"></div>

<a name="ch_start.basic_using_toolkit"></a>

Basics of Using the C++ Toolkit
-------------------------------

The following topics are discussed in this section:

-   [Compiling and Linking with make](#ch_start.using_make)

-   [Makefile Customization](#ch_start.makefile_custom)

-   [Basic Toolkit Coding Infrastructure](#ch_start.coding_infrastructure)

-   [Key Classes](#ch_start.key_classes)

-   [The Object Manager and datatool](#ch_start.objmgr_datatool)

-   [Debugging and Diagnostic Aids](#ch_start.debug_diag_aids)

-   [Coding Standards and Guidelines](#ch_start.coding_stds_guidelines)

<a name="ch_start.using_make"></a>

### Compiling and Linking with **make**

The NCBI C++ Toolkit uses the standard Unix utility **make** to build libraries and executable code, using instructions found in `makefiles`. More [details on compiling and linking with make can be found in a later chapter](ch_build.html).

To initiate compilation and linking, run **make**:

    make -f <Makefile_Name> [<target_name>]

When run from the top of the build tree, this command can make the entire tree (with target `all_r`). If given within a specific project subdirectory it can be made to target just that project. The Toolkit has in its `src `directory templates (e.g., `Makefile.*.in`) for [makefiles](ch_build.html#ch_build.build_proj_makefiles) and [meta-makefiles](ch_build.html#ch_build.makefiles_meta) that define common file locations, compiler options, environment settings, and [standard make targets](ch_build.html#ch_build.build_make_proj_target). Each Toolkit project has a specialized [meta-makefile](#ch_start.make_templates) in its `src` directory. The relevant `meta-makefile` templates for a project, e.g., `Makefile.in`, are customized by **configure** and placed in its `build tree`. For new projects, whether [in](ch_proj.html#ch_proj.inside_tree) or [out](ch_proj.html#ch_proj.outside_tree) of the C++ Toolkit tree, the programmer must provide either `makefiles` or `meta-makefiles`.

<a name="ch_start.makefile_custom"></a>

### Makefile Customization

Fortunately, for the common situations where a [script](ch_getcode_svn.html#ch_getcode_svn.code_retrieval) was used to set up your source, or if you are working in the C++ Toolkit source tree, you will usually have correctly customized `makefiles` in each project directory of the build tree. For other cases, particularly [when using the new\_project](ch_proj.html#ch_proj.new_proj_struct) script, some measure of user customization may be needed. The more frequent customizations involve (see "[Working with Makefiles](ch_proj.html#ch_proj.proj_makefiles)" or "[Project makefiles"](ch_proj.html#ch_proj.proj_makefiles) for a full discussion):

-   [meta-makefile macros](ch_proj.html#ch_proj.inside_make_meta): **`APP_PROJ, LIB_PROJ, SUB_PROJ, USR_PROJ`** Lists of applications, libraries, sub-projects, and user projects, respectively, to make.

-   [Library and](ch_proj.html#ch_proj.make_proj_lib)[Application macros](ch_proj.html#ch_proj.make_proj_app): **`APP, LIB, LIBS, OBJ, SRC`** List the application name to build, Toolkit library(ies) to make or include, non-Toolkit library(ies) to link, object files to make, and source to use, respectively.

-   [Compiler Flag Macros](ch_build.html#ch_build.build_make_macros): **`CFLAGS, CPPFLAGS, CXXFLAGS, LDFLAGS`** Include or override C compiler, C/C++ preprocessor, C++ compiler, and linker flags, respectively. Many more localization macros are also [available for use](ch_config.html#ch_config.ch_configlocalizatio).

-   [Altering the Active Version of the Toolkit](ch_proj.html#ch_proj.new_project_Starting) You can change the active version of NCBI C++ toolkit by manually setting the variable **`$(builddir)`** in `Makefile.foo_[app|lib]` to the desired toolkit path, e.g.: `builddir = $(NCBI)/c++/GCC-Release/build`.<br/>Consult [this list](ch_proj.html#ch_proj.outside_dir_loc) or, better, look at the output of '`ls -d $NCBI/c++/*/build`' to see those pre-built Toolkit builds available on your system.

<a name="ch_start.coding_infrastructure"></a>

### Basic Toolkit Coding Infrastructure

Summarized below are some features of the global Toolkit infrastructure that users may commonly employ or encounter.

-   ***The NCBI Namespace Macros*** The header [ncbistl.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbistl.hpp) defines three principal namespace macros: **`NCBI_NS_STD`**, **`NCBI_NS_NCBI`** and **`NCBI_USING_NAMESPACE_STD`**. Respectively, these refer to the standard C++ `std::` namespace, a local NCBI namespace `ncbi::` for Toolkit entities, and a namespace combining the names from **`NCBI_NS_STD`** and **`NCBI_NS_NCBI`**.

-   ***Using the NCBI Namespaces*** Also in [ncbistl.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbistl.hpp) are the macros **`BEGIN_NCBI_SCOPE`** and **`END_NCBI_SCOPE`**. These bracket code blocks which define names to be included in the NCBI namespace, and are invoked in nearly all of the Toolkit headers (see example). To use the NCBI namespace in a code block, place the **`USING_NCBI_SCOPE`** macro before the block references its first unqualified name. This macro also allows for unqualified use of the `std::` namespace. Much of the Toolkit source employs this macro (see example), although it is possible to define and work with other namespaces.

-   ***Configuration-Dependent Macros and*** `ncbiconf.h`` #ifdef` tests for the configuration-dependent macros, for example **`_DEBUG`** or **`NCBI_OS_UNIX`**, etc., are used throughout the Toolkit for conditional compilation and accommodate your environment's requirements. The **configure** script defines many of these macros; the resulting `#define`'s appear in the [ncbiconf.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/find?string=ncbiconf.h) header and is found in the `<builddir>/inc` directory. It is not typically included explicitly by the programmer, however. Rather, it is included by other basic Toolkit headers (e.g., `ncbitype.h, ncbicfg.h, ncbistl.hpp`) to pick up configuration-specific features.

-   ***NCBI Types (***`ncbitype.h, ncbi_limits.[h|hpp]`***)*** To promote code portability developers are strongly encouraged to use these standard C/C++ types whenever possible as they are ensured to have well-defined behavior throughout the Toolkit. Also see the current [type-use rules](ch_core.html#ch_core.types_policy). The [ncbitype.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbitype.h) header provides a set of [fixed-size integer types](ch_core.html#ch_core.fixed_size_integers) for special situations, while the `ncbi_limits.[`[h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbi_limits.h)`| `[hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbi_limits.h)`]` headers set numeric limits for the supported types.

-   ***The*** `ncbistd.hpp` ***header*** The NCBI C++ standard \#include's and \#defin'itions are found in [ncbistd.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbistd.hpp), which provides the interface to many of the basic Toolkit modules. The explicit NCBI headers included by `ncbistd.hpp` are: `ncbitype.h, ncbistl.hpp, ncbistr.hpp, ncbidbg.hpp, ncbiexpt.hpp` and `ncbi_limits.h`.

-   ***Portable Stream Handling*** Programmers can ensure portable stream and buffer I/O operations by using the NCBI C++ Toolkit stream wrappers, `typedef`'s and `#define`'s declared in the [ncbistre.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbistre.hpp). For example, always use [CNcbiIstream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiIstream) instead of `YourFavoriteNamespace::istream` and favor [NcbiCin](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NcbiCin) over ***cin***. A variety of classes that perform case-conversion and other manipulations in conjunction with NCBI streams and buffers are also available. See the [source](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/ncbistre.hpp) for details.

-   ***Use of the C++ STL (Standard Template Library) in the Toolkit*** The Toolkit employs the STL's set of template container classes, algorithms and iterators for managing collections of objects. Being standardized interfaces, coding with them provides portability. However, one drawback is the inability of STL containers to deal with reference objects, a problem area the Toolkit's [CRef and CObject classes](ch_core.html#ch_core.CRef) largely remedy.

-   ***Serializable Objects, the ASN.1 Data Types and*** **datatool** The [ASN.1 data model](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/SDKDOCS/DATAMODL.HTML) for biological data underlies all of the C and C++ Toolkit development at NCBI. The C++ Toolkit represents the ASN.1 data types as [serializable objects](ch_proj.html#ch_proj.ser_object), that is, objects able to save, restore, or transmit their state. This requires knowledge of an object's type and as such a [CTypeInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTypeInfo) object is provided in each class to encapsulate [type information](ch_ser.html#ch_ser.typeinfo.html).<br/>Additionally, [object stream](ch_ser.html#ch_ser.objstream.html) classes (***CObject[IO]Stream***, and subclasses) have been designed specifically to perform data object serialization. The nuts-and-bolts of doing this has been documented on the [Processing Serial Data](ch_ser.html#ch_ser.asn.html) page, with additional information about the contents and parsing of ASN.1-derived objects in [Traversing a Data Structure](ch_ser.html#ch_ser.traverse.html).Each of the serializable objects appears in its own subdirectory under `[`[src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objects)`| `[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/objects)`]/objects`. These `objects/*` projects are configured differently from the rest of the Toolkit, in that header and source files are auto-generated from the ASN.1 specifications by the [datatool](ch_app.html#ch_app.datatool) program. The --with-objects flag to **configure** also directs a build of the [user classes](ch_proj.html#ch_proj.base_classes) for the serializable objects.

<a name="ch_start.key_classes"></a>

### Key Classes

For reference, we list some of the fundamental classes used in developing applications with the Toolkit. Some of these classes [are described elsewhere](ch_core.html#ch_core.writing_simple_app), but consult the library reference (Part 3 of this book) and the [source browser](ch_browse.html) for complete details.

-   [CNcbiApplication](ch_core.html#ch_core.writing_simple_app) (abstract class used to define the basic functionality and behavior of an NCBI application; **this application class effectively supersedes the C-style main() function**)

-   [CArgDescriptions, CArgs, and CArgValue](ch_core.html#ch_core.cmd_line_args) (command-line argument processing)

-   [CNcbiEnvironment](ch_core.html#ch_core.CNcbiEnvironment) (store, access, and modify environment variables)

-   [CNcbiRegistry](ch_core.html#ch_core.registry) (load, access, modify and store runtime information)

-   [CNcbiDiag](ch_core.html#ch_core.diag) (error handling for the Toolkit; )

-   [CObject](ch_core.html#ch_core.CObject) (base class for objects requiring a reference count)

-   [CRef](ch_core.html#ch_core.smart_ptrs) (a reference-counted smart pointer; particularly useful with STL and template classes)

-   [CObject[IO]Stream](ch_ser.html#ch_ser.objstream.html) (serialized data streams)

-   [CTypeInfo and CObjectTypeInfo](ch_ser.html#ch_ser.typeinfo.html) (Runtime Object Type Information; extensible to [user-defined types](ch_ser.html#ch_ser.usrtypeinfo.html))

-   [CObjectManager, etc.](ch_objmgr.html) (classes for working with biological sequence data)

-   [CCgiApplication, etc.](ch_cgi.html#ch_cgi.cg_develop_apps) (classes to create CGI and Fast-CGI applications and handle [CGI Diagnostics](ch_cgi.html#ch_cgi.cgi_diag.html))

-   [CNCBINode, etc.](ch_html.html#ch_html.webpgs.html) (classes representing HTML tags and Web page content)

-   [Iterator Classes](ch_ser.html#ch_ser.iterators.html) (easy traversal of collections and containers)

-   [Exception Handling](ch_debug.html#ch_debug.excep_cpp_toolkit) (classes, macros and tracing for exceptions)

<a name="ch_start.objmgr_datatool"></a>

### The Object Manager and **datatool**

The [datatool](ch_app.html#ch_app.datatool) processes the ASN.1 specifications in the `src/objects/directories` and is the C++ Toolkit's analogue of the C Toolkit's **asntool**. The goal of **datatool** is to generate the class definitions corresponding to each ASN.1 defined data entity, including all required [type information](ch_ser.html#ch_ser.typeinfo.html). As ASN.1 allows data to be selected from one of several types in a [choice element](ch_ser.html#ch_ser.choice.html), care must be taken to handle such cases.

The [Object Manager](ch_objmgr.html) is a C++ Toolkit library whose goal is to transparently download data from the GenBank database, investigate bio sequence data structure, and retrieve sequence data, descriptions and annotations. In the library are [classes](ch_objmgr.html#ch_objmgr.om_def.html) such as [CDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDataLoader) and [CDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDataSource) which manage global and local accesses to data, [CSeqVector](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeqVector) and [CSeqMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeqMap) objects to find and manipulate sequence data, a number of [specialized iterators](ch_objmgr.html#ch_objmgr.om_def.html_Iterators) to parse descriptions and annotations, among others. The [CObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObjectManager) and [CScope](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CScope) classes provide the foundation of the library, managing data objects and coordinating their interactions.

[Jump-start](ch_objmgr.html#ch_objmgr.om_start.html) and [Object Manager FAQ](ch_objmgr.html#ch_objmgr.om_faq.html) are all available to help new users.

<a name="ch_start.debug_diag_aids"></a>

### Debugging and Diagnostic Aids

The Toolkit has a number of methods for catching, reporting and handling coding bugs and exceptional conditions. During development, a [debug mode](ch_debug.html#ch_debug.debug_mode_internal) exists to allow for assertions, traces and message posting. The standard C++ exception handling (which should be used as much as possible) has been extended by a pair of [NCBI exception classes](ch_debug.html#ch_debug.excep_cpp_toolkit), ***CErrnoException*** and ***CParseException*** and additional associated macros. [Diagnostics](ch_core.html#ch_core.diag), including an [ERR\_POST macro](ch_core.html#ch_core.ERR_POST) available for routine error posting, have been built into the Toolkit infrastructure.

For more detailed and extensive reporting of an object's state (including the states of any contained objects), a special [debug dump interface](ch_debug.html#ch_debug.debug_dump) has been implemented. All objects derived from the [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) class, which is in turn derived from the abstract base class [CDebugDumpable](ch_debug.html#ch_debug.debug_architecture), automatically have this capability.

<a name="ch_start.coding_stds_guidelines"></a>

### Coding Standards and Guidelines

All C++ source in the Toolkit has a [well-defined coding style](ch_style.html#ch_style.prog_style) which shall be used for new contributions and is highly encouraged for all user-developed code. Among these standards are

-   [variable naming conventions](ch_style.html#ch_style.naming_conv) (for types, constants, class members, etc.)

-   [using namespaces and the NCBI name scope](ch_style.html#ch_style.naming_prefix)

-   [code indentation](ch_style.html#ch_style.code_indentation) (4-space indentation, **no** tab symbols)

-   [declaring and defining classes and functions](ch_style.html#ch_style.class_decl)

<a name="ch_start.noteworthy_files"></a>

Noteworthy Files
----------------

[Table 2](#ch_start.T2). Noteworthy Files

<a name="ch_start.T2"></a>


| Filename (relative to $NCBI/c++)               | Description             |
|---------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **compilers/\*/\<compiler\_name\>.sh**         | Use the **configure** shell script, or one of its [compiler-specific wrappers](ch_config.html#ch_config.Special_Consideratio), to fully configure and install all files required to build the Toolkit.                |
| **import\_project**         | Import only an existing Toolkit project into an independent subtree of your current Toolkit source tree. (Requires a SVN source repository.)                 |
| **update\_{core\\|projects}**                  | Update your local copy of either the [core](#ch_start.core_contents) Toolkit or set of specified projects. (Requires a SVN source repository.)               |
| **new\_project**            | Set up a new project outside of the NCBI C++ Toolkit tree to access pre-built version of the Toolkit libraries. Sample code can be requested to serve as a template for the new module.            |
| `src/<project_dir>/Makefile.in`<br/>`src/<project_dir>/`<br/>` Makefile.<project>.{app, lib}` | Customized `meta-makefile` template and the corresponding datafile to provide project-specific source dependencies, libraries, compiler flags, etc. This information is accessed by **configure** to build a projects's `meta-makefile` (see below).        |
| `doc/framewrk.{cpp\|hpp}`   | Basic templates for source and header files that can be used when starting a new module. Includes common headers, the NCBI disclaimer and SVN keywords in a standard way.       |
| `CHECKOUT_STATUS`           | This file summarizes the local source tree structure that was obtained when using one of the shell scripts in `scripts`. (Requires a SVN source repository.) |
| **Build-specific Files (relative to $NCBI/c++/\<builddir\>)**     | **Description**         |
| `Makefile`<br/>`Makefile.mk`<br/>`Makefile.meta`    | These are the primary `makefiles` used to build the entire Toolkit (when used recursively). They are customized for a specific build from the corresponding `*.in` templates in `$NCBI/c++/src`. `Makefile` is the master, top-level file, `Makefile.mk` sets many make and shell variables and `Makefile.meta` is where most of the make targets are defined. |
| `<project_dir>/Makefile`<br/>`<project_dir>/`<br/>` Makefile.<project>_{app, lib}`      | Project-specific custom `meta-makefile` and `makefiles`, respectively, configured from templates in the `src/` hierarchy and any pertinent `src/<project_dir>/Makefile.<project>.{app, lib} files (see REF TO OLD ANCHOR: get_started.html_ref_TmplMetaMake<secref rid="get_started.html_ref_ImptFiles">above</secref>).`  |
| `inc/ncbiconf.h`            | Header that `#define`'s many of the build-specific constants required by the Toolkit. This file is auto-generated by the **configure** script, and some pre-built versions do exist in `compilers`.                   |
| **reconfigure.sh**          | Update the build tree due to changes in or the addition of configurable files (\*.in files, such as `Makefile.in` or the `meta-makefiles`) to the source tree.                  |
| **relocate.sh**             | Adjust paths to this build tree and the relevant source tree. |
| `corelib/ncbicfg.c`         | Define and manage the runtime path settings. This file is auto-generated by the **configure** script.                  |
| `status/config.{cache\|log\|status}`           | These files provide information on **configure**'s construction of the build tree, and the cache of build settings to expedite future changes.               |

<div class="table-scroll"></div>


