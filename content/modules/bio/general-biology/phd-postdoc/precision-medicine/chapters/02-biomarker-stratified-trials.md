---
title: "Biomarker-Stratified and Basket Trials"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design and analysis of biomarker-stratified and basket trials for precision medicine, covering the randomisation of patients within biomarker strata so that treatment comparisons are made within each group, the enrichment design in which only biomarker-positive patients are enrolled and its consequence for the generalisation of the result, the basket design in which a therapy is tested in several diseases defined by a shared molecular alteration, the use of hierarchical models that borrow strength across baskets while allowing their effects to differ, the adaptive designs that change the allocation as data accumulate under pre-specified rules, the control of the error rate across multiple strata or baskets, and the reporting of the design, the strata or baskets, the estimates and the decision rules with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare the treatment effect within each biomarker stratum and state the interaction that the design must test."
  - "Explain how a hierarchical model borrows strength across baskets and state the consequence for each basket's estimate."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Biomarker-stratified trials randomise patients within each biomarker group, so that the treatment comparison is made in every stratum and the difference between strata can be estimated. This design answers the question of whether the biomarker predicts response, and it requires that the interaction be tested. Ioannidis (2005) described how a trial that compares treatment overall can miss a benefit confined to a subgroup, and the stratified design is the means of detecting it.

An enrichment design enrolls only biomarker-positive patients, which increases the chance of detecting an effect in that group but limits the generalisation of the result to patients who would have been excluded. The consequence for the population in which the therapy will be used must be stated, since the benefit shown in enriched patients may not extend to others. Cumming (2014) argues that the estimated effect should be reported with its interval in the enriched population, and its generalisation discussed explicitly.

Basket trials test a therapy across several diseases that share a molecular alteration, and they are useful when the alteration, rather than the tissue, determines response. Each basket is a separate question, and the baskets may have few patients. Munafò et al. (2017) argued that the definition of each basket and the criteria for success must be pre-specified, since the flexibility of basket designs invites post hoc selection.

Hierarchical models borrow strength across baskets, shrinking each basket's estimate toward the overall mean according to how similar the baskets appear. The shrinkage reduces the variance of small-basket estimates but introduces bias toward the common value, and the degree of borrowing must be reported. Peng (2011) argued that the model and the shrinkage rule must be documented so that the estimates can be reproduced.

Adaptive designs change the allocation as data accumulate under pre-specified rules, and the rules must control the error rate across the stratum or basket comparisons. The stopping rules and the adjustment for the adaptation must be reported, since an estimate from an adaptively stopped trial is biased if the stopping is not accounted for.
