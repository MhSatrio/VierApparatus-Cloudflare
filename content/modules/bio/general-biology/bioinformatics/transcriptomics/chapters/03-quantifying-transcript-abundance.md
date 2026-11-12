---
title: "Quantifying Transcript Abundance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the abundance of each transcript is estimated from the reads that map to it, the counting of reads per gene and the normalisation for gene length and library size, the reads per kilobase and transcripts per million measures, the handling of reads that map to more than one gene or transcript and the reasons a raw count is not a comparable measure of expression between samples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why raw read counts must be normalised for gene length and library size before samples are compared."
  - "Describe how reads that map to more than one gene or transcript are handled and what each choice assumes."
references:
  - "Mortazavi, A., Williams, B. A., McCue, K., Schaeffer, L., & Wold, B. (2008). Mapping and quantifying mammalian transcriptomes by RNA-Seq. Nature Methods, 5(7), 621-628. https://doi.org/10.1038/nmeth.1226"
  - "Anders, S., Pyl, P. T., & Huber, W. (2015). HTSeq: a Python framework to work with high-throughput sequencing data. Bioinformatics, 31(2), 166-169. https://doi.org/10.1093/bioinformatics/btu638"
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Quantification converts the reads that map to each gene into a measure of its abundance. The simplest measure is the count of reads, and Anders et al. (2015) describe HTSeq, a framework that counts reads per feature from an alignment, which is the usual first step. A raw count, however, depends on the length of the gene and on the total number of reads in the sample, so counts from a long gene and a short gene, or from a deep sample and a shallow one, cannot be compared directly.

Mortazavi et al. (2008) introduced measures that correct for these effects: the reads per kilobase of transcript per million mapped reads, which divides the count by the length and by the library size. The measure makes the abundance of one transcript comparable with another in the same sample. Between samples, a further normalisation is needed to correct the differences in composition, since a sample with a few very abundant transcripts has fewer reads for the rest.

Reads that map to more than one gene are the difficulty. Genes that share a sequence, such as duplicated genes or overlapping transcripts, produce reads that cannot be assigned uniquely. The usual choices are to discard the ambiguous reads, to assign them to the most likely gene or to share them among the candidates. Each choice assumes something about the genes involved, and the assumption changes the counts of similar genes, so the choice should be stated and its effect checked.

Wang et al. (2009) described RNA sequencing as a quantitative method, but the quantity is relative within a sample until it is normalised. A raw count is a number of fragments, and its meaning depends on the library. The normalised value is the measure to report, with the method named.

Sandve et al. (2013) recommended recording the processing of the data, and the normalisation, the counting rule and the treatment of ambiguous reads are steps that determine every abundance in the study.
