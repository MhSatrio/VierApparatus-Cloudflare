---
title: "Allele and Genotype Frequencies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The estimation of allele frequencies from genotype counts in diploid organisms, the difference between the allele frequency in a population and the genotype frequency in a sample, the counting of heterozygotes and homozygotes at a biallelic locus, the uncertainty of a frequency estimated from a finite sample, and the effect of missing genotypes and of the choice of the reference population on the estimate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the frequency of each allele at a biallelic locus from observed genotype counts in a diploid sample."
  - "Explain how missing genotypes and the choice of reference population change an allele frequency estimate."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
---

Diploid organisms carry two copies of each autosomal gene, and at a locus with two alleles there are three possible genotypes. If a sample contains a count of each genotype, the frequency of an allele is estimated from the number of copies of that allele among all the copies in the sample. A homozygote carries two copies, a heterozygote one copy of each allele, and the frequency of an allele is the total copies divided by twice the number of individuals genotyped. This calculation is simple, but it depends on the sample being a fair picture of the population.

The frequency of an allele in a population is a parameter, and its estimate from a sample has sampling error. The error is smaller for a larger sample, and it is largest for rare alleles, where a few individuals can change the estimate substantially. Cumming (2014) argues that an estimate should be reported with its interval, and for an allele frequency the interval shows how far a small or unrepresentative sample may be from the population value. The interval is also needed to decide whether two samples differ.

Missing genotypes are a practical problem. If individuals with missing data differ systematically from those genotyped, the estimate is biased, and the number of missing genotypes at each locus should be reported with the estimate. Quality control in large studies often removes variants with high missingness, and the thresholds used should be stated, since they change which frequencies are available for analysis.

The choice of the reference population matters when frequencies are compared across studies. A frequency estimated from one ancestry group may differ substantially from that of another, and an apparent difference may reflect the sample rather than biology. Visscher et al. (2017) noted that the populations used in genetic studies have been unrepresentative, and Sandve et al. (2013) recommended recording the population and the quality control, so that the frequencies can be reproduced and their scope understood.
