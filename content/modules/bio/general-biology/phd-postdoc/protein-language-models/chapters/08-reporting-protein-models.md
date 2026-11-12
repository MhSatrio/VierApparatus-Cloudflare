---
title: "Reporting Protein Language Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of a protein language model and its applications so that its training, its evaluation and its limits can be understood and reproduced, covering the tokenisation and sampling of the training data, the deduplication threshold and the composition of the corpus, the training objective and the architecture, the held-out evaluation by family with the clustering method and threshold, the contact, variant and property evaluations with intervals and their controls and baselines, the probing and interpretation results with their controls, the compute and the release of weights and code under a stated licence, and the explicit statement of the properties the model cannot capture and of the decisions it should not inform."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a protein language model with its training data, evaluation by family, controls and compute so that it can be reproduced."
  - "State the properties the model cannot capture and the decisions for which it should not be used."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A protein language model is a shared resource whose value depends on the clarity of its report. The training data must be described with their sources, their version, their deduplication threshold and their composition, since the sequences the model has seen determine what it has learned. Munafò et al. (2017) argued that the data behind a model are part of the model, and a report that omits them leaves the model unexplained.

The architecture, the objective and the training procedure must be given in enough detail to reproduce the model. The evaluation must state how families were defined, the clustering method and the threshold, so that the held-out split can be understood. Peng (2011) argued that the means to reproduce a computational result must be available, and the evaluation split is one of those means.

Each application, whether contact prediction, variant scoring or property prediction, should be reported with its interval, its controls and its baselines. A result without a control does not show what the model adds. Cumming (2014) argues that the interval conveys the precision of each claim, and a claim reported without it asks the reader to accept more than the data show.

The probing and interpretation results should be reported with their controls, and any claim about what a unit or a head represents should be supported by intervention. Ioannidis (2005) described how interpretations that go beyond the evidence mislead the field, and the report should separate what the model encodes from what the model uses.

The report must state the compute used and the licence under which the weights and code are released. It must close with an explicit statement of the properties the model cannot capture and of the decisions for which it should not be used. This statement protects those who would otherwise apply a sequence-only model to questions that depend on context, dynamics or experiment.
