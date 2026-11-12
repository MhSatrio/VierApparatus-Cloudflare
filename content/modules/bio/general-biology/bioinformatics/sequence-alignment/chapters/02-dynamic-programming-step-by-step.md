---
title: "Dynamic Programming Step by Step"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The dynamic programming method for global alignment worked through in detail, covering the scoring matrix, the recurrence that gives the best score for each cell from its three neighbours, the initialisation of the first row and column, the traceback that recovers the alignment and the time and memory cost of the method as the sequence lengths grow."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Fill a dynamic programming matrix for two short sequences and recover an optimal global alignment by traceback."
  - "State the time and memory required by the method and explain why it is limited to pairs of moderate length."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The dynamic programming method fills a table with one row for each residue of the first sequence and one column for each residue of the second. Needleman and Wunsch (1970) showed that the best score for each cell can be computed from the best scores of three neighbours: the cell diagonally above and to the left, which corresponds to aligning the two residues, and the cells directly above or to the left, which correspond to placing a residue against a gap. The score of a cell is the largest of the three options, plus the match or mismatch score or minus the gap penalty.

The first row and column are initialised with the cost of a run of gaps, so that aligning a sequence against nothing has a defined score. The table is then filled from the top-left corner to the bottom-right, one cell at a time, and the bottom-right cell holds the score of the optimal global alignment. Each cell also records which neighbour gave its best score, which is what the traceback needs.

The traceback begins at the bottom-right cell and follows the recorded arrows back to the top-left corner. A diagonal step places two residues in the same column, a step upward places a residue of the second sequence against a gap, and a step to the left places a residue of the first sequence against a gap. Reading the steps in reverse gives the alignment itself, and a short example by hand is the best way to see that the method is exact.

The cost of the method grows with the product of the two lengths. A pair of sequences of a few thousand residues requires millions of cells, and a pair of genomes is far beyond the method. Memory is a further limit when every arrow is stored, and the practical methods of later chapters are needed for long sequences.

Sandve et al. (2013) recommended that the methods of an analysis be stated precisely, and a result from dynamic programming can be reproduced exactly from its scoring scheme and its two sequences. The alignment and the scores should be recorded with those inputs.
