---
title: "Probability in Biological Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the probability models of the earlier chapters are chosen and checked for biological data, the matching of a distribution to the process that generated the data, the use of simulation to explore a model when no formula is available, the recognition that a model is an approximation and the habit of stating the model with every result so that its assumptions can be judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a probability model for a biological variable by considering the process that generated it and check the choice against the data."
  - "Use a simulation from a stated model to examine how a statistic behaves when the model is true."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Mortazavi, A., Williams, B. A., McCue, K., Schaeffer, L., & Wold, B. (2008). Mapping and quantifying mammalian transcriptomes by RNA-Seq. Nature Methods, 5(7), 621-628. https://doi.org/10.1038/nmeth.1226"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A probability model is chosen from the process that generated the data. A count of events in a fixed time, with events occurring independently at a steady rate, suggests the Poisson distribution, and a measurement that results from many small independent effects suggests the normal. A sequencing count with biological variation between replicates suggests a model that allows overdispersion. The choice is an argument about the biology, and the chapters on counts and on the normal distribution describe the arguments for the main cases.

A model must be checked against the data. A histogram of the observations, a comparison of their mean and variance and a plot of their quantiles against the model show whether the chosen distribution fits. The check does not prove the model, but a clear departure, such as a variance much larger than the mean for a Poisson variable, shows that the model is wrong. Mortazavi et al. (2008) reported read counts that vary more between replicates than a simple count model would predict, and the check revealed the need for a richer model.

Simulation is a practical tool when a formula is unavailable. A model with stated parameters is used to generate many simulated datasets, the statistic of interest is computed for each, and the distribution of the statistic is examined. This shows how the statistic behaves when the model is true, and it is the means of checking whether a method controls its error rate. A method that rejects the true null hypothesis more often than its stated rate is misleading, and simulation reveals this.

A model is always an approximation. Ioannidis (2005) described how the assumptions of a model, and the flexibility with which a model is chosen, can produce conclusions that are less secure than they appear, and the honest use of a model includes a statement of the assumptions and the sensitivity of the conclusion to them.

Wasserstein and Lazar (2016) advise that statistical conclusions be drawn with an awareness of their context and assumptions, and Sandve et al. (2013) recommended that the model and its checks be recorded with each result.
