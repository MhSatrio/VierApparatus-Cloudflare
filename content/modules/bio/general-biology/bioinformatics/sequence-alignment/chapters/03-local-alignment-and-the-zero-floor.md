---
title: "Local Alignment and the Zero Floor"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The Smith-Waterman method for local alignment, covering the zero floor that lets an alignment start and end anywhere, the search for the highest-scoring cell in the matrix, the traceback that stops when the score reaches zero, the difference between a local and a global alignment for sequences with a shared domain and the reasons a local alignment can misrepresent the length of the relationship."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the zero floor in the local recurrence allows an alignment to begin and end at any position."
  - "Choose between global and local alignment for a given pair of sequences and state the reason."
references:
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The global method forces an alignment to span both sequences from end to end. Many biological relationships do not span the whole length: two proteins may share one domain and differ everywhere else. Smith and Waterman (1981) changed the recurrence so that a cell's score cannot fall below zero. When the best of the three neighbours is negative, the cell takes the value zero, which means that an alignment may start there. An alignment is then any run of cells that ends above zero, and the local alignment is the one that ends at the highest-scoring cell in the table.

The traceback begins at that highest cell rather than at the corner of the table, and it stops when it reaches a cell with the value zero. The alignment it recovers is the highest-scoring shared region, flanked by residues that did not contribute to the score. Smith and Waterman (1981) defined the method for the comparison of sequences and gave it the form used today, which Needleman and Wunsch's global method extended in its own way.

The choice between local and global depends on the question. For two sequences that are expected to be homologous along their length, the global alignment shows every residue and its gaps. For a shared domain, the local alignment isolates the region and avoids penalising the unrelated flanks. A local alignment of two whole genes that are related only in part reports the shared part without saying how much of each gene it covers, so the coverage must be reported with the score.

A local alignment can also overstate a relationship. The highest-scoring region may be the best of many random regions, and its score is not evidence of homology on its own. The statistics of the score, discussed in a later chapter, determine whether the region is significant.

Sandve et al. (2013) recommended that the choice of method and its consequences be stated, and a local alignment should be described with the region it covers and the method used to find it.
