---
title: "Explainability of Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The explanation of the predictions of AI models in drug design so that chemists can understand why a molecule is predicted active, covering the attribution methods that highlight the atoms or substructures that contribute to a prediction, the saliency maps and their instability, the comparison of model explanations with known structure-activity relationships, the risk that an explanation is plausible but incorrect, the use of explanations to propose experiments that test them, and the reporting of explanations as hypotheses rather than as established mechanism."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe an attribution method that highlights the substructures responsible for a predicted activity and state its limits."
  - "Explain why a plausible explanation from a model must be tested experimentally before it is reported as a mechanism."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A deep model predicts activity from a large number of parameters, and its decisions are difficult for a chemist to understand. Explanation methods attempt to show which atoms or substructures contributed to a prediction, so that the model's reasoning can be inspected. These methods are useful for generating hypotheses, but they do not reveal the mechanism by which a compound acts on its target, since the model learns correlations in its data.

Attribution methods assign a contribution to each atom or bond, usually by perturbing the input or by computing the gradient of the prediction with respect to the atoms. The results are sometimes visualised as saliency maps, and these maps can be unstable, changing substantially with small changes in the model or the input. An explanation that changes with the random seed of the training is not a reliable guide to the model's reasoning.

Explanations can be compared with known structure-activity relationships, which chemists have established from experiments. An explanation that highlights the groups that medicinal chemists already know to be important gives some confidence in the model, while one that highlights unexpected groups may reveal a new hypothesis or an artefact. The comparison must be made with the known relationships, not with the expectations of the investigator.

An explanation can be plausible and wrong, and a chemist may accept it because it fits their intuition. The explanation should therefore be treated as a hypothesis, and it should be tested by synthesising the molecules that the explanation predicts to be active or inactive. Ioannidis (2005) described how a plausible explanation may be accepted before it is tested, and Cumming (2014) argues that the explanation should be reported with the uncertainty in the attribution. Sandve et al. (2013) recommended recording the method, its settings and the experiments that tested it.
