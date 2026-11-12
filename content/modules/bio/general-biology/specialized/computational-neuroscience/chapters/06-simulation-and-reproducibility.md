---
title: "Simulation and Reproducibility"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The practice of making neural simulations reproducible, covering the specification of the model in a standard machine-readable form, the version control of the code and the simulator, the fixing of random seeds that determine the connectivity and the noise, the dependence of results on numerical integration step and solver, the sharing of model code in public repositories with documentation, the testing of simulators against reference implementations, and the reporting of the software versions and the hardware on which a large simulation was run."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a neural simulation so that another group can rerun it, including the version of the software, the random seeds and the numerical settings."
  - "Explain how the numerical step size and the random seed can change a simulation's results and how to test that they do not change its conclusions."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A neural simulation can be reproduced only if every choice that affects its result is recorded. Peng (2011) argued that a computational result is reproducible only with the means of producing it, and for a simulation those means include the model code, the version of the simulator, the parameters and the seeds of the random number generators. Sandve et al. (2013) set out the same requirement as a general principle, and in computational neuroscience it has specific forms.

The model should be specified in a standard, machine-readable form so that it can be loaded and run without retyping. The version of the simulator must be recorded, since different versions can produce different results for the same model. The random seeds that determine the connectivity, the noise and the initial conditions must be fixed and reported, since a different seed can change the outcome of a stochastic network.

The numerical integration step and the solver affect the results, and a step that is too large can produce artefacts such as spurious spikes or instability. The result should be checked by repeating the simulation with a smaller step, and the conclusions should be shown to be insensitive to the numerical settings. Cumming (2014) argues that the variation across seeds should be reported with the result, since a single seed gives one sample of the variation.

Code should be shared in a public repository with documentation, and the simulators should be tested against reference implementations or known analytical results. Ioannidis (2005) described how a result that cannot be checked by others is of limited value, and the sharing of code allows the claims of a model to be tested. The software and the hardware used for large simulations should be reported, since the same program may run differently on different systems.
