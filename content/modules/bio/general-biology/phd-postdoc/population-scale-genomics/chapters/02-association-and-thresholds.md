---
title: "Genome-Wide Association and Significance Thresholds"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Genome-wide association analysis of a trait across millions of genetic variants and the significance threshold that controls false discoveries, covering the linear and logistic regression of the trait on each variant with covariates, the effect size and its standard error for each variant with its interval, the genome-wide significance threshold derived from the number of effectively independent tests because variants in linkage disequilibrium are correlated, the replication of associations in independent cohorts as the strongest protection against false positives, the inflation of the test statistic by confounding that a genomic control factor measures, the winner's curse by which the effect of a discovered variant is overestimated, and the reporting of the threshold, the effect sizes with intervals and the replication."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Derive a genome-wide significance threshold from the number of effectively independent tests and state why it is far stricter than a nominal threshold."
  - "Explain the winner's curse and state why the effect of a discovered variant should be estimated in an independent cohort."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A genome-wide association analysis regresses the trait on each variant in turn, and it produces a test for each of millions of variants. Testing so many hypotheses guarantees that many will appear significant at a conventional threshold by chance alone, and the threshold must be set to control the number of false discoveries. Ioannidis (2005) described how the multiplicity of tests inflated the early candidate-gene literature, and the genome-wide threshold was designed to prevent the same failure at scale.

The threshold is derived from the number of effectively independent tests, which is smaller than the number of variants because variants that are correlated through linkage disequilibrium provide overlapping information. The threshold is therefore far stricter than the nominal level, and a variant must pass it to be reported as a genome-wide association. Munafò et al. (2017) argued that the derivation of the threshold should be stated, since an arbitrary threshold makes the significance of every finding uncertain.

Replication in an independent cohort is the strongest protection against false positives, and an association that replicates with a similar effect is much more credible than one that appears only once. Cumming (2014) argues that the effect size should be estimated with its interval in both cohorts, and agreement between the intervals is the appropriate criterion for replication.

Confounding can inflate the test statistic across the genome, and a genomic control factor measures this inflation. A factor substantially above one indicates confounding, which must be corrected before the associations are interpreted. Peng (2011) argued that the calculation of such factors and the corrections applied must be documented, so that the associations can be reproduced.

The winner's curse arises because a variant selected for having a large observed effect is likely to have overstated its true effect, since the selection favours chance overestimates. The effect of a discovered variant should therefore be estimated in an independent cohort, where the selection does not apply. The threshold, the effect sizes with their intervals and the replication should all be reported together.
