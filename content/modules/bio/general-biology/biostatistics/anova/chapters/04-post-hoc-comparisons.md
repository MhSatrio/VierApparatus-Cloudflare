---
title: "Post Hoc Comparisons"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Post hoc comparisons made after a significant analysis of variance to find which groups differ, the family of all pairwise comparisons and the family-wise error rate it threatens, the Tukey procedure that controls the family-wise error rate for pairwise comparisons, the Benjamini-Hochberg false discovery rate correction as a less conservative alternative and the reporting of the adjusted p-values and intervals that a post hoc analysis requires."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Perform the pairwise comparisons after a significant analysis of variance and correct them for the family of comparisons."
  - "Explain the difference between controlling the family-wise error rate and controlling the false discovery rate and state which is appropriate for a given study."
references:
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A significant analysis of variance says that the groups are not all alike, and the post hoc comparisons identify which pairs differ. With four groups there are six pairwise comparisons, and with ten groups there are forty-five, each of which is a test that could produce a false positive. The family of comparisons is the set of tests that answer the same overall question, and the error must be controlled for the family rather than for each comparison taken alone. A post hoc analysis that tests every pair at the usual threshold will find differences by chance.

The Tukey procedure controls the family-wise error rate for all pairwise comparisons, so that the probability of any false difference in the family is held at the chosen level. It uses the studentised range distribution, and its intervals are wider than those of an uncorrected comparison, which is the price of the protection. The procedure is appropriate when the question is which of all the groups differ and when a false difference would be costly.

The Benjamini and Hochberg (1995) procedure controls the false discovery rate instead, which is the expected proportion of the reported differences that are false. It is less conservative than the family-wise control and more powerful when many differences are real, so it is preferred in exploratory studies with many groups. The choice between the two controls is a decision about the cost of a false claim, and it must be made before the comparisons are examined.

Cumming (2014) argues that the adjusted differences should be reported with their intervals, since the interval shows the size of each difference as well as whether it is significant. A post hoc table that gives only adjusted p-values hides the magnitude of the differences and their precision.

Ioannidis (2005) described how the search for significant pairs after a significant overall result inflates the findings, and the adjustment is the defence. Sandve et al. (2013) recommended recording the adjustment method and the number of comparisons in the family, since both determine the adjusted values.
