---
title: "Sample Size for Two Groups"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The calculation of the number of units per group for a comparison of two means, the approximate rule that the required size is about sixteen times the variance divided by the square of the difference for eighty per cent power and a two-sided significance level of 0.05, the exact calculation based on the noncentral t distribution, the adjustment for attrition and for the unit of replication, and the software and its settings that should be reported with the result."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Apply the approximate rule for two means and state the power and significance level that it assumes."
  - "Adjust a calculated sample size for expected attrition and for a clustered unit of replication."
references:
  - "Lehr, R. (1992). Sixteen S-squared over D-squared: A relation for crude sample size estimates. Statistics in Medicine, 11(8), 1099-1102. https://doi.org/10.1002/sim.4780110811"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

For two groups of equal size, a convenient approximation is given by Lehr (1992): the number of units per group is about sixteen times the variance divided by the square of the difference between the means. This rule is for eighty per cent power and a two-sided significance level of 0.05. Its form shows the structure of the problem. The required size grows with the variance, and it falls with the square of the difference, so halving the difference to be detected quadruples the number of units.

The approximation is a useful check on a plan, but the exact calculation is preferred for a final design. It uses the noncentral t distribution, which accounts for the uncertainty in the estimated variance when the sample is small, and it therefore gives a slightly larger size than the rule. The rule and the exact result agree closely for moderate samples, and a large discrepancy between them is a sign that the inputs have been entered incorrectly.

Two adjustments are commonly needed. The first allows for attrition, since animals die, samples fail and participants withdraw, and the calculated size should be increased by the expected proportion lost. The second allows for the unit of replication. If the units are clustered, such as animals within litters, the number of independent units is smaller than the number of measurements, and the calculation must be made on the number of clusters with their within-cluster correlation.

Cumming (2014) argues that the calculation should be reported with the precision it aims to achieve, since a study designed for a confidence interval of a given width is planned in a different way from one designed for a test. Sandve et al. (2013) recommended recording the software, its version and the settings used for the calculation, so that the sample size can be reproduced and checked against the plan.
