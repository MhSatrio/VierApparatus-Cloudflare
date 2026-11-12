---
title: "Genomic Selection"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Genomic selection as the prediction of the breeding value of crop individuals from genome-wide markers, covering the training population of genotyped and phenotyped individuals used to fit the model, the statistical models such as ridge regression and Bayesian methods that handle the large number of markers relative to the number of individuals, the validation of prediction accuracy by cross-validation within and across populations, the use of predictions to select parents for the next cycle, the effect of training population size and relatedness on accuracy, and the shortening of breeding cycles that genomic selection allows."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a genomic prediction model is trained on a population and used to predict the breeding value of new individuals."
  - "Explain why prediction accuracy depends on the training population's size and relatedness to the candidates and state how accuracy is validated."
references:
  - "Heffner, E. L., Sorrells, M. E., & Jannink, J. (2009). Genomic Selection for Crop Improvement. Crop Science, 49(1), 1-12. https://doi.org/10.2135/cropsci2008.08.0512"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Genomic selection predicts the breeding value of an individual from its genome, using a model trained on individuals that have both genotypes and measured performance. The model assigns an effect to each marker, and the sum of the effects gives the predicted value of a candidate. Heffner et al. (2009) described how this approach allows candidates to be evaluated before they are grown in the field, which shortens the breeding cycle and speeds the gain.

The number of markers is usually much larger than the number of individuals in the training population, so ordinary regression cannot be fitted directly. Ridge regression and Bayesian methods shrink the marker effects to stabilise the estimates, and the shrinkage is controlled by a parameter that must be chosen. The choice of method and parameter affects the predictions, and it should be reported.

The accuracy of prediction is validated by cross-validation, in which part of the population is held out and predicted from the rest. The accuracy within a population is usually higher than the accuracy across populations, because the marker effects are specific to the population in which they were estimated. The validation must reflect the way the model will be used, and the populations in which it is applied should be tested.

The accuracy depends on the size of the training population and on its relatedness to the candidates. A larger training population gives more precise effects, and a population closely related to the candidates gives more accurate predictions. Cumming (2014) argues that the accuracy should be reported with its interval, and Ioannidis (2005) described how an accuracy estimated on the training individuals overstates the performance on new ones.
