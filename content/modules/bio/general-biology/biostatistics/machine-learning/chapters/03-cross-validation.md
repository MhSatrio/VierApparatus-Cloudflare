---
title: "Cross-Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Cross-validation as the repeated division of the data into folds, each of which serves in turn as the held-out sample while the others train the model, the k-fold and leave-one-out forms and their trade-off between bias and variance, the averaging of prediction error across folds with its spread, the nested form that keeps the tuning inside the training folds, and the reasons that cross-validation estimates the error of the procedure rather than of one fitted model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the prediction error of a method with k-fold cross-validation and report the spread of the errors across folds."
  - "Explain why tuning must be nested inside the cross-validation to avoid an optimistic estimate."
references:
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Cross-validation estimates prediction error by using every sample for testing once. In k-fold cross-validation the data are divided into k folds of similar size, and the model is trained on k minus one folds and tested on the one held out. The procedure is repeated so that each fold serves as the test set once, and the errors are averaged. Ten folds is a common choice, and leave-one-out cross-validation, which uses a fold for each sample, is the extreme form.

The choice of k involves a trade-off. A large k uses more data for training in each fold, so the estimate is less biased, but the folds overlap more and the estimates are more variable. A small k is more stable but each model is trained on less data. The spread of the errors across folds should be reported with the mean, since it shows how much the estimate depends on the particular split, and a single average hides this variation.

Cross-validation is often used to tune a model, such as the penalty of a regression or the number of variables to keep. If the tuning is chosen by cross-validation and the same folds then estimate the error, the estimate is optimistic, because the tuning has used the test folds. A nested procedure keeps the tuning inside an outer loop of folds, so that each outer test fold is untouched by the choice of settings. Breiman (2001) noted that the internal estimates of a random forest reduce the need for this in some cases, but the nested form is the safer general practice.

Cumming (2014) argues that the estimate should be reported with its interval, which for cross-validation can be taken from the spread across folds. Sandve et al. (2013) recommended recording the number of folds, the random seed that set them and the procedure for tuning, so that the estimate can be repeated and its independence assessed.
