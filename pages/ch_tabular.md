---
layout: default
title: Row-based data processing (TSV, CSV, etc.)
nav: pages/ch_tab
---


{{ page.title }}
=================================================


- [Parsing CSV and TSV like data (including Excel CSV)](#ch_tabular.Parsing_CSV)
    - [Introduction](#ch_tabular.Introduction)
    - [Basic Usage Example](#ch_tabular.Basic_Usage_Example)
    - [Implementation Approach](#ch_tabular.Implementation_Approach)
    - [CRowReader](#ch_tabular.CRowReader)
    - [Iterators](#ch_tabular.Iterators)
    - [Constructing CRowReader and Switching Data Sources](#ch_tabular.Constructing_CRowReader_and_Switching_Data_Sources)
    - [Fields Meta Info](#ch_tabular.Fields_Meta_Info)
    - [Validation](#ch_tabular.Validation)
    - [Error Handling](#ch_tabular.Error_Handling)
- [CRowReader Traits](#ch_tabular.CRowReader_Traits)
    - [Iterating Over Data Source Rows](#ch_tabular.Iterating_Over_Data_Source_Rows)
    - [Validating Data Source](#ch_tabular.Validating_Data_Source)
    - [Error Context](#ch_tabular.Error_Context)
    - [Implementation Details](#ch_tabular.Implementation_Details)
        - [Events](#ch_tabular.Events)
        - [Exceptions](#ch_tabular.Exceptions)
        - [Recommendations for Traits Developers](#ch_tabular.Recommendations_for_Traits_Developers)
    - [Ready-to-use Traits](#ch_tabular.Ready_to_use_Traits)
        - [IANA CSV](#ch_tabular.IANA_CSV)
        - [IANA TSV](#ch_tabular.IANA_TSV)
        - [NCBI TSV](#ch_tabular.NCBI_TSV)
        - [EXCEL CSV](#ch_tabular.EXCEL_CSV)
        - [Generic Traits](#ch_tabular.Generic_Traits)
- [FAQ](#ch_tabular.FAQ)
    

<a name="ch_tabular.Parsing_CSV"></a>
## Parsing CSV and TSV like data (including Excel CSV)

<a name="ch_tabular.Introduction"></a>
### Introduction

The C++ Toolkit offers a unified API to read lines with separated values from files and C++ streams. The API is implemented as a set of templates and resides in the include/util directory of the source tree. At the moment of writing the following formats are supported:
- IANA CSV
- IANA TSV
- NCBI TSV
- MS Excel CSV

The specific data formats are covered by traits and can be extended in the future.

<a name="ch_tabular.Basic_Usage_Example"></a>
### Basic Usage Example

Here is an example of using the API to read an NCBI TSV file.

```
#include <util/row_reader_ncbi_tsv.hpp>
typedef CRowReader<CRowReaderStream_NCBI_TSV> TNCBITSVStream;
. . .
TNCBITSVStream    my_stream("my_data_file.txt");
for (const auto &  row :  my_stream) {
    TFieldNo  number_of_fields = row. GetNumberOfFields();
    cout << "Line number " << my_stream. GetCurrentLineNo()
         << " starts at position " << my_stream. GetCurrentRowPos()
         << " and has " << number_of_fields << " fields" << endl;

    for (TFieldNo  field = 0; field < number_of_fields; ++field) {
        cout << "Field # " << field << " value: "
             << row[field].Get<string>() << endl;
    }
}
```

First of all the code above includes the NCBI TSV traits for the row reader. The typedef on the next line is basically a shortcut for the further code and it tells the CRowReader template what the data source traits implementation is. In this example the NCBI TSV traits are implemented in the CRowReaderStream_NCBI_TSV class.

Then the example creates an appropriate instance of the stream by providing a file name from which the data should be read. The following ***for*** loop iterates over all the data rows from the file and the nested ***for*** loop iterates over all the fields in a row.
Both the line numbers and the field numbers are zero based.

<a name="ch_tabular.Implementation_Approach"></a>
### Implementation Approach

The API is split into two large parts: the CRowReader template and the traits which are specific to each data source. CRowReader represents a stable interface regardless of the used traits. It includes:
- dealing with data sources: files and C++ streams
- field data types
- field names
- row type: data, comment, metadata
- reading context
- access to the field values
- iterating over rows
- validating
- etc.

The traits cover specifics related to particular data sources. Here are a few examples:
- separators could be different: some data sources may use a comma, others would use a tab character, even multiple characters are possible as separators
- some data sources may have headers with field names
- some sources allow an arbitrary number of fields in different rows, others do not
- some sources may have multi-line rows
- etc.

The CRowReader interface is for the users who would like to read from the data sources which are covered by already developed traits. The traits interface is for those who develop the reading facilities for new data sources. 

<a name="ch_tabular.CRowReader"></a>
### CRowReader

The row reader introduces a few entities. The most important ones are: lines, rows and fields.

Let’s first discuss the difference between lines and rows. In some cases, for example IANA CSV, one data row may be comprised of more than one line from the source file or stream. So CRowReader defines lines as they come from the source and separated with LF or CRLF. The rows are logical units and how they are formed depends on the data source format spec. In other cases, e.g. IANA TSV, lines and rows are the same.

Lines appear in the interface only in the form of a line number. CRowReader can provide the current line number if the user calls GetCurrentLineNo(). As was noted before, the line numbers are zero based.

Rows are represented with a template class, CRR_Row. A row provides access to fields and could be copied. Also, the original content of a row (exactly as it came from a data source) is available via the GetOriginalData() call.

Access to the row fields is provided by operator[] and there are two ways to use it. The first one is to use a field integer index. The second is to use a field name, if the field names were provided earlier for the stream. An example below supposes that the input file has a few rows with three fields in it.

```
TNCBITSVStream    my_stream("my_data_file.txt");

// Set the field names
my_stream.SetFieldName(0, "name");
my_stream.SetFieldName(1, "age");
my_Stream.SetFieldName(2, "address");

for (const auto &  row :  my_stream) {
    TFieldNo  number_of_fields = row. GetNumberOfFields();
    cout << "Name: " << row[0].Get<string>
         << " Address: " << row["address"].Get<string> << endl;
}
```

Access to the first field is done via its number and the third field is accessed via its name.

The fields are represented by a template class CRR_Field and could be copied similar to the rows.

CRR_Row::operator[] provides a reference to a field which can be used to get a field value. In some cases a field from a data source needs to be translated to something else. For example, NCBI TSV may have a character ‘-‘ coming from the source stream and in this case it needs to be translated to an empty value. So there is a difference between a field value and an original field value. Also a field could be null. For example, the NCBI TSV informal rules say that if the source stream has “na” for a field value then the field value is actually a null. The CRR_Field class respects these cases and provides the methods, informally described in the table below.

CRR_Field method	| Description
------------------|------------
GetOriginalData()	| Provides the data as they were in the data source
IsNull()	| True if the field value was translated to null.
Get<>()	| Converts the field value to the required type. There are available conversions to an std::string, all the numeric types, booleans and CTime. ***Note:*** if the field is null then an exception is generated.
GetWithDefault<>(default value)	| It is a convenience method. If the field is null then the default value is provided.
Get(CTime format string)	| A specialization to convert to a CTime value using the provided format string.

<a name="ch_tabular.Iterators"></a>
### Iterators

The examples above used range iterators, but it's also possible to use explicit iterators, e.g.

```
for (TNCBITSVStream::CRowIterator  it = my_stream.begin();
     it != my_stream.end(); ++it) {
    TFieldNo  number_of_fields = it->GetNumberOfFields();
    cout << "Name: " << it[0].Get<string>
         << " Address: " << it["address"].Get<string> << endl;
}
```

The iterators however have certain limitations:
- The iterators are only forward ones. There is no way to step back.
- There is only a prefix version of an iterator. It is a compilation error to write it++;.
-Even if a copy of an iterator is saved, as soon as another read from a stream is done all the iterators will point to the new data.

Some of these limitations come from the fact that there is an optimization in the template implementation wherein the storage for the current row is shared. All iterators are essentially pointing to that storage.

One more caveat is that the iterators are valid only while the corresponding CRowReader instance exists. So it seems to be not the safest idea to store iterators and use them later.

<a name="ch_tabular.Constructing_CRowReader_and_Switching_Data_Sources"></a>
### Constructing CRowReader and Switching Data Sources

The CRowReader can be constructed by providing a file name or by providing a pointer to a C++ input stream. In the case of a stream, the ownership could be specified as well as an arbitrary stream name. The stream name is used in diagnostic messages and serves the purpose of an easy identification of what data source caused a problem.

CRowReader also provides a feature of switching to another data source. The switching is done using the SetDataSource() overloaded methods which basically mimic the constructors. Switching may be done at any moment, e.g. in the middle of the current stream or when the end of the current stream is reached. When the switching is done the iteration over the stream can continue: the iterator increment operation detects the data source switching and continues reading from the new source.

When the source switching is done, the collected meta information (which includes field names, field data types and extended field data types) is cleared except for the user-provided info. This is because some data sources may have embedded information about field names and field data types. In this case the traits populate the corresponding data structures and do not provide the rows to the stream iteration loop. On the other hand the user code may set the field meta info explicitly and this is a higher priority action. For example, if the traits set the type of a field as eRR_Boolean and later on the user sets the type of the same field as eRR_Double then the type will be overwritten. If it happens in the reverse order then the traits request is ignored. Coming back to the source switching, it is possible that the new source has different meta info so the info previously collected by traits is reset while the user-provided info is retained. Certainly, the user can also reset the meta info explicitly by calling the ClearFieldsInfo() method.

<a name="ch_tabular.Fields_Meta_Info"></a>
### Fields Meta Info

The field meta info includes:
- field name
- field data type
- extended field data type

On most occasions the meta info does not enforce anything (except for some cases of validation, described below). For example, a name for field number 79 could be set to “Address” while the data source has only 4 fields. This would not lead to errors unless the field is referred by its name and there is no such a field in the current row. Also it is all right to set many names for the same field or the same name for many fields. In the last case it is an undefined behavior what field is provided if it is referred to by a name.

The data types for the fields are fixed and include:
- eRR_String for strings
- eRR_Boolean for booleans
- eRR_Integer for integers
- eRR_Double for doubles
- eRR_DateTime for CTime

The user can provide a data type for a particular field similar to how it is done for the names. The method to be used is CRowReader::SetFieldType(). If the field types are provided then they may be used during the validation of a data source.

Some data sources may need more specific data types and this is where the extended types come in handy. The traits may define their own extended data types and set them for the fields. The extended field type however may be set only together with the fixed data type and thus the CRowReader::SetFieldTypeEx() has three arguments:
- field number
- field type
- extended field type

How to use the provided meta info, or whether to use it at all, is up to the traits.

The access to the collected meta info is provided by two methods: CRowReader::GetDescribedFieldCount() and CRowReader::GetFieldsMetaInfo(). The first one tells how many fields have at least something initialized – a name or a type. The second one retrieves the meta info for a range of the fields. For example, the IANA TSV requires field names in a data source, so the following code prints the field names.

```
TNCBITSVStream    my_stream("my_data_file.txt");
for (const auto &  row :  my_stream) break;

auto fields_info = my_stream.GetFieldsMetaInfo();
for (const auto &  info : fields_info)
    if (info.is_name_initialized)
        cout << "Field #" << info.field_no
             << " name: " << info.name << endl;
```

The field_info in the example above is a vector of SFieldMetaInfo structures. The structure tells what is initialized and which values can be used.

For the field types and extended field types the API offers to store arbitrary properties. The properties are an instance of an std::string. Here is an example:

```
TNCBITSVStream    my_stream("my_data_file.txt");
src_stream.SetFieldType(
    0, CRR_FieldType<ERR_FieldType>(eRR_DateTime, "Y M D h:m:s"));
```

The example above sets the field #0 type as eRR_DateTime and the string property of the field is 
```"Y M D h:m:s"```. At the moment this feature is used during validation of a data source.

<a name="ch_tabular.Validation"></a>
### Validation

CRowReader provides a unified interface for validating data sources. How to validate a data source depends on its type and thus the traits may validate each data source in a unique way.

CRowReader generically introduces two validation parameters:
- validation mode
- field validation mode

The validation mode is an enumeration and in most cases there is exactly one item, the default mode. The traits may extend the enumeration and this is done for at least one of them: IANA TSV also supports a strict validation mode which enforces more rules than the default mode.

The field validation mode can be switched on and off. If it is switched on then the validation process (for all the currently implemented traits) starts with requesting fixed data types. For all the types except strings a conversion of a field (if it is not null) is tried. The field type information must be provided before the Validate() call. Here is an example of validating two field values in each row.

```
TNCBITSVStream    my_stream("my_data_file.txt");
my_stream.SetFieldType(0, eRR_Integer);
my_stream.SetFieldType(4, eRR_Double);

my_stream.Validate(
    CRowReaderStream_NCBI_TSV::eRR_ValidationMode_Default,
    eRR_FieldValidation);
```

The example above sets the field types for the fields 0 and 4 and asks to try the conversions during the source validation. That means that the fields 1, 2, 3, 5 and further will not be tried even if they are in a row.

The integer, boolean and double conversions are done by the C++ Toolkit NStr class members.

The validation modes may vary depending on the traits and should be checked individually.

In the case of datetime fields in a data source there is a possibility to use various formats to represent a value. So the conversion of a field to a CTime value becomes dependent on a format string. To address that the API offers a property string for a field type. Here is an example of validating a datetime field in a data source.

```
TNCBITSVStream    my_stream("my_data_file.txt");
src_stream.SetFieldType(
    1, CRR_FieldType<ERR_FieldType>(eRR_DateTime, "Y M D h:m:s"));
my_stream.Validate(
    CRowReaderStream_NCBI_TSV::eRR_ValidationMode_Default,
    eRR_FieldValidation);
```

The example validates the values of a field 1 in each row by converting strings to a CTime instance using the ```"Y M D h:m:s"``` format string.

Certainly the other traits may use the property string in a different way and the way may depend on a field type. At the moment however the property string is used only for the eRR_DateTime fields and implemented uniformly across the traits.

<a name="ch_tabular.Error_Handling"></a>
### Error Handling

The CRowReader uses C++ exceptions to notify about detected problems. Here are a few examples of detected problems:
- Failure reading from a stream
- Dereferencing end iterator
- Accessing a field which is not found in a row
- Validating errors
- etc.

The base type for the generated exceptions is CRowReaderException. Wherever possible the exceptions are nested (the C++ Toolkit way, not the standard C++ way) and a CRowReader context object is attached.

The context uses the CRR_Context type and provides the CRowReader specific information which includes:
- The data source name (the file name in case of a file)
- The current line number
- The position at which the current row starts in the source
- The last raw data read from the source

The traits have the option of extending the context and it is required that they derive from CRR_Context.

To get the exception context the CRowReaderException provides the GetContext() method and an example below demonstrates the usage.

```
void ValidateFile(const TNCBITSVStream &  stream,
                  const string &  file_name)
{
    stream.SetDataSource(file_name);
    try {
        stream.Validate(
            CRowReaderStream_NCBI_TSV::eRR_ValidationMode_Default,
            eRR_FieldValidation);
    } catch (const CRowReaderException &  exc) {
        CRR_Context *  context = exc.GetContext();
        if (context)
            cout << "Validation error context: "
                 << context->Serialize() << endl;
        else
            cout << "Validation context is not available" << endl;
    } catch (const std::exception &  exc) {
        // ...
    } catch (...) {
        // ...
    }
}
```

A context may be not available if for example a row is copied and then that row is used to get access to a field which is not there. In this case an exception is generated but the context is not available because a connection between a row and a stream is cut when copying is done.

The last word is about iterators in case of exceptions. When an exception is generated further iterating becomes unavailable. The iterators are considered to have reached end() and the only way to continue using them is to set a new data source.

<a name="ch_tabular.CRowReader_Traits"></a>
## CRowReader Traits

The traits interface is only to be used by those who are covering new types of data sources. Essentially the traits are classes which implement a set of callbacks which are called by CRowReader.

<a name="ch_tabular.Iterating_Over_Data_Source_Rows"></a>
### Iterating Over Data Source Rows

The diagram below describes the interactions between CRowReader and traits in the case of looping over data source rows.


[![Iterating Over a Data Source](/cxx-toolkit/static/img/ch_tabular_iterating_over_data_source.png)](/cxx-toolkit/static/img/ch_tabular_iterating_over_data_source.png "Click to see the full-resolution image")

The user code corresponding to this diagram may look similar to the following:

```
TNCBITSVStream    my_stream("my_data_file.txt");
for (TNCBITSVStream::CRowIterator  it = my_stream.begin();
     it != my_stream.end(); ++it) {
    // ...
}
```

The process starts when the user creates an instance of the TNCBITSVStream by providing a file name. In case of a file CRowReader needs to open it so it calls the traits GetFlags() method. The provided flags are used in the corresponding file opening code. Obviously if an instance of the TNCBITSVStream is constructed on a C++ input stream CRowReader does not need to open anything so the GetFlags() method will not be invoked.

When the user code makes the my_stream.begin() call the CRowReader needs to read a row from the data source. This is the very first reading from the data source so CRowReader invokes the traits OnEvent() method to notify about the beginning of a new data source. The OnEvent() method accepts two arguments. The first is an event and the second is the current mode. There are two modes: iterating and validating. Certainly for the example code the mode is iterating. The return value of the OnEvent() method is an event action which traits ask CRowReader to do. Basically the action may instruct CRowReader to stop processing or to continue.

The next stage is the actual reading from the data source. The reading is delegated to the traits because CRowReader essentially deals with logical data rows while in some cases a data row may be comprised of multiple CR or CRLF separated lines in a data source or even follow more complicated rules. A good example of such a source is IANA CSV: fields may have LF or CRLF in them and in this case the fields are double quoted. So the traits ReadRowData() responsibility is to read from the stream and provide the raw data which correspond to one data row as well as to tell how many lines were read.

Right after reading a data row CRowReader calls the traits OnNextLine() method providing the raw data. In response the traits (via the method return value) tell what needs to be done with the line. It could be one of the following:

Requested action |	CRowReader behavior
-----------------|---------------------
Skip the row	| CRowReader tries to read again using the traits ReadRowData() method
Treat the row as a data-containing row and continue	| CRowReader memorizes the row type and comes to the tokenization and translation stages
Treat the row as a comment row and continue	| CRowReader memorizes the row type and skips the tokenization and translation stages (the row will be available via an iterator)
Treat the row as a metadata-containing row and continue	| CRowReader memorizes the row type and skips tokenization and translation stages (the row will be available via an iterator)
Treat the row as invalid and continue	| CRowReader memorizes the row type and skips tokenization and translation stages (the row will be available via an iterator)
Stop processing the stream	| CRowReader stops iterating over the data source i.e. an end() iterator will be provided to the user

The next stage is to tokenize the data if needed. To do that CRowReader invokes the traits Tokenize() method providing the raw data and storage for the tokens. The traits are expected to populate the tokens and inform CRowReader (via the Tokenize() method return value) of a required further action. The same action enumeration is used here as for the OnNextLine() method however the only allowed return values are: skip, continue as data and stop processing.

Upon the tokenization stage completion the recognized tokens may need to be translated to something else. A good example here is NCBI TSV which requires treating input data “na” as a null field and “-“ as an empty string. To accomplish translations CRowReader invokes the traits Translate() method, supplying the field number, the field original value and storage for saving the translated value. The traits Translate() return value informs CRowReader of what happened with the original value. The return value could be:
- Use original value
- The original value has been translated
- The original value has been translated to null

At this moment all the row data are populated and an iterator is provided for the user. When the user advances the iterator the steps of reading, tokenizing and translating are repeated as needed.

<a name="ch_tabular.Validating_Data_Source"></a>
### Validating Data Source

The diagram below describes the interactions between CRowReader and traits in the case of validating a data source.

[![Validating a Data Source](/cxx-toolkit/static/img/ch_tabular_validating_data_source.png)](/cxx-toolkit/static/img/ch_tabular_validating_data_source.png "Click to see the full-resolution image")


The user code corresponding to this diagram may look similar to the following:

```
TNCBITSVStream    my_stream("my_data_file.txt");
my_stream.Validate();
```

The validation starts very similar to iterating over the stream. The difference is what happens after reading a row from the stream. In the case of validating, CRowReader invokes exactly one traits method, Validate(), providing the row's raw data and a validation mode. The traits Validate() method returns an action which should be respected by CRowReader. Only one action value is taken into account and this value is for interrupting the process. In all other cases the validation continues.

<a name="ch_tabular.Error_Context"></a>
### Error Context

In case of errors a context is available for the user. CRowReader provides a basic context which traits may extend. To support this feature the traits need to implement the GetContext() method which returns a pointer to a basic context instance.

Consequently if traits are extending an error context they need to fulfill the following requirements:
- The traits extended context class must derive from the basic context class CRR_Context
- The traits extended context class must properly re-implement the CRR_Context::Clone() method

<a name="ch_tabular.Implementation_Details"></a>
### Implementation Details

<a name="ch_tabular.Events"></a>
#### Events

The event interface includes three events:
- source begin
- source end
- source error

The first two have been already discussed. 

The source error event is generated when CRowReader detects a failure of an input stream before it reached the end. At this moment CRowReader invokes the traits OnEvent() method with the appropriate event type. The table below describes the actions taken upon the OnEvent() return value.

OnEvent() provided action	| CRowReader behavior
--------------------------|--------------------
stop	| CRowReader stops iterating over the data source
continue	| CRowReader expects that the traits have fixed the stream so that it became readable again. Thus CRowReader will try again to read from the stream. Please note that if the stream is not actually fixed by the traits then an infinite loop is possible here.
default	| CRowReader generates an exception.


<a name="ch_tabular.Exceptions"></a>
#### Exceptions

If traits generate an exception in any of the methods that CRowReader invokes then a few things are done:
- CRowReader creates a nested exception and attaches the data source context before re-throwing
- The data source is considered as broken and further iteration over it cannot be done
- The "source end" event is not delivered to the traits

<a name="ch_tabular.Recommendations_for_Traits_Developers"></a>
#### Recommendations for Traits Developers

The diagram below shows the hierarchy of some generic base classes available for traits:

[![Base Classes](/cxx-toolkit/static/img/ch_tabular_base_classes.png)](/cxx-toolkit/static/img/ch_tabular_base_classes.png "Click to see the full-resolution image")

The only non-templated class on the diagram is the most basic one – CRowReaderStreamBase. The other classes here are implemented as templates and could be specialized for certain purposes. For example, the following standard typedefs are declared in row_reader_char_delimited.hpp:

```
/// An example of the traits where the data fields are delimited by single
/// character '\t'
typedef CRowReaderStream_SingleCharDelimited<'\t'> TRowReaderStream_SingleTabDelimited;
/// An example of the traits where the data fields are delimited by single
/// character ' '
typedef CRowReaderStream_SingleCharDelimited<' '> TRowReaderStream_SingleSpaceDelimited;
/// An example of the traits where the data fields are delimited by single
/// character ','
typedef CRowReaderStream_SingleCharDelimited<','> TRowReaderStream_SingleCommaDelimited;

/// An example of the traits where the delimiters are '\t', ' ' and '\v'
typedef CRowReaderStream_MultiCharDelimited<'\t', ' ', '\v'> TRowReaderStream_MultiSpaceDelimited;

/// An example of the traits where a delimiter is the "***" string
typedef CRowReaderStream_StringDelimited<'*', '*', '*'> TRowReaderStream_ThreeStarDelimited;
```

It is recommended that a new traits implementation derives from one of the mentioned classes or typedefs and re-implements the required methods. A new deriving implementation should also add a macro at the end of the new class as follows:

```
class MyTraits : public TRowReaderStream_SingleTabDelimited
{
    // ...
private:
    RR_TRAITS_PARENT_STREAM(MyTraits);
};
```

The RR_TRAITS_PARENT_STREAM macro must have the new traits class name as an argument. Basically the macro overrides a few items to make the types compatible for the common calls.


<a name="ch_tabular.Ready_to_use_Traits"></a>
### Ready-to-use Traits

As mentioned at the very beginning a few common case data source traits have already been developed. Here is a brief description of how to start using them in your code.

<a name="ch_tabular.IANA_CSV"></a>
#### IANA CSV

The traits follow the specification available at https://tools.ietf.org/html/rfc4180.

```
#include <util/row_reader_iana_csv.hpp>

// Data source with a header
CRowReader<CRowReaderStream_IANA_CSV>  stream_1("file1.csv");

// Data source without a header
CRowReader<CRowReaderStream_IANA_CSV_no_header>  stream_2("file2.csv");

// The header feature can be turned on/off using the traits method, e.g.
stream_1.GetTraits().SetHasHeader(false);
```

<a name="ch_tabular.IANA_TSV"></a>
#### IANA TSV

The traits follow the specification available at https://www.iana.org/assignments/media-types/text/tab-separated-values.

```
#include <util/row_reader_iana_tsv.hpp>
CRowReader<CRowReaderStream_IANA_TSV>  tsv_stream("file.tsv");

// IANA TSV introduces two validation modes: default and strict.
// The default mode matches the reading iteration requirements.

// Default validation may look as follows:
tsv_stream.Validate();
// or:
// tsv_stream.Validate(CRowReaderStream_IANA_TSV::eRR_ValidationMode_Default);

// Strict validation may look as follows:
// tsv_stream.Validate(CRowReaderStream_IANA_TSV::eRR_ValidationMode_Strict);
```

<a name="ch_tabular.NCBI_TSV"></a>
#### NCBI TSV

There is no formal specification for the NCBI TSV data source so the traits implementation is based on the following rules:

```
/// The following rules are going to be applied for the NCBI TSV sources:
/// - each line is processed independently (no line merging at all)
/// - line separators supported: CRLF and LF
/// - field separator is '\t'
/// - lines may have variable number of fields (not matching the number of
///   field names)
/// - empty lines are skipped
/// - lines which start with '##' are considered metadata and passed to the
///   user as rows of type eRR_Metadata
/// - lines which start with '#':
///   - if it is a first non empty line then it is a comment line with field
///     names. The names are extracted and the line is not passed to the user
///   - otherwise the line is treated as a comment, and passed to the user
/// - empty column names are allowed
/// - empty values are allowed
/// - the last line EOL is not enforced
/// - the following translation is done:
///   - '-' is translated to '' (empty string)
///   - 'na' is translated to Null value
/// - validation depends on the mode:
///   - no field validation: only reads the source and does not enforce
///     anything
///   - field validation: reads the source and if the basic type information is
///     supplied by the user, then attempts to convert the raw value to
///     the required typed value. In case of problems an exception is
///     generated.
///     Note: a custom format could be supplied for the eRR_DateTime fields.
```

Here is a declaration example:

```
#include <util/row_reader_ncbi_tsv.hpp>
CRowReader<CRowReaderStream_NCBI_TSV>  ncbi_tsv_stream("file.tsv");
```

<a name="ch_tabular.EXCEL_CSV"></a>
#### EXCEL CSV

There is no formal specification available for Microsoft Excel CSV format so the implementation is based on a set of experiments with various options of data representation in CSV files. The traits try to mimic MS Excel behavior as close as possible.

Here is a declaration example:

```
#include <util/row_reader_excel_csv.hpp>
CRowReader<CRowReaderStream_Excel_CSV>  excel_csv_stream("file.csv");
```

<a name="ch_tabular.Generic_Traits"></a>
#### Generic Traits

On some occasions a generic implementation of the traits with custom delimiters could be helpful. Here is an example of a few specializations which use single and multiple character field separators.

```
#include <util/row_reader.hpp>
#include <util/row_reader_base.hpp>

/// An example of the traits where the data fields are delimited by single
/// character '\t'
typedef CRowReaderStream_SingleCharDelimited<'\t'> TRowReaderStream_SingleTabDelimited;
/// An example of the traits where the data fields are delimited by single
/// character ' '
typedef CRowReaderStream_SingleCharDelimited<' '> TRowReaderStream_SingleSpaceDelimited;
/// An example of the traits where the data fields are delimited by single
/// character ','
typedef CRowReaderStream_SingleCharDelimited<','> TRowReaderStream_SingleCommaDelimited;

/// An example of the traits where the delimiters are '\t', ' ' and '\v'
typedef CRowReaderStream_MultiCharDelimited<'\t', ' ', '\v'> TRowReaderStream_MultiSpaceDelimited;

/// An example of the traits where a delimiter is the "***" string
typedef CRowReaderStream_StringDelimited<'*', '*', '*'> TRowReaderStream_ThreeStarDelimited;
```

<a name="ch_tabular.FAQ"></a>
## FAQ
**Q**. What libraries do I need to add to my Makefile?

**A**. None. The CRowReader and the traits mentioned here are implemented as C++ template classes so you only need to include the proper header files.

**Q**. Where the files related to the API are located?

**A**. They are in include/util directory in the C++ Toolkit source code tree
