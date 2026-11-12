---
title: "Multiple Testing and the False Discovery Rate"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The problem that arises when many hypothesis tests are performed on the same data, the inflation of the family-wise error rate with the number of tests, the Bonferroni correction that controls the family-wise error rate at the cost of power, the Benjamini and Hochberg procedure that controls the expected false discovery rate, the adjusted p-values and their interpretation and the reporting of the number of tests on which any correction depends."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the family-wise error rate for a given number of independent tests and explain how it grows with the number of tests."
  - "Apply the Benjamini-Hochberg procedure to a set of p-values and state what its threshold controls."
references:
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

When many tests are performed on the same data, the chance that at least one is a false positive grows with their number. If twenty independent tests are each run at the five per cent level with every null true, the probability of at least one false rejection is about sixty-four per cent. In a genomic or proteomic study, which may perform thousands of tests, the uncorrected threshold would produce hundreds of false findings. Ioannidis (2005) described how the number of tests and the flexibility of their analysis inflate the apparent findings, and the correction for multiplicity is the standard response.

The family-wise error rate is the probability of making any false rejection among the tests. The Bonferroni correction controls it by dividing the significance level by the number of tests, which is simple and strict. It protects against any false positive, but at the cost of power, since it asks each test to meet a very demanding threshold when many tests are performed and most effects may be real.

The false discovery rate is the expected proportion of the rejected tests that are false. Benjamini and Hochberg (1995) introduced a procedure that controls it: the p-values are ordered, each is compared with a threshold that rises with its rank, and the largest p-value that meets its threshold determines which null hypotheses are rejected. The procedure is more powerful than the Bonferroni correction when many effects are real, and it is the usual choice in omics studies.

The adjusted p-value is the smallest false discovery rate at which a test would be rejected. A threshold on the adjusted p-values selects the discoveries, and the interpretation is that the expected proportion of false discoveries among them is at most the threshold. It is a statement about the list, not about any single test.

Wasserstein and Lazar (2016) warn that a threshold applied to each of many p-values without correction is a common source of false findings, and the correction must be applied to all the tests performed. Sandve et al. (2013) recommended recording the number of tests and the procedure used, since the correction depends on both.
