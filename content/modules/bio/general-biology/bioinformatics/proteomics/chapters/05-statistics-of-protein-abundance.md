---
title: "Statistics of Protein Abundance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The statistical analysis of protein abundance across conditions, including the handling of missing values that arise when a protein is not detected in some samples, the log transformation and variance stabilisation of abundances, the tests for differential abundance with replicates, the correction for the number of proteins tested and the reasons a protein detected in only one condition is not necessarily absent from the other."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Handle the missing values of a proteomic dataset and state the assumption behind each handling choice."
  - "Test proteins for differential abundance across replicates and correct the result for the number of proteins tested."
references:
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A proteomic dataset is full of missing values. A protein may be present in one sample and below the detection limit in another, and the mass spectrometer selects peptides for identification partly at random, so the same protein may be seen in some runs and not others. The missing values must be handled before any statistics are applied, and the choice has consequences. Aebersold and Mann (2016) describe the detection process that produces these gaps, and a missing value is information about detection as well as about abundance.

The usual practice is to log-transform the abundances, which makes the differences between conditions comparable across the range of abundances and stabilises the variance. Missing values are then either removed, which keeps only the proteins detected in every sample, or imputed, which fills them with an estimate. Each choice carries an assumption. Removal assumes the missing values are unrelated to the conditions, and imputation assumes a model of the missingness. A protein detected in one condition and absent from the other is not necessarily absent from it, and a test that ignores this will misstate the difference.

Differential abundance is tested with replicates, in the same way that differential expression is tested in transcriptomics. The statistics of the RNA-seq topic apply in outline, although the data are different. A test of each protein produces a p-value, and these must be corrected for the number of proteins tested, since thousands may be examined in one dataset. Ioannidis (2005) described how the number of tests inflates the number of false findings, and the correction is the means of controlling it.

The statistical methods used for transcripts can be adapted for proteins, as Robinson et al. (2010) showed for their count data, but the assumptions must be checked. Protein abundances are not counts of independent molecules in the same way, and a method borrowed from another kind of data should be justified rather than assumed.

Sandve et al. (2013) recommended that the handling of missing values and the statistical model be recorded, since these decisions change the list of proteins that differ.
