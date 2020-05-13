---
layout: default
title: Applications
nav: pages/ch_app
---


{{ page.title }}
===============================

## Introduction

Most of the applications discussed in this chapter are built on a regular basis, at least once a day from the latest sources, and if you are in NCBI, then you can find the latest version in the directory: `$NCBI/c++/Release/bin/` (or `$NCBI/c++/Debug/bin/`).

## Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [DATATOOL: code generation and data serialization utility](#ch_app.datatool)

    -   [Invocation](#ch_app.datatool.html_refArgs)

        -   [Main arguments](#ch_app.datatool.html_refMainArgs)

        -   [Code generation arguments](#ch_app.datatool.html_refCodeGenerationAr)

    -   [Data specification conversion](#ch_app.Data_Specification_C)

        -   [Scope prefixes](#ch_app.Scope_Prefixes)

        -   [Modular DTD and Schemata](#ch_app.Modular_DTD_and_Sche)

        -   [Converting XML Schema into ASN.1](#ch_app.Converting_XML_Schem)

    -   [Definition file](#ch_app.datatool.html_refDefFile)

        -   [Common definitions](#ch_app.datatool.html_refDefCommon)

        -   [Definitions that affect specific types](#ch_app.datatool.html_refDefSpecific)

            -   [INTEGER, REAL, BOOLEAN, NULL](#ch_app.datatool.html_refDefINT)

            -   [ENUMERATED](#ch_app.datatool.html_refDefENUM)

            -   [OCTET STRING](#ch_app.datatool.html_refDefOCTETS)

            -   [SEQUENCE OF, SET OF](#ch_app.datatool.html_refDefArray)

            -   [SEQUENCE, SET](#ch_app.datatool.html_refDefClass)

            -   [CHOICE](#ch_app.datatool.html_refDefChoice)

        -   [The Special [-] Section](#ch_app.The_Special__Section)

        -   [Examples](#ch_app.datatool.html_refDefExample)

    -   [Module file](#ch_app.ch_app_datatool_html_refModFile)

    -   [Generated code](#ch_app.datatool.html_refCode)

        -   [Normalized name](#ch_app.datatool.html_refNormalizedName)

        -   [ENUMERATED types](#ch_app.datatool.html_refCodeEnum)

    -   [Class diagrams](#ch_app.dt_inside.html)

        -   [Specification analysis](#ch_app.dt_inside.html_specs)

            -   [ASN.1 specification analysis](#ch_app.dt_inside.html_specs_asn)

            -   [DTD specification analysis](#ch_app.dt_inside.html_specs_dtd)

        -   [Data types](#ch_app.dt_inside.html_data_types)

        -   [Data values](#ch_app.dt_inside.html_data_values)

        -   [Code generation](#ch_app.dt_inside.html_code_gen)

-   [Load Balancing](#ch_app.Load_Balancing)

    -   [Overview](#ch_app._Overview)

    -   [Load Balancing Service Mapping Daemon (LBSMD)](#ch_app.Load_Balancing_Servi)

        -   [Overview](#ch_app._Overview_1)

        -   [Configuration](#ch_app._Configuration)

            -   [Check Script Specification](#ch_app.Check_Script_Specification)

            -   [Server Descriptor Specification](#ch_app.Server_Descriptor_Specification)

        -   [Signals](#ch_app.Signals)

        -   [Automatic Configuration Distribution](#ch_app.Automatic_Configurat)

        -   [Monitoring and Control](#ch_app.Monitoring_and_Contr)

            -   [Service Search](#ch_app.Service_Search)

            -   [lbsmc Utility](#ch_app.lbsmc_Utility)

            -   [NCBI Intranet Web Utilities](#ch_app.NCBI_Intranet_Web_Ut)

            -   [Server Penalizer API and Utility](#ch_app.Server_Penalizer_API)

        -   [SVN Repository](#ch_app.SVN_Repository)

        -   [Log Files](#ch_app._Log_Files)

        -   [Configuration Examples](#ch_app._Configuration_Exampl)

    -   [Database Load Balancing](#ch_app.Database_Load_Balancing)

    -   [DISPD Network Dispatcher](#ch_app.DISPD_Network_Dispat)

        -   [Overview](#ch_app._Overview_3)

        -   [Protocol Description](#ch_app.Protocol_Description)

            -   [Client Request to DISPD](#ch_app.Client_Request_to_DI)

            -   [DISPD Client Response](#ch_app.DISPD_Client_Respons)

            -   [Communication Schemes](#ch_app.Communication_Scheme)

    -   [NCBID Server Launcher](#ch_app.NCBID_Server_Launche)

        -   [Overview](#ch_app._Overview_4)

    -   [Firewall Daemon (FWDaemon)](#ch_app.Firewall_Daemon_FWDa)

        -   [Overview](#ch_app._Overview_5)

            -   [FWDaemon Behind a "Regular" Firewall](#ch_app.FWDaemon_Behind_a__R)

            -   [FWDaemon Behind a "Non-Transparent" Firewall](#ch_app.FWDaemon_Behind_a__N)

        -   [Monitoring](#ch_app._Monitoring_1)

        -   [Log Files](#ch_app._Log_Files_1)

        -   [FWDaemon and NCBID Dispatcher Data Exchange](#ch_app.FWDaemon_and_NCBID_D)

    -   [Launcherd Utility](#ch_app.Launcherd_Utility)

    -   [Monitoring Tools](#ch_app.Monitoring_Tools)

    -   [Quality Assurance Domain](#ch_app.Quality_Assurance_Do)

-   [NCBI Genome Workbench](#ch_app.applications1)

    -   [Design goals](#ch_app.gbench_dg)

    -   [Design](#ch_app.gbench_design)

-   [NCBI NetCache Service](#ch_app.ncbi_netcache_service)

    -   [What is NetCache?](#ch_app.what_is_netcache)

    -   [What can NetCache be used for?](#ch_app.what_it_can_be_used)

    -   [How to use NetCache](#ch_app.getting_started)

        -   [The basic ideas](#ch_app.The_basic_ideas)

        -   [Setting up your program to use NetCache](#ch_app.Set_up_your_program_to_use_NetCac)

        -   [Establish the NetCache service name](#ch_app.Establish_the_NetCache_service_na)

        -   [Initialize the client API](#ch_app.Initialize_the_client_API)

        -   [Store data](#ch_app.Store_data)

        -   [Retrieve data](#ch_app.Retrieve_data)

        -   [Samples and other resources](#ch_app.Available_samples)

    -   [Questions and answers](#ch_app.Questions_and_answers)

<a name="ch_app.datatool"></a>

DATATOOL: Code Generation and Data Serialization Utility
--------------------------------------------------------

**DATATOOL** source code is located at `c++/src/serial/datatool;` this application can perform the following:

-   Generate C++ data storage classes based on [ASN.1](http://www.itu.int/ITU-T/studygroups/com17/languages), [DTD](http://www.w3.org/TR/REC-xml), [XML Schema](https://www.w3.org/XML/Schema) or [JSON Schema](http://json-schema.org/) specification to be used with [NCBI data serialization streams](ch_ser.html).

-   Convert ASN.1 specification into a DTD, XML Schema or JSON Schema specification and vice versa.

-   Convert data between ASN.1, XML and JSON formats.

-   Generate SOAP client code based on [WSDL specification](https://www.w3.org/TR/wsdl).

***Note:*** Because ASN.1, XML and JSON are, in general, incompatible, the last two functions are supported only partially.

The following topics are discussed in subsections:

-   [Invocation](#ch_app.datatool.html_refArgs)

-   [Data specification conversion](#ch_app.Data_Specification_C)

-   [Definition file](#ch_app.datatool.html_refDefFile)

-   [Module file](#ch_app.ch_app_datatool_html_refModFile)

-   [Generated code](#ch_app.datatool.html_refCode)

-   [Class diagrams](#ch_app.dt_inside.html)

<a name="ch_app.datatool.html_refArgs"></a>

### Invocation

The following topics are discussed in this section:

-   [Main arguments](#ch_app.datatool.html_refMainArgs)

-   [Code generation arguments](#ch_app.datatool.html_refCodeGenerationAr)

<a name="ch_app.datatool.html_refMainArgs"></a>

#### Main Arguments

See [Table 1](#ch_app.tools_table1).

<a name="ch_app.tools_table1"></a>

Table 1. Main arguments

| Argument | Effect | Comments |
|------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------|
| -h | Display the **DATATOOL** arguments | Ignores other arguments |
| -m \<file\> | module specification file(s) - ASN.1, DTD, XSD or JSON | Required argument |
| -M \<file\> | External module file(s) | Is used for IMPORT type resolution |
| -i | Ignore unresolved types | Is used for IMPORT type resolution |
| -f \<file\> | Write ASN.1 module file | |
| -fx \<file\> | Write DTD module file | "-fx m" writes modular DTD file |
| -fxs \<file\> | Write XML Schema file | |
| -fjs \<file\> | Write JSON Schema file | |
| -fd \<file\> | Write specification dump file in datatool internal format | |
| -ms \<string\> | Suffix of modular DTD or XML Schema file name | |
| -dn \<string\> | DTD module name in XML header | No extension. If empty, omit DOCTYPE declaration. |
| -v \<file\> | Read value in ASN.1 text format | |
| -vx \<file\> | Read value in XML format | |
| -vj \<file\> | Read value in JSON format | |
| -F | Read value completely into memory | |
| -p \<file\> | Write value in ASN.1 text format | |
| -px \<file\> | Write value in XML format | |
| -pj \<file\> | Write value in JSON format | |
| -d \<file\> | Read value in ASN.1 binary format | -t argument required |
| -t \<type\> | Binary value type name | See -d argument |
| -e \<file\> | Write value in ASN.1 binary format | |
| -xmlns | XML namespace name | When specified, also makes XML output file reference Schema instead of DTD |
| -sxo | No scope prefixes in XML output | |
| -sxi | No scope prefixes in XML input | |
| -logfile \<File\_Out\> | File to which the program log should be redirected | |
| conffile \<File\_In\> | Program's configuration (registry) data file | |
| -version | Print version number | Ignores other arguments |

<div class="table-scroll"></div>

<a name="ch_app.datatool.html_refCodeGenerationAr"></a>

#### Code Generation Arguments

See [Table 2](#ch_app.tools_table2).

<a name="ch_app.tools_table2"></a>

Table 2. Code generation arguments

| Argument | Effect | Comments |
|-----------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -od \<file\> | C++ code [definition file](#ch_app.datatool.html_refDefFile) | See [Definition file](#ch_app.datatool.html_refDefFile) |
| -ods | Generate an example definition file (e.g. `MyModuleName._sample_def`) | Must be used with another option that generates code such as -oA. |
| -odi | Ignore absent code definition file | |
| -odw | Issue a warning about absent code definition file | |
| -oA | Generate C++ files for all types | Only types from the main module are used (see [-m](#ch_app.tools_table1) and -mx arguments). |
| -ot \<types\> | Generate C++ files for listed types | Only types from the main module are used (see [-m](#ch_app.tools_table1) and -mx arguments). |
| -ox \<types\> | Exclude types from generation | |
| -oX | Turn off recursive type generation | |
| -of \<file\> | Write the list of generated C++ files | |
| -oc \<file\> | Write combining C++ files | |
| -on \<string\> | Default namespace | The value "-" in the [Definition file](#ch_app.datatool.html_refDefFile) means don't use a namespace at all and overrides the -on option specified elsewhere. |
| -opm \<dir\> | Directory for searching source modules | |
| -oph \<dir\> | Directory for generated \*.hpp files | |
| -opc \<dir\> | Directory for generated \*.cpp files | |
| -or \<prefix\> | Add prefix to generated file names | |
| -orq | Use quoted syntax form for generated include files | |
| -ors | Add source file dir to generated file names | |
| -orm | Add module name to generated file names | |
| -orA | Combine all -or\* prefixes | |
| -ocvs | create ".cvsignore" files | |
| -oR \<dir\> | Set -op\* and -or\* arguments for NCBI directory tree | |
| -oDc | Turn ON generation of Doxygen-style comments | The value "-" in the [Definition file](#ch_app.datatool.html_refDefFile) means don't generate Doxygen comments and overrides the -oDc option specified elsewhere. |
| -odx \<string\> | URL of documentation root folder | For Doxygen |
| -lax\_syntax | Allow non-standard ASN.1 syntax accepted by asntool | The value "-" in the [Definition file](#ch_app.datatool.html_refDefFile) means don't allow non-standard syntax and overrides the -lax\_syntax option specified elsewhere. |
| -pch \<string\> | Name of the precompiled header file to include in all \*.cpp files | |
| -oex \<export\> | Add storage-class modifier to generated classes | Can be overriden by [[-].\_export](#ch_app.datatool.html_refDefCommon) in the definition file. |

<div class="table-scroll"></div>

<a name="ch_app.Data_Specification_C"></a>

### Data Specification Conversion

When parsing a data specification, **DATATOOL** identifies the specification format based on the source file extension - ASN, DTD,  XSD, JSD or WSDL.

<a name="ch_app.Scope_Prefixes"></a>

#### Scope Prefixes

Initially, **DATATOOL** and the serial library supported serialization in ASN.1 and XML format, and conversion of ASN.1 specification into DTD. Compared to ASN.1, DTD is a very sketchy specification in the sense that there is only one primitive type - string, and all elements are defined globally. The latter feature of DTD led to a decision to use ‘scope prefixes’ in XML output to avoid potential name conflicts. For example, consider the following ASN.1 specification:

    Date ::= CHOICE {
        str VisibleString, 
        std Date-std
    }
    Time ::= CHOICE {
        str VisibleString, 
        std Time-std
    }

Here, accidentally, element ***str*** is defined identically both in [Date](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Date) and [Time](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Time) productions; while the meaning of element ***std*** depends on the context. To avoid ambiguity, this specification translates into the following DTD:

    <!ELEMENT Date (Date_str | Date_std)>
    <!ELEMENT Date_str (#PCDATA)>
    <!ELEMENT Date_std (Date-std)>
    <!ELEMENT Time (Time_str | Time_std)>
    <!ELEMENT Time_str (#PCDATA)>
    <!ELEMENT Time_std (Time-std)>

Accordingly, these scope prefixes made their way into XML output.

Later, DTD parsing was added into **DATATOOL**. Here, scope prefixes were not needed. Also, since these prefixes considerably increase the size of the XML output, they could be omitted when it is known in advance that there can be no ambiguity. So, **DATATOOL** has got command line flags, which would enable that.

With the addition of XML Schema parser and generator, when converting ASN.1 specification, elements can be declared in Schema locally if needed, and scope prefixes make almost no sense. Still, they are preserved for compatibility.

<a name="ch_app.Modular_DTD_and_Sche"></a>

#### Modular DTD and Schemata

Here, ‘module’ means ASN.1 module. Single ASN.1 specification file may contain several modules. When converting it into DTD or XML schema, it might be convenient to put each module definitions into a separate file. To do so, one should specify a special file name in `-fx` or `-fxs` command line parameter. The names of output DTD or Schema files will then be chosen automatically - they will be named after ASN.1 modules defined in the source. ‘Modular’ output does not make much sense when the source specification is DTD or Schema.

You can find a number of DTDs and Schema converted by **DATATOOL** from NCBI public ASN.1 specifications [here](https://www.ncbi.nlm.nih.gov/data_specs).

<a name="ch_app.Converting_XML_Schem"></a>

#### Converting XML Schema into ASN.1

There are two major problems in converting XML schema into ASN.1 specification: how to define XML attributes and how to convert complex content models. The solution was greatly affected by the underlying implementation of data storage classes (classes which **DATATOOL** generates based on a specification). So, for example the following Schema

    <xs:element name="Author">
      <xs:complexType>
        <xs:sequence>
          <xs:element name="LastName" type="xs:string"/>
          <xs:choice minOccurs="0">
            <xs:element name="ForeName" type="xs:string"/>
            <xs:sequence>
              <xs:element name="FirstName" type="xs:string"/>
              <xs:element name="MiddleName" type="xs:string" minOccurs="0"/>
            </xs:sequence>
          </xs:choice>
          <xs:element name="Initials" type="xs:string" minOccurs="0"/>
          <xs:element name="Suffix" type="xs:string" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="gender" use="optional">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:enumeration value="male"/>
              <xs:enumeration value="female"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:attribute>
      </xs:complexType>
    </xs:element>

translates into this ASN.1:

    Author ::= SEQUENCE {
      attlist SET {
        gender ENUMERATED {
          male (1),
          female (2)
        } OPTIONAL
      },
      lastName VisibleString,
      fF CHOICE {
        foreName VisibleString,
        fM SEQUENCE {
          firstName VisibleString,
          middleName VisibleString OPTIONAL
        }
      } OPTIONAL,
      initials VisibleString OPTIONAL,
      suffix VisibleString OPTIONAL
    }

Each unnamed local element gets a name. When generating C++ data storage classes from Schema, **DATATOOL** marks such data types as anonymous.

It is possible to convert source Schema into ASN.1, and then use **DATATOOL** to generate C++ classes from the latter. In this case **DATATOOL** and serial library provide compatibility of ASN.1 output. If you generate data storage classes from Schema, and use them to write data in ASN.1 format (binary or text), if you then convert that Schema into ASN.1, generate classes from it, and again write same data in ASN.1 format using this new set of classes, then these two files will be identical.

<a name="ch_app.datatool.html_refDefFile"></a>

### Definition File

It is possible to tune up the C++ code generation by using a definition file, which could be specified in the [-od](#ch_app.tools_table2) argument. The definition file uses the generic [NCBI configuration](ch_core.html#ch_core.registry_syntax) format also used in the configuration (`*.ini`) files found in NCBI's applications.

**DATATOOL** looks for code generation parameters in several sections of the file in the following order:

1.  `[ModuleName.TypeName]`

2.  `[TypeName]`

3.  `[ModuleName]`

4.  `[-]`

Parameter definitions follow a "name = value" format. The "name" part of the definition serves two functions: (1) selecting the specific element to which the definition applies, and (2) selecting the code generation parameter (such as `_class`) that will be fine-tuned for that element.

To modify a top-level element, use a definition line where the name part is simply the desired code generation parameter (such as `_class`). To modify a nested element, use a definition where the code generation parameter is prefixed by a dot-separated "path" of the successive container element names from the data format specification. For path elements of type `SET OF` or `SEQUENCE OF`, use an "`E`" as the element name (which would otherwise be anonymous). ***Note:*** Element names will depend on whether you are using ASN.1, DTD, or Schema.

For example, consider the following ASN.1 specification:

    MyType ::= SEQUENCE {
        label VisibleString ,
        points SEQUENCE OF
            SEQUENCE {
                x INTEGER ,
                y INTEGER
            }
    }

Code generation for the various elements can be fine-tuned as illustrated by the following sample definition file:

    [MyModule.MyType]
    ; modify the top-level element (MyType)
    _class = CMyTypeX

    ; modify a contained element
    label._class = CTitle

    ; modify a "SEQUENCE OF" container type
    points._type = vector

    ; modify members of an anonymous SEQUENCE contained in a "SEQUENCE OF"
    points.E.x._type = double
    points.E.y._type = double

    ; modify a DATATOOL-assigned class name
    points.E._class = CPoint

***Note:*** **DATATOOL** assigns arbitrary names to otherwise anonymous containers. In the example above, the `SEQUENCE` containing `x` and `y` has no name in the specification, so **DATATOOL** assigned the name `E`. If you want to change the name of a **DATATOOL**-assigned name, create a definition file and rename the class using the appropriate `_class` entry as shown above. To find out what the **DATATOOL**-assigned name will be, create a sample definition file using the **DATATOOL** `-ods` option. This approach will work regardless of the data specification format (ASN.1, DTD, or XSD).

The following additional topics are discussed in this section:

-   [Common definitions](#ch_app.datatool.html_refDefCommon)

-   [Definitions that affect specific types](#ch_app.datatool.html_refDefSpecific)

-   [The Special [-] Section](#ch_app.The_Special__Section)

-   [Examples](#ch_app.datatool.html_refDefExample)

<a name="ch_app.datatool.html_refDefCommon"></a>

#### Common Definitions

Some definitions refer to the generated class as a whole.

`_file`      Defines the base filename for the generated or referenced C++ class.

For example, the following definitions:

    [ModuleName.TypeName]
    _file=AnotherName

Or

    [TypeName]
    _file=AnotherName

would put the class [CTypeName](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CTypeName) in files with the base name `AnotherName`, whereas these two:

    [ModuleName]
    _file=AnotherName

Or

    [-]
    _file=AnotherName

put **all** the generated classes into a single file with the base name `AnotherName`.

`_extra_headers`      Specify additional header files to include.

For example, the following definition:

    [-]
    _extra_headers=name1 name2 \"name3\"

would put the following lines into all generated headers:

    #include <name1>
    #include <name2>
    #include "name3"

Note the name3 clause. Putting name3 in quotes instructs **DATATOOL** to use the quoted syntax in generated files. Also, the quotes must be escaped with backslashes.

`_dir`      Subdirectory in which the generated C++ files will be stored (in case \_file not specified) or a subdirectory in which the referenced class from an external module could be found. The subdirectory is added to include directives.

`_class`      The name of the generated class (if `_class=-` is specified, then no code is generated for this type).

For example, the following definitions:

    [ModuleName.TypeName]
    _class=CAnotherName

Or

    [TypeName]
    _class=CAnotherName

would cause the class generated for the type `TypeName` to be named ***CAnotherName***, whereas these two:

    [ModuleName]
    _class=CAnotherName

Or

    [-]
    _class=CAnotherName

would result in **all** the generated classes having the same name ***CAnotherName*** (which is probably not what you want).

`_namespace`      The namespace in which the generated class (or classes) will be placed.

`_parent_class`      The name of the base class from which the generated C++ class is derived.

`_parent_type`      Derive the generated C++ class from the class, which corresponds to the specified type (in case \_parent\_class is not specified).

It is also possible to specify a storage-class modifier, which is required on Microsoft Windows to export/import generated classes from/to a DLL. This setting affects all generated classes in a module. An appropriate section of the definition file should look like this:

    [-]
    _export = EXPORT_SPECIFIER

Because this modifier could also be specified in the [command line](#ch_app.tools_table2), the **DATATOOL** code generator uses the following rules to choose the proper one:

-   If no `-oex` flag is given in the command line, no modifier is added at all.

-   If `-oex ""` (that is, an empty modifier) is specified in the command line, then the modifier from the definition file will be used.

-   The command-line parameter in the form `-oex FOOBAR` will cause the generated classes to have a `FOOBAR` storage-class modifier, unless another one is specified in the definition file. The modifier from the definition file always takes precedence.

<a name="ch_app.datatool.html_refDefSpecific"></a>

#### Definitions That Affect Specific Types

The following additional topics are discussed in this section:

-   [INTEGER, REAL, BOOLEAN, NULL](#ch_app.datatool.html_refDefINT)

-   [ENUMERATED](#ch_app.datatool.html_refDefENUM)

-   [OCTET STRING](#ch_app.datatool.html_refDefOCTETS)

-   [SEQUENCE OF, SET OF](#ch_app.datatool.html_refDefArray)

-   [SEQUENCE, SET](#ch_app.datatool.html_refDefClass)

-   [CHOICE](#ch_app.datatool.html_refDefChoice)

<a name="ch_app.datatool.html_refDefINT"></a>

##### INTEGER, REAL, BOOLEAN, NULL

`_type`      C++ type: int, short, unsigned, long, etc.

<a name="ch_app.datatool.html_refDefENUM"></a>

##### ENUMERATED

`_type`      C++ type: int, short, unsigned, long, etc.

`_prefix`      Prefix for names of enum values. The default is "e".

<a name="ch_app.datatool.html_refDefOCTETS"></a>

##### OCTET STRING

`_char`      Vector element type: char, unsigned char, or signed char.

<a name="ch_app.datatool.html_refDefArray"></a>

##### SEQUENCE OF, SET OF

`_type`      STL container type: list, vector, set, or multiset.

<a name="ch_app.datatool.html_refDefClass"></a>

##### SEQUENCE, SET

`memberName._delay`      Mark the specified member for delayed reading.

<a name="ch_app.datatool.html_refDefChoice"></a>

##### CHOICE

`_virtual_choice`      If not empty, do not generate a special class for choice. Rather make the choice class as the parent one of all its variants.

`variantName._delay`      Mark the specified variant for delayed reading.

<a name="ch_app.The_Special__Section"></a>

#### The Special [-] Section

There is a special section `[-]` allowed in the definition file which can contain definitions related to code generation. This is a good place to define a namespace or identify additional headers. It is a "top level" section, so entries placed here will override entries with the same name in other sections or on the command-line. For example, the following entries set the proper parameters for placing header files alongside source files:

    [-]
    ; Do not use a namespace at all:
    -on  = -

    ; Use the current directory for generated .cpp files:
    -opc = .

    ; Use the current directory for generated .hpp files:
    -oph = .

    ; Do not add a prefix to generated file names:
    -or  = -

    ; Generate #include directives with quotes rather than angle brackets:
    -orq = 1

Any of the code generation arguments in [Table 2](#ch_app.tools_table2) (except `-od`, `-odi`, and `-odw` which are related to specifying the definition file) can be placed in the `[-]` section.

In some cases, the special value `"-"` causes special processing as noted in [Table 2](#ch_app.tools_table2).

<a name="ch_app.datatool.html_refDefExample"></a>

#### Examples

If we have the following ASN.1 specification (this not a "real" specification - it is only for illustration):

    Date ::= CHOICE {
        str VisibleString,
        std Date-std
    }
    Date-std ::= SEQUENCE {
        year INTEGER,
        month INTEGER OPTIONAL
    }
    Dates ::= SEQUENCE OF Date
    Int-fuzz ::= CHOICE {
        p-m INTEGER,
        range SEQUENCE {
            max INTEGER,
            min INTEGER
        },
        pct INTEGER,
        lim ENUMERATED {
            unk (0),
            gt (1),
            lt (2),
            tr (3),
            tl (4),
            circle (5),
            other (255)
        },
        alt SET OF INTEGER
    }

Then the following definitions will effect the generation of objects:

<a name="ch_app.T.nc_definitioneffected_objectsda"></a>

| Definition | Effected Objects |
|---------------------------------------------------------------------|--------------------------------------------------------------------|
| `[Date]`<br/>`str._type = string` | the `str` member of the `Date` structure |
| `[Dates]`<br/>`E._pointer = true` | elements of the `Dates` container |
| `[Int-fuzz]`<br/>`range.min._type = long` | the `min` member of the `range` member of the `Int-fuzz` structure |
| `[Int-fuzz]`<br/>`alt.E._type = long` | elements of the `alt` member of the `Int-fuzz` structure |

<div class="table-scroll"></div>

As another example, suppose you have a ***CatalogEntry*** type comprised of a [Summary](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Summary) element and either a ***RecordA*** element or a ***RecordB*** element, as defined by the following XSD specification:

    <?xml version="1.0" encoding="UTF-8"?>

    <schema
        xmlns="http://www.w3.org/2001/XMLSchema"
        xmlns:tns="https://ncbi.nlm.nih.gov/some/unique/path"
        targetNamespace="https://ncbi.nlm.nih.gov/some/unique/path"
        elementFormDefault="qualified"
    >

        <element name="CatalogEntry" type="tns:CatalogEntryType" />

        <complexType name="CatalogEntryType">
            <sequence>
                <element name="Summary" type="string" />
                <choice>
                    <element name="RecordA" type="int" />
                    <element name="RecordB" type="int" />
                </choice>
            </sequence>
        </complexType>

    </schema>

In this specification, the `<choice>` element in ***CatalogEntryType*** is anonymous, so **DATATOOL** will assign an arbitrary name to it. The assigned name will not be descriptive, but fortunately you can use a definition file to change the assigned name.

First find the **DATATOOL**-assigned name by creating a sample definition file using the `-ods` option:

    datatool -ods -oA -m catalogentry.xsd

The sample definition file (`catalogentry._sample_def`) shows `RR` as the class name:

    [CatalogEntry]
    RR._class = 
    Summary._class = 

Then edit the module definition file (`catalogentry.def`) and change `RR` to a more descriptive class name, for example:

    [CatalogEntry]
    RR._class=CRecordChoice

The new name will be used the next time the module is built.

<a name="ch_app.ch_app_datatool_html_refModFile"></a>

### Module File

Module files are not used directly by **DATATOOL**, but they are read by `new_module.sh` and [project\_tree\_builder](ch_config.html#ch_config._Build_the_Toolkit) and therefore determine what **DATATOOL**'s command line will be when **DATATOOL** is invoked from the NCBI build system.

Module files simply consist of lines of the form "`KEY = VALUE`". Only the key `MODULE_IMPORT` is currently used (and is the only key ever recognized by `project_tree_builder`). Other keys used to be recognized by `module.sh` and still harmlessly remain in some files. The possible keys are:

-   `MODULE_IMPORT`      These definitions contain a space-delimited list of other modules to import. The paths should be relative to `.../src` and should not include extensions.<br/><br/>For example, a valid entry could be:<br/>MODULE\_IMPORT = objects/general/general objects/seq/seq<br/>

-   `MODULE_ASN`, `MODULE_DTD`, `MODULE_XSD`      These definitions explicitly set the specification filename (normally `foo.asn`, `foo.dtd`, or `foo.xsd` for `foo.module`). Almost no module files contain this definition. It is no longer used by the `project_tree_builder` and is therefore not necessary

-   `MODULE_PATH`      Specifies the directory containing the current module, again relative to `.../src`. Almost all module files contain this definition, however it is no longer used by either `new_module.sh` or the `project_tree_builder` and is therefore not necessary.

<a name="ch_app.datatool.html_refCode"></a>

### Generated Code

The following additional topics are discussed in this section:

-   [Normalized name](#ch_app.datatool.html_refNormalizedName)

-   [ENUMERATED types](#ch_app.datatool.html_refCodeEnum)

<a name="ch_app.datatool.html_refNormalizedName"></a>

#### Normalized Name

By default, DATATOOL generates "normalized" C++ class names from ASN.1 type names using two rules:

1.  Convert any hyphens ("***-***") into underscores ("***\_***"), because hyphens are not legal characters in C++ class names.

2.  Prepend a 'C' character.

For example, the default normalized C++ class name for the ASN.1 type name "***Seq-data***" is "[CSeq\_data](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeq_data)".

The default C++ class name can be overridden by explicitly specifying in the definition file a name for a given ASN.1 type name. For example:

    [MyModule.Seq-data]
    _class=CMySeqData

<a name="ch_app.datatool.html_refCodeEnum"></a>

#### ENUMERATED Types

By default, for every `ENUMERATED` ASN.1 type, **DATATOOL** will produce a C++ enum type with the name [ENormalizedName](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ENormalizedName).

<a name="ch_app.dt_inside.html"></a>

### Class Diagrams

The following topics are discussed in this section:

-   [Specification analysis](#ch_app.dt_inside.html_specs)

-   [Data types](#ch_app.dt_inside.html_data_types)

-   [Data values](#ch_app.dt_inside.html_data_values)

-   [Code generation](#ch_app.dt_inside.html_code_gen)

<a name="ch_app.dt_inside.html_specs"></a>

#### Specification Analysis

The following topics are discussed in this section:

-   [ASN.1 specification analysis](#ch_app.dt_inside.html_specs_asn)

-   [DTD specification analysis](#ch_app.dt_inside.html_specs_dtd)

<a name="ch_app.dt_inside.html_specs_asn"></a>

##### ASN.1 Specification Analysis

See [Figure 1](#ch_app.specs_asn).

<a name="ch_app.specs_asn"></a>

[![1. ASN.1 specification analysis.](/cxx-toolkit/static/img/specs_asn.gif)](/cxx-toolkit/static/img/specs_asn.gif "Click to see the full-resolution image")

1. ASN.1 specification analysis.

<a name="ch_app.dt_inside.html_specs_dtd"></a>

##### DTD Specification Analysis

See [Figure 2](#ch_app.specs_dtd).

<a name="ch_app.specs_dtd"></a>

[![2. DTD specification analysis.](/cxx-toolkit/static/img/specs_dtd.gif)](/cxx-toolkit/static/img/specs_dtd.gif "Click to see the full-resolution image")

2. DTD specification analysis.

<a name="ch_app.dt_inside.html_data_types"></a>

#### Data Types

See [CDataType](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCDataType.html).

<a name="ch_app.dt_inside.html_data_values"></a>

#### Data Values

See [Figure 3](#ch_app.data_values).

<a name="ch_app.data_values"></a>

[![3. Data values.](/cxx-toolkit/static/img/data_types.gif)](/cxx-toolkit/static/img/data_types.gif "Click to see the full-resolution image")

3. Data values.

<a name="ch_app.dt_inside.html_code_gen"></a>

#### Code Generation

See [Figure 4](#ch_app.code_gen).

<a name="ch_app.code_gen"></a>

[![4. Code generation.](/cxx-toolkit/static/img/type_strings.gif)](/cxx-toolkit/static/img/type_strings.gif "Click to see the full-resolution image")

4. Code generation.

<a name="ch_app.Load_Balancing"></a>

Load Balancing
--------------

-   [Overview](#ch_app._Overview)

-   [Load Balancing Service Mapping Daemon (LBSMD)](#ch_app.Load_Balancing_Servi)

-   [Database Load Balancing](#ch_app.Database_Load_Balancing)

-   [DISPD Network Dispatcher](#ch_app.DISPD_Network_Dispat)

-   [NCBID Server Launcher](#ch_app.NCBID_Server_Launche)

-   [Firewall Daemon (FWDaemon)](#ch_app.Firewall_Daemon_FWDa)

-   [Launcherd Utility](#ch_app.Launcherd_Utility)

-   [Monitoring Tools](#ch_app.Monitoring_Tools)

-   [Quality Assurance Domain](#ch_app.Quality_Assurance_Do)

***Note:*** For security reasons not all links in the public version of this document are accessible by the outside NCBI users.

The section covers the following topics:

-   The purpose of load balancing

-   All the separate components’ purpose, internal details, configuration

-   Communications between the components

-   Monitoring facilities

<a name="ch_app._Overview"></a>

### Overview

The purpose of load balancing is distributing the load among the service providers available on the NCBI network basing on certain rules. The load is generated by both locally-connected and Internet-connected users. The figures below show the most typical usage scenarios.

[![Image LoadBalancingLocal.jpg](/cxx-toolkit/static/img/LoadBalancingLocal.jpg)](/cxx-toolkit/static/img/LoadBalancingLocal.jpg "Click to see the full-resolution image")

Figure 5. Local Clients

Please note that the figure is slightly simplified to remove unnecessary details for the time being.

In case of local access to the NCBI resources there are two NCBI developed components, which are involved into the interactions. These are LBSMD daemon (Load Balancing Service Mapping Daemon) and mod\_caf (Cookie/Argument Affinity module) - an Apache web server module.

The LBSMD daemon is running on each host in the NCBI network. The daemon reads its configuration file with all the services available on the host described. Then the LBSMD daemon broadcasts the available services and the current host load to the adjacent LBSMD daemons on a regular basis. The data received from the other LBSMD daemons are stored in a special table. So at some stage the LBSMD daemon on each host will have had a full description of the services available on the network as well as the current hosts’ load.

The mod\_caf Apache’s module analyses special cookies, query line arguments and reads data from the table populated by the LBSMD daemon. Basing on the best match it makes a decision of where to pass a request further.

Suppose for a moment that a local NCBI client runs a web browser, points to an NCBI web page and initiates a DB request via the web interface. At this stage the mod\_caf analyses the request line and makes a decision where to pass the request. The request is passed to the ServiceProviderN host which performs the corresponding database query. Then the query results are delivered to the client. The data exchange path is shown on the figure above using solid lines.

Another typical scenario for the local NCBI clients is when client code is run on a user workstation. That client code might require a long term connection to a certain service, to a database for example. The browser is not able to provide this kind of connection so a direct connection is used in this case. The data exchange path is shown on the figure above using dashed lines.

The communication scenarios become more complicated in case when clients are located outside of the NCBI network. The figure below describes the interactions between modules when the user requested a service which does not suppose a long term connection.

[![Image LoadBalancingInternetShort.jpg](/cxx-toolkit/static/img/LoadBalancingInternetShort.jpg)](/cxx-toolkit/static/img/LoadBalancingInternetShort.jpg "Click to see the full-resolution image")

Figure 6. Internet Clients. Short Term Connection

The clients have no abilities to connect to front end Apache web servers directly. The connection is done via a router which is located in DMZ (Demilitarized Zone). The router selects one of the available front end servers and passes the request to that web server. Then the web server processes the request very similar to how it processes requests from a local client.

The next figure explains the interactions for the case when an Internet client requests a service which supposes a long term connection.

[![Image LoadBalancingInternetLong.jpg](/cxx-toolkit/static/img/LoadBalancingInternetLong.jpg)](/cxx-toolkit/static/img/LoadBalancingInternetLong.jpg "Click to see the full-resolution image")

Figure 7. Internet Clients. Long Term Connection

In opposite to the local clients the internet clients are unable to connect to the required service directly because of the DMZ zone. This is where DISPD, FWDaemon and a proxy come to help resolving the problem.

The data flow in the scenario is as follows. A request from the client reaches a front end Apache server as it was discussed above. Then the front end server passes the request to the DISPD dispatcher. The DISPD dispatcher communicates to FWDaemon (Firewall Daemon) to provide the required service facilities. The FWDaemon answers with a special ticket for the requested service. The ticket is sent to the client via the front end web server and the router. Then the client connects to the NAT service in the DMZ zone providing the received ticket. The NAT service establishes a connection to the FWDaemon and passes the received earlier ticket. The FWDaemon, in turn, provides the connection to the required service. It is worth to mention that the FWDaemon is running on the same host as the DISPD dispatcher and neither DISPD nor FWDaemon can work without each other.

The most complicated scenario comes to the picture when an arbitrary Unix filter program is used as a service provided for the outside NCBI users. The figure below shows all the components involved into the scenario.

[![Image LoadBalancingDispD.jpg](/cxx-toolkit/static/img/LoadBalancingDispD.jpg)](/cxx-toolkit/static/img/LoadBalancingDispD.jpg "Click to see the full-resolution image")

Figure 8. NCBID at Work

The data flow in the scenario is as follows. A request from the client reaches a front end Apache server as it was discussed above. Then the front end server passes the request to the DISPD dispatcher. The DISPD communicates to both the FWDaemon and the NCBID utility on (possibly) the other host and requests to demonize a requested Unix filter program (Service X on the figure). The demonized service starts listening on the certain port for a network connection. The connection attributes are delivered to the FWDaemon and to the client via the web front end and the router. The client connects to the NAT service and the NAT service passes the request further to the FWDaemon. The FWDaemon passes the request to the demonized Service X on the Service Provider K host. Since that moment the client is able to start data exchange with the service. The described scenario is purposed for long term connections oriented tasks.

Further sections describe all the components in more detail.

<a name="ch_app.Load_Balancing_Servi"></a>

### Load Balancing Service Mapping Daemon (LBSMD)

<a name="ch_app._Overview_1"></a>

#### Overview

As mentioned earlier, the LBSMD daemon runs almost on every host that carries either public or private servers which, in turn, implement NCBI services. The services include CGI programs or standalone servers to access NCBI data.

Each service has a unique name assigned to it. The “TaxService” would be an example of such a name. The name not only identifies a service. It also implies a protocol which is used for data exchange with that service. For example, any client which connects to the “TaxService” service knows how to communicate with that service regardless the way the service is implemented. In other words the service could be implemented as a standalone server on host X and as a CGI program on the same host or on another host Y (please note, however, that there are exceptions and for some service types it is forbidden to have more than one service type on the same host).

A host can advertize many services. For example, one service (such as “Entrez2”) can operate with binary data only while another one (such as “Entrez2Text”) can operate with text data only. The distinction between those two services could be made by using a content type specifier in the LBSMD daemon configuration file.

The main purpose of the LBSMD daemon is to maintain a table of all services available at NCBI at the moment. In addition the LBSMD daemon keeps track of servers that are found to be dysfunctional (dead servers). The daemon is also responsible for propagating trouble reports, obtained from applications. The application trouble reports are based on their experience with advertised servers (e.g., an advertised server is not technically marked dead but generates some sort of garbage). Further in this document, the latter kind of feedback is called a penalty.

The principle of load balancing is simple: each server which implements a service is assigned a (calculated) rate. The higher the rate, the better the chance for that server to be chosen when a request for the service comes up. Note that load balancing is thus almost never deterministic.

The LBSMD daemon calculates two parameters for the host on which it is running. The parameters are a normal host status and a BLAST host status (based on the instant load of the system). These parameters are then used to calculate the rate of all (non static) servers on the host. The rates of all other hosts are not calculated but received and stored in the LBSMD table.

The LBSMD daemon can be restarted from a crontab every few minutes on all the production hosts to ensure that the daemon is always running. This technique is safe because no more than one instance of the daemon is permitted on a certain host and any attempt to start more than one is ignored. Normally, though, a running daemon instance is maintained afloat by some kind of monitoring software, such as “puppet” or “monit” that makes use of the crontabs unnecessary.

The main loop of the LBSMD daemon:

-   periodically checks the configuration file and reloads the configuration when necessary;

-   checks for and processes incoming messages from neighbor LBSMD daemons running on other hosts; and

-   generates and broadcasts the messages to the other hosts about the load of the system and configured services.

The LBSMD daemon can also periodically check whether the configured servers are alive: either by trying to establish a connection to them (and then disconnecting immediately, without sending/receiving any data) and / or by using a special plugin script that can do more intelligent, thorough, and server-specific diagnostics, and report the result back to LBSMD via an exit code.

Lastly, LBSMD can pull port load information as posted by the running servers. This is done via a simple API <https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/include/connect/daemons/lbsmdapi.h>. The information is then used to calculate the final server rates in run-time.

Although cients can [redirect services](ch_conn.html#ch_conn.Service_Redirection), LBSMD does not distinguish between direct and redirected services.

<a name="ch_app._Configuration"></a>

#### Configuration

The LBSMD daemon is configured via command line options and via a configuration file. The full list of command line options can be retrieved by issuing the following command:

`/opt/machine/lbsm/sbin/lbsmd --help`

The local NCBI users can also visit the following link:

<https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmd.cgi>

The default name of the LBSMD daemon configuration file is `/etc/lbsmd/servrc.cfg`. Each line can be one of the following:

-   an include directive

-   site / zone designation

-   host authority information

-   a monitored port designation

-   a part of the host environment

-   a service definition

-   an empty line (entirely blank or containing a comment only)

Empty lines are ignored in the file. Any single configuration line can be split into several physical lines by inserting backslash symbols (\\) before the line breaks. A comment is introduced by the pound/hash symbol (\#).

A configuration line of the form

    %include filename

causes the contents of the named file **`filename`** to be inserted here. The daemon always assumes that relative file names (those that do not start with the slash character, /) are based on the daemon startup directory. This is true for any level of nesting.

Once started, the daemon first tries to read its configuration from `/etc/lbsmd/servrc.cfg`. If the file is not found (or is not readable) the daemon looks for the configuration file `servrc.cfg` in the directory from which it has been started. This fallback mechanism is not used when the configuration file name is explicitly stated in the command line. The daemon periodically checks the configuration file and all of its descendants and reloads (discards) their contents if some of the files have been either updated, (re-)moved, or added.

The “**`filename`**” can be followed by a pipe character ( \| ) and some text (up to the end of the line or the comment introduced by the hash character). That text is then prepended to every line (but the `%include` directives) read from the included file.

A configuration line of the form

    @zone

specifies the zone to which the entire configuration file applies, where a zone is a subdivision of the existing broadcast domain which does not intermix with other unrelated zones. Only one zone designation is allowed, and it must match the predefined site information (the numeric designation of the entire broadcast domain, which is either “guessed” by LBSMD or preset via a command-line parameter): the zone value must be a binary subset of the site value (which is usually a contiguous set of 1-bits, such as `0xC0` or `0x1E`).

When no zone is specified, the zone is set equal to the entire site (broadcast domain) so that any regular service defined by the configuration is visible to each and every LBSMD running at the same site. Otherwise, only the servers with bitwise-matching zones are visible to each other: if 1, 2, and 3 are the zones of hosts “X”, “Y” and “Z”, respectively (all hosts reside within the same site, say 7), then servers from “X” are visible by “Z”, but not by “Y”; servers from “Y” are visible by “Z” but not by “X”; and finally, all servers from “Z” are visible by both “X” and “Y”. There’s a way to define servers at “X” to be visible by “Y” using an “Inter” server flag (see below).

A configuration line of the form

    [*]user

introduces a user that is added to the host authority. There can be multiple authority lines across the configuration, and they are all aggregated into a list. The list can contain both individual user names and / or group names (denoted by a preceding asterisk). The listed users and / or members of the listed groups, will be allowed to operate on all server records that appear in the LBSMD configuration files on this host (individual server entries may designate additional personnel on a per-server basis). Additional authority entries are only allowed from the same branch of the configuration file tree: so if a file “a” includes a file “b”, where the first host authority is defined, then any file that is included (directly or indirectly) from “b” can add entries to the host authority, while no other file that is included later from “a”, can.

A configuration line of the form

    :port

designates a local network port for monitoring by LBSMD: the daemon will regularly pull the port information as provided by servers in run-time: total port capacity, used capacity and free capacity; and make these values available in the load-balance messages sent to other LBSMDs. The ratio “free” over “total” will be used to calculate the port availability (1.0=fully free, 0.0=fully clogged). Servers may use arbitrary units to express the capacity, but both “used” and “free” may not be greater than “total”, and “used” must correspond to the actual used resource, yet “free” may be either calculated (e.g. algorithmically decreased in anticipation of the mouting load in order to shrink the port availability ratio quicker) or simply amounts to “total” – “used”. Note that “free” set to “0” signals the port as currently being unavailable for service (i.e. as if the port was down) – and an automatic connection check, if any, will not be performed by LBSMD on that port.

A configuration line of the form

    name=value

goes into the host environment. The host environment can be accessed by clients when they perform the service name resolution. The host environment is designed to help the client to know about limitations/options that the host has, and based on this additional information the client can make a decision whether the server (despite the fact that it implements the service) is suitable for carrying out the client's request. For example, the host environment can give the client an idea about what databases are available on the host. The host environment is not interpreted or used in any way by either the daemon or by the load balancing algorithm, except that the name must be a valid identifier. The value may be practically anything, even empty. It is left solely for the client to parse the environment and to look for the information of interest. The host environment can be obtained from the service iterator by a call to `SERV_GetNextInfoEx()` (<https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_GetNextInfoEx>), which is documented in the [service mapping API](ch_conn.html#ch_conn.service_mapping_api)

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): White space characters which surround the name are not preserved but they are preserved in the value i.e. when they appear after the “=” sign.

A configuration line of the form

    service_name [check_specifier] server_descriptor [| launcher_info ]

defines a server. The detailed description of the individual fields is given below.

-   **`service_name`** specifies the service name that the server is part of, for example TaxService. The same **`service_name`** may be used in multiple server definition lines to add more servers implementing that service.

-   **`[check_specifier]`** is an optional parameter (if omitted, the surrounding square brackets must not be used). The parameter is a comma separated list and each element in the list can be one of the following.

    -   **`[-]N[/M]`** where N and M are integers. This will lead to checking every N seconds with backoff time of M seconds if failed. The “-“ character is used when it is required to check dependencies only, but not the primary connection point. "0", which stands for "no check interval", disables checks for the service.

    -   **`[!][host[:port]][+[service]]`** which describes a dependency. The “!” character means negation. The **`service`** is a service name the describing service depends on and runs on **`host:port`**. The pair **`host:port`** is required if no service is specified. The **`host`**, :**`port`**, or both can be missing if **`service`** is specified (in that case the missing parts are read as “any”). The “+” character alone means “this service’s name” (of the one currently being defined). Multiple dependency specifications are allowed.

    -   **`[~][DOW[-DOW]][@H[-H]]`** which defines a schedule. The “~” character means negation. The service runs from **`DOW`** to **`DOW`** (**`DOW`** is one of Su, Mo, Tu, We, Th, Fr, Sa, or Hd, which stands for a federal holiday, and cannot be used in weekday ranges) or any if not specified, and between hours **`H`** to **`H`** (9-5 means 9:00am thru 4:59pm, 18-0 means 6pm thru midnight). Single **`DOW`** and / or **`H`** are allowed and mean the exact day of week (or a holiday) and / or one exact hour. Multiple schedule specifications are allowed.

    -   **`email@ncbi.nlm.nih.gov`** which makes the LBSMD daemon to send an e-mail to the specified address whenever this server changes its status (e.g. from up to down). Multiple e-mail specifications are allowed. The **`ncbi.nlm.nih.gov`** part is fixed and may not be changed.

    -   **`user`** or **`*group`** which makes the LBSMD daemon add the specified user or group of users to the list of personnel who are authorized to modify the server (e.g. post a penalty, issue a rerate command etc.). By default these actions are only allowed to the **`root`** and **`lbsmd`** users, as well as users added to the host authority. Multiple specifications are allowed.

    -   **`script`** which specifies a path to a local executable which checks whether the server is operational. The LBSMD daemon starts this script periodically as specified by the check time parameter(s) above. Only a single script specification is allowed. See [Check Script Specification](#ch_app.Check_Script_Specification) for more details.

-   **`server_descriptor`** specifies the address of the server and supplies additional information. An example of the **`server_descriptor`**:<br/>`STANDALONE somehost:1234 R=3000 L=yes S=yes B=-20`<br/>See [Server Descriptor Specification](#ch_app.Server_Descriptor_Specification) for more details.

-   **`launcher_info`** is basically a command line preceded by a pipe symbol ( \| ) which plays a role of a delimiter from the **`server_descriptor`**. It is only required for the **NCBID** type of service which are configured on the local host.

<a name="ch_app.Check_Script_Specification"></a>

##### Check Script Specification

The check script file is configured between square brackets '[' and ']' in the service definition line. For example, the service definition line:

`MYSERVICE [5, /bin/user/directory/script.sh] STANDALONE :2222 ...`

sets the period in seconds between script checks as "`5`" (the default period is 15 seconds) and designates the check script file as "`/bin/user/directory/script.sh`" to be launched every 5 seconds. You can prefix the period with a minus sign (-) to indicate that LBSMD should not check the connection point (:2222 in this example) on its own, but should only run the script. The script must finish before the next check run is due. Otherwise, LBSMD will kill the script and ignore the result. Multiple repetitive failures may result in the check script removal from the check schedule.

The following command-line parameters are always passed to the script upon execution:

-   **`argv[0]`** = name of the executable with preceding '\|' character if **`stdin`** / **`stdout`** are open to the server connection (/dev/null otherwise), ***NB***: '\|' is not always readily accessible from within shell scripts, so it's duplicated in **`argv[2]`** for convenience;

-   **`argv[1]`** = name of the service being checked;

-   **`argv[2]`** = if piped, "\|host:port" of the connection point being checked, otherwise "host:port" of the server as per configuration;

The following additional command-line parameters will be passed to the script if it has been run before:

-   **`argv[3]`** = exit code obtained in the last check script run;

-   **`argv[4]`** = repetition count for **`argv[3]`** (***NB***: 0 means this is the first occurrence of the exit code given in **`argv[3]`**);

-   **`argv[5]`** = seconds elapsed since the last check script run.

Output to **`stderr`** is attached to the LBSMD log file; the CPU limit is set to maximal allowed execution time. Nevertheless, the check must finish before the next invocation is due, per the server configuration.

The check script is expected to produce one of the following exit codes:

<a name="ch_app.T.nc_codesmeaning0the_server_is_f"></a>

| Code(s) | Meaning |
|---------|---------|
| 0 | The server is fully available, i.e. "running at full throttle". |
| 1 - 99 | Indicates the approximate percent of base capacity used. |
| 100 - 110 | Server state is set as RESERVED. RESERVED servers are unavailable to most clients but not considered as officially DOWN. |
| 111 - 120 | The server is not available and must not be used, i.e. DOWN. |
| 123 | Retain the previous exit code (as supplied in **`argv[3]`**) and increment the repetition count. Retain the current server state, otherwise, and log a warning. |
| 124 (*not* followed by 125) | Retain the current server state. |
| 124 followed by 125 | Turn the server off, with no more checks. ***Note:*** This only applies when 124 is followed by 125, both without repetitions. |
| 125 (*not* preceded by 124) | Retain the current server state. |
| 126 | Script was found but not executable (POSIX, script error). |
| 127 | Script was not found (POSIX, script error). |
| 200 - 210 | STANDBY server (set the rate to 0.005). The rate will be rolled back to the previously set "regular" rate the next time the RERATE command comes; or when the check script returns anything other than 123, 124, 125, or the state-retaining ALERTs (211-220).<br/><br/>STANDBY servers are those having base rate in the range [0.001..0.009], with higher rates having better chance to get drafted for service. STANDBY servers are only used by clients if there are no usable non-STANDBY counterparts found. |
| 211 - 220 | ALERT (email contacts and retain the current server state). |
| 221 - 230 | ALERT (email contacts and base the server rate on the dependency check only). |

<div class="table-scroll"></div>

Exit codes 126, 127, and other unlisted codes are treated as if 0 had been returned (i.e. the server rate is based on the dependency check only).

Any exit code other than 123 resets the repetition count, even though the new code may be equal to the previous one. In the absence of a previous code, exit code 123 will not be counted as a repetition, will cause a warning to be logged.

Any exit code *not* from the table above will cause a warning to be logged, and will be treated as if 0 has been returned. Note that upon the exit code sequence 124,125 no further script runs will occur, and the server will be taken out of service.

If the check script crashes ungracefully (with or without the coredump) 100+ times in a row, it will be eliminated from further checks, and the server will be considered fully available (i.e. as if 0 had been returned).

Servers are called SUPPRESSED when they are 100% penalized (see server penalties below); while RESERVED is a special state that LBSMD maintains. 100% penalty makes an entry not only unavailable for regular use (same as RESERVED) but also assumes some maintenance work in progress (so that any underlying state changes will not be announced immediately but only when the entry goes out of the 100% penalized state, if any state change still remains). On the other hand and from the client perspective, RESERVED and SUPPRESSED may look identical.

***Note:*** The check script operation is complementary to setting a penalty prior to doing any disruptive changes in production. In other words, the script is only reliable as long as the service is expected to work. If there is any scheduled maintenance, it should be communicated to LBSMD via a penalty rather than by an assumption that the failing script will do the job of bringing the service to the down state and excluding it from LB.

<a name="ch_app.Server_Descriptor_Specification"></a>

##### Server Descriptor Specification

The **`server_descriptor`**, also detailed in `connect/ncbi_server_info.h` (<https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_server_info.h>), consists of the following fields:

`server_type [host][:port] [arguments] [flags]`

where:

-   **`server_type`** is one of the following keywords ([more info](ch_conn.html#ch_conn.service_connector)):

    -   ***NCBID*** for servers launched by ncbid.cgi

    -   ***STANDALONE*** for standalone servers listening to incoming connections on dedicated ports

    -   ***HTTP\_GET*** for servers, which are the CGI programs accepting only the GET request method

    -   ***HTTP\_POST*** for servers, which are the CGI programs accepting only the POST request method

    -   ***HTTP*** for servers, which are the CGI programs accepting either GET or POST request methods

    -   ***DNS*** for introduction of a name (fake service), which can be used later in load-balancing for domain name resolution

    -   ***NAMEHOLD*** for declaration of service names that cannot be defined in any other configuration files except for the current configuration file. ***Note:*** The FIREWALL server specification may not be used in a configuration file (i.e., may neither be declared as services nor as service name holders).

-   both **`host`** and **`port`** parameters are optional. Defaults are local host and port 80, except for ***STANDALONE*** and ***DNS*** servers, which do not have a default port value. If host is specified (by either of the following: keyword localhost, localhost IP address 127.0.0.1, real host name, or IP address) then the described server is not a subject for variable load balancing but is a static server. Such server always has a constant rate, independent of any host load.

-   **`arguments`** are required for HTTP\* servers and must specify the local part of the URL of the CGI program and, optionally, parameters such as `/somepath/somecgi.cgi?param1&param2=value2&param3=value3`. If no parameters are to be supplied, then the question mark (?) must be omitted, too. For **NCBID** servers, arguments are parameters to pass to the server and are formed as arguments for CGI programs, i.e., param1&param2&param3=value. As a special rule, '' (two single quotes) may be used to denote an empty argument for the **NCBID** server. ***STANDALONE*** and ***DNS*** servers do not take any **`arguments`**.

-   **`flags`** can come in any order (but no more than one instance of a flag is allowed) and essentially are the optional modifiers of values used by default. The following flags are recognized (see [ncbi\_server\_info.h](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_server_info.h)):

    -   load calculation keyword:

        -   ***Blast*** to use special algorithm for rate calculation acceptable for BLAST (<https://www.ncbi.nlm.nih.gov/blast/Blast.cgi>) applications. The algorithm uses instant values of the host load and thus is less conservative and more reactive than the ordinary one.

        -   ***Regular*** to use an ordinary rate calculation (default, and the only load calculation option allowed for static servers).

    -   Either of these keywords may be suffixed with “Inter”, such as to form ***RegularInter***, making the entry to cross the current zone boundary, and being available outside its zone.

-   base rate:

    -   R=value sets the base server reachability rate (as a floating point number); the default is 1000. Any negative value makes the server unreachable, and a value 0 means to use the default (which is 1000). The range of the base rate is between 0.001 and 100000. Note that the range [0.001—0.009] is reverved for STANDBY servers – the ones that are only used by clients if no other usable non-STANDBY counterparts can be found.

-   locality markers (Note: If necessary, both L and P markers can be combined in a particular service definition):

    -   L={yes\|no} sets (if yes) the server to be local only. The default is no. The [service mapping API](ch_conn.html#ch_conn.service_mapping_api) returns local only servers in the case of mapping with the use of LBSMD running on the same - local - host (direct mapping), or if the dispatching (indirect mapping) occurs within the NCBI Intranet. Otherwise, if the service mapping occurs using a non-local network (certainly indirectly, by exchange with dispd.cgi) then servers that are local only are not seen.

    -   P={yes\|no} sets (if yes) the server to be private. The default is no. Private servers are not seen by the outside NCBI users (exactly like local servers), but in addition these servers are not seen from the NCBI Intranet if requested from a host, which is different from one where the private server runs. This flag cannot be used for DNS servers.

-   Stateful server:

    -   S={yes\|no}. The default is no.<br/>Indication of stateful server, which allows only dedicated socket (stateful) connections. This tag is not allowed for HTTP\* and DNS servers.

-   Secure server:

    -   $={yes\|no}. The default is no.<br/>Indication of the server to be used with secure connections only. For STANDALONE servers it means to use SSL, and for the HTTP\* ones – to use the HTTPS protocol.

-   Content type indication:

    -   C=type/subtype [no default]<br/>specification of Content-Type (including encoding), which server accepts. The value of this flag gets added automatically to any HTTP packet sent to the server by SERVICE connector. However, in order to communicate, a client still has to know and generate the data type accepted by the server, i.e. a protocol, which server understands. This flag just helps insure that HTTP packets all get proper content type, defined at service configuration. This tag is not allowed in DNS server specifications.

-   Bonus coefficient:

    -   B=double [0.0 = default]<br/>specifies a multiplicative bonus given to a server run locally, when calculating reachability rate. Special rules apply to negative/zero values: 0.0 means not to use the described rate increase at all (default rate calculation is used, which only slightly increases rates of locally run servers). Negative value denotes that locally run server should be taken in first place, regardless of its rate, if that rate is larger than percent of expressed by the absolute value of this coefficient of the average rate coefficient of other servers for the same service. That is -5 instructs to ignore locally run server if its status is less than 5% of average status of remaining servers for the same service.

-   Validity period:

    -   T=integer [0 = default]<br/>specifies the time in seconds this server entry is valid without update. (If equal to 0 then defaulted by the LBSM Daemon to some reasonable value.)

Server descriptors of type ***NAMEHOLD*** are special. As **`arguments`**, they have only a server type keyword. The namehold specification informs the daemon that the service of this name and type is not to be defined later in any configuration file except for the current one. Also, if the host (and/or port) is specified, then this protection works only for the service name on the particular host (and/or port).

***Note:*** it is recommended that a dummy port number (such as :0) is always put in the namehold specifications to avoid ambiguities with treating the server type as a host name. The following example disables **`TestService`** of type ***DNS*** from being defined in all other configuration files included later, and **`TestService2`** to be defined as a **NCBID** service on host foo:

    TestService  NAMEHOLD    :0 DNS
    TestService2 NAMEHOLD foo:0 NCBID

<a name="ch_app.Sites"></a>

#### Sites

LBSMD is minimally aware of NCBI network layout and can generally guess its “site” information from either an IP address or special location-role files located in the /etc/ncbi directory: a BE-MD production and development site, a BE-MD.QA site, a BE-MD.TRY site, and lastly an ST-VA site. When reading zone information from the “@” directive of the configuration, LBSMD can treat special non-numeric values as the following: “@try” as the production zone within BE-MD.TRY, “@qa” as the production zone within BE-MD.QA, “@dev” as a development zone within the current site, and “@\*prod\*” (e.g. @intprod) as a production zone within the current site – where the production zone has a value of “1” and the development – “2”: so “@2” and “@dev” as well as “@1” and “@\*prod\*” are each equivalent. That makes the definition of zones more convenient by the %include directive with the pipe character:

    %include /etc/ncbi/role |@    # define zone via the role file 

Suppose that the daemon detected its site as ST-VA and assigned it a value of 0x300; then the above directive assigns the current zone the value of 0x100 if the file reads “prod” or “1”, and zone 0x200 if the file reads “dev” or “2”. Note that if the file reads either “try” or “qa”, or “4”, the implied “@” directive will flag an error because of the mismatch between the resultant zone and the current site values.

Both zone and site (or site alone) can be permanently assigned with the command-line parameters and then may not be overridden from the configuration file(s).

<a name="ch_app.Signals"></a>

#### Signals

The table below describes the LBSMD daemon signal processing.

<a name="ch_app.T.nc_SignalReactionSIGHUPreload_t"></a>

|---------|---------------------------------------------------------------------------------------------------------------------------|
| Signal | Reaction |
| SIGHUP | reload the configuration |
| SIGINT | quit |
| SIGTERM | quit |
| SIGUSR1 | toggle the verbosity level between less verbose (default) and more verbose (when every warning generated is stored) modes |

<div class="table-scroll"></div>

<a name="ch_app.Automatic_Configurat"></a>

#### Automatic Configuration Distribution

The configuration files structure is unified for all the hosts in the NCBI network. It is shown on the figure below.

[![Image ch\_app\_lbsmd\_cfg\_structure.png](/cxx-toolkit/static/img/ch_app_lbsmd_cfg_structure.png)](/cxx-toolkit/static/img/ch_app_lbsmd_cfg_structure.png "Click to see the full-resolution image")

Figure 9. LBSMD Configuration Files Structure

The common for all the configuration file prefix `/etc/lbsmd` is omitted on the figure. The arrows on the diagram show how the files are included.

The files `servrc.cfg` and `servrc.cfg.systems` have fixed structure and should not be changed at all. The purpose of the file `local/servrc.cfg.systems` is to be modified by the systems group while the purpose of the file `local/servrc.cfg.ieb` is to be modified by the delegated members of the respected groups. To make it easier for changes all the `local/servrc.cfg.ieb` files from all the hosts in the NCBI network are stored in a centralized SVN repository. The repository can be received by issuing the following command:

`svn co svn+ssh://subvert.be-md.ncbi.nlm.nih.gov/export/home/LBSMD_REPO`

The file names in that repository match the following pattern:

`hostname.{be-md|st-va}[.qa]`

where `be-md` is used for Bethesda, MD site and `st-va` is used for Sterling, VA site. The optional `.qa` suffix is used for quality assurance department hosts.

So, if it is required to change the `/etc/lbsmd/local/servrc.cfg.ieb` file on the sutils1 host in Bethesda the `sutils1.be-md` file is to be changed in the repository.

As soon as the modified file is checked in the file will be delivered to the corresponding host with the proper name automatically. The changes will take effect in a few minutes. The process of the configuration distribution is illustrated on the figure below.

[![Image CFEngine.jpg](/cxx-toolkit/static/img/CFEngine.jpg)](/cxx-toolkit/static/img/CFEngine.jpg "Click to see the full-resolution image")

Figure 10. Automatic Configuration Distribution

<a name="ch_app.Monitoring_and_Contr"></a>

#### Monitoring and Control

<a name="ch_app.Service_Search"></a>

##### Service Search

The following web page can be used to search for a service:

<https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmc/search.cgi>

The following screen will appear

[![Image LBSMDSearchMain.gif](/cxx-toolkit/static/img/LBSMDSearchMain.gif)](/cxx-toolkit/static/img/LBSMDSearchMain.gif "Click to see the full-resolution image")

Figure 11. NCBI Service Search Page

As an example of usage a user might enter the partial name of the service like "TaxService" and click on the “Go” button. The search results will display "TaxService", "TaxService3" and "TaxService3Test" if those services are available (see <https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmc/search.cgi?key=rb_svc&service=TaxService&host=&button=Go&db=>).

<a name="ch_app.lbsmc_Utility"></a>

##### lbsmc Utility

Another way of monitoring the LBSMD daemon is using the lbsmc (<https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/lbsmc.c>) utility. The utility periodically dumps onto the screen a table which represents the current content of the LBSMD daemon table. The utility output can be controlled by a number of command line options. The full list of available options and their description can be obtained by issuing the following command:

`lbsmc -h`

The NCBI intranet users can also get the list of options by clicking on this link: <https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmc.cgi?-h>.

For example, to print a list of hosts which names match the pattern “sutil\*” the user can issue the following command:

    >./lbsmc -h sutil* 0
    LBSMC - Load Balancing Service Mapping Client R100432
    03/13/08 16:20:23 ====== widget3.be-md.ncbi.nlm.nih.gov (00:00) ======= [2] V1.2
    Hostname/IPaddr Task/CPU LoadAv LoadBl    Joined      Status   StatBl
    sutils1          151/4     0.06   0.03  03/12 13:04   397.62  3973.51
    sutils2          145/4     0.17   0.03  03/12 13:04   155.95  3972.41
    sutils3          150/4     0.20   0.03  03/12 13:04   129.03  3973.33
    --------------------------------------------------------------------------------
    Service             T    Type    Hostname/IPaddr:Port LFS   B.Rate Coef   Rating
    bounce            +25    NCBID   sutils1:80           L    1000.00        397.62
    bounce            +25    HTTP    sutils1:80                1000.00        397.62
    bounce            +25    NCBID   sutils2:80           L    1000.00        155.95
    bounce            +25    HTTP    sutils2:80                1000.00        155.95
    bounce            +27    NCBID   sutils3:80           L    1000.00        129.03
    bounce            +27    HTTP    sutils3:80                1000.00        129.03
    dispatcher_lb      25     DNS    sutils1:80                1000.00        397.62
    dispatcher_lb      25     DNS    sutils2:80                1000.00        155.95
    dispatcher_lb      27     DNS    sutils3:80                1000.00        129.03
    MapViewEntrez      25 STANDALONE sutils1:44616        L S  1000.00        397.62
    MapViewEntrez      25 STANDALONE sutils2:44616        L S  1000.00        155.95
    MapViewEntrez      27 STANDALONE sutils3:44616        L S  1000.00        129.03
    MapViewMeta        25 STANDALONE sutils2:44414        L S     0.00          0.00
    MapViewMeta        27 STANDALONE sutils3:44414        L S     0.00          0.00
    MapViewMeta        25 STANDALONE sutils1:44414        L S     0.00          0.00
    sutils_lb          25     DNS    sutils1:80                1000.00        397.62
    sutils_lb          25     DNS    sutils2:80                1000.00        155.95
    sutils_lb          27     DNS    sutils3:80                1000.00        129.03
    TaxService         25    NCBID   sutils1:80                1000.00        397.62
    TaxService         25    NCBID   sutils2:80                1000.00        155.95
    TaxService         27    NCBID   sutils3:80                1000.00        129.03
    TaxService3       +25  HTTP_POST sutils1:80                1000.00        397.62
    TaxService3       +25  HTTP_POST sutils2:80                1000.00        155.95
    TaxService3       +27  HTTP_POST sutils3:80                1000.00        129.03
    test              +25    HTTP    sutils1:80                1000.00        397.62
    test              +25    HTTP    sutils2:80                1000.00        155.95
    test              +27    HTTP    sutils3:80                1000.00        129.03
    testgenomes_lb     25     DNS    sutils1:2441              1000.00        397.62
    testgenomes_lb     25     DNS    sutils2:2441              1000.00        155.95
    testgenomes_lb     27     DNS    sutils3:2441              1000.00        129.03
    testsutils_lb      25     DNS    sutils1:2441              1000.00        397.62
    testsutils_lb      25     DNS    sutils2:2441              1000.00        155.95
    testsutils_lb      27     DNS    sutils3:2441              1000.00        129.03
    --------------------------------------------------------------------------------
    * Hosts:4\747, Srvrs:44/1223/23 |   Heap:249856, used:237291/249616, free:240 *
    LBSMD PID: 17530, config: /etc/lbsmd/servrc.cfg

<a name="ch_app.NCBI_Intranet_Web_Ut"></a>

##### NCBI Intranet Web Utilities

The NCBI intranet users can also visit the following quick reference links:

-   Dead servers list: <https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmc.cgi?-h+none+-w+-d>

-   Search engine for all available hosts, all services and database affiliation: <https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmc/search.cgi?key=rb_svc&service=&host=&button=Go&db=>

If the lbsmc utility is run with the -f option then the output contains two parts:

-   The host table. The table is accompanied by raw data which are printed in the order they appear in the LBSMD daemon table.

-   The service table

The output is provided in either long or short format. The format depends on whether the -w option was specified in the command line (the option requests the long (wide) output). The wide output occupies about 132 columns, while the short (normal) output occupies only 80, which is the standard terminal width.

In case if the service name is more than the allowed number of characters to display the trailing characters will be replaced with “\>”. When there is more information about the host / service to be displayed the “+” character is put beside the host / service name (this additional information can be retrieved by adding the -i option). When both “+” and “\>” are to be shown they are replaced with the single character “\*”. In the case of wide-output format the “\#” character shown in the service line means that there is no host information available for the service (similar to the static servers). The “!” character in the service line denotes that the service was configured / stored with an error (this character actually should never appear in the listings and should be reported whenever encountered). Wide output for hosts contains the time of bootup and startup. If the startup time is preceded by the “~” character then the host was gone for a while and then came back while the lbsmc utility was running. The “+” character in the times is to show that the date belongs to the past year(s).

<a name="ch_app.Server_Penalizer_API"></a>

##### Server Penalizer API and Utility

The utility allows to report problems of accessing a certain server to the LBSMD daemon, in the form of a penalty which is a value in the range [0..100] that shows, in percentages, how bad the server is. The value 0 means that the server is completely okay, whereas 100 means that the server (is misbehaving and) should **not** be used at all. The penalty is not a constant value: once set, it starts to decrease in time, at first slowly, then faster and faster until it reaches zero. This way, if a server was penalized for some reason and later the problem has been resolved, then the server becomes available gradually as its penalty (not being reset by applications again in the absence of the offending reason) becomes zero. The figure below illustrates how the value of penalty behaves.

[![Image Penalty.jpg](/cxx-toolkit/static/img/Penalty.jpg)](/cxx-toolkit/static/img/Penalty.jpg "Click to see the full-resolution image")

Figure 12. Penalty Value Characteristics

Technically, the penalty is maintained by a daemon, which has the server configured, i.e., received by a certain host, which may be different from the one where the server was put into the configuration file. The penalty first migrates to that host, and then the daemon on that host announces that the server was penalized.

***Note:*** Once a daemon is restarted, the penalty information is lost.

[Service mapping API](ch_conn.html#ch_conn.service_mapping_api) has a call `SERV_Penalize()` (<https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SERV_Penalize>) declared in `connect/ncbi_service.h` (<https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/connect/ncbi_service.h>), which can be used to set the penalty for the last server obtained from the mapping iterator.

For script files (similar to the ones used to start/stop servers), there is a dedicated utility program called `lbsm_feedback` (<https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr/source/src/connect/daemons/lbsm_feedback.c>), which sets the penalty from the command line. This command should be used with extreme care because it affects the load-balancing mechanism substantially,.

**lbsm\_feedback** is a part of the LBSM set of tools installed on all hosts which run **LBSMD**. As it was explained above, penalizing means to make a server less favorable as a choice of the load balancing mechanism. Because of the fact that the full penalty of 100% makes a server unavailable for clients completely, at the time when the server is about to shut down (restart), it is wise to increase the server penalty to the maximal value, i.e. to exclude the server from the service mapping. (Otherwise, the LBSMD daemon might not immediately notice that the server is down and may continue dispatching to that server.) Usually, the penalty takes at most 5 seconds to propagate to all participating network hosts. Before an actual server shutdown, the following sequence of commands can be used:

    > /opt/machine/lbsm/sbin/lbsm_feedback 'Servicename STANDALONE host 100 120'
    > sleep 5
    now you can shutdown the server

The effect of the above is to set the maximal penalty 100 for the service Servicename (of type ***STANDALONE***) running on host **`host`** for at least 120 seconds. After 120 seconds the penalty value will start going down steadily and at some stage the penalty becomes 0. The default hold time equals 0. It takes some time to deliver the penalty value to the other hosts on the network so ‘sleep 5’ is used. Please note the single quotes surrounding the penalty specification: they are required in a command shell because **lbsm\_feedback** takes only one argument which is the entire penalty specification.

As soon as the server is down, the **LBSMD** daemon detects it in a matter of several seconds (if not instructed otherwise by the configuration file) and then does not dispatch to the server until it is back up. In some circumstances, the following command may come in handy:

    > /opt/machine/lbsm/sbin/lbsm_feedback 'Servicename STANDALONE host 0'

The command resets the penalty to 0 (no penalty) and is useful when, as for the previous example, the server is restarted and ready in less than 120 seconds, but the penalty is still held high by the **LBSMD** daemon on the other hosts.

The formal description of the lbsm\_feedback utility parameters is given below.

[![Image lbsm\_feedback.gif](/cxx-toolkit/static/img/lbsm_feedback.gif)](/cxx-toolkit/static/img/lbsm_feedback.gif "Click to see the full-resolution image")

Figure 13. lbsm\_feedback Arguments

The `servicename` can be an identifier with ‘\*’ for any symbols and / or ‘?’ for a single character. The `penalty value` is an integer value in the range 0 ... 100. The `port number` and `time` are integers. The `hostname` is an identifier and the `rate value` is a floating point value.

<a name="ch_app.SVN_Repository"></a>

#### SVN Repository

The SVN repository where the LBSMD daemon source code is located can be retrieved by issuing the following command:

`svn co https://svn.ncbi.nlm.nih.gov/repos/toolkit/trunk/c++`

The daemon code is in this file:

`c++/src/connect/daemons/lbsmd.c`

<a name="ch_app._Log_Files"></a>

#### Log Files

The LBSMD daemon stores its log files at the following location:

`/var/log/lbsmd`

The file is formed locally on a host where LBSMD daemon is running. The log file size is limited to prevent the disk being flooded with messages. A standard log rotation is applied to the log file so you may see the files:

`/var/log/lbsmd.X.gz`

where X is a number of the previous log file.

The log file size can be controlled by the -s command line option. By default, -s 0 is the active flag, which provides a way to create (if necessary) and to append messages to the log file with no limitation on the file size whatsoever. The -s -1 switch instructs indefinite appending to the log file, which must exist. Otherwise, log messages are not stored. -s positive\_number restricts the ability to create (if necessary) and to append to the log file until the file reaches the specified size in kilobytes. After that, message logging is suspended, and subsequent messages are discarded. Note that the limiting file size is only approximate, and sometimes the log file can grow slightly bigger. The daemon keeps track of log files and leaves a final logging message, either when switching from one file to another, in case the file has been moved or removed, or when the file size has reached its limit.

NCBI intranet users can get few (no more than 100) recent lines of the log file on an NCBI internal host. It is also possible to visit the following link:

<https://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/NETWORK/lbsmd.cgi?log>

<a name="ch_app._Configuration_Exampl"></a>

#### Configuration Examples

Here is an example of a LBSMD configuration file:

    # $Id$
    #
    # This is a configuration file of new NCBI service dispatcher
    #
    #
    # DBLB interface definitions
    %include /etc/lbsmd/servrc.cfg.db
    # IEB's services
    testHTTP      /Service/test.cgi?Welcome L=no
    Entrez2[0] HTTP_POST www.ncbi.nlm.nih.gov /entrez/eutils/entrez2server.fcgi \
        C=x-ncbi-data/x-asn-binary L=no
    Entrez2BLAST[0] HTTP_POST www.ncbi.nlm.nih.gov /entrez/eutils/entrez2server.cgi  \
        C=x-ncbi-data/x-asn-binary L=yes
    CddSearch       [0] HTTP_POST www.ncbi.nlm.nih.gov /Structure/cdd/c_wrpsb.cgi \
        C=application/x-www-form-urlencoded L=no
    CddSearch2      [0] HTTP_POST www.ncbi.nlm.nih.gov /Structure/cdd/wrpsb.cgi \
        C=application/x-www-form-urlencoded L=no
    StrucFetch      [0] HTTP_POST www.ncbi.nlm.nih.gov /Structure/mmdb/mmdbsrv.cgi \
        C=application/x-www-form-urlencoded L=no
    bounce[60]HTTP /Service/bounce.cgi L=no C=x-ncbi-data/x-unknown
    # Services of old dispatcher
    bounce[60]NCBID '' L=yes C=x-ncbi-data/x-unknown | \
    ..../web/public/htdocs/Service/bounce


<a name="ch_app.Database_Load_Balancing"></a>

### Database Load Balancing

Database load balancing is an important part of the overall load balancing function. Please see the [Database Load Balancer](ch_dbapi.html#ch_dbapi.Database_loadbalanci) section in the [Database Access](ch_dbapi.html) chapter for more details.


<a name="ch_app.DISPD_Network_Dispat"></a>

### DISPD Network Dispatcher

<a name="ch_app._Overview_3"></a>

#### Overview

The DISPD dispatcher is a CGI/1.0-compliant program (the actual file name is `dispd.cgi`). Its purpose is mapping a requested service name to an actual server location when the client has no direct access to the LBSMD daemon. This mapping is called dispatching. Optionally, the DISPD dispatcher can also pass data between the client, who requested the mapping, and the server, which implements the service, found as a result of dispatching. This combined mode is called a connection. The client may choose any of these modes if there are no special requirements on data transfer (e.g., firewall connection). In some cases, however, the requested connection mode implicitly limits the request to be a dispatching-only request, and the actual data flow between the client and the server occurs separately at a later stage.

<a name="ch_app.Protocol_Description"></a>

#### Protocol Description

The dispatching protocol is designed as an extension of HTTP/1.0 and is coded in the HTTP header parts of packets. The request (both dispatching and connection) is done by sending an HTTP packet to the DISPD dispatcher with a query line of the form:

    dispd.cgi?service=<name>

which can be followed by parameters (if applicable) to be passed to the service. The `<name>` defines the name of the service to be used. The other parameters take the form of one or more of the following constructs:

    &<param>[=<value>]

where square brackets are used to denote an optional value part of the parameter.

In case of a connection request the request body can contain data to be passed to the first-found server. A connection to this server is automatically initiated by the DISPD dispatcher. On the contrary, in case of a dispatching-only request, the body is completely ignored, that is, the connection is dropped after the header has been read and then the reply is generated without consuming the body data. That process may confuse an unprepared client.

Mapping of a service name into a server address is done by the LBSMD daemon which is run on the same host where the DISPD dispatcher is run. The DISPD dispatcher never dispatches a non-local client to a server marked as local-only (by means of L=yes in the configuration of the LBSMD daemon). Otherwise, the result of dispatching is exactly what the client would get from the [service mapping API](ch_conn.html#ch_conn.service_mapping_api) if run locally. Specifying capabilities explicitly the client can narrow the server search, for example, by choosing stateless servers only.

<a name="ch_app.Client_Request_to_DI"></a>

##### Client Request to DISPD

The following additional HTTP tags are recognized in the client request to the DISPD dispatcher.

<a name="ch_app.T.nc_TagDescriptionAcceptedServer"></a>

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left">Tag</td>
<td align="left">Description</td>
</tr>
<tr class="even">
<td align="left"><code>Accepted-Server-Types: &lt;list&gt;</code></td>
<td align="left">The <code>&lt;list&gt;</code> can include one or more of the following keywords separated by spaces:
<ul>
<li><p><em><strong>NCBID</strong></em></p></li>
<li><p><em><strong>STANDALONE</strong></em></p></li>
<li><p><em><strong>HTTP</strong></em></p></li>
<li><p><em><strong>HTTP_GET</strong></em></p></li>
<li><p><em><strong>HTTP_POST</strong></em></p></li>
<li><p><em><strong>FIREWALL</strong></em></p></li>
</ul>
<br/>The keyword describes the server type which the client is capable to handle. The default is any (when the tag is not present in the HTTP header), and in case of a connection request, the dispatcher will accommodate an actual found server with the connection mode, which the client requested, by relaying data appropriately and in a way suitable for the server.<br/><em><strong>Note:</strong></em> <em><strong>FIREWALL</strong></em> indicates that the client chooses a firewall method of communication.<br/><em><strong>Note:</strong></em> Some server types can be ignored if not compatible with the current client mode</td>
</tr>
<tr class="odd">
<td align="left"><code>Client-Mode: &lt;client-mode&gt;</code></td>
<td align="left">The <code>&lt;client-mode&gt;</code> can be one of the following:
<ul>
<li><p><em><strong>STATELESS_ONLY</strong></em> - specifies that the client is not capable of doing full-duplex data exchange with the server in a session mode (e.g., in a dedicated connection).</p></li>
<li><p><em><strong>STATEFUL_CAPABLE</strong></em> - should be used by the clients, which are capable of holding an opened connection to a server. This keyword serves as a hint to the dispatcher to try to open a direct TCP channel between the client and the server, thus reducing the network usage overhead.</p></li>
</ul>
<br/>The default (when the tag is not present at all) is <em><strong>STATELESS_ONLY</strong></em> to support Web browsers.</td>
</tr>
<tr class="even">
<td align="left"><code>Dispatch-Mode: &lt;dispatch-mode&gt;</code></td>
<td align="left">The <code>&lt;dispatch-mode&gt;</code> can be one of the following:
<ul>
<li><p><em><strong>INFORMATION_ONLY</strong></em> - specifies that the request is a dispatching request, and no data and/or connection establishment with the server is required at this stage, i.e., the DISPD dispatcher returns only a list of available server specifications (if any) corresponding to the requested service and in accordance with client mode and server acceptance.</p></li>
<li><p><em><strong>NO_INFORMATION</strong></em> - is used to disable sending the above-mentioned dispatching information back to the client. This keyword is reserved solely for internal use by the DISPD dispatcher and should <strong>not</strong> be used by applications.</p></li>
<li><p><em><strong>STATEFUL_INCLUSIVE</strong></em> - informs the DISPD dispatcher that the current request is a connection request, and because it is going over HTTP it is treated as stateless, thus dispatching would supply stateless servers only. This keyword modifies the default behavior, and dispatching information sent back along with the server reply (resulting from data exchange) should include stateful servers as well, allowing the client to go to a dedicated connection later.</p></li>
<li><p><em><strong>OK_DOWN</strong></em> or <em><strong>OK_SUPPRESSED</strong></em> or <em><strong>PROMISCUOUS</strong></em> - defines a dispatch only request without actual data transfer for the client to obtain a list of servers which otherwise are not included such as, currently down servers (<em><strong>OK_DOWN</strong></em>), currently suppressed by having 100% penalty servers (<em><strong>OK_SUPPRESSED</strong></em>) or both (<em><strong>PROMISCUOUS</strong></em>)</p></li>
</ul>
<br/>The default (in the absence of this tag) is a connection request, and because it is going over HTTP, it is automatically considered stateless. This is to support calls for NCBI services from Web browsers.</td>
</tr>
<tr class="odd">
<td align="left"><code>Skip-Info-&lt;n&gt;: &lt;server-info&gt;</code></td>
<td align="left"><code>&lt;n&gt;</code> is a number of <code>&lt;server-info&gt;</code> strings that can be passed to the DISPD dispatcher to ignore the servers from being potential mapping targets (in case if the client knows that the listed servers either do not work or are not appropriate). Skip-Info tags are enumerated by numerical consequent suffices (<code>&lt;n&gt;</code>), starting from 1. These tags are optional and should only be used if the client believes that the certain servers do not match the search criteria, or otherwise the client may end up with an unsuccessful mapping.</td>
</tr>
<tr class="even">
<td align="left"><code>Client-Host: &lt;host&gt;</code></td>
<td align="left">The tag is used by the DISPD dispatcher internally to identify the <code>&lt;host&gt;</code>, where the request comes from, in case if relaying is involved. Although the DISPD dispatcher effectively disregards this tag if the request originates from outside NCBI (and thus it cannot be easily fooled by address spoofing), in-house applications <strong>should not</strong> use this tag when connecting to the DISPD dispatcher because the tag <strong>is trusted and considered</strong> within the NCBI Intranet.</td>
</tr>
<tr class="odd">
<td align="left"><code>Server-Count: {N|ALL}</code></td>
<td align="left">The tag defines how many server infos to include per response (default <code>N</code>=3, <code>ALL</code> causes everything to be returned at once).<br/><code>N</code> is an integer and <code>ALL</code> is a keyword.</td>
</tr>
</tbody>
</table>

<div class="table-scroll"></div>

<a name="ch_app.DISPD_Client_Respons"></a>

##### DISPD Client Response

The DISPD dispatcher can produce the following HTTP tags in response to the client.

<a name="ch_app.T.nc_TagDescriptionRelayPath_path"></a>

|-----|-------------|
| Tag | Description |
| `Relay-Path: <path>` | The tag shows how the information was passed along by the DISPD dispatcher and the NCBID utility. This is essential for debugging purposes |
| `Server-Info-<n>: <server-info>` | The tag(s) (enumerated increasingly by suffix `<n>`, starting from 1) give a list of servers, where the requested service is available. The list can have up to five entries. However, there is only one entry generated when the service was requested either in firewall mode or by a Web browser. For a non-local client, the returned server descriptors can include ***FIREWALL*** server specifications. Despite preserving information about host, port, type, and other (but not all) parameters of the original servers, ***FIREWALL*** descriptors are not specifications of real servers, but they are created on-the-fly by the DISPD dispatcher to indicate that the connection point of the server cannot be otherwise reached without the use of either firewalling or relaying. |
| `Connection-Info: <host> <port> <ticket>` | The tag is generated in a response to a stateful-capable client and includes a host (in a dotted notation) and a port number (decimal value) of the connection point where the server is listening (if either the server has specifically started or the FWDaemon created that connection point because of the client's request). The ticket value (hexadecimal) represents the 4-byte ticket that must be passed to the server as binary data at the very beginning of the stream. If instead of a host, a port, and ticket information there is a keyword ***TRY\_STATELESS***, then for some reasons (see `Dispatcher-Failures` tag below) the request failed but may succeed if the client would switch into a stateless mode. |
| `Dispatcher-Failures: <failures>` | The tag value lists all transient failures that the dispatcher might have experienced while processing the request. A fatal error (if any) always appears as the last failure in the list. In this case, the reply body would contain a copy of the message as well.<br/>***Note:*** Fatal dispatching failure is also indicated by an unsuccessful HTTP completion code. |
| `Used-Server-Info-n: <server_info>` | The tag informs the client end of server infos that having been unsuccessfully used during current connection request (so that the client will be able to skip over them if needs to).<br/>`n` is an integral suffix, enumerating from 1. |
| `Dispatcher-Messages:` | The tag is used to issue a message into standard error log of a client. The message is intercepted and delivered from within Toolkit HTTP API. |

<div class="table-scroll"></div>

<a name="ch_app.Communication_Scheme"></a>

##### Communication Schemes

After making a dispatching request and using the dispatching information returned, the client can usually connect to the server on its own. Sometimes, however, the client has to connect to the DISPD dispatcher again to proceed with communication with the server. For the DISPD dispatcher this would then be a connection request which can go one of two similar ways, relaying and firewalling.

The figures (Figure7, Figure8) provided at the very beginning of the “Load Balancing” chapter can be used for better understanding of the communication schemes described below.

-   In the relay mode, the DISPD dispatcher passes data from the client to the server and back, playing the role of a middleman. Data relaying occurs when, for instance, a Web browser client wants to communicate with a service governed by the DISPD dispatcher itself.

-   In the firewall mode, DISPD sends out only the information about where the client has to connect to communicate with the server. This connection point and a verifiable ticket are specified in the `Connection-Info` tag in the reply header. ***Note:*** firewalling actually pertains only to the stateful-capable clients and servers.

The firewall mode is selected by the presence of the ***FIREWALL*** keyword in the `Accepted-Server-Types` tag set by the client sitting behind a firewall and not being able to connect to an arbitrary port.

These are scenarios of data flow between the client and the server, depending on the “stateness” of the client:

A. Stateless client

1.  Client is **not using firewall** mode

    -   The client has to connect to the server by its own, using dispatching information obtained earlier; or

    -   The client connects to the DISPD dispatcher with a connection request (e.g., the case of Web browsers) and the DISPD dispatcher facilitates data relaying for the client to the server.

2.  If the client chooses to use the firewall mode then the only way to communicate with the server is to connect to the DISPD dispatcher (making a connection request) and use the DISPD dispatcher as a relay.

***Note:*** Even if the server is stand-alone (but lacking S=yes in the configuration file of the LBSMD daemon) then the DISPD dispatcher initiates a microsession to the server and wraps its output into an HTTP/1.0-compliant reply. Data from both HTTP and NCBID servers are simply relayed one-to-one.

B. Stateful-capable client

1.  A client which is **not using the firewall** mode has to connect directly to the server, using the dispatcher information obtained earlier (e.g., with the use of ***INFORMATION\_ONLY*** in `Dispatch-Mode` tag) if local; for external clients the connection point is provided by the `Connection-Info` tag (port range 4444-4544).

2.  If the firewall mode is selected, then the client has to expect `Connection-Info` to come back from the DISPD dispatcher pointing out where to connect to the server. If ***TRY\_STATELESS*** comes out as a value of the former tag, then the client has to switch into a stateless mode (e.g., by setting ***STATELESS\_ONLY*** in the `Client-Mode` tag) for the request to succeed.

***Note:*** ***TRY\_STATELESS*** could be induced by many reasons, mainly because all servers for the service are stateless ones or because the FWDaemon is not available on the host, where the client's request was received.

***Note:*** Outlined scenarios show that no prior dispatching information is required for a stateless client to make a connection request, because the DISPD dispatcher can always be used as a data relay (in this way, Web browsers can access NCBI services). But for a stateful-capable client to establish a dedicated connection an additional step of obtaining dispatching information must precede the actual connection.

To support requests from Web browsers, which are unaware of HTTP extensions comprising dispatching protocol the DISPD dispatcher considers an incoming request that does not contain input dispatching tags as a connection request from a stateless-only client.

The DISPD dispatcher uses simple heuristics in analyzing an HTTP header to determine whether the connection request comes from a Web browser or from an application (a service connector, for instance). In case of a Web browser the chosen data path could be more expensive but more robust including connection retries if required, whereas on the contrary with an application, the dispatcher could return an error, and the retry is delegated to the application.

The DISPD dispatcher always preserves original HTTP tags `User-Agent` and `Client-Platform` when doing both relaying and firewalling.

<a name="ch_app.NCBID_Server_Launche"></a>

### NCBID Server Launcher

<a name="ch_app._Overview_4"></a>

#### Overview

The LBSMD daemon supports services of type NCBID which are really Unix filter programs that read data from the stdin stream and write the output into the stdout stream without having a common protocol. Thus, HTTP/1.0 was chosen as a framed protocol for wrapping both requests and replies, and the NCBID utility CGI program was created to pass a request from the HTTP body to the server and to put the reply from the server into the HTTP body and send it back to the client. The NCBID utility also provides a dedicated connection between the server and the client, if the client supports the stateful way of communication. Former releases of the NCBID utility were implemented as a separate CGI program however the latest releases integrated the NCBID utility and the DISPD dispatcher into a single component (`ncbid.cgi` is a hard link to `dispd.cgi`).

The NCBID utility determines the requested service from the query string in the same way as the DISPD dispatcher does, i.e., by looking into the value of the CGI parameter service. An executable file which has to be run is then obtained by searching the configuration file (shared with the LBSMD daemon; the default name is `servrc.cfg`): the path to the executable along with optional command-line parameters is specified after the bar character ("\|") in the line containing a service definition.

The NCBID utility can work in either of two connection modes, stateless and stateful, as determined by reading the following HTTP header tag:

`Connection-Mode: <mode> `

where `<mode>` is one of the following:

-   ***STATEFUL***

-   ***STATELESS***

The default value (when the tag is missing) is ***STATELESS*** to support calls from Web browsers.

When the DISPD dispatcher relays data to the NCBID utility this tag is set in accordance with the current client mode.

The ***STATELESS*** mode is almost identical to a call of a conventional CGI program with an exception that the HTTP header could hold tags pertaining to the dispatching protocol, and resulting from data relaying (if any) by the DISPD dispatcher.

In the ***STATEFUL*** mode, the NCBID utility starts the program in a more tricky way, which is closer to working in a firewall mode for the DISPD dispatcher, i.e. the NCBID utility loads the program with its stdin and stdout bound to a port, which is switched to listening. The program becomes a sort of an Internet daemon (the only exception is that only one incoming connection is allowed). Then the client is sent back an HTTP reply containing the `Connection-Info` tag. The client has to use port, host, and ticket from that tag to connect to the server by creating a dedicated TCP connection.

[Note](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Note): the NCBID utility never generates ***TRY\_STATELESS*** keyword.

For the sake of the backward compatibility the NCBID utility creates the following environment variables (in addition to CGI/1.0 environment variables created by the HTTP daemon when calling NCBID) before starting the service executables:

<a name="ch_app.T.nc_NameDescriptionNI_CLIENT_IPA"></a>

|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name | Description |
| NI\_CLIENT\_IPADDR | The variable contains an IP address of the remote host.<br/>It could also be an IP address of the firewall daemon if the NCBID utility was started as a result of firewalling. |
| NI\_CLIENT\_PLATFORM | The variable contains the client platform extracted from the HTTP tag `Client-Platform` provided by the client if any. |

<div class="table-scroll"></div>

<a name="ch_app.Firewall_Daemon_FWDa"></a>

### Firewall Daemon (FWDaemon)

<a name="ch_app._Overview_5"></a>

#### Overview

The NCBI Firewall Daemon (FWDaemon) is essentially a network multiplexer listening at an advertised network address.

The FWDaemon works in a close cooperation with the DISPD dispatcher which informs FWDaemon on how to connect to the “real” NCBI server and then instructs the network client to connect to FWDaemon (instead of the “real” NCBI server). Thus, the FWDaemon serves as a middleman that just pumps the network traffic from the network client to the NCBI server and back.

The FWDaemon allows a network client to establish a persistent TCP/IP connection to any of publicly advertised NCBI services, provided that the client is allowed to make an outgoing network connection to any of the following FWDaemon addresses (on front-end NCBI machines):

    ports 5860..5870 at both 130.14.29.112 and 165.112.7.12

***Note:*** One FWDaemon can simultaneously serve many client/server pairs.

<a name="ch_app.FWDaemon_Behind_a__R"></a>

##### FWDaemon Behind a "Regular" Firewall

If a network client is behind a regular firewall, then a system administrator should open the above addresses (only!) for outgoing connections and set your client to "firewall" mode. Now the network client can use NCBI network services in a usual way (as if there were no firewall at all).

<a name="ch_app.FWDaemon_Behind_a__N"></a>

##### FWDaemon Behind a "Non-Transparent" Firewall

***Note:*** If a firewall is "non-transparent" (this is an extremely rare case), then a system administrator must "map" the corresponding ports on your firewall server to the advertised FWDaemon addresses (shown above). In this case, you will have to specify the address of your firewall server in the client configuration.

The mapping on your non-transparent firewall server should be similar to the following:

    CONN_PROXY_HOST:5860..5870 --> 130.14.29.112:5860..5870

Please note that there is a port range that might not be presently used by any clients and servers, but it is reserved for future extensions. Nevertheless, it is recommended that you have this range configured on firewalls to allow the applications to function seamlessly in the future.

<a name="ch_app._Monitoring_1"></a>

#### Monitoring

The FWDaemon could be monitored using the following web page:

<https://www.ncbi.nlm.nih.gov/IEB/ToolBox/NETWORK/fwd_check.cgi>

Having the page loaded into a browser the user will see the following.

[![Image FWDaemonMonitor.gif](/cxx-toolkit/static/img/FWDaemonMonitor.gif)](/cxx-toolkit/static/img/FWDaemonMonitor.gif "Click to see the full-resolution image")

Figure 15. FWDaemon Checking Web Page

By clicking the “Check” button a page similar to the following will appear.

[![Image FWDaemonCheckPage.gif](/cxx-toolkit/static/img/FWDaemonCheckPage.gif)](/cxx-toolkit/static/img/FWDaemonCheckPage.gif "Click to see the full-resolution image")

Figure 16. FWDaemon Presence Check

The outside NCBI network users can check the connection to the NAT service following the below steps:

-   Run the FWDaemon presence check as described above.

-   Take connection properties from any line where the status is “OK”. For example 130.14.29.112:5864

-   Establish a telnet session using those connection properties. The example of a connection session is given below (a case when a connection was successfully established).

<!-- -->

    > telnet 130.14.29.112 5864
    Trying 130.14.29.112...
    Connected to 130.14.29.112.
    Escape character is '^]'.
    NCBI Firewall Daemon:  Invalid ticket.  Connection closed.
    See https://www.ncbi.nlm.nih.gov/cpp/network/firewall.html.
    Connection closed by foreign host.

<a name="ch_app._Log_Files_1"></a>

#### Log Files

The FWDaemon stores its log files at the following location:

`/opt/machine/fwdaemon/log/fwdaemon`

which is usually a link to `/var/log/fwdaemon`.

The file is formed locally on a host where FWDaemon is running.

<a name="ch_app.FWDaemon_and_NCBID_D"></a>

#### FWDaemon and NCBID Server Data Exchange

One of the key points in the communications between the NCBID server and the FWDaemon is that the DISPD dispatcher instructs the FWDaemon to expect a new client connection. This instruction is issued as a reaction on a remote client request. It is possible that the remote client requested a service but did not use it. To prevent resource leaking and facilitate the usage monitoring the FWDaemon keeps a track of those requested but not used connections in a special file. The NCBID dispatcher is able to read that file before requesting a new connection from the FWDaemon and if the client was previously marked as the one who left connections not used then the NCBID dispatcher refuses the connection request.

The data exchange is illustrated on the figure below.

[![Image DISPDAndFWDaemon.jpg](/cxx-toolkit/static/img/DISPDAndFWDaemon.jpg)](/cxx-toolkit/static/img/DISPDAndFWDaemon.jpg "Click to see the full-resolution image")

Figure 17. DISPD FWDaemon Data Exchange

The location of the `.dispd.msg` file is detected by the DISPD dispatcher as follows. The dispatcher determines the user name who owns the `dispd.cgi` executable. Then the dispatcher looks to the home directory for that user. The directory is used to look for the `.dispd.msg` file. The FWDaemon is run under the same user and the `.dispd.msg` file is saved by the daemon in its home directory.

<a name="ch_app.Launcherd_Utility"></a>

### Launcherd Utility

The purpose of the launcherd utility is to replace the NCBID services on hosts where there is no Apache server installed and there is a need to have Unix filter programs to be daemonized.

The launcherd utility is implemented as a command line utility which is controlled by command line arguments. The list of accepted arguments can be retrieved with the -h option:

`service1:~> /export/home/service/launcherd -h`<br/>`Usage:`<br/>`launcherd [-h] [-q] [-v] [-n] [-d] [-i] [-p #] [-l file] service command [parameters...]`<br/>`  -h   = Print usage information only; ignore anything else`<br/>`  -q   = Quiet start [and silent exit if already running]`<br/>`  -v   = Verbose logging [terse otherwise]`<br/>`  -n   = No statistics collection`<br/>`  -d   = Debug mode [do not go daemon, stay foreground]`<br/>`  -i   = Internal mode [bind to localhost only]`<br/>`  -p # = Port # to listen on for incoming connection requests`<br/>``   -l   = Set log file name [use `-' or `+' to run w/o logger] ``<br/>`Note: Service must be of type STANDALONE to auto-get the port.`<br/>`` Note: Logging to `/dev/null' is treated as logging to a file. ``<br/>`Signals:  HUP, INT, QUIT, TERM to exit`

The launcherd utility accepts the name of the service to be daemonized. Using the service name the utility checks the LBSMD daemon table and retrieves port on which the service requests should be accepted. As soon as an incoming request is accepted the launched forks and connects the socket with the standard streams of the service executable.

One of the launcherd utility command line arguments is a path to a log file where the protocol messages are stored.

The common practice for the launcherd utility is to be run by the standard Unix cron daemon. Here is an example of a cron schedule which runs the launcherd utility every 3 minutes:

`# DO NOT EDIT THIS FILE - edit the master and reinstall.`<br/>`# (/export/home/service/UPGRADE/crontabs/service1/crontab `<br/>`# installed on Thu Mar 20 20:48:02 2008) `<br/>`# (Cron version -- $Id: crontab.c,v 2.13 1994/01/17 03:20:37 vixie Exp $) `<br/>`MAILTO=ncbiduse@ncbi`<br/>`*/3 * * * * test -x /export/home/service/launcherd && /export/home/service/launcherd -q -l /export/home/service/bounce.log -- Bounce  /export/home/service/bounce >/dev/null MAILTO=grid-mon@ncbi,taxhelp@ncbi`<br/>`*/3 * * * * test -x /export/home/service/launcherd && /export/home/service/launcherd -q -l /var/log/taxservice -- TaxService /export /home/service/taxservice/taxservice >/dev/null`<br/>

<a name="ch_app.Monitoring_Tools"></a>

### Monitoring Tools

There are various ways to monitor the services available at NCBI. These are generic third party tools and specific NCBI developed utilities. The specific utilities are described above in the sections related to a certain component.

The system availability and performance could be visualized by using Zabbix software. It can be reached at:

<https://zabbix.ncbi.nlm.nih.gov/>

One more web based tool to monitor servers / services statuses is Nagios. It can be reached at:

[https://nagios11.ncbi.nlm.nih.gov/](https://nagios11.ncbi.nlm.nih.gov/)

<a name="ch_app.Quality_Assurance_Do"></a>

### Quality Assurance Domain

The quality assurance (QA) domain uses the same equipment and the same network as the production domain. Not all the services which are implemented in the production domain are implemented in the QA one. When a certain service is requested with the purpose of testing a service from QA should be called if it is implemented or a production one otherwise. The dispatching is implemented transparently. It is done by the CAF module running on production front ends. To implement that the CAFQAMap directive is put into the Apache web server configuration file as following:

`CAFQAMap NCBIQA /opt/machine/httpd/public/conf/ncbiqa.mapping`

The directive above defines the NCBIQA cookie which triggers names substitutions found in the `/opt/machine/httpd/public/conf/ncbiqa.mapping` file.

To set the cookie the user can visit the following link:

<https://qa.ncbi.nlm.nih.gov/portal/sysutils/qa_status.cgi>

A screen similar to the following will appear:

[![Image QACookieManager.gif](/cxx-toolkit/static/img/QACookieManager.gif)](/cxx-toolkit/static/img/QACookieManager.gif "Click to see the full-resolution image")

Figure 18. QA Cookie Manager.

While connecting to a certain service the cookie is analyzed by the CAF module and if the QA cookie is detected then name mapping is triggered. The mapping is actually a process of replacing one name with another. The replacement rules are stored in the `/opt/machine/httpd/public/conf/ncbiqa.mapping` file. The file content could be similar to the following:

`portal      portalqa`

`eutils      eutilsqa`

`tpubmed     tpubmedqa`

which means to replace `portal` with `portalqa` etc.

So the further processing of the request is done using the substituted name. The process is illustrated on the figure below.

[![Image QA.jpg](/cxx-toolkit/static/img/QA.jpg)](/cxx-toolkit/static/img/QA.jpg "Click to see the full-resolution image")

Figure 19. NCBI QA

<a name="ch_app.applications1"></a>

NCBI Genome Workbench
---------------------

The NCBI Genome Workbench is an integrated sequence visualization and analysis platform. This application runs on Windows, Unix, and Macintosh OS X.

The following topics are discussed in this section:

-   [Design goals](#ch_app.gbench_dg)

-   [Design](#ch_app.gbench_design)

<a name="ch_app.gbench_dg"></a>

### Design Goals

The primary goal of Genome Workbench is to provide a flexible platform for development of new analytic and visualization techniques. To this end, the application must facilitate easy modification and extension. In addition, we place a large emphasis on cross-platform development, and Genome Workbench should function and appear identically on all supported platforms.

<a name="ch_app.gbench_design"></a>

### Design

The basic design of Genome Workbench follows a modified Model-View-Controller (MVC) architecture. The MVC paradigm provides a clean separation between the data being dealt with (the model), the user's perception of this data (provided in views), and the user's interaction with this data (implemented in controllers). For Genome Workbench, as with many other implementations of the MVC architecture, the View and Controller are generally combined.

Central to the framework is the notion of the data being modeled. The model here encompasses the NCBI data model, with particular emphasis on sequences and annotations. The Genome Workbench framework provides a central repository for all managed data through the static class interface in ***CDocManager***. ***CDocManager*** owns the single instance of the C++ Object Manager that is maintained by the application. ***CDocManager*** marshals individual ***CDocument*** classes to deal with data as the user requests. ***CDocument***, at its core, wraps a [CScope](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CScope) class and thus provides a hook to the object manager.

The View/Controller aspect of the architecture is implemented through the abstract class [CView](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CView). Each [CView](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CView) class is bound to a single document. Each [CView](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CView) class, in turn, represents a view of some portion of the data model or a derived object related to the document. This definition is intentionally vague; for example, when viewing a document that represents a sequence alignment, a sequence in that alignment may not be contained in the document itself but is distinctly related to the alignment and can be presented in the context of the document. In general, the views that use the framework will define a top-level GUI window; however, a view could be defined to be a CGI context such that its graphical component is a Web browser.

To permit maximal extensibility, the framework delegates much of the function of creating and presenting views and analyses to a series of plugins. In fact, most of the basic components of the application itself are implemented as plugins. The Genome Workbench framework defines three classes of plugins: data loaders, views, and algorithms. Technically, a plugin is simply a shared library defining a standard entry point. These libraries are loaded on demand; the entry point returns a list of plugin factories, which are responsible for creating the actual plugin instances.

Cross-platform graphical development presents many challenges to proper encapsulation. To alleviate a lot of the difficulties seen with such development, we use a cross-platform GUI toolkit (wxWidgets) in combination with OpenGL for graphical development.

<a name="ch_app.ncbi_netcache_service"></a>

NCBI NetCache Service
---------------------

-   [What is NetCache?](#ch_app.what_is_netcache)

-   [What can NetCache be used for?](#ch_app.what_it_can_be_used)

-   [How to use NetCache](#ch_app.getting_started)

    -   [The basic ideas](#ch_app.The_basic_ideas)

    -   [Setting up your program to use NetCache](#ch_app.Set_up_your_program_to_use_NetCac)

    -   [Establish the NetCache service name](#ch_app.Establish_the_NetCache_service_na)

    -   [Initialize the client API](#ch_app.Initialize_the_client_API)

    -   [Store data](#ch_app.Store_data)

    -   [Retrieve data](#ch_app.Retrieve_data)

    -   [Samples and other resources](#ch_app.Available_samples)

-   [Questions and answers](#ch_app.Questions_and_answers)

<a name="ch_app.what_is_netcache"></a>

### What is NetCache?

**Netcache** service provides temporary storage of documents and data in a distributed computing environment. The system stores data it receives and provides it back upon request. Applications hosted on different network servers access the data by using a unique alphanumeric key.

CGI applications need this functionality to store session information between successive HTPP requests. Some session information could be embedded into URLs or cookies, however it is generally not a good idea because:

-   Some data should not be transmitted to the client, for security reasons.

-   Both URLs and cookies are quite limited in size.

-   Passing data via either cookie or URL generally requires additional encoding and decoding steps.

-   It makes little sense to pass data to the client only so it can be passed back to the server.

Thus it is better to store this information on the server side. However, this information cannot be stored locally because successive HTTP requests for a given session are often processed on different machines. One possible way to handle this is to create a file in a shared network directory. But this approach can present problems to client applications in any of the standard operations:

-   Adding a blob

-   Removing a blob

-   Updating a blob

-   Automatically removing expired blobs

-   Automatically recovering after failures

Therefore, it's better to provide a centralized service that provides robust temporary storage, which is what **NetCache** does.

**NetCache** is load-balanced and has high performance and virtually unlimited scalability. The success with which **NetCache** solves the problem of distributed access to temporary storage enables the [NCBI Grid](ch_grid.html) framework to rely on it for passing data between its components.

<a name="ch_app.what_it_can_be_used"></a>

### What can NetCache be used for?

Programs can use **NetCache** for data exchange. For example, one application can put a blob into **NetCache** and pass the blob key to another application, which can then access (retrieve, update, remove) the data. Some typical use cases are:

-   Store CGI session info

-   Store CGI-generated graphics

-   Cache results of computations

-   Cache results of expensive DBMS or search system queries

-   Pass messages between programs

The diagram below illustrates how **NetCache** works.

[![Image NetCache\_diagramm.gif](/cxx-toolkit/static/img/NetCache_diagramm.gif)](/cxx-toolkit/static/img/NetCache_diagramm.gif "Click to see the full-resolution image")

1.  Client requests a named service from the Load Balancer.

2.  Load Balancer chooses the least loaded server (on this diagram Server 2) corresponding to the requested service.

3.  Load Balancer returns the chosen server to the client.

4.  Client connects to the selected **NetCache** server and sends the data to store.

5.  **NetCache** generates and returns a unique key which can then be used to access the data.

<a name="ch_app.getting_started"></a>

### How to use NetCache

All new applications developed within NCBI should use **NetCache** together with the NCBI Load Balancer. It is not recommended to use an unbalanced **NetCache** service.

The following topics explain how to use NetCache from an application:

-   [The basic ideas](#ch_app.The_basic_ideas)

-   [Set up your program to use NetCache](#ch_app.Set_up_your_program_to_use_NetCac)

-   [Establish the NetCache service name](#ch_app.Set_up_your_program_to_use_NetCac)

-   [Initialize the client API](#ch_app.Initialize_the_client_API)

-   [Store data](#ch_app.Store_data)

-   [Retrieve data](#ch_app.Retrieve_data)

-   [Samples and other resources](#ch_app.Available_samples)

<a name="ch_app.The_basic_ideas"></a>

#### The basic ideas

A typical **NetCache** implementation involves a load-balanced server daemon (the "service") and one or more clients that access the service through a software interface. See [netcached.ini](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netcache/netcached.ini?view=log) for descriptions of the **NetCache** server daemon configuration parameters.

Two classes provide access to **NetCache** - 
[CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetCacheAPI.html) and
[CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetICacheClient.html).
These classes share most of the basic ideas of using **NetCache**, but might be best suited for slightly different purposes. [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetCacheAPI.html)
might be a bit better for temporary storage in scenarios where the data is not kept elsewhere, whereas
[CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetICacheClient.html) implements the
[ICache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classICache.html) interface and might be a bit better for scenarios where the data still exists elsewhere but is also cached for performance reasons. [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) will probably be more commonly used because it automatically generates unique keys for you and it has a slightly simpler interface. [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) also supports stream insertion and extraction operators.

There are multiple ways to write data to **NetCache** and read it back, but the basic ideas are:

-   **NetCache** stores data in blobs. There are no constraints on the format, and the size can be anything from one byte to "big" - that is, the size is specified using ***size\_t*** and the practical size limit is the lesser of available storage and organizational policy.

-   Blob identification is usually associated with a unique purpose.

    -   With [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI), a blob is uniquely identified by a key that is generated by the **NetCache** and returned to the calling code. Thus, the calling code can limit use of the blob to a given purpose. For example, data can be passed from one instance of a CGI to the next by storing the data in a **NetCache** blob and passing the key via cookie.

    -   With [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient), blobs are identified by the combination { key, subkey, version, cache name }, which isn't guaranteed to be unique. It is possible that two programs could choose the same combination and one program could change or delete the data stored by the other.

-   With [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient), the cache name can be specified in the registry and is essentially a convenient way of simulating namespaces.

-   When new data is written using a key that corresponds to existing data:

    -   API calls that use a buffer pointer replace the existing data.

    -   API calls that use a stream or writer append to the existing data.

-   Data written with a stream or writer won't be accessible from the **NetCache** server until the stream or writer is deleted or until the writer's [Close()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Close) method is called.

-   A key must be supplied to retrieve data.

-   Blobs have a limited "time-to-live" (TTL).

    -   Reading a blob won't delete it - it will be removed automatically when its TTL has expired, or it can be removed explicitly.

    -   **NetCache** server daemons can specify a default TTL for their blobs using the `blob_ttl` entry in the `[netcache]` section of [netcached.ini](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netcache/netcached.ini?view=log). There is no direct way to find the server's default TTL, but you can find it indirectly by creating a blob and calling [GetBlobInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetBlobInfo) on the new blob. For an example of this, see [CSampleNetCacheClient::DemoPutRead()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netcache/netcache_client_sample.cpp).

    -   Blob lifetime can be prolonged.

        -   By default, each time a blob is accessed its lifetime will be extended by the server's default `blob_ttl`. The default prolongation can be overridden by passing a TTL when accessing the blob (the passed value will apply only to that access).

        -   Lifetime prolongation can be disabled by setting the `prolong_on_read` entry to `false` in [netcached.ini](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/app/netcache/netcached.ini?view=log).

        -   ***Note:*** Calling [GetBlobSize()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetBlobSize) will prolong a blob's lifetime (unless `prolong_on_read` is `false`), but calling [GetBlobInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetBlobInfo) will not.

<a name="ch_app.Set_up_your_program_to_use_NetCac"></a>

#### Set up your program to use NetCache

To use **NetCache** from your application, you must use the [NCBI application framework](ch_core.html#ch_core.CNcbiApplication) by deriving you application class from [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication). If your application is a CGI, you can derive from [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication).

You will need at least the following libraries in your `Makefile.<appname>.app`:

    # For CNcbiApplication-derived programs:
    LIB = xconnserv xthrserv xconnect xutil xncbi

    # For CCgiApplication-derived programs:
    LIB = xcgi xconnserv xthrserv xconnect xutil xncbi

    # If you're using CNetICacheClient, also add ncbi_xcache_netcache to LIB.

    # All apps need this LIBS line:
    LIBS = $(NETWORK_LIBS) $(DL_LIBS) $(ORIG_LIBS)

Your source should include:

    #include <corelib/ncbiapp.hpp> // for CNcbiApplication-derived programs
    #include <cgi/cgiapp.hpp>      // for CCgiApplication-derived programs

    #include <connect/services/netcache_api.hpp>     // if you use CNetCacheAPI
    #include <connect/services/neticache_client.hpp> // if you use CNetICacheClient

An even easier way to get a new CGI application started is to use the [new\_project](ch_proj.html#ch_proj.new_project_Starting) script:

    new_project mycgi app/netcache

<a name="ch_app.Establish_the_NetCache_service_na"></a>

#### Establish the NetCache service name

All applications using **NetCache** must use a service name. A service name is essentially just an alias for a group of **NetCache** servers from which the load balancer can choose when connecting the **NetCache** client and server. For applications with minimal resource requirements, the selected service may be relatively unimportant, but applications with large resource requirements may need their own dedicated **NetCache** servers. But in all cases, developers should contact <span class="oem_span">nypk4jvylGujip5ust5upo5nv/</span> and ask what service name to use for new applications.

Service names must match the pattern `[A-Za-z_][A-Za-z0-9_]*`, must not end in `_lb`, and are not case-sensitive. Limiting the length to 18 characters is recommended, but there is no hard limit.

Service names are typically specified on the command line or stored in the application configuration file. For example:

    [netcache_api]
    service=the_svc_name_here

<a name="ch_app.Initialize_the_client_API"></a>

#### Initialize the client API

Initializing the **NetCache** API is extremely easy - simply create a [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) or [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient) object, selecting the constructor that automatically configures the API based on the application registry. Then, define the client name in the application registry using the `client` entry in the `[netcache_api]` section. The client name should be unique if the data is application-specific, or it can be shared by two or more applications that need to access the same data. The client name is added to AppLog entries, so it is helpful to indicate the application in this string.

For example, put this in your source code:

    // To configure automatically based on the config file, using CNetCacheAPI:
    CNetCacheAPI nc_api(GetConfig());

    // To configure automatically based on the config file, using CNetICacheClient:
    CNetICacheClient ic_client(CNetICacheClient::eAppRegistry);

and put this in your configuration file:

    [netcache_api]
    client=your_app_name_here

If you are using [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient), you either need to use API methods that take a cache name or, to take advantage of automatic configuration based on the registry, specify a cache name in the `[netcache_api]` section, for example:

    [netcache_api]
    cache_name=your_cache_name_here

For a complete reference of **NetCache** configuration parameters, please see the [NetCache and NetSchedule](ch_libconfig.html#ch_libconfig.NetCache_and_NetSchedule) section in the Library Configuration chapter:

<a name="ch_app.Store_data"></a>

#### Store data

There are ancillary multiple ways to save data, whether you're using [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) or [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient).

With all the storage methods, you can supply a "time-to-live" parameter, which specifies how long (in seconds) a blob will be accessible. See the [basic ideas](#ch_app.The_basic_ideas) section for more information on time-to-live.

<a name="ch_app.Storing_data_using_CNetCacheAPI"></a>

##### Storing data using CNetCacheAPI

If you are saving a new blob using [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI), it will create a unique blob key and pass it back to you. Here are several ways to store data using [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) (see the [class reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetCacheAPI.html) for additional methods):

    CNetCacheAPI nc_api(GetConfig());

    // Write a simple object (and get the new blob key).
    key = nc_api.PutData(message.c_str(), message.size());

    // Or, overwrite the data by writing to the same key.
    nc_api.PutData(key, message.c_str(), message.size());

    // Or, create an ostream (and get a key), then insert into the stream.
    auto_ptr<CNcbiOstream> os(nc_api.CreateOStream(key));
    *os << "line one\n";
    *os << "line two\n";
    // (data written at stream deletion or os.reset())

    // Or, create a writer (and get a key), then write data in chunks.
    auto_ptr<IEmbeddedStreamWriter> writer(nc_api.PutData(&key));
    while(...) {
        writer->Write(chunk_buf, chunk_size);
        // (data written at writer deletion or writer.Close())

<a name="ch_app.Storing_data_using_CNetICacheClie"></a>

##### Storing data using CNetICacheClient

If you are saving a new blob using [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient), you must supply a unique { blob key / version / subkey / cache name } combination. Here are two ways (with the cache name coming from the registry) to store data using [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient) (see the [class reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetICacheClient.html) for additional methods):

    CNetICacheClient ic_client(CNetICacheClient::eAppRegistry);

    // Write a simple object.
    ic_client.Store(key, version, subkey, message.c_str(), message.size());

    // Or, create a writer, then write data in chunks.
    auto_ptr<IEmbeddedStreamWriter>
        writer(ic_client.GetNetCacheWriter(key, version, subkey));
    while(...) {
        writer->Write(chunk_buf, chunk_size);
        // (data written at writer deletion or writer.Close())

<a name="ch_app.Retrieve_data"></a>

#### Retrieve data

Retrieving data is more or less complementary to storing data.

If an attempt is made to retrieve a blob after its time-to-live has expired, an exception will be thrown.

<a name="ch_app.Retrieving_data_using_CNetCacheAP"></a>

##### Retrieving data using CNetCacheAPI

The following code snippet demonstrates three ways of retrieving data using [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) (see the [class reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetCacheAPI.html) for additional methods):

    // Read a simple object.
    nc_api.ReadData(key, message);

    // Or, extract words from a stream.
    auto_ptr<CNcbiIstream> is(nc_api.GetIStream(key));
    while (!is->eof()) {
        *is >> message; // get one word at a time, ignoring whitespace

    // Or, retrieve the whole stream buffer.
    NcbiCout << "Read: '" << is->rdbuf() << "'" << NcbiEndl;

    // Or, read data in chunks.
    while (...) {
        ERW_Result rw_res = reader->Read(chunk_buf, chunk_size, &bytes_read);
        chunk_buf[bytes_read] = '\0';
        if (rw_res == eRW_Success) {
            NcbiCout << "Read: '" << chunk_buf << "'" << NcbiEndl;
        } else {
            NCBI_USER_THROW("Error while reading BLOB");
        }

<a name="ch_app.Retrieving_data_using_CNetICacheC"></a>

##### Retrieving data using CNetICacheClient

The following code snippet demonstrates two ways to retrieve data using [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient), with the cache name coming from the registry (see the [class reference](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNetICacheClient.html) for additional methods):

    // Read a simple object.
    ic_client.Read(key, version, subkey, chunk_buf, kMyBufSize);

    // Or, read data in chunks.
    size_t remaining(ic_client.GetSize(key, version, subkey));
    auto_ptr<IReader> reader(ic_client.GetReadStream(key, version, subkey));
    while (remaining > 0) {
        size_t bytes_read;
        ERW_Result rw_res = reader->Read(chunk_buf, chunk_size, &bytes_read);
        if (rw_res != eRW_Success) {
            NCBI_USER_THROW("Error while reading BLOB");
        }
        // do something with the data
        ...
        remaining -= bytes_read;
    }

<a name="ch_app.Available_samples"></a>

#### Samples and other resources

Here is a sample client application that demonstrates a variety of ways to use **NetCache**:

[src/sample/app/netcache/netcache\_client\_sample.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netcache/netcache_client_sample.cpp)

Here is a sample application that uses **NetCache** from a CGI application:

[src/sample/app/netcache/netcache\_cgi\_sample.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netcache/netcache_cgi_sample.cpp)

Here are test applications for [CNetCacheAPI](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetCacheAPI) and [CNetICacheClient](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNetICacheClient):

[src/connect/services/test/test\_netcache\_api.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/services/test/test_netcache_api.cpp)

[src/connect/services/test/test\_ic\_client.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/connect/services/test/test_ic_client.cpp)

Please see the [NetCache and NetSchedule](ch_libconfig.html#ch_libconfig.NetCache_and_NetSchedule) section of the Library Configuration chapter for documentation on the **NetCache** configuration parameters.

The `grid_cli` command-line tool (available on both Windows and Unix) provides convenient sub-commands for manipulating blobs, getting their status, checking servers, etc.

You can also email <span class="oem_span">nypk4jvylGujip5ust5upo5nv/</span> if you have questions.

<a name="ch_app.Questions_and_answers"></a>

### Questions and answers

**Q: What exactly is netcache's architecture, it is memory-based (like memcached), or does it use filesystem/sql/whatever?**

A:It keeps its database on disk, memory-mapped; it also has a (configurable) "write-back buffer" - to use when there is a lot of data coming in, and a lot of this data gets re-written quickly (this is to help avoid thrashing the disk with relatively transient blob versions - when the OS's automatic memory swap mechanism may become sub-optimal).

**Q: Is there an NCBI "pool" of netcache servers that we can simply tie in to, or do we have to set up netcache servers on our group's own machines?**

A:We usually (except for PubMed) administer NC servers, most of which are shared. Depending on your load (hit rate, blob size distribution, blob lifetime, redundancy, etc.) we can point you to the shared NC servers or create a new NC server pool.

**Q: I assume what's in c++/include/connect/services/\*hpp is the api to use for a client?**

A:Yes, also try the samples under [src/sample/app/netcache](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/netcache/) - for example:

    new_project  pc_nc_client  app/netcache
    cd  pc_nc_client
    make
    ./netcache_client_sample1  -service  NC_test
    ./netcache_client_sample2  NC_test
    ./netcache_client_sample3  NC_test

**Q: Is there a way to build in some redundancy, e.g. so that if an individual server/host goes down, we don't lose data?**

A:Yes, you can mirror NC servers, master-master style, including between BETH and COLO sites. Many NC users use mirrored instances nowadays, including PubMed.

**Q: Is there a limit to the size of the data blobs that can be stored?**

A:Theoretical limit is high enough to say that there is no limit; in practice, limits are imposed by hardware. I have seen 400MB blobs there being written and [read without an incident a thousand times a day](https://intranet.ncbi.nlm.nih.gov/projects/applog/browser/?src=applog&mintime=08:05:00&maxtime=16:09:59&mindate=yesterday&maxdate=yesterday&nobots=0&nointernal=0&random=0&warning=1&sessions=0&fmt=split&retmax=50&run=1&term=app%3Dnetcached%20AND%20blob_size%3E300000000#noBots=0&noApp=0&noInternal=0&warning=0&notes=0&metric=). We can do experiments to see how your load will be handled. As a general rule, you should ask <span class="oem_span">nypk4jvylGujip5ust5upo5nv/</span> for guidance when changing your NC usage.

**Q: How is the expiration of BLOBs handled by NetCache? My thinking is coming from two directions. First, I wouldn’t want BLOBs deleted out from under me, but also, if the expiration is too long, I don’t want to be littering the NetCache. That is: do I need to work hard to remove all of my BLOBs or can I just trust the automatic clean-up?**

A:You can specify a "time-to-live" when you create a blob. If you don't specify a value, you can find the service's default value by calling [GetBlobInfo()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetBlobInfo). See the [basic ideas](#ch_app.The_basic_ideas) section for more details.


