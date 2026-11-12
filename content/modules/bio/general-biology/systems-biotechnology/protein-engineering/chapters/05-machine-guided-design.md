---
title: "Machine-Guided Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Machine-guided protein design in which a statistical or machine learning model is trained on measured variants to predict the function of new sequences, the choice of features that represent a sequence such as amino acid identity, physicochemical properties and evolutionary profiles, the active learning cycle in which the model proposes variants that are measured and used to retrain it, the validation of the model on held-out variants and the risk that a model extrapolates poorly beyond the sequences it has seen."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a machine learning model that predicts protein function from sequence and state how its features represent the sequence."
  - "Explain the active learning cycle and why the model must be validated on variants not used to train it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Bornscheuer, U. T., Huisman, G. W., Kazlauskas, R. J., Lutz, S., Moore, J. C., & Robins, K. (2012). Engineering the third wave of biocatalysis. Nature, 485(7397), 185-194. https://doi.org/10.1038/nature11117"
---

Machine-guided design uses measured variants to learn a model that predicts the function of sequences that have not been made. The model takes a representation of each sequence, such as the identity of each amino acid, its physicochemical properties or the frequencies of residues in an alignment of natural homologues, and it outputs a predicted function. Bornscheuer et al. (2012) noted that such models can reduce the number of variants that must be made, provided they are accurate enough to guide the choice.

The features determine what the model can learn. A representation that captures only the identity of residues cannot express their interactions, while one that includes physicochemical properties or evolutionary information can capture more of the structure of the landscape. The choice of features is a design decision, and it should be stated and justified, since different features may lead to different conclusions about which positions matter.

Active learning alternates between the model and the experiment. The model proposes the variants that it predicts to be most informative or most functional, these are measured, and the new data are used to retrain the model. Each cycle improves the model where it was uncertain, and the process can find good variants with fewer measurements than an exhaustive search. The record of each cycle should show what was proposed, what was measured and how the model changed.

A model is validated on variants that were not used to train it, and the validation should be reported with its error. Ioannidis (2005) described how a model that is judged on its training data appears more accurate than it is, and a model that predicts well on its training set may predict poorly on new sequences. The model's predictions are reliable only near the sequences it has seen, and an extrapolation far from them should be treated with caution. Cumming (2014) argues that the error should be reported with its interval, and Sandve et al. (2013) recommended recording the features, the training data and the model version.
