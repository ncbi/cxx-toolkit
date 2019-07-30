---
layout: default
title: Library Configuration
nav: pages/ch_libconfig
---


{{ page.title }}
========================================

## Introduction

This chapter describes the run-time configuration parameters of the NCBI C++ Toolkit libraries. Such parameters change the default behavior of applications built using the Toolkit.

Configuration parameters can be set by environment variables, entered into a configuration file, defined by code, or any combination of those methods. ***Note:*** If a parameter is specified in both a configuration file and the environment, the environment takes precedence. The methods supported by each library and application are described below.

## Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [Defining and Using Parameters](#ch_libconfig.Defining_and_Using)

    -   [CParam](#ch_libconfig.CParam)

    -   [Registry](#ch_libconfig.libconfig_registry)

    -   [Environment](#ch_libconfig.Environment)

-   [Non-Specific Parameters](#ch_libconfig.NonSpecific_Parameters)

    -   [Logging](#ch_libconfig.libconfig_logfile)

    -   [Diagnostic Trace](#ch_libconfig.libconfig_diag)

    -   [Run-Time](#ch_libconfig.libconfig_runtime)

    -   [Abnormal Program Termination](#ch_libconfig.libconfig_term)

    -   [NCBI](#ch_libconfig.NCBI)

-   [Library-Specific Parameters](#ch_libconfig.LibrarySpecific_Parameters)

    -   [Connection](#ch_libconfig.libconfig_connect)

    -   [CGI and FCGI](#ch_libconfig.libconfig_cgi)

    -   [Serial](#ch_libconfig.Serial)

    -   [Objects, Object Manager, Object Tools](#ch_libconfig.Objects_Object_Manager_Obje)
    
        -   [psg_client library](#ch_libconfig.psg_client_library)

    -   [cSRA](#ch_libconfig.cSRA)

        -   [sraread library](#ch_libconfig.sraread_library)

        -   [ncbi\_xloader\_csra library](#ch_libconfig.ncbi_xloader_csra_library)

    -   [BAM](#ch_libconfig.BAM)
    
    -   [DBAPI](#ch_libconfig.DBAPI)

    -   [Eutils](#ch_libconfig.Eutils)

-   [Distributed Computing (GRID) Specific Parameters](#ch_libconfig.Internal_GridSpecifi)

    -   [NetCache and NetSchedule](#ch_libconfig.NetCache_and_NetSchedule)

    -   [Worker Node](#ch_libconfig.WorkerNode)

-   [Application-Specific Parameters](#ch_libconfig.Internal_ApplicationSpecifi)

    -   [Seqfetch.cgi](#ch_libconfig.Seqfetchcgi)

<a name="ch_libconfig.Defining_and_Using"></a>

Defining and Using Parameters
-----------------------------

The following sections discuss the methods that libraries can use to define configuration parameters, and the corresponding methods that client applications can use to specify values for those parameters.

-   [CParam](#ch_libconfig.CParam)

-   [Registry](#ch_libconfig.libconfig_registry)

-   [Environment](#ch_libconfig.Environment)

<a name="ch_libconfig.CParam"></a>

### CParam

***Note:*** The preferred way for libraries to define their configuration parameters is with the macros in the [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) class (e.g. **`NCBI_PARAM_DECL`**). More [details on the CParam class and its macros](ch_core.html#ch_core.Configuration_Parame) are presented in an earlier chapter. Libraries that use CParam can get configuration parameters using either the registry or the environment. Also, the CParam value can be stored and accessed on different levels: globally (application wide) and/or per-thread (TLS-like) and/or locally (cached within a CParam instance). Note that the name of an environment variable linked to a [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) can be customized or follow the default naming convention, so you have to look up the actual name used in the tables below before setting a configuration parameter using the environment.

<a name="ch_libconfig.libconfig_registry"></a>

### Registry

If the [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) class cannot be used, the registry (configuration file) may be used to load, access, modify and store the values read from a configuration file. For libraries that use the registry, client applications can set the library configuration parameters using either the registry or the environment. In these cases the environment variable must follow the default naming convention.

[These environment variables](#ch_libconfig.T1) can be used to specify where to look for the registry.

<a name="ch_libconfig.T1"></a>

Table 1. Registry configuration parameters

| Purpose      | Environment variable | Valid values |
|--------------|----------------------|--------------|
| If this variable is defined, the value is an extra-high-priority configuration file whose entries override those from other configuration files.  | **`NCBI_CONFIG_OVERRIDES`**      | a valid path |
| If this variable is defined, use it exclusively as the registry search path.             | **`NCBI_CONFIG_PATH`**     | a valid path |
| If this variable is **not** defined, append the current directory and home directory to the registry search path (after **`NCBI_CONFIG_PATH`**).  | **`NCBI_DONT_USE_LOCAL_CONFIG`** | anything     |
| If this variable is defined, append the value to the registry search path (after the home directory).       | **`NCBI`**     | a valid path |
| For Windows: If this variable is defined, append the value to the registry search path (after **`NCBI`**). For non-Windows, this variable is not checked and `/etc` is appended to the registry search path (after **`NCBI`**).     | **`SYSTEMROOT`**     | a valid path |
| If this variable is **not** defined, attempt to load a low-priority system-wide registry (`ncbi.ini` on Windows; `.ncbirc` on non-Windows). Note: the system-wide registry will not be loaded if it contains the **`DONT_USE_NCBIRC`** entry in the **`NCBI`** section. | **`NCBI_DONT_USE_NCBIRC`** | anything     |

<div class="table-scroll"></div>

The registry is case-insensitive for section and entry names. More [details on the registry](ch_core.html#ch_core.registry) are presented in an earlier chapter.

<a name="ch_libconfig.Environment"></a>

### Environment

For configuration parameters defined by either [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParam) or the registry, there is an equivalent environment variable having the form **`NCBI_CONFIG__<section>__<name>`** (note the double-underscores preceding **`<section>`** and **`<name>`**). The equivalent form is all uppercase.

***Note:*** Registry section and entry names may contain some characters that are difficult or impossible to use in environment variable names on some platforms.  To obtain corresponding environment variable names, you can and should make some formal substitutions as detailed below.  For example, the equivalent environment variable for **`[FastCGI]`**<br/>**`WatchFile.Name`** is **`NCBI_CONFIG__FASTCGI__WATCHFILE_DOT_NAME`**.

|**Character** |**Substitution**|
|--------------------------------------|----------------|
|**`'.'`** (dot, full stop, period)    |**`_DOT_`**     |
|**`'-'`** (hyphen, minus)             |**`_HYPHEN_`**  |
|**`'/'`** (\[forward\] slash, solidus)|**`_SLASH_`**   |
|**`' '`** (space)                     |**`_SPACE_`**   |

***Note:*** Environment variables are case-sensitive on many platforms. Therefore, when setting a configuration parameter via the environment, be sure to use the case shown in the tables below.

Some configuration parameters can only be set with an environment variable - for example, **`DIAG_SILENT_ABORT`**. In such cases, there is no corresponding registry entry.

<a name="ch_libconfig.NonSpecific_Parameters"></a>

Non-Specific Parameters
-----------------------

The following sections discuss configuration parameters that are not library-specific.

-   [Logging](#ch_libconfig.libconfig_logfile)

-   [Diagnostic Trace](#ch_libconfig.libconfig_diag)

-   [Run-Time](#ch_libconfig.libconfig_runtime)

-   [Abnormal Program Termination](#ch_libconfig.libconfig_term)

-   [NCBI](#ch_libconfig.NCBI)

<a name="ch_libconfig.libconfig_logfile"></a>

### Logging

The application log consists of diagnostic messages. Some of them are available only in debug builds. Others - namely, those produced by the **`ERR_POST`** or **`LOG_POST`** macros - can be redirected into a file. Normally, the name and location of the application log is specified using the **`logfile`** command-line argument.

Log messages have different levels of severity. Setting the logging level is described in the next chapter [Diagnostic Trace](#ch_libconfig.libconfig_diag)

[These parameters](#ch_libconfig.T2) tune the usage and behavior of the application log file.

<a name="ch_libconfig.T2"></a>

Table 2. Log file configuration parameters

| Purpose   | [Registry section]<br/>Registry name<br/><br/>Environment variable              | Valid values          | Default    |
|-----------|---------------------------------------------------------------------------------|-----------------------|------------|
| If true, post log messages when configuration parameters are read by one of the ***ncbi::g\_GetConfig\*()*** functions. Messages include the parameter; the value; and whether the value came from the application registry, the environment, or a default value.     | [N/A]<br/>N/A<br/><br/>**`NCBI_CONFIG__NCBI__CONFIG_DUMP_VARIABLES`**           | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)    | (none)     |
| Used by logging framework if the real client IP can not be obtained.                  | **`[LOG]`**<br/>**`Client_Ip`**<br/><br/>**`NCBI_LOG_CLIENT_IP`**               | a valid IPv4 or IPv6 address      | ""   |
| Reset the log file to the specified file.       | **`[LOG]`**<br/>**`File`**<br/><br/>**`NCBI_CONFIG__LOG__FILE`**  [<sup>c</sup>](#ch_libconfig.TF.3)     | a valid file name     | ""   |
| Defines the default hit ID, which is used for application and for any request which has no explicit hit ID set.      | **`[Log]`**<br/>**`Hit_Id`**<br/><br/>**`NCBI_LOG_HIT_ID`** | any valid PHID string | "" |
| Same as **`NCBI_LOG_HIT_ID`**, but passed through HTTP headers. Has priority over **`NCBI_LOG_HIT_ID`**. | **`[Log]`**<br/>**`Http_Hit_Id`**<br/><br/>**`HTTP_NCBI_PHID`** | any valid PHID string | "" |
| Same as **`NCBI_LOG_SESSION_ID`**, but passed through HTTP headers. Has priority over **`NCBI_LOG_SESSION_ID`**. | **`[Log]`**<br/>**`Http_Session_Id`**<br/><br/>**`HTTP_NCBI_SID`** | any valid session ID string | "UNK_SESSION" |
| Specify when to use the **`File`**, **`NoCreate`**, **`Truncate`**, and **`TryRootLogFirst`** registry parameters shown in this table. ***Note:*** those parameters will only be used if the log file has not been set already or if **`IgnoreEnvArg`** is set to true.     | **`[LOG]`**<br/>**`IgnoreEnvArg`**<br/><br/>**`NCBI_CONFIG__LOG__IGNOREENVARG`**  [<sup>c</sup>](#ch_libconfig.TF.3) | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1)    | false      |
| Specify the maximum number of sub-PHIDs that can be reported to the AppLog by a single request.              | **`[Log]`**<br/>**`Issued_SubHit_Limit`**<br/><br/>**`LOG_ISSUED_SUBHIT_LIMIT`**      | unsigned integer        | 200    |
| Log all app arguments *before* application run. The extra message starts with a "LogAppArguments=true" pair.     | **`[LOG]`**<br/>**`LogAppArguments`**<br/><br/>**`DIAG_LOG_APP_ARGUMENTS`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log all environment variables as an 'extra' *before* application run. The extra message starts with a "LogAppEnvironment=true" pair.     | **`[LOG]`**<br/>**`LogAppEnvironment`**<br/><br/>**`DIAG_LOG_APP_ENVIRONMENT`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log all environment variables as an 'extra' *after* application run. The extra message starts with a "LogAppEnvironment=true" pair.     | **`[LOG]`**<br/>**`LogAppEnvironmentOnStop`**<br/><br/>**`DIAG_LOG_APP_ENVIRONMENT_ON_STOP`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log application executable path *before* application run. The extra message starts with a "LogAppPath=true" pair.     | **`[LOG]`**<br/>**`LogAppPath`**<br/><br/>**`DIAG_LOG_APP_PATH`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log all registry variables as an 'extra' *before* application run. The extra message starts with a "LogAppRegistry=true" pair.     | **`[LOG]`**<br/>**`LogAppRegistry`**<br/><br/>**`DIAG_LOG_APP_REGISTRY`** [sic]                  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log all registry variables as an 'extra' *after* application run. The extra message starts with a "LogAppRegistry=true" pair.     | **`[LOG]`**<br/>**`LogAppRegistryOnStop`**<br/><br/>**`DIAG_LOG_APP_REGISTRY_ON_STOP`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Log memory and CPU consumed by application as an 'extra' *after* application run, just before stop. The extra message starts with a "LogAppResUsage=true" pair.     | **`[LOG]`**<br/>**`LogAppResUsageOnStop`**<br/><br/>**`DIAG_LOG_APP_RESUSAGE_ON_STOP`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| Set **`[LOG]LogAppRegistry`**, **`[LOG]LogAppRegistryOnStop`**, **`[LOG]LogAppEnvironment`**, **`[LOG]LogAppEnvironmentOnStop`**, **`[LOG]LogAppArguments`**, **`[LOG]LogAppPath`** to the one specified value   | **`[LOG]`**<br/>**`LogAppRunContext`**<br/><br/>**`DIAG_LOG_APP_RUN_CONTEXT`** [sic]  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1) | ""   |
| The listed environment variables will be logged as an 'extra' after each 'request-start' message. The extra message starts with a "LogEnvironment=true" pair.     | **`[LOG]`**<br/>**`LogEnvironment`**<br/><br/>**`DIAG_LOG_ENVIRONMENT`** [sic]  | space separated list of environment variable names  | ""   |
| The listed registry entries will be logged as an 'extra' after each 'request-start' message. The extra message starts with a "LogRegistry=true" pair.             | **`[LOG]`**<br/>**`LogRegistry`**<br/><br/>**`DIAG_LOG_REGISTRY`** [sic]        | space separated list of registry section:name values      | ""   |
| Do not create the log file if it does not exist already.           | **`[Log]`**<br/>**`NoCreate`**<br/><br/>**`NCBI_CONFIG__LOG__NOCREATE`**  [<sup>c</sup>](#ch_libconfig.TF.3)   | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)    | false      |
| Specifies what to do if an invalid page hit ID is encountered. Valid PHIDs match the regex: `[A-Za-z0-9:@_-]+(\.[0-9]+)*` | **`[Log]`**<br/>**`On_Bad_Hit_Id`**<br/><br/>**`LOG_ON_BAD_HIT_ID`**            | "Allow", "AllowAndReport", "Ignore", "IgnoreAndReport", "Throw" | "AllowAndReport" |
| Specifies what to do if an invalid session ID is encountered. Valid session IDs match the format specified by **`LOG_SESSION_ID_FORMAT`**.| **`[Log]`**<br/>**`On_Bad_Session_Id`**<br/><br/>**`LOG_ON_BAD_SESSION_ID`** | "Allow", "AllowAndReport", "Ignore", "IgnoreAndReport", "Throw" | "AllowAndReport" |
| Turn performance logging on or off (globally).                | **`[Log]`**<br/>**`PerfLogging`**<br/><br/>**`LOG_PerfLogging`**  [<sup>c</sup>](#ch_libconfig.TF.3)     | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)| false |
| Defines the default session ID, which is used for any request which has no explicit session ID set.      | **`[Log]`**<br/>**`Session_Id`**<br/><br/>**`NCBI_LOG_SESSION_ID`** | any valid session ID string | "UNK_SESSION" |
| Specifies which format rule to check session IDs against:<br/>for "Ncbi" use `^[0-9]{16}_[0-9]{4,}SID$`<br/>for "Standard" use `^[A-Za-z0-9_.:@-]+$`<br/>for "Other" use `^.*$` (i.e. anything is valid). | **`[Log]`**<br/>**`Session_Id_Format`**<br/><br/>**`LOG_SESSION_ID_FORMAT`**    | "Ncbi", "Standard", "Other" | "Standard" |
| If this parameter is defined, use the [CSysLog](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSysLog) facility setting when posting.    | **`[LOG]`**<br/>**`SysLogFacility`**<br/><br/>**`NCBI_CONFIG__LOG__SYSLOGFACILITY`**  [<sup>c</sup>](#ch_libconfig.TF.3)   | any non-empty string  | (none)     |
| Truncate the log file – i.e. discard the contents when opening an existing file.      | **`[Log]`**<br/>**`Truncate`**<br/><br/>**`LOG_TRUNCATE`**   | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)    | false      |
| Specify whether to try creating the log file under `/log` before trying other locations (e.g. a location specified by the registry or by **`NCBI_CONFIG__LOG__FILE`**).              | **`[LOG]`**<br/>**`TryRootLogFirst`**<br/><br/>**`NCBI_CONFIG__LOG__TRYROOTLOGFIRST`**  [<sup>c</sup>](#ch_libconfig.TF.3) | Boolean  [<sup>a</sup>](#ch_libconfig.TF.1)    | false      |
| If true, default to logging warnings when unsafe static array types are copied.       | **`[NCBI]`**<br/>**`STATIC_ARRAY_COPY_WARNING`**<br/><br/>**`NCBI_STATIC_ARRAY_COPY_WARNING`**    | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)    | false      |
| If true, log warnings for unsafe static array types.               | **`[NCBI]`**<br/>**`STATIC_ARRAY_UNSAFE_TYPE_WARNING`**<br/><br/>**`NCBI_STATIC_ARRAY_UNSAFE_TYPE_WARNING`**  | Boolean  [<sup>b</sup>](#ch_libconfig.TF.2)    | true |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.1"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.2"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.3"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.libconfig_diag"></a>

### Diagnostic Trace

Severity level is the same for all macros (ERR_POST*, LOG_POST*, _TRACE). DIAG_TRACE enables _TRACE output regardless of the severity level. So, if your severity level is Warning and DIAG_TRACE is set, you will see Warnings (and above) and Traces but not Infos. This chapter tells more about logging severity: [Setting Diagnostic Severity Levels](ch_log.html#ch_core.diag_severity)

These parameters tune the visibility and contents of diagnostic messages produced by **`_TRACE`**, **`LOG_POST`** or **`ERR_POST`** macros.

See [Table 3](#ch_libconfig.T3).

<a name="ch_libconfig.T3"></a>

Table 3. Diagnostic trace configuration parameters

| Purpose         | [Registry section]<br/>Registry name<br/><br/>Environment variable      | Valid values  | Default  |
|-----------------|-------------------------------------------------------------------------|---------------|----------|
| Specify the severity level threshold for posting diagnostic messages – i.e. less severe messages will not be posted. Special case:  Trace -- print all messages and show Trace level messages. ***Note:*** If the parameter is set then the function ***ncbi***::[SetDiagPostLevel()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagPostLevel) is ignored - except for setting the level to **`eDiag_Trace`**, in which case Trace level messages will be shown anyway. | **`[DEBUG]`**<br/>**`DIAG_POST_LEVEL`**<br/><br/>**`DIAG_POST_LEVEL`**  | CI  <sup>b</sup>: Info, Warning, Error, Critical, Fatal, Trace  | (none)   |
| Messages with Trace level will be shown if this parameter is given any value.   | **`[DEBUG]`**<br/>**`DIAG_TRACE`**<br/><br/>**`DIAG_TRACE`** or **`NCBI_CONFIG__DEBUG__DIAG_TRACE`**  <sup>c</sup> | any non-empty string             | (none)   |
| Specify a file that stores a mapping of error codes to their descriptions.                  | **`[DEBUG]`**<br/>**`MessageFile`**<br/><br/>**`NCBI_CONFIG__DEBUG__MESSAGEFILE`**  <sup>c</sup> | a valid file name                | (none)   |
| Specify the minimum severity that will result in the stack trace being added to diagnostic messages.   | **`[DEBUG]`**<br/>**`Stack_Trace_Level`**<br/><br/>**`DEBUG_STACK_TRACE_LEVEL`**  | CI  <sup>b</sup>: Info, Warning, Error, Critical, Fatal, Trace             | Fatal   |
| Specify the maximum number of entries to be listed in a stack trace. All stack trace entries above the specified level are not printed.              | **`[DEBUG]`**<br/>**`Stack_Trace_Max_Depth`**<br/><br/>**`DEBUG_STACK_TRACE_MAX_DEPTH`**   | a positive integer               | 200      |
| Specify the maximum number of messages that can be posted to the AppLog within the AppLog period.              | **`[Diag]`**<br/>**`AppLog_Rate_Limit`**<br/><br/>**`DIAG_APPLOG_RATE_LIMIT`**      | unsigned integer or `OFF`        | 50000    |
| Specify the AppLog period in seconds.                 | **`[Diag]`**<br/>**`AppLog_Rate_Period`**<br/><br/>**`DIAG_APPLOG_RATE_PERIOD`**    | unsigned integer                 | 10 |
| Specify whether context properties should be automatically printed when set or changed.     | **`[Diag]`**<br/>**`AutoWrite_Context`**<br/><br/>**`DIAG_AUTOWRITE_CONTEXT`**      | Boolean  <sup>a</sup>             | false    |
| Specify the maximum number of diagnostic messages to collect. Messages beyond the limit will result in erasing the oldest message.                   | **`[Diag]`**<br/>**`Collect_Limit`**<br/><br/>**`DIAG_COLLECT_LIMIT`**  | size\_t       | 1000     |
| Disable all Applog messages (start/stop, request start/stop, extra). | **`[Diag]`**<br/>**`Disable_AppLog_Messages`**<br/><br/>**`DIAG_DISABLE_APPLOG_MESSAGES`** | Boolean  <sup>a</sup> | false |
| Specify the maximum number of messages that can be posted to the ErrLog within the ErrLog period.              | **`[Diag]`**<br/>**`ErrLog_Rate_Limit`**<br/><br/>**`DIAG_ERRLOG_RATE_LIMIT`**      | unsigned integer or `OFF`        | 5000     |
| Specify the ErrLog period in seconds.                 | **`[Diag]`**<br/>**`ErrLog_Rate_Period`**<br/><br/>**`DIAG_ERRLOG_RATE_PERIOD`**    | unsigned integer                 | 1  |
| Limit the log file size, and rotate the log when it reaches the limit.   | **`[Diag]`**<br/>**`Log_Size_Limit`**<br/><br/>**`DIAG_LOG_SIZE_LIMIT`**      | non-negative long integer        | 0  |
| If "On", then replace newlines in diagnostic messages with a semicolon.<br/>**N.B.** Newlines are replaced in-place by ";" - they are _not_ escaped. | **`[Diag]`**<br/>**`Merge_Lines`**<br/><br/>**`DIAG_MERGE_LINES`**    | "Default", "Off", or "On" | "Default" (which means "Off") |
| Use the old output format if the flag is set.         | **`[Diag]`**<br/>**`Old_Post_Format`**<br/><br/>**`DIAG_OLD_POST_FORMAT`**    | Boolean  <sup>a</sup>             | true     |
| Specify a diagnostics post filter string (see an [earlier chapter](ch_core.html#ch_core.diagnostic_messages_filtering) for more detail on filtering).                   | **`[DIAG]`**<br/>**`POST_FILTER`**<br/><br/>**`NCBI_CONFIG__DIAG__POST_FILTER`**  <sup>c</sup>   | see the [syntax rules](ch_core.html#ch_core.diagnostic_messages_filtering) | (none)   |
| Print the system TID rather than [CThread](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThread)::[GetSelf()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetSelf).               | **`[Diag]`**<br/>**`Print_System_TID`**<br/><br/>**`DIAG_PRINT_SYSTEM_TID`**  | Boolean  <sup>a</sup>             | false    |
| Specify the minimum severity that will activate **`Tee_To_Stderr`**. See the [Tee Output to STDERR](ch_core.html#ch_core.Tee_Output_to_STDERR) section.                 | **`[Diag]`**<br/>**`Tee_Min_Severity`**<br/><br/>**`DIAG_TEE_MIN_SEVERITY`**  | CI  <sup>b</sup>: Info, Warning, Error, Critical, Fatal, Trace  | Warning (debug); Error (release) |
| Duplicate messages to **`stderr`**. See the [Tee Output to STDERR](ch_core.html#ch_core.Tee_Output_to_STDERR) section.            | **`[Diag]`**<br/>**`Tee_To_Stderr`**<br/><br/>**`DIAG_TEE_TO_STDERR`**  | Boolean  <sup>a</sup>             | false    |
| Specify a diagnostics trace filter string (see an [earlier chapter](ch_core.html#ch_core.diagnostic_messages_filtering) for more detail on filtering).                  | **`[DIAG]`**<br/>**`TRACE_FILTER`**<br/><br/>**`NCBI_CONFIG__DIAG__TRACE_FILTER`**  <sup>c</sup> | see the [syntax rules](ch_core.html#ch_core.diagnostic_messages_filtering) | (none)   |
| Specify the maximum number of messages that can be posted to the TraceLog within the TraceLog period.          | **`[Diag]`**<br/>**`TraceLog_Rate_Limit`**<br/><br/>**`DIAG_TRACELOG_RATE_LIMIT`**  | unsigned integer or `OFF`        | 5000     |
| Specify the TraceLog period in seconds.               | **`[Diag]`**<br/>**`TraceLog_Rate_Period`**<br/><br/>**`DIAG_TRACELOG_RATE_PERIOD`**      | unsigned integer                 | 1  |
| If true and AppLog severity is not locked, print the current GMT time in diagnostic messages; otherwise print local time.         | **`[Diag]`**<br/>**`UTC_Timestamp`**<br/><br/>**`DIAG_UTC_TIMESTAMP`**  | Boolean  <sup>a</sup>             | false    |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.4"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.5"></a>

<sup>b</sup> CI = case-insensitive

<a name="ch_libconfig.TF.6"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.libconfig_runtime"></a>

### Run-Time

[Run-time configuration parameters](#ch_libconfig.T4) allow specifying memory size limit, CPU time limit, and memory allocation behavior. ***Note:*** not all operating systems support these parameters.

<a name="ch_libconfig.T4"></a>

Table 4. Run-time configuration parameters

| Purpose    | [Registry section]<br/>Registry name<br/><br/>Environment variable                | Valid values       | Default |
|------------|-----------------------------------------------------------------------------------|--------------------|---------|
| Controls whether to enable `libbackward`'s support for printing stack traces on segmentation faults and the like; the default is based on the build-time flag `--with-backward-cpp-sig`.<br/><br/>**NB:** Code bypassing `CNcbiApplication` but interested in this feature should explicitly call `CStackTrace::s_HonorSignalHandlingConfiguration()`. | **`[Debug]`**<br/>**`Trace_Fatal_Signals`**<br/><br/>**`DEBUG_TRACE_FATAL_SIGNALS`** | Boolean  <sup>a</sup> | varies by build-time configuration, but false for standard builds |
| Set a CPU time limit for the application in seconds. | **`[NCBI]`**<br/>**`CpuTimeLimit`**<br/><br/>**`NCBI_CONFIG__NCBI__CPUTIMELIMIT`**  [<sup>b</sup>](#ch_libconfig.TF.7) | non-negative integer                  | 0 (unlimited) |
| Set a memory size limit for the application.   | **`[NCBI]`**<br/>**`MemorySizeLimit`**<br/><br/>**`NCBI_CONFIG__NCBI__MEMORYSIZELIMIT`**  [<sup>b</sup>](#ch_libconfig.TF.7) | A positive integer percent (e.g. "70%") or an optionally suffixed non-negative real number (e.g. "123456789", "100MiB", or "1.25 G").<br/><br/>A percent limit is relative to the total system memory.<br/><br/>No suffix means the given value is in MiB; a "B" suffix means the value is in bytes.<br/><br/>If there is a suffix, there can be spaces between the number and the suffix. The default units are decimal (i.e. powers of 1000) - e.g. "MB". The final "B" is optional for decimal units (e.g. "M"). You can use "i" to indicate binary units (i.e. powers of 1024) – e.g. "MiB".<br/><br/>Supported suffix characters are: "K", "M", "G", "T", "P", and "E".<br/><br/>Suffixes are not case-sensitive. | 0 (unlimited) |
| Specify the method for filling allocated memory.     | **`[NCBI]`**<br/>**`MEMORY_FILL`**<br/><br/>**`NCBI_MEMORY_FILL`**                | CI  [<sup>c</sup>](#ch_libconfig.TF.8): none, zero, pattern                  | pattern |

<div class="table-scroll"></div>

<sup>a</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.7"></a>

<sup>b</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.8"></a>

<sup>c</sup> CI = case-insensitive

<a name="ch_libconfig.libconfig_term"></a>

### Abnormal Program Termination

[These parameters](#ch_libconfig.T5) specify how to handle abnormal situations when executing a program.

<a name="ch_libconfig.T5"></a>

Table 5. Abnormal program termination configuration parameters

| Purpose       | [Registry section]<br/>Registry name<br/><br/>Environment variable      | Valid values  | Default |
|---------------|-------------------------------------------------------------------------|---------------|---------|
| If this parameter is defined, abort the program if a CException is thrown.       | **`[DEBUG]`**<br/>**`ABORT_ON_THROW`**<br/><br/>**`NCBI_CONFIG__DEBUG__ABORT_ON_THROW`**  [<sup>c</sup>](#ch_libconfig.TF.11) | any non-empty string      | (none)  |
| Specify whether the NCBI application framework should catch exceptions that are not otherwise caught.                  | **`[Debug]`**<br/>**`Catch_Unhandled_Exceptions`**<br/><br/>**`DEBUG_CATCH_UNHANDLED_EXCEPTIONS`**   | Boolean  [<sup>a</sup>](#ch_libconfig.TF.9)  | true    |
| Specify whether ncbi::Abort() will call \_ASSERT(false). ***Note:*** this only applies to MSVC.     | **`[Diag]`**<br/>**`Assert_On_Abort`**<br/><br/>**`DIAG_ASSERT_ON_ABORT`**         | Boolean  [<sup>a</sup>](#ch_libconfig.TF.9)  | false   |
| If this parameter is true, abort the program if a CObjectException is thrown.    | **`[NCBI]`**<br/>**`ABORT_ON_COBJECT_THROW`**<br/><br/>**`NCBI_ABORT_ON_COBJECT_THROW`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.9)  | false   |
| If this parameter is true, abort the program on an attempt to access or release a NULL pointer stored in a CRef object.                   | **`[NCBI]`**<br/>**`ABORT_ON_NULL`**<br/><br/>**`NCBI_ABORT_ON_NULL`**             | Boolean  [<sup>a</sup>](#ch_libconfig.TF.9)  | false   |
| Specify what to do when ncbi::Abort() is called. When the variable is set to a "yes" value, Abort() will call exit(255). When the variable is set to a "no" value, Abort() will call abort(). When the variable is not set, Abort() will call exit(255) for release builds and abort() for debug builds - unless compiled with MSVC and the **`DIAG_ASSERT_ON_ABORT`** parameter is true, in which case Abort() will call \_ASSERT(false). | [N/A]<br/>N/A<br/><br/>**`DIAG_SILENT_ABORT`**                  | Boolean  [<sup>b</sup>](#ch_libconfig.TF.10) | (none)  |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.9"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.10"></a>

<sup>b</sup> case-insensitive: y, 1, n, 0

<a name="ch_libconfig.TF.11"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.NCBI"></a>

### NCBI

[These parameters](#ch_libconfig.T.NCBI_C_Toolkitwide_config) tune generic NCBI C++ Toolkit-wide behavior.

<a name="ch_libconfig.T.NCBI_C_Toolkitwide_config"></a>

Table 6. NCBI C++ Toolkit-wide configuration parameters

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable     | Valid values            | Default           |
|-------------|------------------------------------------------------------------------|-------------------------|-------------------|
| Specify whether throwing an exception of at least Critical severity will cause an immediate abort().     | **`[EXCEPTION]`**<br/>**`Abort_If_Critical`**<br/><br/>**`EXCEPTION_ABORT_IF_CRITICAL`**     | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | false             |
| Specify the minimum severity that will result in the stack trace being added to exceptions.  | **`[EXCEPTION]`**<br/>**`Stack_Trace_Level`**<br/><br/>**`EXCEPTION_STACK_TRACE_LEVEL`**     | CI  [<sup>b</sup>](#ch_libconfig.TF.13): Trace, Info, Warning, Error, Critical, Fatal | Critical          |
| A single path to check for common data files via [g\_FindDataFile()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=g_FindDataFile). Takes a lower precedence than paths in **`NCBI_DATA_PATH`**. | **`[NCBI]`**<br/>**`Data`**<br/><br/>**`NCBI_CONFIG__NCBI__DATA`**  [<sup>c</sup>](#ch_libconfig.TF.14)   | a valid path            | ""                |
| A list of paths (delimited in the style of the OS) to check for common data files via [g\_FindDataFile()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=g_FindDataFile). | **`[NCBI]`**<br/>**`DataPath`**<br/><br/>**`NCBI_DATA_PATH`** | a delimited list of valid paths            | ""                |
| Specify how read-only files are treated on Windows during a remove request.                  | **`[NCBI]`**<br/>**`DeleteReadOnlyFiles`**<br/><br/>**`NCBI_CONFIG__DELETEREADONLYFILES`**   | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | false             |
| Specify whether the API classes should have logging turned on.            | **`[NCBI]`**<br/>**`FileAPILogging`**<br/><br/>**`NCBI_CONFIG__FILEAPILOGGING`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | [DEFAULT\_LOGGING\_VALUE](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_LOGGING_VALUE)    |
| Declare how umask settings on Unix affect creating files/directories in the File API.        | **`[NCBI]`**<br/>**`FileAPIHonorUmask`**<br/><br/>**`NCBI_CONFIG__FILEAPIHONORUMASK`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | false             |
| Specify whether to load plugins from DLLs.             | **`[NCBI]`**<br/>**`Load_Plugins_From_DLLs`**<br/><br/>**`NCBI_LOAD_PLUGINS_FROM_DLLS`**     | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | [LOAD\_PLUGINS\_FROM\_DLLS\_BY\_DEFAULT](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LOAD_PLUGINS_FROM_DLLS_BY_DEFAULT) |
| Specify the directory to use for temporary files.      | **`[NCBI]`**<br/>**`TmpDir`**<br/><br/>**`NCBI_CONFIG__NCBI__TMPDIR`**  [<sup>c</sup>](#ch_libconfig.TF.14)     | a valid path            | ""                |
| Specify the file name of a Unicode-to-ASCII translation table.            | **`[NCBI]`**<br/>**`UnicodeToAscii`**<br/><br/>**`NCBI_CONFIG__NCBI__UNICODETOASCII`**  [<sup>c</sup>](#ch_libconfig.TF.14) | a valid path            | ""                |
| Safety switch to turn async write off (making write blocking) for all CAsyncWriteCache instances.  | **`[NCBI]`**<br/>**`cache_async_write`**<br/><br/>**`NCBI_CONFIG__NCBI__CACHEASYNCWRITE`**   | Boolean  [<sup>a</sup>](#ch_libconfig.TF.12)      | false |


<div class="table-scroll"></div>

<a name="ch_libconfig.TF.12"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.13"></a>

<sup>b</sup> CI = case-insensitive

<a name="ch_libconfig.TF.14"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.LibrarySpecific_Parameters"></a>

Library-Specific Parameters
---------------------------

The following sections discuss library-specific configuration parameters.

-   [Connection](#ch_libconfig.libconfig_connect)

-   [CGI and FCGI](#ch_libconfig.libconfig_cgi)

-   [Serial](#ch_libconfig.Serial)

-   [Objects, Object Manager, Object Tools](#ch_libconfig.Objects_Object_Manager_Obje)

-   [DBAPI](#ch_libconfig.DBAPI)

-   [Eutils](#ch_libconfig.Eutils)

<a name="ch_libconfig.libconfig_connect"></a>

### Connection

[These parameters](#ch_libconfig.T7) affect various aspects of internet connections established by the connection library. See the [Networking and IPC](ch_conn.html#ch_conn.Connection_related_parameters) chapter for a description of the corresponding network information structure.

<a name="ch_libconfig.T7"></a>

Table 7. Connection library configuration parameters

| Purpose |[Registry section]<br/>Registry name<br/><br/>Environment variable (See [Note 2](#ch_libconfig.TF.22)) | Valid values | Default |
|---------|-------------------------------------------------------------------------------------------------------|--------------|-------------|
| **Service-specific parameters follow this form.<br/>(See [Note 1](#ch_libconfig.TF.21))**| **`[<service>]`**<br/>**`CONN_<param_name>`**<br/><br/>**`<service>_CONN_<param_name>`** |   |   |
| **Global parameters follow this form.<br/>(See [Note 1](#ch_libconfig.TF.21))** |**`[CONN]`**<br/>**`<param_name>`**<br/><br/>**`CONN_<param_name>`** |      |   |
| Specify arguments for the given service.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_ARGS`**<br/><br/>**`<service>_CONN_ARGS`** | (service-dependent) | "" |
| Specify how much debug information will be output.<br/>(See [Note 1](#ch_libconfig.TF.21)) |**`[<service>]`**<br/>**`CONN_DEBUG_PRINTOUT`**<br/><br/>**`<service>_CONN_DEBUG_PRINTOUT`** |CI  [<sup>a</sup>](#ch_libconfig.TF.15):<br/>*to get some*: 1, on, yes, true, some<br/>*to get all*: data, all<br/>*to get none*: anything else | "" |
| If this parameter is true, the network dispatcher will be disabled.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_DISPD_DISABLE`**<br/><br/>**`<service>_CONN_DISPD_DISABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | true |
| Sets the DTAB (delegation table) for routing via NAMERD.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_DTAB`**<br/><br/>**`<service>_CONN_DTAB`** | [string](https://confluence.ncbi.nlm.nih.gov/pages/viewpage.action?pageId=47415379) | "" |
| If this parameter is true, the Firewall mode will be enabled.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_FIREWALL`**<br/><br/>**`<service>_CONN_FIREWALL`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | not set |
| Set the dispatcher host name.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_HOST`**<br/><br/>**`<service>_CONN_HOST`** | a valid host name | www.ncbi.nlm.nih.gov |
| Set the HTTP proxy server.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_HTTP_PROXY_HOST`**<br/><br/>**`<service>_CONN_HTTP_PROXY_HOST`** | a valid proxy host | "" |
| Set the HTTP proxy server port number. This will be set to zero if **`<service>_CONN_HTTP_PROXY_HOST`** is not set.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_HTTP_PROXY_PORT`**<br/><br/>**`<service>_CONN_HTTP_PROXY_PORT`** | unsigned short | 0 |
| Set a custom user header. This is rarely used, and then typically for debugging purposes.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_HTTP_USER_HEADER`**<br/><br/>**`<service>_CONN_HTTP_USER_HEADER`** | a valid HTTP header | "" |
| Prohibit the use of a local load balancer. ***Note:*** This parameter is discouraged for performance reasons - please use **`<service>_CONN_LBSMD_DISABLE`** instead.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_LB_DISABLE`**<br/><br/>**`<service>_CONN_LB_DISABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Prohibit the use of a local load balancer. This should be used instead of **`<service>_CONN_LB_DISABLE`**.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_LBSMD_DISABLE`**<br/><br/>**`<service>_CONN_LBSMD_DISABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Enable linkerd-based service name resolution.<br/>(See [Note 1](#ch_libconfig.TF.21))<br/>**Note:** You must also set `<service>_CONN_LBSMD_DISABLE=1` for this to take effect. | **`[<service>]`**<br/>**`CONN_LINKERD_ENABLE`**<br/><br/>**`<service>_CONN_LINKERD_ENABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Enable the use of locally configured services.<br />See **`<service>_CONN_LOCAL_SERVER_<n>`**.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_LOCAL_ENABLE`**<br/><br/>**`<service>_CONN_LOCAL_ENABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Create a service entry for **`service`**, where **`n`** is a number from 0 to 100 (not necessarily sequential). The value must be a valid server descriptor, as it would be configured for the load balancing daemon ([LBSMD](ch_app.html#ch_app.Load_Balancing_Servi)). This is a quick way of configuring locally used services (usually, for the sole purposes of debugging / development) without the need to edit the actual LBSMD tables (which become visible for the whole NCBI). See **`<service>_CONN_LOCAL_ENABLE`**. ***Note:*** This parameter has no corresponding global parameter.<br/>(See [Note 1](#ch_libconfig.TF.21)) |  **`[<service>]`**<br/>**`CONN_LOCAL_SERVER_<n>`**<br/><br/>**`<service>_CONN_LOCAL_SERVER_<n>`** | any non-empty string | not set |
| Maximum number of attempts to establish connection. Zero means use the default.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_MAX_TRY`**<br/><br/>**`<service>_CONN_MAX_TRY`** | unsigned short | 3 |
| Enable namerd-based service name resolution.<br/>(See [Note 1](#ch_libconfig.TF.21))<br/>(See [Note 3](#ch_libconfig.TF.49))<br/>**Note:** You must also set `<service>_CONN_LBSMD_DISABLE=1` for this to take effect. | **`[<service>]`**<br/>**`CONN_NAMERD_ENABLE`**<br/><br/>**`<service>_CONN_NAMERD_ENABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Enable namerd-based service name resolution specifically for the case when linkerd-based service name resolution has failed (use **`<service>_CONN_NAMERD_ENABLE`** to enable namerd-based resolution generally).<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_NAMERD_FOR_LINKERD_ENABLE`**<br/><br/>**`<service>_CONN_NAMERD_FOR_LINKERD_ENABLE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Specify a password for the connection (only used with **`<service>_CONN_USER`**).<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_PASS`**<br/><br/>**`<service>_CONN_PASS`** | the user's password | "" |
| Set the path to the service.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_PATH`**<br/><br/>**`<service>_CONN_PATH`** | a valid service path | /Service/dispd.cgi |
| Set the dispatcher port number.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_PORT`**<br/><br/>**`<service>_CONN_PORT`** | unsigned short | 0 |
| Set a non-transparent CERN-like firewall proxy server.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_PROXY_HOST`**<br/><br/>**`<service>_CONN_PROXY_HOST`** | a valid proxy host | "" |
| Set the HTTP request method.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_REQ_METHOD`**<br/><br/>**`<service>_CONN_REQ_METHOD`** | CI [<sup>a</sup>](#ch_libconfig.TF.15): any, get, post | ANY |
| Redirect connections to **`<service>`** to the specified alternative service. See [Service Redirection](ch_conn.html#ch_conn.Service_Redirection).<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_SERVICE_NAME`**<br/><br/>**`<service>_CONN_SERVICE_NAME`** | a replacement for the service name | (none) |
| Set to true if the client is stateless.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_STATELESS`**<br/><br/>**`<service>_CONN_STATELESS`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Zero means no waiting but polling (may not work well with all connections); "infinite" means no timeout (i.e. to wait for I/O indefinitely); other values are the maximum number of seconds to wait before failing.<br/>(See [Note 1](#ch_libconfig.TF.21).) | **`[<service>]`**<br/>**`CONN_TIMEOUT`**<br/><br/>**`<service>_CONN_TIMEOUT`** | floating point \>= 0.0 (1 microsecond precision)  [<sup>f</sup>](#ch_libconfig.TF.20) or "infinite" | 30.0 |
| Specify a username for the connection (see **`<service>_CONN_PASS`**). Only necessary for connections requiring authentication.<br/>(See [Note 1](#ch_libconfig.TF.21)) | **`[<service>]`**<br/>**`CONN_USER`**<br/><br/>**`<service>_CONN_USER`** | a username with access rights for the connection | (none) |
| Set the level of logging detail that GNUTLS should produce about secure transactions. Log levels greater than 7 also dump scrambled data from GNUTLS. | **`[CONN]`**<br/>**`GNUTLS_LOGLEVEL`**<br/><br/>**`CONN_GNUTLS_LOGLEVEL`** | 0 to 10 | 0 |
| A true value enables HTTP connections to dump headers of error server responses only (successful responses do not get logged). | **`[CONN]`**<br/>**`HTTP_ERROR_HEADER_ONLY`**<br/><br/>**`CONN_HTTP_ERROR_HEADER_ONLY`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false | 
| A true value enables HTTP connections to follow https to http transitions (http to https transitions are secure and therefore don't need to be enabled). | **`[CONN]`**<br/>**`HTTP_UNSAFE_REDIRECTS`**<br/><br/>**`CONN_HTTP_UNSAFE_REDIRECTS`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Set a default referer (applies to all HTTP connections). | **`[CONN]`**<br/>**`HTTP_REFERER`**<br/><br/>**`CONN_HTTP_REFERER`** | a valid referer | (none) |
| A list of identifiers to be treated as local services defined in the registry / environment. This parameter is optional and is used only for reverse address-to-name lookups. | **`[CONN]`**<br/>**`LOCAL_SERVICES`**<br/><br/>**`CONN_LOCAL_SERVICES`** | whitespace-delimited  [<sup>d</sup>](#ch_libconfig.TF.18) list of identifiers | (none) |
| Set the mail gateway host. | **`[CONN]`**<br/>**`MX_HOST`**<br/><br/>**`CONN_MX_HOST`** | a valid host name | `localhost` on Unix platforms except Cygwin; `mailgw` on all other platforms | 
| Set the mail gateway port. | **`[CONN]`**<br/>**`MX_PORT`**<br/><br/>**`CONN_MX_PORT`** | 1 to 65535 | 25 (SMTP) |
| Set the mail gateway communication timeout in seconds. | **`[CONN]`**<br/>**`MX_TIMEOUT`**<br/><br/>**`CONN_MX_TIMEOUT`** | floating point \>= 0.0 (zero means default) | 120 | 
| Use `poll(2)` instead of `select(2)` to wait for available data for reading/writing.  This is necessary if the number of open file descriptors exceeds 1024. | **`[CONN]`**<br/>**`PIPE_USE_POLL`**<br/><br/>**`CONN_PIPE_USE_POLL`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.17) | false |
| Enable [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCServer.html) to catch exceptions. | **`[server]`**<br/>**`Catch_Unhandled_Exceptions`**<br/><br/>**`CSERVER_CATCH_UNHANDLED_EXCEPTIONS`** | Boolean  [<sup>b</sup>](#ch_libconfig.TF.16) | true |
| Enable [CThreadInPool\_ForServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCThreadInPool__ForServer.html) to catch exceptions. | **`[ThreadPool]`**<br/>**`Catch_Unhandled_Exceptions`**<br/><br/>**`NCBI_CONFIG__THREADPOOL__CATCH_UNHANDLED_EXCEPTIONS`**  [<sup>e</sup>](#ch_libconfig.TF.19) | Boolean  [<sup>b</sup>](#ch_libconfig.TF.16) | true |


<div class="table-scroll"></div>


<a name="ch_libconfig.TF.15"></a>

<sup>a</sup> CI = case-insensitive

<a name="ch_libconfig.TF.16"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.17"></a>

<sup>c</sup> case-insensitive: true values are { 1, on, yes, true }; false is anything else

<a name="ch_libconfig.TF.18"></a>

<sup>d</sup> whitespace can be any number of spaces and/or tabs

<a name="ch_libconfig.TF.19"></a>

<sup>e</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.20"></a>

<sup>f</sup> although very precise values may be specified, practical host limitations my result in less precise effective values

<a name="ch_libconfig.TF.21"></a>

***Note 1:*** All service-specific parameters shown in [Table 7](#ch_libconfig.T7) (except one) have corresponding global parameters - i.e. parameters that apply to all services. For these global parameters, the registry section name is **`CONN`**; the registry entry name doesn't have the **`CONN_`** prefix; and the environment variable doesn't have the **`<service>_`** prefix. For example, the service-specific parameter specified by the **`CONN_ARGS`** entry in a given **`[<service>]`** section of the registry (or by the **`<service>_CONN_ARGS`** environment variable) corresponds to the global parameter specified by the **`ARGS`** entry in the **`[CONN]`** section of the registry (or by the **`CONN_ARGS`** environment variable). When both a service-specific parameter and its corresponding global parameter are set, the service-specific parameter takes precedence.

<a name="ch_libconfig.TF.22"></a>

***Note 2:*** Environment variable names for service-specific parameters are formed by capitalizing the service name.

<a name="ch_libconfig.TF.49"></a>

***Note 3:*** See [Dispatching with namerd and Linkerd](https://confluence.ncbi.nlm.nih.gov/display/CT/Dispatching+with+namerd+and+Linkerd#DispatchingwithnamerdandLinkerd-Libraryconfiguration) for additional namerd-related configuration parameters not typically needed by end users.

<a name="ch_libconfig.libconfig_cgi"></a>

### CGI and FCGI

The folowing sections show parameters that tune CGI and FCGI applications and CGI load balancing.

-   [CGI](#ch_libconfig.CGI)

-   [FCGI](#ch_libconfig.FCGI)

-   [CGI Load Balancing](#ch_libconfig.CGI_Load_balancing_configur)

<a name="ch_libconfig.CGI"></a>

#### CGI

[These parameters](#ch_libconfig.T8) tune the behavior of CGI applications.

<a name="ch_libconfig.T8"></a>

Table 8. CGI-related configuration parameters

| Purpose       | [Registry section]<br/>Registry name<br/><br/>Environment variable          | Valid values  | Default  |
|---------------|-----------------------------------------------------------------------------|---------------|----------|
| Set to the user agent string you would like to be used by the web server.                 | [N/A]<br/>N/A<br/><br/>**`HTTP_USER_AGENT`**             | A valid user agent string.       | (none)   |
| Allow `SIGPIPE` in a plain (non-FastCGI) C++ Toolkit CGI (i.e. `CCgiApplication`-derived). | **`[CGI]`**<br/>**`Allow_Sigpipe`**<br/><br/>**`CGI_ALLOW_SIGPIPE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25) | false |
| Add to the user agent list of bot names. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsBot()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsBot).            | **`[CGI]`**<br/>**`Bots`**<br/><br/>**`NCBI_CONFIG__CGI__BOTS`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of bot names, e.g. "Googlebot Scooter WebCrawler Slurp".  | (none)   |
| When true (and when using HTTP/1.1), produce the CGI response in chunks, with the size set by `[CGI].ChunkSize`. | **`[CGI]`**<br/>**`ChunkedTransfer`**<br/><br/>**`CGI_CHUNKED_TRANSFER`** | "Disable" or "Enable" | "Disable" |
| Set the size of the chunks when producing chunked CGI responses per `[CGI].ChunkedTransfer`. | **`[CGI]`**<br/>**`ChunkSize`**<br/><br/>**`CGI_CHUNK_SIZE`** | positive integer | 4096 |
| According to RFC-2109, cookies should not be encoded. Instead, they should be just quoted. However, for backward compatibility with code that decodes incoming cookies, both quoted cookies and encoded cookies can be parsed. This setting controls which method of encoding/decoding is used.            | **`[CGI]`**<br/>**`Cookie_Encoding`**<br/><br/>**`CGI_COOKIE_ENCODING`**    | "Url", "Quote"                   | "Url"    |
| Severity level for cookie-related error messages.   | **`[CGI]`**<br/>**`Cookie_Error_Severity`**<br/><br/>**`CGI_Cookie_Error_Severity`**           | CI  [<sup>e</sup>](#ch_libconfig.TF.27): Info, Warning, Error, Critical, Fatal, Trace      | Error    |
| Defines which characters cannot be used in cookie names.               | **`[CGI]`**<br/>**`Cookie_Name_Banned_Symbols`**<br/><br/>**`CGI_Cookie_Name_Banned_Symbols`** | A string of banned characters.   | "  ,;="   |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Allow-Credentials*** header, which indicates whether or not the response to the request can be exposed when the credentials flag is true.  [<sup>g</sup>](#ch_libconfig.TF_8_G)                 | **`[CGI]`**<br/>**`CORS_Allow_Credentials`**<br/><br/>**`CGI_CORS_ALLOW_CREDENTIALS`**         | either do not set, or use the string "true"         | (not set)      |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Allow-Headers*** header, which is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.  [<sup>g</sup>](#ch_libconfig.TF_8_G)      | **`[CGI]`**<br/>**`CORS_Allow_Headers`**<br/><br/>**`CGI_CORS_ALLOW_HEADERS`**                 | string        | "X-Requested-With"   |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Allow-Methods*** header, which specifies the method or methods allowed when accessing the resource (in response to a preflight request).  [<sup>g</sup>](#ch_libconfig.TF_8_G)                  | **`[CGI]`**<br/>**`CORS_Allow_Methods`**<br/><br/>**`CGI_CORS_ALLOW_METHODS`**                 | string        | "GET, POST, OPTIONS" |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Allow-Origin*** header. Should be a space-separated list of domain suffixes (e.g. 'foo.com bar.org') that are permitted to access the resource. The Origin header sent by the client is matched against the list. If there's no match, CORS is not enabled. If matched, the client provided Origin is copied to the outgoing ***Access-Control-Allow-Origin***. To allow any origin set the value to '\*' (this should be a single character, not part of the list).     | **`[CGI]`**<br/>**`CORS_Allow_Origin`**<br/><br/>**`CGI_CORS_ALLOW_ORIGIN`**                   | string - either "\*" or a valid origin              | "ncbi.nlm.nih.gov"   |
| Set to true to enable Cross-Origin Resource Sharing (CORS), and use non-empty parameters for given headers (e.g. **`CORS_Allow_Origin`** etc) to set the value for those headers. If false or not set, cross-origin request headers will cause an error.             | **`[CGI]`**<br/>**`CORS_Enable`**<br/><br/>**`CGI_CORS_Enable`**            | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | false    |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Expose-Headers*** header, which lets a server whitelist headers that browsers are allowed to access.  [<sup>g</sup>](#ch_libconfig.TF_8_G)                | **`[CGI]`**<br/>**`CORS_Expose_Headers`**<br/><br/>**`CGI_CORS_EXPOSE_HEADERS`**               | string        | "" |
| See **`CGI_CORS_Enable`**. Param to enable JQuery JSONP hack to allow Cross-Origin Resource Sharing for browsers that don't support CORS (e.g. IE versions earlier than 11). If it is set to true and the HTTP request contains entry "callback" whose value starts with "JQuery\_" (case-insensitive, configurable - see **`CGI_CORS_JQUERY_CALLBACK_PREFIX`**), then:<br/>1. Set the response Content-Type to "text/javascript"; and<br/>2. Wrap the response content into: "JQuery\_foobar(original\_content)"                | **`[CGI]`**<br/>**`CORS_JQuery_Callback_Enable`**<br/><br/>**`CGI_CORS_JQUERY_CALLBACK_ENABLE`**     | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | false    |
| See **`CGI_CORS_Enable`**. Specify a prefix other than "JQuery\_" for the JQuery JSONP callback name (see **`CGI_CORS_JQUERY_CALLBACK_ENABLE`**). Use the symbol '\*' if any name is good.                  | **`[CGI]`**<br/>**`CORS_JQuery_Callback_Prefix`**<br/><br/>**`CGI_CORS_JQUERY_CALLBACK_PREFIX`**     | string        | "\*"     |
| See **`CGI_CORS_Enable`**. Specify the value of the ***Access-Control-Max-Age*** header, which indicates how long the results of a preflight request can be cached.  [<sup>g</sup>](#ch_libconfig.TF_8_G)    | **`[CGI]`**<br/>**`CORS_Max_Age`**<br/><br/>**`CGI_CORS_MAX_AGE`**          | string (seconds)                 | "" |
| Set to true to make the application count the amount of data read/sent. The numbers are then printed in request stop log messages.                 | **`[CGI]`**<br/>**`Count_Transfered`**<br/><br/>**`CGI_COUNT_TRANSFERED`**  | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Set the name of an environment variable, which in turn specifies a prefix that will be added to all diagnostic messages issued during HTTP request processing.        | **`[CGI]`**<br/>**`DiagPrefixEnv`**<br/><br/>**`NCBI_CONFIG__CGI__DIAGPREFIXENV`**  [<sup>f</sup>](#ch_libconfig.TF.28) | a valid environment variable name                   | (none)   |
| When true, discard the session tracking ID if it's set to "UNK_SESSION". For example, if "UNK_SESSION" is set through `HTTP_NCBI_SID` (which would generally be a bad practice), this will result in it being replaced with a valid SID. | **`[CGI]`**<br/>**`Discard_UNK_SESSION`**<br/><br/>**`NCBI_CGI_DISCARD_UNK_SESSION`** | Boolean [<sup>c</sup>](#ch_libconfig.TF.25) | false |
| When true, and when the request method is `GET` and the `ncbi_help[=format]` URL parameter is passed, return a help message to the CGI client. The following sources are checked in the given order for the help message content (all sources except the last are files located with the CGI):<br />&bull; `<cginame>.help.<format>`<br />&bull; `help.<format>`<br />&bull; `<cginame>.help.<accept_hdr_subtype><accept_hdr_mediarangeparams>`<br />&bull; `help.<accept_hdr_subtype><accept_hdr_mediarangeparams>`<br />&bull; `<cginame>.help.html`<br />&bull; `<cginame>.help.xml`<br />&bull; `<cginame>.help.json`<br />&bull; `help.html`<br />&bull; `help.xml`<br />&bull; `help.json`<br />&bull; an XML representation of the result of `GetArgDescriptions()` | **`[CGI]`**<br/>**`EnableHelpRequest`**<br/><br/>**`CGI_ENABLE_HELP_REQUEST`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25) | true |
| When the request method is "GET" and the `[CGI].EnableVersionRequest` configuration parameter is true and the `ncbi_version` URL parameter is supplied and empty or "short" or "full", then the CGI application version is returned to the CGI client.  Alternatively, the `[CGI].EnableVersionRequest` configuration parameter can name a URL parameter that will substitute for `ncbi_version`. In both cases, the short version is returned unless "full" is specified.<br/>By default, the version is returned as content type "text/plain", but this can be overridden by supplying either "xml" or "json" as the subtype in an Accept header.<br/>A non-empty `ncbi_version` (or overridden URL parameter) with a value other than "short" or "full" will result in an error, as will an Accept header subtype other than "xml" or "json". | **`[CGI]`**<br/>**`EnableVersionRequest`**<br/><br/>**`CGI_ENABLE_VERSION_REQUEST`** | either Boolean [<sup>c</sup>](#ch_libconfig.TF.25) or the name of a URL parameter | false |
| ***This parameter applies only to HEAD requests:***<br/><br/>**If false**, no exception is thrown and the application continues to run, but the output stream is blocked so that no more data can be sent to the client. If any attempts are made to write response content after the headers have been written, then an error will be posted to the log (but only the first time).<br/><br/>**If true**, the CGI application framework will throw [CCgiHeadException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiHeadException) after writing the headers. ***Note:*** This exception must percolate up to [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication)::[Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) for this option to work correctly, typically by catching and rethrowing it in [ProcessRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessRequest). In this case the application will exit immediately after writing the headers with HTTP status code 200. | **`[CGI]`**<br/>**`ExceptionAfterHEAD`**<br/><br/>**`NCBI_CONFIG__CGI__EXCEPTIONAFTERHEAD`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | false    |
| Set to true to disable the creation of a tracking cookie during session initialization.   | **`[CGI]`**<br/>**`DisableTrackingCookie`**<br/><br/>**`NCBI_CONFIG__CGI__DISABLETRACKINGCOOKIE`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | false    |
| Set to true to enable logging.   | **`[CGI]`**<br/>**`Log`**<br/><br/>**`NCBI_CONFIG__CGI__LOG`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | CI  [<sup>e</sup>](#ch_libconfig.TF.27):<br/>On =\> enabled;<br/>True =\> enabled;<br/>OnError =\> enabled for errors;<br/>OnDebug =\> enabled (debug builds only)  | disabled |
| An ampersand-delimited string of GET and/or POST arguments to exclude from the log (helps limit the size of the log file)       | **`[CGI]`**<br/>**`LOG_EXCLUDE_ARGS`**<br/><br/>**`CGI_LOG_EXCLUDE_ARGS`**  | valid format: arg1&arg2...       | (none)   |
| Allows specifying limits for multiple GET and/or POST arguments in one parameter string.  | **`[CGI]`**<br/>**`LOG_LIMIT_ARGS`**<br/><br/>**`CGI_LOG_LIMIT_ARGS`**      | valid format: arg1:size1&arg2:size2...&\*:size<br/>special argument:<br/>\* means all unspecified arguments;<br/>special limits:<br/>-2 means exclude;<br/>-1 means no limit | \*:1000000     |
| Enable logging of CGI request parameters. Only the specified parameters will be logged.   | **`[CGI]`**<br/>**`LogArgs`**<br/><br/>**`NCBI_CONFIG__CGI__LOGARGS`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>a</sup>](#ch_libconfig.TF.23) of environment variables (optionally aliased on output for shortening logs, e.g. envvar=1).     | (none)   |
| Set to true to merge log lines.  | **`[CGI]`**<br/>**`Merge_Log_Lines`**<br/><br/>**`CGI_MERGE_LOG_LINES`**    | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Specify additional mobile device names. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsMobileDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsMobileDevice).    | **`[CGI]`**<br/>**`MobileDevices`**<br/><br/>**`NCBI_CONFIG__CGI__MobileDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of additional device names.            | (none)   |
| Add to the user agent list of names that aren't bots. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsBot()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsBot).                  | **`[CGI]`**<br/>**`NotBots`**<br/><br/>**`NCBI_CONFIG__CGI__NotBots`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of names that aren't bots.             | (none)   |
| Add to the user agent list of names that aren't mobile devices. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsMobileDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsMobileDevice).                  | **`[CGI]`**<br/>**`NotMobileDevices`**<br/><br/>**`NCBI_CONFIG__CGI__NotMobileDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of names that aren't mobile devices.   | (none)   |
| Add to the user agent list of names that aren't phone devices. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsPhoneDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsPhoneDevice). | **`[CGI]`**<br/>**`NotPhoneDevices`**<br/><br/>**`NCBI_CONFIG__CGI__NotPhoneDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of names that aren't phone devices.    | (none)   |
| Add to the user agent list of names that aren't tablet devices. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsTabletDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsTabletDevice).                  | **`[CGI]`**<br/>**`NotTabletDevices`**<br/><br/>**`NCBI_CONFIG__CGI__NotTabletDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of names that aren't tablet devices.   | (none)   |
| Control error handling of incoming cookies (doesn't affect outgoing cookies set by application).             | **`[CGI]`**<br/>**`On_Bad_Cookie`**<br/><br/>**`CGI_ON_BAD_COOKIE`**        | CI  [<sup>e</sup>](#ch_libconfig.TF.27): Throw, SkipAndError, Skip, StoreAndError, Store   | Store    |
| Specify additional phone device names. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsPhoneDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsPhoneDevice).      | **`[CGI]`**<br/>**`PhoneDevices`**<br/><br/>**`NCBI_CONFIG__CGI__PhoneDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of additional device names.            | (none)   |
| Specifies whether to print the referer during [LogRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LogRequest).      | **`[CGI]`**<br/>**`Print_Http_Referer`**<br/><br/>**`CGI_PRINT_HTTP_REFERER`**                 | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Specifies whether to print the URL during [LogRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LogRequest).          | **`[CGI]`**<br/>**`Print_Self_Url`**<br/><br/>**`CGI_PRINT_SELF_URL`**      | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Specifies whether to print the user agent during [LogRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LogRequest).   | **`[CGI]`**<br/>**`Print_User_Agent`**<br/><br/>**`CGI_PRINT_USER_AGENT`**  | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Set the size of CGI request buffer that is printed when the request cannot be parsed.     | **`[CGI]`**<br/>**`RequestErrBufSize`**<br/><br/>**`NCBI_CONFIG__CGI__REQUESTERRBUFSIZE`**  [<sup>f</sup>](#ch_libconfig.TF.28)     | buffer size in bytes             | 256      |
| Specify the registry section name for the result cache.                | **`[CGI]`**<br/>**`ResultCacheSectionName`**<br/><br/>**`NCBI_CONFIG__CGI__RESULTCACHESECTIONNAME`**  [<sup>f</sup>](#ch_libconfig.TF.28) | valid section name               | result\_cache  |
| Enable statistics logging.       | **`[CGI]`**<br/>**`StatLog`**<br/><br/>**`NCBI_CONFIG__CGI__STATLOG`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Boolean  [<sup>d</sup>](#ch_libconfig.TF.26)         | false    |
| Specify additional tablet device names. This parameter affect only [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent)::[IsTabletDevice()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsTabletDevice).    | **`[CGI]`**<br/>**`TabletDevices`**<br/><br/>**`NCBI_CONFIG__CGI__TabletDevices`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Delimited list  [<sup>b</sup>](#ch_libconfig.TF.24) of additional device names.            | (none)   |
| Controls whether the output stream will throw for bad states.          | **`[CGI]`**<br/>**`ThrowOnBadOutput`**<br/><br/>**`NCBI_CONFIG__CGI__THROWONBADOUTPUT`**  [<sup>f</sup>](#ch_libconfig.TF.28) | Boolean  [<sup>c</sup>](#ch_libconfig.TF.25)         | true     |
| Log start time, end time, and elapsed time.         | **`[CGI]`**<br/>**`TimeStamp`**<br/><br/>**`NCBI_CONFIG__CGI__TIMESTAMP`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | Boolean  [<sup>d</sup>](#ch_libconfig.TF.26)         | false    |
| Disable statistics logging if the CGI request took less than the specified number of seconds.                | **`[CGI]`**<br/>**`TimeStatCutOff`**<br/><br/>**`NCBI_CONFIG__CGI__TIMESTATCUTOFF`**  [<sup>f</sup>](#ch_libconfig.TF.28)     | non-negative integer (zero enables logging)         | 0  |
| Specify the domain for the tracking cookie.         | **`[CGI]`**<br/>**`TrackingCookieDomain`**<br/><br/>**`NCBI_CONFIG__CGI__TRACKINGCOOKIEDOMAIN`**  [<sup>f</sup>](#ch_libconfig.TF.28)     | valid domain  | .nih.gov |
| Specify the tracking cookie name.                   | **`[CGI]`**<br/>**`TrackingCookieName`**<br/><br/>**`NCBI_CONFIG__CGI__TRACKINGCOOKIENAME`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | valid cookie name                | ncbi\_sid      |
| Specify the path for the tracking cookie.           | **`[CGI]`**<br/>**`TrackingCookiePath`**<br/><br/>**`NCBI_CONFIG__CGI__TRACKINGCOOKIEPATH`**  [<sup>f</sup>](#ch_libconfig.TF.28)   | valid path    | /  |
| Defines the **name** of the NCBI tracking cookie (session ID cookie).  | **`[CGI]`**<br/>**`TrackingTagName`**<br/><br/>**`CGI_TrackingTagName`**    | Any valid cookie name.           | "NCBI-SID"     |
| Specify a set of fields (e.g. HTTP headers when the protocol is HTTP) to be taken from incoming requests and passed to outgoing requests.<br/>For more details, see the [NCBI Context Fields](https://confluence.ncbi.nlm.nih.gov/display/CD/NCBI+Context+Fields) Confluence page.  | **`[Context]`**<br/>**`Fields`**<br/><br/>**`NCBI_CONTEXT_FIELDS`** | A space-delimited, case-insensitive list of glob patterns. | "" |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.23"></a>

<sup>a</sup> List may be delimited by semicolon, space, tab, or comma.

<a name="ch_libconfig.TF.24"></a>

<sup>b</sup> List may be delimited by newlines or any of the special characters: semicolon, space, tab, vertical bar, or tilde. If the list contains one or more newlines then only newlines will be used as delimiters and the values in the list will be the content of the lines including any special characters. If the list does not contain any newline characters then all special characters will act as independent delimiters. Therefore, if any value in the list needs to include any of the special characters, then newlines must be used as the delimiter.

<a name="ch_libconfig.TF.25"></a>

<sup>c</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.26"></a>

<sup>d</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.27"></a>

<sup>e</sup> CI = case-insensitive

<a name="ch_libconfig.TF.28"></a>

<sup>f</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF_8_G"></a>

<sup>g</sup> some information from [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) by Mozilla Contributors, adapted under [CC-BY-SA](https://creativecommons.org/licenses/by-sa/2.5/)

<a name="ch_libconfig.FCGI"></a>

#### FCGI

[These parameters](#ch_libconfig.T9) tune the behavior of FCGI applications.

<a name="ch_libconfig.T9"></a>

Table 9. FCGI-related configuration parameters

| Purpose          | [Registry section]<br/>Registry name<br/><br/>Environment variable            | Valid values           | Default |
|------------------|-------------------------------------------------------------------------------|------------------------|---------|
| A true value enables logging of current iteration, max iterations, and process ID during the FastCGI run.       | **`[FastCGI]`**<br/>**`Debug`**<br/><br/>**`NCBI_CONFIG__FASTCGI__DEBUG`**  [<sup>b</sup>](#ch_libconfig.TF.30)     | Boolean  [<sup>a</sup>](#ch_libconfig.TF.29)                  | false   |
| A true value enables termination of a FastCGI application by the presence of the request entry "exitfastcgi".   | **`[FastCGI]`**<br/>**`HonorExitRequest`**<br/><br/>**`NCBI_CONFIG__FASTCGI__HONOREXITREQUEST`**  [<sup>b</sup>](#ch_libconfig.TF.30) | Boolean  [<sup>a</sup>](#ch_libconfig.TF.29)                  | false   |
| Specify the number of requests that the FCGI application will process before exiting.        | **`[FastCGI]`**<br/>**`Iterations`**<br/><br/>**`NCBI_CONFIG__FASTCGI__ITERATIONS`**  [<sup>b</sup>](#ch_libconfig.TF.30) | positive integer       | 10      |
| Make the FastCGI application run as a stand-alone server on a local port. The value is a Unix domain socket or a MS Windows named pipe, or a colon followed by a port number | **`[FastCGI]`**<br/>**`StandaloneServer`**<br/><br/>**`FCGI_STANDALONE_SERVER`**                 | valid local port or named socket          | (none)  |
| Make the FastCGI application stop if an error is encountered.             | **`[FastCGI]`**<br/>**`StopIfFailed`**<br/><br/>**`NCBI_CONFIG__FASTCGI__STOPIFFAILED`**  [<sup>b</sup>](#ch_libconfig.TF.30)   | Boolean  [<sup>a</sup>](#ch_libconfig.TF.29)                  | false   |
| Make the FastCGI application stop if the memory limit is exceeded.        | **`[FastCGI]`**<br/>**`TotalMemoryLimit`**<br/><br/>**`NCBI_CONFIG__FASTCGI__TOTALMEMORYLIMIT`** | An optionally suffixed non-negative real number (e.g. "123456789", "100MiB", or "1.25 G").<br/><br/>No suffix (or a "B" suffix) means the given value is in bytes.<br/><br/>If there is a suffix, there can be spaces between the number and the suffix. The default units are decimal (i.e. powers of 1000) - e.g. "MB". The final "B" is optional for decimal units (e.g. "M"). You can use "i" to indicate binary units (i.e. powers of 1024) – e.g. "MiB".<br/><br/>Valid suffix characters are: "K", "M", "G", "T", "P", and "E".<br/><br/>Suffixes are not case-sensitive. | 0 (unlimited) |
| Make the FastCGI application exit if the named file changes.              | **`[FastCGI]`**<br/>**`WatchFile.Name`**<br/><br/>**`NCBI_CONFIG__FASTCGI__WATCHFILE_DOT_NAME`**  [<sup>b</sup>](#ch_libconfig.TF.30) | valid file name        | (none)  |
| The number of bytes to read from the watch file to see if it has changed. | **`[FastCGI]`**<br/>**`WatchFile.Limit`**<br/><br/>**`NCBI_CONFIG__FASTCGI__WATCHFILE_DOT_LIMIT`**  [<sup>b</sup>](#ch_libconfig.TF.30)     | positive integer (non-positives trigger default)             | 1024    |
| The period in seconds between checking the watch file for changes.        | **`[FastCGI]`**<br/>**`WatchFile.Timeout`**<br/><br/>**`NCBI_CONFIG__FASTCGI__WATCHFILE_DOT_TIMEOUT`**  [<sup>b</sup>](#ch_libconfig.TF.30) | positive integer (non-positives trigger default, which is to disable the watch file checking)      | 0 |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.29"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.30"></a>

<sup>b</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.CGI_Load_balancing_configur"></a>

#### CGI Load Balancing

[These parameters](#ch_libconfig.T10) tune the CGI load balancer.

<a name="ch_libconfig.T10"></a>

Table 10. CGI load balancing configuration parameters

| Purpose                   | [Registry section]<br/>Registry name<br/><br/>Environment variable       | Valid values  | Default     |
|---------------------------|--------------------------------------------------------------------------|---------------|-------------|
| Specify the internet domain.    | **`[CGI-LB]`**<br/>**`Domain`**<br/><br/>**`NCBI_CONFIG__CGI-LB__DOMAIN`**  [<sup>b</sup>](#ch_libconfig.TF.32)     | a valid domain      | .ncbi.nlm.nih.gov |
| Specify the host IP address.    | **`[CGI-LB]`**<br/>**`Host`**<br/><br/>**`NCBI_CONFIG__CGI-LB__HOST`**  [<sup>b</sup>](#ch_libconfig.TF.32)   | a valid host IP     | (none)      |
| Specify the cookie expiration period in seconds.  | **`[CGI-LB]`**<br/>**`LifeSpan`**<br/><br/>**`NCBI_CONFIG__CGI-LB__LIFESPAN`**  [<sup>b</sup>](#ch_libconfig.TF.32) | integer | 0     |
| Specify the name of the load balancing cookie in the HTTP response. | **`[CGI-LB]`**<br/>**`Name`**<br/><br/>**`NCBI_CONFIG__CGI-LB__NAME`**  [<sup>b</sup>](#ch_libconfig.TF.32)   | a valid cookie name | (none)      |
| Specify the cookie path.  | **`[CGI-LB]`**<br/>**`Path`**<br/><br/>**`NCBI_CONFIG__CGI-LB__PATH`**  [<sup>b</sup>](#ch_libconfig.TF.32)   | a valid path  | (none)      |
| Specify the cookie security mode.     | **`[CGI-LB]`**<br/>**`Secure`**<br/><br/>**`NCBI_CONFIG__CGI-LB__SECURE`**  [<sup>b</sup>](#ch_libconfig.TF.32)     | Boolean  [<sup>a</sup>](#ch_libconfig.TF.31) | false |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.31"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.32"></a>

<sup>b</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.Serial"></a>

### Serial

[These parameters](#ch_libconfig.T.Serial_library_configurat) tune the behavior of the Serial library.

<a name="ch_libconfig.T.Serial_library_configurat"></a>

Table 11. Serial library configuration parameters

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable              | Valid values        | Default  |
|-------------|---------------------------------------------------------------------------------|---------------------|----------|
| Skip unknown data members in the input stream, or throw an exception.         | [N/A]<br/>N/A<br/><br/>**`SERIAL_SKIP_UNKNOWN_MEMBERS`**     | CI  [<sup>a</sup>](#ch_libconfig.TF.33): yes, no, never, always               | no (throw)     |
| If true, causes [CObjectOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObjectOStream)::[WriteDouble()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=WriteDouble) to use fast conversion.   | **`[SERIAL]`**<br/>**`FastWriteDouble`**<br/><br/>**`NCBI_CONFIG__SERIAL__FastWriteDouble`**  [<sup>b</sup>](#ch_libconfig.TF.34) | Boolean  [<sup>c</sup>](#ch_libconfig.TF.35)               | true     |
| While reading binary ASN.1 data allow VisibleString tag where UTF-8 string tag is expected by specification.      | **`[SERIAL]`**<br/>**`READ_ANY_UTF8STRING_TAG`**<br/><br/>**`SERIAL_READ_ANY_UTF8STRING_TAG`**     | Boolean  [<sup>c</sup>](#ch_libconfig.TF.35)               | true     |
| While reading binary ASN.1 data allow UTF-8 string tag where VisibleString tag is expected by specification.      | **`[SERIAL]`**<br/>**`READ_ANY_VISIBLESTRING_TAG`**<br/><br/>**`SERIAL_READ_ANY_VISIBLESTRING_TAG`**     | 0 (disallow, throws an exception);<br/>1 (allow, but warn once);<br/>2 (allow without warning)       | 1  |
| If true, use memory-mapped file access, which associates a file’s content with a portion of the virtual address space of a process. This can result in a modest performance increase (probably &lt; 15%). | **`[SERIAL]`**<br/>**`READ_MMAPBYTESOURCE`**<br/><br/>**`SERIAL_READ_MMAPBYTESOURCE`** | Boolean  [<sup>c</sup>](#ch_libconfig.TF.35) | false |
| Specify how to handle unknown variants when reading Object streams.           | **`[SERIAL]`**<br/>**`SKIP_UNKNOWN_MEMBERS`**<br/><br/>**`NCBI_CONFIG__SERIAL__SKIP_UNKNOWN_MEMBERS`**  [<sup>b</sup>](#ch_libconfig.TF.34)   | CI  [<sup>a</sup>](#ch_libconfig.TF.33):<br/>no (throw an exception),<br/>never (even if set to skip later),<br/>yes (skip),<br/>always (even if set to not skip later) | no |
| Specify how to handle unknown variants when reading Object streams.           | **`[SERIAL]`**<br/>**`SKIP_UNKNOWN_VARIANTS`**<br/><br/>**`NCBI_CONFIG__SERIAL__SKIP_UNKNOWN_VARIANTS`**  [<sup>b</sup>](#ch_libconfig.TF.34) | CI  [<sup>a</sup>](#ch_libconfig.TF.33):<br/>no (throw an exception),<br/>never (even if set to skip later),<br/>yes (skip),<br/>always (even if set to not skip later) | no |
| Throw an exception on an attempt to access an uninitialized data member.      | **`[SERIAL]`**<br/>**`VERIFY_DATA_GET`**<br/><br/>**`SERIAL_VERIFY_DATA_GET`**  | CI  [<sup>a</sup>](#ch_libconfig.TF.33): yes, no, never, always, defvalue, defvalue\_always      | yes      |
| Throw an exception if a mandatory data member is missing in the input stream. | **`[SERIAL]`**<br/>**`VERIFY_DATA_READ`**<br/><br/>**`SERIAL_VERIFY_DATA_READ`**                   | CI  [<sup>a</sup>](#ch_libconfig.TF.33): yes, no, never, always, defvalue, defvalue\_always      | yes      |
| Throw an exception on an attempt to write an uninitialized data member.       | **`[SERIAL]`**<br/>**`VERIFY_DATA_WRITE`**<br/><br/>**`SERIAL_VERIFY_DATA_WRITE`**                 | CI  [<sup>a</sup>](#ch_libconfig.TF.33): yes, no, never, always, defvalue, defvalue\_always      | yes      |
| While writing binary ASN.1 data issue UTF8 string tag as determined by specification, otherwise issue plain string tag. | **`[SERIAL]`**<br/>**`WRITE_UTF8STRING_TAG`**<br/><br/>**`SERIAL_WRITE_UTF8STRING_TAG`**           | Boolean  [<sup>c</sup>](#ch_libconfig.TF.35)               | false    |
| Specifies what to do if an invalid character is read.      | **`[SERIAL]`**<br/>**`WRONG_CHARS_READ`**<br/><br/>**`NCBI_CONFIG__SERIAL__WRONG_CHARS_READ`**  [<sup>b</sup>](#ch_libconfig.TF.34)     | "ALLOW",<br/>"REPLACE",<br/>"REPLACE\_AND\_WARN",<br/>"THROW",<br/>"ABORT"             | "REPLACE\_AND\_WARN" |
| Specifies what to do if an invalid character is written.   | **`[SERIAL]`**<br/>**`WRONG_CHARS_WRITE`**<br/><br/>**`NCBI_CONFIG__SERIAL__WRONG_CHARS_WRITE`**  [<sup>b</sup>](#ch_libconfig.TF.34)   | "ALLOW",<br/>"REPLACE",<br/>"REPLACE\_AND\_WARN",<br/>"THROW",<br/>"ABORT"             | "REPLACE\_AND\_WARN" |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.33"></a>

<sup>a</sup> CI = case-insensitive

<a name="ch_libconfig.TF.34"></a>

<sup>b</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.35"></a>

<sup>c</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.Objects_Object_Manager_Obje"></a>

### Objects, Object Manager, Object Tools

[These parameters](#ch_libconfig.T.Objectsrelated_configurat) tune the behavior of the Objects-related libraries, including the Object Manager and loader and reader libraries.

<a name="ch_libconfig.T.Objectsrelated_configurat"></a>

Table 13. Objects-related configuration parameters

| Purpose         | [Registry section]<br/>Registry name<br/><br/>Environment variable      | Valid values  | Default                 |
|-----------------|-------------------------------------------------------------------------|---------------|-------------------------|
| Specify whether the blob stream processor should try to use string packing.                 | [N/A]<br/>N/A<br/><br/>**`NCBI_SERIAL_PACK_STRINGS`**                   | Boolean  [<sup>d</sup>](#ch_libconfig.TF.40)              | true |
| The Object Manager will attach WGS master descriptors to Bioseq data by default. Setting this parameter to false will disable this behavior.         | **`[GENBANK]`**<br/>**`ADD_WGS_MASTER`**<br/><br/>**`GENBANK_ADD_WGS_MASTER`**             | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| A non-zero value turns on debugging messages about GenBank loader's interaction with cache. | **`[GENBANK]`**<br/>**`CACHE_DEBUG`**<br/><br/>**`GENBANK_CACHE_DEBUG`**                   | \>=0, currently only zero and non-zero are distinguished | 0    |
| Specify whether an attempt should be made to recompress the cache.       | **`[GENBANK]`**<br/>**`CACHE_RECOMPRESS`**<br/><br/>**`GENBANK_CACHE_RECOMPRESS`**         | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| A non-zero value turns on debugging messages about opening/closing connections to ID1/ID2 services.            | **`[GENBANK]`**<br/>**`CONN_DEBUG`**<br/><br/>**`GENBANK_CONN_DEBUG`**  | \>=0, currently only zero and non-zero are distinguished | 0    |
| Disable attaching WGS master descriptors when retrieving ASN.1 blobs using the CPubseqReader class. | **`[GENBANK/PUBSEQOS]`**<br/>**`EXCLUDE_WGS_MASTER`**<br/><br/>**`NCBI_CONFIG__GENBANK_PUBSEQOS__EXCLUDE_WGS_MASTER`** | Boolean  [<sup>b</sup>](#ch_libconfig.TF.38) | false |
| Disable attaching WGS master descriptors when retrieving ASN.1 blobs using the CPubseq2Reader class. | **`[GENBANK/PUBSEQOS2]`**<br/>**`EXCLUDE_WGS_MASTER`**<br/><br/>**`NCBI_CONFIG__GENBANK_PUBSEQOS2__EXCLUDE_WGS_MASTER`** | Boolean  [<sup>b</sup>](#ch_libconfig.TF.38) | false |
| Set the severity level for ID1 debug tracing.         | **`[GENBANK]`**<br/>**`ID1_DEBUG`**<br/><br/>**`GENBANK_ID1_DEBUG`**    | int:<br/>0 = none,<br/>1 = error,<br/>2 = open,<br/>4 = conn,<br/>5 = asn,<br/>8 = asn data      | 0    |
| Specify the ID1 reader service name. ***Note:*** The services can be redirected using generic [Service Redirection](ch_conn.html#ch_conn.Service_Redirection) technique. Has precedence over **`[NCBI].SERVICE_NAME_ID1`** | **`[GENBANK]`**<br/>**`ID1_SERVICE_NAME`**<br/><br/>**`GENBANK_ID1_SERVICE_NAME`** | a valid reader service name | ID1<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_SERVICE)) |
| Specify the ID2 reader service name. ***Note:*** The services can be redirected using generic [Service Redirection](ch_conn.html#ch_conn.Service_Redirection) technique. Has precedence over **`[GENBANK].ID2_SERVICE_NAME`** | **`[GENBANK]`**<br/>**`ID2_CGI_NAME`**<br/><br/>**`GENBANK_ID2_CGI_NAME`** | a valid reader service name | ID2<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_SERVICE)) |
| Set the severity level for ID2 debug tracing.         | **`[GENBANK]`**<br/>**`ID2_DEBUG`**<br/><br/>**`GENBANK_ID2_DEBUG`**    | int:<br/>0 = none,<br/>1 = error,<br/>2 = open,<br/>4 = conn,<br/>5 = asn,<br/>8 = blob,<br/>9 = blob data | debug: none<br/>release: error<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_DEBUG_LEVEL)) |
| Number of chunks allowed in a single request.         | **`[GENBANK]`**<br/>**`ID2_MAX_CHUNKS_REQUEST_SIZE`**<br/><br/>**`GENBANK_ID2_MAX_CHUNKS_REQUEST_SIZE`**      | int:<br/>0 = unlimited request size;<br/>1 = do not use packets or get-chunks requests              | 100  |
| Maximum number of requests packed in a single ID2 packet.                | **`[GENBANK]`**<br/>**`ID2_MAX_IDS_REQUEST_SIZE`**<br/><br/>**`GENBANK_ID2_MAX_IDS_REQUEST_SIZE`**            | \>=0               | 100  |
| Specify the ID2 reader service name. ***Note:*** The services can be redirected using generic [Service Redirection](ch_conn.html#ch_conn.Service_Redirection) technique. Has precedence over **`[NCBI].SERVICE_NAME_ID2`** | **`[GENBANK]`**<br/>**`ID2_SERVICE_NAME`**<br/><br/>**`GENBANK_ID2_SERVICE_NAME`** | a valid reader service name | ID2<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_SERVICE)) |
| Prioritized list of drivers to try for the reader or writer.<br />Less precedence than **`[GENBANK].READER_NAME`** or **`[GENBANK].WRITER_NAME`**. | **`[GENBANK]`**<br/>**`LOADER_METHOD`**<br/><br/>**`GENBANK_LOADER_METHOD`** | list items are semicolon-delimited;<br/>each item is a colon-delimited list of drivers.<br/>valid drivers:<br/>id1, id2, cache, pubseqos | `#if defined(HAVE_PUBSEQ_OS)`<br />"ID2:PUBSEQOS:ID1"<br />`else`<br />"ID2:ID1"<br />`#endif`<br />(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_DRV_ORDER)) |
| The maximum number of connections the reader can establish to the data source. This is run-time limited to 1 for single threaded clients and for all clients using the cache or gi reader, and to 5 for multi-threaded clients using the id1, id2, pubseqos, and pubseqos2 readers.      | **`[GENBANK]`**<br/>**`MAX_NUMBER_OF_CONNECTIONS`**                | int                | 3 for id1 and id2; 2 for pubseqos and pubseqos2               |
| See **`MAX_NUMBER_OF_CONNECTIONS`**                   | **`[GENBANK]`**<br/>**`NO_CONN`**               |                   |     |
| See **`OPEN_TIMEOUT_INCREMENT`**   | **`[GENBANK]`**<br/>**`OPEN_INCREMENT`**        |                   |     |
| See **`OPEN_TIMEOUT_MAX`**         | **`[GENBANK]`**<br/>**`OPEN_MAX`**              |                   |     |
| See **`OPEN_TIMEOUT_MULTIPLIER`**  | **`[GENBANK]`**<br/>**`OPEN_MULTIPLIER`**       |                   |     |
| The **`OPEN_TIMEOUT*`** parameters describe the timeout for opening a GenBank connection. The timeout allows the server a reasonable time to respond while providing a means to quickly abandon unresponsive servers.            | **`[GENBANK]`**<br/>**`OPEN_TIMEOUT`**<br/><br/>**`NCBI_CONFIG__GENBANK__OPEN_TIMEOUT`**  [<sup>c</sup>](#ch_libconfig.TF.39)     | any floating point value \>= 0.0      | 5 seconds               |
| **`OPEN_TIMEOUT_MULTIPLIER`** and **`OPEN_TIMEOUT_INCREMENT`** specify the way the open timeout is increased if no response is received (next\_open\_timeout = prev\_open\_timeout \* multiplier + increment).                   | **`[GENBANK]`**<br/>**`OPEN_TIMEOUT_INCREMENT`**<br/><br/>**`NCBI_CONFIG__GENBANK__OPEN_TIMEOUT_INCREMENT`**  [<sup>c</sup>](#ch_libconfig.TF.39)    | any floating point value \>= 0.0      | 0 seconds               |
| The limit of increasing the open timeout using **`OPEN_TIMEOUT_MULTIPLIER`** and **`OPEN_TIMEOUT_INCREMENT`**. | **`[GENBANK]`**<br/>**`OPEN_TIMEOUT_MAX`**<br/><br/>**`NCBI_CONFIG__GENBANK__OPEN_TIMEOUT_MAX`**  [<sup>c</sup>](#ch_libconfig.TF.39)                | floating point \>= 0.0                | 30 seconds              |
| See **`OPEN_TIMEOUT_INCREMENT`**   | **`[GENBANK]`**<br/>**`OPEN_TIMEOUT_MULTIPLIER`**<br/><br/>**`NCBI_CONFIG__GENBANK__OPEN_TIMEOUT_MULTIPLIER`**  [<sup>c</sup>](#ch_libconfig.TF.39)  | floating point \>= 0.0                | 1.5  |
| Whether to open first connection immediately or not.  | **`[GENBANK]`**<br/>**`preopen`**<br/><br/>**`NCBI_CONFIG__GENBANK__PREOPEN`**  [<sup>c</sup>](#ch_libconfig.TF.39)               | Boolean  [<sup>b</sup>](#ch_libconfig.TF.38)              | true |
| Turns on different levels of debug messages in PubSeqOS reader. A value \>=2 means debug opening connections while \>=5 means debug results of Seq-id resolution requests. ***Note:*** only applies to debug builds.             | **`[GENBANK]`**<br/>**`PUBSEQOS_DEBUG`**<br/><br/>**`GENBANK_PUBSEQOS_DEBUG`**             | int                | 0    |
| Prioritized list of drivers to try for the reader. Has precedence over **`[GENBANK].LOADER_METHOD`**. | **`[GENBANK]`**<br/>**`READER_NAME`**<br/><br/>**`GENBANK_READER_NAME`** | See **`[GENBANK].LOADER_METHOD`**. | See **`[GENBANK].LOADER_METHOD`**. |
| Specify the level of reader statistics to collect.    | **`[GENBANK]`**<br/>**`READER_STATS`**<br/><br/>**`GENBANK_READER_STATS`**                 | int:<br/>0 = none,<br/>1 = verbose         | 0    |
| Specify whether the reader manager should automatically register ID1, ID2, and cache.       | **`[GENBANK]`**<br/>**`REGISTER_READERS`**<br/><br/>**`GENBANK_REGISTER_READERS`**         | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| On some platforms, equal strings can share their character data, reducing the required memory. Set this parameter to true to have the GenBank loader try to use this feature if it is available.              | **`[GENBANK]`**<br/>**`SNP_PACK_STRINGS`**<br/><br/>**`GENBANK_SNP_PACK_STRINGS`**         | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| In ID1/PubSeqOS readers present SNP data as ID2-split entries to reduce memory usage.       | **`[GENBANK]`**<br/>**`SNP_SPLIT`**<br/><br/>**`GENBANK_SNP_SPLIT`**    | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Storing all the SNPs as plain ASN.1 objects would require a huge amount of memory. The SNP table is a compact way of storing SNPs to reduce memory consumption. Set this parameter to true to have the object manager try to use the SNP table.     | **`[GENBANK]`**<br/>**`SNP_TABLE`**<br/><br/>**`GENBANK_SNP_TABLE`**    | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Set to a positive integer to enable dumping (to stderr in text ASN.1 form) all the SNPs that don't fit into the SNP table. ***Note:*** this is only available in debug mode.               | **`[GENBANK]`**<br/>**`SNP_TABLE_DUMP`**<br/><br/>**`GENBANK_SNP_TABLE_DUMP`**             | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | false                   |
| Set this parameter to true to dump (to stdout) some statistics on the process of storing SNPs into the SNP table. This option may help determine why not all the SNPs could fit in the table.                 | **`[GENBANK]`**<br/>**`SNP_TABLE_STAT`**<br/><br/>**`GENBANK_SNP_TABLE_STAT`**             | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | false                   |
| Specify whether to use a memory pool.                 | **`[GENBANK]`**<br/>**`USE_MEMORY_POOL`**<br/><br/>**`GENBANK_USE_MEMORY_POOL`**           | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| The **`WAIT_TIME*`** parameters describe the wait time before opening new GenBank connections in case of communication errors. The wait time is necessary to allow network and/or GenBank servers to recover. **`WAIT_TIME`** is the initial wait after the first error. See also: GenBank reader configuration. | **`[GENBANK]`**<br/>**`WAIT_TIME`**<br/><br/>**`NCBI_CONFIG__GENBANK__WAIT_TIME`**  [<sup>c</sup>](#ch_libconfig.TF.39)           | floating point \>= 0.0                | 1 second                |
| Specifies for how many sequential communication errors the response should be to use wait time, before trying to open a new connection instead.      | **`[GENBANK]`**<br/>**`WAIT_TIME_ERRORS`**<br/><br/>**`NCBI_CONFIG__GENBANK__WAIT_TIME_ERRORS`**  [<sup>c</sup>](#ch_libconfig.TF.39)                | int                | 2 errors                |
| **`WAIT_TIME_MULTIPLIER`** and **`WAIT_TIME_INCREMENT`** specify the way wait time is increased if errors continue to happen (next\_wait\_time = prev\_wait\_time \* multiplier + increment).                 | **`[GENBANK]`**<br/>**`WAIT_TIME_INCREMENT`**<br/><br/>**`NCBI_CONFIG__GENBANK__WAIT_TIME_INCREMENT`**  [<sup>c</sup>](#ch_libconfig.TF.39)          | any floating point value \>= 0.0      | 1 second                |
| The limit of increasing wait time using **`WAIT_TIME_MULTIPLIER`** and **`WAIT_TIME_INCREMENT`**.              | **`[GENBANK]`**<br/>**`WAIT_TIME_MAX`**<br/><br/>**`NCBI_CONFIG__GENBANK__WAIT_TIME_MAX`**  [<sup>c</sup>](#ch_libconfig.TF.39)   | floating point \>= 0.0                | 30 seconds              |
| See **`WAIT_TIME_INCREMENT`**      | **`[GENBANK]`**<br/>**`WAIT_TIME_MULTIPLIER`**<br/><br/>**`NCBI_CONFIG__GENBANK__WAIT_TIME_MULTIPLIER`**  [<sup>c</sup>](#ch_libconfig.TF.39)        | any floating point value \>= 0.0      | 1.5  |
| Prioritized list of drivers to try for the writer. Has precedence over **`[GENBANK].LOADER_METHOD`**. | **`[GENBANK]`**<br/>**`WRITER_NAME`**<br/><br/>**`GENBANK_WRITER_NAME`** | See **`[GENBANK].LOADER_METHOD`**. | See **`[GENBANK].LOADER_METHOD`**. |
| Database lock control. By default LDS2 databases are read-only, so they are cached in memory. If an explicit mode is set in the code, this config parameter is ignored. ***Note:*** To set locks the database must be writable. | **`[LDS2]`**<br/>**`DataLoader_Lock`**<br/><br/>**`LDS2_DATALOADER_LOCK`** | "lock", "nolock", or "cache" | "cache" |
| If true, replace ranges that cannot be mapped with a NULL location instead of using the neighbor's fuzz. | **`[Mapper]`**<br/>**`NonMapping_As_Null`**<br/><br/>**`MAPPER_NONMAPPING_AS_NULL`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37) | false |
| Specify the ID1 reader service name. ***Note:*** The services can be redirected using generic [Service Redirection](ch_conn.html#ch_conn.Service_Redirection) technique. Less precedence than **`[GENBANK].ID1_SERVICE_NAME`**. | **`[NCBI]`**<br/>**`SERVICE_NAME_ID1`**<br/><br/>**`GENBANK_SERVICE_NAME_ID1`** | a valid reader service name | ID1<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_SERVICE)) |
| Specify the ID2 reader service name. ***Note:*** The services can be redirected using generic [Service Redirection](ch_conn.html#ch_conn.Service_Redirection) technique. Less precedence than **`[GENBANK].ID2_SERVICE_NAME`**. | **`[NCBI]`**<br/>**`SERVICE_NAME_ID2`**<br/><br/>**`GENBANK_SERVICE_NAME_ID2`** | a valid reader service name | ID2<br/>(see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DEFAULT_SERVICE)) |
| If non-zero, reserve Dense-seg vectors using predefined pre-read hook.   | **`[OBJECTS]`**<br/>**`DENSE_SEG_RESERVE`**<br/><br/>**`OBJECTS_DENSE_SEG_RESERVE`**       | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Specify whether Seq-id general trees are packed.      | **`[OBJECTS]`**<br/>**`PACK_GENERAL`**<br/><br/>**`OBJECTS_PACK_GENERAL`**                 | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Specify whether Seq-id text-seq trees are packed.     | **`[OBJECTS]`**<br/>**`PACK_TEXTID`**<br/><br/>**`OBJECTS_PACK_TEXTID`**                   | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Specify whether empty Seq-descr's will be allowed (or throw if not).     | **`[OBJECTS]`**<br/>**`SEQ_DESCR_ALLOW_EMPTY`**<br/><br/>**`OBJECTS_SEQ_DESCR_ALLOW_EMPTY`**                  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | false                   |
| If non-zero, reserve Seq-graph vectors using predefined pre-read hook.   | **`[OBJECTS]`**<br/>**`SEQ_GRAPH_RESERVE`**<br/><br/>**`OBJECTS_SEQ_GRAPH_RESERVE`**       | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| If non-zero, reserve Seq-table vectors using predefined pre-read hook.   | **`[OBJECTS]`**<br/>**`SEQ_TABLE_RESERVE`**<br/><br/>**`OBJECTS_SEQ_TABLE_RESERVE`**       | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Sets the maximum number of master TSE blobs that will be cached.         | **`[OBJMGR]`**<br/>**`BLOB_CACHE`**<br/><br/>**`OBJMGR_BLOB_CACHE`**    | unsigned int       | 10   |
| Specify whether the scope can be auto-released.       | **`[OBJMGR]`**<br/>**`SCOPE_AUTORELEASE`**<br/><br/>**`OBJMGR_SCOPE_AUTORELEASE`**         | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| Specify the size of the scope auto-release.           | **`[OBJMGR]`**<br/>**`SCOPE_AUTORELEASE_SIZE`**<br/><br/>**`OBJMGR_SCOPE_AUTORELEASE_SIZE`**                  | unsigned int       | 10   |
| Specify whether the new FASTA implementation will be used.               | **`[READ_FASTA]`**<br/>**`USE_NEW_IMPLEMENTATION`**<br/><br/>**`NCBI_CONFIG__READ_FASTA__USE_NEW_IMPLEMENTATION`**  [<sup>c</sup>](#ch_libconfig.TF.39)                 | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37)              | true |
| If true, try to avoid GIs where possible, even if there's no accessions to prefer. | **`[SeqId]`**<br/>**`AvoidGi`**<br/><br/>**`SEQ_ID_AVOID_GI`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37) | false |
| If true, give GIs worse (higher) score to prefer accessions in CSeq_id ranking methods. | **`[SeqId]`**<br/>**`PreferAccessionOverGi`**<br/><br/>**`SEQ_ID_PREFER_ACCESSION_OVER_GI`** | Boolean  [<sup>a</sup>](#ch_libconfig.TF.37) | false |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.37"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.38"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.39"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.40"></a>

<sup>d</sup> case-insensitive: true values are { yes \| 1 }; anything else is false

<a name="ch_libconfig.psg_client_library"></a>

#### psg_client library

These parameters tune the behavior of the psg_client library.

<a name="ch_libconfig.T.psg_client_library_configurat"></a>

Table 13.1. psg_client library configuration parameters

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable              | Valid values        | Default  |
|-------------|---------------------------------------------------------------------------------|---------------------|----------|
| How often to query LBSM, in seconds. Less or equal to zero means no rebalance based on time | **`[PSG]`**<br/>**`rebalance_time`**<br/><br/>**`NCBI_CONFIG__PSG__REBALANCE_TIME`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | double | 10.0 |
| How often to query LBSM, in number of internal requests. Less or equal to zero means no rebalance based on requests | **`[PSG]`**<br/>**`rebalance_requests`**<br/><br/>**`NCBI_CONFIG__PSG__REBALANCE_REQUESTS`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 5000 |
| Number of internal I/O threads. Each thread has one TCP connection per server in service | **`[PSG]`**<br/>**`num_io`**<br/><br/>**`NCBI_CONFIG__PSG__NUM_IO`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 16 |
| Maximum number of concurrent streams per TCP connection | **`[PSG]`**<br/>**`max_concurrent_streams`**<br/><br/>**`NCBI_CONFIG__PSG__MAX_CONCURRENT_STREAMS`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 200 |
| Number of requests to submit consecutively per I/O thread | **`[PSG]`**<br/>**`requests_per_io`**<br/><br/>**`NCBI_CONFIG__PSG__REQUESTS_PER_IO`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 1 |
| Timeout on blob stream reading, in seconds | **`[PSG]`**<br/>**`reader_timeout`**<br/><br/>**`NCBI_CONFIG__PSG__READER_TIMEOUT`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 12 |
| Logging of debug printout of PSG protocol. Setting to 'some' will output everything except blob data. | **`[PSG]`**<br/>**`debug_printout`**<br/><br/>**`NCBI_CONFIG__PSG__DEBUG_PRINTOUT`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | none, some, all[<sup>b</sup>](#ch_libconfig.TF.13.1.2) | none |
| Instructing server as whether to use LMDB cache. Setting to 'default' will let servers use their own parameters on using LMDB cache | **`[PSG]`**<br/>**`use_cache`**<br/><br/>**`NCBI_CONFIG__PSG__USE_CACHE`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | no, yes, default[<sup>b</sup>](#ch_libconfig.TF.13.1.2) | default |
| Number of retries after any failure before giving up on a request | **`[PSG]`**<br/>**`request_retries`**<br/><br/>**`NCBI_CONFIG__PSG__REQUEST_RETRIES`**[<sup>a</sup>](#ch_libconfig.TF.13.1.1) | integer | 2 |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.13.1.1"></a>

<sup>a</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.13.1.2"></a>

<sup>b</sup> case-insensitive

<a name="ch_libconfig.cSRA"></a>

### cSRA

<a name="ch_libconfig.sraread_library"></a>

#### sraread library

***Note:*** This section applies only inside NCBI.

The following parameters tune the behavior of the `sraread` library:

<a name="ch_libconfig.T.nc_purposeregistry_sect_1"></a>

| Purpose        | [Registry section]<br/>Registry name<br/><br/>Environment variable | Valid values | Default |
|----------------|--------------------------------------------------------------------|--------------|---------|
| If true, will add CIGAR info to Seq-align's returned by cSRA iterators.      | **`[csra]`**<br/>**`cigar_in_align_ext`**<br/><br/>**`CSRA_CIGAR_IN_ALIGN_EXT`**     | Boolean      | true    |
| If true, will clip the read ranges returned by cSRA short read iterators according to quality. | **`[csra]`**<br/>**`clip_by_quality`**<br/><br/>**`CSRA_CLIP_BY_QUALITY`**     | Boolean      | true    |
| If true, will add mate info to Seq-align's returned by cSRA iterators. | **`[csra]`**<br/>**`explicit_mate_info`**<br/><br/>**`CSRA_EXPLICIT_MATE_INFO`**     | Boolean      | false   |
| If true, cSRA short read iterators will also include technical reads.  | **`[csra]`**<br/>**`include_technical_reads`**<br/><br/>**`CSRA_INCLUDE_TECHNICAL_READS`** | Boolean      | true    |

<div class="table-scroll"></div>

<a name="ch_libconfig.ncbi_xloader_csra_library"></a>

#### ncbi\_xloader\_csra library

***Note:*** This section applies only inside NCBI.

The following parameters tune the behavior of the `ncbi_xloader_csra` library:

<a name="ch_libconfig.T.nc_purposeregistry_sect_2"></a>

| Purpose             | [Registry section]<br/>Registry name<br/><br/>Environment variable     | Valid values | Default |
|---------------------|------------------------------------------------------------------------|--------------|---------|
| If \>= 9, log alignment chunks.<br/>If \>= 5, log major function calls.<br/>If \>= 2, log refseq stats.<br/>If \>= 1, log summary data. | **`[csra_loader]`**<br/>**`debug`**<br/><br/>**`CSRA_LOADER_DEBUG`**   | int    | 0 |
| The max number of SRR files to keep open.                 | **`[csra_loader]`**<br/>**`gc_size`**<br/><br/>**`CSRA_LOADER_GC_SIZE`**     | size\_t      | 10      |
| If \> 0, defines the max number of separate spot groups.  | **`[csra_loader]`**<br/>**`max_separate_spot_groups`**<br/><br/>**`CSRA_LOADER_MAX_SEPARATE_SPOT_GROUPS`** | int    | 0 |
| If \> 0, defines the minimum quality threshold for loading alignment and pileup chunks.         | **`[csra_loader]`**<br/>**`pileup_graphs`**<br/><br/>**`CSRA_LOADER_PILEUP_GRAPHS`**     | int    | 0 |
| If true, fetch quality graphs along with short reads.     | **`[csra_loader]`**<br/>**`quality_graphs`**<br/><br/>**`CSRA_LOADER_QUALITY_GRAPHS`**   | Boolean      | false   |

<div class="table-scroll"></div>

<a name="ch_libconfig.BAM"></a>

### BAM

#### bamread library


| Purpose             | [Registry section]<br/>Registry name     | Valid values | Default       |
|---------------------|------------------------------------------------------------------------|--------------|---------------|
|Specifies directory where BAM and BAM index files are looked for.   |**`[bam]`**<br/>**`dir_path`**               |Directory name     |               |
|Specifies BAM file name. If dir_path is also specified, then the file name is relative to the dir_path. | **`[bam]`**<br/>**`bam_name`**           | File Name |               |
|Specifies BAM index file name. If dir_path is also specified, then the file name is relative to the dir_path. If index_name is not set then index file name is derived form BAM file name by adding ".bai" extension. | **`[bam]`**<br/>**`index_name`**        |File Name |               |
|Enables CIGAR string in Seq-align Traceback ext object | **`[bam]`**<br/>**`cigar_in_align_ext`** |Boolean | true          |
|Enables skipping of CIGAR string with ambiguous match | **`[bam]`**<br/>**`omit_ambiguous_match_cigar`** |Boolean | false         |
|Enables 2nd generation of BAM parsing code | **`[bam]`**<br/>**`use_raw_index`** |Boolean | false         |


#### ncbi\_xloader\_bam library

| Purpose      | [Registry section]<br/>Registry name       | Valid values          | Default       |
|--------------|--------------------------------------------------------------------------|-----------------------|---------------|
|Enables debugging log messages (if not zero), the higher the number, the more messages are logged. |**`[bamloader]`**<br/>**`debug`**         |Number (0-3)   | 0             |
|Specified file name for CIdMapperConfig used to map BAM sequence ids into CSeq_id.   |**`[bamloader]`**<br/>**`mapper_file`**   |File Name    |               |
|Generate pileup graphs for alignments       |**`[bamloader]`**<br/>**`pileup_graphs`**                                          |Boolean     | true          |
| Do not create pileup graphs from the set (ACGT,match,insert) if the graph is completely zero. |**`[bamloader]`**<br/>**`skip_empty_pileup_graphs`** |Boolean     | true          |
| Use fast estimation for coverage graph if possible.     |**`[bamloader]`**<br/>**`estimated_coverage_graph`**                  |Boolean     | true          |
|Do not open BAM files at time of loader registration, open them only when alignments or graphs are requested. |**`[bamloader]`**<br/>**`preopen`**       |Boolean     | false         |



<a name="ch_libconfig.DBAPI"></a>

### DBAPI

[These parameters](#ch_libconfig.T.DBAPI_configuration_param) tune the behavior of the DBAPI library.

<a name="ch_libconfig.T.DBAPI_configuration_param"></a>

Table 14. DBAPI configuration parameters

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable       | Valid values          | Default       |
|-------------|--------------------------------------------------------------------------|-----------------------|---------------|
| If **`RESET_SYBASE`** is true, the Sybase client path will be set to the value in the **`SYBASE`** variable.            | [N/A]<br/>N/A<br/><br/>**`RESET_SYBASE`**                  | Boolean  [<sup>a</sup>](#ch_libconfig.TF.41)                 | (none)              |
| If **`RESET_SYBASE`** is true, the Sybase client path will be set to the value in the **`SYBASE`** variable.            | [N/A]<br/>N/A<br/><br/>**`SYBASE`**     | a path containing a Sybase client        | (none)              |
| The version of the TDS protocol to use with the CTLIB driver.  | **`[CTLIB]`**<br/>**`TDS_VERSION`**<br/><br/>**`CTLIB_TDS_VERSION`**          | an installed TDS version                 | 125 (see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NCBI_CTLIB_TDS_VERSION)) |
| The version of the TDS protocol to use with the FTDS driver.   | **`[FTDS]`**<br/>**`TDS_VERSION`**<br/><br/>**`FTDS_TDS_VERSION`**            | 0 (auto-detect),<br/>50 (Sybase or Open Server),<br/>70 (SQL Server) | 0                   |
| Whether [connecting with Kerberos authentication](ch_dbapi.html#ch_dbapi.Using_Kerberos_with_DBAPI) is supported. If true, and the username and password are empty strings, then DBAPI will attempt to use Kerberos to connect to the database. The user must ensure that the database will allow them to connect via Kerberos and that their Kerberos ticket is not expired.      | **`[dbapi]`**<br/>**`can_use_kerberos`**<br/><br/>**`NCBI_CONFIG__DBAPI__CAN_USE_KERBEROS`**  [<sup>c</sup>](#ch_libconfig.TF.43)       | Boolean  [<sup>b</sup>](#ch_libconfig.TF.42)                 | false               |
| Whether to encrypt login data.              | **`[dbapi]`**<br/>**`conn_use_encrypt_data`**<br/><br/>**`NCBI_CONFIG__DBAPI__CONN_USE_ENCRYPT_DATA`**  [<sup>c</sup>](#ch_libconfig.TF.43)   | Boolean  [<sup>b</sup>](#ch_libconfig.TF.42)                 | false               |
| The maximum number of simultaneously open connections to database servers.        | **`[dbapi]`**<br/>**`max_connection`**<br/><br/>**`NCBI_CONFIG__DBAPI__MAX_CONNECTION`**  [<sup>c</sup>](#ch_libconfig.TF.43)           | unsigned int          | 100                 |
| The maximum number of connection attempts that will be made for any server.       | **`[DB_CONNECTION_FACTORY]`**<br/>**`MAX_CONN_ATTEMPTS`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__MAX_CONN_ATTEMPTS`**  [<sup>c</sup>](#ch_libconfig.TF.43)   | unsigned int          | 1                   |
| The maximum number of validation attempts that will be made for each connection.  | **`[DB_CONNECTION_FACTORY]`**<br/>**`MAX_VALIDATION_ATTEMPTS`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__MAX_VALIDATION_ATTEMPTS`**  [<sup>c</sup>](#ch_libconfig.TF.43)   | unsigned int          | 1                   |
| The maximum number of servers to try to connect to for each service name (this is only meaningful if the number of servers running this service exceeds this value).             | **`[DB_CONNECTION_FACTORY]`**<br/>**`MAX_SERVER_ALTERNATIVES`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__MAX_SERVER_ALTERNATIVES`**  [<sup>c</sup>](#ch_libconfig.TF.43)   | unsigned int          | 32                  |
| The maximum number of connections to be made to one particular server (when several connections to the same service name are requested) before an attempt to connect to another server will be made. A value of 0 means connect to the same server indefinitely.                | **`[DB_CONNECTION_FACTORY]`**<br/>**`MAX_DISPATCHES`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__MAX_DISPATCHES`**  [<sup>c</sup>](#ch_libconfig.TF.43)   | unsigned int          | 0                   |
| The timeout, in seconds, to be used for all connection attempts (0 means to use either the default value or a value set specifically for the driver context). | **`[DB_CONNECTION_FACTORY]`**<br/>**`CONNECTION_TIMEOUT`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__CONNECTION_TIMEOUT`**  [<sup>c</sup>](#ch_libconfig.TF.43) | unsigned int          | 30                  |
| The timeout, in seconds, to be used while logging into the server for all connection attempts (0 means to use either the default value or a value set specifically for the driver context).         | **`[DB_CONNECTION_FACTORY]`**<br/>**`LOGIN_TIMEOUT`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__LOGIN_TIMEOUT`**  [<sup>c</sup>](#ch_libconfig.TF.43)     | unsigned int          | 30                  |
| If DBAPI resolved the passed name as a service name and then couldn't connect to any server associated with that service name, then this parameter determines whether DBAPI should also try to resolve the passed name as a server name (a database alias from  "interfaces" file or a DNS name). See also: [database load balancing](ch_dbapi.html#ch_dbapi.Database_loadbalanci). | **`[DB_CONNECTION_FACTORY]`**<br/>**`TRY_SERVER_AFTER_SERVICE`**<br/><br/>**`NCBI_CONFIG__DB_CONNECTION_FACTORY__TRY_SERVER_AFTER_SERVICE`**  [<sup>c</sup>](#ch_libconfig.TF.43) | Boolean  [<sup>a</sup>](#ch_libconfig.TF.41)                 | false               |
| See '[PRAGMA cache\_size](https://www.sqlite.org/pragma.html#pragma_cache_size)' in the SQLite documentation.            | **`[LDS2]`**<br/>**`SQLiteCacheSize`**<br/><br/>**`LDS2_SQLITE_CACHE_SIZE`**  | any valid cache size for an SQLite database                 | 2000                |
| The parameter tells if the **`SET XACT_ABORT ON`** option should be sent to the server as the first thing when a new connection is created.<br/>The parameter is applicable for the MS SQL servers only. The Sybase servers do not support this option and DBAPI will not try to send it regardless of the parameter value.<br/>See more on MS SQL server [documentation](https://msdn.microsoft.com/en-us/library/ms188792(v=sql.100).aspx). | **`[dbapi]`**<br/>**`set_xact_abort`**<br/><br/>**`NCBI_CONFIG__DBAPI__SET_XACT_ABORT`** [<sup>c</sup>](#ch_libconfig.TF.43) | Boolean [<sup>b</sup>](#ch_libconfig.TF.42) | true |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.41"></a>

<sup>a</sup> case-insensitive: true, t, yes, y, false, f, no, n

<a name="ch_libconfig.TF.42"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.43"></a>

<sup>c</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.Eutils"></a>

### Eutils

[These parameters](#ch_libconfig.T.eutils_library_configurat) tune the behavior of the Eutils library.

<a name="ch_libconfig.T.eutils_library_configurat"></a>

Table 15. eutils library configuration parameters

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable | Valid values | Default               |
|-------------|--------------------------------------------------------------------|--------------|-----------------------|
| Specify the base URL for Eutils requests. | **`[Eutils]`**<br/>**`Base_URL`**<br/><br/>**`EUTILS_BASE_URL`**   | a valid URL  | https://www.ncbi.nlm.nih.gov/books/NBK25501/ (see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=kDefaultEUtils_Base_URL)) |

<div class="table-scroll"></div>

<a name="ch_libconfig.Internal_GridSpecifi"></a>

Distributed Computing (GRID) Specific Parameters
-------------------------------

The following sections discuss configuration parameters that are specific to NCBI Distributed Computing (GRID).

***Note:*** This section only applies within NCBI.

-   [NetCache and NetSchedule](#ch_libconfig.NetCache_and_NetSchedule)

-   [Worker Node](#ch_libconfig.WorkerNode)

<a name="ch_libconfig.NetCache_and_NetSchedule"></a>

### NetCache and NetSchedule

[Table 16](#ch_libconfig.1.2) describes configuration parameters that are common to both [NetCache](ch_app.html#ch_app.ncbi_netcache_service) and [NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule) client APIs. These parameters are found in the `netservice_api` registry section.

<a name="ch_libconfig.1.2"></a>

Table 16. Common NetCache and NetSchedule client API configuration parameters (netservice\_api)

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable                 | Valid values   | Default         |
|-------------|------------------------------------------------------------------------------------|----------------|-----------------|
| Fail the request if the network I/O is inactive (blocked waiting for the communication channel to become readable or writable) for more than the specified timeout in seconds. Applies to all socket operations after the initial connection is established (see **`NCBI_CONFIG__NETSERVICE_API__CONNECTION_TIMEOUT`**). Can be overridden by **`NCBI_CONFIG__NETCACHE_API__COMMUNICATION_TIMEOUT`** or **`NCBI_CONFIG__NETSCHEDULE_API__COMMUNICATION_TIMEOUT`**.   | **`[netservice_api]`**<br/>**`communication_timeout`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__COMMUNICATION_TIMEOUT`**  [<sup>a</sup>](#ch_libconfig.TF.44) | floating point \>= 0.0 (zero means default)   | 12.0 (see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=COMMUNICATION_TIMEOUT_DEFAULT&d=) for up-to-date default) |
| Turn on socket-specific logging, such as status and transferred data. | **`[netservice_api]`**<br/>**`connection_data_logging`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__CONNECTION_DATA_LOGGING`**  [<sup>a</sup>](#ch_libconfig.TF.44) | Boolean  [<sup>b</sup>](#ch_libconfig.TF.45) | false |
| The maximum number of times the API will retry a communication command on a socket. Setting connection\_max\_retries to zero will prevent NetCache API from retrying the connection and command execution. | **`[netservice_api]`**<br/>**`connection_max_retries`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__CONNECTION_MAX_RETRIES`**  [<sup>a</sup>](#ch_libconfig.TF.44)     | unsigned int   | 4               |
| The timeout in seconds for establishing a **new** connection to a server. Can be overridden by **`NCBI_CONFIG__NETCACHE_API__CONNECTION_TIMEOUT`** or **`NCBI_CONFIG__NETSCHEDULE_API__CONNECTION_TIMEOUT`**.                | **`[netservice_api]`**<br/>**`connection_timeout`**<br/><br/>N/A                   | floating point \> 0.0, millisecond precision, minimum 0.001 (1 millisecond) | 2.0 (see API for up-to-date default)                  |
| The number of connections to keep in the local connection pool. If zero, the server will grow the connection pool as necessary to accomodate new connections. Otherwise, when all connections in the pool are used, new connections will be created and destroyed. | **`[netservice_api]`**<br/>**`max_connection_pool_size`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__MAX_CONNECTION_POOL_SIZE`**  [<sup>a</sup>](#ch_libconfig.TF.44) | non-negative int                  | 0 (meaning unlimited)              |
| The maximum number of attempts to resolve the LBSMD service name. If not resolved within this limit an exception is thrown.   | **`[netservice_api]`**<br/>**`max_find_lbname_retries`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__MAX_FIND_LBNAME_RETRIES`**  [<sup>a</sup>](#ch_libconfig.TF.44)   | positive int   | 3               |
| The delay in seconds between retrying a command; the total time should not exceed **`NCBI_CONFIG__NETCACHE_API__MAX_CONNECTION_TIME`**.          | **`[netservice_api]`**<br/>**`retry_delay`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__RETRY_DELAY`**  [<sup>a</sup>](#ch_libconfig.TF.44)   | floating point \>= 0.0            | 1.0 (see [API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RETRY_DELAY_DEFAULT) for up-to-date default)   |
| Close connections with zero timeout to prevent sockets in TIME\_WAIT on the client side. By default, the Linux kernel delays releasing ports for a certain period after close() because there might be a delayed arrival of packets. Setting this parameter to true disables that behavior and therefore allows faster recycling of ports. This is important when the server is handling a large number of connections due to the limited number of ports available. | **`[netservice_api]`**<br/>**`use_linger2`**<br/><br/>**`NCBI_CONFIG__NETSERVICE_API__USE_LINGER2`**  [<sup>a</sup>](#ch_libconfig.TF.44)   | Boolean  [<sup>b</sup>](#ch_libconfig.TF.45)   | false           |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.44"></a>

<sup>a</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.45"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

[Table 17](#ch_libconfig.1.2.1) describes configuration parameters for NetCache client applications. These parameters are found in the `netcache_api` registry section. ***Note:*** The `netcache_api` registry section was formerly called `netcache_client`.

<a name="ch_libconfig.1.2.1"></a>

Table 17. NetCache client API configuration parameters (netcache\_api)

| Purpose     | [Registry section]<br/>Registry name<br/><br/>Environment variable     | Valid values   | Default                  |
|-------------|------------------------------------------------------------------------|----------------|--------------------------|
| Enable input caching (provides for slow blob retrieval).             | **`[netcache_api]`**<br/>**`cache_input`**<br/><br/>N/A                | Boolean  [<sup>b</sup>](#ch_libconfig.TF.47)          | false |
| Only applies when using [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient). Provides a "namespace" for blobs. Thus, blobs are uniquely identified by the { key, version, subkey, cache\_name } combination.        | **`[netcache_api]`**<br/>**`cache_name`**<br/><br/>N/A                 | up to 36 characters (case-sensitive and no spaces)   | (none)                   |
| Enable output caching (provides for saving a blob with pauses more than "communication\_timeout").         | **`[netcache_api]`**<br/>**`cache_output`**<br/><br/>N/A               | Boolean  [<sup>b</sup>](#ch_libconfig.TF.47)          | false |
| The name of your application, as identified to NetCache.             | **`[netcache_api]`**<br/>**`client`**<br/><br/>N/A  | your application's name           | (none)                   |
| Synonym for **`[netcache_api]/client`**, which is preferred.         | **`[netcache_api]`**<br/>**`client_name`**<br/><br/>N/A                |               |      |
| Can be used to override **`NCBI_CONFIG__NETSERVICE_API__COMMUNICATION_TIMEOUT`**. Please see that entry for details.          | **`[netcache_api]`**<br/>**`communication_timeout`**<br/><br/>N/A      | floating point \>= 0.0 (zero means use the default from **`NCBI_CONFIG__NETSERVICE_API__COMMUNICATION_TIMEOUT`**) | (none)                   |
| Can be used to override **`[netservice_api]/connection_timeout`**. Please see that entry for details.      | **`[netcache_api]`**<br/>**`connection_timeout`**<br/><br/>N/A         | floating point \>= 0.0, minimum 0.001 (zero means use the default from **`[netservice_api]/connection_timeout`**) | (none)                   |
| Depending on the value, enables mirroring: if true, mirroring is unconditionally enabled, if false, it is disabled completely. The special value "if\_key\_mirrored" is used to enable mirroring for the blobs that already have mirroring extensions in their keys.                  | **`[netcache_api]`**<br/>**`enable_mirroring`**<br/><br/>N/A           | Boolean  [<sup>c</sup>](#ch_libconfig.TF.48), or "if\_key\_mirrored"     | "if\_key\_mirrored"      |
| The host:port address for the NetCache server that will be used for blob creation if none of the servers configured via LBSM were able to create the blob. This is only for new blob requests.            | **`[netcache_api]`**<br/>**`fallback_server`**<br/><br/>**`NCBI_CONFIG__NETCACHE_API__FALLBACK_SERVER`**  [<sup>a</sup>](#ch_libconfig.TF.46)     | a valid server | ""    |
| Sets a communication timeout (in seconds) for accessing the first server in a service while submitting a job. If the first server does not reply within the specified amount of time, the next server will be tried, but the second and all subsequent servers will be given the full communication\_timeout to reply. If LBSM services are not used or there's only one server in the service, this parameter does not apply. | **`[netcache_api]`**<br/>**`first_server_timeout`**<br/><br/>**`NCBI_CONFIG__NETCACHE_API__FIRST_SERVER_TIMEOUT`**  [<sup>a</sup>](#ch_libconfig.TF.46) | floating point \>= 0.0 (zero means use default)      | **`[netschedule_api]/communication_timeout`** if defined, or 300ms |
| In conjunction with **`[netcache_api]/port`**, a synonym for **`[netcache_api]/service_name`**, which is preferred.           | **`[netcache_api]`**<br/>**`host`**<br/><br/>N/A    |               |      |
| Max total time for each NetCache transaction.     | **`[netcache_api]`**<br/>**`max_connection_time`**<br/><br/>N/A        | floating point \>= 0.0 (zero means to ignore)        | 0.0   |
| In conjunction with **`[netcache_api]/host`**, a synonym for **`[netcache_api]/service_name`**, which is preferred.           | **`[netcache_api]`**<br/>**`port`**<br/><br/>N/A    |               |      |
| A trigger for LBSM query (query LBSM once per the specified number of NetCache operations).                | **`[netcache_api]`**<br/>**`rebalance_requests`**<br/><br/>N/A         | integer \>= 0 (zero means to not rebalance based on requests)           | 5000 requests            |
| Another trigger for LBSM query (query LBSM at least once per the specified number of seconds)              | **`[netcache_api]`**<br/>**`rebalance_time`**<br/><br/>N/A             | floating point \>= 0.0 (zero means to not rebalance based on time)      | 10.0 seconds             |
| Synonym for **`[netcache_api]/host`**, which is preferred.           | **`[netcache_api]`**<br/>**`server`**<br/><br/>N/A  |               |      |
| Synonym for **`[netcache_api]/service_name`**.    | **`[netcache_api]`**<br/>**`service`**<br/><br/>N/A |               |      |
| The LBSM name that specifies which servers to use. The service name is only used when creating blobs.      | **`[netcache_api]`**<br/>**`service_name`**<br/><br/>N/A               | any registered LBSM service       | (none)                   |
| This is one condition that will trigger server throttling and is defined as a string having the form "A / B" where A and B are integers. Throttling will be triggered if there are A failures in the last B operations.<br/>             | **`[netcache_api]`**<br/>**`throttle_by_connection_error_rate`**<br/><br/>N/A             | a string having the form "A / B" where A and B are integers             | "0 / 0" (ignored)        |
| This is another condition that will trigger server throttling and is defined as follows. Server throttling will be triggered if this number of consecutive connection failures happens.<br/>       | **`[netcache_api]`**<br/>**`throttle_by_consecutive_connection_failures`**<br/><br/>N/A   | integer        | 0 (ignored)              |
| Do not release server throttling until the server appears in LBSMD.  | **`[netcache_api]`**<br/>**`throttle_hold_until_active_in_lb`**<br/><br/>N/A              | Boolean  [<sup>c</sup>](#ch_libconfig.TF.48)          | false |
| Indicates when server throttling will be released.                   | **`[netcache_api]`**<br/>**`throttle_relaxation_period`**<br/><br/>N/A | integer time period in seconds    | 0 (throttling is disabled)     |
| Where to save blob caches.     | **`[netcache_api]`**<br/>**`tmp_dir`**<br/><br/>N/A | a valid directory                 | (none)                   |
| Synonym for **`[netcache_api]/tmp_dir`**.         | **`[netcache_api]`**<br/>**`tmp_path`**<br/><br/>N/A                   |               |      |
| A true value enables an alternative method for checking if a blob exists. ***Note:*** This option is available only for backward compatibility and should not be used.                 | **`[netcache_api]`**<br/>**`use_hasb_fallback`**<br/><br/>**`NCBI_CONFIG__NETCACHE_API__USE_HASB_FALLBACK`**  [<sup>a</sup>](#ch_libconfig.TF.46) | Boolean  [<sup>b</sup>](#ch_libconfig.TF.47)          | false |
| Defines LBSM affinity name to use for floor assignment, etc.         | **`[netcache_api]`**<br/>**`use_lbsm_affinity`**<br/><br/>N/A          | a valid affinity                  | (none)                   |
| If this parameter is set to true, blob key contains service name and server (listed in the blob key) is not present in that service, then do not try to connect to that server. If set to 'auto' and key has a "Check-Server" hint set to NO, then assume 'server_check = no'; otherwise, assume 'server_check = yes'. Otherwise, unconditionally try to connect to the server. | **`[netcache_api]`**<br/>**`server_check`** | true/false/auto | auto |
| This is a hint for the blob readers that use 'server_check = auto'. If set to true, blob readers are advised to pre-check the server which is listed in the blob key. | **`[netcache_api]`**<br/>**`server_check_hint`** | true/false | true |

<div class="table-scroll"></div>

<a name="ch_libconfig.TF.46"></a>

<sup>a</sup> [environment variable name](#ch_libconfig.Environment) formed from registry section and entry name

<a name="ch_libconfig.TF.47"></a>

<sup>b</sup> case-insensitive: true, t, yes, y, 1, false, f, no, n, 0

<a name="ch_libconfig.TF.48"></a>

<sup>c</sup> case-insensitive: true, t, yes, y, false, f, no, n

[Table 18](#ch_libconfig.T18) describes configuration parameters for NetSchedule client applications. These parameters are found in the `netschedule_api` registry section.

<a name="ch_libconfig.T18"></a>

Table 18. NetSchedule client API configuration parameters (netschedule\_api)

| Purpose           | [Registry section]<br/>Registry name<br/><br/>Environment variable   | Valid values   | Default      |
|-------------------|----------------------------------------------------------------------|----------------|--------------|
| Name of the queue (DO NOT use default queue for your application).         | **`[netschedule_api]`**<br/>**`queue_name`**<br/><br/>N/A      | your application's queue name     | (none) |
| The name of your application, as identified to NetSchedule.                | **`[netschedule_api]`**<br/>**`client_name`**<br/><br/>N/A     | your application's name           | (none) |
| Can be used to override **`NCBI_CONFIG__NETSERVICE_API__COMMUNICATION_TIMEOUT`**. Please see that entry for details. | **`[netschedule_api]`**<br/>**`communication_timeout`**<br/><br/>N/A | floating point \>= 0.0 (zero means use the default from **`NCBI_CONFIG__NETSERVICE_API__COMMUNICATION_TIMEOUT`**) | 12.0 seconds |
| Can be used to override **`[netservice_api]/connection_timeout`**. Please see that entry for details.    | **`[netschedule_api]`**<br/>**`connection_timeout`**<br/><br/>N/A    | floating point \>= 0.0 (zero means use the default from **`[netservice_api]/connection_timeout`**)    | 2.0 seconds  |
| Use affinity information when requesting jobs.  | **`[netschedule_api]`**<br/>**`use_affinities`** | true/false | false |
| Initial set of preferred affinities. Initial (comma/space separated) list of preferred affinities. Example: job_type_a, job_type_b | **`[netschedule_api]`**<br/>**`affinity_list`** | comma/space separated list | "" |
| A prioritized lists of affinities, which overrides the default job processing order. Cannot be used with affinity_list. Example: high_priority_job, mid_priority_job, low_priority_job | **`[netschedule_api]`**<br/>**`affinity_ladder`** | comma/space separated list | "" |
| Use affinity information and accept new affinities automatically. Cannot be used with affinity_ladder.  | **`[netschedule_api]`**<br/>**`claim_new_affinities`** | true/false | false |
| Allow the worker node to process jobs without affinities as well as jobs with "non-preferred" affinities. Cannot be used in combination with 'claim_new_affinities'.  | **`[netschedule_api]`**<br/>**`process_any_job`** | true/false | false |

<div class="table-scroll"></div>

<a name="ch_libconfig.WorkerNode"></a>

### Worker Node

[Table 19](#ch_libconfig.T19) describes configuration parameters for Worker Nodes.

<a name="ch_libconfig.T19"></a>

Table 19. Worker Node configuration parameters

| Purpose           | [Registry section]<br/>Registry name<br/><br/>Environment variable   | Valid values   | Default      |
|-------------------|----------------------------------------------------------------------|----------------|--------------|
| Deprecated. | **`[server]`**<br/>**`allow_implicit_job_return`**<br/><br/>**`NCBI_CONFIG__SERVER__ALLOW_IMPLICIT_JOB_RETURN`**  [<sup>e</sup>](#ch_libconfig.TF.19) | Boolean  [<sup>b</sup>](#ch_libconfig.TF.16) | false |
| Maximum time worker nodes are allowed to live without a single NetSchedule server. | **`[server]`**<br/>**`max_wait_for_servers`**<br/><br/>**`NCBI_CONFIG__SERVER__MAX_WAIT_FOR_SERVERS`**  [<sup>e</sup>](#ch_libconfig.TF.19) | unsigned int | 24 \* 60 \* 60 seconds |
| Causes the worker node to shut down if any jobs fail. | **`[server]`**<br/>**`stop_on_job_errors`**<br/><br/>**`NCBI_CONFIG__SERVER__STOP_ON_JOB_ERRORS`**  [<sup>e</sup>](#ch_libconfig.TF.19) | Boolean  [<sup>b</sup>](#ch_libconfig.TF.16) | true |
| Maximum number of jobs(threads) can be served simultaneously.  This parameter defines job parallelism. For computationally intensive algorithms this value should not be more than number of CPUs if set to 'auto', the node will determine the number of CPUs on the system and use this number.  | **`[server]`**<br/>**`max_threads`** | | auto |
| Initial number of threads created for incoming jobs | **`[server]`**<br/>**`init_threads`** | | 1 |
| TCP/IP and UDP port number for control messages (like shutdown, version) and job notifications. It runs special control thread for incoming administrative requests (from netschedule_control and netschedule_admin) Can take a ports range (ex. 9300-9310). In this case the system will try to find an available port in the given range | **`[server]`**<br/>**`control_port`** | | |
| Server side logging. A worker node can ask its context if this flag is set to true | **`[server]`**<br/>**`log`** | | |
| Internal.  Delay in seconds node task dispatcher waits for free space in the job queue. Lower value usually gives better response to shutdown command (CPU traded off) | **`[server]`**<br/>**`thread_pool_timeout`** | | |
| Time worker node spends waiting for new jobs without connecting to the netschedule server queue. Server sends UPD requests to wake the node up. Bigger values of this parameter reduces the netschedule server load in expense of job delivery latency (because of potential loss of UDP packages) | **`[server]`**<br/>**`job_wait_timeout`** | | |
| The max total number of jobs after which the node will shutdown itself.  Restarting the node periodically is useful due to accumulating heap fragmentation possible leaks etc.  | **`[server]`**<br/>**`max_total_jobs `** | | 0 - means unlimited number of jobs. |
| The max number of failed jobs after which the node will shutdown itself.  | **`[server]`**<br/>**`max_failed_jobs `** | | 0 - means unlimited number of failed jobs. |
| When true, server transforms into a daemon, detached from the current program group (for UNIX only) | **`[server]`**<br/>**`daemon`** | | |
| The list of worker nodes which this node will check before attempting to retrieve a job from the NetSchedule queue. If at least one of these worker nodes has an ideal thread, this node will not connect to the queue for a job. This node and all nodes from the given list must be connected to the same NetSchedule service, the same queue and must run the same job.  If the list is empty (defult) then this node is a master.  | **`[server]`**<br/>**`master_nodes `** | | empty - this node is a master. |
| List of network hosts which are allowed admin access to the worker node if this worker node is controled by grid_node_watcher.sh don't forget to to add "localhost" to this list.  | **`[server]`**<br/>**`admin_hosts `** | | |
| Time delay (in seconds) between the node enters an idle mode (all jobs are done and there are no new jobs in the queue) and the idle task gets executed.  Can not be less then 1 sec.  | **`[server]`**<br/>**`idle_run_delay `** | | 30 |
| Specifies if an idle task works in an exclusive mode, which means that no real job will be processed until the idle task is running.  | **`[server]`**<br/>**`idle_exclusive `** | | true |
| The node will automatically shut itself down if it is idle for a continuous period of time longer than this (in seconds): | **`[server]`**<br/>**`auto_shutdown_if_idle `** | | 0 - means never auto shutdown |
| Specifies if the framework should reuse an instance of the job class.  Setting this parameter to true means that only one instance of the job class will be create per each execution thread. False means that an instance of job class will be created per each incoming job.  | **`[server]`**<br/>**`reuse_job_object `** | | false |
| Allows the node to detect infinite loops in job execution. If a job is being executed for more then the specified time, it is assumed to be stuck in an infinite loop.  It this happens, the node enters shutdown mode, and when all other jobs, which may be running on this node, are done, the node terminates.  | **`[server]`**<br/>**`infinite_loop_time`** | | 0, which means that the node will not detect infinite loops. |
| Time in seconds. Specifies how often the node should check states of jobs it is processing. It is used as a feedback from the client to see if it wants  to cancel the job execution | **`[server]`**<br/>**`check_status_period `** | | |
| Sets the maximum limit for total memory consumption by this worker node.  When this limit is reached, the worker node shuts down.  | **`[server]`**<br/>**`total_memory_limit `** | | |
| Sets the maximum limit for total runtime of this worker node (in seconds).  When this limit is reached, the worker node shuts down.  | **`[server]`**<br/>**`total_time_limit `** | | 0, which means there is no limit. |
| Default timeout before the job is terminated in case of pullback.  This value can be overridden by the '--timeout' option specified with 'grid_cli suspend --pullback'.  | **`[server]`**<br/>**`default_pullback_timeout`** | | |

<div class="table-scroll"></div>

See the [Distributed Computing](ch_grid.html) chapter for more information on NetCache and NetSchedule.

Configuration parameters for NetCache daemons are described in the file:

<https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netcache/netcached.ini?view=log>

<a name="ch_libconfig.Internal_ApplicationSpecifi"></a>

Application-Specific Parameters
-------------------------------

The following sections discuss configuration parameters that are specific to selected applications.

-   [Seqfetch.cgi](#ch_libconfig.Seqfetchcgi)

<a name="ch_libconfig.Seqfetchcgi"></a>

### Seqfetch.cgi

***Note:*** This applies only inside NCBI.

[These parameters](#ch_libconfig.T.seqfetchcgi_application_c) tune the behavior of the [`seqfetch.cgi`](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/internal/cppcore/seqfetch_cgi/) application.

<a name="ch_libconfig.T.seqfetchcgi_application_c"></a>

Table 19. seqfetch.cgi application configuration parameters

| Purpose | [Registry section]<br/>Registry name<br/><br/>Environment variable   | Valid values | Default  |
|---------|----------------------------------------------------------------------|--------------|----------|
| Point to the current script.    | **`[SeqFetch]`**<br/>**`Viewer_fcgi_path`**<br/><br/>**`SEQFETCH_VIEWER_FCGI_PATH`**   | a valid path | /sviewer/viewer.fcgi |
| Name the current load-balanced proxy. | **`[SeqFetch]`**<br/>**`Viewer_fcgi_proxy`**<br/><br/>**`SEQFETCH_VIEWER_FCGI_PROXY`** | a valid proxy name | sviewer\_lb    |

<div class="table-scroll"></div>


