---
title: "Gene Set Enrichment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a list of differentially expressed genes is tested for enrichment in predefined gene sets such as pathways or functional categories, the hypergeometric and rank-based tests used for enrichment, the choice of the background set of genes against which enrichment is measured, the correction for the number of sets tested and the cautions that enrichment results are sensitive to how the sets were defined and to the genes measured."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test a list of differentially expressed genes for enrichment in a gene set and state the background against which enrichment is measured."
  - "Explain why the choice of background and the number of sets tested must be reported with any enrichment result."
references:
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A list of differentially expressed genes is often interpreted by asking whether it contains more genes than expected from a particular pathway, process or location. Enrichment is the test of that question. A gene set is a group of genes defined by a shared property, such as membership of a metabolic pathway, and the test asks whether the set is overrepresented in the list. Alberts et al. (2022) describe the pathways of the cell, and the gene sets are often drawn from such knowledge.

The commonest test is hypergeometric. It asks how likely it is that a list of the given size would contain at least as many members of the set as observed, if the list were drawn at random from the background. The background is the set of genes that could have been in the list, and its choice determines the result. A background of all genes in the genome makes enrichment look strong for any set of genes that are expressed in the tissue, because those genes were never in a position to be called. The background should be the genes that were tested and could have been detected.

Rank-based tests use the whole ranking of genes rather than a threshold. They ask whether the genes of a set cluster toward the top or bottom of the ranked list, and they avoid the arbitrary cut-off of the threshold. The choice between the two kinds of test should be justified, and the ranking statistic used should be stated.

Many gene sets are tested, and the correction for multiple testing applies to them as well. Ioannidis (2005) described how the number of tests inflates false findings, and a correction across the sets is needed before any set is called enriched. The sets themselves are defined by databases that change over time, so the version of the database must be reported.

Sandve et al. (2013) recommended that the background, the sets and the corrections be recorded, since an enrichment result depends on each of them.
