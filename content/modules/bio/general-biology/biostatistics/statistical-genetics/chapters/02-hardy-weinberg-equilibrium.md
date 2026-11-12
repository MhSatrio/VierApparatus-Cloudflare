---
title: "Hardy-Weinberg Equilibrium"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The Hardy-Weinberg expectation that genotype frequencies in a large random-mating population with no selection, mutation, migration or drift equal the squares and twice the products of the allele frequencies, the chi-squared or exact test of a sample against this expectation, the detection of genotyping error, inbreeding and population structure through a deficit or excess of heterozygotes, and the reasons that a departure from equilibrium is a signal to investigate rather than a proof of any single cause."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the Hardy-Weinberg expectation and calculate the expected genotype counts from the allele frequency."
  - "Test a sample against the expectation and explain what a deficit of heterozygotes can indicate."
references:
  - "Price, A. L., Patterson, N. J., Plenge, R. M., Weinblatt, M. E., Shadick, N. A., & Reich, D. (2006). Principal components analysis corrects for stratification in genome-wide association studies. Nature Genetics, 38(8), 904-909. https://doi.org/10.1038/ng1847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Hardy-Weinberg expectation states that, in a large population with random mating and no selection, mutation, migration or drift, the genotype frequencies at a locus are the square of the allele frequency for the homozygotes and twice the product of the two allele frequencies for the heterozygotes. The expectation is reached in one generation of random mating and then remains stable. It is a null model, and its value lies in the departures that it reveals, since a population that follows the expectation shows no sign of the forces that the model excludes.

To test a sample, the expected genotype counts are calculated from the observed allele frequency and compared with the observed counts. A chi-squared test or an exact test gives the probability of a departure of this size under the expectation. The exact test is preferred for rare alleles, where the expected counts are small and the chi-squared approximation is poor, and the result should report the observed and expected counts so that the departure can be seen.

A deficit of heterozygotes is the most common departure. It may indicate inbreeding, a mixture of populations with different allele frequencies, or genotyping error, since a heterozygote that is called as a homozygote reduces the count of heterozygotes. Price et al. (2006) showed that population structure creates such departures across the genome, and the structure should be examined before a single locus is judged. An excess of heterozygotes is less common and may indicate a genotyping problem or selection.

A departure from equilibrium is a signal to investigate, and it does not identify a cause. Cumming (2014) argues that the magnitude of a departure, with its interval, is more informative than a p-value alone. Sandve et al. (2013) recommended recording the test, its assumptions and the quality control applied to the genotypes, since a departure that is removed by a quality threshold may have been a real signal that the threshold concealed.
