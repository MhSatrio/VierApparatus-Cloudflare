---
title: "Statistical Testing and Multiple Comparisons"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How hypothesis tests and p-values are used to judge biological differences in R, the meaning and the limits of a p-value, the problem of multiple comparisons across thousands of genes, the control of the family-wise error rate and the false discovery rate and the reporting of effect sizes alongside significance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what a p-value measures and what it does not measure."
  - "Apply a false discovery rate correction to a set of p-values and explain how it differs from a correction that controls the family-wise error rate."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
---

A p-value is the probability of obtaining a result at least as extreme as the one observed, if the null hypothesis of no effect were true. It is not the probability that the null hypothesis is true, and it does not measure the size of an effect. A small p-value means that the data are unlikely under the null model, which is a statement about the data given the model. Ioannidis (2005) described how the misreading of such statistics, together with selective reporting, contributes to findings that do not hold up, and the misreading is common in biology.

Multiple comparisons inflate the number of false positives. When thousands of genes are tested at a threshold of 0.05, several hundred will pass by chance if no gene is truly changed. A family-wise correction, such as the Bonferroni procedure, controls the probability of making any false positive, which is strict and loses power. A false discovery rate correction controls the expected proportion of false positives among the results called significant, which is more suitable when many genuine effects are expected.

The correction must match the question. An analysis that tests one pre-specified gene needs no correction, while an exploratory screen of the whole genome needs one. The number of tests should be stated, and the correction applied to all of them, since a correction applied to a filtered subset understates the problem.

Effect sizes should be reported with the p-values. A gene with a tiny but highly significant difference may be uninteresting biologically, and a large effect that fails to reach significance in a small study may still matter. Love et al. (2014) reported fold changes with their shrunken estimates, which shows the size of the effect alongside its uncertainty.

Platt (1964) recommended framing tests so that they can exclude competing explanations. A p-value that tests only the null of no effect says little about which of several biological mechanisms is responsible, and a design that discriminates between them gives a stronger inference.
