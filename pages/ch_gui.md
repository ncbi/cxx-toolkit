---
layout: default
title: GUI and Graphics
nav: pages/ch_gui
---


{{ page.title }}
===================================

The following approaches to developing GUI applications have been proved to work reasonably well:

-   [Using wxWidgets (for GUI) and OpenGL (for graphics)](#ch_gui.Using_wxWidgets_for_GUI_and_OpenG)

-   [Using FOX as a third party package](#ch_gui.Using_FOX_as_a_third_party_packag)

-   [Using the Genome Workbench wxWidgets-based GUI framework](#ch_gui.Using_the_Genome_Workbench_wxWidg)

<a name="ch_gui.Using_wxWidgets_for_GUI_and_OpenG"></a>

Using wxWidgets (for GUI) and OpenGL (for graphics)
---------------------------------------------------

This approach is appropriate for projects requiring complex GUIs with rich user interactivity and layered event models.

[wxWidgets](http://www.wxwidgets.org/) has a heavier API than [FOX](http://www.fox-toolkit.org/), but is not more resource intensive (it uses the underlying system's native rendering toolkit). It offers a GUI builder, support for automated code generation, and a carefully designed event model that makes it a much more capable solution if your application needs extend beyond a dialog-based application with multiple controls. It additionally offers substantial support for OpenGL. Also, its installations are maintained in NCBI for a variety of OS's.

This approach is used in NCBI by the [Cn3D](https://www.ncbi.nlm.nih.gov/Structure/CN3D/cn3d.shtml) application, and the [Genome Workbench](https://www.ncbi.nlm.nih.gov/projects/gbench/) application is based on that too. Please see the [wxWidgets](http://www.wxwidgets.org/) and [OpenGL](http://www.opengl.org/) websites for further information.

<a name="ch_gui.Using_FOX_as_a_third_party_packag"></a>

Using FOX as a third party package
----------------------------------

This approach is appropriate for projects requiring uniform behavior across platforms (i.e. not a native look-and-feel).

[FOX](http://www.fox-toolkit.org/) is very fast, with compact executables. The API is convenient and consistent, with a complete set of widgets. There is an extremely rich set of layout managers, which is very flexible and fast.

This approach is used in NCBI by the taskedit application. Please see the [FOX](http://www.fox-toolkit.org/) website for further information.

<a name="ch_gui.Using_the_Genome_Workbench_wxWidg"></a>

Using the Genome Workbench wxWidgets-based GUI framework
--------------------------------------------------------

This approach currently may not be appropriate for projects other than the [Genome Workbench](https://www.ncbi.nlm.nih.gov/projects/gbench/) due to its complexity.

The [Genome Workbench](https://www.ncbi.nlm.nih.gov/projects/gbench/) project has developed an advanced wxWidgets-based GUI framework - somewhat skewed to dealing with NCBI ASN.1 data model representations. The core framework offers a set of widget extensions and signalling libraries on top of wxWidgets. It also uses [DialogBlocks](http://www.dialogblocks.com/) as a GUI RAD development tool. The Genome Workbench [project homepage](https://www.ncbi.nlm.nih.gov/projects/gbench/) has links for downloading various binaries and the source code. ***Note:*** This code makes extensive use of the [Object Manager](ch_objmgr.html) and has very specific build requirements - both of which are difficult to configure correctly and neither of which will be documented in the near future (i.e. use at your own risk).


