---
title: "Word Size and Seeds"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the seeds of a BLAST search are built from short words, the role of the word size in trading sensitivity against speed, the neighbourhood words of proteins that accept similar residues, the difference between the word size used for nucleotides and for proteins and the way a seed is extended into an alignment in both directions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the word size controls the number of seeds found and the sensitivity of the search."
  - "Describe how a seed is extended into a high-scoring segment in both directions and when the extension stops."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Lipman, D. J., & Pearson, W. R. (1985). Rapid and Sensitive Protein Similarity Searches. Science, 227(4693), 1435-1441. https://doi.org/10.1126/science.2983426"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A seed is a short word that scores highly when matched against the database. The word size is the length of these words, and it is the parameter that most strongly controls the balance between speed and sensitivity. For nucleotides, words are often eleven or more bases, since four letters give many chance matches at short lengths. For proteins, with twenty letters, the word is much shorter, usually three residues, because each residue carries more information.

Altschul et al. (1990) described the BLAST seeding strategy, which uses identical words together with neighbourhood words: words whose score against the query word exceeds a threshold, so that residues of similar chemistry can seed a match. This increases sensitivity to distant relationships at a cost in speed. The neighbourhood is defined by the substitution matrix, so the matrix and the word size must be considered together.

Each seed is extended in both directions along its diagonal. The extension adds the scores of successive residues, and it continues while the running score stays near its best value, which allows a region to include mismatches that are compensated by matches. Lipman and Pearson (1985) described the analogous step in FASTA, where the strongest diagonals are rescored and extended before the full alignment is computed.

The word size is therefore a decision about what the search can see. A large word misses relationships whose conserved regions contain no matching word of that length, and a small word produces many seeds that are chance matches and slows the search. The default is tuned for a typical search, and a study of distant relatives may need a smaller word and a longer run.

Sandve et al. (2013) recommended that the parameters of an analysis be stated, and the word size with its neighbourhood threshold should be reported with the search.
