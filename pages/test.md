---
layout: default
title: Configure, Build and Use the Toolkit with CMake.
nav: pages/ch_intro
---


{{ page.title }}
=================================================

## Introduction

This chapter describes how to configure, build, and use the NCBI C++ Toolkit, or selected components of it using CMake.

[CMake](https://cmake.org) is an open-source, cross-platform family of tools designed to build, test and package software. It uses compiler-independent configuration files to generate native makefiles and workspaces which can be used in a variety of compiler environments.

At NCBI, we use NCBIptb – CMake wrapper, written in CMake scripting language. It adds many convenient features, facilitates handling of large source trees and simplifies CMake build target descriptions, while still allowing use of “native” CMake.


## Chapter Outline

-   [Configure build tree](#ch_cmconfig._Configure)

-   [Use prebuilt Toolkit](#ch_cmconfig._Use_prebuilt)

-   [NCBIptb build system](#ch_cmconfig._NCBIptb)

    -   [What is it?](#ch_cmconfig._What)
    
    -   [Examples.](#ch_cmconfig._Examples)
    
    -   [How does it work?](#ch_cmconfig._How)
    
    -   [Tree structure and variable scopes.](#ch_cmconfig._Tree)

    -   [Directory entry.](#ch_cmconfig._Dir)
    
    -   [Library and application targets.](#ch_cmconfig._Target)
    
    -   [Application target tests.](#ch_cmconfig._Test)
    
    -   [Custom target.](#ch_cmconfig._Custom)


<a name="ch_cmconfig._Configure"></a>

## Configure build tree

Having checked out the source tree, run the following command in the root directory:

    On Linux:   src/build-system/cmake/cmake-cfg-unix.sh --help
    On Windows: src\build-system\cmake\cmake-cfg-vs.bat --help

It lists available options used to generate the build tree. Several of them limit the build scope:

-   *--with-projects=*”FILE” – build projects listed in FILE. This is either a Project List File, or a list of subdirectories of *src* directory. Each entry is a regular expression (see [CMake documentation](https://cmake.org/cmake/help/v3.14/command/string.html#regex-specification) for details). List of subdirectories consists of entries separated by semicolon (hyphen in the beginning of the entry means that targets from that directory should be excluded). If "FILE" is an existing file, it should be in plain text with one such entry per line. For example:

```
    --with-projects="corelib$;serial;-serial/test"
    --with-projects="scripts/projects/ncbi_cpp.lst"
```

-   *--with-targets=*”NAMES” – lists targets to build. Again, each entry is a regular expression. For example:

```
    --with-targets="^cgi;-test"
```

-   *--with-tags=*”TAGS” – build targets with the listed tags only. Tags are **not** treated as regular expressions. For example:

```
    --with-tags="core;-test"
```

Once the build tree is generated, go into build directory – for example, *CMake-GCC730-ReleaseDLL/build* or *CMake-vs2017\static\build*, and run make or open a generated solution.

<a name="ch_cmconfig._Use_prebuilt"></a>

## Use prebuilt Toolkit

The prebuilt Toolkit is available in several configurations. ***Note*** that this must be built using CMake – that is, it must contain CMake import target configuration files. To create a new project which uses libraries from it, use *new_cmake_project* script:

    new_cmake_project <name> <type> <builddir>

The script will create a subdirectory *name*, source subdirectories with a sample project *type* and a configuration script. Run the script, then build the project.

<a name="ch_cmconfig._NCBIptb"></a>

## NCBIptb build system.

<a name="ch_cmconfig._What"></a>

### What is it?

Imagine a large source tree with thousands of projects. It takes sources from several repositories and uses numerous external packages. It consists of “core” part and subtrees. Different teams work on multiple projects. To do their work, these teams assemble their own build trees, which include certain parts of core as well as their own projects. “Core” has several official releases; team projects have their own ones. There are several high frequency builds which work on different subtrees and ensure that everything stays compatible.

NCBIptb was designed to facilitate handling of such large source tree in a dynamic build environment. The purpose of NCBIptb is to extract from the source tree only requested projects. This includes analyzing and collecting build target dependencies on other targets, analyzing dependencies on external packages and excluding targets for which such dependencies cannot be satisfied, adding sources and headers, organizing them into source groups, defining precompiled header usage.  Doing this in “pure” CMake is either impossible or requires complex project descriptions. Still, all these tasks are pretty standard and can be automated. Using NCBIptb is convenience, not a requirement; it extends functionality but still allows using “native” CMake.

Probably, limiting the set of projects to build is not such a big problem for an automated build – it must build everything anyway. Still, it is a problem for an individual developer working in an Integrated Development Environment. IDEs can handle solutions with hundreds of build targets, but they can become very slow. And, it is simply not needed, it is a waste of computer resources. Developer needs a solution with only few build targets. NCBIptb can do exactly that.

Another challenge is working with prebuilt trees. Let us say, a developer needs to add features into some applications or libraries. He or she checks out part of the source tree. Some libraries are present in the local tree, others should be taken from the prebuilt one. The problem is that local libraries may have the same names as prebuilt ones. CMake will not add them into the build saying that these targets are already defined as “imported” ones. NCBIptb solves this problem by renaming such local build targets and adjusting target dependencies accordingly. Developer’s intervention is not required, everything is made automatically.

<a name="ch_cmconfig._Examples"></a>

### Examples.

To define a simple build target in CMake we use the following command:

    add_executable(hello hello.cpp)

The same operation in NCBIptb will look like this:

    NCBI_begin_app(hello)
    NCBI_sources(hello.cpp)
    NCBI_end_app()

So far, it does not look like NCBIptb makes a lot of sense.

Let us now create source groups, because it will look better in an IDE:

CMake:

    source_group(“Source files” FILES hello.cpp)
    source_group(“Header files” FILES hello.hpp)
    add_executable(hello hello.cpp hello.hpp)

In NCBIptb no changes are required, because source groups will be created automatically.

Now, let us say our app uses package X, which may be absent.
In CMake the project description will look like this:

    if (X_FOUND)
        source_group(“Source files” FILES hello.cpp)
        source_group(“Header files” FILES hello.hpp)
        add_executable(hello hello.cpp)
        target_include_directories(hello ${X_INCLUDE_DIRS})
        target_compile_definitions(hello ${X_DEFINITIONS})
        target_link_libraries(hello ${X_LIBRARIES})
    endif ()

In NCBIptb, only one line must be added:

    NCBI_begin_app(hello)
    NCBI_sources(hello.cpp)
    NCBI_requires(X)
    NCBI_end_app()

<a name="ch_cmconfig._How"></a>

### How does it work?

While in CMake “adding a build target” is final and cannot be reversed, in NCBIptb it is only a piece of information. The decision of whether to add the target or not depends on several factors and is made by the build system itself. To do so, NCBIptb scans the source tree two times (CMake does it only once). During the first pass it collects information about target dependencies and requirements, then it uses filters to select “proper” build targets and finally, during the second pass adds them into the generated solution or build tree.

Project filters include list of source tree subdirectories, list of build targets and list of build target “tags”. They can be specified in any combination. “Tag” is only a label – for example *test* or *demo*, it has no meaning for the build system. Subdirectories and targets are treated here as [regular expressions](https://cmake.org/cmake/help/v3.14/command/string.html#regex-specification). Note that project filters is only a starting point. If you request building projects in directory ***A*** only, but they require projects from directory ***B***, the latter ones will be added automatically. If you request building application ***A*** only, all required libraries will also be added automatically.

<a name="ch_cmconfig._Tree"></a>

### Tree structure and variable scopes.

CMake input files are named *CMakeLists.txt*. When one “adds a subdirectory” to the build, CMake looks for *CMakeLists.txt* file in this directory and processes it. Each of the directories in a source tree has its own variable bindings. Before processing the *CMakeLists.txt* file for a directory, CMake copies all currently defined variables and creates a new scope. All changes to variables are reflected in the current scope only. They are propagated to subdirectories, but not to the parent one.

*CMakeLists.txt* in turn can include other CMake files – this does not create a new scope. This is good and bad at the same time. We will return to this topic shortly.

So, in *CMakeLists.txt* one can call *add_subdirectory*, *include* a CMake file, or define a build target. In NCBIptb we use *NCBI_add_subdirectory*, *NCBI_add_library*, *NCBI_add_app* and *NCBI_add_target* instead. While NCBIptb does not prohibit defining a build target in *CMakeLists.txt*, we find it beneficial to define them in separate files. Also, NCBIptb creates a separate scope for each such file. That is, variables defined in *CMakeLists.txt* are propagated to each target definition file in the current directory and all subdirectories. At the same time, variables defined in target definition file are not propagated anywhere - they are guaranteed to be local.

What if it was not so? What if, instead of calling *NCBI_add_target()*, we simply *included* target definition file? It is a common scenario when there are several target definitions in a single directory. Once so, variables defined in one file could silently affect others and potentially create a lot of confusion. Creating a separate scope for each target definition eliminates this interdependency.

<a name="ch_cmconfig._Dir"></a>

### Directory entry

Normally, *CMakeLists.txt* contains the following function calls: *NCBI_add_subdirectory*, *NCBI_add_library*, *NCBI_add_app* and *NCBI_add_target*.

-   **NCBI_add_subdirectory**(a b) – adds subdirectories *a* and *b*. In order to be processed, a subdirectory must exist and have CMakeLists.txt file. Otherwise, a warning will be printed, and the entry skipped.

-   **NCBI_add_library**(a b) – adds library build targets. In the current directory it looks for files named *CMakeLists.a.lib.txt* and *CMakeLists.b.lib.txt*.

-   **NCBI_add_app**(a b) – adds application build targets. In the current directory it looks for files named *CMakeLists.a.app.txt* and *CMakeLists.b.app.txt*.

-   **NCBI_add_target**(a b) – adds custom targets. In the current directory it looks for files named *CMakeLists.a.txt* and *CMakeLists.b.txt*.

*CMakeLists.txt* may also contain calls to the following functions: *NCBI_headers*, *NCBI_disable_pch*, *NCBI_enable_pch*, *NCBI_requires*, *NCBI_optional_components*, *NCBI_add_definitions*, *NCBI_add_include_directories*, *NCBI_uses_toolkit_libraries*, *NCBI_uses_external_libraries*, *NCBI_project_tags*. If so, settings defined by them will affect all targets defined in this directory and its subdirectories.

<a name="ch_cmconfig._Target"></a>

### Library and application targets.

Definition of a library begins with *NCBI_begin_lib* and ends with *NCBI_end_lib*; definition of an application begins with *NCBI_begin_app* and ends with *NCBI_end_app*. Otherwise, there is not much difference between them. All calls to other NCBIptb functions must be put between these two.

-   **NCBI_begin_lib**(name)/**NCBI_begin_app**(name) – begins definition of a library or an application target called *name*.

-   **NCBI_end_lib**(result)/**NCBI_end_app**(result) – ends the definition. Optional argument *result* becomes TRUE when the target was indeed added to the build. This makes it possible to add “native” CMake commands or properties to the target:

```
    NCBI_begin_app(name)
    ...
    NCBI_end_app(result)
    if (result)
    ...
    endif()
```

-   **NCBI_sources**(list of source files) – adds source files to the target.

-   **NCBI_generated_sources**(list of source files) – adds sources which might not exists initially, but will be generated somehow during the build.

-   **NCBI_headers**(list of header file masks) – adds header files to the target. By default, NCBIptb adds all header files it can find both in the current source directory and corresponding include directory. If for some reason it is undesirable, this is the way to reduce the list.

-   **NCBI_dataspec**() – adds data specifications: ASN.1, DTD, XML schema, JSON schema, WSDL or PROTOBUF. Adding data specification implies generating C++ data classes. It also means that corresponding generated source files will be added to the target automatically by NCBIptb.

-   **NCBI_resources**(list of resource files) – adds Windows resource files to the target.

-   **NCBI_requires**(list of components) – adds requirements. If a requirement is not met, the target will be excluded from the build automatically.

-   **NCBI_optional_components**(list of components) – adds optional components. If a component is not found (or requirement is not met), NCBIptb will print a warning and the target will still be added to the build.

-   **NCBI_enable_pch**(), **NCBI_disable_pch**(), **NCBI_set_pch_header**(name), **NCBI_set_pch_define**(define), **NCBI_disable_pch_for**(list of files) – define the usage of precompiled headers. Most of the time, default behavior is enough, and these calls are not needed. Still some projects prefer to precompile their own headers, or do not want it at all.

-   **NCBI_uses_toolkit_libraries**(list of libraries) – adds dependencies on other libraries in the same build tree.

-   **NCBI_uses_external_libraries**(list of libraries) – adds external libraries to the build target. Probably, a better way of doing this is by using *requirements* in *NCBI_requires*, but if a library should be added to one or two projects only, then this might be an easier way.

-   **NCBI_add_definitions**(list) – add compiler definitions to the target.

-   **NCBI_add_include_directories**(list) – adds include directories.

-   **NCBI_project_tags**(list) – adds tags to the target. A target may have an unlimited number of tags.

<a name="ch_cmconfig._Test"></a>

### Application target tests.

There are different approaches to testing. CMake has test infrastructure, or organization can use their own one. NCBIptb defines tests in a standard way. Then, a special module translates this definition into one used in a specific case.

All tests must be described inside application target definition, that is between *NCBI_begin_app* and *NCBI_end_app* calls.

There are two forms of test definition – short and long one.

Short one consists of a single function call – **NCBI_add_test**(command and arguments).

Long form allows to define additional requirements and add test assets.

-   **NCBI_begin_test**(name) – begins definition of a test. *name* is optional parameter, if it is absent an automatically generated name will be used.

-   **NCBI_end_test**() – ends the definition.

-   **NCBI_set_test_command**(command) – usually this is the name of the application but may be a script for example.

-   **NCBI_set_test_arguments**(arguments) – command arguments.

-   **NCBI_set_test_assets**(list of files and directories) – lists files and directories required for the test. These are relative to the current source directory. Note that the test will run in a separate directory, probably created specifically for this test. So, if it requires data files, they must be copied to that directory. 

-   **NCBI_set_test_requires**(list of components) - adds test requirements. If a requirement is not met, the test will not be added.

-   **NCBI_set_test_timeout**(seconds) – test timeout in seconds.

<a name="ch_cmconfig._Custom"></a>

### Custom target

Definition of a custom target begins with *NCBI_begin_custom_target*(name) and ends with *NCBI_end_custom_target*(result). It also requires a definition of a function which creates this target, that is calls *add_custom_target* CMake function.

The definition consists of target requirements - *NCBI_requires*, dependencies on other targets in the same build tree – *NCBI_custom_target_dependencies* and the callback function which defines the target – *NCBI_custom_target_definition*. 

That is, the definition looks as follows:

    function(xxx_definition) 
        ...
        add_custom_target(name ...)
    endfunction()
    NCBI_begin_custom_target(name)
        NCBI_requires( list of components)
        NCBI_custom_target_dependencies(list of toolkit libraries or apps)
        NCBI_custom_target_definition( xxx_definition)
    NCBI_end_custom_target(result)

This approach allows to define custom target only when all the requirements are met and collect target dependencies automatically.
