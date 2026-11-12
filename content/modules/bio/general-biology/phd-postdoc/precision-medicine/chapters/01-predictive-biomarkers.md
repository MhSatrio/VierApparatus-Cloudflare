---
title: "Predictive Biomarkers and Interaction"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The identification of predictive biomarkers and the demonstration that a biomarker modifies the effect of a treatment, covering the distinction between a prognostic marker that predicts outcome under any treatment and a predictive marker that predicts differential response to a treatment, the statistical interaction term between treatment and biomarker in a regression model and its estimate with interval, the danger of testing many subgroups until one shows a difference, the requirement that the biomarker be defined and measured before the treatment comparison, the quantification of the magnitude of the difference in benefit between biomarker groups, and the reporting of the interaction test, the subgroup estimates and the number of subgroups examined."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test whether a biomarker is predictive by estimating the treatment-by-biomarker interaction and reporting it with its interval."
  - "Explain why testing many subgroups produces spurious differences and state the pre-specification that prevents it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A predictive biomarker is one that modifies the effect of a treatment, so that patients with the marker benefit more or less than those without it. This is different from a prognostic biomarker, which predicts the outcome whatever treatment is given. The predictive role is demonstrated by an interaction between the treatment and the biomarker in a statistical model, and the interaction is the quantity that must be estimated and reported. Ioannidis (2005) described how an apparent difference between subgroups can arise from chance, and the interaction test guards against mistaking a difference in significance for a difference in effect.

Testing many subgroups until one shows a difference is a common route to false findings. Each subgroup test has its own chance of a false positive, and the more subgroups examined, the more likely one will appear significant by chance. The subgroups must be specified before the comparison, and the number examined must be reported so that the multiplicity can be taken into account. Munafò et al. (2017) argued that the pre-specification of subgroups is one of the most effective safeguards in this area.

The biomarker must be defined and measured before the treatment comparison, since a marker defined after the results are known can be chosen to fit them. The measurement method and its reproducibility should be reported, because a biomarker that cannot be measured consistently cannot be used to assign treatment. Cumming (2014) argues that the reproducibility of the measurement contributes to the uncertainty of the subgroup estimates, and it should be quantified.

The magnitude of the difference in benefit between biomarker groups is the clinically relevant quantity, and it should be estimated with its interval rather than inferred from the significance of an interaction test alone. A large difference with a wide interval may be more important than a small difference that is precisely estimated, and both should be reported. Peng (2011) argued that the model, the interaction term and the data must be documented so that the estimate can be reproduced.

The report should give the interaction test, the subgroup estimates, and the number of subgroups examined, so that a reader can judge whether the predictive claim is supported or whether it may reflect the multiplicity of the search.
