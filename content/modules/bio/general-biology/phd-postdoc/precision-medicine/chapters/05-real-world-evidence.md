---
title: "Real-World Evidence and Observational Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The use of real-world evidence from clinical records, registries and claims data to evaluate precision medicine strategies, covering the advantages of routine data in scale and in representing the patients treated in practice, the confounding by indication that arises when patients given a therapy differ from those not given it, the methods that adjust for measured confounders such as propensity scores and their limits when confounders are unmeasured, the target trial emulation that frames an observational analysis as a trial that could have been done, the missing data and the misclassification of biomarkers in routine records, the sensitivity analyses that test the robustness of the findings to unmeasured confounding, and the reporting of the data source, the methods and the uncertainty of each estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain confounding by indication and state why adjustment for measured confounders does not remove unmeasured ones."
  - "Frame an observational comparison as a target trial and report the sensitivity of the estimate to unmeasured confounding."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Real-world evidence comes from clinical records, registries and claims data, and it describes the patients who are actually treated in practice. Its scale and its representativeness are strengths, and it can show how a biomarker-guided strategy performs outside the selected populations of trials. The weakness is that the data were not collected to answer the question, so the comparison between treated and untreated patients is confounded. Ioannidis (2005) described how observational associations are frequently not confirmed by randomised evidence, and the limits of real-world analysis must be stated.

Confounding by indication arises because clinicians give a therapy to patients who differ from those they do not treat, in severity, in fitness or in other ways. The treated and untreated groups are therefore not comparable, and an apparent benefit may reflect who was treated rather than the therapy. Adjustment for measured confounders, such as propensity score methods, reduces this bias, but it cannot remove the influence of unmeasured confounders. Cumming (2014) argues that the residual confounding should be acknowledged and its magnitude considered when interpreting the estimate.

Target trial emulation frames an observational analysis as the trial that would have been done, specifying the eligibility criteria, the treatment strategies, the outcome and the follow-up, and then analysing the data to mimic the trial. This discipline reduces the room for bias introduced by the analytic choices, and it makes the assumptions visible. Munafò et al. (2017) argued that pre-specifying the emulated trial protects the analysis from the flexibility that observational data permit.

Biomarkers in routine records are often missing or misclassified, and missing data can bias the comparison if they are missing for reasons related to outcome. The handling of missing data and the misclassification must be described, and their effect on the estimate should be examined. Peng (2011) argued that the data source and the procedures applied to it must be documented so that the analysis can be reproduced.

Sensitivity analyses test the robustness of the findings to unmeasured confounding, by stating how strong an unmeasured confounder would have to be to explain the observed association. A finding that survives a plausible degree of unmeasured confounding is more credible than one that does not. The data source, the methods, the sensitivity analyses and the uncertainty of each estimate should all be reported.
