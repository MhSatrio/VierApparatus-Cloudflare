---
title: "Data Quality and Bias"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The quality and bias of the data on which AI models in drug design are trained, covering the noise in measured activities that varies between assays and laboratories, the bias towards well-studied targets and chemical series that makes large datasets unrepresentative of the chemical space, the selection of inactive compounds that may be missing from published data because negative results are rarely reported, the duplication of compounds and the imbalance between active and inactive classes, the curation steps that standardise structures and remove errors, and the documentation of the source and processing of each dataset."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how publication bias towards positive results makes a dataset of compound activities unrepresentative and state the effect on a model trained on it."
  - "Explain how noise between assays limits the accuracy of a model and state the curation that reduces it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A model is only as good as the data on which it is trained, and the data of drug discovery are shaped by the history of research. Published compound activities are biased towards positive results, because compounds that are active are reported more often than compounds that are not. Ioannidis (2005) described this publication bias as a general cause of findings that do not hold, and a model trained on published activities learns a distorted picture in which most compounds are active.

The data are also biased towards well-studied targets and chemical series. A few targets have thousands of measured compounds, while most have very few, and the chemical space covered by the data is a small part of the space of possible molecules. A model trained on such data performs well on the familiar chemistry and poorly on new chemistry, and the coverage of the training set should be described.

Noise in the measured activities is substantial, because the same compound measured in different assays or laboratories may give different values. The measurement error limits the accuracy that any model can reach, and the noise must be estimated and reported. Curation can reduce noise by standardising the assays and removing outliers, but the curation must be documented, since it changes the data.

The data contain duplicates and an imbalance between active and inactive classes, and both affect the model. Duplicate compounds that appear in both the training and test sets inflate the performance, and an imbalance may lead a model to predict the majority class. The removal of duplicates and the handling of the imbalance must be reported, and Cumming (2014) argues that the effect of each choice should be shown with its interval. Sandve et al. (2013) recommended recording the source and processing of each dataset so that a model can be reproduced and its biases examined.
