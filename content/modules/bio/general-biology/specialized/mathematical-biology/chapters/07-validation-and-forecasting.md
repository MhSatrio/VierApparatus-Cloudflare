---
title: "Validation and Forecasting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The validation of mathematical models against data that were not used in their construction and their use in forecasting, covering the hindcast that tests a model against past data withheld from fitting, the out-of-sample forecast that is judged on the outcomes observed later, the scoring rules that measure the accuracy of probabilistic forecasts, the calibration of forecast intervals, the growth of forecast uncertainty with time, the dangers of overfitting that make a model look accurate in hindsight, and the reporting of forecasts with their uncertainty and the record of how they performed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Validate a model by forecasting outcomes withheld from fitting and score the forecast with a proper scoring rule."
  - "Explain why the uncertainty of a forecast grows with its horizon and why a forecast interval must be calibrated."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A model is validated by its ability to predict outcomes that it has not seen. The most convincing test is a forecast made before the outcome is known, and the forecast is scored against the outcome when it arrives. A model that describes the data it was fitted to may be no better than a curve drawn through the points, and only its performance on new data shows whether its mechanism has captured something real. Ioannidis (2005) described how a model judged on its own data can appear accurate while predicting nothing.

A hindcast tests the model against past data that were withheld from fitting. It is a useful intermediate step, since it allows the model to be tested before a forecast is made, but it is weaker than a true forecast, because the modeller may have seen the withheld data while building the model. The hindcast should be made as if the data were unknown, with the model fixed in advance.

Probabilistic forecasts are scored with rules that reward both accuracy and honest uncertainty, and a proper scoring rule is minimised when the forecaster reports their true belief. The score allows forecasts from different models to be compared, and it penalises a forecast that is overconfident as well as one that is wrong. Cumming (2014) argues that the calibration of the forecast intervals should be checked, since an interval that contains the outcome less often than its nominal level is misleading.

Forecast uncertainty grows with the horizon, because small errors in the initial state and in the parameters amplify over time. A forecast should therefore be reported with an interval that widens with its horizon, and the record of past forecasts should show whether the intervals were calibrated. The model's performance should be reported together with the forecasts, so that a reader can see how well it has done. Peng (2011) argued that a forecast is reproducible only with its model, its data and its code, and these should be deposited.
