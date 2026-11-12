---
title: "Alignment as a Model"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why a sequence alignment is a model of evolutionary history rather than a direct observation, the assumptions built into an alignment about homology, insertion and deletion, and substitution, how a score is a summary of these assumptions and why a reader must consider which assumptions a particular alignment depends on."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what it means for two residues to be aligned and what an alignment assumes about their common ancestry."
  - "List the assumptions behind a scoring scheme and state how each affects the alignment it produces."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Two residues are said to be aligned when they are placed in the same column of an arrangement. The placement does not observe that they share an ancestor. It proposes that they do, and that the differences between the sequences are the result of substitutions, insertions and deletions since their common ancestor. Needleman and Wunsch (1970) framed the comparison as a search for the best arrangement under a scoring scheme, and the arrangement they found is the optimum of that scheme, not of the biology.

The assumptions enter through the scores. A match is rewarded, a mismatch penalised and a gap priced, and each value encodes a belief about how often residues are replaced and how often material is inserted or lost. Alberts et al. (2022) describe the molecular changes that produce these differences in real sequences, and the scoring scheme is an abstraction of them. An alignment that is correct under one scheme may be wrong under another, and the reader should know which one was used.

The consequence is that an alignment cannot be judged by its score alone. A high score may arise because the scheme rewards the kind of pattern in the sequences, not because the sequences are related. A check is to change the parameters and see whether the alignment changes in the regions of interest. An alignment that holds across reasonable parameter choices is more trustworthy than one that flips with each change.

Sandve et al. (2013) recommended that the parameters of an analysis be stated and that its results be shown to depend on them in known ways. For an alignment, the matrix, the gap penalties and the method should be written with the result, so that the assumptions are visible to the reader.
