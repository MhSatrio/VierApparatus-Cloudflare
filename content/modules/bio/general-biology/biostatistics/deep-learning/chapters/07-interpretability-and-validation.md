---
title: "Interpretability and Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The difficulty of explaining the predictions of a deep network with many parameters, the saliency and attribution methods that highlight the inputs contributing to a prediction, the risk that such maps are unstable or reflect the model's artefacts rather than the biology, the validation of a network on external data and on known biological controls, the use of ablation and perturbation experiments to test whether an explanation holds, and the reporting of an interpretation as a hypothesis for experimental testing."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe an attribution method for a neural network and state why its output must be checked before it is interpreted biologically."
  - "Validate a network's explanation with a perturbation experiment and report the result as a hypothesis to be tested."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A deep network with millions of parameters does not explain its predictions in a form that a biologist can read directly. Attribution methods address this by estimating how much each input contributes to a prediction, producing saliency maps for images or importance scores for sequence positions and genes. These maps are attractive because they point to the features the network uses, and they are often presented as the biology that the network has discovered.

Such maps must be treated with caution. Different attribution methods can give different maps for the same prediction, and some are insensitive to the parameters of the network, so that they resemble the input even when the network is random. Ioannidis (2005) warned that an interpretation chosen because it fits expectations is a source of false findings, and an attribution that matches what the investigator hoped to see is weak evidence.

Validation should test the explanation against an independent criterion. A perturbation experiment alters or removes the highlighted inputs and checks whether the prediction changes as the explanation predicts. A network whose important features are shown to matter in such a test gives a more credible explanation than one whose maps are only inspected. Known biological controls, such as a feature with an established effect, provide a further check that the method recovers what is already known.

Peng (2011) argued that a result is reproducible only with the means of producing it, and an explanation depends on the attribution method, its settings and the baseline used. Cumming (2014) argues that a claim should be reported with its uncertainty, and an explanation should be reported as a hypothesis with the evidence for it, to be confirmed by an experiment in the laboratory rather than accepted from the map alone.
