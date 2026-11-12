---
title: "The Fixed-Effect Model"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The fixed-effect model for pooling studies in a meta-analysis, covering the assumption that all studies estimate one common true effect and differ only through sampling error, the inverse-variance weighting that gives more weight to precise studies, the calculation of the pooled estimate and its standard error, the construction of the confidence interval for the pooled effect, the conditions under which the assumption is defensible, such as close similarity of populations and methods, and the reasons why the fixed-effect interval is often too narrow when studies genuinely differ."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate an inverse-variance weighted pooled estimate and its confidence interval under the fixed-effect model."
  - "Explain the assumption of a single common true effect and state when it is defensible."
references:
  - "Higgins, J. P. T., & Thompson, S. G. (2002). Quantifying heterogeneity in a meta-analysis. Statistics in Medicine, 21(11), 1539-1558. https://doi.org/10.1002/sim.1186"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The fixed-effect model assumes that every study in the meta-analysis estimates one common true effect, and that the differences among the observed results arise only from sampling error. Under this assumption the studies are measuring the same quantity, and the best estimate is an average that weights each study by the precision of its effect. Higgins & Thompson (2002) described the test of whether the observed variation is larger than sampling error would produce, and that test is the basis for judging whether the assumption is tenable.

The pooled estimate is an inverse-variance weighted mean. Each study is weighted by the reciprocal of its variance, so a precise study with a small standard error contributes more than an imprecise one. The pooled standard error is the square root of the reciprocal of the sum of the weights, and the confidence interval is formed from it in the usual way. The calculation is simple, but it depends on every study having been estimated correctly, and errors in the variances propagate directly into the interval.

The assumption is defensible when the studies are close replicates, with the same population, the same intervention, the same outcome measured in the same way, and the same follow-up. Such similarity is rare in biological research, where populations, environments and methods vary. Cumming (2014) argues that the interval should be interpreted as the range of the estimate under sampling error alone, and not as a statement about the variation among the true effects.

When the studies genuinely differ, the fixed-effect interval is often too narrow, and the apparent precision overstates the evidence. Ioannidis (2005) described how a narrow interval around a pooled estimate can give false confidence when the underlying studies are heterogeneous. For this reason the random-effects model is often preferred, and the fixed-effect result is usually reported as a comparison.
