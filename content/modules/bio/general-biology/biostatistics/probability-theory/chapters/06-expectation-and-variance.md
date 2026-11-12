---
title: "Expectation and Variance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The expectation of a random variable as its long-run average, the variance and standard deviation as measures of its spread, the rules that combine the expectations and variances of sums and scaled variables, the way these rules give the variance of a mean of independent measurements and why the standard error of a mean falls with the square root of the sample size."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the expectation and variance of a discrete variable and state how they change when the variable is scaled or added to another."
  - "Explain why the standard error of a mean decreases with the square root of the sample size and what this implies for designing a study."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The expectation of a random variable is the average value it takes over many repetitions, weighted by the probability of each value. For a discrete variable it is the sum of each value multiplied by its probability, and for a continuous variable it is an integral of the same kind. The expectation is the centre of the distribution, and the mean of a sample is an estimate of it. A biological measurement with an expectation of twelve units will average twelve over many samples, although any single sample will differ.

The variance measures the spread of the distribution: it is the expectation of the squared deviation from the mean. Its square root, the standard deviation, is in the same units as the variable and is the quantity usually reported. Two rules are used throughout statistics. The expectation of a sum is the sum of the expectations, whether or not the variables are independent. The variance of a sum of independent variables is the sum of their variances, so the variance of a total grows with the number of independent contributions.

These rules give the standard error of a mean. If n measurements are independent and each has variance sigma squared, the mean has variance sigma squared divided by n, and its standard error is sigma divided by the square root of n. Student (1908) used this relation to describe how the uncertainty of a mean narrows as a sample grows. The square root is the reason that quadrupling a study's sample size only halves the standard error, which has direct consequences for the planning of experiments.

The independence assumption matters. Measurements from the same individual, or from samples processed in one batch, are correlated, and their variance does not fall as quickly as the formula suggests. A study that treats correlated measurements as independent will report a standard error that is too small.

Wasserstein and Lazar (2016) remind readers that the precision of an estimate is part of its meaning, and Sandve et al. (2013) recommended that the variability of a reported quantity be stated with the quantity.
