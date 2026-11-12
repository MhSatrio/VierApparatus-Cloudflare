---
title: "Population Genomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The study of genetic variation within and among populations using genome-wide data, covering the measures of diversity and differentiation across the genome, the inference of demographic history such as population bottlenecks and expansions from the site frequency spectrum, the detection of natural selection from the patterns of variation around genes, the linkage disequilibrium that records recombination and population history, the sampling designs needed to estimate these quantities, the confounding of selection with demography, and the reporting of population genomic analyses with their samples, their filters and their models."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how the site frequency spectrum reveals demographic history and state how selection and demography can produce similar patterns."
  - "Explain how a genome scan detects selection and state the design that separates selection from demography."
references:
  - "Nielsen, R. (2005). Molecular Signatures of Natural Selection. Annual Review of Genetics, 39(1), 197-218. https://doi.org/10.1146/annurev.genet.39.073003.112420"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Population genomics uses genome-wide data to study how genetic variation is distributed within and among populations and how it has changed over time. The data come from many loci, often sequenced across the genomes of many individuals, and they reveal the history of populations, the forces that have shaped them and the genes that have responded to selection. Nielsen (2005) reviewed the statistical signatures that selection and demography leave in the genome, and these signatures are the central subject of the field.

The topic begins with the measures of diversity and differentiation, which summarise how much variation exists and how populations differ. The site frequency spectrum, which records how many variants are present at each frequency, is a powerful summary of history, since bottlenecks and expansions change its shape in characteristic ways. The inference of history from the spectrum depends on assumptions, and these must be stated.

Natural selection leaves signatures around the genes it acts upon, including reduced diversity near a selected site and unusual patterns of linkage. The detection of selection requires distinguishing these signatures from those of demography, since a population bottleneck can reduce diversity across the whole genome and mimic a sweep in some regions. A genome-wide baseline against which the candidate regions are compared is essential.

Linkage disequilibrium records both recombination and population history, and it provides information on the effective size and on past events. Sampling designs must be chosen to estimate these quantities without bias, and the number of individuals and the spread of their locations affect the results. Cumming (2014) argues that the estimates should be reported with their intervals, and Ioannidis (2005) described how a scan for selection can produce many candidates by chance, so the threshold must be corrected for the number of tests. Sandve et al. (2013) and Peng (2011) recommended recording the samples, the filters and the models.
