---
title: "Bayesian and Frequentist Comparison"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "A comparison of the Bayesian and the frequentist approaches to the same biological question, covering the different meanings of probability in each framework, the role of the prior in the Bayesian analysis and of the sampling design in the frequentist one, the agreement of the two when the prior is weak and the sample is large, the situations in which each is preferred, and the reporting of a result in a way that makes its framework and assumptions clear to the reader."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare the interpretation of a p-value and a posterior probability and state why they answer different questions."
  - "Explain when Bayesian and frequentist analyses of the same data give similar answers and when they diverge."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Bayesian and the frequentist approaches answer different questions from the same data, and a reader must know which question a report answers. The frequentist answers a question about the data given a hypothesis: how surprising are these data if the effect is zero. The Bayesian answers a question about the hypothesis given the data and a prior: how probable is the effect in the light of the evidence. Wasserstein and Lazar (2016) make the frequentist meaning of the p-value clear, and the posterior probability is the Bayesian counterpart with a different meaning and a different dependence on assumptions.

The two approaches agree in many simple cases. With a weak prior and a large sample, the posterior mean is close to the maximum likelihood estimate, and the credible interval is close to the confidence interval. The agreement is not guaranteed, and in small samples or with strong priors the two can differ substantially. A reader should not assume that a result from one approach will coincide with the other.

The approaches differ in what they require. The frequentist method relies on the sampling design and on the distribution of the statistic over repeated samples, and it needs no prior. The Bayesian method requires a prior, and its conclusions depend on the prior as well as the data. Gelman and Shalizi (2013) argue for the Bayesian model as a practical tool, checked against the data, and the choice between the approaches should follow the question and the available information.

Cumming (2014) argues that the estimate with its interval, which both frameworks can provide, is the most informative form of result, and it serves a reader of either tradition. The report should state the framework, the prior if one was used and the assumptions, so that the reader can judge the result on its own terms.

Sandve et al. (2013) recommended recording the framework and its assumptions, since a probability statement is interpretable only within its framework.
