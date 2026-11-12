---
title: "Genome-Wide Association Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The genome-wide association study that tests each common variant in the genome for an association with a trait, the regression of the phenotype on the genotype coded by the count of an allele, the genome-wide significance threshold of about five times ten to the minus eight that corrects for the number of independent tests, the replication of findings in independent samples, and the distinction between an association and the causal variant or gene that lies near it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the association test at each variant and state why the significance threshold is set far below the usual level."
  - "Explain why an associated variant is not necessarily the causal variant and what replication adds to a finding."
references:
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Price, A. L., Patterson, N. J., Plenge, R. M., Weinblatt, M. E., Shadick, N. A., & Reich, D. (2006). Principal components analysis corrects for stratification in genome-wide association studies. Nature Genetics, 38(8), 904-909. https://doi.org/10.1038/ng1847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A genome-wide association study tests each common variant in the genome for a relation with a trait. For a quantitative trait, the phenotype is regressed on the count of one allele at the variant, usually coded as zero, one or two copies, and the slope estimates the change in the trait per copy. The test is repeated across hundreds of thousands or millions of variants, and the result is a set of effect estimates, standard errors and p-values for each one.

Because so many tests are made, the threshold for declaring a variant significant is set far below the usual level. The conventional genome-wide threshold of about five times ten to the minus eight corresponds to a correction for the number of approximately independent common variants in the human genome. Visscher et al. (2017) reviewed how this threshold, and the sample sizes needed to reach it, determined the course of the field, and a finding just below it is not evidence of an association.

A significant variant is an association, and it is not necessarily the cause of the association. Variants are inherited in blocks of linkage disequilibrium, so the associated variant may merely be correlated with the causal one, and the gene nearest to it may not be the gene that acts. Fine mapping and functional studies are needed to identify the causal variant. Price et al. (2006) showed that the structure of the sample can also produce associations that are not causal, which is why the population must be examined before a result is interpreted.

Replication in an independent sample is the principal guard against false findings. Ioannidis (2005) described how the selection of significant results from many tests leads to overestimated effects, and an association that does not replicate should be treated with caution. Cumming (2014) argues that the estimated effect and its interval should be reported, since the size of an association matters as much as its significance. The effect estimates and their standard errors, for all variants, should be deposited so that the study can be checked and combined with others.
