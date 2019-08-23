---
layout: default
title: Database Access Support
nav: pages/ch_dbapi
---


{{ page.title }}
==========================================

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
    
    -   [Parameterized SQL](#ch_dbapi.Parameterized_SQL)

    -   [Using Transactions](#ch_dbapi.Using_Transactions)

    -   [Using Cursors](#ch_dbapi.Using_Cursors)

    -   [Connection Pooling](#ch_dbapi.Connection_Pooling)
    
    -   [Database Mirroring Support](#ch_dbapi.Database_Mirroring_Support)

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
    
    -   [Using Database Load-Balancing from Python](#ch_dbapi.Using_Database_LoadBalancing_from_Python)

    -   [Using Database Load-Balancing from C++](#ch_dbapi.Using_Database_LoadBalancing_fr)

    -   [Load-Balanced Database Access via Python and Perl](#ch_dbapi.Database_Access_via_Python_and)

    -   [Advantages of using DBLB](#ch_dbapi.Advantages_of_using_)

    -   [How it works (by default)](#ch_dbapi.HOW_IT_WORKS_by_defa)

<a name="ch_dbapi.Security"></a>

Security
--------

<a name="ch_dbapi.Preventing_SQL_Injection"></a>

### Preventing SQL Injection

This section is not intended to cover all the important aspects of security because a lot of good information on the topic is already published elsewhere. Please use other resources to find the security-related information needed for your work.

However, it's worth pointing out a couple of the most important ways to protect against SQL injection:

1.  Never construct a SQL statement from user-supplied input if the same functionality can be achieved by passing the user input to stored procedures or parameterized SQL.

2.  If constructing a SQL statement from user-supplied input cannot be avoided, then you MUST sanitize the user input.

The following sample programs illustrates how to protect against SQL injection for basic SQL statements using SDBAPI and DBAPI:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/sdbapi_simple.cpp>

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/dbapi_simple.cpp>

See the [Security FAQ](ch_faq.html#ch_faq.Security) for more information.

<a name="ch_dbapi.Using_Kerberos_with_DBAPI"></a>

### Using Kerberos with DBAPI

Within NCBI, individual users (i.e. not service accounts) can use Kerberos with DBAPI, provided the following conditions are met:

1.  The database must allow them to connect using Kerberos. (Email <span class="oem_span">kiolswGujip5ust5upo5nv/</span> if you need help with this.)

2.  DBAPI must be configured to enable Kerberos.

    -   Either the **`NCBI_CONFIG__DBAPI__CAN_USE_KERBEROS`** environment variable must be set to `true`; or

    -   the `can_use_kerberos` entry in the `dbapi` section of the application configuration file must be set to `true`.

3.  Their Kerberos ticket must not be expired.

4.  They must pass an empty string for the user name.

This is also covered in the [DBAPI section](ch_libconfig.html#ch_libconfig.DBAPI) of the Library Configuration chapter.

<a name="ch_dbapi.SDBAPI__DBAPI_Feature_Compariso"></a>

SDBAPI / DBAPI Feature Comparison
---------------------------------

SDBAPI is mostly a wrapper over DBAPI, and as such it introduces some overhead - some of which is unavoidable. SDBAPI and DBAPI each have some features that aren't available in the other, but SDBAPI is usually more than sufficient for 95% of real-life tasks (and it makes them easier to code too). So, in most cases you should use SDBAPI.

The following features are only available in DBAPI:

-   Choice of driver (e.g. CTLIB, ODBC, etc.).

-   Support for cursors.

-   Writing BLOBs to streams.

The following features are only available in SDBAPI:

-   Bookmarking BLOBs.

The following table compares the implementation of various features in DBAPI and SDBAPI:

<a name="ch_dbapi.T.nc_featuresdbapidbapisample_c"></a>

| Feature | SDBAPI               | DBAPI         |
|---------|----------------------|---------------|
| sample code   | [src/sample/app/sdbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/)          | [src/sample/app/dbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/)     |
| available drivers   | FTDS                 | CTLIB, FTDS, MYSQL, ODBC         |
| cursor support      | no                   | yes           |
| writing BLOBs to streams  | no                   | yes           |
| bookmarking BLOBs   | yes                  | no            |
| access to stored procedure parameters | only by name         | by name or position (note: if possible, prefer using names over positions because using positions creates maintenance difficulties)                |
| makefile `REQUIRES` | `REQUIRES = dbapi FreeTDS`              | `# choose driver, e.g. FreeTDS, BerkeleyDB, or SQLITE3`<br/>`REQUIRES = dbapi FreeTDS`                |
| makefile `LIB`      | `LIB = $(SDBAPI_LIB) xconnect xutil xncbi`                 | `LIB = ncbi_xdbapi_ftds $(FTDS_LIB) \`<br/>`      dbapi_util_blobstore$(STATIC) dbapi$(STATIC) dbapi_driver$(STATIC) \`<br/>`      $(XCONNEXT) xconnect $(COMPRESS_LIBS) xutil xncbi`         |
| makefile `LIBS`     | `LIBS = $(SDBAPI_LIBS) $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)`               | `LIBS = $(FTDS_LIBS) $(CMPRS_LIBS) $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)`               |
| includes      | `<dbapi/simple/sdbapi.hpp>`             | `// "new" DBAPI`<br/>`#include <dbapi/dbapi.hpp>`<br/><br/>`// "old" DBAPI`<br/>`#include <dbapi/driver/dbapi_conn_factory.hpp>  // CTrivialConnValidator`<br/>`#include <dbapi/driver/dbapi_svc_mapper.hpp>    // DBLB_INSTALL_DEFAULT`<br/>`#include <dbapi/driver/drivers.hpp>             // DBAPI_RegisterDriver_FTDS`<br/>`#include <dbapi/driver/exception.hpp>           // CDB_UserHandler`              |
| to set up a connection    | `// Specify connection parameters.`<br/>`CSDB_ConnectionParam    db_params;`<br/>`db_params.Set(CSDB_ConnectionParam::eUsername, m_User);`<br/>`db_params.Set(CSDB_ConnectionParam::ePassword, m_Password);`<br/>`db_params.Set(CSDB_ConnectionParam::eService,  m_Service);`<br/>`db_params.Set(CSDB_ConnectionParam::eDatabase, m_DbName);`<br/><br/>`// Connect to the database.`<br/>`m_Db = CDatabase(db_params);`<br/>`m_Db.Connect();`    | `// Use load balancing if available.`<br/>`DBLB_INSTALL_DEFAULT();`<br/><br/>`// Explicitly register a driver.`<br/>`DBAPI_RegisterDriver_FTDS();`<br/><br/>`CDriverManager& dm(CDriverManager::GetInstance());`<br/><br/>`// Create a data source - the root object for all other`<br/>`// objects in the library.`<br/>`m_Ds = dm.CreateDs("ftds");`<br/><br/>`// Setup diagnostics.`<br/>`m_Logstream.open(m_LogFileName.c_str());`<br/>`m_Ds->SetLogStream(&m_Logstream);`<br/><br/>`// Add a message handler for 'context-wide' error messages (not bound`<br/>`// to any particular connection); let DBAPI own it.`<br/>`I_DriverContext* drv_context = m_Ds->GetDriverContext();`<br/>`drv_context->PushCntxMsgHandler(`<br/>`    new CErrHandler("General", &m_Logstream),`<br/>`    eTakeOwnership);`<br/><br/>`// Add a 'per-connection' message handler to the stack of default`<br/>`// handlers which are inherited by all newly created connections;`<br/>`// let DBAPI own it.`<br/>`drv_context->PushDefConnMsgHandler(`<br/>`    new CErrHandler("Connection", &m_Logstream),`<br/>`    eTakeOwnership);`<br/><br/>`// Configure this context.`<br/>`drv_context->SetLoginTimeout(10);`<br/>`// default query timeout for client/server comm for all connections`<br/>`drv_context->SetTimeout(15);`<br/><br/>`// Create connection.`<br/>`m_Conn = m_Ds->CreateConnection();`<br/>`if (m_Conn == NULL) {`<br/>`    ERR_POST_X(1, Fatal << "Could not create connection.");`<br/>`}`<br/><br/>`// Validate connection.  When using load balancing, this will interpret`<br/>`// the "server" name as a service, then use the load balancer to find`<br/>`// servers, then try in succession until a successful login to the`<br/>`// given database is successful.`<br/>`CTrivialConnValidator val(m_DbName);`<br/>`m_Conn->ConnectValidated(val, m_User, m_Password, m_Service, m_DbName);`  |
| to execute a stored procedure   | `CQuery query = m_Db.NewQuery();`<br/>`query.SetParameter("@max_id", 5);`<br/>`query.SetParameter("@max_fl", 5.1f);`<br/>`query.SetParameter("@num_rows", 0, eSDB_Int4, eSP_InOut);`<br/>`query.ExecuteSP(proc_name);`       | `ICallableStatement *cstmt = conn->PrepareCall("ProcName");`<br/>`Uint1 byte = 1;`<br/>`cstmt->SetParam(CVariant("test"), "@test_input");`<br/>`cstmt->SetParam(CVariant::TinyInt(&byte), "@byte");`<br/>`cstmt->SetOutputParam(CVariant(eDB_Int), "@result");`<br/>`cstmt->Execute();`    |
| to retrieve results | `// Print the results.`<br/>`//`<br/>`// NOTE: For database APIs, array-like indexes are 1-based, not 0-based!`<br/>`//`<br/>`NcbiCout << "int_val    fl_val" << NcbiEndl;`<br/>`for (const auto& row: query.SingleSet()) {`<br/>`    NcbiCout`<br/>`        << row[1].AsInt4() << "    "`<br/>`        << row[2].AsFloat() << NcbiEndl;`<br/>`}`<br/><br/>`// Confirm having read all results.`<br/>`query.VerifyDone();`<br/><br/>`// Print the number of result rows.`<br/>`NcbiCout`<br/>`    << "Number of rows: "`<br/>`    << query.GetParameter("@num_rows").AsInt4() << NcbiEndl;` | `// Retrieve and display the data.`<br/>`while (stmt->HasMoreResults()) {`<br/>`    // Use an auto_ptr to manage resultset lifetime.`<br/>`    // NOTE: Use it with caution. When the wrapped parent object`<br/>`    // goes out of scope, all child objects are destroyed`<br/>`    // (which isn't an issue for this demo but could be for`<br/>`    // other applications).`<br/>`    auto_ptr<IResultSet> rs(stmt->GetResultSet());`<br/><br/>`    // Sometimes the results have no rows - and that's ok.`<br/>`    if ( ! stmt->HasRows() ) {`<br/>`        LOG_POST_X(1, Info << "No rows.");`<br/>`        continue;`<br/>`    }`<br/><br/>`    switch (rs->GetResultType()) {`<br/><br/>`    case eDB_StatusResult:`<br/>`        NcbiCout << "\nStatus results:" << NcbiEndl;`<br/>`        while (rs->Next()) {`<br/>`            NcbiCout << "    Status: " << rs->GetVariant(1).GetInt4()`<br/>`                << NcbiEndl;`<br/>`        }`<br/>`        break;`<br/><br/>`    case eDB_ParamResult:`<br/>`        NcbiCout << "\nParameter results:" << NcbiEndl;`<br/>`        while (rs->Next()) {`<br/>`            NcbiCout << "    Parameter: "`<br/>`                << rs->GetVariant(1).GetInt4() << NcbiEndl;`<br/>`        }`<br/>`        break;`<br/><br/>`    case eDB_RowResult: {`<br/>`        NcbiCout << "\nRow results:" << NcbiEndl;`<br/><br/>`        const IResultSetMetaData* rsMeta = rs->GetMetaData();`<br/><br/>`        // Print column headers.`<br/>`        for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`            NcbiCout << "    " << rsMeta->GetName(i);`<br/>`        }`<br/>`        NcbiCout << NcbiEndl;`<br/>`        for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`            NcbiCout << "    " << string(rsMeta->GetName(i).size(), '=');`<br/>`        }`<br/>`        NcbiCout << NcbiEndl;`<br/><br/>`        while (rs->Next()) {`<br/>`            // Print a row of data.`<br/>`            for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`                NcbiCout << "    " << rs->GetVariant(i).GetString();`<br/>`            }`<br/>`            NcbiCout << NcbiEndl;`<br/>`        }`<br/>`        NcbiCout << "    ---------------" << NcbiEndl;`<br/>`        NcbiCout << "    Row count: " << stmt->GetRowCount()`<br/>`            << NcbiEndl;`<br/>`        break;`<br/>`    }`<br/><br/>`    // These types aren't used in this demo, but might be in`<br/>`    // your code.`<br/>`    case eDB_ComputeResult:`<br/>`    case eDB_CursorResult:`<br/>`        LOG_POST_X(1, Warning << "Unhandled results type:"`<br/>`            << rs->GetResultType());`<br/>`        break;`<br/><br/>`    // Any other type means this code is out-of-date.`<br/>`    default:`<br/>`        ERR_POST_X(1, Critical << "Unexpected results type:"`<br/>`            << rs->GetResultType());`<br/>`    }`<br/>`}`<br/>`// The stored procedure will return a status.`<br/>`NcbiCout << "\nStored procedure returned status: "`<br/>`    << cstmt->GetReturnStatus() << NcbiEndl;`<br/>`string msgs = m_Ds->GetErrorInfo();`<br/>`if ( ! msgs.empty() ) {`<br/>`    NcbiCout << "    Errors:" << NcbiEndl;`<br/>`    NcbiCout << "        " << msgs << NcbiEndl;` |

<div class="table-scroll"></div>

<a name="ch_dbapi.SDBAPI_UserLayer_Reference"></a>

The SDBAPI Library
------------------

<a name="ch_dbapi.Simple_Database_Access_via_C"></a>

### SDBAPI Overview

The following snippet is a simple example of executing static SQL using the NCBI simplified database API (SDBAPI):

    // Specify connection parameters.
    CSDB_ConnectionParam    db_params;
    db_params.Set(CSDB_ConnectionParam::eUsername, m_User);
    db_params.Set(CSDB_ConnectionParam::ePassword, m_Password);
    db_params.Set(CSDB_ConnectionParam::eService,  m_Service);
    db_params.Set(CSDB_ConnectionParam::eDatabase, m_DbName);

    // Connect to the database.
    CDatabase  db(db_params);
    db.Connect();

    // Execute a query.
    CQuery query = db.NewQuery("select title from Journal");
    query.Execute();
    for (const auto& row: query) {
        NcbiCout << row["title"].AsString() << NcbiEndl; 
    }

***Note:*** Load balancing is performed automatically and transparently with SDBAPI - there's no need to call [DBLB\_INSTALL\_DEFAULT()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DBLB_INSTALL_DEFAULT).

See the SDBAPI sample programs for more example code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/>

The following sections cover specific aspects of SDBAPI:

-   [Includes and Linkage](#ch_dbapi.Includes_and_Linkage)

-   [Connections](#ch_dbapi.Connections)

-   [Executing Basic Queries](#ch_dbapi.Executing_Basic_Queries)

-   [Stored Procedures and Parameters](#ch_dbapi.Stored_Procedures_and_Parameter)

-   [Retrieving Results](#ch_dbapi.Retrieving_Results)

-   [Getting a Stored Procedure Return Value](#ch_dbapi.Getting_a_Stored_Procedure_Retu)

-   [Meta-Data Accessors](#ch_dbapi.MetaData_Accessors)

-   [Working with NULL](#ch_dbapi.Working_with_NULL)

-   [Parameterized SQL](#ch_dbapi.Parameterized_SQL)

-   [Using Transactions](#ch_dbapi.Using_Transactions)

-   [Using Cursors](#ch_dbapi.Using_Cursors)

-   [Database Mirroring Support](#ch_dbapi.Database_Mirroring_Support)

<a name="ch_dbapi.Includes_and_Linkage"></a>

### Includes and Linkage

SDBAPI requires only one header:

    #include <dbapi/simple/sdbapi.hpp>

For proper linkage, merge the following into your LIB and LIBS lines:

    LIB  = $(SDBAPI_LIB) xconnect xutil xncbi
    LIBS = $(SDBAPI_LIBS) $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)

<a name="ch_dbapi.Connections"></a>

### Connections

To establish a database connection, first specify the connection parameters, then create the database object using those parameters, then call the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method, for example:

    // Specify connection parameters.
    CSDB_ConnectionParam    db_params;
    db_params.Set(CSDB_ConnectionParam::eUsername, m_User);
    db_params.Set(CSDB_ConnectionParam::ePassword, m_Password);
    db_params.Set(CSDB_ConnectionParam::eService,  m_Service);
    db_params.Set(CSDB_ConnectionParam::eDatabase, m_DbName);

    // Connect to the database.
    m_Db = CDatabase(db_params);
    m_Db.Connect();

Connecting to a database requires a minimum set of parameters, including:
- either a load-balanced service name or a server name and port;
- a database name;
- a database user name; and
- a database user password.

Additional parameters are available for login and I/O timeouts, connection pooling, etc. Please see the [CSDB\_ConnectionParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSDB_ConnectionParam) [class reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCSDB__ConnectionParam.html)

In general, connection parameter values may be given in one or more of the following places:
- in a token passed to the `CSDB_ConnectionParam` constructor;
- in a `CSDB_ConnectionParam::Set()` call;
- in the application configuration file; or
- in the environment.

Exceptions are:
- The service parameter can only be set in the [CSDB_ConnectionParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSDB_ConnectionParam) constructor or the `Set()` call.
- The password parameter may be omitted if Kerberos is used (see [Using Kerberos with DBAPI](#ch_dbapi.Using_Kerberos_with_DBAPI)).

When a connection parameter is given in multiple places, the order of precedence is:
- the `Set()` call takes precedence over the constructor;
- the configuration file takes precedence over the `Set()` call;
- the environment takes precedence over the configuration file.

If a password and a password file are both given at the same precedence level (e.g. both in a URL or both in the config file) then an exception will be thrown.

#### As Tokens Passed to the CSDB_ConnectionParam Constructor
Connection parameters may be tokens in a string passed to the [CSDB_ConnectionParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSDB_ConnectionParam) constructor. Such strings may have one of the following forms:

```
dbapi://[username[:password]@][server[:port]][/database][?key=val;...]
or
dbapi://[username[:password]@][service][/database][?key=val;...]
or
service
```

The URL-like forms are intended for cases when the database connection URL is supplied externally - it is not intended that client applications will manually construct URLs from components. If your application gets a pre-constructed URL, each token must be URL-encoded. If your application does not get a pre-constructed URL, please use one of the other methods of setting connection parameters rather than constructing a URL.
The service form can be a convenient way to specify just the service name when other parameters are supplied elsewhere (e.g. the config file).

#### As Values Passed to the Set Method
One straightforward way to set connection parameters is by using the `Set()` method (which supports chaining), for example:
```
CSDB_ConnectionParam     db_params;
db_params
    .Set(CSDB_ConnectionParam::eUsername,     m_User)
    .Set(CSDB_ConnectionParam::ePasswordFile, m_PwFile)
    .Set(CSDB_ConnectionParam::eService,      m_Service)
    .Set(CSDB_ConnectionParam::eDatabase,     m_DbName);
```

#### As Entries in Configuration Files
The service name must be set directly in the application, but the other connection parameters may be set in the appplication configuration file in the section corresponding to the service name (with `.dbservice` appended). For example, for the service name "MyService":

```
[MyService.dbservice]
username=myname 
password_file=myapp.pw
database=mydb
```
***Note:*** It is possible to include a service entry in the `[*.dbservice]` section. However, SDBAPI will not look in the section corresponding to the new name for database connection parameters. Rather, this is just a mechanism to replace a hard-coded service name.

#### As Environment Variables
Environment variables may be used instead of configuration files, for example, the environment variable assignment:
```
export NCBI_CONFIG__MYSERVICE_DOT_DBSERVICE__DATABASE=mydb
```
(note the double underscores and the `_DOT_` instead of a literal full stop character) has the same effect as the following configuration file entry:
```
[myservice.dbservice]
database=mydb
```


After making the connection, it is recommended to set the connection session parameters, for example:

    string sql("SET ANSI_NULLS ON\n"
               "SET ANSI_PADDING ON\n"
               "SET ANSI_WARNINGS ON\n"
               "SET ARITHABORT ON\n"
               "SET CONCAT_NULL_YIELDS_NULL ON\n"
               "SET QUOTED_IDENTIFIER ON\n"
               "SET NUMERIC_ROUNDABORT OFF");
    CQuery query = m_Db.NewQuery(sql);
    query.Execute();

It may also be appropriate to set, `TEXTSIZE`, depending on your project.

***Note:*** when pooling is used it is the user responsibility to keep the connections
in a proper state (see [Connection Pooling](#ch_dbapi.Connection_Pooling) for more details). In particular the connection settings are ***not*** reset when a connection is returned to the pool.

***Note:*** when a new connection to an MS SQL Server is created the **`SET XACT_ABORT ON`** option is sent to the server automatically (for more information about the option see the Microsoft [documentation](https://msdn.microsoft.com/en-us/library/ms188792(v=sql.100).aspx)). Whether or not this option is sent is controlled using an environment variable or a configuration file parameter (see [DBAPI configuration parameters reference](ch_libconfig.html#ch_libconfig.DBAPI)). The Sybase servers do not support this option so it will not be sent to them.

<a name="ch_dbapi.Executing_Basic_Queries"></a>

### Executing Basic Queries

Once a [connection](#ch_dbapi.Connections) is established, executing a basic query can be as simple as:

    CQuery query = m_Db.NewQuery("your SQL statement goes here");
    query.Execute();

***Note:*** There are security factors to be considered when executing queries. See the [security section](#ch_dbapi.Security), and use the following guidelines when deciding which method to use:

1.  If stored procuedures can be used, then use them. This increases both security and performance. Plus, this practice could facilitate testing and documentation.

2.  Otherwise, if the SQL statement does not depend on dynamic values, then use static SQL.

3.  Otherwise, if parameterized SQL can be used, then use it.

4.  Otherwise, as a last resort, use dynamic SQL. If user-supplied data is used to construct the statement, then you **MUST** sanitize the user-supplied data. Even if the data does not come from an outside user, it's still a good idea to sanitize all dynamic data unless there's a compelling reason not to, in which case that fact should be prominently documented in comments adjacent to the dynamic SQL creation code. See the [Security FAQ](ch_faq.html#ch_faq.Security) for more information.

<a name="ch_dbapi.Stored_Procedures_and_Parameter"></a>

### Stored Procedures and Parameters

The following settings should be made before executing a store procedure:

<a name="ch_dbapi.T.nc_ansi_nullsonansi_paddingon"></a>

|---------------------------|-------|
| `ANSI_NULLS`              | `ON`  |
| `ANSI_PADDING`            | `ON`  |
| `ANSI_WARNINGS`           | `ON`  |
| `ARITHABORT`              | `ON`  |
| `CONCAT_NULL_YIELDS_NULL` | `ON`  |
| `QUOTED_IDENTIFIER`       | `ON`  |
| `NUMERIC_ROUNDABORT`      | `OFF` |

<div class="table-scroll"></div>

It may also be appropriate to set, `TEXTSIZE`, depending on your project.

Note that **`ANSI_NULLS`** and **`QUOTED_IDENTIFIER`** must be set when the stored procedure is created because they can't be changed at run-time. The other settings can be changed at run-time but typically they're not, so it's efficient to set them when the [connection](#ch_dbapi.Connections) is created.

For input parameters, simply pass the name and value to [SetParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetParameter); for input/output parameters, also pass the database field type and the value **`eSP_InOut`**; for `NULL` parameters call [SetNullParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetNullParameter). For example:

    // input only
    query.SetParameter("@id", 123);
    query.SetNullParameter("@create_time", eSDB_DateTime);

    // input/output
    query.SetParameter("@tolower", "aBcD", eSDB_String, eSP_InOut); 
    query.SetNullParameter("@result", eSDB_Int, eSP_InOut);

The stored procedure is invoked by calling [ExecuteSP()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ExecuteSP):

    CQuery query = m_Db.NewQuery();
    query.SetParameter("@max_id", 5);
    query.ExecuteSP(proc_name);

<a name="ch_dbapi.Retrieving_Results"></a>

### Retrieving Results

It's best to reference columns by name, unless there's some compelling reason not to, because referencing columns by index is less maintanable. ***Note:*** For the Toolkit database APIs, array-like indexes are 1-based, not 0-based. In other words, ***operator[]()*** starts at one for rows and columns.

For simple queries or stored procedures that return a single result set:

    query.ExecuteSP(sproc_name);
    for (const auto& row: query.SingleSet()) {
        NcbiCout << row["release_id"].AsInt4() << NcbiEndl;
        // or, if there's a reason not to use column names
        NcbiCout << row[1].AsInt4() << NcbiEndl;
    }

For stored procedures that return multiple result sets, SDBAPI supports two behavioral modes: either merging all result sets into one - chosen by calling `query.SingleSet()` - or returning them separately - chosen by calling `query.MultiSet()`. If neither [SingleSet()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SingleSet) nor [MultiSet()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MultiSet) is called, then SDBAPI chooses a default mode. The default was formerly MultiSet mode, but it has been switched to SingleSet mode with the release stable components 15.

Retrieving multiple result sets in SingleSet mode is accomplished exactly as if there was only one result set, as shown above. To retrieve multiple result sets in MultiSet mode, use `query.HasMoreResultSets()`:

    while (query.HasMoreResultSets()) {
        for (const auto& row: query) {
            // do something with the current result set row
        }
    }

It is possible to verify that all data rows have been read, by using [VerifyDone()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=VerifyDone):

    for (const auto& row: query) {
        // do something with the current result set row
    }
    query.VerifyDone(); // throws if any rows remain unread

Similarly, if a certain number or range of rows is expected, you can verify that the total number of rows matches the expected number or range (with no rows remaining):

    query.RequireRowCount(5);                // e.g. "expect exactly five rows";
    query.RequireRowCount(100, kMax_Auto);   // or, "expect at least one hundred rows"
    for (const auto& row: query) {
        // do something with the current result set row
    }
    query.VerifyDone(); // throws if the expected number of rows wasn't retrieved

***Note:*** [VerifyDone()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=VerifyDone) is not a simple, read-only informational method. In its quest to determine if any result sets or rows remain unread, it will read and purge any unread rows. Furthermore, it doesn't return ***bool*** to indicate whether all expected records have been read. Instead, it throws an exception (after reading and purging) if all records had not been read prior to its call, or if the number of read rows was unexpected per [RequireRowCount()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RequireRowCount).

<a name="ch_dbapi.Getting_a_Stored_Procedure_Retu"></a>

### Getting a Stored Procedure Return Value

To get the return value from a stored procedure, simply call [GetStatus()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetStatus).

<a name="ch_dbapi.MetaData_Accessors"></a>

### Meta-Data Accessors

A handful of accessors are available for query meta-data:

-   [GetColumnName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetColumnName) -- Gets the name of the given column in the current result set.

-   [GetColumnType()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetColumnType) -- Gets the type of the given column in the current result set.

-   [GetRowCount()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetRowCount) -- Gets the number of rows read after a statement is executed.

-   [GetStatus()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetStatus) -- Gets the value returned from a stored procedure.

-   [GetTotalColumns()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetTotalColumns) -- Gets the number of columns in the current result set.

***Note:*** These accessors are intended to be used after retrieving the results - they will result in exceptions if called before all data is read. The API doesn't include any accessors for the same information prior to reading the data.

<a name="ch_dbapi.Working_with_NULL"></a>

### Working with NULL

SDBAPI, as a "simple" database API, does not provide a separate `NULL` value. To set an input parameter to `NULL`:

    query.SetNullParameter("@some_param", eSDB_Int);

To determine if a output parameter result is `NULL`:, call [IsNull()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsNull):

    for (const auto& row: query) {
        if (row["id"].IsNull()) {
            // handle NULL
        } else {
            x = row["id"].AsInt4(); // OK to use the converted value
        }

***Note:*** The ***As\*()*** methods will return default values (e.g. zero or an empty string) when the actual result value is `NULL`. The only way to know if a `NULL` result was converted is to call [IsNull()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsNull). Therefore, if you need to distinguish between `NULL` and default values, you **must** call [IsNull()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsNull).

<a name="ch_dbapi.Parameterized_SQL"></a>

### Parameterized SQL

Similarly to stored procedures parameters could be used for regular SQL statements. In case of parameterized SQL methods [SetParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetParameter) and [SetNullParameter()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetNullParameter) are to be used. For example:

    string    sql = "INSERT INTO MyTable (int_field, str_field) VALUES(@int_val, @str_val)";
    query.SetSql(sql);
    for (long  i = 0; i < 100; ++i) {
        if (i % 2 == 0) {
            query.SetParameter("@int_val", Int4(i));
            query.SetNullParameter("@str_val", eSDB_String);
        } else {
            query.SetNullParameter("@int_val", eSDB_Int4);
            query.SetParameter("@str_val", string());
        }

        query.Execute();
        query.RequireRowCount(0);
        query.VerifyDone(CQuery::eAllResultSets);
    }

In this example a parameterized SQL statement is prepared once and then it is executed in a loop with assigning different values to the parameters.

<a name="ch_dbapi.Using_Transactions"></a>

### Using Transactions

SDBAPI does not provide any special API support for transactions, so simply run, for example:

    m_Db.NewQuery("BEGIN TRAN").Execute();

<a name="ch_dbapi.Using_Cursors"></a>
### Using Cursors

SDBAPI does not support cursors. If you need cursors, you must use [DBAPI](#ch_dbapi.dbapi_user_layer).

<a name="ch_dbapi.Connection_Pooling"></a>
### Connection Pooling

Connection pooling is supported by both SDBAPI and DBAPI.

Basically, connection pooling may help to reduce an overhead associated with opening a new connection. If pooling is switched on and a connection is closed then it will be returned to the pool instead of the real close. When a new connection is requested later, SDBAPI/DBAPI will be able to reuse an already opened connection.

#### Connection Pooling Configurable Parameters

Parameters specific to connection pooling can be provided in a configuration file or via environment variables. The parameters are expected to be in a service specific sections and the section names are formed as `[<service name>.dbservice]`. In place of a service name a server name could also be used.

***Note:*** the `[<service name>.dbservice]` sections may have additional parameters not directly related to connection pooling and those parameters are not described here.

| Name                          | Description |
|-------------------------------|-------------|
| use_conn_pool                 | true if connection pool is required |
| service                       | Service name to be used | 
| conn_pool_name                | Explicit connection pool name if the default one is not good enough or already used elsewhere (pool names are discussed below)<br/>Default for SDBAPI: `<effective service name>.pool`<br/>The effective service name is the value of the service parameter from this section if provided or the service name used to find this section otherwise.<br/>Default for DBAPI: `<this section name>.pool` |
| conn_pool_minsize             | Connection pool minimum size<br/>The minimum number of connections maintained in the pool (also that many new connections get created when SDBAPI is initialized). If a connection could not be created -- the event gets logged but no exception gets raised.<br/>Default: 0 |
| conn_pool_maxsize             | Connection pool maximum size<br/>The maximum number of connections in the pool.<br/>If the number of used connections reached maximum when a new connection is requested then SDBAPI waits the time specified in the `conn_pool_wait_time parameter` if a vacant connection appears. If it does not appear within this timeout then the `conn_pool_allow_temp_overflow` parameter is analyzed. If allowed then a new connection is created.<br/>If no connection were created then an exception is generated for both DBAPI and SDBAPI.<br/>***Note:*** in case of DBAPI an exception is generated regardless of the error handler. The error handler is not called at all in case of this exception.<br/>Default: unlimited. |
| conn_pool_idle_time           | Connection pool idle time<br/>If a connection stays open and is not used within the specified timeout then it will be closed (respecting the minimum pool size setting). By default, a connection may stay open forever.<br/>Default: -1.0 (double, seconds). Negative means ‘never’. |
| conn_pool_wait_time           | Connection pool wait time<br/>Timeout in seconds which is used to wait for a vacant connection when the number of used connections reached maximum and a new connection is requested.<br/>Default: 0.0 (double, seconds) |
| conn_pool_allow_temp_overflow | true if the connection pool allows temporary overflow.<br/>Used when the number of used connections in the pool reached maximum and there were no available connections within the configured timeout.<br/>Default: false |
| conn_pool_max_conn_use        | Maximum number of times a pooled connection is used before it is automatically closed.<br/>Default: 0 (unsigned integer, 0 means unlimited) |
| database                      | Database name.<br/>If provided then it overrides corresponding argument values in the C++ code. |
| username                      | User name.<br/>If provided then it overrides corresponding argument values in the C++ code. |
| password                      | Password.<br/>If provided then it overrides corresponding argument values in the C++ code. |

#### Configuring Connection Pooling in SDBAPI

To configure connection pooling in SDBAPI a configuration file must be supplied. Configuring connection pooling using a URL-like string is not supported.

Connection pooling configuration is service name based. A service name can be supplied via a URL-like string or using the `CSDB_ConfigurationParam::Set()` method. Here is an example of how it could be done:
```
...
string    username = "me";
string    password = "...";
string    database = "db";
string    service = "srv";

// Option 1: using a URL-like string
string    url = "dbapi://" + username + ":" + password + "@" + service + "/" + database;
CSDB_ConnectionParam  params(url);
CDatabase  db(params);
db.Connect();

// Option 2:  using Set() method
CSDB_ConnectionParam    params1;
params1.Set(CSDB_ConnectionParam::eUsername, username)
       .Set(CSDB_ConnectionParam::ePassword, password)
       .Set(CSDB_ConnectionParam::eService,  service)
       .Set(CSDB_ConnectionParam::eDatabase, database);
CDatabase    db1(params1);
db1.Connect();

// Option 3: shortcut: using a service name; 
//           all the other parameters should come from a configuration file
CDatabase    db2(service);
db2.Connect();
```

To configure connection pooling the configuration file must have a section called `[<service name>.dbservice]` so for the example above it will be `[srv.dbservice]`. See the available parameters in the “Connection Pooling Configurable Parameters” section.

Obviously, an application may create as many pools as required providing different service names in the C++ code and supplying appropriate sections in the configuration file.

#### Configuring Connection Pooling in DBAPI

To configure connection pooling in DBAPI a configuration file must be supplied.

Connection pooling configuration is service name based. The service name can be supplied as one of the parameters when a connection is created. Here is an example of how it could be done:
```
...
string    username = "me";
string    password = "...";
string    database = "db";
string    service = "srv";

DBLB_INSTALL_DEFAULT();
DBAPI_RegisterDriver_FTDS();

CDriverManager &   dm(CDriverManager::GetInstance());
IDataSource *      m_Ds = dm.CreateDs("ftds");
I_DriverContext *  drv_context = m_Ds->GetDriverContext();

CDB_Connection *   conn = drv_context->Connect(service, username, password, 0, true);

// This returns the connection to the pool.
// Later, this connection will be provided in response to the Connect() call.
delete conn;
```

#### Connection Pool Names

Some applications may need more than one connection pool. For example, one pool of connections may hold connections to one group of SQL servers while the other pool holds connections to a distinct set of SQL servers.

To support this feature pool names are introduced and they are supported by both SDBAPI and DBAPI.

In case of SDBAPI a connection pool name can be provided only using a configuration file. So, to benefit from having multiple connection pools the following needs to be done:
* the C++ code should use different service names when instances of `CDatabase` class are created
* the application configuration file should have corresponding `[<service>.dbservice]` sections
* each of the `[<service>.dbservice]` sections should supply a distinct explicit pool name in the `conn_pool_name` parameter

In case of DBAPI two options are available. The first is to use the same approach as described for SDBAPI, i.e. to use distinctive service names and to provide an appropriate configuration for them. The second option is not to provide an explicit connection pool name in the configuration but supply it as one of the arguments of the Connect() call, e.g.
```
...
// Creates a connection in the pool called ConnPoolA
CDB_Connection *   conn = drv_context->Connect(service, username, password, 0, true, "ConnPoolA");

// Creates a connection in the pool called ConnPoolB
CDB_Connection *   conn = drv_context->Connect(service, username, password, 0, true, "ConnPoolB");
...
```

#### Caveats

Using connection pooling may lead to an undesirable behavior in some circumstances. This is mostly related to data which an SQL server associates with a session.

There are resources which are discarded (or reset) by the server when a session is over. Here is list of session associated resources related to pooled connections (which is possibly incomplete):
* session lifespan application locks
* temporary tables
* connection settings

To illustrate potential problems let’s compare two scenarios with and without connection pooling used.

Suppose that a connection is created and then a stored procedure is invoked. The stored procedure creates an application lock with a session lifespan. Then an error happens in the stored procedure and due to an incorrect handling of the error the lock is not released. Now the further application behavior depends on whether connection pooling is used:
* If pooling is not used then the application most probably will continue working as expected. The connection will be closed and the server will release the lock allowing to acquire it later successfully.
* If pooling is used then the application most probably will get stuck. The connection will stay opened and will be returned to the pool. Consequently, the application lock will be kept locked. The further tries to acquire the lock will fail.

In case of temporary tables, the obvious problem is memory consumption if tables are not explicitly dropped. Those tables are deleted automatically only when a connection is closed. Also, if the same names for temporary tables are repeatedly used then there could be name clash error. A certain piece of code may expect to have a virgin connection with no leftovers and try to create the same name table unconditionally.

The connection settings are not reset either when a connection is returned to the pool. This may cause unexpected behavior too.
Developers are encouraged to exercise caution especially in the cases when an application was developed and debugged without connection pooling and then pooling is switched on.

***Note:*** there is no problem with not closed transactions. They will be automatically rolled back when a connection is returned to the pool.

#### Unread Data in a Pooled Connection

In case of pooled connections, the following scenario may happen.

A connection may have been used to retrieve some data from an SQL server. Then, e.g. due to an error in the C++ code, some result sets may be neither read nor discarded but the connection stays open and returned to the pool. Later this connection can be used by the other part of the code to retrieve more data.

In both SDBAPI and DBAPI cases the connection stays usable however there a slight difference.

In case of SDBAPI, a `CQuery` instance is typically destroyed automatically (because it is usually created on a stack). When `CQuery` is destructed and there are some unread data an error will be logged and the unread data are discarded.

In case of DBAPI the unread data are silently discarded.

#### Multithreaded Usage of Pooled Connections in SDBAPI

One of the options is to build a multithreaded application around a `CDatabase::Clone()` call. Such an application creates an application level `CDatabase` instance with appropriate parameters as described above. When the other threads need to have access to the database they would call the `Clone()` method to have an independent instance of the `CDatabase` class. The cloned `CDatabase` can be used further to execute stored procedures etc.

Here is a brief example.
```
...
string    service = "srv";

...
// Memorize a ‘master’ instance of the CDatabase class somewhere
...
CDatabase *    m_Db;

...
m_Db = new CDatabase(service);
m_Db->Connect();

...

// Other threads may do the Clone() calls as needed. There is no need to call CDatabase::Connect()
// It is thread safe to call CDatabase::Clone()
CDatabase    db = m_Db->Clone();
CQuery       query = db.NewQuery("select serverproperty('servername')");

query.Execute();
cout << "connected to " << query.begin()[1].AsString() << endl;
...
```

This approach supposes that the `conn_pool_maxsize` parameter is set to 2 or more. One connection is kept by the commonly used instance of the `CDatabase` class. The ‘master’ instance could be conveniently used to monitor and restore a connection in server applications when an SQL server lifetime may be shorter than the application one and restoring a connection is required. An example of the server which uses a separate thread for restoring a connection is in the C++ Toolkit trunk: c++/src/app/netstorage.

Another approach is to build an application around independently created instances of the `CDatabase` class. In this case there is no need to memorize a master instance of the `CDatabase` class. Instead appropriate parameters must be supplied by each thread which accesses a database. To benefit from connection pooling the parameters must be supplied so that the connection pool name matches between the threads.

Here is an example.
```
...
string    service = "srv";

...

// Each thread needs to create a separate instance of CDatabase and call Connect()
CDatabase    db(service);
db.Connect();

CQuery       query = db.NewQuery("select serverproperty('servername')");

query.Execute();
cout << "connected to " << query.begin()[1].AsString() << endl;
...
```

This option has no overhead of one not really used connection but it needs to be careful with parameters supplied in the `CDatabase` constructor.



<a name="ch_dbapi.Database_Mirroring_Support"></a>
### Database Mirroring Support

SDBAPI supports database mirroring. Only high-safety mirroring mode is supported. In most of the cases NCBI uses a mirroring configuration with a witness. Basically this means that the setups support an automatic failover. For more information about database mirroring see [Microsoft documentation](https://msdn.microsoft.com/en-us/library/ms189852(v=sql.105).aspx).

<a name="ch_dbapi.Overall_Application_Structure"></a>

#### Overall Application Structure

An application which needs DB mirroring should meet the following requirements:

- A DB mirror configuration needs to be provided in a configuration file (described below).
- The `CSDBAPI::UpdateMirror()` static function needs to be called periodically, e.g. every 60 seconds. The function will update the mirror’s current state and report what was done.
- The data access is provided via the usual `CDatabase` object which is created using a database service name.

Typically the `UpdateMirror()` function would be called in a separate thread while the other working threads would be not bothered by the details related to the DB mirror. Also it is recommended to call `UpdateMirror()` before the first access to data. In this case the most up to date mirror state will be at hand when the data are accessed.

<a name="ch_dbapi.Configuration_File"></a>

#### Configuration File

The service name `MyMirroredService` is used here and further to make the examples more specific. Certainly, your application would need a load balancer setup (this setup is not covered here). As a result of the setup process you will, in particular, have a service name.
The application code should use the following way of instantiating the `CDatabase` object:

```
CDatabase    my_db(“MyMirroredService”);
```

When the `my_db` instance is created the SDBAPI searches in the configuration file a section named as follows:

```
[MyMirroredService.dbservice]
```

The fixed suffix ".dbservice" is added to the service name to form the section name.
The table below describes the values recognized in this section. The section parameters override the values provided in the URL-like string if so.

| Name                           | Description |
|--------------------------------|-------------|
| `username`                       | clear text user name |
| `password`                       | clear text password |
| `service`                        | LBSM service name if not matches the service name provided in the code |
| `port`                           | DB server's port (when not using an alias or named service) |
| `database`                       | database name |
| `args`                           | catch-all for any other parameters |
| `login_timeout`                  | individual server login timeout |
| `io_timeout`                     | communication timeout |
| `exclusive_server`               | it must be true for the mirrored configurations |
| `use_conn_pool`                  | true if connection pool is required |
| `conn_pool_name`                 | explicit connection pool name if the default one is not good enough or already used elsewhere |
| `conn_pool_minsize`              | connection pool minimum size |
| `conn_pool_maxsize`              | connection pool maximum size |
| `conn_pool_idle_time`            | connection pool idle time |
| `conn_pool_wait_time`            | connection pool wait time |
| `conn_pool_allow_temp_overflow`  | true if the connection pool allows temporary overflow |
| `continue_after_raiserror`       | true if should continue after raiserror |
| `password_file`                  | path to the password file |
| `password_key`                   | key to decrypt the password |

**Note**: an application configuration file may also have the `db_connection_factory` section, e.g.
```
[db_connection_factory]
connection_timeout=...
login_timeout=...
```

An important detail here is that (if specified) `db_connection_factory` values will override the corresponding values from the `MyMirroredService.dbservice` section. `[db_connection_factory]/connection_timout` will override `[MyMirroredService.dbservice]/io_timeout`. `[db_connection_factory]/login_timeout` will override `[MyMirroredService.dbservice]/login_timeout`.

<a name="ch_dbapi.UpdateMirror"></a>

#### UpdateMirror()

As it was mentioned above this static member function checks the mirror state and memorizes it. The function accepts up to three arguments: a mandatory service name, an optional pointer to the container which will be populated with the DB servers (master is always first) and an optional pointer to the string where an error message is provided if so. The return value is an enumeration `SDBAPI::EMirrorStatus` which tells what was done:

| Return value        | Description |
|---------------------|-------------|
| eMirror_Steady      | Mirror is working on the same server as before |
| eMirror_NewMaster   | Switched to a new master |
| eMirror_Unavailable | All databases in the mirror are unavailable |

Here is an example:
```
string                  errMsg;
list<string>            servers;
CSDBAPI::EMirrorStatus  status = CSDBAPI::UpdateMirror("MyMirroredService", &servers, &errMsg);
```

The `UpdateMirror()` will use the provided service name to read the configuration from the same section as the `CDatabase` instance.

If the master is switched then all connections to the previous master will be invalidated and the user code will need to reconnect to the new master.

<a name="ch_dbapi.Basic_Example"></a>
#### Basic Example

The example omits many details like include files, how to stop the threads, error handling to keep it short. Also the example supposes a properly formed configuration file.

```
class CMyThread : public CThread
{
    public:
        CMyThread(const string &  service) : m_Service(service)
        {}

        virtual void* Main(void) {
            SleepMilliSec(1000);
            for (;;) {
                try {
                    CDatabase       db(m_Service);
                    db.Connect();

                    CQuery          q = db.NewQuery("select serverproperty('servername')");
                    q.Execute();
                    cerr << "connected to " << q.begin()[1].AsString() << endl;

                    // Drop the table if it exists
                    try {
                        q.SetSql("drop table #t");
                        q.Execute();
                    } catch (...) {}

                    q.SetSql("create table #t (tt varchar(100))");
                    q.Execute();
                    q.SetSql("insert into #t values (@tt)");
                    for (int i = 0; i < 500; ++i) {
                        q.SetParameter("@tt", i, eSDB_String);
                        q.Execute();
                    }

                } catch (const exception &  ex) {
                    cerr << "Error from SDBAPI: " << ex.what() << endl;
                }
                SleepMilliSec(10000);
            }
            return NULL;
        }

    private:
        string      m_Service;
};

class CMirrorApp : public CNcbiApplication
{
private:
    virtual void Init(void);
    virtual int  Run(void);
    void ParseArgs(void);

    string  m_Service;  // Command-line options
};


void CMirrorApp::Init(void)
{
    CArgDescriptions* argdesc = new CArgDescriptions();
    argdesc->SetUsageContext(GetArguments().GetProgramBasename(),
                             "SDBAPI mirrored DB access demo");

    argdesc->AddPositional("service", "Service name",
                           CArgDescriptions::eString);
    SetupArgDescriptions(argdesc);
}

int CMirrorApp::Run(void)
{
    ParseArgs();

    const size_t        thread_count = 3;
    CMyThread*          thr[thread_count];
    for (size_t i = 0; i < thread_count; ++i) {
        thr[i] = new CMyThread(m_Service);
        thr[i]->Run();
    }

    for (;;) {
        string                  errMsg;
        list<string>            servers;

        CSDBAPI::EMirrorStatus  status = CSDBAPI::UpdateMirror(m_Service, &servers, &errMsg);

        if(status == CSDBAPI::eMirror_Unavailable)
            cerr << "SQL mirror check failed, error: " << errMsg << endl;
        else if(status == CSDBAPI::eMirror_NewMaster)
            cerr << "Master server has been switched. New master: "
                 << (servers.empty() ? kEmptyStr : servers.front()) << endl;
        else if(status != CSDBAPI::eMirror_Steady)
            cerr << "Unknown mirror status." << endl;

        SleepMilliSec(60000);
    }

    for (size_t i = 0; i < thread_count; ++i) {
        thr[i]->Join();
    }
    return 0;
}

void CMirrorApp::ParseArgs(void)
{
    const CArgs& args = GetArgs();
    m_Service = args["service"].AsString();
}

int NcbiSys_main(int argc, ncbi::TXChar* argv[])
{
    return CMirrorApp().AppMain(argc, argv);
}
```

In the example above the main thread creates 3 working threads and each of them starts in 1 second populating data every 10 seconds. The delay is required to give a chance to complete the very first call of the `UpdateMirror()` which is done in the main thread. An exception will be generated in the data populating thread if a master server is switched. The next call of the `UpdateMirror()` will set up the new master and the working threads will be able to populate data in the next iteration.

In the example the service name comes from the command line arguments.


<a name="ch_dbapi.The_DBAPI_Library"></a>

The DBAPI Library
-----------------

<a name="ch_dbapi.dbapi_user_layer"></a>

### DBAPI User-Layer Reference

<a name="ch_dbapi.dbapi_overview"></a>

#### DBAPI Overview

DBAPI is a consistent, object-oriented programming interface to multiple back-end databases. It encapsulates leading relational database vendors' APIs and is universal for all applications regardless of which database is used. It frees developers from dealing with the low-level details of a particular database vendor's API, allowing them to concentrate on domain-specific issues and build appropriate data models. It allows developers to write programs that are reusable with many different types of relational databases and to drill down to the native database APIs for added control when needed.

DBAPI has open SQL interface. It takes advantage of database-specific features to maximize performance and allows tight control over statements and their binding and execution semantics.

DBAPI has "Native" Access Modules for Sybase, Microsoft SQL Server, SQLITE, and ODBC. It provides native, high-performance implementations for supported vendor databases. It allows porting to other databases with minimal code changes.

DBAPI is split into low-layer and user-layer.

In addition, a simplified C++ API ([SDBAPI](#ch_dbapi.Simple_Database_Access_via_C)) layer is provided for cases where the full DBAPI feature set is not required.

See the [DBAPI configuration parameters reference](ch_libconfig.html#ch_libconfig.DBAPI) for details on configuring the DBAPI library.

See the DBAPI sample programs for example code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/>

The following sections cover specific aspects of DBAPI in detail.

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

<a name="ch_dbapi.dbapi_obj_hierarchy"></a>

#### Object Hierarchy

See [Figure 1](#ch_dbapi.F1).

<a name="ch_dbapi.F1"></a>

[![Figure 1. Object Hierarchy](/cxx-toolkit/static/img/dbapi_user.gif)](/cxx-toolkit/static/img/dbapi_user.gif "Click to see the full-resolution image")

Figure 1. Object Hierarchy

<a name="ch_dbapi.dbapi_includes"></a>

#### Includes

For most purposes it is sufficient to include one file in the user source file: `dbapi.hpp`.

    #include <dbapi/dbapi.hpp>

For static linkage the following include file is also necessary:

    #include <dbapi/driver/drivers.hpp>

<a name="ch_dbapi.dbapi_objects"></a>

#### Objects

All objects are returned as pointers to their respective interfaces. The null (0) value is valid, meaning that no object was returned.

<a name="ch_dbapi.dbapi_obj_lifecycle"></a>

#### Object Life Cycle

In general, any child object is valid only in the scope of its parent object. This is because most of the objects share the same internal structures. There is no need to delete every object explicitly, as all created objects will be deleted upon program exit. Specifically, all objects are managed by the static [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDriverManager) object, and will be destroyed when [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDriverManager) is destroyed. It is possible to delete any object from the framework and it is deleted along with all derived objects. For example, when an [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIConnection.html) object is deleted, all derived [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html), [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html) and [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html) objects will be deleted too. If the number of the objects (for instance [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)) is very high, it is recommended to delete them explicitly or enclose in the ***auto\_ptr\<...\>*** template. For each object a [Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Close) method is provided. It disposes of internal resources, required for the proper library cleanup, but leaves the framework intact. After calling [Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Close) the object becomes invalid. This method may be necessary when the database cleanup and framework cleanup are performed in different places of the code.

<a name="ch_dbapi.dbapi_variant"></a>

#### CVariant Type

The [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) type is used to represent any database data type (except BLOBs). It is an object, not a pointer, so it behaves like a primitive C++ type. Basic comparison operators are supported (==, !=, \< ) for identical internal types. If types are not identical, [CVariantException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariantException.html) is thrown. [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) has a set of getters to extract a value of a particular type, e.g. [GetInt4()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetInt4), [GetByte()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetByte), [GetString()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetString), etc. If [GetString()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetString) is called for a different type, like [DateTime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DateTime) or ***integer*** it tries to convert it to a string. If it doesn't succeed, [CVariantException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariantException.html) is thrown. There is a set of factory methods (static functions) for creating [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) objects of a particular type, such as [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant)::[BigInt()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BigInt), [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant)::[SmallDateTime()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SmallDateTime), [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CVariant)::[VarBinary()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=VarBinary) etc. For more details please see the comments in [variant.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/dbapi/variant.hpp) file.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_object.cpp>

<a name="ch_dbapi.dbapi_choose_driver"></a>

#### Choosing the Driver

There are two drivers for working with different SQL servers on different platforms. The ones presently implemented are "`ftds`" (MS SQL, Sybase, cross platform) and "`ctlib`" (Sybase). For static linkage these drivers should be registered manually; for dynamic linkage this is not necessary. The [CDriverManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDriverManager.html) object maintains all registered drivers. Manual registration is done with the RegisterDriver functions:

    DBAPI_RegisterDriver_FTDS();
    DBAPI_RegisterDriver_CTLIB();

***Note:*** FTDS is the primary driver and should be used unless there's a very specific reason why CTLIB must be used. Also, CTLIB is limited to Linux and Solaris connecting to Sybase.

As of July, 2014, there were a couple of issues with FTDS to be aware of:

-   When using FTDS to connect to SQL Server, there are some limitations in updating LOB-fields which participate in replication.

-   When using FTDS to connect to Sybase Open Server, you must explicitly set TDS version to 5.0, otherwise the connect operation will hang. Also, explicitly configuring the packet size setting to 3584 (7 \* 512) has historically been helpful.

More details on [recommended drivers](https://confluence.ncbi.nlm.nih.gov/display/CT/Recommended+DBAPI+drivers) are available to users inside NCBI.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_context.cpp>

<a name="ch_dbapi.dbapi_src_cnxns"></a>

#### Data Source and Connections

The [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIDataSource.html) interface defines the database platform. To create an object implementing this interface, use the method ***CreateDs(const string& driver)***. An [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIDataSource.html) can create objects represented by an [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIConnection.html) interface, which is responsible for the connection to the database. It is highly recommended to specify the database name as an argument to the [CreateConnection()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateConnection) method, or use the [SetDatabase()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDatabase) method of a [CConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCConnection.html) object instead of using a regular SQL statement. In the latter case, the library won't be able to track the current database.

Note: when a new connection to an MS SQL Server is created the **`SET XACT_ABORT ON`** option is sent to the server automatically (for more information about the option see the Microsoft [documentation](https://msdn.microsoft.com/en-us/library/ms188792(v=sql.100).aspx)). Whether or not this option is sent is controlled using an environment variable or a configuration file parameter (see [DBAPI configuration parameters reference](ch_libconfig.html#ch_libconfig.DBAPI)). The Sybase servers do not support this option so it will not be sent to them.

    IDataSource *ds = dm.CreateDs("ctlib");
    IConnection *conn = ds->CreateConnection();
    conn->Connect("user", "password", "server", "database");
    IStatement *stmt = conn->CreateStatement();

Every additional call to [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIConnection.html)***::CreateStatement()*** results in cloning the connection for each statement. These connections inherit the same default database, which was specified in the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) or [SetDatabase()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDatabase) method. Thus if the default database was changed by calling [SetDatabase()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDatabase), all subsequent cloned connections created by [CreateStatement()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateStatement) will inherit this particular default database.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/dbapi_simple.cpp>

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_connection.cpp>

<a name="ch_dbapi.dbapi_main_loop"></a>

#### Main Loop

The library simulates the main result-retrieving loop of the Sybase client library by using the [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html)***::HasMoreResults()*** method:

    stmt->Execute("select * from MyTable");
    while( stmt->HasMoreResults() ) {
        if( stmt->HasRows() ) {
            IResultSet *rs = stmt->GetResultset();

            // Retrieve results, if any

            while( rs->Next() ) {
                int col1 = rs->GetVariant(1).GetInt4();
                ...
            }
        }
    }

This method should be called until it returns `false`, which means that no more results are available. It returns as soon as a result is ready. The type of the result can be obtained by calling the [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::GetResultType()*** method. Supported result types are **`eDB_RowResult, eDB_ParamResult, eDB_ComputeResult, eDB_StatusResult, eDB_CursorResult`**. The method [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html)***::GetRowCount()*** returns the number of updated or deleted rows.

The [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html)***::ExecuteUpdate()*** method is used for SQL statements that do not return rows:

    stmt->ExecuteUpdate("update...");
    int rows = stmt->GetRowCount();

The method [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html)***::GetResultSet()*** returns an [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html) object. The method [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::Next()*** actually does the fetching, so it should be always called first. It returns `false` when no more fetch data is available. All column data, except Image and Text is represented by a single [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) object. The method [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::GetVariant()*** takes one parameter, the column number. Column numbers start with 1.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/dbapi_simple.cpp>

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_stmt.cpp>

<a name="ch_dbapi.dbapi_io_params"></a>

#### Input and Output Parameters

The method [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html)***::SetParam(const CVariant& v, const string& name)*** is used to pass parameters to stored procedures and dynamic SQL statements. To ensure the correct parameter type it is recommended to use [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) type factories (static methods) to create a [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) of the required internal type. There is no internal representation for the BIT parameter type, please use TinyInt of Int types with 0 for `false` and 1 for `true` respectively. Here are a few examples: [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::Int4(Int4 \*p)***, [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::TinyInt(UInt1 \*p)***, [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::VarChar(const char \*p, size\_t len )*** etc.

There are also corresponding constructors, like [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::CVariant(Int4 v)***, [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::CVariant(const string& s)***, ..., but the user must ensure the proper type conversion in the arguments, and not all internal types can be created using constructors.

Output parameters are set by the [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html)***::SetOutputParam(const CVariant& v, const string& name)*** method, where the first argument is a null [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) of a particular type, e.g. `SetOutputParam(CVariant(eDB_SmallInt),"@arg")`.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/dbapi_simple.cpp>

<a name="ch_dbapi.dbapi_stored_procs"></a>

#### Stored Procedures

The [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html) object is used for calling stored procedures. First get the object itself by calling [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIConnection.html)***::PrepareCall()***. Then set any parameters. If the parameter name is empty, the calls to [SetParam()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetParam) should be in the exact order of the actual parameters. Retrieve all results in the main loop. Get the status of the stored procedure using the [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html)***::GetReturnStatus()*** method.

    ICallableStatement *cstmt = conn->PrepareCall("ProcName");
    Uint1 byte = 1;
    cstmt->SetParam(CVariant("test"), "@test_input");
    cstmt->SetParam(CVariant::TinyInt(&byte), "@byte");
    cstmt->SetOutputParam(CVariant(eDB_Int), "@result");
    cstmt->Execute();
    while(cstmt->HasMoreResults()) {
        if( cstmt->HasRows() ) {
            IResultSet *rs = cstmt->GetResultSet();
            switch( rs->GetResultType() ) {
                case eDB_RowResult:
                    while(rs->Next()) {

                    // retrieve row results

                    }
                    break;
                case eDB_ParamResult:
                    while(rs->Next()) {

                    // Retrieve parameter row

                    }
                    break;
            }
        }
    }

    // Get status
    int status = cstmt->GetReturnStatus();

It is also possible to use [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html) interface to call stored procedures using standard SQL language call. The difference from [ICallableStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICallableStatement.html) is that there is no [SetOutputParam()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetOutputParam) call. The output parameter is passed with a regular [SetParam()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetParam) call having a *non-null* [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) argument. There is no [GetReturnStatus()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetReturnStatus) call in [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html), so use the result type filter to get it - although note that result sets with type `eDB_StatusResult` are not always guaranteed to be returned when using the [IStatement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIStatement.html) interface.

    sql = "exec SampleProc @id, @f, @o output";
    stmt->SetParam(CVariant(5), "@id");
    stmt->SetParam(CVariant::Float(&f), "@f");
    stmt->SetParam(CVariant(5), "@o");
    stmt->Execute(sql);
    while(stmt->HasMoreResults()) {
        IResultSet *rs = stmt->GetResultSet();

        if( rs == 0 )
            continue;

        switch( rs->GetResultType() ) {
        case eDB_ParamResult:
            while( rs->Next() ) {
                NcbiCout << "Output param: "
                         << rs->GetVariant(1).GetInt4()
                         << NcbiEndl;
            }
            break;
        case eDB_StatusResult:
            while( rs->Next() ) {
                NcbiCout << "Return status: "
                         << rs->GetVariant(1).GetInt4()
                         << NcbiEndl;
            }
            break;
        case eDB_RowResult:
            while( rs->Next() ) {
                if( rs->GetVariant(1).GetInt4() == 2121 ) {
                    NcbiCout << rs->GetVariant(2).GetString() << "|"
                             << rs->GetVariant(3).GetString() << "|"
                             << rs->GetVariant(4).GetString() << "|"
                             << rs->GetVariant(5).GetString() << "|"
                             << rs->GetVariant(6).GetString() << "|"
                             << rs->GetVariant(7).GetString() << "|"
                             << NcbiEndl;
                } else {
                    NcbiCout << rs->GetVariant(1).GetInt4() << "|"
                             << rs->GetVariant(2).GetFloat() << "|"
                             << rs->GetVariant("date_val").GetString() << "|"
                             << NcbiEndl;
                }
            }
            break;
        }
    }
    stmt->ClearParamList();

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/dbapi_simple.cpp>

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_proc.cpp>

<a name="ch_dbapi.dbapi_cursors"></a>

#### Cursors

The library currently supports basic cursor features such as setting parameters and cursor update and delete operations.

    ICursor *cur = conn->CreateCursor("table_cur",
                                      "select ... for update of ...");
    IResultSet *rs = cur->Open();
    while(rs->Next()) {
        cur->Update(table, sql_statement_for_update);
    }
    cur->Close();

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_cursor.cpp>

<a name="ch_dbapi.dbapi_wwblobs"></a>

#### Working with BLOBs

Due to the possibly very large size, reading and writing BLOBs requires special treatment. During the fetch the contents of the whole column must be read before advancing to the next one. That's why the columns of type IMAGE and TEXT are not bound to the corresponding variables in the resultset and all subsequent columns are not bound either. So it is recommended to put the BLOB columns at the end of the column list. There are several ways to read BLOBs, using [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::Read()***, [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::GetBlobIStream()***, and [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::GetBlobReader()*** methods. The first is the most efficient; it reads data into a supplied buffer until it returns 0 bytes read. The next call will read from the next column. The second method implements the STL istream interface. After each successful column read you should get another istream for the next column. The third implements the C++ Toolkit [IReader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IReader) interface. If the data size is small and double buffering is not a performance issue, the BLOB columns can be bound to [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) variables by calling [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::BindBlobToVariant(true)***. In this case the data should be read using [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::Read()*** and [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::GetBlobSize()***. To write BLOBs there are also several options. To pass a BLOB as a SQL parameter you should store it in a [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html) using [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::Append()*** and [CVariant](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCVariant.html)***::Truncate()*** methods. To store a BLOB in the database you should initialize this column first by writing a zero value (**`0x0`**) for an IMAGE type or a space value (`' '`) for a TEXT type. After that you can open a regular [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html) or [ICursor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICursor.html) and for each required row update the BLOB using [IResultSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIResultSet.html)***::GetBlobOStream()***. NOTE: this call opens an additional connection to the database.

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_lob.cpp>

<a name="ch_dbapi.dbapi_blobs"></a>

#### Updating BLOBs Using Cursors

It is recommended to update BLOBs using cursors, because no additional connections are opened and this is the only way to work with ODBC drivers.

    ICursor *blobCur = conn->CreateCursor("test",
                 "select id, blob from BlobSample for update of blob");
    IResultSet *blobRs = blobCur->Open();
    while(blobRs->Next()) {
        ostream& out = blobCur->GetBlobOStream(2, blob.size());
        out.write(buf, blob.size());
        out.flush();
    }

Note that [GetBlobOStream()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetBlobOStream) takes the column number as the first argument and this call is invalid until the cursor is open.

<a name="ch_dbapi.dbapi_bulk_insert"></a>

#### Using Bulk Insert

Bulk insert is useful when it is necessary to insert big amounts of data. The [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IConnection)::[CreateBulkInsert()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateBulkInsert) takes one parameter, the table name. The number of columns is determined by the number of [Bind()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Bind) calls. The ***CVariant::Truncate(size\_t len)*** method truncates the internal buffer of CDB\_Text and CDB\_Image object from the end of the buffer. If no parameter specified, it erases the whole buffer.

    NcbiCout << "Initializing BlobSample table..." << NcbiEndl;
    IBulkInsert *bi = conn->CreateBulkInsert(tbl_name);
    CVariant col1 = CVariant(eDB_Int);
    CVariant col2 = CVariant(eDB_Text);
    bi->Bind(1, &col1);
    bi->Bind(2, &col2);
    for(int i = 0; i < ROWCOUNT; ++i ) {
        string im = "BLOB data " + NStr::IntToString(i);
        col1 = i;
        col2.Truncate();
        col2.Append(im.c_str(), im.size());
        bi->AddRow();
    }
    bi->Complete();

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_bcp.cpp>

<a name="ch_dbapi.dbapi_diag"></a>

#### Diagnostic Messages

The DBAPI library is integrated with the C++ Toolkit diagnostic and tracing facility. By default all client and server messages are handled by the Toolkit's standard message handler. However it is possible to redirect the DBAPI-specific messages to a single [CDB\_MultiEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_MultiEx) object and retrieve them later at any time. There are two types of redirection, per data source and per connection. The redirection from a data source is enabled by calling [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource)::***SetLogStream(0)***. After the call all client- and context-specific messages will be stored in the [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource) object. The [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource)::[GetErrorInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetErrorInfo) method will return the string representation of all accumulated messages and clean up the storage. The [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource)::[GetErrorAsEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetErrorAsEx) will return a pointer to the underlying [CDB\_MultiEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_MultiEx) object. Retrieving information and cleaning up is left to the developer. Do NOT delete this object. The connection-specific redirection is controlled by calling ***IConnection::MsgToEx(boolean enable)*** method. This redirection is useful; for instance, to temporarily disable default messages from the database server. The [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IConnection)::[GetErrorInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetErrorInfo) and [IConnection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IConnection)::[GetErrorAsEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetErrorAsEx) methods work in the same manner as for the [IDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IDataSource)

Related sample code:

-   <https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/test/dbapi_unit_test_msg.cpp>

<a name="ch_dbapi.dbapi_trace"></a>

#### Trace Output

The DBAPI library uses the Toolkit-wide DIAG\_TRACE environment variable to do the debug output. To enable it set it to any value. If you have any problems with the DBAPI please include the trace output into your email.

<a name="ch_dbapi.dbapi_driver_ref"></a>

### DBAPI Driver Reference

The following sections cover low-level access to the various RDBMSs:

-   [Overview](#ch_dbapi.dbapi_drvr_overview)

-   [The driver architecture](#ch_dbapi.dbapi_drvr_arch)

-   [Sample program](#ch_dbapi.dbapi_sample_prog)

-   [Error handling](#ch_dbapi.dbapi_errors)

-   [Driver context and connections](#ch_dbapi.dbapi_context)

-   [Driver Manager](#ch_dbapi.dbapi_drvr_mgr)

-   [Text and Image Data Handling](#ch_dbapi.dbapi_txt_img)

-   [Results loop](#ch_dbapi.dbapi_results)

<a name="ch_dbapi.dbapi_drvr_overview"></a>

#### Overview

SDBAPI clients can only use [FreeTDS](#ch_dbapi.free_tds64), but DBAPI clients must choose the lower-level driver.

The NCBI DBAPI driver library describes and implements a set of objects needed to provide a uniform low-level access to the various relational database management systems (RDBMS). The basic driver functionality is the same as in most other RDBMS client APIs. It allows opening a connection to a server, executing a command (query) on this connection and getting the results back. The main advantage of using the driver is that you don't have to change your own upper-level code if you need to move from one RDBMS client API to another.

The driver can use two different methods to access the particular RDBMS. If the RDBMS provides a client library for the given computer system (e.g. Sun/Solaris), then the driver uses that library. If no such client library exists, then the driver connects to an RDBMS through a special gateway server which is running on a computer system where such a library does exist.

<a name="ch_dbapi.dbapi_drvr_arch"></a>

#### The driver architecture

There are two major groups of the driver's objects: the RDBMS-independent objects, and the objects which are specific to a particular RDBMS. The only RDBMS-specific object which user should be aware of is a "Driver Context". The "Driver Context" is effectively a "Connection" factory. The only way to make a connection to the server is to call the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method of a "Driver Context" object. So, before doing anything with an RDBMS, you need to create at least one driver context object. All driver contexts implement the same interface defined in [I\_DriverContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classI__DriverContext.html) class. If you are working on a library which could be used with more than one RDBMS, the driver context should not be created by the library. Instead, the library API should include a pointer to [I\_DriverContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=I_DriverContext&d=C) so an existing driver context can be passed in.

There is no "real" factory for driver contexts because it's not always possible to statically link the RDBMS libraries from different vendors into the same binary. Most of them are written in C and name collisions do exist. The [Driver Manager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=C_DriverMgr&d=C) helps to overcome this problem. It allows creating a mixture of statically linked and dynamically loaded drivers and using them together in one executable.

The driver context creates the connection which is RDBMS-specific, but before returning it to the caller it puts it into an RDBMS-independent "envelope", [CDB\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Connection.html). The same is true for the commands and for the results - the user gets the pointer to the RDBMS-independent "envelope object" instead of the real one. It is the caller's responsibility to delete those objects. The life spans of the real object and the envelope object are not necessarily the same.

Once you have the connection object, you could use it as a factory for the different types of commands. The command object in turn serves as a factory for the results. The connection is always single threaded, that means that you have to execute the commands and process their results sequentially one by one. If you need to execute the several commands in parallel, you can do it using multiple connections.

Another important part of the driver is error and message handling. There are two different mechanisms implemented. The first one is exceptions. All exceptions which could be thrown by the driver are inherited from the single base class [CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html). Drivers use the exception mechanism whenever possible, but in many cases the underlying client library uses callbacks or handlers to report error messages rather than throwing exceptions. The driver supplies a handler's stack mechanism to manage these cases.

To send and to receive the data through the driver you have to use the driver provided datatypes. The collection of the datatypes includes: [one](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__TinyInt.html), [two](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__SmallInt.html), [four](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Int.html) and [eight](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__BigInt.html) byte integers; [float](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Float.html) and [double](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Double.html); [numeric](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Numeric.html); [char](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Char.html), [varchar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__VarChar.html), [binary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Binary.html), [varbinary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__VarBinary.html); [datetime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__DateTime.html) and [smalldatetime](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__SmallDateTime.html); [text](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Text.html) and [image](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Image.html). All datatypes are derived from a single base class [CDB\_Object](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Object.html).

<a name="ch_dbapi.dbapi_sample_prog"></a>

#### Sample program

This program opens one connection to the server and selects the database names and the date when each database was created (assuming that table "sysdatabases" does exist). In this example the string "XXX" should be replaced with the real driver name.

    #include <iostream>
    #include <dbapi/driver/public.hpp>
    #include <dbapi/driver/exception.hpp>
    /* Here, XXXlib has to be replaced with the real name, e.g. "ctlib" */
    #include <dbapi/driver/XXXlib/interfaces.hpp>
    USING_NCBI_SCOPE;
    int main()
    {
        try { // to be sure that we are catching all driver related exceptions
            // We need to create a driver context first
            // In real program we have to replace CXXXContext with something real
            CXXXContext my_context;
            // connecting to server "MyServer"
            // with user name "my_user_name" and password "my_password"
            CDB_Connection* con = my_context.Connect("MyServer", "my_user_name",
                                                     "my_password", 0);
            // Preparing a SQL query
            CDB_LangCmd* lcmd =
                con->LangCmd("select name, crdate from sysdatabases");
            // Sending this query to a server
            lcmd->Send();
            CDB_Char dbname(64);
            CDB_DateTime crdate;
            // the result loop
            while(lcmd->HasMoreResults()) {
                CDB_Result* r= lcmd->Result();
                // skip all but row result
                if (r == 0  ||  r->ResultType() != eDB_RowResult) {
                    delete r;
                    continue;
                }
                // printing the names of selected columns
                NcbiCout << r->ItemName(0) << " \t\t\t"
                         << r->ItemName(1) << NcbiEndl;
                // fetching the rows
                while ( r->Fetch() ) {
                    r->GetItem(&dbname); // get the database name
                    r->GetItem(&crdate); // get the creation date
                    NcbiCout << dbname.Value() << ' '
                             << crdate.Value().AsString("M/D/Y h:m")
                             << NcbiEndl;
                }
                delete r; // we don't need this result anymore
            }
            delete lcmd; // delete the command
            delete con;  // delete the connection
        }
        catch (CDB_Exception& e) { // printing the error messages
            CDB_UserHandler_Stream myExHandler(&cerr);
            myExHandler.HandleIt(&e);
        }
    }

<a name="ch_dbapi.dbapi_errors"></a>

#### Error handling

Error handling is almost always a pain when you are working with an RDBMS because different systems implement different approaches. Depending on the system, you can get error messages through return codes, callbacks, handlers, and/or exceptions. These messages could have different formats. It could be just an integer (error code), a structure, or a set of callback's arguments. The NCBI DBAPI driver intercepts all those error messages in all different formats and converts them into various types of objects derived from [CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html).

[CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html) provides the following methods for all exceptions:

-   [GetDBErrCode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetDBErrCode) - returns the integer code for this message (assigned by SQL server).

-   ***SeverityString(void)*** - returns the severity string of this message (assigned by SQL server).

-   [GetErrCodeString()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetErrCodeString) - returns the name for this error code (e.g. "eSQL").

-   [Type()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Type) - returns the type value for this exception type (e.g. eSQL).

-   [TypeString()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TypeString) - returns the type string for this exception type (e.g. "eSQL"). This is a pass-through to [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException)::[GetType()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetType).

-   [ErrCode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ErrCode) - alias for [GetDBErrCode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetDBErrCode).

-   [Message()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Message) - returns the error message itself. This is a pass-through to [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException)::[GetMsg()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetMsg).

-   [OriginatedFrom()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OriginatedFrom) - returns the SQL server name. This is a pass-through to [CException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CException)::[GetModule()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetModule).

-   [SetServerName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetServerName) - sets the SQL server name.

-   [GetServerName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetServerName) - returns the SQL server name.

-   [SetUserName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetUserName) - sets the SQL user name.

-   [GetUserName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetUserName) - returns the SQL user name.

-   [SetExtraMsg()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetExtraMsg) - sets extra message text to be included in the message output.

-   [GetExtraMsg()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetExtraMsg) - gets the extra message text.

-   [SetSybaseSeverity()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetSybaseSeverity) - sets the severity value for a Sybase exception - ***N.B.*** Sybase severity values can be provided for the Sybase/FreeTDS ctlib driver only.

-   [GetSybaseSeverity()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetSybaseSeverity) - gets the severity value for a Sybase exception - ***N.B.*** Sybase severity values can be provided by the Sybase/FreeTDS ctlib driver only.

-   [ReportExtra()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ReportExtra) - outputs any extra text to the supplied stream.

-   [Clone()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Clone) - creates a new exception based on this one.

***N.B.*** The following [CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html) methods are deprecated:

-   [Severity()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Severity) - returns the severity value of this message (assigned by SQL server).

-   ***SeverityString(EDB\_Severity sev)*** - returns the severity string of this message (assigned by SQL server).

The DBAPI driver may throw any of the following types derived from [CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html):

-   [CDB\_SQLEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__SQLEx.html) This type is used if an error message has come from a SQL server and indicates an error in a SQL query. It could be a wrong table or column name or a SQL syntax error. This type provides the additional methods:

    -   [BatchLine()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BatchLine) - returns the line number in the SQL batch that generated the error.

    -   [SqlState()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SqlState) - returns a byte string describing an error (it's not useful most of the time).

-   [CDB\_RPCEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__RPCEx.html) An error message has come while executing an RPC or stored procedure. This type provides the additional methods:

    -   [ProcName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcName) - returns the procedure name where the exception originated.

    -   [ProcLine()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcLine) - returns the line number within the procedure where the exception originated.

-   [CDB\_DeadlockEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__DeadlockEx.html) An error message has come as a result of a deadlock.

-   [CDB\_DSEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__DSEx.html) An error has come from an RDBMS and is not related to a SQL query or RPC.

-   [CDB\_TimeoutEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__TimeoutEx.html) An error message has come due to a timeout.

-   [CDB\_ClientEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__ClientEx.html) An error message has come from the client side.

Drivers use two ways to deliver an error message object to an application. If it is possible to throw an exception, then the driver throws the error message object. If not, then the driver calls the [user's error handler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__UserHandler.html) with a pointer to the error message object as an argument. It's not always convenient to process all types of error messages in one error handler. Some users may want to use a special error message handler inside some function or block and a default error handler outside. To accommodate these cases the driver provides a [handler stack mechanism](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDBHandlerStack&d=C). The top handler in the stack gets the error message object first. If it knows how to deal with this message, then it processes the message and returns `true`. If handler wants to pass this message to the other handlers, then it returns `false`. So, the driver pushes the error message object through the stack until it gets `true` from the handler. The [default driver's error handler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__UserHandler__Stream.html), which just prints the error message to **`stderr`**, is always on the bottom of the stack.

Another tool which users may want to use for error handling is the [CDB\_MultiEx](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__MultiEx.html) object. This tool allows collecting multiple [CDB\_Exception](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__Exception.html) objects into one container and then throwing the container as one exception object.

<a name="ch_dbapi.dbapi_context"></a>

#### Driver context and connections

Every program which is going to work with an NCBI DBAPI driver should create at least one Driver Context object first. The main purpose of this object is to be a Connection factory, but it's a good idea to customize this object prior to opening a connection. The first step is to setup two message handler stacks. The first one is for error messages which are not bound to some particular connection or could occur inside the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method. Use [PushCntxMsgHandler()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PushCntxMsgHandler) to populate it. The other stack serves as an initial message handler stack for all connections which will be derived from this context. Use [PushDefConnMsgHandler()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PushDefConnMsgHandler) method to populate this stack. The second step of customization is setting timeouts. The [SetLoginTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetLoginTimeout) and [SetTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetTimeout) methods do the job. If you are going to work with text or image objects in your program, you need to call [SetMaxTextImageSize()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetMaxTextImageSize) to define the maximum size for such objects. Objects which exceed this limit could be truncated.

    class CMyHandlerForConnectionBoundErrors : public CDB_UserHandler
    {
        virtual bool HandleIt(CDB_Exception* ex);
        ...
    };
    class CMyHandlerForOtherErrors : public CDB_UserHandler
    {
        virtual bool HandleIt(CDB_Exception* ex);
        ...
    };
    ...
    int main()
    {
        CMyHandlerForConnectionBoundErrors conn_handler;
        CMyHandlerForOtherErrors           other_handler;
        ...
        try { // to be sure that we are catching all driver related exceptions
            // We need to create a driver context first
            // In real program we have to replace CXXXContext with something real
            CXXXContext my_context;
            my_context.PushCntxMsgHandler(&other_handler);
            my_context.PushDefConnMsgHandler(&conn_handler);
            // set timeouts (in seconds) and size limits (in bytes):
            my_context.SetLoginTimeout(10); // for logins
            my_context.SetTimeout(15);      // for client/server communications
            my_context.SetMaxTextImageSize(0x7FFFFFFF); // text/image size limit
            ...
            CDB_Connection* my_con =
                my_context.Connect("MyServer", "my_user_name", "my_password",
                                   I_DriverContext::fBcpIn);
            ...
        }
        catch (CDB_Exception& e) {
            other_handler.HandleIt(&e);
        }
    }

The only way to get a connection to a server in an NCBI DBAPI driver is through a [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method in [driver context](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classI__DriverContext.html). The first three arguments: server name, user name and password are obvious. Values for **`mode`** are constructed by a bitwise-inclusive-OR of flags defined in EConnectionMode. If **`reusable`** is `false`, then driver creates a new connection which will be destroyed as soon as user delete the correspondent [CDB\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Connection&d=C) (the **`pool_name`** is ignored in this case).

Opening a connection to a server is an expensive operation. If program opens and closes connections to the same server multiple times it worth calling the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method with **`reusable`** set to `true`. In this case driver does not close the connection when the correspondent CDB\_Connection is deleted, but keeps it around in a "recycle bin". Every time an application calls the [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) method with **`reusable`** set to `true`, driver tries to satisfy the request from a "recycle bin" first and opens a new connection only if necessary.

The **`pool_name`** argument is just an arbitrary string. An application could use this argument to assign a name to one or more connections (to create a connection pool) or to invoke a connection by name from this pool.

    ...
    // Create a pool of four connections (two to one server and two to another)
    // with the default database "DatabaseA"
    CDB_Connection* con_array[4];
    int i;
    for (i = 4;  i--; ) {
        con[i]= my_context.Connect((i%2 == 0) ? "MyServer1" : "MyServer2",
                                   "my_user_name", "my_password", 0, true,
                                   "ConnectionPoolA");
        CDB_LangCmd* lcmd= con[i]->LangCmd("use DatabaseA");
        lcmd->Send();
        while(lcmd->HasMoreResults()) {
            CDB_Result* r = lcmd->Result();
            delete r;
        }
        delete lcmd;
    }
    // return all connections to a "recycle bin"
    for(i= 0; i < 4; delete con_array[i++]);
    ...
    // in some other part of the program
    // we want to get a connection from "ConnectionPoolA"
    // but we don't want driver to open a new connection if pool is empty
    try {
        CDB_Connection* my_con= my_context.Connect("", "", "", 0, true,
                                                   "ConnectionPoolA");
        // Note that server name, user name and password are empty
        ...
    }
    catch (CDB_Exception& e) {
        // the pool is empty
        ...
    }

An application could combine in one pool the connections to the different servers. This mechanism could also be used to group together the connections with some particular settings (default database, transaction isolation level, etc.).


***Note:*** when pooling is used it is the user responsibility to keep the connections
in a proper state (see the [Connection Pooling](#ch_dbapi.Connection_Pooling) section for more details).

<a name="ch_dbapi.dbapi_drvr_mgr"></a>

#### Driver Manager

It's not always known which NCBI DBAPI driver will be used by a particular program. Sometimes you want a driver to be a parameter in your program. Sometimes you need to use two different drivers in one binary but can not link them statically because of name collisions. Sometimes you just need the driver contexts factory. The [Driver Manager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=C_DriverMgr&d=C) is intended to solve these problems.

Let's rewrite our [Sample program](#ch_dbapi.dbapi_sample_prog) using the `Driver Manager`. The original text was.

    #include <iostream>
    #include <dbapi/driver/public.hpp>
    #include <dbapi/driver/exception.hpp>
    /* Here, XXXlib has to be replaced with the real name, e.g. "ctlib" */
    #include <dbapi/driver/XXXlib/interfaces.hpp>
    USING_NCBI_SCOPE;
    int main()
    {
        try { // to be sure that we are catching all driver related exceptions
            // We need to create a driver context first
            // In real program we have to replace CXXXContext with something real
            CXXXContext my_context;
            // connecting to server "MyServer"
            // with user name "my_user_name" and password "my_password"
            CDB_Connection* con = my_context.Connect("MyServer", "my_user_name",
                                                     "my_password", 0);
            ...

If we use the `Driver Manager` we could allow the driver name to be a program argument.

    #include <iostream>
    #include <dbapi/driver/public.hpp>
    #include <dbapi/driver/exception.hpp>
    #include <dbapi/driver/driver_mgr.hpp> // this is a new header
    USING_NCBI_SCOPE;
    int main(int argc, const char* argv[])
    {
        try { // to be sure that we are catching all driver related exceptions
            C_DriverMgr drv_mgr;
            // We need to create a driver context first
            I_DriverContext* my_context= drv_mgr.GetDriverContext(
                                            (argc > 1)? argv[1] : "ctlib");
            // connecting to server "MyServer"
            // with user name "my_user_name" and password "my_password"
            CDB_Connection* con = my_context->Connect("MyServer", "my_user_name",
                                                     "my_password", 0);
            ...

This fragment creates an instance of the `Driver Manager`, dynamically loads the driver's library, implicitly registers this driver, creates the driver context and makes a connection to a server. If you don't want to load some drivers dynamically for any reason, but want to use the `Driver Manager` as a driver contexts factory, then you need to statically link your program with those libraries and explicitly register those using functions from `dbapi/driver/drivers.hpp` header.

<a name="ch_dbapi.dbapi_txt_img"></a>

#### Text and Image Data Handling

***text*** and ***image*** are SQL datatypes and can hold up to 2Gb of data. Because they could be huge, the RDBMS keeps these values separately from the other data in the table. In most cases the table itself keeps just a special pointer to a text/image value and the actual value is stored separately. This creates some difficulties for text/image data handling.

When you retrieve a large text/image value, you often prefer to "stream" it into your program and process it chunk by chunk rather than get it as one piece. Some RDBMS clients allow to stream the text/image values only if a corresponding column is the only column in a select statement.

Let's suppose that you have a table T (i\_val int, t\_val text) and you need to select all i\_val, t\_val where i\_val \> 0. The simplest way is to use a query:

    select i_val, t_val from T where i_val > 0

But it could be expensive. Because two columns are selected, some clients will put the whole row in a buffer prior to giving access to it to the user. The better way to do this is to use two selects:

    select i_val from T where i_val > 0
    select t_val from T where i_val > 0

Looks ugly, but could save you a lot of memory.

Updating and inserting the text/image data is also not a straightforward process. For small texts and images it is possible to use just SQL `insert` and `update` statements, but it will be inefficient (if possible at all) for the large ones. The better way to insert and update text and image columns is to use the [SendData()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SendData) method of the [CDB\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Connection&d=C) object or to use the [CDB\_SendDataCmd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_SendDataCmd&d=C) object.

The recommended algorithm for inserting text/image data is:

-   Use a SQL `insert` statement to insert a new row into the table. Use a space value (`' '`) for each text column and a zero value (`0x0`) for each image column you are going to populate. Use **`NULL`** only if the value will remain **`NULL`**.

-   Use a SQL `select` statement to select all text/image columns from this row.

-   Fetch the row result and get an [I\_BlobDescriptor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classI__BlobDescriptor.html) for each column.

-   Finish the results loop.

-   Use the [SendData()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SendData) method or [CDB\_SendDataCmd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__SendDataCmd.html) object to populate the columns.

***Example***

Let's suppose that we want to insert a new row into table T as described above.

    CDB_Connection* con;
    ...
    // preparing the query
    CDB_LangCmd* lcmd= con->LangCmd("insert T (i_val, t_val) values(100, ' ')\n");
    lcmd->More("select t_val from T where i_val = 100");
    // Sending this query to a server
    lcmd->Send();
    I_ITDescriptor* my_descr;
    // the result loop
    while(lcmd->HasMoreResults()) {
        CDB_Result* r= lcmd->Result();
        // skip all but row result
        if (r == 0  ||  r->ResultType() != eDB_RowResult) {
            delete r;
            continue;
        }
        // fetching the row
        while(r->Fetch()) {
            // read 0 bytes from the text (some clients need this trick)
            r->ReadItem(0, 0);
            my_deskr = r->GetImageOrTextDescriptor();
        }
        delete r; // we don't need this result anymore
    }
    delete lcmd; // delete the command
    CDB_Text my_text;
    my_text.Append("This is a text I want to insert");
    //sending the text
    con->SendData(my_descr, my_text);
    delete my_descr; // we don't need this descriptor anymore
    ...

The recommended algorithm for updating the text/image data is:

-   Use a SQL `update` statement to replace the current value with a space value (`' '`) for a text column and a zero value (`0x0`) for an image column.

-   Use a SQL `select` statement to select all text/image columns you want to update in this row.

-   Fetch the row result and get an [I\_BlobDescriptor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classI__BlobDescriptor.html) for each column.

-   Finish the results loop.

-   Use the [SendData()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SendData) method or the [CDB\_SendDataCmd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDB__SendDataCmd.html) object to populate the columns.

***Example***

    CDB_Connection* con;
    ...
    // preparing the query
    CDB_LangCmd* lcmd= con->LangCmd("update T set t_val= ' ' where i_val =  100");
    lcmd->More("select t_val from T where i_val = 100");
    // Sending this query to a server
    lcmd->Send();
    I_ITDescriptor* my_descr;
    // the result loop
    while(lcmd->HasMoreResults()) {
        CDB_Result* r= lcmd->Result();
        // skip all but row result
        if (r == 0  ||  r->ResultType() != eDB_RowResult) {
            delete r;
            continue;
        }
        // fetching the row
        while(r->Fetch()) {
            // read 0 bytes from the text (some clients need this trick)
            r->ReadItem(0, 0);
            my_deskr = r->GetImageOrTextDescriptor();
        }
        delete r; // we don't need this result anymore
    }
    delete lcmd; // delete the command
    CDB_Text my_text;
    my_text.Append("This is a text I want to see as an update");
    //sending the text
    con->SendData(my_descr, my_text);
    delete my_descr; // we don't need this descriptor anymore
    ...

<a name="ch_dbapi.dbapi_results"></a>

#### Results loop

Each connection in the NCBI DBAPI driver is always single threaded. Therefore, applications have to retrieve all the results from a current command prior to executing a new one. Not all results are meaningful (i.e. an RPC always returns a status result regardless of whether or not a procedure has a return statement), but all results need to be retrieved. The following loop is recommended for retrieving results from all types of commands:

    CDB_XXXCmd* cmd; // XXX could be Lang, RPC, etc.
    ...
    while (cmd->HasMoreResults()) {
            // HasMoreResults() method returns true        // if the Result() method needs to be called.
            // It doesn't guarantee that Result() will return not NULL result
       CDB_Result* res = cmd->Result();
       if (res == 0)
           continue; // a NULL res doesn't mean that there is no more results
       switch(res->ResultType()) {
          case eDB_RowResult: // row result
              while(res->Fetch()) {
                 ...
              }
              break;
          case eDB_ParamResult: // Output parameters
              while(res->Fetch()) {
                 ...
              }
              break;
          case eDB_ComputeResult: // Compute result
              while(res->Fetch()) {
                 ...
              }
              break;
          case eDB_StatusResult: // Status result
              while(res->Fetch()) {
                 ...
              }
              break;
          case eDB_CursorResult: // Cursor result
              while(res->Fetch()) {
                 ...
              }
              break;
       }
       delete res;
    }

If you don't want to process some particular type of result, just skip the `while (res->Fetch()){...}` in the corresponding `case`.

<a name="ch_dbapi.dbapi_drivers"></a>

### Supported DBAPI drivers

The following sections cover the supported DBAPI drivers:

-   [FreeTDS (TDS ver. 7.0)](#ch_dbapi.free_tds64) -- this is the preferred driver

-   [Sybase CTLIB](#ch_dbapi.dbapi_drvs_ctlib)

-   [ODBC](#ch_dbapi.dbapi_drvrs_odbc)

-   [MySQL Driver](#ch_dbapi.mysql_driver)

<a name="ch_dbapi.free_tds64"></a>

#### FreeTDS (TDS ver. 7.0)

***Note:*** This is the only driver supported by SDBAPI.

This driver is the most recommended, built-in, and portable.

-   Registration function (for the manual, static registration) [DBAPI\_RegisterDriver\_FTDS()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DBAPI_RegisterDriver_FTDS&d=f)

-   Driver default name (for the run-time loading from a DLL) `"ftds"`.

-   Driver library `ncbi_xdbapi_ftds`

-   `FreeTDS` libraries and headers used by the driver [$(FTDS\_LIBS)](ch_config.html#ch_config.ch_configlocalizatio) [$(FTDS\_INCLUDE)](ch_config.html#ch_config.ch_configlocalizatio)

-   `FreeTDS`-specific driver context attributes "version", default = `<DBVERSION_UNKNOWN>` (also allowed: `"42"`, `"46"`, "70", "100")

-   FreeTDS works on UNIX and Windows platforms.

-   This driver supports Windows Domain Authentication using protocol NTLMv2, which is a default authentication protocol for Windows at NCBI.

-   This driver supports TDS protocol version auto-detection. TDS protocol version cannot be detected when connecting against Sybase Open Server.

-   Caveats:

    -   Default version of the TDS protocol (\<DBVERSION\_UNKNOWN\>) will work with both MS SQL Server and Sybase SQL Server.

    -   When using FTDS to connect to SQL Server, there are some limitations in updating LOB-fields which participate in replication.

    -   When using FTDS to connect to Sybase Open Server, you must explicitly set TDS version to 5.0, otherwise the connect operation will hang. This can be done either by using a driver parameter "version" equal to "50" or by setting an environment variable TDSVER to "50". Also, explicitly configuring the packet size setting to 3584 (7 \* 512) has historically been helpful.

    -   Although a slightly modified version of FreeTDS is now part of the C++ Toolkit, it retains its own license: the [GNU Library General Public License](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/dbapi/driver/ftds64/freetds/COPYING.LIB).

    -   TDS protocol version 4.2 should not be used with MS SQL server.

<a name="ch_dbapi.dbapi_drvs_ctlib"></a>

#### Sybase CTLIB

***Note:*** This driver is not supported by SDBAPI.

-   Registration function (for the manual, static registration) [DBAPI\_RegisterDriver\_CTLIB()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DBAPI_RegisterDriver_CTLIB&d=f)

-   Driver default name (for the run-time loading from a DLL) `"ctlib"`

-   Driver library `ncbi_xdbapi_ctlib`

-   `Sybase CTLIB` libraries and headers used by the driver (UNIX) [$(SYBASE\_LIBS)](ch_config.html#ch_config.ch_configlocalizatio) [$(SYBASE\_INCLUDE)](ch_config.html#ch_config.ch_configlocalizatio)

-   `Sybase CTLIB` libraries and headers used by the driver (MS Windows). You will need the Sybase OpenClient package installed on your PC. In MSVC++, set the "C/C++ / General / Additional Include Directories" and "Linker / General / Additional Library Directories" properties to the Sybase OpenClient headers and libraries (for example "C:\\Sybase\\include" and "C:\\Sybase\\lib" respectively). Also set the "Linker / Input / Additional Dependencies" property to include the needed Sybase OpenClient libraries: `LIBCT.LIB LIBCS.LIB LIBBLK.LIB`. To run the application, you must set environment variable `%SYBASE%` to the Sybase OpenClient root directory (e.g. "`C:\Sybase`"), and also to have your "interfaces" file there, in `INI/sql.ini`. In NCBI, we have the Sybase OpenClient libs installed in `\\snowman\win-coremake\Lib\ThirdParty\sybase`.

-   CTLIB-specific header (contains non-portable extensions) [dbapi/driver/ctlib/interfaces.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/dbapi/driver/ctlib/interfaces.hpp)

-   CTLIB-specific driver context attributes "reuse\_context" (default value is `"true"`), "version" (default value is `"125"`, also allowed `"100"` and `"110"`)

-   Caveats:

    -   Cannot communicate with MS SQL server using any TDS version.

<a name="ch_dbapi.dbapi_drvrs_odbc"></a>

#### ODBC

***Note:*** This driver is not supported by SDBAPI.

-   Registration function (for the manual, static registration) [DBAPI\_RegisterDriver\_ODBC()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DBAPI_RegisterDriver_ODBC&d=f)

-   Driver default name (for the run-time loading from a DLL) `"odbc"`

-   Driver library `dbapi_driver_odbc`

-   `ODBC` libraries and headers used by the driver (MS Windows) `ODBC32.LIB ODBCCP32.LIB ODBCBCP.LIB`

-   `ODBC` libraries and headers used by the driver (UNIX) [$(ODBC\_LIBS)](ch_config.html#ch_config.ch_configlocalizatio)[$(ODBC\_INCLUDE)](ch_config.html#ch_config.ch_configlocalizatio)

-   `ODBC`-specific header (contains `non-portable` extensions) [dbapi/driver/odbc/interfaces.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/dbapi/driver/odbc/interfaces.hpp)

-   `ODBC`-specific driver context attributes "version" (default value is `"3"`, also allowed `"2"`), "use\_dsn" (default value is `false`, if you have set this attribute to `true`, you need to define your `data source` using `"Control Panel"/"Administrative Tools"/"Data Sources (ODBC)"`)

-   Caveats:

    -   The [CDB\_Result](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_Result)::[GetImageOrTextDescriptor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetImageOrTextDescriptor) does not work for ODBC driver. You need to use [CDB\_ITDescriptor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_ITDescriptor&d=C) instead. The other way to deal with ***texts/images*** in ODBC is through the [CDB\_CursorCmd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDB_CursorCmd&d=C) methods: [UpdateTextImage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=UpdateTextImage) and [SendDataCmd](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SendDataCmd).

    -   On most NCBI PCs, there is an old header `odbcss.h` (from 4/24/1998) installed. The symptom is that although everything compiles just fine, however in the linking stage there are dozens of unresolved symbol errors for ODBC functions. Ask "pc.systems" to fix this for your PC.

    -   On UNIX, it's only known to work with Merant's implementation of ODBC, and it has not been thoroughly tested or widely used, so surprises are possible.

<a name="ch_dbapi.mysql_driver"></a>

#### MySQL Driver

***Note:*** This driver is not supported by SDBAPI.

There is a direct (without ODBC) MySQL driver in the NCBI C++ Toolkit DBAPI. However, the driver implements a very minimal functionality and does not support the following:

-   Working with images by chunks (images can be accessed as string fields though)

-   RPC

-   BCP

-   SendData functionality

-   Connection pools

-   Parameter binding

-   Canceling results

-   ReadItem

-   IsAlive

-   Refresh functions

-   Setting timeouts

<a name="ch_dbapi.Major_Features_of_th"></a>

The BDB Wrapper
---------------

NCBI created the "BDB" wrapper to simplify use of the open source [Berkeley DB](http://www.oracle.com/us/products/database/berkeley-db/overview/index.html) library. Berkeley DB provides tools for the development of specialized data storage in applications not having access to a centralized RDBMS.

-   **C++ wrapper on top of Berkeley DB.** The BDB wrapper takes care of many of the ultra low-level details for C programmers using the Berkeley DB. BDB implements B-Tree file access (both keyed and sequential), environments, cursors, and transactions.

-   **Error checking.** All error codes coming from the Berkeley DB are analyzed and processed in a manner common to all other components of the C++ Toolkit. When an error situation is detected, the BDB wrapper sends an exception that is reported by the diagnostic services and can be handled by the calling application, similar to any other Toolkit exception.

-   **Support for relational table structure and different data types.** The Berkeley DB itself is “type agnostic” and provides no means to manipulate data types. But for many cases, clear data type support can save a lot of work. The Toolkit implements all major scalar data types so it can be used like a regular database.

-   **Cross platform compatibility.** The BDB databases can be transferred across platforms without reconverting the data. The BDB tracks the fact that the database was created as big-endian or little-endian and does the conversion transparently when the database migrates.

-   **Easy BLOBs.** The BDB wrapper supports keyed BLOB storage. BLOBs can be streamed to and from the database. A set of additional interfaces has been written to simplify the BLOB access in comparison with the original Berkeley DB C library.

-   **Disk-based cache interface.** The BDB wrapper implements a cache disk cache service used by other Toolkit components to minimize client-server traffic and to store parts of the data locally. Different cache management and data expiration policies have been put in place.

-   **Database maps.** The BDB wrapper includes template classes similar to STL map and multimap but persistently stores the map content in the Berkeley DB files.

-   **Simple queries.** The BDB wrapper includes implementation of a simple query language to search records in flat files.

<a name="ch_dbapi.The_SQLite_Wrapper"></a>

The SQLite Wrapper
------------------

The NCBI C++ Toolkit provides the "SQLite Wrapper" for the open source [SQLite](http://sqlite.org/) library. Like Berkeley DB, SQLite is implemented as a library linked with the application, rather than a separate DBMS.

Some of the SQLite wrapper features are:

-   A class, [CSQLITE\_Global](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCSQLITE__Global.html), with static functions for tuning SQLite as a whole as opposed to tuning connection-by-connection.

-   A convenience class, [CSQLITE\_Connection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCSQLITE__Connection.html), for connecting to a database.

-   Convenience classes for working with prepared statements, blobs, and exceptions.

Please see the [sqlitewrapp.hpp](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c%2B%2B/include/db/sqlite/sqlitewrapp.hpp?view=log) header for API details.

For more information about SQLite, see the [online SQLite documentation](http://sqlite.org/docs.html).

<a name="ch_dbapi.Database_loadbalanci"></a>

Database Load-Balancing (DBLB)
------------------------------

Many server-based databases are load-balanced for efficient resource management. Accessing load-balanced databases is automatically done from C++ when using the [SDBAPI](#ch_dbapi.SDBAPI_UserLayer_Reference) library, but requires some specific statements in the client code when using the [DBAPI](#ch_dbapi.The_DBAPI_Library) library or [scripts](#ch_dbapi.Database_Access_via_Python_and). This section discusses setting up and using load-balanced databases.

The following sections cover specific aspects of Database Load-Balancing:

-   [Setting up Load-Balancing of Database Servers](#ch_dbapi.Getting_started)

-   [Using Database Load-Balancing from C++](#ch_dbapi.Using_Database_LoadBalancing_fr)

-   [Load-Balanced Database Access via Python and Perl](#ch_dbapi.Database_Access_via_Python_and)

-   [Advantages of using DBLB](#ch_dbapi.Advantages_of_using_)

-   [How it works (by default)](#ch_dbapi.HOW_IT_WORKS_by_defa)

<a name="ch_dbapi.Getting_started"></a>

### Setting up Load-Balancing of Database Servers

For the following to be clear, it is important to distinguish between an underlying server name, a server alias, a service name, and a database name.
- An **underlying server name** (e.g. `MSSQL1`) is the actual name of the host computer. Servers typically host many databases.
- A **server alias** (e.g. `BIOPROJECT_PRD1`) is simply a name that is meant to be very stable and which may be used in place of an underlying server name when creating a connection to a database server. The interfaces file associates a server alias with the underlying server name. If and when the underlying server name is changed, the alias is also changed to point to the new name, but no changes to the applications using the server alias will be necessary. Thus, server aliases make software more stable and should be preferred over underlying server names. Server aliases are often used with tools such as `sqsh-ms` and SQL Server Management studio.
- A **service name** (e.g. `BIOPROJECT`) is used to identify a set of load-balanced servers that provide a desired service (e.g. hosting a given database). When a service is requested, the load-balancer / service mapper decides which underlying server to use, bypassing servers that are unavailable. Applications should therefore prefer service names over server aliases. Server aliases and service names often share a common prefix and would look similar, and in fact for reasons presented below, there should be at least one server alias that is identical to the service name. Service names are often application source files and can be used with tools such as `ncbi_dblb`, `lbsmc`, and `sqsh-ms-lb`.
- A **database name** (e.g. `bioProject`) is self-explanatory, but note that it can be the same as a service name and/or a server alias and must be kept separate conceptually.

Suppose you have a database called `BioStuff` hosted on two servers, `MSSQL1` (the primary server) and `MSSQL2` (a standby server). A good setup for server aliases and a service name would be:
* Three server aliases:
  * `BioStuff1`, pointing to `MSSQL1`
  * `BioStuff2`, pointing to `MSSQL2`
  * `BioStuff`, pointing to `MSSQL1`
* The service `BioStuff`, mapped to `BioStuff1` and `BioStuff2`.

The server aliases protect applications against underlying server changes. Having a server alias that matches the service name also protects against LBSM failure - i.e., if the load-balancer / service mapper fails, then the name resolution process will find the server alias.
If you need to set up server aliases or a new service name, email the Database Help Desk. You can find existing server names, server aliases, and service names using the LBSM search tool.

The following steps must be done prior to using database load-balancing and service mapping:
1. The service must exist. Ask the DBAs to add your service name to the load-balancer configuration database if it doesn't already exist (use the LBSM search tool to find existing service names). For example, suppose you have a database named `bioProject`, and there are already server aliases `BIOPROJECT_PRD1` and `BIOPROJECT_PRD2`. Ask the DBAs to create the service `BIOPROJECT` and map it to `BIOPROJECT_PRD1` and `BIOPROJECT_PRD2`. Typically the service, server alias, and database names have a common prefix, although this is not required. Note that if databases are moved to different underlying servers, both the server aliases, and the load-balancer configuration which points to those servers are both moved, synchronously.
2. Tell the DBAs which of the server aliases point to the server that should be used, if the load-balancer is unavailable, as the DBAPI will look for a server alias with the same name as the service, in that case.

The DBAs will also ask for a DNS name to match the service name as a backup connection method, should everything else fail.


<a name="ch_dbapi.Using_Database_LoadBalancing_from_Python"></a>

### Using Database Load-Balancing from Python

There is a Python module that provides an interface to the load-balancing service:

-   documentation: <https://bitbucket.ncbi.nlm.nih.gov/projects/PY/repos/python-ncbi-lbsm/browse>


<a name="ch_dbapi.Using_Database_LoadBalancing_fr"></a>

### Using Database Load-Balancing from C++

For simplest access, see the section on [using SDBAPI](#ch_dbapi.Simple_Database_Access_via_C) above. SDBAPI uses the database load-balancing by default, so no further steps are necessary.

If DBAPI is being used (e.g. if a feature that is only available in DBAPI is required), and you want to activate database load-balancing:

1.  Before the very first DBAPI connection attempt, call:<br/><br/>`#include <dbapi/driver/dbapi_svc_mapper.hpp>`<br/>`DBLB_INSTALL_DEFAULT();`<br/>

2.  Link `'$(XCONNEXT)'` and `'xconnect'` libraries to your application.

If steps (1) and (2) above are done then the DBAPI connection methods (such as [Connect()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Connect) or [ConnectValidated()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnectValidated)) will attempt to resolve the passed server name as a load-balanced service name.

***Note:*** If steps (1) and (2) above are not done, or if DBLB library is not available (such as in the publicly distributed code base), or if the passed server name cannot be resolved as a load-balanced service name, then the regular database server name resolution will be used – i.e. the passed name will first be interpreted as a server alias (using the "interfaces" file), and if that fails, it will be interpreted as a DNS name. Note however that by default if the service name resolves (exists), then the regular database server name resolution will not be used as a fallback, even if DBAPI can't connect (for whatever reason) to the servers that the service resolves to.

Example:

    #include <dbapi/driver/dbapi_svc_mapper.hpp>

    DBLB_INSTALL_DEFAULT();
    IDataSource* ds = dm.CreateDs("ftds");
    IConnection* conn = ds->CreateConnection();

    // Note: It is possible to connect by calling conn->Connect(), but it is
    // recommended to use a validator here because, in conjunction with DBAPI's 
    // internal retry mechanism, a validator helps DBAPI select a good server from a
    // load-balanced set when the actual database is temporarily unavailable on one
    // (or more) of the servers.
    CTrivialConnValidator my_validator(my_databasename);
    conn->ConnectValidated(
        my_validator, my_username, my_password, my_servicename, my_ databasename);

<a name="ch_dbapi.Database_Access_via_Python_and"></a>

### Load-Balanced Database Access via Command Line and Python and Perl

There is a Unix command-line tool, **ncbi\_dblb\_cli**, that you can call from your script to perform service resolution and connection validation - i.e. to find a load-balanced server that is online and that supports a given service and database.

From command line:

To determine the best server name (i.e. online, load-balanced, and supporting the given database) to access a certain database using a certain service, use the **ncbi\_dblb\_cli** tool (located in `/opt/machine/lbsm/bin/ncbi_dblb_cli`).  For example:
```
ncbi_dblb_cli lookup --service MyService --database MyDatabase
```

To determine the load-balanced server for a given service, use the **ncbi\_dblb** tool (located in `/opt/machine/lbsm/bin`).  For example:
```
ncbi_dblb -q MyService
```

To use sqsh with a load-balanced service, use the **sqsh-ms-lb** tool (located in `/export/home/sybase/utils/bin/sqsh-ms-lb`).  For example:
```
sqsh-ms-lb -S MyService [-D MyDatabase] SQSH_ARGS...
```

From Python:

    #!/bin/env python

    import subprocess, sys

    cmdline = [
        "/opt/machine/lbsm/bin/ncbi_dblb_cli",
        "lookup",
        "-service",
        "DBAPI_MS_TEST",
        "-database",
        "DBAPI_Sample",
    ]
    result = subprocess.Popen(cmdline, stdout=subprocess.PIPE).communicate()[0]
    # A successful result will match a line beginning with a name followed by a tab.
    if result:
        server = result.strip().split("\t")[0]
        # Do whatever is needed with the server name...

From Perl:

    #!/bin/env perl

    use strict;

    my $cmd = '/opt/machine/lbsm/bin/ncbi_dblb_cli';
    my $svc = 'DBAPI_MS_TEST';
    my $db  = 'DBAPI_Sample';
    my $cmdline = $cmd . ' lookup -service ' . $svc . ' -database ' . $db;
    # A successful result will match a line beginning with a name followed by a tab.
    if(`$cmdline` =~ m/^([^\t]+)/) {
        my $server = $1;
        # Do whatever is needed with the server name...
    }

If you don't need to ensure that the server is online or check for a specific database, you can just call **ncbi\_dblb**.

From Python:

    #!/bin/env python

    import subprocess, sys

    if len(sys.argv) > 1:
        # Use the -q option to fetch only the server name.
        cmd = ['/opt/machine/lbsm/bin/ncbi_dblb', '-q', sys.argv[1]]
        srv = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()[0].strip()
        # Do whatever is needed with the server name...

From Perl:

    #!/bin/env perl

    use strict;

    if (@ARGV) {
        # Use the -q option to fetch only the server name.
        my $cmd = '/opt/machine/lbsm/bin/ncbi_dblb -q ' . $ARGV[0];
        my $srv = `$cmd`;
        chomp($srv);
        # Do whatever is needed with the server name...
    }


<a name="ch_dbapi.Advantages_of_using_"></a>

### Advantages of using DBLB

<a name="ch_dbapi.C_Specific"></a>

#### C++ Specific

-   A database-level verification mechanism.

-   Latch onto the same database server for the life of your process. It's often useful to avoid possible inter-server data discrepancy. The "latch-on" mechanism can be relaxed or turned off if needed.

-   Automatic connection retries. If a connection to the selected server cannot be established, the API will try again with other servers (unless it is against the chosen "latch-on" strategy).

-   The default connection strategy is \*configurable\*. You can change its parameters using a configuration file, environment variables, and/or programmatically. You can also configure locally for your application ad-hoc mappings to the database servers (this is usually not recommended but can come in handy in emergency cases or for debugging).

-   If needed, you can implement your own customized mapper. Components of the default connection strategy can be used separately, or in combination with each other and with the user-created strategies, if necessary.

<a name="ch_dbapi.General"></a>

#### General

-   Connecting to the database servers by server name and/or "interfaces" file based aliases still works the same as it used to.

-   Automatic avoidance of unresponsive database servers. This prevents your application from hanging for up to 30 seconds on the network timeout.

-   Independence from the database "interfaces" file. A centrally maintained service directory is used instead, which is accessible locally and/or via network. It also dynamically checks database servers' availability and excludes unresponsive servers.

<a name="ch_dbapi.HOW_IT_WORKS_by_defa"></a>

### How it works (by default)

The following steps are performed each time a request is made to establish a load-balanced connection to a named database service:

1.  The requests will first go through the DBLB mechanism that tries to match the requested service name against the services known to the NCBI [Load Balancer](ch_app.html#ch_app.Load_Balancing) and/or those described in the application's configuration file.

2.  If the requested service name is unknown to the load balancer then this name will be used "as is".

3.  However, if this service name is known to the DBLB then the DBLB will try to establish a connection to the database server that it deems the most suitable. If the service is handled by the NCBI load-balancer, then the unresponsive servers will be weeded out, and a load on the machines that run the servers may be taken into account too.

4.  ***C++ only:*** If the connection cannot be established, then DBLB will automatically retry the connection, now using another suitable database server.

5.  This procedure may be repeated several times, during which there will be only one attempt to connect to each database.

6.  ***C++ only:*** Once a database connection is successfully established it will be "latched-on". This means that when you will try to connect to the same service or alias within the same application again then you will be connected to the same database server (this can be relaxed or turned off completely).

7.  For example, you can connect to the "PMC" service which is currently mapped to two servers. The server names are provided dynamically by the NCBI load-balancer, so you never have to change your configuration or recompile your application if either a service configuration or an "interfaces" file get changed.

8.  ***C++ only:*** If [ConnectValidated()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnectValidated) is used to connect to a database, then requests to establish database connections will first go through the server-level load-balancing mechanism. On successful login to server, the database connection will be validated against the validator. If the validator does not "approve" the connection, then DBAPI will automatically close this connection and repeat this login/validate attempt with the next server, and so on, until a "good" (successful login + successful validation) connection is found. If you want to validate a connection against more than one validator/database, then you can combine validators. Class [CConnValidatorCoR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConnValidatorCoR) was developed to allow combining of other validators into a chain.


