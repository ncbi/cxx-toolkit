---
layout: default
title: Test page 
nav: pages/test
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

| Feature                              | SDBAPI                   | DBAPI                        |    
|--------------------------------------|--------------------------|------------------------------|
| sample code | [src/sample/app/sdbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/sdbapi/)                                                 | [src/sample/app/dbapi](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/dbapi/)                                                   |
| available drivers | FTDS                                                                                                                                                        | CTLIB, FTDS, MYSQL, ODBC  |
| cursor support | no | yes |
| writing BLOBs to streams | no | yes|
| bookmarking BLOBs | yes  | no|
| access to stored procedure parameters | only by name | by name or position (note: if possible, prefer using names over positions because using positions creates maintenance difficulties) |
| makefile `REQUIRES` | `REQUIRES = dbapi FreeTDS`  | `# choose driver, e.g. FreeTDS, BerkeleyDB, or SQLITE3`<br/>`REQUIRES = dbapi FreeTDS` |
| makefile `LIB` | `LIB = $(SDBAPI_LIB) xconnect xutil xncbi`  | `LIB = ncbi_xdbapi_ftds $(FTDS_LIB) \`<br/>`      dbapi_util_blobstore$(STATIC) dbapi$(STATIC) dbapi_driver$(STATIC) \`<br/>`      $(XCONNEXT) xconnect $(COMPRESS_LIBS) xutil xncbi` |
| makefile `LIBS` | `LIBS = $(SDBAPI_LIBS) $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)` | `LIBS = $(FTDS_LIBS) $(CMPRS_LIBS) $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)` |
| includes   | `<dbapi/simple/sdbapi.hpp>`| `// "new" DBAPI`<br/>`#include <dbapi/dbapi.hpp>`<br/><br/>`// "old" DBAPI`<br/>`#include <dbapi/driver/dbapi_conn_factory.hpp>  // CTrivialConnValidator`<br/>`#include <dbapi/driver/dbapi_svc_mapper.hpp>    // DBLB_INSTALL_DEFAULT`<br/>`#include <dbapi/driver/drivers.hpp>             // DBAPI_RegisterDriver_FTDS`<br/>`#include <dbapi/driver/exception.hpp>           // CDB_UserHandler`  |
| to set up a connection       | `// Specify connection parameters.`<br/>`CSDB_ConnectionParam    db_params;`<br/>`db_params.Set(CSDB_ConnectionParam::eUsername, m_User);`<br/>`db_params.Set(CSDB_ConnectionParam::ePassword, m_Password);`<br/>`db_params.Set(CSDB_ConnectionParam::eService,  m_Service);`<br/>`db_params.Set(CSDB_ConnectionParam::eDatabase, m_DbName);`<br/><br/>`// Connect to the database.`<br/>`m_Db = CDatabase(db_params);`<br/>`m_Db.Connect();` | `// Use load balancing if available.`<br/>`DBLB_INSTALL_DEFAULT();`<br/><br/>`// Explicitly register a driver.`<br/>`DBAPI_RegisterDriver_FTDS();`<br/><br/>`CDriverManager& dm(CDriverManager::GetInstance());`<br/><br/>`// Create a data source - the root object for all other`<br/>`// objects in the library.`<br/>`m_Ds = dm.CreateDs("ftds");`<br/><br/>`// Setup diagnostics.`<br/>`m_Logstream.open(m_LogFileName.c_str());`<br/>`m_Ds->SetLogStream(&m_Logstream);`<br/><br/>`// Add a message handler for 'context-wide' error messages (not bound`<br/>`// to any particular connection); let DBAPI own it.`<br/>`I_DriverContext* drv_context = m_Ds->GetDriverContext();`<br/>`drv_context->PushCntxMsgHandler(`<br/>`    new CErrHandler("General", &m_Logstream),`<br/>`    eTakeOwnership);`<br/><br/>`// Add a 'per-connection' message handler to the stack of default`<br/>`// handlers which are inherited by all newly created connections;`<br/>`// let DBAPI own it.`<br/>`drv_context->PushDefConnMsgHandler(`<br/>`    new CErrHandler("Connection", &m_Logstream),`<br/>`    eTakeOwnership);`<br/><br/>`// Configure this context.`<br/>`drv_context->SetLoginTimeout(10);`<br/>`// default query timeout for client/server comm for all connections`<br/>`drv_context->SetTimeout(15);`<br/><br/>`// Create connection.`<br/>`m_Conn = m_Ds->CreateConnection();`<br/>`if (m_Conn == NULL) {`<br/>`    ERR_POST_X(1, Fatal << "Could not create connection.");`<br/>`}`<br/><br/>`// Validate connection.  When using load balancing, this will interpret`<br/>`// the "server" name as a service, then use the load balancer to find`<br/>`// servers, then try in succession until a successful login to the`<br/>`// given database is successful.`<br/>`CTrivialConnValidator val(m_DbName);`<br/>`m_Conn->ConnectValidated(val, m_User, m_Password, m_Service, m_DbName);`  |
| to execute a stored procedure   | `CQuery query = m_Db.NewQuery();`<br/>`query.SetParameter("@max_id", 5);`<br/>`query.SetParameter("@max_fl", 5.1f);`<br/>`query.SetParameter("@num_rows", 0, eSDB_Int4, eSP_InOut);`<br/>`query.ExecuteSP(proc_name);`  | `ICallableStatement *cstmt = conn->PrepareCall("ProcName");`<br/>`Uint1 byte = 1;`<br/>`cstmt->SetParam(CVariant("test"), "@test_input");`<br/>`cstmt->SetParam(CVariant::TinyInt(&byte), "@byte");`<br/>`cstmt->SetOutputParam(CVariant(eDB_Int), "@result");`<br/>`cstmt->Execute();`  |
| to retrieve results           | `// Print the results.`<br/>`//`<br/>`// NOTE: For database APIs, array-like indexes are 1-based, not 0-based!`<br/>`//`<br/>`NcbiCout << "int_val    fl_val" << NcbiEndl;`<br/>`ITERATE(CQuery, row, query.SingleSet()) {`<br/>`    NcbiCout`<br/>`        << row[1].AsInt4() << "    "`<br/>`        << row[2].AsFloat() << NcbiEndl;`<br/>`}`<br/><br/>`// Confirm having read all results.`<br/>`query.VerifyDone();`<br/><br/>`// Print the number of result rows.`<br/>`NcbiCout`<br/>`    << "Number of rows: "`<br/>`    << query.GetParameter("@num_rows").AsInt4() << NcbiEndl;` | `// Retrieve and display the data.`<br/>`while (stmt->HasMoreResults()) {`<br/>`    // Use an auto_ptr to manage resultset lifetime.`<br/>`    // NOTE: Use it with caution. When the wrapped parent object`<br/>`    // goes out of scope, all child objects are destroyed`<br/>`    // (which isn't an issue for this demo but could be for`<br/>`    // other applications).`<br/>`    auto_ptr<IResultSet> rs(stmt->GetResultSet());`<br/><br/>`    // Sometimes the results have no rows - and that's ok.`<br/>`    if ( ! stmt->HasRows() ) {`<br/>`        LOG_POST_X(1, Info << "No rows.");`<br/>`        continue;`<br/>`    }`<br/><br/>`    switch (rs->GetResultType()) {`<br/><br/>`    case eDB_StatusResult:`<br/>`        NcbiCout << "\nStatus results:" << NcbiEndl;`<br/>`        while (rs->Next()) {`<br/>`            NcbiCout << "    Status: " << rs->GetVariant(1).GetInt4()`<br/>`                << NcbiEndl;`<br/>`        }`<br/>`        break;`<br/><br/>`    case eDB_ParamResult:`<br/>`        NcbiCout << "\nParameter results:" << NcbiEndl;`<br/>`        while (rs->Next()) {`<br/>`            NcbiCout << "    Parameter: "`<br/>`                << rs->GetVariant(1).GetInt4() << NcbiEndl;`<br/>`        }`<br/>`        break;`<br/><br/>`    case eDB_RowResult: {`<br/>`        NcbiCout << "\nRow results:" << NcbiEndl;`<br/><br/>`        const IResultSetMetaData* rsMeta = rs->GetMetaData();`<br/><br/>`        // Print column headers.`<br/>`        for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`            NcbiCout << "    " << rsMeta->GetName(i);`<br/>`        }`<br/>`        NcbiCout << NcbiEndl;`<br/>`        for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`            NcbiCout << "    " << string(rsMeta->GetName(i).size(), '=');`<br/>`        }`<br/>`        NcbiCout << NcbiEndl;`<br/><br/>`        while (rs->Next()) {`<br/>`            // Print a row of data.`<br/>`            for (unsigned i = 1; i <= rsMeta->GetTotalColumns(); ++i) {`<br/>`                NcbiCout << "    " << rs->GetVariant(i).GetString();`<br/>`            }`<br/>`            NcbiCout << NcbiEndl;`<br/>`        }`<br/>`        NcbiCout << "    ---------------" << NcbiEndl;`<br/>`        NcbiCout << "    Row count: " << stmt->GetRowCount()`<br/>`            << NcbiEndl;`<br/>`        break;`<br/>`    }`<br/><br/>`    // These types aren't used in this demo, but might be in`<br/>`    // your code.`<br/>`    case eDB_ComputeResult:`<br/>`    case eDB_CursorResult:`<br/>`        LOG_POST_X(1, Warning << "Unhandled results type:"`<br/>`            << rs->GetResultType());`<br/>`        break;`<br/><br/>`    // Any other type means this code is out-of-date.`<br/>`    default:`<br/>`        ERR_POST_X(1, Critical << "Unexpected results type:"`<br/>`            << rs->GetResultType());`<br/>`    }`<br/>`}`<br/>`// The stored procedure will return a status.`<br/>`NcbiCout << "\nStored procedure returned status: "`<br/>`    << cstmt->GetReturnStatus() << NcbiEndl;`<br/>`string msgs = m_Ds->GetErrorInfo();`<br/>`if ( ! msgs.empty() ) {`<br/>`    NcbiCout << "    Errors:" << NcbiEndl;`<br/>`    NcbiCout << "        " << msgs << NcbiEndl;` |
