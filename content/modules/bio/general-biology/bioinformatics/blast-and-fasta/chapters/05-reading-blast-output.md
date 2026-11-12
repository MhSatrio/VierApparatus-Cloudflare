---
title: "Reading BLAST Output"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the output of a BLAST search is read, covering the summary table of hits, the query and subject coverage, the percentage identity and the alignment length, the mismatches and gaps shown in each pairwise alignment, the difference between a hit that covers the whole query and one that covers only a fragment and the way a reader chooses which hits to examine and which to set aside."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the summary table of a BLAST search and distinguish the hits that cover the whole query from those that cover a fragment."
  - "Interpret the percentage identity, the alignment length and the coverage of a hit together rather than one at a time."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Altschul, S. (1997). Gapped BLAST and PSI-BLAST: a new generation of protein database search programs. Nucleic Acids Research, 25(17), 3389-3402. https://doi.org/10.1093/nar/25.17.3389"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A BLAST report opens with a summary table, one row for each database sequence that scored above the reporting threshold. Each row gives the name of the subject, its score and its E-value, the percentage of identical residues and the length of the alignment. The table is sorted by significance, and it is the first place a reader looks. Altschul et al. (1990) defined the scores and the statistics in the table, and the table is the practical summary of the method.

A high score is not the same as a complete match. A hit may align over a fragment of the query and not over its whole length, and the coverage, the fraction of the query that is aligned, shows how much of the query the hit explains. A short high-identity fragment can have a low E-value and still describe only a domain of the protein. The coverage must be read with the score.

The percentage identity describes the alignment, not the whole sequences. Identity in a short alignment can be high by chance, and identity in a long one can be lower than it looks if the alignment includes weakly matching regions. The alignment length should be read beside the identity, since a fifty per cent identity over three hundred residues is a different relationship from the same identity over thirty.

The pairwise alignments below the table show the mismatches and gaps. A reader should look at them for the regions that matter, such as a catalytic residue or a motif, and check that these are conserved. A hit whose alignment shows the conserved residues is more informative than one whose score alone looks good.

Gapped BLAST, described by Altschul (1997), joins several segments into one alignment, and a hit can show more than one segment in the same subject. The segments should be read together, and a hit whose segments are in an unexpected order may indicate a rearrangement or a chimeric sequence.

Sandve et al. (2013) recommended that the hits used in an analysis be listed with their scores, coverage and identity, so that the selection can be checked. A list of names without these values is not a record of the search.
