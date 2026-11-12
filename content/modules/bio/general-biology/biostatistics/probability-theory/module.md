---
title: "Probability Theory"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The probability theory that underlies biological data analysis, covering what probability means, random variables and their distributions, the binomial and Poisson distributions that describe counts, the normal distribution and the central limit theorem that justify many methods, conditional probability and Bayes' theorem with its use in interpreting diagnostic and screening results, expectation and variance, and the sampling distributions that connect a sample to the population from which it was drawn."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a random variable and the distribution that models a biological count or measurement."
  - "Apply Bayes' theorem to a screening test and explain why a positive result is not the same as a high probability of disease."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Probability is the language in which biological data are described. A measurement that varies from one organism to another, a count of cells that varies from one field of view to the next and an outcome that occurs in some individuals and not others are all treated as random variables, and the distribution of each variable is the model of its variation. Every statistical method in the topics that follow rests on assumptions about these distributions, and an analyst who does not understand them cannot judge whether a method applies.

The topic builds from the meaning of probability through the distributions most used in biology to the results that make sampling-based inference possible. The binomial and Poisson distributions model counts, the normal distribution models many continuous measurements, and the central limit theorem explains why averages of many measurements are approximately normal even when the measurements are not. Conditional probability and Bayes' theorem show how a probability changes with evidence, which is essential for interpreting screening tests.

The reasoning of probability is often misapplied in biology. Ioannidis (2005) showed, using Bayesian reasoning about the prior odds of a true relationship, how the probability that a published finding is true depends on the study's power and on the number of relationships examined. The topic uses such examples to show that the probability of a result given a hypothesis is not the probability of the hypothesis given a result, a distinction that Wasserstein and Lazar (2016) also stress in their statement on p-values.
