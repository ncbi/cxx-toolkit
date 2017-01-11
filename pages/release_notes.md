---
layout: default
title: C++ Toolkit test
nav: pages/release_notes
---


Release Notes (Version 12, May 2013)
====================================

Created: June 18, 2013; Last Update: May 9, 2014.

-   [Download](#release_notes.Download)

-   [Third Party Packages](#release_notes.Third_Party_Packages)

-   [Build](#release_notes.Build)

-   [New Developments](#release_notes.New_Developments)

    -   [HIGHLIGHTS](#release_notes.release_notes_HIGHLIGHTS)

    -   [CORELIB](#release_notes.CORELIB)

    -   [DATA SERIALIZATION](#release_notes.SERIAL)

    -   [DATATOOL](#release_notes.DATATOOL)

    -   [CGI](#release_notes.CGI)

    -   [UTILITIES](#release_notes.UTILITES)

    -   [DBAPI](#release_notes.DBAPI)

    -   [BIO-OBJECTS](#release_notes.BIOOBJECTS)

    -   [BIO-TOOLS](#release_notes.BIOTOOLS)

    -   [BIO-OBJECT MANAGER](#release_notes.BIOOBJECT_MANAGER)

    -   [OBJECT LIBRARIES](#release_notes.OBJECT_LIBRARIES)

    -   [GENBANK DATA LOADER](#release_notes.GENBANK_DATA_LOADER)

    -   [BAM DATA LOADER](#release_notes.BAM_DATA_LOADER)

    -   [SRA DATA LOADER](#release_notes.SRA_DATA_LOADER)

    -   [cSRA DATA LOADER](#release_notes.cSRA_DATA_LOADER)

    -   [WGS DATA LOADER](#release_notes.WGS_DATA_LOADER)

    -   [VDB DATA LOADER](#release_notes.VDB_DATA_LOADER)

    -   [BLAST](#release_notes.BLAST)

    -   [APPLICATIONS](#release_notes.APPLICATIONS)

    -   [BUILD FRAMEWORK (Unix)](#release_notes.BUILD_FRAMEWORK_UNIX)

-   [Documentation](#release_notes.Documentation)

    -   [Location](#release_notes.Location)

    -   [Content](#release_notes.Content)

-   [Supported Platforms (OS's and Compilers)](#release_notes.Platforms_OSs__compi)

    -   [Unix](#release_notes.HYPERLINK__bookpartch_co_1)

    -   [MS Windows](#release_notes.MS_Windows)

    -   [Mac OS X](#release_notes.Mac_OS_X)

    -   [Added Platforms](#release_notes.Added_Platforms)

    -   [Discontinued Platforms](#release_notes.Discontinued)

<span class="title">Download</span>
-----------------------------------

Download the source code archives at: <ftp://ftp.ncbi.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/>

-   [ncbi\_cxx--12\_0\_0.tar.gz](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ncbi_cxx--12_0_0.tar.gz) — for Unix'es (see the list of Unix flavors below) and MacOSX

-   [ncbi\_cxx--12\_0\_0.exe](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ncbi_cxx--12_0_0.exe) — for MS-Windows (32- and 64-bit) / MSVC++ 10.0 — self-extracting

-   [ncbi\_cxx--12\_0\_0.zip](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ncbi_cxx--12_0_0.zip) — for MS-Windows (32- and 64-bit) / MSVC++ 10.0

The sources correspond to the NCBI production tree [sources](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_getcode_svn#ch_getcode_svn.chkout_production_tree), which are originally based on the development tree source snapshot from March 11, 2013 but also include many hundreds of important and safe code updates made since then and through May 17, 2013 (and then some).

<span class="title">Third Party Packages</span>
-----------------------------------------------

Some parts of the C++ Toolkit just cannot be built without 3<sup>rd</sup> party libraries, and other parts of the Toolkit will work more efficiently or provide more functionality if some 3rd-party packages (such as BerkeleyDB which is used for local data cache and for local data storage) are available.

For more information, see the [FTP README](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ThirdParty/README).

Table 1. Currently Supported/Tested Versions of Third Party Packages

|Package   |Versions expected to work (obtained by build-environment inspection in some cases)  |Versions known to work (used in-house on any platform)  |
|-------|----------------------------------|--------------|
|[BerkeleyDB](http://www.oracle.com/us/products/database/berkeley-db/index.html)  |4.3.0 or newer   |4.5.20, 4.6.21.1, 4.7.25, 4.6.21.NC  |
|[Boost Test](http://www.boost.org)                   |1.35.0 or newer |1.40.0.1, 1.42.0, 1.45.0   |
|[FastCGI](http://www.fastcgi.com)                    |All versions    |2.1, 2.4.0                 |
|[libbzip2](http://www.bzip.org)                      |All versions    |1.0.2, 1.0.5               | 
|[libjpeg](http://freshmeat.net/projects/libjpeg)     |All versions    |6b, 8.0                    |
|[libpng](http://www.libpng.org/pub/png/libpng.html)  |All versions    |1.2.26, 1.2.7, 1.5.13      |
|[libtiff](http://www.libtiff.org)                    |All versions    |3.6.1, 3.9.2, 4.0.0        |
|[libungif](http://sourceforge.net/projects/giflib/files/libungif-4.x/libungif-4.1.4/) |All versions |4.1.3 (libungif), 4.1.6 (giflib) |
|[libxml2](http://xmlsoft.org/)                       |All versions    |2 2.7.3, 2.7.6, 2.7.8,     |
|[libxslt](http://xmlsoft.org/)                       |1.1.14          |1.1.24, 1.1.26             |
|[<span class="small-caps">LZO</span>](http://www.oberhumer.com/opensource/lzo) |2.x |2.05         |
|[PCRE](http://www.pcre.org)                          |All versions    |7.8, 7.9, 8.32,            |
|[SQLite3](http://www.sqlite.org)                     |3.6.6 or newer  |3.6.12, 3.6.14.2, 3.6.22, 3.7.13 |
|[Sybase](http://www.sybase.com)                      |All versions    |12.5                       |
|[zlib](http://www.zlib.org)                          |All versions    |1.2.3, 1.2.3.3             |

For Mac OS X and Unix OS’s, the user is expected to download and build the 3<sup>rd</sup> party packages themselves. The release’s package list includes links to download sites. However, the user still needs a list of the 3<sup>rd</sup> party packages and which versions of them are compatible with the release.

To facilitate the building of these 3rd-party libraries on Windows, there is an [archive](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ThirdParty/README) that bundles together source code of the 3rd-party packages, plus MSVC "solutions" to build all (or any combination) of them.

Table 2. Versions of Third Party Packages Included in the FTP Archive

|Package            |Depends On               |Included Version <sup>a</sup>  |
|-------------------|-------------------------|-------------------------------|
|BerkeleyDB         |                         |4.6.21.NC                      |
|Boost Test         |                         |1.42.0                         |
|libbzip2           |                         |1.0.2                          |
|libjpeg            |                         |6b                             |
|libpng             |zlib 1.2.3               |1.2.7                          |
|libtiff            |libjpeg 6b, zlib 1.2.3   |3.6.1                          |
|libungif           |                         |4.1.3                          |
|LZO                |                         |2.05                           |
|PCRE               |                         |7.9                            |
|SQLite3            |                         |3.6.14.2                       |
|zlib               |                         |1.2.3                          |

<sup>a</sup> Applies to MSVC 9, MSVC 10

<span class="title">Build</span>
--------------------------------

For guidelines to configure, build and install the Toolkit see [here](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config).

<span class="title">New Developments</span>
-------------------------------------------

### <span class="title">HIGHLIGHTS</span>

Major advances, additions to the BAM, SRA, cSRA, WGS, VDB data loaders of the Bio-Sequence Object Manager

FreeTDS driver -- Support Kerberos authentication.

Redesigned Unicode support (stage 1) - added new <span class="nctnt ncbi-class">CUtf8</span> class which will handle UTF8 conversions and replace <span class="nctnt ncbi-class"> CStringUTF8</span>, prohibited implicit single byte character string conversions.
 Significant additions and improvements in the XML and JSON serialization APIs.

Cleaned up the code (again) from non-MT-safe static objects.

### <span class="title">CORELIB</span>

#### <span class="title">New functionality:</span>

-   Added possibility of having several argument description (<span class="nctnt ncbi-class">CArgDescription</span>) objects in a program; proper description is chosen based on the value of the very first command line argument - "command", the rest of the arguments is then parsed according to the chosen description. Such command descriptions can be combined into command groups.

-   Added platform-independent error reporting mechanism, similar to errno or <span class="nctnt ncbi-class"> SetLastError</span>, - <span class="nctnt ncbi-class">CNcbiError</span>. When a Toolkit core API function fails, it reports aditional information there.

-   Redesigned Unicode support - added new CUtf8 class which will handle UTF8 conversions and replace CStringUTF8, prohibited implicit single byte character string conversions.

-   Added <span class="nctnt ncbi-class">CException</span> manipulators for severity and console output.

-   <span class="nctnt ncbi-class">NStr::</span> -- improved errno handling, dropped support for <span class="nctnt ncbi-monospace">fIgnoreErrno</span> flag.

-   <span class="nctnt ncbi-class">NStr:: </span>-- addednew methods <span class="nctnt ncbi-func"> CommonPrefixSize()</span>, <span class="nctnt ncbi-func">CommonSuffixSize()</span>, <span class="nctnt ncbi-func">CommonOverlapSize()</span>.

-   <span class="nctnt ncbi-class">NStr::</span><span class="nctnt ncbi-func">StringToNumeric()</span> -- renamed to <span class="nctnt ncbi-func">StringToNonNegativeInt()</span>.

-   <span class="nctnt ncbi-class">Nstr::</span><span class="nctnt ncbi-func">ParseEscapes()</span> -- added options to parse out-of-range escape sequences.

-   <span class="nctnt ncbi-class">NStr::</span><span class="nctnt ncbi-func">CEncode()</span> -- rewrite to produce use double-quoted strings by default, and added counterpart method <span class="nctnt ncbi-func">CParse()</span> to decode a "C" strings.

-   <span class="nctnt ncbi-class">CTime</span> -- added <span class="nctnt ncbi-func">GetCurrentTimeT()</span> to get current GMT time with nanoseconds.

-   <span class="nctnt ncbi-class">CSignal</span> -- added method <span class="nctnt ncbi-func"> ClearSignals()</span>.

-   <span class="nctnt ncbi-class">CDirEntry</span> -- add permission/mode \<-\> string conversion methods.

-   <span class="nctnt ncbi-class">CDirEntry</span> -- added methods: <span class="nctnt ncbi-func"> GetUmask()</span>, <span class="nctnt ncbi-func">SetUmask</span>, <span class="nctnt ncbi-func"> ModeFromModeT()</span>.

-   <span class="nctnt ncbi-func">SetCpuTimeLimit()</span> -- added new declaration and deprecated old one, re-enabled user print handler for SIGXCPU.

-   <span class="nctnt ncbi-func">SetMemoryLimit[Soft|Hard]()</span> -- new methods to allow separately specify soft and hard memory limits for application.

-   Added string literals as well as directory pathes to <span class="nctnt ncbi-class"> CExprParser</span>

-   <span class="nctnt ncbi-class">CNCBIRegistry</span> (and other registries) is able to work with configuration data not belonging to any section, when created with <span class="nctnt ncbi-monospace">fSectionlessEntries</span>

-   <span class="nctnt ncbi-class">CExprParser</span> is able to accept logical literals starting with a number in <span class="nctnt ncbi-monospace">fLogicalOnly</span> mode

#### <span class="title">Improvements:</span>

-   In-heap <span class="nctnt ncbi-class">CObject</span> detection via TLS variable.

-   Inline internal method <span class="nctnt ncbi-class">CObject::</span><span class="nctnt ncbi-func">InitCounter()</span> for speed.

-   <span class="nctnt ncbi-class">CTempStringEx</span> -- Optionally own data.

-   <span class="nctnt ncbi-class">NStr</span> -- <span class="nctnt ncbi-func">Split</span>, <span class="nctnt ncbi-func">Tokenize</span>, etc. now accept flags, controlling not only delimiter merging but also whether to treat multi-character delimiters as patterns (generalizing <span class="nctnt ncbi-func">TokenizePattern</span>) and to treat any subset of \\'" as special.

### <span class="title">DATA SERIALIZATION</span>

#### <span class="title">New functionality:</span>

-   Added support for mandatory elements with default in XML serialization.

-   Added possibility of using <span class="nctnt ncbi-monospace">NCBI\_PARAM</span> mechanism for data verification and

-   skipping unknown members settings.

-   Added possibility of skipping unknown data in JSON input; added JSONP output mode.

#### <span class="title">Improvements:</span>

-   Optimization of deserialization methods (mostly binary ASN.1).

#### <span class="title">Bug fixes:</span>

-   Avoid double closing tag when skipping enums in XML.

-   Store serialization format flags for correct delayed parsing.

#### <span class="title">XMLWrapp:</span>

-   Safe dereferencing node iterators

-   xml::nodes\_view is not supported anymore

-   A few memory leaks are fixed

-   exslt auto registration if available

-   XSLT extension functions support added

-   XSLT extension elements support added

-   <span class="nctnt ncbi-func">run\_xpath\_expression(…)</span> to handle boolean, number and string types as return values

### <span class="title">DATATOOL</span>

-   Enhanced SOAP client code generation to support WSDL specification which contains several XML schemas - to handle elements with identical names in different namespaces.

-   Added possibility of converting data to and from JSON format.

### <span class="title">CGI</span>

-   <span class="nctnt ncbi-class">CCgiUserAgent</span> -- separate <span class="nctnt ncbi-class"> CCgiUserAgent</span> into <span class="nctnt ncbi-path">user\_agent.[h|c]pp</span>.

-   <span class="nctnt ncbi-class">CCgiUserAgent</span> -- added methods: <span class="nctnt ncbi-func"> GetDeviceType()</span>, <span class="nctnt ncbi-func">IsPhoneDevice()</span>, <span class="nctnt ncbi-func">IsTabletDevice()</span>.

-   Added flags to allow use external pattern lists on the parsing step to identify bots, phones, tablets and mobile devices. Return iPad back to the list of mobile devices. Interpret all Android based devices as mobile devices.

-   <span class="nctnt ncbi-class">CCgiUserAgent</span> -- update list of browsers and mobile devices.

### <span class="title">UTILITES</span>

-   Compression API -- allow concatenated files for eGZipFile mode by default.

-   Compression API -- added support for "empty input data" compression via <span class="nctnt ncbi-monospace"> fAllowEmptyData</span> flag, It will allow to compress zero-length input data and provide proper format header/footer in the output, if applicable. By default the Compression API not provide any output for zero-length input data.

-   <span class="nctnt ncbi-class">CRegexp</span> -- changed <span class="nctnt ncbi-func"> GetSub()</span>/<span class="nctnt ncbi-func">GetMatch()</span> methods to return <span class="nctnt ncbi-class">CTempString</span> instead of string.

-   <span class="nctnt ncbi-path">include/util/diff/dipp.hpp</span> -- new DIFF API (<span class="nctnt ncbi-class">CDiff</span>, <span class="nctnt ncbi-class">CDiffT</span>ext).

-   Added possibility to convert differently typed static array.

-   Added limited\_size\_map\<\> for caching and garbage collection.

-   Mask matching is rewritten with <span class="nctnt ncbi-class">CTempString</span> for efficiency.

-   ILineReader -- Clarify API, introducing ReadLine and GetCurrentLine as synonyms of operator++ and operator\* respectively.

-   <span class="nctnt ncbi-class">CTextJoiner</span> -- New template for collecting and joining strings with a minimum of heap churn.

### <span class="title">DBAPI</span>

-   Support Sybase ASE 15.5 servers.

-   Python bindings -- Optionally release Python's global lock around blocking DBAPI operations; rework exception translation to follow PEP 249 (\*).

-   Added support for Kerberos authentication (copied from FreeTDS 0.91).

### <span class="title">BIO-OBJECTS</span>

#### <span class="title">New functionality:</span>

-   <span class="nctnt ncbi-class">CDeflineGenerator</span> -- Generally streamline; make expensive operations (currently just consulting related sequences' annotations) optional.

-   <span class="nctnt ncbi-class">CFastaOStream</span> -- Add a gap-mode parameter, making it possible to represent gaps by runs of inline dashes or special \>?N lines; optionally (but by default) check for duplicate sequence IDs; support processing an entire raw Seq-entry without even a temporary scope.

-   <span class="nctnt ncbi-class">CFastaReader</span> -- Add two flags that can increase performance: <span class="nctnt ncbi-monospace">fLeaveAsText</span> skips reencoding in a (more compact) binary format, and <span class="nctnt ncbi-monospace">fQuickIDCheck</span> directs local ID validation to consider just the first character.

-   <span class="nctnt ncbi-class">CSeq\_id</span> -- Accept parse flags when parsing a single ID from a string; recognize WGS scaffolds, additional prefixes (F???, G???, HY, HZ, J??, JV-JZ, KA-KF, and WP\_), 10-digit refseq\_wgs\_nuc accessions (notably for spruce), and more TPE protein accessions (still interspersed with EMBL's own accessions).

-   Added <span class="nctnt ncbi-class">CGeneFinder</span> class for finding the genes of a feature using the flatfile generator's logic

-   Seq\_entry\_CI can now optionally include the top seq-entry

-   <span class="nctnt ncbi-func">objects::CGC\_Replicon</span> now has accessors to return molecule type (‘Chromosome’, ‘Plasmid’, etc.) and location (‘Nuclear’, ‘Mitochondrion’, ‘Chloroplast’, etc.). You can also retrieve a label (<span class="nctnt ncbi-func">GetMoleculeLabel()</span>) which summarizes molecule type and location in one string.

### <span class="title">BIO-TOOLS</span>

#### <span class="title">New Development:</span>

-   Validator:

    -   Added functions for validating and autocorrecting lat-lon, collection-date, and country BioSource SubSource modifiers. Synchronized validation with C Toolkit.

-   Flat-file generator:

    -   can now be set to show only certain blocks

    -   optionally set callback for each item or bisoeq that's written which allows changing the text and specifying to skip that item or even halt flatfile generation.

    -   support the /pseudogene qualifier

    -   allow complex locations in transl\_excepts. (a.k.a. code-breaks )

    -   support "pcr" linkage-evidence

    -   support for /altitude qualifier

    -   Support "Assembly" in DBLINK

    -   API for conversion between source-qualifier and feature-qualifier enums and strings

    -   support assembly gap feature quals (e.g. /gap\_type, /linkage\_evidence, etc.)

-   ASN.1 Cleanup:

    -   Set pseudo to true if pseudogene is set

    -   More places where it sorts and removes redundancies (example: sort and unique organism synonyms)

    -   Remove duplicate pcr-primers

    -   clean up altitude

    -   fixing some genbank quals into real quals (example: gene-synonym)

-   <span class="nctnt ncbi-class">CFastaOstream</span>:

    -   Can optionally show [key=val] style mods in deflines

-   <span class="nctnt ncbi-class">CFeature\_table\_reader</span>:

    -   now supports more quals (example: centromere)

-   <span class="nctnt ncbi-class">CFastaReader</span>:

    -   optionally accumulate warnings in a vector instead of printing them to allow more flexible handling and more info to caller.

-   AGP:

    -   created <span class="nctnt ncbi-class">CAgpToSeqEntry</span> for converting an AGP file into a Seq-entry.

#### <span class="title">COBALT</span>

##### <span class="title">Bug fixes:</span>

-   Incorrect alignments with sequence clustering

### <span class="title">BIO-OBJECT MANAGER</span>

#### <span class="title">New functionality:</span>

-   Added fast <span class="nctnt ncbi-class">CScope</span> methods for getting some sequence information without loading the whole entry - length, type, taxonomy id, GI, accession, label.

-   Added processing of Seq-table column "disabled".

-   Added FeatId manipulation methods.

-   Added <span class="nctnt ncbi-func">feature::ReassignFeatureIds()</span>.

-   Added <span class="nctnt ncbi-class">CSeq\_table\_CI</span> with location mapping.

-   Added <span class="nctnt ncbi-class">CSeqVector\_CI::</span><span class="nctnt ncbi-func">GetGapSeq\_literal()</span>.

-   Added recursive mode and seq-entry type filtering to <span class="nctnt ncbi-class"> CSeq\_entry\_CI</span>.

#### <span class="title">Improvements:</span>

-   Allow non-scope bioseq lookup in <span class="nctnt ncbi-class">CSeq\_Map</span> (for segset entries).

-   Allow post-load modification of sequences.

-   Optimization of <span class="nctnt ncbi-func">ContainsBioseq()</span> for split entries.

-   Added <span class="nctnt ncbi-class">CTSE\_Info::</span><span class="nctnt ncbi-func">GetDescription()</span> for better diagnostics.

-   More detailed error message in annots.

-   Allow iteration over non-set entries in <span class="nctnt ncbi-class">CSeq\_entry\_CI</span> - treat them as empty sets.

#### <span class="title">Bug fixes:</span>

-   Fixed generation of Seq-table features.

-   Fixed loading of various Seq-id info from multiple data loaders.

-   Made bulk and single requests to return the same results.

-   Fixed unexpected <span class="nctnt ncbi-class">CBlobStateException</span> for non-existent sequences.

-   Avoid deadlock when updating split annot index.

-   Fixed recursive iteration in <span class="nctnt ncbi-class">CSeq\_entry\_CI</span> if sub-entry

-   doesn't have matching entries.

-   Fixed mixup of feature ids and xrefs.

-   Fixed fetching by feat id/xref from split entries.

-   Fixed in-TSE sequence lookup via matching Seq-id.

-   Fixed matching Seq-id lookup with multiple candidates.

-   <span class="nctnt ncbi-class">CSeqMap\_CI::</span><span class="nctnt ncbi-func">GetRefData()</span> should work for gaps too.

-   Exclude removed features from un-indexed search.

### <span class="title">OBJECT LIBRARIES</span>

#### <span class="title">New functionality:</span>

-   Implemeted multi-id Seq-loc comparison.

### <span class="title">GENBANK DATA LOADER</span>

#### <span class="title">Bug fixes:</span>

-   Allow withdrawn/suppressed entries with non-default credentials.

-   Preserve blob state if Seq-entry skeleton is attached to split info.

-   Remember blob state from get-blob-ids reply too.

-   Detect non-existent Seq-id when loading blob-ids.

-   Release connection as soon as possible to avoid deadlock.

-   Lock split TSE only after receiving split info.

### <span class="title">BAM DATA LOADER</span>

#### <span class="title">New functionality:</span>

-   Implemented pileup graphs for BAM loader.

#### <span class="title">Improvements:</span>

-   Generate simple ID2 split info to postpone record loading.

### <span class="title">SRA DATA LOADER</span>

#### <span class="title">New functionality:</span>

-   Added option to clip SRA sequences.

### <span class="title">cSRA DATA LOADER</span>

#### <span class="title">New functionality:</span>

-   Implemented <span class="nctnt ncbi-class">CCSraShortReadIterator</span>.

-   Added short read info into Seq-align.ext.

-   Added pileup graph param setter and getter.

-   Added support for SECONDARY\_ALIGNMENT.

-   Use gnl|SRA|\<acc\>.\<spot\>.\<read\> for short read ids.

-   Added lookup for short reads by SPOT\_ID and READ\_ID.

-   Allow optional VDB columns.

-   Added clippig by quality.

-   Added option to exclude cSRA file path from short read ids.

#### <span class="title">Improvements:</span>

-   Allow cSRA reader to open old SRA tables.

-   Reduced number of TSE chunks.

-   Removed obsolete config parameters: INT\_LOCAL\_IDS, SEPARATE\_LOCAL\_IDS.

-   Removed empty VDB table, cursor, and column constructors.

-   Generate simple split info to postpone cSRA record loading.

-   Exclude technical reads.

-   Check VDB column data type to detect incompatible VDB files.

-   Place short reads in a separate blob.

-   Added lookup from short read to refseq.

-   Added mapping align on short read.

-   Added secondary alignment indicator.

-   Added centralized MT-safe VDB cursor cache.

-   Allow ERR accessions in cSRA loader.

-   Switched to new SRA SDK accession resolution scheme.

-   Use SRA SDK configuration mechanism.

-   Added SRA file cache garbage collector.

-   Accept multiple ids in reference sequences.

-   Reduce number of reads per blob to 1 for speed.

-   Allow cSRA data to have no REFERENCE table.

-   Increased limit on allowed number of short reads per spot.

-   Increased flexibility on existing VDB columns.

-   Try to resolve remote VDB files too.

-   Use GC for loaded entries.

-   Indicate that cSRA loader can load data by blob id.

-   Set max value of quality graph properly.

#### <span class="title">Bug fixes:</span>

-   Fixed MISMATCH generation for I segments.

-   Added missing <span class="nctnt ncbi-func">RegisterInObjectManager()</span>.

### <span class="title">WGS DATA LOADER</span>

#### <span class="title">New functionality:</span>

-   Implemented VDB WGS reader and data loader.

### <span class="title">VDB DATA LOADER</span>

#### <span class="title">New functionality:</span>

-   Implemented VDB graph reader and data loader.

### <span class="title">BLAST</span>

#### <span class="title">New functionality:</span>

-   Added new API to return blast preliminary stage result as a list of <span class="nctnt ncbi-class"> CStd\_seg</span>

-   Added new tabular features for blast which includes taxonomy information, strand sign and query coverage

-   Added new features for blastdbcmd batch sequence retrieval which allow user to specify strand sign and sequence range

-   Added new functionality in makeprofiledb to produce database that supports composition based statistics

-   For more details, see BLAST+ 2.2.27 and 2.2.28 release notes (<https://www.ncbi.nlm.nih.gov/books/NBK131777/>)

#### <span class="title">Bug fix</span>

-   Fix ASN 1 input for makeblastdb

### <span class="title">APPLICATIONS</span>

-   <span class="nctnt ncbi-app">convert\_seq</span> -- Allow for more efficient operation in some cases, mostly by bypassing object manager overhead; implement a new "IDs" input format; have non-zero inflags for ASN.1 or XML request sequence data repacking.

-   <span class="nctnt ncbi-app">multireader</span> -- Added AGP.

-   <span class="nctnt ncbi-app">blastn's</span> -- Changed default value - use\_index to false

-   <span class="nctnt ncbi-app">vecscreen</span> -- Added command line application

-   <span class="nctnt ncbi-app">rmblastn</span> -- Added command line application

-   <span class="nctnt ncbi-app">asn2asn</span> -- added ability to read and write Seq-submits

### <span class="title">BUILD FRAMEWORK (Unix)</span>

-   configure and frontends (<span class="nctnt ncbi-path">compilers/unix/\*.sh</span>) -- Don't override explicitly specified optimization flags with default FAST settings (but do still apply custom FAST settings if also specified).

-   <span class="nctnt ncbi-path">compilers/unix/Clang.sh, .../LLVM-GCC.sh</span> -- New frontends for configure to simplify compiler selection.

-   <span class="nctnt ncbi-path">new\_project.sh</span> -- Improve support for projects involving libraries.

#### <span class="title">CHANGES TO COMPILER SUPPORT</span>

Linux ICC support extends up to version 13.

Mac OS X support extends to version 10.8.x, with Clang, FSF GCC, or LLVM GCC (also via Xcode).

Solaris support extends to version 11, with GCC or WorkShop (as with older OS versions).

<span class="title">Documentation</span>
----------------------------------------

### <span class="title">Location</span>

The documentation is available online as a searchable book "The NCBI C++ Toolkit": <https://www.ncbi.nlm.nih.gov/toolkit/doc/book/>.

The C++ Toolkit book also provides PDF version of the chapters. The PDF version can be accessed by a link that appears on each page.

### <span class="title">Content</span>

Documentation has been grouped into chapters and sections that provide a more logical coherence and flow. New sections and paragraphs continue to be added to update and clarify the older documentation or provide new documentation. The chapter titled "Introduction to the C++ Toolkit" gives an overview of the C++ Toolkit. This chapter contains links to other chapters containing more details on a specific topic and is a good starting point for the newcomer.

A C/C++ Symbol Search query appears on each page of the online Toolkit documentation. You can use this to perform a symbol search on the up-to-date public or in-house versions using source browsers [LXR](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTime&d=), [Doxygen](https://www.ncbi.nlm.nih.gov/toolkit/?term=ctime) and [Library](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lib_search/libsearch.cgi?symbol=CTime) - or do an [overall](https://www.ncbi.nlm.nih.gov/toolkitall?term=CTime) search.

Public assess to our SVN trunk:

-   For browsing: <https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++>

-   For retrieval: <https://anonsvn.ncbi.nlm.nih.gov/repos/v1/trunk/c++> (<span class="nctnt highlight">NOTE:</span> Some WebDAV clients may require dav:// instead of http://)

<span class="title">Supported Platforms (OS's and Compilers)</span>
-------------------------------------------------------------------

-   [Unix](release_notes.html#release_notes.HYPERLINK__bookpartch_co_1)

-   [MS Windows](release_notes.html#release_notes.MS_Windows)

-   [Mac OS X](release_notes.html#release_notes.Mac_OS_X)

-   [Added](release_notes.html#release_notes.Added_Platforms)

-   [Discontinued](release_notes.html#release_notes.Discontinued)

This release was successfully tested on at least the following platforms (but may also work on other platforms). Since the previous release, some platforms were dropped from this list and some were added. Also, it can happen that some projects would not work (or even compile) in the absence of 3rd-party packages, or with older or newer versions of such packages. In these cases, just skipping such projects (e.g. using flag "<span class="nctnt ncbi-monospace">-k</span>" for <span class="nctnt ncbi-app"> make</span> on Unix), can get you through.

In cases where multiple versions of a compiler are supported, the mainstream version is shown in **bold**.

### <span class="title">[Unix](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.UNIX)</span>

Table 3. Unix OS's and Supported Compilers

|Operating System                   |Architecture    |Compilers                                |
|-----------------------------------|----------------|-----------------------------------------|
|CentOS 5.x (LIBC 2.5)              |x86-64          |**GCC 4.4.2,** 4.0.1<sup>a</sup>, 4.1.2<sup>a</sup>, 4.3.3<sup>a</sup>, 4.6.0<sup>a</sup>, 4.6.3<sup>a</sup><sup>,</sup>GCC 4.7.2 <sup>a</sup> |
| CentOS 5.x (LIBC 2.5)             |x86-32          |**GCC** 4.4.5 <sup>a</sup>**, 4.6.0**    |
|CentOS 6.x (LIBC 2.12)             |x86-64          |**GCC 4.4.2**, 4.6.3 <sup>a</sup>, 4.7.2 <sup>a</sup>, 4.8.0 <sup>a</sup> |
|Ubuntu 9.04 ("jaunty") (LIBC 2.9)  |x86-32 x86-64   |**GCC 4.3.3**                            |
|Solaris 10, 11<sup>a</sup>         |SPARC           |GCC 4.1.1<sup>b</sup>, 4.5.3<sup>b</sup> **Sun Studio 12 (C++ 5.9)**, Sun Studio 12 Update 1 (C++ 5.10)<sup>a</sup> Oracle Studio 12.2 (C++ 5.11)<sup>a</sup> |

Solaris 10, 11<sup>a</sup>
x86-32
GCC 4.2.3
 **Sun Studio 12 (C++ 5.9)**, Sun Studio 12 Update 1 (C++ 5.10)<sup>a</sup>
 Oracle Studio 12.2 (C++ 5.11)<sup>a</sup>
Solaris 10, 11<sup>a</sup>
x86-64
**Sun Studio 12 (C++ 5.9)**, Sun Studio 12 Update 1 (C++ 5.10)<sup>a</sup>
 Oracle Studio 12.2 (C++ 5.11)<sup>a</sup>
FreeBSD-8.3
x86-32
GCC 4.2.2

<sup>a</sup> some support

<sup>b</sup> 32-bit only

### <span class="title">[MS Windows](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.MS_Windows)</span>

Table 4. MS Windows and Supported Compilers

Operating System
Architecture
Compilers
MS Windows
x86-32
[MS Visual C++](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.MS_Visual_C_2008) 2010 (C++ 10.0)
 NOTE: We also ship an easily buildable archive of [3rd-party](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ThirdParty/README) packages for this platform.
MS Windows
x86-64
[MS Visual C++](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.MS_Visual_C_2008) 2010 (C++ 10.0)
 NOTE: We also ship an easily buildable archive of [3rd-party](ftp://ftp.ncbi.nlm.nih.gov/toolbox/ncbi_tools++/ARCHIVE/12_0_0/ThirdParty/README) packages for this platform
Cygwin 1.7.9
x86-32
[GCC 4.5.3](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.Cygwin_GCC)- nominal support only.

### <span class="title">[Mac OS X](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.Mac_OS_X)</span>

Table 5. Mac OS and Supported Compilers

Operating System
Architecture
Compilers
Mac OS X 10.6
 Mac OS X 10.8
Native (PowerPC or x86-32 or x86-64 )
[Xcode](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.Xcode_30__31) 3.0 - 3.2.6
Darwin 10.x
Native (PowerPC or x86-32 or x86-64),
 Universal (PowerPC and x86-32)
[GCC 4.0.1](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.GCC)
 [GCC 4.2.1](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.GCC) (only available under Darwin 10.x)
 LLVM Clang 3.0

<span class="nctnt highlight">NOTE:</span> the correspondence between Darwin kernel versions and Mac OS versions:

Darwin 10.x = Mac OS 10.6.x

Darwin 12.x = Mac OS 10.8.x

### <span class="title">Added Platforms</span>

Table 6. Added Platforms

Operating System
Architecture
Compilers
CentOS 5.x (LIBC 2.5)
x86-32
GCC 4.4.5 <sup>a</sup>**,** 4.6.0
CentOS 5.x
x86-64
GCC 4.7.2 <sup>a</sup>
CentOS 6.x (LIBC 2.12)
x86-64
GCC 4.4.2 , 4.6.3 <sup>a</sup>, 4.7.2 <sup>a</sup>, 4.8.0 <sup>a</sup>
Mac OS X 10.5,
 MacOS x 10.6,
Native (PowerPC or x86-32 or x86-64)
[Xcode](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.Xcode_30__31) 3.2.3 - 3.2.6
 LLVM Clang 3.0

<sup>a</sup> some support

### <span class="title">Discontinued Platforms</span>

Table 7. Discontinued Platforms

Operating System
Architecture
Compilers
MS Windows
x86-32, 64
[MS Visual C++](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.MS_Visual_C_2008) 2008 (C++ 9.0)
Mac OS X 10.4.x(Darwin
 8.x), Mac OS X 10.5.x(Darwin
 9.x)
Native (PowerPC or x86-32 or x86-64),
 Universal (PowerPC and x86-32)
[GCC 4.0.1](https://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config#ch_config.GCC), Clang 3.0
FreeBSD-6.1
x86-32
GCC 3.4.6
All
All
All GCC 4.0.1 and below

<span class="title">Last Updated</span>
---------------------------------------

This section last updated on May 9, 2014.


