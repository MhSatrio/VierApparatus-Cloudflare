---
title: "Pairwise Sequence Alignment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How two sequences are aligned to maximise a score that rewards matches and penalises mismatches and gaps, the dynamic programming method of Needleman and Wunsch for global alignment and that of Smith and Waterman for local alignment, the role of the substitution matrix and gap penalties and the interpretation of an alignment as a hypothesis about shared ancestry."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how dynamic programming finds the highest-scoring global alignment of two sequences."
  - "Distinguish global alignment from local alignment and state when each is appropriate."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Henikoff, S., & Henikoff, J. G. (1992). Amino acid substitution matrices from protein blocks. Proceedings of the National Academy of Sciences, 89(22), 10915-10919. https://doi.org/10.1073/pnas.89.22.10915"
---

An alignment places two sequences side by side, with gaps inserted where needed, so that identical or similar residues line up. The quality of an alignment is measured by a score. Matches add to the score, mismatches subtract from it, and gaps subtract a penalty that is often larger for opening a gap than for extending one. The best alignment is the one with the highest score under the chosen scheme, and the scheme itself is a hypothesis about which differences are biologically plausible.

The best alignment is found by dynamic programming. Needleman and Wunsch (1970) showed that the score of the best alignment of two sequences can be computed from the scores of shorter prefixes of the two sequences, so that a table of scores is filled from one corner to the other and the optimal path is traced back through it. Their method aligns the full length of both sequences and is called global alignment. It suits sequences that are expected to be homologous along their whole length.

Smith and Waterman (1981) modified the method so that the score is never allowed to fall below zero. The local alignment that results is the highest-scoring region shared between the two sequences, and this suits sequences that share a conserved domain within otherwise unrelated regions.

The scoring scheme for amino acids uses a substitution matrix that gives a score for each pair of residues. Henikoff and Henikoff (1992) derived the widely used BLOSUM matrices from aligned blocks of related proteins, and the choice of matrix affects which alignments are found. A matrix built for close relatives is not appropriate for distant ones.

An alignment is a hypothesis that the aligned residues share a common ancestor. Its interpretation depends on the scoring scheme and on the sequences, and a high score does not by itself establish homology.
