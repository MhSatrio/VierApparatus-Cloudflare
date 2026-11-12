---
title: "Random Forests"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The random forest as an ensemble of decision trees, each grown on a bootstrap sample of the data with a random subset of predictors considered at each split, the averaging of the trees to reduce variance, the out-of-bag estimate of error from the samples each tree did not see, the variable importance measures and their bias towards variables with many levels, and the limits of interpretation of an ensemble that contains hundreds of trees."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a random forest combines bootstrap samples and random predictor subsets to reduce the variance of single trees."
  - "Use the out-of-bag error and variable importance measures and state their limits."
references:
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A decision tree divides the predictor space into regions by a sequence of splits, and assigns each region the average outcome or the majority class of its training samples. A single tree is easy to read but unstable, since small changes in the data can change its structure. Breiman (2001) introduced the random forest to correct this instability by growing many trees and averaging their predictions, which reduces the variance of the combined model without a large increase in bias.

Each tree in the forest is grown on a bootstrap sample, which is drawn with replacement from the training data and contains about two-thirds of the distinct samples. At each split, only a random subset of the predictors is considered, which decorrelates the trees so that averaging them is more effective. The number of trees is usually chosen large enough for the error to stabilise, and the number of predictors considered at each split is the main tuning parameter.

The samples left out of each bootstrap sample form an out-of-bag set, and each sample is predicted by the trees that did not use it. The out-of-bag error is therefore an internal estimate of prediction error, obtained without a separate test set. Breiman (2001) showed that this estimate is useful, but it is not a substitute for an independent test set when the model is used for decisions, since the forest has been tuned on the same data.

Variable importance is measured by permuting a predictor and recording the increase in error, or by the total reduction in impurity from the splits that use it. Both measures are biased in known ways, and impurity-based importance favours predictors with many distinct values. Cumming (2014) argues that a measure should be reported with its uncertainty rather than as a ranking alone, and Sandve et al. (2013) recommended recording the number of trees, the seed and the importance method so that the ranking can be reproduced.
