---
title: "Negative Binomial and Overdispersion"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The negative binomial model for overdispersed biological counts, in which the variance is the mean plus a term proportional to the square of the mean, the dispersion parameter that describes the extra variation between units, the quasi-Poisson alternative that scales the standard errors without changing the model, the reasons overdispersion is common in biological counts and the checks that decide between the Poisson, the quasi-Poisson and the negative binomial model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a negative binomial model allows the variance of a count to exceed its mean and what the dispersion parameter represents."
  - "Choose between a Poisson, a quasi-Poisson and a negative binomial model for an overdispersed count and state the reason."
references:
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biological counts are often more variable than a Poisson model allows. The count of reads from a gene, the number of colonies from a dilution or the number of lesions in an animal varies by chance and also because the underlying rate differs between units. The variance of such a count exceeds its mean, and this overdispersion is the rule rather than the exception in biological data. The negative binomial distribution is the standard model for it, because it arises naturally when the rate itself varies across units.

The negative binomial variance is the mean plus a term proportional to the square of the mean, and the constant of proportionality is the dispersion parameter. A dispersion of zero recovers the Poisson, and a larger dispersion describes more extra variation between units. Love et al. (2014) used this model for RNA sequencing counts, estimating a dispersion for each gene, and Robinson et al. (2010) used the same distribution in edgeR, with the dispersion estimated across the genes.

An alternative is the quasi-Poisson model, which keeps the Poisson mean structure and scales the standard errors by the estimated overdispersion. It corrects the inference without specifying a distribution for the counts, and it is simpler where only the standard errors matter. The negative binomial is preferred when the full distribution is needed, for example to predict the spread of new counts or to compare models by likelihood.

The check of overdispersion compares the variance of the residuals with their expectation under the Poisson. A ratio well above one signals overdispersion, and the choice of model should follow the check. A model chosen without the check, when the variance is in fact larger than the mean, gives standard errors and p-values that are too small.

Sandve et al. (2013) recommended recording the family, the dispersion estimate and the check, since the inference from a count depends on the variance assumed.
