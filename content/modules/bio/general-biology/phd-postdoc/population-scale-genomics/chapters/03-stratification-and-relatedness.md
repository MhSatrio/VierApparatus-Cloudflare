---
title: "Population Stratification and Relatedness"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The control of population stratification and of relatedness among participants in genetic association analyses, covering the way allele frequencies that differ with ancestry can combine with a trait that also differs with ancestry to produce spurious associations, the estimation of principal components of genetic variation that capture ancestry and their use as covariates, the mixed models that model the genetic relatedness among all participants as a random effect, the identification and exclusion or modelling of close relatives, the detection of residual stratification through the genomic inflation of test statistics, and the reporting of the controls applied and the residual inflation with its interval."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how population stratification can produce a spurious association and state the principal-component correction that removes it."
  - "Measure residual stratification with the genomic inflation factor and report it with the controls applied."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Population stratification arises when a sample contains subgroups whose allele frequencies differ and whose trait values also differ, for reasons unrelated to the variant under study. A variant that is common in one subgroup will then appear associated with a trait that is common in that subgroup, even though neither causes the other. Ioannidis (2005) described how such confounding has produced false associations in the literature, and its control is essential in any analysis of a mixed sample.

Principal components of the genetic variation capture the axes of ancestry in the sample, and including them as covariates removes the association that ancestry would otherwise produce. The number of components to include must be chosen by a stated criterion, and too few leave residual confounding while too many can remove real signal. Peng (2011) argued that the choice must be documented so that the correction can be reproduced.

Mixed models treat the genetic relatedness among all participants as a random effect, which accounts for both ancestry and kinship in a single framework. They are more powerful than principal components in some settings and require the estimation of the relatedness matrix. Cumming (2014) argues that the estimated variance component from the relatedness should be reported with its interval, since it describes how much of the trait is shared among related individuals.

Close relatives in the sample violate the assumption of independence, and they can inflate the association. Relatives are identified from the genetic data, and they are either excluded or modelled. The threshold for relatedness and the number of individuals excluded should be reported. Munafò et al. (2017) argued that such exclusions must be transparent, since the choice affects the sample on which the findings rest.

Residual stratification is detected by the genomic inflation of the test statistics, and the inflation should be reported with the controls applied. A factor close to one indicates that the correction has removed the confounding, while a larger factor indicates that residual confounding remains and that the associations must be interpreted with caution.
