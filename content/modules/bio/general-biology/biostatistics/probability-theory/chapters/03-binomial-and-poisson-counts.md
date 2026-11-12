---
title: "Binomial and Poisson Counts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The binomial distribution for the number of successes in a fixed number of independent trials, such as the number of mutant offspring among a set of progeny, and the Poisson distribution for the number of events in a fixed interval, such as colonies on a plate or reads in a sequencing run, with the conditions under which each applies, the mean and variance of each and the overdispersion that makes a Poisson model fail for many biological counts."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the conditions under which a count follows a binomial or a Poisson distribution and compute a probability from each."
  - "Recognise overdispersion in a count and state why a Poisson model underestimates its variability."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Mortazavi, A., Williams, B. A., McCue, K., Schaeffer, L., & Wold, B. (2008). Mapping and quantifying mammalian transcriptomes by RNA-Seq. Nature Methods, 5(7), 621-628. https://doi.org/10.1038/nmeth.1226"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The binomial distribution counts the successes in a fixed number of trials, each with the same probability of success and independent of the others. A breeding experiment that scores the offspring of two heterozygous parents for a recessive phenotype has such a structure: each offspring is an independent trial with a success probability of one quarter, and the number of affected offspring among, say, twenty follows a binomial distribution. Its mean is the number of trials times the probability, and its variance is the mean times one minus the probability.

The Poisson distribution counts events that occur at a constant average rate in a fixed interval, with the events independent of one another. The number of bacterial colonies on a plate, the number of mutations in a stretch of DNA and the number of reads mapped to a gene in a sequencing run are often modelled this way. Its single parameter is the mean, and its variance equals the mean. This property is the most important feature of the distribution, and it is the one that fails most often in biological data.

Mortazavi et al. (2008) used the number of reads from a transcript as a measure of its abundance, and such counts vary more between replicates than a Poisson model allows. The biological variation of the transcripts adds to the sampling variation, so the variance exceeds the mean. This is overdispersion, and the negative binomial distribution, used by Love et al. (2014) for RNA sequencing data, is one model that allows for it.

A Poisson model applied to overdispersed counts underestimates their variability, and the p-values that follow are too small. The check is to compare the variance with the mean in the replicates, and a ratio well above one is the signal that a Poisson model is inadequate.

Wasserstein and Lazar (2016) remind readers that a p-value is only as reliable as the model that produced it, and a count model that misstates the variance produces misleading results. Sandve et al. (2013) recommended recording the distribution assumed for each count, and the check of overdispersion belongs to that record.
