---
title: "Isoforms and Sequence Variants"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How UniProt represents the isoforms of a protein, which arise from alternative splicing and alternative start sites, how a canonical isoform is chosen, how natural variants and disease-associated variants are recorded on the sequence and how an analysis chooses the isoform and the position numbering on which its results depend."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the canonical isoform of a protein and the other isoforms listed in its entry."
  - "Map a variant position from the canonical sequence to another isoform before it is used."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A single gene can give rise to several protein forms, called isoforms, through alternative splicing and the use of different start sites. Alberts et al. (2022) describe how the processing of a transcript determines which exons are joined, and the isoforms of a protein are the products of these choices. UniProt lists the isoforms of an entry, each with its own sequence, and it designates one of them as the canonical isoform, which is the default used for the positions of the entry.

The canonical isoform is a convention rather than a biological fact. It is usually the longest or the best-supported form, and a protein may be expressed in another isoform in a given tissue or condition. An analysis that depends on which form is present must choose the isoform on purpose and report it, since the same position may fall in a different part of the sequence in another isoform.

Natural variants are differences between the sequence of the entry and the sequences of other individuals or strains. UniProt records them on the canonical sequence, and some are linked to disease. Each variant has a position, the original residue and the replacement residue, and the position refers to the canonical sequence. A variant that is correct for one isoform may be misplaced in another if the sequences differ before it.

Mapping a position between isoforms requires the alignment of the two sequences. The UniProt Consortium (2023) describes the entries from which these positions are taken, and an alignment of the isoforms shows where the numbering shifts. The mapped position must be checked, since an alignment can place a residue in the wrong part of a repeat.

Sandve et al. (2013) recommended recording the exact inputs of an analysis, and the isoform identifier with its sequence and its position numbering is one of those inputs. A variant recorded without its isoform is ambiguous.
