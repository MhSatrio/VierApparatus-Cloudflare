---
title: "Mutagenesis Methods"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The methods that generate variant proteins, including site-directed mutagenesis that changes chosen positions, saturation mutagenesis that tests all amino acids at a position, error-prone PCR that introduces random changes across a gene at a controlled rate, the recombination of related genes by DNA shuffling and its use to combine beneficial changes, the bias of each method towards some amino acids and codons, the control of the mutation rate so that most variants carry few changes, and the verification of the library by sequencing a sample to estimate its diversity and its bias."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe site-directed, saturation and random mutagenesis and state the kind of library each produces."
  - "Estimate the mutation rate and the bias of a library from sequencing a sample of its variants."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Mutagenesis methods generate the variants that are tested. Site-directed mutagenesis changes one or a few chosen positions to chosen residues, and it is used when the position is known to matter. Saturation mutagenesis replaces a position with every other amino acid, so that the effect of each substitution at that site is tested. Packer and Liu (2015) described these methods as the basis of rational and semi-rational engineering, in which the scope of the change is decided by knowledge of the protein.

Random mutagenesis introduces changes across the whole gene, and error-prone polymerase chain reaction is the common way of doing so. The mutation rate is controlled by the conditions of the reaction, and the rate must be chosen so that most variants carry one or two changes. A rate that is too high produces variants with many changes, most of which are damaging, and one that is too low produces a library in which few variants are changed at all.

DNA shuffling recombines fragments of related genes, producing variants that combine features from several parents. It is useful when the parents have complementary properties, and it reaches combinations that random mutation rarely produces. Its diversity depends on the similarity of the parents, and a library made from distant relatives may contain many non-functional recombinants.

Each method is biased. Error-prone polymerase chain reaction favours some substitutions over others, and the genetic code limits which amino acids can be reached by a single change. A library should be checked by sequencing a sample of its variants to estimate the mutation rate, the distribution of changes and the bias. Cumming (2014) argues that these estimates should be reported with their intervals, and Sandve et al. (2013) recommended recording the method, the conditions and the sequencing of the library.
