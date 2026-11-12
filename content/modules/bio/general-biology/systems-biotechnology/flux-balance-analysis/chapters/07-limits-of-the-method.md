---
title: "Limits of the Method"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The limits of flux balance analysis that a careful user must keep in mind, including the absence of kinetics and enzyme capacity constraints unless they are added, the absence of metabolic regulation that can prevent an optimal flux from being reached, the assumption of steady state that does not hold for dynamic or transient conditions, the dependence on a single objective that may not describe a cell adapting to changing conditions, the failure to represent gene expression and protein costs unless modelled, and the principle that a flux prediction is a hypothesis about a system and must be tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the assumptions of flux balance analysis that can fail in a biological system and state the situations in which each fails."
  - "Explain why a flux prediction must be treated as a testable hypothesis and state what experiment would test it."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Flux balance analysis is powerful because it requires little information, but this economy is also its weakness. It does not represent enzyme kinetics, so a flux that is feasible by stoichiometry may be impossible because the enzyme cannot carry it at that rate. It does not represent the regulation that controls which pathways are active, and an optimal flux distribution may not be reached by a cell that lacks the regulatory signal to reach it. Orth et al. (2010) noted that these omissions must be borne in mind when the predictions are read.

The steady-state assumption holds for a growing culture in balanced conditions, but it does not hold for transient responses, such as the shift of a cell from one nutrient to another, or for conditions in which concentrations change over time. A flux prediction at steady state cannot describe the adaptation that takes place during such a shift, and a dynamic model is required for it. The assumption should be stated, and its violation considered whenever the conditions are not steady.

A single objective may not describe a cell that adapts to its environment. A microorganism may switch its objective as the nutrients change, and a model that assumes one objective throughout will predict the wrong behaviour in the period of switching. Ioannidis (2005) described how a model with an assumed mechanism can give confident predictions that do not hold, and the objective should be tested rather than assumed.

Gene expression and the cost of making enzymes are often omitted, so that the model assumes every enzyme is free to use. Adding such costs changes the optimum and can explain behaviours that the basic model cannot. Every prediction is a hypothesis about the system, and each should be tested by an experiment that could show it to be wrong. Cumming (2014) argues that the uncertainty of such a test should be reported, and Sandve et al. (2013) recommended recording the assumptions with the analysis so that the hypothesis can be judged.
