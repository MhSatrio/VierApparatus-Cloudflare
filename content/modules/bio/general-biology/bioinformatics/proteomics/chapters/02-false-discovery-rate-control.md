---
title: "False Discovery Rate Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the false discovery rate of peptide and protein identifications is estimated by searching a decoy database of reversed or shuffled sequences, the target-decoy strategy that sets a score threshold with a stated expected error, the propagation of the error from peptide-spectrum matches to peptides and proteins and the reasons a protein list must be reported with its false discovery rate and its number of peptides per protein."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the target-decoy strategy and how it estimates the false discovery rate of peptide identifications."
  - "Report a protein list with its false discovery rate and the number of peptides supporting each protein."
references:
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A search always returns a best candidate for each spectrum, even when the true peptide is not in the database, so the list of identifications contains errors. The false discovery rate is the expected fraction of accepted identifications that are wrong. The target-decoy strategy estimates it by searching, alongside the real database, a decoy database of sequences that cannot be correct, such as the reversed or shuffled proteins. Decoy matches are false by construction, and their number above a score threshold estimates how many of the real matches above that threshold are false.

Cox and Mann (2008) describe the use of this strategy in a widely used identification pipeline, in which the threshold is set so that the estimated false discovery rate is at a chosen level, often one per cent. The threshold is therefore a statement about the expected error of the list, not a statement about the confidence of any single match. A spectrum accepted at the threshold may still be wrong, and the list as a whole has a known expected error rate.

The error must be propagated to the level of proteins. A protein is inferred from the peptides identified for it, and a protein supported by a single peptide is less secure than one supported by many. The false discovery rate applies to the peptides, and the error of the protein list has to be estimated at the protein level, because the inference of proteins from peptides can add errors of its own. The protein-level false discovery rate must be estimated separately.

Ioannidis (2005) described how a result selected from many candidates is more likely to be false than its nominal threshold suggests, and the same selection occurs in every database search. The decoy estimate is the defence, since it measures the selection against the expected chance.

The report must give the threshold, the estimated false discovery rate at each level and the number of peptides supporting each protein. A list of proteins without these figures does not show how far it can be trusted, and Sandve et al. (2013) recommended that the thresholds of an analysis be recorded.
