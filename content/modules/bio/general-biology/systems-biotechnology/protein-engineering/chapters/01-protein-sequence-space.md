---
title: "Protein Sequence Space"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The sequence space of a protein as the set of all sequences of a given length over the twenty amino acids, the astronomical size of this space compared with the number of molecules that could be made, the small fraction of sequences that fold into stable structures, the neutral networks along which a protein can change its sequence without losing function, the distinction between a sequence that folds and one that performs a chosen function, and the implications of this distribution for the search strategies used in engineering."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the size of the sequence space of a protein of a given length and compare it with the number of molecules that can be made."
  - "Explain why most sequences do not fold and how neutral networks allow a protein to change without losing function."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A protein of one hundred residues has twenty choices at each position, so the number of possible sequences is twenty raised to the power of one hundred. This number is vastly greater than the number of atoms in the observable universe, and it is far greater than the number of molecules that could be made in any experiment. The sequence space is therefore enormous, and no engineer can test more than a minute fraction of it. Packer and Liu (2015) noted that this scale is the reason that the methods of directed evolution rely on guided rather than exhaustive search.

Most sequences do not fold into a stable structure. The folded state is a narrow region of the space, and a random sequence usually fails to adopt it. Natural proteins are rare in the space because they have been selected over long periods to fold and to function, and an engineered protein must similarly be found within the small set of sequences that are viable.

Neutral networks are sets of sequences that are connected by single changes and that share the same function. A protein can move along such a network by accepting mutations that do not alter its function, and this movement can carry it to regions where a new function is possible. The existence of neutral networks means that a protein can change substantially without losing activity, which is why many functional proteins are tolerant of mutation.

A sequence that folds is not the same as one that performs a chosen function. The function must be defined and measured, and a variant may be stable but inactive, or active but unstable. Sandve et al. (2013) recommended recording the definition of the function measured, since the search is only as good as the criterion it optimises, and the definition determines which variants are counted as successes.
