---
title: "Verification and Convergence"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The verification of a multiscale simulation chain, covering the testing of each solver against an analytical or manufactured solution, the convergence of each numerical method as the resolution is refined, the convergence of the coupled chain as the coupling interval is shortened, the separate check that the coupled result does not depend on the order in which the models are updated, the stochastic convergence of averages as the number of runs increases, the detection of numerical artefacts that mimic biological patterns, and the reporting of the convergence studies with the resolutions and tolerances used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Verify a numerical solver against a known solution and show convergence as resolution is refined."
  - "Check that a coupled chain does not depend on the coupling interval or the update order and report the convergence studies."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Verification establishes that the computation is correct, and it must precede any claim about the biology. Each solver is tested against a solution that is known, either analytical or manufactured, and its error is shown to decrease at the expected rate as the resolution is refined. A solver that does not converge cannot be trusted for the complex case, whatever its appearance. Ioannidis (2005) described how errors in the computation can produce results that look like biology, and the verification is the defence.

The coupled chain must also converge. As the coupling interval is shortened, the result should approach a limit, and a result that changes substantially with the interval is not yet a result. The order in which the models are updated can also affect the outcome, and the independence of the result from this order must be checked. Cumming (2014) argues that the change in the output with each refinement should be reported with its interval, since a change within the noise is not evidence of non-convergence.

Stochastic averages converge as the number of runs increases, and the number of runs needed for a given precision should be calculated and verified. An average that has not converged is an estimate with an unknown error, and its interval must reflect the remaining uncertainty. Peng (2011) argued that the number of runs and the convergence criterion must be recorded, so that the average can be reproduced.

Numerical artefacts can mimic biological patterns, such as oscillations that arise from the discretisation rather than the biology. The check is to refine the resolution and see whether the pattern persists. A pattern that disappears on refinement is an artefact and should not be reported as biology. Munafò et al. (2017) argued that the convergence studies, with the resolutions and tolerances used, should be reported, so that readers can judge whether the patterns are robust to the numerical choices.
