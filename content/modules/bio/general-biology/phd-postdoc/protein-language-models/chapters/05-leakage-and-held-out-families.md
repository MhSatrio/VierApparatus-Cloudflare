---
title: "Leakage and Held-Out Families"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The prevention of leakage in the evaluation of protein language models through the holding out of entire families, folds and sequence clusters, covering the clustering of sequences at a stated identity to define families that cannot be split across training and test sets, the removal of test sequences that are too similar to any training sequence, the variation of the split threshold to show how performance changes as similarity to the training data decreases, the detection of leakage through pretraining when the pretraining corpus already contains the test proteins, and the reporting of the clustering method, the threshold and the resulting distribution of similarity between test and training sets."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Cluster protein sequences at a stated identity and hold out whole clusters so that no test protein has a close relative in training."
  - "Detect leakage through the pretraining corpus and report the threshold at which performance changes with similarity."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The central threat to the evaluation of a protein language model is leakage from close relatives. A model that has seen one member of a family in training will often predict the others well, and an evaluation that places family members on both sides of the split will report this recognition as generalisation. Ioannidis (2005) described how an evaluation that does not separate the cases it should separate will overstate the result, and the held-out family is the defence against this.

Sequences are clustered at a stated identity, and whole clusters are assigned to training or to testing. The clustering method and the identity threshold define what counts as a family, and both must be reported, since a looser threshold merges more sequences and gives a stricter test. Cumming (2014) argues that the sensitivity of the result to the threshold should be measured, so that the reader can see how performance changes as the test becomes more demanding.

Test sequences that are too similar to any training sequence should be removed, as an additional safeguard. The threshold for removal is a choice, and the number of sequences removed should be reported. A test set reduced by such removal may be small, and its uncertainty must be stated.

Leakage can also occur through pretraining, when the corpus used to pretrain the model already contains the test proteins. A model evaluated on proteins it saw during pretraining is not being tested on new proteins, however carefully the fine-tuning split was made. Peng (2011) argued that the composition of all data used by a model must be known for its results to be interpreted, and the pretraining corpus must be checked against the test set.

Performance should be shown as a function of the similarity threshold, so that the decline with decreasing similarity is visible. Munafò et al. (2017) argued that the clustering method, the threshold and the distribution of similarity between test and training sets should be reported, so that the evaluation can be understood and reproduced.
