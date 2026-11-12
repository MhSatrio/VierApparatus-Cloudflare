---
title: "Interpreting Fold Changes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the fold changes of a differential expression analysis are interpreted, the difference between statistical significance and biological size, the effect of shrinkage on the estimated fold change of low-count genes, the choice of a threshold for biological relevance, the risk of ranking genes by fold change alone and the reasons a large fold change in a poorly expressed gene may not be biologically important."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a small p-value and a large fold change answer different questions and why both must be reported."
  - "Describe the effect of shrinkage on the fold changes of low-count genes and why a shrunken estimate is preferred for ranking."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Wang, Z., Gerstein, M., & Snyder, M. (2009). RNA-Seq: a revolutionary tool for transcriptomics. Nature Reviews Genetics, 10(1), 57-63. https://doi.org/10.1038/nrg2484"
---

A differential expression result has two numbers for each gene: the fold change, which measures the size of the difference, and the corrected p-value, which measures the evidence that the difference is real. They answer different questions. A gene can have a large fold change and no significant evidence, when its counts are too few to be sure, and a gene can have strong evidence for a small change that may not matter biologically. Both numbers must be reported and read together.

Shrinkage changes the fold changes of genes with few counts. Love et al. (2014) describe how the estimate for a gene with low expression is pulled toward zero, because such a gene's raw fold change is unreliable. The shrunken estimate is more stable, and it is the better basis for ranking, since the raw fold change of a poorly expressed gene can be large by chance. A ranking by unshrunken fold change tends to put noisy low-count genes at the top.

The biological size of a change is a judgement that the statistics do not make. A twofold change in a key regulator may matter greatly, while a twofold change in an abundant housekeeping gene may be trivial. Some analyses apply a threshold on the fold change in addition to the significance threshold, which selects genes that are both reliably changed and large enough to matter. The threshold must be chosen with the biology in mind and stated in advance.

Wang et al. (2009) noted the wide range of expression that RNA sequencing measures, and the size of a fold change means different things at different levels. A change from one count to two is a twofold change that carries almost no information, and a change from a thousand to two thousand is far more secure. Shrinkage and the minimum count filter are the means of managing this.

Ranking by fold change alone is a common error. It selects the noisiest genes and omits the well-measured ones with modest changes. The list should be built from the significance and the size together, and the rule should be recorded in the report.

Love et al. (2014) show that the estimate and its uncertainty can be reported together, and reporting both is the honest form of the result.
