---
title: "Conditional Probability and Bayes' Theorem"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Conditional probability as the probability of an event given that another has occurred, Bayes' theorem that relates the probability of a hypothesis given data to the probability of the data given the hypothesis, the use of sensitivity, specificity and prevalence to interpret a screening result and the positive predictive value that Ioannidis used to show why most positive findings in a field of low prior odds may be false."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the probability of disease given a positive screening test from its sensitivity, specificity and prevalence."
  - "Explain why a low prior probability makes a positive result less informative and relate this to the positive predictive value of research findings."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Conditional probability is the probability of one event given that another has occurred. It is written as the probability of A given B, and it is calculated as the probability that both occur divided by the probability of B. Bayes' theorem rearranges this relation so that the probability of a hypothesis given the data is expressed in terms of the probability of the data given the hypothesis, the prior probability of the hypothesis and the probability of the data overall. The theorem is the formal means of updating belief with evidence.

A screening test shows the theorem at work. A test with high sensitivity detects most people who have a condition, and a test with high specificity clears most people who do not. Yet a positive result from a rare condition can still be more likely to be a false positive than a true one, because the healthy majority produces many false positives. The probability that a person with a positive result has the condition is the positive predictive value, and it depends strongly on the prevalence, which is the prior probability of the condition.

Ioannidis (2005) applied the same reasoning to research findings. He treated the probability that a claimed relationship is true as a prior odds, which depends on how many relationships a field tests and how many of them are true, combined with the power of the studies and the bias in their reporting. In fields where most tested relationships are false, a positive finding has a low positive predictive value even when the test has a conventional significance threshold, and this is the basis of his title.

Wasserstein and Lazar (2016) make the same distinction in the context of p-values: the probability of data given a hypothesis is not the probability of the hypothesis given the data. A significant result does not, on its own, give the probability that the effect is real, since that probability depends on the prior.

Sandve et al. (2013) recommended recording the assumptions of an analysis, and the prior probability and the error rates used in a Bayesian interpretation are assumptions that must be stated with any conclusion that depends on them.
