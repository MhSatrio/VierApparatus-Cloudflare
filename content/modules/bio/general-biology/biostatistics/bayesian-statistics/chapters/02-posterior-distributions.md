---
title: "Posterior Distributions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The posterior distribution as the combination of a prior and a likelihood by Bayes' theorem, the conjugate priors that give a posterior of the same family for simple models such as the beta-binomial for a proportion and the normal-normal for a mean, the posterior mean and the posterior probability of an effect exceeding a threshold, the interpretation of the posterior as a complete description of the parameter's uncertainty and the difference between this and a single point estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the posterior distribution of a proportion from a beta prior and a binomial count and state its mean."
  - "Compute the posterior probability that an effect exceeds a stated threshold and explain what it means."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The posterior distribution is the result of a Bayesian analysis. It is the distribution of the parameter given the data, obtained by multiplying the prior by the likelihood and normalising, which is Bayes' theorem applied to parameters. For some models the posterior has a closed form. A beta prior on a proportion, combined with a binomial count of successes, gives a beta posterior, and a normal prior on a mean, combined with normal data, gives a normal posterior. Such priors are called conjugate, because the posterior remains in the family of the prior.

The posterior mean is a natural point summary, and for a beta posterior it is the weighted average of the prior mean and the observed proportion, with the weights set by the prior's strength and the sample size. The posterior is a complete description of the uncertainty about the parameter, and a single number such as the mean or the mode summarises only part of it. A report should show the spread of the posterior, through a credible interval or the full distribution.

The posterior permits direct probability statements. The posterior probability that an effect exceeds a threshold, such as a difference that matters biologically, is the area of the posterior beyond the threshold, and it is a probability about the parameter given the data and the prior. Gelman and Shalizi (2013) describe this form of inference, and Wasserstein and Lazar (2016) contrast it with the p-value, which is a probability about the data.

Sandve et al. (2013) recommended recording the prior, the likelihood and the resulting posterior, since each is needed to reproduce the posterior summary.
