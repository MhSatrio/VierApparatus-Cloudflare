---
title: "Supervised and Unsupervised Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The distinction between supervised learning, in which a model learns a mapping from features to a known outcome, and unsupervised learning, in which a model finds groups, components or low-dimensional structure in features alone, the classification and regression forms of supervised learning, the clustering and dimension reduction forms of unsupervised learning, and the choice of approach by the question asked and the availability of labelled data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish supervised from unsupervised learning and give a biological example of each."
  - "Choose between classification and regression for a supervised problem according to the type of the outcome."
references:
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Supervised learning uses examples in which both the features and the outcome are known, and it learns a function that maps the features to the outcome. The outcome may be categorical, as in classification of tissue as tumour or normal, or continuous, as in regression of a drug response on expression levels. The aim is a model that predicts the outcome for new cases, and its success is measured on cases that were not used to build it. Breiman (2001) described the random forest as one of the most effective general methods for both forms.

Unsupervised learning works without an outcome and seeks structure in the features. Clustering assigns samples to groups that are similar within and different between, such as subtypes of a disease defined by their expression profiles. Dimension reduction finds a small number of components that summarise many correlated features, and it is often used to visualise data or to prepare them for another method. The groups and components found are hypotheses rather than facts, since a different method or a different set of features may find other structures.

The choice between the approaches follows from the question and the data. If an outcome is available and the aim is prediction or the identification of features associated with it, supervised learning is appropriate. If no outcome exists and the aim is exploration, unsupervised learning is the right starting point. Labelled data are costly in biology, since the outcome may require an assay or a clinical follow-up, and the availability of labels often determines what can be done.

A method must be judged by its validation as well as by its structure. Cumming (2014) argues that the performance of a model should be reported with its interval, since a single estimate from one sample may be far from the performance in new data. Sandve et al. (2013) recommended recording the outcome definitions, the features and the procedure, so that the choice of approach can be understood and repeated.
