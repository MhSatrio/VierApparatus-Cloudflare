---
title: "Coupling and Coarse-Graining"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The coupling of models at different scales and the coarse-graining that summarises fine detail for the coarser model, covering the averaging of a fine-scale simulation over space and time to produce the parameters of a coarse-scale model, the assumption of scale separation under which the averaging is valid and the test of whether that assumption holds, the propagation of fluctuations from the fine scale that the average discards, the bidirectional coupling in which the coarse scale also constrains the fine scale, the error introduced by each approximation and its accumulation along the chain, and the reporting of the coupling, the averaging procedure and the scale-separation test."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Derive the parameters of a coarse-scale model by averaging a fine-scale simulation and state the assumption of scale separation this requires."
  - "Test whether scale separation holds and state the error introduced when it does not."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Coupling passes information between scales, and coarse-graining is the procedure that summarises the fine scale for the coarse one. A fine-scale simulation is averaged over space and time, and the average is used to set the parameters of a coarser model. This is valid only under an assumption of scale separation, in which the fine dynamics are much faster or smaller than the coarse ones, so that the average is representative. Where the separation does not hold, the averaged parameters misrepresent the system, and the error can be large.

The test of scale separation compares the timescales or lengthscales of the two levels, and it should be made for each coupling rather than assumed. A coupling in which the fine process is not much faster than the coarse one cannot be averaged in the simple way, and an alternative representation may be needed. Ioannidis (2005) described how an assumption that is taken for granted can underlie a conclusion that is false, and the test makes the assumption visible.

Averaging discards fluctuations, and the fluctuations may matter for the coarse behaviour. A tissue-level response may depend on the variability among cells that the average does not carry. Where fluctuations are important, the coarse model must include them explicitly, for example through noise terms, and the choice should be justified. Cumming (2014) argues that the variability should be reported alongside the mean, since the mean alone can conceal the spread on which the behaviour depends.

Some couplings are bidirectional, so that the coarse scale also constrains the fine scale, as when tissue mechanics affects the behaviour of individual cells. Such couplings create feedback that must be handled with care, and their stability and convergence should be verified. Peng (2011) argued that the coupling procedure is part of the computational result and must be reproducible, and Munafò et al. (2017) argued that the error of each approximation should be reported so that readers can judge the accumulated uncertainty.
