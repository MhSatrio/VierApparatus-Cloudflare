---
title: "Prediction and Its Limits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The use of a fitted regression to predict new observations, the distinction between the confidence interval of the mean response and the wider prediction interval of a new individual, the extrapolation beyond the range of the data that the model does not support, the validation of a predictive model on data withheld from fitting or on an independent sample and the reasons a model that explains a sample may not predict a new population."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish the interval for the mean response from the prediction interval for a new observation and state which applies to a given question."
  - "Validate a predictive regression on data withheld from fitting and explain why extrapolation beyond the data is unsupported."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A fitted regression can be used to predict the response for new values of its predictors. Two different quantities are predicted, and they must not be confused. The mean response at a given predictor value is the average of the responses that would occur there, and its confidence interval is relatively narrow. The response of a single new individual at that value varies around the mean, and its prediction interval is wider, since it must include the individual's own variation. A prediction interval that is reported as if it were a confidence interval understates the uncertainty of an individual prediction.

Extrapolation beyond the range of the data is unsupported. The fitted line describes the relationship where the data lie, and the assumption that it continues outside that range is an assumption the data cannot test. A model fitted to plants grown at moderate temperatures says nothing reliable about their response at temperatures never observed, however smooth the line appears. Cumming (2014) argues that the intervals grow wide at the ends of the range, which shows the uncertainty of such predictions.

A predictive model should be validated on data that were not used in fitting. A model that explains the sample may predict a new sample poorly, because the sample's particular noise has been fitted. The validation can be an independent dataset, or a split of the available data into a set for fitting and a set for testing, and the performance on the withheld data is the honest measure of the model's predictive value.

Ioannidis (2005) described how a result that does not replicate was often a product of the sample on which it was found, and a predictive model fitted and tested on the same data is open to the same failure. Wasserstein and Lazar (2016) note that the p-values and intervals of a fitted model describe the model's estimates, not its predictive accuracy on new data.

Sandve et al. (2013) recommended recording the validation design and the prediction intervals, since a predictive claim without them cannot be judged.
