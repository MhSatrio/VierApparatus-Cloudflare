---
title: "Reporting Multiscale Simulations"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of a multiscale simulation so that its scales, couplings, parameters, verification and uncertainty can be evaluated and reproduced, covering the statement of the scales and the representation at each, the description of each coupling with its averaging procedure and its scale-separation test, the parameters at each scale with the data used and their intervals, the verification and convergence studies with resolutions and tolerances, the propagated total uncertainty with its components and their contributions, the comparison with independent data at each scale and at the coupled level, the deposition of the code, the data and the random seeds with identifiers, and the statement of the conditions within which the simulation is claimed to be valid."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a multiscale simulation with its scales, couplings, verification and propagated uncertainty so that it can be reproduced."
  - "State the conditions within which the simulation is claimed to be valid and the scales it does not represent."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A multiscale simulation is a chain of models, and its report must show every link in the chain. The scales and the representation at each must be stated, together with the reasons for the choices. Munafò et al. (2017) argued that a model cannot be evaluated without knowing what it represents, and the list of scales is the basis of that evaluation.

Each coupling must be described with its averaging procedure and the test of its scale separation. A coupling whose assumptions are not stated cannot be checked, and the reader needs to know how each scale was summarised for the next. Peng (2011) argued that the procedure that produces a result must be reproducible, and the couplings are the procedures that connect the scales.

The parameters at each scale should be reported with the data used to estimate them and their intervals. The verification and convergence studies should accompany them, with the resolutions and tolerances used. Ioannidis (2005) described how the failure to report the numerical choices leaves a result impossible to assess, and the convergence studies show that the choices do not drive the answer.

The propagated total uncertainty should be reported with its components and their relative contributions, and the comparison with independent data should be given at each scale and for the coupled system. Cumming (2014) argues that each agreement and each uncertainty should be shown with its interval, so that the reader can judge the success of the model where it is claimed.

The code, the data and the random seeds should be deposited with identifiers, and the report should state the conditions within which the simulation is claimed to be valid. A multiscale model is valid only for the scales and conditions it represents, and the statement of these limits protects its users from applying it beyond its evidence.
