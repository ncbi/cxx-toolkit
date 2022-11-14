---
layout: default
title: Data compression (BZip2, LZO, ZIP, GZIP, ZSTD) 
nav: pages/ch_compress
---


{{ page.title }}
================================================


## Introduction

**The Compression API** `xcompress`:  [include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/util/compress/api/)

To support data compression and decompression the C++ Toolkit have the [Compression API](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__Compression.html), a collection of classes that provide uniform way to compress and decompress data in memory, files and standard [streams](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__CompressionStreams.html) using different compression algorithms. Such support is based on using third party libraries:

-    bzip2 - [http://www.bzip.org/](http://www.bzip.org/)
-    lzo - [http://www.oberhumer.com/opensource/lzo/](http://www.oberhumer.com/opensource/lzo/)
-    zlib - [http://zlib.org/](http://zlib.org/)
-    zstd - [https://github.com/facebook/zstd](https://facebook.github.io/zstd/)

C++ Toolkit tries to use system version of these libraries installed on host. If they are missing though, then the embedded versions of `bzip2` and `zlib` will be automatically used instead. `lzo` is supported as a pure 3-rd party package.

## Chapter Outline

The following is an outline of the topics presented in this chapter:

- [Supported compression methods](#ch_compress.methods)
- [Basic methods](#ch_compress.basic)
- [Memory compression and decompression](#ch_compress.memory)
- [Files](#ch_compress.files)
- [Streams](#ch_compress.streams)
- [Stream manipulators](#ch_compress.manipulators)
- [Advanced compression parameters](#ch_compress.params)
- [Dictionaries](#ch_compress.dict)
    - [ZIP](#ch_compress.dict.zip)
    - [ZSTD](#ch_compress.dict.zstd)
- [Archivers](#ch_compress.archivers)
    - [Compression archive API](#ch_compress.archiver.arc)
    - [TAR archive API](#ch_compress.archiver.tar)
- [FAQ](#ch_compress.FAQ)


<a name="ch_compress.methods"></a>

Supported compression methods
-----------------------------

The Compression API supports the following compression methods:
-   [BZIP2](#ch_compress.methods.bzip2)
-   [LZO](#ch_compress.methods.lzo)
-   [ZIP](#ch_compress.methods.zip)
-   [GZIP](#ch_compress.methods.gzip)
-   [ZSTD](#ch_compress.methods.zstd)
-   [ZIP (file format)](#ch_compress.methods.zip.file)
-   [TAR (file format)](#ch_compress.methods.tar.file)

Each compression library have its own set of functions and wrapper classes in the C++ Toolkit, declared in separate headers. Most have a similar structure and methods, allowing for an easily switch of a compression method with minimal changes in the source code.

<a name="ch_compress.methods.bzip2"></a>
### BZIP2 [[bzip2.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/bzip2.hpp)]
 
`BZIP2` is known for good compression ratio and slow speed. It compresses data more effectively than `DEFLATE` method implemented in `zlib` library but is considerably slower. `BZIP2` performance is asymmetric, and decompression is relatively fast but still slower than `ZIP`.

<a name="ch_compress.methods.lzo"></a>
### LZO [[lzo.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/lzo.hpp)]

`lzo` is a data compression library which is suitable for data (de)compression in real-time. This means it favours speed over compression ratio. `LZO` is good to compress some sort of data only, that have a limited set of characters or many recurring sequences. It is not suitable for a random data, that limits its usage. It is better to test this compression on yours own data before making decision to use `LZO` compression method. Use [ZIP](#ch_compress.methods.zip) if you need more universal and robust solution, even though it is slower and requires more memory.

We don't support all possible compression algorithms, implemented in `lzo` library, only `LZO1X`, as the most universal (according to the author of `lzo` it is often "the best choice of all").
 
`LZO` is a memory block algorithm and is not suitable for stream or file operations from the box, it does not have a corresponding file format as well. So, we use our own wrapper for `LZO` blocks to implement a streams/files support. See [lzo.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/util/compress/api/lzo.cpp) for details.
 
<a name="ch_compress.methods.zip"></a>
### ZIP [[zlib.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/zlib.hpp)]

The `zlib` library uses `DEFLATE` compression algorithm. It is widely used and very universal, providing good compression/decompression ratio and speed for a wide range of data. `ZIP` compression method uses regular `zlib` format, which is a wrapper around a deflate stream (RFC 1950). It provides identification and error detection that are not provided by the raw `DEFLATE` algorithm.

<a name="ch_compress.methods.gzip"></a>
### GZIP [[zlib.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/zlib.hpp)]

This method add support for gzip (.gz) file format. This is a flavor of `ZIP` that uses special header and footer which allows to store a file name and other file system information (RFC 1952). It is fully compatible with .gz file format, and it allows to store/process concatenated gzip files as well. But, regardless of its relation to files this format can be used for memory and stream operations as well, if needed.

<a name="ch_compress.methods.zstd"></a>
### ZSTD [[zstd.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/zstd.hpp)]

`Zstandard`, or `zstd`, is a fast lossless compression algorithm from Facebook, targeting real-time compression scenarios at `zlib`-level and better compression ratios. It's backed by a very fast entropy stage, provided by Huff0 and FSE library. The reference library offers a very wide range of speed / compression trade-off, and is backed by an extremely fast decoder.

<a name="ch_compress.methods.zip.file"></a>
### ZIP (file format) [[archive.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/archive.hpp)]

The Compression API also supports `ZIP` file format. `ZIP` is an archive file format that supports lossless data compression. A .zip file may contain one or more files or directories that may have been compressed. 

See [Compression archive API](#ch_compress.archiver.arc) for more information.

<a name="ch_compress.methods.tar.file"></a>
### TAR (file format) [[tar.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/tar.hpp)]

`TAR` is an archive format for collecting many files into one archive file (often referred to as a "tarball") for distribution or backup purposes. The name is derived from *T*ape *AR*(ar)chive, as it was originally developed to write data to sequential I/O devices with no file system of their own. The archive data sets created by tar contain various file system parameters, such as name, time stamps, ownership, file access permissions, and etc.

See [Tar archive API](#ch_compress.archiver.tar) for more information.


<a name="ch_compress.basic"></a>

Basic methods
-------------

All basic methods for compression/decompression are implemented in the following classes:
-	[CBZip2Compression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCBZip2Compression.html)
-	[CLZOCompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCLZOCompression.html)
-	[CZipCompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipCompression.html)
-	[CZstdCompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZstdCompression.html)

Each class adds support for corresponding compression library (bzip2, lzo, zlib, zstd) and has methods to get a version of the used compression library, get or set a compression level, get status of the last operation, error code and description, and declare a specific set of supported compression/decompression flags. Basic compression allows to compress/decompress memory buffer of file with one call to the Compression API.

All archive file formats are supported independently, see [archivers](#ch_compress.archivers) section for more details. 


<a name="ch_compress.memory"></a>

Memory compression and decompression
-----------------------------------

The easiest method to compress/decompress data in memory is to use [CompressBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CompressBuffer) and [DecompressBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DecompressBuffer) methods. Each of the compression classes mentioned above has such methods and allows to use corresponding compression libraries to perform data compression/decompression. Note that the advantages in simplified usage have their cost -- an increased memory consumption. You need to know sizes of input and output data in advance, and to allocate memory buffers accordingly. If the output buffer is too small, the operation will fail. Some compression methods like `LZO`, `ZIP` or `ZSTD`have [EstimateCompressionBufferSize](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EstimateCompressionBufferSize) method that can help with this. But because it is unknown in advance what kind of data will be compressed, this method behaves a bit pessimistic, and as a result the estimated buffer size can be larger than a size of the original non-compressed data.

Below are some examples for in-memory compression and decompression. They use `ZIP` method but you can use any other base class to change it.

Compression:

	CZipCompression c(CCompression::eLevel_Medium);
	bool result = c.CompressBuffer(src_buf, src_len, dst_buf, buf_len, &out_len);
	if (!result) {
	    // error
	    // int err_code   = c.GetErrorCode();
	    // string err_msg = c.GetErrorDescription();
	}

Decompression:

	CZipCompression c;
	bool result = c.DecompressBuffer(src_buf, src_len, dst_buf, dst_len, &out_len);

In spite of all, these compression/decompression methods are very useful in controlled environment where sizes of data are well known, providing better compression ratio and speed. For all other cases we recommend to use [compression streams](#ch_compress.streams).


<a name="ch_compress.files"></a>

Files
-------------------------

Similar to memory-based [CompressBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CompressBuffer) and [DecompressBuffer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DecompressBuffer) methods, each [mentioned compression class](#ch_compress.basic) have corresponding file-based methods [CompressFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CompressFile) and [DecompressFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DecompressFile). Both require to specify input and output file names. These classes can be used for some utility operations -- when you don`t need additionally process data. Both methods take data from files, compress or decompress it, and create output file on disk as well. 

But sometimes this is not enough. If you need to read some data from a compression file into memory or to write some data from a memory into a file and compress/decompress it on-the-fly, then the following classes could be useful:
-	[CBZip2CompressionFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCBZip2CompressionFile.html)
-	[CLZOCompressionFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCLZOCompressionFile.html)
-	[CZipCompressionFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipCompressionFile.html)
-	[CZstdCompressionFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZstdCompressionFile.html)

Each class have [Open](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Open), [Read](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Read), [Write](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write) and [Close](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Close) methods. This allows to read/write compressed files; the data will be decompressed or compressed on-the-fly.

Reading data from compressed file (using [CZipCompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CZipCompression)):

	CZipCompressionFile cf;
	if (!cf.Open(file_path, CCompressionFile::eMode_Read)) {
	    // error
	    // int err_code   = cf.GetErrorCode();
	    // string err_msg = cf.GetErrorDescription();
	} 
	long n = cf.Read(buf, len);
	if (n < 0) {
	    // error
	}	
	if (n == 0) {
	    // EOF
	}
	// ... other Read() if necessary ...
	cf.Close();

Writing data to file, with compression:

	// Use non-default constructor, that replaces Open() and throws an exception on error
	CZipCompressionFile cf(file_path, CCompressionFile::eMode_Write, CCompression::eLevel_Best);
	long n = cf.Write(buf, len);
	if (n != len) {
	    // error
	}
	// ... other Write() if necessary ...
	cf.Close();
	// Now you have a new .gz compatible file 'file_path'
	
All ***C\*CompressionFile*** classes imply that the memory always has uncompressed data, and the file has compressed data. For wider range of sources and destinations, please see [compression streams](#ch_compress.streams).


<a name="ch_compress.streams"></a>

Streams
-------

Standard C++ streams (***istream***, ***ostream***, ***iostream***) and many derived classes provide a rich variety of functionality for formatted and unformatted I/O and can be used with wide range of data sources: memory, string, files etc. The Compression API provides a set of classes that are compatible with standard C++ streams and can be used for compression or decompression data on-the-fly. Using these classes, compression/decompression can be done transparently on reading or writing from/to stream. 

Easiest way to start with compression/decompression streams is by using classes from [include/util/compress/stream_util.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp). This header declares 4 wrapper stream classes:

-	 [CCompressIStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCompressIStream.html) - input compression stream (compress on reading);
-	 [CCompressOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCompressOStream.html) - output compression stream (compress on writing);
-	 [CDecompressIStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDecompressIStream.html) - input decompression stream (decompress on reading);
-	 [CDecompressOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDecompressOStream.html) - output decompression stream (decompress on writing).

Select a class that is more appropriate for yours needs, specify a compression method, pass some flags to the API if necessary, and all is done. Each class accepts a parameter that is a stream that has the source data or receives result data. For (I) compression streams it should be a stream derived from ***istream***, and ***ostream***-based for (O). Which parameter's stream is used as an input or output for data, compressed or decompressed, depends on the used class. You don't need to change your existing code much to add support for data compression. Mostly, you need to add a single line of code to create one of the mentioned streams on top of already existing stream.

For example, to read some data from a stream and to decompress it on-the-fly using `ZIP` method just change your code from:

	CSomeIstreamDerivedClass is(...);
	is.read(buf, len);
	
to this:

	CSomeIstreamDerivedClass is_orig(...);  // add ios_base::binary to stream's open mode
	CCompressIStream is(is_orig, CCompressStream::eZip, flags);
	is.read(buf, len);

You can use standard C++ stream methods to access compression streams and use read/write, or formatted input/output, same way as an original stream. The compression streams are fully compatible; they also add additional methods to check for compression status and a way to get an error code or message for the last compression/decompression operation.
		
**Notes**

1. Because compressed data is a binary data so the original input/output stream, passed as parameter to compression stream, should be always opened in binary mode. Please do not forget to add `ios_base::binary` flag when opening your "raw" stream!

1. All compression (***CCompres\*[IO]Stream***) class objects must be finalized after use.  Only after finalization all data that you have written into stream will be correctly compressed for sure. By default finalization is done in the class destructor, however it is better to call it directly by using [Finalize()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Finalize) method. This allows to check result and be sure that you read/write all necessary data. You cannot do any checks if it is called in the destructor, at best you'll get an error message if something goes wrong. In the case of ***CCompress\*IStream*** you can only read from the stream after finalization. Compression can produce some data that cannot be fit into the internal stream buffers, so if you don't read it, then some data may be lost. For ***CCompress\*OStream*** all compressed data will be automatically written to the underlying stream after finalization. You don`t need to do a finalization for any decompression streams, it is done automatically when the stream detects logical end of the compressed data.

1. The compression streams write nothing into the output if no input data has provided. This can be especially important for cases where the output data should have any header/footer (like .gz files, for example). So, for empty input, you will have an empty output, that may not be acceptable to external tools like gunzip and etc. If you want to produce correct compression format even for empty input data, please use `fAllowEmptyData` flag. This flag is `OFF` by default.

1. There is one special aspect of compression stream classes ***CCompression[IO]Stream***. You should avoid flushing a stream if not necessary to get a better compression ratio. Basically, the compression algorithms works on blocks of data. They wait until a block is full and then compress it. As long as you only feed data to the stream without flushing it works as expected, data will be flushed automatically on internal buffer overflow. If you manually flush stream though, then you force a premature end of the data block regardless of it size. This will result in a worse overall compression ratio. So, input compression streams usually have worse compression ratio than output compression streams -- because stream needs to flush data from compressor very often. Increasing compressor buffer size can amend this situation to some extent.


	
If you need to tune up a compression/decompression algorithm for yours needs, or to have more control what is going on there, you can use original compression streams from [include/util/compress/stream.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream.hpp). There are several classes similar to the wrapper classes described above:

-	[CCompressionIStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCompressionIStream.html)
-	[CCompressionOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCompressionOStream.html)
-	[CCompressionIOStream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCompressionIOStream.html)

The main difference, besides names, is that each class accepts a "stream processor" as parameter, an object of some class derived from [CCompressionStreamProcessor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCompressionStreamProcessor) that perform a real compression or decompression. Each compression library has its own implementation of stream processor. Currently, the Compression API has the following stream processors implemented:

-	[CBZip2StreamCompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCBZip2StreamCompressor.html)
-	[CBZip2StreamDecompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCBZip2StreamDecompressor.html)
-	[CLZOStreamCompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCLZOStreamCompressor.html)
-	[CLZOStreamDecompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCLZOStreamDecompressor.html)
-	[CZipStreamCompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipStreamCompressor.html)
-	[CZipStreamDecompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipStreamDecompressor.html)
-	[CZstdStreamCompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZstdStreamCompressor.html)
-	[CZstdStreamDecompressor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZstdStreamDecompressor.html)
-	[CTransparentStreamProcessor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCTransparentStreamProcessor.html)

All library based "stream processors" accept parameters specific for the underlying compression library. See compression libraries for details and parameters description.

[CTransparentStreamProcessor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTransparentStreamProcessor) is a special kind of stream processor that does not perform any compression or decompression, it just copies data between input and output buffers. It can be used as adapter to allow compression streams work as regular streams -- which can be useful in some special cases, to avoid changing already existing source code. Its usage may be less effective than accessing source underlying stream directly because you have an extra memory copy. But it can be usable if you need to access data `as is`. Also, all decompression streams support `fAllowTransparentRead` flag, to automatically detects if the data is not compressed and to stream the data `as is` in that case... but [CTransparentStreamProcessor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTransparentStreamProcessor) allow to skip any checks if you already know that data is not compressed.

Here is an example of how to read some data from a stream and to decompress it on-the-fly using `ZIP` method:

	CSomeIstreamDerivedClass is_orig(...);  // add ios_base::binary to stream's open mode
	CCompressionIStream is(is_orig,
	                       new CZipStreamDecompressor(...),
	                       CCompressionIStream::fOwnProcessor));
	is.read(buf, len);

	
<a name="ch_compress.manipulators"></a>

Stream manipulators
-------------------

C++ manipulators are functions specifically designed to be used in conjunction with the insertion (<<) and extraction (>>) operators on stream objects. Compression/decompression manipulators look like but are not real ***iostream*** manipulators; and, they have a little bit different semantics. 

With real stream manipulators you can write something like:

    os << manipulator << value;
  
that will have the same effect as: 

    os << manipulator;   os << value; 
	
But with compression/decompression manipulators you can use only the first form. Actually, "manipulators" compress/decompress a single item specified next to it rather than all items until the end of the statement. The `<<` manipulators accept any input stream or string as parameter, compress/decompress all data and put result into the output stream. The `>>` manipulators do the same but the input stream is specified on the left side of statement, and the output stream (or string) on the right.

All manipulators are declared in [include/util/compress/stream_util.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp) and include:

-	MCompress_BZip2
-	MCompress_LZO
-	MCompress_Zip
-	MCompress_Zstd
-	MCompress_GZipFile
-	MDecompress_BZip2
-	MDecompress_LZO
-	MDecompress_Zip
-	MDecompress_Zstd
-	MDecompress_GZipFile,
-	MDecompress_ConcatenatedGZipFile

Manipulators are very easy to use, they don't require long definitions or initialization. 

Examples (`ZIP` compression/decompression for different sources):

	// Compress text or other stream, and write result to 'os'
	os << MCompress_Zip << "text";
	os << MCompress_Zip << str;
	os << MCompress_Zip << is;
  
	// Decompress data from 'is' and put result to string or output stream
	is >> MDecompress_Zip >> str;
	is >> MDecompress_Zip >> os;

But this simplicity comes at a price. All manipulators use default parameters and flags for the underlying compression methods, and they have limited error reporting (see notes below) and data sources. Each manipulator is just a shorthand for a [compression stream](#ch_compress.streams). It creates a corresponding compression/decompression/input/output stream, accepts passed parameter, perform a compression or decompression, puts the result data into the output, and then destroys itself. And all that in a single short line of code.

**Notes**

1. Beware to use decompression manipulators with input streams as parameters. Manipulators will try to decompress data until EOF or decompression error. If the input stream contains something beyond the compressed data, then some portion of that data can be read into the internal buffers and cannot be returned back into the input stream.

1. Compression/decompression manipulators accept streams, `char*` and `string` parameters only. No any other type.

2. The diagnostic is very limited. On error, it can throw an exception of type [CCompressionException](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCompressionException) only.


<a name="ch_compress.params"></a>

Advanced compression parameters
-------------------------------

Usually default flags and parameters provide an abequate environment to compress and decompress data using the Compression API. But sometimes it is necessary to change default behavior. There are a two ways to do this, first one is flags. All compression methods have `EFlags` enumeration and `GetFlags()`/`SetFlags()` methods to apply it. Some classes, like streams, allow to specify flags via parameters in it's constructor. Some flags share its name between different compression methods, but other are unuque for each one. Note, please don't use flags from one compression method on another, this can lead to unpredictable results.

Other way to tune up each compression method is an advanced parameters. Each compression method have its own set of functions to set required advanced parameters and get min/max/default values for each of them. Using incorrect out-of-range parameter's value can lead to an error or throwing an exception.

Here are some examples of setting advanced compression parameters using `zip` compression method, but same technique could be applied to any other:

**CCompression**

	CZipCompression zip(CCompression::eLevel_Best);
	zip.SetWindowBits(15);
	zip.SetMemoryLevel(9);

**CCompressionFile**

	CZipCompressionFile zip_file(file_name, mode);
	zip_file.SetWindowBits(15);
	zip_file.SetMemoryLevel(9);
	zip_file.SetStrategy(strategy)

**Streams**

The stream classes are more complicated. The stream wrappers and manipulators from [include/util/compress/stream_util.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp) are made for a easier usage and doesn't allow to set an advanced compression parameters. You neeed to create compression stream using algorithm-specific stream processor and tune up all necessary parameters there, before creating a stream. See [compression stream](#ch_compress.streams) for details.

In short, you need to use algorithm specific `CCompression[IO]Stream` from [include/util/compress/stream.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream.hpp), like

	// Create algorithm specific compressor (as example)
	CZipCompressor compressor(<params>);
	// Set all necessary advanced parameters
	compressor.SetMemoryLevel(9);
	// Create stream processor
	CCompressionStreamProcessor processor(&compressor, ...);
	// Create compression stream (input stream as example)
	CCompressionIStream is(data_input_stream, zip_proc, CCompressionStream::fOwnProcessor);

or, if you use shorter stream compressor/decompressor approach. The stream processor have a special `GetCompressor()`/`GetDecompressor()` methods to get a pointer to internal compressor/decompressor accordingly, which can be used to set all parameters:

	// Create stream processor (compressor as example)
	CZipStreamCompressor* processor = new CZipStreamCompressor(...);
	// Set all necessary advanced parameters before creating the stream
	processor->GetCompressor()->SetMemoryLevel(9);
	// Create compression stream (input stream as example)
	CCompressionIStream is(data_input_stream, processor, CCompressionStream::fOwnProcessor);
	


<a name="ch_compress.dict"></a>

Dictionaries
------------

Dictionaries can have a large impact on the compression ratio of small files. The smaller the amount of data to compress, the more difficult it is to compress. This problem is common to all compression algorithms, that learn from past data how to compress future data. But at the beginning of a new data set, there is no "past" to build upon. So dictionaries allow to have a good starting point for compressing such data, if it were selected right. Using a dictionary is most useful when the data to be compressed is short and can be predicted with good accuracy; the data can then be compressed better than without a dictionary.

Each compression algorithm have [SetDictionary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDictionary) method, that allow to set a dictionary for all operations of compressing/decompressing buffers, files and streams. Setting dictionary for a stream is the same as setting advanced compression parameters, see (#ch_compress.params), simplified stream wrappers and manipulators from [include/util/compress/stream_util.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp) don't allow to use advanced parameters or dictionaries.

Currently only [ZIP](#ch_compress.methods.zip) and [ZSTD](#ch_compress.methods.zstd) have dictionary support, all other return `FALSE` on a  [SetDictionary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDictionary) call. But you can add a check on this feature at runtime, if necessary:

	CSomeCompression c;
	bool support_dictionary = c.HaveSupport(ICompression::eFeature_Dictionary);

The compressor and decompressor must use exactly the same dictionary. Each compression algorithm have its own format for dictionaries. We have a [CCompressionDictionary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCompressionDictionary) class, that allow to load and manage dictionary data, but we don't support creating dictionaries in this API (see algorithm-specific sections below for details). There are no such thing as an "universal" dictionary, it should be created for "yours" specific data and specific compression method. Yours should try to create different dictionaries and find which one is working best for your. Once created, the dictionary can be used to compress/decompress similar data and save a lot of space. Badly prepared dictionary don't inprove compression ratio against non-dictionary scenarios.

<a name="ch_compress.dict.zip"></a>
### ZIP

Dictionaries designed to work with `zib` raw deflate compression. They can be used with [GZIP](#ch_compress.methods.gzip) compression as well, if corresponding flags were used to write a `gzip` format, but files were created this way can be decompressed using this API only, default `gunzip` utility doesn't support dictionaries, be aware.

The process of preparing a dictionary for `zip` compression is a dark area, there are very little information how to do this, and no any tools exists to help with creating them. It is known that the dictionary is a binary file, and should consist of "strings" (byte sequences) that are likely to be encountered later in the data to be compressed, with the most commonly used sequences preferably put towards the end of the dictionary. The dictionary size cannot exceed the size of the window used for compression, so the compression library use the end of the dictionary and discard all from the beginning. Any "string" delimiters in the dictionary can and probably should be omitted. 

<a name="ch_compress.dict.zstd"></a>
### ZSTD

[ZSTD](#ch_compress.methods.zstd) have easier way to create dictionaries. Widely available for all platforms `zstd` utility offers a training mode that able to generate a dictionary from a set of samples or small files. See [The case for Small Data compression](https://github.com/facebook/zstd#the-case-for-small-data-compression). An example of a train set for a dictionary can be found [here](https://github.com/facebook/zstd/releases/tag/v1.1.3), see `github_users_sample_set.tar.gz` in Assets (it includes a directory with a lot of small files with a minimal differences). Default dictionary size for `zstd` is 112,649 bytes, but you can change this with `--maxdict` option to desired value.

	# see full set of options and tuneups on trainig dictionaries
	zstd --help
	
	# Different ways to create a dictionary
	zstd --train dir_with_samples/* -o dictionary
	zstd --train -r dir_with_samples -o dictionary
	zstd --train -r dir_with_samples --maxdict=2048 -o dictionary

It also have `-b`option to benchmark compression, so you can easier find a best dictionary for your data:
	
	# benchmark sample set with and without dictionary compression
	zstd -b1 -r data_dir
	zstd -b1 -r data_dir -D dictionary



<a name="ch_compress.archivers"></a>

Archivers
-----------------------

The C++ Toolkit Compression API includes two subsets to work with compression archives: `Compression archive API` and `Tar archive API`. Historically, `Tar archive API` was added first, it implements [TAR file format](#ch_compress.methods.tar.file) support. `Compression archive API` was designed to be a wrapper for a wide range of possible file archive formats and originally intended to include tar format support also, but due to some format specifics that has not yet been implemented. The interfaces of both mentioned subsets are very similar though.

<a name="ch_compress.archiver.arc"></a>

Compression archive API
-----------------------

Compression archive API is implemented in [CArchive](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArchive) class and two derived classes [CArchiveFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArchiveFile) and [CArchiveMemory](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CArchiveMemory) that support file- and memory-based archives accordingly. These classes have methods to create archives, add or extract files, list existing files, etc. -- whatever users usually do with an archive files.

Currently, archive API have support for [ZIP file format](#ch_compress.methods.zip.file) only. This is possible due to [miniz](https://github.com/richgel999/miniz) compression library. Toolkit has an embedded copy for `miniz`, see [miniz.c](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/util/compress/api/miniz/miniz.c) that is a part of the compression API.
	
That small library is very useful but it has some limitations:
-	No support for encrypted archives;

Latest versions of `miniz` have support for [ZIP64 file format](https://en.wikipedia.org/wiki/ZIP_(file_format)#ZIP64), that allow to create archives more than 4GB and have more than 65535 files in the archive. It automatically switches to ZIP64 if necessary.


<a name="ch_compress.archiver.tar"></a>

TAR archive API
---------------

The original [tar format](#ch_compress.methods.tar.file) was created in the early days of UNIX, and despite current widespread use, many of its design features are considered dated. Historically, many systems have implemented tar, so it has many flavors. Our implementation supports subsets of POSIX.1-1988 (ustar), POSIX 1003.1-2001 (posix), old GNU (POSIX 1003.1), and V7 formats (all partially but reasonably). New archives are created using POSIX (genuine ustar) format, using GNU extensions for long names/links only when unavoidable. It cannot, however, handle all the exotics like sparse and contiguous files (yet still can work around them gracefully, if needed), multivolume and incremental archives, etc. It can handle regular files, devices (character or block), FIFOs, directories, and limited links: can extract both hard- and symlinks, but can store symlinks only. Also, this implementation is only minimally PAX(Portable Archive eXchange)-aware for file extractions (but cannot use PAX extensions to store the files).

See [CTar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCTar.html) for all method and flag descriptions.

Tar format supports combining multiple files into one `.tar` file which is not compressed. To add support for `.tar.gz` or `.tar.bz2` archives, [CTar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTar) can be combined with [compression streams](#ch_compress.streams); it has a stream-based constructor that can help here. For example, for accessing `.tar.gz` archive something like this can be used:

	ifstream ifs("some.tar.gz", ios_base::in | ios_base::binary);
	if (ifs.fail()) {
	   // error
	}
	CDecompressIStream ics(ifs, CDecompressIStream::eGZipFile, flags);
	if (ics.fail()) {
	    // error
	}
	CTar tar(ics);
	...

**Note**

Note that if stream constructor is used, then [CTar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTar) can only perform one pass over the archive. This means that only one full action will succeed, and if the action was to update (e.g. append to) the archive, then it must be explicitly followed by Close() if no more appends are expected. Before the next read/update action the stream position must be explicitly reset to the beginning of the archive, or it also may remain at the end of the archive for a series of successive append operations.


<a name="ch_compress.FAQ"></a>

FAQ
----------------

<br>

**Q. What header files do I need to include?**

This depends on what functionality you need.
-	The most universal header is
[<util/compress/stream_util.hpp>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp), it allows to use all functionality of the Compression API except [archivers](#ch_compress.archivers).
-	To use some specific algorithm, like `ZIP`, you can include it/`s header directly
[<util/compress/zlib.hpp>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/zlib.hpp). This allows to use memory and file operations. 
-	For the standard stream support you need [<util/compress/stream.hpp>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream.hpp).
-	For the archive file format support: [<util/compress/archive.hpp>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/archive.hpp) or [<util/compress/tar.hpp>](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/tar.hpp).


<br>

**Q. What do I need to add to my Makefile?**

You need to add the following:

    LIB = xcompress $(CMPRS_LIB) xncbi
    LIBS = $(CMPRS_LIBS) $(ORIG_LIBS)
    CPPFLAGS = $(CMPRS_INCLUDE) $(ORIG_CPPFLAGS)

For specific library, you can use more detailed `LIB` and `LIBS`, and omit all not used libraries:
	
    LIB  =  xcompress $(BZ2_LIB) $(Z_LIB) $(LZO_LIB) xncbi
    LIBS =  $(BZ2_LIBS) $(Z_LIBS) $(LZO_LIBS) $(ORIG_LIBS)
    
For CMake files you just need to link with `xcompress` library:

    NCBI_uses_toolkit_libraries(xcompress)


<br>

**Q. Can I use all compression algorithms on any platforms / compilers?**

Toolkit checks existing compressions libraries on a configuration stage. If system version of some compression library is not found, for some libraries like `bzip2`, `zlib`, `gzip` we have an embedded alternatives, that will be used automatically. But for some others we don't, like `lzo` and `zsd`. The configure define next macros, so it is better to put specific library related code to corresponding #if/#endif block to avoid compilation errors on some platforms/compilers.

-	HAVE_LIBZ
-	HAVE_LIBBZ2
-	HAVE_LIBLZO
-	HAVE_LIBZSTD

```
#if defined(HAVE_LIBZSTD)
    // use ZSD related code here
#else
     // some backup code, or error reporting
#endif
```
This is related to algorithm-specific classes. Many other common compession classes/interfaces can be used without such guards, like [ICompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ICompression) or [streams](#ch_compress.streams).


<br>

**Q. Can we compress/decompress data more than 4GB in size?**

Yes, all compression methods have full support for data > 4GB. The size of compressed or uncompressed data is limited to size of `size_t` type only. 

Notes:

1. [Compression files](#ch_compress.files) have [Read()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Read) and [Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write) methods, both are limited to return values of `long` type, to allow to return a negative values on errors. Both methods return the number of bytes actually read/written, so you need to repeat calling it until all the data has been read/written.

1. [Streams](#ch_compress.streams) also have `read()` and `write()` methods derived from the standard I/O stream API; both accept parameter of `std::streamsize` type which is usually different from the `size_t` that is used in the Compression API. So, all compression streams have two additional non-standard methods, that can be helpful:

Input streams:

	size_t Read(void* buf, size_t len);

Output streams:

	size_t Write(const void* buf, size_t len);


<br>

**Q. What is `CCompressStream::eNone` compression method for streams and its difference from `CCompress::eLevel_NoCompression` compression level?**

`CCompress::eLevel_NoCompression` is a library-defined compression level. Each library can store data not compressed, but it may it into its own footer and header, add may add checksums or other information depending on used compression format. `CCompressStream::eNone` is a specific compression method for our [compression streams](#ch_compress.streams). It uses [CTransparentStreamProcessor](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCTransparentStreamProcessor.html) that does not perform any compression or decompression and it does not add any header or footer -- rather, it merely copies the data "as is", ignoring the specified compression level at all. See [streams](#ch_compress.streams) section for details.

Note, that some compressions do not support `CCompress::eLevel_NoCompression` compression level, and do not allow to store data not compressed. In this case the Compression API automatically select the lowest supported compression level. You always can check on its support using `HaveSupport()` method. For `zip` as example:

	CZipCompression c;
	bool have_no_compression = c.HaveSupport(ICompression::eFeature_NoCompression);


<br>

**Q. How to read `.gz` file (decompress gzip data in-memory), the Compression API produces error code -3 on decompression?**

The Compression API supports [ZIP](#ch_compress.methods.zip) and [GZIP](#ch_compress.methods.gzip) compression methods. All in-memory compression and basic streams use `ZIP` by default. To change this behavior you need to specify appropriate flag(s), see `[CZipCompression](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipCompression.html)::EFlags` enum for details. Usually, `CZipCompression::fGZip` flag is what you needed.

[CZipCompressionFile](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCZipCompressionFile.html) uses `gzip` format by default, so no additional steps are required.

Utility streams in [include/util/compress/stream_util.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/util/compress/stream_util.hpp) supports 2 `ZLIB` based methods: `CCompressStream::eZip` for DEFLATE and gzip-compatible `CCompressStream::eGZipFile`. Use the second one to handle .gz data streams.


<br>

**Q. It is unknown is data compressed or not but I need to read it anyway. How to do this?**

You can try to decompress it, and if an error occurs, then the data is most probably not compressed, and you can use it "as is". Also, all compression methods have `fAllowTransparentRead` flag which can do the same for you automatically -- it allows transparent reading data from buffer/file/stream regardless if have compressed data or not. You'll still need to know possible used compression method anyway. Be aware that if the source has broken compressed data, then the API cannot detect that it is compressed and you will get a binary junk instead of decompressed data. Also, you can try to check first bytes of data to much a `magic signature` for a specific format and [CFormatGuess](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCFormatGuess.html) could be very useful for that:

	#include <util/format_guess.hpp>
	...
	CFormatGuess::EFormat format = CFormatGuess::Format(...input stream or file name...);
	switch (format) {
		case CFormatGuess::eGZip:  method = CCompressStream::eGZipFile;  break;
		case CFormatGuess::eBZip2: method = CCompressStream::eBZip2;     break;
		case CFormatGuess::eLzo:   method = CCompressStream::eLZO;       break;
		case CFormatGuess::eZip:   method = CCompressStream::eZip;       break;
		case CFormatGuess::eZstd:  method = CCompressStream::eZstd;      break;
		default:                   method = CCompressStream::eNone;      break;
	}

To test on specific format you can use:

    CFormatGuess guess(...input stream or file name...);
    bool is_gzip = guess.TestFormat(CFormatGuess::eGZip);
