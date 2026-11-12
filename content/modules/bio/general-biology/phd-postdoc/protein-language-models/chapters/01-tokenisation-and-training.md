---
title: "Tokenisation and Training on Protein Sequences"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The tokenisation of protein sequences for language modelling and the training of a model on very large sets of sequences, covering the representation of each residue as a token from the twenty standard amino acids and the special tokens for unknown residues, gaps and sequence boundaries, the treatment of ambiguous and rare letters, the sampling of sequences to balance families within a training batch, the masked or autoregressive training objective, the consequences of training on sequence families whose members are near-duplicates, the monitoring of training through held-out perplexity, and the reporting of the tokenisation, the sampling and the training data with their version."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the tokenisation of a protein sequence and the special tokens needed to handle unknown residues and sequence boundaries."
  - "Explain how sampling by family affects the representations a model learns and state how the sampling is reported."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Tokenisation converts a protein sequence into the discrete units that the model reads. The simplest scheme maps each of the twenty standard amino acids to a token, with additional tokens for unknown residues, for gaps and for the boundaries of a sequence. LeCun et al. (2015) described how learned representations depend on the input encoding, and the choice of tokens determines what the model can express. Ambiguous and rare letters, such as those that stand for one of several residues, must be handled in a stated way, since a silent choice here changes the training data.

The training set is assembled from very many sequences, and their sampling determines what the model learns. Sampling by raw frequency gives large families a dominant share of the training signal, while sampling by family gives smaller families a fairer share. The choice affects the representations, and the sampling strategy should be reported with its justification. Ioannidis (2005) described how the composition of a body of evidence shapes its conclusions, and the same is true of a training set.

Near-duplicate sequences in the training set reduce the information each additional example provides and can inflate performance on held-out data that is related to them. Deduplication by identity is therefore a necessary step, and its threshold should be reported. Cumming (2014) argues that the effect of such choices on performance should be measured with intervals, since the apparent gain from a larger set may be partly redundancy.

Training is monitored through held-out perplexity, which measures how well the model predicts sequences it has not seen. The monitoring data must be separate from the training data at the level of family as well as of sequence, and the held-out set must be fixed before training begins. Munafò et al. (2017) argued that the tokenisation, the sampling and the training data should be reported with their version, so that the model can be retrained and its results reproduced by others.
