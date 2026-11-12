---
title: "E-values and Bit Scores"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the raw alignment score of a BLAST hit is converted into a bit score that is comparable across scoring schemes, how the E-value is calculated from the bit score and the size of the search space, why the E-value depends on the database and the query length, the thresholds used in practice and the errors that follow when an E-value is read as a probability that a hit is homologous."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how the bit score and the E-value are related and why the E-value depends on the size of the search."
  - "State what an E-value does and does not mean, and avoid reading it as the probability that two sequences are related."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The raw score of an alignment depends on the scoring scheme, so a score from one matrix cannot be compared with a score from another. The bit score is a rescaling of the raw score that removes this dependence, and it is the figure to compare across searches that used different parameters. Altschul et al. (1990) defined the statistics from which the bit score is derived, and a higher bit score always means a better alignment under the statistics of its own search.

The E-value is calculated from the bit score, the length of the query and the total length of the database. It is the expected number of alignments with at least that bit score that would be found by chance in a search of that size. An E-value of one means that one such alignment is expected by chance; an E-value of 0.001 means that one is expected in a thousand such searches. The E-value therefore grows with the size of the database for the same bit score, and the same hit has a larger E-value in a larger database.

The E-value is not the probability that the two sequences are homologous. It is a statement about chance under a model of random sequences, and the model is an approximation. A low E-value shows that the alignment is unlikely to arise by chance, and this is a claim about the data that a reader can check. It does not show that the two proteins share a function or an ancestor, and the difference matters when a hit is used to assign a function.

The practical thresholds are conventions. Many analyses use a cut-off of 0.001 or 0.01, and the choice depends on how many hits the analysis can examine and how many false hits it can tolerate. Ioannidis (2005) described how a threshold applied to many tests produces many false positives unless the tests are corrected, and the same reasoning applies to the number of hits accepted from a search.

Sandve et al. (2013) recommended that the thresholds and the database of an analysis be recorded. An E-value without the database it refers to has no meaning, and the record should give both.
