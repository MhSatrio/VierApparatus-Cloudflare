---
title: "Population Stratification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The systematic difference in allele frequencies between subpopulations within a sample, the false association that arises when a subpopulation differs in both allele frequency and trait value, the detection of structure with principal components of the genotype matrix, the inclusion of the components as covariates to correct the association tests, and the limits of the correction when the structure is confounded with environment or when it is fine-scale."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a difference in ancestry within a sample can create a spurious association between a variant and a trait."
  - "Use principal components of the genotype data to detect and correct for population structure in an association test."
references:
  - "Price, A. L., Patterson, N. J., Plenge, R. M., Weinblatt, M. E., Shadick, N. A., & Reich, D. (2006). Principal components analysis corrects for stratification in genome-wide association studies. Nature Genetics, 38(8), 904-909. https://doi.org/10.1038/ng1847"
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Population stratification is a systematic difference in allele frequencies between subgroups of a sample. If one subgroup has both a higher frequency of an allele and a higher average value of a trait, the allele will appear associated with the trait even when it has no effect. The difference may arise from ancestry, from geography or from any shared history that separates the groups, and the false association can be as strong as a real one. The problem grows with the size of the sample, since larger samples detect smaller differences in ancestry.

Price et al. (2006) showed that the principal components of the matrix of genotypes capture the ancestry structure of a sample. Each component is a direction of variation in allele frequencies, and the leading components separate the subgroups. Including the components as covariates in the association regression removes the association that they explain, leaving the test sensitive to the variant's own effect. The number of components to include is chosen by examining how much variation each explains, and the choice should be reported.

The correction is only as good as the structure it captures. Visscher et al. (2017) described how stratification can persist when the structure is confounded with environment, since a subgroup that differs in ancestry may also differ in diet, exposure or culture, and the principal components cannot separate these. Fine-scale structure within a population may also be missed by a few components, leaving residual inflation of the test statistics. The genomic inflation factor is a standard check, and an inflated value should be investigated before the results are accepted.

Sandve et al. (2013) recommended recording the procedure for detecting and correcting structure, so that the analysis can be repeated and its adequacy judged. The genotype data, the components and the code should be deposited with the results. The effect of stratification on the findings should be reported alongside the findings, since a reader cannot judge the association without knowing whether it survived the correction.
