---
layout: default
title: C++ Toolkit test
nav: pages/ch_jsonwrapp
---


22\. JSONWRAPP (JSON parsing and handling)
===================================================================

Created: March 14, 2016; Last Update: March 16, 2016.


-  [Introduction](#ch_jsonwrapp.Introduction)

-  [Overview](#ch_jsonwrapp.Overview)

-  [JsonWrapp classes](#ch_jsonwrapp.Classes)

  -  [Node](#ch_jsonwrapp.Node)

  -  [Value](#ch_jsonwrapp.Value)

  -  [Array](#ch_jsonwrapp.Array)

  -  [Object](#ch_jsonwrapp.Object)

  -  [Document](#ch_jsonwrapp.Document)

-  [JSON data parsing (DOM and SAX)](#ch_jsonwrapp.Parsing)

<a name="ch_jsonwrapp.Introduction"></a>

### Introduction

JavaScript Object Notation - [JSON](http://www.ietf.org/rfc/rfc4627.txt) is a popular lightweight, text-based data interchange format. JSON derives a small set of formatting rules for portable representation of structured data. While handling of JSON data can be done using [SERIAL](http://ncbi.github.io/cxx-toolkit/pages/ch_ser) library that could be too difficult. It would require data specification (ASN.1 or XML schema) and generation of special C++ data storage classes. In practice, specification is not always available, and code generation is not always desirable. There is a need for something simpler – simple tool to read, write and analyze any JSON data. 

There are several libraries which do this, NCBI does not endorse any of them in particular. At present, we have chosen [RAPIDJSON](https://github.com/miloyip/rapidjson), but we have made every effort to hide its implementation details and created our own wrapper classes and API. In case we choose to change the underlying implementation in the future, what would be required from developers is recompilation only, the API will not change.

<a name="ch_jsonwrapp.Overview"></a>

### Overview.

JSON value can represent four primitive types (*string*, *number*, *boolean*, and *null*) and two structured types - *object* and *array*). An *object* is an unordered collection of zero or more name/value pairs, where a name is a string and a value is a string, number, boolean, null, object, or array. An *array* is an ordered sequence of zero or more values.

The figure below illustrates `JsonWrapp` library class relationship diagram.

[![Image jsonwrapp\_classes.png](/cxx-toolkit/static/img/jsonwrapp_classes.png)](/cxx-toolkit/static/img/jsonwrapp_classes.png "Click to see the full-resolution image")

First thing to note is that most classes here act like pointers. That is, creating or copying them does not create any data; destroying them does not destroy any data either. There is only one data storage class – *Document*. All others are simply pointers to different parts of the document. Once so, it is impossible to create a standalone JSON value object. To create a value, one should add it into a document and get a proper adapter object.

<a name="ch_jsonwrapp.Classes"></a>

### JsonWrapp classes

The library implements the following classes: 

-  [CJson_ConstNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstNode.html), 
  
-  [CJson_Node](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Node.html),
 
-  [CJson_ConstValue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstValue.html), 
  
-  [CJson_Value](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Value.html), 
  
-  [CJson_ConstArray](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstArray.html), 
  
-  [CJson_Array](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Array.html), 
 
-  [CJson_ConstObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstObject.html),
 
-  [CJson_Object](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Object.html),

-  [CJson_Document](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Document.html).

*Node*, *Value*, *Array* and *Object* classes provide relevant interfaces for their particular types. *CJson\_ConstX* objects provide read methods, while *CJson\_X* objects – write methods. *Value* holds primitive type data. *Array* provides vector-like interface. *Object* resembles STL map.

For a given *Node*, *GetX()* and *SetX()* do type checks and return proper adapter – for reading or writing. If the *Node* type does not match the expected one, an exception will be thrown. A node can be converted into another type using *ResetX()* methods.
For example, if we have a node of *object* type, we can get access to its *Object* interface using *SetObject()* method:

    CJson_Object obj = node.SetObject();

If we then want to convert it into *Null*, we use *ResetValue()*:

    CJson_Value val = obj.ResetValue();

Converting the *Null* value into *String* or *Number* does not require *ResetX()* because it is still primitive type:

    val.SetString(“value”);

Converting it into *Array*, does:

    CJson_Array arr = val.ResetArray();


<a name="ch_jsonwrapp.Node"></a>

#### Node

Two base classes [CJson_ConstNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstNode.html) and
[CJson_Node](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Node.html) provide only basic information about the node. It is possible to query node type: *IsNull()*, *IsValue()*, *IsArray()*, *IsObject()*, request access to node data using *GetX()* or *SetX()* methods, or change node type with the help of *ResetX()*.


<a name="ch_jsonwrapp.Value"></a>

#### Value

Value classes [CJson_ConstValue](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstValue.html) and 
[CJson_Value](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Value.html) provide access to nodes of primitive types (numbers, strings and boolean). To convert a value from one type into another (for exanple, from number into a string), there is no need to call *Reset*. This can be done with a *SetX()*.


<a name="ch_jsonwrapp.Array"></a>

#### Array

JSON array is an ordered sequence of zero or more values. `JsonWrapp` array classes -
[CJson_ConstArray](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__ConstArray.html),
[CJson_Array](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__Array.html) - are designed to resemble STL vector class and implement practically identical (but limited) interface. The classes also implement random access iterators to access array elements.

For example, to populate an array with primitive type nodes:

    arr.push_back(1);
    arr.push_back(false);
    arr.push_back("str");

To add Array or Object node into Array:

    CJson_Array a2 = arr.push_back_array();
    CJson_Object o2 = arr.push_back_object();

To enumerate contents of the Array:

    for (CJson_Array::iterator i = arr.begin(); i != arr.end(); ++i) {
      CJson_Node v = *i
    }
    for_each(arr.begin(), arr.end(), [](const CJson_ConstNode& v) {
        do_something(v);
    });


<a name="ch_jsonwrapp.Object"></a>

#### Object

Object is

<a name="ch_jsonwrapp.Document"></a>

#### Document

Document is

<a name="ch_jsonwrapp.Parsing"></a>

### JSON data parsing (DOM and SAX).

There are two types of data parsing – DOM and SAX. `JsonWrapp` library supports both.
The DOM stands for Document Object Model. This type of parser loads the whole object into memory.  The document has methods to access, insert, and delete data nodes. For example, to read data from file, do the following:

    CJson_Document doc;
    doc.Read(“filename”);

The data then can be modified and written back into a file:

    doc.Write(“filename”);


The SAX stands for Simple API for XML.  SAX type parser is event-based sequential access API. When reading data, it does not produce an object, it generates events instead. The data cannot be written because there is no data object, but inside SAX parser, it is possible to read parts of the data using DOM parser and write them separately. 
`JsonWrapp` library implements SAX type parsing with the help of [CJson_WalkHandler](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCJson__WalkHandler.html)
class. Developers should provide their own class derived from *CJson_WalkHandler*. This class then receives parsing events through its virtual methods.

For example, having *CSax* class derived from *CJson_WalkHandler*, it is possible to use it to parse existing JSON document:

    CJson_Document doc;
    doc.Read(“filename”);
    CSax parser;
    Doc.Walk(parser);

Or to parse a file:

    Ifstream ifs(“filename”);
    CSax parser;
    CJson_Document::Walk(ifs, parser);


