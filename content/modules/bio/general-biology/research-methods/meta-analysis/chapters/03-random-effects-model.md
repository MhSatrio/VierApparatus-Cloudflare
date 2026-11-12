---
title: "The Random-Effects Model"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The random-effects model for pooling studies in a meta-analysis, covering the assumption that the true effects follow a distribution across studies, the between-study variance tau squared and its estimation by the method of DerSimonian and Laird, the adjustment of the study weights by adding tau squared to each within-study variance, the wider confidence interval that reflects both sampling error and the variation among true effects, the interpretation of the pooled estimate as the mean of the distribution of true effects, the prediction interval that describes the range of effects expected in a new study, and the reasons why the random-effects model is more usually appropriate in biological research."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the between-study variance and recompute the study weights for a random-effects pooled estimate."
  - "Explain the difference between a confidence interval and a prediction interval for a random-effects meta-analysis."
references:
  - "DerSimonian, R., & Laird, N. (1986). Meta-analysis in clinical trials. Controlled Clinical Trials, 7(3), 177-188. https://doi.org/10.1016/0197-2456(86)90046-2"
  - "Higgins, J. P. T., & Thompson, S. G. (2002). Quantifying heterogeneity in a meta-analysis. Statistics in Medicine, 21(11), 1539-1558. https://doi.org/10.1002/sim.1186"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The random-effects model assumes that the true effect differs among studies, and that these true effects follow a distribution. The studies are then a sample from a population of effects, and the pooled estimate is an estimate of the mean of that population. This assumption is more realistic than a single common effect in most biological research, where populations, doses, environments and methods differ. DerSimonian & Laird (1986) introduced a practical method for pooling under this model, and it remains widely used.

The between-study variance, tau squared, is estimated from the observed dispersion of the study results around the fixed-effect average. Each study's variance is then increased by the estimate of tau squared, and the weights are recalculated. Because the weights are more even when tau squared is large, small studies contribute more than they would under the fixed-effect model. Higgins & Thompson (2002) showed how the estimation of this variance and the quantification of heterogeneity are linked, and their work is the basis of the statistics reported with a random-effects analysis.

The confidence interval of the pooled estimate under this model reflects both sampling error and the variation among true effects. It is therefore wider than the fixed-effect interval whenever tau squared is greater than zero, and this is the appropriate width when the studies differ. Cumming (2014) argues that the interval should be read as the uncertainty about the mean effect, which is different from the range of effects that individual studies may show.

A prediction interval describes the range within which the true effect in a new, comparable study is expected to lie, and it is wider again because it includes the variation among studies. Ioannidis (2005) described how a pooled estimate that appears precise can conceal wide differences among studies, and the prediction interval makes that variation visible. Both intervals should be reported, since each answers a different question.
