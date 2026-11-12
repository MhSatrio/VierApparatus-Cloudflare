---
title: "Bayesian Statistics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Bayesian statistical modelling for biological data, covering the specification of a model with priors on its parameters, the computation of posterior distributions by sampling methods, the summaries of the posterior through credible intervals and posterior probabilities of effects, the choice and sensitivity of priors, the hierarchical models that share information across groups, the checking of a Bayesian model against the data through posterior predictive checks and the reporting that lets a reader judge the priors and the computation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a Bayesian model for a biological comparison with stated priors and describe the posterior it implies."
  - "Check a Bayesian model against the data and test the sensitivity of the conclusion to the prior."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Bayesian statistics treats every unknown quantity as a random variable with a probability distribution, and it updates that distribution with the data. The prior distribution states what is believed before the data are seen, the likelihood describes how the data depend on the parameters, and the posterior distribution, obtained by combining the two, states what is believed after. Gelman and Shalizi (2013) discuss the philosophy and the practice of this approach, and they argue that the models used in practice are checked against the data rather than accepted on the strength of the prior.

The topic covers the specification of a Bayesian model, the computation of the posterior, the summaries that answer biological questions, the role of the prior, the hierarchical models that share information among groups and the checks that a model must pass. The advantage of the approach is that it gives direct probability statements about parameters and it handles complex hierarchical structures. Its cost is that every conclusion depends on the prior and on the computation, and both must be reported.

Wasserstein and Lazar (2016) observe that a p-value does not give the probability that a hypothesis is true, while a posterior does, given the prior. This makes the Bayesian approach attractive, but the probability is only as credible as the prior, and a reader must be able to see and judge it. Ioannidis (2005) described how the prior probability of a relationship determines how far a finding can be believed, and a Bayesian analysis makes this prior explicit.
