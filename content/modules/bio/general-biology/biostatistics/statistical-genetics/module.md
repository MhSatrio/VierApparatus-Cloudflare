---
title: "Statistical Genetics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The statistical analysis of inheritance and genetic variation, covering allele and genotype frequencies and the Hardy-Weinberg expectation, linkage and recombination between loci, the partitioning of phenotypic variance into genetic and environmental components and its heritability, genome-wide association studies with their multiple testing threshold, the correction for population stratification, polygenic scores for prediction, and the reporting of genetic association studies with their sample, ancestry and validation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate allele and genotype frequencies and test a sample against the Hardy-Weinberg expectation."
  - "Explain the genome-wide significance threshold, the correction for population stratification and the limits of a polygenic score."
references:
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Price, A. L., Patterson, N. J., Plenge, R. M., Weinblatt, M. E., Shadick, N. A., & Reich, D. (2006). Principal components analysis corrects for stratification in genome-wide association studies. Nature Genetics, 38(8), 904-909. https://doi.org/10.1038/ng1847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Statistical genetics applies probability and inference to the transmission of genes and to the variation that they produce. Its data are the genotypes of individuals and the phenotypes that they show, and its questions concern how alleles are distributed in populations, how traits are inherited and which regions of the genome contribute to a trait. The field underlies the interpretation of genetic association studies and the prediction of disease risk from genotype, and its methods must be applied with care because the structure of populations and the scale of the tests can produce false findings.

The early chapters establish the basic quantities. Allele and genotype frequencies describe the composition of a population, and the Hardy-Weinberg expectation gives the genotype frequencies that a population in equilibrium would show. Linkage describes the tendency of nearby loci to be inherited together, which depends on the recombination between them. Visscher et al. (2017) reviewed how these quantities underpin the discovery of genetic variants associated with traits, and the later chapters build on this basis.

The central methods concern the genetic architecture of a trait. Heritability partitions the variance of a phenotype into genetic and environmental parts, and genome-wide association studies test each variant for an association with the trait. Because the number of variants is very large, the threshold for significance is set far below the usual level, and Price et al. (2006) showed that population structure can create spurious associations unless it is corrected.

The final chapters address prediction and reporting. Polygenic scores combine many small associations into a single prediction, and Ioannidis (2005) described how the selection of findings can overstate what a score predicts. Cumming (2014) argues for reporting the estimate with its interval, and Sandve et al. (2013) recommended recording the data, the quality control and the code, since a genetic result depends on decisions that are easily lost.
