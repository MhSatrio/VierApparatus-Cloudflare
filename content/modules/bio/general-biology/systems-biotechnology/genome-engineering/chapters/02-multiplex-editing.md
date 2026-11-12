---
title: "Multiplex Editing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The editing of several genomic sites at once with multiple guide RNAs, the demonstration by Cong et al. that a single system can cut more than one site in eukaryotic cells, the design of arrays of guides that avoid interference between them, the combinatorial problem of assigning edits to cells when many are made in parallel, the statistics of the frequency of cells that carry all intended edits, and the need to verify each site separately because an edit at one site does not guarantee the others."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how several guides can direct one nuclease system to several sites and why this allows multiplex edits."
  - "Calculate the expected frequency of cells that carry all intended edits and state why each site must be verified."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex Genome Engineering Using CRISPR/Cas Systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Multiplex editing changes several sites in the genome at once, which is useful when a trait depends on more than one gene or when a pathway must be rewired. Cong et al. (2013) showed that a single nuclease system could be directed by several guides to cut more than one site in mammalian cells, and that the sites could be edited together. The method extended the reach of genome engineering from one gene at a time to whole sets of genes.

The guides must be designed to cut only their intended sites and not to interfere with one another. A guide that resembles another may compete for the nuclease or cut the wrong site, and an array of guides should be checked for such similarities before it is used. The design of the array is a combinatorial problem whose difficulty grows with the number of targets.

When many edits are made in parallel, each cell may receive some of them and not others, and the cells that carry all the intended edits form a small fraction of the population. If each edit occurs independently with probability p, the expected fraction of cells with all n edits is the product of the individual probabilities, which falls rapidly as n grows. The planning of a multiplex experiment must account for this fall, and the number of cells screened must be large enough to find the rare cells that carry all the edits.

An edit at one site does not guarantee an edit at another, so each site must be verified separately. Cumming (2014) argues that the frequency of each edit should be reported with its interval, and the combination of edits should be reported with the number of cells in which it was found. Sandve et al. (2013) recommended recording the guides, the sites and the verification for each cell, so that the genotype of every clone can be traced.
