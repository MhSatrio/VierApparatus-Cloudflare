---
title: "From Reads to Contigs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How overlapping reads are joined into longer contiguous sequences called contigs, why the coverage of a genome by reads determines whether the overlaps can be found, the role of the read length and the error rate, and why a set of contigs is the first output of an assembly and not yet a genome."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how overlapping reads are joined into a contig and what the depth of coverage has to do with it."
  - "Distinguish a contig from a finished chromosome and state what further steps are needed to reach one."
references:
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A contig is a contiguous sequence assembled from reads that overlap one another. The principle is simple: if the end of one read matches the start of another over a stretch of bases, the two reads can be placed one after the other. Koren et al. (2017) describe an assembler that works from long reads on this principle, first correcting the errors in the reads and then joining the overlaps into longer sequences. The overlap is found only when the two reads carry the same bases, so the error rate of the reads limits how reliably overlaps can be detected.

Coverage is the average number of reads that cover each base of the genome. At low coverage, some bases are covered by no read, and the overlaps that would join the contigs are missing. At high coverage, the overlaps are common and the joins are reliable, but the computation is larger. The depth needed depends on the read type and the error rate, and a project should plan its coverage from the expected genome size and the read length.

The contig is the first output of an assembly, not the finished genome. A set of contigs has gaps where the overlaps were not found, and it is broken wherever a repeat could not be resolved. The number of contigs and their lengths describe the state of the assembly at this stage, and they are the starting point for the scaffolding and polishing that follow.

Reads also carry errors, and an assembler must decide which differences between reads are errors and which are real variation. A difference that is treated as an error when it is real will split a contig, and a real error treated as real will leave a wrong base in the final sequence. The choice is made by the assembler and by its settings, which should be reported.

Koren et al. (2017) show that the error correction and the overlap detection are the two stages on which the quality of the contigs depends, and Sandve et al. (2013) recommended recording the settings of each stage so that the assembly can be repeated.
