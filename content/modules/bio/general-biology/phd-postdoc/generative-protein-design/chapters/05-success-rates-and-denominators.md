---
title: "Success Rates and the Denominator"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The calculation of the success rate of a protein design method and the importance of counting all attempted designs in the denominator, covering the definition of success at each stage and the overall success rate as the product of stage rates, the reporting of success rates as proportions with binomial intervals that are wide when the number of designs is small, the bias introduced when designs that failed to express are excluded from the denominator, the comparison of methods on the same targets with paired designs, the tendency to report the best designs and to omit the typical ones, the use of a prespecified number of designs per target, and the reporting of the complete table of designs with their outcomes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the success rate of a design method with a binomial interval and state why it is wide for a small number of designs."
  - "Explain how excluding designs that failed to express inflates the success rate and state the denominator that prevents this."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The success rate of a design method is the proportion of attempted designs that achieve the goal, and it is the most important number in the evaluation. Its meaning depends entirely on the denominator, which must include every design that was attempted. A method that produces a hundred designs of which ten express, and of which five fold, has a success rate of five per cent of attempted designs, but a rate of fifty per cent among those that expressed. Munafò et al. (2017) argued that the denominator is part of the claim, and reporting the rate among the survivors alone is a form of selective reporting.

The success rate of a multi-stage cascade is the product of the stage rates, and each stage should be reported separately so that the bottleneck is visible. A method may fold well and express poorly, and the reader needs to know which. Cumming (2014) argues that each proportion should be given with its binomial interval, and the interval for a small number of designs is wide, so a rate of one success in ten is compatible with a wide range of true values.

Excluding designs that failed to express inflates the success rate, because the designs that most often fail are removed from the count. This is a bias in the selection of the denominator, and Ioannidis (2005) described how such choices make a method appear to work when it does not. The honest denominator counts every design that entered the cascade, and the exclusions must be reported with their number and reason.

Methods should be compared on the same targets using paired designs, so that differences reflect the methods and not the targets. A comparison in which one method was applied to easy targets and another to difficult ones is uninformative. The number of designs per target should be fixed in advance, since a method that is tried until it succeeds will always appear successful. Peng (2011) argued that the procedure must be reproducible, and a prespecified design count is part of that procedure.

The complete table of designs with their outcomes should be reported, not only the best designs. Reporting the best designs alone shows the upper range of a method and hides its typical performance. Munafò et al. (2017) argued that the complete record is the basis on which others can judge a method, and it should be deposited with identifiers.
