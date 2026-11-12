---
title: "Regularisation and the Lasso"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Regularisation as the addition of a penalty to the fit of a model so that its coefficients are shrunk towards zero, the lasso penalty on the absolute values of the coefficients that sets some of them exactly to zero and so selects variables, the ridge penalty on the squared values that shrinks without selection, the choice of the penalty strength by cross-validation, and the limits of the selected variables when predictors are strongly correlated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the lasso penalty shrinks coefficients and sets some of them to zero, and contrast it with the ridge penalty."
  - "Choose the penalty strength by cross-validation and state the limits of the variables that the lasso selects."
references:
  - "Tibshirani, R. (1996). Regression Shrinkage and Selection Via the Lasso. Journal of the Royal Statistical Society Series B: Statistical Methodology, 58(1), 267-288. https://doi.org/10.1111/j.2517-6161.1996.tb02080.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Regularisation controls the complexity of a model by adding a penalty to the measure of fit. When there are many predictors, or more predictors than samples, an unpenalised regression fits the noise as well as the signal and its coefficients are unstable. A penalty on the size of the coefficients shrinks them towards zero, trading a little bias for a large reduction in variance, and the penalised model usually predicts new cases better than the unpenalised one.

Tibshirani (1996) introduced the lasso, which penalises the sum of the absolute values of the coefficients. The absolute penalty has the property that it sets some coefficients exactly to zero, so the lasso performs variable selection as well as shrinkage. The ridge penalty, which uses the sum of the squares, shrinks all coefficients without setting any to zero. The choice between them depends on whether a sparse model is believed to be true, and the lasso is preferred when only a few of many predictors are thought to matter.

The strength of the penalty is chosen by cross-validation, which estimates the prediction error for a range of penalty values and selects the one with the lowest error. The selected penalty should be reported together with the range searched and the criterion used, since the number of variables retained depends on it. Cumming (2014) argues that the coefficients should be reported with their intervals, and the intervals of penalised coefficients are less straightforward than those of ordinary regression, so their method should be stated.

The variables selected by the lasso are not reliable when predictors are strongly correlated, because the penalty tends to choose one of a group of correlated predictors arbitrarily, and a slight change in the data can change the choice. Ioannidis (2005) described how selection from many candidates produces findings that do not hold, and a selected set of biomarkers should be validated in new samples before it is taken as the explanation of an outcome.
