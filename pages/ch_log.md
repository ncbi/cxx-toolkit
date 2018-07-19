---
layout: default
title: Logging and Diagnostics
nav: pages/ch_log
---


{{ page.title }}
================================================

Overview
--------

This section provides reference information on the use of the diagnostic stream classes. For an overview of the diagnostic stream concepts refer to the [introductory chapter](ch_intro.html#ch_intro.intro_diag).


<a name="ch_core.diag"></a>

Working with Diagnostic Streams ([\*](ch_debug.html#ch_debug.std_cpp_message_post))
-----------------------------------------------------------------------------------



The [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNcbiDiag.html) class implements the functionality of an output stream enhanced with error posting mechanisms similar to those found in the NCBI C Toolkit. A [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) object has the look and feel of an output stream; its member functions and friends include output operators and format manipulators. A [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) object is not itself a stream, but serves as an interface to a stream which allows multiple threads to write to the same output. Each instance of [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) includes the following private data members:

-   a buffer to store (a single) message text

-   a severity level

-   a set of post flags

Limiting each instance of [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) to the storage and handling of a single message ensures that multiple threads writing to the same stream will not have interleaving message texts.

The following topics are discussed in this section:

-   [Where Diagnostic Messages Go](#ch_core.Where_Diagnostic_Messages_Go)

-   [Setting Diagnostic Severity Levels](#ch_core.diag_severity)

-   [Diagnostic Messages Filtering](#ch_core.diagnostic_messages_filtering)

-   [Log File Format](#ch_core.Log_File_Format)

    -   [The Old Post Format](#ch_core.The_Old_Post_Format)

    -   [The New Post Format](#ch_core.The_New_Post_Format)

    -   [Controlling the Appearance of Diagnostic Messages using Post Flags](#ch_core.diag_post_flags)

-   [Defining the Output Stream](#ch_core.diag_set_stream)

-   [Tee Output to STDERR](#ch_core.Tee_Output_to_STDERR)

-   [The Message Buffer](#ch_core.diag_buffering)

-   [Logging Requests](#ch_core.Logging_Requests)

-   [Using subhit IDs to express call tree hierarchy](#ch_core.Request_Exit_Status_Codes)

-   [Request Exit Status Codes](#ch_core.Request_Exit_Status_Codes)

    -   [Standard (HTTP-like) status codes](#ch_core.Standard_HTTPlike_status_codes)

    -   [NCBI-specific status codes](#ch_core.NCBIspecific_status_codes)

-   [Error codes and their Descriptions](#ch_core.diag_errcodes)

-   [Defining Custom Handlers using CDiagHandler](#ch_core.diag_handlers)

-   [The ERR\_POST and LOG\_POST Macros](#ch_core.ERR_POST)

-   [The \_TRACE macro](#ch_core._TRACE)

-   [Performance Logging](#ch_core.Performance_Logging)

-   [Stack Traces](#ch_core.Stack_Traces)

    -   [Printing a Stack Trace](#ch_core.Printing_a_Stack_Trace)

    -   [Obtaining a Stack Trace for Exceptions](#ch_core.Obtaining_a_Stack_Trace_for_Exce)

-   [Logging modules and its configuration parameters](#ch_core.Logging_Modules)

    -   [C++](#ch_core.Logging_Modules_CXX)
    
    -   [CLog](#ch_core.Logging_Modules_CLog)
    
    -   [ncbi_applog](#ch_core.Logging_Modules_ncbi_applog)

<a name="ch_core.Where_Diagnostic_Messages_Go"></a>

### Where Diagnostic Messages Go

The following decision tree describes how the destination for diagnostics messages is determined.

1.  Before the application is constructed (before [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) is called), everything goes to:

    1.  (Unix-like systems only) `/log/fallback/UNKNOWN.{log|err|trace}` -- if available

    2.  **`STDERR`** -- otherwise

2.  When the application is ready, and its name is known, but before the configuration file is loaded:

    1.  If [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) is passed flags **`eDS_Default`** or **`eDS_ToStdlog`**, then the diagnostics goes:

        1.  (Unix-like systems only) if `/log` is present:

            1.  if the application is described in `/etc/toolkitrc` -- to `/log/<token>/appname.{log|err|trace}`

            2.  else if environment variable **`$SERVER_PORT`** is set -- to `/log/$SERVER_PORT/appname.{log|err|trace}`

            3.  else (or if failed to switch to one of the above two locations) -- to `/log/srv/appname.{log|err|trace}`

            4.  or, if failed to switch to that -- to `/log/fallback/appname.{ log|err|trace}`

        2.  else (or if failed to switch to any of the /log location):

            1.  **`eDS_ToStdlog`** -- to `<current_working_dir>/appname.{ log|err|trace}` (and, if cannot, then continues to go to **`STDERR`**)

            2.  **`eDS_Default`** -- continues to go to **`STDERR`**

    2.  If [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) is passed flags other than **`eDS_Default`** or **`eDS_ToStdlog`**, then the diagnostics goes to:

        1.  **`eDS_ToStdout`** -- standard output stream

        2.  **`eDS_ToStderr`** -- standard error stream

        3.  **`eDS_ToMemory`** -- the application memory

        4.  **`eDS_Disable`** -- nowhere

        5.  **`eDS_User`** -- wherever it went before the [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain) call

        6.  **`eDS_ToSyslog`** -- system log daemon

3.  After the configuration file is loaded, and if it has an alternative location for the log files, then switch to logging to that location. See the list of logfile-related [configuration parameters](ch_libconfig.html#ch_libconfig.libconfig_logfile).

The boolean `TryRootLogFirst` argument in the `[LOG]` section of the application's config file changes the order of locations to be tested. If `TryRootLogFirst` is set, the application will try to open the log file under `/log` first. Only if this fails, then the location specified in the config file will be used.

***Note:***

-   If the logging destination is switched, then a message containing both the old and new locations is logged to both locations.

-   Before the application configuration is loaded, a copy of all diagnostics is saved in memory. If the log destination is changed by the application configuration, then the saved diagnostics are dumped to the final log destination.

<a name="ch_core.diag_severity"></a>

### Setting Diagnostic Severity Levels

Each diagnostic message has its own severity level ([EDiagSev](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EDiagSev)), which is compared to a global severity threshold to determine whether or not its message should be posted. Six levels of severity are defined by the [EDiagSev](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EDiagSev) enumeration:

    /// Severity level for the posted diagnostics.
    enum EDiagSev {
        eDiag_Info = 0, ///< Informational message
        eDiag_Warning,  ///< Warning message
        eDiag_Error,    ///< Error message
        eDiag_Critical, ///< Critical error message
        eDiag_Fatal,    ///< Fatal error -- guarantees exit(or abort)
        eDiag_Trace,    ///< Trace message
    };

Please note that eDiag_Trace is a value of EDiagSev for historical reasons. It is NOT treated as a severity level. It is a separate entity that is just a part of enum EDiagSev.

The default is to post only those messages whose severity level exceeds the **`eDiag_Warning`** level (i.e. **`eDiag_Error, eDiag_Critical`**, and **`eDiag_Fatal`**). The global severity threshold for posting messages can be reset using [SetDiagPostLevel](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagPostLevel) ***(EDiagSev postSev)***. A parallel function, [SetDiagDieLevel](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagDieLevel) ***(EDiagSev dieSev)***, defines the severity level at which execution will abort.

Tracing is considered to be a special, debug-oriented feature, and therefore messages with severity level **`eDiag_Trace`** are not affected by these global `post/die` levels. Instead, [SetDiagTrace](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagTrace) ***(EDiagTrace enable, EDiagTrace default)*** is used to turn tracing on or off. By default, the tracing is off - unless you assign the environment variable **`DIAG_TRACE`** to an arbitrary non-empty string or, alternatively, define a **`DIAG_TRACE`** entry in the **`[DEBUG]`** section of your [registry](#ch_core.registry) file.

The severity level can be set directly in **`POST`** and **`TRACE`** statements, using the severity level manipulators including **`Info`**, **`Warning`**, **`Error`**, **`Critical`**, **`Fatal`**, and **`Trace`**, for example:

    ERR_POST_X(1, Critical << "Something quite bad has happened.");

<a name="ch_core.diagnostic_messages_filtering"></a>

### Diagnostic Messages Filtering

Diagnostic messages from the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) and [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) classes can be filtered by the source file path; message severity; or by the module, class, or function name. Messages from the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) class can also be filtered by error code. If a [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) object is created by chaining to a previous exception, then all exceptions in the chain will be checked against the filter and the exception will pass if any exception in the chain passes (even if one of them is suppressed by a negative condition).

The filter can be set by the **`TRACE_FILTER`** or **`POST_FILTER`** entry in the **`[DIAG]`** section of the registry file or during runtime through [SetDiagFilter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagFilter). Messages with a severity level of **`Fatal`** are not filtered; messages with a severity level of **`Trace`** are filtered by **`TRACE_FILTER`**; and all other messages are filtered by **`POST_FILTER`**.

Filter strings contain filtering conditions separated by a space. An empty filter string means that all messages will appear in the log unfiltered. Filtering conditions are processed from left to right until a condition that matches the message is found. If the message does not match any of the conditions, then the message will be filtered out. Filtering conditions in the string may be preceded by an exclamation mark, which reverses the behavior (so if a message matches the condition it will be suppressed). See [Table 4](#ch_core.T4) for filtering condition samples and syntax.

<a name="ch_core.T4"></a>

Table 4. Filter String Samples

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Filter</th>
<th align="left">Description</th>
<th align="left">Matches</th>
<th align="left">Non Matches</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left"><code>/corelib</code></td>
<td align="left">Log message from source file located in <code>src/corelib</code> or <code>include/corelib</code> or subdirectories.</td>
<td align="left"><ul>
<li><p><code>src/corelib/ncbidiag.cpp</code></p></li>
<li><p><code>src/corelib/test/test_ncbiexec.cpp</code></p></li>
<li><p><code>include/corelib/ncbidiag.hpp</code></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>src/cgi/cgiapp.cpp</code></p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left"><code>/corelib/test</code></td>
<td align="left">Log message from source file located in <code>src/corelib/test</code> or <code>include/corelib/test</code> or subdirectories.</td>
<td align="left"><ul>
<li><p><code>src/corelib/test/test_ncbiexec.cpp</code></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>src/corelib/ncbidiag.cpp</code></p></li>
<li><p><code>include/corelib/ncbidiag.hpp</code></p></li>
<li><p><code>src/cgi/cgiapp.cpp</code></p></li>
</ul></td>
</tr>
<tr class="odd">
<td align="left"><code>/corelib/</code></td>
<td align="left">Log message from source file located in <code>src/corelib</code> or <code>include/corelib</code>, but not subdirectories.</td>
<td align="left"><ul>
<li><p><code>src/corelib/ncbidiag.cpp</code></p></li>
<li><p><code>include/corelib/ncbidiag.hpp</code></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>src/corelib/test/test_ncbiexec.cpp</code></p></li>
<li><p><code>src/cgi/cgiapp.cpp</code></p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left"><code>corelib</code></td>
<td align="left">Log message with module name set to &quot;corelib&quot; and any class or function name.</td>
<td align="left"><ul>
<li><p><code>corelib</code></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><em><strong>CNcbiDiag</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
</tr>
<tr class="odd">
<td align="left"><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></td>
<td align="left">Log message with module name set to &quot;corelib&quot;, class name set to &quot;<em><strong>CNcbiDiag</strong></em>&quot; and any function name.</td>
<td align="left"><ul>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>corelib</code></p></li>
<li><p><em><strong>CNcbiDiag</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left">::<em><strong>CNcbiDiag</strong></em></td>
<td align="left">Log message with class name set to &quot;<em><strong>CNcbiDiag</strong></em>&quot; and any module or function name.</td>
<td align="left"><ul>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>corelib</code></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
</tr>
<tr class="odd">
<td align="left">?</td>
<td align="left">Log message with module name not set and any class or function name.</td>
<td align="left"><ul>
<li><p><em><strong>CNcbiDiag</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>corelib</code></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left"><code>corelib</code>::?</td>
<td align="left">Log message with module name set to &quot;corelib&quot;, class name not set and any function name.</td>
<td align="left"><ul>
<li><p><code>corelib</code></p></li>
<li><p><code>corelib</code>::<em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
</tr>
<tr class="odd">
<td align="left"><em><strong>GetModule()</strong></em></td>
<td align="left">Log message with function name set to &quot;<em><strong>GetModule</strong></em>&quot; and any class or module name.</td>
<td align="left"><ul>
<li><p><code>corelib</code>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em>::<em><strong>GetModule()</strong></em></p></li>
<li><p><em><strong>GetModule()</strong></em></p></li>
</ul></td>
<td align="left"><ul>
<li><p><code>Corelib</code></p></li>
<li><p><code>corelib</code>::<em><strong>CNcbiDiag</strong></em></p></li>
<li><p><em><strong>CNcbiDiag</strong></em></p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left">(20.11)</td>
<td align="left">Log messages with error code 20 and subcode 11.</td>
<td align="left"><ul>
<li><p>ErrCode(20,11)</p></li>
</ul></td>
<td align="left"><ul>
<li><p>ErrCode(20,10)</p></li>
<li><p>ErrCode(123,11)</p></li>
</ul></td>
</tr>
<tr class="odd">
<td align="left">(20-80.)</td>
<td align="left">Log messages with error code from 20 to 80 and any subcode.</td>
<td align="left"><ul>
<li><p>ErrCode(20,11)</p></li>
<li><p>ErrCode(20,10)</p></li>
<li><p>ErrCode(51,1)</p></li>
</ul></td>
<td align="left"><ul>
<li><p>ErrCode(123,11)</p></li>
</ul></td>
</tr>
<tr class="even">
<td align="left">(20-80,120,311-400.1-50,60)</td>
<td align="left">Log messages with error code from 20 to 80, 120, from 311 to 400 and subcode from 1 to 50 and 60.</td>
<td align="left"><ul>
<li><p>ErrCode(20,11)</p></li>
<li><p>ErrCode(321,60)</p></li>
</ul></td>
<td align="left"><ul>
<li><p>ErrCode(20,51)</p></li>
<li><p>ErrCode(321,61)</p></li>
</ul></td>
</tr>
</tbody>
</table>

<div class="table-scroll"></div>

For example:

-   To log diagnostic messages from source files located in `src/corelib` with error codes from 101 to 106 and any subcode, use the following filter: “`/corelib (101-106.)`”.

-   To exclude log messages from sources in `src/serial` and `src/dbapi`, use this filter: “`!/serial !/dbapi`”.

-   To log messages from sources in `src/serial` excluding those with error code 802 and subcodes 4 and 10 through 12, and to exclude messages from sources in `src/dbapi/driver`, use the following filter: “`/serial !(802.4,10-12) !/dbapi/driver`”.

<a name="ch_core.Log_File_Format"></a>

### Log File Format

The format of the log file can be customized. One of the most basic choices is between the "[old post format](#ch_core.The_Old_Post_Format)" and the "[new post format](#ch_core.The_New_Post_Format)". The old format essentially posts arbitrary strings whereas the new format adds many standard fields, and structures the messages so they can be automatically indexed for rapid searching and/or error statistics.

The old format is used by default. To use the new format:

    int main(int argc, const char* argv[])
    {
        GetDiagContext().SetOldPostFormat(false); // use the new format

        return CMyApp().AppMain(argc, argv);
    }

This function should be called before the application's constructor for the setting to be used from the very beginning.

See also:

-   the [Diagnostic Trace](ch_libconfig.html#ch_libconfig.libconfig_diag) section in the library configuration chapter for details on selecting the format using the environment or registry; and

-   the [ERR\_POST and LOG\_POST Macros](#ch_core.ERR_POST) section for more details on creating the log messages.

***Note:*** The old and new post formats described below apply to log messages generated by programs using the C++ Toolkit diagnostics API. Log messages generated in other ways may have different formats.

<a name="ch_core.The_Old_Post_Format"></a>

#### The Old Post Format

The old format for log messages is simply a message - prefixed with the severity level if it is an error message:

    [<severity>: ]<Message>

<a name="ch_core.The_New_Post_Format"></a>

#### The New Post Format

A log file using new format is a binary file containing messages separated with line feed characters (\n, 0x0A). Messages are composed of several predefined fields, each field may contain binary content. To prevent line feeds from appearing in a message body it is encoded using the following table:

| Original byte | Encoded sequence |
|---------------|------------------|
| 0x0A (\n)     | 0x0B (\v)  |
| 0x0B    | 0xFF 0x0B  |
| 0xFF    | 0xFF 0xFF  |

***Note:***

On some platforms if log output is sent to a text stream (e.g. console) the message separator may be replaced with the platform specific newline character or sequence.

The new format for the application log and error postings is:

    <pid>/<tid>/<rid>/<state> <guid> <psn>/<tsn> <time> <host> <client> <session> <application> <event> <message>

<a name="ch_core.T.nc_fielddescriptionwidthtype_o"></a>

Fields in the new post format:

| Field | Description           | Width     | Type or format              |
|-------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pid   | Process ID            | ≥ 5 | Uint8 (decimal)             |
| tid   | Thread ID             | ≥ 3 | Uint8 (decimal)             |
| rid   | Request ID (e.g. iteration number for a CGI)                | ≥ 4 | int (decimal)               |
| state | Application state code                   | 2   | string   |
| guid  | [Globally unique process ID](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=x_CreateUID) | 16  | Int8 (hexadecimal)          |
| psn   | Serial number of the posting within the process             | ≥ 4 | int (decimal)               |
| tsn   | Serial number of the posting within the thread              | ≥ 4 | int (decimal)               |
| time  | Astronomical date and time at which the message was posted  | ≥ 23<br/>(often 26) | `YYYY-MM-DDThh:mm:ss.sss[sss[sss]]`<br/>While seconds typically have six digits after the decimal, there could be more or as few as three. |
| host  | Name of the host where the process runs  | 15  | string (UNK\_HOST if unknown)                  |
| client      | Client IP address     | 15  | valid IP address string (UNK\_CLIENT if unknown)                  |
| session     | Session ID            | ≥ 24      | string (UNK\_SESSION if unknown)               |
| application | Name of the application (see note below) | varies    | string (UNK\_APP if unknown)                   |
| event | What was happening to cause the post (e.g. app start)       | 13  | string (see the [Events and Messages](#ch_core.Events_and_Messages) section)         |
| message     | The logged message    | varies    | string (see the [Events and Messages](#ch_core.Events_and_Messages) section)         |

<div class="table-scroll"></div>

***Note:*** Regarding the width and padding of standard fields:

-   Minimum-width numeric fields are right-justified and zero-padded - for example, a pid of 123 will get printed as "00123" while a pid of 1234567 will get printed as "1234567".

-   Minimum-width text fields and fixed-width fields are left-justified and space-padded.

-   Most fields have a fixed or minimum width to improve readability by generally aligning fields in adjacent rows.

The application name is set to the executable name (without path and extension) by default. Sometimes however the executable's name can be too generic (like "summary" or "fetch"). To change it use [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication)::[SetProgramDisplayName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetProgramDisplayName) function. Better yet, just rename the executable itself. It's a good practice to prefix the application names with something project-specific (like "pc\_summary" for PubChem or "efetch" for E-Utils).

For more details, see:

-   [Application States](#ch_core.Application_States)

-   [Events and Messages](#ch_core.Events_and_Messages)

-   [Examples](#ch_core.Examples)

<a name="ch_core.Application_States"></a>

##### Application States

<a name="ch_core.T.nc_application_state_codemeani"></a>

Application state codes:

| Application State Code | Meaning |
|------------------------|---------------------------------------------|
| `PB` (or `AB`)   | program is starting |
| `P` (or `A`)     | program is running (outside of any request) |
| `PE` (or `AE`)   | program is exiting  |
| `RB` | request is starting |
| `R`  | request is being processed      |
| `RE` | request is exiting  |

<div class="table-scroll"></div>

***Note:*** The "A" and "P" codes are essentially synonymous. The "P" codes are generated by newer programs, but the "A" codes may still be present in some data.

The normal state transitions are:

[![Image ch\_core\_log\_fmt\_app\_states.png](/cxx-toolkit/static/img/ch_core_log_fmt_app_states.png)](/cxx-toolkit/static/img/ch_core_log_fmt_app_states.png "Click to see the full-resolution image")

<a name="ch_core.Events_and_Messages"></a>

##### Events and Messages

The following sections describe the events and messages seen in the log files:

-   [The application starts](#ch_core.Event_The_application_starts)

-   [The application stops](#ch_core.Event_The_application_stops)

-   [A request starts](#ch_core.Event_A_request_starts)

-   [The application posts extra information (within the context of a request)](#ch_core.Event_The_application_posts_extr)

-   [A request stops](#ch_core.Event_A_request_stops)

-   [The application posts a diagnostic message](#ch_core.Event_The_application_posts_a_di)

-   [The application posts performance logging information](#ch_core.Event_The_application_posts_perf)

<a name="ch_core.Event_The_application_starts"></a>

##### Event: The application starts

The `<event> <message>` portion of the log output will contain:

    start

(The message field is empty for the `start` event.)

<a name="ch_core.Event_The_application_stops"></a>

##### Event: The application stops

The `<event> <message>` portion of the log output will contain:

    stop <exit_code> <timespan> [SIG=<exit_signal>]

<a name="ch_core.T.application_stop_event__messag"></a>

Application stop event - message sub-fields:

| Sub-field     | Description   |
|---------------|---------------------------------------------------------|
| `exit_code`   | Application exit code (zero if not set)     |
| `timespan`    | Application execution time (in seconds; floating-point) |
| `exit_signal` | Signal number, if application exited due to a signal    |

<div class="table-scroll"></div>

For example:

    stop            0 0.149036509

<a name="ch_core.Event_A_request_starts"></a>

##### Event: A request starts

The `<event> <message>` portion of the log output will contain:

    request-start [application_defined_data]

The message field for the `request-start` event optionally contains application-specific arbitrary data, for example:

    request-start _type=conn

***Note:*** Make your log data more parsable!

Although the `request-start` data may be arbitrary, it should be URL-encoded. In many cases the logs are collected and stored in the database for analysis. The NCBI log system now parses and indexes the application-supplied data in the `request-start` and `extra` log lines, provided that the data is URL-encoded.

<a name="ch_core.Event_The_application_posts_extr"></a>

##### Event: The application posts extra information (within the context of a request)

The `<event> <message>` portion of the log output will contain:

    extra <application_defined_data>

The message field for the `extra` event has the same format as the message field for the `request-start` event.

<a name="ch_core.Event_A_request_stops"></a>

##### Event: A request stops

The `<event> <message>` portion of the log output will contain:

    request-stop <status> <req_timespan> [bytes_read] [bytes_written]

The message sub-fields for `request-stop` events are:

<a name="ch_core.T.nc_requeststop_subfielddescrip"></a>

Request stop event - message sub-fields:

| Sub-field | Description           |
|-----------------|------------------------------------------------------------------------------------|
| `status`  | [Exit status of the request](#ch_core.Request_Exit_Status_Codes) (zero if not set) |
| `req_timespan`  | Request execution time (zero if not set; in seconds, floating-point)   |
| `bytes_read`    | Input data read during the request execution, in bytes (zero if not set)     |
| `bytes_written` | Output data written during the request execution, in bytes (zero if not set) |

<div class="table-scroll"></div>

For example:

    request-stop  200 0.105005566

<a name="ch_core.Event_The_application_posts_a_di"></a>

##### Event: The application posts a diagnostic message

The `<event> <message>` portion of the log output will contain:

    <severity>: <module>(<err_code>.<err_subcode> | <err_text>) "<file>", line <line>: <class>::<func> --- <prefixes> <user_message> <err_code_message> <err_code_explanation>

Thus, the `<event>` field is really just the diagnostic message severity, and the `<message>` field is composed of a number of sub-fields.

<a name="ch_core.T.nc_field_or_subfielddescriptio"></a>

Diagnostic message event / severity field - message sub-fields:

| Field or sub-field  | Description             |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `event` / `severity`      | Diagnostic message severity = { Trace \\| Info \\| Warning \\| Error \\| Critical \\| Fatal \\| Note[T\\|I\\|W\\|E\\|C\\|F] } - left-justified and space-padded to 10 characters |
| `module`      | Module where the post originates from (in most cases the module corresponds to a single library)    |
| `err_code`, `err_subcode` | Numeric error code and subcode             |
| `err_text`    | If the error has no numeric code, sometimes it can be represented as text        |
| `file`, `line`      | File name and line number where the posting occured           |
| `class`, `func`     | Class and/or function name where the posting occured: {Class:: \\| Class::Function() \\| ::Function()}                 |
| `prefixes`    | User-defined prefixes for the message      |
| `user_message`      | The message itself      |
| `err_code_message`  | Short error code description               |
| `err_code_explanation`    | Detailed explanation of the error code     |

<div class="table-scroll"></div>

<a name="ch_core.Event_The_application_posts_perf"></a>

##### Event: The application posts performance logging information

The `<event> <message>` portion of the log output will contain:

    perf <exit_code> <timespan> <performance_parameters>

The message sub-fields for `perf` events are:

<a name="ch_core.T.performance_logging_event__mes"></a>

Performance logging event - message sub-fields:

| Sub-field    | Description              |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `exit_code`  | Application exit code (zero if not set)     |
| `timespan`   | Application execution time                  |
| `performance_parameters` | URL-encoded name=value pairs -- the resource name given to the logger, the status message (if given), and any others from [AddParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddParameter) |

<div class="table-scroll"></div>

For example:

    perf            200 0.000246 resource=task+one&status_msg=task+one+finished

<a name="ch_core.Examples"></a>

##### Examples

An example of application events:

[![Image ch\_core\_log\_fmt\_event.png](/cxx-toolkit/static/img/ch_core_log_fmt_event.png)](/cxx-toolkit/static/img/ch_core_log_fmt_event.png "Click to see the full-resolution image")

(Click to see the full-resolution image.)

An example of diagnostic messages:

[![Image ch\_core\_log\_fmt\_diagnostic.png](/cxx-toolkit/static/img/ch_core_log_fmt_diagnostic.png)](/cxx-toolkit/static/img/ch_core_log_fmt_diagnostic.png "Click to see the full-resolution image")

(Click to see the full-resolution image.)

<a name="ch_core.diag_post_flags"></a>

#### Controlling the Appearance of Diagnostic Messages using Post Flags

The post flags define additional information that will be inserted into the output messages and appear along with the message body. The standard format of a message is:

    "<file>", line <line>: <severity>: (<err_code>.<err_subcode>) [<prefix1>::<prefix2>::<prefixN>] <message>\n
    <err_code_message>\n
    <err_code_explanation>

where the presence of each field in the output is controlled by the post flags [EDiagPostFlag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EDiagPostFlag) associated with the particular diagnostic message. The post flags are:

    enum EDiagPostFlag {
        eDPF_File               = 0x1, ///< Set by default #if _DEBUG; else not set
        eDPF_LongFilename       = 0x2, ///< Set by default #if _DEBUG; else not set
        eDPF_Line               = 0x4, ///< Set by default #if _DEBUG; else not set
        eDPF_Prefix             = 0x8, ///< Set by default (always)
        eDPF_Severity           = 0x10,  ///< Set by default (always)
        eDPF_ErrorID            = 0x20,  ///< Module, error code and subcode
        eDPF_DateTime           = 0x80,  ///< Include date and time
        eDPF_ErrCodeMessage     = 0x100, ///< Set by default (always)
        eDPF_ErrCodeExplanation = 0x200, ///< Set by default (always)
        eDPF_ErrCodeUseSeverity = 0x400, ///< Set by default (always)
        eDPF_Location           = 0x800, ///< Include class and function
                                         ///< if any, not set by default
        eDPF_PID                = 0x1000,  ///< Process ID
        eDPF_TID                = 0x2000,  ///< Thread ID
        eDPF_SerialNo           = 0x4000,  ///< Serial # of the post, process-wide
        eDPF_SerialNo_Thread    = 0x8000,  ///< Serial # of the post, in the thread
        eDPF_RequestId          = 0x10000, ///< fcgi iteration number or request ID
        eDPF_Iteration          = 0x10000, ///< @deprecated
        eDPF_UID                = 0x20000, ///< UID of the log

        eDPF_ErrCode            = eDPF_ErrorID,  ///< @deprecated
        eDPF_ErrSubCode         = eDPF_ErrorID,  ///< @deprecated
        /// All flags (except for the "unusual" ones!)
        eDPF_All                = 0xFFFFF,

        /// Default flags to use when tracing.
    #if defined(NCBI_THREADS)
        eDPF_Trace              = 0xF81F,
    #else
        eDPF_Trace              = 0x581F,
    #endif

        /// Print the posted message only; without severity, location, prefix, etc.
        eDPF_Log                = 0x0,

        // "Unusual" flags -- not included in "eDPF_All"
        eDPF_PreMergeLines      = 0x100000, ///< Remove EOLs before calling handler
        eDPF_MergeLines         = 0x200000, ///< Ask diag.handlers to remove EOLs
        eDPF_OmitInfoSev        = 0x400000, ///< No sev. indication if eDiag_Info
        eDPF_OmitSeparator      = 0x800000, ///< No '---' separator before message

        eDPF_AppLog             = 0x1000000, ///< Post message to application log
        eDPF_IsMessage          = 0x2000000, ///< Print "Message" severity name.

        /// Hint for the current handler to make message output as atomic as
        /// possible (e.g. for stream and file handlers).
        eDPF_AtomicWrite        = 0x4000000,

        /// Use global default flags (merge with).
        /// @sa SetDiagPostFlag(), UnsetDiagPostFlag(), IsSetDiagPostFlag()
        eDPF_Default            = 0x10000000,

        /// Important bits which should be taken from the globally set flags
        /// even if a user attempts to override (or forgets to set) them
        /// when calling CNcbiDiag().
        eDPF_ImportantFlagsMask = eDPF_PreMergeLines |
                                  eDPF_MergeLines |
                                  eDPF_OmitInfoSev |
                                  eDPF_OmitSeparator |
                                  eDPF_AtomicWrite,

        /// Use flags provided by user as-is, do not allow CNcbiDiag to replace
        /// "important" flags by the globally set ones.
        eDPF_UseExactUserFlags  = 0x20000000
    };

The default message format displays only the severity level and the message body. This can be overridden inside the constructor for a specific message, or globally, using [SetDiagPostFlag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagPostFlag) on a selected flag. For example:

        SetDiagPostFlag(eDPF_DateTime); // set flag globally

<a name="ch_core.diag_set_stream"></a>

### Defining the Output Stream

The logging framework uses a global output stream. The default is to post messages to **`CERR`** ouput stream, but the stream destination can be reset at any time using:

    SetDiagStream(CNcbiOstream* os, bool quick_flush,
                  FDiagCleanup cleanup, void* cleanup_data)

This function can be called numerous times, thus allowing different sections of the executable to write to different files. At any given time however, all messages will be associated with the same global output stream. Because the messages are completely buffered, each message will appear on whatever stream is active at the time the message actually completes.

And, of course, you can [provide](#ch_core.diag_handlers) (using [SetDiagHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagHandler)) your own message posting handler [CDiagHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDiagHandler.html), which does not necessarily write the messages to a standard C++ output stream. To preserve compatibility with old code, SetDiagHandler also continues to accept raw callback functions of type [FDiagHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FDiagHandler).

If the output is sent to a file, you can split it into separate files:

-   Application log - standard events (`start`, `stop`, `request-start`, `request-stop` and user defined `extra` events).

-   Error log - all messages with severity **`Warning`** and above.

-   Trace log - messages having severity **`Info`** and **`Trace`** messages.

-   Performance log - messages from [performance logging](#ch_core.Performance_Logging).

All log files have the same name but different extensions: `.log`, `.err`, `.trace`, and `.perf`.

To turn on the log file splitting, call (before the log file initialization):

    int main(int argc, const char* argv[])
    {
        SetSplitLogFile(true);

        return CMyApp().AppMain(argc, argv);
    }

This function should be called before the application's constructor for the setting to be used from the very beginning.

<a name="ch_core.Tee_Output_to_STDERR"></a>

### Tee Output to STDERR

Sometimes it is helpful to generate human-readable diagnostics on the console in addition to storing detailed diagnostics in the machine-parsable log files. In these cases, it is likely that both the message severity required to trigger output and the output format should be different for the log file and the console. For example:

<a name="ch_core.T.nc_severityformatlog_fileerror"></a>

| Destination | Severity | Format       |
|-------------|----------|--------------------------------------------------------|
| Log File    | Error    | [new](#ch_core.The_New_Post_Format) (machine-parsable) |
| Console     | Warning  | [old](#ch_core.The_Old_Post_Format) (human-readable)   |

<div class="table-scroll"></div>

To set up this sort of tee, set these configuration parameters (see the [library configuration chapter](ch_libconfig.html#ch_libconfig.libconfig_diag) for details):

<a name="ch_core.T.nc_configuration_parameterexam"></a>

| Configuration Parameter     | Example Value | Notes                  |
|-----------------------------|---------------|------------------------------------------------------------------|
| **`DIAG_TEE_TO_STDERR`**    | True    | This turns on the tee. |
| **`DIAG_OLD_POST_FORMAT`**  | False   | This makes the log file use the new format.    |
| **`DIAG_POST_LEVEL`** | Error   | This sets the minimum severity required to post to the log file. |
| **`DIAG_TEE_MIN_SEVERITY`** | Warning | This sets the minimum severity required to post to the console.  |

<div class="table-scroll"></div>

Alternatively, you can use the [Console](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Console) manipulator to indicate that output should go to the console (in human-readable format):

    ERR_POST_X(1, Console << "My ERR_POST message.");

***Note:*** Output sent to the console using this manipulator will also go to the log file if the message severity at least meets the severity threshold for the log file. The effect of the manipulator lasts until the next flush, which typically occurs after each post.

<a name="ch_core.diag_buffering"></a>

### The Message Buffer

Diagnostic messages (i.e. instances of the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) class) have a buffer that is initialized when the message is first instantiated. Additional information can then be appended to the message using the overloaded stream operator `<<`. Messages can then be terminated explicitly using [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag)'s stream manipulator [Endm](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Endm), or implicitly, when the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) object exits scope.

Implicit message termination also occurs as a side effect of applying one of the [severity level manipulators](#ch_core.diag_severity). Whenever the severity level is changed, [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) also automatically executes the following two `manipulators`:

-   [Endm](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Endm) -- the message is complete and the message buffer will be flushed

-   [Reset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Reset) -- empty the contents of the current message buffer

When the message controlled by an instance of [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) is complete, [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) calls a global callback function (of type [FDiagHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FDiagHandler)) and passes the message (along with its severity level) as the function arguments. The default callback function posts errors to the currently designated output stream, with the action (continue or abort) determined by the severity level of the message.

<a name="ch_core.Logging_Requests"></a>

### Logging Requests

In request-driven applications (like FastCGIs or [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer)-based) grouping diagnostics into request-specific blocks is very helpful for post-processing. To facilitate this, [CDiagContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDiagContext.html) provides the [PrintRequestStart()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintRequestStart), [PrintRequestStop()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintRequestStop), [Extra()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Extra), and various [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print), methods.

The [CDiagContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDiagContext)::[SetRequestContext()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetRequestContext) method enables you to use a [CRequestContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCRequestContext.html) object to pass certain request-specific information - such as request ID, client IP, bytes sent, request status, etc. - to the diagnostics context. The request context information can be invaluable when analyzing logs.

[CRequestContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCRequestContext.html) objects are merely convenient packages for passing information - they can be preserved across multiple events or re-created as needed. However, as [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject)-derived objects, they should be wrapped by [CRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRef) to avoid inadvertent deletion by code accepting a [CRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRef) parameter.

The following code fragments show examples of API calls for creating request-specific blocks in the logfile. Your code may be slightly different and may make these calls in different event handlers (for example, you might call [PrintRequestStart()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintRequestStart) in [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead) and [PrintRequestStop()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintRequestStop) in [OnWrite()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnWrite)).

    // Set up the request context:
    CRef<CRequestContext> rqst_ctx(new CRequestContext());
    rqst_ctx->SetRequestID();
    rqst_ctx->SetClientIP(socket.GetPeerAddress(eSAF_IP));

    // Access the diagnostics context:
    CDiagContext & diag_ctx(GetDiagContext());
    diag_ctx.SetRequestContext(rqst_ctx.GetPointer());

    // Start the request block in the log:
    diag_ctx.PrintRequestStart()
            .Print("peer", "1.2.3.4")
            .Print("port", 5555);

    // Other relevant info...
    CDiagContext_Extra extra(diag_ctx.Extra());
    extra.Print("name1", "value1")
         .Print("name2", "value2");

    // Terminate the request block in the log.
    rqst_ctx->SetBytesRd(socket.GetCount(eIO_Read));
    rqst_ctx->SetBytesWr(socket.GetCount(eIO_Write));
    rqst_ctx->SetRequestStatus(eStatus_OK);
    diag_ctx.PrintRequestStop();

Code like the above will result in [AppLog](https://mini.ncbi.nlm.nih.gov/1k2vj) entries that look similar to:

[![Image ch\_grid\_cserver\_applog.png](/cxx-toolkit/static/img/ch_grid_cserver_applog.png)](/cxx-toolkit/static/img/ch_grid_cserver_applog.png "Click to see the full-resolution image")

Each thread has its own request context. Therefore, simultaneous calls to ***GetDiagContext().SetRequestContext()*** in multiple event handlers will not interfere with each other. If ***GetDiagContext().SetRequestContext()*** is not called (or is called with NULL argument), the default request context, also unique to each thread, is used.

It is possible to pass request context from one thread to another. In this case the context must be removed from the old thread before passing it to ***GetDiagContext().SetRequestContext()*** in the new thread.

The request handler should ensure that each request-start has a corresponding request-stop - for example by writing the request-stop in a destructor if it wasn't already written. [PrintRequestStop()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintRequestStop) resets request context's properties so that a new request does not inherit any information from the previous request.

<a name="ch_core.Request_Exit_Status_Codes"></a>

### Using subhit IDs to express call tree hierarchy

See [here](https://confluence.ncbi.nlm.nih.gov/display/DO/Developer+Guidance%3A+Correctly+logging+service+calls).

### Request Exit Status Codes

This section describes the possible values of the request exit codes used in NCBI. They appear in the application access log as:

    request-stop <status> .....

Request exit status codes are either [standard](#ch_core.Standard_HTTPlike_status_codes) or [NCBI-specific](#ch_core.NCBIspecific_status_codes).

<a name="ch_core.Standard_HTTPlike_status_codes"></a>

#### Standard (HTTP-like) status codes

The NCBI request exit codes must conform to the HTTP status codes:

<http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>

<a name="ch_core.NCBIspecific_status_codes"></a>

#### NCBI-specific status codes

If the situation cannot be described using one of the [standard (HTTP) status codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html), then an NCBI specific code should be used.

The NCBI-specific status codes must be different from the [standard (HTTP) status codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). At the same time these codes better follow at least the range requirements of the [standard (HTTP) status codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html), that is they better belong to one of the following ranges:

<a name="ch_core.T.nc_rangedescription120__199inf"></a>

| Range     | Description      |
|-----------|------------------------------------|
| 120 – 199 | Informational/provisional response |
| 220 – 299 | Success    |
| 320 – 399 | Redirection      |
| 420 – 499 | Bad request (client error)   |
| 520 – 599 | Server Error     |

<div class="table-scroll"></div>

So far we have the following NCBI specific status codes:

<a name="ch_core.T.nc_valuedescription0unknown_er"></a>

| Value  | Description           |
|--------------|--------------------------------------------------------------------------------------------------------------------------|
| 0      | Unknown error         |
| 299    | Broken connection while serving partial-content request (usually expected)  |
| 499    | Broken connection while serving regular request (usually unexpected, indicates n/w, communication protocol or cliend-side problem)         |
| 555    | NCBI Network Dispatcher refused a request from and outside user which is in its "abusers list"   |
| 1000 + errno | Unclassifiable server error when only errno is known (NOTE: the value of errno can be different on different platforms!) |

<div class="table-scroll"></div>

<a name="ch_core.diag_errcodes"></a>

### Error codes and their Descriptions

Error codes and subcodes are posted to an output stream only if applicable [post flags](#ch_core.diag_post_flags) were set. In addition to error codes, the logging framework can also post text explanations. The [CDiagErrCodeInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDiagErrCodeInfo.html) class is used to find the error message that corresponds to a given error code/subcode. Such descriptions could be specified directly in the program code or placed in a separate message file. It is even possible to use several such files simultaneously. [CDiagErrCodeInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDiagErrCodeInfo) can also read error descriptions from any input stream(s), not necessarily files.

<a name="ch_core.err_msg_file"></a>

#### Preparing an Error Message File

The error message file contains plain ASCII text data. We would suggest using the `.msg` extension, but this is not mandatory. For example, the message file for an application named **SomeApp** might be called `SomeApp.msg`.

The message file must contain a line with the keyword `MODULE` in it, followed by the name of the module (in our example `SomeApp`). This line must be placed in the beginning of the file, before any other declarations. Lines with symbol `#` in the first position are treated as comments and ignored.

Here is an example of the message file:

    # This is a message file for application "SomeApp"
    MODULE SomeApp
    # ------ Code 1 ------
    $$ NoMemory, 1, Fatal : Memory allocation error
    # ------ Code 2 ------
    $$ File, 2, Critical : File error
    $^ Open, 1 : Error open a specified file
    This often indicates that the file simply does not exist.
    Or, it may exist but you do not have permission to access
    the file in the requested mode.
    $^ Read, 2, Error : Error read file
    Not sure what would cause this...
    $^ Write, 3, Critical
    This may indicate that the filesystem is full.
    # ------ Code 3 ------
    $$ Math, 3
    $^ Param, 20
    $^ Range, 3

Lines beginning with `$$` define a top-level error code. Similarly, lines beginning with `$^` define subcodes of the top-level error code. In the above example `Open` is a subcode of `File` top-level error, which means the error with code 2 and subcode 1.

Both types of lines have similar structure:

    $$/$^ <mnemonic_name>, <code> [, <severity> ] [: <message> ] \n
    [ <explanation> ]

where

-   **`mnemonic_name`** (*required*) Internal name of the error code/subcode. This is used as a part of an error name in a program code - so, it should also be a correct C/C++ identifier.

-   **`code`** (*required*) Integer identifier of the error.

-   **`severity`** (*optional*) This may be supplied to specify the severity level of the error. It may be specified as a severity level string (valid values are `Info, Warning, Error, Critical, Fatal, Trace`) or as an integer in the range from 0 (**`Info`**) to 5 (**`Trace`**). While integer values are acceptable, string values are more readable. If the severity level was not specified or could not be recognized, it is ignored, or inherited from a higher level (the severity of a subcode becomes the same as the severity of a top-level error code, which contains this subcode). As long as diagnostic **`eDPF_ErrCodeUseSeverity`** flag is set, the severity level specified in the message file overrides the one specified in a program, which allows for runtime customization. In the above example, `Critical` severity level will be used for all `File` errors, except `Read` subcode, which would have `Error` severity level.

-   **`message`** (*optional*) Short description of the error. It must be a single-line message. As long as diagnostic **`eDPF_ErrCodeMessage`** flag is set, this message is posted as a part of the diagnostic output.

-   **`explanation`** (*optional*) Following a top-level error code or a subcode definition string, it may be one or several lines of an explanation text. Its purpose is to provide additional information, which could be more detailed description of the error, or possible reasons of the problem. This text is posted in a diagnostic channel only if **`eDPF_ErrCodeExplanaton`** flag was set.

Error message files can be automatically read by setting a configuration parameter. You can either define the `MessageFile` entry in the `DEBUG` section of the application registry, or set the environment variable **`NCBI_CONFIG__DEBUG__MessageFile`** (note the double-underscores and character case).

<a name="ch_core.diag_handlers"></a>

### Defining Custom Handlers using CDiagHandler

The user can install his own handler (of type [CDiagHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDiagHandler.html),) using [SetDiagHandler()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagHandler). CDiagHandler is a simple abstract class:

    class  CDiagHandler
    {
    public:
        /// Destructor.
        virtual ~CDiagHandler(void) {}
        /// Post message to handler.
        virtual void Post(const SDiagMessage& mess) = 0;
    };

where [SDiagMessage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SDiagMessage) is a simple struct defined in `ncbidiag.hpp` whose data members' values are obtained from the [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) object. The transfer of data values occurs at the time that [Post](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Post) is invoked. See also the section on [Message posting](ch_debug.html#ch_debug.std_cpp_message_post) for a more technical discussion.

<a name="ch_core.ERR_POST"></a>

### The ERR\_POST and LOG\_POST Macros

A family of **`ERR_POST*`** macros and a corresponding family of **`LOG_POST*`** macros are available for routine message posting.

The log entries produced by the two families are almost identical for the [new post format](#ch_core.The_New_Post_Format) - the **`ERR_POST*`** entries contain a full word for the severity (e.g. "`Error`") while the **`LOG_POST*`** entries contain the word "`Note`" and a one-character severity code (e.g. "`Note[E]`"). For the [old post format](#ch_core.The_Old_Post_Format), **`LOG_POST*`** macros simply contain the message, while **`ERR_POST*`** entries contain the severity, error code, and message. [Message filtering](#ch_core.diagnostic_messages_filtering) works exactly the same way for the two families of macros.

The macros are:

-   **`{ERR|LOG}_POST(msg)`** – for posting a simple message. ***Note:*** these macros are deprecated. Use **`{ERR|LOG}_POST_X`** instead (except for tests) for more flexible error statistics and logging.

-   **`{ERR|LOG}_POST_X(subcode, msg)`** – for posting a default error code, a given subcode, and a message. Each call to **`{ERR|LOG}_POST_X`** must use a different subcode for proper error statistics and logging. The default error code is selected by **`NCBI_USE_ERRCODE_X`**. The error code is selected from those defined by **`NCBI_DEFINE_ERRCODE_X`** in the appropriate header file, e.g. `include/corelib/error_codes.h`.

-   **`{ERR|LOG}_POST_EX(code, subcode, msg)`** – for posting a given error code, a given error subcode, and a message. This macro should only be used if you have to use a variable for the subcode, or to specify an error code other than the current default. In all other cases (except for tests), use **`{ERR|LOG}_POST_X`** for more flexible error statistics and logging.

-   **`{ERR|LOG}_POST_XX(code, subcode, msg)`** – these macros must be used in place of **`{ERR|LOG}_POST_X`** within header files so that the same error code will be used for header-defined code, regardless of the error codes that including files may use.

The **`LOG_POST_*`** macros just write a string to the log file, and are useful if a human-readable log file is desired. The output from the **`ERR_POST_*`** macros is not easily read by humans, but facilitates automatic indexing for searching and/or error statistics. There are multiple flags to [control the appearance of the message](#ch_core.diag_post_flags) generated by the **`ERR_POST_*`** macros.

The **`LOG_POST_*`** and **`ERR_POST_*`** macros implicitly create a temporary [CNcbiDiag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiDiag) object and put the passed "message" into it with a default severity of **`Error`**. A [severity level manipulator](#ch_core.diag_severity) can be applied if desired, to modify the message's severity level. For example:

    long lll = 345;
    ERR_POST_X(1, "My ERR_POST message, print long: " << lll);

would write to the diagnostic stream something like:

    Error: (1501.1) My ERR_POST message, print long: 345

while:

    double ddd = 123.345;
    ERR_POST_X(1, Warning << "My ERR_POST message, print double: " << ddd);

would write to the diagnostic stream something like:

    Warning: (1501.1) My ERR_POST message, print double: 123.345

See the [Log File Format](#ch_core.Log_File_Format) section for more information on controlling the format of diagnostics messages.

***Note:*** Most of the above macros make use of the macro definition **`NCBI_USE_ERRCODE_X`**. This definition must be present in your source code, and must be defined in terms of an existing error code name. By convention, error code names are defined in header file named `error_codes.hpp` in the relevant directory, for example `include/corelib/error_codes.hpp`.

To set up new error codes, pick appropriate names and error code numbers that don't match existing values, and decide how many subcodes you'll need for each error code. For example, the following sets up three error codes to deal with different categories of errors within a library, and specifies the number of subcodes for each category:

    // Note: The following should be in src/app/my_prog/error_codes.hpp.
    ...
    BEGIN_NCBI_SCOPE
    ...
    NCBI_DEFINE_ERRCODE_X(MyLib_Cat1, 1501, 5);
    NCBI_DEFINE_ERRCODE_X(MyLib_Cat2, 1502, 6);
    NCBI_DEFINE_ERRCODE_X(MyLib_Cat3, 1503, 1);
    // where:
    //      MyLib_*   -- the error code names
    //      1501, etc -- the error code numbers, typically starting at N*100+1
    //      5, etc    -- how many subcodes you need for the given error code
    ...
    END_NCBI_SCOPE

Now you can use the error code in your library's implementation:

    // The following should be in your source files.
    ...
    // include the relevant error_codes header, for example:
    #include <include/corelib/error_codes.hpp>
    ...
    #define NCBI_USE_ERRCODE_X   MyLib_Cat1 // sets the default error code for this file
    ...
        ERR_POST_X(5, Critical << "Your message here."); // uses the default error code

Generally, the default error code and the **`ERR_POST_X`** macro should be used. If it is necessary to use a non-default error code, that error code and the appropriate subcode may be used with the [ErrCode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ErrCode) manipulator in the **`ERR_POST`** macro. For example:

    // use a non-default error code (1501 in this example) and subcode 3
    ERR_POST(ErrCode(1501, 3) << "My error message.");

<a name="ch_core._TRACE"></a>

### The \_TRACE macro

The **`_TRACE(message)`** macro is a debugging tool that allows the user to insert trace statements that will only be posted if the code was [compiled in debug mode](ch_debug.html#ch_debug.debug_mode_internal), and provided that the tracing has been turned on. If **`DIAG_TRACE`** is defined as an environment variable, or as an entry in the [DEBUG] section of your configuration file (`*.ini`), the initial state of tracing is `on`. By default, if no such variable or registry entry is defined, tracing is `off`. [SetDiagTrace](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagTrace) ***(EDiagTrace enable, EDiagTrace default)*** is used to turn tracing on/off.

Just like **`ERR_POST`**, the **`_TRACE`** macro takes a message, and the message will be posted only if tracing has been enabled. For example:

    SetDiagTrace(eDT_Disable);
    _TRACE("Testing the _TRACE macro");
    SetDiagTrace(eDT_Enable);
    _TRACE("Testing the _TRACE macro AGAIN");

Here, only the second trace message will be posted, as tracing is disabled when the first **`_TRACE()`** macro call is executed.

<a name="ch_core.Performance_Logging"></a>

### Performance Logging

The C++ Toolkit includes a [performance logging API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/corelib/perf_log.hpp) that is independent of the general diagnostics API. This allows independent control, analysis, and management of the performance data. Performance log files are created just like [other log files](#ch_core.diag_set_stream), except that the extension is `.perf` instead of `.log`, for example. Performance data can be found in AppLog by searching for the "perf" event (see the [events and messages](#ch_core.Events_and_Messages) section for more details about events).

The performance logging classes and macros are:

-   [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard)

    -   The [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCPerfLogGuard.html) class will generally be the first choice for performance logging. If you want to use a **`PERF_POST*`** macro, then use [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCPerfLogger.html) to create the logger object.

    -   [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) measures elapsed time and posts a one-line entry in the performance log.

    -   [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) should be used for measuring just one operation.

    -   Extra parameters can be added using [AddParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddParameter).

    -   You can call [Start()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Start) and [Suspend()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Suspend) as many times as you want after creating the logger and before posting or discarding.

    -   End measurement with [Post()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Post) or [Discard()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Discard). If one of these isn't called before the logger is destroyed, the destructor will post a log entry with a status code of 500.

    -   [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) has built-in integrity checks to ensure that only one [Post()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Post) or [Discard()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Discard) call is made, [Suspend()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Suspend) isn't called when the time isn't running, etc.

-   [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogger)

    -   The [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCPerfLogger.html) class can be used on its own, but it's best to only use it if you need to create a logger for use in a **`PERF_POST*`** macro. [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogger) is slightly lower-level than [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) but is otherwise very similar, except that [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) offers generally desirable guard features.

    -   ***Note:*** If you use [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogger) on its own, and logging is off, then neither logging nor timing will be done. However, the extra record will be put into the log if the following construct is used:<br/><br/>`perf_logger.Post(...).Print(...)`<br/><br/>Therefore, it's best to avoid that construct and use the [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard) class or a **`PERF_POST`** macro instead.

-   **`PERF_POST`**

    -   Use the [PERF\_POST](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__Diagnostics.html#ga8da8da548df436e673c0274f9bcb6770) macro if you find it more convenient than [CPerfLogGuard](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogGuard), or if you'd like to possibly save a few CPU cycles when performance logging is globally turned off.

-   **`PERF_POST_DB`**

    -   Use the [PERF\_POST\_DB](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__Diagnostics.html#ga89e52c8d2496233dd47fdbb91980d9f8) macro for the same reasons as the **`PERF_POST`** macro, but specifically when working with a database.

Performance logging is turned off by default, but can be globally turned on using the environment variable **`LOG_PerfLogging`** or the registry:

    [Log]
    PerfLogging = true

It can also be turned on or off at runtime by calling [CPerfLogger](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPerfLogger)::[SetON()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetON).

Here is a typical usage example:

    CPerfLogGuard perf("unique task description");
    // do something to be timed
    perf.Post(200, "finished");

This example shows nested logging:

    void some_func(void)
    {
        CPerfLogGuard perf_overall("instrument an entire function");

        CPerfLogGuard perf_init("init");
        // initialization code to be timed ...
        perf_init.Post(
            200,                // status code
            "init finished");   // status description string

        CPerfLogGuard perf_loop("loop");
        for (int i=0; i<10; ++i) {
            CPerfLogGuard perf_task1("task1");
            // sub-task 1 ...
            perf_task1.Post(200); // the status description string is optional

            if (true) {
                CPerfLogGuard perf_cond("conditional");
                perf_cond.AddParameter("iter", NStr::NumericToString(i));
                // conditional task ...
                perf_cond.Post(200, "conditional finished");
            }
        }
        perf_loop.Post(200, "loop finished");

        perf_overall.Post(200, "function finished"); 
    }

<a name="ch_core.Stack_Traces"></a>

### Stack Traces

[CStackTrace](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CStackTrace) objects have special formatting: a "`Stack trace:`" line is added before the stack trace and standard indentation is used. This formatting is also used when printing the stack trace for exceptions.

Using stack traces with diagnostics is discussed in the following topics:

-   [Printing a Stack Trace](#ch_core.Printing_a_Stack_Trace)

-   [Obtaining a Stack Trace for Exceptions](#ch_core.Obtaining_a_Stack_Trace_for_Exce)

<a name="ch_core.Printing_a_Stack_Trace"></a>

#### Printing a Stack Trace

A stack trace can be saved simply by creating a CStackTrace object. Then the object can be posted in an error message, for example:

    ERR_POST_X(1, Error << "Your message here." << CStackTrace());

An example of a stack trace output on Linux:

    Error: (1501.1) Your message here.
         Stack trace:
          ./my_prog ???:0 ncbi::CStackTraceImpl::CStackTraceImpl() offset=0x5D
          ./my_prog ???:0 ncbi::CStackTrace::CStackTrace(std::string const&) offset=0x28
          ./my_prog ???:0 CMyProg::Run() offset=0xAF3
          ./my_prog ???:0 ncbi::CNcbiApplication::x_TryMain(ncbi::EAppMyProgStream, char const*, int*, bool*) offset=0x6C8
          ./my_prog ???:0 ncbi::CNcbiApplication::AppMain(int, char const* const*, char const* const*, ncbi::EAppMyProgStream, char const*, std::string const&) offset=0x11BA
          ./my_prog ???:0 main offset=0x60
          /lib64/tls/libc.so.6 ???:0 __libc_start_main offset=0xEA
          ./my_prog ???:0 std::__throw_logic_error(char const*) offset=0x62

<a name="ch_core.Obtaining_a_Stack_Trace_for_Exce"></a>

#### Obtaining a Stack Trace for Exceptions

The stack trace can be saved by [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException) and derived classes automatically if the exception's severity is equal to or above the level set in the **`EXCEPTION_STACK_TRACE_LEVEL`** environment variable or [configuration parameter](ch_libconfig.html#ch_libconfig.NCBI). The default level is **`Critical`**, so that most exceptions do not save the stack trace (the default exception's severity is **`Error`**).

When printing an exception, the diagnostics code checks if a stack trace is available and if so, automatically prints the stack trace along with the exception.

An example of an exception with a stack trace on Linux:

    Error: (106.16) Application's execution failed
    NCBI C++ Exception:
        Error: (CMyException::eMyErrorXyz) Your message here.
         Stack trace:
          ./my_prog ???:0 ncbi::CStackTraceImpl::CStackTraceImpl() offset=0x5D
          ./my_prog ???:0 ncbi::CStackTrace::CStackTrace(std::string const&) offset=0x28
          ./my_prog ???:0 ncbi::CException::x_GetStackTrace() offset=0x86
          ./my_prog ???:0 ncbi::CException::x_Init(ncbi::CTestCompileInfo const&, std::string const&, ncbi::CException const*, ncbi::ETestSev) offset=0xE9
          ./my_prog ???:0 ncbi::CException::CException(ncbi::CTestCompileInfo const&, ncbi::CException const*, ncbi::CException::EErrCode, std::string const&, ncbi::ETestSev) offset=0x119
          ./my_prog ???:0 CMyException::CMyException(ncbi::CTestCompileInfo const&, ncbi::CException const*, CMyException::EErrCode, std::string const&, ncbi::ETestSev) offset=0x43
          ./my_prog ???:0 CMyTestTest::Run() offset=0xD3A
          ./my_prog ???:0 ncbi::CNcbiApplication::x_TryMain(ncbi::EAppTestStream, char const*, int*, bool*) offset=0x6C8
          ./my_prog ???:0 ncbi::CNcbiApplication::AppMain(int, char const* const*, char const* const*, ncbi::EAppTestStream, char const*, std::string const&) offset=0x11BA
          ./my_prog ???:0 main offset=0x60
          /lib64/tls/libc.so.6 ???:0 __libc_start_main offset=0xEA
          ./my_prog ???:0 std::__throw_logic_error(char const*) offset=0x62

<a name="ch_core.Logging_Modules"></a>

### Logging modules and its configuration parameters

Logging can be done from different modules and sources, written in different languages and having different APIs. Below is a list of each module and description for all its configuration parameters.

<a name="ch_core.Logging_Modules_CXX"></a>

#### C++

Native C++ logging. You can find description of all parameters in the [Logging](ch_libconfig.html#ch_libconfig.libconfig_logfile) section, [Library Configuration](ch_libconfig.html) chapter.

<a name="ch_core.Logging_Modules_CLog"></a>

#### CLog

[CLog](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/misc/clog/ncbi_c_log.h) is a pure C library to provide the C++ Toolkit-like logging semantics and output for C/C++ programs and CGIs.

These parameters tune the usage and behavior of the library and all based on it applications:

| Configuration Parameter | Purpose | Valid value | Default |
|-------------------------|---------|-------------|---------|
| **`NCBI_LOG_HIT_ID`** | Defines the default hit ID, which is used for application and for any request which has no explicit hit ID set. | any valid PHID string | "" |
| **`HTTP_NCBI_PHID`**  | Same as **`NCBI_LOG_HIT_ID`**, but passed through HTTP headers. Have a priority over **`NCBI_LOG_HIT_ID`**. | any valid PHID string | "" |
| **`NCBI_LOG_SESSION_ID`** | Defines the default session ID, which is used for any request which has no explicit session ID set. | any valid session ID string | "UNK_SESSION" |
| **`HTTP_NCBI_SID`**  | Same as **`NCBI_LOG_SESSION_ID`**, but passed through HTTP headers. Have a priority over **`NCBI_LOG_SESSION_ID`**. | any valid session ID string | "UNK_SESSION" |
| **`SERVER_PORT`**  | Web server/service port. Specifies one of the possible locations to store logging files for CGI, see [Where Diagnostic Messages Go](#ch_core.Where_Diagnostic_Messages_Go). | a positive integer | (none) |
| **`NCBI_CONFIG__LOG__FILE`**  | Reset the log file to the specified file. By default, if [NcbiLog_SetDestination()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NcbiLog_SetDestination) is not called or set to ***eNcbiLog_Default***, and environment variable **`$NCBI_CONFIG__LOG__FILE`** points to some location on a file system, its value will be used as base name for logging. Also, it can have special value "-" to redirect all output to ***STDERR***. | a valid file name, or "-" | (none) |

<a name="ch_core.Logging_Modules_ncbi_applog"></a>

#### ncbi_applog

To allow logging from scripts we have a command-line utility &mdash; ***ncbi_applog***. It is based on [CLog](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CLog) library, so it accepts all parameters specified for [that library](#ch_core.Logging_Modules_CLog), and also some extra:

| Configuration Parameter | Purpose | Valid value | Default |
|-------------------------|---------|--------------|---------|
| **`NCBI_APPLOG_TOKEN`**  | Utility returns tokens for ***start_app***, ***start_request*** and  ***stop_request*** commands, that should be used as mandatory argument for all subsequent calls. It is possible to save returned value to **`NCBI_APPLOG_TOKEN`** environment variable and pass empty string "" instead of the real token argument. |  | (none) |
| **`NCBI_APPLOG_SITE`**  | Value for logsite parameter. If logsite is specified, that the application name in the passed logging data will be replaced with logsite value and original application name have added as 'extra' record to logs. ***-logsite*** command line argument have a priority over environment variable. Also, logsite is used for checking "/log/{{logsite}}" location for writing logs. If logsite is not specified and local logging is impossible, all logging going through CGI redirects, that automatically assign "dev" logsite, if it is not specified. | | (none) for local logging,<br/>"dev" for CGI |
| **`NCBI_CONFIG__NCBIAPPLOG_CGI`**<br/><br/>**`[NCBI]`**<br/>**`NcbiApplogCGI = http://...`** | Logging CGI, automatically used if /log is not accessible or writable on a current machine. Could be used to change hardcoded value, although it is not recommended. | a valid URL | (none) |
| **`NCBI_CONFIG__NCBIAPPLOG_DESTINATION`**<br/><br/>**`[NCBI]`**<br/>**`NcbiApplogDestination = ...`**  | Set logging destnation. If this parameter is specified and not 'default', it disable CGI redirecting. See [Where Diagnostic Messages Go](#ch_core.Where_Diagnostic_Messages_Go). | default, cwd, stdlog, stdout, stderr | default (stdlog) |
| **`NCBI_CONFIG__LOG__FILE`**  | Same as for [CLog](#ch_core.Logging_Modules_CLog), but also disable CGI-redirecting. All logging will be done locally, to the provided in this variable base name for logging files or to standard error for special value "-". If for some reason specified location is non-writable, you will have an error. This environment variable have a higher priority than the output destination in **`NCBI_CONFIG__NCBIAPPLOG_DESTINATION`**. | a valid file name, or "-" | (none) |

Below is an example how to use it. Please note that this example is very simplified and present for illustration purposes only. You can find real working wrapper script that allow to run an arbitrary application and report its calls to AppLog [here](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/misc/clog/app/ncbi_applog_run_app.sh).

    #!/bin/sh
    #
    # Wrapper script for an arbitrary application to report its calls to AppLog.
    #
    # NOTE 1: We use simple command lines and limited set of arguments.
    #         You can get full list of arguments and its description using:
    #         /opt/ncbi/bin/ncbi_applog-1 [command] -help.
    # NOTE 2: Each key/value in the parameters pairs for -param argument shoould be
    #         URL-encoded. We don't doing it here for illustration purposes.
    # NOTE 3: It is recommended to check exit codes for each ncbi_applog call.
    
    # Path to ncbi_applog utility
    APPLOG='/opt/ncbi/bin/ncbi_applog-1'
    
    # Path to your application, and it's name as it will be shown in AppLog
    app_executable='/home/username/my_exe_name'
    app_name='my_app_name'
    
    # For debugging purposes uncomment 2 lines below. This will redirect
    # all output to the current directory instead of sending it to AppLog.
    # See files named 'my_app_name.*'.
    
    #NCBI_CONFIG__NCBIAPPLOG_DESTINATION=cwd
    #export NCBI_CONFIG__NCBIAPPLOG_DESTINATION
    
    # Log starting, specifying application name and pid for our wrapping script.
    # Getting token needed for all subsequent calls.
    
    app_token=`$APPLOG start_app -appname "$app_name" -pid "$$"`
    
    # Start a request. You can run an application multiple times between
    # "start_app" and "stop_app" commands, each time with its own parameters.
    # You can use single request or wrap each run to its own request,
    # but it is recommended to have at least one.
    # Each request have its own token, needed to distinquish it from all other
    # requests, and it should be used for all request-specific calls.
    
    extra_params="foo=abc&bar=123"
    req_token=`$APPLOG start_request "$app_token" -param "user=${USER}&pwd=${PWD}&${extra_params}"`
    
    # Execute an application
    
    "$app_executable" "$@"
    app_exit=$?
    
    # To log exit code correctly for AppLog, it is recommended to translate
    # application's exit code to HTTP-like status code, where 200 mean OK (no error).
    
    case $app_exit in
        0 ) log_app_exit=200 ;;
      200 ) log_app_exit=199 ;;
        * ) log_app_exit=$app_exit ;;
    esac
    
    # Log stopping state for our request and application,
    
    $APPLOG stop_request "$req_token" -status $log_app_exit
    $APPLOG stop_app     "$app_token" -status $log_app_exit
    
    exit $app_exit
