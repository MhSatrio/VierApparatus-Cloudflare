---
title: "Likelihood and Maximum Likelihood"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The likelihood function as the probability of the observed data viewed as a function of the parameters, the maximum likelihood estimate as the parameter value that makes the data most probable, the way likelihood underlies the fitting of biological models including the distribution of counts and the sequence substitution models of phylogenetics, the use of likelihood ratios to compare models and the difference between a likelihood and a probability that a parameter takes a given value."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the likelihood of a set of biological observations under a simple model and find its maximum by calculation."
  - "Explain the difference between a likelihood and a probability and why a likelihood ratio compares models."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Nguyen, L.-T., Schmidt, H. A., von Haeseler, A., & Minh, B. Q. (2015). IQ-TREE: A Fast and Effective Stochastic Algorithm for Estimating Maximum-Likelihood Phylogenies. Molecular Biology and Evolution, 32(1), 268-274. https://doi.org/10.1093/molbev/msu300"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The likelihood of a set of observations is the probability of those observations written as a function of the parameters of the model. The observations are fixed, and the parameters are varied to see which values make the data most probable. The value that maximises the likelihood is the maximum likelihood estimate. For a binomial count, for example, the likelihood of the observed number of successes, viewed as a function of the success probability, is largest at the observed proportion, and that is the estimate.

Likelihood is the foundation of many biological models. In phylogenetics the likelihood of the sequences given a tree and a substitution model is maximised over trees, and Nguyen et al. (2015) describe a search that finds the tree of highest likelihood, while Felsenstein (1985) is cited for the bootstrap that measures the uncertainty of such trees. The same principle, that the best parameters make the observed data most probable, fits models of counts, growth rates and dose responses, and it gives the estimates that most biological software reports.

A likelihood is not a probability of the parameter. The likelihood of a parameter value is the probability of the data under that value, and it does not say how probable the value is. Treating a likelihood as a probability of the hypothesis is the same error as reading a p-value as the probability of the null hypothesis, which Wasserstein and Lazar (2016) warn against.

The ratio of two likelihoods compares two models, and a large ratio favours the model in the numerator. The likelihood ratio is the basis of a formal test, and the difference between the maximum log likelihoods of nested models is referred to a chi-squared distribution for large samples. The approximation is good only for large samples and regular models, and a biological model with a parameter at a boundary, such as a probability at zero, departs from it.

Sandve et al. (2013) recommended recording the model whose likelihood was maximised and the software used, since the estimate depends on the model it was fitted to.
