---
title: "Foundation Models for Biological Sequences"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Large models pretrained on very many biological sequences and adapted to specific tasks, covering the self-supervised objectives such as masked residue prediction by which a model learns the statistics of sequences without labels, the architectures of the transformer family that represent long-range dependencies in sequence, the data curation that determines what the model has learned and what it is blind to, the transfer of a pretrained representation to a downstream task with a small labelled set, the evaluation of representations on tasks held out from pretraining and with splits that prevent leakage, the interpretation of embeddings and their limits, and the reporting of the pretraining corpus, the compute and the evaluation with uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the self-supervised objective by which a sequence model learns without labels and state what the objective does not guarantee."
  - "Evaluate a transferred representation on a downstream task with a split that prevents leakage from the pretraining corpus."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A foundation model is trained on a very large corpus with an objective that requires no manual labels, and its learned representation is then adapted to many tasks. In biology the corpus is the set of known sequences, and the objective is often to predict a masked residue from its context. LeCun et al. (2015) described how such representation learning captures structure from unlabelled data, and the sequence models that followed apply the same logic to the statistics of protein and nucleic acid sequence.

Jumper et al. (2021) showed how a model that learns from the evolutionary record of sequences can capture the three-dimensional structure of proteins, and this demonstrated that sequence statistics encode physical information. The representation is only as good as the corpus on which it was trained, and the corpus determines what the model has learned and what it is blind to. Ioannidis (2005) described how a body of literature can shape what is believed, and a corpus that over-represents well-studied organisms will produce a model that describes those organisms better than others.

The representation is transferred to a downstream task by training a small additional model on a labelled set, and the transfer can work with few labels. The evaluation must use tasks held out from the pretraining corpus, and the split must prevent leakage in which close relatives of the test examples were seen during pretraining. Cumming (2014) argues that performance on each task should be reported with its interval, since small labelled sets give wide intervals.

The representation is an embedding, and its interpretation is limited. A direction in embedding space may correspond to a property, but the correspondence must be tested, and the embedding should not be read as a mechanism. Munafò et al. (2017) argued that the pretraining corpus, the compute and the evaluation should all be reported, so that others can judge the representation and reproduce its transfer.
