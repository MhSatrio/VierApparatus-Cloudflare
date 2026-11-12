---
title: "Training, Validation and Test Sets"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The division of a dataset into a training set used to fit a model, a validation set used to choose its settings, and a test set held back to estimate its performance on new cases, the reason that the test set must be used once and only at the end, the stratification of the split to keep the outcome balanced, the handling of samples that are related by family, batch or patient, and the consequences of reusing the test set for model selection."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Divide a dataset into training, validation and test sets and state the role of each."
  - "Explain why reusing the test set for model selection makes its performance estimate optimistic."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
---

A model must be fitted to one part of the data and tested on another, because a model judged on the data that built it will always look better than it is. The dataset is therefore divided into three parts. The training set is used to fit the model, the validation set is used to choose the settings of the model, such as the strength of a penalty or the depth of a tree, and the test set is held back to estimate how the final model will perform on new cases.

The test set should be used once, at the end, and only for the final estimate. Each time it is used to compare models or to adjust a setting, information from it leaks into the choice, and the performance estimate becomes optimistic. Ioannidis (2005) described how repeated selection among analyses inflates the apparent success of a method, and the test set protects against this only if it is left untouched until the end.

The split should preserve the structure of the data. Stratification keeps the proportion of each outcome class similar in each part, which matters when one class is rare. Samples that are related, such as repeated measurements from one patient, samples from one batch or individuals from one family, must be kept together in the same part, since otherwise the model is tested on samples that resemble its training data and the estimate is inflated.

Breiman (2001) noted that the random forest gives an internal estimate from the samples left out of each tree, which is useful but does not replace an independent test set. Sandve et al. (2013) recommended recording the proportions of the split, the method of stratification and the rule for keeping related samples together, so that the estimate can be reproduced and its independence checked.
