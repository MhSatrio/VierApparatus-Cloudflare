---
title: "Linearity and Range"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The assessment of the linearity of a method's response and the range over which it is valid, covering the preparation of a series of standards spanning the intended range, the fitting of a calibration model and the examination of its residuals for systematic departure from linearity, the choice between a linear and a weighted or non-linear model when the variance changes with concentration, the estimation of the slope and intercept with their intervals, the definition of the range as the interval within which linearity, accuracy and precision all meet the acceptance criteria, and the risk of extrapolating beyond the tested range."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fit a calibration model to a series of standards, examine its residuals and judge whether the response is linear over the range."
  - "Define the working range of a method and state why results outside it must not be reported as validated."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Linearity describes how closely the response of a method is proportional to the amount measured. A calibration series of standards, spread across the intended range, is measured and a model is fitted to the responses. The quality of the fit is judged not by the correlation coefficient alone but by the pattern of the residuals, the differences between observed and fitted values. A curved or patterned residual plot indicates a departure from linearity that a high correlation can conceal. Cumming (2014) argues that the fit should be displayed graphically with its intervals.

Where the variance of the response increases with the amount measured, an ordinary least-squares line gives too much weight to the high standards. A weighted regression, in which each standard is weighted by the inverse of its variance, gives a fairer estimate of the calibration, and the choice of weighting must be justified from the data. Ioannidis (2005) described how the choice of an analysis after inspecting the data can change the conclusion, so the weighting rule should be fixed in the validation protocol.

The slope and the intercept are estimated with their intervals, and the intercept is examined for a constant bias. An intercept that differs from zero beyond its interval indicates a systematic offset in the blank response. Peng (2011) argued that the calibration model and its parameters should be reported, so that the calculation of any unknown sample can be reproduced by others.

The range is the interval within which linearity, accuracy and precision all meet their acceptance criteria. It is narrower than the set of standards measured if any criterion fails near an end. Results outside the range must not be reported as validated, because the method has not been shown to perform there, and extrapolation beyond the highest standard is a common error in routine work.
