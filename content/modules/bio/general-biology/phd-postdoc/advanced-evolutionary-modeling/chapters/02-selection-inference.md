---
title: "Inference of Natural Selection"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The inference of natural selection from sequence and population data, covering the ratio of nonsynonymous to synonymous substitutions as a measure of selection on protein sequences, the detection of selective sweeps through their footprints on linked variation, the test of whether a site or lineage has evolved under positive, purifying or relaxed selection, the influence of demography and of recombination on the power and the false positive rate of selection tests, the correction for multiple testing across a genome, the distinction between statistical detection of selection and its biological magnitude, and the reporting of the selection estimates with their intervals and the null model against which they are tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the ratio of nonsynonymous to synonymous substitution and state what it does and does not show about selection."
  - "Explain how demography can produce false signals of selection and state the null model needed to avoid them."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The inference of natural selection asks whether the observed variation in a sequence reflects the action of selection rather than chance. The ratio of nonsynonymous to synonymous substitutions compares the rate of changes that alter the protein with the rate of changes that do not, and a ratio above one suggests positive selection on the protein. The measure is simple, but it is an average that can conceal selection acting on a few sites, and its interpretation must be made with care. Ioannidis (2005) described how a single summary statistic can mislead when the underlying heterogeneity is ignored.

Selective sweeps leave footprints on the variation linked to the selected site, since the variation near a rapidly fixed allele is reduced. These footprints are detected by tests that compare the pattern of variation with the pattern expected under neutrality, and the power of a test depends on the strength and the age of the sweep. Cumming (2014) argues that the strength of the evidence for a sweep should be reported with its interval, rather than as a yes or no decision at a threshold.

The test of whether a site or lineage has evolved under positive, purifying or relaxed selection requires a null model of neutral evolution against which the observed pattern is compared. The null must include the demographic history of the population, since demography alone can produce patterns that resemble selection. The false positive rate of a selection test depends on the accuracy of the null, and a test that ignores demography will flag selection where none acts.

Recombination affects both the power and the false positive rate, since it determines how far the footprint of selection extends. A correction for multiple testing is required when a genome is scanned for selection, since many regions are tested and some will appear significant by chance. Munafò et al. (2017) argued that the number of tests and the correction applied should be reported, so that the significance of each finding can be judged.

Statistical detection of selection is distinct from its biological magnitude. A detected signal may reflect a selective effect that is very small, and the magnitude of selection should be estimated with its interval rather than inferred from the presence of a significant test alone. Peng (2011) argued that the null model and the procedure must be documented so that the inference can be reproduced, and the reporting of the estimates should state the null against which they were tested.
