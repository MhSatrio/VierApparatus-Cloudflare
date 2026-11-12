---
title: "Advanced Evolutionary Modeling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Advanced mathematical and computational models of evolution at doctoral and postdoctoral level, covering the population genetic models that describe the change of allele frequency under selection, drift, mutation and migration, the coalescent theory that describes the genealogy of a sample and allows inference of demographic history, the models of phylogenetic inference and of the tempo of diversification, the individual-based simulation of evolution with explicit genomes and ecological interactions, the likelihood and Bayesian inference of selection and demography from sequence data, the testing of models against data with simulation-based calibration, and the reporting of the models, the assumptions, the inference and the uncertainty of each estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the coalescent model of a sample and state how it is used to infer demographic history."
  - "Test an evolutionary inference method with simulations in which the true parameters are known and report its calibration."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Evolutionary models describe how the genetic composition of populations changes and how the genealogy of a sample reflects the history of the population. At the advanced level these models are used to infer evolution as well as to describe it, estimating the strength of selection, the demographic history and the rates of diversification from the sequences that are observed. The inference is powerful and also easily mistaken, since a model that fits the data may be the wrong model, and the uncertainty of an inference can be large. Ioannidis (2005) described how the power of a method is not a guarantee of the truth of its results.

The population genetic models describe how allele frequencies change under selection, drift, mutation and migration. The coalescent theory traces the ancestry of a sample backward in time, and it provides the likelihood of the genealogy under a demographic model. Inference of demographic history from sequence data uses this likelihood, and the estimates carry intervals that must be reported. Cumming (2014) argues that the uncertainty of each demographic estimate should be stated, since the genealogy is only partly determined by the data.

Models of phylogenetic inference and of the tempo of diversification estimate the branching history of a group and the rates at which lineages split and go extinct. These inferences depend on the model of sequence evolution and on assumptions about the sampling of species. The sensitivity of the inferred history to these assumptions must be tested, and the sampling must be described.

Individual-based simulations of evolution follow explicit genomes and ecological interactions, allowing the consequences of a process to be examined in a population that is not assumed to be at equilibrium. Their results must be checked for the stochastic variation between runs and for the sensitivity to the parameters. Munafò et al. (2017) argued that the models, the assumptions and the inference should all be reported, so that the evolutionary claim can be evaluated. Peng (2011) argued that the code and the random seeds are needed to reproduce such simulations, and the remaining chapters examine the inference, the testing of methods and the reporting of evolutionary models.
