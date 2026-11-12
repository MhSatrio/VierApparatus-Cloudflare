---
title: "Individual-Based Evolutionary Simulation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The simulation of evolution in populations of individuals with explicit genomes, reproduction, mortality and ecological interactions, covering the representation of an individual's genotype and its mapping to phenotype and fitness, the processes of mutation, recombination, reproduction and selection implemented in each generation, the population dynamics that emerge and that may not reach equilibrium, the stochastic variation between replicate runs and the number of runs needed for stable estimates, the sensitivity of outcomes to the mutation rate, the population size and the fitness landscape, the comparison of simulated outcomes with empirical patterns, and the reporting of the model, the seeds, the runs and the outcomes with uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify an individual-based evolutionary model with explicit genotype, fitness and reproduction and state the processes implemented each generation."
  - "Assess the stochastic variation between runs and report the outcome with an interval across replicates."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

An individual-based simulation represents each organism with its own genotype, and it allows evolution to be followed in a population that is not assumed to be at equilibrium. The genotype is mapped to a phenotype and then to fitness, and each generation applies mutation, recombination, reproduction and selection. The population dynamics that emerge can be complex, and they may not settle into a steady state, so the outcome depends on the time at which it is observed. Ioannidis (2005) described how an outcome observed at one moment can be mistaken for a stable result, and the time course must be examined.

The stochastic variation between replicate runs is large in small populations and in populations with strong drift. Each run is a single realisation, and the distribution of outcomes across runs is the quantity of interest. The number of runs needed for a stable estimate of the outcome should be determined, and the outcome should be reported with its interval across replicates. Cumming (2014) argues that the variation between runs is itself informative, and the mean alone conceals it.

Outcomes are sensitive to the mutation rate, the population size and the shape of the fitness landscape, and these sensitivities must be tested. A result that holds only for one mutation rate or one landscape is a property of the chosen parameters rather than of the process. The sensitivity analysis should be reported, including the parameter ranges, so that the robustness of the conclusion is visible.

Simulated outcomes can be compared with empirical patterns, such as the distribution of genetic diversity or the pattern of adaptation across populations. The comparison must account for the fact that many models can produce similar patterns, and a match with the data does not identify the process uniquely. Munafò et al. (2017) argued that the model, its settings and its outcomes should be deposited, so that the comparison can be checked. Peng (2011) argued that the random seeds are part of the record needed to reproduce each run.
