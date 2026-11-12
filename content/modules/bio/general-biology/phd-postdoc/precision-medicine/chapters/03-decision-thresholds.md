---
title: "Decision Thresholds and Misclassification"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The choice of a decision threshold for assigning a therapy from a continuous biomarker and the consequences of misclassification in each direction, covering the receiver operating characteristic that shows the trade-off between sensitivity and specificity across thresholds, the area under the curve and its interval as a measure of discrimination, the choice of a threshold by the costs of false negatives and false positives in the clinical context, the calibration of the threshold so that the predicted benefit at that threshold matches the observed benefit, the danger of choosing a threshold that maximises performance in the data used to choose it, the validation of the threshold in an independent cohort, and the reporting of the threshold, the operating characteristics and the uncertainty of each."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a receiver operating characteristic curve and state the trade-off between sensitivity and specificity it shows."
  - "Choose a decision threshold by the consequences of misclassification and validate it in an independent cohort."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A continuous biomarker is converted into a decision by a threshold, and the choice of threshold determines who is assigned the therapy. The receiver operating characteristic curve shows the trade-off between sensitivity, the proportion of responders identified, and specificity, the proportion of non-responders correctly excluded, across all possible thresholds. The area under the curve summarises the discrimination of the biomarker, and it should be reported with its interval, since the number of patients determines how precisely it is known. Cumming (2014) argues that the interval conveys the uncertainty that a single area value conceals.

The threshold should be chosen by the consequences of misclassification in each direction. A false negative denies a beneficial therapy to a responder, and a false positive exposes a non-responder to its harms without benefit. The relative cost of these errors depends on the disease and the therapy, and it is a clinical judgement that must be made explicitly. Ioannidis (2005) described how thresholds chosen by convenience can produce decisions that the evidence does not justify, and the costs must be stated.

A threshold can also be calibrated so that the predicted benefit at that threshold matches the benefit observed in patients who fall near it. A threshold that sorts patients well may still assign therapy to those who gain little, and the calibration reveals this. The predicted and observed benefit should be compared with their intervals.

A threshold chosen to maximise performance in the data used to choose it will overstate that performance, because the threshold has been fitted to the sample. The threshold must be validated in an independent cohort, and the operating characteristics in that cohort reported. Munafò et al. (2017) argued that the threshold and its validation should be pre-specified, so that the decision rule can be tested on patients it was not built from.

The report should state the threshold, the operating characteristics at the threshold and the cohort in which they were measured, each with its uncertainty. Peng (2011) argued that the means to reproduce the threshold, including the data and the procedure, must be available, and the report should make the clinical costs that justified the threshold explicit.
