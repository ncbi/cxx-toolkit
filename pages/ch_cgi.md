---
layout: default
title: CGI and Fast-CGI
nav: pages/ch_cgi
---


{{ page.title }}
===================================


## Introduction

**CGI and Fast-CGI** [Libraries `xcgi` and `xfcgi`: [include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi)]

These library classes represent an [integrated framework](#ch_cgi.cgi_class_overview) with which to write CGI applications and are designed to help retrieve and parse an HTTP request and then to compose and deliver an HTTP response. (See also this additional [class reference documentation](#ch_cgi.)). `xfcgi` is a FastCGI version of `xcgi`.

***Hint:*** Requires the target executable to be linked with a third-party FastCGI library, as in:

[LIBS](ch_proj.html#ch_proj.make_proj_app)` = $(FASTCGI_LIBS) $(ORIG_LIBS)`.

***Hint:*** On non-FastCGI capable platforms (or if run as a plain CGI on a FastCGI-capable platform), it works the same as a plain CGI.

CGI Interface

-   [Basic CGI Application Class](#ch_cgi.cgi_app_class) (includes [CGI Diagnostic Handling](#ch_cgi.cgi_diag.html)) cgiapp[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/cgiapp.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/cgiapp.cpp)]

-   [CGI Application Context Classes](#ch_cgi.cgi_app_context) cgictx[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/cgictx.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/cgictx.cpp)]

-   [HTTP Request Parser](#ch_cgi.cgi_http_req) ncbicgi[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/ncbicgi.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/ncbicgi.cpp)]

-   [HTTP Cookies](#ch_cgi.cgi_http_cookies) ncbicgi[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/ncbicgi.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/ncbicgi.cpp)]

-   [HTTP Response Generator](#ch_cgi.cgi_http_resp) ncbicgir[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/ncbicgir.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/ncbicgir.cpp)]

-   [Basic CGI Resource Class](#ch_cgi.cgi_res_class) ncbires[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/cgi/ncbires.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/ncbires.cpp)]

***FastCGI*** CGI Interface

-   Adapter Between C++ and FastCGI Streams fcgibuf[[.hpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/fcgibuf.hpp) \| [.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/fcgibuf.cpp)]

-   Fast-CGI Loop Function fcgi\_run[[.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/fcgi_run.cpp)]

-   Plain CGI Stub for the Fast-CGI Loop Function cgi\_run[[.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/cgi_run.cpp)]

**Demo Cases** [[src/cgi/demo](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/demo) \| [C++/src/sample/app/cgi/](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/cgi/)]

**Test Cases** [[src/cgi/test](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/test)]

.

## Chapter Outline

The following is an outline of the topics presented in this chapter:

[Developing CGI applications](#ch_cgi.cg_develop_apps)

-   [Overview of the CGI classes](#ch_cgi.cgi_class_overview)

-   [The CCgiApplication class](#ch_cgi.cgi_app_class)

-   [The CNcbiResource and CNcbiCommand classes](#ch_cgi.cgi_res_class)

-   [The CCgiRequest class](#ch_cgi.cgi_http_req)

-   [The CCgiResponse class](#ch_cgi.cgi_http_resp)

-   [The CCgiCookie class](#ch_cgi.cgi_http_cookies)

-   [The CCgiCookies class](#ch_cgi.cgi_cookies_class)

-   [The CCgiContext class](#ch_cgi.cgi_app_context)

-   [The CCgiUserAgent class](#ch_cgi.The_CCgiUserAgent_cl)

-   [Example code using the CGI classes](#ch_cgi.cgi_examples)

-   [CGI Registry configuration](#ch_cgi.cgi_reg_config)

-   [Supplementary Information](#ch_cgi.appendix)

[CGI Diagnostic Handling](#ch_cgi.cgi_diag.html)

-   [diag-destination](#ch_cgi.cgi_diag.html_ref_destination)

-   [diag-threshold](#ch_cgi.cgi_diag.html_ref_threshold)

-   [diag-format](#ch_cgi.cgi_diag.html_ref_format)

[NCBI C++ CGI Classes](#ch_cgi.)

-   [CCgiRequest](#ch_cgi.prog_man_cgi_1_14)

-   [CCgiResponse](#ch_cgi.prog_man_cgi_1_15)

-   [CCgiCookie](#ch_cgi.prog_man_cgi_1_16)

-   [CCgiCookies](#ch_cgi.prog_man_cgi_1_17)

[An example web-based CGI application](#ch_cgi.html)

-   [Introduction](#ch_cgi.intro)

-   [Program description](#ch_cgi.descrip)

-   [Program design: Distributing the work](#ch_cgi.design)

[CGI Status Codes](#ch_cgi.cgi_response_codes)

[FCGI Redirection and Debugging C++ Toolkit CGI Programs](#ch_cgi.FCGI_Redirection_and_Debugging_C)

<a name="ch_cgi.cg_develop_apps"></a>

Developing CGI applications
---------------------------

-   [Overview of the CGI classes](#ch_cgi.cgi_class_overview)

-   [The CCgiApplication class](#ch_cgi.cgi_app_class)

-   [The CNcbiResource and CNcbiCommand classes](#ch_cgi.cgi_res_class)

-   [The CCgiRequest class](#ch_cgi.cgi_http_req)

-   [The CCgiResponse class](#ch_cgi.cgi_http_resp)

-   [The CCgiCookie class](#ch_cgi.cgi_http_cookies)

-   [The CCgiCookies class](#ch_cgi.cgi_cookies_class)

-   [The CCgiContext class](#ch_cgi.cgi_app_context)

-   [The CCgiUserAgent class](#ch_cgi.The_CCgiUserAgent_cl)

-   [Example code using the CGI classes](#ch_cgi.cgi_examples)

-   [CGI Registry configuration](#ch_cgi.cgi_reg_config)

-   [Supplementary Information](#ch_cgi.appendix)

Although CGI programs are generally run as web applications with HTML interfaces, this section of the Programming Manual places emphasis on the CGI side of things, omitting HTML details of the implementation where possible. Similarly, the section on [Generating web pages](ch_html.html#ch_html.webpgs.html) focuses largely on the usage of HTML components independent of CGI details. The two branches of the NCBI C++ Toolkit hierarchy are all but independent of one another - with but one explicit hook between them: the constructors for HTML [page](ch_html.html#ch_html.page_classes) components accept a [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) as an optional argument. This [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) argument provides the HTML page component with access to all of the CGI objects used in the application.

Further discussion of combining a CGI application with the HTML classes can be found in the section on [An example web-based CGI application](#ch_cgi.html). The focus in this chapter is on the CGI classes only. For additional information about the CGI classes, the reader is also referred to the discussion of [NCBI C++ CGI Classes](#ch_cgi.) in the Reference Manual.

<a name="ch_cgi.cgi_class_overview"></a>

### The CGI classes

[Figure 1](#ch_cgi.F1) illustrates the layered design of the CGI classes.

<a name="ch_cgi.F1"></a>

[![Figure 1. Layered design of the CGI classes](/cxx-toolkit/static/img/cgi.gif)](/cxx-toolkit/static/img/cgi.gif "Click to see the full-resolution image")

Figure 1. Layered design of the CGI classes

This design is best described by starting with a consideration of the capabilities one might need to implement a CGI program, including:

-   A way to retrieve and store the current values of environment variables

-   A means of retrieving and interpreting the client's query request string

-   Mechanisms to service and respond to the requested query

-   Methods and data structures to obtain, store, modify, and send cookies

-   A way to set/reset the context of the application (for Fast-CGI)

The [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) class unifies these diverse capabilities under one aggregate structure. As their names suggest, the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) class receives and parses the request, and the [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) class outputs the response on an output stream. All incoming [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie)s are also parsed and stored by the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) object, and the outgoing cookies are sent along with the response by the [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) object. The request is actually processed by the application's [CNcbiResource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiResource). The list of [CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand)s stored with that resource object are scanned to find a matching command, which is then executed.

The [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) object, which is a `friend` to the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) class, orchestrates this sequence of events in coordination with the application object. The same application may be run in many different contexts, but the `resource` and defined set of `commands` are invariant. What changes with each context is the request and its associated response.

The [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) class is a specialization of [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication). [Figure 2](#ch_cgi.F2) illustrates the adaptation of the [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init) and [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) member functions inherited from the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) class to the requirements of CGI programming. Although the application is `contained` in the context, it is the application which creates and initializes each context in which it participates. The program arguments and environmental variables are passed along to the context, where they will be stored, thus freeing the application to be restarted in a new context, as in Fast-CGI.

<a name="ch_cgi.F2"></a>

[![Figure 2. Adapting the init() and run() methods inherited from CNcbiApplication](/cxx-toolkit/static/img/cgirun.gif)](/cxx-toolkit/static/img/cgirun.gif "Click to see the full-resolution image")

Figure 2. Adapting the init() and run() methods inherited from CNcbiApplication

The application's [ProcessRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessRequest) member function is an abstract function that must be implemented for each application project. In most cases, this function will access the query and the environment variables via the [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext), using ***ctx.GetRequest()*** and ***ctx.GetConfig()***. The application may then service the request using its resource's [HandleRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HandleRequest) method. The context's response object can then be used to send an appropriate response.

These classes are described in more detail below, along with abbreviated synopses of the class definitions. These are included here to provide a conceptual framework and are not intended as reference materials. For example, constructor and destructor declarations that operate on void arguments, and `const` methods that duplicate non-const declarations are generally not included here. Certain virtual functions and data members that have no meaning outside of a web application are also omitted. For complete definitions, refer to the header files via the source browsers.

<a name="ch_cgi.cgi_app_class"></a>

### The CCgiApplication Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiApplication.html))

As mentioned, the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) class implements its own version of [Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiApplication.html#a0a910deea4387498e472b209967569f0), where it instantiates a [CNcbiResource](#ch_cgi.cgi_res_class) object using [LoadResource()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LoadResource). [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiApplication.html#a9c4be90774829c6a66320a2391e7fcbb) is no longer a pure virtual function in this subclass, and its implementation now calls ***CreateContext(), ProcessRequest()***, and [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext)::[GetResponse()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetResponse). The [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) class does **not** have a [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) data member, because the application object can participate in multiple [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext)s. Instead, a local variable in each [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) invocation stores a pointer to the context created there. The [LoadServerContext()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LoadServerContext) member function is used in Web applications, where it is necessary to store more complex run-time data with the context object. The [CCgiServerContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiServerContext) object returned by this function is stored as a data member of a [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) and is application specific.

    class CCgiApplication : public CNcbiApplication 
    { 
        friend class CCgiContext; 

    public: 
        void Init(void); 
        void Exit(void); 
        int Run(void); 

        CNcbiResource& GetResource(void); 
        virtual int ProcessRequest(CCgiContext&) = 0; 
        CNcbiResource* LoadResource(void); 
        virtual CCgiServerContext* LoadServerContext(CCgiContext& context); 

        bool IsFastCGI(void) const; 

    protected: 
        CCgiContext* CreateContext(CNcbiArguments*, CNcbiEnvironment*, 
                                   CNcbiIstream*, CNcbiOstream*); 

    private: auto_ptr<CNcbiResource> m_resource; 
    };

If the program was **not** compiled as a FastCGI application (or the environment does not support FastCGI), then [IsFastCGI()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsFastCGI) will return `false`. Otherwise, a "FastCGI loop" will be iterated over **`def_iter`** times, with the initialization methods and [ProcessRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessRequest) function being executed on each iteration. The value returned by [IsFastCGI()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsFastCGI) in this case is `true`. [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run) first calls [IsFastCGI()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsFastCGI), and if that returns `false`, the application is run as a plain CGI program.

<a name="ch_cgi.cgi_res_class"></a>

### The CNcbiResource ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNcbiResource.html)) and CNcbiCommand ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNcbiCommand.html)) Classes

The resource class is at the heart of the application, and it is here that the program's functionality is defined. The single argument to the resource class's constructor is a [CNcbiRegistry](ch_core.html#ch_core.CNcbiRegistry) object, which defines data paths, resources, and possibly environmental variables for the application. This information is stored in the resource class's data member, **`m_config`**. The only other data member is a [TCmdList](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TCmdList) (a list of [CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand)s) called **`m_cmd`**.

    class CNcbiResource 
    { 
    public: 

        CNcbiResource(CNcbiRegistry& config); 

        CNcbiRegistry&  GetConfig(void); 
        const TCmdList& GetCmdList(void) const; 
        virtual CNcbiCommand* GetDefaultCommand(void) const = 0; 
        virtual const CNcbiResPresentation* GetPresentation(void) const; 

        void AddCommand(CNcbiCommand* command); 
        virtual void HandleRequest(CCgiContext& ctx);

    protected: 

        CNcbiRegistry& m_config; 
        TCmdList m_cmd; 
    };

The [AddCommand()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddCommand) method is used when a resource is being initialized, to add commands to the command list. Given a [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) object defined in a particular context **`ctx`**, [HandleRequest(ctx)](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HandleRequest) compares entries in the context's request to commands in **`m_cmd`**. The first command in **`m_cmd`** that matches an entry in the request is then executed (see below), and the request is considered "handled". If desired, a default command can be installed that will execute when no matching command is found. The default command is defined by implementing the pure virtual function [GetDefaultCommand()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetDefaultCommand). The [CNcbiResPresentation](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCNcbiResPresentation.html) class is an abstract base class, and the member function, [GetPresentation()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetPresentation), returns 0. It is provided as a hook for implementing interfaces between information resources (e.g., databases) and CGI applications.

    class CNcbiCommand 
    { 
    public: 
        CNcbiCommand(CNcbiResource& resource); 

        virtual CNcbiCommand* Clone(void) const = 0; 
        virtual string GetName() const = 0; 
        virtual void Execute(CCgiContext& ctx) = 0; 
        virtual bool IsRequested(const CCgiContext& ctx) const; 

    protected: 
        virtual string GetEntry() const = 0; 
        CNcbiResource& GetResource() const { return m_resource; } 

    private: 
        CNcbiResource& m_resource; 
    };

[CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand) is an abstract base class; its only data member is a reference to the resource it belongs to, and most of its methods - with the exception of [GetResource()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetResource) and [IsRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRequested) - are pure virtual functions. [IsRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRequested) examines the `key=value` entries stored with the context's request object. When an entry is found where `key==GetEntry()` and `value==GetName()`, [IsRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRequested) returns `true`.

The resource's [HandleRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=HandleRequest) method iterates over its command list, calling [CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand)::[IsRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRequested) until the first match between a command and a request entry is found. When [IsRequested()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRequested) returns `true`, the command is `cloned`, and the cloned command is then `executed`. Both the [Execute()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Execute) and [Clone()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Clone) methods are pure virtual functions that must be implemented by the user.

<a name="ch_cgi.cgi_http_req"></a>

### The CCgiRequest Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiRequest.html))

The [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) class serves as an interface between the user's query and the CGI program. Arguments to the constructor include a [CNcbiArguments](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiArguments) object, a [CNcbiEnvironment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiEnvironment) object, and a [CNcbiIstream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiIstream) object. The class constructors do little other than invoke [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest)::[x\_Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=x_Init), where the actual initialization takes place.

[x\_Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=x_Init) begins by examining the environment argument, and if it is `NULL`, **`m_OwnEnv`** (an auto\_ptr) is reset to a dummy environment. Otherwise, **`m_OwnEnv`** is reset to the passed environment, making the request object the effective owner of that environment. The environment is then used to cache network information as "gettable" properties. Cached properties include:

-   server properties, such as the server name, gateway interface, and server port

-   client properties (the remote host and remote address)

-   client data properties (content type and content length of the request)

-   request properties, including the request method, query string, and path information

-   authentication information, such as the remote user and remote identity

-   standard HTTP properties (from the HTTP header)

These properties are keyed to an enumeration named [ECgiProp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/group__CGIReqRes.html#a8) and can be retrieved using the request object's [GetProperty()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetProperty) member function. For example, `GetProperty(eCgi_HttpCookie)` is used to access cookies from the HTTP Header, and `GetProperty(eCgi_RequestMethod)` is used to determine from where the query string should be read.

***NOTE:*** Setting **`$QUERY_STRING`** without also setting **`$REQUEST_METHOD`** will result in a failure by ***x\_init()*** to read the input query. ***x\_init()*** first looks for the definition of **`$REQUEST_METHOD`**, and depending on if it is ***GET*** or ***POST***, reads the query from the environment or the input stream, respectively. If the environment does not define **`$REQUEST_METHOD`**, then [x\_Init()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=x_Init) will try to read the query string from the command line only.

    class CCgiRequest { 
    public: 
        CCgiRequest(const CNcbiArguments*, const CNcbiEnvironment*, 
            CNcbiIstream*, TFlags); 

        static const string& GetPropertyName(ECgiProp prop); 
        const string& GetProperty(ECgiProp prop) const; 
        size_t GetContentLength(void) const; 
        const CCgiCookies& GetCookies(void) const; 
        const TCgiEntries& GetEntries(void) const; 
        static SIZE_TYPE ParseEntries(const string& str, TCgiEntries& entries); 
    private: 
        void x_Init(const CNcbiArguments*, const CNcbiEnvironment*, 
            CNcbiIstream*, TFlags); 

        const CNcbiEnvironment* m_Env; 
        auto_ptr<CNcbiEnvironment> m_OwnEnv; 
        TCgiEntries m_Entries; 
        CCgiCookies m_Cookies; 
    };

This abbreviated definition of the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) class highlights its primary functions:

To parse and store the `<key=value>` pairs contained in the query string (stored in **`m_Entries`**).

To parse and store the cookies contained in the HTTP header (stored in **`m_Cookies`**).

As implied by the "T" prefix, [TCgiEntries](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TCgiEntries) is a type definition, and defines **`m_Entries`** to be an STL multimap of `<string,string>` pairs. The [CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) class (described [below](#ch_cgi.cgi_cookies_class)) contains an STL set of [CCgiCookie](#ch_cgi.cgi_http_cookies) and implements an interface to this set.

<a name="ch_cgi.cgi_http_resp"></a>

### The CCgiResponse Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiResponse.html))

The [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) class provides an interface to the program's output stream (usually **`cout`**), which is the sole argument to the constructor for [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse). The output stream can be accessed by the program using [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse)::[GetOutput()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetOutput), which returns a pointer to the output stream, or, by using [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse)::***out()***, which returns a reference to that stream.

In addition to implementing controlled access to the output stream, the primary function of the response class is to generate appropriate HTML headers that will precede the rest of the response. For example, a typical sequence in the implementation of a particular command's execute function might be:

    MyCommand::Execute(CCgiContext& ctx) 
    { 
        // ... generate the output and store it in MyOutput 

        ctx.GetResponse().WriteHeader(); 
        ctx.GetResponse().out() << MyOutput; 
        ctx.GetResponse.out() << "</body></html>" << endl; 
        ctx.GetResponse.Flush(); 
    }

Any cookies that are to be sent with the response are included in the headers generated by the response object.

Two member functions are provided for outputting HTML headers: [WriteHeader()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=WriteHeader) and ***WriteHeader(CNcbiOstream&)***. The second of these is for writing to a specified stream other than the default stream stored with the response object. Thus, `WriteHeader(out())` is equivalent to `WriteHeader()`.

The [WriteHeader()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=WriteHeader) function begins by invoking [IsRawCgi()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=IsRawCgi) to see whether the application is a [non-parsed header](http://tools.ietf.org/html/rfc3875#section-5) program. If so, then the first header put on the output stream is an HTTP status line, taken from the private static data member, **`sm_HTTPStatusDefault`**. Next, unless the content type has been set by the user (using [SetContentType()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetContentType)), a default content line is written, using **`sm_ContentTypeDefault`**. Any cookies stored in **`m_Cookies`** are then written, followed by any additional headers stored with the request in **`m_HeaderValues`**. Finally, a new line is written to separate the body from the headers.

    class CCgiResponse { 
    public: 
        CCgiResponse(CNcbiOstream* out = 0); 

        void SetRawCgi(bool raw); 
        bool IsRawCgi(void) const; 
        void SetHeaderValue(const string& name, const string& value); 
        void SetHeaderValue(const string& name, const tm& value); 
        void RemoveHeaderValue(const string& name); 
        void SetContentType(const string &type); 
        string GetHeaderValue(const string& name) const; 
        bool HaveHeaderValue(const string& name) const; 
        string GetContentType(void) const; 

        CCgiCookies& Cookies(void);                 // Get cookies set 
        CNcbiOstream* SetOutput(CNcbiOstream* out); // Set default output stream 
        CNcbiOstream* GetOutput(void) const;        // Query output stream 
        CNcbiOstream& out(void) const;              // Conversion to ostream 
                                                    // to enable << 

        void Flush() const; 

        CNcbiOstream& WriteHeader(void) const;  // Write HTTP response header 
        CNcbiOstream& WriteHeader(CNcbiOstream& out) const; 
    protected: 
        typedef map<string, string> TMap; 
        static const string sm_ContentTypeName; 
        static const string sm_ContentTypeDefault; 
        static const string sm_HTTPStatusDefault; 
        bool m_RawCgi; 
        CCgiCookies m_Cookies; 
        TMap m_HeaderValues;    // Additional header lines in alphabetical order 
        CNcbiOstream* m_Output; // Default output stream };

<a name="ch_cgi.cgi_http_cookies"></a>

### The CCgiCookie Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiCookie.html))

The traditional means of maintaining state information when servicing a multi-step request has been to include ***hidden*** input elements in the query strings passed to subsequent URLs. The newer, preferred method uses HTTP cookies, which provide the server access to client-side state information stored with the client. The cookie is a text string consisting of four key=value pairs:

-   name (required)

-   expires (optional)

-   domain (optional)

-   path (optional)

The [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie) class provides a means of creating, modifying, and sending cookies. The constructor requires at least two arguments, specifying the `name` and `value` of the cookie, along with the optional **`domain`** and **`path`** arguments. Format errors in the arguments to the constructor (see [Supplementary Information](#ch_cgi.appendix)) will cause the invalid argument to be thrown. The ***CCgiCookie::Write(CNcbiOstream&)*** member function creates a `Set-Cookie` directive using its private data members and places the resulting string on the specified output stream:

    Set-Cookie: 
    m_Name=
    m_Value; expires=
    m_Expires; path=
    m_Path; 
    domain=
    m_Domain; 
    m_Secure

As with the constructor, and in compliance with the proposed standard ([RFC 6265](http://tools.ietf.org/html/rfc6265)), only the name and value are mandatory in the directive.

    class CCgiCookie {
    public:
        CCgiCookie(const string& name, const string& value,
                   const string& domain = NcbiEmptyString,
                   const string& path   = NcbiEmptyString);
        const string& GetName(void) const;
        CNcbiOstream& Write(CNcbiOstream& os) const;
        void Reset(void);
        void CopyAttributes(const CCgiCookie& cookie);
        void SetValue  (const string& str);
        void SetDomain (const string& str);
        void SetPath   (const string& str);
        void SetExpDate(const tm& exp_date);
        void SetSecure (bool secure);
        const string& GetValue  (void) const;
        const string& GetDomain (void) const;
        const string& GetPath   (void) const;
        string        GetExpDate(void) const;
        bool GetExpDate(tm* exp_date) const;
        bool GetSecure(void)          const;
        bool operator<(const CCgiCookie& cookie) const;
        typedef const CCgiCookie* TCPtr;
        struct PLessCPtr {
            bool operator() (const TCPtr& c1, const TCPtr& c2) const {
                return (*c1 < *c2);
            }
        };
    private:
        string m_Name;
        string m_Value;
        string m_Domain;
        string m_Path;
        tm     m_Expires;
        bool   m_Secure;
    };

With the exception of **`m_Name`**, all of the cookie's data members can be reset using the ***SetXxx(), Reset()***, and [CopyAttributes()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CopyAttributes) member functions; **`m_Name`** is non-mutable. As with the constructor, format errors in the arguments to these functions will cause the invalid argument to be thrown. By default, **`m_Secure`** is `false`. The ***GetXxx()*** methods return the stored value for that attribute or, if no value has been set, a reference to [NcbiEmptyString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=NcbiEmptyString). `GetExpDate(tm*)` returns `false` if no expiration date was previously set. Otherwise, **`tm`** is reset to **`m_Expire`**, and `true` is returned.

<a name="ch_cgi.cgi_cookies_class"></a>

### The CCgiCookies Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiCookies.html))

The [CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) class provides an interface to an STL set of [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie)s (**`m_Cookies`**). Each cookie in the set is uniquely identified by its name, domain, and path values and is stored in ascending order using the [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie)::[PLessCPtr](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=PLessCPtr) construct. Two constructors are provided, allowing the user to initialize **`m_Cookies`** to either an empty set or to a set of **`N`** new cookies created from the string "name1=value1; name2=value2; ...; nameN=valuenN". Many of the operations on a [CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) object involve iterating over the set, and the class's type definitions support these activities by providing built-in iterators and a typedef for the set, [TSet](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TSet).

The [Add()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Add) methods provide a variety of options for creating and adding new cookies to the set. As with the constructor, a single string of name-value pairs may be used to create and add **`N`** cookies to the set at once. Previously created cookies can also be added to the set individually or as sets. Similarly, the [Remove()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Remove) methods allow individual cookies or sets of cookies (in the specified range) to be removed. All of the remove functions destroy the removed cookies when `destroy=true`. ***CCgiCookies::Write(CNcbiOstream&)*** iteratively invokes the [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie)::[Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write) on each element.

    class CCgiCookies {
    public:
        typedef set<CCgiCookie*, CCgiCookie::PLessCPtr>  TSet;
        typedef TSet::iterator         TIter;
        typedef TSet::const_iterator   TCIter;
        typedef pair<TIter,  TIter>    TRange;
        typedef pair<TCIter, TCIter>   TCRange;
        CCgiCookies(void);           // create empty set of cookies
        CCgiCookies(const string& str);
        // str = "name1=value1; name2=value2; ..."
        bool Empty(void) const;
        CCgiCookie* Add(const string& name, const string& value,
                        const string& domain = NcbiEmptyString,
                        const string& path   = NcbiEmptyString);
        CCgiCookie* Add(const CCgiCookie& cookie);
        void Add(const CCgiCookies& cookies);
        void Add(const string& str);
        // "name1=value1; name2=value2; ..."
       CCgiCookie* Find(const string& name, const string& domain,
                        const string& path);
        CCgiCookie* Find(const string& name, TRange*  range=0);
        bool Remove(CCgiCookie* cookie, bool destroy=true);
        size_t Remove(TRange& range, bool destroy=true);
        size_t Remove(const string& name, bool destroy=true);
        void Clear(void);
        CNcbiOstream& Write(CNcbiOstream& os) const;
    private:
        TSet m_Cookies;
    };

<a name="ch_cgi.cgi_app_context"></a>

### The CCgiContext Class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiContext.html))

As depicted in [Figure 1](#ch_cgi.cgi_class_overview), a [CCgiContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiContext) object contains an application object, a request object, and a response object, corresponding to its data members **`m_app, m_request`**, and **`m_response`**. Additional data members include a string encoding the URL for the context (**`m_selfURL`**), a message buffer (**`m_lmsg`**), and a [CCgiServerContext](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiServerContext). These last three data members are used only in complex Web applications, where it is necessary to store more complex run-time data with the context object. The message buffer is essentially an STL list of string objects the class definition of which ([CCtxMsgString](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCtxMsgString)) includes a [Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write) output function. [GetServCtx()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetServCtx) returns **`m_srvCtx`** if it has been defined and, otherwise, calls the application's [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication)::[LoadServerContext()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=LoadServerContext) to obtain it.

    class CCgiContext
    {
    public:
        CCgiContext(CCgiApplication&        app,
                    const CNcbiArguments*   args = 0,
                    const CNcbiEnvironment* env  = 0,
                    CNcbiIstream*           inp  = 0,
                    CNcbiOstream*           out  = 0);
        const CCgiApplication& GetApp(void) const;
        CNcbiRegistry&     GetConfig(void);
        CCgiRequest&       GetRequest(void);
        CCgiResponse&      GetResponse(void);
        const string&      GetSelfURL(void) const;
        CNcbiResource&     GetResource(void);
        CCgiServerContext&     GetServCtx(void);
        // output all msgs in m_lmsg to os
        CNcbiOstream& PrintMsg(CNcbiOstream& os);   
        void PutMsg(const string& msg);     // add message to m_lmsg
        void PutMsg(CCtxMsg* msg);          // add message to m_lmsg
        bool EmptyMsg(void);            // true iff m_lmsg is empty
        void ClearMsg(void);            // delete all messages in m_lmsg
        string GetRequestValue(const string& name) const;
        void AddRequestValue(const string& name, const string& value);
        void RemoveRequestValues(const string& name);
        void ReplaceRequestValue(const string& name, const string& value);
    private:
        CCgiApplication&      m_app;
        auto_ptr<CCgiRequest> m_request;
        CCgiResponse      m_response;
        mutable string    m_selfURL;
        list<CCtxMsg*>        m_lmsg;        // message buffer
        auto_ptr<CCgiServerContext> m_srvCtx;
        // defined by CCgiApplication::LoadServerContext()
        friend class CCgiApplication;
    };

<a name="ch_cgi.The_CCgiUserAgent_cl"></a>

### The CCgiUserAgent class ([\*](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCCgiUserAgent.html))

The [CCgiUserAgent](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiUserAgent) class is used to gather information about the client's user agent - i.e. browser type, browser name, browser version, browser engine type, browser engine version, Mozilla version (if applicable), platform, and robot information. The default constructor looks for the user agent string first in the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) context using the **`eCgi_HttpUserAgent`** request property, then in the [CNcbiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiApplication) instance **`HTTP_USER_AGENT`** environment variable, and finally in the operating system **`HTTP_USER_AGENT`** environment variable.

    class CCgiUserAgent
    {
    public:
        CCgiUserAgent(void);
        CCgiUserAgent(const string& user_agent);

        void Reset(const string& user_agent);

        string           GetUserAgentStr(void) const;
        EBrowser         GetBrowser(void) const;
        const string&    GetBrowserName(void) const;
        EBrowserEngine   GetEngine(void) const;
        EBrowserPlatform GetPlatform(void) const;

        const TUserAgentVersion& GetBrowserVersion(void) const;
        const TUserAgentVersion& GetEngineVersion(void) const;
        const TUserAgentVersion& GetMozillaVersion(void) const;

        typedef unsigned int TBotFlags;
        bool IsBot(TBotFlags flags = fBotAll, const string& patterns = kEmptyStr) const;

    protected:
        void x_Init(void);
        void x_Parse(const string& user_agent);
        bool x_ParseToken(const string& token, int where);

    protected:
        string            m_UserAgent;
        EBrowser          m_Browser;
        string            m_BrowserName;
        TUserAgentVersion m_BrowserVersion;
        EBrowserEngine    m_Engine;
        TUserAgentVersion m_EngineVersion;
        TUserAgentVersion m_MozillaVersion;
        EBrowserPlatform  m_Platform;
    };

<a name="ch_cgi.cgi_examples"></a>

### Example Code Using the CGI Classes

The [sample CGI program](#ch_cgi.html) demonstrates a simple application that combines the NCBI C++ Toolkit's CGI and HTML classes. [justcgi.cpp](#ch_cgi.cgi_cpp.html) is an adaptation of that program, stripped of all HTML references and with additional request-processing added (see [Box 1](#ch_cgi.cgi_cpp.html) and [Box 2](#ch_cgi.cgi_hpp.html)).

<a name="ch_cgi.cgi_cpp.html"></a>

#### Box 1

    // File name: justcgi.cpp
    // Description: Demonstrate the basic CGI classes and functions
    #include "justcgi.hpp"
    #include <cgi/cgictx.hpp>
    #include <corelib/ncbistd.hpp>
    #include <corelib/ncbireg.hpp>
    #include <memory>
    USING_NCBI_SCOPE;
    /////////////////////////////////////////////////////////////////////////
    // Implement the application's LoadResource() and ProcessRequest() methods
    CNcbiResource* CCgiApp::LoadResource(void)
    {
        auto_ptr<CCgiResource> resource(new CCgiResource(GetConfig()));
        resource->AddCommand(new CCgiBasicCommand(*resource));
        resource->AddCommand(new CCgiReplyCommand(*resource));
        return resource.release();
    }
    // forward declarations 
    void ShowCommands (const TCmdList& cmds, CCgiContext& ctx);
    void ShowEntries (const TCgiEntries& entries);
    int CCgiApp::ProcessRequest(CCgiContext& ctx)
    {
        ShowCommands (GetResource().GetCmdList(), ctx);
        ShowEntries (const_cast<TCgiEntries&>(ctx.GetRequest().GetEntries()));
        GetResource().HandleRequest(ctx);
        return 0;
    }
    /////////////////////////////////////////////////////////////
    // Define the resource's default command if none match query
    CNcbiCommand* CCgiResource::GetDefaultCommand(void) const
    {
        cerr << "    executing CCgiResource::GetDefaultCommand()" << endl;
        return new CCgiBasicCommand(const_cast<CCgiResource&>(*this));
    }
    ///////////////////////////////////////////////////////////////
    // Define the Execute() and Clone() methods for the commands 
    void CCgiCommand::Execute(CCgiContext& ctx)
    {
        cerr << "    executing CCgiCommand::Execute " << endl;
        const CNcbiRegistry& reg = ctx.GetConfig();
        ctx.GetResponse().WriteHeader();
    }
    CNcbiCommand* CCgiBasicCommand::Clone(void) const
    {
        cerr << "    executing CCgiBasicCommand::Clone()" << endl;
        return new CCgiBasicCommand(GetCgiResource());
    }
    CNcbiCommand* CCgiReplyCommand::Clone(void) const
    {
        cerr << "    executing CCgiReplyCommand::Clone" << endl;
        return new CCgiReplyCommand(GetCgiResource());
    }
    // Show what commands have been installed
    void ShowCommands (const TCmdList& cmds, CCgiContext& ctx)
    {
        cerr << "Commands defined for this application are: \n";
        ITERATE(TCmdList, it, cmds) {
             cerr << (*it)->GetName();
             if ((*it)->IsRequested(ctx)) {
                cerr << " (requested)" << endl;
             } else {
                cerr << " (not requested)" << endl;
             }
        }
    }
    // Show the <key=value> pairs in the request string 
    void ShowEntries (const TCgiEntries& entries)
    {
        cerr << "The entries in the request string were: \n";
        ITERATE(TCgiEntries, it, entries) {
             if (! (it->first.empty() && it->second.empty()))
                cerr << it->first << "=" << it->second << endl;
        }
    }
    static CCgiApp theCgiApp;
    int main(int argc, const char* argv[])
    {
        SetDiagStream(&cerr);
        return theCgiApp.AppMain(argc, argv);
    }

<a name="ch_cgi.cgi_hpp.html"></a>

#### Box 2

    // File name: justcgi.hpp
    // Description: Demonstrate the basic CGI classes and functions
    #ifndef CGI_HPP
    #define CGI_HPP
    #include <cgi/cgiapp.hpp>
    #include <cgi/ncbires.hpp>
    USING_NCBI_SCOPE;
    class CCgiApp : public CCgiApplication
    {
    public:
        virtual CNcbiResource* LoadResource(void);
        virtual int ProcessRequest(CCgiContext& context);
    };
    class CCgiResource : public CNcbiResource
    {
    public:
        CCgiResource(CNcbiRegistry& config)
          : CNcbiResource(config) {}
        virtual ~CCgiResource() {};
        // defines the command to be executed when no other command matches
        virtual CNcbiCommand* GetDefaultCommand( void ) const;
    };
    class CCgiCommand : public CNcbiCommand
    {
    public:
        CCgiCommand( CNcbiResource& resource ) : CNcbiCommand(resource) {};
        virtual ~CCgiCommand( void ) {};
        virtual void Execute( CCgiContext& ctx );
        virtual string GetLink(CCgiContext&) const { return NcbiEmptyString; }
    protected:
        CCgiResource& GetCgiResource() const
            {
      return dynamic_cast<CCgiResource&>( GetResource() );
    }
        virtual string GetEntry() const { return string("cmd"); }
    };
    class CCgiBasicCommand : public CCgiCommand
    {
    public:
        CCgiBasicCommand(CNcbiResource& resource) : CCgiCommand(resource) {};
        virtual ~CCgiBasicCommand(void) {};
        virtual CNcbiCommand* Clone( void ) const;
        virtual string GetName( void ) const { return string("init"); };
    protected:
        virtual string GetEntry() const { return string("cmd1"); }
    };
    class CCgiReplyCommand : public CCgiBasicCommand
    {
    public:
        CCgiReplyCommand( CNcbiResource& resource) : CCgiBasicCommand(resource) {};
        virtual ~CCgiReplyCommand(void) {};
        virtual CNcbiCommand* Clone( void ) const;
        virtual string GetName( void ) const { return string("reply"); };
    protected:
        virtual string GetEntry() const { return string("cmd2"); }
    };
    #endif /* CGI_HPP */

Executing

    ./cgi 'cmd1=init&cmd2=reply'

results in execution of only **`cmd1`**, as does executing

    ./cgi 'cmd2=reply&cmd1=init'

The commands are matched in the order that they are registered with the resource, not according to the order in which they occur in the request. The assumption is that only the first entry (if any) in the query actually specifies a command, and that the remaining entries provide optional arguments to that command. The Makefile (see [Box 3](#ch_cgi.make_)) for this example links to both the `xncbi` and `xcgi` libraries. Additional examples using the CGI classes can be found in [src/cgi/test](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/cgi/test). (For Makefile.fastcgi.app, see [Box 4](#ch_cgi.make_f).)

<a name="ch_cgi.make_"></a>

#### Box 3

    # Author: Diane Zimmerman 
    # Build CGI application "CGI" 
    # NOTE: see  to build Fast-CGI 
    ################################# 
    APP = cgi 
    OBJ = cgiapp 
    LIB = xcgi xncbi

<a name="ch_cgi.make_f"></a>

#### Box 4

    # Author: Diane Zimmerman 
    # Build test Fast-CGI application "FASTCGI" 
    # NOTES:  - it will be automagically built as a plain CGI application if 
    #           Fast-CGI libraries are missing on your machine. 
    #         - also, it auto-detects if it is run as a FastCGI or a plain 
    #           CGI, and behave appropriately. 
    ################################# 
    APP = fastcgi 
    OBJ = cgiapp 
    LIB = xfcgi xncbi 
    LIBS = $(FASTCGI_LIBS) $(ORIG_LIBS)

<a name="ch_cgi.cgi_reg_config"></a>

### CGI Registry Configuration

The application registry defines CGI-related configuration settings in the **`[CGI]`** section (see [this table](ch_libconfig.html#ch_libconfig.CGI)).

FastCGI settings. **`[FastCGI]`** section (see [this table](ch_libconfig.html#ch_libconfig.FCGI)).

CGI load balancing settings. **`[CGI-LB]`** section (see [this table](ch_libconfig.html#ch_libconfig.CGI_Load_balancing_configur)).

<a name="ch_cgi.appendix"></a>

### Supplementary Information

Restrictions on arguments to the [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie) constructor.

See [Table 1](#ch_cgi.T5).

<a name="ch_cgi.T5"></a>

Table 1. Restrictions on arguments to the CCgiCookie constructor

| Field | Restrictions      |
|-------------------|-------------------------------------------------------------|
| name (required)   | No spaces; must be printable ASCII; cannot contain = , or ; |
| value (required)  | No spaces; must be printable ASCII; cannot contain , or ;   |
| domain (optional) | No spaces; must be printable ASCII; cannot contain , or ;   |
| path (optional)   | Case sensitive    |

<div class="table-scroll"></div>

<a name="ch_cgi.cgi_diag.html"></a>

CGI Diagnostic Handling
-----------------------

By default, CGI applications support three query parameters affecting [diagnostic output](ch_core.html#ch_core.diag): [diag-destination](#ch_cgi.cgi_diag.html_ref_destination), [diag-threshold](#ch_cgi.cgi_diag.html_ref_threshold), and [diag-format](#ch_cgi.cgi_diag.html_ref_format). It is possible to modify this behavior by overriding the virtual function [CCgiApplication::ConfigureDiagnostics](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConfigureDiagnostics). (In particular, production applications may wish to disable these parameters by defining [ConfigureDiagnostics](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ConfigureDiagnostics) to be a no-op.)

<a name="ch_cgi.cgi_diag.html_ref_destination"></a>

### diag-destination

The parameter **`diag-destination`** controls where diagnostics appear. By default, there are two possible values (see [Table 2](#ch_cgi.T6)).

<a name="ch_cgi.T6"></a>

Table 2. Effect of setting the diag-destination parameter

| value  | effects                |
|--------|------------------------------------------------------------------|
| stderr | Send diagnostics to the standard error stream (default behavior) |
| asbody | Send diagnostics to the client in place of normal output   |

<div class="table-scroll"></div>

However, an application can make other options available by calling [RegisterDiagFactory](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=RegisterDiagFactory) from its [Init](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Init) routine. In particular, calling

    #include <connect/email_diag_handler.hpp> 
    ... 
    RegisterDiagFactory("email", new CEmailDiagFactory);

and linking against `xconnect` and `connect` enables destinations of the form `email:user@host`, which will cause the application to e-mail diagnostics to the specified address when done.

Similarly, calling

    #include <html/commentdiag.hpp> 
    ... 
    RegisterDiagFactory("comments", new CCommentDiagFactory);

and linking against `xhtml` will enable the destination `comments`. With this destination, diagnostics will take the form of comments in the generated HTML, provided that the application has also used [SetDiagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagNode) to indicate where they should go. (Applications may call that function repeatedly; each invocation will affect all diagnostics until the next invocation. Also, [SetDiagNode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagNode) is effectively a no-op for destinations other than `comments`, so applications may call it unconditionally.)

Those destinations are not available by default because they introduce additional dependencies; however, either may become a standard possibility in future versions of the toolkit.

<a name="ch_cgi.cgi_diag.html_ref_threshold"></a>

### diag-threshold

The parameter **`diag-threshold`** sets the minimum [severity level](ch_core.html#ch_core.diag_severity) of displayed diagnostics; its value can be either `fatal`, `critical`, `error`, `warning`, `info`, or `trace`. For the most part, setting this parameter is simply akin to calling [SetDiagPostLevel](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagPostLevel). However, setting **`diag-threshold`** to `trace` is **not** equivalent to calling `SetDiagPostLevel(eDiag_Trace)`; the former reports all diagnostics, whereas the latter reports only traces.

<a name="ch_cgi.cgi_diag.html_ref_format"></a>

### diag-format

Finally, the parameter **`diag-format`** controls diagnostics' default appearance; setting it is akin to calling [{Set,Unset}DiagPostFlag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetDiagPostFlag). Its value is a list of flags, delimited by spaces (which appear as "+" signs in URLs); possible flags are `file`, `path`, `line`, `prefix`, `severity`, `code`, `subcode`, `time`, `omitinfosev`, `all`, `trace`, `log`, and `default`. Every flag but `default` corresponds to a value in [EDiagPostFlag](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EDiagPostFlag), and can be turned off by preceding its name with an exclamation point ("!"). `default` corresponds to the four flags which are on by default: `line`, `prefix`, `code`, and `subcode`, and may not be subtracted.

<a name="ch_cgi."></a>

NCBI C++ CGI Classes
--------------------

The Common Gateway Interface (CGI) is a method used by web servers to pass information from forms displayed in a web browser to a program running on the server and then allow the program to pass a web page back. The NCBI C++ CGI Classes are used by the program running on the server to decode the CGI input from the server and to send a response. The library also supports cookies, which is a method for storing information on the user's machine. The library supports the http methods GET and POST via application/x-www-form-urlencoded, and supports the POST via multipart/form-data (often used for file upload). In the POST via multipart/form-data, the data gets read into a [TCgiEntries](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=TCgiEntries); you also can get the filename out of it (the name of the entry is as specified by "name=" of the data-part header). 

There are 5 main classes:

[CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest)–what the CGI program is getting from the client.

[CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse)–what the CGI program is sending to the client.

[CCgiEntry](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiEntry)–a single field value, optionally accompanied by a filename.

[CCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCookie)–a single cookie

[CCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCookies)–a cookie container

Note: In the following libraries you will see references to the following typedefs: [CNcbiOstream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiOstream) and [CNcbiIstream](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiIstream). On Solaris and NT, these are identical to the standard library output stream (ostream) and input stream (istream) classes. These typedefs are used on older computers to switch between the old stream library and the new standard library stream classes. Further details can be found in an accompanying document (to be written).

A demo program, cgidemo.cpp, can be found in internal/c++/src/corelib/demo.

<a name="ch_cgi.prog_man_cgi_1_14"></a>

### CCgiRequest

[CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) is the class that reads in the input from the web server and makes it accessible to the CGI program.

[CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) uses the following typedefs to simplify the code:

    typedef map<string, string>         TCgiProperties
    typedef multimap<string, CCgiEntry> TCgiEntries
    typedef TCgiEntries::iterator       TCgiEntriesI
    typedef list<string>                TCgiIndexes

All of the basic types come from the C++ Standard library (`http://www.sgi.com/Technology/STL/`)

**CCgiRequest(int argc, char\* argv[], CNcbiIstream\* istr=0, bool indexes\_as\_entries=true)**

A CGI program can receive its input from three sources: the command line, environment variables, and an input stream. Some of this input is given to the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) class by the following arguments to the constructor:

`int argc, char* argv[]` : standard command line arguments.

`CNcbiIstream* istr=0` : the input stream to read from. If 0, reads from stdin, which is what most web servers use.

`bool indexes_as_entries=true` : if query has any ISINDEX like terms (i.e. no "=" sign), treat it as a form query (i.e. as if it had an "=" sign).

Example:

    CCgiRequest * MyRequest = new CCgiRequest(argc, argv);

**const TCgiEntries& GetEntries(void) const**

Get a set of decoded form entries received from the web browser. So if you sent a cgi query of the form ?name=value, the multimap referenced by TCgiEntries& includes "name" as a .first member and \<"value", ""\> as a .second member.

TCgiEntries& also includes "indexes" if "indexes\_as\_entries" in the constructor was "true".

**const TCgiIndexes& GetIndexes(void) const**

This performs a similar task as [GetEntries()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEntries), but gets a set of decoded entries received from the web browser that are ISINDEX like terms (i.e. no "=" sign),. It will always be empty if "indexes\_as\_entries" in the constructor was "true"(default).

**const string& GetProperty(ECgiProp prop) const**

Get the value of a standard property (empty string if not specified). See the "Standard properties" list below.

**static const string& GetPropertyName(ECgiProp prop)**

The web server sends the CGI program properties of the web server and the http headers received from the web browser (headers are simply additional lines of information sent in a http request and response). This API gets the name(not value!) of standard properties. See the "Standard properties" list below.

**Standard properties:**

    eCgi_ServerSoftware ,
    eCgi_ServerName,
    eCgi_GatewayInterface,
    eCgi_ServerProtocol,
    eCgi_ServerPort,        // see also "GetServerPort()"
    // client properties
    eCgi_RemoteHost,
    eCgi_RemoteAddr,        // see also "GetRemoteAddr()"
    // client data properties
    eCgi_ContentType,
    eCgi_ContentLength,     // see also "GetContentLength()"
    // request properties
    eCgi_RequestMethod,
    eCgi_PathInfo,
    eCgi_PathTranslated,
    eCgi_ScriptName,
    eCgi_QueryString,
    // authentication info
    eCgi_AuthType,
    eCgi_RemoteUser,
    eCgi_RemoteIdent,
    // semi-standard properties(from HTTP header)
    eCgi_HttpAccept,
    eCgi_HttpCookie,
    eCgi_HttpIfModifiedSince,
    eCgi_HttpReferer,
    eCgi_HttpUserAgent

**const string& GetRandomProperty(const string& key) const**

Gets value of any http header that is passed to the CGI program using environment variables of the form **`"$HTTP_<key>"`**. In general, these are special purpose http headers not included in the list above.

**Uint2 GetServerPort(void) const**

Gets the server port used by web browser to access the server.

**size\_t GetContentLength(void) const**

Returns the length of the http request.

**const CCgiCookies& GetCookies(void) const**

Retrieve the cookies that were sent with the request. Cookies are text buffers that are stored in the user's web browsers and can be set and read via http headers. See the CCookie and CCookies classes defined below.

**static SIZE\_TYPE ParseEntries(const string& str, TCgiEntries& entries)**

This is a helper function that isn't normally used by CGI programs. It allows you to decode the URL-encoded string "str" into a set of entries \<"name", "value"\> and add them to the "entries" multimap. The new entries are added without overriding the original ones, even if they have the same names. If the "str" is in ISINDEX format then the entry "value" will be empty. On success, return zero; otherwise return location(1-base) of error.

**static SIZE\_TYPE ParseIndexes(const string& str, TCgiIndexes& indexes)**

This is also a helper function not usually used by CGI programs. This function decodes the URL-encoded string "str" into a set of ISINDEX-like entries (i.e. no "=" signs in the query) and adds them to the "indexes" set. On success, return zero, otherwise return location(1-base) of error.

<a name="ch_cgi.prog_man_cgi_1_15"></a>

### CCgiResponse

[CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) is the object that takes output from the CGI program and sends it to the web browser via the web server.

**CNcbiOstream& WriteHeader() const**

**CNcbiOstream& WriteHeader(CNcbiOstream& out) const**

This writes the MIME header necessary for all documents sent back to the web browser. By default, this function assumes that the "Content-type" is "text/html". Use the second form of the function if you want to use a stream other that the default.

**void SetContentType(const string &type)**

Sets the content type. By default this is "text/html". For example, if you were to send plaintext back to the client, you would set type to "text/plain".

**string GetContentType(void) const**

Retrieves the content type.

**CNcbiOstream& out(void) const**

This returns a reference to the output stream being used by the [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) object. Example:

    CCgiResponse Response; 
    Response.WriteHeader(); 
    Response.out() << "hello, world" << flush;

**CNcbiOstream\* SetOutput(CNcbiOstream\* out)**

Sets the default output stream. By default this is stdout, which is what most web servers use.

**CNcbiOstream\* GetOutput(void) const**

Get the default output stream.

**void Flush() const**

Flushes the output stream.

**void SetRawCgi(bool raw)**

Turns on [non-parsed](http://tools.ietf.org/html/rfc3875#section-5) cgi mode. When this is turned on AND the name of the cgi program begins with "nph-", then the web server does no processing of the data sent back to the client. In this situation, the client must provide all appropriate http headers. This boolean switch causes some of these headers to be sent.

**bool IsRawCgi(void) const**

Check to see if [non-parsed](http://tools.ietf.org/html/rfc3875#section-5) cgi mode is on.

**void SetHeaderValue(const string& name, const string& value)**

Sets an http header with given name and value. For example, SetHeaderValue("Mime-Version", "1.0"); will create the header "Mime-Version: 1.0".

**void SetHeaderValue(const string& name, const tm& value)**

Similar to the above, but sets a header value using a date. See time.h for the definition of tm.

**void RemoveHeaderValue(const string& name)**

Remove the header with name name.

**string GetHeaderValue(const string& name) const**

Get the value of the header with name name.

**bool HaveHeaderValue(const string& name) const**

Check to see if the header with name name exists.

**void AddCookie(const string& name, const string& value) void AddCookie(const CCgiCookie& cookie)**

Add a cookie to the response. This can either be a name, value pair or use the CCookie class described below.

**void AddCookies(const CCgiCookies& cookies)**

Add a set of cookies to the response. See the CCookies class described below.

**const CCgiCookies& Cookies(void) const CCgiCookies& Cookies(void)**

Return the set of cookies to be sent in the response.

**void RemoveCookie(const string& name)**

Remove the cookie with the name name.

**void RemoveAllCookies(void)**

Remove all cookies.

**bool HaveCookies(void) const**

Are there cookies?

**bool HaveCookie(const string& name) const**

Is there a cookie with the given name?

**CCgiCookie\* FindCookie(const string& name) const**

Return a cookie with the given name.

<a name="ch_cgi.prog_man_cgi_1_16"></a>

### CCgiCookie

A cookie is a name, value string pair that can be stored on the user's web browser. Cookies are allocated per site and have restrictions on size and number. Cookies have attributes, such as the domain they originated from. [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie) is used by the [CCgiRequest](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiRequest) and [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse) classes.

**CCgiCookie(const string& name, const string& value)**

Creates a cookie with the given name and value. Throw the "invalid\_argument" if "name" or "value" have invalid format:

-   the "name" must not be empty; it must not contain '='

-   both "name" and "value" must not contain: ";, "

**const string& GetName (void) const**

Get the cookie name. The cookie name cannot be changed.

**CNcbiOstream& Write(CNcbiOstream& os) const**

Write the cookie out to ostream os. Normally this is handled by [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse).

**void Reset(void)**

Reset everything but the name to the default state

**void CopyAttributes(const CCgiCookie& cookie)**

Set all attribute values(but name!) to those from "cookie"

**void SetValue (const string& str) void SetDomain (const string& str) void SetValidPath (const string& str) void SetExpDate (const tm& exp\_date) void SetSecure (bool secure) // "false" by default**

These function set the various properties of a cookie. These functions will throw "invalid\_argument" if "str" has invalid format. For the definition of tm, see time.h.

**bool GetValue (string\* str) const bool GetDomain (string\* str) const bool GetValidPath (string\* str) const bool GetExpDate (string\* str) const bool GetExpDate (tm\* exp\_date) const bool GetSecure (void) const**

These functions return true if the property is set. They also return value of the property in the argument. If the property is not set, str is emptied. These functions throw the "invalid\_argument" exception if the argument is a zero pointer.

The string version of [GetExpDate](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetExpDate) will return a string of the form "Wed Aug 9 07:49:37 1994"

<a name="ch_cgi.prog_man_cgi_1_17"></a>

### CCgiCookies

[CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) aggregates a collection of [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie)

**CCgiCookies(void) CCgiCookies(const string& str)**

Creates a [CCgiCookies](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookies) container. To initialize it with a cookie string, use the format: "name1=value1; name2=value2; ..."

**CCgiCookie\* Add(const string& name, const string& value)**

Add a cookie with the given name, value pair. Note the above requirements on the string format. Overrides any previous cookie with same name.

**CCgiCookie\* Add(const CCgiCookie& cookie)**

Add a [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie).

**void Add(const CCgiCookies& cookies)**

Adds a [CCgiCookie](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiCookie) of cookies.

**void Add(const string& str)**

Adds cookies using a string of the format "name1=value1; name2=value2; ..." Overrides any previous cookies with same names.

**CCgiCookie\* Find(const string& name) const**

Looks for a cookie with the given name. Returns zero not found.

**bool Empty(void) const**

"true" if contains no cookies.

**bool Remove(const string& name)**

Find and remove a cookie with the given name. Returns "false" if one is not found.

**void Clear(void)**

Remove all stored cookies

**CNcbiOstream& Write(CNcbiOstream& os) const**

Prints all cookies into the stream "os" (see also ***CCgiCookie::*[Write()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Write)). Normally this is handled by [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse).

<a name="ch_cgi.html"></a>

An example web-based CGI application
------------------------------------

-   [Introduction](#ch_cgi.intro)

-   [Program description](#ch_cgi.descrip)

-   [Program design: Distributing the work](#ch_cgi.design)

<a name="ch_cgi.intro"></a>

### Introduction

The previous two chapters described the NCBI C++ Toolkit's [CGI](#ch_cgi.cg_develop_apps) and [HTML](ch_html.html#ch_html.webpgs.html) classes, with an emphasis on their independence from one another. In practice however, a real application must employ both types of objects, with a good deal of inter-dependency.

As described in the description of the CGI classes, the [CNcbiResource](#ch_cgi.cgi_res_class) class can be used to implement an application whose functionality varies with the query string. Specifically, the resource class contains a list of [CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand) objects, each of which has a defined [GetName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetName) and [GetEntry()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEntry)method. The only command selected for execution on a given query is the one whose [GetName()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetName) and [GetEntry()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=GetEntry) values match the leading `key=value` pair in the query string.

The [CHelloResource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHelloResource) class has different commands which will be executed depending on whether the query string invoked an `init` or a `reply` command. For many applications however, this selection mechanism adds unnecessary complexity to the interface, as the application always performs the same function, albeit on different input. In these cases, there is no need to use a [CNcbiResource](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiResource) object, or [CNcbiCommand](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNcbiCommand) objects, as the necessary functionality can be encoded directly in the application's [ProcessRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessRequest) method. The example program described in this section uses this simpler approach.

<a name="ch_cgi.descrip"></a>

### Program description

The **car.cgi** program presents an HTML form for ordering a custom color car with selected features. The form includes a group of checkboxes (listing individual features) and a set of radio buttons listing possible colors. Initially, no features are selected, and the default color is black. Following the form, a summary stating the currently selected features and color, along with a price quote, is displayed. When the `submit` button is clicked, the form generates a new query string (which includes the selected features and color), and the program is restarted.

The program uses a [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCHTMLPage.html) object with a template file ([car.html](ch_demo.html#ch_demo.carhtml)) to create the display. The template file contains three \<@tag@\> locations, which the program uses to map [CNCBINode](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNCBINode)s to the page, using the [AddTagMap()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=AddTagMap) method. Here is an outline of the execution sequence:

Create an instance of class ***CCar*** named **`car`**.

Load **`car`** with the color and features specified in the query string.

Create a [CHTMLPage](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLPage) named **`page`**.

Generate a [CHTML\_form](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_form) object using the features and color currently selected for **`car`**, and map that HTML form to the \<@FORM@\> tag in **`page`**.

Generate the summary statement and save it in a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node mapped to the \<@SUMMARY@\> tag.

Generate a price quote and save it in a [CHTMLText](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTMLText) node mapped to the \<@PRICE@\> tag.

Output **`page`** and exit.

The ***CCar*** created in step 1 initially has the default color (black) and no features. Any features or colors specified in the query string with which the program was invoked are added to **`car`** in step 2, prior to generating the HTML display elements. In step 4, the form element is created using the set of possible features and the set of possible colors. These sets of attributes are stored as static data members in an external utility class, ***CCarAttr***. Each feature corresponds to a [CHTML\_checkbox](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_checkbox) element in the form, and each color corresponds to a [CHTML\_radio](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_radio) button. The selected color, along with all currently selected features, will be displayed as selected in the form.

The summary statement uses a [CHTML\_ol](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CHTML_ol) list element to itemize the selected features in **`car`**. The price is calculated as **`CCar::m_BasePrice`** plus an additional $1000 per feature. The `submit` button generates a fresh page with the new query string, as the `action` attribute of the form is the URL of **car.cgi**.

<a name="ch_cgi.design"></a>

### Program design: Distributing the work

The program uses three classes: ***CCar***, ***CCarAttr***, and ***CCarCgi***. The ***CCar*** class knows nothing about HTML nodes or CGI objects - its only functions are to store the currently selected color and features, and compute the resulting price:

    class CCar
    {
    public:
        CCar(unsigned base_price = 12000) { m_BasePrice = base_price; }
        // Mutating member functions
        void AddFeature(const string& feature_name);
        void SetColor(const string& color_name);
        // Access member functions
        bool HasFeature(const string& feature_name) const;
        string GetColor(void) const;
        string GetPrice(void) const;
        const set<string>& GetFeatures() const;
    private:
        set<string> m_Features;
        string      m_Color;
        unsigned    m_BasePrice;
    };

Instead, the ***CCar*** class provides an interface to all of its data members, thus allowing the application to get/set features of the car as needed. The static utility class, ***CCarAttr***, simply provides the sets of possible features and colors, which will be used by the application in generating the HTML form for submission:

    class CCarAttr {
    public:
        CCarAttr(void);
        static const set<string>& GetFeatures(void) { return sm_Features; }
        static const set<string>& GetColors  (void) { return sm_Colors; }
    private:
        static set<string> sm_Features;
        static set<string> sm_Colors;
    };

Both of these classes are defined in a header file which is `#include`'d in the `*.cpp` files. Finally, the application class does most of the actual work, and this class must know about ***CCar***, ***CCarAttr***, `HTML`, and `CGI` objects. The ***CCarCgi*** class has the following interface:

    class CCarCgi : public CCgiApplication
    {
    public:
        virtual int ProcessRequest(CCgiContext& ctx);
    private:
        CCar* CreateCarByRequest(const CCgiContext& ctx);
        void PopulatePage(CHTMLPage& page, const CCar& car);
        static CNCBINode* ComposeSummary(const CCar& car);
        static CNCBINode* ComposeForm   (const CCar& car);
        static CNCBINode* ComposePrice  (const CCar& car);
        static const char sm_ColorTag[];
        static const char sm_FeatureTag[];
    };

The source code is distributed over three files:

car.hpp

car.cpp

car\_cgi.cpp

The ***CCar*** and ***CCarAttr*** classes are defined in `car.hpp`, and implemented in `car.cpp`. Both the class definition and implementation for the CGI application class are in `car_cgi.cpp`. With this design, only the application class will be affected by changes made to either the HTML or CGI class objects. The additional files needed to compile and run the program are:

[car.html](ch_demo.html#ch_demo.carhtml)

Makefile.car\_app

<a name="ch_cgi.cgi_response_codes"></a>

CGI Status Codes
----------------

For compliance with the HTTP standard ([RFC7321](https://tools.ietf.org/html/rfc7231)), CGI applications must issue an HTTP header line indicating the response status, for example:

    Status: 200 OK

By default, the [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication) framework will issue a status line with an appropriate status code (e.g. 200 for success; 400 for a malformed HTTP request, etc.). To set a non-default status code use [CCgiResponse](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiResponse)::[SetStatus()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetStatus) or [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication)::[SetHTTPStatus()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetHTTPStatus). You can also override [CCgiApplication](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CCgiApplication)::[OnException()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=OnException) for custom handling of exceptions.

The official list of HTTP status codes along with hyperlinks to their definitive meanings can be found at: <http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml> However, status codes issued by NCBI CGI applications should be selected from [Table 7](#ch_cgi.T7), which is a subset of the official list plus two special non-standard additions (299 and 499). There is also a class, [CRequestStatus](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/doxyhtml/classCRequestStatus.html), that holds an enumeration of the valid NCBI C++ Toolkit status codes. (Although the class is named [CRequestStatus](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CRequestStatus), it relates to HTTP response status codes.)

<a name="ch_cgi.T7"></a>

Table 7. HTTP Status Codes

| Status Code | Description               |
|-------------|---------------------------------------------------------------------|
| 200   | OK     |
| 201   | Created                   |
| 202   | Accepted                  |
| 203   | Non-Authoritative Information   |
| 204   | No Content                |
| 205   | Reset Content             |
| 206   | Partial Content           |
| 299   | Partial Content Broken Connection (non-standard - C++ Toolkit only) |
| 300   | Multiple Choices          |
| 301   | Moved Permanently         |
| 302   | Found  |
| 303   | See Other                 |
| 304   | Not Modified              |
| 305   | Use Proxy                 |
| 307   | Temporary Redirect        |
| 400   | Bad Request               |
| 401   | Unauthorized              |
| 402   | Payment Required          |
| 403   | Forbidden                 |
| 404   | Not Found                 |
| 405   | Method Not Allowed        |
| 406   | Not Acceptable            |
| 407   | Proxy Authentication Required   |
| 408   | Request Timeout           |
| 409   | Conflict                  |
| 410   | Gone   |
| 411   | Length Required           |
| 412   | Precondition Failed       |
| 413   | Payload Too Large         |
| 414   | URI Too Long              |
| 415   | Unsupported Media Type    |
| 416   | Requested Range Not Satisfiable |
| 417   | Expectation Failed        |
| 499   | Broken Connection (non-standard - C++ Toolkit only)     |
| 500   | Internal Server Error     |
| 501   | Not Implemented           |
| 502   | Bad Gateway               |
| 503   | Service Unavailable       |
| 504   | Gateway Timeout           |
| 505   | HTTP Version Not Supported      |

<div class="table-scroll"></div>

***Note:*** Status code 404 should be reserved for situations when the requested resource does not exist. It should not be used as a "catch-all" such as when the client simply uses invalid parameters.

<a name="ch_cgi.FCGI_Redirection_and_Debugging_C"></a>

FCGI Redirection and Debugging C++ Toolkit CGI Programs
-------------------------------------------------------

Development, testing, and debugging of CGI applications can be greatly facilitated by making them [FastCGI](http://www.fastcgi.com/)-capable and using a simple proxy script. The basic idea is that FastCGI-enabled applications can be started once and process many requests without exiting, thereby improving performance.

Applications that were written to use the C++ Toolkit CGI framework (see [example above](#ch_cgi.html)) can easily be made to run under your account, on your development machine, and in a number of ways (e.g. standalone, with special configuration, under a debugger, using a memory checker, using **strace**, etc.). This is accomplished by "tunneling" or "redirecting" through a simple FCGI proxy script that forwards HTTP requests to your application and returns the HTTP responses.

The process is described in the following sections:

-   [Platform specifics](#ch_cgi.Platform_specifics)

-   [Creating a FastCGI-enabled application from scratch](#ch_cgi.Creating_and_debugging_a_sample_F)

-   [Connecting the FCGI proxy to the FCGI application](#ch_cgi.Connecting_the_FCGI_proxy_to_the)

-   [Debugging an existing CGI or FCGI application](#ch_cgi.Debugging_an_existing_CGI_or_FCGI)

<a name="ch_cgi.Platform_specifics"></a>

### Platform specifics

The subsequent sections are based on a Linux platform. If you are using Windows, be aware of the following differences:

-   Running `new_project myapp app/cgi` creates file names with "cgi\_sample" in them rather than "myapp".

-   The proxy script, [fcgi\_sample.cgi](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c%2B%2B/src/sample/app/cgi/fcgi_sample.cgi?view=log), is a Bourne shell script and therefore won't run on Windows. Please copy it to a Linux web server.

<a name="ch_cgi.Creating_and_debugging_a_sample_F"></a>

### Creating a FastCGI-enabled application from scratch

If you are starting from scratch, use the [new\_project](ch_proj.html#ch_proj.new_project_Starting) script to create an application that is FastCGI-enabled:

    new_project myapp app/cgi
    rm -rf lib              # not needed
    cd myapp
    rm -rf cgires           # not needed
    rm *cgi_session_sample* # not needed
    vim Makefile.[io]*      # remove cgi_session_sample and SUB_PROJ

This results in the following files:

<a name="ch_cgi.T.nc_filepurposefmyappcgithis_is_"></a>

| File   | Purpose                 |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `fmyapp.cgi` | This is the proxy script - it's a regular CGI that the client will call via HTTP. It is the only file that needs to reside on the web server. |
| `fmyapp.ini` | This is the INI file for the FCGI application, not for the proxy (the proxy does not use an INI file).    |
| `myapp.cpp`  | This is the sample application source code and should be adapted or replaced by your application.   |
| `myapp.html` | This is an HTML template that goes with the sample code - it can be deleted or adapted to your application.     |

<div class="table-scroll"></div>

Building creates both a FastCGI-enabled application and a regular CGI application:

<a name="ch_cgi.T.nc_filepurposefmyappfcgithis_is"></a>

| File    | Purpose           |
|---------------|--------------------------------------------------------------------------------|
| `fmyapp.fcgi` | This is the FastCGI version of your application (hence the `.fcgi` extension). |
| `myapp.cgi`   | This is the regular CGI version of your application.   |

<div class="table-scroll"></div>

<a name="ch_cgi.Connecting_the_FCGI_proxy_to_the"></a>

### Connecting the FCGI proxy to the FCGI application

The round-trip sequence of events for a FastCGI request/response is:

1.  The FCGI application is started (independent of any requests).

2.  An HTTP request is sent to the URL for the proxy script.

3.  The web server invokes the proxy script using the regular CGI protocol (**`STDIN`** and environment variables).

4.  The proxy script forwards the request to your FCGI application through a socket.

5.  The FCGI application processes the request and sends the response and exit status back to the proxy script via the socket.

6.  The proxy sends the response back to the web server via the CGI protocol (**`STDOUT`** and exit status).

7.  The web server sends the response and status code to the client via HTTP.

[![Image ch\_cgi\_fcgi\_events.png](/cxx-toolkit/static/img/ch_cgi_fcgi_events.png)](/cxx-toolkit/static/img/ch_cgi_fcgi_events.png "Click to see the full-resolution image")

***Note:*** The primary purpose of the FastCGI protocol is to eliminate repeated long application startup times (and possibly shutdown times). This means that, unlike normal CGI applications, FCGI applications will not be started by the web server - they're expected to be already running and listening for a socket connection request from the proxy script. Thus, the proxy script will just attempt to connect to an already running FCGI application via the configured socket. If you send a request to the proxy without having first started your FCGI application, the request will appear to hang until it times out or until the FCGI application is started.

To connect the proxy script to the FCGI application, first find a port that's available on the machine that will run the application. For example, to find out if port 5000 is available for listening:

    myhost$  netstat -l --numeric-ports | grep 5000
    tcp        0      0 *:5000                      *:*                         LISTEN

If the port is available there won't be any output; if it's in use by another process the output will be similar to the above.

Next, edit the proxy script (on the web server) and set the `-connect` option using the host that will be running the FCGI application, and the port from the previous step:

    # fmyapp.cgi
    /netopt/ncbi_tools64/fcgi-current/bin/cgi-fcgi -bind -connect myhost:5000

Then, edit the INI file for the FCGI application and set the listening port using the `StandaloneServer` entry (be sure to prepend a colon to the port):

    # fmyapp.ini
    [FastCGI]
    StandaloneServer = :5000
    Iterations = 10

The `Iterations` entry specifies the number of requests that the FCGI application will process before exiting. You could set this to 1 for single-shot testing, but it's better to use a higher number to simulate typical FastCGI operation.

<a name="ch_cgi.Debugging_an_existing_CGI_or_FCGI"></a>

### Debugging an existing CGI or FCGI application

To debug a "plain" CGI, first create a FastCGI-capable version of it, then debug that. To create a FastCGI-capable version of a "plain" CGI:

1.  Change the makefile to build `fmyapp.fcgi` instead of `myapp.cgi` and to link with `xfcgi.lib` instead of `xcgi.lib`. ***Note:*** the application must use the C++ Toolkit's CGI framework (as in the above [example](#ch_cgi.html)).

2.  Rebuild.

3.  Install the [proxy script](https://www.ncbi.nlm.nih.gov/viewvc/v1/trunk/c++/src/sample/app/cgi/fcgi_sample.cgi?view=log) on the web server in place of, or in addition to, the existing CGI.

4.  [Configure the connection](#ch_cgi.Connecting_the_FCGI_proxy_to_the) between the proxy and the application.

To debug a FastCGI-capable application:

1.  If desired, move the application to a development host for more flexibility in debugging:

    -   Copy the FCGI application and the files it uses (e.g. `fmyapp.fcgi`, `fmyapp.ini,` and `myapp.html`) to the desired host.

    -   [Configure the connection](#ch_cgi.Connecting_the_FCGI_proxy_to_the) between the proxy and the application.

2.  Start `fmyapp.fcgi` under the debugger (or a memory checker or other tool), set a breakpoint on [ProcessRequest()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ProcessRequest), and issue a "run" command. The program will remain in the running state while listening for a request from the proxy script.

3.  From your web browser (or using `GET`/`POST` command-line utilities), submit a web request to the proxy, `fmyapp.cgi`. The request will be tunneled to `fmyapp.fcgi` and the debugger will stop at the breakpoint.

4.  Debug the processing of the request.

5.  Issue another "run" command to the debugger to complete processing of the current request, send the response back to the proxy, and begin waiting for the next request (or exit if the configured number of iterations has been reached).


