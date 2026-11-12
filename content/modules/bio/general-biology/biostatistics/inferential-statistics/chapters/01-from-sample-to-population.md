---
title: "From Sample to Population"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The logic by which a sample supports inference about a population, the population and the sampling frame, random sampling and its guarantee that the sample represents the population on average, the sources of bias such as non-response and convenience sampling and the stratified and clustered designs used in biology, together with the reason that a biased sample yields a precise but wrong estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the population, the sampling frame and the sample for a biological study and identify the gap between them."
  - "Explain why random sampling supports inference and why a convenience sample can give a precise but wrong estimate."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The population is the whole set of units about which a study wants to draw a conclusion, such as all the individuals of a species in a region or all the cells of a tissue at a given age. The sampling frame is the list from which the sample is actually drawn, and it is often a subset of the population: the individuals that could be caught, the patients who attended a clinic or the cells that survived a preparation. The gap between the population and the frame is the first place where inference can fail, and a study must state it.

Random sampling is the design that makes inference valid. When every unit of the frame has a known chance of selection, the sample mean is an unbiased estimate of the population mean, and the uncertainty of the estimate can be computed from the sampling distribution described in the probability topic. Randomness is what allows the sample to stand for the population, since it means that the sample is not systematically different from the whole.

Convenience sampling breaks this guarantee. A sample of the individuals that were easiest to recruit may differ from the population in age, health or behaviour, and the estimate computed from it is biased. Such an estimate can be very precise, with a narrow interval, and still be wrong. Cumming (2014) emphasises that a narrow interval is not evidence of an accurate estimate, and the precision of a biased sample is a misleading guide to its reliability.

Biology uses structured designs. Stratified sampling takes a random sample within each stratum, such as each age group, so that the strata are represented in proportion or deliberately overrepresented. Clustered sampling takes whole groups, such as litters or sites, and requires an analysis that accounts for the correlation within the clusters. Each design is valid when analysed as designed, and an analysis that ignores the design treats clustered observations as independent and understates the uncertainty.

Ioannidis (2005) described how selection and bias in the choice of subjects make findings less reliable, and the sampling frame is a form of selection that the report must describe. Sandve et al. (2013) recommended recording how the sample was drawn, and the frame, the design and the rate of non-response are the record of a sample.
