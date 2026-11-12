---
title: "Compositional Data Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The statistical analysis of microbiome data, which are compositional because the sequencing reports proportions that sum to a constant, covering the spurious correlations that arise when proportions are analysed as if they were independent counts, the log-ratio transformations that remove the constraint and allow standard methods to be applied, the zero values that arise from undetected taxa and the methods used to handle them, the sparsity and overdispersion of count data, the differential abundance tests that compare taxa between groups, and the control of false discoveries across the many taxa tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why microbiome proportions are compositional and state the spurious correlation that arises when they are analysed without transformation."
  - "Describe a log-ratio transformation and state how zeros and multiple testing are handled in a differential abundance analysis."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Microbiome data are compositional. The sequencing reports the proportions of the taxa in a sample, and these proportions always sum to one, so an increase in one taxon must be matched by a decrease in others. Analysing such proportions as if they were independent counts produces spurious correlations, in which taxa appear to be related when they are only linked by the constraint of the sum. The problem is a consequence of the measurement, not of the biology, and it must be addressed in the analysis.

Log-ratio transformations remove the constraint by expressing each taxon relative to a reference, typically the geometric mean of all taxa in the sample, and the transformed values can then be analysed with standard methods. The choice of reference affects the interpretation, and the results should be stated with respect to the chosen reference. The transformation makes the analysis more valid, but it cannot recover absolute abundances from relative data.

Zero values arise when a taxon is not detected, and they cannot be logged. Some zeros are true absences, and others reflect the limited sequencing depth. The handling of zeros, by replacement with small values or by models that treat them explicitly, affects the results, and the method should be reported and its sensitivity tested.

Microbiome data are sparse, with many zeros, and overdispersed, with variance greater than the mean. Models for count data that allow for overdispersion, such as the negative binomial, are often used for differential abundance tests, which compare taxa between groups. Ioannidis (2005) described how the number of taxa tested in such analyses makes false positives likely, and the false discovery rate must be controlled. Cumming (2014) argues that the differences in abundance should be reported with their intervals, and Sandve et al. (2013) recommended recording the transformation, the reference and the test used.
