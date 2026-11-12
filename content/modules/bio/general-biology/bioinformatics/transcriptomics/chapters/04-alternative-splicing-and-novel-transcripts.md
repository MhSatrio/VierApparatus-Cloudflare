---
title: "Alternative Splicing and Novel Transcripts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How RNA sequencing reveals alternative splicing, the use of reads that cross exon junctions to detect the inclusion and exclusion of exons, the discovery of transcripts that are not in the annotation by mapping reads across the genome, the distinction between a real novel transcript and an artefact of mapping or library preparation and the validation needed before a new isoform is reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how reads that span exon junctions reveal alternative splicing and state the limits of short-read evidence for full-length isoforms."
  - "Distinguish a novel transcript supported by reads from an artefact and list the evidence needed to report a new isoform."
references:
  - "Mortazavi, A., Williams, B. A., McCue, K., Schaeffer, L., & Wold, B. (2008). Mapping and quantifying mammalian transcriptomes by RNA-Seq. Nature Methods, 5(7), 621-628. https://doi.org/10.1038/nmeth.1226"
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Kim, D., Langmead, B., & Salzberg, S. L. (2015). HISAT: a fast spliced aligner with low memory requirements. Nature Methods, 12(4), 357-360. https://doi.org/10.1038/nmeth.3317"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Alternative splicing produces several transcripts from one gene, and RNA sequencing reveals the choices. Mortazavi et al. (2008) showed that reads can be mapped across the boundaries between exons, and a read that joins two exons that are not adjacent in the genome shows that the intervening sequence was removed. Counting such junction reads for each pair of exons measures how often the splicing choice is made, which gives a quantitative view of alternative splicing.

Spliced alignment is needed to find these reads. An ordinary alignment would fail to place a read that spans an intron, and the aligner must allow the gap at the intron boundary. Kim et al. (2015) describe HISAT, an aligner that handles spliced reads with low memory, and the choice of aligner determines which junctions are found. Alberts et al. (2022) describe the splicing reaction that removes introns from the primary transcript, and the alignment must reproduce that structure.

Short reads cannot always show the full-length isoform. A read covers part of a transcript, and two isoforms that differ far from the read may be indistinguishable. The connectivity of the junctions is therefore an inference, and the full structure of a transcript may need long reads or a targeted method to confirm.

A novel transcript is a transcript that is not in the annotation. It is detected by reads that map to a region of the genome outside the known genes or that join exons in a new combination. The same signal can arise from a mapping error, from genomic DNA contamination or from a library artefact, and a novel transcript is reported only after these are excluded. Wang et al. (2009) identified the discovery of new transcripts as one of the strengths of sequencing, and the strength is conditional on the controls.

Sandve et al. (2013) recommended that the evidence for each reported finding be recorded, and the junction reads, their counts and the controls that excluded artefacts are the evidence for a new isoform.
