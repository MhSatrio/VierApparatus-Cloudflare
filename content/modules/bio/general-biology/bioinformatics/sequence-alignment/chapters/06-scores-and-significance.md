---
title: "Scores and Significance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the score of an alignment is converted into a statistical measure of significance, the expected distribution of scores for unrelated sequences, the raw score and the bit score, the E-value that depends on the size of the search space and the cautions needed before a significant alignment is taken as evidence of homology or of shared function."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a raw alignment score cannot be interpreted without knowing the score expected for unrelated sequences."
  - "Interpret a bit score and an E-value and state why the same score can be significant in one search and not in another."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A high alignment score is not in itself evidence that two sequences are related. Unrelated sequences of realistic composition also produce local alignments with positive scores, and the best of many such alignments can be high. The question is whether a score is larger than the scores expected by chance, and the answer depends on the scoring scheme, the composition of the sequences and the size of the database searched. Altschul et al. (1990) developed the statistics that answer this question for local alignment.

The raw score is converted into a bit score, which is a rescaling that makes scores from different schemes comparable. The bit score does not depend on the size of the search. The E-value depends on it: the E-value is the number of alignments with at least that score that would be expected by chance in a search of the given size. A small E-value means that such a score would rarely arise by chance, and a large one means that it would arise often.

The same alignment can be significant in a small search and insignificant in a large one. A database of a million sequences offers a million opportunities for a chance alignment, so the threshold for significance rises with the size of the database. A reader who sees an E-value must know the database it refers to, and a result reported without that information cannot be judged.

Significance is not the same as biological meaning. A significant alignment may reflect a shared domain that gives no information about the function of the whole protein, or a low-complexity region of repeated residues that produces spurious matches. Ioannidis (2005) described how selected results and flexible analysis can make an apparent finding less reliable than its statistic suggests, and the same caution applies to the choice of which alignments to report.

Sandve et al. (2013) recommended that the thresholds and the database of an analysis be stated. An E-value reported without its database and its threshold is incomplete, and the record should include both.
