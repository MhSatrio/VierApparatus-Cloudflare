---
title: "Sequential Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Designs in which data are examined at planned interim points and the study may stop early for efficacy, futility or harm, the reason that repeated looks at accumulating data inflate the type I error unless the significance level is spent across the looks, the boundaries that control the overall error, the trade-off between early stopping and the bias of the estimates, and the requirement that the stopping rule be fixed and recorded before data collection begins."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why repeated looks at accumulating data inflate the type I error and how a planned boundary controls it."
  - "State the stopping rule of a sequential design before data collection and record the interim analyses that were carried out."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. Nature Reviews Neuroscience, 14(5), 365-376. https://doi.org/10.1038/nrn3475"
---

A sequential design examines the accumulating data at planned interim points, and the study may stop early if the evidence is strong enough or if it is clear that no useful result will emerge. Such designs are valuable in clinical and animal research, where continuing a study that has already shown harm, or stopping one that has already shown a clear benefit, has ethical as well as practical weight. The planning of these designs differs from that of a fixed study, because the number of looks at the data is part of the design.

Each look at the accumulating data is a test, and repeated tests inflate the probability of a false positive. If a result is tested at every interim point with the usual significance level, the chance of at least one spurious significant result grows well above the nominal level. The remedy is to spend the significance level across the looks, using boundaries that keep the overall type I error at the stated value. The boundaries are set before the study begins, and they determine how strong the evidence must be at each interim analysis to justify stopping.

Early stopping has a cost. Estimates from studies that stop early tend to overstate the effect, since the study is most likely to stop when its early results are most extreme. Ioannidis (2005) described how selection of this kind inflates findings, and the reported estimate of a stopped study should be interpreted with that bias in mind. Cumming (2014) argues that the interval of the estimate should be reported with the stopping rule, so that the reader can see how the study reached its conclusion.

The stopping rule is part of the protocol, and it must be fixed and recorded before data collection begins. Button et al. (2013) showed that flexibility in analysis reduces the reliability of findings, and a sequential design that is altered during the study offers the same flexibility. Sandve et al. (2013) recommended recording every interim analysis and its outcome, so that a reader can count the looks and judge whether the boundaries were respected.
