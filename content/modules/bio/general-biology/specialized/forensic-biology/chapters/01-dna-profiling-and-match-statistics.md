---
title: "DNA Profiling and Match Statistics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "DNA profiling by short tandem repeats, in which the number of repeats at a set of loci is measured for a sample and a reference, the multiplex amplification that reads many loci at once, the calculation of allele frequencies in reference populations, the random match probability that gives the chance an unrelated person shares the profile, the product rule that combines loci under the assumption of independence, the correction for relatedness and for population substructure through the theta value, the likelihood ratio that compares the probability of the evidence under two propositions, and the statement of the statistics with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate a random match probability from allele frequencies at several loci using the product rule and state its assumptions."
  - "Explain why the likelihood ratio compares two propositions and why a match probability alone does not state the probability of guilt."
references:
  - "Gill, P., Jeffreys, A. J., & Werrett, D. J. (1985). Forensic application of DNA 'fingerprints'. Nature, 318(6046), 577-579. https://doi.org/10.1038/318577a0"
  - "Butler, J. M. (2015). U.S. initiatives to strengthen forensic science & international standards in forensic DNA. Forensic Science International: Genetics, 18, 4-20. https://doi.org/10.1016/j.fsigen.2015.06.008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A DNA profile is made by measuring the number of repeats of a short sequence at a set of loci, and each locus has several alleles that differ in their repeat numbers. A profile from a crime sample is compared with one from a suspect, and a match means that the two share the alleles at every locus. Gill et al. (1985) showed that such patterns could be used to identify individuals, and the power of the method depends on how rare the profile is in the population.

The rarity is expressed by the random match probability, the probability that an unrelated person drawn from the population would have the same profile. It is calculated from the frequencies of the alleles at each locus in a reference population, and the product rule multiplies these frequencies across the loci on the assumption that they are independent. The reference population must be representative of the relevant population, and the frequencies must be estimated with their uncertainty.

The product rule assumes that the loci are independent, and related individuals violate this, since they share alleles by descent. The correction for relatedness and for population substructure uses a parameter, often called theta, that inflates the match probability to allow for shared ancestry within subpopulations. The choice of this correction changes the statistic, and it must be stated.

The likelihood ratio is the preferred measure for evidence, since it compares the probability of the evidence under two propositions, such as that the suspect is the source and that an unrelated person is the source. The ratio is not the probability of guilt, which requires other information, and the distinction is central to the interpretation. Cumming (2014) argues that the uncertainty of each statistic should be reported with its interval, and Ioannidis (2005) described how a statistic that is quoted without its assumptions can mislead a jury or a court.
