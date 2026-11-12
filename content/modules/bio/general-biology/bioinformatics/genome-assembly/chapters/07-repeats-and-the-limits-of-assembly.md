---
title: "Repeats and the Limits of Assembly"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why repeats are the central difficulty of genome assembly, the kinds of repeat from tandem arrays and transposons to segmental duplications and the centromeric satellites, how repeats collapse, duplicate or break an assembly, the limits that repeats place on what any assembly can show and the ways in which an analyst recognises that a region of the genome has not been assembled correctly."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Classify the main kinds of repeat in a genome and state how each one affects an assembly."
  - "Recognise a collapsed or misassembled repeat and state the evidence needed to resolve it."
references:
  - "Kolmogorov, M., Yuan, J., Lin, Y., & Pevzner, P. A. (2019). Assembly of long, error-prone reads using repeat graphs. Nature Biotechnology, 37(5), 540-546. https://doi.org/10.1038/s41587-019-0072-8"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
---

Repeats are the reason assembly is difficult. Alberts et al. (2022) describe the genome as containing many classes of repeated sequence, from transposable elements that have copied themselves across the chromosomes to satellite arrays of short motifs repeated thousands of times at the centromeres and telomeres. A read that lies entirely within a repeat cannot be placed by its own sequence, since the same sequence occurs at several sites, and an assembler must decide between them.

The kinds of repeat differ in their difficulty. Short tandem repeats are often resolved by the reads that span them, while long arrays of near-identical units are hard even for long reads. Segmental duplications, which are large copies of genomic regions that differ by only a small fraction, are among the hardest, because they can be mistaken for a single region. Each kind leaves a different mark on the assembly.

The assembler handles repeats in one of three ways, and each produces a characteristic error. It may collapse the copies into one, which shortens the assembly and loses the number of copies. It may duplicate the sequence, which inflates the assembly with copies that do not exist. Or it may break the contig at the repeat, which leaves gaps. Kolmogorov et al. (2019) describe a repeat graph that keeps the repeats explicit rather than discarding them, and this representation is designed to reduce the collapse and the duplication.

A collapsed or misassembled repeat is recognised by inconsistencies. Coverage that is double the expected value suggests a collapsed region, and coverage that is half suggests a duplicated one that was split. Reads that map to a region with several conflicting placements, or a contig whose length does not match the known size of a locus, are further signs. The resolution requires evidence that spans the repeat, such as long reads or a physical map.

Koren et al. (2017) show that long reads resolve many repeats that short reads cannot, and the limits that remain are the regions where no read spans the repeat. A reader should treat those regions as unresolved and should not claim the assembly is complete there.
