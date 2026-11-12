---
title: "Genome Design and Modularity"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design of a synthetic genome as a set of modules with defined boundaries, covering the division of the genome into segments that can be built, verified and replaced independently, the choice of boundaries that avoid essential features and regulatory overlaps, the removal of repeats and restriction sites that interfere with assembly, the recoding of codons and sequences where the design requires it, the documentation of each design decision in a design file, and the use of simulation and computational checks to find problems before any DNA is synthesised."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Divide a genome into modules with boundaries that avoid essential features and overlapping regulatory elements."
  - "Remove sequences that interfere with assembly and record each design decision so that the construct can be reproduced."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A synthetic genome begins as a design, and the design must divide the sequence into modules that can be built and tested separately. Each module has defined boundaries, and the boundaries must be placed where they do not split an essential gene or an overlapping regulatory element. Cong et al. (2013) showed that many changes could be made in a genome at once, and the modular design is what makes such changes manageable when they are built into a whole chromosome.

Sequences that interfere with assembly must be removed or recoded before any DNA is synthesised. Repeated sequences cause the wrong fragments to join, and restriction sites can cut the construct during assembly. Each removal is a design decision that changes the sequence, and its consequence for the function of the gene must be considered. Ioannidis (2005) described how an assumption that a sequence is neutral can be wrong, and the design must test the assumption where possible.

Recoding, in which codons are changed while the encoded protein is preserved, is used where the design requires it. A recoded gene may still behave differently, because codon choice affects translation speed and the folding of the nascent protein. The design should record the rationale for each recoding and the sequence that results, so that later comparisons can separate the effect of the recoding from the effect of the intended change.

Every design decision should be recorded in a design file, and simulation and computational checks should be run to find problems before any DNA is made. The design file is the authoritative description of the construct, and it should be deposited so that others can reproduce it. Munafò et al. (2017) argued that the design should be reported in full, since the sequence alone does not show why each choice was made.
