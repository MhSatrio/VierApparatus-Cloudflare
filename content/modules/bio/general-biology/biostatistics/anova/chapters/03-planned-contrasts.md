---
title: "Planned Contrasts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Planned contrasts as comparisons of groups chosen before the data are seen to answer specific biological questions, the construction of contrast coefficients that sum to zero, the orthogonal contrasts that partition the between-group variation without overlap, the relation between a planned contrast and a post hoc comparison and the reason that a small set of pre-specified contrasts has more power and fewer false findings than a search across all pairs."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write contrast coefficients that answer a specific biological question and check that they sum to zero."
  - "Explain why planned contrasts have more power and fewer false findings than comparisons chosen after the data are seen."
references:
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A contrast is a comparison among the group means defined by coefficients that sum to zero. Comparing the mean of a control group with the average of two treated groups is a contrast with coefficients of minus two, one and one. Contrasts express the questions the experiment was designed to ask, and they are more informative than the omnibus test, which says only that the groups differ. Platt (1964) recommended framing a test around a specific alternative, and a planned contrast is the statistical form of that advice.

Orthogonal contrasts are sets of comparisons whose coefficients are uncorrelated, so that the between-group variation is partitioned among them without overlap. A design with three groups has two orthogonal contrasts, and the sum of their sums of squares equals the between-group sum of squares. Orthogonality makes the contrasts independent in the sense that each tests a separate part of the variation, which makes their interpretation clean.

Planned contrasts differ from post hoc comparisons in when they are chosen. A contrast fixed before the data were collected tests one question, and its significance threshold need not be corrected for the other possible comparisons. A comparison chosen after seeing the means is one of many that could have been made, and it must be corrected for the search. Ioannidis (2005) described how the freedom to choose comparisons after seeing the data inflates the rate of false findings.

The discipline of planning is therefore an inferential safeguard. A small number of contrasts fixed in advance have more power than a search of all pairs, and they produce fewer false findings. The correction of Benjamini and Hochberg (1995) is still needed when many contrasts are tested, but it is smaller for a planned set.

Sandve et al. (2013) recommended recording the contrasts with their coefficients and the reason for each, so that a reader can see which questions were planned. The reference to the record of the protocol is what separates a planned test from a search.
