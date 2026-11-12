---
title: "Calibration Against Measured Potency"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The calibration of computed affinity scores and predicted properties against measured potencies, covering the comparison of predicted and measured binding affinities across a set of ligands with the correlation and the error reported with intervals, the calculation of the root mean squared error of the predicted free energy, the systematic bias that a score may show for particular chemical classes, the recalibration of a score by a simple linear correction fitted on a training set and tested on another, the danger of calibrating and reporting performance on the same ligands, and the reporting of the calibration set, the error, the bias and the intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare predicted and measured affinities across a set of ligands and report the error and correlation with intervals."
  - "Recalibrate a score on one set of ligands and test it on another, and state why calibrating and reporting on the same ligands overstates performance."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A computed affinity is useful only if it agrees with measured potency across a range of ligands, and the agreement must be quantified. The correlation between predicted and measured values and the root mean squared error of the predicted free energy summarise the agreement, and both must be reported with intervals. Cumming (2014) argues that the interval conveys the uncertainty of each summary, and a correlation estimated from a few ligands is very uncertain. The measured potencies themselves carry error, and the error of the prediction cannot be smaller than the error of the measurement it is compared with.

A score may show a systematic bias for particular chemical classes, overestimating the affinity of one series and underestimating another. The bias must be examined by stratifying the comparison by class, since an overall error can hide large opposite errors in different series. Ioannidis (2005) described how an aggregate measure can conceal the heterogeneity that determines whether a method is useful, and the stratified comparison reveals it.

A score can be recalibrated by a simple linear correction fitted on one set of ligands, and the recalibrated score should then be tested on a different set. The recalibration corrects a systematic offset but may not improve the ranking, and both should be reported. Peng (2011) argued that the calibration set and the procedure must be documented, so that the recalibration can be repeated and checked.

Calibrating and reporting performance on the same ligands overstates the performance, because the correction has been fitted to the very data on which it is judged. A held-out set of ligands, not used in calibration, is needed to estimate the performance honestly. Munafò et al. (2017) argued that the calibration set, the held-out set, the error, the bias and their intervals should all be reported, so that the calibrated score can be judged on the ligands it was not built from.
