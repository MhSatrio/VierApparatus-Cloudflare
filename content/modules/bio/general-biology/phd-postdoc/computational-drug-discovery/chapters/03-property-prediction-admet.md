---
title: "Property Prediction and ADMET Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The prediction of absorption, distribution, metabolism, excretion and toxicity properties of candidate molecules with computational models, covering the descriptors and fingerprints that represent a molecule, the models trained on measured properties and their domain of applicability defined by the similarity of a query molecule to the training set, the prediction of specific liabilities such as metabolic instability, hERG channel inhibition and hepatotoxicity, the calibration of the classification thresholds to the decision the property informs, the separation of the training and test sets by scaffold so that the model is not rewarded for recognising a chemical series, and the reporting of the domain of validity and of the performance with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the applicability domain of a property model and state what the model should not be used to predict."
  - "Split a molecular dataset by scaffold and report the performance on the held-out scaffolds with intervals."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Predicting the absorption, distribution, metabolism, excretion and toxicity of a molecule allows many candidates to be eliminated before they are synthesised and tested. The models are trained on measured properties, and they represent each molecule by descriptors or fingerprints that capture its structure. A model is useful only within the region of chemical space it was trained to describe, and its performance outside that region is unknown. Ioannidis (2005) described how a model that performs well on the data it was trained on may fail when applied to new cases, and the domain of applicability is the means of recognising this.

The applicability domain is defined by the similarity of a query molecule to the training set. A query that is very dissimilar to every training molecule lies outside the domain, and the prediction for it should be flagged as unreliable rather than reported with the same confidence as an in-domain prediction. The definition of similarity and the threshold must be stated, since they determine which predictions are accepted. Cumming (2014) argues that the uncertainty of a prediction should widen as the query moves away from the training data, and a flag is a crude form of this.

Specific liabilities, such as metabolic instability, inhibition of the hERG potassium channel associated with cardiac risk, and hepatotoxicity, are predicted by models that must be calibrated to the decision they inform. A classification threshold chosen for one purpose may be inappropriate for another, and the threshold should match the cost of false positives and false negatives in the decision. The calibration should be reported.

Evaluation must separate training and test molecules by scaffold, so that the model cannot succeed by recognising the chemical series of its training examples. A random split of molecules from the same series will overstate performance, because close analogues carry similar properties. Munafò et al. (2017) argued that the evaluation should match the claim, and a claim of prediction for new chemistry requires a test on new scaffolds. Peng (2011) argued that the dataset, the split and the code must be available so that the evaluation can be repeated.
