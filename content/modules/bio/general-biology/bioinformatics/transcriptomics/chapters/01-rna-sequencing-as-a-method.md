---
title: "RNA Sequencing as a Method"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How RNA sequencing works in principle, from the isolation of RNA and its conversion into a library of fragments to the sequencing of the fragments and the mapping of the reads to a genome, the advantages of sequencing over earlier hybridisation methods including the detection of novel transcripts and the dynamic range of measurement, and the sources of bias introduced at each step of the preparation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps by which RNA is converted into a sequencing library and mapped back to a genome."
  - "Compare RNA sequencing with hybridisation arrays and state the advantages that Wang et al. described."
references:
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Mortazavi, A., Williams, B. A., McCue, K., Schaeffer, L., & Wold, B. (2008). Mapping and quantifying mammalian transcriptomes by RNA-Seq. Nature Methods, 5(7), 621-628. https://doi.org/10.1038/nmeth.1226"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

RNA sequencing begins by isolating the RNA of the sample, and the quality of this material sets the ceiling of the whole experiment. The RNA is converted into complementary DNA, fragmented, adapted with sequences that allow it to be read and amplified into a library. The library is sequenced, and each read is a fragment of one of the transcripts in the sample. Wang et al. (2009) describe this sequence of steps and the way the reads stand for the transcripts they came from.

The reads are mapped back to the genome, and the number of reads falling on each gene or transcript is taken as a measure of its abundance. Mortazavi et al. (2008) demonstrated that the reads from a mammalian transcriptome could be mapped across the exons of the genes, which allows the abundance of each transcript to be estimated and new transcripts to be found. The mapping can reveal transcripts that were not in the annotation, which is one of the main advantages over methods that measure only known sequences.

Compared with hybridisation arrays, sequencing measures a wider range of abundances and does not depend on probes designed in advance. A probe on an array responds only to the sequence it was designed for, and an array cannot see a transcript it did not anticipate. Sequencing counts the fragments it obtains, so it detects transcripts that were unknown at the design stage. Wang et al. (2009) gave this comparison as one of the reasons for the rapid adoption of the method.

Each step introduces bias. The RNA isolation may favour some transcripts, the conversion to complementary DNA is not uniform across lengths and sequences, and the amplification can distort the proportions in the library. The reads of a short transcript may map more often than those of a long one, which must be corrected in quantification. Sandve et al. (2013) recommended recording the steps of an analysis, and the protocol, the library method and the depth are the steps that determine what the reads can show.
