---
title: "Machine Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Statistical learning methods for predicting outcomes and finding structure in biological data, covering supervised and unsupervised learning, the division of data into training, validation and test sets, cross-validation for estimating prediction error, regularisation with the lasso to control the complexity of a model, random forests as ensembles of decision trees, performance metrics for classification and regression, the dangers of overfitting and of data leakage, and the reporting of a learning pipeline so that its predictions can be reproduced and judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish supervised from unsupervised learning and estimate the prediction error of a model with a held-out or cross-validated sample."
  - "Explain how regularisation and ensemble methods control overfitting and state the risk of data leakage in a pipeline."
references:
  - "Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32. https://doi.org/10.1023/A:1010933404324"
  - "Tibshirani, R. (1996). Regression Shrinkage and Selection Via the Lasso. Journal of the Royal Statistical Society Series B: Statistical Methodology, 58(1), 267-288. https://doi.org/10.1111/j.2517-6161.1996.tb02080.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Machine learning builds models that predict an outcome from measured features, or that find structure in data without an outcome to predict. In biology it is applied to gene expression profiles, images of tissue, sequences of proteins and clinical records, where the number of features is often larger than the number of samples. The methods are powerful, and the same flexibility that lets them fit complex patterns lets them fit noise, so the central discipline of the field is the honest estimation of how well a model will predict new cases.

The topic begins with the distinction between supervised learning, in which the model is trained to predict a known outcome, and unsupervised learning, in which it seeks groups or low-dimensional structure. The division of data into training, validation and test sets follows, together with cross-validation, which estimates prediction error by repeated splitting. Breiman (2001) described how ensembles of trees reduce error by averaging many models, and Tibshirani (1996) showed how a penalty can shrink coefficients and remove those that contribute little.

The later chapters address the evaluation and the pitfalls. Performance metrics summarise how well predictions match outcomes, and each metric answers a different question. Overfitting occurs when a model describes the training data too closely to generalise, and data leakage occurs when information from the test set influences training. Ioannidis (2005) described how flexibility in analysis produces findings that fail to replicate, and a machine learning pipeline is open to the same flaw.

The final chapter covers reporting. Peng (2011) argued that a computational result must be reproducible from the means of producing it, and Sandve et al. (2013) recommended keeping the data, the steps and the code together. A machine learning report must describe how the data were split, how the model was tuned and how its performance was estimated, so that a reader can judge whether a reported accuracy is real.
