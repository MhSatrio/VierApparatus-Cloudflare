---
title: "Experimental Validation of Predictions"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The experimental testing of predictions made by machine learning models, covering the selection of predictions for testing by a pre-specified rule that avoids choosing only those that confirm the model, the design of experiments that measure the predicted property directly rather than a proxy, the comparison of predicted and measured values with their intervals, the calculation of the hit rate of the model among the tested predictions with its uncertainty, the inclusion of predictions that the model expects to fail so that its calibration can be tested, the prospective nature of a test in which predictions are made and recorded before the experiment, and the reporting of all tested predictions, successes and failures alike."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Select predictions for experimental testing by a rule fixed in advance and state why this prevents selection of confirming cases."
  - "Calculate the hit rate of a model among experimentally tested predictions with its interval and report all failures."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The decisive test of a machine learning prediction in molecular biology is an experiment. A model's accuracy on held-out data is evidence about its performance on similar data, but a prediction that is made for a new molecule is a claim about the world that only measurement can check. The experiment must measure the predicted property directly where possible, since a proxy measured in its place introduces the same problems of label quality that affect training.

The predictions to be tested must be selected by a rule fixed in advance. A selection made after the results are known, in which only the predictions that appear to work are reported, produces an illusion of success. Ioannidis (2005) described how the selective reporting of positive results inflates the apparent value of any method, and the rule must prevent this. Munafò et al. (2017) argued that the selection should be recorded before the experiment, so that the hit rate is a fair measure.

The hit rate among tested predictions is the proportion that are confirmed, and it should be reported with its interval, since the number tested is often small. Cumming (2014) argues that a hit rate from a few predictions is very uncertain, and the interval shows how much weight it can bear. The comparison of predicted and measured values should also be made with intervals, since both carry uncertainty.

Predictions that the model expects to fail should be included, because they test whether its stated confidence is calibrated. A model that is confident about predictions that fail is overconfident, and this can be revealed only by testing the predictions it doubts. The prospective test, in which predictions are recorded before the experiment is performed, is the strongest form of validation.

All tested predictions must be reported, both the successes and the failures. A report that omits the failures overstates the performance of the model, and the failures are often the most informative part of the evaluation. Peng (2011) argued that the complete record of a computational method, including its failures, is part of its reproducibility, and the reporting of every test is the condition of trust.
