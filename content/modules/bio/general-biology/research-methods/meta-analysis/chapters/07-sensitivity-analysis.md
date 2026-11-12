---
title: "Sensitivity Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The sensitivity analyses that test whether the conclusion of a meta-analysis survives changes in its decisions, covering the repetition of the pooled analysis with and without studies at high risk of bias, the comparison of fixed-effect and random-effects results, the exclusion of outlying or influential studies and the leave-one-out analysis that shows how each study moves the estimate, the use of alternative effect size measures and alternative variance estimators, the handling of studies with imputed or converted values, and the reporting of each sensitivity analysis with its result so that the robustness of the conclusion is visible."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a sensitivity analysis that tests the conclusion of a meta-analysis against each major decision."
  - "Interpret a leave-one-out analysis and state when the conclusion depends on a single study."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A sensitivity analysis asks whether the conclusion of a meta-analysis depends on the decisions made in conducting it. Each major decision, such as the inclusion of a study, the model, the effect measure or the handling of missing data, is changed in turn, and the pooled estimate is recalculated. If the conclusion is stable across the reasonable alternatives, it is robust; if it changes, the conclusion depends on that decision, and the reader must be told. Peng (2011) argued that such checks are part of what makes a result reproducible.

Studies at high risk of bias are a common target. The pooled analysis is repeated with and without them, or with them down-weighted, and the difference in the estimate is reported. The comparison of fixed-effect and random-effects results is another, since a large difference shows that the between-study variation is influencing the conclusion. Cumming (2014) argues that each alternative should be shown with its interval so that the difference can be judged against the uncertainty of the estimate.

A leave-one-out analysis repeats the pooling once for each study omitted, and it shows which studies move the estimate most. A single study whose removal reverses the conclusion is influential, and its evidence should be scrutinised for error or bias before the conclusion is accepted. Ioannidis (2005) described how a result that depends on one or two studies can be fragile, and the leave-one-out analysis reveals this fragility directly.

Sandve et al. (2013) recommended that every analysis be scripted and recorded, so that sensitivity analyses can be rerun by others. The alternatives considered, the results obtained and the reasons for each choice should be reported together. A sensitivity analysis that is conducted only where it supports the conclusion provides no assurance, and all planned analyses should be reported regardless of their result.
