---
title: "Recurrent and Attention Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Neural networks for sequences in which a hidden state carries information from earlier elements, the recurrent network and its difficulty in learning long-range dependencies, the attention mechanism that weights each element of a sequence by its relevance to every other, the transformer architecture built from attention layers, and their application to DNA and protein sequences, where the interactions between distant positions determine the function, together with the need to validate such models on sequences unlike those used for training."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a recurrent network carries information along a sequence and state why it struggles with long-range dependencies."
  - "Explain how attention weights the elements of a sequence and why this suits biological sequences with distant interactions."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A recurrent network processes a sequence one element at a time, and carries a hidden state from each step to the next. The state summarises what the network has seen so far, and the same weights are applied at every position. This allows sequences of any length to be processed, which suits DNA, protein and time-series data. The difficulty is that the information from distant elements must pass through many steps, and gradients tend to vanish or explode over long sequences, so the network struggles to learn dependencies that span many positions.

Gated variants of the recurrent network, such as the long short-term memory, add mechanisms that control what the state keeps and forgets, and they learn longer dependencies than the simple form. LeCun et al. (2015) described these architectures as an important step in the modelling of sequences, though their sequential processing limits how much of the computation can run in parallel.

The attention mechanism addresses the distance problem directly. For each element, attention computes a weighted combination of all the other elements, with weights that reflect their relevance, so that any two positions can interact in a single step regardless of their separation. Transformers are built from attention layers and have become the standard architecture for large sequence models. In biology, the interaction between residues that are distant in sequence but close in the folded structure of a protein is exactly the kind of dependence that attention can represent.

A model that learns such interactions must be validated carefully. Ioannidis (2005) described how a model evaluated on data similar to its training set may fail on new sequences, and a protein model tested only on families it has seen overstates its generality. Peng (2011) argued that the data, the split and the code must be available for a result to be reproduced, and the held-out sequences should be defined by their dissimilarity to the training set.
