---
title: "Draft Reconstruction from the Genome"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The construction of a draft metabolic reconstruction from the functional annotation of a genome, in which enzyme-coding genes are matched to reactions in biochemical databases, the use of homology to a well-studied organism and its limits, the quality of the genome annotation as a determinant of the draft, the reactions that are added from general biochemistry rather than from the genome, and the reporting of how much of the draft rests on each type of evidence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how enzyme annotations in a genome are matched to reactions to produce a draft reconstruction."
  - "State how the quality of the genome annotation and the use of homology limit the draft and how the evidence is recorded."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A draft reconstruction begins with the genome. The genes are annotated with their likely functions, and the enzyme functions are matched to reactions in biochemical databases through identifiers such as enzyme commission numbers. Each annotated enzyme that is matched to a reaction contributes that reaction to the draft, together with its metabolites and the gene that encodes it. The draft is therefore a translation of the genome's functional annotation into a list of biochemical transformations.

Where an organism has not been studied, its enzymes may be inferred from the homology of its genes to those of a well-studied relative. This transfer is useful, but it assumes that a gene with a similar sequence has a similar function, which is not always true, and the inferred reactions should be distinguished from those with direct evidence. Thiele and Palsson (2010) recommended that the homology threshold and the source of each inference be recorded, so that the reliance on inference can be seen.

The quality of the genome annotation sets a limit on the draft. An annotation that misses a gene or assigns it the wrong function produces a draft that lacks a reaction or contains a false one, and errors in annotation propagate to every analysis that follows. Ioannidis (2005) described how errors in a foundational dataset can be carried forward into the findings built on it, and the annotation should be documented with its version and its quality.

Some reactions are added from general biochemistry rather than from the genome, because they are needed for the network to function, such as transport reactions for nutrients or reactions of central metabolism whose enzymes are not annotated. These additions are necessary but they are not supported by the genome of the organism, and they must be marked as such. Sandve et al. (2013) recommended recording every addition and its source, so that the draft can be separated into the evidence that supports it and the assumptions that complete it.
