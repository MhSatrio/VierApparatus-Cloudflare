---
title: "Patient Stratification and Subtype Stability"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The stratification of patients into molecular subtypes and the assessment of whether the subtypes are stable and meaningful, covering the choice of features and the clustering method for stratification, the consensus clustering that repeats the clustering over resampled patients and features to measure how consistently patients group together, the stability index of each subtype, the comparison of the subtypes with clinical outcomes that were not used to define them, the test of whether the stratification is a property of the data or an artefact of the method, the minimum subtype size that supports a reliable characterisation, and the reporting of the method, the consensus, the stability and the clinical association with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assess the stability of a patient stratification by consensus clustering over resampled patients and features."
  - "Validate a stratification against clinical outcomes that were not used to define the subtypes and report the association with its interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A stratification divides patients into groups that share a molecular profile, and it is attractive because it promises to explain why patients with the same diagnosis respond differently. The stratification is a hypothesis about the structure of the disease, and it must be shown to be stable before it is interpreted. Ioannidis (2005) described how clusters found in one dataset often fail to appear in another, and the stability of a stratification is the first test of its reality.

Consensus clustering repeats the clustering over many resamples of patients and features, and it measures how consistently each pair of patients is grouped together. A stratification whose groups hold together across resamples is stable, while one whose membership shifts with each resample is not. The stability index of each subtype summarises this consistency, and it should be reported with its interval. Cumming (2014) argues that the uncertainty of the membership should be shown, since a patient near the boundary between two subtypes may belong to either.

A stratification is validated by comparison with clinical outcomes that were not used to define it. If the subtypes predict survival, response or progression in patients who were not part of the stratification, they carry information beyond the data that produced them. The association with outcome should be estimated with its interval, and the comparison should be made in an independent cohort where possible.

The test of whether the stratification is a property of the data or an artefact of the method uses alternative methods and null data. A stratification that appears under a clustering method and disappears under a reasonable alternative is method-dependent, and a stratification that appears in data shuffled to remove structure is an artefact. Munafò et al. (2017) argued that the method, the consensus and the stability should be reported with the stratification, so that its reality can be judged. Peng (2011) argued that the resampling procedure must be documented so that the stability can be reproduced.

Subtypes must be large enough to be characterised reliably, and a subtype with very few patients will have an unstable profile and a wide interval for every characteristic. The minimum size should be stated and applied, and the subtypes below it should be reported rather than silently dropped.
