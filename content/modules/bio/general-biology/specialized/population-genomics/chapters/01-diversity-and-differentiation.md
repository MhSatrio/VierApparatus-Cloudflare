---
title: "Diversity and Differentiation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The genome-wide measures of genetic diversity within populations and of differentiation among them, covering nucleotide diversity as the average number of differences between pairs of sequences, the fixation index that compares the diversity within and among populations, the dependence of these measures on the sampling of individuals and on the set of variants considered, the bias introduced by filtering on allele frequency and by the choice of reference, the interpretation of differentiation in terms of migration and drift, and the reporting of diversity measures with the filters and the sample sizes behind them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate nucleotide diversity from a set of sequences and state what it measures."
  - "Explain how filtering on allele frequency can bias diversity and differentiation estimates and state the filter that must be reported."
references:
  - "Nielsen, R. (2005). Molecular Signatures of Natural Selection. Annual Review of Genetics, 39(1), 197-218. https://doi.org/10.1146/annurev.genet.39.073003.112420"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Nucleotide diversity is the average number of differences per site between pairs of sequences sampled from a population. It measures the amount of variation present, and it is one of the most used statistics in population genomics. It is estimated across the genome, usually in windows, and its value depends on the sample and on the mutation and recombination processes that have acted on the population. Nielsen (2005) explained how this diversity is shaped by selection and by demography, and the same quantity can therefore reflect either.

The fixation index compares the diversity within populations with the diversity among them. A value near zero indicates that populations share most of their variation, and a value near one indicates that they differ almost completely. The index is a measure of the differentiation that has resulted from the limits of migration and the action of drift, and it must be interpreted with the history of the populations in mind.

These measures depend on the individuals sampled and on the set of variants considered. A sample that includes related individuals gives a different diversity from one that includes unrelated ones, and a set of variants filtered on allele frequency gives a different diversity from one that is not filtered. The filters must be reported, since they determine the population being measured.

Filtering on allele frequency introduces a bias. Removing rare variants reduces the apparent diversity and changes the shape of the frequency distribution, which in turn alters the inference of demographic history. A variant that is common in one population and rare in another may be removed by a filter that applies across populations, and this affects the estimate of differentiation. The choice of filter must be justified and its effect shown.

The interpretation of differentiation in terms of migration and drift requires a model, and the model must be stated. Cumming (2014) argues that the diversity and differentiation should be reported with their intervals across windows and across the genome. Ioannidis (2005) described how an estimate that depends on a filter may appear to show a difference that is an artefact of the filter, and Sandve et al. (2013) recommended recording the filters and the sample sizes.
