---
layout: default
title: Distributed Computing
nav: pages/ch_grid
---


{{ page.title }}
========================================

## Introduction

This chapter describes the NCBI GRID framework. This framework allows creating, running and maintaining a scalable, load-balanced and fault-tolerant pool of network servers ([Worker Nodes](#ch_grid.Worker_Nodes)).

Note: Users within NCBI may find additional information on the [internal Wiki page](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/GRID).

## Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [Getting Help](#ch_grid.Getting_Help)

-   [GRID Overview](#ch_grid.GRID_Overview)

    -   [Purpose](#ch_grid._Purpose)

    -   [Components](#ch_grid.Components)

    -   [Architecture and Data Flow](#ch_grid.Architecture_and_Dat)

    -   [The GRID Farm](#ch_grid.The_GRID_Farm)

-   [Worker Nodes](#ch_grid.Worker_Nodes)

    -   [Create a GRID Worker Node from scratch](#ch_grid.Create_a_GRID_Worker)

    -   [Converting an existing CGI application into a GRID Node](#ch_grid.Converting_an_existi)

    -   [Wrapping an existing CGI application into a GRID Node](#ch_grid._Wrapping_an_existing)

    -   [Wrapping an existing command-line application into a GRID Node](#ch_grid._Wrapping_an_existing_1)

    -   [Worker Node Cleanup Procedure](#ch_grid.Worker_Node_Cleanup_)

-   [Job Submitters](#ch_grid.Job_Submitters)

-   [Implementing a Network Server](#ch_grid.CServer_Multithreade)

    -   [Typical Client-Server Interactions](#ch_grid.Typical_ClientServer_Interaction)

    -   [The CServer Framework Classes](#ch_grid.The_CServer_Framework_Classes)

    -   [State, Events, and Flow of Control](#ch_grid.State_Events_and_Flow_of_Control)

    -   [Socket Closure and Lifetime](#ch_grid.Socket_Closure_and_Lifetime)

    -   [Diagnostics](#ch_grid.Diagnostics)

    -   [Handling Exceptions](#ch_grid.Handling_Exceptions)

    -   [Server Configuration](#ch_grid.Server_Configuration)

    -   [Other Resources](#ch_grid.Other_Resources)

-   [GRID Command Line Interface](#ch_grid.GRID_Cli)

    -   [General commands](#ch_grid.GRID_Cli_General)
    
    -   [NetCache commands](#ch_grid.GRID_Cli_NetCache)
    
    -   [NetStorage commands](#ch_grid.GRID_Cli_NetStorage)
    
    -   [Universal NetSchedule commands](#ch_grid.GRID_Cli_NetSchedule_Universal)
    
    -   [Submitter commands](#ch_grid.GRID_Cli_Submitter)
    
    -   [Worker node commands](#ch_grid.GRID_Cli_Worker)

## NetStorage commands

<a name="ch_grid.Getting_Help"></a>

Getting Help
------------

Users at NCBI have the following sources for help:

-   [JIRA](https://jira.ncbi.nlm.nih.gov/CreateIssue!default.jspa) for submitting a request or bug report. Select project [C++ Toolkit](https://jira.ncbi.nlm.nih.gov/browse/CXX) and component [GRID](https://jira.ncbi.nlm.nih.gov/browse/CXX/component/10197).

-   Mailing lists:

    -   The [grid](https://www.ncbi.nlm.nih.gov/mailman/listinfo/grid) mailing list (<span class="oem_span">nypkGujip5ust5upo5nv/</span>) for general GRID-related discussion and announcements.

    -   The [grid-core](https://www.ncbi.nlm.nih.gov/mailman/listinfo/grid-core) mailing list (<span class="oem_span">nypk4jvylGujip5ust5upo5nv/</span>) for getting help using or trouble-shooting a GRID service.

-   The GRID developers:

    -   [Rafael Sadyrov](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/Rafael_Sadyrov) for questions about Client-side APIs, [Worker Nodes](#ch_grid.Worker_Nodes), [NetCache](ch_app.html#ch_app.ncbi_netcache_service) and [NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule) deployment, auxiliary tools and utilities, administration - setup, installation, and upgrades.

    -   [Andrei Gourianov](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/Andrei_Gourianov) for [NetCache](ch_app.html#ch_app.ncbi_netcache_service) server questions.

    -   [Sergey Satskiy](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/Sergey_Satskiy) for [NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule) server questions.

    -   [Denis Vakatov](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/Denis_Vakatov) for supervision questions.

<a name="ch_grid.GRID_Overview"></a>

GRID Overview
-------------

The following sections provide an overview of the GRID system:

-   [Purpose](#ch_grid._Purpose)

-   [Components](#ch_grid.Components)

-   [Architecture and Data Flow](#ch_grid.Architecture_and_Dat)

-   [The GRID Farm](#ch_grid.The_GRID_Farm)

<a name="ch_grid._Purpose"></a>

### Purpose

The NCBI GRID is a framework to create, run and maintain a scalable, load-balanced and fault-tolerant pool of network servers ([Worker Nodes](#ch_grid.Worker_Nodes)).

It includes independent components that implement distributed data storage and job queueing. It also provides APIs and frameworks to implement worker nodes and job submitters.

Worker nodes can be written from scratch, but there are also convenience APIs and frameworks to easily create worker nodes out of existing C++ CGI code, or even from CGI or command-line scripts and executables.

There is also a GRID farm where developers can jump-start their distributed computation projects.

Two PowerPoint presentations have additional information about the NCBI GRID:

-   <ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/DOC/PPT/GRID-Dec14-2006/GRID_Dec14_2006.pps>

-   <ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/DOC/PPT/NCBI-Grid.ppt>

<a name="ch_grid.Components"></a>

### Components

The NCBI GRID framework is built of the following components:

1.  Network job queue ([NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule))

2.  Network data storage ([NetCache](ch_app.html#ch_app.ncbi_netcache_service))

3.  Server-side APIs and tools to develop [Worker Nodes](#ch_grid.Worker_Nodes):

    -   [Out of an existing command-line executable](#ch_grid._Wrapping_an_existing_1)

    -   [Out of an existing CGI executable](#ch_grid._Wrapping_an_existing)

    -   [Out of an existing CGI code](#ch_grid.Converting_an_existi) (if it's written using the [NCBI C++ CGI framework](ch_cgi.html))

    -   [Create a GRID Worker Node from scratch](#ch_grid.Create_a_GRID_Worker)

4.  Client-side API

5.  Remote CGI -- enables moving the actual CGI execution to the grid.

6.  [GRID Command Line Interface](#ch_grid.GRID_Cli) for remote administration, monitoring, retrieval and submission.

All these components are fully portable, in the sense that they can be built and then run and communicate with each other across all platforms that are supported by the NCBI C++ Toolkit (Unix, MS-Windows, MacOSX).

The NetCache and NetSchedule components can be used independently of each other and the rest of the grid framework - they have their respective client APIs. Worker Nodes get their tasks from NetSchedule, and may also use NetCache to get the data related to the tasks and to store the results of computation. Remote-CGI allows one to easily convert an existing CGI into a back-end worker node -- by a minor, 1 line of source code, modification. It can solve the infamous "30-sec CGI timeout" problem.

All these components can be load-balanced and are highly scalable. For example, one can just setup 10 NetCache servers or 20 Worker Nodes on new machines, and the storage/computation throughput would increase linearly. Also, NetCache and NetSchedule are lightning-fast.

To provide more flexibility, load balancing, and fault-tolerance, it is highly advisable to pool NetSchedule and NetCache servers using [NCBI Load Balancer and Service Mapper](ch_app.html#ch_app.Load_Balancing_Servi) (LBSM).

<a name="ch_grid.Architecture_and_Dat"></a>

### Architecture and Data Flow

[NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule) and [NetCache](ch_app.html#ch_app.ncbi_netcache_service) servers create a media which Submitters and [Worker Nodes](#ch_grid.Worker_Nodes) use to pass and control jobs and related data:

1.  Submitter prepares input data and stores it in the pool of NetCache servers, recording keys to the data in the job's description.

2.  Submitter submits the job to the appropriate queue in the pool of NetSchedule servers.

3.  Worker Node polls "its" queue on the NetSchedule servers for jobs, and takes the submitted job for processing.

4.  Worker Node retrieves the job's input data from the NetCache server(s) and processes the job.

5.  Worker Node stores the job's results in NetCache and changes the job's status to "`done`" in NetSchedule.

6.  Submitter sees that the job is done and reads its result from NetCache.

The following diagram illustrates this flow of control and data:

[![Image grid-collab.png](/cxx-toolkit/static/img/grid-collab.png)](/cxx-toolkit/static/img/grid-collab.png "Click to see the full-resolution image")

<a name="ch_grid.The_GRID_Farm"></a>

### The GRID Farm

To help developers jump-start their distributed computation projects, there is a small farm of machines for general use, running:

-   Several flavors of job queues

-   Several flavors of network data storage

-   A framework to run and maintain users' [Worker Nodes](#ch_grid.Worker_Nodes)

***NOTE:*** Most of the GRID components can be deployed or used outside of the GRID framework (applications can communicate with the components directly via the components' own client APIs). However, in many cases it is beneficial to use the whole GRID framework from the start.

NCBI users can find more information on the [GRID farm Wiki page](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/GRID_Farm).

<a name="ch_grid.Worker_Nodes"></a>

Worker Nodes
------------

The following sections describe how to create, configure and run worker nodes:

-   [Create a GRID Worker Node from scratch](#ch_grid.Create_a_GRID_Worker)

-   [Converting an existing CGI application into a GRID Node](#ch_grid.Converting_an_existi)

-   [Wrapping an existing CGI application into a GRID Node](#ch_grid._Wrapping_an_existing)

-   [Wrapping an existing command-line application into a GRID Node](#ch_grid._Wrapping_an_existing_1)

-   [Worker Node Cleanup Procedure](#ch_grid.Worker_Node_Cleanup_)

<a name="ch_grid.Create_a_GRID_Worker"></a>

### Create a GRID Worker Node from scratch

The following sections describe how to Create a GRID Worker Node from scratch:

-   [Purpose](#ch_grid._Purpose_3)

-   [Diagram](#ch_grid._Diagram)

<a name="ch_grid._Purpose_1"></a>

#### Purpose

Framework to create a multithreaded server that can run on a number of machines and serve the requests using [NetSchedule](https://intranet.ncbi.nlm.nih.gov/wiki-private/CxxToolkit/index.cgi/NetSchedule) and [NetCache](ch_app.html#ch_app.ncbi_netcache_service) services to exchange the job info and data.

<a name="ch_grid._Diagram"></a>

#### Diagram

<ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/DOC/PPT/IMAGES/GRID_Dec14_2006/Slide3.PNG>

<a name="ch_grid.Converting_an_existi"></a>

### Converting an existing CGI application into a GRID Node

The following sections describe how to convert an existing CGI application into a GRID node:

-   [Purpose](#ch_grid._Purpose_3)

-   [Converting a CGI into a Remote-CGI server](#ch_grid.Converting_a_CGI_int)

-   [Diagram](#ch_grid._Diagram_3)

-   [Features and benefits](#ch_grid.Features_and_benefit)

<a name="ch_grid._Purpose_2"></a>

#### Purpose

With a rather simple and formal conversion, a CGI's real workload can be moved from the Web servers to any other machines. It also helps to work around the infamous "30-sec Web timeout problem".

<a name="ch_grid.Converting_a_CGI_int"></a>

#### Converting a CGI into a Remote-CGI server

1.  Modify the code of your original CGI to make it a standalone Remote-CGI server ([Worker Node](#ch_grid.Worker_Nodes)). The code conversion is very easy and formal:

    -   Change application's base class from [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) to [CRemoteCgiApp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRemoteCgiApp)

    -   Link the application with the library `xgridcgi` rather than with `xcgi`

2.  Replace your original CGIs by a one-line shell scripts that calls "remote CGI gateway" (**cgi2rcgi.cgi**) application.

3.  Match "remote CGI gateways" against Remote-CGI servers:

    -   Ask us to register your remote CGI in the GRID framework

    -   Define some extra parameters in the configuration files of "remote CGI gateway" and Remote-CGI servers to connect them via the GRID framework

4.  Install and run your Remote-CGI servers on as many machines as you need. They don't require Web server, and can be installed even on PCs and Macs.

<a name="ch_grid._Diagram_1"></a>

#### Diagram

<ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/DOC/PPT/IMAGES/GRID_Dec14_2006/Slide1.PNG>

<a name="ch_grid.Features_and_benefit"></a>

#### Features and benefits

-   Solves 30-sec Web server timeout problem.

-   Provides software infrastructure for back-end computation farm for CGIs. Cross-platform, Unix-Windows compatible, minimal administration.

-   Existing CGIs can be easily converted into back-end worker nodes.

-   While the request is being executed by the Remote-CGI server, the user can be interactively provided with a standard or customized progress report.

-   Can be used for parallel network programming.

-   High availability infrastructure. All central components can have 2-3 times reservation to accommodate request peak hours and possible hardware failures.

-   Remote-CGI servers are extremely mobile.

-   Remote-CGI servers can be administered (gentle shutdown, request statistics, etc.) using special tool.

-   Easy to debug, as the Remote-CGI server can be run under debugger or any memory checker on any machine (Unix or MS-Windows)

<a name="ch_grid._Wrapping_an_existing"></a>

### Wrapping an existing CGI application into a GRID Node

The following sections describe how to wrap an existing CGI application into a GRID Node:

-   [Running existing CGI executable through Grid Framework](#ch_grid.Running_existing_CGI)

-   [Diagram](#ch_grid._Diagram_3)

<a name="ch_grid.Running_existing_CGI"></a>

#### Running existing CGI executable through Grid Framework

In this case a real CGI does not need to be modified at all and **remote\_cgi** utility serves as an intermediate between NetSchedule service and a real CGI. The real CGI and **remote\_cgi** utility go to the server side. The **remote\_cgi** gets a job from NetSchedule service, deserializes the CGI request and **`stdin`** stream and runs the real CGI with this data. When the CGI finishes the **remote\_cgi** utility serializes its **`stdout`** stream and sends it back to the client.

On the client side (front-end) **cgi2rcgi** sees that the job’s status is changed to “done” gets the data sent by the server side (back-end), deserializes it and writes it on its **`stdout`**.

**cgi2rcgi** utility has two html template files to define its look. The first file is [cgi2rcgi.html](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/grid/cgi2rcgi/cgi2rcgi.html) (can be redefined in [cgi2rcgi.ini](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/grid/cgi2rcgi/cgi2rcgi.ini) file) which is the main html template file and it contains all common html tags for the particular application. It also has to have two required tags.

`<@REDIRECT@>` should be inside `<head>` tag and is used to inject a page reloading code.

`<@VIEW@>` should be inside `<body>` tag and is to render information about a particular job’s status.

The second file is cgi2rcgi.inc.html (can be redefined in cgi2.rcgi.ini) which defines tags for particular job’s states. The tag for the particular job’s state replaces `<@VIEW@>` tag in the main html template file.

<a name="ch_grid._Diagram_2"></a>

#### Diagram

<ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/DOC/PPT/IMAGES/GRID_Dec14_2006/Slide1.PNG>

<a name="ch_grid._Wrapping_an_existing_1"></a>

### Wrapping an existing command-line application into a GRID Node

The following sections describe how to wrap an existing CGI application into a GRID Node:

-   [Running arbitrary applications through Grid Framework](#ch_grid.Running_arbitrary_ap)

-   [Diagram](#ch_grid._Diagram_3)

<a name="ch_grid.Running_arbitrary_ap"></a>

#### Running arbitrary applications through Grid Framework

The client side collects a command line, a **`stdin`** stream and some other parameters, serialize them and through Grid Framework to the server side. On the server side **remote\_app** utility picks up submitted job, deserializes the command line, the **`stdin`** and other parameters, and starts a new process with the application and the input data. Then **remote\_app** waits for the process to finish collecting its **`stdout`**, **`stdin`** and **`errcode`**. After that it serializes collected data and sends it back to the client side. The application for run is set in [remote\_app.ini](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/grid/remote_app/remote_app.ini) configuration file.

**Source code:** [src/app/grid/remote\_app/remote\_app\_wn.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/grid/remote_app/remote_app_wn.cpp)

**Config file:** [remote\_app.ini](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/grid/remote_app/remote_app.ini)

Classes that should be used to prepare an input data a remote application and get its results are [CRemoteAppRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRemoteAppRequest&d=) and [CRemoteAppResult](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRemoteAppResult&d=). See also [CGridClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCGridClient.html), [CGridClientApp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCGridClientApp.html).

**Client example:** [src/sample/app/netschedule/remote\_app\_client\_sample.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netschedule/remote_app_client_sample.cpp)

**Config file:** [src/sample/app/netschedule/remote\_app\_client\_sample.ini](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netschedule/remote_app_client_sample.ini)

**grid\_cli** utility allows submitting a job for a remote application from its command line or a jobs file. See **grid\_cli help**.

**Jobs file format:**

Each line in the file represents one job (lines starting with ‘`#`’ are ignored). Each job consists of several parameters. Each parameter has in the form: `name="value"`. The parameter’s value must be wrapped in double quotes. All of these parameters are optional. Supported parameters:

-   `args` – command line arguments.

-   `aff` – affinity token.

-   `tfiles` – a list of semicolon-separated file names which will be transferred to the server side.

-   `jout` – a file name where the application’s output to **`stdout`** will be stored.

-   `jerr` – a file name where the application’s output to **`stderr`** will be stored.

-   `runtime` – a time in seconds of the remote application’s running time. If the application is running longer then this time it is assumed to be failed and its execution is terminated.

-   `exclusive` – instructs the **remote\_app** to not get any other jobs from the NetSchedule service while this job is being executed.

<a name="ch_grid._Diagram_3"></a>

#### Diagram

<ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/DOC/PPT/IMAGES/GRID_Dec14_2006/Slide2.PNG>

<a name="ch_grid.Worker_Node_Cleanup_"></a>

### Worker Node Cleanup Procedure

The following sections describe the procedure for cleaning up Worker Nodes:

-   [Purpose](#ch_grid._Purpose_3)

-   [Job Cleanup](#ch_grid.Job_Cleanup)

-   [Worker Node Cleanup](#ch_grid.Worker_Node_Cleanup_)

<a name="ch_grid._Purpose_3"></a>

#### Purpose

It is necessary to provide a framework to support worker node and job cleanup. For example, a job may create temporary files that need to be deleted, or a worker node may need to clean up resources shared by multiple jobs.

To receive cleanup events, the worker node must implement interface [IWorkerNodeCleanupEventListener](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IWorkerNodeCleanupEventListener). The interface has a single abstract method:

`void HandleEvent(EWorkerNodeCleanupEvent cleanup_event)`

At the time of the call, **`cleanup_event`** will be set to either **`eRegularCleanup`** (for normal cleanup) or **`eOnHardExit`** (for an emergency shutdown).

There are two types of listeners: those called after each job is done and those called when the worker node is shutting down.

<a name="ch_grid.Job_Cleanup"></a>

#### Job Cleanup

Listeners of the first type (per-job cleanup) are installed in the `Do()` method via a call to `CWorkerNodeJobContext::GetCleanupEventSource()->AddListener()`:

    class CMyWorkerNodeJob : public IWorkerNodeJob
    /* ... */
    virtual int Do(CWorkerNodeJobContext& context)
    {
        context.GetCleanupEventSource()->AddListener( new CMyWorkerNodeJobCleanupListener(resources_to_free));
    }

<a name="ch_grid.Worker_Node_Cleanup"></a>

#### Worker Node Cleanup

Listeners of the second type (worker node cleanup) are installed in the constructor of the [IWorkerNodeJob](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IWorkerNodeJob)-derived class via a call to `IWorkerNodeInitContext::GetCleanupEventSource()->AddListener()`:

    class CMyWorkerNodeJob : public IWorkerNodeJob
    /* ... */
    CMyWorkerNodeJob(const IWorkerNodeInitContext& context)
    {
        context.GetCleanupEventSource()->AddListener( new CMyWorkerNodeCleanupListener(resources_to_free));
    }

Note that depending on the current value of the `[server]/reuse_job_object` configuration parameter, this constructor of ***CMyWorkerNodeJob*** can be called multiple times - either once per job or once per worker thread, so additional guarding may be required.

The approach of doing worker node cleanup described above is a newer approach, but there is an older approach which may also be used:

The [IGridWorkerNodeApp\_Listener](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IGridWorkerNodeApp_Listener) interface has two methods, `OnGridWorkerStart()` and `OnGridWorkerStop()` which are called during worker node initialization and shutdown respectively. A handler implementing this interface can be installed using the `SetListener()` method of [CGridWorkerApp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGridWorkerApp). The code that calls the `OnGridWorkerStop()` method will run in the context of the dedicated cleanup thread and also respect the **`force_close`** parameter.

The older method does not require the guarding that the new method requires.

<a name="ch_grid.Job_Submitters"></a>

Job Submitters
--------------

An API is available to submit tasks to [Worker Nodes](#ch_grid.Worker_Nodes), and to monitor and control the submitted tasks.

<a name="ch_grid.CServer_Multithreade"></a>

Implementing a Network Server
-----------------------------

The [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCServer.html), [IServer\_ConnectionFactory](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIServer__ConnectionFactory.html), and [IServer\_ConnectionHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classIServer__ConnectionHandler.html) classes provide a framework for creating multithreaded network servers with one-thread-per-request scheduling. The server creates a pool of connection handlers for maintaining the socket connections, and a pool of threads for handling the socket events. With each socket event, [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) allocates a thread from the thread pool to handle the event, thereby making it possible to serve a large number of concurrent requests efficiently.

The following topics discuss the various aspects of implementing a network server:

-   [Typical Client-Server Interactions](#ch_grid.Typical_ClientServer_Interaction)

    -   [Protocols](#ch_grid.Protocols)

    -   [Request Format](#ch_grid.Request_Format)

    -   [Response Handling](#ch_grid.Response_Handling)

-   [The CServer Framework Classes](#ch_grid.The_CServer_Framework_Classes)

    -   [CServer](#ch_grid.CServer)

    -   [IServer\_ConnectionFactory](#ch_grid.IServer_ConnectionFactory)

    -   [IServer\_ConnectionHandler](#ch_grid.IServer_ConnectionHandler)

-   [State, Events, and Flow of Control](#ch_grid.State_Events_and_Flow_of_Control)

-   [Socket Closure and Lifetime](#ch_grid.Socket_Closure_and_Lifetime)

-   [Diagnostics](#ch_grid.Diagnostics)

-   [Handling Exceptions](#ch_grid.Handling_Exceptions)

-   [Server Configuration](#ch_grid.Server_Configuration)

-   [Other Resources](#ch_grid.Other_Resources)

<a name="ch_grid.Typical_ClientServer_Interaction"></a>

### Typical Client-Server Interactions

The [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework is based on sockets and imposes few constraints on client-server interactions. Servers can support many concurrent connections, and the client and server can follow any protocol, provided that they handle errors. If the protocol includes a server response, then the client and server should alternate between requests and responses on a given connection.

Typical client-server interactions differ in the following categories:

-   [Protocols](#ch_grid.Protocols)

-   [Request Format](#ch_grid.Request_Format)

-   [Response Handling](#ch_grid.Response_Handling)

<a name="ch_grid.Protocols"></a>

#### Protocols

The simplest protocol is probably a consistent pattern of a client request followed by a server response. The [Track Manager](https://mini.ncbi.nlm.nih.gov/1k2qd) server uses this protocol.

The [NetScheduler](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netschedule/) server follows a modified request / response protocol. It expects three "messages" - two information lines followed by a command line - then it returns a response.

The [Genome Pipeline](https://mini.ncbi.nlm.nih.gov/1k2qn) server protocol adds a client acknowledgment to the interaction. A missing or corrupt acknowledgment triggers a rollback of the transaction.

Your server can follow whatever pattern of requests and responses is appropriate for the service. Note that a given server is not limited to a fixed communication pattern. As long as the client and server follow the same rules, the protocol can be adapted to whatever is appropriate at the moment.

<a name="ch_grid.Request_Format"></a>

#### Request Format

At a low level, the server simply receives bytes through a socket, so it must parse the input data into separate requests.

Perhaps the easiest request format to parse simply delimits requests with newlines - this is the request format used by the [NetScheduler](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netschedule/) server.

A more robust way to define the request and response formats is with an ASN.1 specification. NCBI servers that use an ASN.1-defined request format include:

-   [Ideogram](https://mini.ncbi.nlm.nih.gov/1k2qe)

-   [OS Gateway](https://mini.ncbi.nlm.nih.gov/1k2qo)

-   [Track Manager](https://mini.ncbi.nlm.nih.gov/1k2qd)

-   [Genome Pipeline](https://mini.ncbi.nlm.nih.gov/1k2qn)

<a name="ch_grid.Response_Handling"></a>

#### Response Handling

Servers may be implemented to respond immediately (i.e. in the same thread execution where the request is read), or to delay their responses until the socket indicates that the client is ready to receive. Responding immediately can make the code simpler, but may not be optimal for resource scheduling.

NCBI Servers that use respond immediately include:

-   [NetScheduler](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netschedule/)

-   [Ideogram](https://mini.ncbi.nlm.nih.gov/1k2qe)

NCBI servers that delay their response include:

-   [OS Gateway](https://mini.ncbi.nlm.nih.gov/1k2qo)

-   [Track Manager](https://mini.ncbi.nlm.nih.gov/1k2qd)

-   [Genome Pipeline](https://mini.ncbi.nlm.nih.gov/1k2qn)

<a name="ch_grid.The_CServer_Framework_Classes"></a>

### The CServer Framework Classes

The main classes in the [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework are:

-   [CServer](#ch_grid.CServer)

-   [IServer\_ConnectionFactory](#ch_grid.IServer_ConnectionFactory)

-   [IServer\_ConnectionHandler](#ch_grid.IServer_ConnectionHandler)

<a name="ch_grid.CServer"></a>

#### CServer

The [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) class manages connections, socket event handling for reading and writing, timer and timeout events, and error conditions. [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) creates a connection pool and a thread pool. When a client request arrives, a socket is established and assigned to one of the connection handler objects. For each socket event (e.g. connection opened, data arrival, client ready for data, etc.), a thread is allocated from the pool to serve that particular event and is returned to the pool when the handler finishes. You can use [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) directly, but typically it is subclassed.

If you want to provide a gentle shutdown ability, then create a [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) subclass and override [ShutdownRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ShutdownRequested). It should return true when the application-specific logic determines that the server is no longer needed - for example, if a shutdown command has been received; if a timeout has expired with no client communication; if a watchfile has been updated; etc. A typical subclass could also include a [RequestShutdown()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RequestShutdown) method that sets a flag that is in turn checked by [ShutdownRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ShutdownRequested). This approach makes it easy to trigger a shutdown from a client.

If you want to process data in the main thread on timeout, then create a [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) subclass, override [ProcessTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessTimeout), and use [GetParameters()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetParameters) / [SetParameters()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetParameters) to replace the **`accept_timeout`** parameter with the proper value for your application.

If you don't want to provide a gentle shutdown ability and you don't want to process data in the main thread on timeout, then you can use [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) directly.

Your server application will probably define, configure, start listening, and run a [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) object in its [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) method - something like:

    CMyServer server;
    server.SetParameters(params);
    server.AddListener(new CMyConnFactory(&server), params.port);
    server.Run();

<a name="ch_grid.IServer_ConnectionFactory"></a>

#### IServer\_ConnectionFactory

The connection factory simply creates connection handler objects. It is registered with the server and is called when building the connection pool.

It is possible to create a server application without defining your own connection factory (the [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework has a default factory). However you must create a connection factory if you want to pass server-wide parameters to your connection handler objects - for example to implement a gentle shutdown.

The connection factory class can be as simple as:

    class CMyConnFactory : public IServer_ConnectionFactory
    {
    public:
        CMyConnFactory(CMyServer * server)
        : m_Server(server) {}
        ~CMyConnFactory(void) {}
        virtual IServer_ConnectionHandler * Create(void)
        {
            return new CMyConnHandler(m_Server);
        }
    private:
        CMyServer * m_Server;
    };

<a name="ch_grid.IServer_ConnectionHandler"></a>

#### IServer\_ConnectionHandler

Classes derived from [IServer\_ConnectionHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_ConnectionHandler) do the actual work of handling requests. The primary methods are:

-   [GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) - This method identifies the socket events that should be handled by this connection, and can establish a timer.

-   [OnOpen()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnOpen) - Indicates that a client has opened a connection. The socket can be configured here.

-   [OnClose()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnClose) - Indicates that a connection was closed. Note that connections can be closed by either the server or the client (the closer is indicated by a parameter).

-   [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead) - Indicates that a client has sent data. This is where you should parse the data coming from the socket.

-   [OnWrite()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnWrite) - Indicates that a client is ready to receive data. This is where you should write the response to the socket.

-   [OnTimeout()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnTimeout) - Indicates that a client has been idle for too long. The connection will be closed synchronously after this method is called.

-   [OnTimer()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnTimer) - Called when the timer established by [GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) has expired.

-   [OnOverflow()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnOverflow) - Called when there's a problem with the connection - for example, the connection pool cannot accommodate another connection. ***Note:*** The connection is destroyed after this call.

The [OnOpen()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnOpen), [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead), and [OnWrite()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnWrite) methods are pure virtual and must be implemented by your server.

***Note:*** If your client-server protocol is line-oriented, you can use [IServer\_LineMessageHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_LineMessageHandler) instead of [IServer\_ConnectionHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_ConnectionHandler). In this case you would implement the [OnMessage()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnMessage) method instead of [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead).

<a name="ch_grid.State_Events_and_Flow_of_Control"></a>

### State, Events, and Flow of Control

Generally, your connection handler class should follow a state model and implement the [GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) method, which will use the state to select the events that will be handled. This is typically how the connection state is propagated and how socket events result in the flow of control being passed to the events handlers.

***Note:*** You don't need to implement a state model or the [GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) method if you immediately write any reponses in the same handler that performs the reading. For line-oriented protocols, your connection handler can inherit from [IServer\_LineMessageHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_LineMessageHandler) instead of from [IServer\_ConnectionHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_ConnectionHandler). [IServer\_LineMessageHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IServer_LineMessageHandler) implements [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead) and parses the input into lines, calling [OnMessage()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnMessage) for each line. In this case you would both read from and write to the client in the [OnMessage()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnMessage) method (and implement a dummy [OnWrite()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnWrite) method).

For servers that implement a state model and follow a simple request / response protocol, the state variable should be initialized to "reading"; set to "writing" after the request is read in the [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead) method; and set to "reading" after the response is sent in the [OnWrite()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnWrite) method. This results in an orderly alternation between reading and writing. The [GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) method uses the current connection state (the current state corresponds to the next expected event) to select the appropriate event to respond to. For example:

    EIO_Event CMyConnHandler::GetEventsToPollFor(const CTime** alarm_time)
    {
        return (m_State == eWriting) ? eIO_Write : eIO_Read;
    }

Your state model should reflect the communication protocol and can be more complex than a simple read / write alternation. It could include acknowledgements, queuing, timed responses, etc. Of course it should include error handling.

[GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) is guaranteed to not be called at the same time as the event handling functions ([OnOpen()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnOpen), [OnRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnRead), etc.), so you shouldn't guard the variables they use with mutexes.

[GetEventsToPollFor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEventsToPollFor) is called from the main thread while the other socket event handling methods are called from various threads allocated from the thread pool.

<a name="ch_grid.Socket_Closure_and_Lifetime"></a>

### Socket Closure and Lifetime

Nominally, sockets are owned by (and therefore closed by) the [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework. However, there may be cases where your derived class will need to manually close or take ownership of the socket.

-   Well-behaved clients will close a connection when they have no more outstanding requests and have completed reading the responses to all requests made on the connection. [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer)-based applications are intended to operate in this paradigm. In this case you don't need to close or take ownership of the socket.<br/><br/>***Note:*** If connections are not closed by the client after reading the response, then you may run out of file descriptors and/or available port numbers. If you have a high connection volume and try to mitigate slow connection closings by closing connections in your code, you run the risk of terminating the connection before the client has read all the data. Well-behaved clients are therefore necessary for optimum server performance.

-   [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) will automatically close a connection after an inactivity timeout or if an exception occurs in an event handler. You don't need to manage sockets in these cases.

-   If you encounter problems such as a broken protocol or an invalid command then you should close the connection from your code.

-   If you need to close a connection from your code, you should do so by calling [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer)::[CloseConnection()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CloseConnection) - not by explicitly closing the socket object. The [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework generally owns the socket and therefore needs to manage it.

-   ***Note:*** There is one case when the [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) framework shouldn't own the socket. If you create a [CConn\_SocketStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CConn_SocketStream) on an existing socket, then you must take ownership as shown here:<br/><br/>`SOCK sk = GetSocket().GetSOCK();`<br/>`GetSocket().SetOwnership(eNoOwnership);`<br/>`GetSocket().Reset(0, eTakeOwnership, eCopyTimeoutsToSOCK);`<br/>`AutoPtr<CConn_SocketStream> stream = new CConn_SocketStream(sk);`<br/>

<a name="ch_grid.Diagnostics"></a>

### Diagnostics

To facilitate logfile analysis, the more detailed "new" log posting format is recommended. To enable the new format, call [SetOldPostFormat()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetOldPostFormat) before calling [AppMain()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppMain):

    int main(int argc, const char* argv[])
    {
        GetDiagContext().SetOldPostFormat(false);
        return CMyServerApp().AppMain(argc, argv);
    }

See also [Logging Requests](#ch_core.Logging_Requests) section for logging request-specific information.

<a name="ch_grid.Handling_Exceptions"></a>

### Handling Exceptions

There are server application-wide configuration parameters to control whether or not otherwise-unhandled exceptions will be caught by the server. See the [Server Configuration](#ch_grid.Server_Configuration) section for details.

***Note:*** If your event handler catches an exception, it does **not** need to close the connection because [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) automatically closes connections in this case.

See the [Socket Closure and Lifetime](#ch_grid.Socket_Closure_and_Lifetime) section for related information.

<a name="ch_grid.Server_Configuration"></a>

### Server Configuration

The following configuration parameters can be used to fine-tune [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer)-derived server behavior:

<a name="ch_grid.T.nc_parameterbrief_descriptiond"></a>

| Parameter       | Brief Description              | Default |
|-----------------------------------------------------------|--------------------------------------------------------------------------|---------|
| **`CSERVER_CATCH_UNHANDLED_EXCEPTIONS`**      | Controls whether [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) should catch exceptions.      | true    |
| **`NCBI_CONFIG__THREADPOOL__CATCH_UNHANDLED_EXCEPTIONS`** | Controls whether [CThreadInPool\_ForServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CThreadInPool_ForServer) should catch exceptions. | true    |

<div class="table-scroll"></div>

See the [connection library configuration reference](ch_libconfig.html#ch_libconfig.libconfig_connect) for more information on configuration parameters.

<a name="ch_grid.Other_Resources"></a>

### Other Resources

Here are some places to look for reference and to see how to [CServer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CServer) is used in practice:

-   [CServer Class Reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCServer.html)

-   [CServer test application](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/connect/test/test_server.cpp)

-   [NetScheduler](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netschedule/)

-   [Ideogram](https://mini.ncbi.nlm.nih.gov/1k2qe) (NCBI only)

-   [OS Gateway](https://mini.ncbi.nlm.nih.gov/1k2qo) (NCBI only)

-   [Track Manager](https://mini.ncbi.nlm.nih.gov/1k2qd) (NCBI only)

-   [Genome Pipeline](https://mini.ncbi.nlm.nih.gov/1k2qn) (NCBI only)

<a name="ch_grid.GRID_Cli"></a>

GRID Command Line Interface
---------------------------

This section describes the NCBI GRID Command Line Interface (grid_cli) utility.
 
grid_cli allows access and control NCBI Grid services: NetSchedule, NetCache, NetStorage

<a name="ch_grid.GRID_Cli_General"></a>

## General commands

### whatis

 Determine argument type and characteristics.

**SYNOPSIS**

grid_cli whatis ARG

**DESCRIPTION**

This command makes an attempt to guess the type of its argument. If the
argument is successfully recognized as a token that represents a Grid
object, the type-dependent information about the object is printed.

Valid output formats are "human-readable" and "json". The default is
"human-readable".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--of [--output-format] ARG** :
                                One of the output formats supported by
                                this command.




### login

 Generate a client identification token.

**SYNOPSIS**

grid_cli login APP_UID

**DESCRIPTION**

This command wraps the specified client identification parameters in a
session token. The returned token can be passed later to other commands
either through the GRID_CLI_LOGIN_TOKEN environment variable or via the
'--login-token' command line option, which makes it possible to set
client identification parameters all at once.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--enable-mirroring**      :
                                Enable NetCache mirroring functionality.

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-site ARG**           :
                                FileTrack site to use: 'submit' (or
                                'prod'), 'dsubmit' (or 'dev'), 'qsubmit'
                                (or 'qa'). Default: 'submit'.

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-api-key ARG**        :
                                FileTrack API key. When connecting to
                                FileTrack directly, an API key is
                                required.

&nbsp;&nbsp;&nbsp;&nbsp;**--no-conn-retries**       :
                                Do not attempt to reconnect to services
                                after the first connection failure.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### serverinfo (si)

 Print information about a Grid server.

**SYNOPSIS**

grid_cli serverinfo

**DESCRIPTION**

Query and print information about a running NetCache, NetSchedule,
NetStorage, or worker node process.

The following output formats are supported: "human-readable", "raw", and
"json". The default is "human-readable".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--wn [--worker-node] ARG** :
                                Worker node address (a host:port pair).

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--of [--output-format] ARG** :
                                One of the output formats supported by
                                this command.

&nbsp;&nbsp;&nbsp;&nbsp;**--compat-mode**           :
                                Enable backward compatibility tweaks.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### stats (stat, status)

 Show server status and access statistics.

**SYNOPSIS**

grid_cli stats

**DESCRIPTION**

Dump accumulated statistics on server access and performance.

When applied to a NetSchedule server, this operation supports the
following format options: "raw", "human-readable", "json".  If none
specified, "human-readable" is assumed.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--wn [--worker-node] ARG** :
                                Worker node address (a host:port pair).

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--brief**                 :
                                Produce less verbose output.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-group-info**        :
                                Print information on job groups.

&nbsp;&nbsp;&nbsp;&nbsp;**--client-info**           :
                                Print information on the recently
                                connected clients.

&nbsp;&nbsp;&nbsp;&nbsp;**--notification-info**     :
                                Print a snapshot of the currently
                                subscribed notification listeners.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity-info**         :
                                Print information on the currently
                                handled affinities.

&nbsp;&nbsp;&nbsp;&nbsp;**--active-job-count**      :
                                Only print the total number of Pending
                                and Running jobs in all queues combined.

&nbsp;&nbsp;&nbsp;&nbsp;**--jobs-by-status**        :
                                Print the number of jobs itemized by
                                their current status. If the
                                '--affinity' option is given, only the
                                jobs with the specified affinity will be
                                counted.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity ARG**          :
                                Affinity token.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**--verbose**               :
                                Produce more verbose output.

&nbsp;&nbsp;&nbsp;&nbsp;**--of [--output-format] ARG** :
                                One of the output formats supported by
                                this command.

&nbsp;&nbsp;&nbsp;&nbsp;**--aggregation-interval ARG** :
                                NetCache: specify the statistics
                                aggregation interval to return ('1min',
                                '5min', '1h', 'life', and so on).
                                Default: 'life'.

&nbsp;&nbsp;&nbsp;&nbsp;**--previous-interval**     :
                                NetCache: return statistics for the
                                previous (complete) aggregation interval
                                (instead of returning the current but
                                incomplete statistics).

&nbsp;&nbsp;&nbsp;&nbsp;**--compat-mode**           :
                                Enable backward compatibility tweaks.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.



<a name="ch_grid.GRID_Cli_NetCache"></a>

## NetCache commands


### blobinfo (bi)

 Retrieve metadata of a NetCache blob.

**SYNOPSIS**

grid_cli blobinfo ID

**DESCRIPTION**

Print vital information about the specified blob. Expired blobs will be
reported as not found.

Both NetCache and ICache modes are supported. ICache mode requires blob
ID to be specified in the following format: "key,version,subkey".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--single-server**         :
                                In ICache mode, use only the most likely
                                server to hold the key. Do not try other
                                servers in the service.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### getblob (gb)

 Retrieve a blob from NetCache.

**SYNOPSIS**

grid_cli getblob ID

**DESCRIPTION**

Read the blob identified by ID and send its contents to the standard
output (or to the specified output file). Expired blobs will be reported
as not found.

Both NetCache and ICache modes are supported. ICache mode requires blob
ID to be specified in the following format: "key,version,subkey".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--password ARG**          :
                                Enable NetCache password protection.

&nbsp;&nbsp;&nbsp;&nbsp;**--offset ARG**            :
                                Byte offset of the portion of data.

&nbsp;&nbsp;&nbsp;&nbsp;**--size [--length] ARG**   :
                                Length (in bytes) of the portion of
                                data.

&nbsp;&nbsp;&nbsp;&nbsp;**--single-server**         :
                                In ICache mode, use only the most likely
                                server to hold the key. Do not try other
                                servers in the service.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### putblob (pb)

 Create or rewrite a NetCache blob.

**SYNOPSIS**

grid_cli putblob [ID]

**DESCRIPTION**

Read data from the standard input (or a file) until EOF is encountered
and save the received data as a NetCache blob.

Both NetCache and ICache modes are supported. ICache mode requires blob
ID to be specified in the following format: "key,version,subkey".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--password ARG**          :
                                Enable NetCache password protection.

&nbsp;&nbsp;&nbsp;&nbsp;**--ttl ARG**               :
                                Override the default time-to-live value.

&nbsp;&nbsp;&nbsp;&nbsp;**--enable-mirroring**      :
                                Enable NetCache mirroring functionality.

&nbsp;&nbsp;&nbsp;&nbsp;**--use-compound-id**       :
                                Return key in CompoundID format.

&nbsp;&nbsp;&nbsp;&nbsp;**--input ARG**             :
                                Provide input data on the command line.
                                The standard input stream will not be
                                read.

&nbsp;&nbsp;&nbsp;&nbsp;**--input-file ARG**        :
                                Read input from the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--compat-mode**           :
                                Enable backward compatibility tweaks.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### rmblob (rb)

 Remove a NetCache blob.

**SYNOPSIS**

grid_cli rmblob ID

**DESCRIPTION**

Delete a blob if it exists. If the blob has expired (or never existed),
no errors are reported.

Both NetCache and ICache modes are supported. ICache mode requires blob
ID to be specified in the following format: "key,version,subkey".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--password ARG**          :
                                Enable NetCache password protection.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.



<a name="ch_grid.GRID_Cli_NetStorage"></a>

## NetStorage commands


### upload

 Create or rewrite a NetStorage object.

**SYNOPSIS**

grid_cli upload [OBJECT_LOC]

**DESCRIPTION**

Save the data coming from the standard input (or an input file) to a
network storage. The choice of the storage is based on the specified
combination of the '--persistent', '--fast-storage', '--movable', and
'--cacheable' options. After the data has been written, the generated
object locator is printed to the standard output.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--persistent**            :
                                Use a persistent storage like FileTrack.

&nbsp;&nbsp;&nbsp;&nbsp;**--fast-storage**          :
                                Use a fast storage like NetCache.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--namespace ARG**         :
                                Domain-specific name that isolates
                                objects created with a user-defined key
                                from objects created by other users.

&nbsp;&nbsp;&nbsp;&nbsp;**--ttl ARG**               :
                                Override the default time-to-live value.

&nbsp;&nbsp;&nbsp;&nbsp;**--movable**               :
                                Allow the object to move between
                                storages.

&nbsp;&nbsp;&nbsp;&nbsp;**--cacheable**             :
                                Use NetCache for data caching.

&nbsp;&nbsp;&nbsp;&nbsp;**--no-meta-data**          :
                                Do not use relational database for
                                ownership, change tracking, and object
                                attributes.

&nbsp;&nbsp;&nbsp;&nbsp;**--input ARG**             :
                                Provide input data on the command line.
                                The standard input stream will not be
                                read.

&nbsp;&nbsp;&nbsp;&nbsp;**--input-file ARG**        :
                                Read input from the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-site ARG**           :
                                FileTrack site to use: 'submit' (or
                                'prod'), 'dsubmit' (or 'dev'), 'qsubmit'
                                (or 'qa'). Default: 'submit'.

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-api-key ARG**        :
                                FileTrack API key. When connecting to
                                FileTrack directly, an API key is
                                required.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### download

 Retrieve a NetStorage object.

**SYNOPSIS**

grid_cli download ID

**DESCRIPTION**

Read the object pointed to by the specified locator and send its
contents to the standard output or a file.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--offset ARG**            :
                                Byte offset of the portion of data.

&nbsp;&nbsp;&nbsp;&nbsp;**--size [--length] ARG**   :
                                Length (in bytes) of the portion of
                                data.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### relocate

 Move a NetStorage object to a different storage.

**SYNOPSIS**

grid_cli relocate ID

**DESCRIPTION**

Transfer object contents to the new location hinted by a combination of
the '--persistent', '--fast-storage', and '--cacheable' options. After
the data has been transferred, a new object locator will be generated,
which can be used instead of the old one for faster object access.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--persistent**            :
                                Use a persistent storage like FileTrack.

&nbsp;&nbsp;&nbsp;&nbsp;**--fast-storage**          :
                                Use a fast storage like NetCache.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--namespace ARG**         :
                                Domain-specific name that isolates
                                objects created with a user-defined key
                                from objects created by other users.

&nbsp;&nbsp;&nbsp;&nbsp;**--ttl ARG**               :
                                Override the default time-to-live value.

&nbsp;&nbsp;&nbsp;&nbsp;**--movable**               :
                                Allow the object to move between
                                storages.

&nbsp;&nbsp;&nbsp;&nbsp;**--cacheable**             :
                                Use NetCache for data caching.

&nbsp;&nbsp;&nbsp;&nbsp;**--no-meta-data**          :
                                Do not use relational database for
                                ownership, change tracking, and object
                                attributes.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-site ARG**           :
                                FileTrack site to use: 'submit' (or
                                'prod'), 'dsubmit' (or 'dev'), 'qsubmit'
                                (or 'qa'). Default: 'submit'.

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-api-key ARG**        :
                                FileTrack API key. When connecting to
                                FileTrack directly, an API key is
                                required.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### mkobjectloc

 Turn a user-defined key into an object locator.

**SYNOPSIS**

grid_cli mkobjectloc [OBJECT_LOC]

**DESCRIPTION**

Take a unique user-defined key/namespace pair (or an existing object
locator) and make a new object locator. The resulting object locator
will reflect storage preferences specified by the '--persistent',
'--fast-storage', '--movable', and '--cacheable' options.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--object-key ARG**        :
                                Uniqie user-defined key to address the
                                object. Requires '--namespace'.

&nbsp;&nbsp;&nbsp;&nbsp;**--namespace ARG**         :
                                Domain-specific name that isolates
                                objects created with a user-defined key
                                from objects created by other users.

&nbsp;&nbsp;&nbsp;&nbsp;**--persistent**            :
                                Use a persistent storage like FileTrack.

&nbsp;&nbsp;&nbsp;&nbsp;**--fast-storage**          :
                                Use a fast storage like NetCache.

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--namespace ARG**         :
                                Domain-specific name that isolates
                                objects created with a user-defined key
                                from objects created by other users.

&nbsp;&nbsp;&nbsp;&nbsp;**--ttl ARG**               :
                                Override the default time-to-live value.

&nbsp;&nbsp;&nbsp;&nbsp;**--movable**               :
                                Allow the object to move between
                                storages.

&nbsp;&nbsp;&nbsp;&nbsp;**--cacheable**             :
                                Use NetCache for data caching.

&nbsp;&nbsp;&nbsp;&nbsp;**--no-meta-data**          :
                                Do not use relational database for
                                ownership, change tracking, and object
                                attributes.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-site ARG**           :
                                FileTrack site to use: 'submit' (or
                                'prod'), 'dsubmit' (or 'dev'), 'qsubmit'
                                (or 'qa'). Default: 'submit'.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### objectinfo

 Print information about a NetStorage object.

**SYNOPSIS**

grid_cli objectinfo ID

**DESCRIPTION**

Some object locators may require additional options to hint at the
actual object location.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### rmobject

 Remove a NetStorage object by its locator.

**SYNOPSIS**

grid_cli rmobject ID

**DESCRIPTION**

Some object locators may require additional options to hint at the
actual object location.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### getattr

 Get a NetStorage object attribute value.

**SYNOPSIS**

grid_cli getattr OBJECT_LOC ATTR_NAME

**DESCRIPTION**

Some object locators may require additional options to hint at the
actual object location.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### setattr

 Set a NetStorage object attribute value.

**SYNOPSIS**

grid_cli setattr OBJECT_LOC ATTR_NAME ATTR_VALUE

**DESCRIPTION**

Some object locators may require additional options to hint at the
actual object location.

If a NetStorage service (or server) is specified via the '--netstorage'
option, that service or server will be used as a gateway to the actual
storage back-end (e.g. NetCache). If the option is not specified, a
direct connection to the storage back-end is established.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--nst [--netstorage] ARG** :
                                NetStorage service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--cache ARG**             :
                                Enable ICache mode and specify cache
                                name to use.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--ft-api-key ARG**        :
                                FileTrack API key. When connecting to
                                FileTrack directly, an API key is
                                required.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




<a name="ch_grid.GRID_Cli_NetSchedule_Universal"></a>

## Universal NetSchedule commands


### jobinfo (ji)

 Print information about a NetSchedule job.

**SYNOPSIS**

grid_cli jobinfo ID

**DESCRIPTION**

Print vital information about the specified NetSchedule job. Expired
jobs will be reported as not found.

The following output formats are supported: "human-readable", "raw", and
"json". The default is "human-readable".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--brief**                 :
                                Produce less verbose output.

&nbsp;&nbsp;&nbsp;&nbsp;**--status-only**           :
                                Print job status only.

&nbsp;&nbsp;&nbsp;&nbsp;**--defer-expiration**      :
                                Prolong job lifetime by updating its
                                last access timestamp.

&nbsp;&nbsp;&nbsp;&nbsp;**--progress-message-only** :
                                Print only the progress message.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--of [--output-format] ARG** :
                                One of the output formats supported by
                                this command.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### getjobinput

 Read job input.

**SYNOPSIS**

grid_cli getjobinput ID

**DESCRIPTION**

Retrieve and print job input to the standard output stream or save it to
a file.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### getjoboutput

 Read job output if the job is completed.

**SYNOPSIS**

grid_cli getjoboutput ID

**DESCRIPTION**

Retrieve and print job output to the standard output stream or save it
to a file. If the job does not exist or has not been completed
successfully, an appropriate error message is printed to the standard
error stream and the program exits with a non-zero return code.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--remote-app-stdout**     :
                                Treat the job as a 'remote_app' job and
                                extract the standard output stream of
                                the remote application.

&nbsp;&nbsp;&nbsp;&nbsp;**--remote-app-stderr**     :
                                Extract the standard error stream of the
                                remote application.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### updatejob

 Modify attributes of an existing job.

**SYNOPSIS**

grid_cli updatejob ID

**DESCRIPTION**

Change one or more job properties. The outcome depends on the current
state of the job.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--extend-lifetime ARG**   :
                                Extend job lifetime by the specified
                                number of seconds.

&nbsp;&nbsp;&nbsp;&nbsp;**--progress-message ARG**  :
                                Set job progress message.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### queueinfo (qi)

 Get information about NetSchedule queues.

**SYNOPSIS**

grid_cli queueinfo [QUEUE]

**DESCRIPTION**

When neither '--all-queues' nor '--queue-classes' option is given, this
command prints the following information on the specified queue: the
queue configuration parameters, queue type (static or dynamic), and, if
the queue is dynamic, its description and the queue class name. For
newer NetSchedule versions, additional queue parameters may be printed.

If the '--all-queues' option is given, this command prints information
about every queue on each server specified by the '--netschedule'
option.

The '--queue-classes' switch provides an option to get the information
on queue classes instead of queues.

Valid output formats are "raw" and "json". The default is "raw".

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--all-queues**            :
                                Print information on all queues.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue-classes**         :
                                Print information on queue classes.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--of [--output-format] ARG** :
                                One of the output formats supported by
                                this command.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### dumpqueue

 Dump a NetSchedule queue.

**SYNOPSIS**

grid_cli dumpqueue

**DESCRIPTION**

This command dumps detailed information about jobs in a NetSchedule
queue. It is possible to limit the number of records printed and also to
filter the output by job status and/or job group.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--start-after-job ARG**   :
                                Specify the key of the last job in the
                                previous dump batch.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-count ARG**         :
                                Specify the maximum number of jobs in
                                the output.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-status ARG**        :
                                Select jobs by job status.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### createqueue

 Create a dynamic NetSchedule queue.

**SYNOPSIS**

grid_cli createqueue QUEUE QUEUE_CLASS

**DESCRIPTION**

This command creates a new NetSchedule queue using a template known as
queue class.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue-description ARG** :
                                Optional queue description.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### getqueuelist

 Print the list of available NetSchedule queues.

**SYNOPSIS**

grid_cli getqueuelist

**DESCRIPTION**

This command takes a NetSchedule service name (or server address) and
queries each server participating that service for the list of
configured or dynamically created queues. The collected lists are then
combined in a single list of queues available on all servers in the
service. For each queue available only on a subset of servers, its
servers are listed in parentheses after the queue name.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### deletequeue

 Delete a dynamic NetSchedule queue.

**SYNOPSIS**

grid_cli deletequeue QUEUE

**DESCRIPTION**

Worker nodes that may have already started job processing will not be
notified.

Static queues cannot be deleted, although it is possible to cancel all
jobs in a static queue.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




    
<a name="ch_grid.GRID_Cli_Submitter"></a>

## Submitter commands


### submitjob

 Submit one or more jobs to a NetSchedule queue.

**SYNOPSIS**

grid_cli submitjob

**DESCRIPTION**

Create one or multiple jobs by submitting input data to a NetSchedule
queue. The first submitted job will be executed immediately as long as
there is a worker node waiting for a job on that queue.

This command has three modes of operation:

  - single job submission;
  - batch submission;
  - preparation of input for "offline" job execution.

In single job submission mode, unless the '--input-file' or '--input'
options are given, job input is read from the standard input stream, and
the rest of attributes are taken from their respective command line
options. The '--remote-app-args' option creates a job for processing by
the 'remote_app' worker node, in which case either '--input' or
'--input-file' option can be used to define the standard input stream of
the remote_app job.

If the '--wait-timeout' option is given in single job submission mode,
grid_cli will wait for the job to terminate, and if the job terminates
within the specified number of seconds or when this timeout has passed
while the job is still Pending or Running, job status will be printed
right after the job ID. And if this status is 'Done', job output will be
printed on the next line (unless the '--output-file' option is given, in
which case the output goes to the specified file).

A NetCache server is required for saving job input if it exceeds the
capability of the NetSchedule internal storage.

Batch submission mode is activated by the '--batch' option, which takes
the maximum batch size as its argument. When this mode is enabled, all
options that define job attributes are ignored. Instead, job attributes
are read from the standard input stream or the specified input file -
one line per job. Each line must contain a space-separated list of job
attributes as follows:

  input="DATA" OR args="REMOTE_APP_ARGS"
  affinity="TOKEN"
  exclusive

Special characters in all quoted strings must be properly escaped. It is
OK to omit quotation marks for a string that doesn't contain spaces. The
"input" attribute is required unless the "args" attribute is specified.
The latter enables remote_app mode and defines command line arguments
for a remote_app job, in which case the "input" attribute becomes
optional and defines the standard input stream for the remote_app job.

Examples:

  input="db, 8548@394.701" exclusive
  args="checkout p1/d2" affinity="bin1"

In batch mode, the IDs of the created jobs are printed to the standard
output stream (or the specified output file) one job ID per line.

The third mode of operation bypasses NetSchedule and NetCache, and saves
the input data for direct consumption by the worker node (primarily for
testing or debugging). This mode is enabled by the '--job-input-dir'
option, which defines the target directory where input data will be
saved.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--batch ARG**             :
                                Enable batch mode and specify batch
                                size.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--input ARG**             :
                                Provide input data on the command line.
                                The standard input stream will not be
                                read.

&nbsp;&nbsp;&nbsp;&nbsp;**--input-file ARG**        :
                                Read input from the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--remote-app-args ARG**   :
                                Submit a remote_app job and specify its
                                arguments.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity ARG**          :
                                Affinity token.

&nbsp;&nbsp;&nbsp;&nbsp;**--exclusive-job**         :
                                Create an exclusive job.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--timeout [--wait-timeout] ARG** :
                                Timeout in seconds.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-input-dir ARG**     :
                                Job input directory.




### watchjob

 Wait for a job to change status.

**SYNOPSIS**

grid_cli watchjob ID

**DESCRIPTION**

Listen to the job status change notifications and return when one of the
following conditions has been met:

* The wait timeout specified by the '--wait-timeout' option has passed.
This option is required.

* The job has come to a status indicated by one or more
'--wait-for-job-status' options.

* A new job history event with the index greater than the one specified
by the '--wait-for-job-event-after' option has occurred.

If neither '--wait-for-job-status' nor '--wait-for-job-event-after'
option is specified, the 'watchjob' command waits until the job
progresses to a status other than 'Pending' or 'Running'.

The output of this command is independent of the reason it exits: the
latest job event index is printed to the standard output on the first
line and the current job status is printed on the second line.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--timeout [--wait-timeout] ARG** :
                                Timeout in seconds.

&nbsp;&nbsp;&nbsp;&nbsp;**--wait-for-job-status ARG** :
                                Wait until the job status changes to the
                                given value. The option can be given
                                more than once to wait for any one of
                                multiple values. Use the keyword 'Any'
                                to wait for any status change.

&nbsp;&nbsp;&nbsp;&nbsp;**--wait-for-job-event-after ARG** :
                                Wait for a job event with the index
                                greater than ARG.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### readjob

 Return the next finished job.

**SYNOPSIS**

grid_cli readjob

**DESCRIPTION**

Incrementally harvest IDs of successfully completed, failed, and
canceled jobs. This command has two modes of operation: simple mode
(without acknowledgment) and reliable mode (with acknowledgment). The
former is the default; the latter is triggered by the '--reliable-read'
option.

In simple mode, if any of the specified NetSchedule servers has a job
that's done, failed, or canceled, the ID of that job will be printed on
the first line, and its status - 'Done', 'Failed', or 'Canceled' - on
the second line. Also, if the job is 'Done', its entire output will be
printed as well, starting from the third line (unless the
'--output-file' option is given, in which case the output goes to the
specified file).

After the job output has been successfully printed, the status of the
job is immediately changed to 'Confirmed', which means that the job
won't be available for reading anymore.

In reliable mode, job reading is a two-step process. The first step,
which is triggered by the '--reliable-read' option, acquires a reading
reservation. If there's a job that's done, failed, or canceled, its ID
is printed on the first line along with its final status ('Done',
'Failed', or 'Canceled') on the next line and a unique reservation token
on the third line. This first step changes the status of the returned
job from 'Done' to 'Reading'. The reading reservation is valid for a
short period of time configurable on the server. If the server does not
receive a reading confirmation (see below) within this time frame, the
job will change its status back to the original status ('Done',
'Failed', or 'Canceled').

The second step is activated by one of the following finalization
options: '--confirm-read', '--rollback-read', or '--fail-read'. Each of
these options requires the reservation token that was issued by
NetSchedule during the first step to be passed as the argument for the
option. The corresponding job ID must be provided with the '--job-id'
option. The job must still be in the 'Reading' status. After the
finalization step, the status of the job will change depending on the
option given as per the following table:

    Option              Resulting status
    ================    ================
    --confirm-read      Confirmed
    --fail-read         ReadFailed
    --rollback-read     Done, Failed, or Canceled

The 'Confirmed' status and the 'ReadFailed' status are final and cannot
be changed, while '--rollback-read' makes the jobs available for
subsequent 'readjob' commands.

In either mode, the '--wait-timeout' option allows to wait the specified
number of seconds until a job becomes available for reading. Without
this option, if there are no completed, failed, or canceled jobs in the
queue, nothing will be printed and the exit code will be zero.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--remote-app-stdout**     :
                                Treat the job as a 'remote_app' job and
                                extract the standard output stream of
                                the remote application.

&nbsp;&nbsp;&nbsp;&nbsp;**--remote-app-stderr**     :
                                Extract the standard error stream of the
                                remote application.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity-list ARG**     :
                                Comma-separated list of affinity tokens.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**--reliable-read**         :
                                Enable reading confirmation mode.

&nbsp;&nbsp;&nbsp;&nbsp;**--timeout [--wait-timeout] ARG** :
                                Timeout in seconds.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-id ARG**            :
                                Job ID to operate on.

&nbsp;&nbsp;&nbsp;&nbsp;**--confirm-read ARG**      :
                                For the reading reservation specified as
                                the argument to this option, mark the
                                job identified by '--job-id' as
                                successfully retrieved.

&nbsp;&nbsp;&nbsp;&nbsp;**--rollback-read ARG**     :
                                Release the specified reading
                                reservation of the specified job.

&nbsp;&nbsp;&nbsp;&nbsp;**--fail-read ARG**         :
                                Use the specified reading reservation to
                                mark the job as impossible to read.

&nbsp;&nbsp;&nbsp;&nbsp;**--error-message ARG**     :
                                Provide an optional error message.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### canceljob

 Cancel one or more NetSchedule jobs.

**SYNOPSIS**

grid_cli canceljob [ID]

**DESCRIPTION**

Mark the specified job (or multiple jobs) as canceled. This command also
instructs the worker node that may be processing those jobs to stop the
processing.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--all-jobs**              :
                                Apply to all jobs in the queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--job-status ARG**        :
                                Select jobs by job status.

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




<a name="ch_grid.GRID_Cli_Worker"></a>

## Worker node commands


### requestjob

 Get a job from NetSchedule for processing.

**SYNOPSIS**

grid_cli requestjob

**DESCRIPTION**

Return a job pending for execution. The status of the job is changed
from "Pending" to "Running" before the job is returned. This command
makes it possible for grid_cli to emulate a worker node.

The affinity-related options affect how the job is selected. Unless the
'--any-affinity' option is given, a job is returned only if its affinity
matches one of the specified affinities.

Job retrieval can also be restricted to the group name specified by the
'--job-group' option.

If a job is acquired, its ID and attributes are printed to the standard
output stream on the first and the second lines respectively, followed
by the input data of the job unless the '--output-file' option is
specified, in which case the input data will be saved to that file.

The format of the line with job attributes is as follows:

auth_token [affinity="job_affinity"] [exclusive]

If none of the NetSchedule servers has pending jobs in the specified
queue, nothing is printed and the exit code of zero is returned.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity-list ARG**     :
                                Comma-separated list of affinity tokens.

&nbsp;&nbsp;&nbsp;&nbsp;**--use-preferred-affinities** :
                                Accept a job with any of the affinities
                                registered earlier as preferred.

&nbsp;&nbsp;&nbsp;&nbsp;**--claim-new-affinities**  :
                                Accept a job with a preferred affinity,
                                without an affinity, or with an affinity
                                that is not preferred by any worker (in
                                which case it is added to the preferred
                                affinities).

&nbsp;&nbsp;&nbsp;&nbsp;**--any-affinity**          :
                                Accept job with any available affinity.

&nbsp;&nbsp;&nbsp;&nbsp;**--group [--job-group] ARG** :
                                Job group.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--timeout [--wait-timeout] ARG** :
                                Timeout in seconds.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### commitjob

 Mark the job as complete or failed.

**SYNOPSIS**

grid_cli commitjob ID AUTH_TOKEN

**DESCRIPTION**

Change the state of the job to either 'Done' or 'Failed'. This command
can only be executed on jobs that are in the 'Running' state.

Unless one of the '--job-output', '--job-output-blob', or '--input-file'
options is given, the job output is read from the standard input stream.

If the job is being reported as failed, an error message must be
provided with the '--fail-job' command line option.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--nc [--netcache] ARG**   :
                                NetCache service name or server address.

&nbsp;&nbsp;&nbsp;&nbsp;**--return-code ARG**       :
                                Job return code.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-output ARG**        :
                                Provide job output on the command line
                                (inhibits reading from the standard
                                input stream or an input file).

&nbsp;&nbsp;&nbsp;&nbsp;**--job-output-blob ARG**   :
                                Specify a NetCache blob to use as the
                                job output.

&nbsp;&nbsp;&nbsp;&nbsp;**--input-file ARG**        :
                                Read input from the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--fail-job ARG**          :
                                Report the job as failed and specify an
                                error message.

&nbsp;&nbsp;&nbsp;&nbsp;**--affinity ARG**          :
                                Affinity token.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### returnjob

 Return a previously accepted job.

**SYNOPSIS**

grid_cli returnjob ID AUTH_TOKEN

**DESCRIPTION**

Due to insufficient resources or for any other reason, this command can
be used by a worker node to return a previously accepted job back to the
NetSchedule queue. The job will change its state from Running back to
Pending, but the information about previous runs will not be discarded,
and the expiration time will not be advanced.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### clearnode

 Fail incomplete jobs and clear client record.

**SYNOPSIS**

grid_cli clearnode

**DESCRIPTION**

The '--login-token' option must be provided for client identification.
This command removes the corresponding client registry record from all
NetSchedule servers. If there are running jobs assigned to the client,
their status will be changed back to Pending (or Failed if no retries
left).

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--ns [--netschedule] ARG** :
                                NetSchedule service name or server
                                address.

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.




### replay

 Rerun a job in debugging environment.

**SYNOPSIS**

grid_cli replay ID

**DESCRIPTION**

This command facilitates debugging of remote_cgi and remote_app jobs as
well as "native" worker nodes. By using this command, job input can be
preserved for later re-run in debugging or testing environment. Job
output can also be preserved to compare it with "reference" runs.

**OPTIONS**

&nbsp;&nbsp;&nbsp;&nbsp;**--queue ARG**             :
                                NetSchedule queue.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-input-dir ARG**     :
                                Job input directory.

&nbsp;&nbsp;&nbsp;&nbsp;**--job-output-dir ARG**    :
                                Job output directory.

&nbsp;&nbsp;&nbsp;&nbsp;**--dump-cgi-env**          :
                                For remote_cgi jobs, print the CGI
                                environment variables saved by cgi2rcgi
                                as a part of job input.

&nbsp;&nbsp;&nbsp;&nbsp;**--dump-cgi-stdin**        :
                                For remote_cgi jobs, dump the standard
                                input saved by cgi2rcgi as a part of job
                                input.

&nbsp;&nbsp;&nbsp;&nbsp;**-o [--output-file] ARG**  :
                                Save output to the specified file.

&nbsp;&nbsp;&nbsp;&nbsp;**--compat-mode**           :
                                Enable backward compatibility tweaks.

&nbsp;&nbsp;&nbsp;&nbsp;**--login-token ARG**       :
                                Login token (see the 'login' command).

&nbsp;&nbsp;&nbsp;&nbsp;**--auth ARG**              :
                                Authentication string ("client_name").

&nbsp;&nbsp;&nbsp;&nbsp;**--allow-xsite-conn**      :
                                Allow cross-site connections.
