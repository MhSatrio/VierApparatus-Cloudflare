---
title: "RNA-seq Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational analysis of RNA sequencing data from raw reads to differentially expressed genes, covering the alignment and counting of reads, the statistical models of count data used by DESeq2 and edgeR, the design matrix that encodes the comparison, the correction of p-values for thousands of genes, the interpretation of fold changes and the enrichment of gene sets, and the reporting that lets the analysis be repeated and checked."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Run an RNA-seq pipeline from raw reads to a count table and carry out a differential expression analysis with a stated design."
  - "Interpret the fold changes and corrected p-values of a differential expression analysis and state what they do not establish."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Dobin, A., Davis, C. A., Schlesinger, F., Drenkow, J., Zaleski, C., Jha, S., Batut, P., Chaisson, M., & Gingeras, T. R. (2013). STAR: ultrafast universal RNA-seq aligner. Bioinformatics, 29(1), 15-21. https://doi.org/10.1093/bioinformatics/bts635"
  - "Anders, S., Pyl, P. T., & Huber, W. (2015). HTSeq: a Python framework to work with high-throughput sequencing data. Bioinformatics, 31(2), 166-169. https://doi.org/10.1093/bioinformatics/btu638"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An RNA-seq analysis turns raw reads into a statement about which genes differ between conditions. The path has several stages: quality control and alignment, counting the reads per gene, modelling the counts across the replicates, correcting for the number of genes tested and interpreting the results. Each stage has a standard tool, and each makes choices that change the output. The topic follows these stages and shows how each choice is made and reported.

The statistical core is the model of count data. Love et al. (2014) describe DESeq2, which models the counts with a negative binomial distribution and shrinks the estimates of fold change and dispersion across genes, and Robinson et al. (2010) describe edgeR, which uses a related model with an empirical Bayes approach. The design matrix, which encodes the comparison, is the means by which the model is told what to test.

The analysis produces a list of genes with their fold changes and corrected p-values, and the list is the beginning of an interpretation. The chapters on interpretation address what the list does and does not establish, and the concluding chapter sets out what a report of the analysis must contain. Ioannidis (2005) described why repeated testing and flexible analysis make an apparent finding less reliable than it appears, and the discipline of a fixed plan is the defence the topic returns to throughout.
