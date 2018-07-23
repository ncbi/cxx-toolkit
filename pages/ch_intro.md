---
layout: default
title: Introduction to the C++ Toolkit
nav: pages/ch_intro
---


{{ page.title }}
=================================================

## Introduction

One difficulty in understanding a major piece of software such as the C++ Toolkit is knowing where to begin in understanding the overall framework or getting the 'big picture' of how all the different components relate to each other. One approach is to dive into the details of one component and understand it in sufficient detail to get a roadmap of the rest of the components, and then repeat this process with the other components. Without a formal road map, this approach can be very time consuming and it may take a long time to locate the functionality one needs.

When trying to understand a major piece of software, it would be more effective if there is a written text that explains the overall framework without getting too lost in the details. This chapter is written with the intent to provide you with this broader picture of the C++ Toolkit.

This chapter provides an introduction to the major components that make up the Toolkit. You can use this chapter as a roadmap for the rest of the chapters that follow.

## Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [The CORELIB Module](#ch_intro.intro_corelib)

    -   [Application Framework](#ch_intro.intro_appframe)

    -   [Argument processing](#ch_intro.intro_args)

    -   [Diagnostics](#ch_intro.intro_diag)

    -   [Environment Interface](#ch_intro.intro_env)

    -   [Files and Directories](#ch_intro.intro_files_dirs)

    -   [MT Test wrappers](#ch_intro.intro_mt_test)

    -   [Object and Ref classes](#ch_intro.intro_cref)

    -   [Portability definitions](#ch_intro.intro_pdef)

    -   [Portable Exception Handling](#ch_intro.intro_pexcep)

    -   [Portable Process Pipes](#ch_intro.intro_pipe)

    -   [Registry](#ch_intro.intro_reg)

    -   [STL Use Hints](#ch_intro.intro_stl)

    -   [String Manipulations](#ch_intro.intro_str)

    -   [Template Utilities](#ch_intro.intro_tempu)

    -   [Threads](#ch_intro.intro_threads)

    -   [Time](#ch_intro.intro_time)

-   [The ALGORITHM Module](#ch_intro.intro_algo)

-   [The CGI Module](#ch_intro.intro_cgi)

-   [The CONNECT Module](#ch_intro.intro_conn)

    -   [Socket classes](#ch_intro.intro_socket)

    -   [Connector and Connection Handles](#ch_intro.intro_connector)

    -   [Connection Streams](#ch_intro.intro_streams)

    -   [Sendmail API](#ch_intro.intro_sendmail)

    -   [Threaded Server](#ch_intro.intro_threadedserver)

-   [The CTOOL Module](#ch_intro.intro_ctool)

-   [The DBAPI Module](#ch_intro.intro_dbapi)

    -   [Database User Classes](#ch_intro.intro_dbapi_user)

    -   [Database Driver Architecture](#ch_intro.intro_dbapi_driver)

-   [The GUI Module](#ch_intro.intro_gui)

-   [The HTML Module](#ch_intro.intro_html)

    -   [Relationships between HTML classes](#ch_intro.intro_html_classes)

    -   [HTML Processing](#ch_intro.intro_html_processing)

-   [The OBJECT MANAGER Module](#ch_intro.intro_objmgr)

-   [The SERIAL Module](#ch_intro.intro_ser)

-   [The UTIL Module](#ch_intro.intro_util)

    -   [Checksum](#ch_intro.intro_checksum)

    -   [Console Debug Dump Viewer](#ch_intro.intro_dumpv)

    -   [Diff API](#ch_intro.Diff_API)

    -   [Floating Point Comparison](#ch_intro.Floating_Point_Comparison)

    -   [Lightweight Strings](#ch_intro.intro_lightstring)

    -   [Linked Sets](#ch_intro.intro_linkedset)

    -   [Random Number Generator](#ch_intro.intro_random)

    -   [Range Support](#ch_intro.intro_range)

    -   [Registry based DNS](#ch_intro.intro_regdns)

    -   [Regular Expressions](#ch_intro.Regular_Expressions)

    -   [Resizing Iterator](#ch_intro.intro_resizeiterator)

    -   [Rotating Log Streams](#ch_intro.intro_rotatelog)

    -   [Stream Support](#ch_intro.intro_streamsupport)

    -   [String Search](#ch_intro.intro_strsearch)

    -   [Synchronized and blocking queue](#ch_intro.Synchronized_and_blo)

    -   [Thread Pools](#ch_intro.intro_thrpools)

    -   [UTF 8 Conversion](#ch_intro.intro_utf8)

<a name="ch_intro.intro_corelib"></a>

The CORELIB Module
------------------

The C++ Toolkit can be seen as consisting of several major pieces of code that we will refer to as *module*. The core module is called, appropriately enough, CORELIB, and provides a portable way to write C++ code and many useful facilities such as an application framework, argument processing, template utilities, threads, etc. The CORELIB facilities are used by other major modules. The rest of the sections that follow discusses the CORELIB and the other C++ Toolkit modules in more detail.

The following is a list of the CORELIB facilities. Note that each facility may be implemented by a number of C++ classes spread across many files.

-   [Application Framework](#ch_intro.intro_appframe)

-   [Argument processing](#ch_intro.intro_args)

-   [Diagnostics](#ch_intro.intro_diag)

-   [Environment Interface](#ch_intro.intro_env)

-   [Files and Directories](#ch_intro.intro_files_dirs)

-   [MT Test wrappers](#ch_intro.intro_mt_test)

-   [Object and Ref classes](#ch_intro.intro_cref)

-   [Portability definitions](#ch_intro.intro_pdef)

-   [Portable Exception Handling](#ch_intro.intro_pexcep)

-   [Portable Process Pipes](#ch_intro.intro_pipe)

-   [Registry](#ch_intro.intro_reg)

-   [STL Use Hints](#ch_intro.intro_stl)

-   [String Manipulations](#ch_intro.intro_str)

-   [Template Utilities](#ch_intro.intro_tempu)

-   [Threads](#ch_intro.intro_threads)

-   [Time](#ch_intro.intro_time)

A brief description of each of each of these facilities are presented in the subsections that follow:

<a name="ch_intro.intro_appframe"></a>

### Application Framework

The Application framework primarily consists of an abstract class called [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) which defines the high level behavior of an application. For example, every application upon loading seems to go through a cycle of doing some initialization, then some processing, and upon completion of processing, doing some clean up activity before exiting. These three phases are modeled in the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class as interface methods [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init), [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), and [Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Exit).

A new application is written by deriving a class from the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) base class and writing an implementation of the [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init), [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), and [Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Exit) methods. Execution control to the new application is passed by calling the application object's [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) method inherited from the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) base class (see [Figure 1](#ch_intro.F1)). The [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) method is similar to the ***main()*** method used in C/C++ programs and calls the [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init), [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), and [Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Exit) methods.

<a name="ch_intro.F1"></a>

![Figure 1. The CNcbiApplication class](/cxx-toolkit/static/img/CNcbiApplication.gif)

Figure 1. The [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class

More details on [using the CNcbiApplication class](ch_core.html#ch_core.writing_simple_app) are presented in a later chapter.

<a name="ch_intro.intro_args"></a>

### Argument processing

In a C++ program, control is transferred from the command line to the program via the ***main()*** function. The ***main()*** function is passed a count of the number of arguments (int argc), and an array of character strings containing arguments to the program (`char** argv`). As long as the argument types are simple, one can simply set up a loop to iterate through the array of argument values and process them. However, with time applications evolve and grow more complex. Often there is a need to do some more complex argument checking. For example, the application may want to enforce a check on the number and position of arguments, check the argument type (int, string, etc.), check for constraints on argument values, check for flags, check for arguments that follow a keyword (***-logfile mylogfile.log***), check for mandatory arguments, display usage help on the arguments, etc.

To make the above tasks easier, the CORELIB provides a number of portable classes that encapsulate the functionality of argument checking and processing. The main classes that provide this functionality are the [CArgDescriptions](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgDescriptions), [CArgs](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgs), [CArgValue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgValue) classes.

Argument descriptions such as the expected number, type, position, mandatory and optional attributes are setup during an application's initilization such as the application object's [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init) method (see [previous section](#ch_intro.intro_appframe)) by calling the [CArgDescriptions](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgDescriptions) class methods. Then, the arguments are extracted by calling the [CArgs](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgs) class methods.

More details on [argument processing](ch_core.html#ch_core.cmd_line_args) are presented in a later chapter.

<a name="ch_intro.intro_diag"></a>

### Diagnostics

It is very useful for an application to post messages about its internal state or other diagnostic information to a file, console or for that matter any output stream. The CORELIB provides a portable diagnostics facility that enables an application to post diagnostic messages of various severity levels to an output stream. This diagnostic facility is provided by the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) class. You can set the diagnostic stream to the standard error output stream (`NcbiErr`) or to any other output stream.

You can set the severity level of the message to Information, Warning, Error, Critical, Fatal, or Trace. You can alter the severity level at any time during the use of the diagnostic stream.

More details on [diagnostic streams](ch_core.html#ch_core.CNcbiDiag) and [processing of diagnostic messages](ch_debug.html#ch_debug.std_cpp_message_post) are presented in later chapters.

<a name="ch_intro.intro_env"></a>

### Environment Interface

An application can read the environment variable settings (such as PATH) that are in affect when the application is run. CORELIB defines a portable [CNcbiEnvironment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiEnvironment) class that stores the environment variable settings and provides applications with methods to get the environment variable values.

More details on the [environment interface](ch_core.html#ch_core.CNcbiEnvironment) are presented in a later chapter.

<a name="ch_intro.intro_files_dirs"></a>

### Files and Directories

An application may need access to information about a file or directory. The CORELIB provides a number of portable classes to model a system file and directory. Some of the important classes are [CFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CFile) for modeling a file, [CDir](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDir) for modeling a directory, and [CMemoryFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMemoryFile) for memory mapped file.

For example, if you create a [CFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CFile) object corresponding to a system file, you can get the file's attribute settings such as file size, permission settings, or check the existence of a file. You can get the directory where the file is located, the base name of the file, and the file's extension. There are also a number of useful functions that are made available through these classes to parse a file path or build a file path from the component parts such as a directory, base name, and extension.

More details on [file and directory classes](ch_core.html#ch_core.files_dirs) are presented in later chapters.

<a name="ch_intro.intro_mt_test"></a>

### MT Test wrappers

The [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class which was [discussed earlier](#ch_intro.intro_appframe) provides a framework for writing portable applications. For writing portable multi-threaded applications, the CORELIB provides a [CThreadedApp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadedApp) class derived from [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class which provides a framework for building multi-threaded applications.

Instead of using the [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init), [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), [Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Exit) methods for the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class, the [CThreadedApp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadedApp) class defines specialized methods such as [Thread\_Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Thread_Init), [Thread\_Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Thread_Run), [Thread\_Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Thread_Exit), [Thread\_Destroy()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Thread_Destroy) for controlling thread behavior. These methods operate on a specific thread identified by a thread index parameter.

<a name="ch_intro.intro_cref"></a>

### Object and Ref classes

A major cause of errors in C/C++ programs is due to dynamic allocation of memory. Stated simply, memory for objects allocated using the new operator must be released by a corresponding delete operator. Failure to delete allocated memory results in memory leaks. There may also be programming errors caused by references to objects that have never been allocated or improperly allocated. One reason these types of problems crop up are because a programmer may dynamically allocate memory as needed, but may not deallocate it due to unanticipated execution paths.

The C++ standard provides the use of a template class, auto\_ptr , that wraps memory management inside constructors and destructors. Because a destructor is called for every constructed object, memory allocation and deallocation can be kept symmetrical with respect to each other. However, the auto\_ptr does not properly handle the issue of ownership when multiple auto pointers, point to the same object. What is needed is a reference counted smart pointer that keeps a count of the number of pointers pointing to the same object. An object can only be released when its reference count drops to zero.

The CORELIB implements a portable reference counted smart pointer through the [CRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRef) and [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) classes. The [CRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRef) class provides the interface methods to access the pointer and the [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) is used to store the object and the reference count.

More [CObject classes](ch_core.html#ch_core.smart_ptrs) are presented in a later chapter.

<a name="ch_intro.intro_pdef"></a>

### Portability definitions

To help with portability, the CORELIB uses only those C/C++ standard types that have some guarantees about size and representation. In particular, use of long, long long, float is not recommended for portable code.

To help with portability, integer types such as `Int1`, `Uint1`, `Int2`, `Uint2`, `Int4`, `Uint4`, `Int8`, `Uint8` have been defined with constant limits. For example, a signed integer of two bytes size is defined as type `Int2` with a minimum size of `kMin_I2` and a maximum size of `kMax_I2`. There are minimum and maximum limit constants defined for each of the different integer types.

More details on [standard portable data types](ch_core.html#ch_core.std_ncbi_types) are presented in a later chapter.

<a name="ch_intro.intro_pexcep"></a>

### Portable Exception Handling

C++ defines a structured exception handling mechanism to catch and process errors in a block of code. When the error occurs an exception is thrown and caught by an exception handler. The exception handler can then try to recover from the error, or process the error. In the C++ standard, there is only one exception class (std::exception), that stores a text message that can be printed out. The information reported by the std::exception may not be enough for a complex system. The CORELIB defines a portable [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) class derived from std::exception class that remedies the short comings of the standard exception class

The CORELIB defines a portable [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) class derived from std::exception class. The [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) class in turn serves as a base class for many other exception classes specific to an application area such as the [CCoreException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCoreException), [CAppException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CAppException), [CArgException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArgException), [CFileException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CFileException), and so on. Each of these derived classes can add facilities specific to the application area they deal with.

These exception classes provides many useful facilities such as a unique identification for every exception that is thrown, the location (file name and line number) where the exception occurred, references to lower-level exceptions that have already been thrown so that a more complete picture of the chain of exceptions is available, ability to report the exception data into an arbitrary output channel such as a diagnostic stream, and format the message differently for each channel.

More details on [exceptions and exception handling](ch_debug.html#ch_debug.ncbi_cpp_exceptions) are presented in a later chapter.

<a name="ch_intro.intro_pipe"></a>

### Portable Process Pipes

A pipe is a common mechanism used to establish communications between two separate processes. The pipe serves as a communication channel between processes.

The CORELIB defines the [CPipe](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPipe) class that provides a portable inter-process communications facility between a parent process and its child process. The pipe is created by specifying the command and arguments used to start the child process and specifying the type of data channels (text or binary) that will connect the processes. Data is sent across the pipe using the [CPipe](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPipe) read and write methods.

<a name="ch_intro.intro_reg"></a>

### Registry

***N.B.*** The preferred way to define configuration parameters for an application is to use the macros in the [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) class (e.g. **`NCBI_PARAM_DECL`**). More [details on the CParam class and its macros](ch_core.html#ch_core.Configuration_Parame) are presented in a later chapter. If the [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) class cannot be used, then the registry may be used instead.

The settings for an application may be read from a configuration or initialization file (the "registry"). This configuration file may define the parameters needed by the application. For example, many Unix programs read their parameter settings from configuration files. Similarly, Windows programs may read and store information in an internal registry database, or an initialization file.

The [CNcbiRegistry](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiRegistry) class provides a portable facility to access, modify and store runtime information read from a configuration file. The configuration file consists of sections. A section is defined by a section header of the form [***section-header-name***]. Within each section, the parameters are defined using (name, value) pairs and represented as ***name=value*** strings. The syntax closely resembles the '`.ini`' files used in Windows and also by Unix tools such as Samba.

More details on the [Registry](ch_core.html#ch_core.CNcbiRegistry) are presented in a later chapter.

<a name="ch_intro.intro_stl"></a>

### STL Use Hints

To minimize naming conflicts, all NCBI code is placed in the ncbi name space. The CORELIB defines a number of portable macros to help manage name space definitions. For example, you can use the **`BEGIN_NAME_SPACE`** macro at the start of a section of code to place that code in the specified name space. The **`END_NAME_SPACE`** macros is used to indicate the end the of the name space definition. To declare the use of the NCBI namespace, the macros **`USING_NCBI_SCOPE`** is used.

A number of macros have been defined to handle non-standard behavior of C++ compilers. For example, a macro **`BREAK`** is defined, that is used to break out of a loop, instead of using the break statement directly. This is done to handle a bug in the Sun WorkShop (pre 5.3 version) compiler that fails to call destructors for objects created in for-loop initializers. Another example is that some compilers (example, Sun Pro 4.2) do not understand the using namespace std; statement. Therefore, for portable code, the using namespace statement should be prohibited.

More details on the [use of portable macros](ch_style.html#ch_style.using_NCBI_namespace) are presented in a later chapter.

<a name="ch_intro.intro_str"></a>

### String Manipulations

C++ defines the standard string class that provides operations on strings. However, compilers may exhibit non-portable string behavior especially with regards to multi-threaded programs. The CORELIB provides portable string manipulation facilities through the [NStr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NStr) class that provides a number of class-wide functions for string manipulation.

[NStr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NStr) portable functions include the string-to-X and X-to-string conversion functions where X is a data type including a pointer type, string comparisons with and without case, pattern searches within a string, string truncation, substring replacements, string splitting and join operations, string tokenization, etc.

<a name="ch_intro.intro_tempu"></a>

### Template Utilities

The C++ Template classes support a number of useful template classes for data structures such as vectors, lists, sets, maps, and so on.

The CORELIB defines a number of useful utility template classes. Some examples are template classes and functions for checking for equality of objects through a pointer, checking for non-null values of pointers, getting and setting map elements, deleting all elements from a container of pointers where the container can be a list, vector, set, multiset, map or multimap.

More details on the [template utilities](ch_core.html#ch_core.template_utils) are presented in a later chapter.

<a name="ch_intro.intro_threads"></a>

### Threads

Applications can run faster, if they are structured to exploit any inherent parallelism in the application's code execution paths. Code execution paths in an application can be assigned to separate threads. When the application is run on a multiprocessor system, there can be significant improvements in performance especially when threads run in parallel on separate processors.

The CORELIB defines a portable [CThread](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThread) class that can be used to provide basic thread functionality such as thread creation, thread execution, thread termination, and thread cleanup.

To create user defined threads you need to derive your class from [CThread](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThread), and override the thread's [Main()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Main) method and, and if necessary the [OnExit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnExit) method for thread-specific cleanup. Next, you create a thread object by instantiating the class you derived from [CThread](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThread). Now you are ready to launch thread execution by calling the thread's [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) method. The [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) method starts thread execution and the thread will continue to run until it terminates. If you want the thread to run independently of the parent thread you call the thread's [Detach()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Detach) method. If you want to wait till the thread terminates, you call the thread's [Join()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Join) method.

Synchronization between threads is provided through mutexes and read/write locks.

More details on [threads](ch_core.html#ch_core.threads) and [synchronization](ch_core.html#ch_core.mutexes) are presented in a later chapter.

<a name="ch_intro.intro_time"></a>

### Time

The [CTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime) class provides a portable interface to date and time functions. [CTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime) can operate with both local and UTC time, and can be used to store data and time at a particular moment or elapsed time. The time epoch is defined as Jan 1, 1900 so you cannot use [CTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime) for storing timestamps before Jan 1, 1900.

The [CTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime) class can adjust for daylight savings time. For display purposes, the time format can be set to a variety of time formats specified by a format string. For example, "M/D/Y h:m:s" for a timestamp of "5/6/03 14:07:09". Additional time format specifiers are defined for full month name (B), abbreviated month name (b), nanosecond (S), timezone format (Z), full weekday name (W) and abbreviated weekday name (w).

A class [CStopWatch](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CStopWatch) is also available that acts as a stop watch and measures elapsed time via the [Elapsed()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Elapsed) method, after its [Start()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Start) method is called.

More details on the [CTime class](ch_core.html#ch_core.portable_time_class) are presented in a later chapter.

<a name="ch_intro.intro_algo"></a>

The ALGORITHM Module
--------------------

The ALGORITHM module is a collection of rigorously defined, often computationally intensive algorithms performed on sequences. It is divided into three groups:

-   ALIGN. A set of global alignment algorithms, including generic Needleman-Wunsch, a linear-space Hirschberg's algorithm and a spliced (cDna/mRna-to-Genomic) alignment algorithm.

-   BLAST. Basic Local Alignment Tool code and interface.

-   SEQUENCE. Various algorithms on biological sequences, including antigenic determinant prediction, CPG-island finder, ORF finder, string matcher and others.

<a name="ch_intro.intro_cgi"></a>

The CGI Module
--------------

The CGI module provides an integrated framework for writing CGI applications. It consists of classes that implement the CGI (Common Gateway Interface). These classes are used to retrieve and parse an HTTP request, and then compose and deliver an HTTP response.

The CGI module consists of a number of classes. The interaction between these classes is fairly complex, and therefore, not covered in this introductory chapter. We will attempt to only identify the major classes in this overview, and cover the details of their interaction in later chapters. Among the more important of the CGI classes are the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication), [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext), [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest), [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse), and [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie).

The [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) is used to define the CGI application and is derived from the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) [discussed earlier](#ch_intro.intro_appframe). You write a CGI application by deriving application class from [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) and providing an adoption of the [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init), [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), and [Exit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Exit) methods inherited from the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class. Details on [how to implement the Init(), Run() and Exit() methods for a CGI application](ch_cgi.html#ch_cgi.cgi_app_class) are provided in a later chapter.

The [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) class is designed to receive and parse the request, and the [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) class outputs the response to an output stream.

The [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie) class models a *cookie*. A cookie is a name, value string pair that can be stored on the user's web browser in an attempt to remember a session state. All incoming [CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) are parsed and stored by the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) object, and the outgoing cookies are sent along with the response by the [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) object.

The CGI application executes in a 'context' defined by the [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) class. The [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) class provides a wrapper for the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication), [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) and [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) objects and drives the processing of input requests.

More details on [CGI classes and their interactions](ch_cgi.html#ch_cgi.cgi_class_overview) are presented in a later chapter.

<a name="ch_intro.intro_conn"></a>

The CONNECT Module
------------------

The CONNECT module implements a variety of interfaces and classes dealing with making connections to (mostly) network services. The core of the Connection Library is written in C which provides a low level interface to the communication protocols. The CONNECT module provides C++ interfaces so that the objects have diagnostic and error handling capabilities that are consistent with the rest of the Toolkit. The standard sockets (SOCK) API is implemented on a variety of platforms such as Unix, MS-Windows, MacOS, Darwin. The CONNECT module provides a higher level access to the SOCK API by using C++ wrapper classes.

The following is a list of topics presented in this section:

-   [Socket classes](#ch_intro.intro_socket)

-   [Connector and Connection Handles](#ch_intro.intro_connector)

-   [Connection Streams](#ch_intro.intro_streams)

-   [Sendmail API](#ch_intro.intro_sendmail)

-   [Threaded Server](#ch_intro.intro_threadedserver)

<a name="ch_intro.intro_socket"></a>

### Socket classes

The C++ classes that implement the socket interface are [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket), [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket), [CListeningSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CListeningSocket), and [CSocketAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocketAPI). The socket defines an end point for a connection which consists of an IP address (or host name) of the end point, port number and transport protocol used (TCP, UDP).

The [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) class encapsulates the descriptions of both local and remote end points. The local end point, which is the end point on the client issuing a connection request, is specified by parameters to the [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) constructor. The remote end point on which the network service is running is specified by parameters to the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method for the [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) class. The [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) class defines additional methods to manage the connection such as [Reconnect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Reconnect) to reconnect to the same end point as the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method; the [Shutdown()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Shutdown) method to terminate the connection; the [Wait()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Wait) method to wait on several sockets at once; the [Read()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Read) and [Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write) methods to read and write data via the socket; and a number of other support methods.

[CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) is designed for connection-oriented services such as those running over the TCP transport protocol. For connectionless, or datagram services, such as those running over the UDP transport protocol, you must use the [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket) class. The local end point is specified by parameters to the [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket) constructor. The remote end point is specified by parameters to the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method for the [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket) class. Unlike the case of the connection-oriented services, this [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method only specifies the default destination address, and does not restrict the source address of the incoming messages. The methods [Send()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Send) and [Recv()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Recv) are used to send the datagram, and the method [SetBroadcast()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetBroadcast) sets the socket to broadcast messages sent to the datagram socket. The [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket) is derived from the [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) class but methods such as [Shutdown()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Shutdown) and [Reconnect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Reconnect) that apply to connection-oriented services are not available to users of the [CDatagramSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDatagramSocket) class.

The [CListeningSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CListeningSocket) is used by server-side applications to listen for connection requests. The [CListeningSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CListeningSocket) constructor specifies the port to listen to and the size of the connection request queue. You can change the port that the server application listens to any time by using the [Listen()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Listen) method. The [Accept()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Accept) method accepts the connection request, and returns a [CSocket](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocket) object through which data is transferred.

The [CSocketAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSocketAPI) is a C++ wrapper for class-wide common socket utility functions available for sockets such as the [gethostname()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=gethostname), [gethostbyaddr()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=gethostbyaddr), [ntoa()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ntoa), ***aton()***, and so on.

<a name="ch_intro.intro_connector"></a>

### Connector and Connection Handles

The SOCK interface is a relatively low-level interface for connection services. The CONNECT module provides a generalization of this interface to connection services using a connection type and specialized connectors.

A connection is modeled by a connection type and a connector type. The connector type models the end point of the connection, and the connection type, the actual connection. Together, the connector and connection objects are used to define the following types of connections: file, ftp, http, memory, pipe, service, and socket.

The connector is described by a connector handle, CONNECTOR. CONNECTOR is a typedef and defined as a pointer to an internal data structure.

The connection is described by a connection handle CONN. CONN is a typedef and defined as a pointer to an internal structure. The CONN type is used as a parameter to a number of functions that handle the connection such as [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create), [CONN\_ReInit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_ReInit), [CONN\_Read()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Read), [CONN\_Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Write), etc.

For socket connectors, for example, the CONNECTOR handle is created by a call to the [SOCK\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnector) function and passed the host name to connect to, the port number on the host to connect to, and maximum number of retries. The CONNECTOR handle is then passed as an argument to the [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create) which returns a CONNECTION handle. The CONNECTION handle is then used with the connection functions (that have the prefix CONN\_) to process the connection. The connection so created is bi-directional (full duplex) and input and output data can be processed simultaneously.

The other connector types are similar to the socket connector type. In the case of a file connector, the connector handle is created by calling the [FILE\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FILE_CreateConnector) function and passed an input file and an output file (optionally, one of these can be NULL). This connector could be used for both reading and writing files, when input comes from one file, and output goes to another file. This differs from normal file I/O when a single handle is used to access only one file, but resembles data exchange via sockets, instead. In the case of the HTTP connection, the [HTTP\_CreateConnector](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HTTP_CreateConnector) type is called and passed a pointer to network information structure, a pointer to a user-header consisting of HTTP tag-values, and a bitmask representing flags that affect the HTTP response.

The general service connector is the most complex connector in the library, and can model any type of service. It can be used for data transfer between an application and a named service. The data can be sent via HTTP or directly as a byte stream (using SOCK directly). In the former case it uses the HTTP connectors and in the latter the SOCK connectors. The general service connector is used when the other connector types are not adequate for implementing the task on hand.

More details on [connector classes](ch_conn.html#ch_conn.conn_def) are presented in a later chapter.

<a name="ch_intro.intro_streams"></a>

### Connection Streams

The CONNECT module provides a higher level of abstraction to connection programming in the form of C++ connection stream classes derived from the [CNcbiIostream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiIostream) class, which is in turn typedef'd as ***std***::***iostream***. This makes the familiar stream I/O operators and manipulators available to the connection stream. In addition, [CConn\_IOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_IOStream) performs more error checking than ***std***::***iostream*** and it allows input operations to be tied to the output operations so that any input attempt first flushes the output queue from the internal buffers.

[Figure 2](#ch_intro.F2) shows the most common connection stream classes derived from [CConn\_IOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_IOStream) - [CConn\_HttpStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_HttpStream), [CConn\_MemoryStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_MemoryStream), [CConn\_ServiceStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_ServiceStream), and [CConn\_SocketStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_SocketStream).

<a name="ch_intro.F2"></a>

![Figure 2. Connection stream classes](/cxx-toolkit/static/img/CConn_IOStream.gif)

Figure 2. Connection stream classes

[CConn\_HttpStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_HttpStream) models a stream of data between and HTTP client and an HTTP server (such as a web server). The server end of the stream is identified by a URL of the form `http[s]://host[:port]/path[?query]`.

[CConn\_MemoryStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_MemoryStream) stream models data transfer in memory similar to the C++ strstream class.

[CConn\_ServiceStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_ServiceStream) stream models data transfer with a named service that can be found via dispatcher/load-balancing daemon and implemented as either HTTP CGI, standalone server, or NCBI service.

[CConn\_SocketStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_SocketStream) models a stream of bytes in a bi-directional TCP connection between two end points specified by a host/port pair. As the name suggests the socket stream uses the socket interface directly.

More details on [connection stream classes](ch_conn.html#ch_conn.cpp_connection_streams) are presented in a later chapter.

<a name="ch_intro.intro_sendmail"></a>

### Sendmail API

The CONNECT module provides an API that provides access to SMTP protocol. SMTP (Simple Mail Transfer Protocol) is a standard email relaying protocol used by many popular MTAs (Message Transfer Agents), such as sendmail, smail, etc, found on many systems. SMTP passes (relays) email messages between hosts in the Internet all the way from sender to recipient.

To initiate the use of the sendmail API, you must call the ***SendMailInfo\_Int()*** function that initializes structure [SSendMailInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SSendMailInfo), passed by a pointer. Your code then modifies the structure to contain proper information such as that expected in a mail header (To, From, CC, BCC fields) and other communication settings from their default values set at initialization. Then, you can send email using the [CORE\_SendMail()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CORE_SendMail) or [CORE\_SendMailEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CORE_SendMailEx) functions.

<a name="ch_intro.intro_threadedserver"></a>

### Threaded Server

The CONNECT module provides support for multithreaded servers through the [CThreadedServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadedServer) class. The [CThreadedServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadedServer) class is an abstract class for network servers and uses thread pools. This class maintains a pool of threads, called worker threads, to process incoming connections. Each connection gets assigned to one of the worker threads, allowing the server to handle multiple requests in parallel while still checking for new requests.

You must derive your threaded server from the [CThreadedServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadedServer) class and define the [Process()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Process) method to indicate what to do with each incoming connection. The [Process()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Process) method runs asynchronously by using a separate thread for each request.

More details on threaded server classes are presented in a later chapter.

<a name="ch_intro.intro_ctool"></a>

The CTOOL Module
----------------

The CTOOL module provides bridge mechanisms and conversion functions. More specifically, the CTOOL module provides a number of useful functions such as a bridge between the NCBI C++ Toolkit and the older C Toolkit for error handling, an ASN.1 connections stream that builds on top of the [connection stream](#ch_intro.intro_connector), and an ASN converter that provides templates for converting ASN.1-based objects between NCBI's C and C++ in-memory layouts.

The ASN.1 connections support is provides through functions [CreateAsnConn()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateAsnConn) for creating an ASN stream connection; [CreateAsnConn\_ServiceEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateAsnConn_ServiceEx) for creating a service connection using the service name, type and connection parameters; and [CreateAsnConn\_Service()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateAsnConn_Service) which is a specialized case of [CreateAsnConn\_ServiceEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateAsnConn_ServiceEx) with some parameters set to zero.

<a name="ch_intro.intro_dbapi"></a>

The DBAPI Module
----------------

The DBAPI module supports object oriented access to databases by providing user classes that model a database as a data source to which a connection can be made, and on which ordinary SQL queries or stored procedure SQL queries can be issued. The results obtained can be navigated using a result class or using the 'cursor' mechanism that is common to many databases.

The user classes are used by a programmer to access the database. The user classes depend upon a database driver to allow low level access to the underlying relational database management system (RDBMS). Each type of RDBMS can be expected to have a different driver that provides this low level hook into the database. The database drivers are architected to provide a uniform interface to the user classes so that the database driver can be changed to connect to a different database without affecting the program code that makes use of the user classes. For a list of the database drivers for different database that are supported, see the [Supported DBAPI Drivers section](ch_dbapi.html#ch_dbapi.dbapi_drivers).

The following is a list of topics presented in this section:

-   [Database User Classes](#ch_intro.intro_dbapi_user)

-   [Database Driver Architecture](#ch_intro.intro_dbapi_driver)

<a name="ch_intro.intro_dbapi_user"></a>

### Database User Classes

The interface to the database is provided by a number of C++ classes such as the ***IDataSource, IDbConnection, IStatement, ICallableStatement, ICursor, IResultSet, IResultSetMetaData*** . The user does not use these interfaces directly. Instead, the DBAPI module provides concrete classes that implement these interface classes. The corresponding concrete classes for the above mentioned interfaces are ***CDataSource, CDbConnection, CStatement, CCallableStatement, CCursor, CResultSet, CResultSetMetaData***.

Before accessing to a specific database, the user must register the driver with the [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDriverManager) class which maintains the drivers registered for the application. The user does this by using the [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDriverManager) class' factory method [GetInstance()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetInstance) to create an instance of the [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDriverManager) class and registering the driver with this driver manager object. For details on how this can be done, see the [Choosing the Driver](ch_dbapi.html#ch_dbapi.dbapi_choose_driver) section.

After the driver has been registered, the user classes can be used to access that database. There are a number of ways this can be done, but the most common method is to call the [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource) factory method [CreateDs()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateDs) to create an instance of the data source. Next, the [CreateConnection()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateConnection) method for the data source is called, to return a connection object that implements the [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IConnection) interface. Next, the connection object's [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method is called with the user name, password, server name, database name to make the connection to the database. Next, the connection object's [CreateStatement()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateStatement) method is called to create a statement object that implements the [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IStatement) interface. Next, the statement object's [Execute()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Execute) method is called to execute the query. Note that additional calls to the [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IConnection)::[CreateStatement()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateStatement) results in cloning the connection for each statement which means that these connections inherit the database which was specified in the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) or [SetDatabase()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDatabase) method.

Executing the statement objects' [Execute()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Execute) method returns the result set which is stored in the statement object and can be accessed using the statement object's [GetResultSet()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetResultSet) method. You can then call the statement object's [HasRows()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HasRows) method which returns a Boolean true if there are rows to be processed. The type of the result can be obtained by calling the ***IResultSet::GetResultType() method***. The [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IStatement)::[ExecuteUpdate()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ExecuteUpdate) method is used for SQL statements that do not return rows (UPDATE or DELETE SQL statement), in which case the method [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IStatement)::[GetRowCount()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetRowCount) returns the number of updated or deleted rows.

Calling the [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IStatement)::[GetResultSet()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetResultSet) returns the rows via the result set object that implements the [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IResultSet) interface. The method [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IResultSet)::[Next()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Next) is used to fetch each row in the result set and returns a false when no more fetch data is available; otherwise, it returns a true. All column data, except BLOB data is represented by a [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant) object. The method [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IResultSet)::[GetVariant()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetVariant) takes the column number as its parameter where the first column has the start value of 1.

The [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant) class is used to describe the fields of a record which can be of any data type. The [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant) has a set of accessory methods (***GetXXX()***) to extract a value of a particular type. For example, the ***GetInt4(), GetByte(), GetString()***, methods will extract an Int4, Byte data value from the [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant) object. If data extraction is not possible because of incompatible types, the [CVariantException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariantException) is thrown. The [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant) has a set of factory methods for creating objects of a particular data type, such as [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant)::[BigInt()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BigInt) for Int8, [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant)::[SmallDateTime()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SmallDateTime) for NCBI's [CTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime), and so on.

For sample code illustrating the above mentioned steps, see the [Data Source and Connections](ch_dbapi.html#ch_dbapi.dbapi_src_cnxns) and [Main Loop](ch_dbapi.html#ch_dbapi.dbapi_main_loop) sections.

<a name="ch_intro.intro_dbapi_driver"></a>

### Database Driver Architecture

The driver can use two different methods to access the particular RDBMS. If RDBMS provides a client library (`CTLib`) for a given computer system, then the driver utilizes this library. If there is no client library, then the driver connects to RDBMS through a special gateway server which is running on a computer system where such library does exist.

The database driver architecture has two major groups of the driver's objects: the RDBMS independent objects, and the RDBMS dependent objects specific to a RDBMS. From a user's perspective, the most important RDBMS dependent object is the driver context object. A connection to the database is made by calling the driver context's [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method. All driver contexts implement the same interface defined in the [I\_DriverContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=I_DriverContext) class.

If the application needs to connect to RDBMS libraries from different vendors, there is a problem trying to link statically with the RDBMS libraries from different vendors. The reason for this is that most of these libraries are written in C, and may use the same names which cause name collisions. Therefore, the [C\_DriverMgr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=C_DriverMgr) is used to overcome this problem and allow the creation of a mixture of statically linked and dynamically loaded drivers and use them together in one executable.

The low level connection to an RDBMS is specific to that RDBMS. To provide RDBMS independence, the connection information is wrapped in an RDBMS independent object [CDB\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Connection). The commands and the results are also wrapped in an RDBMS independent object. The user is responsible for deleting these RDBMS independent objects because the life spans of the RDBMS dependent and RDBMS independent objects are not necessarily the same.

Once you have the [CDB\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Connection) object, you can use it as a factory for the different types of command objects. The command object's [Result()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Result) method can be called to get the results. To send and to receive the data through the driver you must use the driver provided datatypes such as ***CDB\_BigInt, CDB\_Float, CDB\_SmallDateTime***. These driver data types are all derived from [CDB\_Object](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Object) class.

More [details on the database driver architecture](ch_dbapi.html#ch_dbapi.dbapi_driver_ref) is presented in a later chapter.

<a name="ch_intro.intro_gui"></a>

The GUI Module
--------------

The C++ Toolkit does not include its own GUI Module. Instead, Toolkit-based GUI applications make use of third party GUI packages - we recommend [wxWidgets](https://www.wxwidgets.org/).

More details on developing GUI application in conjunction with the C++ Toolkit are presented in a [later chapter](ch_gui.html).

<a name="ch_intro.intro_html"></a>

The HTML Module
---------------

The HTML module implements a number of HTML classes that are intended for use in CGI and other programs. The HTML classes can be used to generate HTML code dynamically.

The HTML classes can be used to represent HTML page internally in memory as a graph. Each HTML element or tag is represented by a node in the graph. The attributes for an HTML element are represented as attributes in the node. A node in the graph can have other elements as children. For example, for an HTML page, the top HTML element will be described by an HTML node in the graph. The HTML node will have the HEAD and BODY nodes as its children. The BODY node will have text data and other HTML nodes as its children. The graph structure representation of an HTML page allows easy additions, deletions and modification of the page elements.

Note that while the HTML classes can be used to represent the HTML page internally in memory as a graph there is no provision for parsing of existing HTML pages to generate these classes.

The following is a list of topics presented in this section:

-   [Relationships between HTML classes](#ch_intro.intro_html_classes)

-   [HTML Processing](#ch_intro.intro_html_processing)

<a name="ch_intro.intro_html_classes"></a>

### Relationships between HTML classes

The base class for all nodes in the graph structure for an HTML document is the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode). The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class is derived from [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) and provides the ability to add, delete, and modify the nodes in the graph. The ability to add and modify nodes is inherited by all the classes derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) (see [Figure 3](#ch_intro.F3)). The classes derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) represent the HTML elements on an HTML page. You can easily identify the HTML element that a class handles from the class names such as [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText), [CHTMLButtonList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLButtonList), etc.

<a name="ch_intro.F3"></a>

![Figure 3. HTML classes derived from CNCBINode](/cxx-toolkit/static/img/CNCBINode.gif)

Figure 3. HTML classes derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)

The text node classes [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) and [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) are intended to be used directly by the user. Both [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) and [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) are used to insert text into the generated html, with the difference that [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) class performs HTML encoding before generation. A number of other classes such as [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode), [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement), [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), and [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement) are base classes for the elements actually used to construct an HTML page, such as [CHTML\_head](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_head), [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) (see [Figure 4](#ch_intro.F4)).

<a name="ch_intro.F4"></a>

![Figure 4. The CHTMLNode class and its derived classes](/cxx-toolkit/static/img/CHTMLNode.gif)

Figure 4. The [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) class and its derived classes

The [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) class is the base class for [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) and [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement) and is used for describing the HTML elements that are found in an HTML page such as HEAD, BODY, H1, BR, etc. The [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) tag describes those tags that have a close tag and are well formed. The [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement) class describes tags that are often found without the corresponding close tag such as the BR element that inserts a line break. The [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement) class is used in lists such as the OL element.

Important classes of HTML elements used in forms to input data are the input elements such as checkboxes, radio buttons, text fields, etc. The [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input) class derived from the [CHTML\_OpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_OpenElement) class serves as the base class for a variety of input elements (see [Figure 5](#ch_intro.F5)).

<a name="ch_intro.F5"></a>

![Figure 5. The CHTML\_input class and its derived classes](/cxx-toolkit/static/img/CHTML_input.gif)

Figure 5. The [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input) class and its derived classes

More [details on HTML classes and their relationships](ch_html.html#ch_html.html_classes) is presented in a later chapter.

<a name="ch_intro.intro_html_processing"></a>

### HTML Processing

The HTML classes can be used to dynamically generate pages. In addition to the classes described in the previous section, there are a number of page classes that are designed to help with HTML processing. The page classes serve as generalized containers for collections of other HTML components, which are mapped to the page. [Figure 6](#ch_intro.F6) describes the important classes in page class hierarchy.

<a name="ch_intro.F6"></a>

![Figure 6. HTML page classes](/cxx-toolkit/static/img/CHTMLPage.gif)

Figure 6. HTML page classes

The [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) class is as a base class whose features are inherited by the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) derived class - it is not intended for direct usage. Through the methods of this class, you can access or set the CgiApplication, Style, and TagMap stored in the class.

The [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class when used with the appropriate HTML template file, can generate the 'bolier plate' web pages such as a standard corporate web page, with a corporate logo, a hook for an application-specific logo, a top menubar of links to several databases served by a query program, a links sidebar for application-specific links to relevant sites, a VIEW tag for an application's web interface, a bottom menubar for help links, disclaimers, and other boiler plate links. The template file is a simple HTML text file with named tags (\<@tagname@\>) which allow the insertion of new HTML blocks into a pre-formatted page.

More [details on CHTMLBasicPage, CHTMLPage and related classes](ch_html.html#ch_html.page_classes) is presented in a later chapter.

<a name="ch_intro.intro_objmgr"></a>

The OBJECT MANAGER Module
-------------------------

The Object Manager module is a library of C++ classes, which facilitate access to biological sequence data. It makes it possible to transparently download data from the GenBank database, investigate biological sequence data structure, retrieve sequence data, descriptions and annotations.

The Object Manager has been designed to present an interface to users and to minimize their exposure to the details of interacting with biological databases and their underlying data structures. The Object Manager, therefore, coordinates the use of biological sequence data objects, particularly the management of the details of loading data from different data sources.

The NCBI databases and software tools are designed around a particular model of biological sequence data. The data model must be very flexible because the nature of this data is not yet fully understood, and its fundamental properties and relationships are constantly being revised. NCBI uses [Abstract Syntax Notation One](http://asn1.elibel.tm.fr) (ASN.1) as a formal language to describe [biological sequence data and its associated information](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/SDKDOCS/INDEX.HTML).

The bio sequence data may be huge and downloading all of this data may not be practical or desirable. Therefore, the Object Manager transparently transmits only the data that is really needed and not all of it at once. There is a [datatool](ch_app.html#ch_app.datatool) that generates corresponding data objects (source code and header files) from the object's ASN.1 specification. The Object Manager is able to manipulate these objects.

Biological sequences are identified by a [Seq\_id](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/SDKDOCS/SEQLOC.HTML), which may have different forms.

The most general container object of bio sequence data, as defined in the NCBI data model, is [Seq\_entry](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/SDKDOCS/SEQSET.HTML). A great deal of NCBI software is designed to accept a Seq\_entry as the primary unit of data. In general, the Seq\_entry is defined recursively as a tree of Seq\_entry objects, where each node contains either [Bioseq](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/SDKDOCS/BIOSEQ.HTML) or list of other Seq\_entry objects and additional data like sequence description, sequence annotations.

Two important concepts in the Object Manager are `scope` and `reference resolution`. The client defines a scope as the sources of data where the system uses only "allowed" sources to look for data. Scopes may contain several variants of the same bio sequence (Seq\_entry). Since sequences refer to each other, the scope sets may have some data that is common to both scopes. In this case changing data in one scope should be reflected in all other scopes, which "look" at the same data.

The other concept a client uses is `reference resolution`. Reference resolution is used in situations where different biological sequences can refer to each other. For example, a sequence of amino acids may be the same as sequence of amino acids in another sequence. The data retrieval system should be able to resolve such references automatically answering what amino acids are actually here. Optionally, at the client's request, such automatic resolution may be turned off.

The Object Manager provides a consistent view of the data despite modifications to the data. For example, the data may change during a client's session because new biological data has been uploaded to the database while the client is still processing the old data. In this case, when the client for additional data, the system should retrieve the original bio sequence data, and not the most recent one. However, if the database changes between a client's sessions, then the next time the client session is started, the most recent data is retrieved, unless the client specifically asks for the older data.

The Object Manager is thread safe, and supports multithreading which makes it possible to work with bio sequence data from multiple threads.

The Object Manager includes numerous classes for accessing bio sequence data such as [CDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDataLoader) and [CDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDataSource) which manage global and local accesses to data, [CSeqVector](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeqVector) and [CSeqMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeqMap) objects to find and manipulate sequence data, a number of [specialized iterators](ch_objmgr.html#ch_objmgr.om_def.html_Iterators) to parse descriptions and annotations, among others. The [CObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObjectManager) and [CScope](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CScope) classes provide the foundation of the library, managing data objects and coordinating their interactions.

More [details on the Object Manager and related classes](ch_objmgr.html) is presented in a later chapter.

<a name="ch_intro.intro_ser"></a>

The SERIAL Module
-----------------

Click here to see [Full Documentation on the Data Serialization Library](ch_ser.html).

Serial library provides means for loading, accessing, manipulating, and serialization of data in a formatted way. It supports serialization in [ASN.1](http://asn1.elibel.tm.fr) (text or BER encoding), [XML](https://www.w3.org/XML), and [JSON](http://json.org) formats.

The structure of data is described by some sort of formal language. In our case it can be ASN.1, DTD or XML Schema. Based on such specification, [DATATOOL](ch_app.html#ch_app.datatool) application, which is part of the NCBI C++ Toolkit, generates a collection of data storage classes that can be used to store and serialize data. The design purpose was to make these classes as lightweight as possible, moving all details of serialization into specialized classes - [“object streams”](ch_ser.html#ch_ser.objstream.html_intro). Structure of the data is described with the help of [“type information”](ch_ser.html#ch_ser.typeinfo.html). Data objects contain data and type information only. Any such data storage object can be viewed as a node tree that provides random access to its data. Serial library provides means to[traversing](ch_ser.html#ch_ser.typeinfo.html_cobjinfo) this data tree without knowing its structure in advance – using only type information; C++ code generated by DATATOOL makes it possible to access any child node directly.

[“Object streams”](ch_ser.html#ch_ser.objstream.html_intro) are intermediaries between data storage objects and input or output stream. They perform encoding or decoding of data according to format specifications. Guided by the type information embedded into data object, on reading they allocate memory when needed, fill in data, and validate that all mandatory data is present; on writing they guarantee that all relevant data is written and that the resulting document is well-formed. All it takes to read or write a top-level data object is one function call – all the details are handled by an object stream.

Closely related to serialization is the task of converting data from one format into another. One approach could be reading data object completely into memory and then writing it in another format. The only problem is that the size of data can be huge. To simplify this task and to avoid storing data in memory, serial library provides [“object stream copier”](ch_ser.html#ch_ser.objstream.html_objcopy) class. It reads data by small chunks and writes it immediately after reading. In addition to small memory footprint, it also works much faster.

Input data can be very large in size; also, reading it completely into memory could not be the goal of processing. Having a large file of data, one might want to investigate information containers only of a particular type. Serial library provides a variety of means for doing this. The list includes [read](ch_ser.html#ch_ser.objstream.html_readhooks) and [write](ch_ser.html#ch_ser.objstream.html_writehooks) hooks, several types of [stream iterators](ch_ser.html#ch_ser.stream_iterators), and [filter templates](ch_ser.html#ch_ser.serial_filter). It is worth to note that, when using read hooks to read child nodes, one might end up with an invalid top-level data object; or, when using write hooks, one might begin with an invalid object and fill in missing data on the fly – in hooks.

In essence, “hook” is a callback function that client application provides to serial library. Client application installs the hook, then reads (or writes) data object, and somewhere from the depths of serialization processing, the library calls this hook function at appropriate times, for example, when a data chunk of specified type is about to be read. It is also possible to install [context-specific hooks](ch_ser.html#ch_ser.stack_path_hooks). Such hooks are triggered when serializing a particular object type in a particular context; for example, for all objects of class A which are contained in object B.

<a name="ch_intro.intro_util"></a>

The UTIL Module
---------------

The UTIL module is collection of some very useful utility classes that implement I/O related functions, algorithms, container classes; text related and thread related functions. Individual facilities include classes to compute checksums, implement interval search trees, lightweight strings, string search, linked sets, random number generation, UTF-8 conversions, registry based DNS, rotating log streams, thread pools, and many others.

The following sections give an overview of the utility classes:

-   [Checksum](#ch_intro.intro_checksum)

-   [Console Debug Dump Viewer](#ch_intro.intro_dumpv)

-   [Diff API](#ch_intro.Diff_API)

-   [Floating Point Comparison](#ch_intro.Floating_Point_Comparison)

-   [Lightweight Strings](#ch_intro.intro_lightstring)

-   [Range Support](#ch_intro.intro_range)

-   [Linked Sets](#ch_intro.intro_linkedset)

-   [Random Number Generator](#ch_intro.intro_random)

-   [Registry based DNS](#ch_intro.intro_regdns)

-   [Regular Expressions](#ch_intro.Regular_Expressions)

-   [Resizing Iterator](#ch_intro.intro_resizeiterator)

-   [Rotating Log Streams](#ch_intro.intro_rotatelog)

-   [Stream Support](#ch_intro.intro_streamsupport)

-   [String Search](#ch_intro.intro_strsearch)

-   [Synchronized and blocking queue](#ch_intro.Synchronized_and_blo)

-   [Thread Pools](#ch_intro.intro_thrpools)

-   [UTF 8 Conversion](#ch_intro.intro_utf8)

<a name="ch_intro.intro_checksum"></a>

### Checksum

The Checksum class implements CRC32 (Cyclic Redundancy Checksum 32-bit) calculation. The CRC32 is a 32-bit polynomial checksum that has many applications such as verifying the integrity of a piece of data. The [CChecksum](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CChecksum) class implements the CRC32 checksum that can be used to compute the CRC of a sequence of byte values.

The checksum calculation is set up by creating a [CChecksum](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CChecksum) object using the [CChecksum](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CChecksum) constructor and passing it the type of CRC to be calculated. Currently only CRC32 is defined, so you must pass it the enumeration constant eCRC32 also defined in the class.

Data on which the checksum is to be computed is passed to the ***CChecksum's*[AddLine()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddLine) or [AddChars()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddChars) method as a character array. As data is passed to these methods, the CRC is computed and stored in the class. You can get the value of the computed CRC using the [GetChecksum()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetChecksum) method. Alternatively, you can use the [WriteChecksum()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=WriteChecksum) method and pass it a [CNcbiOstream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiOstream) object and have the CRC written to the output stream in the following syntax:

/\* Original file checksum: lines: *nnnn*, chars: *nnnn*, CRC32: *xxxxxxxx* \*/

<a name="ch_intro.intro_dumpv"></a>

### Console Debug Dump Viewer

The UTIL module implements a simple Console Debug Dump Viewer that enables the printing of object information on the console, through a simple console interface. Objects that can be debugged must be inherited from [CDebugDumpable](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDebugDumpable) class. The [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) is derived from [CDebugDumpable](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDebugDumpable), and since most other objects are derived from [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject) this makes these objects 'debuggable'.

The Console Debug Dump Viewer is implemented by the [CDebugDumpViewer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDebugDumpViewer) class. This class implements a breakpoint method called [Bpt()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Bpt). This method is called with the name of the object and a pointer to the object to be debugged. This method prompts the user for commands that the user can type from the console:

    Console Debug Dump Viewer
    Stopped at  testfile.cpp(120)
    current object: myobj = xxxxxx
    Available commands:
       t[ypeid]  address
       d[ump]    address  depth
       go

The [CDebugDumpViewer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDebugDumpViewer) class also permits the enabling and disabling of debug dump breakpoints from the [registry](#ch_intro.intro_reg).

<a name="ch_intro.Diff_API"></a>

### Diff API

The Diff API includes the [CDiff](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDiff) class for character-based diffs and the [CDiffText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDiffText) class for line-based diffs. The API is based on the open source [Diff, Match and Patch Library](https://code.google.com/p/google-diff-match-patch/) and the [Diff Template Library](https://code.google.com/p/dtl-cpp/).

To use the Diff API, include `xdiff` in the **`LIB`** line of your application makefile, and include `<util/diff/diff.hpp>` in your source.

The following sample code shows how to perform both character- and line-based diffs:

    // Print difference list in human readable format
    static void s_PrintDiff(const string& msg, const string& s1, const string& s2,
        const CDiffList& diff)
    {
        NcbiCout << msg << NcbiEndl
            << "Comparing '" << s1 << "' to '" << s2 << "':" << NcbiEndl;
        ITERATE(CDiffList::TList, it, diff.GetList()) {
            string op;
            size_t n1 = 0;
            size_t n2 = 0;

            if (it->IsDelete()) {
                op = "-";
                n1 = it->GetLine().first;
            } else if (it->IsInsert()) {
                op = "+";
                n2 = it->GetLine().second;
            } else {
                op = "=";
                n1 = it->GetLine().first;
                n2 = it->GetLine().second;
            }
            NCbiCout << op << " ("
                 << n1 << "," << n2 << ")"
                 << ": " << "'" << it->GetString() << "'" << NCbiEndl;
        }
    }

    // Perform a character-based diff:
    { {
        CTempString s1("how now");
        CTempString s2("brown cow");
        CDiff d;
        CDiffList& diffs(d.Diff(s1, s2));
        s_PrintDiff("Line-based diff:", s1, s2, diffs);
    } }

    // Perform a line-based diff:
    { {
        CTempString s1("group 1\nasdf asf\ntttt\nasdf asd");
        CTempString s2("group 2\nqwerty\n\nasdf\nasf asd");
        CDiffText d;
        CDiffList& diffs(d.Diff(s1, s2));
        s_PrintDiff("Line-based diff:", s1, s2, diffs);
    } }

For more detailed usage, see the test program:

<https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c%2B%2B/src/util/diff/test/>

<a name="ch_intro.Floating_Point_Comparison"></a>

### Floating Point Comparison

For technical reasons, direct comparison of "close" floating point values is simply not reliable on most computers in use today. Therefore, in cases where the values being compared might be close, it is advisable to apply a tolerance when making comparisons to avoid unexpected results.

The UTIL module defines a function, [g\_FloatingPoint\_Compare()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=g_FloatingPoint_Compare), that implements floating point comparison using a tolerance. In practice this means that code like:

        if (a < b) {
            if (c == d ) {
                if (e > f) {

should be rewritten as:

    #include <util/floating_point.hpp>
    //...
        if (g_FloatingPoint_Compare(a, eFP_LessThan, b,
                                    eFP_WithPercent, percent) {
            if (g_FloatingPoint_Compare(c, eFP_EqualTo, d,
                                        eFP_WithFraction, fraction) {
                if (g_FloatingPoint_Compare(e, eFP_GreaterThan, f,
                                            eFP_WithPercent, percent) {

Note that compared variables must be of the same floating point type, otherwise a compile error will be generated.

For further details on this function, see its Doxygen [documentation](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/floating__point_8hpp.html#a178b404beec22ce1c48057b7a4036c23).

For technical details on the subject, including what it means to be close, see "[Comparing floating point numbers](https://randomascii.wordpress.com/category/floating-point/)" by Bruce Dawson.

<a name="ch_intro.intro_lightstring"></a>

### Lightweight Strings

Class [CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) implements a light-weight string on top of a storage buffer whose lifetime management is known and controlled.

[CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) is designed to perform no memory allocation but provide a string interaction interface congruent with std::basic\_string\<char\>.

As such, CTempString provides a const-only access interface to its underlying storage. Care has been taken to avoid allocations and other expensive operations wherever possible.

[CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) has constructors from std::string and C-style string, which do not copy the string data but keep char pointer and string length.

This way the construction and destruction are very efficient.

Take into account, that the character string array kept by [CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) object must remain valid and unchanged during whole lifetime of the [CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) object.

It's convenient to use the class [CTempString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTempString) as an argument of API functions so that no allocation or deallocation will take place on of the function call.

<a name="ch_intro.intro_linkedset"></a>

### Linked Sets

The UTIL module defines a template container class, [CLinkedMultiset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CLinkedMultiset), that can hold a linked list of multiset container types.

The [CLinkedMultiset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CLinkedMultiset) defines iterator methods ***begin()***, ***end()***, ***find()***, ***lower\_bound()***, ***upper\_bound()***, to help traverse the container. The method ***get()***, fetches the contained value, the method ***insert()*** inserts a new value into the container, and the method ***erase()***, removes the specified value from the container.

<a name="ch_intro.intro_random"></a>

### Random Number Generator

The UTIL module defines the [CRandom](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRandom) class that can be used for generating 32-bit unsigned random numbers. The random number generator algorithm is the Lagged Fibonacci Generator (LFG) algorithm.

The random number generator is initialized with a seed value, and then the [GetRandom()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetRandom) method is called to get the next random number. You can also specify that the random number value that is returned be in a specified range of values.

<a name="ch_intro.intro_range"></a>

### Range Support

The UTIL module provides a number of container classes that support a *range* which models an interval consisting of a set of ordered values. the [CRange](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRange) class stores information about an interval, **[*from*, *to*]**, where the ***from*** and ***to*** points are inclusive. This is sometimes called a *closed interval*.

Another class, the [CRangeMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRangeMap) class, is similar to the [CRange](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRange) class but allows for the storing and retrieving of data using the interval as key. The time for iterating over the interval is proportional to the amount of intervals produced by the iterator and may not be efficient in some cases.

Another class, the [CIntervalTree](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CIntervalTree) class, has the same functionality as the [CRangeMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRangeMap) class but uses a different algorithm; that is, one based on McCreight's algorithm. Unlike the [CRangeMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRangeMap) class, the [CIntervalTree](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CIntervalTree) class allows several values to have the same key interval. This class is faster and its speed is not affected by the type of data but it uses more memory (about three times as much as [CRangeMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRangeMap)) and, as a result, is less efficient when the amount of interval in the set is quite big. For example, the [CIntervalTree](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CIntervalTree) class becomes less efficient than [CRangeMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRangeMap) when the total memory becomes greater than processor cache.

More [details on range classes](ch_core.html#ch_core.template_typename_Co) are presented in a later chapter.

<a name="ch_intro.intro_regdns"></a>

### Registry based DNS

The UTIL module defines the ***CSmallDns*** class that implements a simple [registry](#ch_intro.intro_reg) based DNS server. The ***CSmallDns*** class provides DNS name to IP address translations similar to a standard DNS server, except that the database used to store DNS name to IP address mappings is a non-standard local database. The database of DNS names and IP address mappings are kept in a registry-like file named by local\_hosts\_file using section [LOCAL\_DNS].

The ***CSmallDns*** has two methods that are responsible for providing the DNS name to IP address translations: the [LocalResolveDNS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LocalResolveDNS) method and the [LocalBackResolveDNS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LocalBackResolveDNS) method. The [LocalResolveDNS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LocalResolveDNS) method does 'forward' name resolution. That is, given a host name, it returns a string containing the IP address in the dotted decimal notation. The [LocalBackResolveDNS](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LocalBackResolveDNS) method does a 'reverse lookup'. That is, given an IP address as a dotted decimal notation string, it returns the host name stored in the registry.

<a name="ch_intro.Regular_Expressions"></a>

### Regular Expressions

The UTIL module defines the [CRegexp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCRegexp.html) class that supports defining, compiling, and searching against the "Perl compatible" flavor of regular expressions (PCRE). Note that PCRE, as implemented in `$(PCRE_LIBS)`, is not actually 100% compatible with the flavor of regular expressions implemented in Perl interpreters.

A simple example of using [CRegexp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRegexp):

    #include <util/xregexp/regexp.hpp>
    ...
        CRegexp regex("^(bye|exit|quit)$", CRegexp::fCompile_ignore_case);
        bool time2quit = regex.IsMatch(line);

To use [CRegexp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRegexp), link with the `xregexp` library:

    LIB  = xregexp $(PCRE_LIB) xncbi
    LIBS = $(PCRE_LIBS) $(ORIG_LIBS)

***Note:*** [CRegexp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRegexp) has no replacement functionality - i.e. there is no API support for replacing matched text with provided text or matched groups.

<a name="ch_intro.intro_resizeiterator"></a>

### Resizing Iterator

The UTIL module defines two template classes, the [CResizingIterator](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CResizingIterator) and the [CConstResizingIterator](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConstResizingIterator) classes that handle sequences represented as packed sequences of elements of different sizes For example, a vector \<char\> might actually hold 2-bit values, such as nucleotides, or 32-bit integer values.

The purpose of these iterator classes is to provide iterator semantics for data values that can be efficiently represented as a packed sequence of elements regardless of the size.

<a name="ch_intro.intro_rotatelog"></a>

### Rotating Log Streams

The UTIL module defines the [CRotatingLogStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRotatingLogStream) class that can be used to implement a rotating log file. The idea being that once the log of messages gets too large, a 'rotation' operation can be performed. The default rotation is to rename the existing log file by appending it with a timestamp, and opening a new log.

The rotating log can be specified as a file, with an upper limit (in bytes) to how big the log will grow. The [CRotatingLogStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRotatingLogStream) defines a method called [Rotate()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Rotate) that implements the default rotation.

<a name="ch_intro.intro_streamsupport"></a>

### Stream Support

The UTIL module defines a number of portable classes that provide additional stream support beyond that provided by the standard C++ streams. The [CByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CByteSource) class acts as an abstract base class (see [Figure 7](#ch_intro.F7)), for a number of stream classes derived from it. As the name of the other classes derived from [CByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CByteSource) suggests, each of these classes provides the methods from reading from the named source. To list a few examples: [CFileByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CFileByteSource) is a specialized class for reading from a named file; [CMemoryByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMemoryByteSource) is a specialized class for reading from a memory buffer; [CResultByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CResultByteSource) is a specialized class for reading database results; [CStreamByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CStreamByteSource) is a specialized class from reading from the C++ input stream (istream); [CFStreamByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CFStreamByteSource) is a specialized class from reading from the C++ input file stream (ifstream).

<a name="ch_intro.F7"></a>

![Figure 7. Relationship between CByteSource and its derived classes](/cxx-toolkit/static/img/CByteSource.gif)

Figure 7. Relationship between [CByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CByteSource) and its derived classes

The classes such as [CSubFileByteSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSubFileByteSource) are used to define a slice of the source stream in terms of a start position and a length. The read operations are then confined to this slice.

Additional classes, the [CIStreamBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CIStreamBuffer) and the [COStreamBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=COStreamBuffer) have been defined for standard input and output buffer streams. These can be used in situations where a compiler's implementation of the standard input and output stream buffering is inefficient.

More details on the stream classes are presented in a later chapter.

<a name="ch_intro.intro_strsearch"></a>

### String Search

The UTIL module defines the [CBoyerMooreMatcher](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CBoyerMooreMatcher) class and the [CTextFsm](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTextFsm) class which are used for searching for a single pattern over varying texts.

The [CBoyerMooreMatcher](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CBoyerMooreMatcher) class, as the name suggests, uses the Boyer-Moore algorithm for string searches. The [CTextFsm](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTextFsm) is a template class that performs the search using a finite state automaton for a specified to be matched data type. Since the matched data type is often a string, the [CTextFsa](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTextFsa) class is defined as a convenience by instantiating the [CTextFsm](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTextFsm) with the matched type template parameter set to string.

The search can be setup as a case sensitive or case insensitive search. The default is case sensitive search. In the case of the [CBoyerMooreMatcher](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CBoyerMooreMatcher) class, the search can be setup for any pattern match or a whole word match. A whole word match means that a pattern was found to be between white spaces. The default is any pattern match.

<a name="ch_intro.Synchronized_and_blo"></a>

### Synchronized and blocking queue

The UTIL module defines class [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue) which implements a thread-safe queue that has “blocking” semantics: when queue is empty [Pop()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Pop) method will effectively block execution until some elements will be added to the queue; when queue have reached its maximum size [Push()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Push) method will block execution until some elements will be extracted from queue. All these operations can be controlled by timeout. Besides that [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue) is not bound to first-in-first-out queue paradigm. It has underlying stl container (deque by default) which will define the nature of queue. This container is set via template parameter to [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue) and can be deque, vector, list, CSyncQueue\_set, CSyncQueue\_multiset and CSyncQueue\_priority\_queue (the latter three are small addons to STL set, multiset and priority\_queue for the sake of compatibility with [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue)).

There is also [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue)::[TAccessGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TAccessGuard) class which can lock the queue for some bulk operations if during them queue should not be changed by other threads.

For more details on [CSyncQueue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSyncQueue) look here: <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/CSyncQueueDescription.html>.

<a name="ch_intro.intro_thrpools"></a>

### Thread Pools

The UTIL module defines a number of classes implementing pool of threads.

[CThreadPool](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool) is the main class. It executes any tasks derived from the [CThreadPool\_Task](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool_Task) class. The number of threads in pool is controlled by special holder of this policy — object derived from [CThreadPool\_Controller](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool_Controller) (default implementation is [CThreadPool\_Controller\_PID](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool_Controller_PID) based on Proportional-Integral-Derivative algortithm). All threads executing by [CThreadPool](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool) are the instances of [CThreadPool\_Thread](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadPool_Thread) class or its derivatives.

More [details on threaded pool classes](ch_core.html#ch_core.Thread_Pools) are presented in a later chapter.

<a name="ch_intro.intro_utf8"></a>

### UTF 8 Conversion

The UTIL module provides a number of functions to convert between UTF-8 representation, ASCII 7-bit representation and Unicode representations. For example, [StringToCode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=StringToCode) converts the first UTF-8 character in a string to a Unicode symbol, and [StringToVector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=StringToVector) converts a UTF-8 string into a vector of Unicode symbols.

The result of a conversion can be success, out of range, or a two character sequence of the skip character (0xFF) followed by another character.


