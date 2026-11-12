---
title: "Convergence and Statistical Error"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the convergence of a simulated property is judged, including the block-averaging and the autocorrelation time that set the effective number of independent samples, the comparison of replicates and the sensitivity of a property to the length of the simulation, the statistical error that follows from correlated frames and the reasons a property that has not converged must be reported as such rather than as a settled value."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the statistical error of a simulated average from its autocorrelation or by block averaging."
  - "Judge whether a property has converged by comparing replicates and by its dependence on the length of the run."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A simulated average is an estimate from a sample, and its reliability depends on how many independent samples the trajectory contains. Consecutive frames are correlated, since the system changes little between them, and a trajectory of a million frames may contain far fewer independent configurations. The autocorrelation time measures how long a property takes to decorrelate, and the number of effectively independent samples is the length of the trajectory divided by this time. The statistical error of an average follows from this effective number, not from the raw frame count.

Block averaging is a practical way to estimate the error. The trajectory is divided into blocks that are long enough to be roughly independent, the average of each block is computed, and the spread of the block averages gives the error. The error should stop growing as the block length increases, and a continuing increase shows that the blocks are still correlated and the length is too short.

Convergence asks whether the average has settled. A property that changes when the run is extended, or that differs between the first and second halves of the trajectory, has not converged, and its value should not be reported as settled. Replicates provide a stronger test: independent runs from different starting velocities should give the same average within the statistical error.

Platt (1964) recommended comparing a conclusion with its alternatives, and a property that differs between replicates has an alternative explanation in the failure of sampling. The disagreement between replicates is itself a result, and it should be reported rather than hidden by pooling.

Ioannidis (2005) described how a result that rests on too little evidence can appear firm, and a simulated average from an unconverged run is such a result. Taschuk and Wilson (2017) recommended that the analysis of research software be tested, and the error estimate should be checked against a known case. Sandve et al. (2013) recommended recording the methods of error estimation, since the uncertainty is part of the result.
