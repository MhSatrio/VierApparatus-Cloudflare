---
title: "Correlation and Covariance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The covariance and the Pearson correlation coefficient as measures of the linear association between two biological variables, the rank-based Spearman correlation that does not assume linearity, the interpretation of a correlation coefficient and its confidence interval, the danger of inferring causation from correlation and the effect of outliers and of combining groups with different means on the coefficient."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the Pearson and Spearman correlation of two biological variables and state when the Spearman coefficient is preferred."
  - "Explain why a correlation does not establish that one variable causes the other and how a confounding variable can produce a correlation."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Covariance measures how two variables vary together. A positive covariance means that high values of one tend to occur with high values of the other, and a negative one that they move in opposite directions. Its size depends on the units of both variables, so it is hard to interpret directly. The Pearson correlation coefficient divides the covariance by the two standard deviations, which removes the units and gives a value between minus one and one. A value near one indicates a strong positive linear association, a value near zero little linear association.

The Spearman correlation applies the same measure to the ranks of the values rather than to the values themselves. It does not assume that the relationship is linear, and it is less sensitive to outliers, which makes it appropriate for skewed biological variables and for relationships that are monotonic but curved. Bland and Altman (1986) pointed out that a correlation between two measurement methods can be high even when the methods disagree systematically, so the correlation does not establish agreement, and the coefficient must be read with the question in mind.

A correlation coefficient is only the strength of a linear association in the sample, and it carries uncertainty. A confidence interval for the coefficient shows the range of values consistent with the data, and for small samples this range is wide. Cumming (2014) argues that the interval, not the coefficient alone, should be reported, since it shows how precisely the association is known.

A correlation does not establish causation. Two variables may be correlated because one causes the other, because both are caused by a third, or because they are related by the design of the study. Ioannidis (2005) described how the selection of associations from many possible pairs produces correlations that are not real, and a correlation found by searching many pairs must be corrected for the search.

Sandve et al. (2013) recommended recording the method and the variables used, and the type of correlation and the handling of outliers are part of the record.
