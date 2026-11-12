---
title: "Overfitting and Data Leakage"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Overfitting as the fitting of a model to the noise in its training data so that its error on new cases is much larger than its error on the training cases, the signs of overfitting in the gap between training and validation performance, the causes including too many predictors relative to samples and too flexible a model, data leakage as the use of information from the test cases or from the outcome during training, the common forms of leakage in feature selection and normalisation, and the procedures that prevent each."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Recognise overfitting from the gap between training and validation performance and name its main causes."
  - "Identify a form of data leakage in a pipeline and state the procedure that prevents it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Overfitting occurs when a model describes the particular training data too closely, capturing noise that will not recur, so that its predictions for new cases are much worse than its fit to the training data. It is most likely when there are many predictors relative to the number of samples, or when the model is flexible enough to follow any pattern. The sign of overfitting is a large gap between the performance on the training data and the performance on held-out data, and the gap should be checked before any model is accepted.

Ioannidis (2005) described how a search over many models and analyses, with the best one reported, produces results that cannot be reproduced. The same process is overfitting at the level of the research programme, and the remedy is the same: a model should be judged on data that played no part in choosing it. Regularisation, ensemble averaging and early stopping of training all reduce overfitting, and each carries its own settings that must be fixed by validation.

Data leakage occurs when information that would not be available at prediction time enters the training. A common example is selecting features using the whole dataset before splitting it into folds, so that the test folds have influenced which features are used. Another is normalising the data using the mean and variance of all samples, including the test samples. Both make the performance estimate optimistic, and in some cases the leaked information is the outcome itself.

Peng (2011) argued that a result must be reproducible from its procedure, and leakage is often invisible in the final report because the order of operations is lost. Breiman (2001) noted that the internal estimates of a forest do not protect against all leakage. Sandve et al. (2013) recommended recording the order of every step in the pipeline, so that each transformation can be checked to have been fitted on the training data alone.
