---
title: "Choosing Scales and Representations"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The choice of the spatial and temporal scales that a multiscale simulation must represent and the representation used at each scale, covering the identification of the scales on which the question depends and of the scales that can be averaged over, the choice between continuum, discrete stochastic, agent-based and molecular representations according to the number of components and the relevance of individual fluctuations, the match between the representation and the data available at that scale, the consequences of an inappropriate representation for the predictions, the cost of each representation and its scaling with system size, and the reporting of the scales, the representation chosen and the justification for each."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the scales on which a question depends and the scales that can be averaged over without losing the answer."
  - "Justify the representation at each scale by the number of components, the role of fluctuations and the data available."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Choosing the scales is the first decision in a multiscale simulation, and it determines much of what follows. The scales on which the question depends must be represented explicitly, while those that can be averaged over without losing the answer may be summarised. A simulation that represents every scale in full is rarely feasible, and one that omits a scale that matters will give a wrong answer with confidence. Ioannidis (2005) described how a model that omits a relevant factor can appear adequate, and the choice of scales should be argued from the question.

The representation at each scale depends on the number of components and on the role of fluctuations. A continuum representation, in which concentrations vary smoothly, is efficient when many molecules are present and their fluctuations are unimportant. A discrete stochastic representation is needed when a few molecules determine the outcome, and an agent-based representation is useful when the behaviour of individuals generates the pattern. The choice must be stated and justified.

The representation must match the data available at that scale, since a sophisticated representation with no data to parameterise it adds uncertainty rather than precision. Cumming (2014) argues that the representation should be chosen so that its parameters can be estimated with an interval that serves the question, and a representation whose parameters cannot be estimated is not useful.

An inappropriate representation can produce predictions that are wrong in a systematic way, and the consequences should be examined by comparing representations on a test case where the answer is known. The cost of each representation and its scaling with system size determine what can be simulated, and the trade-off should be reported. Munafò et al. (2017) argued that the scales and the representations should be reported with the reasons for each choice, so that the model can be evaluated on its own terms.
