---
title: "Database Searching with BLAST"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How heuristic database searches find sequences similar to a query without comparing it to every entry by full dynamic programming, the word-based seeding strategy of FASTA and BLAST, the statistics of high-scoring segment pairs and E-values that judge the significance of a hit and the iterated search that extends BLAST to find distant relatives."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how BLAST uses short matching words to find candidate hits quickly before extending them into alignments."
  - "Interpret an E-value and explain why a hit with a high score can still be insignificant."
references:
  - "Lipman, D. J., & Pearson, W. R. (1985). Rapid and Sensitive Protein Similarity Searches. Science, 227(4693), 1435-1441. https://doi.org/10.1126/science.2983426"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Altschul, S. (1997). Gapped BLAST and PSI-BLAST: a new generation of protein database search programs. Nucleic Acids Research, 25(17), 3389-3402. https://doi.org/10.1093/nar/25.17.3389"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A query sequence may be compared with millions of database entries, and a full dynamic programming alignment against each is too slow. Lipman and Pearson (1985) introduced the FASTA approach, which first finds short identical words shared by the query and the database sequence, and then scores the diagonals on which many such words lie before aligning the most promising ones. The approach trades a small loss of sensitivity for a large gain in speed.

Altschul et al. (1990) developed BLAST, which uses the same principle with a more systematic method. It lists the short words of the query that score highly against a word-sized region, scans the database for exact matches to those words, and extends each seed in both directions while the score stays high. The output is a set of high-scoring segment pairs, and the statistics of such pairs determine how likely each hit is to occur by chance.

The significance of a hit is expressed as an E-value, the number of hits of at least that score that would be expected by chance in a search of that size. A small E-value indicates that the hit is unlikely to be random, but the E-value depends on the database size, so a hit that is significant in one search may not be in another. A high raw score does not, on its own, establish a relationship, and the E-value is the statistic that the search reports for that purpose.

Altschul (1997) extended the method to PSI-BLAST, which builds a profile from the hits of one round and uses it to search again, finding relatives that are too distant to match the query directly. Iterated searches are powerful, and they also accumulate errors, since a false hit included in the profile can pull in further false hits.

Ioannidis (2005) described how results selected by their statistical significance without regard to the number of tests can mislead, and the same caution applies when many searches are run and only the striking hits are reported.
