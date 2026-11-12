---
title: "Heterogeneity"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The assessment of heterogeneity among the studies in a meta-analysis, covering Cochran's Q statistic and its test against the chi-squared distribution, the statistic I squared that expresses the proportion of total variation due to heterogeneity rather than chance, the interpretation of I squared values with caution because they depend on the precision of the studies, the estimate of tau squared as the absolute variance of true effects, the sources of clinical, methodological and statistical heterogeneity in biological studies, and the reporting of heterogeneity alongside the pooled estimate so that readers can judge whether pooling was appropriate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate Cochran's Q and I squared for a set of studies and interpret both with their limitations."
  - "Distinguish the relative measure I squared from the absolute measure tau squared and state which is reported with a pooled estimate."
references:
  - "Higgins, J. P. T., & Thompson, S. G. (2002). Quantifying heterogeneity in a meta-analysis. Statistics in Medicine, 21(11), 1539-1558. https://doi.org/10.1002/sim.1186"
  - "Page, M. J., McKenzie, J. E., Bossuyt, P. M., Boutron, I., Hoffmann, T. C., Mulrow, C. D., Shamseer, L., Tetzlaff, J. M., Akl, E. A., Brennan, S. E., Chou, R., Glanville, J., Grimshaw, J. M., Hróbjartsson, A., Lalu, M. M., Li, T., Loder, E. W., Mayo-Wilson, E., McDonald, S., . . . Moher, D. (2021). The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 372, n71. https://doi.org/10.1136/bmj.n71"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Heterogeneity is the variation among the results of studies that is greater than sampling error would produce. It may arise because the populations, interventions, outcome measures or designs differ, or it may arise from differences in the quality of the studies. Page et al. (2021) required the heterogeneity of a meta-analysis to be assessed and reported, since its presence determines whether the studies can be pooled in a single estimate and which model is appropriate.

Cochran's Q statistic sums the squared deviations of the study effects from the pooled estimate, weighted by their precision, and it is compared with the chi-squared distribution with one fewer degrees of freedom than the number of studies. A significant Q indicates that the variation is larger than chance would produce, but the test has low power when there are few studies, and it can be significant for trivial differences when the studies are very large. The test should therefore be read together with the magnitude of the variation.

The statistic I squared expresses the proportion of the total variation that is due to heterogeneity rather than to chance. Higgins & Thompson (2002) introduced it to provide a measure that does not depend on the number of studies, and it is usually reported as a percentage. Its value depends on the precision of the studies, so a large number of precise studies can show a high I squared for a small absolute difference. Cumming (2014) argues that the absolute size of the variation should be reported alongside any relative measure.

The absolute measure is tau squared, the estimated variance of the true effects, and its square root is on the scale of the effect itself. Sources of heterogeneity in biological studies include differences in populations, doses, durations, measurement methods and risk of bias among the studies. Ioannidis (2005) described how such differences can make a pooled average misleading, and the sources should be investigated through subgroup analysis or meta-regression, as examined in later chapters.
