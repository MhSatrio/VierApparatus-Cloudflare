---
title: "Designs in Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The common experimental designs of biology that are analysed with analysis of variance, including the dose by genotype factorial, the time course with repeated measures, the blocked design in which a nuisance factor such as batch or litter is controlled, the nested design in which samples are taken within individuals or sites, and the way each design determines the correct error term against which each effect is tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the design of a biological experiment as factorial, blocked, nested or repeated and state the error term it requires."
  - "Explain why testing an effect against the wrong error term produces an invalid test."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The design of a biological experiment determines the analysis. A factorial design crosses factors, such as dose and genotype, to measure their effects and their interaction, and it is analysed with the two-way model of the earlier chapters. A blocked design groups experimental units into blocks, such as litters or batches, so that the nuisance variation between blocks is removed from the comparison of treatments. A nested design places units within others, such as cells within individual animals, so that the units within a higher unit are not independent of one another.

Each design implies an error term, the variation against which an effect is tested. In a blocked design the error is the block-by-treatment variation, and the treatment is tested against it, not against the residual of the full model. In a nested design the cells within an animal share the animal's variation, and the effect of a treatment applied to animals is tested against the variation between animals, not the variation between cells. Nelder and Wedderburn (1972) set out the linear model that makes these error terms explicit, and the design determines which is correct.

Testing an effect against the wrong error term produces an invalid test. A treatment applied to whole animals but measured on many cells per animal, tested against the cell variation, will appear far more significant than it is, because the cells are pseudo-replicates of the animals. This is one of the most common statistical errors in biology, and it produces the false findings that Ioannidis (2005) described.

The correct error term follows from the unit to which the treatment was applied. The replicates of the treatment are the experimental units, and the measurements within them are subsamples. The analysis must be built on the experimental unit, and the report must state which unit was replicated.

Sandve et al. (2013) recommended recording the design and the error terms, so that a reader can verify that each effect was tested against the variation it should be tested against.
