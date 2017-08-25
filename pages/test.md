---
layout: default
title: Test page 
nav: pages/ch_algoalign
---


{{ page.title }}
================================================

Overview
--------

The overview for this chapter consists of the following topics:

-   Introduction

-   Chapter Outline

### Introduction

This chapter covers the C++ Toolkit support for database access using:

-   the [SDBAPI](#ch_dbapi.SDBAPI_UserLayer_Reference) database access library [[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/dbapi/simple/) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/simple/)];

-   the [DBAPI](#ch_dbapi.The_DBAPI_Library) database access library [[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/dbapi/) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/)];

-   the [BDB](#ch_dbapi.Major_Features_of_th) wrapper [[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/db/bdb/) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/db/bdb/)]; or

-   the [SQLite](#ch_dbapi.The_SQLite_Wrapper) wrapper [[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/db/sqlite/) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/db/sqlite/)].

DBAPI was the traditional database access library interface, but has been superseded by SDBAPI - the "simplified" interface. They have considerable overlap, but they are fully not compatible and each has at least one feature the other doesn't, so you must pick one. For example, DBAPI allows a choice of underlying drivers and access to the underlying data source while SDBAPI does not. On the other hand, SDBAPI supports bookmarking blobs while DBAPI doesn't. In the vast majority of cases SDBAPI will be both more than adequate and easier to use and maintain. Therefore, SDBAPI should be the first choice unless there's a compelling reason to use DBAPI.

The DBAPI library provides the underlying [user-layer](#ch_dbapi.dbapi_user_layer) and [driver](#ch_dbapi.dbapi_driver_ref) API for the NCBI database connectivity project. The project's goal is to provide access to various relational database management systems (RDBMS) with a single uniform user interface. Consult the detailed documentation for details of the [supported DBAPI drivers](#ch_dbapi.dbapi_drivers).

The "BDB wrapper" is part of the NCBI C++ Toolkit and serves as a high-level interface to the open source Berkeley DB library. The BDB wrapper is architecturally different from the DBAPI library and does not follow its design - rather, it is compatible with Berkeley DB v. 4.1 and higher. The primary purpose of the Berkeley DB library is to provide tools to work with flatfile, federated databases. Thus, the BDB wrapper is intended for use by software developers who need small-footprint, high-performance database capabilities with zero administration. The database in this case becomes tightly integrated with the application code. For more information about Berkeley DB, see the official [documentation](http://www.oracle.com/us/products/database/berkeley-db/overview/index.html).

The "SQLite wrapper" is part of the NCBI C++ Toolkit and serves as a high-level interface to the open source SQLite library. The SQLite wrapper is architecturally different from the DBAPI library and does not follow its design - rather, it is compatible with SQLite v. 3.6.14 and higher. The primary purpose of the SQLite library is to provide small, fast, and reliable in-process full-SQL database access. The SQLite wrapper provides convenient wrappers for SQLite-related objects and most commonly used functions. The wrapper requires SQLite 3.6.14 or higher with the asynchronous VFS extension and assumes that no SQLite calls are made except via the wrapper itself. For more information about SQLite, see the official [documentation](http://sqlite.org/docs.html).

### Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [Security](#ch_dbapi.Security)

    -   [Preventing SQL Injection](#ch_dbapi.Preventing_SQL_Injection)

    -   [Using Kerberos with DBAPI](#ch_dbapi.Using_Kerberos_with_DBAPI)

-   [SDBAPI / DBAPI Feature Comparison](#ch_dbapi.SDBAPI__DBAPI_Feature_Compariso)

-   [The SDBAPI Library](#ch_dbapi.SDBAPI_UserLayer_Reference)

    -   [SDBAPI Overview](#ch_dbapi.Simple_Database_Access_via_C)

    -   [Includes and Linkage](#ch_dbapi.Includes_and_Linkage)

    -   [Connections](#ch_dbapi.Connections)

    -   [Executing Basic Queries](#ch_dbapi.Executing_Basic_Queries)

    -   [Stored Procedures and Parameters](#ch_dbapi.Stored_Procedures_and_Parameter)

    -   [Retrieving Results](#ch_dbapi.Retrieving_Results)

    -   [Getting a Stored Procedure Return Value](#ch_dbapi.Getting_a_Stored_Procedure_Retu)

    -   [Meta-Data Accessors](#ch_dbapi.MetaData_Accessors)

    -   [Working with NULL](#ch_dbapi.Working_with_NULL)

    -   [Using Transactions](#ch_dbapi.Using_Transactions)

    -   [Using Cursors](#ch_dbapi.Using_Cursors)

-   [The DBAPI Library](#ch_dbapi.The_DBAPI_Library)

    -   [DBAPI User-Layer Reference](#ch_dbapi.dbapi_user_layer)

        -   [DBAPI Overview](#ch_dbapi.dbapi_overview)

        -   [Object Hierarchy](#ch_dbapi.dbapi_obj_hierarchy)

        -   [Includes](#ch_dbapi.dbapi_includes)

        -   [Objects](#ch_dbapi.dbapi_objects)

        -   [Object Life Cycle](#ch_dbapi.dbapi_obj_lifecycle)

        -   [CVariant Type](#ch_dbapi.dbapi_variant)

        -   [Choosing the Driver](#ch_dbapi.dbapi_choose_driver)

        -   [Data Source and Connections](#ch_dbapi.dbapi_src_cnxns)

        -   [Main Loop](#ch_dbapi.dbapi_main_loop)

        -   [Input and Output Parameters](#ch_dbapi.dbapi_io_params)

        -   [Stored Procedures](#ch_dbapi.dbapi_stored_procs)

        -   [Cursors](#ch_dbapi.dbapi_cursors)

        -   [Working with BLOBs](#ch_dbapi.dbapi_wwblobs)

        -   [Updating BLOBs Using Cursors](#ch_dbapi.dbapi_blobs)

        -   [Using Bulk Insert](#ch_dbapi.dbapi_bulk_insert)

        -   [Diagnostic Messages](#ch_dbapi.dbapi_diag)

        -   [Trace Output](#ch_dbapi.dbapi_trace)

    -   [DBAPI Driver Reference](#ch_dbapi.dbapi_driver_ref)

        -   [Overview](#ch_dbapi.dbapi_drvr_overview)

        -   [The driver architecture](#ch_dbapi.dbapi_drvr_arch)

        -   [Sample program](#ch_dbapi.dbapi_sample_prog)

        -   [Error handling](#ch_dbapi.dbapi_errors)

        -   [Driver context and connections](#ch_dbapi.dbapi_context)

        -   [Driver Manager](#ch_dbapi.dbapi_drvr_mgr)

        -   [Text and Image Data Handling](#ch_dbapi.dbapi_txt_img)

        -   [Results loop](#ch_dbapi.dbapi_results)

    -   [Supported DBAPI drivers](#ch_dbapi.dbapi_drivers)

        -   [FreeTDS (TDS ver. 7.0)](#ch_dbapi.free_tds64)

        -   [Sybase CTLIB](#ch_dbapi.dbapi_drvs_ctlib)

        -   [ODBC](#ch_dbapi.dbapi_drvrs_odbc)

        -   [MySQL Driver](#ch_dbapi.mysql_driver)

-   [The BDB Wrapper](#ch_dbapi.Major_Features_of_th)

-   [The SQLite Wrapper](#ch_dbapi.The_SQLite_Wrapper)

-   [Database Load-Balancing (DBLB)](#ch_dbapi.Database_loadbalanci)

    -   [Setting up Load-Balancing of Database Servers](#ch_dbapi.Getting_started)

    -   [Using Database Load-Balancing from C++](#ch_dbapi.Using_Database_LoadBalancing_fr)

    -   [Load-Balanced Database Access via Python and Perl](#ch_dbapi.Database_Access_via_Python_and)

    -   [Advantages of using DBLB](#ch_dbapi.Advantages_of_using_)

    -   [How it works (by default)](#ch_dbapi.HOW_IT_WORKS_by_defa)
