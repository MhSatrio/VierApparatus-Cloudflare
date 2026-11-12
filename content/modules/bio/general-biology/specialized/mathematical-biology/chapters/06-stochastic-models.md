---
title: "Stochastic Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Stochastic models of biological populations and processes in which chance events such as births, deaths and infections occur at random, the difference between a deterministic model that gives the average trajectory and a stochastic model that gives a distribution of outcomes, the risk of extinction in small populations that a deterministic model cannot capture, the branching process that describes the early stage of an outbreak, the Gillespie algorithm that simulates the random sequence of events in a well-mixed system, and the reporting of stochastic results as distributions with the number of simulations on which they are based."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a deterministic model cannot capture the risk of extinction in a small population and state the stochastic model that can."
  - "Describe the branching process used for the early stage of an outbreak and state how its extinction probability is interpreted."
references:
  - "Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character, 115(772), 700-721. https://doi.org/10.1098/rspa.1927.0118"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A deterministic model describes the average behaviour of a population, and for large populations this average is a good guide to what happens. In small populations chance dominates, and a population may die out even when the average trajectory predicts persistence. Kermack and McKendrick (1927) worked with the deterministic average, and the stochastic counterpart of their model describes the distribution of possible epidemics, including the chance that an outbreak fails to take hold at all.

A stochastic model represents each event, such as a birth, a death or an infection, as a random occurrence with a rate. The state of the population changes at random times, and the same model produces different trajectories in different runs. The result is a distribution over outcomes rather than a single curve, and the distribution is essential when the question concerns the probability of an event such as extinction or a large outbreak.

The early stage of an outbreak is well described by a branching process, in which each infected individual produces a random number of new infections. The probability that the lineage dies out is the extinction probability, which depends on the mean and the variance of the offspring number. An outbreak that begins with a single case may fail to spread even when the average reproduction number exceeds one, and this is an important result for the interpretation of early cases.

The Gillespie algorithm simulates the random sequence of events in a well-mixed system by choosing the next reaction and its time from the rates of all reactions. It is exact for the model it simulates, and it is used for biochemical networks as well as populations. The stochastic results must be reported as distributions, with the number of simulations on which they are based, and the probabilities should be given with their intervals. Cumming (2014) argues that the intervals should be shown, and Sandve et al. (2013) recommended recording the random seeds and the number of runs.
