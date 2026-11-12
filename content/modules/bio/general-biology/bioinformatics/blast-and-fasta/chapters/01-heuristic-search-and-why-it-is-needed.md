---
title: "Heuristic Search and Why It Is Needed"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why a database search cannot align a query to every sequence in a database by full dynamic programming, the cost of an exhaustive search as databases grow, the heuristic idea of finding short exact matches first and extending only the most promising ones and the trade-off between speed and sensitivity that heuristics introduce."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the cost of an exhaustive search and explain why it is impractical for a database of millions of sequences."
  - "Describe the trade-off between speed and sensitivity in a heuristic search and state when a heuristic may miss a real match."
references:
  - "Lipman, D. J., & Pearson, W. R. (1985). Rapid and Sensitive Protein Similarity Searches. Science, 227(4693), 1435-1441. https://doi.org/10.1126/science.2983426"
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A full dynamic programming alignment of a query against one database sequence takes time proportional to the product of the two lengths. Needleman and Wunsch (1970) gave the method, and it is exact, but for a query of a few hundred residues against a database of millions of sequences of similar length, the total work runs to many billions of cell computations. Repeated for each query in a study, the cost is prohibitive, and the database grows every year.

A heuristic accepts that the search may miss some true matches in exchange for speed. The usual idea is to find short exact matches first, since a true relationship between two proteins usually contains many identical short words, and to extend only those seeds that lie on a diagonal with several seeds. Lipman and Pearson (1985) built FASTA on this principle, and most later search programs use the same seeding idea with refinements.

The trade-off is real. A distant relationship may have no identical words of the chosen length, and the heuristic will not seed it. A longer seed is faster but less sensitive, and a shorter seed is more sensitive but produces more chance seeds to examine. The choice of seed length is therefore a choice about the kind of relationship the search is designed to find.

A search result is only as complete as its heuristic allows. A reader should treat the hits as the relationships the method could find, and should not conclude that a sequence with no hit is unrelated to the query. A negative result from a heuristic is a statement about the method's reach as much as about the biology.

Sandve et al. (2013) recommended recording the parameters of an analysis, and the seed length and the other search settings are the parameters that define what a search can find.
