---
title: "Nested and Crossed Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Mixed models for nested designs, in which samples are taken within individuals or sites that are themselves within larger units, and for crossed designs, in which two random factors such as individuals and laboratory batches are each present across the levels of the other, the specification of the random effects that match each design, the error terms that a nested or crossed analysis requires and the way an incorrect specification assigns the variation of one level to another."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a random-effects structure for a nested design and for a crossed design of two random factors."
  - "Explain how an incorrect random structure assigns variation from one level of a design to another and biases the test of a treatment."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biological designs often nest one random factor within another. Cells are sampled within animals, and animals within litters, so that the variation has a hierarchy and each level must be represented in the model. A nested random structure gives each level its own variance, and the treatment, applied to the higher level, is tested against the variation of that level, not against the variation of the cells within it. Laird and Ware (1982) described such hierarchical structures, and Bates et al. (2015) show how they are written in the model formula.

Other designs cross two random factors, so that each level of one occurs with each level of the other. Individuals may be measured in several laboratory batches, and each batch contains several individuals. The crossed random structure gives each factor its variance and allows the batch and the individual to be separated, a separation that a nested structure cannot provide when the factors are crossed.

An incorrect structure assigns variation to the wrong level. If the cells of an animal are treated as independent replicates of the treatment, the variation between animals is attributed to the residual, and the test of the treatment is too liberal. If a crossed factor is ignored, its variation is absorbed into the residual or into another factor, and the estimates of the others are distorted. The structure must match the design, and a check of the variance components should confirm that each level has the variation expected.

Sandve et al. (2013) recommended recording the random structure and the design, since the correct test of a treatment depends on the level at which it was applied. The random structure is part of the inference, and it deserves to be reported as clearly as the fixed effects.
