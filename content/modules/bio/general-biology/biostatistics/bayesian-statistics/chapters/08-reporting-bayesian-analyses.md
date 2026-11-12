---
title: "Reporting Bayesian Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a Bayesian analysis must contain for the posterior and its conclusions to be checked and repeated, including the model and its likelihood, the priors with their justification and sensitivity analysis, the software and the sampling settings, the convergence diagnostics and effective sample sizes, the posterior summaries with their credible intervals, the posterior predictive checks and the deposition of the data, the model code and the sampled draws."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a Bayesian report must contain for another group to repeat the sampling and check its convergence."
  - "Report the priors with their sensitivity analysis and the posterior with its diagnostics and credible intervals."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A Bayesian result is a posterior, and it depends on a model, a prior and a computation, each of which must be reported for the posterior to be checked. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a Bayesian analysis these means include the model code, the priors and the sampler's settings. A posterior summary reported without these cannot be reproduced, and a reader cannot judge how far the prior or the computation shaped it.

The model and the priors are the first item. The likelihood, the priors on every parameter with their justification and the results of a sensitivity analysis should be given. Gelman and Shalizi (2013) describe the priors as part of the model, and their influence must be shown.

The computation is the second item. The software and its version, the number of chains, the burn-in, the number of draws, the seeds and the convergence diagnostics should be reported with the effective sample size of each quantity of interest. Sampling without these details cannot be repeated or verified.

The results are the third item. The posterior summaries should be reported with their credible intervals, and the posterior probabilities of effects with the thresholds used. Wilkinson et al. (2016) set out the principles under which the outputs should be findable and reusable, and the deposition of the draws and the model code meets them.

The checks are the fourth item. The posterior predictive checks and the test quantities used should be reported with their outcomes, since a model without a check is not shown to fit the data. Sandve et al. (2013) recommended keeping the outputs of an analysis with its inputs and steps, and a deposited model, its data and its draws complete the record.
