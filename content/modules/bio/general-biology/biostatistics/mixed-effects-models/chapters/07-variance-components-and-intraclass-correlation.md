---
title: "Variance Components and Intraclass Correlation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The interpretation of the variance components of a mixed model as descriptions of where the variation in a biological system lies, the intraclass correlation as the proportion of variance between units, the use of variance components to plan future studies by determining how many units or repeated measures are needed, the comparison of components across experiments and the reporting of components with their intervals so that the sources of variation are visible and not only the fixed effects."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Interpret each variance component of a mixed model as a source of variation in the biological system."
  - "Use the variance components to inform the design of a future study by estimating how many units or repeats are needed."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The variance components of a mixed model are often the most informative part of its output. Each one estimates how much the units of a given factor differ, and together they partition the total variation of the response into its sources: between individuals, between batches, between sites and within individuals. Laird and Ware (1982) described these components as the means of modelling the population of units, and a biologist can read them as a statement about where the variation in a system lies.

The intraclass correlation is the proportion of the total variation that lies between units of a factor. A high value means that the units differ much more than the measurements within them, and it tells the reader that the individual is a major determinant of the response. A low value means that most of the variation is within the units and that individual differences matter little. The statistic is simple, and it is a direct summary of the structure of the variation.

The components are used to plan future studies. The number of units and the number of repeated measurements needed to estimate an effect with a given precision depend on the variance between units and within them. A study that has estimated these components can calculate how many individuals are required to detect a treatment effect of a given size, and the calculation makes the design of the next study a matter of evidence.

The components should be reported with their intervals. An interval for a variance component can be very wide, particularly when the number of units is small, and a point estimate alone suggests a precision that the data do not have. Cumming (2014) argues for showing the uncertainty of every estimate, and the components are estimates whose uncertainty matters for their use.

Ioannidis (2005) described how a result that is taken as settled from a single study may not replicate, and the variance components of one study may differ from those of another population. Sandve et al. (2013) recommended recording the components with their interpretation and the population from which the units were drawn.
