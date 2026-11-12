---
title: "Substitution Matrices and BLOSUM"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a substitution matrix assigns a score to every pair of residues, how the BLOSUM matrices were derived from aligned blocks of related proteins at different levels of sequence identity, why a matrix chosen for close relatives performs poorly for distant ones, how the matrix is paired with gap penalties and how a matrix is selected for a particular divergence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a substitution matrix converts the observed frequencies of residue pairs into scores."
  - "Select a BLOSUM matrix for sequences of a given identity and explain why the choice affects the alignment."
references:
  - "Henikoff, S., & Henikoff, J. G. (1992). Amino acid substitution matrices from protein blocks. Proceedings of the National Academy of Sciences, 89(22), 10915-10919. https://doi.org/10.1073/pnas.89.22.10915"
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A substitution matrix gives a score for each pair of amino acids, a value for replacing one residue with another. A matrix of this kind replaces the simple match and mismatch scores with values that reflect the chemistry of the residues. Two residues of similar size and charge substitute more readily than two that differ greatly, and the matrix records these tendencies. Alberts et al. (2022) describe the properties of the amino acids that determine their similarity, and the matrix is a statistical summary of how those properties show up in evolution.

Henikoff and Henikoff (1992) derived the BLOSUM matrices from aligned blocks of related proteins, counting how often each pair of residues occurred in the same column. The blocks were grouped by their level of sequence identity, and the matrix named by a number, such as BLOSUM62, was built from blocks that were no more than that percentage identical. A matrix built from close relatives gives high scores to identical residues and low scores to most substitutions, while one built from distant relatives tolerates more substitutions.

The matrix must match the divergence of the sequences. Aligning distant proteins with a matrix built for close ones finds too few matches and misses real relationships, and aligning close proteins with a distant matrix admits spurious alignments. Each matrix is therefore suited to a range of identities, and the choice should be made with the expected identity in view.

A matrix is paired with the gap penalties, and the two must be chosen together. A matrix that favours substitutions changes the balance between a gap and a mismatch, so the penalties that suit one matrix may not suit another. The pair is a single parameter setting, and both should be reported.

Needleman and Wunsch (1970) introduced the general dynamic programming framework in which any such matrix can be used, and the matrix is the means by which biology enters the scoring. Sandve et al. (2013) recommended that the parameters of an analysis be recorded, and the matrix name with its gap penalties is the record of this one.
