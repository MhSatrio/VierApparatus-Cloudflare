---
title: "Bootstrap and Branch Support"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How bootstrap resampling of alignment columns measures the support for each branch of a phylogenetic tree, the procedure by which resampled alignments are built and their trees compared, the meaning of a bootstrap percentage and the common misreadings that treat it as the probability that a branch is correct, together with the situations in which high support can still come from a systematic error in the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a bootstrap value for a branch is computed by resampling the alignment columns and rebuilding the tree."
  - "Explain why a bootstrap percentage is not the probability that a branch is correct and state what it does measure."
references:
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Stamatakis, A. (2014). RAxML version 8: a tool for phylogenetic analysis and post-analysis of large phylogenies. Bioinformatics, 30(9), 1312-1313. https://doi.org/10.1093/bioinformatics/btu033"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Felsenstein (1985) proposed the bootstrap as a way to measure the support for each branch of a tree. The alignment is resampled by drawing its columns at random with replacement, so that a new alignment of the same length is formed in which some columns appear more than once and others not at all. A tree is built from each resampled alignment, and the support for a branch is the fraction of the resampled trees that contain it. A branch present in ninety-five per cent of the trees is well supported by the data; one present in half of them is not.

The procedure is repeated many times, usually a hundred or more, and the software reports the values on the branches of the tree. Stamatakis (2014) describes the efficient implementation of these repeated searches in RAxML, which makes the procedure practical for large datasets. The resampling is applied to the alignment, so the quality of the alignment determines the quality of the support.

A bootstrap value is often misread as the probability that a branch is correct. It is not. It measures how consistently the branch is recovered when the columns are resampled, which is a statement about the data's internal consistency. A branch can have high support from a consistent signal that is misleading, for instance one produced by a shared bias in the sequences, and a branch can have low support when the data are simply too few to resolve it.

High support does not guarantee a correct tree. If the model is wrong or the sequences share a systematic bias, such as similar base composition unrelated to ancestry, the resampled trees may agree on a wrong topology. Repeated consistency can give a false sense of reliability when the underlying assumptions are shared, and the same risk applies when resampling reinforces a biased signal.

Sandve et al. (2013) recommended that the support values of an analysis be reported with the settings that produced them, including the number of replicates, so that the result can be checked.
