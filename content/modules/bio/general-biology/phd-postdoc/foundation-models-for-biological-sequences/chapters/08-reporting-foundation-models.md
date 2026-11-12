---
title: "Reporting Foundation Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of a foundation model for biological sequences so that its training, its evaluation and its limits can be understood and reproduced, covering the description of the pretraining corpus with its sources, its versions, its deduplication and its composition by taxonomic group, the objective, the architecture and the training procedure, the held-out and out-of-distribution evaluations with their splits and intervals, the calibration and the performance as a function of distance from the training data, the compute used for training and inference, the release of the model weights and code under a licence that states the conditions of use, and the statement of the applications for which the model has and has not been validated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a foundation model with its corpus, objective, architecture, evaluation splits and compute so that it can be reproduced."
  - "State the applications for which the model has been validated and those for which it has not."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A foundation model is a shared resource, and its usefulness depends on the quality of its report. The pretraining corpus must be described with its sources, their versions, the deduplication applied and the composition by taxonomic group. Munafò et al. (2017) argued that a model that cannot be described cannot be evaluated, and the corpus is the first thing that must be described, since it determines what the model has learned.

The objective, the architecture and the training procedure must be given in enough detail to reproduce the model. The evaluation should report the held-out and the out-of-distribution results, each with its split and its intervals. Cumming (2014) argues that the uncertainty of each performance estimate should be shown, and a model reported only by its best result hides the variation that a reader needs to see.

Calibration and the performance as a function of distance from the training data should be reported, since they show where the model can be trusted. The compute used for training and for inference should be stated in a standard unit, so that others can judge whether they can repeat the work. Ioannidis (2005) described how a claim that omits the conditions of its success cannot be relied upon, and the compute is one of those conditions.

The model weights and the code should be released under a licence that states the conditions of use, and the release should include the version of every dependency. Peng (2011) argued that the means to reproduce a computational result must be available, and a model whose weights are withheld cannot be checked by others.

The report should end with the applications for which the model has been validated and those for which it has not. A reader who knows where the model is supported can use it appropriately, and a reader who does not may apply it beyond its evidence. This statement is the most important safeguard for the responsible use of a shared model.
