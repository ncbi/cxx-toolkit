---
layout: default
title: Networking and IPC
nav: pages/ch_conn
---


{{ page.title }}
====================================

Connection Library [Library `xconnect`: [include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect)]
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## Introduction

The connection library includes a generic socket interface ([SOCK](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK)), connection object ([CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN)), and specialized [CONNECTOR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONNECTOR) constructors (for sockets, files, HTTP, and services) to be used as engines for connections. It also provides access to the load-balancing daemon and NCBI named service dispatching facilities.

Although the core of the Connection Library is written in C and has an underlying C interface, the analogous C++ interfaces have been built to provide objects that work smoothly with the rest of the Toolkit.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Because of security issues, not all links in the public version of this file are accessible by outside NCBI users.

## Chapter Outline

The following is an outline of the topics presented in this chapter, with links to relevant source files:

-   [Overview](#ch_conn.conn_interf_lib)

-   [Connections and CONNECTORs](#ch_conn.conn_def)

    -   The notions of a connection and a [CONNECTOR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONNECTOR); different types of connections that the library provides; programming API.

    -   Open and Manage Connections to an Abstract I/O -- `ncbi_connection`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connection.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_connection.c)]

    -   Abstract I/O -- `ncbi_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_connector.c)]

    -   [Socket Connector](#ch_conn.socket_connector) -- `ncbi_socket_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_socket_connector.c)]

    -   [File Connector](#ch_conn.file_connector) -- `ncbi_file_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_file_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_file_connector.c)]

    -   In-memory Connector -- `ncbi_memory_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_memory_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_memory_connector.c)]

    -   Higher level connection protocols:

        -   [Common Parameters](#ch_conn.Connection_related_parameters) for higher level connectors

        -   [HTTP Connector](#ch_conn.HTTP_Connector) -- `ncbi_http_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_http_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_http_connector.c)]

        -   [Service Connector](#ch_conn.service_connector) -- `ncbi_service_connector`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service_connector.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_service_connector.c)]

-   [Debugging Tools and Troubleshooting Documentation](#ch_conn.conn_debug_tools)

-   [CONN-Based C++ Streams and Stream Buffers](#ch_conn.cpp_connection_streams) -- `ncbi_conn_stream`[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_conn_stream.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_conn_stream.cpp)], `ncbi_conn_streambuf`[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_conn_streambuf.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_conn_streambuf.cpp)]

    -   Built on top of connection objects

-   [Servers and Service Mapping API](#ch_conn.service_mapping_api)

    -   Description of service name resolution API

    -   NCBI Server Meta-Address Info -- `ncbi_server_info`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_server_info.h) \| [p.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_server_infop.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_server_info.c)]

    -   Resolve NCBI Service Name to the Server Meta-Address -- `ncbi_service`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service.h) \| [p.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_servicep.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_service.c)]

    -   Resolve NCBI Service Name to the Server Meta-Address using NCBI Network Dispatcher ([DISPD](ch_app.html#ch_app.DISPD_Network_Dispat)) -- `ncbi_dispd`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_dispd.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_dispd.c)]

    -   Resolve NCBI Service Name to the Server Meta-Address using NCBI [Load-Balancing Service Mapper (LBSM)](ch_app.html#ch_app.Load_Balancing_Servi) -- `ncbi_lbsmd`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsmd.h) \| [.c](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsmd.c) \| [\_stub.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsmd_stub.c)]

    -   Resolve NCBI Service Name to the Server Meta-Address using NCBI LINKERD -- `ncbi_linkerd`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_linkerd.h) \| [.c](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_linkerd.c)]

    -   Resolve NCBI Service Name to the Server Meta-Address using NCBI NAMERD -- `ncbi_namerd`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_namerd.h) \| [.c](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_namerd.c)]

    -   [NCBI LBSM client-server data exchange API](#ch_conn.service_mapping_api) -- `ncbi_lbsm`[[.h](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsm.h) \| [.c](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsm.c)]

    -   Implementation of LBSM Using SYSV IPC (shared memory and semaphores) -- `ncbi_lbsm_ipc`[[.h](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsm_ipc.h) \| [.c](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_lbsm_ipc.c)]

    -   [Announcement/deannouncement of servers in LBOS](#ch_conn.Lbos_Self_Announce_Deannounce) - **DEPRECATED**

-   [Threaded Server Support](#ch_conn.Threaded_Server_Supp)

For additional related information, see:

-   C++ Interfaces to the Library

    -   [Diagnostic Handler for E-Mailing Logs](ch_cgi.html#ch_cgi.cgi_diag.html) -- `email_diag_handler`[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/email_diag_handler.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/email_diag_handler.cpp)]

    -   [Using the CONNECT Library with the C++ Toolkit](ch_res.html#ch_res.c_cxx.html) -- `ncbi_core_cxx`[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_core_cxx.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_core_cxx.cpp)]

    -   Multithreaded Network Server Framework -- `threaded_server`[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/threaded_server.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/threaded_server.cpp)]

-   [Basic Types and Functionality (for Registry, Logging and MT Locks)](ch_res.html#ch_res.c_cxx.html_ref_RunTimeResources) -- `ncbi_core`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_core.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_core.c)], `ncbi_types`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_types.h)]

-   Portable TCP/IP Socket Interface -- `ncbi_socket`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_socket.c)]

-   Memory Management

    -   Memory-Resident FIFO Storage Area -- `ncbi_buffer`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_buffer.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_buffer.c)]

    -   Simple Heap Manager With Primitive Garbage Collection -- `ncbi_heapmgr`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_heapmgr.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_heapmgr.c)]

-   Connection Library Utilities

    -   Connection Utilities -- `ncbi_connutil`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connutil.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_connutil.c)]

    -   Send Mail (in accordance with RFC821 [protocol] and RFC822 [headers]) -- `ncbi_sendmail`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_sendmail.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_sendmail.c)]

    -   Auxiliary (optional) Code for `ncbi_core`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_core.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_core.c)] -- `ncbi_util`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_util.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_util.c)]

    -   Non-ANSI, Widely Used Functions -- `ncbi_ansi_ext`[[.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_ansi_ext.h) \| [.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/ncbi_ansi_ext.c)]

-   daemons [[src/connect/daemons](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons)]

    -   [LBSMD](ch_app.html#ch_app.Load_Balancing_Servi)

    -   [DISPD](ch_app.html#ch_app.DISPD_Network_Dispat)

    -   [Firewall Daemon](ch_app.html#ch_app.Firewall_Daemon_FWDa)

-   Test cases [[src/connect/test](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/test)]

<a name="ch_conn.conn_interf_lib"></a>

Overview
--------

The NCBI C++ platform-independent connection library ([src/connect](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect) and [include/connect](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect)) consists of two parts:

-   Lower-level library written in C (also used as a replacement of the existing connection library in the NCBI C Toolkit)

-   Upper-level library written in C++ and using C++ streams

Functionality of the library includes:

-   [SOCK](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK) interface (sockets), which works interchangeably on most UNIX varieties, MS Windows, and Mac

-   [SERV](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV) interface, which provides mapping of symbolic service names into server addresses

-   [CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN) interface, which allows the creation of a `connection`, the special object capable to do read, write, etc. I/O operations

-   C++ streams built on top of the [CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN) interface

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): The lowest level ([SOCK](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK)) interface is not covered in this document. A well-commented API can be found in [connect/ncbi\_socket.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket.h).

To use the CONNECT library, your makefile should include:

    LIB  = xconnect xncbi
    LIBS = $(NETWORK_LIBS) $(ORIG_LIBS)

<a name="ch_conn.conn_def"></a>

Connections and Connectors
--------------------------

This section discusses the "C API" for connections and connectors. There is a corresponding "C++ API" (see the [C++ Connection Streams](#ch_conn.cpp_connection_streams) section below) that is built on top of, is an approximate superset of, and should generally be preferred over, the "C API".

There are three simple types of connections: `socket`, `file` and `http`; and one hybrid type, `service` connection.

A connection is created with a call to [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create), declared in [connect/ncbi\_connection.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connection.h), and returned by a pointer to [CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN) passed as a second argument:

    CONN conn; /* connection handle */
    EIO_Status status = CONN_Create(connector, &conn);

The first argument of this function is a handle of a `connector`, a special object implementing the functionality of the connection being built. For each type of connection there is a special connector in the library. For each connector, one or more "constructors" are defined, e.g. [SOCK\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnector), each returning the connector's handle. Connectors' constructors are defined in individual header files, such as [connect/ncbi\_socket\_connector.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket_connector.h), [connect/ncbi\_http\_connector.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_http_connector.h), [connect/ncbi\_service\_connector.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service_connector.h), etc. [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create) resets all timeouts to the default value [kDefaultTimeout](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=kDefaultTimeout).

***Note:*** Connectors, connections, and the objects represented by their metadata are all separate. Furthermore, connections are created in "closed" state, so invalid parameters given to the connector aren't detected when the connector and connections based on it are created. This means, for example, that a connection created by passing an invalid file name to [FILE\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FILE_CreateConnector) will not fail for either the connector or connection, because both objects themselves are fine. A failure will only occur if the file name is invalid when an attempt is made to use the connection.

After successful creation with [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create), the following calls from [CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN) API [connect/ncbi\_connection.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connection.h) become available. All calls (except [CONN\_GetTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_GetTimeout) and [CONN\_GetType()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_GetType) ) return an I/O completion status of type [EIO\_Status](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EIO_Status). Normal completion has code **`eIO_Success`**.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): There is no means to "open" a connection: it is done automatically when actually needed, and in most cases at the first I/O operation. But the forming of an actual link between source and destination can be postponed even longer. These details are hidden and made transparent to the connection's user. The connection is seen as a two-way communication channel, which is clear for use immediately after a call to [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): If for some reason [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create) failed to create a connection (return code differs from **`eIO_Success`**), then the connector passed to this function is left intact, that is, its handle can be used again. Otherwise, if the connection is created successfully, the passed connector handle becomes invalid and cannot be referenced anywhere else throughout the program (with one exception, however: it may be used as a replacing connector in a call to [CONN\_ReInit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_ReInit) for the same connection).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): There are no "destructors" on public connectors. A connector successfully put into connection is deleted automatically, along with that connection by [CONN\_Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Close), or explicitly with a call to [CONN\_ReInit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_ReInit), provided that the replacing connector is **`NULL`** or different from the original.

<a name="ch_conn.T.nc_conn_readconn_conn_void_buf"></a>

|------------------------------------------------------------------------------------|
| `CONN_Read(CONN conn, void* buf, size_t size, size_t* n_read, EIO_ReadMethod how)` |

<div class="table-scroll"></div>

Read or peek data, depending on read method **`how`**, up to **`size`** bytes from connection to specified buffer **`buf`**, return (via pointer argument **`n_read`**) the number of bytes actually read. The last argument **`how`** can be one of the following:

-   [eIO\_ReadPlain](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EIO_ReadMethod) - to read data in a regular way, that is, extracting data from the connection;

-   **`eIO_ReadPeek`** - to peek data from the connection, i.e., the next read operation will see the data again;

-   **`eIO_ReadPersist`** - to read exactly (not less than) **`size`** bytes or until an error condition occurs.

A return value other than **`eIO_Success`** means trouble. Specifically, the return value **`eIO_Timeout`** indicates that the operation could not be completed within the allotted amount of time; but some data may, however, be available in the buffer (e.g., in case of persistent reading, as with **`eIO_ReadPersist`**), and this is actually the case for any return code.

<a name="ch_conn.T.nc_conn_readlineconn_conn_char"></a>

|---------------------------------------------------------------------|
| `CONN_ReadLine(CONN conn, char* line, size_t size, size_t* n_read)` |

<div class="table-scroll"></div>

Read up to **`size`** bytes from connection into the string buffer pointed to by **`line`**. Stop reading if either '\\n' or an error is encountered. Replace '\\n' with '\\0'. Upon return **`*n_read`** contains the number of characters written to **`line`**, not including the terminating '\\0'. If not enough space provided in **`line`** to accomodate the '\\0'-terminated line, then all **`size`** bytes are used up and **`*n_read`** is equal to **`size`** upon return - this is the only case when **`line`** will not be '\\0'-terminated.

Return code advises the caller whether another read can be attempted:

-   **`eIO_Success`** -- read completed successfully, keep reading;

-   other code -- an error occurred, and further attempt may fail.

This call utilizes **`eIO_Read`** timeout as set by ***CONN\_SetTimeout().***

<a name="ch_conn.T.nc_conn_writeconn_conn_const_v"></a>

|--------------------------------------------------------------------------|
| `CONN_Write(CONN conn, const void* buf, size_t size, size_t* n_written)` |

<div class="table-scroll"></div>

Write up to **`size`** bytes from the buffer **`buf`** to the connection. Return the number of actually written bytes in **`n_written`**. It may not return **`eIO_Success`** if no data at all can be written before the write timeout expired or an error occurred. Parameter **`how`** modifies the write behavior:

-   [eIO\_WritePlain](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EIO_WriteMethod) - return immediately after having written as little as 1 byte of data, or if an error has occurred;

-   **`eIO_WritePersist`** - return only after having written all of the data from **`buf`** (**`eIO_Success`**), or if an error has occurred (fewer bytes written, non-**`eIO_Success`**).

***Note:*** See CONN\_SetTimeout() for how to set the write timeout.

<a name="ch_conn.T.nc_conn_pushbackconn_conn_cons"></a>

|----------------------------------------------------------|
| `CONN_PushBack(CONN conn, const void* buf, size_t size)` |

<div class="table-scroll"></div>

Push back **`size`** bytes from the buffer **`buf`** into connection. Return **`eIO_Success`** on success, other code on error.

***Note 1:*** The data pushed back may not necessarily be the same as previously obtained from the connection.

***Note 2:*** Upon a following read operation, the pushed back data are taken out first.

<a name="ch_conn.T.nc_conn_getpositionconn_conn_e"></a>

|------------------------------------------------|
| `CONN_GetPosition(CONN conn, EIO_Event event)` |

<div class="table-scroll"></div>

Get read (**`event`** == **`eIO_Read`**) or write (**`event`** == **`eIO_Write`**) position within the connection. Positions are advanced from 0 on, and only concerning I/O that has caused calling to the actual connector's "read" (i.e. pushbacks never considered, and peeks -- not always) and "write" methods. Special case: **`eIO_Open`** as **`event`** causes to clear both positions with 0, and to return 0.

<a name="ch_conn.T.nc_conn_flushconn_conn"></a>

|-------------------------|
| `CONN_Flush(CONN conn)` |

<div class="table-scroll"></div>

Explicitly flush connection from any pending data written by [CONN\_Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Write).

***Note 1:*** [CONN\_Flush()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Flush) effectively opens connection (if it wasn't open yet).

***Note 2:*** Connection considered open if underlying connector's "Open" method has successfully executed; an actual data link may not yet exist.

***Note 3:*** [CONN\_Read()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Read) always calls [CONN\_Flush()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Flush) before proceeding; so does [CONN\_Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Close) but only if the connection is already open.

<a name="ch_conn.T.nc_conn_settimeoutconn_conn_ei"></a>

|-------------------------------------------------------------------------|
| `CONN_SetTimeout(CONN conn, EIO_Event action, const STimeout* timeout)` |

<div class="table-scroll"></div>

Set the timeout on the specified I/O action, [eIO\_Read](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EIO_Event), **`eIO_Write`**, **`eIO_ReadWrite`**, **`eIO_Open`**, and **`eIO_Close`**. The latter two actions are used in a phase of opening and closing the link, respectively. If the connection cannot be read (written, established, closed) within the specified period, **`eIO_Timeout`** would result from connection I/O calls. A timeout can be passed as the **`NULL`**-pointer. This special case denotes an infinite value for that timeout. Also, a special value **`kDefaultTimeout`** may be used for any timeout. This value specifies the timeout set by default for the current connection type.

<a name="ch_conn.T.nc_conn_gettimeoutconn_conn_ei"></a>

|------------------------------------------------|
| `CONN_GetTimeout(CONN conn, EIO_Event action)` |

<div class="table-scroll"></div>

Obtain (via the return value of type ***const*** [STimeout](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=STimeout)***\****) timeouts set by the [CONN\_SetTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_SetTimeout) routine, or active by default (i.e., special value **`kDefaultTimeout`**).

***Caution***: The returned pointer is valid only for the time that the connection handle is valid, i.e., up to a call to ***CONN\_Close().***

<a name="ch_conn.T.nc_conn_reinitconn_conn_connec"></a>

|-------------------------------------------------|
| `CONN_ReInit(CONN conn, CONNECTOR replacement)` |

<div class="table-scroll"></div>

This function clears the current contents of a connection and places ("immerse") a new connector into it. The previous connector (if any) is closed first (if open), then gets destroyed, and thus must not be referenced again in the program. As a special case, the new connector can be the same connector, which is currently active within the connection. It this case, the connector is not destroyed; instead, it will be effectively re-opened. If the connector passed as **`NULL`**, then the **`conn`** handle is kept existing but unusable (the old connector closed and destroyed) and can be [CONN\_ReInit()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_ReInit)'ed later. None of the timeouts are touched by this call.

<a name="ch_conn.T.nc_conn_waitconn_conn_eio_even"></a>

|------------------------------------------------------------------|
| `CONN_Wait(CONN conn, EIO_Event event, const STimeout* timeout)` |

<div class="table-scroll"></div>

Suspend the program until the connection is ready to perform reading (**`event`** =**`eIO_Read`**) or writing (**`event`** = **`eIO_Write`**), or until the timeout (if non-**`NULL`**) expires. If the timeout is passed as **`NULL`**, then the wait time is indefinite.

<a name="ch_conn.T.nc_conn_statusconn_conn_eio_ev"></a>

|-----------------------------------------------|
| `CONN_Status(CONN conn, EIO_Event direction)` |

<div class="table-scroll"></div>

Provide the information about recent low-level data exchange in the link. The operation direction has to be specified as either **`eIO_Read`** or **`eIO_Write`**. The necessity of this call arises from the fact that sometimes the return value of a [CONN](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN) API function does not really tell that the problem has been detected: suppose, the user peeks data into a 100-byte buffer and gets 10 bytes. The return status **`eIO_Success`** signals that those 10 bytes were found in the connection okay. But how do you know whether the end-of-file condition occurred during the last operation? This is where [CONN\_Status()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Status) comes in handy. When inquired about the read operation, return value **`eIO_Closed`** denotes that **`EOF`** was actually hit while making the peek, and those 10 bytes are in fact the only data left untaken, no more are expected to come.

<a name="ch_conn.T.nc_conn_closeconn_conn"></a>

|-------------------------|
| `CONN_Close(CONN conn)` |

<div class="table-scroll"></div>

Close the connection by closing the link (if open), deleting underlying connector(s) (if any) and the connection itself. Regardless of the return status (which may indicate certain problems), the connection handle becomes invalid and cannot be reused.

<a name="ch_conn.T.nc_conn_cancelconn_conn"></a>

|--------------------------|
| `CONN_Cancel(CONN conn)` |

<div class="table-scroll"></div>

Cancel the connection's I/O ability. This is **not** connection closure, but any data extraction or insertion (Read/Write) will be effectively rejected after this call (and **`eIO_Interrupt`** will result, same for [CONN\_Status()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Status)). [CONN\_Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Close) is still required to release internal connection structures.

<a name="ch_conn.T.nc_conn_gettypeconn_conn"></a>

|---------------------------|
| `CONN_GetType(CONN conn)` |

<div class="table-scroll"></div>

Return character string (null-terminated), verbally representing the current connection type, such as `"HTTP"`, `"SOCKET"`, `"SERVICE/HTTP"`, etc. The unknown connection type gets returned as **`NULL`**.

<a name="ch_conn.T.nc_conn_descriptionconn_conn"></a>

|-------------------------------|
| `CONN_Description(CONN conn)` |

<div class="table-scroll"></div>

Return a human-readable description of the connection as a character '\\0'-terminated string. The string is not guaranteed to have any particular format and is intended solely for something like logging and debugging. Return **`NULL`** if the connection cannot provide any description information (or if it is in a bad state). Application program must call ***free()*** to deallocate space occupied by the returned string when the description is no longer needed.

<a name="ch_conn.T.nc_conn_setcallbackconn_conn_e"></a>

|---------------------------------------------------------------------------------------------------------------------------------|
| `CONN_SetCallback(CONN conn, ECONN_Callback type,`<br/>`                 const SCONN_Callback* new_cb, SCONN_Callback* old_cb)` |

<div class="table-scroll"></div>

Set user callback function to be invoked upon an event specified by callback **`type`**. The old callback (if any) gets returned via the passed pointer **`old_cb`** (if not **`NULL`**). Callback structure [SCONN\_Callback](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SCONN_Callback) has the following fields: callback function `func` and `void* data`. Callback function **`func`** should have the following prototype:

`typedef void (*FCONN_Callback)(CONN conn, TCONN_Callback type, void* data)`

When called, both **`type`** of callback and **`data`** pointer are supplied. The [callback types](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ECONN_Callback) defined at the time of this writing are:

-   **`eCONN_OnClose`**

-   **`eCONN_OnRead`**

-   **`eCONN_OnWrite`**

-   **`eCONN_OnFlush`**

-   **`eCONN_OnTimeout`**

The callback function is always called prior to the event happening, e.g., a close callback is called when the connection is about to close.

***Note:*** When an **`eCONN_OnTimeout`** callback occurs, the callback type **`eCONN_OnTimeout`** gets OR'ed with the I/O direction, which timed out (**`eIO_Read`**, **`eIO_Write`**, or both when flushing), then passed as the type argument.

See the preamble to [ECONN\_Callback](https://www.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/ident?i=ECONN_Callback) for more details.

<a name="ch_conn.socket_connector"></a>

### Socket Connector

Constructors are defined in:

    #include <connect/ncbi_socket_connector.h>

A socket connection, based on the socket connector, brings almost direct access to the [SOCK](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket.h) API. It allows the user to create a peer-to-peer data channel between two programs, which can be located anywhere on the Internet.

To create a socket connection, user has to create a socket connector first, then pass it to [CONN\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create), as in the following example:

    #include <connect/ncbi_socket_connector.h>
    #include <connect/ncbi_connection.h>

    #define MAX_TRY 3 /* Try to connect this many times before giving up */

    unsigned short port = 1234;
    CONNECTOR socket_connector = SOCK_CreateConnector("host.foo.com", port,
        MAX_TRY);
    if (!socket_connector)
        fprintf(stderr, "Cannot create SOCKET connector");
    else {
        CONN conn;
        if (CONN_Create(socket_connector, &conn) != eIO_Success)
            fprintf(stderr, "CONN_Create failed");
        else {
            /* Connection created ok, use CONN_... function */
            /* to access the network */
            ...
            CONN_Close(conn);
        }
    }

A variant form of this connector's constructor, [SOCK\_CreateConnectorEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnectorEx), takes three more arguments: a pointer to data (of type ***void\****), data size (bytes) to specify the data to be sent as soon as the link has been established, and [flags](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TSOCK_Flags).

The `CONN` library defines two more constructors, which build SOCKET connectors on top of existing [SOCK](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket.h) objects: [SOCK\_CreateConnectorOnTop()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnectorOnTop) and [SOCK\_CreateConnectorOnTopEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnectorOnTopEx), the description of which is intentionally omitted here because SOCK is not discussed either. Please refer to the [description](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket_connector.h) in the Toolkit code.

<a name="ch_conn.file_connector"></a>

### File Connector

Constructors defined in:

    #include <connect/ncbi_file_connector.h>

    CONNECTOR file_connector = FILE_CreateConnector("InFile", "OutFile");

This connector could be used for both reading and writing files, when input goes from one file and output goes to another file. (This differs from normal file I/O, when a single handle is used to access only one file, but rather resembles data exchange via socket.)

Extended variant of this connector's constructor, [FILE\_CreateConnectorEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FILE_CreateConnectorEx), takes an additional argument, a pointer to a structure of type [SFILE\_ConnAttr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SFileConnAttr) describing file connector attributes, such as the initial read position to start from in the input file, an open mode for the output file (append [eFCM\_Append](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EFILE_ConnMode), truncate **`eFCM_Truncate`**, or seek **`eFCM_Seek`** to start writing at a specified file position), and the position in the output file, where to begin output. The attribute pointer passed as **`NULL`** is equivalent to a call to [FILE\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=FILE_CreateConnector), which reads from the very beginning of the input file and entirely overwrites the output file (if any), implicitly using **`eFCM_Truncate`**.

<a name="ch_conn.Connection_related_parameters"></a>

### Connection-related parameters for higher-level connection protocols

The network information structure (from [connect/ncbi\_connutil.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connutil.h)) defines parameters of the connection point, where a server is running. See the [Library Configuration](ch_libconfig.html#ch_libconfig.libconfig_connect) chapter for descriptions of the corresponding configuration parameters.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Not all parameters of the structure shown below apply to every network connector.

    /* Network connection related configurable info struct.
     * ATTENTION:  Do NOT fill out this structure (SConnNetInfo) "from scratch"!
     *             Instead, use ConnNetInfo_Create() described below to create
     *             it, and then fix (hard-code) some fields, if really necessary.
     * NOTE1:      Not every field may be fully utilized throughout the library.
     * NOTE2:      HTTP passwords can be either clear text or Base64 encoded values
     *             enclosed in square brackets [] (which are not Base-64 charset).
     *             For encoding / decoding, one can use command line open ssl:
     *             echo "password|base64value" | openssl enc {-e|-d} -base64
     *             or an online tool (search the Web for "base64 online").
     */
    typedef struct {  /* NCBI_FAKE_WARNING: ICC */
        char            client_host[256]; /* effective client hostname ('\0'=def)*/
        EBURLScheme     scheme:3;         /* only pre-defined types (limited)    */
        TReqMethod      req_method:5;     /* method to use in the request (HTTP) */
        unsigned        version:1;        /* HTTP/1.v (or selected by req_method)*/
        EBFWMode        firewall:2;       /* to use firewall (relay otherwise)   */
        unsigned        stateless:1;      /* to connect in HTTP-like fashion only*/
        unsigned        lb_disable:1;     /* to disable local load-balancing     */
        EBDebugPrintout debug_printout:2; /* switch to printout some debug info  */
        unsigned        http_proxy_leak:1;/* non-zero when can fallback to direct*/
        char            user[64];         /* username (if specified)             */
        char            pass[64];         /* password (if any)                   */
        char            host[256];        /* host to connect to                  */
        unsigned short  port;             /* port to connect to, host byte order */
        char            path[1024];       /* path (e.g. to  a CGI script or page)*/
        char            args[1024];       /* args (e.g. for a CGI script)        */
        char            http_proxy_host[256]; /* hostname of HTTP proxy server   */
        unsigned short  http_proxy_port;      /* port #   of HTTP proxy server   */
        char            http_proxy_user[64];  /* http proxy username (if req'd)  */
        char            http_proxy_pass[64];  /* http proxy password             */
        char            proxy_host[256];  /* CERN-like (non-transp) f/w proxy srv*/
        unsigned short  max_try;          /* max. # of attempts to connect (>= 1)*/
        const STimeout* timeout;          /* ptr to I/O timeout(infinite if NULL)*/
        const char*     http_user_header; /* user header to add to HTTP request  */
        const char*     http_referer;     /* default referrer (when not spec'd)  */
        NCBI_CRED       credentials;      /* connection credentials (optional)   */

        /* the following field(s) are for the internal use only -- don't touch!  */
        STimeout        tmo;              /* default storage for finite timeout  */
        const char      svc[1];           /* service which this info created for */
    } SConnNetInfo;

***Caution***: Unlike other "static fields" of this structure, [http\_user\_header](#ch_conn.Connection_related_parameters) (if non-**`NULL`**) is assumed to be dynamically allocated on the heap (via a call to ***malloc***, ***calloc***, or a related function, such as ***strdup***).

<a name="ch_conn.ref_ConnNetInfo_Create_ref"></a>

#### ConnNetInfo convenience API

Although nothing prevents users from creating and populating the above [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structure field-by-field, this can lead to memory leaks, and there is a better, easier, much safer, and configurable way to deal with this structure. Unless there's a compelling reason not to, users should create this structure using [ConnNetInfo\_Create()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_Create) and destroy it with [ConnNetInfo\_Destroy()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_Destroy). The creation step will populate the structure with configured values, if any, and the destruction step will properly free allocated memory, if any. See [connect/ncbi\_connutil.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_connutil.h) for the interface definition.

The convenience API consists of these functions:

-   [ConnNetInfo\_Create](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_Create)`(const char* service)`<br/><br/>Create and return a pointer to a new [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structure, filled either with parameters specific to a named **`service`** or with default values (if the **`service`** is specified as **`NULL`**, which is typical in the case of ordinary HTTP connections). Parameters for the structure are taken from (in order of precedence):

    1.  environment variables of the form **`<service>_CONN_<name>`**, where **`name`** is the name of the field;

    2.  a service-specific registry section (see below the note about the registry) named **`[service]`** using the key **`CONN_<name>`**;

    3.  an environment variable of the form **`CONN_<name>`**; or

    4.  a registry section named **`[CONN]`** using **`name`** as a key.<br/><br/>The default value is applied if none of the above resulted in a successful match.<br/><br/>The search for the keys in both environment and registry is not case-sensitive, but the values of the keys are case sensitive (except for enumerated types and boolean values, which can be of any, even mixed, case). Boolean fields accept `1`, `"ON"`, `"YES"`, and `"TRUE"` as `true` values; all other values are treated as `false`. In addition to a floating point number treated as a number of seconds, **`timeout`** can accept (case-insensitively) the keyword `"INFINITE"`.<br/><br/>[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): The first two steps in the above sequence are skipped if the **`service`** name is passed as **`NULL`**.<br/><br/>***Caution***: The library can not provide reasonable default values for **`path`** and **`args`** when the structure is used for HTTP connectors.

<!-- -->

-   [ConnNetInfo\_Destroy](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_Destroy)`(SConnNetInfo* info)`<br/><br/>Delete and free the info structure via a passed pointer (note that the HTTP user header http\_user\_header is freed as well).

<!-- -->

-   [ConnNetInfo\_SetUserHeader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_SetUserHeader)`(SConnNetInfo* info, const char* new_user_header)`<br/><br/>Set the new HTTP user header (freeing the previous one, if any) by cloning the passed string argument and storing it in the http\_user\_header field. New\_user\_header passed as NULL resets the field.

<!-- -->

-   [ConnNetInfo\_Clone](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConnNetInfo_Clone)`(SConnNetInfo* info)`<br/><br/>Create and return a pointer to a new [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structure, which is an exact copy of the passed structure. This function is recognizes the dynamic nature of the HTTP [user header field](#ch_conn.Connection_related_parameters).

***Note about the registry:*** The registry used by the `connect` library is separate from the [CNcbiRegistry](ch_core.html#ch_core.registry) class. To learn more about the difference and how to use both objects together in a single program, please see [Using NCBI C and C++ Toolkits Together](ch_res.html#ch_res.c_cxx.html).

<a name="ch_conn.HTTP_Connector"></a>

### HTTP Connector

Constructors defined in:

    #include <connect/ncbi_http_connector.h>

The simplest form of this connector's constructor takes three parameters:

    CONNECTOR HTTP_CreateConnector(const SConnNetInfo* net_info,
                                   const char*         user_header,
                                   THTTP_Flags         flags);

a pointer to the network information structure (can be **`NULL`**), a pointer to a custom HTTP tag-value(s) called a user-header, and a bitmask of various flags. The user-header has to be in the form `"HTTP-Tag: Tag-value\r\n"`, or even multiple tag-values delimited and terminated by `"\r\n"`. If specified, the **`user_header`** parameter overrides the corresponding field in the passed **`net_info`**.

The following fields of [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) pertain to the HTTP connector: **`client_host`**, **`host`**, **`port`**, **`path`**, **`args`**, **`req_method`** (can be one of `"GET"`, `"POST"`, and `"ANY"`), **`timeout`**, **`max_try`** (analog of maximal try parameter for the [socket connector](#ch_conn.socket_connector)), **`http_proxy_host`**, **`http_proxy_port`**, and **`debug_printout`** (values are `"NONE"` to disable any trace printout of the connection data, `"SOME"` to enable printing of [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structure before each connection attempt, and `"DATA"` to print both headers and data of the HTTP packets in addition to dumps of [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structures). Values of other fields are ignored.

<a name="ch_conn.fHCC_KeepHeader_ref"></a>

#### HTTP connector's flags

Argument [flags](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TSOCK_Flags) in the HTTP connector's constructor is a bitwise OR of the following values:

-   **`fHTTP_AutoReconnect`** - By default, only one request/reply is allowed and subsequent write attempts will result in **`eIO_Closed`**. This flag allows multiple request/reply HTTP transactions, using the same URL and parameters for each request.<br/>

-   **`fHTTP_Flushable`** - By default, all data written to the connection are kept until a read begins (even though [CONN\_Flush()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Flush) might have been called in between the writes). With this flag set, [CONN\_Flush()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Flush) will result in the data actually being sent to the server side, so a subsequent write will form a new request and not get added to the previous one. Also, this flag ensures that the connector sends at least an HTTP header on "CLOSE" and re-"CONNECT", even if no data for an HTTP body have been written.<br/>

-   **`fHTTP_KeepHeader`** - By default, the HTTP connection parses the HTTP header and any HTTP errors. Thus, reading from the connection normally only returns data from the HTTP body. This flag disables that feature, and the HTTP header is not parsed but instead is passed "as is" to the application on a call to [CONN\_Read()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_Create). The HTTP header (i.e. everything up to and including the first "`\r\n\r\n` ") from the CGI script's response (including any server error), is then made available for reading. ***Note:*** This flag disables automatic authorization and redirection.<br/>

-   **`fHTTP_UrlDecodeInput`** - Perform URL decoding of the HTTP response body on read (interpreting it as single-part and URL-encoded), and deliver decoded data to the user.<br/>

-   **`fHTTP_UrlEncodeOutput`** - URL encode output data passed in the HTTP body to the HTTP server.<br/>

-   **`fHTTP_UrlCodec`** - Perform both decoding and encoding (**`fHTTP_UrlDecodeInput | fHTTP_UrlEncodeOutput`**).<br/>

-   **`fHTTP_NoUpread`** - By default, writing always verifies that incoming data are available for reading, and those data are extracted and stored in an internal buffer. This default behavior avoids I/O deadlock, when writing creates a backward stream of data, which, if unread, blocks the connection entirely. This flag disables the default behavior, making connections ***not*** attempt to empty incoming data channel into a temporary intermediate buffer while sending data to the HTTP server.<br/>

-   **`fHTTP_DropUnread`** - By default, all data sent by the server get stored - even if not all of it had been requested prior to a "Write" following a "Read" (stream emulation). This flag disables that behavior, making the connection not collect incoming data in "Read" mode before switching into "Write" mode for preparing the next request. <br/>

-   **`fHTTP_NoAutoRetry`** - Do not attempt any auto-retries when a connection fails (this flag effectively means having **`SConnNetInfo::max_try`** set to 1).<br/>

-   **`fHTTP_NoAutomagicSID`** - Do not add NCBI SID automagically.<br/>

-   **`fHTTP_InsecureRedirect`** - For security reasons the following redirects comprise security risk, and thus, are prohibited: switching from https to http, and/or re-POSTing data (regardless of the transport, either http or https). This flag allows such redirects (when encountered) to be honored.<br/>

-   **`fHTTP_AdjustOnRedirect`** - Call adjust routine for redirects, too.

The HTTP connection will be established using the following URL: `http://host:port/path?args`

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note) that **`path`** has to have a leading slash "/" as the first character, that is, only "http://" and "?" are added by the connector; all other characters appear exactly as specified (but may be encoded with **`fHTTP_UrlEncodeArgs`**). The question mark does not appear if the URL has no arguments.

A more elaborate form of the HTTP connector's constructor has the following prototype:

    typedef enum {
        eHTTP_HeaderError    = 0,  /**< Parse failed, treat as a server error */
        eHTTP_HeaderSuccess  = 1,  /**< Parse succeeded, retain server status */
        eHTTP_HeaderContinue = 2,  /**< Parse succeeded, continue with body   */
        eHTTP_HeaderComplete = 3   /**< Parse succeeded, no more processing   */
    } EHTTP_HeaderParse;
    typedef EHTTP_HeaderParse (*FHTTP_ParseHeader)
    (const char*         http_header,   /* HTTP header to parse                  */
     void*               user_data,     /* supplemental user data                */
     int                 server_error   /* != 0 if HTTP error (NOT 2xx code)     */
     );

    typedef int/*bool*/ (*FHTTP_Adjust)
    (SConnNetInfo*       net_info,      /* net_info to adjust (in place)         */
     void*               user_data,     /* supplemental user data                */
     unsigned int        failure_count  /* low word: # of failures since open    */
     );

    typedef void        (*FHTTP_Cleanup)
    (void*               user_data      /* supplemental user data                */
     );

    CONNECTOR HTTP_CreateConnectorEx
    (const SConnNetInfo* net_info,
     THTTP_Flags         flags,
     FHTTP_ParseHeader   parse_header,  /* may be NULL, then no addtl. parsing   */
     void*               user_data,     /* user data for HTTP CBs (callbacks)    */
     FHTTP_Adjust        adjust,        /* may be NULL                           */
     FHTTP_Cleanup       cleanup        /* may be NULL                           */
     );

This form is assumed to be used rarely by the users directly, but it provides rich access to the internal management of HTTP connections.

The first two arguments are identical to their counterparts in the arguments number one and three of [HTTP\_CreateConnector()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HTTP_CreateConnector). The HTTP user header field (if any) is taken directly from the `http_user_header` field of [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo), a pointer to which is passed as **`net_info`** (which in turn can be passed as **`NULL`**, meaning to use the environment, registry, and defaults as described above).

The third parameter specifies a callback to be activated to parse the HTTP reply header (passed as a single string, with CR-LF (carriage return/line feed) characters incorporated to divide header lines). This callback also gets some custom data **`user_data`** as supplied in the fourth argument of the connector's constructor and a boolean value of `true` if the parsed response code from the server was not okay. The callback can return `false` (zero), which is considered the same way as having an error from the HTTP server. However, the pre-parsed error condition (passed in **`server_error`**) is retained, even if the return value of the callback is `true`, i.e. the callback is unable to "fix" the error code from the server. This callback is **not called** if [fHTTP\_KeepHeader](#ch_conn.fHCC_KeepHeader_ref) is set in flags.

The fifth argument is a callback, which is in control when an attempt to connect to the HTTP server has failed. On entry, this callback has current [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo), which is requested for an adjusted in an attempt that the connection to the HTTP server will finally succeed. That is, the callback can change anything in the info structure, and the modified structure will be kept for all further connection attempts, until changed by this callback again. The number (starting from 1) of successive failed attempts is given in the argument of the last callback. The callback return value `true` (non-zero) means a successful adjustment. The return value `false` (zero) stops connection attempts and returns an error to the application.

When the connector is being destroyed, the custom object **`user_data`** can be destroyed in the callback, specified as the last argument of the extended constructor.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Any callback may be specified as **`NULL`**, which means that no action is foreseen by the application, and default behavior occurs.

<a name="ch_conn.service_connector"></a>

### Service Connector

Constructors defined in:

    #include <connect/ncbi_service_connector.h>

This is the most complex connector in the library. It can initiate data exchange between an application and a named NCBI service, and the data link can be either wrapped in HTTP or be just a byte-stream (similar to a socket). In fact, this connector sits on top of either [HTTP](#ch_conn.Connection_related_parameters) or [SOCKET](#ch_conn.socket_connector) connectors.

The library provides two forms of the connector's constructor:

    SERVICE_CreateConnector(const char* service_name);
    SERVICE_CreateConnectorEx(
        const char*           service_name,
                                        /* The registered name of an NCBI service */
        TSERV_Type            types,    /* Accepted server types, bitmask */
        const SConnNetInfo*   net_info, /* Connection parameters */
        const SSERVICE_Extra* params);  /* Additional set of parameters, may be NULL */

The first form is equivalent to `SERVICE_CreateConnectorEx(service_name, fSERV_Any, 0, 0)`. A named NCBI service is a CGI program or a stand-alone server (can be one of two supported types), which runs at the NCBI site and is accessible by the outside world. A special dispatcher (which runs on the [NCBI Web servers](https://www.ncbi.nlm.nih.gov)) performs automatic switching to the appropriate server without the client having to know the actual connection point. The client just uses the main entry gate of the NCBI Web (usually, [www.ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov)) with a request to have a service "`service_name`". Then, depending on the service availability, the request will be declined, rejected, or honored by switching and routing the client to the machine actually running the server.

To the client, the entire process of dispatching is completely transparent (for example, try clicking several times on either of the latter two links and see that the error replies are actually sent from different hosts, and the successful processing of the first link is done by one of several hosts running the bouncing service).

***Note:*** Services can be [redirected](#ch_conn.Service_Redirection).

The [Dispatching Protocol](ch_app.html#ch_app.DISPD_Network_Dispat) per se is implemented on top of HTTP protocol and is parsed by a CGI program [dispd.cgi](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/dispd_cgi.c) (or another dispatching CGI), which is available on the NCBI Web. On every server running the named services, another program, called the [load-balancing daemon](ch_app.html#ch_app.Load_Balancing_Servi) ([lbsmd](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/lbsmd.c)), is executing. This daemon supports having the same service running on different machines and provides a choice of the one machine that is less loaded. When **dispd.cgi** receives a request for a named service, it first consults the load-balancing table, which is broadcasted by each load-balancing daemon and populated in a network-wide form on each server. When the corresponding server is found, the client request can be passed, or a dedicated connection to the server can be established. The dispatching is made in such a way that it can be also used directly from most Internet browsers.

The named service facility uses the following distinction of server types:

-   HTTP servers, which are usually CGI programs:

    -   ***HTTP\_GET*** servers are those accepting requests only using the HTTP ***GET*** method.

    -   ***HTTP\_POST*** servers are those accepting requests only using the HTTP ***POST*** method.

    -   ***HTTP*** servers are those accepting both of either ***GET*** or ***POST*** methods.

-   ***NCBID*** servers are those run by a special CGI engine, called [ncbid.cgi](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/dispd_cgi.c), a configurable program (now integrated within [ncbid.cgi](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/dispd_cgi.c) itself) that can convert byte-stream output from another program (server) started by the request from a dispatcher, to an HTTP-compliant reply (that is, a packet having both HTTP header and body, and suitable, for example, for Web browsers).

-   ***STANDALONE*** servers, similar to mailing daemons, are those listening to the network, on their own, for incoming connections.

-   ***FIREWALL*** servers are the special pseudo-servers, not existing in reality, but that are created and used internally by the dispatcher software to indicate that only a firewall connection mode can be used to access the requested service.

-   ***DNS*** servers are beyond the scope of this document because they are used to declare domain names, which are used internally at the NCBI site to help load-balancing based on DNS lookup (see [here](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/mghbn.c)).

A formal description of these types is given in [connect/ncbi\_server\_info.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_server_info.h):

    /* Server types
     */
    typedef enum {
        fSERV_Ncbid      = 0x01,
        fSERV_Standalone = 0x02,
        fSERV_HttpGet    = 0x04,
        fSERV_HttpPost   = 0x08,
        fSERV_Http       = fSERV_HttpGet | fSERV_HttpPost,
        fSERV_Firewall   = 0x10,
        fSERV_Dns        = 0x20
    } ESERV_Type;

    #define fSERV_Any           0
    #define fSERV_StatelessOnly 0x80
    typedef unsigned TSERV_Type;  /* bit-wise OR of "ESERV_Type" flags */

The bitwise `OR` of the [ESERV\_Type](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ESERV_Type) flags can be used to restrict the search for the servers, matching the requested service name. These flags passed as argument **`types`** are used by the dispatcher when figuring out which server is acceptable for the client. A special value `0` (or, better **`fSERV_Any`**) states no such preference whatsoever. A special bit-value **`fSERV_StatelessOnly`** set, together with other bits or just alone, specifies that the servers should be of stateless (HTTP-like) type only, and it is the client who is responsible for keeping track of the logical sequence of the transactions.

The following code fragment establishes a service connection to the named service `"io_bounce"`, using only stateless servers:

    CONNECTOR c;
    CONN conn;
    if(!(c = SERVICE_CreateConnectorEx("io_bounce", fSERV_StatelessOnly, 0, 0))) {
        fprintf(stderr, "No such service available");
    } else if (CONN_Create(c, &conn) != eIO_Success) {
        fprintf(stderr, "Failed to create connection");
    } else {
        static const char buffer[] = "Data to pass to the server";
        size_t n_written;
        CONN_Write(conn, buffer, sizeof(buffer) - 1, &n_written);
        ...
    }

The real type of the data channel can be obtained via a call to [CONN\_GetType()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CONN_GetType).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): In the above example, the client has no assumption of how the data actually passed to the server. The server could be of any type in principle, even a stand-alone server, which was used in the request/reply mode of one-shot transactions. If necessary, such wrapping would have been made by the dispatching facility as well.

The next-to-last parameter of the extended constructor is the network info, described in the section devoted to the [HTTP connector](#ch_conn.Connection_related_parameters). The service connector uses all fields of this structure, except for [http\_user\_header](#ch_conn.Connection_related_parameters), and the following assumptions apply:

-   **`path`** specifies the dispatcher program (defaulted to **dispd.cgi**)

-   **`args`** specifies parameters for the requested service (this is service specific, no defaults)

-   **`stateless`** is used to set the **`fSERV_StatelessOnly`** flag in the server type bitmask, if it was not set there already (which is convenient for modifying the dispatch by using environment and/or registry, if the flag is not set, yet allows hardcoding of the flag at compile time by setting it in the constructor's **`types`** argument explicitly)

-   **`lb_disable`** set to `true` (non-zero) means to always use the remote dispatcher (via network connection), even if locally running load-balancing daemon is available (by default, the local load-balancing deamon is consulted first to resolve the name of the service)

-   **`firewall`** set to true (non-zero) disables the direct connection to the service; instead,

    -   a connection to a proxy [firewall daemon](ch_app.html#ch_app.Firewall_Daemon_FWDa) ([fwdaemon](https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/fwdaemon.c)), running at the NCBI site, is initiated to pass the data in stream mode;

    -   or data get relayed via the dispatcher, if the stateless server is used

-   **`http_user_header`** merged not to conflict with special dispatcher parameter.

As with the HTTP connector, if the network information structure is specified as **`NULL`**, the default values are obtained as described above, as with the call to [ConnNetInfo\_Create(service\_name)](#ch_conn.ref_ConnNetInfo_Create_ref).

Normally, the last parameter of [SERVICE\_CreateConnectorEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERVICE_CreateConnectorEx) is left **`NULL`**, which sets all additional parameters to their default values. Among others, this includes the default procedure of choosing an appropriate server when the connector is looking for a mapping of the service name into a server address. To see how this parameter can be used to change the mapping procedure, please see the [service mapping API](#ch_conn.service_mapping_api) section. The library provides an additional interface to the service mapper, which can be found in [connect/ncbi\_service.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service.h).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Requesting **`fSERV_Firewall`** in the **`types`** parameter effectively selects the firewall mode regardless of the network parameters, loaded via the [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) structure.

<a name="ch_conn.Service_Redirection"></a>

#### Service Redirection

Services can be redirected without changing any code - for example, to test production code with a test service, or for debugging. Services are redirected using the `<service>_CONN_SERVICE_NAME` environment variable or the `[<service>] CONN_SERVICE_NAME` registry entry (see the connection library [configuration section](ch_libconfig.html#ch_libconfig.libconfig_connect)). The client application will use the original service name, but the connection will actually be made to the redirected-to service.

<a name="ch_conn.conn_debug_tools"></a>

Debugging Tools and Troubleshooting
-----------------------------------

Each connector (except for the ***FILE*** connector) provides a means to view data flow in the connection. In case of the [SOCKET](#ch_conn.socket_connector) connector, debugging information can be turned on by the last argument in [SOCK\_CreateConnectorEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_CreateConnectorEx) or by using the global routine [SOCK\_SetDataLoggingAPI()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SOCK_SetDataLoggingAPI) (declared in [connect/ncbi\_socket.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_socket.h))

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): In the latter case, every socket (including sockets implicitly used by other connectors such as ***HTTP*** or ***SERVICE***) will generate debug printouts.

In case of [HTTP](#ch_conn.Connection_related_parameters) or [SERVICE](#ch_conn.service_connector) connectors, which use [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo), debugging can be activated directly from the environment by setting **`CONN_DEBUG_PRINTOUT`** to `TRUE` or `SOME`. Similarly, a registry key **`DEBUG_PRINTOUT`** with a value of either `TRUE` or **`SOME`** found in the section **`[CONN]`** will have the same effect: it turns on logging of the connection parameters each time the link is established. When set to `ALL`, this variable (or key) also turns on debugging output on all underlying sockets ever created during the life of the connection. The value `FALSE` (default) turns debugging printouts off. Moreover, for the ***SERVICE*** connector, the debugging output option can be set on a per-service basis using **`<service>_CONN_DEBUG_PRINTOUT`** environment variables or individual registry sections **`[<service>]`** and the key **`CONN_DEBUG_PRINTOUT`** in them.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Debugging printouts can only be controlled in a described way via environment or registry if and only if [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) is always created with the use of [convenience routines](#ch_conn.Connection_related_parameters).

Debugging output is always sent to the same destination, the CORE log file, which is a C object shared between both C and C++ Toolkits. As said previously, the logger is an abstract object, i.e. it is empty and cannot produce any output if not populated accordingly. The library defines a few calls gathered in [connect/ncbi\_util.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_util.h), which allow the logger to output via the ***FILE*** file pointer, such as **`stderr`**: [CORE\_SetLOGFILE()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CORE_SetLOGFILE) for example, as shown in [test\_ncbi\_service\_connector.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/test/test_ncbi_service_connector.c), or to be a regular file on disk. Moreover, both Toolkits define [interfaces](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/ctools) to deal with registries, loggers, and locks that use native objects of each toolkit and use them as replacements for the objects of the corresponding abstract layers.

There is a common problem that has been reported several times and actually concerns network configuration rather than representing a malfunction in the library. If a test program, which connects to a named NCBI service, is not getting anything back from the NCBI site, one first has to check whether there is a transparent proxying/caching between the host and NCBI. Because the service dispatching is implemented on top of the ordinary HTTP protocol, the transparent proxying may latch unsuccessful service searches (which can happen and may not indicate a real problem) as error responses from the NCBI server. Afterwards, instead of actually connecting to NCBI, the proxy returns those cached errors (or sometimes just an empty document), which breaks the service dispatcher code. In most cases, there are configurable ways to exclude certain URLs from proxying and caching, and they are subject for discussion with a local network administrator.

Here is another tip: Make sure that all custom HTTP header tags (as passed, for example, in the [SConnNetInfo::user\_header](#ch_conn.Connection_related_parameters) field) have "\\r\\n" as tag separators (including the last tag). Many proxy servers (including transparent proxies, of which the user may not even be aware) are known to be sensitive to whether each and every HTTP tag is closed by "\\r\\n" (and not by a single "\\n" character). Otherwise, the HTTP packet may be treated as a defective one and can be discarded.

Additional discussion on parameters of the service dispatcher as well as the trouble shooting tips can be found [here](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/NETWORK/dispatcher.html).

<a name="ch_conn.cpp_connection_streams"></a>

C++ Connection Streams
----------------------

This section discusses the "C++ API" for [connection streams](https://www.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/doxyhtml/group__ConnStreams.html), which should generally be preferred over the corresponding "C API" for [connections and connectors](#ch_conn.conn_def).

Using connections and connectors (via the entirely procedural approach) in C++ programs would fail to take advantage of the power of the language. Therefore, the C++ API for connection streams was created to provide C++ users with an improved connections API that takes advantage of the power of C++. Because the C++ API is built on top of the corresponding C API connections and connectors, the C++ API contains essentially a superset of the C API functionality. Also, these classes all derive from [CNcbiIostream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiIostream) (which is typedef'd as ***std***::***iostream***) so they can be used with all the common stream I/O operators, manipulators, etc. The hierarchy for the C++ API connection stream classes is shown in [Figure 1](#ch_conn.fig1):

<a name="ch_conn.fig1"></a>

![Figure 1. C++ API connection stream classes](/cxx-toolkit/static/img/ch_conn_CConn_IOStream.png)

Figure 1. C++ API connection stream classes

The declarations of the connection stream constructors can be found in [connect/ncbi\_conn\_stream.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_conn_stream.hpp). We tried to keep the number and order of the constructors' parameters in the C++ API the same as their counterparts in the C API. For example:

    /* C API */
    extern NCBI_XCONNECT_EXPORT CONNECTOR SOCK_CreateConnector
    (const char*    host,      /* host to connect to                             */
     unsigned short port,      /* port to connect to                             */
     unsigned short max_try    /* max.number of attempts to establish connection */
     );

    // C++ API
    class NCBI_XCONNECT_EXPORT CConn_SocketStream : public CConn_IOStream
    ...
    CConn_SocketStream
    (const string&   host,                        ///< host to connect to
     unsigned short  port,                        ///< ... and port number
     unsigned short  max_try,                     ///< number of attempts
     const STimeout* timeout  = kDefaultTimeout,
     size_t          buf_size = kConn_DefaultBufSize);

The code below is a C++ style example for a service connection:

    #include <connect/ncbi_conn_stream.hpp>
    try {
        CConn_ServiceStream ios("io_bounce", fSERV_StatelessOnly, 0);
        ios << "Data to be passed to the server";
    } STD_CATCH_ALL ("Connection problem");

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): The stream constructor may throw an exception if, for instance, the requested service is not found, or some other kind of problem arose. To see the actual reason, we used a standard toolkit macro [STD\_CATCH\_ALL()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=STD_CATCH_ALL), which prints the message and problem description into the log file (**`cerr`**, by default).

The next example establishes a TCP socket connection with a specified host/port, allowing direct access to the stream for subsequent operations:

    // Create a SOCKET-type connection stream.
    CConn_SocketStream ss(m_Host, m_Port);

    // Send a request.
    ss << m_Request << NcbiEndl;

    // Read the response.
    ss >> m_Buf;

The next example is a complete program that fetches the response from a URL and displays the HTTP status code and response body (regardless of whether the status is successful or not):

    #include <corelib/ncbiapp.hpp>
    #include <connect/ncbi_conn_stream.hpp>

    USING_NCBI_SCOPE;

    // This is a callback to parse the header and return a code indicating
    // how to handle errors.
    EHTTP_HeaderParse ParseHeader
    (const char*         http_header,   /**< HTTP header to parse                */
     void*               user_data,     /**< supplemental user data              */
     int                 server_error   /**< != 0 if HTTP error (NOT 2xx code)   */
     )
    {
        return (server_error >= 200 && server_error <= 299)
               ? eHTTP_HeaderSuccess
               : eHTTP_HeaderContinue;
    }

    int main(int argc, const char* argv[])
    {
        // Get a URL.
        string url;
        if (argc > 1) {
            url = argv[1];
        } else {
            url = "https://www.ncbi.nlm.nih.gov/";
        }

        // Send an HTTP request to the URL.
        const string header = "Content-Type: application/x-www-form-urlencoded";
        CConn_HttpStream httpstr(url, nullptr, header, ParseHeader);

        // Copy the HTTP response into a string.
        CConn_MemoryStream mem_str;
        NcbiStreamCopy(mem_str, httpstr);
        string response;
        mem_str.ToString(&response);

        // Output the results.
        NcbiCout << "Status Code: "  << httpstr.GetStatusCode() << NcbiEndl;
        NcbiCout << "Response:" << NcbiEndl;
        NcbiCout << response;

        return 0;
    }

***Note:*** HTTP error responses are generally not well-formed, and they generally don't originate from the accessed resource (but instead often originate from the server on behalf of the resource). Therefore, by default, HTTP connections and streams in the connection library prevent access to data in the response in such cases. However, the above example shows how to tell the stream that it's okay to pass the message data through to the user level. Specifically, it installs the [ParseHeader()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ParseHeader) callback (of type [FHTTP\_ParseHeader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__Connectors.html#ga397d6d094a398603a9d45abbf2727314)) to parse the HTTP header and return a code indicating how the stream should handle header errors. In this case, it simply returns values that will release the HTTP response body as stream / connection data. A more sophisticated callback could involve an actual header analysis and return different codes depending on the outcome.


Additional examples can be found in the test files:

-   [test\_ncbi\_conn\_stream.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/test/test_ncbi_conn_stream.cpp)

-   [test\_ncbi\_ftp\_download.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/test/test_ncbi_ftp_download.cpp)

<a name="ch_conn.service_mapping_api"></a>

Service mapping API
-------------------

The API defined in [connect/ncbi\_service.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service.h) is designed to map the required service name to the server address. Internally, a number of mappers are available to perform the mapping. For more details, see the section on [local specification of the LBSM table](#ch_conn.Local_specification_).

Service name mappings can be iterated by calling [SERV\_Open()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Open), similar to the following fragment (for more examples, please refer to the test program [test\_ncbi\_disp.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/test/test_ncbi_disp.c)):

    #include <connect/ncbi_service.h>
    SERV_ITER iter = SERV_Open("my_service", fSERV_Any, SERV_ANYHOST, 0);
    int n = 0;
    if (iter != 0) {
        const SSERV_Info * info;
        while ((info = SERV_GetNextInfo(iter)) != 0) {
            char* str = SERV_WriteInfo(info);
            printf("Server = `%s'\n", str);
            free(str);
            n++;
        }
        SERV_Close(iter);
    }
    if (!iter || !n)
        printf("Service not found\n");

***Note:*** Services can be [redirected](#ch_conn.Service_Redirection).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): A non-**`NULL`** iterator returned from [SERV\_Open()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Open) **does not** yet guarantee that the service is available, whereas the **`NULL`** iterator definitely means that the service does not exist.

As shown in the above example, a loop over reading from the iterator results in the sequence of successive structures (none of which is to be freed by the program!) that along with the conversion functions [SERV\_ReadInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_ReadInfo), [SERV\_WriteInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_WriteInfo) and others are defined in [connect/ncbi\_server\_info.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_server_info.h). Structure [SSERV\_Info](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SSERV_Info) describes a server that implements the requested service. **`NULL`** gets returned when no more servers (if any) could be found. The iterator returns servers in the order that the load-balancing algorithm arranges them. Each server has a rating, and the larger the rating the better the chance for the server to be coming out first (but not necessarily in the order of the rates).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): Servers returned from the iterator are all of the requested type, with only one exception: they can include servers of type **`fSERV_Firewall`**, even if this type has not been explicitly requested. Therefore, the application must sort these servers out. But if **`fSERV_Firewall`** is set in the types, then the search is done for whichever else types are requested, and with the assumption that the client has chosen a firewall connection mode, regardless of the network parameters supplied in [SConnNetInfo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SConnNetInfo) or read out from either the registry or environment.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): A search for servers of type **`fSERV_Dns`** is not inclusive with **`fSERV_Any`** specified as a server type. That is, servers of type DNS are only returned if specifically requested in the server mask at the time the iterator was opened.

There is a simplified version of [SERV\_Open()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Open), called [SERV\_OpenSimple()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_OpenSimple), as well as an advanced version, called [SERV\_OpenEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_OpenEx). The former takes only one argument, the service name. The latter takes two more arguments, which describe the set of servers **not** to be returned from the iterator (server descriptors that to be excluded).

There is also an advanced version of [SERV\_GetNextInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_GetNextInfo), called [SERV\_GetNextInfoEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_GetNextInfoEx), that, via its second argument, provides the ability to get many host parameters, among which is so-called host environment; a `"\0"`-terminated string, consisting of a set of lines separated by `"\n"` characters and specified in the configuration file of the [load-balancing daemon](ch_app.html#ch_app.Load_Balancing_Servi) of the host, where the returned server has been found. The typical line within the set has a form `"name=value"` and resembles very much the shell environment, where its name comes after. The host environment could be very handy for passing additional information to applications if the host has some limitations or requires special handling, should the server be selected and used on this host. The example below shall give an idea. At the time of writing, getting the host information is only implemented when the service is obtained via direct access to the load-balancing daemon. Unlike returned server descriptors, the returned host information handle is not a constant object and must be explicitly freed by the application when no longer needed. All operations (getter methods) that are defined on the host information handle are declared in [connect/ncbi\_host\_info.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_host_info.h). If the server descriptor was obtained using dispatching CGI (indirect dispatching, see below), then the host information handle is always returned as **`NULL`** (no host information available).

The back end of the service mapping API is split into two independent parts: *direct* access to [LBSMD](ch_app.html#ch_app.Load_Balancing_Servi), if the one is both available on the current host and is not disabled by parameter [lb\_disable](#ch_conn.Connection_related_parameters) at the iterator opening. If **LBSMD** is either unavailable or disabled, the second (*indirect*) part of the back-end API is used, which involves a connection to the [dispatching CGI](ch_app.html#ch_app.DISPD_Network_Dispat), which in turn connects to **LBSMD** to carry out the request. An attempt to use the CGI is done only if the [net\_info](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_OpenEx) argument is provided as non-**`NULL`** in the calls to [SERV\_Open()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Open) or [SERV\_OpenEx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_OpenEx).

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): In a call to [SERV\_OpenSimple()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_OpenSimple), **`net_info`** gets created internally before an upcall to [SERV\_Open()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Open) and thus CGI dispatching is likely to happen, unless either **`net_info`** could not be constructed from the environment, or the environment variable **`CONN_LB_DISABLE`** (or a service-specific one, or either of the corresponding registry keys) is set to `TRUE`.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): In the above conditions, the network service name resolution is also undertaken if the service name could not be resolved (because the service could not be found or because of some other error) with the use of locally running **LBSMD**.

The following code example uses both a [service connector](#ch_conn.service_connector) and the service mapping API to access certain services using an alternate way (other than the connector's default) of choosing appropriate servers. By default, the service connector opens an internal service iterator and then tries to connect to the next server, which [SERV\_GetNextInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_GetNextInfo) returns when given the iterator. That is, the server with a higher rate is tried first. If user provides a pointer to structure [SSERVICE\_Extra](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SSERVICE_Extra) as the last parameter of the connector's constructor, then the user-supplied routine (if any) can be called instead to obtain the next server. The routine is also given a supplemental custom argument **`data`** taken from [SSERVICE\_Extra](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SSERVICE_Extra). The (intentionally simplified) example below tries to create a connector to an imaginary service `"my_service"` with the restriction that the server has to additionally have a certain (user-specified) database present. The database name is taken from the LBSMD host environment keyed by `"my_service_env"`, the first word of which is assumed to be the required database name.

    #include <connect/ncbi_service_connector.h>
    #include <ctype.h>
    #include <stdlib.h>
    #include <string.h>

    #define ENV_DB_KEY "my_service_env="

    /* This routine gets called when connector is about to be destructed. */
    static void s_CleanupData(void* data)
    {
        free(data); /* we kept database name there */
    }

    /* This routine gets called on each internal close of the connector
     * (which may be followed by a subsequent internal open).
     */
    static void s_Reset(void* data)
    {
        /* just see that reset happens by printing DB name */
        printf("Connection reset, DB: %s\n", (char*) data);
    }

    /* 'Data' is what we supplied among extra-parameters in connector's
     * constructor.
     * 'Iter' is an internal service iterator used by service connector;
     * it must remain open.
     */
    static const SSERV_Info* s_GetNextInfo(void* data, SERV_ITER iter)
    {
        const char* db_name = (const char*) data;
        size_t len = strlen(db_name);
        SSERV_Info* info;
        HOST_INFO hinfo;
        int reset = 0;
        for (;;) {
            while ((info = SERV_GetNextInfoEx(iter, &hinfo)) != 0) {
                const char* env = HINFO_Environment(hinfo);
                const char* c;
                for (c = env; c; c = strchr(c, '\n')) {
                    if (strncmp(c == env ? c : ++c, ENV_DB_KEY,
                        sizeof(ENV_DB_KEY)-1) == 0) {
                        /* Our keyword has been detected in environment */
                        /* for this host */
                        c += sizeof(ENV_DB_KEY) - 1;
                        while (*c && isspace(*c))
                            c++;
                        if (strncmp(c, db_name, len) == 0 && !isalnum(c + len)) {
                            /* Database name match */
                            free(hinfo); /* must be freed explicitly */
                            return info;
                        }
                    }
                }
                if (hinfo)
                free(hinfo); /* must be freed explicitly */
            }
            if (reset)
                break; /* coming to reset 2 times in a row means no server fit */
            SERV_Reset(iter);
            reset = 1;
        }
        return 0; /* no match found */
    }

    int main(int argc, char* argv[])
    {
        char* db_name = strdup(argv[1]);
        SSERVICE_Extra params;
        CONNECTOR c;
        CONN conn;
        memset(&params, 0, sizeof(params));
        params.data = db_name; /* custom data, anything */
        params.reset = s_Reset; /* reset routine, may be NULL */
        params.cleanup = s_CleanupData; /* cleanup routine, may be NULL*/
        params.get_next_info = s_GetNextInfo; /* custom iterator routine */
        if (!(c = SERVICE_CreateConnectorEx("my_service",
            fSERV_Any, NULL, &params))) {
            fprintf(stderr, "Cannot create connector");
            exit(1);
        }
        if (CONN_Create(c, &conn) != eIO_Success) {
            fprintf(stderr, "Cannot create connection");
            exit(1);
        }
        /* Now we can use CONN_Read(),CONN_Write() etc to deal with
         * connection, and we are assured that the connection is made
         * only to the server on such a host which has "db_name"
         * specified in configuration file of LBSMD.
         */
        ...
        CONN_Close(conn);
        /* this also calls cleanup of user data provided in params */
        return 0;
    }

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): No network (indirect) mapping occurs in the above example because **`net_info`** is passed as **`NULL`** to the connector's constructor.

<a name="ch_conn.Local_specification_"></a>

### Local specification of the LBSM table

The LBSM table can also be specified locally, in config file and/or environment variables.

Service lookup process now involves looking up through the following sources, in this order:

-   Local environment/registry settings;

-   LBSM table (only in-house; this source does not exist in the outside builds);

-   LINKERD (only in-house; this source does not exist in the outside builds);

-   NAMERD (only in-house; this source does not exist in the outside builds);

-   LBOS (only in-house; this source does not exist in the outside builds) - **DEPRECATED**;

-   Network dispatcher.

Only one source containing the information about the service is used; the next source is only tried if the previous one was disabled or did not yield any servers (for the service).

The "local environment/registry settings", LINKERD, NAMERD, and LBOS sources are disabled by default.

To enable the the "local environment/registry settings" source - set **`CONN_LOCAL_ENABLE`** environment variable to "1" (or "ON, or "YES", or "TRUE") or add **`LOCAL_ENABLE`**=1 to [`CONN`] section in `.ini` file.

To enable the LINKERD source - see the [internal documentation](https://confluence.ncbi.nlm.nih.gov/display/CT/Dispatching+with+NAMERD+and+LINKERD).

To enable the NAMERD source - see the [internal documentation](https://confluence.ncbi.nlm.nih.gov/display/CT/Dispatching+with+NAMERD+and+LINKERD).

Enabling the LBOS source is deprecated.

The LBSM and "Network dispatcher" Sources are enabled by default. To disable them use **`CONN_LBSMD_DISABLE`** and/or **`CONN_DISPD_DISABLE`** set to "1" in the environment or **`LBSMD_DISABLE`**=1 and/or **`DISPD_DISABLE`**=1 under the section "[`CONN`]" in the registry, respectively.

***Note:*** Alternatively, and for the sake of backward compatibility with older application, the use of local LBSM table can be controlled by **`CONN_LB_DISABLE`**={0,1} in the environment or **`LB_DISABLE`**={0,1} in the "[`CONN`]" section of the registry, or individually on a per service basis:

See the [CONNECT library configuration parameters reference](ch_libconfig.html#ch_libconfig.T7) for more details on configuring the mappers.  Search [Table 7](ch_libconfig.html#ch_libconfig.T7) for the config param name.

For a service "ANAME", **`ANAME_CONN_LB_DISABLE`**={0,1} in the environment, or **`CONN_LB_DISABLE`**={0,1} in the section "[`ANAME`]" in the registry (to affect setting of this particular service, and no others).

The local environment / registry settings for service "ANAME" are screened in the following order:

-   A value of environment variable "**`ANAME_CONN_LOCAL_SERVER_n`**";

-   A value of registry key "**`CONN_LOCAL_SERVER_n`**" in the registry section "[`ANAME`]"

Note that service names are not case sensitive, yet the environment variables are looked up all capitalized.

An entry found in the environment takes precedence over an entry (for the same "n") found in the registry. "n" counts from 0 to 100, and need not to be sequential.

All service entries can be (optionally) grouped together in a list as a value of either:

-   Environment variable "**`CONN_LOCAL_SERVICES`**", or

-   Registry key "**`LOCAL_SERVICES`**" under the registry section "[`CONN`]".

The list of local services is only used in cases of wildcard searches, or in cases of reverse lookups, and is never consulted in regular cases of forward searches by a complete service name.


Example 1. In `.ini` file

    [CONN]
    LOCAL_ENABLE=yes
    LOCAL_SERVICES="MSSQL10 MSSQL14 MSSQL15 MSSQL16 MSSQL17"

    [MSSQL10]
    CONN_LOCAL_SERVER_6="DNS mssql10:1433 L=yes"

    [MSSQL15]
    CONN_LOCAL_SERVER_9="DNS mssql15:1433 L=yes"

Note that entries for MSSQL14, 16, and 17 are not shown, and they are not required (inexistent definitions for declared services are simply ignored).

Example 2. In environment set the following variables (equivalent to the `.ini` fragment above but having a higher precedence):

    CONN_LOCAL_ENABLE=yes
    CONN_LOCAL_SERVICES="MSSQL10 MSSQL14 MSSQL15 MSSQL16 MSSQL17"
    MSSQL10_CONN_LOCAL_SERVER_6="DNS mssql10:1433 L=yes"
    MSSQL15_CONN_LOCAL_SERVER_9="DNS mssql15:1433 L=yes"

You can also look at the [detailed description of LBSMD](ch_app.html#ch_app.Load_Balancing_Servi) and a sample configuration file.

<a name="ch_conn.Linkerd_Namerd_Dispatching"></a>

### LINKERD and NAMERD Dispatching

You can read about dispatching with LINKERD and NAMERD in [Confluence](https://confluence.ncbi.nlm.nih.gov/display/CT/Dispatching+with+NAMERD+and+LINKERD) (in-house only).

<a name="ch_conn.Lbos_Self_Announce_Deannounce"></a>

### Announcement/deannouncement of servers in LBOS - **DEPRECATED**

You can read about how to announce and deannounce your application in LBOS from within the source code in [Confluence](https://confluence.ncbi.nlm.nih.gov/pages/viewpage.action?pageId=51121913) (in-house only).


<a name="ch_conn.Threaded_Server_Supp"></a>

Threaded Server Support
-----------------------

This library also provides [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer&d=), an abstract base class for multithreaded network servers. [Here](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/connect/test/test_server.cpp) is a demonstration of its use. For more information, see the [Implementing a Server with CServer](ch_grid.html#ch_grid.CServer_Multithreade) section.
