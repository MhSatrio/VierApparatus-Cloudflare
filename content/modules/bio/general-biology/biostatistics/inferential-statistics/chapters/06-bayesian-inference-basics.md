---
title: "Bayesian Inference Basics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Bayesian approach to inference, in which a prior distribution over a parameter is combined with the likelihood of the data to give a posterior distribution, the interpretation of the posterior as the probability of the parameter given the data, the credible interval as its Bayesian counterpart to the confidence interval, the influence of the prior on small samples and the use of the posterior predictive distribution to check a model against the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Combine a prior distribution with a likelihood to obtain a posterior distribution for a simple biological parameter."
  - "Explain how a credible interval differs from a confidence interval and how the prior influences the result in a small sample."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Bayesian inference treats the parameter of a model as uncertain and describes that uncertainty with a probability distribution. Before the data are seen, the analyst states a prior distribution that reflects what is known. The likelihood of the data, described in the previous chapter, is combined with the prior by Bayes' theorem to give the posterior distribution, which expresses the probability of each parameter value given the data and the prior. The posterior is the object of interest, and it can be summarised by its mean or by an interval.

The interpretation is direct. The posterior is a probability distribution over the parameter, and a statement that the parameter lies in a given range has a probability, which is the statement a reader often wants to make. The credible interval is the range that contains a stated posterior probability, and it is the Bayesian counterpart of the confidence interval. Its meaning is the one that readers usually attach to a confidence interval, which is why the difference is worth stating.

The prior matters most when the data are few. A prior that is strongly concentrated on a value pulls the posterior toward it, and a vague prior leaves the posterior close to the likelihood. The choice of prior is therefore an assumption that must be justified and its influence examined, since a conclusion that depends strongly on the prior is only as secure as the prior.

Ioannidis (2005) described how the prior probability of a relationship determines how far a positive finding can be believed, and a Bayesian analysis makes that prior explicit. Wasserstein and Lazar (2016) observe that a p-value does not supply the probability of a hypothesis, and the posterior supplies it only when the prior is accepted as a statement of belief.

Cumming (2014) argues for estimation with intervals, and the credible interval is an interval of this kind. The posterior predictive distribution, which gives the distribution of new data under the fitted model, is a check of the model against the data that were observed.

Sandve et al. (2013) recommended recording the prior, the likelihood and the checks, since a Bayesian result is a product of all three.
