---
title: "Interpretation and Attribution"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The interpretation of molecular machine learning models through attribution and perturbation methods, covering the attribution of a prediction to input features by gradients, by occlusion or by in silico mutagenesis that changes one position and observes the change in output, the agreement between attribution methods and the danger that each highlights features for reasons unrelated to the biology, the use of attributions as hypotheses that must be tested experimentally rather than as explanations, the distinction between a feature the model uses and a feature that is causally important for the biology, the confidence of a model that is not a reliable indicator of its validity, and the reporting of attribution results with the method, its robustness and its limits."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute an attribution by in silico mutagenesis and state how it differs from a gradient-based attribution."
  - "Explain why an attribution is a hypothesis about the model rather than a demonstration of the biology."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Interpretation asks which features of an input drive a model's prediction. Attribution methods answer this question in different ways. Gradient-based methods measure how the output changes with a small change in each input, while occlusion and in silico mutagenesis change one position at a time and observe the effect on the output. Jumper et al. (2021) showed that a learned model can capture the physical structure of proteins, and attributions can reveal which parts of the input the model relies on, though that reliance may not mirror the biology.

Different attribution methods can disagree, and each can highlight features for reasons unrelated to the biology. A gradient may be large at a position because the model is locally sensitive there, not because the position is important for the function. Ioannidis (2005) described how a method that produces a plausible pattern may not be correct, and the agreement between methods should be examined before any attribution is interpreted.

An attribution is a hypothesis about the model, and it becomes a hypothesis about the biology only if it is tested experimentally. A position that the model identifies as important can be mutated in the laboratory, and the effect on the function measured. Cumming (2014) argues that the size of such an effect should be reported with its interval, since an attribution that is statistically detectable in silico may be small in the cell.

A feature that the model uses is not necessarily a feature that is causally important for the biology. The model may use a correlated feature, a feature of the training data or an artefact, and only a perturbation experiment in the system of interest can distinguish these. Munafò et al. (2017) argued that the distinction between what a model uses and what the system requires should be stated explicitly, so that readers do not mistake an attribution for an explanation.

Attribution results should be reported with the method, its robustness across seeds and variants, and its limits. The model's confidence should not be taken as evidence of validity, since a confident model can be wrong. Peng (2011) argued that the procedure that produced an attribution must be described so that it can be reproduced and checked.
