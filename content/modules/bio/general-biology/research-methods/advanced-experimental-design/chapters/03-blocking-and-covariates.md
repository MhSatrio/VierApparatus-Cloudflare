---
title: "Blocking and Covariates"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The use of blocking and measured covariates to reduce unexplained variation in experiments, covering the grouping of similar experimental units into blocks and the randomisation of treatments within each block, the choice of blocking factors such as batch, day, litter or operator, the adjustment of the analysis for a baseline measurement or other covariate, the gain in precision that results and the condition that the covariate is not itself affected by the treatment, the risks of adjusting for variables that lie on the causal pathway, and the reporting of the blocking structure and the covariates in the methods."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a blocking factor that captures a known source of variation and randomise treatments within each block."
  - "Explain why a covariate must be measured before treatment and state the error of adjusting for a variable affected by the treatment."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Blocking groups experimental units that are similar in a known respect, and treatments are then randomised within each block. Because the comparison is made between units that share the blocking factor, the variation due to that factor does not inflate the error of the treatment effect. A block might be a day of measurement, a batch of reagent, a litter of animals or an operator who performs the assays. The choice of block should capture a source of variation that is known to matter.

Blocking must be planned before the experiment, because the blocks determine how the units are assigned. If the blocking factor is recorded only after the data are collected, it cannot be used to design the randomisation, and any adjustment made afterwards must be reported as such. Ioannidis (2005) described how post hoc choices of this kind can produce results that look robust but that depend on the analysis chosen.

A covariate is a measured variable, often a baseline value, that is related to the outcome and can be included in the analysis to reduce noise. Adjusting for a baseline usually gains precision, because the variation between units that was present before treatment is removed from the comparison. Cumming (2014) argues that the gain in precision should be reported with the interval of the treatment effect, so that its size can be judged.

A covariate must be measured before the treatment and must not be affected by it. Adjusting for a variable that the treatment itself changes can remove part of the effect that the experiment is meant to estimate, and it can produce a biased result. Munafò et al. (2017) argued that the methods should describe the blocking structure and every covariate, so that a reader can verify that the adjustment is appropriate.
