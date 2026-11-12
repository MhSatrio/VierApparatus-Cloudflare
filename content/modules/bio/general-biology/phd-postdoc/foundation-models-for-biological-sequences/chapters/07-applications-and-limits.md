---
title: "Applications and Limits"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The applications of foundation models for biological sequences and the limits that constrain them, covering the prediction of variant effects in which a model scores the consequence of a mutation, the annotation of function and of structure from sequence, the design of sequences with desired properties, the use in screening to prioritise candidates for experiment, the limits imposed by the quality and bias of the corpus, the difficulty of capturing epistasis, dynamics and context that depend on the cellular environment, the need to validate each application experimentally before it informs a decision, and the reporting of applications with the evidence and the uncertainty for each."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a sequence model is used to score the effect of a variant and state the experimental validation that the score requires."
  - "State the limits imposed on each application by the corpus and by the context that the sequence alone does not capture."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Foundation models are applied to variant effect prediction, in which a model scores how a mutation changes the likelihood or function of a sequence. Such scores are useful for prioritising variants, but a score is a prediction and not a measurement, and it must be validated experimentally before it informs a clinical or agricultural decision. Jumper et al. (2021) showed that sequence-derived models can carry structural information, and the same capacity makes their scores of mutation effects plausible, though plausibility is not proof.

Annotation of function and structure from sequence is a second application. The models can assign likely functions to uncharacterised proteins, and the assignments are hypotheses to be tested. Ioannidis (2005) described how annotations transferred between entries can propagate errors, and the reliability of each annotation should be reported with its uncertainty.

Sequence design uses the model to propose sequences with desired properties, and the proposals must be tested in the laboratory. A design that scores well on the model may fail when expressed, folded or assayed, and the gap between the score and the outcome is the central uncertainty of design. Cumming (2014) argues that the success rate of designs should be reported with its interval, since a few successes from a few attempts give a wide range.

The models have limits that the corpus cannot remove. Epistasis, in which the effect of one mutation depends on another, is difficult to capture from sequence statistics alone, and the dynamics and context that depend on the cellular environment are largely absent from the sequence. Munafò et al. (2017) argued that the limits of each application should be stated in the report, so that users know which decisions the model can support and which require data that the sequence does not contain.
