---
title: "Reporting Mathematical Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "What a report of a mathematical biology model must contain for its assumptions, equations and predictions to be tested and reproduced, including the question and the purpose of the model, the assumptions and the justification of each simplification, the equations with their units, the parameter values with their sources and uncertainties, the initial and boundary conditions, the data used for fitting and for validation, the numerical method and its settings, the sensitivity analysis, the predictions with their intervals, and the deposition of the code and the model in a standard form."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the assumptions, equations, parameters, conditions and validation that a mathematical model report must give."
  - "Report a model's predictions with their intervals, its sensitivity to the parameters and the data on which it was validated."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character, 115(772), 700-721. https://doi.org/10.1098/rspa.1927.0118"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A mathematical model is a set of claims, and its report must make those claims testable. The question and the purpose of the model come first, since a model is useful only for the questions it was built to address. Peng (2011) argued that a result is reproducible only with the means of producing it, and for a model those means include the equations, the parameters and the code. Kermack and McKendrick (1927) stated their assumptions explicitly, which made their model open to testing and extension.

The assumptions and the justification of each simplification must be listed, since the conclusions depend on them. The equations should be given with their units, and the initial and boundary conditions should be stated, since a trajectory depends on them. The numerical method and its settings must be reported, because a numerical artefact can be mistaken for a biological result. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, and a model is an analysis of this kind.

The parameters should be given with their values, sources and uncertainties, and the data used to fit the model should be distinguished from the data used to validate it. The sensitivity of the predictions to the parameters should be reported, so that the reader can see which conclusions are robust. Cumming (2014) argues that the predictions should be given with their intervals, which must reflect the uncertainty in the parameters.

The predictions should be reported with the conditions under which they were made, and the model's performance on validation data should be stated. Ioannidis (2005) described how a model that is judged on its fit alone may be accepted without a test of its predictions, and the code and the model should be deposited in a standard form so that others can run them and check the results.
