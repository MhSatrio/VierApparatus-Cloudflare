---
title: "Computation by Sampling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Computing posterior distributions for models without a closed form by sampling methods such as Markov chain Monte Carlo, the idea of generating a chain of parameter values whose long-run distribution is the posterior, the burn-in that discards the early values, the diagnostics that check the chain has converged and mixed, the effective sample size that accounts for the correlation of successive samples and the reporting of the computation so that a result can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a Markov chain Monte Carlo sampler produces draws from a posterior distribution and why the draws must be checked for convergence."
  - "Report the convergence diagnostics and effective sample size of a sampled posterior and state the settings of the computation."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Most Bayesian models have posteriors that cannot be written in closed form, and they are explored by sampling. A Markov chain Monte Carlo method generates a sequence of parameter values, each depending only on the previous one, so constructed that its long-run distribution is the posterior. The draws from the chain are then summaries of the posterior: their mean gives the posterior mean and their quantiles give the credible intervals. Gelman and Shalizi (2013) describe the role of such computation in the practice of Bayesian analysis.

The early part of a chain depends on its starting values, and it is discarded as burn-in. The chain must then have converged to the posterior, which is checked with diagnostics that compare several chains started from different points. If the chains disagree, the sampling has not converged, and the summaries from them are not the posterior. A chain that is stuck in one region of the parameter space gives a precise but wrong summary.

Successive draws are correlated, so the number of independent samples is smaller than the number of draws. The effective sample size accounts for this correlation, and it is the figure that determines the precision of the summaries. A report should give the effective sample size for the quantities of interest, since a posterior summary based on few effective samples is unreliable even when the chain looks long.

The computation is software, and software must be tested. Taschuk and Wilson (2017) recommended that research software be tested and documented, and a sampler should be checked on a model with a known posterior before it is trusted on the real data.

Sandve et al. (2013) recommended recording the software, the number of chains, the burn-in, the seeds and the diagnostics, since a sampled posterior can be reproduced only with these settings.
