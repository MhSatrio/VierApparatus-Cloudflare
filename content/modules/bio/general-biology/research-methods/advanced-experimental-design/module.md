---
title: "Advanced Experimental Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The design of advanced experiments that separate causes from correlates, covering the randomisation and blinding that protect comparisons from bias, the factorial and nested designs that test interactions and account for hierarchical structure, the blocking and covariate adjustment that reduce unexplained variation, the control of pseudoreplication when experimental units are not independent, the choice of positive and negative controls that show the system can detect effects, and the analysis planned together with the design so that the experiment answers the question it was built for."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design an experiment that uses randomisation, blinding and controls to separate a causal effect from bias and from confounding."
  - "Identify pseudoreplication in a proposed design and state how the unit of replication should be chosen."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

An experiment is designed to separate the effect of one factor from everything else that might produce a difference. Randomisation distributes unknown influences evenly across the groups being compared, and blinding prevents the expectations of investigators and subjects from shaping the measurements. Ioannidis (2005) described how the absence of these safeguards is a common reason that experimental results fail to replicate, and the design must include them wherever they are feasible.

Advanced designs address questions that simple comparisons cannot. Factorial designs test the separate and joint effects of two or more factors, which reveals whether one effect depends on another. Nested designs reflect the hierarchy of real experiments, such as several cells within several animals, and they must be analysed at the level at which the treatment was applied. Cumming (2014) argues that the design should make the uncertainty of each effect estimable, and a factorial design does this more efficiently than a series of separate experiments.

Blocking and covariate adjustment reduce the unexplained variation that obscures an effect. Experimental units that are alike, such as animals from the same litter, are grouped into blocks, and the treatment is randomised within each block. Measured covariates, such as baseline weight, can be included in the analysis to reduce noise. Both techniques increase precision, provided they are planned before the experiment begins.

Pseudoreplication occurs when measurements that are not independent are treated as independent replicates, such as several readings from one culture counted as separate cultures. It inflates the apparent sample size and produces spuriously small intervals. Peng (2011) argued that the logic of an experiment must be stated so that others can verify the unit of replication. The design should also include positive and negative controls, so that the system is shown to detect a known effect and to remain silent when there is none. Munafò et al. (2017) noted that such controls are a basic element of a credible experiment.
