---
title: "Linkage and Recombination"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The inheritance of alleles at nearby loci together because they lie on the same chromosome, the recombination fraction between two loci as the probability that a meiosis separates them, the conversion of recombination fractions to map distances in centimorgans with the assumption of no interference, the detection of linkage through the lod score and its threshold, and the linkage disequilibrium between loci in populations that reflects their history rather than only their physical distance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the recombination fraction between two loci and convert it to a map distance under a stated mapping function."
  - "Explain the difference between linkage in a family and linkage disequilibrium in a population."
references:
  - "Visscher, P. M., Wray, N. R., Zhang, Q., Sklar, P., McCarthy, M. I., Brown, M. A., & Yang, J. (2017). 10 Years of GWAS Discovery: Biology, Function, and Translation. The American Journal of Human Genetics, 101(1), 5-22. https://doi.org/10.1016/j.ajhg.2017.06.005"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Alleles at two loci on the same chromosome tend to be inherited together, because a meiosis must separate them by crossing over for them to be shuffled into new combinations. The probability that a meiosis separates two loci is the recombination fraction, which is 0.5 for loci that are unlinked or far apart and approaches zero for loci that are close. The recombination fraction is therefore a measure of the distance between loci along a chromosome, and it is estimated from the offspring of informative crosses.

Map distance is the expected number of crossovers per meiosis, and it is measured in morgans or, more commonly, in centimorgans, where one centimorgan corresponds to a recombination fraction of one per cent. The conversion from recombination fraction to distance depends on a mapping function, which assumes a model of how crossovers occur. The Haldane function assumes that crossovers are independent, and the Kosambi function allows for a degree of interference between them. The choice of function changes the distance, and it should be stated with the map.

Linkage is detected by the lod score, which is the logarithm of the ratio of the likelihood of the data at a recombination fraction to the likelihood at free recombination. A lod score of three is conventionally taken as strong evidence of linkage, a threshold that corresponds to odds of a thousand to one. Visscher et al. (2017) described how linkage studies preceded association studies in the identification of genes for disease, and the lod threshold is a multiple testing criterion whose use across many families should be considered.

Linkage disequilibrium describes the non-random association of alleles at nearby loci in a population. It reflects the recombination that has occurred over many generations, and it depends on population history as well as on distance, so two loci may be in strong disequilibrium without being close or in weak disequilibrium while close. Cumming (2014) argues that a measure of association should be reported with its interval, and Sandve et al. (2013) recommended recording the map, the mapping function and the population, since the meaning of a distance or a disequilibrium depends on them.
