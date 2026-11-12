---
title: "Quality and Sensitivity Checks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The checks that confirm a differential expression analysis is behaving as expected, including the distribution of p-values under the null, the mean-variance relationship, the sample clustering by principal components, the sensitivity of the results to the filter and the design and the check of known positive and negative genes, with the way each check reveals a problem that the final list would hide."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Plot the distribution of p-values and interpret its shape as a check of the analysis."
  - "Use a clustering of samples and the sensitivity of the results to the filter to judge whether the analysis is robust."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Before the list of genes is trusted, the analysis should be checked. Taschuk and Wilson (2017) recommended that research software be tested, and a differential expression analysis is tested by asking whether its behaviour is what the design leads one to expect. Several checks reveal problems that the final list would conceal, and they are cheap to run before the results are reported.

The distribution of p-values is the most informative. For genes with no true effect, the p-values should be spread evenly between zero and one. A spike near zero indicates a real signal, while a skewed or mis-shaped distribution indicates a problem with the model, such as a missing batch or an incorrect dispersion. Love et al. (2014) describe the model whose p-values are checked in this way.

Sample relationships are checked by clustering. A principal component plot of the samples should group replicates of the same condition together, and a sample that falls among the wrong group suggests a mislabelled or failed sample. A batch that separates the samples more strongly than the condition suggests that the batch must be in the design.

Sensitivity is tested by changing the analysis. The list of genes should not depend strongly on the exact filter for low-count genes, or on a small change in the design. A result that holds across reasonable choices is more robust than one that appears only under one setting. Platt (1964) recommended comparing a conclusion with its alternatives, and this sensitivity test is that comparison.

Known genes give a check of the biology. Genes whose response to the condition is established by earlier work should change in the expected direction, and their absence from the result is a warning. The check does not prove the analysis correct, but a failure to recover well-known responses is a strong reason for suspicion.

Sandve et al. (2013) recommended recording the checks and their outcomes with the analysis, since a reader needs to know which problems were looked for and which were found.
