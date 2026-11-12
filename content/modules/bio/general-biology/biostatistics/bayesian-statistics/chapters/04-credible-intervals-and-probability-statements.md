---
title: "Credible Intervals and Probability Statements"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The credible interval of a Bayesian posterior as the range that contains a stated posterior probability, the equal-tailed and the highest posterior density intervals, the direct interpretation of a credible interval as a range the parameter lies in with the stated probability, the comparison of a credible interval with a confidence interval whose meaning is a property of the procedure, and the reporting of probabilities of effects in a form that a biologist can use to decide."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute an equal-tailed credible interval from posterior draws and state its interpretation."
  - "Contrast a credible interval with a confidence interval and explain why the Bayesian statement is the one most readers attribute to an interval."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A credible interval is the range of parameter values that contains a stated share of the posterior probability, usually ninety-five per cent. The equal-tailed interval leaves the same probability in each tail, and the highest posterior density interval is the shortest range containing the stated probability, which is the more compact for skewed posteriors. Both are computed directly from the posterior draws, by reading the quantiles or by searching for the shortest interval.

The credible interval has the interpretation that most readers attribute to an interval. The parameter lies within the credible interval with the stated posterior probability, given the model and the prior. This is a direct probability statement about the parameter, and it is the reason the Bayesian interval is often preferred for communication. A confidence interval, by contrast, has its coverage as a property of the procedure over repeated samples, and the probability that a particular confidence interval contains the parameter is not, strictly, the stated level.

Cumming (2014) argues that the interval should be the primary report of an estimate, and the credible interval serves this purpose in the Bayesian framework. The width of the interval shows the precision of the estimate, and the position relative to a value of no effect shows its direction and whether the posterior clearly excludes it.

Probabilities of effects are reported as statements such as the probability that the difference exceeds a threshold of biological importance. Such statements are the most decision-relevant output of a Bayesian analysis, and they require that the threshold be chosen on biological grounds. Wasserstein and Lazar (2016) warn that a probability is only as meaningful as the model and the prior that produced it, and the threshold and the prior should be reported with it.

Sandve et al. (2013) recommended recording the interval type, the probability level and the threshold used, since these determine the statement made.
