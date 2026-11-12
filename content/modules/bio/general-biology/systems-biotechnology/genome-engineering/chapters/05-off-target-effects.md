---
title: "Off-Target Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Off-target effects of genome editing in which the nuclease cuts at sites other than the intended one, the detection of off-target cuts by sequencing predicted sites and by unbiased genome-wide methods, the consequences of an off-target change in a gene that is not intended to be altered, the reduction of off-target activity by guide choice, by the use of high-fidelity nucleases and by the transient delivery of components, and the reporting of off-target effects with the methods used to detect them and the sensitivity of each method."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how off-target cuts arise and how predicted off-target sites are checked by sequencing."
  - "Explain the limit of sensitivity of off-target detection and state how an unbiased method complements a predicted-site search."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213), 1258096. https://doi.org/10.1126/science.1258096"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An off-target effect is a change made at a site other than the intended one. The nuclease tolerates some mismatches between the guide and the genome, and a site that resembles the target may be cut, especially when the guide is not specific. The consequence depends on where the site lies: a cut in a non-coding region may be harmless, while one that disrupts an essential gene can change the behaviour of the cell and confound the interpretation of the edit.

Off-target sites are detected by sequencing the predicted sites, which are chosen by their similarity to the guide. This approach is targeted and tests only the sites that the prediction identifies. Doudna and Charpentier (2014) noted that the predicted sites may miss real cuts, since the rules of tolerance are not fully known, and an unbiased genome-wide method is needed to complement the targeted search.

Unbiased methods detect cuts across the genome without requiring a prediction, but they have limits of sensitivity. A method that detects cuts present in a small fraction of cells will miss rare events, and its absence of signal is therefore not evidence of absence. Ioannidis (2005) described how a null result from an insensitive method can be mistaken for a negative finding, and the sensitivity of each method should be stated with the result.

Off-target activity is reduced by choosing guides with few similar sites, by using nucleases engineered for higher fidelity, and by delivering the components transiently. Each of these measures reduces the risk without eliminating it, and their effects should be measured. Cumming (2014) argues that the frequency of off-target cuts should be reported with its interval, and Sandve et al. (2013) recommended recording the methods used to detect them and their sensitivity.
