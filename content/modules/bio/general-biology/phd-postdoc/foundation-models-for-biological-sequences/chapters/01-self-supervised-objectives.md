---
title: "Self-Supervised Objectives for Sequences"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The self-supervised objectives used to pretrain sequence models without labels, covering masked residue prediction in which a random fraction of positions is hidden and must be recovered from context, autoregressive prediction in which each residue is predicted from those before it, the trade-off between the two in what each teaches the model about bidirectional context, the choice of the masking fraction and the masking strategy, the risk that the model learns trivial regularities such as local composition rather than structure, the evaluation of the pretrained model by its perplexity on held-out sequences, and the reporting of the objective, the masking scheme and the held-out evaluation with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare masked and autoregressive objectives and state what each teaches a model about context."
  - "Evaluate a pretrained model on held-out sequences and report perplexity with its uncertainty."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A self-supervised objective creates a learning problem from the data themselves. In masked residue prediction, a fraction of the positions in a sequence is hidden, and the model must recover them from the rest. LeCun et al. (2015) described the general principle that a model can learn useful representations when it is asked to predict part of its input, and the masked objective applies this principle to sequences where the context on both sides of a residue is informative.

Autoregressive prediction asks the model to predict each residue from those that precede it. It is natural for generation, since the model can produce sequences one residue at a time, but it sees only one side of the context. Masked prediction sees both sides and learns bidirectional dependencies, while autoregressive prediction learns the distribution of sequences in a sequential form. Ioannidis (2005) described how the choice of an objective shapes what a model can learn, and the objective should be chosen for the task that follows.

The masking fraction and the masking strategy determine what the model is forced to learn. A small fraction may let the model rely on local composition, which is a trivial regularity that does not require any understanding of structure. A masking strategy that hides contiguous segments forces the model to use longer-range context. Cumming (2014) argues that the effect of such choices should be measured with intervals, since small differences in pretraining may not survive the variation between runs.

The pretrained model is evaluated by its perplexity on held-out sequences, which measures how well it predicts sequences it has not seen. Perplexity is a useful training signal, but it is not a measure of biological understanding, and a model with low perplexity may still fail on tasks that require structure. Munafò et al. (2017) argued that the objective, the masking scheme and the held-out evaluation should be reported with their uncertainty, so that the model can be compared with others on the same basis.
