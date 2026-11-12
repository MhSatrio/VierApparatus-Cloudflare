---
title: "Causal Inference"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The statistical framework for estimating the effect of an intervention or exposure from observational and experimental data, covering the potential outcomes that define a causal effect for each unit, randomised experiments as the design that makes the comparison valid, directed acyclic graphs that encode assumptions about causes and the adjustments they imply, confounding and selection bias including the collider, instrumental variables for unmeasured confounding, propensity scores for balancing measured covariates, and the reporting of causal claims with their assumptions stated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define a causal effect with potential outcomes and explain why only one outcome is observed for each unit."
  - "Draw a directed acyclic graph of a biological question and state which variables must be adjusted for to estimate an effect."
references:
  - "Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688-701. https://doi.org/10.1037/h0037350"
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Causal inference asks what would happen to a unit if its exposure were changed, and it distinguishes this question from the question of what is associated with the exposure. A treatment may be associated with recovery because the sicker patients were less often treated, so an association alone does not reveal an effect. The framework of potential outcomes defines the effect precisely, and the designs and adjustments of the topic are the means of estimating it from data that were not collected as an experiment.

The topic begins with the potential outcomes of Rubin (1974), in which each unit has an outcome under each exposure, and the effect is the difference between them. Only one outcome is observed for each unit, so the causal effect is never directly seen, and every method is a way of estimating the outcome that the unit would have had under the comparison exposure. Randomisation makes the groups comparable on average, and the randomised experiment is the design against which other estimates are judged.

Where randomisation is impossible, causal assumptions must be stated and encoded. Greenland et al. (1999) introduced directed acyclic graphs for this purpose, in which arrows represent causal effects and the graph shows which variables must be adjusted for to remove confounding and which must not be adjusted for to avoid bias. Ioannidis (2005) described how undisclosed choices of variables produce findings that do not hold, and the graph makes the choices explicit before the data are analysed.

The later chapters address the threats and the tools. Confounding and selection bias distort the estimate, instrumental variables use a variable that affects the exposure but not the outcome except through it, and propensity scores balance the measured covariates between exposed and unexposed. Cumming (2014) argues that a causal estimate should be reported with its interval and its assumptions, and Sandve et al. (2013) recommended recording the design, the graph and the analysis, so that a causal claim can be assessed and repeated.
