---
title: "Fine-Tuning for Protein Properties"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The fine-tuning of a protein language model for specific measured properties such as stability, solubility, expression or binding, covering the assembly of labelled datasets and the bias introduced when labelled proteins come from a few families, the choice between training a head on frozen embeddings and adjusting the full model, the risk of overfitting when labelled examples are few, the splitting of labelled data by family so that the evaluation measures generalisation rather than memorisation of relatives, the comparison with simple baselines trained on hand-crafted features, the calibration of predictions for property thresholds used in decisions, and the reporting of the dataset, the split, the baselines and the performance with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fine-tune or train a head on a protein property using a split by family and compare it with a baseline on hand-crafted features."
  - "Check the calibration of predictions used against a decision threshold and report the performance with intervals."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
---

Fine-tuning adapts a pretrained protein model to a property that has been measured, such as stability, solubility, expression or binding affinity. The approach is attractive because the pretrained representation already encodes much of the relevant biology, and LeCun et al. (2015) described how learned features can be reused for new tasks. The adaptation can be done by training a small head on frozen embeddings or by adjusting the full model, and each choice has different risks when the labelled data are limited.

Labelled datasets for protein properties are often assembled from a small number of families, because those are the families that have been studied. A model trained on such a dataset may learn the properties of those families rather than the property itself, and its performance on other families will be lower. Ioannidis (2005) described how a dataset that is not representative can produce conclusions that do not generalise, and the composition of the labelled data must be reported.

The split must be by family, so that the evaluation measures generalisation to new families rather than the recognition of relatives. A random split of labelled proteins will overstate performance whenever related proteins carry similar labels. Cumming (2014) argues that the performance should be reported with its interval, and the difference between a family split and a random split is itself an informative quantity.

Fine-tuning is compared with simple baselines trained on hand-crafted features such as amino acid composition, hydrophobicity profiles or predicted secondary structure. A fine-tuned model that does not exceed such a baseline has not justified its complexity. The comparison should be made on the same split, and the difference reported with its interval.

When the predicted property is used for a decision, such as accepting a protein that exceeds a threshold of solubility, the calibration of the prediction near that threshold is what matters. Munafò et al. (2017) argued that the dataset, the split, the baselines and the performance should all be reported, so that the fine-tuned model can be judged against what the data and the simple methods can achieve.
