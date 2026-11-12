---
title: "Shape and Transformations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the shape of a biological distribution is described by its skewness and modality, why many biological variables are right-skewed and multiplicative in their variation, the logarithmic and other transformations that make such data symmetric and additive, the interpretation of a result on the transformed scale and the reasons a transformation must be chosen for the data and reported with the results."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the shape of a distribution by its skewness and number of modes and recognise a right-skewed biological variable."
  - "Apply a logarithmic transformation to a skewed variable and interpret a difference on the log scale as a ratio."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The shape of a distribution is described by its symmetry and by the number of its peaks. A symmetric distribution has equal tails on both sides of its centre, and a right-skewed distribution has a long tail toward large values. Many biological variables are right-skewed, including concentrations, cell sizes and read counts, because their variation is multiplicative: a value is changed by a factor rather than by a fixed amount. A variable that doubles or halves with each biological change is naturally described on a logarithmic scale.

A logarithmic transformation converts a multiplicative variation into an additive one and often makes a skewed distribution roughly symmetric. The transformed values can then be summarised with a mean and standard deviation that describe them well. Love et al. (2014) work with the logarithm of fold changes, which makes the change between two conditions symmetric around zero for a gain and a loss of the same ratio, and the choice of scale is part of their method.

A difference on the log scale is a ratio on the original scale. A difference of one unit in log base two corresponds to a twofold change, and a difference in log base ten to a tenfold change. A reader must know the base of the logarithm to read a result, and a report that gives a log difference without its base is ambiguous.

The transformation must be chosen for the data and reported with the results. A transformation that makes one dataset symmetric may not suit another, and zero values cause difficulties for the logarithm. Cumming (2014) argues that the scale of a result should be the one a reader can interpret, and a result on the transformed scale should be translated back to the original scale for the reader.

Sandve et al. (2013) recommended recording the transformations applied, since a result depends on the scale on which it was computed.
