---
title: "Controls for Assembly and Annotation Artefacts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The controls that separate a real biological difference between genomes from an artefact of how they were assembled and annotated, including the use of a consistent pipeline for all genomes compared, the checks for missing genes and for false gene calls, the examination of whether a gene's absence is supported by the reads, and the reporting of the controls so that a difference can be judged rather than assumed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a comparison of genomes that uses the same pipeline for each genome and explains why this matters."
  - "Test whether a gene absent from one genome is truly absent by examining the reads and the alignment."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A difference between two genomes may be real, or it may be made by the way the genomes were produced. Two assemblies of the same species can differ in their coverage of a region, and two annotations can differ in which genes they call. A comparison that does not control for these sources will attribute to biology what belongs to the pipeline, and the controls are what prevent this error.

The first control is consistency. Every genome compared should be assembled and annotated with the same pipeline and settings, so that the methods do not differ between genomes. Haas et al. (2008) describe an annotation pipeline that can be applied uniformly, and the principle is that the comparison must not depend on which genome was processed with which tool. A difference found between genomes processed differently is not interpretable until the pipelines are matched.

The second control concerns absent genes. A gene that appears to be missing from one genome is first checked in the reads. If reads from that genome map to the region where the gene should be, the gene may be present but unannotated, and the apparent absence is an annotation gap. Only when the reads show no sequence of the gene is the absence supported.

The third control concerns false calls. A gene that is present in one genome and absent from another may be a false gene call, a predicted gene that does not exist. Checking the gene against the transcript and protein evidence distinguishes a real gene from a prediction. The count of genes found and the count of those with evidence should both be reported.

Ioannidis (2005) described how selective reporting of differences can make a comparison appear to find more than it does, and the controls protect against this. Taschuk and Wilson (2017) recommended that the software of an analysis be tested, and a comparison should be run with a control pair of genomes whose answer is known.

The controls are reported with the comparison. The pipeline, the checks and their outcomes are part of the result, and Sandve et al. (2013) recommended recording the steps of an analysis so that the difference can be judged.
