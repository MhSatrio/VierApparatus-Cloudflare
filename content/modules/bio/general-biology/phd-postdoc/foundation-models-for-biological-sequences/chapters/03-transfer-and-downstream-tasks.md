---
title: "Transfer to Downstream Tasks"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The transfer of a pretrained sequence representation to downstream prediction tasks with limited labelled data, covering the frozen-embedding approach in which a small model is trained on fixed representations, the fine-tuning approach in which the pretrained weights are adjusted for the task and the risk of overfitting when labels are few, the linear probe as a test of what the representation already encodes, the comparison with a baseline trained from scratch and with a simple feature set, the learning curves that show how performance grows with the number of labels, and the reporting of transfer performance with intervals across splits and seeds."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose between a frozen embedding and fine-tuning for a downstream task and state the overfitting risk of each when labels are few."
  - "Use a linear probe and a learning curve to show what a pretrained representation contributes beyond a baseline."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
---

A pretrained representation is valuable when it allows a task to be learned from few labels, and the transfer must be evaluated against the alternatives. The representation can be used frozen, with a small model trained on its embeddings, or it can be fine-tuned, with its weights adjusted for the task. LeCun et al. (2015) described how learned features can be reused across tasks, and the choice between freezing and fine-tuning determines how much of the pretrained knowledge is retained.

Fine-tuning can overfit when labels are few, because a large model adjusted to a small set will fit the particular examples rather than the general relation. A frozen representation with a small head is more robust in this regime, and it is often the better choice for small datasets. Ioannidis (2005) described how a model that fits its training examples can appear successful while learning nothing general, and the choice must be justified by the evaluation on held-out data.

The linear probe, a linear model trained on the frozen embedding, tests what the representation already encodes about the task. If a linear probe performs well, the information is present in the representation, and if it does not, the representation lacks it. The probe is a more honest test than fine-tuning, which can add capacity that makes any representation look useful.

A pretrained representation must be compared with a baseline trained from scratch and with a simple feature set. The learning curve, which shows how performance grows with the number of labels, reveals whether the representation helps most when labels are scarce. Cumming (2014) argues that the difference between the representation and the baseline should be reported with its interval across splits and seeds, since a small difference may be within the variation between runs.
