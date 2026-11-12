---
title: "Verifying Edits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The verification of a genome edit by sequencing the target region in individual clones, the distinction between a clone that carries the intended change on both alleles and one that carries it on one allele or as a mosaic, the use of Sanger sequencing for single clones and of deep sequencing for populations, the detection of unintended changes at the target and at the predicted off-target sites, the functional confirmation of the edit by its phenotype, and the risk of attributing a phenotype to an edit that was not verified in the clone studied."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Verify an edit in a clone by sequencing both alleles and distinguish a homozygous edit from a mosaic."
  - "Explain why a phenotype must be linked to a verified edit and state the controls that support the link."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Verification establishes what the genome of an edited cell actually contains. Each clone derived from a single cell is sequenced at the target, and the sequence shows whether the intended change is present on one allele, both alleles or neither. A cell edited on one allele of a diploid genome carries only half the change, and a population in which some cells carry the edit and others do not is a mosaic. These states have different consequences, and a clone should be described by its genotype rather than by the fact that an edit was attempted.

Sanger sequencing reads the target in individual clones and is accurate for a small region, and it shows whether the edit is homozygous or heterozygous from the traces. Deep sequencing reads the target in many cells at once, and it measures the frequency of each allele in a population. The two methods answer different questions, and the choice depends on whether the clone or the population is of interest.

Verification must also look for unintended changes. The target may carry insertions or deletions that differ from the design, and the predicted off-target sites should be sequenced in the clones studied. Ioannidis (2005) described how a result that is checked in the wrong place can appear to confirm a claim, and the verification should cover the sites that could be affected by the edit.

A phenotype should be attributed to the edit only when the edit is verified in the clone studied. Functional confirmation, such as the loss of a protein or the change of a measured trait, supports the link, and a control clone that went through the same procedure without the edit is needed to exclude effects of the procedure itself. Cumming (2014) argues that the phenotype should be reported with its interval and the number of independent clones, and Sandve et al. (2013) and Peng (2011) recommended recording the verification for each clone so that the attribution can be checked.
