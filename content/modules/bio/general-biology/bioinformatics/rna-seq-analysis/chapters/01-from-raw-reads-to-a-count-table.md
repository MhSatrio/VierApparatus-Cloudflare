---
title: "From Raw Reads to a Count Table"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The pipeline that turns raw RNA sequencing reads into a table of counts per gene, covering the trimming and quality checks of the reads, the spliced alignment of the reads to the genome with STAR, the counting of reads per gene with HTSeq, the choice of annotation and strandedness and the checks on the resulting table before it enters a statistical model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps that turn raw reads into a gene-level count table and the tool used for each."
  - "Check a count table for errors before it is used in a statistical analysis."
references:
  - "Dobin, A., Davis, C. A., Schlesinger, F., Drenkow, J., Zaleski, C., Jha, S., Batut, P., Chaisson, M., & Gingeras, T. R. (2013). STAR: ultrafast universal RNA-seq aligner. Bioinformatics, 29(1), 15-21. https://doi.org/10.1093/bioinformatics/bts635"
  - "Anders, S., Pyl, P. T., & Huber, W. (2015). HTSeq: a Python framework to work with high-throughput sequencing data. Bioinformatics, 31(2), 166-169. https://doi.org/10.1093/bioinformatics/btu638"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

The pipeline begins with the raw reads, which are trimmed of low-quality bases and adapter sequences. The reads are then aligned to the genome. Dobin et al. (2013) describe STAR, which aligns reads across exon junctions, and the alignment is the stage at which the reads become attached to positions. The aligned reads are then counted per gene, and Anders et al. (2015) describe HTSeq, which counts reads that fall within the features of an annotation. The count table is the input to every statistical model that follows.

Two settings must be stated. The annotation determines which features are counted, and an annotation from a different release changes the genes and their extents. The strandedness of the library determines which strand a read must match to be counted, and a mismatch between the library preparation and the counting setting assigns many reads to the wrong genes. The strandedness is often known from the protocol and can be checked from the reads.

The table is checked before use. Its rows should match the genes of the annotation, its columns should match the samples, and the total counts per sample should be in a reasonable range. A sample with very few counts has probably failed, and a gene with counts in one sample only may be an artefact. These checks are simple, and they catch many errors that would otherwise enter the statistics unnoticed.

Sandve et al. (2013) recommended that each step of an analysis be recorded, and the aligner, the counter, their versions and their settings define the table. Taschuk and Wilson (2017) recommended that the software be tested, and a count table derived from a small dataset with a known answer is such a test.

The count table is the boundary between the data and the statistics. Every decision that changes its values must be recorded, because every later result depends on it.
