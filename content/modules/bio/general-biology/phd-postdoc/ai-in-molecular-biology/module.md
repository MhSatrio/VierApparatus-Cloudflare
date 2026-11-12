---
title: "AI in Molecular Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The application of machine learning and artificial intelligence to problems in molecular biology at doctoral and postdoctoral level, covering the formulation of a prediction problem with a clear label and a held-out evaluation, the risk of leakage between training and test sets that share sequence, structure or lineage, the evaluation of models with metrics that match the biological decision and with baselines that set the standard, the interpretation of models through attribution and perturbation rather than through their apparent confidence, the detection of spurious correlations that a model learns from artefacts of the data, the requirement of experimental validation before a model's prediction is trusted, and the reporting of data, code, hyperparameters and the conditions of evaluation with the uncertainty of each result."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Evaluate a molecular machine learning model with a held-out set that avoids leakage through shared sequence or lineage and with a simple baseline."
  - "Distinguish a model's apparent confidence from its validity and state the experimental test that establishes a prediction."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Machine learning has become a major tool in molecular biology, and deep networks have produced predictions of protein structure, gene regulation and molecular function that were not possible a decade ago. LeCun et al. (2015) described the representation learning on which these methods rest, and Jumper et al. (2021) showed the impact of such methods on a central problem of structural biology. The power of these tools creates a particular risk: a model can appear accurate for reasons that have nothing to do with the biology it is meant to describe.

The first requirement is a clearly formulated prediction problem, with a label that reflects a real biological quantity and an evaluation on data held out from training. Random splits are often inadequate, because sequences, structures or lineages that are closely related appear on both sides of the split, and the model then recognises relatives rather than learning the rule. Ioannidis (2005) described how such leakage inflates reported performance, and the split must separate related entities.

Performance must be judged by metrics that match the biological decision, and by comparison with simple baselines. A model that is accurate on average may fail on the cases that matter, and a complex model that does not exceed a simple baseline adds little. Cumming (2014) argues that the performance should be reported with its interval and with the variation across splits, since a single number hides the uncertainty that the decision depends on.

Interpreting a model requires more than inspecting its confidence, which is not a reliable indicator of validity. Attribution and perturbation methods ask which inputs drive a prediction, and their answers must themselves be tested. A model may learn spurious correlations that arise from artefacts of the data, and these are detected by testing the model on data where the artefact is absent. Munafò et al. (2017) argued that the claims of a model should be tested experimentally before they are trusted, and the experimental validation is the decisive step.

Reporting must include the data, the code, the hyperparameters and the conditions of evaluation, with the uncertainty of each result. A model that cannot be retrained from its description cannot be checked, and Peng (2011) argued that the reproducibility of computational work requires that its inputs and procedures be available. The remaining chapters examine the formulation of the problem, the avoidance of leakage, the evaluation, the interpretation and the experimental validation of predictions.
