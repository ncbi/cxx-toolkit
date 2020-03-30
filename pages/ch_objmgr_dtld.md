---
layout: default
title: Biological Object Manager – Data Loaders
nav: pages/ch_objmgr_dtld
---


{{ page.title }}
============================================

## Introduction

Data loader is a link between in-process data storage and remote, out-of process data source. Its purpose is to communicate with a remote data source, receive data from there, and understand what is already received and what is missing, and pass data to the local storage ([Data source](ch_objmgr#ch_objmgr.om_def.html_Data_source)). Data loader maintains its own index of what data is loaded already and references that data in the Data source.

## Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [Data loader](#ch_objmgr_dtld.Data_loader)

    -   [Interaction with the Object Manager](#ch_objmgr_dtld.Interaction_with_the_Object__1)

-   [GenBank data loader configuration](#ch_objmgr_dtld.GenBank_data_loader_)

-   [Use of Local Data Storage (LDS) by Object Manager](#ch_objmgr_dtld.Use_of_Local_Data_Storage_LDS)

    -   [Registering the LDS loader with the Object Manager](#ch_objmgr_dtld.Registering_the_LDS_loader_wit)

    -   [Using both the LDS and GenBank loaders](#ch_objmgr_dtld.Using_both_the_LDS_and_GenBank)

    -   [Known gotchas](#ch_objmgr_dtld.Known_gotchas)

-   [Configuring NetCached to cache GenBank data](#ch_objmgr_dtld.Configuring_NetCache)

-   [In-Memory Caching in the Object Manager and Data Loaders](#ch_objmgr_dtld.InMemory_Caching_in_the_Object)

-   [Pubseq Gateway data loader](#ch_objmgr_dtld.PSG_Data_Loader)


<a name="ch_objmgr_dtld.Data_loader"></a>

Data loader
-----------

The Data loader base class CDataLoader (data\_loader[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/objmgr/data_loader.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objmgr/data_loader.cpp)]) is almost never used by a client application directly. The specific data loaders (like GenBank data loader) have several static methods which should be used to register loaders in the Object Manager. Each of [RegisterInObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterInObjectManager) methods constructs a loader name depending on the arguments, checks if a loader with this name is already registered, creates and registers the loader if necessary. [GetLoaderNameFromArgs](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetLoaderNameFromArgs) methods may be used to get a potential loader's name from a set of arguments. [RegisterInObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterInObjectManager) returns a simple structure with two methods: [IsCreated](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsCreated), indicating if the loader was just created or a registered loader with the same name was found, and [GetLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetLoader), returning pointer to the loader. The pointer may be null if the [RegisterInObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterInObjectManager) function fails or if the type of the already registered loader can not be casted to the type requested.


<a name="ch_objmgr_dtld.Interaction_with_the_Object__1"></a>

### Interaction with the Object Manager

By default, the Object Manager will use registered data loaders to fetch basic information about all referenced Seq-entry's and annotations. For example, even if a Seq-entry contains no external references and is added to the scope using [CScope](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CScope)::[AddTopLevelSeqEntry()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTopLevelSeqEntry), the Object Manager will still use the data loader to fetch basic information about that Seq-entry and its annotations.

If the Object Manager finds a difference between a Seq-entry loaded by a data loader and an in-memory Seq-entry (having the same Seq-id) loaded with [AddTopLevelSeqEntry()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTopLevelSeqEntry), the in-memory data will be used instead of the data from the data loader.


<a name="ch_objmgr_dtld.GenBank_data_loader_"></a>

GenBank data loader configuration
---------------------------------

Application configuration is stored in a file with the same name as application, and extension `.ini`. The file will be found either in the executable or in the user's home directory.

<br/>GenBank data loader looks for parameters in section `[genbank]` and its subsections.

<a name="ch_objmgr_dtld.Main_GenBank_data_lo"></a>

### Main GenBank data loader configuration<br/>section [genbank]

    [genbank]

    ; loader_method lists GenBank readers - interfaces to GenBank server.
    ; They are checked by GenBank loader in the order of appearance in this list.
    ; For example the value "cache;id2" directs GenBank loader to look in cache
    ; reader first, then to look for information in id2 reader from GenBank servers.
    ; Available readers are: id1, id2, pubseqos, pubseqos2, and cache.
    loader_method = cache;id2

    ; preopen can be set to false to postpone GenBank connection until needed,
    ; or to true to open connections in all readers at GenBank construction time.
    ; By default, each reader opens its connection depending on reader settings.
    preopen = true

<a name="ch_objmgr_dtld.GenBank_readers_conf"></a>

### GenBank readers configuration

<a name="ch_objmgr_dtld.Readers_id1__id2sect"></a>

#### Readers id1& id2<br/>section [genbank/id1] or [genbank/id2]

    [genbank/id1]
    ; no_conn means maximum number of simultaneous connections to ID server.
    ; By default it's 3 in multi-threaded application, and 1 in single-threaded.
    no_conn = 2
    ; max_number_of_connections is a synonym for no_conn, e.g.:
    ; max_number_of_connections = 2

    ; If preopen is not set in [genbank] section, local setting of preopen
    ; will be used to determine when to open ID connection.
    ; If preopen is set to false, ID reader will open connection only when needed.
    ; If the value is true the connection will be opened at GenBank
    ; construction time.
    preopen = false

    ; ID1/ID2 service name, (default: ID1 or ID2 correspondingly)
    service = ID1_TEST

    ; ID1/ID2 connection timeout in seconds, (default: 20 for ID1 and ID2)
    timeout = 10

    ; ID1/ID2 connection timeout in seconds while opening and initializing, (default: 5 for ID1 and ID2)
    open_timeout = 5

    ; number of connection retries in case of error (default: 5)
    retry = 3

<a name="ch_objmgr_dtld.Processors_id2sect"></a>

##### ID2 processors<br/>

Additional processors for ID2 reader are enabled by setting GENBANK_ID2_PROCESSOR
environment variable. Multiple processors should be separated with semicolon.

    GENBANK_ID2_PROCESSOR=cdd;wgs;snp

<a name="ch_objmgr_dtld.Processor_id2_cddsect"></a>

###### CDD prosessor<br/>section [id2proc/cdd]
    [id2proc/cdd]
    ; CDD service name (default: getCddSeqAnnot).
    service_name=getCddSeqAnnot
    ; Enable or disable data compression (default: false).
    compress_data=false

<a name="ch_objmgr_dtld.Processor_id2_snpsect"></a>

###### SNP prosessor<br/>section [id2proc/snp]
    [id2proc/snp]
    ; VDB cache size (default: 10).
    vdb_cache_size=10
    ; Data compression level: 0=never, 1=some, 2=always (default: 1).
    compress_data=1

<a name="ch_objmgr_dtld.Processor_id2_wgssect"></a>

###### WGS prosessor<br/>section [id2proc/wgs]
    [id2proc/wgs]
    ; VDB cache size (default: 100).
    vdb_cache_size=100
    ; Index update time (default: 6000).
    index_update_time=600
    ; Data compression level: 0=never, 1=some, 2=always (default: 1).
    compress_data=1

<a name="ch_objmgr_dtld.Readers_pubseqos___p"></a>

#### Readers pubseqos & pubseqos2<br/>section [genbank/pubseqos] or [genbank/pubseqos2]

    [genbank/pubseqos]

    ; no_conn means maximum number of simultaneous connections to PubSeqOS server.
    ; By default it's 2 in multi-threaded application, and 1 in single-threaded.
    no_conn = 1

    ; If preopen is not set in [genbank] section, local setting of preopen will be used
    ; to determine when to open PubSeqOS connection.
    ; If preopen is set to false, PubSeqOS reader will open connection only when needed.
    ; If the value is true the connection will be opened at GenBank construction time.
    preopen = false

    ; PubSeqOS server name, (default: PUBSEQ_OS)
    server = PUBSEQ_OS_PUBLIC

    ; PubSeqOS connection login name, (default: myusername)
    user = myusername

    ; PubSeqOS connection password, (default: mypassword)
    password = mypassword

    ; number of connection retries in case of error (default: 3)
    retry = 3

<a name="ch_objmgr_dtld.Reader_cachesection_"></a>

#### Reader cache<br/>section [gebank/cache]

<br/>GenBank loader cache consists of two parts, **id\_cache** for storing small information, and **blob\_cache** for storing large sequence data. Parameters of those caches are similar and stored in two sections, **[genbank/cache/id\_cache]** and **[genbank/cache/blob\_cache].**

The only parameter in those sections is **driver**, which can have values: **bdb** for a cache in a local BerkeleyDB database, **netcache** for a cache in netcached. Then parameters of corresponding **ICache** plugins are stored either in **netcache** or in **bdb** subsections.

Usually, both caches use the same interface with the same parameters, so it makes sense to put interface parameters in one section and include it in both places.

For example:

    [genbank/cache/id_cache]

    driver=netcache


    [genbank/cache/id_cache/netcache]

    .Include = netcache


    [genbank/cache/blob_cache]

    driver=netcache


    [genbank/cache/blob_cache/netcache]

    .Include = netcache


    [netcache]

    ; Section with parameters of netcache interface.
    ; Name or IP of the computer where netcached is running.
    host = localhost

    ; Port of netcached service.
    port = 9000

    ; Display name of this application for use by netcached in its logs and diagnostics.
    client = objmgr_demo


    <a name="ch_objmgr_dtld.Configuring_NetCache"></a>

Configuring NetCached to cache GenBank data
-------------------------------------------

NetCached configuration is stored in `netcached.ini` file either in the executable or in the user's home directory.

Configuration parameters in the file are grouped in several sections.

Section **[server]** describes parameters of the server not related to storage.

Section **[bdb]** describes parameters of BerkeleyDB database for main NetCache storage.

One or more **[icache\_???]** sections describe parameters of ICache instances used by **GenBank** loader.

<a name="ch_objmgr_dtld.Server_configuration"></a>

### Server configuration<br/>section [server]

    [server]

    ; port number server responds on
    port=9000

    ; maximum number of clients(threads) can be served simultaneously
    max_threads=25

    ; initial number of threads created for incoming requests
    init_threads=5

    ; directory where server creates access log and error log
    log_path=

    ; Server side logging
    log=false

    ; Use name instead of IP address in keys, false by default
    ;use_hostname=false

    ; Size of thread local buffer (65536 should be fine)
    tls_size=65536

    ; when true, if database cannot be open (corrupted) server
    ; automatically drops the db directory (works only for BDB)
    ; and creates the database from scratch
    ; (the content is going to be lost)
    ; Directory reinitialization can be forced by 'netcached -reinit'
    drop_db=true

    ; Network inactivity timeout in seconds
    network_timeout=20

    ; Switch for session management API
    ; when turned on if the last customer disconnects server shutdowns
    ; after waiting for 'session_shutdown_timeout'
    session_mng=false

    ; application shuts itself down if no new sessions arrive in the
    ; specified time
    session_shutdown_timeout=30

<a name="ch_objmgr_dtld.Main_BerkeleyDB_data"></a>

### Main BerkeleyDB database configuration<br/>section [bdb]

    [bdb]

    ; directory to keep the database. It is important that this
    ; directory resides on local drive (not NFS)
    ;
    ; WARNING: the database directory sometimes can be recursively deleted
    ;(when netcached started with -reinit).
    ;DO NOT keep any of your files(besides the database) in it.
    path=e:/netcached_data

    ; Path to transaction log storage. By default transaction logs are stored
    ; at the same location as main database, but to improve performance it's
    ; best to put it to a dedicated fast hard drive (split I/O load)
    ;
    transaction_log_path=

    ; cache name
    name=nccache

    ; use syncronous or asyncromous writes (used with transactions)
    write_sync=false

    ; Direct IO for database files
    direct_db=false

    ; Direct IO for transaction logs
    direct_log=false

    ; when 'true' the database is transaction protected
    use_transactions=true

    ; BLOB expiration timeout in seconds
    timeout=3600

    ; onread - update BLOB time stamp on every read
    ;(otherwise only creation time will taken into account)
    ; purge_on_startup - delete all deprecated BLOBs when startind netcached
    ;       (may significantly slow down startup propcess)
    ; check_expiration - check if BLOB has expired (on read) and if it is
    ;      return 'not found'. Otherwise BLOB lives until
    ;      it is deleted by the internal garbage collector
    timestamp=onread
    #    purge_on_startup check_expiration

    ; do not change this
    keep_versions=all

    ; Run background cleaning thread
    ; (Pretty much mandatory parameter, turn it off only if you want
    ;  to keep absolutely everything in the database)
    purge_thread=true

    ; Delay (seconds) between purge(garbage collector) runs.
    purge_thread_delay=30

    ; maintanance thread sleeps for specified number of milliseconds after
    ; each batch. By changing this parameter you can adjust the purge
    ; thread priority
    purge_batch_sleep=100

    ; maintanance thread processes database records by chunks of specified
    ; number. If you increase this number it also increases the performance
    ; of purge process (at the expense of the online connections)
    purge_batch_size=70

    ; amount of memory allocated by BerkeleyDB for the database cache
    ; Berkeley DB page cache) (More is better)
    mem_size=50M

    ; when non 0 transaction LOG will be placed to memory for better performance
    ; as a result transactions become non-durable and there is a risk of
    ; loosing the data if server fails
    ; (set to at least 100M if planned to have bulk transactions)
    ;
    log_mem_size=0

    ; Maximum size of the transaction log file
    log_file_max=200M

    ; Percent of pages NC tries to keep available for read
    ; 0 - means no background dirty page write
    ;
    memp_trickle=10

    ; Number of times Berkeley DB mutex spins before sleeping
    ; for some reason values beyond 75 somehow disable memp_trickle
    ;
    tas_spins=200

    ; Specifies how often cache should remove the Berkeley DB LOG files
    ; Removal is triggered by the purge thread. Value of 2 means LOG is
    ; cleaned every second purge
    purge_clean_log=2

    ; Call transaction checkpoint every 'checkpoint_bytes' of stored data
    checkpoint_bytes=10M

    ; BLOBs < 10M stored in database
    overflow_limit=10M

    ; This parameter regulates BLOB expiration. If client constantly reads
    ; the BLOB and you do not want it to stuck in the database forever
    ; (timestamp=onread), set this parameter.
    ; If timeout is 3600 and ttl_prolong is 2, maximum possible timeout for
    ; the BLOB becomes 3600 * 2 = 7200 seconds.
    ttl_prolong=3

    ; Maximum allowed BLOB size (for a single BLOB). 0 - no restriction
    max_blob_size=0

    ; Number of round robin volumes. 0 - no rotation
    ; Cache opens approx 7 files per RR volume.
    rr_volumes=3

<a name="ch_objmgr_dtld.ICache_instances_con"></a>

### ICache instances configuration<br/>sections [icache\_\*]

Each [ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICache) instance has an interface name which is used by clients to select the instance.

The name of the section with the [ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICache) instance's configuration is a concatenation of the string **icache\_** and the name of the instance.

For example, the parameters of an [ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICache) instance named **ids** are stored in the section **[icache\_ids]**.

The parameters inside the section are the same as the parameters in the **[bdb]** section with some exceptions.

If the **path** parameter has the same value as **path** in main **[bdb]** section, then both databases will be stored in the same directory and share the same BerkeleyDB environment.

As a result, all parameters of the BerkeleyDB environment have no meaning in an [ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICache) section and are taken from the [**bdb**] section instead. To avoid a database conflict, all sections with the same **path** parameter must have different **name** parameters.

The GenBank data loader requires two cache instances with slightly different parameters. The first, named **ids** by default, is used for small Seq-id resolution information. The second, named **blobs** by default, is used for large Seq-entry information. The names of those caches can be changed in the client program configuration.

Similarly, NetCached configuration should describe two instances of [ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICache) with names matching to the names on client (**ids** and **blobs** by default).

For example:

    [icache_ids]
    name=ids
    path=e:/netcached_data
    write_sync=false
    use_transactions=true
    timeout=3600
    timestamp=subkey check_expiration
    keep_versions=all
    purge_thread=true
    purge_thread_delay=3600
    purge_batch_sleep=5000
    purge_batch_size=10
    mem_size=0
    purge_clean_log=10
    checkpoint_bytes=10M
    overflow_limit=1M
    ttl_prolong=3
    page_size=small

    [icache_blobs]
    name=blobs
    path=e:/netcached_data
    write_sync=false
    use_transactions=true
    timeout=3600
    timestamp=subkey onread check_expiration
    keep_versions=all
    purge_thread=true
    purge_thread_delay=3600
    purge_batch_sleep=5000
    purge_batch_size=10
    mem_size=0
    purge_clean_log=10
    checkpoint_bytes=10M
    overflow_limit=1M
    ttl_prolong


<a name="ch_objmgr_dtld.Use_of_Local_Data_Storage_LDS"></a>

Use of Local Data Storage (LDS) by Object Manager
-------------------------------------------------

Serializable object data can be stored locally in an SQLite database for efficient access from the Object Manager.

The required libraries are:

<a name="ch_objmgr_dtld.T.nc_unixlib__ncbi_xloader_lds"></a>

|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UNIX    | `LIB  = ncbi_xloader_lds2 lds2 xobjread id2 id1 seqsplit sqlitewrapp creaders $(COMPRESS_LIBS) $(SOBJMGR_LIBS)`<br/>`LIBS = $(SQLITE3_LIBS) $(CMPRS_LIBS) $(DL_LIBS) $(ORIG_LIBS)` |
| Windows | `id1.lib, id2.lib, lds2.lib, sqlitewrapp.lib, sqlite3.lib, ncbi_xloader_lds2.lib, xobjread.lib`           |

<div class="table-scroll"></div>

A demonstration program is available: [SVN](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c%2B%2B/src/sample/app/lds/lds2_sample.cpp?view=markup) \| [LXR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/lds/lds2_sample.cpp)

<a name="ch_objmgr_dtld.Registering_the_LDS_loader_wit"></a>

### Registering the LDS loader with the Object Manager

The [CLDS2\_Manager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CLDS2_Manager) class creates (or updates) an SQLite database at the path specified in its constructor. Data files that it should manage can be specified with the [AddDataFile()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddDataFile) and/or [AddDataDir()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddDataDir) methods. [AddDataFile()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddDataFile) adds a single data file; [AddDataDir()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddDataDir) adds all data files in the specified directory and its subdirectories (by default). Recursion into the subdirectories can be disabled by passing **`CLDS2_Manager::eDir_NoRecurse`** as the second argument to the [AddDataDir()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCLDS2__Manager.html#0e57c13801ff03a58c54ea89379a418a) call. [UpdateData()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=UpdateData) synchronizes the database with all the added data files. Source data files can be in ASN.1 text, ASN.1 binary, XML, or FASTA format.

For example, the following code creates an LDS database, populates it with data, registers it with the Object Manager, and adds the LDS data loader to the scope.

    // Create/update LDS db at given path, based on data in given directory.
    CRef<CLDS2_Manager> mgr(new CLDS2_Manager(db_path));
    mgr->AddDataDir(data_dir);
    mgr->UpdateData();

    // Register LDS with Object Manager.
    CLDS2_DataLoader::RegisterInObjectManager(*object_manager, db_path);

    // Explicitly add LDS to scope.
    scope.AddDataLoader(CLDS2_DataLoader::GetLoaderNameFromArgs(db_path));

<a name="ch_objmgr_dtld.Using_both_the_LDS_and_GenBank"></a>

### Using both the LDS and GenBank loaders

The previous example adds the LDS data loader to the scope without adding any default loaders, including GenBank. To add both the LDS and GenBank loaders (but no other default loaders) to the scope:

    // Create/update LDS db at given path, based on data in given directory.
    CRef<CLDS2_Manager> mgr(new CLDS2_Manager(db_path));
    mgr->AddDataDir(data_dir);
    mgr->UpdateData();

    // Register LDS with Object Manager - as first priority.
    CLDS2_DataLoader::RegisterInObjectManager(*object_manager, db_path, -1,
                                              CObjectManager::eNonDefault, 1);

    // Explicitly add LDS to scope.
    scope.AddDataLoader(CLDS2_DataLoader::GetLoaderNameFromArgs(db_path));

    // Register GenBank with Object Manager - as second priority.
    CGBDataLoader::RegisterInObjectManager(*object_manager, 0,
                                           CObjectManager::eNonDefault, 2);

    // Explicitly add GenBank to scope.
    scope.AddDataLoader(CGBDataLoader::GetLoaderNameFromArgs());

The scope will now include just LDS and GenBank.

**`CObjectManager::eNonDefault`** was passed to the [RegisterInObjectManager()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterInObjectManager) method in this example simply because it is the default value for that argument, and some value was necessary so that the next argument could be specified. It could equally well have been **`CObjectManager::eDefault`**.

The last argument to [RegisterInObjectManager()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterInObjectManager) is the priority. Here it was set to 1 for LDS and 2 for GenBank so the Object Manager would attempt to load data via LDS first, and only if that failed would it resort to GenBank.

In the above example, the loaders were explicitly added to the scope to ensure that they were the only loaders in the scope.

To add the LDS data loader and any other default loaders to the scope:

    // Create/update LDS db at given path, based on data in given directory.
    CRef<CLDS2_Manager> mgr(new CLDS2_Manager(db_path));
    mgr->AddDataDir(data_dir);
    mgr->UpdateData();

    // Register LDS with Object Manager - as first priority.
    CLDS2_DataLoader::RegisterInObjectManager(*object_manager, db_path, -1,
                                              CObjectManager::eDefault, 1);

    // Register GenBank with Object Manager - as second priority.
    CGBDataLoader::RegisterInObjectManager(*object_manager, 0,
                                           CObjectManager::eDefault, 2);

    // Add default loaders to scope.
    scope.AddDefaults();

By registering with **`eDefault`**, the LDS data loader will be added to the scope along with the default data loaders.

<a name="ch_objmgr_dtld.Known_gotchas"></a>

### Known gotchas

<a name="ch_objmgr_dtld.Resolving_Data_References"></a>

#### Resolving Data References

Multiple factors determine whether data references can be resolved or not. For example, imagine that a local data store has been created from a collection of simple annotations. References between annotations might not be resolved, unless the GenBank loader is also registered with the Object Manager, or unless a flag has been set to search unresolved annotations, as in:

    SAnnotSelector sel;
    sel.SetUnresolvedFlag(SAnnotSelector::eSearchUnresolved);

For more information about resolving data references, see the section on [SAnnot\_Selector](ch_objmgr#ch_objmgr.om_attrib.html_SAnnot_selector) and the associated [header documentation](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/structSAnnotSelector.html).

<a name="ch_objmgr_dtld.Setting_Loader_Priority"></a>

#### Setting Loader Priority

It is the caller's responsibility to ensure that the priorities are different for different loaders – or that the same sequence won't be found by both loaders. If multiple loaders are registered with the same priority, or if they are registered without specifying a priority (which results in them both getting the default priority), and if both loaders can fetch the same data, then an exception may be thrown.


<a name="ch_objmgr_dtld.InMemory_Caching_in_the_Object"></a>

In-Memory Caching in the Object Manager and Data Loaders
--------------------------------------------------------

The following table summarizes the classes that perform short-term, in-memory caching for various objects. A custom class must be written for short-term caching of other objects or long-term caching of any objects.

<a name="ch_objmgr_dtld.T.nc_objectscaching_done_bymas"></a>

| Object(s)      | Caching done by     |
|----------------------|-----------------------------------------------------------------------------------------------------|
| master TSE blob      | [CObjectManager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCObjectManager.html) |
| id, gi, label, taxid | [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCGBDataLoader.html)   |
| blob id  | [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCGBDataLoader.html)   |

<div class="table-scroll"></div>

If you want in-memory caching for objects other than those listed in the table, you can implement a cache in a [CDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CDataLoader&d=) subclass. For an example implementation, see the [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGBDataLoader&d=) class. [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGBDataLoader) actually has two Seq-id caches - one for blob id's and the other for the other small objects listed in the table. The size for both of these caches is controlled through the [[GENBANK] ID\_GC\_SIZE](ch_libconfig.html#ch_libconfig.Objects_Object_Manager_Obje) configuration parameter (i.e. their sizes can't be set independently). Subclasses of [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGBDataLoader) can access their configuration using the [CParam methods](ch_core.html#ch_core.Methods_for_Using_Pa).

Short-term caching, as applied to the Object Manager and Data Loaders, means keeping data for "a little while" in a FIFO before deleting. Long-term caching means keeping objects for "a long while" – i.e. longer than they would be kept using a short-term cache. Here, "a while" is relative to the rate at which objects are discarded, not relative to elapsed time. So short-term caching means keeping at most a given number of objects, rather than keeping objects for a given amount of time.

A [CDataSource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDataSource.html) object inside the Object Manager automatically performs short-term caching of blobs for master TSEs. To set the Object Manager's blob cache size, use the [[OBJMGR] BLOB\_CACHE](ch_libconfig.html#ch_libconfig.Objects_Object_Manager_Obje) configuration parameter. This configuration parameter is created by the [CParam](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCParam.html) declaration "**`NCBI_PARAM_DECL(unsigned, OBJMGR, BLOB_CACHE)`**" in `src/objmgr/data_source.cpp` and can be set via the environment, the registry, or manipulated via the [CParam API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCParam.html). ***Note:*** External annotation TSEs and TSEs with Delta segments are linked to one of the master TSEs.

Short-term caching is done automatically for [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGBDataLoader&d=), but not for other data loaders. If you want short-term caching for some other data loader, you'll have to add it, possibly using [CGBDataLoader](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CGBDataLoader&d=) as an example.

Long-term caching is not done by either the Object Manager or the GenBank data loader, so to get it you will have to implement your own mechanism. Simply keeping a handle on the objects you wish to cache long-term will prevent them from being put into the short-term cache. When you no longer need the objects to be cached, just delete the handles. Note that some system of prioritization must be used to limit the number of handles kept, since keeping handles on all object would be essentially the same as increasing the short-term cache size, which presumably failed if you're trying long-term caching. You may want to see if the [CSyncQueue\_\_priority\_\_queue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCSyncQueue__priority__queue.html) class will meet your needs.


<a name="ch_objmgr_dtld.PSG_Data_Loader"></a>

Pubseq Gateway data loader
--------------------------

Pubseq Gateway loader is not a standalone data loader but rather a mode of Genbank loader operation. PSG loader can be enabled by setting GENBANK_LOADER_PSG=t in the environment or in the INI file:

    [Genbank]
    Loader_PSG=t

In most cases PSG loader offers much better performance than the default Genbank loader due to parallel processing of requests and replies. PSG loader handles requests for a single bioseq up to 10 times faster than ID2 reader and up to 5 times faster than PUBSEQOS one. Bulk requests for multiple bioseqs or sequence data (e.g. segments of a large delta sequence) are performed about 10 times faster. Sometimes the performance gain can be smaller. E.g. retrieval of large delta sequence without loading sequence data for all segments is only about 1.5-2 times faster with PSG than with ID2/PUBSEQOS.

Unlike the default Genbank loader, PSG loader does not retrieve orphan annotaions (CDD, SNP, STS). It also does not provide WGS sequences. These annotations and sequences can be requested through dedicated data loaders: CDD, SNP etc. These loaders should be [registered](ch_objmgr#ch_objmgr.om_faq.html_add_data_loader) in the Object Manager in addition to Genbank data loader. Some of these standalone loaders may work slower than ID2/PUBSEQOS, so, the overall performance of data retrieval will depend on specific task.
