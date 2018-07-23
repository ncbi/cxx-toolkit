---
layout: default
title: HTML
nav: pages/ch_html
---


{{ page.title }}
=======================

The HTML API [Library `xhtml`: [include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/html) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/html)]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The overview for this chapter consists of the following topics:

-   Introduction

-   Chapter Outline

<a name="ch_html.ch_html_intro"></a>

Introduction

**This C++ HTML generation API is slowly but surely going out of fashion. Nowadays, it's recommended to use mainstream XML/XSLT approach to prepare HTML pages; in particular, the** [**XmlWrapp API**](ch_xmlwrapp.html).

**NB Don't confuse it with the** [**C++ CGI framework API**](ch_cgi.html) **-- which is alive and well!**

The HTML module can be used to compose and print out a HTML page by using a static HTML template with embedded dynamic fragments. The HTML module provides a rich set of classes to help build the dynamic fragments using HTML tag nodes together with [text nodes](#ch_html.webpgs_text) arranged into a tree-like structure.

This chapter provides reference material for many of the HTML facilities. You can also see the quick reference guide, a note about [using the HTML and CGI classes together](#ch_html.using_CCgiApplication) and an additional [class reference document](#ch_html.html_classes). For an overview of the HTML module please refer to the HTML section in the introductory chapter on the C++ Toolkit.

### Chapter Outline

The following is an outline of the topics presented in this chapter:

-   [NCBI C++ HTML Classes](#ch_html.html_classes)

    -   [Basic Classes](#ch_html.basic_classes)

        -   [CNCBINode](#ch_html.CNCBINode)

        -   [CHTMLText](#ch_html.CHTMLText)

        -   [CHTMLPlainText](#ch_html.CHTMLPlainText)

        -   [CHTMLNode](#ch_html.CHTMLNode)

        -   [CHTMLElement](#ch_html.CHTMLElement)

        -   [CHTMLOpenElement](#ch_html.CHTMLOpenElement)

        -   [CHTMLListElement](#ch_html.CHTMLListElement)

<!-- -->

-   [Specialized Tag Classes used in Forms](#ch_html.tag_form)

    -   [CHTML\_form: derived from CHTMLElement](#ch_html.CHTML_form)

    -   [CHTML\_input: derived from CHTMLOpenElement](#ch_html.CHTML_input)

    -   [CHTML\_checkbox: derived from CHTML\_input](#ch_html.CHTML_checkbox)

    -   [CHTML\_hidden: derived from CHTML\_input](#ch_html.CHTML_hidden)

    -   [CHTML\_image: derived from CHTML\_input](#ch_html.CHTML_image)

    -   [CHTML\_radio: derived from CHTML\_input](#ch_html.CHTML_radio)

    -   [CHTML\_reset: derived from CHTML\_input](#ch_html.CHTML_reset)

    -   [CHTML\_submit: derived from CHTML\_input](#ch_html.CHTML_submit)

    -   [CHTML\_text: derived from CHTML\_input](#ch_html.CHTML_text)

    -   [CHTML\_select: derived from CHTMLElement](#ch_html.CHTML_select)

    -   [CHTML\_option: derived from CHTMLElement](#ch_html.CHTML_option)

    -   [CHTML\_textarea: derived from CHTMLElement](#ch_html.CHTML_textarea)

<!-- -->

-   [Specialized Tag Classes used in Lists](#ch_html.spl_tag_classes)

    -   [CHTML\_dl: derived from CHTMLElement](#ch_html.CHTML_dl)

    -   [CHTML\_ol: derived from CHTMLListElement](#ch_html.CHTML_ol)

<!-- -->

-   [Other Specialized Tag Classes](#ch_html.other_spl_tag_classes)

    -   [CHTML\_table: derived from CHTMLElement](#ch_html.CHTML_table)

    -   [CHTML\_a: derived from CHTMLElement](#ch_html.CHTML_a)

    -   [CHTML\_img: derived from CHTMLOpenElement](#ch_html.CHTML_img)

    -   [CHTML\_font: derived from CHTMLElement](#ch_html.CHTML_font)

    -   [CHTML\_color: derived from CHTMLElement](#ch_html.CHTML_color)

    -   [CHTML\_br: derived from CHTMLOpenElement](#ch_html.CHTML_br)

    -   [CHTML\_basefont: derived from CHTMLElement](#ch_html.CHTML_basefont)

<!-- -->

-   [Generating Web Pages with the HTML classes](#ch_html.webpgs.html)

    -   [The CNCBINode class](#ch_html.webpgs.html_node)

    -   [HTML Text nodes: CHTMLText and CHTMLPlainText](#ch_html.webpgs_text)

    -   [The NCBI Page classes](#ch_html.page_classes)

    -   [Using the CHTMLPage class with Template Files](#ch_html.CHTMLPage)

    -   [The CHTMLTagNode class](#ch_html.CHTMLTagNode)

    -   [The CHTMLNode class](#ch_html.webpgs_htmlnode)

    -   [The CHTMLDualNode class](#ch_html.CHTMLDualNode)

    -   [Using the HTML classes with a CCgiApplication object](#ch_html.using_CCgiApplication)

<!-- -->

-   [Supplementary Information](#ch_html.webpgs_appendix)

    -   The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)::[TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) class

    -   [Quick Reference Guide](#ch_html.quick_ref)

**Demo Cases** [[src/html/demo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/html/demo)]

**Test Cases** [[src/html/test](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/html/test)]

<a name="ch_html.html_classes"></a>

NCBI C++ HTML Classes
---------------------

The NCBI C++ HTML classes are intended for use in CGI programs that generate HTML. By creating a structured method for creating HTML, these classes allow for reuse of HTML generating code and simplifies laborious tasks, such as creating and maintaining tables.

A good resource for the use of HTML is the **HTML Sourcebook** by Ian Graham.

Using these classes, the in-memory representation of an HTML page is of a graph: each element on the page can have other elements as children. For example, in

    <HTML><BODY>hello</BODY></HTML>

the body tag is a child of the html tag and the text "hello" is a child of the body tag. This graph structure allows for the easy addition of components as well as reuse of code among components since they share the same base classes.

A sample program, `htmldemo.cpp`, can be found in `internal/c++/src/html/demo`.

Next, the following topics are discussed:

-   [Basic Classes](#ch_html.basic_classes)

-   [Specialized Tag Classes used in Forms](#ch_html.tag_form)

-   [Specialized Tag Classes used in Lists](#ch_html.spl_tag_classes)

-   [Other Specialized Tag Classes](#ch_html.other_spl_tag_classes)

<a name="ch_html.basic_classes"></a>

### Basic Classes

There are several basic classes for the html library. The most basic class is [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), which is a node that knows how to contain and manipulate child ***CNCBINodes***. Two main types of classes are derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), text nodes and tag (or "element") nodes. The text nodes ([CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) and [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText)) are intended to be used directly by the user, whereas the basic tag nodes ([CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode), [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement), [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), and [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement)) are base classes for the nodes actually used to construct a page, such as [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form).

[CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) and [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) are both used to insert text into the generated html, with the latter class performing HTML encoding before generation.

[CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) is the base class for [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) (tags with close tags, like `FORM`), [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement) (tags without end tags, like `BR`) and [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement) (tags used in lists, like `OL`).

The following basic classes are discussed in more detail, next:

-   [CNCBINode](#ch_html.CNCBINode)

-   [CHTMLText](#ch_html.CHTMLText)

-   [CHTMLPlainText](#ch_html.CHTMLPlainText)

-   [CHTMLNode](#ch_html.CHTMLNode)

-   [CHTMLElement](#ch_html.CHTMLElement)

-   [CHTMLOpenElement](#ch_html.CHTMLOpenElement)

-   [CHTMLListElement](#ch_html.CHTMLListElement)

<a name="ch_html.CNCBINode"></a>

#### CNCBINode

[CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) uses the following typedefs:**typedef list\<CNCBINode\*\> TChildList typedef map\<string, string\> TAttributes**

**CNCBINode\* AppendChild(CNCBINode\* child)** Add a [CNCBINode\](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)* to the end the list of child nodes. Returns **`*this`** so you can repeat the operation on the same line, e.g. Node-\>AppendChild(new CNCBINode)-\>AppendChild(new CNCBINode).

**CNCBINode\* AppendChild(CNodeRef& ref)** Add a node by reference to the end the list of child nodes. Returns **`*this`** so you can repeat the operation on the same line.

**void RemoveAllChildren(void)** Removes all child nodes.

**TChildList::iterator ChildBegin(void) TChildList::const\_iterator ChildBegin(void) const** Returns the first child.

**TChildList::iterator ChildEnd(void) TChildList::const\_iterator ChildEnd(void) const** Returns the end of the child list (this is **not** the last child).

**TChildList::iterator FindChild(CNCBINode\* child)** Find a particular child, otherwise return 0.

**virtual CNcbiOstream& Print(CNcbiOstream& out)** Create HTML from the node and all its children and send it to out. Returns a reference to out.

**virtual void CreateSubNodes(void)** This function is called during printing when the node has not been initialized. A newly created node is internally marked as not initialized. The intent of this function is for the user to replace it with a function that knows how to create all of the subchildren of the node. The main use of this function is in classes that define whole regions of pages.

**const string& GetName(void) const void SetName(const string& namein)** Get and set the name of the node.

**bool HaveAttribute(const string& name) const** Check for an attribute. Attributes are like the href in \<a href="[https://www.ncbi.nlm.nih.gov](https://www.ncbi.nlm.nih.gov/)"\>

**string GetAttribute(const string& name) const** Return a copy of the attribute's value

**const string\* GetAttributeValue(const string& name) const** Return a pointer to the attribute's value

**void SetAttribute(const string& name, const string& value) void SetAttribute(const string& name) void SetAttribute(const string& name, int value) void SetOptionalAttribute(const string& name, const string& value) void SetOptionalAttribute(const string& name, bool set) void SetAttribute(const char\* name, const string& value) void SetAttribute(const char\* name) void SetAttribute(const char\* name, int value) void SetOptionalAttribute(const char\* name, const string& value) void SetOptionalAttribute(const char\* name, bool set)** Set an attribute. [SetOptionalAttribute()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetOptionalAttribute) only sets the attribute if value contains a string or is true.

<a name="ch_html.CHTMLText"></a>

#### CHTMLText

**CHTMLText(const string& text)**

This is a text node that can contain html tags, including tags of the form \<@...@\> which are replaced by [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)'s when printing out (this is discussed further in the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) documentation).

**const string& GetText(void) const void SetText(const string& text)** Get and set the text in the node.

<a name="ch_html.CHTMLPlainText"></a>

#### CHTMLPlainText

**CHTMLPlainText(const string& text)**

This node is for text that is to be HTML encoded. For example, characters like "&" are turned into "&amp;"

**const string& GetText(void) const void SetText(const string& text)**

Get and set text in the node.

<a name="ch_html.CHTMLNode"></a>

#### CHTMLNode

[CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) inherits from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)e is the base class for html tags.

**CHTMLNode\* SetWidth(int width) CHTMLNode\* SetWidth(const string& width) CHTMLNode\* SetHeight(int height) CHTMLNode\* SetHeight(const string& width) CHTMLNode\* SetAlign(const string& align) CHTMLNode\* SetBgColor(const string& color) CHTMLNode\* SetColor(const string& color)** Sets various attributes that are in common for many tags. Avoid setting these on tags that do not support these attributes. Returns \*this so that the functions can be daisy chained:

    CHTML_table * Table = new CHTML_table;
    Table->SetWidth(400)->SetBgColor("#FFFFFF");

**void AppendPlainText(const string &)** Appends a [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) node. A plain text node will be encoded so that it does not contain any html tags (e.g. "\<" becomes "\<").

**void AppendHTMLText(const string &)** Appends a [CHTMLTextNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTextNode). This type of node can contain HTML tags, i.e. it is not html encoded.

<a name="ch_html.CHTMLElement"></a>

#### CHTMLElement

[CHTMLElemen](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElemen)t is the base class for several tags that have the constructors with the common form:**CHTMLElement() CHTMLElement(CNCBINode\* node) CHTMLElement(const string& text)** The second constructor appends node. The third constructor appends ***CHTMLText(const string& text)***.

The tags derived from this class include: ***CHTML\_html, CHTML\_head, CHTML\_body, CHTML\_base, CHTML\_isindex, CHTML\_link, CHTML\_meta, CHTML\_script, CHTML\_style, CHTML\_title, CHTML\_address, CHTML\_blockquote, CHTML\_center, CHTML\_div, CHTML\_h1, CHTML\_h2, CHTML\_h3, CHTML\_h4, CHTML\_h5, CHTML\_h6, CHTML\_hr, CHTML\_p, CHTML\_pre, CHTML\_dt, CHTML\_dd, CHTML\_li, CHTML\_caption, CHTML\_col, CHTML\_colgroup, CHTML\_thead, CHTML\_tbody, CHTML\_tfoot, CHTML\_tr, CHTML\_th, CHTML\_td, CHTML\_applet, CHTML\_param, CHTML\_cite, CHTML\_code, CHTML\_dfn, CHTML\_em, CHTML\_kbd, CHTML\_samp, CHTML\_strike, CHTML\_strong, CHTML\_var, CHTML\_b, CHTML\_big, CHTML\_i, CHTML\_s, CHTML\_small, CHTML\_sub, CHTML\_sub, CHTML\_sup, CHTML\_tt, CHTML\_u, CHTML\_blink, CHTML\_map, CHTML\_area***

<a name="ch_html.CHTMLOpenElement"></a>

#### CHTMLOpenElement

This is used for tags that do not have a close tag (like `img`). The constructors are of the same form as [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement). The tags derived from this class include: [CHTML\_pnop](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_pnop) (paragraph tag without a close tag)

<a name="ch_html.CHTMLListElement"></a>

#### CHTMLListElement

These are elements used in a list.

**CHTMLListElement(void) CHTMLListElement(bool compact) CHTMLListElement(const string& type) CHTMLListElement(const string& type, bool compact)** Construct the ListElement with the given attibutes: `TYPE` and `COMPACT`. Both attributes affect the way the ListElement is displayed.

**CHTMLListElement\* AppendItem(const string& item) CHTMLListElement\* AppendItem(CNCBINode\* item)** These functions add [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) and [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) items as children of the [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement). The tags derived from this class include: ***CHTML\_ul, CHTML\_dir, CHTML\_menu***.

<a name="ch_html.tag_form"></a>

### Specialized Tag Classes used in Forms

The rest of the sections deal with tag classes that have additional members or member functions that make the tags easier to use. In addition there are helper classes, such as [CHTML\_checkbox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox), that are easier to use instances of HTML tags.

The following specialized tag classes used in forms are discussed, next:

-   [CHTML\_form: derived from CHTMLElement](#ch_html.CHTML_form)

-   [CHTML\_input: derived from CHTMLOpenElement](#ch_html.CHTML_input)

-   [CHTML\_checkbox: derived from CHTML\_input](#ch_html.CHTML_checkbox)

-   [CHTML\_hidden: derived from CHTML\_input](#ch_html.CHTML_hidden)

-   [CHTML\_image: derived from CHTML\_input](#ch_html.CHTML_image)

-   [CHTML\_radio: derived from CHTML\_input](#ch_html.CHTML_radio)

-   [CHTML\_reset: derived from CHTML\_input](#ch_html.CHTML_reset)

-   [CHTML\_submit: derived from CHTML\_input](#ch_html.CHTML_submit)

-   [CHTML\_text: derived from CHTML\_input](#ch_html.CHTML_text)

-   [CHTML\_select: derived from CHTMLElement](#ch_html.CHTML_select)

-   [CHTML\_option: derived from CHTMLElement](#ch_html.CHTML_option)

-   [CHTML\_textarea: derived from CHTMLElement](#ch_html.CHTML_textarea)

<a name="ch_html.CHTML_form"></a>

#### CHTML\_form: derived from CHTMLElement

**CHTML\_form(const string& action = NcbiEmptyString, const string& method = NcbiEmptyString, const string& enctype = NcbiEmptyString)** Add an HTML form tag with the given attributes. [NcbiEmptyString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NcbiEmptyString) is simply a null string.

**void AddHidden(const string& name, const string& value)** Add a hidden value to the form.

<a name="ch_html.CHTML_input"></a>

#### CHTML\_input: derived from CHTMLOpenElement

**CHTML\_input(const string& type, const string& name)** Create a input tag of the given type and name. Several of the following classes are specialized versions of the input tag, for example, [CHTML\_checkbox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox).

<a name="ch_html.CHTML_checkbox"></a>

#### CHTML\_checkbox: derived from CHTML\_input

**CHTML\_checkbox(const string& name) CHTML\_checkbox(const string& name, bool checked, const string& description = NcbiEmptyString) CHTML\_checkbox(const string& name, const string& value) CHTML\_checkbox(const string& name, const string& value, bool checked, const string& description = NcbiEmptyString)** Create a checkbox with the given attributes. This is an input tag with `type` = `"checkbox"`.

<a name="ch_html.CHTML_hidden"></a>

#### CHTML\_hidden: derived from CHTML\_input

**CHTML\_hidden(const string& name, const string& value)** Create a hidden value with the given attributes. This is an input tag with `type` = `"hidden"`.

<a name="ch_html.CHTML_image"></a>

#### CHTML\_image: derived from CHTML\_input

**CHTML\_image(const string& name, const string& src)** Create an image submit input tag. This is an input tag with `type` = `"image"`.

<a name="ch_html.CHTML_radio"></a>

#### CHTML\_radio: derived from CHTML\_input

**CHTML\_radio(const string& name, const string& value) CHTML\_radio(const string& name, const string& value, bool checked, const string& description = NcbiEmptyString)** Creates a radio button. Radio buttons are input tags with `type` = `"radio button"`.

<a name="ch_html.CHTML_reset"></a>

#### CHTML\_reset: derived from CHTML\_input

**CHTML\_reset(const string& label = NcbiEmptyString)** Create a reset button. This is an input tag with `type` = `"reset"`.

<a name="ch_html.CHTML_submit"></a>

#### CHTML\_submit: derived from CHTML\_input

**CHTML\_submit(const string& name) CHTML\_submit(const string& name, const string& label)** Create a submit button. This is an input tag with `type` = `"submit"`.

<a name="ch_html.CHTML_text"></a>

#### CHTML\_text: derived from CHTML\_input

**CHTML\_text(const string& name, const string& value = NcbiEmptyString) CHTML\_text(const string& name, int size, const string& value = NcbiEmptyString) CHTML\_text(const string& name, int size, int maxlength, const string& value = NcbiEmptyString)** Create a text box. This is an input tag with `type` = `"text"`.

<a name="ch_html.CHTML_select"></a>

#### CHTML\_select: derived from CHTMLElement

**CHTML\_select(const string& name, bool multiple = false) CHTML\_select(const string& name, int size, bool multiple = false)** Create a selection tag used for drop-downs and selection boxes.

**CHTML\_select\* AppendOption(const string& option, bool selected = false) CHTML\_select\* AppendOption(const string& option, const string& value, bool selected = false)** Add an entry to the selection box by using the option tag. Returns **`*this`** to allow you to daisy-chain calls to [AppendOption()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendOption).

<a name="ch_html.CHTML_option"></a>

#### CHTML\_option: derived from CHTMLElement

**CHTML\_option(const string& content, bool selected = false) CHTML\_option(const string& content, const string& value, bool selected = false)** The option tag used inside of select elements. See [CHTML\_select](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_select) for an easy way to add option.

<a name="ch_html.CHTML_textarea"></a>

#### CHTML\_textarea: derived from CHTMLElement

**CHTML\_textarea(const string& name, int cols, int rows) CHTML\_textarea(const string& name, int cols, int rows, const string& value)**

Create a textarea tag inside of a form.

<a name="ch_html.spl_tag_classes"></a>

### Specialized Tag Classes used in Lists

These are specialized tag classes used in lists. See "Basic Classes" for non-specialized tag classes used in list.

The following specialized tag classes used in lists are discussed, next:

-   [CHTML\_dl: derived from CHTMLElement](#ch_html.CHTML_dl)

-   [CHTML\_ol: derived from CHTMLListElement](#ch_html.CHTML_ol)

<a name="ch_html.CHTML_dl"></a>

#### CHTML\_dl: derived from CHTMLElement

**CHTML\_dl(bool compact = false)** Create a `dl` tag.

**CHTML\_dl\* AppendTerm(const string& term, CNCBINode\* definition = 0) CHTML\_dl\* AppendTerm(const string& term, const string& definition) CHTML\_dl\* AppendTerm(CNCBINode\* term, CNCBINode\* definition = 0) CHTML\_dl\* AppendTerm(CNCBINode\* term, const string& definition)** Append a term and definition to the list by using `DD` and `DT` tags.

<a name="ch_html.CHTML_ol"></a>

#### CHTML\_ol: derived from CHTMLListElement

**CHTML\_ol(bool compact = false) CHTML\_ol(const string& type, bool compact = false) CHTML\_ol(int start, bool compact = false) CHTML\_ol(int start, const string& type, bool compact = false)** The last two constructors let you specify the starting number for the list.

<a name="ch_html.other_spl_tag_classes"></a>

### Other Specialized Tag Classes

These tag classes that have additional members or member functions that make the tags easier to use. The following classes are discussed next:

-   [CHTML\_table: derived from CHTMLElement](#ch_html.CHTML_table)

-   [CHTML\_a: derived from CHTMLElement](#ch_html.CHTML_a)

-   [CHTML\_img: derived from CHTMLOpenElement](#ch_html.CHTML_img)

-   [CHTML\_font: derived from CHTMLElement](#ch_html.CHTML_font)

-   [CHTML\_color: derived from CHTMLElement](#ch_html.CHTML_color)

-   [CHTML\_br: derived from CHTMLOpenElement](#ch_html.CHTML_br)

-   [CHTML\_basefont: derived from CHTMLElement](#ch_html.CHTML_basefont)

<a name="ch_html.CHTML_table"></a>

#### CHTML\_table: derived from CHTMLElement

**CNCBINode\* Cell(int row, int column)** This function can be used to specify the size of the table or return a pointer to a particular cell in the table. Throws a runtime\_error exception when the children of the table are not `TR` or the children of each `TR` is not `TH` or `TD` or there are more columns than should be.

**int CalculateNumberOfColumns(void) const int CalculateNumberOfRows(void) const** Returns number of columns and number of rows in the table.

**CNCBINode\* InsertAt(int row, int column, CNCBINode\* node) CNCBINode\* InsertTextAt(int row, int column, const string& text)** Inserts a node or text in the table. Grows the table if the specified cell is outside the table. Uses [Cell()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Cell) so can throw the same exceptions.

**void ColumnWidth(CHTML\_table\*, int column, const string & width)** Set the width of a particular column.

**CHTML\_table\* SetCellSpacing(int spacing) CHTML\_table\* SetCellPadding(int padding)** Set the cellspacing or cellpadding attributes.

<a name="ch_html.CHTML_a"></a>

#### CHTML\_a: derived from CHTMLElement

**CHTML\_a(const string& href, const string& text) CHTML\_a(const string& href, CNCBINode\* node)** Creates a hyperlink that contains the given text or node.

<a name="ch_html.CHTML_img"></a>

#### CHTML\_img: derived from CHTMLOpenElement

**CHTML\_img(const string& url) CHTML\_img(const string& url, int width, int height)** Creates an image tag with the given attributes.

<a name="ch_html.CHTML_font"></a>

#### CHTML\_font: derived from CHTMLElement

**CHTML\_font(void) CHTML\_font(int size, CNCBINode\* node = 0) CHTML\_font(int size, const string& text) CHTML\_font(int size, bool absolute, CNCBINode\* node = 0) CHTML\_font(int size, bool absolute, const string& text) CHTML\_font(const string& typeface, CNCBINode\* node = 0) CHTML\_font(const string& typeface, const string& text) CHTML\_font(const string& typeface, int size, CNCBINode\* node = 0) CHTML\_font(const string& typeface, int size, const string& text) CHTML\_font(const string& typeface, int size, bool absolute, CNCBINode\* node = 0) CHTML\_font(const string& typeface, int size, bool absolute, const string& text)** Create a font tag with the given attributes. Appends the given text or node. Note that it is cleaner and more reusable to use a stylesheet than to use the font tag.

**void SetRelativeSize(int size)** Set the size of the font tag.

<a name="ch_html.CHTML_color"></a>

#### CHTML\_color: derived from CHTMLElement

**CHTML\_color(const string& color, CNCBINode\* node = 0) CHTML\_color(const string& color, const string& text)** Create a font tag with the given color and append either node or text.

<a name="ch_html.CHTML_br"></a>

#### CHTML\_br: derived from CHTMLOpenElement

**CHTML\_br(void) CHTML\_br(int number)** The last constructor lets you insert multiple `BR` tags.

<a name="ch_html.CHTML_basefont"></a>

#### CHTML\_basefont: derived from CHTMLElement

**CHTML\_basefont(int size) CHTML\_basefont(const string& typeface) CHTML\_basefont(const string& typeface, int size)** Set the basefont for the page with the given attributes.

<a name="ch_html.webpgs.html"></a>

Generating Web Pages with the HTML classes
------------------------------------------

Web applications involving interactions with a client via a complex HTML interface can be difficult to understand and maintain. The NCBI C++ Toolkit classes decouple the complexity of interacting with a CGI client from the complexity of generating HTML output by defining separate class hierarchies for these activities. In fact, one useful application of the HTML classes is to generate web pages "offline".

The chapter on [Developing CGI Applications](ch_cgi.html#ch_cgi.cg_develop_apps) discussed only the activities involved in processing the client's request and generating a response. This section introduces the C++ Toolkit components that support the creation of HTML pages, and concludes with a brief consideration of how the HTML classes can be used in consort with a running [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication). Further discussion of combining a CGI application with the HTML classes can be found in the section on [An example web-based CGI application](ch_cgi.html#ch_cgi.html). See also [NCBI C++ HTML Classes](#ch_html.html_classes) in the Reference Manual.

The following topics are discussed in this section:

-   [The CNCBINode class](#ch_html.webpgs.html_node)

-   [HTML Text nodes: CHTMLText and CHTMLPlainText](#ch_html.webpgs_text)

-   [The NCBI Page classes](#ch_html.page_classes)

-   [Using the CHTMLPage class with Template Files](#ch_html.CHTMLPage)

-   [The CHTMLTagNode class](#ch_html.CHTMLTagNode)

-   [The CHTMLNode class](#ch_html.webpgs_htmlnode)

-   [The CHTMLDualNode class](#ch_html.CHTMLDualNode)

-   [Using the HTML classes with a CCgiApplication object](#ch_html.using_CCgiApplication)

<a name="ch_html.webpgs.html_node"></a>

### The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)) class

All of the HTML classes are derived from the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class, which in turn, is derived from the [CObject](ch_core.html#ch_core.CObject) class. Much of the functionality of the many derived subclasses is implemented by the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) base class. The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class has just three data members:

-   **`m_Name`** - a ***string***, used to identify the type of node or to store text data

-   **`m_Attributes`** - a ***map\<string, string\>*** of properties for this node

-   **`m_Children`** - a list of subnodes embedded (at run-time) in this node

The **`m_Name`** data member is used differently depending on the type of node. For HTML [text](#ch_html.webpgs_text) nodes, **`m_Name`** stores the actual body of text. For [CHTMLElement](#ch_html.quick_ref) objects, **`m_Name`** stores the HTML tagname that will be used in generating HTML formatted output.

The **`m_Attributes`** data member provides for the encoding of specific features to be associated with the node, such as background color for a web page. A group of "Get/SetAttribute" member functions are provided for access and modification of the node's attributes. All of the "SetAttribute" methods return **`this`** - a pointer to the HTML node being operated on, and so, can be daisy-chained, as in:

    table->SetCellSpacing(0)->SetBgColor("CCCCCC");

Care must be taken however, in the order of invocations, as the object type returned by each operation is determined by the class in which the method is defined. In the above example, **`table`** is an instance of [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table), which is a subclass of [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) - where [SetBgColor()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetBgColor) is defined. The above expression then, effectively executes:

    table->SetCellSpacing(0);
    table->SetBgColor("CCCCCC");

In contrast, the expression:

    table->SetBgColor("CCCCCC")->SetCellSpacing(0);

would fail to compile, as it would effectively execute:

    table->SetBgColor("CCCCCC");
    (CNCBINode*)table->SetCellSpacing(0);

since the method [SetCellSpacing()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetCellSpacing) is undefined for [CNCBINode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) objects.

The **`m_Children`** data member of [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) stores a dynamically allocated list of [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) subcomponents of the node. In general, the in memory representation of each node is a graph of [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) objects (or subclasses thereof), where each object may in turn contain additional [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) children. For example, an unordered list is represented as a [CHTML\_ul](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ul) (`<ul>`) element containing [CHTML\_li](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_li) (`<li>`) subcomponents.

A number of member functions are provided to operate on **`m_Children`**. These include methods to access, add, and remove children, along with a pair of begin/end iterators ([ChildBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/search?string=ChildBegin) and [ChildEnd()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/search?string=ChildEnd)), and a function to dereference these iterators (`Node(i)`).

Depending on flags set at compile time, **`m_Children`** is represented as either a list of [CNodeRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNodeRef) objects, or a list of ***auto\_ptr\<CNodeRef\>***, where [CNodeRef](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNodeRef) is a typedef for ***CRef\<CNCBINode\>***. This distinction is transparent to the user however, and the important point is that the deallocation of all dynamically embedded child nodes is handled automatically by the containing class.

[CNCBINode::Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) recursively generates the HTML text for the node and all of its children, and outputs the result to a specified output stream. The [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) function takes two arguments: (1) an output stream, and (2) a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)::[TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object, where [TMode](#ch_html.CNCBINode_TMode) is an internal class defined inside the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class. The [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object is used by the print function to determine what type of encoding takes place on the output, and in some cases, to locate the containing parent node.

Many of the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) objects do not actually allocate their embedded subnodes until the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method is invoked. Instead, a kind of lazy evaluation is used, and the information required to install these nodes to **`m_Children`** is used by the [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) method only when output has been requested (see discussion [below](#ch_html.webpgs.html_createsub)).

A slice of the NCBI C++ Toolkit class hierarchy rooted at the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class includes the following directly derived subclasses:

-   CNCBINode:

    -   [CSmallPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSmallPagerBox)

    -   [CSelection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSelection)

    -   [CPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox)

    -   [CPager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPager)

    -   [CHTMLText](#ch_html.webpgs_text)

    -   [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode)

    -   [CHTMLPlainText](#ch_html.webpgs_text)

    -   [CHTMLNode](#ch_html.webpgs_htmlnode)

    -   [CHTMLDualNode](#ch_html.CHTMLDualNode)

    -   [CHTMLBasicPage](#ch_html.CHTMLPage)

    -   [CButtonList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CButtonList)

Many of these subclasses make little sense out of context, as they are designed for use as subcomponents of, for example, a [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage). Exceptions to this are the text nodes, described next.

<a name="ch_html.webpgs_text"></a>

### HTML Text nodes: [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText.html)) and [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText))

The [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) class uses the **`m_Name`** data member (inherited from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)) to store a text string of arbitrary length. No new data members are introduced, but two new member functions are defined. [SetText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetText) resets **`m_Name`** to a new string, and [GetText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetText) returns the value currently stored in **`m_Name`**. With the exception of specially `tagged` sections (described below), all text occurring in a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node is sent directly to the output without further encoding.

The [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) class is provided for text that may require further encoding. In addition to the [SetText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetText) and [GetText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetText) member functions described for the [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) class, one new data member is introduced. **`m_NoEncode`** is a Boolean variable that designates whether or not the text should be further encoded. [NoEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NoEncode) and [SetNoEncode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetNoEncode) allow for access and modification of this private data member. For example:

    (new CHTMLText("<br> testing BR <br>"))->Print(cout);

will generate the output:

    testing BR

whereas:

    (new CHTMLPlainText("<br> testing BR <br>"))->Print(cout);

will generate:

    <br> testing BR <br>

The text in the [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node is output verbatim, and the web browser interprets the `<br>` tags as line breaks. In contrast, the [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) node effectively "insulates" its content from the browser's interpretation by encoding the `<br>` tags as "\<br&gt;".

[CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) nodes also play a special role in the implementation of page nodes that work with template files. A `tagname` in the text is delimited by "\<@" and "@\>", as in: `<@tagname@>`. This device is used for example, when working with [template files](#ch_html.CHTMLPage), to allow additional nodes to be inserted in a pre-formatted web page. The [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText)::[PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) method is specialized to skip over the tag names and their delimiters, outputting only the text generated by the nodes that should be inserted in that tagged section. Further discussion of this feature is deferred until the section on the [NCBI page classes](#ch_html.page_classes), which contain a [TTagMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TTagMap).

<a name="ch_html.page_classes"></a>

### The NCBI Page classes

The page classes serve as generalized containers for collections of other HTML components, which are mapped to the page by a **`tagmap`**. In general, subcomponents are added to a page using the [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) method (described below), instead of the [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) method. The page classes define the following subtree in the C++ Toolkit class hierarchy:

-   [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage)

    -   [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage)

<a name="ch_html.webpgs.html_tagmap"></a>

In addition to the data members inherited from [CNCBINode](#ch_html.webpgs.html_node), three new private data members are defined in the [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) class.

-   **`m_CgiApplication`** - a pointer to the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication)

-   **`m_Style`** - an integer flag indicating subcomponents to display/suppress (e.g., Title)

-   **`m_TagMap`** (see discussion)

In effect, **`m_TagMap`** is used to map strings to tagged subcomponents of the page - some of which may not have been instantiated yet. Specifically, **`m_TagMap`** is defined as a [TTagMap](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TTagMap) variable, which has the following type definition:

    typedef map<string, BaseTagMapper*> TTagMap;

<a name="ch_html.webpgs.html_tagmapper"></a>

Here, [BaseTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BaseTagMapper) is a base class for a set of functor-like structs. Each of the derived subclasses of [BaseTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BaseTagMapper) has a single data member (e.g. **`m_Node, m_Function`** or **`m_Method`**), which points to either a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), or a function that returns a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode). The [BaseTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BaseTagMapper) class also has a single member function, [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag), which knows how to "invoke" its data member.

The simplest subclass of [BaseTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BaseTagMapper) is the [ReadyTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ReadyTagMapper) class whose sole data member, **`m_Node`**, is a [CRef](ch_core.html#ch_core.CRef) pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode). In this case the [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag) function simply returns `&*m_Node`. Several different types of tagmappers are derived from the [BaseTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=BaseTagMapper) class in [nodemap.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/html/nodemap.hpp). Each of these subclasses specializes a different type of data member, which may be a pointer to a free function, a pointer to a member function, or a pointer to an object, as in the case of the [ReadyTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ReadyTagMapper). The action taken by the tagmapper's [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag) method in order to return a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) is implemented accordingly.

The [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) class also has a member function named [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag), which is used in turn, to invoke a tagmapper's [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag) method. Specifically, `CHTMLBasicPage::MapTag(tagname)` first locates the installed tagmapper associated with tagname, `m_TagMap[tagname]`. If an entry is found, that tagmapper's [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag) member function is then invoked, which finally returns a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode).

A second member function, ***CHTMLBasicPage::***[AddTagMap(str, obj)](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap), provides for the insertion of a new tag string and its associated tagmapper struct to **`m_TagMap`**. Depending on the object type of the second argument, a type-specific implementation of an overloaded helper function, [CreateTagMapper()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTagMapper), can be used to install the desired tagmapper.

In order for a new mapping to have any effect however, the tag must also occur in one of the nodes installed as a child of the page. This is because the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) methods for the page nodes do virtually nothing except invoke the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) methods for **`m_Children`**. The **`m_TagMap`** data member, along with all of its supporting methods, is required for the usage of template files, as described in the next section.

The primary purpose of the [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) is as a base class whose features are inherited by the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class - it is not intended for direct usage. Important inherited features include its three data members: **`m_CgiApplication`**, **`m_Style`**, and **`m_TagMap`**, and its member functions: ***Get/SetApplication(), Get/SetStyle(), MapTag()***, and [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap). Several of the more advanced HTML components generate their content via access of the running CGI application. For example, see the description of a [CSelection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSelection) node. It is not strictly necessary to specify a CGI application when instantiating a page object however, and constructors are available that do not require an application argument.

<a name="ch_html.CHTMLPage"></a>

### Using the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class with Template Files

The [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class is derived from the [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage). In combination with the appropriate template file, this class can be used to generate the standard NCBI web page, which includes:

-   the NCBI logo

-   a hook for the application-specific logo

-   a top menubar of links to several databases served by the **query** program

-   a links sidebar for application-specific links to relevant sites

-   a **`VIEW`** tag for the application's web interface

-   a bottom menubar for help links, disclaimers, etc.

The template file is a simple HTML text file with one extension -- the use of named tags (`<@tagname@>`) which allow the insertion of new HTML blocks into a pre-formatted page. The standard NCBI page template file contains one such tag, **`VIEW`**.

The [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class introduces two new data members: **`m_Title`** (***string***), which specifies the title for the page, and **`m_TemplateFile`** (***string***), which specifies a template file to load. Two constructors are available, and both accept ***string*** arguments that initialize these two data members. The first takes just the title name and template file name, with both arguments being optional. The other constructor takes a pointer to a [CCgiApplication](ch_cgi.html#ch_cgi.cgi_app_class) and a style (type ***int***), along with the title and template\_file names. All but the first argument are optional for the second constructor. The member functions, [SetTitle()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetTitle) and [SetTemplateFile()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetTemplateFile), allow these data members to be reset after the page has been initialized.

Five additional member functions support the usage of template files and tagnodes as follows:

-   [CreateTemplate()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTemplate) reads the contents of file **`m_TemplateFile`** into a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node, and returns a pointer to that node.

-   [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) executes `AppendChild(CreateTemplate())`, and is called at the top of [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) when **`m_Children`** is empty. Thus, the contents of the template file are read into the **`m_Name`** data member of a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node, and that node is then installed as a child in the page's **`m_Children`**.

-   [CreateTitle()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTitle) returns `new CHTMLText(m_Title)`.

-   [CreateView()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateView) is effectively a virtual function that must be redefined by the application. The [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class definition returns a null pointer (0).

-   [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init) is called by all of the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) constructors, and initializes **`m_TagMap`** as follows:<br/>`void CHTMLPage::Init(void)`<br/>`{`<br/>`    AddTagMap("TITLE", CreateTagMapper(this, &CHTMLPage::CreateTitle));`<br/>`    AddTagMap("VIEW",  CreateTagMapper(this, &CHTMLPage::CreateView));`<br/>`}`<br/>As described in the preceding section, [CreateTagMapper()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTagMapper) is an overloaded function that creates a tagmapper struct. In this case, [CreateTitle()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTitle) and [CreateView()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateView) will be installed as the **`m_Method`** data members in the resulting tagmappers. In general, the type of struct created by [CreateTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTagMapper) depends on the argument types to that function. In its usage here, [CreateTagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTagMapper) is a template function, whose arguments are a pointer to an object and a pointer to a class method:<br/>`template<class C>`<br/>`BaseTagMapper* CreateTagMapper(const C*, CNCBINode* (C::*method)(void)) {`<br/>`    return new TagMapper<C>(method);`<br/>`}`<br/>The value returned is itself a template object, whose constructor expects a pointer to a method (which will be used as a callback to create an object of type C). Here, [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) installs [CreateTitle()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTitle) and [CreateView()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateView) as the data member for the tagmapper associated with tag "TITLE" and tag "VIEW", respectively.

An example using the NCBI standard template file should help make these concepts more concrete. The following code excerpt uses the standard NCBI template and inserts a text node at the **`VIEW`** tag position:

    #include <html/html.hpp>
    #include <html/page.hpp>
    USING_NCBI_SCOPE;
    int main()
    {
        try {
            CHTMLPage *Page = new CHTMLPage("A CHTMLPage!", "ncbi_page.html");
            Page->AddTagMap( "VIEW", 
      new CHTMLText("Insert this string at VIEW tag"));
            Page->Print(cout);
            cout.flush();
            return 0;
        }
        catch (exception& exc) {
            NcbiCerr << "\n" << exc.what() << NcbiEndl;
        }
        return 1;
    }

The name of the template file is stored in **`m_TemplateFile`**, and no further action on that file will be taken until `Page->Print(cout)` is executed. The call to [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) is in a sense then, a forward reference to a tag that we know is contained in the template. Thus, although a new [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node is instantiated in this statement, it is not appended to the page as a child, but is instead "mapped" to the page's **`m_TagMap`** where it is indexed by "VIEW".

The contents of the template file will not be read until [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) is invoked. At that time, the text in the template file will be stored in a [CHTMLText](#ch_html.webpgs_text) node, and when that node is in turn printed, any tag node substitutions will then be made. More generally, nodes are not added to the page's **`m_Children`** graph until [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) is executed. At that time, [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) is invoked if **`m_Children`** is empty. Finally, the actual mapping of a tag (embedded in the template) to the associated [TagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TagMapper) in **`m_TagMap`**, is executed by [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText)::[PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin).

The [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) class, in combination with a template file, provides a very powerful and general method for generating a "boiler-plate" web page which can be adapted to application-specific needs using the [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage)::[AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) method. When needed, The user can edit the template file to insert additional `<@tagname@>` tags. The [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) method is defined **only** for page objects however, as they are the only class having a **`m_TagMap`** data member.

Before continuing to a general discussion of `tagnodes`, let's review how the page classes work in combination with a template file:

-   A page is first created with a title string and a template file name. These arguments are stored directly in the page's data members, **`m_Title`** and **`m_TemplateFile`**.

-   The page's [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init) method is then called to establish tagmap entries for "TITLE" and "VIEW" in **`m_TagMap`**.

-   Additional HTML nodes which should be added to this page are inserted using the page's ***AddTagMap(tagname, \*node)*** method, where the string **`tagname`** appears in the template as `"<@tagname@>"`. Typically, a CGI application defines a custom implementation of the [CreateView()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateView) method, and installs it using `AddTagMap("VIEW", CreateView())`.

-   When the page's [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method is called, it first checks to see if the page has any child nodes, and if so, assumes there is no template loaded, and simply calls [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren). If there are no children however, `page->CreateSubNodes()` is called, which in turn calls the [CreateTemplate()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTemplate) method. This method simply reads the contents of the template file and stores it directly in a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node, which is installed as the only child of the parent page.

-   The page's [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method then calls [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren), which (eventually) causes [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText)::[PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) to be executed. This method in turn, encodes special handling of `"<@tagname@>"` strings. In effect, it repeatedly outputs all text up to the first "@" character; extracts the **`tagname`** from the text; searches the parent page's m\_TagMap to find the [TagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TagMapper) for that `tagname`, and finally, calls [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) on the HTML node returned by the [TagMapper](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TagMapper). [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText)::[PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) continues in this fashion until the end of its text is reached.

NOTE: appending any child nodes directly to the page prior to calling the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method will make the template effectively inaccessible, since **`m_Children()`** will not be empty. For this reason, the user is advised to use [AddTagNode()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagNode) rather than [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) when adding subcomponents.

<a name="ch_html.CHTMLTagNode"></a>

### The [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode)) class

The objects and methods described to this point provide no mechanisms for dynamically adding tagged nodes. As mentioned, the user is free to edit the template file to contain additional `<@tag@>` names, and [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) can then be used to associate tagmappers with these new tags. This however, requires that one know ahead of time how many tagged nodes will be used. The problem specifically arises in the usage of template files, as it is not possible to add child nodes directly to the page without overriding the the template file.

The [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode) class addresses this issue. Derived directly from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), the class's constructor takes a single (***string*** or ***char\****) argument, **`tagname`**, which is stored as **`m_Name`**. The [CHTMLTagNode::PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren) method is specialized to handle tags, and makes a call to [MapTagAll](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTagAll)`(GetName(), mode)`. Here, [GetName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetName) returns the **`m_Name`** of the [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode), and **`mode`** is the [TMode](#ch_html.CNCBINode_TMode) argument that was passed in to [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren). In addition to an enumeration variable specifying the mode of output, a [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object has a pointer to the parent node that invoked [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren). This pointer is used by [MapTagAll()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTagAll), to locate a parent node whose **`m_TagMap`** has an installed `tagmapper` for the tagname. The [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object's parent pointer essentially implements a stack which can be used to retrace the dynamic chain of [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren) invocations, until either a match is found or the end of the call stack is reached. When a match is found, the associated `tagmapper`'s [MapTag()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTag) method is invoked, and [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) is applied to the node returned by this function.

The following example uses an auxillary `CNCBINode(tagHolder)` to install additional [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode) objects. The tags themselves however, are installed in the containing page's **`m_TagMap`**, where they will be retrieved by the [MapTagAll()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTagAll) function, when [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren) is called for the auxillary node. That node in turn, is mapped to the page's **`VIEW`** tag. When the parent page is "printed", [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) will create a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node. The text node will hold the contents of the template file and be appended as a child to the page. When [PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) is later invoked for the text node, [MapTagAll()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=MapTagAll) associates the **`VIEW`** string with the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), and in turn, calls [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) on that node.

    #include <html/html.hpp>
    #include <html/page.hpp>
    USING_NCBI_SCOPE;
    int main()
    {
        try {
            CHTMLPage *Page = new CHTMLPage("myTitle", "ncbi_page.html");
            CNCBINode *tagHolder = new CNCBINode();
            Page->AddTagMap( "VIEW", tagHolder);
            tagHolder->AppendChild(new CHTMLTagNode("TAG1"));
            tagHolder->AppendChild(new CHTML_br());
            tagHolder->AppendChild(new CHTMLTagNode("TAG2"));
            Page->AddTagMap( "TAG1", 
      new CHTMLText("Insert this string at TAG1"));
            Page->AddTagMap( "TAG2", 
      new CHTMLText("Insert another string at TAG2"));
            Page->Print(cout);
            cout.flush();
            return 0;
        }
        catch (exception& exc) {
            NcbiCerr << "\n" << exc.what() << NcbiEndl;
        }
        return 1;
    }

<a name="ch_html.webpgs_htmlnode"></a>

### The [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode)) class

[CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) is derived directly from the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class, and provides the base class for all elements requiring HTML tags (e.g., `<ul>,<br>, <img>, <table>`, etc.). The class interface includes several constructors, all of which expect the first argument to specify the HTML tagname for the node. This argument is used by the constructor to set the **`m_Name`** data member. The optional second argument may be either a text string, which will be appended to the node using [AppendPlainText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendPlainText), or a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), which will be appended using [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild).

A uniform system of class names is applied; each subclass derived from the [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) base class is named ***CHTML\_[tag]***, where **`[tag]`** is the HTML tag in lowercase, and is always preceded by an underscore. The NCBI C++ Toolkit hierarchy defines roughly 40 subclasses of [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) - all of which are defined in the Quick Reference Guide at the end of this section. The constructors for "empty" elements, such as [CHTML\_br](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br), which have no assigned values, are simply invoked as [CHTML\_br()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br). The Quick Reference Guide provides brief explanations of each class, along with descriptions of the class constructors.

In addition to the subclasses explicitly defined in the hierarchy, a large number of lightweight subclasses of [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) are defined by the preprocessor macro [DECLARE\_HTML\_ELEMENT](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=DECLARE_HTML_ELEMENT)`(Tag, Parent)` defined in `html.hpp`. All of these elements have the same interface as other [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) classes however, and the distinction is invisible to the user.

A rich interface of settable attributes is defined in the base class, and is applicable to all of the derived subclasses, including those implemented by the preprocessor macros. Settable attributes include: `class, style, id, width, height, size, alignment, color, title, accesskey,` and `name`. All of the ***SetXxx()*** functions which set these attributes return a **`this`** pointer, cast as [CHTMLNode\](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode)*.

<a name="ch_html.CHTMLDualNode"></a>

### The [CHTMLDualNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode) ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode)) class

[CHTMLDualNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode) is derived directly from the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class, and provides the base class for all elements requiring different means for displaying data in [eHTML](#ch_html.webpgs_appendix) and [ePlainText](#ch_html.webpgs_appendix) modes.

This class interface includes several constructors. The second argument in these constructors specifies the alternative text to be displayed in **`ePlainText`** mode. The first argument of these constructors expects HTML text or pointer to an object of (or inherited from) CNCBINode class. It will be appended to the node using [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) method, and printed out in **`eHTML`** mode. For example:

    (new CHTMLDualNode(new CHTML_p("text"),"\nTEXT \n"))->Print(cout);

will generate the output:

    <p>text</p>

whereas:

    (new CHTMLDualNode(new CHTML_p("text"),"\n TEXT \n"))
    ->Print(cout, CNCBINode::ePlainText);

will generate:

    \n TEXT \n

<a name="ch_html.using_CCgiApplication"></a>

### Using the HTML classes with a [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) object

The previous chapter described the NCBI C++ Toolkit's [CGI](ch_cgi.html#ch_cgi.cg_develop_apps) classes, with an emphasis on their independence from the HTML classes. In practice however, a real application must employ both types of objects, and they must communicate with one another. The only explicit connection between the CGI and HTML components is in the HTML page classes, whose constructors accept a [CCgiApplication](ch_cgi.html#ch_cgi.cgi_app_class) as an input parameter. The open-ended definition of the page's **`m_TagMap`** data member also allows the user to install `tagmapper` functions that are under control of the application, thus providing an "output port" for the application. In particular, an application-specific [CreateView()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateView) method can easily be installed as the function to be associated with a page's **`VIEW`** tag. The [CGI sample program](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/cgi) provides a simple example of using these classes in coordination with each other.

<a name="ch_html.webpgs_appendix"></a>

Supplementary Information
-------------------------

The following topics are discussed in this section:

-   [The CNCBINode::TMode class](#ch_html.CNCBINode_TMode)

-   [Quick Reference Guide](#ch_html.quick_ref)

<a name="ch_html.CNCBINode_TMode"></a>

### The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)::[TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) class

[TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) is an internal class defined inside the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) class. The [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) class has three data members defined:

-   `EMode m_Mode `- an enumeration variable specifying **`eHTML`** (0) or **`ePlainText`** (1) output encoding

-   `CNCBINode* m_Node `- a pointer to the [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) associated with this [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object

-   `TMode* m_Previous `- a pointer to the [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) associated with the parent of **`m_Node`**

[Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) is implemented as a recursive function that allows the child node to dynamically "inherit" its mode of output from the parent node which contains it. [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) outputs the current node using [PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin), recursively prints the child nodes using [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren), and concludes with a call to [PrintEnd()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintEnd). [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) objects are created dynamically as needed, inside the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) function. The first call to [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) from say, a root `Page` node, generally specifies the output stream only, and uses a default **`eHTML`** enumeration value to initialize a [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object. The [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) constructor in this case is:

    TMode(EMode m = eHTML): m_Mode(m), m_Node(0), m_Previous(0) {}

The call to [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) with no [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) argument automatically calls this default constructor to create a [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object which will then be substituted for the formal parameter **`prev`** inside tbe [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method. One way to think of this is that the initial print call - which will ultimately be propagated to all of the child nodes - is initiated with a "null parent" [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object that only specifies the mode of output.

    CNcbiOstream& CNCBINode::Print(CNcbiOstream& os, TMode prev)
    {
        // ...

        TMode mode(&prev, this);

        PrintBegin(os, mode);
        try {
            PrintChildren(out, mode);
        }
        catch (...) {
            // ...
        }
        PrintEnd(os, mode); }

In the first top-level call to [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print), **`prev`** is the default [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) object described above, with `NULL` values for **`m_Previous`** and **`m_Node`**. In the body of the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method however, a new [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) is created for subsequent recursion, with the following constructor used to create the new [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) at that level:

    TMode(const TMode* M, CNCBINode* N) : m_Mode(M->m_Mode),m_Node(N),
    m_Previous(M) {}

where **`M`** is the [TMode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TMode) input parameter, and **`N`** is the current node.

<a name="ch_html.webpgs.html_createsub"></a>

Thus, the output encoding specified at the top level is propagated to the ***PrintXxx()*** methods of all the child nodes embedded in the parent. The [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)::***PrintXxx()*** methods essentially do nothing;[PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) and [PrintEnd()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintEnd) simply return 0, and [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren) just calls [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) on each child. Thus, the actual printing is implemented by the [PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) and [PrintEnd()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintEnd) methods of CHTMLBasicPage base class that are specialized by the child objects.

As the foregoing discussion implies, a generic [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) which has no children explicitly installed will generate no output. For example, a [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) object which has been initialized by loading a [template](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateTemplate) file has no children until they are explicitly created. In this case, the [Print()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Print) method will first call [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) before executing [PrintChildren()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintChildren). The use of template files, and the associated set of `TagMap` functions are discussed in the section on the NCBI [Page](#ch_html.webpgs.html_tagmap) classes.

<a name="ch_html.quick_ref"></a>

### Quick Reference Guide

The following is a quick reference guide to the HTML and related classes:

-   [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)

    -   [CButtonList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CButtonList)

    -   [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage)

        -   [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage)

<!-- -->

-   [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode)

    -   [CHTMLComment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLComment)

    -   [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement)

        -   [CHTML\_br](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br)

        -   [CHTML\_hr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hr)

        -   [CHTML\_img](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_img)

        -   [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input)

            -   [CHTML\_checkbox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox)

            -   [CHTML\_file](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_file)

            -   [CHTML\_hidden](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hidden)

            -   [CHTML\_image](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_image)

            -   [CHTML\_radio](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_radio)

            -   [CHTML\_reset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_reset)

            -   [CHTML\_submit](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_submit)

            -   [CHTML\_text](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_text)

<!-- -->

-   [CHTMLElement](#ch_html.quick_ref)

    -   [CHTML\_a](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_a)

    -   ***CHTML\_basefont CHTML\_button***

    -   [CHTML\_dl](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dl)

    -   [CHTML\_fieldset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_fieldset)

    -   [CHTML\_font](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_font)

        -   [CHTML\_color](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_color)

<!-- -->

-   [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form)

-   [CHTML\_label](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_label)

-   [CHTML\_legend](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_legend)

-   [CHTML\_option](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_option)

-   [CHTML\_select](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_select)

-   [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table)

    -   [CPageList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPageList)

    -   [CPagerView](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerView)

    -   [CQueryBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CQueryBox)

<!-- -->

-   [CHTML\_tc](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tc)

-   [CHTML\_textarea](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_textarea)

-   [CHTML\_tr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tr)

-   [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement)

    -   [CHTML\_dir](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dir)

    -   [CHTML\_menu](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_menu)

    -   [CHTML\_ol](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ol)

    -   [CHTML\_ul](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ul)

<!-- -->

-   [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText)

-   [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode)

-   [CHTMLDualNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode)

    -   [CHTMLSpecialChar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLSpecialChar)

<!-- -->

-   [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText)

-   [CPager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPager)

-   [CPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox)

-   [CSelection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSelection)

-   [CSmallPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSmallPagerBox)

<!-- -->

-   [CButtonList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CButtonList) (Custom feature not for general use.) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CButtonList). An HTML select button with a drop down list; used in [CPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox). The constructor takes no arguments, and child nodes (options) are added using method [CbuttonList::CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes)

-   [CHTML\_a](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_a) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_a) - an HTML anchor element, as used in *\<a href="..."\>*. The constructor takes the URL string as the argument, and optionally, a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) to be appended as a child node. The label inserted before the closing tag (\</a\>) can thus be specified by providing a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node to the constructor, or by using the [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) after the anchor has been created.

-   [CHTML\_basefont](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_basefont) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_basefont) - an HTML basefont element used to define the font size and/or typeface for text embedded in this node by [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild). The constructor expects one to two arguments specifying size, typeface, or both.

-   [CHTML\_br](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br) Derived from [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br) - the HTML component used to insert line breaks. The constructor takes no arguments.

-   [CHTML\_checkbox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a checkbox. The constructor takes up to four arguments specifying the name (***string***), value (***string***), state (***bool***), and description (***string***) for the node.

-   [CHTML\_color](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_color) Derived from [CHTML\_font](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_font), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_color) - an HTML font color element. Two constructors are available, and both expect string color as the first argument. If no other argument is provided, a `NULL` CNCBINode is assumed for the second argument, and text can be added to the node using [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild). An alternative constructor accepts a simple string text argument.

-   [CHTML\_dir](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dir) Derived from [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dir) - the HTML component used to insert a `dir` list. The constructor takes zero to two arguments; if no arguments are provided, the `compact` attribute is by default false, and the `type` attribute is left to the browser. `CHTML_dir("square", true)` will create a compact `dir` element with square icons. Items can be added to the list using `AppendChild(new CHTMLText("<li>...")`.

-   [CHTML\_dl](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dl) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dl) - an HTML glossary list. The constructor takes a single ***bool*** argument; if no arguments are provided, the `compact` attribute is by default false. Terms are added to the list using [AppendTerm()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendTerm).

-   [CHTML\_fieldset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_fieldset) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_fieldset) - an element that groups related form controls (such as checkboxes, radio buttons, etc.) together to define a `form control group`. The constructors take at most 1 argument, which may be either a ***string*** or a [CHTML\_legend](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_legend) node. If the argument is a ***string***, then it is used to create a [CHTML\_legend](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_legend) node for the `fieldset`. The individual form controls to be included in the group are specified using the [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) method.

-   [CHTML\_file](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_file) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_file) - used only inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) - a `form` input type to create a file widget for selecting files to be sent to the server. The constructor takes a ***string*** name and an optional ***string*** value.

-   [CHTML\_font](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_font) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_font) - an HTML font element. The constructor takes up to four arguments. The first three arguments specify the font typeface and size, along with a Boolean value indicating whether the given font size is absolute or relative. The last argument is either a ***string*** or a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) containing text. Additional text should be added using the [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) method.

-   [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) - an HTML `form` node with two constructors. The first takes the URL ***string*** (for submission of form data) and method (**`CHTML::eGet`** or **`CHTML::ePost`**), and the [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild) method is used to add nodes. The second constructor takes three arguments, specifying the URL, an HTML node to append to the form, and the enumereated get/post method.

-   [CHTML\_hidden](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hidden) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hidden) - used only inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) - the HTML node for adding `hidden` key/value pairs to the data that will be submitted by an [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form). The constructor takes a name ***string*** and a value, where the latter may be either a ***string*** or an ***int***.

-   [CHTML\_hr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hr) Derived from [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hr) - the HTML component used to insert a horizontal rule. The constructor takes up to three arguments, specifying the size, width and shading to be used in the display.

-   [CHTML\_image](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_image) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_image) - used only inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) - the HTML component used to add an inline active image to an HTML `form`. Clicking on the image submits the form data to the [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form)'s URL. The constructor takes three arguments, specifying the name of the node, the URL string for the image file, and a Boolean value (optional) indicating whether or not the displayed image should have a border.

-   [CHTML\_img](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_img) Derived from [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_img) - an HTML `img` component for adding an inline image to a web page. The constructor takes a single URL ***string*** argument for the image's `src`. The alternative constructor also accepts two integer arguments specifying the width and height of the displayed image.

-   [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input) Derived from [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input) - the base class for all HTML input elements to be added to a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form). The constructor takes a (***char\****) input type and a (***string***) name. The constructor for each of the subclasses has a static member **`sm_InputType`** which is passed as the first argument to the [CParent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CParent)'s ([CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input)) constructor.

-   [CHTML\_label](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_label) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_label) - associates a label with a form control. The constructors take a ***string*** argument which specifies the text for the label, and optionally, a second ***string*** argument specifying the `FOR` attribute. The `FOR` attribute explicitly identifies the form control to associate with this label.

-   [CHTML\_legend](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_legend) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_legend) - defines a caption for a [CHTML\_fieldset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_fieldset) element. The constructors take a single argument which may be either a ***string*** or a [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode).

-   [CHTML\_menu](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_menu) Derived from [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_menu) - the HTML component used to insert a `menu` list. The constructor takes zero to two arguments; if no arguments are provided, the `compact` attribute is by default false, and the `type` attribute is left to the browser. `CHTML_menu("square", true)` will create a compact `menu` element with square icons. Items can be added to the list using `AppendChild(new CHTMLText("<li>...")`.

-   [CHTML\_ol](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ol) Derived from [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ol) - the HTML component used to insert an enumerated list. The constructor takes up to three arguments, specifying the starting number, the `type` of enumeration (Arabic, Roman Numeral etc.), and a Boolean argument specifying whether or not the display should be compact. Items can be added to the list using `AppendChild(new CHTMLText("<li>...")`.

-   [CHTML\_option](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_option) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_option) - an HTML `option` associated with a [CHTML\_select](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_select) component. The constructor takes a value (***string***), a label (***string*** or ***char\****), and a Boolean indicating whether or not the option is by default selected. The last two arguments are optional, and by default the option is not selected.

-   [CHTML\_radio](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_radio) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_radio) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a radio button. The constructor takes up to four arguments specifying the name (***string***), value (***string***), state (***bool***), and description (***string***) for the node.

-   [CHTML\_reset](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_reset) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_reset) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a reset button. The constructor takes a single optional argument specifying the button's label.

-   [CHTML\_select](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_select) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_select) - an HTML `select` component. The constructor takes up to three arguments, specifying the name (***string***) and size (***int***) of the selection box, along with a Boolean specifying whether or not multiple selections are allowed (default is false). Select options should be added using the [AppendOption()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendOption) method.

-   [CHTML\_submit](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_submit) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_submit) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a submit button. The constructor takes two ***string*** arguments specifying the button's name and label (optional). When selected, this causes the data selections in the including `form` to be sent to the `form`'s URL.

-   [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table) - an HTML table element. The constructor takes no arguments, but many member functions are provided to get/set attributes of the table. Because each of the "set attribute" methods returns **`this`**, the invocations can be strung together in a single statement.<br/>Use [InsertAt](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/search?string=InsertAt)`(row, col, contents)` to add **`contents`** to table cell **`row, col`**. To add contents to the next available cell, use `AppendChild (new`<br/>` <listref rid="webpgs.html_CHTML_tc" RBID="webpgs.html_CHTML_tc"> `[CHTML\_tc](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tc)` </listref>`<br/>`(tag, contents))`, where **`tag`** is type ***char\**** and **`contents`** is type ***char\*, string*** or [CNCBINode\](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)*.

-   [CHTML\_tc](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tc) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tc) - an HTML table cell element. All of the constructors expect the first argument to be a `char* tagname`. The second argument, if present, may be text (***char\**** or ***string***) or a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode).

-   [CHTML\_text](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_text) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_text) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a text box inside a form. The constructor takes up to four arguments: name (***string***), size (***int***), maxlength (***int***), and value (***string***). Only the first argument is required.

-   [CHTML\_textarea](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_textarea) Derived from [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_textarea) - can only be used inside a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form); the HTML component for a textarea inside a form. The constructor takes up to four arguments: name (***string***), cols (***int***), rows (***int***), and value (***string***). Only the last argument is optional.

-   [CHTML\_tr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tr) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_tr) - an HTML table row element. The constructors take a single argument, which may be either a ***string*** or a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode).

-   [CHTML\_ul](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ul) Derived from [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ul) - the HTML component used to insert an unordered list. The constructor takes zero to two arguments; if no arguments are provided, the `compact` attribute is by default false, and the `type` attribute is left to the browser. `CHTML_menu("square", true)` will create a compact list element with square icons. Items can be added to the list using `AppendChild(new CHTMLText("<li>...")`.

-   [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [page.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage) - The base class for [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) and its descendants. The HTML page classes serve as generalized containers for collections of other HTML elements, which together define a web page. Each page has a [TTagMap](#ch_html.webpgs.html_tagmap), which maps names (***strings***) to the HTML subcomponents embedded in the page. Two constructors are defined. The first takes no arguments, and the other, takes a pointer to a [CCgiApplication](ch_cgi.html#ch_cgi.cgi_app_class) and a **`style`** (***int***) argument.

-   [CHTMLComment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLComment) Derived from [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLComment) - used to insert an HTML comment. The constructor takes at most one argument, which may be a ***char\****, a ***string***, or a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode). The constructor then uses [AppendPlainText()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendPlainText) or [AppendChild()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AppendChild), depending on the type of argument, to append the argument to the comment node.

-   [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) Derived from [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) - the base class for all tagged elements which require a closing tag of the form `</tagname>`. [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement) specializes the [PrintEnd()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintEnd) method by generating the end tag `</m_Name>` on the output, where **`m_Name`** stores the tagname of the instance's subclass. Subclasses include ***CHTML\_a, CHTML\_basefont, CHTML\_dl, CHTML\_font, CHTML\_form, CHTML\_option, CHTML\_select, CHTML\_table, CHTML\_tc, CHTML\_textarea***, and [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement).

-   [CHTMLListElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement) Derived from [CHTMLElement](#ch_html.quick_ref), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLListElement) - the base class for [CHTML\_ul](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ul), [CHTML\_ol](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ol), [CHTML\_dir](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_dir), and [CHTML\_menu](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_menu) lists. Arguments to the constructor include the **`tagname`** and **`type`** strings for the list, along with a Boolean indicating whether or not the list is compact.

-   [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode) - the base class for [CHTMLComment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLComment) and [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement). Attributes include `style, id, title, accesskey, color, bgcolor, height, width, align, valign, size, name,` and `class`. All of the constructors require a **`tagname`** argument, which may be either type ***char\**** or ***string***. The optional second argument may be type ***char\****, ***string***, or [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode).

-   [CHTMLOpenElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement) Derived from [CHTMLNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLNode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLOpenElement) - the base class for all tag elements, including [CHTMLElement](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLElement), [CHTML\_br](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_br), [CHTML\_hr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_hr), [CHTML\_img](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_img), and [CHTML\_input](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_input). All of the constructors require a **`tagname`** argument, which may be either type ***char\**** or ***string***. The optional second argument may be type ***char\****, ***string***, or [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode).

-   [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) Derived from [CHTMLBasicPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLBasicPage); defined in [page.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) - the basic 3 section NCBI page. There are two constructors. The first takes a title (type ***string***) and the name of a template file (type ***string***). Both arguments are optional. The other constructor takes a pointer to a [CCgiApplication](ch_cgi.html#ch_cgi.cgi_app_class), a **`style`** (type ***int***), a title and a template\_file name. All but the first argument are optional.

-   [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) - A simple text component, which can be used to insert text that will be displayed verbatim by a browser (may require encoding). The constructor takes two arguments: the text to be inserted (***char\**** or ***string***) and a Boolean (default `false`) indicating that the output **should** be encoded. See also [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText).

-   [CHTMLTagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode); defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLTagNode).

-   [CHTMLDualNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode) - Allows the user to [explicitly specify](#ch_html.CHTMLDualNode) what exactly to print out in **`eHTML`** and in **`ePlainText`** modes. The constructor takes 2 arguments -- the first one is for **`eHTML`** mode output (string or a pointer to a [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)), and the second one is a plain text for **`ePlainText`** mode output.

-   [CHTMLSpecialChar](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLSpecialChar) Derived from [CHTMLDualNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLDualNode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLSpecialChar) - A class for HTML special chars like `&nbsp`, `&copy,` etc. Elements of this class have two variants for output, for eHTML and ePlainText modes. For example: `&nbsp` have plain text variant - " ", and `&copy` - "(c)". `html.hpp` has several predefined simple classes, based on this class, for any special chars. It is [CHTML\_nbsp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_nbsp), [CHTML\_gt](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_gt), [CHTML\_lt](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_lt), [CHTML\_quot](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_quot), [CHTML\_amp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_amp), [CHTML\_copy](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_copy) and [CHTML\_reg](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_reg). Each have one optional arqument, which specify the number of symbols to output.

-   [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) - A simple text component which can be used to install a default web page design (stored in a `template file`) on a [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) or to simply insert `encoded` text. The [PrintBegin()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PrintBegin) is specialized to handle tagnodes occurring in the text. The constructor takes a single argument - the text itself - which may be of type ***char\**** or ***string***. [CHTMLPlainText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText) should be used to insert text that does not embed any `tagnodes` and requires further encoding.

-   [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) Derived from [CObject](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CObject), defined in [node.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode) - A base class for all other HTML node classes. Contains data members **`m_Name, m_Attributes`**, and **`m_Children`**. The constructor takes at most one argument, **`name`**, which defines the internal data member **`m_Name`**.

-   [CPageList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPageList) (Custom feature not for general use.) Derived from [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPageList). Used by the pager box components to page between results pages; contains forward and backward URLs, the current page number, and a `map<int, string>` that associates page numbers with URLs.

-   [CPager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPager) (Custom feature not for general use.) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode), defined in [html.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPlainText)

-   [CPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox) (Custom feature not for general use.) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox). A more elaborate paging component than the [CSmallPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSmallPagerBox); contains pointers to a [CPageList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPageList) and (3) [CButtonList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CButtonList) components (`left, right`, and `top`). Additional properties include width, background color, and number of results.

-   [CPagerView](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerView) (Custom feature not for general use.) Derived from [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table); defined in [pager.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerView).

-   [CQueryBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CQueryBox) (Custom feature not for general use.) Derived from [CHTML\_table](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_table); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CQueryBox).

-   [CSelection](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSelection) (Custom feature not for general use.) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSelection). A checkbox-like component whose choices are generated (using the [CreateSubNodes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CreateSubNodes) method) from the [TCgiEntries](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TCgiEntries) of a [CCgiRequest](ch_cgi.html#ch_cgi.cgi_http_req) object.

-   [CSmallPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSmallPagerBox) (Custom feature not for general use.) Derived from [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode); defined in [components.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSmallPagerBox). A minimal paging component that displays the number of results from the query and the current page being viewed. Has background color and width attributes and contains a pointer to a [CPageList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPageList). See also [CPagerBox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPagerBox) and [CPager](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CPager).


