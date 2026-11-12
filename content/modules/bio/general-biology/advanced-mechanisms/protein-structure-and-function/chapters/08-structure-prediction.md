---
title: "Structure Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "Methods for predicting protein structure from sequence, from homology modelling to deep learning, the accuracy each achieves and the limits that remain."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the principles of homology modelling and when it is reliable."
  - "Explain why accurate prediction of structure from sequence was difficult and how recent methods changed the field."
references:
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Dill, K. A., & MacCallum, J. L. (2012). The protein-folding problem, 50 years on. Science, 338(6110), 1042-1046. https://doi.org/10.1126/science.1219021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Predicting the structure of a protein from its sequence has been a goal since Anfinsen (1973) showed that the sequence contains the information for the fold. In principle, if the sequence determines the structure, a computer should be able to compute it. In practice the problem is hard, because the search over conformations is large and the energy function that would rank them is imperfect. Dill and MacCallum (2012) reviewed the decades of progress and the persistent difficulties.

Homology modelling is the most reliable method when a related protein of known structure exists. The model is built by aligning the target sequence to the template, copying the backbone of the template where the alignment is good and modelling the remaining regions. The accuracy depends on the similarity between the sequences: close relatives give models close to the experimental structure, while distant relatives give models with errors in the arrangement of the elements.

For proteins without a template, prediction has traditionally relied on physical energy functions and on statistics of known structures. These methods achieved only limited accuracy for most proteins until the late 2010s, when methods using deep neural networks trained on evolutionary sequence data and on known structures reached accuracy comparable to experiment for many proteins. The change was large, and it has altered how structural biology is practised.

The new methods have limits. They predict a single structure, and they may be less reliable for proteins that adopt several conformations, for complexes whose partners must be modelled together, and for disordered regions. The confidence scores that accompany the predictions must be read carefully, because a high score does not guarantee that a particular interaction or conformation is correct.

Ioannidis (2005) described how claims based on flexible analysis can fail to replicate, and predictions should be validated against experimental structures that were not used in training the method. The benchmarks used to judge prediction methods must be independent of the data used to develop them.

Alberts et al. (2022) describe the structures that the methods aim to reproduce and the experimental methods that check them. Prediction is assessed by comparison with newly determined structures, by the agreement of predicted and measured distances and by experimental tests of predicted function.
