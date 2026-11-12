---
title: "Crop Genome Sequencing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The sequencing and assembly of crop genomes, covering the challenges of large and polyploid genomes with repetitive sequences that complicate assembly, the use of long reads and scaffolding to achieve chromosome-scale assemblies, the annotation of genes and the identification of their functions, the pangenome that captures the genes present in some cultivars and absent in others, the structural variants that alter genes and their expression, the reference genomes that serve as the basis for mapping the reads of other lines, and the reporting of genome assemblies with their completeness, their assembly metrics and the cultivar sequenced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why crop genomes are harder to assemble than many other genomes and state the methods used to overcome repeats and polyploidy."
  - "Describe a pangenome and explain why a single reference genome may miss genes that matter for a trait."
references:
  - "Heffner, E. L., Sorrells, M. E., & Jannink, J. (2009). Genomic Selection for Crop Improvement. Crop Science, 49(1), 1-12. https://doi.org/10.2135/cropsci2008.08.0512"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Crop genomes have been sequenced for many species, and the sequences provide the reference against which the variation of breeding populations is measured. The assembly of such genomes is difficult. Many crops are polyploid, carrying several copies of each chromosome set, and their genomes are rich in repeated sequences, which make it hard to determine where each read belongs. Heffner et al. (2009) relied on the genotypes that these sequences make possible, and the quality of the reference determines the accuracy of all later work.

Long sequencing reads and scaffolding methods that link contigs into chromosomes have made chromosome-scale assemblies possible for many crops. The completeness of an assembly is assessed by the presence of conserved genes and by the proportion of the genome that is anchored to chromosomes. Each assembly must be reported with its metrics, since a fragmented assembly can miss genes that lie in gaps.

Gene annotation identifies the genes in the assembly and assigns their functions by comparison with known genes. The annotation of a crop is less complete than that of model organisms, and the function of many genes is inferred rather than measured. The inference should be marked as such, and the annotation version should be reported.

A single reference genome does not capture the genes present in all cultivars. The pangenome, which combines the genomes of many cultivars, reveals genes that are absent from the reference but present in others, and some of these genes control traits of value. Structural variants such as deletions and duplications also alter genes and their expression. Cumming (2014) argues that the number of genes and variants should be reported with their uncertainty, and Sandve et al. (2013) recommended recording the cultivar, the sequencing and the assembly procedure.
