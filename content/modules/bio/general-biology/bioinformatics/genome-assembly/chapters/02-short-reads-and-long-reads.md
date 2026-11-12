---
title: "Short Reads and Long Reads"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The difference between short reads of a few hundred bases and long reads of thousands or tens of thousands of bases, how each length affects the ability to resolve repeats and to span gaps, the error profiles of the two kinds of read and the reasons a project may combine them, with the costs and the trade-offs of choosing one or the other."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare the expected length, error profile and cost of short and long reads for a genome assembly project."
  - "Explain why a long read can span a repeat that a short read cannot place, and why this matters for the contiguity of the assembly."
references:
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Kolmogorov, M., Yuan, J., Lin, Y., & Pevzner, P. A. (2019). Assembly of long, error-prone reads using repeat graphs. Nature Biotechnology, 37(5), 540-546. https://doi.org/10.1038/s41587-019-0072-8"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
---

Short reads and long reads differ in the information each carries. A short read of a few hundred bases is accurate, cheap per base and produced in great numbers, but it is too short to span most repeats, so the repeat cannot be placed uniquely. A long read of several thousand bases or more can cross a repeat and carry the unique sequence on either side, which lets the assembler place both flanks correctly. Koren et al. (2017) describe an assembler designed for the error-prone long reads that make this possible.

Long reads have a higher error rate than short reads, and this was the main obstacle to their use in assembly. Their errors are random in a way that can be corrected by comparing many overlapping reads, and the correction stage of a long-read assembler is the step that turns noisy reads into accurate sequence. Kolmogorov et al. (2019) describe an assembler that represents the overlaps between long reads as a repeat graph, which keeps the repeats explicit rather than discarding them.

The choice depends on the question and the budget. A project that needs a contiguous assembly of a repeat-rich genome benefits greatly from long reads, while a project that needs a catalogue of short variants may be served by short reads at lower cost. Many projects combine the two, using long reads for contiguity and short reads to correct the base-level errors, and this hybrid approach is described in a later chapter.

The computing requirements differ as well. Long-read assemblies need more memory and time for the overlap stage, and the cost of computation can be a large part of a project's budget. Stein (2010) discussed how the demands of genome informatics led to shared and remote computing, and an assembly project should estimate its resources before the data are generated.

The read type is recorded as part of the assembly. A reader must know the length, the platform and the error profile of the reads to judge the assembly, and a report that omits them is incomplete.
