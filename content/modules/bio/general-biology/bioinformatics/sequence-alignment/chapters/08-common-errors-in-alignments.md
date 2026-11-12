---
title: "Common Errors in Alignments"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The errors most often found in pairwise alignments, including the alignment of unrelated sequences because of composition, the misplacement of gaps in low-complexity regions, the choice of a matrix that does not suit the divergence, the use of sequences from the wrong organism or the wrong reading frame, and the way each error is detected by the checks and comparisons described in the topic."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Recognise the common errors of pairwise alignment and state the check that detects each one."
  - "Explain why a clean-looking alignment can still be wrong and what additional evidence is needed."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Henikoff, S., & Henikoff, J. G. (1992). Amino acid substitution matrices from protein blocks. Proceedings of the National Academy of Sciences, 89(22), 10915-10919. https://doi.org/10.1073/pnas.89.22.10915"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Most alignment errors are not visible in the score. They appear as alignments that look reasonable and are wrong in a way that matters for the question. The first common error is aligning unrelated sequences because of their composition. Two proteins rich in the same residues, such as glycine and serine, can produce a high-scoring alignment by chance, and the statistics of the previous topic are the defence. Altschul et al. (1990) gave the framework in which a chance alignment is distinguished from a significant one.

The second error concerns low-complexity regions, which are stretches of repeated or biased residues. A repeat in one sequence can align against a repeat in another at many offsets, and the placement of the gaps then depends on the penalties rather than on the biology. The region should be masked or inspected, and the alignment should not be interpreted there.

The third error is the wrong matrix. Henikoff and Henikoff (1992) showed that the matrix must suit the divergence of the sequences, and a close matrix applied to distant proteins misses real relationships while a distant matrix applied to close ones admits spurious matches. The error is detected by repeating the alignment with a matrix chosen for the expected identity.

The fourth error is the wrong input. A sequence from a related species, a sequence from the wrong reading frame or a sequence whose label was swapped in a file will align cleanly and mislead. The check is to confirm the identifier, the organism and the translation against the source record.

Ioannidis (2005) described how a result that is selected because it looks clean can be less reliable than it appears, and the same caution applies to an alignment that was chosen among several. Sandve et al. (2013) recommended that the alignments tried and the one reported both be recorded, so that the selection is visible.
