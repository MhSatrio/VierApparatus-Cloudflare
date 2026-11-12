---
title: "Coalescent Theory and Demographic Inference"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The coalescent model of the genealogy of a sample and its use to infer the demographic history of a population, covering the derivation of the probability of a genealogy under a model of population size change, the effect of recombination and the sequence length on the information the genealogy carries, the inference of past population size and migration from the observed polymorphism, the methods that approximate the likelihood when it is intractable, the confounding between demographic history and selection that can produce similar patterns, the uncertainty of the inferred history that widens for distant times, and the reporting of the model, the assumptions and the posterior or confidence intervals of the inferred history."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the coalescent model and state how the genealogy of a sample constrains the inference of past population size."
  - "Explain why demographic inference is confounded with selection and state the test that separates them."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The coalescent model traces the ancestry of a sample backward in time, and it describes the probability of a genealogy under a model of population size. Lineages coalesce, or merge, at rates that depend on the population size at each time, and the genealogy that results carries information about the demographic history that produced it. The model is a powerful basis for inference, because it reduces a complex population history to a set of coalescent times that the sequence data can estimate.

The information in the genealogy depends on the length of the sequences and on recombination, which breaks the genealogy into segments with different histories. Longer sequences and more recombination give more independent information, and the amount of information determines how precisely the history can be inferred. Ioannidis (2005) described how the apparent precision of an inference can exceed the information that supports it, and the information content should be stated.

Past population size and migration are inferred from the observed polymorphism, which is the pattern of genetic variation in the sample. The likelihood of the polymorphism under the coalescent is often intractable for complex histories, and approximations are used. Each approximation has its own error, and its effect on the inference should be tested. Cumming (2014) argues that the interval of each inferred population size should be reported, and the intervals widen for the most distant times, where the data carry the least information.

Demographic history is confounded with selection, since both can produce similar patterns of polymorphism. A population bottleneck and a selective sweep can look alike in the data, and inferring one while ignoring the other can mislead. The test that separates them uses patterns that differ between the two, and the analysis should show whether the demographic inference survives the possibility of selection. Munafò et al. (2017) argued that such alternatives should be considered and reported, and Peng (2011) argued that the code and data should be available so that the inference can be repeated.
