---
layout: default
title: Biological Sequence Alignment
nav: pages/ch_algoalign
---


{{ page.title }}
================================================

Introduction
------------

There are many libraries in the NCBI C++ Toolkit which deal with sequence alignments. This chapter describes computing and managing biological sequence alignments. Data structures used to store alignments are discussed in the [Biological Sequence Data Model](https://ncbi.github.io/cxx-toolkit/pages/ch_datamod#ch_datamod._Sequence_Alignments_1) chapter.

Chapter Outline
---------------

The following is an outline of the chapter topics:

- [Alignment types](#ch_algoalign.alignment_types)

- [Alignment Manager](#ch_algoalign.alignment_manager)

    - [Common interfaces and classes](#ch_algoalign.alignment_manager_interfaces)

    - [Implementations](#ch_algoalign.alignment_manager_implementations)

        - [CSparseAln](#ch_algoalign.alignment_manager_impl_sparsealn)

        - [CAlnMap](#ch_algoalign.alignment_manager_impl_alnmap)

    - [Using Alignment Manager](#ch_algoalign.alignment_manager_using)

        - [Reading alignments](#ch_algoalign.alignment_manager_using_reading)

        - [Seq-id wrappers](#ch_algoalign.alignment_manager_using_idwrappers)

        - [Alignment statistics](#ch_algoalign.alignment_manager_using_stats)

        - [CPairwiseAln](#ch_algoalign.alignment_manager_using_pairwisealn)

        - [CAnchoredAln](#ch_algoalign.alignment_manager_using_anchoredaln)

        - [Building sparse alignment](#ch_algoalign.alignment_manager_using_buildsparse)

    - [Examples](#ch_algoalign.alignment_manager_examples)

- [Computing alignments](#ch_algoalign.computing_alignments)

    -   [Computing pairwise global sequence alignments](#ch_algoalign.generic_global_alignment)

        -   [Initialization](#ch_algoalign.initialization)

        -   [Parameters of alignment](#ch_algoalign.setup)

        -   [Computing](#ch_algoalign.computing)

        -   [Alignment transcript](#ch_algoalign.transcript)

    -   [Computing multiple sequence alignments](#ch_algoalign.Computing_multiple_s)

    -   [Aligning sequences in linear space](#ch_algoalign.divide_and_conquer)

        -   [The idea of the algorithm](#ch_algoalign.idea)

        -   [Implementation](#ch_algoalign.mm_implementation)

    -   [Computing spliced sequences alignments](#ch_algoalign.spliced_alignment)

        -   [The problem](#ch_algoalign.uk_formulation)

        -   [Implementation](#ch_algoalign.uk_implementation)

    -   [Formatting computed alignments](#ch_algoalign.formatter)

        -   [Formatter object](#ch_algoalign.nw_formatter)


<a name="ch_algoalign.alignment_types"></a>

Alignment types
---------------

(TODO)


<a name="ch_algoalign.alignment_manager"></a>

Alignment Manager
-----------------

The Alignment Manager Library [`xalnmgr`:[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/objtools/alnmgr) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objtools/alnmgr)]


<a name="ch_algoalign.alignment_manager_interfaces"></a>

### Common interfaces and classes

[IAlnExplorer](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?v=c%2B%2B&i=IAlnExplorer&_remember=1) interface defines types and constants used by derived classes representing alignments ([CAlnMap](#ch_algoalign.alignment_manager_impl_alnmap) and [CSparseAln](#ch_algoalign.alignment_manager_impl_sparsealn)). *EAlignType* enumerator describes types of sequences participating in the alignment: nucleotide, protein, mixed etc. *ESearchDirection* defines how to change position while performing some operations: based on sequence position and strand, or alignment coordinates. *ESortState* defines possible states of alignment data: unsorted, ascending, descending or unsupported.

[IAlnSegment](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?v=c%2B%2B&i=IAlnSegment&_remember=1) interface defines types, constants and methods representing a single alignment segment. For each segment there are two ranges defined: the range on the selected sequence returned by *GetRange()* method, and the range on the whole alignment returned by *GetAlnRange()*. Depending on segment type one or both ranges may be empty. *ESegTypeFlags* provide information about segment type.

- *fAligned* indicates that the selected sequence is aligned to at least, both GetRange() and GetAlnRange() return non-empty ranges.

- *fGap* means both anchor and the selected sequence are not included in the segment but there are other rows aligned to each other, so GetAlnRange() returns a non-empty range.

- *fIndel* is used when either anchor, or the selected sequence is not present in the segment, the corresponding method returns empty range.

- *fUnaligned* is used for ranges of the selected sequence which do not participate in the alignment at all (not present in the source seq-align), GetAlnRange() returns empty range.

- *fReversed* flag is set when the selected row is reversed relatively to the anchor row.

- *fInvalid* indicates bad state of a segment iterator.

[IAlnSegmentIterator](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?v=c%2B%2B&i=IAlnSegmentIterator&_remember=1) interface defines types, constants and methods for iterating alignment segments. *EFlags* enumerator defines flags for iterating all segments, only aligned ranges, only unaligned ranges, or all segments where at least some rows are aligned to each other (but the selected row may contain a gap).


<a name="ch_algoalign.alignment_manager_implementations"></a>

### Implementations


<a name="ch_algoalign.alignment_manager_impl_sparsealn"></a>

#### CSparseAln

[CSparseAln](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?v=c%2B%2B&i=CSparseAln&_remember=1) is an implementation of IAlnExplorer which keeps alignment data in a [CAnchoredAln](#ch_algoalign.alignment_manager_using_anchoredaln) object. It defines methods for converting coordinates and ranges, and for getting sequence data. *GetSeqAlnRange()*, *GetSeqAlnStart()* and *GetSeqAlnStop()* methods return total range for the selected row in alignment coordinates. *GetSeqRange()*, *GetSeqStart()* and *GetSeqStop()* return total range in sequence coordinates. *GetAlnPosFromSeqPos()* and *GetSeqPosFromAlnPos()* can be used to convert between alignment and sequence coordinates. There are also a few methods which can be used when dealing with mixed alignments; these methods allow to convert positions and ranges between alignment coordinates (which are always genomic) and sequence native coordinates, calculate protein frames. *GetSeqString()* and *GetAlnSeqString()* methods return sequence data for the selected sequence and range, (the latter fills unaligned parts with the gap character). CSparseAln can be created from a CAnchoredAln; to work correctly the anchored alignment must be built with [BuildAln()](#ch_algoalign.alignment_manager_using_buildsparse) function.

[CSparseSegment](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CSparseSegment&_identdefonly=1) is an implementation of IAlnSegment which defines it’s abstract methods.

[CSparse_CI](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CSparse_CI&_identdefonly=1) implements IAlnSegmentIterator which allows to iterate a given row of a CSparseAln. The iterator can be used to iterate the whole row or a specific range on it.


<a name="ch_algoalign.alignment_manager_impl_alnmap"></a>

#### CAlnMap

[CAlnMap](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnMap&_identdefonly=1) and [CAlnVec](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnVec&_identdefonly=1) are two more implementations of IAlnExplorer. Internally both are based on [Dense-seg](https://ncbi.github.io/cxx-toolkit/pages/ch_datamod#ch_datamod.Denseseg_Segments_fo) alignment which imposes some limitations on the data they can handle. CAlnMap provides methods for accessing alignment structure (segments, rows, ranges). CAlnVec extends CAlnMap with methods handling sequence data. Unlike [CSarseAln](#ch_algoalign.alignment_manager_impl_sparsealn), CAlnMap and CAlnVec do not use IAlnSegment and IAlnSegmentIterator interfaces. Instead both use their own [CAlnChunk](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnChunk&_identdefonly=1) and [CAlnChunkVec](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnChunkVec&_identdefonly=1) classes to return alignment data.


<a name="ch_algoalign.alignment_manager_using"></a>

### Using Alignment Manager


<a name="ch_algoalign.alignment_manager_using_reading"></a>

#### Reading alignments

[CAlnAsnReader](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnAsnReader&_identdefonly=1) is a helper class which can be used to load multiple objects from a stream, find all alignments inside the objects and store them for further processing. Top-level object types supported by CAlnAsnReader are: *Seq-entry*, *Seq-align*, *Seq-submit*, *Seq-align-set*, *Seq-annot*, and *Dense-seg*. A [scope](https://ncbi.github.io/cxx-toolkit/pages/ch_objmgr#ch_objmgr.om_attrib.html_Scope) can be passed to CAlnAsnReader constructor; if it’s done, each loaded seq-entry is automatically added to the scope. *Read()* method is used to read objects from a stream. The method takes pointer to a [CObjectIStream](https://ncbi.github.io/cxx-toolkit/pages/ch_ser#ch_ser.objstream.html_objistr), a callback function, which argument is a const pointer to a [CSeq_align](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CSeq_align&_identdefonly=1), and an optional top-level object type which is required only in case of binary input stream. Each seq-align found in the loaded data is then passed to the callback, which usually stores the alignments in a container for further processing.

[CAlnContainer](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnContainer&_identdefonly=1) can be used to store alignments loaded by CAlnAsnReader. The container checks for duplicates and has an option to split seq-align-sets (‘disc’ seq-aligns) into separate alignments.

[Sample code](#ch_algoalign.alignment_manager_examples_reading)


<a name="ch_algoalign.alignment_manager_using_idwrappers"></a>

#### Seq-id wrappers

[Seq-id](https://ncbi.github.io/cxx-toolkit/pages/ch_datamod#ch_datamod._Seqid_Identifying_th) objects used in the C++ Toolkit do not provide sequence information such as sequence type (nucleotide or protein) or base width (1 for nucleotides, 3 for proteins). For this reason, the Alignment Manager stores seq-ids using [IAlnSeqId](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=IAlnSeqId&_identdefonly=1) wrapper interface rather than using [CSeq_id](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CSeq_id&_identdefonly=1) or [CSeq_id_Handle](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CSeq_id_Handle&_identdefonly=1) classes directly. [TAlnSeqIdIRef](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=TAlnSeqIdIRef&_identdefonly=1) is a typedef for smart pointer to IAlnSeqId (CIRef\<IAlnSeqId\>).

[CAlnSeqId](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnSeqId&_identdefonly=1) class provides the default implementation of IAlnSeqId based on CSeq_id_Handle.

To convert CSeq_id to IAlnSeqId two template classes can be used: [CAlnSeqIdConverter\<TAlnSeqId\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnSeqIdConverter&_identdefonly=1) and [CScopeAlnSeqIdConverter\<TAlnSeqId\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CScopeAlnSeqIdConverter&_identdefonly=1). The former converts each seq-id to *TAlnSeqId* wrapper class (which assumes that the template argument TAlnSeqId can be initialized with a CSeq_id), the latter also fetches bioseq information from a [CScope](https://ncbi.github.io/cxx-toolkit/pages/ch_objmgr#ch_objmgr.om_attrib.html_Scope), filling sequence type and base width in the IAlnSeqId.

[CAlnSeqIdsExtract\<TAlnSeqId, TIdConverter\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnSeqIdsExtract&_identdefonly=1) template class is used to extract seq-ids from a seq-align and store them in a vector of TAlnSeqIdIRef-s (TAlnSeqIdVec). The extractor takes two arguments: seq-id wrapper (e.g. IAlnSeqId) and seq-id converter (CAlnSeqIdConverter by default). [TIdExtract](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=TIdExtract&_identdefonly=1) and [TScopeIdExtract](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=TScopeIdExtract&_identdefonly=1) are two predefined extractor types based on CAlnSeqIdConverter\<\> and CScopeAlnSeqIdConverter\<\> respectively.


<a name="ch_algoalign.alignment_manager_using_stats"></a>

#### Alignment statistics

Before the Alignment Manager can work with seq-aligns they must be parsed into special container classes and some data about their structure must be collected.

[CAlnIdMap\<TAlnVec, TAlnSeeqIdExtract\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnIdMap&_identdefonly=1) template class is used to map each CSeq_align object to a vector of participating seq-ids. There are two predefined versions of CAlnIdMap: [TAlnIdMap](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=TAlnIdMap) based on TIdExtract, and CScope aware TScopeAlnIdMap using TScopeIdExtract.

A CAlnIdMap instance can be passed to [CAlnStats\<TAlnIdVec\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnStats&_identdefonly=1) (note that though the template argument is named TAlnIdVec, it’s expected to be a CAlnIdMap\<\>). This class collects seq-align statistics such as ids, potential anchor rows etc. The stats are used to initialize anchored alignments (CAnchoredAln). Two predefined instances of the template are [TAlnStats](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=TAlnStats) (CAlnStats\<TAlnIdMap\>) and CScope aware version TScopeAlnStats (CAlnStats\<TScopeAlnIdMap\>).

[Sample code](#ch_algoalign.alignment_manager_examples_stats)


<a name="ch_algoalign.alignment_manager_using_pairwisealn"></a>

#### CPairwiseAln

[CPairwiseAln](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CPairwiseAln&_identdefonly=1) is based on [CAlignRangeCollection\<\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlignRangeCollection&_identdefonly=1) template and provides a simple mapping of ranges ([CAlignRange\<TSignedSeqPos\>](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlignRange&_identdefonly=1)) on two sequences. The class allows to enforce different policies like overlaps between segments, mixed segment directions etc. Pairwise alignments also allow to store insertions, which indicate segments where the first sequence has a gap, while the second one contains data of known length. [CreatePairwiseAlnFromSeqAlign()](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CreatePairwiseAlnFromSeqAlign&_identdefonly=1) function can be used to create CPairwiseAln from a seq-align. The function expects that the source alignment contains exactly two rows and uses default policies. Another function for creating pairwise alignments is [ConvertSeqAlignToPairwiseAln()](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=ConvertSeqAlignToPairwiseAln&_identdefonly=1) – it allows to specify rows of the source seq-align and configure CPairwiseAln policies and options before populating it. Note that the function does not check if the specified rows of the source seq-align contain correct seq-ids.

[Sample code](#ch_algoalign.alignment_manager_examples_pairwise)


<a name="ch_algoalign.alignment_manager_using_anchoredaln"></a>

#### CAnchoredAln

To work with multiple aligned sequences [CAnchoredAln](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAnchoredAln&_identdefonly=1) class is used. Each anchored alignment contains two or more pairwise alignments and has a few methods for accessing alignment properties and data (dimension, seq-id for each row, CPairwiseAln for each row etc.). There are several functions which can be used to create anchored alignments. [CreateAnchoredAlnFromAln()](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CreateAnchoredAlnFromAln&_identdefonly=1) takes a CAlnStats instance and creates a single anchored alignment from the seq-align with the given index using hints and options passed to the function. [CreateAnchoredAlnVec()](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CreateAnchoredAlnVec&_identdefonly=1) also takes a CAlnStats and creates a vector of anchored alignments, one for each source seq-align.

All functions building anchored alignments take a [CAlnUserOptions](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=CAlnUserOptions&_identdefonly=1) argument. This class allows to specify various merging and building options: anchor row seq-id, merging algorithm and flags etc.


<a name="ch_algoalign.alignment_manager_using_buildsparse"></a>

#### Building sparse alignment

One more function for building CAnchoredAln is [BuildAln()](http://intranet.ncbi.nlm.nih.gov/ieb/ToolBox/CPP_DOC/lxr2/ident?v=c%2B%2B&i=BuildAln&_identdefonly=1). It takes one or more anchored alignments, merges them and creates a new anchored alignment, which anchor row represents alignment coordinates. The new row is assigned a pseudo-id (by default it’s a local seq-id based on the current timestamp). The resulting anchored alignment may be used to initialize a [CSparseAln](#ch_algoalign.alignment_manager_impl_sparsealn).

[Sample code](#ch_algoalign.alignment_manager_examples_sparse)


<a name="ch_algoalign.alignment_manager_examples"></a>

### Examples

<a name="ch_algoalign.alignment_manager_examples_reading"></a>

Loading seq-aligns using CAlnAsnReader and CAlnContainer.
---------------------------------------------------------

    unique_ptr<CObjectIStream> in(CObjectIStream::Open(eSerial_AsnText, filename));
    CAlnAsnReader reader(&scope);
    // Read objects from the stream. If the callback (AddAln) is a member of
    // a class (CMyApp), wrap it in bind1st(mem_fun(...)).
    reader.Read(in.get(), bind1st(mem_fun(&CMyApp::AddAln), this));

    // A possible implementation of AddAln() can store the alignments in an
    // alignment container which can be used later to perform other tasks.
    class CMyApp
    {
    public:
        bool AddAln(const CSeq_align* aln)
        {
            m_AlnContainer.insert(*aln);
            return true;
        }
    ...
    private:
        CAlnContainer m_AlnContainer;
    ...
    }


<a name="ch_algoalign.alignment_manager_examples_stats"></a>

Collecting seq-ids and alignment statistics.
--------------------------------------------

    TScopeAlnSeqIdConverter id_conv(&scope);
    TScopeIdExtract id_extract(id_conv);
    TScopeAlnIdMap aln_id_map(id_extract, m_AlnContainer.size());
    ITERATE(CAlnContainer, aln_it, aln_container) {
        try {
            aln_id_map.push_back(**aln_it);
        } catch (CAlnException e) {
            // Report error
            ...
        }
    }
    TScopeAlnStats aln_stats(aln_id_map);


<a name="ch_algoalign.alignment_manager_examples_pairwise"></a>

Creating a CPairwiseAln.
------------------------

    // Initialize alignment seq-ids.
    TAlnSeqIdIRef aln_id1(Ref(new CAlnSeqId(seq_id1)));
    TAlnSeqIdIRef aln_id2(Ref(new CAlnSeqId(seq_id2)));
    // Create an empty pairwise alignment for the ids.
    CPairwiseAln pairwise(aln_id1, aln_id2);
    // Populate the alignment with data from rows 0 and 1 of the seq-align.
    // Does not check if rows 0 and 1 use seq_id1 and seq_id2.
    ConvertSeqAlignToPairwiseAln(pairwise, seq_align, 0, 1);


<a name="ch_algoalign.alignment_manager_examples_sparse"></a>

Creating anchored alignments and building sparse alignment.
-----------------------------------------------------------

    CAlnUserOptions merge_options;
    // Set the desired options
    ...
    TAnchoredAlnVec anchored_aln_vec;
    // Convert each seq-align from aln_stats to a CAnchoredAln
    CreateAnchoredAlnVec(aln_stats, anchored_aln_vec, merge_options);
    // Change merge options if necessary
    ...
    CAnchoredAln built_aln;
    // Build merged anchored alignment
    BuildAln(anchored_aln_vec, built_aln, merge_options);
    CSparseAln sparse_aln(built_aln, scope);


Demo applications.
------------------

Using CSarseAln:

- [aln_build_app.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objtools/alnmgr/demo/aln_build_app.cpp)

- [aln_test_app.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objtools/alnmgr/demo/aln_test_app.cpp)


Using CAlnMix/CAlnVec:

- [alnmrg.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/objtools/alnmgr/demo/alnmrg.cpp)

- [alnmgr_sample.cpp](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/sample/app/alnmgr/alnmgr_sample.cpp)


<a name="ch_algoalign.computing_alignments"></a>

Computing alignments
--------------------

The Global Alignment Library [`xalgoalign`:[include](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/include/algo/align) \| [src](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/algo/align)]

The library contains C++ classes encapsulating global pairwise alignment algorithms frequently used in computational biology.

-   [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) is the base class for the global alignment algorithm classes. The class provides an implementation of the generic Needleman-Wunsch for computing global alignments of nucleotide and amino acid sequences. The implementation uses an affine scoring scheme. An optional end-space free variant is supported, which is useful in applications where one sequence is expected to align in the interior of the other sequence, or the suffix of one string to align with a prefix of the other.<br/><br/>The classical Needleman-Wunsch algorithm is known to have memory and CPU requirements of the order of the sequence lengths' product. If consistent partial alignments are available, the problem is split into smaller subproblems taking fewer operations and less space to complete. [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) provides a way to specify such partial alignments (ungapped).

-   [CBandAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CBandAligner) encapsulates the banded variant of the global alignment algorithm which is applicable when the number of differences in the target alignment is limited ('the band width'). The computational cost of the algorithm is of the order of the band width multiplied by the length of the query sequence.

-   [CMMAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMMAligner) follows Hirschberg's divide-and-conquer approach under which the amount of space required to align two sequences globally becomes a linear function of the sequences' lengths. Although the latter is achieved at a cost of up to twice longer running time, a multithreaded version of the algorithm can run even faster than the classical Needleman-Wunsch algorithm in a multiple-CPU environment.

-   [CSplicedAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSplicedAligner) is an abstract base for algorithms computing cDNA-to-genome, or spliced alignments. Spliced alignment algorithms specifically account for splice signals in their dynamic programming recurrences resulting in better alignments for these particular but very important types of sequences.

**Demo Cases** [[src/app/nw\_aligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/nw_aligner)] [[src/app/splign/](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/splign/)]


<a name="ch_algoalign.generic_global_alignment"></a>

### Computing pairwise global sequence alignments

Generic **pairwise** global alignment functionality is provided by [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner).

***NOTE:*** [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) is not a multiple sequence aligner. An example of using [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) can be seen [here](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/source/src/app/nw_aligner).

This functionality is discussed in the following topics:

-   [Initialization](#ch_algoalign.initialization)

-   [Parameters of alignment](#ch_algoalign.setup)

-   [Computing](#ch_algoalign.computing)

-   [Alignment transcript](#ch_algoalign.transcript)

<a name="ch_algoalign.initialization"></a>

#### Initialization

Two constructors are provided to initialize the aligner:

    CNWAligner(const char* seq1, size_t len1,
               const char* seq2, size_t len2,
               const SNCBIPackedScoreMatrix* scoremat = 0);
    CNWAligner(void);

The first constructor allows specification of the sequences and the score matrix at the time of the object's construction. Note that the sequences must be in the proper strands, because the aligners do not build reverse complementaries. The last parameter must be a pointer to a properly initialized [SNCBIPackedScoreMatrix](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SNCBIPackedScoreMatrix) object or zero. If it is a valid pointer, then the sequences are verified against the alphabet contained in the [SNCBIPackedScoreMatrix](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SNCBIPackedScoreMatrix) object, and its score matrix is further used in dynamic programming recurrences. Otherwise, sequences are verified against the IUPACna alphabet, and match/mismatch scores are used to fill in the score matrix.

The default constructor is provided to support reuse of an aligner object when many sequence pairs share the same type and alignment parameters. In this case, the following two functions must be called before computing the first alignment to load the score matrix and the sequences:

    void SetScoreMatrix(const SNCBIPackedScoreMatrix* scoremat = 0);
    void SetSequences(const char* seq1, size_t len1,
                      const char* seq2, size_t len2,
                      bool verify = true);

where the meaning of **`scoremat`** is the same as above.

<a name="ch_algoalign.setup"></a>

#### Parameters of alignment

[CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) realizes the affine gap penalty model, which means that every gap of length L (with the possible exception of end gaps) contributes Wg+L\*Ws to the total alignment score, where Wg is a cost to open the gap and Ws is a cost to extend the gap by one basepair. These two parameters are always in effect when computing sequence alignments and can be set with:

    void SetWg(TScore value); // set gap opening score
    void SetWs(TScore value); // set gap extension score

To indicate penalties, both gap opening and gap extension scores are assigned with negative values.

Many applications (such as the shotgun sequence assembly) benefit from a possibility to avoid penalizing end gaps of alignment, because the relevant sequence's ends may not be expected to align. [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner) supports this through a built-in end-space free variant controlled with a single function:

    void SetEndSpaceFree(bool Left1, bool Right1, bool Left2, bool Right2);

The first two arguments control the left and the right ends of the first sequence. The other two control the second sequence's ends. True value means that end spaces will not be penalized. Although an arbitrary combination of end-space free flags can be specified, judgment should be used to get plausible alignments.

The following two functions are only meaningful when aligning nucleotide sequences:

    void SetWm(TScore value); // set match score
    void SetWms(TScore value); // set mismatch score

The first function sets a bonus associated with every matching pair of nucleotides. The second function assigns a penalty for every mismatching aligned pair of nucleotides. It is important that values set with these two functions will only take effect after [SetScoreMatrix()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=SetScoreMatrix) is called (with a zero pointer, which is the default).

One thing that could limit the scope of global alignment applications is that the classical algorithm takes quadratic space and time to evaluate the alignment. One wayto deal with it is to use the linear-space algorithm encapuslated in [CMMAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMMAligner). However, when some pattern of alignment is known or desired, it is worthwhile to explicitly specify "mile posts" through which the alignment should pass. Long high-scoring pairs with 100% identity (no gaps or mismatches) are typically good candidates for them. From the algorithmic point of view, the pattern splits the dynamic programming table into smaller parts, thus alleviating space and CPU requirements. The following function is provided to let the aligner know about such guiding constraints:

    void SetPattern(const vector<size_t>& pattern);

Pattern is a vector of hits specified by their zero-based coordinates, as in the following example:

    // the last parameter omitted to indicate nucl sequences
    CNWAligner aligner (seq1, len1, seq2, len2);
    // we want coordinates [99,119] and [129,159] on seq1 be aligned
    // with [1099,1119] and [10099,10129] on seq2.
    const size_t hits [] = { 99, 119, 1099, 1119, 129, 159, 10099, 10129 };
    vector<size_t> pattern ( hits, hits + sizeof(hits)/sizeof(hits[0]) );
    aligner.SetPattern(pattern);

<a name="ch_algoalign.computing"></a>

#### Computing

To start computations, call [Run()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=Run), which returns the overall alignment score having aligned the sequences. Score is a scalar value associated with the alignment and depends on the parameters of the alignment. The global alignment algorithms align two sequences so that the score is the maximum over all possible alignments.

<a name="ch_algoalign.transcript"></a>

#### Alignment transcript

The immediate output of the global alignment algorithms is a transcript. The transcript serves as a basic representation of alignments and is simply a string of elementary commands transforming the first sequence into the second one on a per-character basis. These commands (transcript characters) are (M)atch, (R)eplace, (I)nsert, and (D)elete. For example, the alignment

    TTC-ATCTCTAAATCTCTCTCATATATATCG
    ||| ||||||     |||| || ||| ||||
    TTCGATCTCT-----TCTC-CAGATAAATCG

has a transcript:

    MMMIMMMMMMDDDDDMMMMDMMRMMMRMMMM

Several functions are available to retrieve and analyze the transcript:

    // raw transcript
    const vector<ETranscriptSymbol>* GetTranscript(void) const
    {
        return &m_Transcript;
    }
    // converted transcript vector
    void GetTranscriptString(vector<char>* out) const;
    // transcript parsers
    size_t        GetLeftSeg(size_t* q0, size_t* q1,
                             size_t* s0, size_t* s1,
                             size_t min_size) const;
    size_t        GetRightSeg(size_t* q0, size_t* q1,
                              size_t* s0, size_t* s1,
                              size_t min_size) const;
    size_t        GetLongestSeg(size_t* q0, size_t* q1,
                                size_t* s0, size_t* s1) const;

The last three functions search for a continuous segment of matching characters and return it in sequence coordinates through **`q0`**, **`q1`**, **`s0`**, **`s1`**.

The alignment transcript is a simple yet complete representation of alignments that can be used to evaluate virtually every characteristic or detail of any particular alignment. Some of them, such as the percent identity or the number of gaps or mismatches, could be easily restored from the transcript alone, whereas others, such as the scores for protein alignments, would require availability of the original sequences.

<a name="ch_algoalign.Computing_multiple_s"></a>

Computing multiple sequence alignments
--------------------------------------

COBALT (COnstraint Based ALignment Tool) is an experimental multiple alignment algorithm whose basic idea was to leverage resources at NCBI, then build up a set of pairwise constraints, then perform a fairly standard iterative multiple alignment process (with many tweaks driven by various benchmarks).

COBALT is available online at:

<https://www.ncbi.nlm.nih.gov/tools/cobalt/>

A precompiled binary, with the data files needed to run it, is available at:

[ftp://ftp.ncbi.nlm.nih.gov/pub/agarwala/cobalt/](ftp://ftp.ncbi.nlm.nih.gov/pub/agarwala/cobalt)

Work is being done on an improved COBALT tool.

The paper reference for this algorithm is:

*J.S. Papadopoulos, R. Agarwala, "COBALT: Constraint-Based Alignment Tool for Multiple Protein Sequences". Bioinformatics, May 2007*

<a name="ch_algoalign.divide_and_conquer"></a>

Aligning sequences in linear space
----------------------------------

[CMMAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMMAligner) is an interface to a linear space variant of the global alignment algorithm. This functionality is discussed in the following topics:

-   [The idea of the algorithm](#ch_algoalign.idea)

-   [Implementation](#ch_algoalign.mm_implementation)

<a name="ch_algoalign.idea"></a>

#### The idea of the algorithm

That the classical global alignment algorithm requires quadratic space could be a serious restriction in sequence alignment. One way to deal with it is to use alignment patterns. Another approach was first introduced by Hirschberg and became known as a divide-and-conquer strategy. At a coarse level, it suggests computing of scores for partial alignments starting from two opposite corners of the dynamic programming matrix while keeping only those located in the middle rows or columns. After the analysis of the adjacent scores, it is possible to determine cells on those lines through which the global alignment's back-trace path will go. This approach reduces space to linear while only doubling the worst-case time bound. For details see, for example, Dan Gusfield's "Algorithms on Strings, Trees and Sequences".

<a name="ch_algoalign.mm_implementation"></a>

#### Implementation

[CMMAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CMMAligner) inherits its public interface from [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner). The only additional method allows us to toggle multiple-threaded versions of the algorithm.

The divide-and-conquer strategy suggests natural parallelization, where blocks of the dynamic programming matrix are evaluated simultaneously. A theoretical acceleration limit imposed by the current implementation is 0.5. To use multiple-threaded versions, call [EnableMultipleThreads()](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=EnableMultipleThreads). The number of simultaneously running threads will not exceed the number of CPUs installed on your system.

When comparing alignments produced with the linear-space version with those produced by [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner), be ready to find many of them similar, although not exactly the same. This is normal, because several optimal alignments may exist for each pair of sequences.

<a name="ch_algoalign.spliced_alignment"></a>

Computing spliced sequences alignments
--------------------------------------

This functionality is discussed in the following topics:

-   [The problem](#ch_algoalign.uk_formulation)

-   [Implementation](#ch_algoalign.uk_implementation)

<a name="ch_algoalign.uk_formulation"></a>

#### The problem

The spliced sequence alignment arises as an attempt to address the problem of eukaryotic gene structure recognition. Tools based on spliced alignments exploit the idea of comparing genomic sequences to their transcribed and spliced products, such as mRNA, cDNA, or EST sequences. The final objective for all splice alignment algorithms is to come up with a combination of segments on the genomic sequence that:

-   makes up a sequence very similar to the spliced product, when the segments are concatenated; and

-   satisfies certain statistically determined conditions, such as consensus splice sites and lengths of introns.

According to the classical eukaryotic transcription and splicing mechanism, pieces of genomic sequence do not get shuffled. Therefore, one way of revealing the original exons could be to align the spliced product with its parent gene globally. However, because of the specificity of the process in which the spliced product is constructed, the generic global alignment with the affine penalty model may not be enough. To address this accurately, dynamic programming recurrences should specifically account for introns and splice signals.

Algorithms described in this chapter exploit this idea and address a refined splice alignment problem presuming that:

-   the genomic sequence contains only one location from which the spliced product could have originated;

-   the spliced product and the genomic sequence are in the plus strand; and

-   the poly(A) tail and any other chunks of the product not created through the splicing were cut off, although a moderate level of sequencing errors on genomic, spliced, or both sequences is allowed.

In other words, the library classes provide basic splice alignment algorithms to be used in more sophisticated applications. One real-life application, Splign, can be found under demo cases for the library.

<a name="ch_algoalign.uk_implementation"></a>

#### Implementation

There is a small hierarchy of three classes involved in spliced alignment facilitating a quality/performance trade-off in the case of distorted sequences:

-   [CSplicedAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSplicedAligner) - abstract base for spliced aligners.

-   [CSplicedAligner16](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSplicedAligner16) - accounts for the three conventional splices (GT/AG, GC/AG, AT/AC) and a generic splice; uses 2 bytes per back-trace matrix cell. Use this class with high-quality genomic sequences.

-   [CSplicedAligner32](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSplicedAligner32) - accounts for the three conventionals and splices that could be produced by damaging bases of any conventional; uses 4 bytes per back-trace matrix cell. Use this class with distorted genomic sequences.

The abstract base class for spliced aligners, ***CNWSplicedAligner***, inherites an interface from its parent, [CNWAligner](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWAligner), adding support for two new parameters: intron penalty and minimal intron size (the default is 50).

All classes assume that the spliced sequence is the first of the two input sequences passed. By default, the classes do not penalize gaps at the ends of the spliced sequence. The default intron penalties are chosen so that the 16-bit version is able able to pick out short exons, whereas the 32-bit version is generally more conservative.

As with the generic global alignment, the immediate output of the algorithms is the alignment transcript. For the sake of spliced alignments, the transcript's alphabet is augmented to accommodate introns as a special sequence-editing operation.

<a name="ch_algoalign.formatter"></a>

Formatting computed alignments
------------------------------

This functionality is discussed in the following topics:

-   [Formatter object](#ch_algoalign.nw_formatter)

<a name="ch_algoalign.nw_formatter"></a>

#### Formatter object

[CNWFormatter](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CNWFormatter) is a single place where all different alignment representations are created. The only argument to its constructor is the aligner object that actually was or will be used to align the sequences.

The alignment must be computed before formatting. If the formatter is unable to find the computed alignment in the aligner that was referenced to the constructor, an exception will be thrown.

To format the alignment as a [CSeq\_align](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=CSeq_align) structure, call

    void AsSeqAlign(CSeq_align* output) const;

To format it as text, call

    void AsText(string* output, ETextFormatType type, size_t line_width = 100)

Supported text formats and their [ETextFormatType](https://www.ncbi.nlm.nih.gov/IEB/ToolBox/CPP_DOC/lxr/ident?i=ETextFormatType) constants follow:

-   Type 1 (**`eFormatType1`**):<br/>`TTC-ATCTCTAAATCTCTCTCATATATATCG`<br/>`TTCGATCTCT-----TCTC-CAGATAAATCG`<br/>`                      ^   ^    `<br/>

-   Type 2 (**`eFormatType2`**):<br/>`TTC-ATCTCTAAATCTCTCTCATATATATCG`<br/>`||| ||||||     |||| || ||| ||||`<br/>`TTCGATCTCT-----TCTC-CAGATAAATCG`<br/>

-   Gapped FastA (**`eFormatFastA`**):<br/>`>SEQ1`<br/>`TTC-ATCTCTAAATCTCTCTCATATATATCG`<br/>`>SEQ2`<br/>`TTCGATCTCT-----TCTC-CAGATAAATCG`<br/>

-   Table of exons (**`eFormatExonTable`**) - spliced alignments only. The exons are listed from left to right in tab-separated columns. The columns represent sequence IDs, alignment lengths, percent identity, coordinates on the query (spliced) and the subject sequences, and a short annotation including splice signals.<br/>

-   Extended table of exons (**`eFormatExonTableEx`**) - spliced alignments only. In addition to the nine columns, the full alignment transcript is listed for every exon.<br/>

-   ASN.1 (**`eFormatASN`**)



