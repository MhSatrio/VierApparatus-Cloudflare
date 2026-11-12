---
title: "The FASTA Steps"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The sequence of steps in the FASTA search program, from the identification of matching words by a lookup table, through the scoring of diagonals that carry several words, to the rescoring of the best diagonals with a substitution matrix and the final alignment of the strongest candidates, with the reasons each step reduces the work of the full dynamic programming alignment."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps by which FASTA moves from a query to a ranked list of candidate database sequences."
  - "Explain why diagonal scoring reduces the number of alignments that must be computed in full."
references:
  - "Lipman, D. J., & Pearson, W. R. (1985). Rapid and Sensitive Protein Similarity Searches. Science, 227(4693), 1435-1441. https://doi.org/10.1126/science.2983426"
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

FASTA proceeds in stages, and each stage discards most of the work that would otherwise be done. In the first stage, the query is broken into short words, and a lookup table records where each word occurs in the query. The database sequences are scanned against this table, and each shared word is recorded with its position in both sequences. Lipman and Pearson (1985) described this word-matching step as the source of the method's speed.

In the second stage, the shared words are grouped by diagonal. A diagonal is the set of pairs of positions with the same offset between the two sequences, and a true relationship produces many shared words on one diagonal. A database sequence with a single chance word on a diagonal is discarded, and only the sequences with several words on a common diagonal pass on. The scoring of diagonals is a cheap filter that removes most of the database.

In the third stage, the best diagonals are rescored with a substitution matrix, and the sequences with the highest scores are selected. This rescoring is more sensitive than the word counts alone, since it accounts for the substitutions that the words missed. Only the strongest candidates receive the full dynamic programming alignment, which is the expensive step that the earlier stages were designed to avoid. Needleman and Wunsch (1970) gave that alignment, and it is applied in FASTA only to the short list.

The result is a ranked list of candidates with their alignments. The method finds the relationships whose diagonals carry enough words to survive the filters, and a distant relationship with few shared words may not reach the final list. This is the same trade-off described for the heuristic search in the earlier chapter.

Sandve et al. (2013) recommended that the steps of an analysis be explicit, and the settings of each stage, the word length, the number of diagonals kept and the number of candidates aligned, belong in the record of the search.
