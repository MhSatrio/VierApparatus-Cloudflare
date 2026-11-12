---
title: "Mixed-Effects Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Mixed-effects models for biological data with a hierarchical or repeated structure, covering the fixed effects that describe the population response and the random effects that describe the variation among individuals, sites or batches, the random-intercept and random-slope models for repeated measures, the correlation among observations from the same unit that a mixed model accounts for, the estimation by restricted maximum likelihood, the tests of fixed effects and the reporting of variance components that show where the variation lies."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a mixed-effects model with a random intercept for individuals and fixed effects for treatment and time."
  - "Explain why observations from the same individual are correlated and how the random effect accounts for this correlation."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Much biological data are hierarchical. Cells are sampled within animals, animals within litters, measurements repeated over time on the same subjects and samples processed in batches. The observations within one unit are correlated, because they share the unit's characteristics, and an analysis that treats them as independent counts them too many times and overstates its precision. Mixed-effects models handle this structure directly, with fixed effects that describe the population response and random effects that describe how each unit deviates from it.

Laird and Ware (1982) introduced the random-effects approach for longitudinal data, in which each individual has its own trajectory around a population trend. The random effects are treated as draws from a distribution, and their variance is estimated, which tells the analyst how much the units differ. The software of Bates et al. (2015) fits such models for a wide range of designs, and the topic describes the structures they handle and the interpretation of their output.

The model is powerful and demands care. The choice of random effects defines the correlation structure, and an incorrect structure gives standard errors that are wrong in either direction. The variance components are estimates with their own uncertainty, and the fixed effects depend on the structure assumed. Ioannidis (2005) described how the flexibility of a model produces findings that do not hold, and the structure of a mixed model should be fixed by the design before the data are examined.
