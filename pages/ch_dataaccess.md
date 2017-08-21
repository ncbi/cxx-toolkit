---
layout: default
title: Access to NCBI data
nav: pages/ch_dataaccess
---


{{ page.title }}
======================================


## Introduction

This chapter describes access to the NCBI data using the NCBI C++ Toolkit.

## Chapter Outline

-   [Object Manager: Generic API for retrieving and manipulating biological sequence data](#ch_dataaccess.Object_Manager)

-   [E-Utils: Access to Entrez Data](#ch_dataaccess.EUtils_Access_to_Ent)

<a name="ch_dataaccess.Object_Manager"></a>

Object Manager: Generic API for retrieving and manipulating biological sequence data
------------------------------------------------------------------------------------

The information about Object Manager library is [here](ch_objmgr.html).

<a name="ch_dataaccess.EUtils_Access_to_Ent"></a>

E-Utils: Access to Entrez Data
------------------------------

<a name="ch_dataaccess.EUtils_requests"></a>

### EUtils requests

The base class for all requests is [CEUtils\_Request](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CEUtils_Request). Derived request classes provide *Get/Set* methods to specify arguments for each request. The returned data can be read in several ways:

-   ******Read()****** - reads the data returned by the server into a string.

-   ******GetStream()****** - allows to read plain data returned by the server.

-   ******GetObjectIStream()****** - returns serial stream for reading data (in most cases it's an XML stream).

<a name="ch_dataaccess.Connection_context"></a>

### Connection context

[CEUtils\_ConnContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CEUtils_ConnContext) allows transferring EUtils context from one request to another. It includes user-provided information (tool, email) and history data (WebEnv, query\_key). If no context is provided for a request (the *ctx* argument is *NULL*), a temporary context will be created while executing the request.

<a name="ch_dataaccess.EUtils_objects"></a>

### EUtils objects

Most requests return specific data types described in EUtils DTDs. The C++ classes generated from the DTDs can be found in [include/objtools/eutils/](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/objtools/eutils)`<util-name>`.

<a name="ch_dataaccess.Sample_application"></a>

### Sample application

An example of using EUtils API can be found in [sample/app/eutils/eutils\_sample.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/eutils/eutils_sample.cpp).


