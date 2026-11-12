---
title: "Ligand-Based Methods"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The drug discovery methods that use the structures of known active compounds rather than the structure of the target, covering the molecular fingerprints that represent a compound as a bit pattern, the similarity measures that compare fingerprints, the pharmacophore models that describe the arrangement of features required for activity, the quantitative structure-activity relationships that predict activity from chemical descriptors, the machine learning models trained on known actives and inactives, the risk that a model extrapolates poorly beyond the chemistry it has seen, and the validation of ligand-based predictions on compounds withheld from training."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a molecular fingerprint and a similarity search and state the assumption on which the search rests."
  - "Explain why a quantitative structure-activity model must be validated on compounds withheld from its training and why it extrapolates poorly."
references:
  - "Shoichet, B. K. (2004). Virtual screening of chemical libraries. Nature, 432(7019), 862-865. https://doi.org/10.1038/nature03197"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

When the structure of a target is not known, drug discovery can proceed from the compounds already known to be active. Ligand-based methods search for new compounds that resemble these actives, on the assumption that similar molecules tend to have similar activity. Shoichet (2004) described these methods as the complement to structure-based screening, and they are widely used because they require only the chemistry of the known actives.

Molecular fingerprints represent each compound as a pattern of bits that records the presence of structural features, and the similarity of two compounds is measured by the overlap of their fingerprints. The choice of fingerprint and of similarity measure determines which compounds are found, and a different choice can give a different ranking. The assumption that similar structures have similar activity is useful but imperfect, since small changes can abolish activity.

Pharmacophore models describe the arrangement of features, such as hydrogen-bond donors and acceptors and hydrophobic groups, that a compound must present to be active. A model is built from a set of actives and is then used to search for compounds that match it. The model may match compounds that are inactive, and its specificity must be tested.

Quantitative structure-activity models predict activity from chemical descriptors, and machine learning models are trained on known actives and inactives. These models must be validated on compounds withheld from training, since a model that fits its training data will overstate its accuracy. Ioannidis (2005) described how such flexibility can produce models that do not generalise, and Cumming (2014) argues that the predictive accuracy should be reported with its interval. A model extrapolates poorly beyond the chemistry it has seen, and its predictions for new scaffolds should be treated with caution.
