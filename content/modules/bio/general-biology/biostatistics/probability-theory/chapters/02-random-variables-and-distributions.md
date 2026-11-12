---
title: "Random Variables and Distributions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How a random variable assigns a number to each outcome of a biological process, the difference between discrete and continuous variables, the probability mass function of a discrete variable and the probability density function of a continuous one, the cumulative distribution and how it gives the probability of a range, and the role of the distribution as the model that connects a sample to the process that produced it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Classify a biological variable as discrete or continuous and state the kind of distribution that describes it."
  - "Use a cumulative distribution to find the probability that a variable falls within a range."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A random variable is a rule that assigns a number to each possible outcome of a process. The number of colonies on a plate, the height of a plant and the concentration of a protein in a sample are all random variables, since each takes different values in different samples. A discrete variable takes values from a countable set, such as the integers for a count, and a continuous variable takes any value in an interval, such as a length or a concentration. The distinction determines which distribution is appropriate.

A discrete variable has a probability mass function, which gives the probability of each value. The probabilities are non-negative and sum to one. A continuous variable has a probability density function, and the probability of any single exact value is zero. Instead, the probability of a range is the area under the density over that range. This is the reason a continuous measurement is always reported as an interval or with a tolerance.

The cumulative distribution function gives the probability that the variable is at most a given value. It rises from zero to one as the value increases, and the probability of a range is the difference between the cumulative values at its ends. Cumulative distributions underlie many biological calculations, such as the proportion of individuals below a threshold.

A distribution is a model of how a process generates its values. Wasserstein and Lazar (2016) note that the statistical inferences of a study depend on such models, and the choice of distribution must be justified by the process that generated the data, not by convenience. The next chapters describe the distributions most used in biology and the conditions under which each applies.

Sandve et al. (2013) recommended that the assumptions of an analysis be recorded, and the distribution assumed for each variable is one of its most important assumptions.
