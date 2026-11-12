---
title: "BLAST and FASTA"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The practical use of the heuristic database search programs FASTA and BLAST, covering the seeding strategy and its parameters, the choice of program for nucleotide and protein queries, the reading of search output including scores, identities and coverage, the meaning of E-values and bit scores, the iterated search of PSI-BLAST and the faster alignment tools that suit large-scale or genome-scale comparisons."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Run a BLAST search of a protein or nucleotide query, select the right program and read the output."
  - "Decide when an iterated search or a faster alignment tool is appropriate and state the risks each adds."
references:
  - "Lipman, D. J., & Pearson, W. R. (1985). Rapid and Sensitive Protein Similarity Searches. Science, 227(4693), 1435-1441. https://doi.org/10.1126/science.2983426"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Altschul, S. (1997). Gapped BLAST and PSI-BLAST: a new generation of protein database search programs. Nucleic Acids Research, 25(17), 3389-3402. https://doi.org/10.1093/nar/25.17.3389"
  - "Kent, W. J. (2002). BLAT: The BLAST-like alignment tool. Genome Research, 12(4), 656-664. https://doi.org/10.1101/gr.229202"
  - "Eddy, S. R. (2011). Accelerated Profile HMM Searches. PLoS Computational Biology, 7(10), e1002195. https://doi.org/10.1371/journal.pcbi.1002195"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

BLAST and FASTA are the search programs that every sequence analysis depends on. They find the database sequences that share a region of similarity with a query, without aligning the query to every entry by full dynamic programming. Lipman and Pearson (1985) introduced FASTA, which seeds the search with short identical words, and Altschul et al. (1990) introduced BLAST, which refines the same idea into a systematic method with statistics for the significance of each hit. This topic covers how the programs are run and how their output is read.

The chapters follow the order of a search. They begin with why a heuristic is needed and how the seeds are chosen, then describe the FASTA steps and the BLAST programs for nucleotides and proteins. The output, the scores and the E-values come next, followed by the iterated search of PSI-BLAST described by Altschul (1997) and the faster tools for large comparisons.

The concepts of the introductory topic are assumed. This topic concentrates on the practical decisions: which program, which database, which thresholds, and how to read the hits that come back.
