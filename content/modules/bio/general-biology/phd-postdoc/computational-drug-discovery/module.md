---
title: "Computational Drug Discovery"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Advanced computational methods for the discovery of drug candidates at doctoral and postdoctoral level, covering the free energy calculations that estimate binding affinity from simulation and their convergence and sampling requirements, the ensemble docking against several receptor conformations, the prediction of absorption, distribution, metabolism, excretion and toxicity properties with models whose domain of validity must be stated, the pharmacokinetic and pharmacodynamic modelling that links exposure to effect across a population, the design of prospective validation in which predictions are made and tested blind, the calibration of computed scores against measured potencies, and the reporting of the methods, the benchmark sets, the calibration and the uncertainty of each prediction."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the binding free energy of a ligand by simulation and state the convergence and sampling tests the estimate requires."
  - "Calibrate a computed affinity score against measured potencies and report its error with an interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Advanced computational drug discovery aims to predict how strongly and selectively a molecule binds its target, and how the body will handle it, before it is made and tested. The methods are more demanding than the screening and docking used in earlier stages, since they attempt quantitative predictions that can be compared directly with measurement. Ioannidis (2005) described how a method that is judged by its success on the cases it was designed for can overstate its accuracy, and the advanced methods must be assessed against prospective and independent data.

Free energy calculations estimate the binding affinity from molecular simulation, by computing the energy difference between the bound and unbound states, or between two related ligands along a path. Such calculations require sampling that converges, and their result is accepted only after the convergence has been demonstrated. Cumming (2014) argues that the free energy difference should be reported with its interval, since the sampling uncertainty can be as large as the differences between candidate drugs.

Ensemble docking places a ligand against several receptor conformations, which may be obtained from experiment or from simulation, and it addresses the flexibility that a single structure ignores. The choice of conformations and the scoring must be justified, and the agreement of the ranking with measured potencies should be assessed. Munafò et al. (2017) argued that the benchmark sets used for such comparisons should be reported in full, so that the ranking can be judged on the same terms.

Predictions of absorption, distribution, metabolism, excretion and toxicity are made with models whose domain of validity must be stated, since a model trained on one chemical series may fail on another. Pharmacokinetic and pharmacodynamic modelling links the exposure of the body to the effect across a population, and its uncertainty must propagate into the prediction of dose and response. Peng (2011) argued that the models, the data and the code should be available so that these predictions can be reproduced, and the remaining chapters examine the free energy calculations, the ensemble approaches, the property prediction, the pharmacological modelling, the calibration and the prospective validation.
