---
title: "Evidence from Transcripts and Proteins"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How transcript sequences and protein sequences are aligned to the genome to provide evidence for the exons and introns of genes, the use of spliced alignments that place a transcript across its introns, the difference between evidence that is experimental and evidence that is predicted and the way the strength of evidence determines the confidence of each gene model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a transcript sequence is aligned to the genome as a spliced alignment and what its exons show."
  - "Distinguish experimental evidence from predicted evidence and state how each affects confidence in a gene model."
references:
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Evidence from transcripts and proteins is the strongest support for a gene model. A transcript is a messenger RNA sequenced from the cell, and it shows which parts of the genome are joined to form the mature message. Alberts et al. (2022) describe the processing of the primary transcript, in which introns are removed and exons are joined, and a transcript sequence therefore records the exons directly. Aligning it back onto the genome reveals the exon boundaries and the introns between them.

The alignment is a spliced alignment. Unlike an ordinary alignment, it allows a long gap in the genome corresponding to an intron, and the gap is placed where the transcript and the genome agree on the splice signals. Haas et al. (2008) describe the Program to Assemble Spliced Alignments, which builds such alignments from transcript data and uses them to define the structure of genes. The alignment method follows the local alignment ideas of Altschul et al. (1990), extended to allow the intron gaps.

Protein sequences provide evidence in a different way. A known protein from a related species can be aligned to the genome, and its alignment places the coding exons even where no transcript was sequenced. The protein evidence is less precise about the exon boundaries than transcript evidence, since the genetic code allows the same protein to be encoded in more than one way.

The evidence is classified by its source. Transcripts sequenced from the same species are the most direct, while proteins from a distant relative and predictions from other tools are weaker. A gene model supported only by distant protein similarity may be correct, but its structure carries more uncertainty than one supported by the species' own transcripts.

The record of evidence is part of the annotation. For each gene, the transcripts and proteins that support it should be listed with their accessions, so that a user can check the claim against the source.
