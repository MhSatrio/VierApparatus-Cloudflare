---
title: "Scaling and Compute"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The scaling of sequence models with data, parameters and compute and the resource considerations that determine who can build and verify them, covering the empirical relation between the size of the model, the size of the corpus and the performance on held-out data, the diminishing returns of scale on some tasks and the sharper gains on others, the estimation of the scaling relation from a set of runs with its uncertainty, the carbon and energy cost of training and the reporting of compute, the reproducibility constraints that arise when training requires resources few groups possess, and the use of smaller models to test hypotheses before scaling."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate a scaling relation from a set of training runs and report its uncertainty rather than a single fitted curve."
  - "State the reproducibility constraint that arises when a model requires compute that few groups can afford."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The performance of sequence models has improved with the size of the model, the size of the corpus and the compute used to train them, and these relations are often described as scaling laws. LeCun et al. (2015) noted that the success of deep learning has depended on large datasets and substantial computation, and the scaling of biological sequence models follows the same pattern. A scaling relation is an empirical description of the training runs that were performed, and its extension beyond them is a prediction that must be tested.

A scaling relation is estimated from a set of runs at different sizes, and the fitted curve carries uncertainty that depends on the number and spread of the runs. Cumming (2014) argues that the fitted relation should be reported with its interval, and a curve that is extrapolated far beyond the runs carries an interval that grows rapidly. A single curve drawn through a few points conveys a precision that the data do not support.

Scale does not improve all tasks equally. Some tasks show diminishing returns, while others improve sharply once a threshold of size is reached, and the reporting should show the performance on each task rather than an average that conceals the difference. Ioannidis (2005) described how a single summary can hide the heterogeneity on which the real conclusion depends.

Training a large model consumes substantial energy and produces a carbon cost, and the compute used should be reported in a standard unit so that the cost can be compared. The reproducibility of a result is constrained when training requires resources few groups possess, and a method that cannot be verified by others is weaker evidence. Munafò et al. (2017) argued that the means of verification should be available to the community, and smaller models can be used to test hypotheses before a large model is trained. Peng (2011) argued that a result is reproducible only when the procedure can be repeated, and the resource requirements of that procedure are part of its description.
