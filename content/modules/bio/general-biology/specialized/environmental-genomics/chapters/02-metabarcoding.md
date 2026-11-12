---
title: "Metabarcoding"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Metabarcoding as the amplification of a standard marker gene region from many species in a mixed sample followed by high-throughput sequencing and the assignment of each sequence to a taxon, covering the choice of a marker that is variable enough to distinguish species yet conserved enough for universal primers, the primer bias that amplifies some taxa more efficiently than others, the clustering of sequences into operational taxonomic units or amplicon sequence variants, the use of reference databases for taxonomic assignment and the errors when the database is incomplete, and the comparison of read counts with abundance and its limits."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps by which metabarcoding turns a mixed sample into a species list and state the role of the marker gene and the primers."
  - "Explain how primer bias and an incomplete reference database change the species list and why read counts are not a direct measure of abundance."
references:
  - "Taberlet, P., Coissac, E., Pompanon, F., Brochmann, C., & Willerslev, E. (2012). Towards next-generation biodiversity assessment using DNA metabarcoding. Molecular Ecology, 21(8), 2045-2050. https://doi.org/10.1111/j.1365-294X.2012.05470.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Metabarcoding identifies many species in a sample by amplifying a short standard gene region from all of them, sequencing the amplified fragments and assigning each sequence to a taxon. Taberlet et al. (2012) described the method as a way of surveying biodiversity without identifying each specimen by morphology. The marker gene must be variable enough to tell species apart, and conserved enough that a single pair of primers can amplify it from many different organisms.

The primers are the most influential choice. A primer that matches some taxa more closely than others will amplify them more efficiently, so their sequences are overrepresented in the reads, and others may be missed altogether. This primer bias is a systematic error, and it changes the apparent composition of the community. Primers should be tested against known communities, and their coverage of the target groups should be reported.

The sequences are clustered into operational taxonomic units or amplicon sequence variants, which are used as proxies for species. The clustering method and its threshold affect the number of units, and two sequences that differ by a few bases may be treated as different species or as the same. The choice must be stated, since it determines the species count.

Taxonomic assignment compares each sequence with a reference database, and the assignment is only as good as the database. A species that is absent from the database cannot be named, and a sequence may be assigned to a close relative. The database and its coverage should be reported, and the confidence of each assignment should be stated.

Read counts are often used as a measure of abundance, but the number of reads depends on the amplification efficiency, the DNA content of each organism and the sequencing depth, and it is not a direct count of individuals. Cumming (2014) argues that abundance estimates from reads should be reported as relative values with their uncertainty, and Ioannidis (2005) described how an apparent abundance may reflect the method rather than the population. Sandve et al. (2013) recommended recording the primers, the clustering method and the database version.
