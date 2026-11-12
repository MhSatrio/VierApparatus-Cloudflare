---
title: "Unbalanced and Multifactor Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The planning of experiments with several factors and unequal group sizes, the reasons that a balanced design gives the most power for a fixed total of units, the sample size for an interaction, which usually requires more units than a main effect of the same size, the loss of power that follows from unequal allocation, and the calculation of the size for the comparisons that answer the question the experiment was designed to address."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a balanced allocation gives the most power for a fixed total number of units."
  - "Recognise that an interaction between factors usually needs more units than a main effect of the same size."
references:
  - "Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. Nature Reviews Neuroscience, 14(5), 365-376. https://doi.org/10.1038/nrn3475"
  - "Lehr, R. (1992). Sixteen S-squared over D-squared: A relation for crude sample size estimates. Statistics in Medicine, 11(8), 1099-1102. https://doi.org/10.1002/sim.4780110811"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

For a fixed total number of units, a balanced allocation between the groups gives the most power for a comparison of two means. Unequal groups increase the variance of the difference, and the loss is small for moderate imbalance but grows quickly when one group is much smaller than the other. A design that puts most units in the control group, for example, may save little on the controls while greatly reducing the power to detect the treatment effect, and the allocation should be chosen with this trade-off in mind.

Experiments with several factors, such as a genotype crossed with a treatment, have a larger number of comparisons, and each comparison has its own power. An interaction between two factors is a difference between differences, and its estimate is less precise than the estimate of a main effect of the same size. An interaction of a given size therefore usually needs more units than a main effect of that size, and a study designed to detect a main effect may be unable to detect the interaction that the biology suggests.

Lehr (1992) gave the approximation for a two-group comparison, and it is the starting point for multifactor designs as well. The planner should identify the comparison that answers the main question, calculate the size for that comparison, and then check that the other comparisons are not left grossly underpowered. Button et al. (2013) noted that many studies report several comparisons with low power each, and the planning should prevent this by stating which comparison the design is meant to address.

The total sample size is the sum of the sizes in each cell of the design, and empty or nearly empty cells are a practical problem. Cumming (2014) argues that the precision of each estimate should be reported, so that the cells with few units are visible rather than hidden in an overall statistic. Sandve et al. (2013) recommended recording the allocation and the planned size of each group in the protocol, since an allocation changed after the data are collected cannot be assessed against the plan.
