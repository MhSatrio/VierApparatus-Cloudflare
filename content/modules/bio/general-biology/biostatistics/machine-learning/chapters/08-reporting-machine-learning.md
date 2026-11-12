---
title: "Reporting Machine Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a machine learning study must contain for its predictions to be judged and repeated, including the data and their source, the outcome and feature definitions, the split into training, validation and test sets with the rule for related samples, the tuning procedure and the search space, the metrics with their intervals and the prevalence of the outcome, the external validation of the model, and the deposition of the data, the code and the trained model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the data, split, tuning and validation details that a machine learning report must give."
  - "Report a model's performance with its metrics, intervals, prevalence and the sample on which the estimate was made."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A machine learning report must allow the reader to judge whether a reported accuracy is real, and this requires describing the data before the model. The source of the samples, the definitions of the outcome and of each feature, and the inclusion and exclusion criteria should be stated. Peng (2011) argued that a computational result is reproducible only with the means of producing it, and in machine learning the means include the exact data and the order in which the data were processed.

The split and the tuning should be reported in full. The proportions of the training, validation and test sets, the rule for keeping related samples together and the method of stratification should be given, together with the search space of the tuning, the criterion used to choose the best setting and whether the tuning was nested. Ioannidis (2005) described how the number of analyses tried affects the reliability of the one reported, and the report should say how many models were compared.

The performance should be reported with its metrics, their intervals and the prevalence of the outcome in the sample. A sensitivity or an area under the curve means little without the prevalence, since the predictive value of a classifier depends on it, and an interval shows how far the estimate might lie from the true performance. Cumming (2014) argues that the estimates should be reported with their precision, and a single accuracy figure is not enough.

External validation in a sample from another site, period or population is the strongest evidence that a model will generalise, and it should be reported where it exists. The trained model, the code and the data should be deposited with identifiers, as Sandve et al. (2013) recommended, so that the predictions can be reproduced and the model tested on new data by others.
