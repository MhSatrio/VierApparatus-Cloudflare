---
title: "Data and Code Reproducibility"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reproducibility of molecular machine learning work through the sharing of data, code, trained models and the environment in which they run, covering the versioning and documentation of the training data, the deposition of the splits used for evaluation so that others compare against the same examples, the release of the code with its dependencies pinned, the sharing of trained model weights with their architecture and training procedure, the recording of the random seeds and of the hardware where it affects results, the management of data that cannot be shared because of licence or privacy with a description sufficient for reproduction, and the statement of compute cost that allows others to judge whether they can repeat the work."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Deposit the training data, the evaluation splits, the code and the trained model so that an independent group can reproduce the reported performance."
  - "Describe data that cannot be shared in a way that still allows the method to be reproduced."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A machine learning result is reproducible only when the data, the code and the trained model are available, together with the environment in which they run. Peng (2011) argued that a computational result is a product of its inputs and procedures, and a report that omits any of them cannot be checked. Sandve et al. (2013) provided the basic rules that apply equally to learned models, and the deposition of data and code is the first of them.

The evaluation splits should be deposited, so that others compare their models against the same examples. Without the splits, two groups may report performance on different test sets, and the comparison becomes meaningless. Munafò et al. (2017) argued that the conditions of evaluation are part of the claim, and the split is one of those conditions.

Code should be released with its dependencies pinned to specific versions, since a library update can change the results of a model. Trained model weights should be shared together with the architecture and the procedure used to train them, and the random seeds and the hardware should be recorded where they affect the result. Ioannidis (2005) described how a result that cannot be reproduced exactly may still be genuine, but the means to test its robustness are lost without the record.

Some data cannot be shared because of licence or privacy. In such cases the data should be described in enough detail that a comparable dataset can be assembled, and the method should be reproducible on that dataset. Cumming (2014) argues that the variation across comparable datasets is informative, and a result that holds on several sources is more convincing than one that holds on one. The compute cost of training and evaluation should be stated, since it determines whether others can repeat the work, and a method that requires resources few groups have is harder to verify.
