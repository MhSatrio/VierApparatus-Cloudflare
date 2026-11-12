---
title: "Sampling Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The design of sampling for population genomic studies, covering the number of individuals needed to estimate diversity and differentiation with a given precision, the spread of samples across the geographic range of the population, the avoidance of related individuals that bias estimates of diversity and linkage, the choice between sequencing many individuals at low depth and few at high depth, the ascertainment bias introduced when variants are discovered in a small panel and then genotyped in a larger one, and the reporting of the sampling so that the population measured is clear."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose the number of individuals and their spread for a population genomic study and state how each affects the precision of the estimates."
  - "Explain ascertainment bias and state how the discovery of variants in a small panel distorts the estimates."
references:
  - "Nielsen, R. (2005). Molecular Signatures of Natural Selection. Annual Review of Genetics, 39(1), 197-218. https://doi.org/10.1146/annurev.genet.39.073003.112420"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The design of a population genomic study determines which estimates can be made and how precise they are. The number of individuals sampled sets the precision of the estimates of diversity and differentiation, and the required number depends on the variation being measured and on the precision wanted. A sample that is too small gives estimates with wide intervals that cannot distinguish populations or detect selection, and an unnecessarily large sample wastes resources that might be used elsewhere.

The spread of samples across the geographic range matters as well. A sample drawn from one part of a population may not represent its whole range, and estimates of differentiation depend on where the samples come from. Nielsen (2005) noted that the inference of selection and demography depends on the population sampled, and the design should include samples from the locations that the question concerns.

Related individuals share alleles by descent, and their presence in a sample biases estimates of diversity and of linkage. A sample of close relatives shows less diversity than a sample of unrelated individuals, and the relatedness of the individuals should be estimated and accounted for. The design should avoid unintended sampling of family groups, and the relatedness should be reported.

Sequencing many individuals at low depth or few at high depth are alternatives with different strengths. Low-depth sequencing covers more individuals and better estimates population frequencies, while high-depth sequencing gives accurate genotypes for each individual. The choice depends on the question, and the consequences for the estimates should be considered, since low-depth data require statistical methods that account for the uncertainty in each genotype.

Ascertainment bias arises when variants are discovered in a small panel and then genotyped in a larger one. The variants found in the panel are biased towards common ones, which distorts the estimates of diversity and differentiation in the larger sample. Cumming (2014) argues that the bias must be corrected or reported, and Ioannidis (2005) described how a systematic bias of this kind can produce a finding that appears robust. Sandve et al. (2013) recommended recording the sampling, the discovery panel and the sequencing depth.
