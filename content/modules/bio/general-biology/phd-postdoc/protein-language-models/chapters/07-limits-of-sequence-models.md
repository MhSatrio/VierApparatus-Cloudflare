---
title: "Limits of Sequence-Only Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The limits of protein language models that learn from sequence alone, covering the absence of the environment in which a protein acts, including binding partners, post-translational modifications, pH, membrane context and cellular localisation, the inability of sequence statistics to capture dynamics and conformational change, the difficulty of predicting effects that depend on several mutations acting together, the effect of sparse evolutionary sampling on rare proteins, the tendency of a model to predict a plausible sequence that is not stable or expressible, and the importance of stating these limits so that users apply the model where its evidence supports it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the properties of a protein that a sequence-only model cannot capture and state the decisions that these omissions make unreliable."
  - "Explain why a plausible sequence may not be stable or expressible and state the experiment that tests it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
---

A protein language model learns from sequence alone, and a sequence is only part of what determines how a protein behaves. The environment in which the protein acts, including its binding partners, its post-translational modifications, the pH, the membrane and the cellular compartment, is largely absent from the sequence. Predictions that depend on these factors are beyond the model's reach, and the limit is structural rather than a matter of training. LeCun et al. (2015) noted that learned representations are only as informative as their inputs, and the sequence does not contain the context.

Dynamics and conformational change are also largely absent. A sequence model gives one representation for a protein, while the function may depend on its movement between states. Effects that depend on several mutations acting together, which is epistasis, are difficult to capture from the statistics of natural sequences, because the combinations that would reveal them are rarely observed. Ioannidis (2005) described how a model that captures the average pattern may fail on the cases that depend on interactions, and the report should say so.

Sparse evolutionary sampling limits the performance on rare proteins, for which few related sequences exist. The model's predictions for such proteins rest on little information, and their uncertainty should be reported as higher. Cumming (2014) argues that the interval of a prediction should widen as the information behind it narrows, and a claim of precision for rare proteins should be treated with suspicion.

A model can propose a sequence that is plausible under its likelihood but that does not fold, is not stable or cannot be expressed in the cell. Plausibility is not function, and the proposed sequence must be tested experimentally before it is trusted. Munafò et al. (2017) argued that these limits should be stated clearly, so that users apply the model where its evidence supports its predictions. Stating the limits is part of responsible use, and it prevents a reader from taking a likelihood for a result.
