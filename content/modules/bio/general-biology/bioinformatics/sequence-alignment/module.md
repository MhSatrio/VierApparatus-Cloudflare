---
title: "Sequence Alignment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The methods of pairwise sequence alignment in depth, covering the scoring of matches and gaps, the global and local dynamic programming algorithms, the affine gap model that treats a run of gaps as a single event, the choice of a substitution matrix for proteins and nucleotides, and the interpretation of an alignment as a hypothesis about homology, with the checks that prevent a high score from being mistaken for evidence of relatedness."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the optimal global and local alignment of two short sequences by dynamic programming and explain each step."
  - "Choose a substitution matrix and gap penalties for a given level of sequence divergence and justify the choice."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Henikoff, S., & Henikoff, J. G. (1992). Amino acid substitution matrices from protein blocks. Proceedings of the National Academy of Sciences, 89(22), 10915-10919. https://doi.org/10.1073/pnas.89.22.10915"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Sequence alignment is the first method of comparative biology. Two sequences are arranged so that their residues line up, gaps are inserted where one sequence has lost or gained material, and the arrangement is scored. The introductory topic gave the concepts. This topic works through the methods: the dynamic programming that finds the best arrangement, the penalties that decide how gaps are priced, the matrices that decide how substitutions are scored and the statistics that tell a strong alignment from one that a random pair of sequences could also produce.

The chapters take the algorithms in the order a practitioner meets them. Needleman and Wunsch (1970) give the global method, which aligns whole sequences, and Smith and Waterman (1981) give the local method, which finds the best shared region. The gap model, the substitution matrices and the significance of a score follow, and the last chapters cover the practical choices and the errors that most often corrupt an alignment.

An alignment is always a model. It assumes that the aligned residues descend from a common ancestral residue, and every parameter encodes an assumption about how sequences change. The topic keeps that assumption in view, so that the reader treats an alignment as a hypothesis to be checked against the biology and not as a fact.
