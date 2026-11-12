---
title: "Calibration and Uncertainty Quantification"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The calibration of a model's stated uncertainty and the quantification of the uncertainty in its predictions, covering the sources of uncertainty in a biological model including parameter uncertainty, structural uncertainty from the choice of model, measurement uncertainty and the uncertainty in the inputs, the propagation of these sources into a predictive distribution, the calibration of the predictive distribution so that its stated intervals contain the observed outcomes at the stated rate, the diagnosis of overconfidence when the intervals are too narrow and of underconfidence when they are too wide, the use of ensembles of models with different structures to represent structural uncertainty, and the reporting of the sources and the total uncertainty with their relative contributions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the sources of uncertainty in a biological model and state how each is propagated into the predictive distribution."
  - "Check the calibration of stated predictive intervals against observed outcomes and diagnose over- and underconfidence."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A prediction without an honest statement of its uncertainty is of limited use, and a model's stated uncertainty must itself be checked. Uncertainty arises from several sources. Parameters are estimated imprecisely, the structure of the model may be wrong, the measurements are noisy and the inputs to the model are often approximate. Each source contributes to the total uncertainty, and a complete account identifies them separately. Ioannidis (2005) described how an analysis that considers only one source of uncertainty can appear far more certain than it is.

The sources are propagated into a predictive distribution, which describes the range of outcomes consistent with all of them. Propagation through a nonlinear model can be difficult, and sampling methods are often used to approximate it. The distribution should be checked, since an approximation that is too crude will misrepresent the uncertainty. Cumming (2014) argues that the predictive interval should be reported with the coverage it claims, since the coverage is itself a claim that can be tested.

Calibration tests whether the stated intervals contain the observed outcomes at the stated rate. A ninety-five per cent interval should contain about ninety-five per cent of the observations, and a model whose intervals contain far fewer is overconfident, while one whose intervals contain far more is underconfident. Both are errors, and the calibration check reveals which the model makes. Munafò et al. (2017) argued that the calibration of a predictive model should be reported in the same way as its accuracy.

Structural uncertainty is often the largest and the hardest to quantify. One approach is to build an ensemble of models with different structures and to treat their disagreement as a measure of structural uncertainty. The ensemble does not guarantee that the true model is among those considered, but it makes the dependence on structure visible. The sources and the total uncertainty, with their relative contributions, should be reported, so that a reader knows where the uncertainty comes from and what would reduce it.
